import React from "react";

export default function CommonLabel(props) {

    return(
        <>
            <label className={props.className ? props.className : "block text-gray-700 text-sm font-bold mb-2"}>
                {props.label}
            </label>
        </>
    );
} 