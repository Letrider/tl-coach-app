import "@/styles/reset.css"
import "@/styles/main.css"

export default function AboutUs(): React.JSX.Element {
    return (
        <>
            <div className="about-us">
                <div className="about-us_container">
                    <div className="text-container">
                        <h1>О НАС</h1>
                        <h3>
                            Основная функция приложения TL Coach - помочь пользователям изучать темпоральную логику с помощью
                            упражнений, теории и проверки формул. Приложение позволяет проходить уроки и решать упражнения,
                            выбирать задачи и получать необходимую теорию. Пользователи могут вводить формулы и проверять их
                            правильность. Приложение также предоставляет возможность отслеживать прогресс и результаты
                            пользователя.
                        </h3>
                    </div>
                </div>
            </div>
        </>
    )
}