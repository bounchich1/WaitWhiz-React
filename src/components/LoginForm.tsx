import Modal from '@mui/material/Modal'
import Box from '@mui/material/Box'
import '../css/LoginCard.css'
import {useState} from 'react';
import FormTextField from "./FormTextField.tsx";
import Icon from "@mdi/react";
import {mdiLaptop} from "@mdi/js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import {CardsLogic, handleLogic, FormButton} from "../Logic.ts";
export function LoginForm({cardsLogicVariables, setCardsLogicVariables}: CardsLogic) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [errorInfo, setErrorInfo] = useState('')
    const navigate = useNavigate();
    const handleLogInRequest = async (event: { preventDefault: () => void; }) => {
        event.preventDefault()
        if (!/.+@.+\..+/.test(email)) {
            setErrorInfo('Введите существующий адрес электронной почты')
            return;
        }
        const formData = new FormData()
        formData.append('username', email)
        formData.append('password', password)
        try {
            await axios.post('http://127.0.0.1:8000/token', formData).then((response) => {
                localStorage.setItem('access_token', response.data.access_token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`

            })
                .catch((error) => {
                    if (error.response.status === 401) {
                        setErrorInfo('Неверный адрес электронной почты или пароль')
                    }
                    if (error.response.status === 404) {
                        setErrorInfo('Неверный адрес электронной почты или пароль')
                    }
                }).then(() => {
                    axios.get('http://127.0.0.1:8000/users/me/').then((response) => {
                        const userData = response.data
                        if (userData.group_id && userData.subscription_expires) {
                            handleLogic('openLog', !cardsLogicVariables.openLog, setCardsLogicVariables)
                            navigate('/dashboard')
                        } else {
                            handleLogic('openLog', !cardsLogicVariables.openLog, setCardsLogicVariables)
                        }
                    })
                })

        } catch (e) { /* empty */ }
    }
    return (
        <>
            <div>
                <Modal open={cardsLogicVariables.openLog} onClose={() => handleLogic('openLog', !cardsLogicVariables.openLog, setCardsLogicVariables)} className={"overlay-container"}>
                    <Box className={"card login-card-size"}>
                        <Icon path={mdiLaptop} size={3} className={"icon"}/>
                        <h2 className={'h2'}>Вход</h2>
                        <h3 className={'h3'}>Войдите в свой аккаунт</h3>
                        <FormTextField label={"Почта"} prependInnerIcon={'mail'} value={email} setValue={setEmail} type={'email'} variant={'standard'}/>
                        <FormTextField label={'Пароль'} prependInnerIcon={'lock'} value={password} setValue={setPassword} type={'password'} variant={'standard'}/>
                        <FormButton className={"registration-btn"} onClick={handleLogInRequest}>Войти</FormButton>
                        <h4 className={'error-message'}>{errorInfo}</h4>
                    </Box>
                </Modal>
            </div>

        </>
    );
}