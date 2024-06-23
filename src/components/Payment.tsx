import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import {handleLogic, PaymentProps, PlanType} from "../types.ts";
import '../css/LoginCard.css'
import '../css/Pricing.css'
import Icon from "@mdi/react";
import {mdiCheck} from "@mdi/js";
import {SettingsTextField, SettingsButton} from '../MuiCustomComponents.ts'
import React, {useState, useEffect} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
function PlanFeatures({planName}: PlanType) {
    const basicOption = ['Доступ к таблице']
    const intermediateOption = ['Базовые функции', 'Круглосуточная поддержка']
    const premiumOptions = ['Базовый + Продвинутый', 'Предлагайте новые фишки','Другие преимущества в будущем']
    return (
        <div className={"icons-container justify-payment"}>
            <h3 className={'payment-h3-3'}>ВАМ СТАНУТ ДОСТУПНЫ:</h3>
            <div>
                {planName === 'Базовый' ? (
                    <div className={'option-container'}>
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{basicOption[0]}</h3>
                    </div>

                ): ("")}
                {planName === 'Продвинутый' ? (
                    <div className={'option-container'}>
                        <Icon
                            path={mdiCheck}
                            size={2}
                            className="check-icon">
                        </Icon>
                        <h3>{intermediateOption[0]}</h3>
                    </div>
                ): ("")}
                    {planName === 'Продвинутый' ? (
                        <div className={'option-container'}>
                            <Icon
                                path={mdiCheck}
                                size={2}
                                className="check-icon">
                            </Icon>
                            <h3>{intermediateOption[1]}</h3>
                        </div>
                    ): ("")}
                    {planName === 'Премиум' ? (
                        <div className={'option-container'}>
                            <Icon
                                path={mdiCheck}
                                size={2}
                                className="check-icon">
                            </Icon>
                            <h3>{premiumOptions[0]}</h3>
                        </div>
                    ): ("")}
                    {planName === 'Премиум' ? (
                        <div className={'option-container'}>
                            <Icon
                                path={mdiCheck}
                                size={2}
                                className="check-icon">
                            </Icon>
                            <h3>{premiumOptions[1]}</h3>
                        </div>
                    ): ("")}
                    {planName === 'Премиум' ? (
                        <div className={'option-container'}>
                            <Icon
                                path={mdiCheck}
                                size={2}
                                className="check-icon">
                            </Icon>
                            <h3>{premiumOptions[2]}</h3>
                        </div>
                    ): ("")}
                </div>
            </div>
    )
}
export function Payment({cardsLogicVariables, setCardsLogicVariables, planName, tier}: PaymentProps) {
    const [quantityOfPeople, setQuantityOfPeople] = useState('0')
    const [monthsNumber, setMonthsNumber] = useState('0')
    const [totalPrice, setTotalPrice] = useState(0)
    const [groupNumber, setGroupNumber] = useState('')
    const [token, setToken] = useState('')
    const [showToken, setShowToken] = useState(false)
    const navigate = useNavigate()
    const handleGroupPopulation = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setQuantityOfPeople(event.target.value)
    }
    const handleMonths = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setMonthsNumber(event.target.value)
    }
    const handleGroup = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setGroupNumber(event.target.value)
    }
    useEffect(() => {
        if (planName === 'Базовый') {
            setTotalPrice( parseInt(monthsNumber, 10) * parseInt(quantityOfPeople, 10) * 20)
        }
        if (planName === 'Продвинутый') {
            setTotalPrice(parseInt(monthsNumber, 10) * parseInt(quantityOfPeople, 10) * 30)
        }
        if (planName === 'Премиум') {
            setTotalPrice(parseInt(monthsNumber, 10) * parseInt(quantityOfPeople, 10) * 40)
        }
    }, [quantityOfPeople, monthsNumber, planName]);
    const handleFakeSubscription = async () => {
        const endpoint = `http://127.0.0.1:8000/user/activate_subscription/`
        const group_population = parseInt(quantityOfPeople, 10)
        const months = parseInt(monthsNumber, 10)
        const formData = {
            subscription_info: {
                months,
                group_population,
                tier,
            },
            group_info: {
                group_number: groupNumber
            }
        }
        await axios.post(endpoint, formData).then((response) => {
            if (response.status === 200) {
                axios.get(`http://127.0.0.1:8000/user/generate_invitation_token/`).then((response) => {
                    setToken(response.data.token)
                    setShowToken(!showToken)
                })
            }
        }).catch((error) => {
            console.error(error)
        })
    }
    const handleRedirect = () => {
        navigate('/dashboadr')
    }
    return (
        <>
            {!showToken ? (
                <div>
                    <Modal open={cardsLogicVariables.openPay}
                           onClose={() => handleLogic('openPay', !cardsLogicVariables.openPay, setCardsLogicVariables)}
                           className={'overlay-container'}>
                        <Box className={'card payment-size'}>

                            <h2 className={'payment-h2'}>ПОДКЛЮЧЕНИЕ ТАРИФНОГО ПЛАНА</h2>
                            <div className={'payment-text-container'}>
                                <h3 className={'payment-h3-1'}>Выбранный тариф:</h3>
                                <h3 className={'payment-h3-2'}>{planName}</h3>
                            </div>
                            <div className={'payment-container'}>
                                <PlanFeatures planName={planName}></PlanFeatures>
                                <div className={'fields-container'}>
                                    <h3 className={'payment-h3-3'}>УКАЖИТЕ ДОПОЛНИТЕЛЬНЫЕ ДАННЫЕ</h3>
                                    <div className={'payment-row'}>
                                        <h4 className={'payment-h4 payment-margin'}>Количество людей в группе:</h4>
                                        <SettingsTextField type={'number'} value={quantityOfPeople}
                                                           onChange={handleGroupPopulation} className={'field-width'}></SettingsTextField>
                                    </div>
                                    <div className={'payment-row'}>
                                        <h4 className={'payment-h4 payment-margin'}>Количество месяцев подписки:</h4>
                                        <SettingsTextField value={monthsNumber} onChange={handleMonths} type={'number'} className={'field-width'}></SettingsTextField>
                                    </div>
                                    <div className={'payment-row'}>
                                        <h4 className={'payment-h4 payment-margin'}>Код или название группы:</h4>
                                        <SettingsTextField value={groupNumber} onChange={handleGroup} type={'string'} className={'field-width'}></SettingsTextField>
                                    </div>
                                    <div className={'button-container'}>
                                        <h2>ИТОГО: {totalPrice}</h2>
                                        <SettingsButton className={'button-width'} onClick={handleFakeSubscription}>Перейти к оплате</SettingsButton>
                                    </div>

                                </div>
                            </div>
                        </Box>
                    </Modal>
                </div>
            ): ( <div>
                <Modal open={cardsLogicVariables.openPay}
                       onClose={() => handleLogic('openPay', !cardsLogicVariables.openPay, setCardsLogicVariables)}
                       className={'overlay-container'}>
                    <Box className={'card payment-size'}>
                        <div className={'token-container'}>
                            <h2 className={'payment-h2'}>ВАША ПОДПИСКА УСПЕШНО АКТИВИРОВАНА</h2>
                            <div className={'token-text-container'}>
                                <h3 className={'payment-h3-1'}>Пригласительный код:</h3>
                                <h3 className={'payment-h3-2'}>{token}</h3>
                            </div>
                            <div className={'token-text-container'}>
                                <SettingsButton className={'button-width'} onClick={handleRedirect}>Перейти к таблице</SettingsButton>
                            </div>

                        </div>
                    </Box>
                </Modal>
            </div>)}

        </>
    )
}