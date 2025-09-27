import React, { useState } from 'react';
import dayjs from 'dayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import CommonLabel from '../commonLabel';
import PrimaryButton from "../primaryButton";

export default function DateTimeRangePicker(props) {
  const [dateTimeRange, setDateTimeRange] = useState([
    dayjs().hour(9).minute(0), // Fecha y hora de inicio
    dayjs().hour(18).minute(0) // Fecha y hora de fin
  ]);

  // Manejar cambios en los DateTimePickers
  const handleDateTimeChange = (index, newValue) => {
    const newRange = [...dateTimeRange];
    newRange[index] = newValue;
    setDateTimeRange(newRange);
  };

  // Pasar datos al componente padre
  const setDateTimePeriod = () => {
    const newSlotInfo = {
      start: dateTimeRange[0].$d,
      end: dateTimeRange[1].$d,
    };
    props.buildSlotInfo(newSlotInfo);
  };

  return (
    <div className="p-4 rounded-2xl bg-secondaryWithOp2 text-white">
      <CommonLabel label="Seleccione inicio y fin" className="text-white font-normal" />
      <div className="flex flex-wrap space-y-2 md:space-y-0 md:space-x-2 my-4">
        <DateTimePicker
          className="w-full md:w-2/5"
          label="Inicio"
          value={dateTimeRange[0]}
          onChange={(newValue) => handleDateTimeChange(0, newValue)}
          sx={{
            '& .MuiInputBase-root': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        />
        <DateTimePicker
          label="Fin"
          className="w-full md:w-2/5"
          value={dateTimeRange[1]}
          onChange={(newValue) => handleDateTimeChange(1, newValue)}
          sx={{
            '& .MuiInputBase-root': { color: 'white' },
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': {
              '& fieldset': { borderColor: 'white' },
              '&:hover fieldset': { borderColor: 'white' },
              '&.Mui-focused fieldset': { borderColor: 'white' },
            },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        />
      </div>
      <PrimaryButton
        onClick={setDateTimePeriod}
        isLoading={false}
        isLoadingText="Agregando turno..."
        actionText="Agregar turno"
      />
    </div>
  );
}
