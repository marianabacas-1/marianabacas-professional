import React from "react";

export default function CommonTextarea(props) {
    return (
        <>
            <textarea
                className={`${props.inputClassName} h-20 md:h-32 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
                id={props.id}
                placeholder={props.placeholder}
                onChange={props.onChange}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                value={props.value}
                name={props.name}
                rows={props.rows || 3} // Fila predeterminada
                cols={props.cols} // Opcional
            />
            {props.isInvalid && 
                <div className="text-red-600 text-xs mt-1">{props.invalidMessage}</div>
            }
        </>
    );
}
