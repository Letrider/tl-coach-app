import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { ComponentType, useEffect } from 'react'

const withAdminAuth = <P extends object>(WrappedComponent: ComponentType<P>): ComponentType<P> => {
  const WithAdminAuthComponent = (props: P) => {
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