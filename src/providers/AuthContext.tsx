import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import jsCookie from 'js-cookie'
import {
    COOKIE_MAX_AGE
} from '@/constants/basic'

interface AuthContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    login: (token: string) => void
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
    initialIsLogged?: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth должен использоваться внутри AuthProvider')
    }

    return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children, initialIsLogged = false }) => {
    const [isLogged, setIsLogged] = useState<boolean>(initialIsLogged)

    const login = () => {
        setIsLogged(true)
    }

    const logout = () => {
        jsCookie.remove('token')
        setIsLogged(false)
    }

    useEffect(() => {
        const token = jsCookie.get('token')
        setIsLogged(!!token)
    }, [])

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
