import '../css/LandingInfoCards.css'
import '../css/Pricing.css'
import Icon from '@mdi/react';
import { mdiCheck } from '@mdi/js';
import {handleLogic, PaymentProps, PricingProps} from "../types.ts";
import {SettingsButton} from "../MuiCustomComponents.ts"

function PricingCard ({price, style, options, type, description, cardsLogicVariables, setCardsLogicVariables, setPlanName, setTierNumber}: PricingProps) {
    const handleButtonClick = () => {
        if (localStorage.getItem('access_token') !== null) {
            setPlanName(type)
            if (type === 'Базовый') {
                setTierNumber(1)
            }
            if (type === 'Продвинутый') {
                setTierNumber(2)
            }
            if (type === 'Премиум') {
                setTierNumber(3)
            }
            handleLogic('openPay', !cardsLogicVariables.openPay, setCardsLogicVariables)
        } else {
            handleLogic('openLog', !cardsLogicVariables.openLog, setCardsLogicVariables)
        }
    }
    return (
        <div className={style}>
            <h1 className="pricing-h1">{type}</h1>
            <h2 className="pricing-h2">{description}</h2>
            <h1 className={"price-h1"}>{price}</h1>
            <SettingsButton onClick={handleButtonClick} className={'price-button'}>Начать с этого</SettingsButton>
            <div className="icons-container">
                {options && options[0] ? (
                    <div className="option-container">
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon" />
                        <h3>{options[0]}</h3>
                    </div>
                ): ("")}
                {options[1] ? (
                    <div className="option-container">
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{options[1]}</h3>
                    </div>
                ): ("")}
                {options[2]? (
                    <div className="option-container">
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{options[2]}</h3>
                    </div>
                ): ("")}
                {options[3] ? (
                    <div className="option-container">
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{options[3]}</h3>
                    </div>
                ): ("")}
                {options[4] ? (
                    <div className="option-container">
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{options[4]}</h3>
                    </div>
                ): ("")}
            </div>

        </div>
    )
}
export function LandingPricing({cardsLogicVariables, setCardsLogicVariables, setPlanName, setTierNumber}: PaymentProps) {
    return (
        <>
            <div className="spacing-card" id={'pricing'}>
                <h1 className="h1-about">ТАРИФЫ</h1>
            </div>
            <div className="pricing-container">
                <PricingCard type={"Базовый"} price={"1200р/мес"}
                             style={"pricing-card pricing-card-height-1"} options={['Доступ к таблице']}
                             description={'Для новеньких'}
                 setPlanName={setPlanName} setCardsLogicVariables={setCardsLogicVariables}
                cardsLogicVariables={cardsLogicVariables} setTierNumber={setTierNumber}/>
                <PricingCard type={"Продвинутый"} price={"1200р/мес"}
                             style={"pricing-card pricing-card-height-2"}
                             options={['Базовые функции', 'Круглосуточная поддержка']}
                description={'Для энтузиастов'} setTierNumber={setTierNumber}
                             setPlanName={setPlanName} setCardsLogicVariables={setCardsLogicVariables}
                             cardsLogicVariables={cardsLogicVariables}/>
                <PricingCard type={"Премиум"} price={"1200р/мес"}
                             style={"pricing-card pricing-card-height-3"}
                             options={['Базовый + Продвинутый', 'Предлагайте новые фишки','Другие преимущества в будущем']}
                             description={'Для ценителей комфорта'}
                             setPlanName={setPlanName} setCardsLogicVariables={setCardsLogicVariables}
                             cardsLogicVariables={cardsLogicVariables} setTierNumber={setTierNumber}/>
            </div>
            <div className={"footer"}>
                <div className={"footer-row"}>
                    <img src='/src/assets/svg/landing-footer-logo.svg' alt={"footer-logo"} className={"footer-logo"}/>
                    <div className={"footer-column"}>
                        <h3 className={"footer-h3 footer-margin"}>Контакты</h3>
                        <h3 className={"footer-h3 footer-margin"}>+7999999</h3>
                        <h3 className={"footer-h3 footer-margin"}>@waitwhiz</h3>
                    </div>
                </div>
                <h3 className={"footer-h3 footer-text-deco"}>Политика конфиденциальности</h3>
                <h3 className={"footer-h3 footer-text-deco"}>Пользовательское соглашение</h3>
            </div>
        </>
    );
}