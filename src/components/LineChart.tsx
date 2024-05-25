import { LineChart, Card, Title } from '@tremor/react';
import { useEffect } from 'react';

const dataFormatter = (number: any) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function LineChartHero({ title, chartData }: any) {
    // Definir un arreglo extenso de colores
    const allColors = ['indigo', 'rose', 'green', 'yellow', 'purple', 'orange', 'cyan', 'magenta'];

    // Determinar las categorías dinámicamente desde el primer elemento del arreglo chartData
    const categories = chartData.length > 0
        ? Object.keys(chartData[0]).filter(key => key !== 'Fecha')
        : [];

    // Seleccionar los colores basados en el número de categorías
    const colors = allColors.slice(0, categories.length);

    return (
        <Card className="mb-6 p-4">
            <Title>{title}</Title>
            <LineChart
                className="h-80"
                data={chartData}
                index="Fecha"
                categories={categories}
                colors={colors}
                yAxisWidth={60}
                onValueChange={(v) => console.log(v)}
            />
        </Card>
    );
}
