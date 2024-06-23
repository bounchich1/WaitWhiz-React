import '../css/LandingInfoCards.css'
import Icon from '@mdi/react';
import { mdiClockOutline, mdiHandshake, mdiBed } from '@mdi/js';
interface InfoCard {
    text: string;
    svgIcon: string;
    style?: string;
}
function InfoCard({text, svgIcon, style}: InfoCard) {
    return (
        <div className={style}>
            <Icon path={svgIcon}
                  title="User Profile"
                  size={2}
                  className="svg-icon"
            />
            <h3>{text}</h3>
        </div>
    )
}
export function LandingInfoCards() {
    const org = "Надёжный помощник в организации записи на сдачу практических работ для студентов"
    const time = "Сокращает время и упрощает работу для всех участников образовательного процесса"
    const protection = "Защита персональных данных и конфиденциальность информации"
    const info = "Подробная информация о занятых слотах и возможность отслеживать свою позицию в очереди"
    const simple = "Простой и понятный интерфейс делает процесс записи быстрым и комфортным"
    return (
        <>
            <div className="spacing-card" id={'about'}>
                <h1 className="h1-about">О САЙТЕ</h1>
            </div>
            <div className="card-container">
                <InfoCard text={org} svgIcon={mdiHandshake} style={"info-card card-size-org"}/>
                <InfoCard text={time} svgIcon={mdiClockOutline} style={"info-card card-size-time"} />
                <InfoCard text={info} svgIcon={mdiClockOutline} style={"info-card card-size-info"} />
                <InfoCard text={simple} svgIcon={mdiBed} style={"info-card card-size-simple"} />
                <InfoCard text={protection} svgIcon={mdiClockOutline} style={"info-card card-size-protection"} />
            </div>
        </>
    );
}