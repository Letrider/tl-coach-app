import React from 'react'
import style from "./button.module.css"

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void 
  type?: "button" | "submit" | "reset"
  className?: string 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, type = "button" }) => {
  return (
    <div className={style.button_block}>
      <button type={type} className={style.register_button} onClick={onClick}>
        {children}
      </button>
    </div>
  )
}

export default Button
