import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'

const withAdminAuth = <T extends object>(WrappedComponent: ComponentType<T>): ComponentType<T> => {
  const WithAdminAuthComponent = (props: T) => {
    const { data: session, status } = useSession()
    const router = useRouter()

    useEffect(() => {
      if (status === 'loading') return
      if (!session) router.push('/admin/login')
    }, [session, status, router])

    if (status === 'loading' || !session) return <p>Loading...</p>
    return <WrappedComponent {...props} />
  }

  WithAdminAuthComponent.displayName = `WithAdminAuth(${getDisplayName(WrappedComponent)})`

  return WithAdminAuthComponent
}

const getDisplayName = (WrappedComponent: ComponentType<any>): string => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export default withAdminAuth