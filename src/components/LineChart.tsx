import { LineChart, Card, Title } from '@tremor/react';
import { useEffect } from 'react';

const dataFormatter = (number: any) =>
  `$${Intl.NumberFormat('us').format(number).toString()}`;

export function LineChartHero({ title, chartData }: any) {


  

  return (
    <Card className="mb-6 p-4">
      <Title>{title}</Title>
      <LineChart
        className="h-80"
        data={chartData}
        index="Fecha"
        categories={['Operador 1', 'Operador 2']}
        colors={['indigo', 'rose']}
        
        yAxisWidth={60}
        onValueChange={(v) => console.log(v)}
      />
    </Card>
  );
}
