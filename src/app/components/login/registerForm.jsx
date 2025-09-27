import React, { useState, useContext, useEffect } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import userService from "@/app/services/userService";
import { Context } from "../../context/Context";
import dayjs from "dayjs";
import { useRouter } from 'next/navigation'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PassInput from "../passInput";
import { validPass, validEmail, newTheme, rolesList } from "../../../../utils";
import PrimaryButton from "../primaryButton";
import { DatePicker } from "@mui/x-date-pickers";
import { ThemeProvider } from "@emotion/react";
import Select from 'react-select';
import Checkbox from '@mui/material/Checkbox';

export default function Register(props) {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [postalCode, setPostalCode] = useState(null);
    const [document, setDocument] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [role, setRole] = useState({value: 'CLIENT', label: 'Cliente'});
    const [birthDate, setBirthDate] = useState(dayjs(new Date()));;
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [changePass, setChangePass] = useState(false);

    const { changeAlertStatusAndMessage } = useContext(Context);
    const router = useRouter();

    const emitRegister = async () => {
        const regsiterInfo = {
            email,
            firstName,
            lastName,
            postalCode,
            document,
            phoneNumber,
            birthDate,
            role: role.value,
            address,
            city,
        }
        if(password) {
            console.log(password);
            regsiterInfo.password = password;
        }
        if(props.editMode) {
            let usr = {
                ...regsiterInfo,
                id: props.userToEdit.id
            }
            props.emitEdition(usr);
        }else {
            props.emitRegister(regsiterInfo);
        }
    };

    const buttonDisabled = props.editMode ? !validEmail(email) || !firstName || !lastName : !validPass(password) || !validEmail(email) || !firstName || !lastName;

    useEffect(() => {
        if(props.editMode && props.userToEdit) {
            console.log(props.userToEdit);
            setEmail(props.userToEdit.email);
            setFirstName(props.userToEdit.firstName);
            setLastName(props.userToEdit.lastName);
            setPostalCode(props.userToEdit.postalCode);
            setDocument(props.userToEdit.document);
            setPhoneNumber(props.userToEdit.phoneNumber);
            setRole(rolesList.find(role => role.value === props.userToEdit.role));
            setBirthDate(dayjs(props.userToEdit.birthDate));
            setAddress(props.userToEdit.address);
            setCity(props.userToEdit.city);
        }
    }, [])

    useEffect(() => {
        props.emitButtonDisabled(buttonDisabled);
      }, [buttonDisabled]);

    useEffect(() => {
    const timeout = setTimeout(() => {
        emitRegister();
    }, 400);
    
    return () => clearTimeout(timeout);
    }, [email, password, firstName, lastName, postalCode, document, phoneNumber, birthDate, role, address, city]);
    

    return (
        <>
            <div className="mb-4">
                <span className="text-sm text-gray-600 font-thin">Los campos marcados con * son obligatorios</span>
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
                <CommonLabel label="Rol" />
                <Select
                    options={rolesList}
                    value={role}
                    onChange={(e) => setRole(e)}
                    placeholder="Rol"
                    className="w-full text-gray-700"
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
            {props.editMode ? (<>
                <div className="flex items-center mt-2">
                    <Checkbox checked={changePass} onChange={(e) => setChangePass(e.target.checked)} sx={{
                        color: '#C1666B',
                        '&.Mui-checked': {
                        color: '#C1666B',
                        },
                    }}/>
                    <div className="text-gray-500 text-sm font-bold mr-2">Cambiar contraseña</div>
                </div>
                {changePass && 
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
                }
            </>) : (<div className="mb-4">
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
            </div>)}
        </>
    );
}
