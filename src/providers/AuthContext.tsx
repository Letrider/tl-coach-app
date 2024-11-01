import { ReactNode, createContext, useContext, useState, useEffect } from 'react'
import { parseCookies, setCookie, destroyCookie } from 'nookies'

interface AuthContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
    login: (token: string) => void
    logout: () => void
}

interface AuthProviderProps {
    children: ReactNode
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isLogged, setIsLogged] = useState<boolean>(false)

    useEffect(() => {
        const cookies = parseCookies()
        const token = cookies.token
        setIsLogged(!!token)
    }, [])

    // Функция для входа пользователя
    const login = (token: string) => {
        setCookie(null, 'token', token, {
            path: '/',
            maxAge: 30 * 24 * 60 * 60, // куки действует 30 дней с момента получения
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
        setIsLogged(true)
    }

    // Функция для выхода пользователя
    const logout = () => {
        setIsLogged(false)
        destroyCookie(null, 'token', { path: '/' })
    }

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}
