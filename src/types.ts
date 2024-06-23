import React, {SetStateAction} from "react";
export interface UserData {
    first_name: string,
    last_name: string,
    email: string,
}
interface Subjects {
    id: string,
    subject_full_name: string,
    subject_short_name: string
}
export interface SubjectsData {
    subjects: Array<Subjects>
    map(subjects: (item: Subjects, index: never) => void): never;
}
export interface DashboardPreloadData {
    userData: UserData,
    subjectsData: SubjectsData
}
export interface DataRow {
    id: number;
    name: string;
    surname: string;
    workNumber: number;
}
export interface SelectorProps {
    workNumber: string,
    setWorkNumber: React.Dispatch<SetStateAction<string>>,
}
export interface ResponseTable {
    first_name: string,
    last_name: string,
    task_number: number,
}
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
interface Pricing {
    type: string;
    price: string;
    options: Array<string>;
    style?: string;
    description: string;
}
export interface PricingProps extends PaymentProps, Pricing {}
export interface InfoCardProps {
    text: string;
    svgIcon: string;
    style?: string;
}
export interface PlanType {
    planName: string | undefined
}