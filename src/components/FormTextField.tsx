import React, {SetStateAction} from "react";
import {SvgIconComponent} from "@mui/icons-material";
import MoodIcon from "@mui/icons-material/Mood";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockIcon from "@mui/icons-material/Lock";
import { CustomFormTextField } from '../MuiCustomComponents.ts'
import InputAdornment from "@mui/material/InputAdornment";
import SecurityIcon from '@mui/icons-material/Security';
interface FormTextFieldProps {
    label: string;
    variant?: 'filled' | 'outlined' | 'standard';
    prependInnerIcon: 'smile' | 'mail' | 'lock' | 'security';
    value: string;
    setValue: React.Dispatch<SetStateAction<string>>;
    type: string;
}
const iconMap: {[key: string]: SvgIconComponent } = {
    smile: MoodIcon,
    mail: MailOutlineIcon,
    lock: LockIcon,
    security: SecurityIcon,
}

function FormTextField({label, prependInnerIcon, variant, value, setValue, type} : FormTextFieldProps) {
    const InnerIcon = iconMap[prependInnerIcon]
    const handleChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
        setValue(event.target.value)
    }
    return (
        <CustomFormTextField value={value} type={type} placeholder={label} onChange={handleChange} variant={variant} className={"text-field"}
                             InputProps={{
                       startAdornment: (
                           <InputAdornment position={"start"}>
                               <InnerIcon className={"inner-icon"} />
                           </InputAdornment>
                       ),
                   }}>
        </CustomFormTextField>
    );
}
export default FormTextField