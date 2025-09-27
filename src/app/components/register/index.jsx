import React, { useState, useEffect, useContext } from "react";
import CommonInput from "../commonInput";
import CommonLabel from "../commonLabel";
import PassInput from "../passInput";
import Select from 'react-select';
import dayjs from "dayjs";
import { rolesList, validPass, sexOptions, newTheme } from "../../../../utils";
import { DatePicker } from "@mui/x-date-pickers";
import { ThemeProvider } from "@emotion/react";
import Checkbox from '@mui/material/Checkbox';
import professionService from "@/app/services/professionService";
import { Context } from "@/app/context/Context";

export default function Register(props) {
    const [professions, setProfessions] = useState([]);
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [firstTime, setFirstTime] = useState(false);
    const [document, setDocument] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [birthDate, setBirthDate] = useState(dayjs(new Date()));;
    const [sex, setSex] = useState('');
    const [ocupation, setOcupation] = useState('');
    const [medicalCoverage, setMedicalCoverage] = useState('');
    const [membershipNumber, setMembershipNumber] = useState('');
    const [address, setAddress] = useState('');
    const [customGender, setCustomGender] = useState(false);
    const [city, setCity] = useState('');
    const [familyDoctor, setFamilyDoctor] = useState('');
    const [weight, setWeight] = useState(0);
    const [sessionDuration, setSessionDuration] = useState(40);
    const [profession, setProfession] = useState('');
    const [height, setHeight] = useState(0);
    const [professionalId, setProfessionalId] = useState('');
    const [role, setRole] = useState({
        label: 'Paciente',
        value: 'OPERATOR'
    });
    const { changeAlertStatusAndMessage } = useContext(Context);
    const buttonDisabled = (password === "") || (email === '') || (firstName === '') || (lastName === '') || (document === '') || ((role === 'ADMIN') || (role === 'MASTERADMIN'));

    const isDisabled = () => {
        props.isDisabled(buttonDisabled);
        let fullUser = {
            password,
            email,
            firstName,
            lastName,
            document,
            phoneNumber,
            birthDate,
            sex,
            ocupation,
            medicalCoverage,
            membershipNumber,
            firstTime,
            address,
            city,
            role: props.loadedByProfessional ? 'OPERATOR' : role.value,
            familyDoctor,
            professionalId: professionalId,
            weight,
            height,
        };
        if((fullUser.role === 'ADMIN') || (fullUser.role === 'MASTERADMIN')) {
            fullUser.profession = profession;
            fullUser.sessionDuration = sessionDuration;
        }
        
        props.getFullUser(fullUser);
    };

    const getProfessions = async () => {
        try{
            const professionsList = await professionService.getProfessions();
            professionsList.map(prf => {
                prf.label = prf.name,
                prf.value = prf._id
            });
            setProfessions(professionsList);
        }catch(err) {
            console.log(err);
            changeAlertStatusAndMessage(true, 'error', 'Las especialidades no han podido ser obtenidos... Por favor recargue la página.')
        }
    } 

    useEffect(() => {        
        isDisabled();
    }, [buttonDisabled, email, firstName, lastName, document, phoneNumber, role, birthDate,
        sex,
        ocupation,
        medicalCoverage,
        membershipNumber,
        address,
        city,
        familyDoctor,
        sessionDuration,
        firstTime,
        profession,
        weight,
        height]);

    useEffect(() => {
      const getAllProfessions = async () => {
        await getProfessions();
      }
      getAllProfessions();
    }, [])
    

    return (
        <ThemeProvider theme={newTheme}>
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
                    <CommonLabel label="Correo electrónico" />
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
                    <CommonLabel label="Contraseña" />
                    <PassInput
                        value={password}
                        inputClassName="w-56 rounded-l"
                        name="password"
                        htmlFor="password"
                        isInvalid={!validPass(password)}
                        invalidMessage="Debe contener al menos una minúscula, una mayúscula y un número."
                        id="password"
                        type="text"
                        placeholder="Contraseña"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Documento" />
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
                    <CommonLabel label="Teléfono" />
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
                    <CommonLabel label="Género" />        
                    {!customGender && <Select className="text-gray-700" onChange={(sx) => setSex(sx.value)} options={sexOptions} />}
                    <div className="flex items-center mt-2">
                        <Checkbox checked={customGender} onChange={(e) => setCustomGender(e.target.checked)} sx={{
                            color: '#C1666B',
                            '&.Mui-checked': {
                            color: '#C1666B',
                            },
                        }}/>
                        <div className="text-gray-500 text-sm font-bold mr-2">Personalizado</div>
                    </div>
                </div>
                {customGender && (
                    <div className="mb-4">
                       <CommonLabel label="Me identifico como" />
                       <CommonInput
                           onChange={(e) => setSex(e.target.value)}
                           placeholder="Me identifico como"
                           type="text"
                           inputClassName="w-56"
                       />
                   </div>
                )}
                <div className="mb-4">
                    <CommonLabel label="Ocupación" />
                    <CommonInput
                        value={ocupation}
                        onChange={(e) => setOcupation(e.target.value)}
                        placeholder="Ocupación"
                        type="text"
                        inputClassName="w-56"
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Cobertura Médica" />
                    <CommonInput
                        value={medicalCoverage}
                        onChange={(e) => setMedicalCoverage(e.target.value)}
                        placeholder="Cobertura Médica"
                        type="text"
                        inputClassName="w-56"
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Número de afiliado" />
                    <CommonInput
                        value={membershipNumber}
                        onChange={(e) => setMembershipNumber(e.target.value)}
                        placeholder="Número de afiliado"
                        type="text"
                        inputClassName="w-56"
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
                    <CommonLabel label="Médico de Cabecera" />
                    <CommonInput
                        value={familyDoctor}
                        onChange={(e) => setFamilyDoctor(e.target.value)}
                        placeholder="Médico de Cabecera"
                        type="text"
                        inputClassName="w-56"
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Peso (kg)" />
                    <CommonInput
                        value={weight || ''}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="Peso"
                        type="number"
                        inputClassName="w-56"
                    />
                </div>
                <div className="mb-4">
                    <CommonLabel label="Altura (cm)" />
                    <CommonInput
                        value={height || ''}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Altura"
                        type="number"
                        inputClassName="w-56"
                    />
                </div>
                {!props.loadedByProfessional && <><div className="mb-4">
                    <CommonLabel label="Perfil" />
                    <Select value={role} className="text-gray-700" onChange={(rl) => setRole(rl)} options={rolesList} />
                </div>
                {(role.value === 'OPERATOR') && 
                    <div className="mb-4">
                        <CommonLabel label="Profesional de cabecera" />
                        <Select className="text-gray-700" onChange={(rl) => setProfessionalId(rl.value)} options={props.professionals} />
                    </div>
                }</>}
                {((role.value === 'ADMIN') || (role.value === 'MASTERADMIN')) && (professions.length > 0) &&
                    <>
                        <div className="mb-4">
                            <CommonLabel label="Profesión" />
                            <Select className="text-gray-700" onChange={(rl) => setProfession(rl.value)} options={professions} />
                        </div>
                        <div className="mb-4">
                            <CommonLabel label="Duración de la sesión" />
                            <CommonInput
                                value={sessionDuration}
                                onChange={(e) => setSessionDuration(e.target.value)}
                                placeholder="Duración de la sesión"
                                type="number"
                                inputClassName="w-56"
                            />
                        </div>
                    </>
                }
                {props.isLoadedFromUsers && (role.value === 'OPERATOR') && <div className="mb-4">
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
                </div>}
            </div>
        </ThemeProvider>
    );
}
