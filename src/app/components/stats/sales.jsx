"use client";
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { Context } from '../../context/Context';
import StatisticsCard from '../statisticsCard';
import ChartLine from '../chart';
import SectionTitle from '../sectionTitle';
import RangePicker from '../rangePicker';
import ordersService from '../../services/ordersService';
import Loader from "../loader";
import { format } from 'date-fns';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import PendingActionsIcon from '@mui/icons-material/PendingActions';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
 
export default function OrdersStats() {
    const [options, setOptions] = useState({});
    const [isLoadingStats, setIsLoadingStats] = useState(false);
    const [wd, setWd] = useState(null);
    const [dateRange, setDateRange] = useState([
        new Date(new Date().setDate(new Date().getDate() - 30)),
        new Date()
    ]);
    const { changeAlertStatusAndMessage, account } = useContext(Context);
    
    const getStats = useCallback(async (dates) => {
        try {
            setIsLoadingStats(true);
            const [startDate, endDate] = dates;
            
            // Asegurarse de que las fechas sean objetos Date válidos
            const start = new Date(startDate);
            const end = new Date(endDate);
            
            // Validar que las fechas sean válidas
            if (isNaN(start.getTime()) || isNaN(end.getTime())) {
                throw new Error('Fechas inválidas');
            }
            
            // Formatear fechas en formato ISO
            const formattedStartDate = start.toISOString();
            const formattedEndDate = new Date(end);
            formattedEndDate.setHours(23, 59, 59, 999);
            
            const statsData = await ordersService.getOrdersByStatus(
                formattedStartDate,
                formattedEndDate.toISOString()
            );
            
            setOptions(statsData);
        } catch (err) {
            console.error('Error al obtener estadísticas de pedidos:', err);
            changeAlertStatusAndMessage(
                true, 
                'error', 
                `No se pudieron obtener las estadísticas de pedidos: ${err.message || 'Error desconocido'}`
            );
        } finally {
            setIsLoadingStats(false);
        }
    }, [changeAlertStatusAndMessage]);

    const handleDateRangeChange = (dates) => {
        if (dates[0] && dates[1]) {
            setDateRange(dates);
            getStats(dates);
        }
    };

  useEffect(() => {
    if(!localStorage.getItem('accessToken')) {
      redirect('/login');
      
    }else {
      if((account?.role === 'MASTERADMIN') || (account?.role === 'AUDITOR')) getStats([
        "Mon Nov 11 2024 20:29:41 GMT-0300 (Argentina Standard Time)",
        "Tue Aug 12 2025 20:29:41 GMT-0300 (Argentina Standard Time)"
      ]);
    }
    if(typeof window !== "undefined") {
      setWd(window);
    }
  }, [account])
  

  return (
    <div className="flex flex-col justify-center mt-8">
      {((account?.role === 'MASTERADMIN') || (account?.role === 'ADMIN')) && <>
      <div className="mb-6"><RangePicker isLoading={isLoadingStats} getDates={(dts) => getStats(dts)} /></div>
      <div className="space-y-6">
      {isLoadingStats && <Loader text="Obteniendo estadísticas de turnos..." />}
      {!isLoadingStats && (<><div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatisticsCard 
                            icon={<LocalMallIcon className="text-white" />}
                            value={options.totalOrders || 0}
                            title="Total de pedidos"
                        />
                        <StatisticsCard 
                            icon={<PendingActionsIcon className="text-white" />}
                            value={options.totals?.pending || 0}
                            title="Pendientes"
                        />
                        <StatisticsCard 
                            icon={<PaymentIcon className="text-white" />}
                            value={options.totals?.paymentInProgress || 0}
                            title="Pago en proceso"
                        />
                        <StatisticsCard 
                            icon={<CheckCircleOutlineIcon className="text-white" />}
                            value={options.totals?.delivered || 0}
                            title="Entregados"
                        />
                        <StatisticsCard 
                            icon={<CancelIcon className="text-white" />}
                            value={options.totals?.cancelled || 0}
                            title="Cancelados"
                        />
          </div>
          {wd?.localStorage && (<div className="shadow-secondarySh p-4 rounded-xl">
            <ChartLine options={options} />
          </div>)}</>)}
      </div></>}
    </div>
  )
}
