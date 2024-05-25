"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { BarChartHero } from '@/components/BarChart';
import { LineChartHero } from '@/components/LineChart';
import SideDrawer from '@/components/SideDrawer';
import { Tab, TabGroup, TabList, TabPanel, TabPanels, Title, Card } from '@tremor/react';
import Calendar from '@/components/Calendar';
import ProgressCircleMdHero from '@/components/ProgressCircleMd';
import { CalendarDay } from '@/components/CalendarDay';
import ProgressCircleXdHero from '@/components/ProgressCircleXl';




export default function Dashboard() {

  const [operariosDate, setOperariosDate] = useState<string[]>([])
  const [machineDate, setMachineDate] = useState<string[]>([])
  const [securityDate, setSecurityDate] =useState ('')

  const [chartData, setChartData] = useState<ModifiedOperarioData[]>([]);
  const [chartData2, setChartData2] = useState<CamionOperadorData[]>([]);
  const [chartData3, setChartData3] = useState<CamionOperadorData[]>([]);
  const [chartData4, setChartData4] = useState<CamionOperadorData[]>([]);
  const [chartDataRest, setChartDataRest] = useState<any[]>([]);
  const [securityUser, setSecurityUser] = useState<any[]>([]);
  const [securityUser2, setSecurityUser2] = useState<any[]>([]);

  const router = useRouter();


  interface OperarioData {
    Fecha: string;
    [key: string]: string | number;  // Aquí asumimos que podrías tener múltiples claves de tipo string que apuntan a números
}

interface ModifiedOperarioData extends OperarioData {
    Fecha: string;  // Esta vez la fecha incluirá el día completo y la hora
}

interface CamionOperadorData {
  Fecha: string;
  "Camiones operador 1": number;
  "Camiones operador 2": number;
}

  useEffect(() => {
    const isAuthenticated = Cookies.get('isAuthenticated');
    if (isAuthenticated !== 'true') {
      router.push('/login');
    }
  }, [router]);


  useEffect(() => {
    const fetchData = async () => {
      let allData: ModifiedOperarioData[] = [];

      for (const date of operariosDate) {
        try {
          const response = await fetch(`./tcph/${date}.json`);
          if (!response.ok) throw new Error('Network response was not ok');
          const jsonData: OperarioData[] = await response.json();

          const modifiedData: ModifiedOperarioData[] = jsonData.map(entry => ({
            ...entry,
            Fecha: `${date} ${entry.Fecha}` // Concatenar el día con la hora
          }));

          allData = allData.concat(modifiedData); // Consolidar datos
        } catch (error) {
          console.error('Failed to fetch data:', error);
        }
      }
      
      setChartData(allData);
    };

    if (operariosDate.length > 0) fetchData();  // Asegurar que operariosDate no esté vacío

    

    


  }, [operariosDate]);  // Dependencia en operariosDate para recargar cuando cambie

  // tiempo de carga promedio por dia
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`./tcpd/tcpd.json`);
            

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const jsonData: CamionOperadorData[] = await response.json();
            

            if (operariosDate.length > 0) {
                const filteredData = jsonData.filter((item: CamionOperadorData) =>
                    operariosDate.includes(item.Fecha)
                );
                console.log('Filtered Data2:', filteredData);
                setChartData2(filteredData);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    if (operariosDate.length > 0) {
        fetchData();
    }
}, [operariosDate]);


  //cantidad de camiones cargados por operador (ccco)

  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await fetch(`./ccco/ccco.json`);
            

            if (!response.ok) {
                throw new Error(`Network response was not ok: ${response.status}`);
            }

            const jsonData: CamionOperadorData[] = await response.json();
            

            if (operariosDate.length > 0) {
                const filteredData = jsonData.filter((item: CamionOperadorData) =>
                    operariosDate.includes(item.Fecha)
                );
                
                setChartData3(filteredData);
            }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    };

    if (operariosDate.length > 0) {
        fetchData();
    }
}, [operariosDate]);


  //idas al baño operador:

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`./ibo/ibo.json`);
          console.log('response1111', response)
          

          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
          }

          const jsonData: any = await response.json();
          
          
          if (operariosDate.length > 0) {
              const filteredData = jsonData.filter((item: any) =>
                operariosDate.includes(item.Fecha)
              );
              console.log('filteredData11', filteredData)
              setChartDataRest(filteredData)
              
          }
      } catch (error) {
          console.error('Failed to fetch data:', error);
      }
  };

  if (operariosDate.length > 0) {
      fetchData();
  }
}, [operariosDate]);

  //metros cubicos cargados diarios

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`./mccd/mccd.json`);
          

          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
          }

          const jsonData: CamionOperadorData[] = await response.json();
          
          
          if (machineDate.length > 0) {
              const filteredData = jsonData.filter((item: CamionOperadorData) =>
                machineDate.includes(item.Fecha)
              );
              console.log('filteredData4', filteredData)
              setChartData4(filteredData);
          }
      } catch (error) {
          console.error('Failed to fetch data:', error);
      }
  };

  if (machineDate.length > 0) {
      fetchData();
  }
}, [machineDate]);

  //seguridad con casco y sin casco
  
  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await fetch(`./rs/rs.json`);
          
          if (!response.ok) {
              throw new Error(`Network response was not ok: ${response.status}`);
          }

          const jsonData = await response.json();  // Asegúrate de que jsonData es un array

          // Verifica que securityDate sea una cadena no vacía
          console.log('securityDate', securityDate)
          console.log('jsonData', jsonData)
          if (securityDate) {
              const filteredData = jsonData.filter((item:any) => item.Fecha === securityDate);

              if (filteredData.length > 0) {
                  // Asumiendo que cada objeto tiene propiedades 'Operario 1' y 'Operario 2'
                  const filtered = {
                      operario1: filteredData[0]['Operario 1'],  // Accede a la propiedad usando corchetes si incluye espacios
                      operario2: filteredData[0]['Operario 2']
                  };
                  console.log('filtered.operario1', filtered.operario1)
                  console.log('filtered.operario2', filtered.operario2)
                  setSecurityUser(filtered.operario1);
                  setSecurityUser2(filtered.operario2);
              }
          }
      } catch (error) {
          console.error('Failed to fetch data:', error);
      }
    };

    // Ejecutar fetchData solo si securityDate es una cadena no vacía
    if (securityDate) {
        fetchData();
    }
}, [securityDate]);  // Depende de securityDate

  

  return (
    <main className="relative min-h-screen min-w-full bg-blue-100 p-6 sm:p-10">
      <SideDrawer />
      <div className="ml-16">
        <Title>Iaco-Isense</Title>
        <TabGroup>
          <TabList>
            <Tab>Operarios</Tab>
            <Tab>Maquinarias</Tab>
            <Tab>Seguridad</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
              
                <Calendar setDateRange = {setOperariosDate}></Calendar>
              
              </div>
              <Card className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                <LineChartHero title={'Tiempo de carga promedio por hora'} chartData = {chartData}/>
                <LineChartHero title={'Tiempo de carga promedio por dia'} chartData = {chartData2}/>
                <BarChartHero title={'Cantidad de camiones cargados por operador' } chartData={chartData3}></BarChartHero>
                <BarChartHero title={'Tiempo en baño operadores'} chartData={chartDataRest}></BarChartHero>
                {/* 
                    Aqui va grafico
                    Puedes usarlo para comentar varias líneas de código.
                */}
              </Card>
            </TabPanel>
            <TabPanel>
              <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3">
                
              <Calendar setDateRange= {setMachineDate}></Calendar>

              </div>
              <Card className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                    <BarChartHero title="Metros cúbicos cargados diarios"  chartData= {chartData4}/>
                </div>
                <div className="flex flex-col space-y-20 mt-6">
                    <Title className='text-center'>Maquinarias hoy</Title>
                    <ProgressCircleMdHero title="Tiempo maquinarias detenidas jornada de hoy" value={40}/>
                    <ProgressCircleMdHero  title="Maquinarias fuera de servicio hoy " value={10}/>
                </div>
              </Card>

            </TabPanel> 
            <TabPanel>

            <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-4">
              
                <CalendarDay setDate = {setSecurityDate}></CalendarDay>
              
              </div>
              <Card className="mt-6 grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
                <ProgressCircleXdHero title="Porcentaje operario 1 con casco durante el dia" value = {securityUser}></ProgressCircleXdHero>
                <ProgressCircleXdHero title="Porcentaje operario 2 con casco durante el dia" value = {securityUser2}></ProgressCircleXdHero>
                {/* 
                    Aqui va grafico
                    Puedes usarlo para comentar varias líneas de código.
                */}
              </Card>

            </TabPanel>

          </TabPanels>
        </TabGroup>
      </div>
    </main>
  );
}
