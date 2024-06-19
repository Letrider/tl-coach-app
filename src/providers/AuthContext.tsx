// AuthContext.tsx
import React, { ReactNode, createContext, useContext, useState } from 'react'

interface AuthContextType {
    isLogged: boolean
    setIsLogged: React.Dispatch<React.SetStateAction<boolean>>
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
    const [isLogged, setIsLogged] = useState<boolean>(() => {
        if (typeof window !== 'undefined') {
            const storedisLogged = localStorage.getItem("isLogged")
            return storedisLogged ? JSON.parse(storedisLogged) : false
        }
        return false
    })

    // useEffect(() => {
    //     if (isLogged && typeof window !== 'undefined') {
    //         localStorage.setItem("isLogged", JSON.stringify(isLogged))
    //     }
    // }, [isLogged])

    return (
        <AuthContext.Provider value={{ isLogged, setIsLogged }}>
            {children}
        </AuthContext.Provider>
    )
}

