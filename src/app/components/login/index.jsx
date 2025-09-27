import React, { useState, useEffect, useContext } from "react"
import CommonInput from "../commonInput"
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CommonLabel from "../commonLabel";
import userService from "@/app/services/userService";
import { redirect } from 'next/navigation';
import { Context } from "../../context/Context";
import { useRouter } from 'next/navigation' 
import Image from "next/image";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import PassInput from "../passInput";
import Register from "./register";
import { validPass, validEmail } from "../../../../utils";
import PrimaryButton from "../primaryButton";

export default function Login() {
    const [email, setEmail] = useState('');
    const [userToReset, setUserToReset] = useState('');
    const [password, setPassword] = useState('');
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [repNewPass, setRepNewPass] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [section, setSection] = useState('login');
    const { changeAlertStatusAndMessage, accessToken, setAccessToken } = useContext(Context);
    const router = useRouter();

    // Manejar el teclado Enter
    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !isLoading) {
            if (section === 'login') {
                login();
            } else if (section === 'forgot') {
                resetPass();
            } else if (section === 'changePass') {
                changePass();
            }
        }
    };

    // Agregar el listener de teclado
    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [section, isLoading]);

    const login = async () => {
        try{
            setIsLoading(true);
            const emailInput = document.getElementById('email')?.value || email;
            const passwordInput = document.getElementById('password')?.value || password;
    
            const fullUser = {
                email: emailInput,
                password: passwordInput
            };
            const response = await userService.login(fullUser);
            if(response.accessToken){
                localStorage.setItem('accessToken', response.accessToken);
                setAccessToken(response.accessToken);
                const userInfo = JSON.parse(localStorage.getItem('userInfo'));
                setIsLoading(false);
                router.push('/')
            }
        }catch(error) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'Usuario o contraseña erroneos. Por favor inténtelo nuevamente.')
            console.log(error);
        }
    }

    const authUser = async () => {
        try{
            await userService.auth({email: userToReset, password: currentPass});
        }catch(err) {
            changeAlertStatusAndMessage(true, 'error', 'Contraseña incorrecta... Por favor intentelo nuevamente.');
            throw err;
        }
    }

    const changePass = async () => {
        let failedAuth = true;
        setIsLoading(true);
        try{
            await authUser();
            failedAuth = false;
            await userService.changePass({email: userToReset, newPassword: newPass});
            changeAlertStatusAndMessage(true, 'success', 'Contraseña modificada exitosamente!');
            setSection('login');
            setIsLoading(false);
            setCurrentPass('');
            setNewPass('');
            setRepNewPass('');
        }catch(err) {
            if(!failedAuth) changeAlertStatusAndMessage(true, 'error', 'La operación no pudo realizarse... Por favor intentelo nuevamente.');
            setIsLoading(false);
        }
    }

    const resetPass = async () => {
        try{
            setIsLoading(true);
            const response = await userService.resetPass(userToReset);
            setUserToReset(response.email);
            setSection('changePass');
            changeAlertStatusAndMessage(true, 'success', 'Se ha enviado un correo electronico al email informado con su nueva contraseña')
            setIsLoading(false);
        }catch(error) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'No fue posible informar la solicitud. Por favor verifique si el email ingresado es correcto e inténtelo nuevamente.')
            console.log(error);
        }
    }

    const passwordsMatch = (newPass.length > 0) && (newPass === repNewPass);

    const buttonDisabled = (email === '') || (password === "");

    return (
        <>
            <Image alt="mi_celu" priority className={`block ${section !== 'register' ? 'md:hidden' : ''} mx-auto mb-4`} height={100} width={100} src="/mi_celu.png" />
            <div className={`grid ${section !== 'register' ? 'md:grid-cols-2' : 'md:grid-cols-1'} rounded-xl shadow-xl login-bg p-7 md:p-10 md:space-x-8`}>
                {section !== 'register' && <div className="grid justify-center content-center p-2 md:p-4 md:border-r-2 border-secondary"><Image priority alt="mi_celu" className="hidden md:block" height={300} width={300} src="/mi_celu.png" /></div>}
            {section == 'login' && (<>

                    <div className="grid content-center">
                        <div className="text-gray-700 text-md md:text-lg mb-4">
                            Login
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
                                onKeyDown={(e) => handleKeyPress(e)}
                            />
                        </div>
                        <div className="mb-4">
                            <PassInput 
                                label="Contraseña"
                                value={password}
                                name="password"
                                htmlFor="password"
                                isInvalid={!validPass(password)}
                                invalidMessage="Debe contener al menos una minúscula, una mayúscula y un número."
                                inputClassName="w-56"
                                id="password"
                                placeholder="Contraseña" 
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={(e) => handleKeyPress(e)}
                            />
                            <button className="text-blue-500 hover:text-blue-600 text-sm mt-2" onClick={() => setSection('forgot')}>Olvide mi contraseña</button>
                        </div>
                        <PrimaryButton buttonDisabled={buttonDisabled} onClick={() => login()} isLoading={isLoading} isLoadingText="Iniciando sesión..." actionText="Iniciar sesión" />
                        <div className="text-sm mt-2 flex space-x-2"><span className="font-thin text-gray-700">¿Todavia no tenés cuenta?</span><button className="text-blue-500 hover:text-blue-600" onClick={() => setSection('register')}>Registrate</button></div>
                        <div className="text-sm mt-2 flex space-x-2"><button className="text-blue-500 hover:text-blue-600" onClick={() => router.push('/')}>Ir a inicio</button></div>
                    </div>
            </>)}
            {section == 'forgot' && (<>
                <div className="grid content-center relative">
                    <div className="text-gray-700 text-md md:text-lg mb-4">
                        Recuperar contraseña
                    </div>
                    <div className="mb-4">
                        <CommonLabel label="Ingrese su email"  />
                        <CommonInput    
                            value={userToReset}
                            name="user"
                            htmlFor="user"
                            id="user"
                            isInvalid={!validEmail(userToReset)}
                            invalidMessage="Debe poseer formato de email."
                            type="text" 
                            placeholder="Ingrese su email" 
                            inputClassName="w-56"
                            onChange={(e) => setUserToReset(e.target.value)}
                        />
                    </div>
                    <PrimaryButton buttonDisabled={!validEmail(userToReset)} onClick={() => resetPass()} isLoading={isLoading} isLoadingText="Reseteando..." actionText="Resetear contraseña" />
                    <button className="text-sm mt-6 md:mt-2 text-blue-500 hover:text-blue-600 md:absolute md:bottom-0 flex space-x-1 items-center" onClick={() => {
                        setSection('login');
                        setUserToReset('');
                    }}><ArrowBackIosIcon fontSize="extraSmall"/>volver</button>
                </div>
            </>)}
            {section == 'changePass' && (<>
                    <div className="grid content-center">
                        <div className="text-gray-700 text-md md:text-lg mb-4">
                            Agregue una nueva contraseña
                        </div>
                        <div className="mb-4">
                            <PassInput 
                                label="Contraseña actual"
                                value={currentPass}
                                name="password"
                                htmlFor="password"
                                inputClassName="w-56"
                                id="password"
                                placeholder="Contraseña actual" 
                                onChange={(e) => setCurrentPass(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <PassInput 
                                label="Nueva contraseña"
                                value={newPass}
                                name="password"
                                htmlFor="password"
                                isInvalid={!validPass(newPass)}
                                invalidMessage="Debe contener al menos una minúscula, una mayúscula y un número."
                                inputClassName="w-56"
                                id="password"
                                placeholder="Nueva contraseña" 
                                onChange={(e) => setNewPass(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <PassInput 
                                label="Repita nueva contraseña"
                                value={repNewPass}
                                isInvalid={!validPass(newPass) || !passwordsMatch}
                                invalidMessage={!validPass(newPass) ? "Debe contener al menos una minúscula, una mayúscula y un número." : (!passwordsMatch ? "Las contraseñas deben coincidir" : '')}
                                name="password"
                                htmlFor="password"
                                inputClassName="w-56"
                                id="password"
                                placeholder="Repita nueva contraseña" 
                                onChange={(e) => setRepNewPass(e.target.value)}
                            />
                        </div>
                        <PrimaryButton buttonDisabled={!passwordsMatch} onClick={() => changePass()} isLoading={isLoading} isLoadingText="Actualizando contraseña..." actionText="Actualizar contraseña" />
                        <button className="text-sm mt-6 text-blue-500 hover:text-blue-600 flex space-x-1 items-center" onClick={() => {
                            setSection('login');
                            setUserToReset('');
                        }}><ArrowBackIosIcon fontSize="extraSmall"/>volver</button>
                    </div>
                </>)}
                {section == 'register' && <Register setSection={(section) => setSection(section)}/>}
            </div>
        </>
    )
}
