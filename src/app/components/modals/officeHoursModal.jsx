import React from 'react';
import CloseIcon from '@mui/icons-material/Close';

export default function OfficeHoursModal({ open, onClose, offices = [] }) {
  // Group offices by day of the week
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const dayNames = {
    monday: 'Lunes',
    tuesday: 'Martes',
    wednesday: 'Miércoles',
    thursday: 'Jueves',
    friday: 'Viernes',
    saturday: 'Sábado',
    sunday: 'Domingo'
  };

  // Group offices by day
  const officesByDay = daysOfWeek.map(day => ({
    day,
    dayName: dayNames[day],
    offices: offices.filter(office => office.dayAssociated === day)
  }));

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl max-w-2xl w-full shadow-lg max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-secondary text-xl font-bold">Horarios y Lugares de Atención</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            aria-label="Cerrar"
          >
            <CloseIcon />
          </button>
        </div>
        
        <div className="space-y-4">
          {officesByDay.map(({ day, dayName, offices }) => (
            offices.length > 0 && (
              <div key={day} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                <h3 className="text-lg font-semibold text-secondary mb-2">{dayName}</h3>
                <div className="space-y-3 pl-2">
                  {offices.map((office, index) => (
                    <div key={index} className="bg-gray-50 shadow p-3 rounded-md">
                      <p className="text-gray-800">
                        <span className="font-medium">Modalidad:</span><span className="font-semibold"> {office.type === 'PRESENTIAL' ? 'Presencial' : 'Virtual'}</span>
                      </p>
                      {office.type === 'PRESENTIAL' && office.location && (
                        <p className="text-gray-800">
                          <span className="font-medium">Lugar:</span> {office.location}
                        </p>
                      )}
                      <div className="mt-1">
                        <p className="font-medium text-gray-800">Horarios:</p>
                        <ul className="list-disc pl-5 text-gray-700">
                          {office.schedule && office.schedule.length > 0 ? (
                            office.schedule.map((schedule, schedIndex) => (
                              <li key={schedIndex}>
                                {schedule.from} - {schedule.to} hs
                              </li>
                            ))
                          ) : (
                            <li>No hay horarios definidos</li>
                          )}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          ))}
        </div>
      </div>
    </div>
  );
}
