import { BarChart, Card, Title } from '@tremor/react';
import React from 'react'; // Es buena práctica importar React, aunque no es estrictamente necesario desde React 17 con JSX transform.

export function BarChart2Hero({ title, chartData }: any) {

    console.log('chartData', chartData)
    return (
        <Card className="mb-6 p-4">
            <Title>{title}</Title>
            <BarChart
                data={chartData}
                index="Fecha"
                categories={['Metros cubicos totales']}
                colors={['blue']}
                yAxisWidth={48}
                onValueChange={(v) => console.log(v)}
            />
        </Card>
    );
}
