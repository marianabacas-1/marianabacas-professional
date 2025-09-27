import React, { useState, useEffect, useCallback } from "react"
import CommonInput from "../commonInput"
import CommonLabel from "../commonLabel";
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { weekDays, appointmentTypes } from "../../../../utils";
import Select from 'react-select';
import dayjs from "dayjs";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import PrimaryButton from "../primaryButton";

export default function OfficeModal(props) {
    const [dayAssociated, setDayAssociated] = useState({ label: 'Lunes', value: 'monday' });
    const [schedules, setSchedules] = useState([{ from: '', to: '' }]);
    const [type, setType] = useState({ label: 'Presencial', value: 'PRESENTIAL' });
    const [link, setLink] = useState('');
    const [location, setLocation] = useState('');
    const [sessionDuration, setSessionDuration] = useState(0);

    // Only update parent when needed (on change, not on every render)
    const updateParent = useCallback((updatedSchedules = schedules, newSessionDuration = sessionDuration, overrideValues = {}) => {
        // Usar los valores actuales o los sobrescritos
        const currentDayAssociated = overrideValues.dayAssociated || dayAssociated;
        const currentType = overrideValues.type || type;
        const currentLink = overrideValues.link !== undefined ? overrideValues.link : link;
        const currentLocation = overrideValues.location !== undefined ? overrideValues.location : location;
        
        // Solo requerir horarios válidos para el tipo PRESENCIAL
        const validSchedules = updatedSchedules.filter(s => s.from && s.from.trim() !== '' && s.to && s.to.trim() !== '');
        
        const office = {
            dayAssociated: currentDayAssociated.value, 
            schedule: validSchedules.length > 0 ? validSchedules : updatedSchedules, // Mantener horarios aunque no sean válidos
            type: currentType.value,
            sessionDuration: Number(newSessionDuration) || 30 // Usar el nuevo valor de duración
        };
        
        // Actualizar solo los campos relevantes según el tipo
        if (currentType.value === 'VIRTUAL') {
            office.link = currentLink;
            office.location = ''; // Limpiar location si se cambia a VIRTUAL
        } else if (currentType.value === 'PRESENTIAL') {
            office.location = currentLocation;
            office.link = ''; // Limpiar link si se cambia a PRESENCIAL
        }
        
        // Actualizar el estado local para mantener la consistencia
        if (overrideValues.dayAssociated) setDayAssociated(overrideValues.dayAssociated);
        if (overrideValues.type) setType(overrideValues.type);
        if (overrideValues.link !== undefined) setLink(overrideValues.link);
        if (overrideValues.location !== undefined) setLocation(overrideValues.location);
        
        // Actualizar el estado en el componente padre
        props.onUpdateOffice(office);
    }, [dayAssociated, type, sessionDuration, link, location, props.onUpdateOffice, schedules]);

    // Initialize form when officeToEdit changes
    useEffect(() => {
        if (props.officeToEdit) {
            setDayAssociated(weekDays.find(tp => tp.value === props.officeToEdit.dayAssociated) || { label: 'Lunes', value: 'monday' });
            setType(appointmentTypes.find(tp => tp.value === props.officeToEdit.type) || { label: 'Presencial', value: 'PRESENTIAL' });
            setLink(props.officeToEdit.link || '');
            setLocation(props.officeToEdit.location || '');
            setSessionDuration(Number(props.officeToEdit.sessionDuration) || 30); // Asegurar que sea número
            
            // Handle both array and object formats for schedule
            if (Array.isArray(props.officeToEdit.schedule) && props.officeToEdit.schedule.length > 0) {
                setSchedules(props.officeToEdit.schedule);
            } else if (props.officeToEdit.schedule && props.officeToEdit.schedule.from) {
                setSchedules([{
                    from: props.officeToEdit.schedule.from,
                    to: props.officeToEdit.schedule.to
                }]);
            } else {
                setSchedules([{ from: '', to: '' }]);
            }
        }
    }, [props.officeToEdit]);

    const addSchedule = useCallback(() => {
        setSchedules(prevSchedules => {
            const newSchedules = [...prevSchedules, { from: '', to: '' }];
            // No actualizamos el padre aquí para evitar problemas con horarios vacíos
            return newSchedules;
        });
    }, []);

    const removeSchedule = useCallback((index) => {
        setSchedules(prevSchedules => {
            const newSchedules = [...prevSchedules];
            newSchedules.splice(index, 1);
            updateParent(newSchedules);
            return newSchedules;
        });
    }, [updateParent]);

    const updateSchedule = useCallback((index, field, value) => {
        setSchedules(prevSchedules => {
            const newSchedules = [...prevSchedules];
            newSchedules[index] = { ...newSchedules[index], [field]: value };
            // Actualizamos el padre solo si ambos campos (from y to) están completos
            if (newSchedules[index].from && newSchedules[index].to) {
                updateParent(newSchedules);
            }
            return newSchedules;
        });
    }, [updateParent]);

    // Handle changes that need to update the parent
    const handleDayChange = useCallback((selectedOption) => {
        setDayAssociated(selectedOption);
        // Forzar la actualización del padre con los valores actuales
        updateParent(schedules, sessionDuration, { dayAssociated: selectedOption });
    }, [schedules, sessionDuration, updateParent]);

    const handleTypeChange = useCallback((selectedOption) => {
        setType(selectedOption);
        // Forzar la actualización del padre con los valores actuales
        updateParent(schedules, sessionDuration, { type: selectedOption });
    }, [schedules, sessionDuration, updateParent]);

    const handleLinkChange = useCallback((e) => {
        const newLink = e.target.value;
        setLink(newLink);
        // Forzar la actualización del padre con los valores actuales
        updateParent(schedules, sessionDuration, { link: newLink });
    }, [schedules, sessionDuration, updateParent]);

    const handleLocationChange = useCallback((e) => {
        const newLocation = e.target.value;
        setLocation(newLocation);
        // Forzar la actualización del padre con los valores actuales
        updateParent(schedules, sessionDuration, { location: newLocation });
    }, [schedules, sessionDuration, updateParent]);

    const handleSessionDurationChange = useCallback((e) => {
        const value = parseInt(e.target.value, 10) || 0;
        setSessionDuration(value);
        // Forzar la actualización del padre con el nuevo valor de duración
        const updatedSchedules = [...schedules];
        updateParent(updatedSchedules, value);
    }, [schedules, updateParent]);

    return (
        <div className="bg-white px-7 md:px-14 py-5">
            <div className="mb-4 text-gray-700">
                <CommonLabel label="Seleccionar día asociado" />
                <Select
                    onChange={handleDayChange}
                    value={dayAssociated}
                    options={weekDays}
                    placeholder="Seleccionar día asociado"
                />
            </div>
            
            <div className="mb-4">
                <CommonLabel label="Horarios de atención" />
                {schedules.map((schedule, index) => (
                    <div key={index} className="flex items-end gap-2 mb-3">
                        <div className="flex-1">
                            <CommonLabel label="Desde" />
                            <TimePicker
                                value={schedule.from ? dayjs(schedule.from, 'HH:mm') : null}
                                disableScrollLock={true}
                                onChange={(selectedTime) => {
                                    if (selectedTime) updateSchedule(index, 'from', dayjs(selectedTime).format('HH:mm'));
                                }}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </div>
                        <div className="flex-1">
                            <CommonLabel label="Hasta" />
                            <TimePicker
                                value={schedule.to ? dayjs(schedule.to, 'HH:mm') : null}
                                disableScrollLock={true}
                                onChange={(selectedTime) => {
                                    if (selectedTime) updateSchedule(index, 'to', dayjs(selectedTime).format('HH:mm'));
                                }}
                                slotProps={{ textField: { size: 'small', fullWidth: true } }}
                            />
                        </div>
                        {schedules.length > 1 && (
                            <button
                                onClick={() => removeSchedule(index)}
                                className=""
                            >
                                <DeleteIcon />
                            </button>
                        )}
                    </div>
                ))}
                <div className="mt-2">
                    <PrimaryButton
                        onClick={addSchedule}
                        actionText="Agregar horario"
                        className="w-full sm:w-auto"
                    />
                </div>
            </div>
            
            <div className="mb-4 text-gray-700">
                <CommonLabel label="Formato de atención" />
                <Select
                    value={type}
                    onChange={handleTypeChange}
                    options={appointmentTypes}
                    placeholder="Formato de atención"
                />
            </div>
            
            {type.value === 'VIRTUAL' && (
                <div className="mb-4">
                    <CommonLabel label="Link de la consulta" />
                    <CommonInput    
                        value={link}
                        name="link"
                        htmlFor="link"
                        id="link"
                        type="text" 
                        placeholder="Link de la consulta"
                        inputClassName="w-full"
                        onChange={handleLinkChange}
                    />
                </div>
            )}
            
            {type.value === 'PRESENTIAL' && (
                <div className="mb-4">
                    <CommonLabel label="Dirección de la consulta" />
                    <CommonInput    
                        value={location}
                        name="location"
                        htmlFor="location"
                        id="location"
                        type="text" 
                        placeholder="Dirección de la consulta"
                        inputClassName="w-full"
                        onChange={handleLocationChange}
                    />
                </div>
            )}
            
            <div className="mb-4">
                <CommonLabel label="Duración de la consulta (en minutos)" />
                <CommonInput    
                    value={sessionDuration}
                    name="sessionDuration"
                    htmlFor="sessionDuration"
                    id="sessionDuration"
                    type="number" 
                    min="1"
                    step="1"
                    placeholder="Duración de la consulta"
                    inputClassName="w-full"
                    onChange={handleSessionDurationChange}
                />
            </div>
        </div>
    )
}