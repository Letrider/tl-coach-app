import style from "./footer.module.css"

export default function Footer(): React.JSX.Element {
    return (
        <div className={style.footer}>
            <h1 className={style.footer_text_first}>TLCoach@mail.ru</h1>
            <h2 className={style.footer_text_second}>© TL Coach. 2024</h2>
        </div>
    )
}