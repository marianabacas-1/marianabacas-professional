import React from "react";

export default function PrimaryButton(props) {

    return(
        <button disabled={props.buttonDisabled} className={`${props.buttonDisabled ? 'bg-gray-400 text-gray-700 shadow-inner' : 'bg-tertiary hover:bg-tertiaryInt hover:opacity-100'} px-4 py-2 rounded-lg shadow hover:shadow-inner`} onClick={props.onClick}>{props.isLoading ? (<><i className="fa fa-circle-o-notch fa-spin"></i><span className="ml-2">{props.isLoadingText}</span></>) : <span>{props.actionText}</span>}</button>
    );
} 