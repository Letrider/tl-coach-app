import styles from "./input.module.css"
import { InputHTMLAttributes, ReactNode } from "react"


interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    children?: ReactNode
    type?: string
    placeholder?: string
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
    formData?: string
    value?: string
    error?: string
    required?: boolean
    readOnly?: boolean

}

export default function Input({ children, ...props }: InputProps) {
    return (
        <label className={styles.label}>
            <span className={styles.custom_label}>{children}</span>
            <input className={styles.custom_input} {...props} />
        </label>
    )
}