import React, { createContext, useEffect, useState } from "react";
import userService from "../services/userService";
import clinicalHistoryService from "../services/clinicalHistoryService";
import officesService from "../services/officesService";

export const Context = createContext();

export const Provider = ({ children }) => {
    const [isAlertActive, setIsAlertActive] = useState(false); 
    const [alertMessage, setAlertMessage] = useState('');
    const [alertStatus, setAlertStatus] = useState('');
    const [accessToken, setAccessToken] = useState(null);
    const [account, setAccount] = useState(null);
 
    const changeAlertStatusAndMessage = (activeAlert, status, message) => {
        setAlertMessage(message);
        setIsAlertActive(activeAlert);
        setAlertStatus(status);
    }

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userInfo');
        localStorage.removeItem('userRole');
        setAccessToken(null);
        setAccount(null);
    }

    const fetchUser = async (userId) => {
        try{
          const user = await userService.getUser(userId);
          setAccount(user);
        }catch(err) {
          console.log(err);
          changeAlertStatusAndMessage(true, 'error', 'El usurario no ha podido ser obtenido... Por favor recargue la página.')
        }
    } 

    useEffect(() => {
        const userInfo = JSON.parse(localStorage.getItem('userInfo'));
        if(localStorage.getItem('accessToken')) {
            setAccessToken(localStorage.getItem('accessToken'));
        }
        
        if(userInfo?.sub) {
            fetchUser(userInfo.sub);
        }
    }, [])
    

    return (
        <Context.Provider value={{
            isAlertActive,
            alertMessage,
            alertStatus,
            account,
            changeAlertStatusAndMessage,
            accessToken,
            setAccessToken,
            fetchUser,
            logout,
        }}>
            {children}
        </Context.Provider>
    );
}
