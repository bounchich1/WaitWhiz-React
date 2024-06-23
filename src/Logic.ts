import React, {SetStateAction} from "react";
import {Button, FormControl, Select, styled, TextField} from "@mui/material";

type Logic = {
    openReg: boolean;
    openLog: boolean;
    openPay: boolean;
    openSettings: boolean;
}
export interface CardsLogic {
    cardsLogicVariables: Logic;
    setCardsLogicVariables: React.Dispatch<SetStateAction<Logic>>;
}
export function handleLogic(cardType: string, value: boolean, setCardsLogic: React.Dispatch<SetStateAction<Logic>>) {
    setCardsLogic(prevState => ({...prevState, [cardType]: value}))
}
export interface PaymentParams {
    planName?: string,
    tier?: number,
    setTierNumber: React.Dispatch<SetStateAction<number>>,
    setPlanName: React.Dispatch<SetStateAction<string>>,
}
export interface PaymentProps extends CardsLogic, PaymentParams {}
const SettingsButton = styled(Button)({
    color: '#ffffff',
    backgroundImage: 'linear-gradient(90deg, #FEA800, #2A0153)',
    backgroundRepeat: 'no-repeat',
    border: 'none',
    borderRadius: '20px',
    width: '75%',
    height: '50px',
    fontSize: 'var(--step--1)',
    fontWeight: '700',
    fontFamily: ['Raleway', 'sans-serif'].join(','),
    marginTop: '1em',
    '&:hover': {
        boxShadow: 'none',
        backgroundImage: 'linear-gradient(90deg, #FEA800, #2A0153)',
        backgroundRepeat: 'no-repeat',
    }
});
const SettingsTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
        marginTop: '1em',
        marginBottom: '1em',
        width: '100%',
        height: '50px',
        borderRadius: '20px',
        '& fieldset': {
            borderColor: 'rgba(255,255,255,0.6)',
            borderWidth: '2px',

        },
        '&:hover fieldset': {
            borderColor: 'rgba(255,255,255,0.85)',
            borderWidth: '2px',
        },
        '&.Mui-focused fieldset': {
            borderColor: '#ffffff',
            borderWidth: '3px',
        },
    },
    '& .MuiInputBase-input': {
        fontFamily: ['Raleway', 'sans-serif'].join(','),
        fontSize: 'var(--step-0)',
        color: '#ffffff'
    }
});
const CustomFormTextField = styled(TextField)({
    '& .MuiInput-underline:before': {
        borderBottomColor: 'rgba(254,168,0,0.5)',
        borderWidth: '2px',
    },
    '& .MuiInput-underline': {
        marginTop: '2em',
        marginBottom: '1em',
    },
    '& .MuiInputBase-input': {
        fontFamily: ['Raleway', 'sans-serif'].join(','),
        fontSize: 'var(--step-0)',
        color: '#ffffff'
    },
    '& .MuiInput-underline:hover:before' : {
        borderBottomColor: 'rgba(254,168,0,0.9)',
        borderWidth: '2px',
    },
    '& .MuiInput-underline:hover' : {
        borderBottomColor: 'rgba(254,168,0,0.9)',
        borderWidth: '2px',
    },
    '& .MuiInput-root:hover:not(.Mui-disabled):before' : {
        borderBottomColor: 'rgba(254,168,0,0.9)',
        borderWidth: '2px',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'rgba(254,168,0, 1)',
        borderWidth: '3px',
    }
})
const FormButton = styled(Button)({
    color: '#ffffff',
    border: 'none',
    borderRadius: '20px',
    height: '50px',
    width: '75%',
    marginTop: '1em',
    backgroundColor: 'rgba(254, 168, 0, 0.89)',
    fontSize: 'var(--step--1)',
    fontWeight: '600',
    fontFamily: ['Raleway', 'sans-serif'].join(','),
    '&:hover': {
        boxShadow: 'none',
        backgroundColor: 'rgba(254, 168, 0, 0.89)',
        backgroundRepeat: 'no-repeat',
    }
})
const CustomSelect = styled(Select)({
    '& .MuiInputLabel-root': {
        color: 'white',
        fontFamily: ['Raleway', 'sans-serif'].join(','),
    },
    '& .MuiSelect-root': {
        '& :hover': {
            backgroundColor: 'inherit',
            borderBottomColor: '#ffffff',

        },
    },
    '& .MuiSelect-icon': {
        color: 'white',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: '#ffffff',
        fontFamily: ['Raleway', 'sans-serif'].join(','),
    },
    '& .MuiInput-underline:hover:before': {
        borderBottomColor: '#ffffff',
        transition: 'none',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: '#ffffff'
    },
    '& .MuiInputBase-root-MuiInput-root-MuiSelect-root': {
        borderBottomColor: '#ffffff'
    },
    '& .MuiFormLabel-root-MuiInputLabel-root.Mui-focused': {
        color: '#ffffff',
        borderBottomColor: '#ffffff'
    },
    '& .MuiInputBase-input': {
        color: '#ffffff',
        fontSize: 'var(--step-0)',
        marginTop: '.3em',
        marginBottom: '-.4em',
        fontFamily: ['Raleway', 'sans-serif'].join(','),
    }
});
const CustomFormControl = styled(FormControl)({
    '& .MuiInputLabel-root': {
        color: 'white',
        marginBottom: '.3em',
        fontFamily: ['Raleway', 'sans-serif'].join(','),
    },
    '& .MuiInputLabel-root.Mui-focused': {
        color: 'white',
    },
    '& .MuiInput-underline:before': {
        borderBottomColor: 'white',
        marginBottom: '-.5em'
    },
    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
        borderBottomColor: 'white',
        transition: 'none',
    },
    '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
        marginBottom: '-.5em'
    },
})
export {SettingsTextField, SettingsButton, CustomFormTextField, FormButton, CustomSelect, CustomFormControl}
