import React, { useState, useContext } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import userService from "@/app/services/userService";
import { Context } from "../../context/Context";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PassInput from "../passInput";
import { validPass, validEmail, newTheme } from "../../../../utils";
import PrimaryButton from "../primaryButton";
import { DatePicker } from "@mui/x-date-pickers";
import { ThemeProvider } from "@emotion/react";

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
    const [isLoading, setIsLoading] = useState(false);

    const { changeAlertStatusAndMessage } = useContext(Context);
    const router = useRouter();

    const register = async () => {
        try {
            setIsLoading(true);
            const fullUser = {
                password,
                email,
                firstName,
                lastName,
                postalCode,
                document,
                phoneNumber,
                birthDate,
                role: 'CLIENT',
                address,
                city,
            };
            const response = await userService.register(fullUser);
            if (response.accessToken) {
                localStorage.setItem('accessToken', response.accessToken);
                setIsLoading(false);
                router.push('/')
                changeAlertStatusAndMessage(true, 'success', 'Usuario registrado de manera exitosa!')
            }
        } catch (error) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'El usuario no ha podido ser registrado. Por favor inténtelo nuevamente.');
            console.log(error);
        }
    };

    const buttonDisabled = !validPass(password) || !validEmail(email);

    return (
        <ThemeProvider theme={newTheme}>
            <div className="grid content-center">
                <div className="text-gray-700 text-md md:text-lg mb-4">
                    Complete sus datos para registrarse
                    <br/>
                    <span className="text-sm md:text-lg text-gray-600 font-thin">Los campos marcados con * son obligatorios</span>
                </div>
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
                <div className="mb-4">
                    <PassInput
                        label="* Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        isInvalid={!validPass(password)}
                        invalidMessage="Debe contener al menos una minúscula, una mayúscula y un número."
                        placeholder="Contraseña"
                        type="password"
                        inputClassName="w-56"
                    />
                </div>
                <PrimaryButton 
                    buttonDisabled={buttonDisabled} 
                    onClick={() => register()} 
                    isLoading={isLoading} 
                    isLoadingText="Registrando usuario..." 
                    actionText="Registrarse" 
                />
                <button 
                    className="text-sm mt-6 text-blue-400 hover:text-blue-500 flex space-x-1 items-center" 
                    onClick={() => props.setSection('login')}
                >
                    <ArrowBackIosIcon fontSize="extraSmall"/> volver
                </button>
            </div>
        </ThemeProvider>
    );
}
