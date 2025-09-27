import React, { useState, useEffect } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import { validEmail, rolesList } from "../../../../utils";
import { DatePicker } from "@mui/x-date-pickers";
import Checkbox from '@mui/material/Checkbox';
import dayjs from "dayjs";
import Select from 'react-select';

export default function EditUserModal(props) { 
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [document, setDocument] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState(dayjs(new Date()));;
    const [ocupation, setOcupation] = useState('');
    const [medicalCoverage, setMedicalCoverage] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [familyDoctor, setFamilyDoctor] = useState('');
    const [firstTime, setFirstTime] = useState(true);
    const [weight, setWeight] = useState(0);
    const [role, setRole] = useState({});
    const [height, setHeight] = useState(0);

    const buttonDisabled = !validEmail(email) || (firstName === '') || (lastName === '');

    const isDisabled = () => {
        props.isDisabled(buttonDisabled);
        const fullUser = {
            email,
            firstName,
            lastName,
            document,
            phoneNumber,
            birthDate,
            ocupation,
            medicalCoverage,
            membershipNumber,
            address,
            city,
            role: role.value,
            familyDoctor,
            weight,
            height,
            firstTime
        };
        props.getFullUser(fullUser);
    }

    useEffect(() => {
        isDisabled();
    }, [buttonDisabled,
        email,
        firstName,
        lastName,
        document,
        phoneNumber,
        birthDate,
        ocupation,
        medicalCoverage,
        role,
        membershipNumber,
        address,
        city,
        familyDoctor,
        weight,
        firstTime,
        height
    ])

    useEffect(() => {
        setEmail(props.userToEdit?.email || '');
        setFirstName(props.userToEdit?.firstName || '');
        setLastName(props.userToEdit?.lastName || '');
        setDocument(props.userToEdit?.document || '');
        setPhoneNumber(props.userToEdit?.phoneNumber || '');
        setBirthDate(dayjs(props.userToEdit?.birthDate) || dayjs(new Date()));
        setOcupation(props.userToEdit?.ocupation || '');
        setMedicalCoverage(props.userToEdit?.medicalCoverage || '');
        setMembershipNumber(props.userToEdit?.membershipNumber || '');
        setAddress(props.userToEdit?.address || '');
        setCity(props.userToEdit?.city || '');
        setFamilyDoctor(props.userToEdit?.familyDoctor || '');
        setFirstTime(props.userToEdit?.firstTime);
        setWeight(props.userToEdit?.weight || 0);
        setHeight(props.userToEdit?.height || 0);
        setRole(rolesList.find(rl => rl.value === props.userToEdit?.role))
    }, [])


    return (
        <div className="bg-white px-7 md:px-14 py-5">
            <div className="mb-4">
                <CommonLabel label="Nombre" />
                <CommonInput    
                    value={firstName}
                    name="firstName"
                    htmlFor="firstName"
                    id="firstName"
                    type="text" 
                    placeholder="Nombre" 
                    inputClassName="w-56"
                    onChange={(e) => setFirstName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Apellido" />
                <CommonInput    
                    value={lastName}
                    name="lastName"
                    htmlFor="lastName"
                    id="lastName"
                    type="text" 
                    placeholder="Apellido" 
                    inputClassName="w-56"
                    onChange={(e) => setLastName(e.target.value)}
                />
            </div>
            <div className="mb-4">
                <CommonLabel label="Correo electrónico"  />
                <CommonInput    
                    value={email}
                    name="email"
                    htmlFor="email"
                    id="email"
                    type="text" 
                    placeholder="Correo electrónico" 
                    inputClassName="w-56"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mb-4">
                    <CommonLabel label="Documento"  />
                    <CommonInput    
                        value={document}
                        name="document"
                        htmlFor="document"
                        id="document"
                        type="text" 
                        placeholder="Documento" 
                        inputClassName="w-56"
                        onChange={(e) => setDocument(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Teléfono"  />
                    <CommonInput    
                        value={phoneNumber}
                        name="phoneNumber"
                        htmlFor="phoneNumber"
                        id="phoneNumber"
                        type="text" 
                        placeholder="Teléfono" 
                        inputClassName="w-56"
                        onChange={(e) => setPhoneNumber(e.target.value)}
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
                    <CommonLabel label="Ocupación" />
                    <CommonInput
                        value={ocupation}
                        name="ocupation"
                        htmlFor="ocupation"
                        id="ocupation"
                        type="text"
                        placeholder="Ocupación"
                        inputClassName="w-56"
                        onChange={(e) => setOcupation(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Cobertura Médica" />
                    <CommonInput
                        value={medicalCoverage}
                        name="medicalCoverage"
                        htmlFor="medicalCoverage"
                        id="medicalCoverage"
                        type="text"
                        placeholder="Cobertura Médica"
                        inputClassName="w-56"
                        onChange={(e) => setMedicalCoverage(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Número de afiliado" />
                    <CommonInput
                        value={membershipNumber}
                        name="membershipNumber"
                        htmlFor="membershipNumber"
                        id="membershipNumber"
                        type="text"
                        placeholder="Número de afiliado"
                        inputClassName="w-56"
                        onChange={(e) => setMembershipNumber(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Dirección" />
                    <CommonInput
                        value={address}
                        name="address"
                        htmlFor="address"
                        id="address"
                        type="text"
                        placeholder="Dirección"
                        inputClassName="w-56"
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Ciudad" />
                    <CommonInput
                        value={city}
                        name="city"
                        htmlFor="city"
                        id="city"
                        type="text"
                        placeholder="Ciudad"
                        inputClassName="w-56"
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Médico de Cabecera" />
                    <CommonInput
                        value={familyDoctor}
                        name="familyDoctor"
                        htmlFor="familyDoctor"
                        id="familyDoctor"
                        type="text"
                        placeholder="Médico de Cabecera"
                        inputClassName="w-56"
                        onChange={(e) => setFamilyDoctor(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Peso (kg)" />
                    <CommonInput
                        value={weight}
                        name="weight"
                        htmlFor="weight"
                        id="weight"
                        type="number"
                        placeholder="Peso"
                        inputClassName="w-56"
                        onChange={(e) => setWeight(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Altura (cm)" />
                    <CommonInput
                        value={height}
                        name="height"
                        htmlFor="height"
                        id="height"
                        type="number"
                        placeholder="Altura"
                        inputClassName="w-56"
                        onChange={(e) => setHeight(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Perfil" />
                    <Select value={role} className="text-gray-700" onChange={(rl) => setRole(rl)} options={rolesList} />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Situación del paciente" />        
                    <div className="flex items-center mt-2">
                        <Checkbox checked={firstTime} onChange={(e) => setFirstTime(e.target.checked)} sx={{
                            color: '#C1666B',
                            '&.Mui-checked': {
                            color: '#C1666B',
                            },
                        }}/>
                        <div className="text-gray-500 text-sm font-bold mr-2">Primera vez</div>
                    </div>
                </div>
        </div>
    )
}
