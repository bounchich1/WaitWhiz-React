import {
    Chip,
    InputLabel, MenuItem,
    Paper, SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";
import '../css/DashBoard.css'
import {useLoaderData} from "react-router-dom";
import {DashboardPreloadData, DataRow, SelectorProps, ResponseTable} from "../types.ts";
import {useState} from "react";
import {createAxiosInstance} from "../axiosInstance.ts";
import landingLogo from '../assets/svg/landing_logo.svg';
import userProfile from '../assets/svg/temporary_dashboard.svg'
import { CustomSelect, CustomFormControl, FormButton } from '../Logic.ts'
function createData(name: string, surname: string, workNumber: number, id: number): DataRow {
    return { id, name, surname, workNumber };
}
const styles = {
    chips: {
        height: '40px',
        width: 'fit-content',
        backgroundColor: '#3F314E',
        color: '#ffffff',
        fontWeight: '550',
        fontSize: 'var(--step-0)',
        outline: 'none',
        border: '0',
        marginRight: '1em',
        marginLeft: '1em',
        alignSelf: 'center',
        transition: 'none',
        '& :hover': {
            backgroundColor: '#3F314E',
            borderRadius: '10px',
            outline: '2px solid white',
            transition: 'none',
        },
    },
    selectedChip: {
        height: '40px',
        width: 'fit-content',
        backgroundColor: '#3F314E',
        color: '#ffffff',
        fontWeight: '550',
        fontSize: 'var(--step-0)',
        borderRadius: '10px',
        outline: '2px solid white',
        marginRight: '1em',
        marginLeft: '1em',
        alignSelf: 'center',
        transition: 'none',
    }
}
async function fetchTableData(subjectId: string): Promise<DataRow[]> {
    const endpoint = `http://127.0.0.1:8000/infoqueue/get_queue/${subjectId}`;
    const rows: DataRow[] = [];
    try {
        const response = await createAxiosInstance().get(endpoint);
        response.data.forEach((value: ResponseTable, index: number) => {
            rows.push(createData(value.first_name, value.last_name, value.task_number, index + 1));
        });
    } catch (error) {
        console.error(error);
    }
    return rows;
}

interface CustomTableProps {
    rows: DataRow[];
}

function CustomTable({ rows }: CustomTableProps) {
    return (
        <TableContainer component={Paper} className={'custom-width grid-layout'} sx={{height: 'fit-content', borderRadius: '10px'}}>
            <Table sx={{ minWidth: 650, maxHeight: 50, borderRadius: '10px'}} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" sx={{width: '5%', backgroundColor: '#FEA800E2'}}></TableCell>
                        <TableCell align="center" sx={{backgroundColor: '#FEA800E2', fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-2)', color: '#ffffff', fontWeight: '600'}}>Имя</TableCell>
                        <TableCell align="center" sx={{backgroundColor: '#FEA800E2' , fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-2)', color: '#ffffff', fontWeight: '600'}}>Фамилия</TableCell>
                        <TableCell align="center" sx={{backgroundColor: '#FEA800E2' , fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-2)', color: '#ffffff', fontWeight: '600'}}>Номер работы</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody sx={{maxHeight: '30px'}}>
                    {rows.map((row) => (
                        <TableRow
                            key={row.id}
                            sx={{ 'td, th': {justifyContent: 'center', borderTop: '2px solid #FEA800', borderBottom: 'none', borderRight: '2px solid #FEA800', textAlign: 'center'}, justifyContent: 'center', alignContent: 'center' }}>
                            <TableCell component="th" scope="row" sx={{backgroundColor: '#3F314E', fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-1)', color: '#ffffff', fontWeight: '600'}}>
                                {row.id}
                            </TableCell>
                            <TableCell align="right"  sx={{backgroundColor: '#3F314E', justifyContent: 'center', fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-1)', color: '#ffffff', fontWeight: '600', height: 'auto', maxHeight: '30px'}}>{row.name}</TableCell>
                            <TableCell align="right"  sx={{backgroundColor: '#3F314E', justifyContent: 'center', alignSelf: 'center', fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-1)', color: '#ffffff', fontWeight: '600', height: 'auto', maxHeight: '30px'}}>{row.surname}</TableCell>
                            <TableCell align="right"  sx={{borderRight: 'none !important', backgroundColor: '#3F314E', justifyContent: 'center', fontFamily: 'Raleway, sans-serif', fontSize: 'var(--step-1)', color: '#ffffff', fontWeight: '600', height: 'auto', maxHeight: '30px'}}>{row.workNumber}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
function Selector({workNumber, setWorkNumber}: SelectorProps) {
    const handleChange = (event: SelectChangeEvent<string>) => {
        setWorkNumber(event.target.value);
    }
    return (
        <>
            <div>
                <CustomFormControl variant="standard" sx={{ m: 1, minWidth: 200}}>
                    <InputLabel>Номер работы</InputLabel>
                    <CustomSelect
                        value={workNumber}
                        // @ts-expect-error Исправить!! Не влияет на работоспособность
                        onChange={handleChange}
                        label="Номер работы"
                    >
                        {Array.from( {length: 8}, (_, i) => i + 1).map((num) => (
                            <MenuItem key={num} value={num.toString()}>{num}</MenuItem>))}
                    </CustomSelect>
                </CustomFormControl>
            </div>
        </>
    )
}
export function Dashboard() {
    const { userData, subjectsData } = useLoaderData() as DashboardPreloadData;
    const [tableData, setTableData] = useState<DataRow[]>([]);
    const [selectedChip, setSelectedChip] = useState<string | null>(null)
    const [currentFullName, setCurrentFullName] = useState('')
    const [workNumber, setWorkNumber] = useState('')
    const [currentId, setCurrentId] = useState('')
    const handleChipClick = async (id: string) => {
        subjectsData.map((item) => {
           if (item.id === id) {
               setCurrentFullName(item.subject_full_name)
           }
       })
        setCurrentId(id)
        setSelectedChip(id)
        const newTableData = await fetchTableData(id);
        setTableData(newTableData);
    }
    const handleJoinQueue = async () => {
        const endpoint = `http://127.0.0.1:8000/infoqueue/add_to_queue/`;
        const rows: DataRow[] = [];
        const formData = {
            task_number: parseInt(workNumber, 10),
            subject_number: currentId,
        }
        const response = await createAxiosInstance().post(endpoint, formData)
        response.data.forEach((value: ResponseTable, index: number) => {
            rows.push(createData(value.first_name, value.last_name, value.task_number, index + 1));
        });
        setTableData(rows)
    }
    const handleCompleteQueue = async () => {
        const rows: DataRow[] = [];
        const endpoint = `http://127.0.0.1:8000/infoqueue/complete/${currentId}`;
        const response = await createAxiosInstance().delete(endpoint)
        response.data.forEach((value: ResponseTable, index: number) => {
            rows.push(createData(value.first_name, value.last_name, value.task_number, index + 1));
        });
        setTableData(rows)
    }

    return (
        <>
            <div>
                <div className={'logout'}>
                    <h4 className={'logout-h4 logout-gradient-1'}>На главную</h4>
                    <h4 className={'logout-h4 logout-gradient-2'}>Выйти</h4>
                </div>
                <div className={'top-menu-container-2'}>
                    <div className={'logo-container-2'}>
                       <img src={landingLogo} alt={'logo'} />
                        <h3 className={'logo-h3'}>WAIT WHIZ</h3>
                    </div>
                    <div className={'chips-card'}>
                        {subjectsData.map((item, index) => (
                            <Chip sx={selectedChip === item.id ? styles.selectedChip: styles.chips} key={index} label={item.subject_short_name} variant="outlined" onClick={() => handleChipClick(item.id)} />
                        ))}
                    </div>
                </div>
                <div className={'general-h1-container'}>
                    <h1 className={'general-h1'}>{currentFullName}</h1>
                </div>

                <div className={'grid-container'}>
                    <CustomTable rows={tableData}/>
                    <div className={'card user-info-width grid-layout'}>
                        <h2 className={'profile-h2'}>Профиль</h2>
                        <img src={userProfile} alt={'profile picture'}/>
                        <div className={'user-name-container'}>
                            <h2 className={'profile-name'}>{userData.first_name}</h2>
                            <h2 className={'profile-name'}>{userData.last_name}</h2>
                        </div>
                        <h3 className={'profile-email'}>Студент</h3>
                        <h3 className={'profile-email'}>Email: {userData.email}</h3>
                    </div>
                    <div className={'card width-1 grid-layout'}>
                        <Selector workNumber={workNumber} setWorkNumber={setWorkNumber} />
                        <div>
                            <FormButton className={'buttons'} onClick={handleJoinQueue}>Встать в очередь</FormButton>
                            <FormButton className={'buttons'} onClick={handleCompleteQueue}>Выйти из очереди</FormButton>
                        </div>
                    </div>
                    <div className={'card width-2 grid-layout'}>
                        <h2 className={'rules-h2'}>Правила: </h2>
                    </div>
                </div>

            </div>
        </>
    );
}