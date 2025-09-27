import React from "react";
import MenuIcon from '@mui/icons-material/Menu';

export default function HamburgerButton({ onClick, className }) {
 
    return (
    <button onClick={onClick} className={`${className}`}>
        <MenuIcon fontSize="large" className="bg-secondaryWithOp2 rounded p-1" />
     </button>);
} 
