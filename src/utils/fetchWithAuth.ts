export async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<any> {
	const email = localStorage.getItem('userEmail')

	console.log(email)
	if (!email) {
		throw new Error('Email not found in localStorage')
	}

	const headers = new Headers({
		...options.headers,
		'X-User-Email': email,
	})

	const response = await fetch(url, {
		...options,
		headers,
	})

	if (!response.ok) {
		throw new Error(`Request failed with status ${response.status}`)
	}

	return response.json()
}
