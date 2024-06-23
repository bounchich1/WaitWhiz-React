import {Box, Modal} from "@mui/material";
import {CardsLogic, handleLogic, SettingsButton, SettingsTextField, FormButton} from "../Logic.ts";
import {SetStateAction, useState} from "react";
import '../css/LoginCard.css'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
export function SettingsCard({cardsLogicVariables, setCardsLogicVariables}: CardsLogic) {
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const [errorData, setErrorData] = useState('')
    const handleTokenChange = (event: { target: { value: SetStateAction<string>; }; }) => {
        setToken(event.target.value)
    }
    const handleGetSubscription = () => {
        handleLogic('openSettings', !cardsLogicVariables.openSettings, setCardsLogicVariables)
        const element = document.getElementById('pricing')
        if (element !== null) {
            element.scrollIntoView({behavior: 'smooth'})
        }
    }
    const handleSendToken = () => {
        const endpoint = `http://127.0.0.1:8000/user/enter_invitation_token/${token}`
        axios.post(endpoint).then(() => {
            navigate('/dashboard')
        }).catch((error) => {
            setErrorData(error.detail)
        })
    }
    return (
        <>
            <div>
                <Modal className={'overlay-container'} open={cardsLogicVariables.openSettings}
                       onClose={() => handleLogic('openSettings', !cardsLogicVariables.openSettings, setCardsLogicVariables)}>
                    <Box className={'card settings-size'}>
                        <h2 className={'settings-h2'}>Давайте завершим настройку</h2>
                        <h3 className={'settings-h3'}>ВВЕДИТЕ ПРИГЛАСИТЕЛЬНЫЙ КОД</h3>
                        <SettingsTextField value={token} variant={'outlined'} onChange={handleTokenChange} type={'text'}></SettingsTextField>
                        <FormButton onClick={handleSendToken}>Подтвердить</FormButton>
                        <h4 className={'settings-h4'}>или</h4>
                        <SettingsButton onClick={handleGetSubscription}>Оформить подписку</SettingsButton>
                        <h4 className={'error-message'}>{errorData}</h4>
                    </Box>
                </Modal>
            </div>
        </>
    )
}