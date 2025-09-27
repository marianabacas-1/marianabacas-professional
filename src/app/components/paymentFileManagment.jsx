"use client";
import React, { useState, useEffect, useContext } from "react"
import { Context } from "../context/Context";
import PrimaryButton from "../components/primaryButton";
import s3Service from "@/app/services/s3Service";
import UploadFile from "../components/uploadFile/file";
import CommonLabel from "../components/commonLabel";
import TableActionButton from "../components/tableActionButton";
import DeleteIcon from '@mui/icons-material/Delete';
import Checkbox from '@mui/material/Checkbox';
import paymentFileService from "@/app/services/paymentFileService";
 
export default function PaymentFileManagement(props) {
    const [isLoading, setIsLoading] = useState(false);
    const { changeAlertStatusAndMessage } = useContext(Context);
    const [paymentFiles, setPaymentFiles] = useState([]);
    const [requireInvoice, setRequireInvoice] = useState(false);
    const [patientPaymentFiles, setPatientPaymentFiles] = useState([]);
    const [uploadReady, setUploadReady] = useState(false);

    const newFile = async () => {
        try {
            setIsLoading(true)
            for (let i = 0; i < paymentFiles.length; i++) {
                const fl = paymentFiles[i];
                const fileNameWithLocation = await uploadFile(fl);
                const fileName = fileNameWithLocation.split('/')[2];
                const fileData = {
                    fileUrl: process.env.NEXT_PUBLIC_DIGITAL_OCEAN_PUBLIC_BASE_URL + fileNameWithLocation,
                    fileName,
                    patientId: props.event.patientId,
                    uploadDate: new Date(),
                    requireInvoice
                };
                props.onEditAppointment(fileData);
            }
            setUploadReady(true);
            changeAlertStatusAndMessage(true, 'success', 'Archivos subidos exitosamente!');
            setIsLoading(false)
        } catch (error) {
            console.error('Error al subir archivos:', error);
            changeAlertStatusAndMessage(true, 'error', 'Los archivos no han podido ser subidos... Por favor inténtelo nuevamente.');
            setIsLoading(false)
        }
    };

    const uploadFile = async (file) => {
        try {
            const adress = `paymentFiles/${props.event._id}/${file.name}`;
            const fileName= await s3Service.uploadFile(file, adress);
            return fileName;
        }catch {
            changeAlertStatusAndMessage(true, 'error', 'El archivo no han podido ser subido... Por favor inténtelo nuevamente.')
        }
    }

    const deleteFile = async (file) => {
        try {
            setIsLoading(true)
            const fullLocation = file.fileUrl.split(process.env.NEXT_PUBLIC_DIGITAL_OCEAN_PUBLIC_BASE_URL)[1];
            await s3Service.deleteFile(fullLocation, file.fileName);
            props.onEditAppointment({});
            changeAlertStatusAndMessage(true, 'success', 'Archivo eliminado exitosamente!');
            setIsLoading(false)
        }catch {
            changeAlertStatusAndMessage(true, 'error', 'El archivo no han podido ser eliminado... Por favor inténtelo nuevamente.')
            setIsLoading(false)
        }
    }

    const emitInvoiceChange = (reqInvoice) => {
        setRequireInvoice(reqInvoice);
        props.onEditAppointment({...props.event.paymentFile, requireInvoice: reqInvoice});
    }

    useEffect(() => {
       if(props.event.paymentFile?.requireInvoice) setRequireInvoice(props.event.paymentFile?.requireInvoice);
    }, [props.event])
    
    
    return ( 
        <div className="p-7 md:p-10 grid space-y-4">
            {props.event?.paymentFile.fileUrl && props.event?.editMode && (<div>
                <CommonLabel label="Comprobantes subidos" />
                <div className="flex w-full bg-gray-50 p-2 rounded justify-between my-1 border">
                    <div>
                        <a target="_BLANK" href={props.event?.paymentFile.fileUrl} className="underline text-secondary text-lg">{props.event?.paymentFile.fileName}</a>
                        <div className="text-gray-700">Subido el dia: {new Intl.DateTimeFormat('es-AR').format(new Date(props.event?.paymentFile.uploadDate))}</div>
                    </div>
                    <TableActionButton onClick={() => deleteFile(props.event?.paymentFile)} tooltipText="Eliminar archivo" icon={<DeleteIcon color="error" />} />
                </div>
                <div className="flex items-center mt-2">
                <Checkbox checked={requireInvoice} onChange={(e) => emitInvoiceChange(e.target.checked)} sx={{
                    color: '#C1666B',
                    '&.Mui-checked': {
                    color: '#C1666B',
                    },
                }}/>
                <div className="text-gray-500 text-sm font-bold mr-2">Solicitar factura</div>
            </div>
            </div>)}
            {!props.event?.paymentFile.fileUrl && (<><div className="mb-4">
                <UploadFile onChangeFiles={(files) => setPaymentFiles(files)} uploadReady={uploadReady}/>
            </div>
            <div className="w-full text-white py-3 justify-center md:justify-end flex-wrap">
                <button className={`${paymentFiles.length === 0 ? 'bg-gray-400 text-white shadow-inner' : 'hover:bg-primaryWithOp bg-primary hover:opacity-100'} px-2.5 py-1 rounded-lg shadow hover:shadow-inner text-sm`} onClick={() => newFile()}>{isLoading ? (<><i className="fa fa-circle-o-notch fa-spin"></i><span className="ml-2">Agregando comprobante...</span></>) : <span>Agregar comprobante</span>}</button>
            </div>
            <div className="flex items-center mt-2">
                <Checkbox checked={requireInvoice} onChange={(e) => setRequireInvoice(e.target.checked)} sx={{
                    color: '#C1666B',
                    '&.Mui-checked': {
                    color: '#C1666B',
                    },
                }}/>
                <div className="text-gray-500 text-sm font-bold mr-2">Solicitar factura</div>
            </div>
            </>)}
    </div>
    )
}
