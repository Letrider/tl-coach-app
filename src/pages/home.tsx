import "@/styles/main.css"
import "@/styles/reset.css"
import Image from 'next/image'

export default function Home(): React.JSX.Element {

    const imageProps = `10000`

    return (
        <div className="main">
            <div className="welcome">
                <div className="img_welcome"></div>
                <div className="welcome_text">
                    <h1>TL COACH</h1>
                    <h3>Изучать темпоральную логику проще, чем кажется!</h3>
                </div>
            </div>
            <div className="privilege">
                <h2>ПРЕИМУЩЕСТВА ПРИЛОЖЕНИЯ</h2>
                <div className="cards">
                    <div className="card">
                        <div className="card_img">
                            <Image src="/images/interfaces.png" width={imageProps} height={imageProps} alt="" />
                        </div>
                        <div className="text_card">
                            <h3>УДОБНЫЙ ИНТЕРФЕЙС</h3>
                            <p>Всегда и везде</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card_img">
                            <Image src="/images/interest-tasks.png" width={imageProps} height={imageProps} alt="" />
                        </div>
                        <div className="text_card">
                            <h3 className="text_add_20px">РАЗНООБРАЗИЕ ЗАДАЧ</h3>
                            <p>Широкий спектр задач <br /> на различные темы</p>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card_img">
                            <Image src="/images/progress.png" width={imageProps} height={imageProps} alt="" />
                        </div>
                        <div className="text_card">
                            <h3>ОТСЛЕЖИВАНИЕ ПРОГРЕССА</h3>
                            <p>Индивидуальная статистика</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="popular_questions">
                <div className="popular_questions_img">
                    <h3>ПОПУЛЯРНЫЕ ВОПРОСЫ</h3>
                    <p>Возникли вопросы? Мы рады помочь!</p>
                </div>
                <div className="popular_questions_content">
                    <div className="popular_questions_text">
                        <div className="popular_questions_text_header">
                            <h4>ЧТО ТАКОЕ CL COACH ДЛЯ ЧЕГО ЭТО НУЖНО?</h4>
                            <h4>НУЖНО ЛИ МНЕ ИМЕТЬ ОПРЕДЕЛЕННЫЕ ЗНАНИЯ, ЧТОБЫ ИСПОЛЬЗОВАТЬ TL COACH?</h4>
                            <h4>КАК МНЕ СВЯЗАТЬСЯ С ТЕХНИЧЕСКОЙ ПОДДЕРЖКОЙ TL COACH?</h4>
                        </div>
                        <div className="popular_questions_text_main">
                            <p>TL Coach - это приложение для изучения темпоральной логики, которое поможет вам освоить ключевые концепции и методы этой интересной и важной дисциплины</p>
                            <p>Нет, TL Coach разработан таким образом, чтобы было легко начать изучение темпоральной логики с нуля.</p>
                            <p>Если у вас есть какие либо вопросы или проблемы с использованием TL Coach, Вы можете связаться с нашей технической поддержкой на сайте или в соц. сетях.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
