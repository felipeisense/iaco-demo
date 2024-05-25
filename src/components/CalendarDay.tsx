import React from 'react';
import { DatePicker, Title } from '@tremor/react';

export function CalendarDay({ setDate }: any) {
  const handleDateChange = (value: any) => {
    // Asegúrate de que el valor no sea undefined antes de intentar formatearlo
    if (value instanceof Date) {
      setDate(formatDate(value)); // Solo formatea si el valor es una instancia de Date
    }
  };

  const formatDate = (date: Date) => {
    let day = date.getDate();
    let month = date.getMonth() + 1; // Los meses en JavaScript van de 0 a 11
    let year = date.getFullYear();
    const formattedDay = day < 10 ? `0${day}` : `${day}`;
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    return `${formattedDay}-${formattedMonth}-${year}`;
  };

  return (
    <div className="mt-6 grid gap-6">
      <Title>Selecciona una Fecha</Title>
      <DatePicker
        className='w-64'
        onValueChange={handleDateChange}
      />
    </div>
  );
}
