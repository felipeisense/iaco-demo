import React from 'react';
import { DateRangePicker, Title } from '@tremor/react';

export default function Calendar({ setDateRange }: any) {
    const handleDateChange = (value: { from?: Date, to?: Date }) => {
        if (value.from && value.to) {
            const dates = getDatesBetween(value.from, value.to);
            setDateRange(dates);
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

    const getDatesBetween = (startDate: Date, endDate: Date) => {
        let dates = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            dates.push(formatDate(new Date(currentDate)));
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return dates;
    };

    return (
        <div className="mt-6 grid gap-6">
            <Title>Selecciona Rango de Fecha</Title>
            <DateRangePicker className='w-64' onValueChange={handleDateChange}></DateRangePicker>
        </div>
    );
};
