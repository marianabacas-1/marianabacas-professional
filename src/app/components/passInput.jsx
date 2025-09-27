import React, { useState } from "react";
import CommonInput from "./commonInput";
import CommonLabel from "./commonLabel";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

export default function PassInput(props) {
    const [showPass, setShowPass] = useState(false); 

    return(
        <>
            <CommonLabel label={props.label} />
            {!showPass && (<div className="input-icon"><CommonInput 
                id={props.id} 
                type="password" 
                placeholder={props.placeholder} 
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                autoComplete={props.autoComplete || undefined}
                value={props.value}
                name={props.name}
                htmlFor={props.htmlFor}
            /><button onClick={() => setShowPass(!showPass)} className="ml-2"><VisibilityOffIcon color="action" /></button></div>)}
            {showPass && (<div className="input-icon"><CommonInput 
                id={props.id} 
                type="text"
                placeholder={props.placeholder} 
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                autoComplete={props.autoComplete || undefined}
                value={props.value}
                name={props.name}
                htmlFor={props.htmlFor}
            /><button onClick={() => setShowPass(!showPass)} className="ml-2"><VisibilityIcon color="action" /></button></div>)}
            {props.isInvalid && 
                <div className="text-red-600 text-xs mt-1">{props.invalidMessage}</div>
            }
        </>
    );
} 