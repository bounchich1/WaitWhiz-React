import {LandingInfoCards} from "./LandingInfoCards.tsx";
import {LandingTop} from "./LandingTop.tsx";
import {LandingPricing} from "./LandingPricing.tsx";
import {RegistrationForm} from "./RegistrationForm.tsx";
import {useState} from 'react';
import {LoginForm} from "./LoginForm.tsx";
import {SettingsCard} from "./SettingsCard.tsx";
import {Payment} from './Payment.tsx'
function Landing() {
    const [cardsLogic, setCardsLogic] = useState({
        openReg: false,
        openLog: false,
        openPay: false,
        openSettings: false,
    })
    const [paymentInfo, setPaymentInfo] = useState('')
    const [tier, setTier] = useState(1)
  return (
    <>
        <Payment tier={tier} setTierNumber={setTier} cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} planName={paymentInfo} setPlanName={setPaymentInfo}/>
        <SettingsCard cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} />
        <LoginForm cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} />
        <RegistrationForm cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} />
        <LandingTop cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} />
        <LandingInfoCards />
        <LandingPricing  tier={tier} setTierNumber={setTier} cardsLogicVariables={cardsLogic} setCardsLogicVariables={setCardsLogic} setPlanName={setPaymentInfo} />

    </>
  )
}

export default Landing
