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