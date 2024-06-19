import "@/styles/main.css"
import "@/styles/reset.css"

import Link from "next/link"

export default function Tasks(): React.JSX.Element {
    return (
        <div className="content-tasks">
            <div className="container">
                <div className="container-header">
                    <div className="content-header">
                        <h1>ЗАДАЧИ</h1>
                    </div>
                </div>
                <div className="container-button">
                    <div className="content-button">
                        <div className="button-left">
                            <div><Link href="/tasks/truth-and-falsity">Истинность и ложность</Link></div>
                            <div><Link href="/tasks/formalization">Формализация</Link></div>
                            <div><Link href="/tasks/linear-temporal">Линейная темпоральная логика</Link></div>
                        </div>
                        <div className="button-right">
                            <div><Link href="/tasks/grammar">Грамматика</Link></div>
                            <div><Link href="/tasks/operators">Операторы</Link></div>
                            <div><Link href="/tasks/temporal-duality">Тождества двойственности</Link></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}