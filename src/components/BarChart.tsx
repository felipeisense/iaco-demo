import { BarChart, Card, Title } from '@tremor/react';
import React from 'react'; // Importando React para completitud

export function BarChartHero({ title, chartData }: any) {
    
    
    // Definir un arreglo más extenso de colores
    const allColors = ['blue', 'red', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];

    // Determinar las categorías dinámicamente desde el primer elemento del arreglo chartData
    const categories = chartData.length > 0
        ? Object.keys(chartData[0]).filter(key => key !== 'Fecha')
        : [];

    // Seleccionar los colores basados en el número de categorías
    const colors = allColors.slice(0, categories.length);

    
    return (
        <Card className="mb-6 p-4">
            <Title>{title}</Title>
            <BarChart
                data={chartData}
                index="Fecha"
                categories={categories}
                colors={colors} // Usando colores dinámicos
                yAxisWidth={48}
                onValueChange={(v) => console.log(v)}
            />
        </Card>
    );
}
