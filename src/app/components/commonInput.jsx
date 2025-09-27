import React from "react";

export default function CommonInput(props) {

    return(
        <>
            <input className={`${props.inputClassName} h-8 md:h-10 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:shadow-lightGreen focus:outline-none`} 
                id={props.id} 
                autoComplete={props.autoComplete || undefined}
                type={props.type} 
                placeholder={props.placeholder} 
                onChange={props.onChange}
                onFocus={props.onFocus}
                disabled={props.disabled}
                onBlur={props.onBlur}
                value={props.value}
                name={props.name}
                htmlFor={props.htmlFor}
            />
            {props.isInvalid && 
                <div className="text-red-600 text-xs mt-2">{props.invalidMessage}</div>
            }
        </>
    );
} 