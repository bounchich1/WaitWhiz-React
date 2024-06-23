import {createAxiosInstance} from "./axiosInstance.ts";
import {DashboardPreloadData, SubjectsData, UserData} from "./types.ts";
export const fetchSubjectsData = async (): Promise<SubjectsData> => {
    const fetch = createAxiosInstance()
    let exportSubjectData: SubjectsData | undefined
    const endpoint = `http://127.0.0.1:8000/infoqueue/get_subjects/`
    await fetch.get(endpoint).then((response) => {
        exportSubjectData = response.data
    }).catch((error) => {
        console.error(error)
    })
    console.log(exportSubjectData)
    if (exportSubjectData === undefined) {
        throw new Error('Не удалось получить данные о предметах')
    }
    return exportSubjectData
}
export const FetchUserData = async (): Promise<UserData> => {
    const endpoint = `http://127.0.0.1:8000/users/me/`
    const fetch = createAxiosInstance()
    let exportUserData: UserData | undefined
    await fetch.get(endpoint).then((response) => {
        exportUserData = response.data
        console.log(exportUserData)
    }).catch((error) => {
        console.error(error)
    })
    if (exportUserData === undefined) {
        throw new Error('Не удалось получить данные текущего пользователя')
    }
    return exportUserData
}

export const DashboardLoader = async (): Promise<DashboardPreloadData> => {
    const [userData, subjectsData] = await Promise.all([FetchUserData(), fetchSubjectsData()]);
    return {userData, subjectsData}
}