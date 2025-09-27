import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
import { DatePicker } from "@mui/x-date-pickers";
import CommonLabel from './commonLabel';
import PrimaryButton from "./primaryButton";

export default function RangePicker(props) {
  const [value, setValue] = useState([
    dayjs("Mon Nov 11 2024 20:29:41 GMT-0300 (Argentina Standard Time)"), 
    dayjs("Sat Jan 11 2025 20:29:41 GMT-0300 (Argentina Standard Time)")
  ]);

  const handleChange = (index, newValue) => {
    const newDates = [...value];
    newDates[index] = newValue.$d;
    setValue(newDates);
  };

  const search = () => {
    props.getDates(value);
  }

  return (
      <div className="p-4 rounded-lg bg-secondaryWithOp2 shadow-secondarySh">
      <CommonLabel label="Seleccione un período" className="text-gray-700 font-normal" />
        <div className="flex justify-between gap-6 my-4">
          <DatePicker
          className="w-5/6"
            label="Desde"
            value={value[0]}
            onChange={(newValue) => handleChange(0, newValue)}
            sx={{
              '& .MuiInputBase-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                },
                '&:hover fieldset': {
                  borderColor: 'gray',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gray',
                },
              },
              '& .MuiSvgIcon-root': {
                color: 'gray',
              },
            }}
          />
          <DatePicker
        className="w-5/6"
            label="Hasta"
            value={value[1]}
            onChange={(newValue) => handleChange(1, newValue)}
            sx={{
              '& .MuiInputBase-root': {
                color: 'gray',
              },
              '& .MuiInputLabel-root': {
                color: 'gray',
              },
              '& .MuiOutlinedInput-root': {
                '& fieldset': {
                  borderColor: 'gray',
                },
                '&:hover fieldset': {
                  borderColor: 'gray',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'gray',
                },
              },
              '& .MuiSvgIcon-root': {
                color: 'gray',
              },
            }}
          />
        </div>
        <PrimaryButton onClick={() => search()} isLoading={props.isLoading} isLoadingText="Obteniendo estadísticas..." actionText="Obtener estadísticas" />
      </div>
  );
}