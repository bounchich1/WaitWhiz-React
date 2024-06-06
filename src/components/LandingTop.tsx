import '../css/LandingSpacing.css'
import {useNavigate} from "react-router-dom";
export function LandingTop() {
    const navigate = useNavigate();
    return (
        <>
            <div className="top-menu">
                <div className="top-menu-left">
                    <img src="/src/assets/svg/landing_logo.svg" alt="logo" />
                    <h2 className="h3-left">WAIT WHIZ</h2>
                </div>
                <div className="top-menu-right">
                    <h2 className="h3-right gradient-1">Главная</h2>
                    <h2 className="h3-right gradient-2">О сайте</h2>
                    <h2 className="h3-right gradient-3">Тарифы</h2>
                    <h2 className="h3-right gradient-4">Войти</h2>
                </div>
            </div>
            <div className="container">
                <div className="text-container">
                    <h1 className="h2-1">УЗНАЙ</h1>
                    <h1 className="h1-1">КАК ПОСТРОИТЬ</h1>
                    <h1 className="h1-1">ОЧЕРЕДЬ</h1>
                    <h1 className="h1-2">ПО-УМНОМУ</h1>
                    <h3 className="h3-1">ЗАПИСАТЬСЯ НА СДАЧУ</h3>
                    <h3 className="h3-1">ПРАКТИЧЕСКОЙ РАБОТЫ</h3>
                    <button className="register-button" type="button" onClick={() => {
                        navigate('/registration')
                    }}>Зарегистрироваться</button>

                </div>
                <div className="logo-container">
                    <img src="/src/assets/svg/landing_main.svg"  alt="BIG LOGO" className="main-logo"/>
                </div>
            </div>
        </>
    );
}