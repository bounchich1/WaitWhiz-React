import '../css/LandingSpacing.css'
import {CardsLogic, handleLogic} from "../types.ts";
import landingLogo from '../assets/svg/landing_logo.svg';
import landingMain from '../assets/svg/landing_main.svg'
function handleScroll(id: string) {
    const element = document.getElementById(id)
    if (element !== null) {
        element.scrollIntoView({behavior: 'smooth'})
    }
    return;
}
export function LandingTop({cardsLogicVariables, setCardsLogicVariables}: CardsLogic) {

    return (
        <>

            <div className="container">
                <div className="text-container">
                    <div className="top-menu-left">
                        <img src={landingLogo} alt="logo" />
                        <h2 className="h3-left">WAIT WHIZ</h2>
                    </div>
                    <div className={"margin-container"}>
                        <h1 className="h2-1">УЗНАЙ</h1>
                        <h1 className="h1-1">КАК ПОСТРОИТЬ</h1>
                        <h1 className="h1-1">ОЧЕРЕДЬ</h1>
                        <h1 className="h1-2">ПО-УМНОМУ</h1>
                        <div className="interface-container">
                            <h3 className="h3-1">ЗАПИСАТЬСЯ НА СДАЧУ</h3>
                            <h3 className="h3-1">ПРАКТИЧЕСКОЙ РАБОТЫ</h3>
                            <button className="register-button" type="button" onClick={() =>
                                handleLogic('openReg', !cardsLogicVariables.openReg, setCardsLogicVariables)}
                            >Зарегистрироваться</button>
                    </div>
                    </div>
                </div>
                <div className="logo-container">
                    <div className="top-menu-right">
                        <h2 className="h3-right gradient-1">Главная</h2>
                        <h2 className="h3-right gradient-2" onClick={() => {handleScroll('about')}}>О сайте</h2>
                        <h2 className="h3-right gradient-3" onClick={() => {handleScroll('pricing')}}>Тарифы</h2>
                        <h2 className="h3-right gradient-4" onClick={() => handleLogic('openLog', !cardsLogicVariables.openLog, setCardsLogicVariables)}>Войти</h2>
                    </div>
                    <img src={landingMain}  alt="BIG LOGO" className="main-logo"/>
                </div>
            </div>
        </>
    );
}