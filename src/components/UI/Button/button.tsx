import { FC, ButtonHTMLAttributes } from 'react'
import styles from "./button.module.css"

const Button: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ children, onClick, type = "button" }) => {
  return (
    <div className={styles.button_block}>
      <button type={type} className={styles.register_button} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button
