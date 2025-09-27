"use client";
import React, { useState, useEffect, useContext } from "react"
import CommonInput from "../components/commonInput"
import CommonLabel from "../components/commonLabel";
import { Context } from "../context/Context";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import userService from "../services/userService";
import { validPass, validEmail, sexOptions } from "../../../utils";
import PassInput from "../components/passInput";
import PrimaryButton from "../components/primaryButton";
import { DatePicker } from "@mui/x-date-pickers";
import WebTitle from "../components/webTitle";
import Select from "react-select";
import Checkbox from '@mui/material/Checkbox';
import dayjs from "dayjs";
import WebContainer from "../components/webContainer";
 
export default function Register(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState(null);
    const [document, setDocument] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState(dayjs(new Date()));;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repeatedPass, setRepeatedPass] = useState('');
    const { account, fetchUser, changeAlertStatusAndMessage } = useContext(Context);
    const [isLoading, setIsLoading] = useState(false);
    const [tabValue, setTabValue] = useState("1");

    const buttonDisabled = (email === '') || (firstName === '') || (lastName === '');

    const editUser = async (imageUrl) => {
        const userInfo = {
            email,
            firstName,
            lastName,
            document,
            phoneNumber,
            birthDate,
            address,
            city,
        };
    try{
            setIsLoading(true);
            const userId = account._id;
            await userService.updateUser(userId, userInfo);
            await getUser(account._id);
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'success', 'Usuario editado con éxito!')
          }catch(err) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'Tu usuario no ha podido ser editado... Por favor recargue la página.')
          }
    }

    const getUser = async (userId) => {
        try{
            await fetchUser(userId);
          }catch(err) {
            changeAlertStatusAndMessage(true, 'error', 'El usuario no ha podido ser obtenido... Por favor recargue la página.')
          }
    }

    const authUser = async () => {
        try{
            await userService.auth({email, password});
        }catch(err) {
            changeAlertStatusAndMessage(true, 'error', 'Contraseña incorrecta... Por favor intentelo nuevamente.');
            throw err;
        }
    }

    const theme = createTheme({
        palette: {
            primary: {
            main: '#48A9A6'
            }
        },
        components: {
          MuiPickersDay: {
              styleOverrides: {
                root: {
                  color: '#C1666B',
                  borderRadius: 20,
                  borderWidth: 0,
                  borderColor: '#C1666B',
                  border: '0px solid',
                  backgroundColor: '#C1666B',
                }
              }
          },
          MuiPickersMonth: {
              styleOverrides: {
                  root: {
                    color: '#C1666B',
                    borderRadius: 20,
                    borderWidth: 0,
                    borderColor: '#C1666B',
                    border: '0px solid',
                    backgroundColor: '#C1666B',
                  },
                  monthButton: {
                      color: '#C1666B',
                      borderRadius: 20,
                      borderWidth: 0,
                      borderColor: '#C1666B',
                      border: '0px solid',
                      backgroundColor: '#C1666B',
                    }
              }
          }
        }
    });

    const changePass = async () => {
        let failedAuth = true;
        setIsLoading(true);
        try{
            await authUser();
            failedAuth = false;
            await userService.changePass({email, newPassword: newPass});
            changeAlertStatusAndMessage(true, 'success', 'Contraseña modificada exitosamente!');
            setIsLoading(false);
            setPassword('');
            setNewPass('');
            setRepeatedPass('');
        }catch(err) {
            if(!failedAuth) changeAlertStatusAndMessage(true, 'error', 'La operación no pudo realizarse... Por favor intentelo nuevamente.');
            setIsLoading(false);
        }
    }

    const changePassButtonDisabled = !validPass(password) || !validPass(newPass) || !validPass(repeatedPass) || (newPass !== repeatedPass);

    const handleChangeTabValue = (_, newValue) => setTabValue(newValue);

    useEffect(() => {
        if(account) {
            setEmail(account?.email || '');
            setFirstName(account?.firstName || '');
            setLastName(account?.lastName || '');
            setDocument(account?.document || '');
            setPhoneNumber(account?.phoneNumber || '');
            setBirthDate(dayjs(account?.birthDate) || dayjs(new Date()));
            setAddress(account?.address || '');
            setCity(account?.city || '');
        }else {
            if(JSON.parse(localStorage.getItem('userInfo'))) {
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                getUser(userInfo.sub);
            }
        }
    }, [])

    useEffect(() => {
        setEmail(account?.email || '');
        setFirstName(account?.firstName || '');
        setLastName(account?.lastName || '');
        setDocument(account?.document || '');
        setPhoneNumber(account?.phoneNumber || '');
        setBirthDate(dayjs(account?.birthDate) || dayjs(new Date()));
        setAddress(account?.address || '');
        setCity(account?.city || '');  
    }, [account])

    return (
        <WebContainer>
            <WebTitle text="Gestión de cuenta" />
            <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} className="w-full">
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <TabList
                            onChange={handleChangeTabValue}
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{
                                '& .MuiTab-root': { 
                                  fontWeight: 'bold', 
                                  textTransform: 'none', 
                                  minWidth: 100, 
                                  color: 'gray', 
                                  borderRadius: '10px 10px 0px 0px',
                                  position: 'relative',
                            
                                  backgroundImage: 'linear-gradient(to right, black 100%, transparent 0)',
                                  backgroundRepeat: 'no-repeat',
                                  backgroundSize: '0% 100%',
                                  transition: 'background-size 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out',
                            
                                  '&:hover': { 
                                    color: 'white', 
                                    backgroundColor: 'rgba(0, 0, 0, 0.6)' 
                                  },
                            
                                  '&.Mui-selected': { 
                                    color: 'white',
                                    backgroundColor: 'rgba(0, 0, 0, 1)',
                                    backgroundSize: '100% 100%', 
                                  },
                            
                                  '&:not(.Mui-selected)': {
                                    backgroundSize: '0% 100%', 
                                  }
                                },
                                '& .MuiTabs-indicator': { backgroundColor: 'transparent' }
                              }}
                            >
                            <Tab label="Mi cuenta" value="1" />
                            <Tab label="Cambiar contraseña" value="2" />
                        </TabList>
                        </Box>
                        <TabPanel className="pt-8 md:w-4/6 md:mx-auto" value="1">
                                <div className="rounded-xl shadow-secondarySh">
                                    <div className="text-gray-700 bg-secondaryWithOp2 rounded-t-xl text-2xl md:text-3xl w-full py-6 text-center">Mi cuenta</div>
                                    <div className="p-7 md:p-10">
                                     <div className="mb-4">
                                        <CommonLabel label="* Nombre" />
                                        <CommonInput
                                            value={firstName}
                                            onChange={(e) => setFirstName(e.target.value)}
                                            placeholder="Nombre"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="* Apellido" />
                                        <CommonInput
                                            value={lastName}
                                            onChange={(e) => setLastName(e.target.value)}
                                            placeholder="Apellido"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="* Correo electrónico" />
                                        <CommonInput
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            isInvalid={!validEmail(email)}
                                            invalidMessage="Debe poseer formato de email."
                                            placeholder="Correo electrónico"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Documento" />
                                        <CommonInput
                                            value={document}
                                            onChange={(e) => setDocument(e.target.value)}
                                            placeholder="Documento"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Teléfono" />
                                        <CommonInput
                                            value={phoneNumber}
                                            onChange={(e) => setPhoneNumber(e.target.value)}
                                            placeholder="Teléfono"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Fecha de Nacimiento" />
                                        <DatePicker
                                            label="Fecha de Nacimiento"
                                            className="w-full"
                                            value={birthDate}
                                            onChange={(newValue) => setBirthDate(newValue)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Dirección" />
                                        <CommonInput
                                            value={address}
                                            onChange={(e) => setAddress(e.target.value)}
                                            placeholder="Dirección"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Ciudad" />
                                        <CommonInput
                                            value={city}
                                            onChange={(e) => setCity(e.target.value)}
                                            placeholder="Ciudad"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <CommonLabel label="Código Postal" />
                                        <CommonInput
                                            value={postalCode}
                                            onChange={(e) => setPostalCode(e.target.value)}
                                            placeholder="Código Postal"
                                            type="text"
                                            inputClassName="w-56"
                                        />
                                    </div>
                                        <div className="w-full py-3 justify-center md:justify-end flex-wrap">
                                        <PrimaryButton buttonDisabled={buttonDisabled} onClick={() => editUser()} isLoading={isLoading} isLoadingText="Editando datos..." actionText="Editar datos" />
                                    </div>
                                </div>
                            </div>
                        </TabPanel>
                        <TabPanel className="pt-8 md:w-4/6 md:mx-auto" value="2">
                            <div className="rounded-xl shadow-secondarySh">
                                <div className="text-gray-700 bg-secondaryWithOp2 rounded-t-xl text-2xl md:text-3xl w-full py-6 text-center">Cambiar contraseña</div>
                                <div className="p-7 md:p-10">
                                    <div className="mb-4">
                                        <PassInput 
                                            label="Contraseña actual"
                                            value={password}
                                            isInvalid={!validPass(password)}
                                            invalidMessage={!validPass(password) ? "Debe contener al menos una minúscula, una mayúscula y un número." : ((newPass !== repeatedPass) ? "Las contraseñas deben coincidir" : '')}
                                            name="password"
                                            htmlFor="password"
                                            inputClassName="w-56"
                                            id="password"
                                            placeholder="Contraseña actual" 
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <PassInput 
                                            label="Nueva contraseña"
                                            value={newPass}
                                            isInvalid={!validPass(newPass)}
                                            invalidMessage={!validPass(newPass) ? "Debe contener al menos una minúscula, una mayúscula y un número." : ((newPass !== repeatedPass) ? "Las contraseñas deben coincidir" : '')}
                                            name="password"
                                            htmlFor="password"
                                            inputClassName="w-56"
                                            id="password"
                                            placeholder="Nueva contraseña" 
                                            onChange={(e) => setNewPass(e.target.value)}
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <PassInput 
                                            label="Repita nueva contraseña"
                                            value={repeatedPass}
                                            isInvalid={!validPass(repeatedPass)}
                                            invalidMessage={!validPass(repeatedPass) ? "Debe contener al menos una minúscula, una mayúscula y un número." : ((newPass !== repeatedPass) ? "Las contraseñas deben coincidir" : '')}
                                            name="password"
                                            htmlFor="password"
                                            inputClassName="w-56"
                                            id="password"
                                            placeholder="Repita nueva contraseña" 
                                            onChange={(e) => setRepeatedPass(e.target.value)}
                                        />
                                    </div>
                                    {((newPass !== repeatedPass) && (newPass !=='') && (repeatedPass !== '')) && (<div className="text-red-500 text-sm md:text-md mb-4">Las contraseñas no coinciden</div>)}
                                    <PrimaryButton buttonDisabled={changePassButtonDisabled} onClick={() => changePass()} isLoading={isLoading} isLoadingText="Cambiando contraseña..." actionText="Cambiar contraseña" />
                                </div>
                            </div>
                        </TabPanel>
                    </TabContext>
                </Box>
            </ThemeProvider>
        </WebContainer>
    )
}
