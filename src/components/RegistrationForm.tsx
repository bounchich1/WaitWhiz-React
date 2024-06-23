import '../css/LoginCard.css'
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Icon from '@mdi/react';
import { mdiLaptop } from '@mdi/js';
import { useState } from 'react';
import FormTextField from "./FormTextField.tsx";
import axios from "axios";
import {CardsLogic, handleLogic, FormButton} from "../Logic.ts";
export function RegistrationForm({cardsLogicVariables, setCardsLogicVariables}: CardsLogic) {
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')
    const [surname, setSurname] = useState('')
    const [password, setPassword] = useState('')
    const [repeatPassword, setRepeatPassword] = useState('')
    const [errorInfo, setErrorInfo] = useState('')
    const HandleSubmitRequest = async (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        if (name === '' || surname === '' || email === '' || password === '') {
            setErrorInfo('Заполнены не все поля')
            return;
        }
        if (!/.+@.+\..+/.test(email)) {
            setErrorInfo('Введите существующий адрес электронной почты')
            return;
        }
        if (password !== repeatPassword) {
            setErrorInfo('Пароли не совпадают')
            return;
        }
        const formData = {
            first_name: name,
            last_name: surname,
            email,
            password,
        }
        try {
            await axios.post('http://127.0.0.1:8000/registration', formData).then( (response) => {
                localStorage.setItem('access_token', response.data.access_token)
                axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access_token}`
                handleLogic('openReg', !cardsLogicVariables.openReg, setCardsLogicVariables)
                handleLogic('openSettings', !cardsLogicVariables.openSettings, setCardsLogicVariables)
            }).catch((error) => {
                if (error.response.status === 401) {
                    setErrorInfo('Аккаунт с такой почтой уже существует')
                }
            });

        } catch (e) { /* empty */ }

    }
    return (
        <>
            <div>
                <Modal open={cardsLogicVariables.openReg} onClose={() => handleLogic('openReg', !cardsLogicVariables.openReg, setCardsLogicVariables)} className={"overlay-container"}>
                    <Box className={"card reg-card-size"}>
                        <Icon path={mdiLaptop} size={3} className={"icon"}/>
                        <h2 className={"h2"}>Регистрация</h2>
                        <h3 className={"h3"}>Создать новый аккаунт</h3>
                        <FormTextField type={'email'} value={email} setValue={setEmail} variant={"standard"} prependInnerIcon={"mail"} label={"Почта"}/>
                        <FormTextField type={'name'} value={name} setValue={setName} variant={"standard"} prependInnerIcon={"smile"} label={"Имя"}/>
                        <FormTextField type={'surname'} value={surname} setValue={setSurname} variant={"standard"} prependInnerIcon={"smile"} label={"Фамилия"}/>
                        <FormTextField type={'password'} value={password} setValue={setPassword} variant={"standard"} prependInnerIcon={"lock"} label={"Пароль"}/>
                        <FormTextField type={'password'} value={repeatPassword} setValue={setRepeatPassword} variant={"standard"} prependInnerIcon={"lock"} label={"Повторите пароль"}/>
                        <FormButton className={"registration-btn"} onClick={HandleSubmitRequest}>Зарегистрироваться</FormButton>
                        <h4 className={"error-message"}>{ errorInfo }</h4>
                    </Box>
                </Modal>
            </div>
        </>
    );
}