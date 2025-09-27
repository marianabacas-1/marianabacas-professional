"use client";
import React, { useEffect, useState, useContext, useCallback } from 'react';
import { redirect } from 'next/navigation';
import { Context } from '../../context/Context';
import StatisticsCard from '../statisticsCard';
import ChartLine from '../chart';
import SectionTitle from '../sectionTitle';
import RangePicker from '../rangePicker';
import statsService from '../../services/statsService';
import Loader from "../loader";
import SummarizeIcon from '@mui/icons-material/Summarize';
import EventIcon from '@mui/icons-material/Event';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import { format } from 'date-fns';
 
export default function UsersStats() {
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
      
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        throw new Error('Fechas inválidas');
      }
      
      const formattedStartDate = start.toISOString();
      const formattedEndDate = new Date(end);
      formattedEndDate.setHours(23, 59, 59, 999);
      
      const statsData = await statsService.getUsersStats(
        formattedStartDate,
        formattedEndDate.toISOString()
      );
      
      setOptions(statsData);
    } catch (err) {
      console.error('Error al obtener estadísticas de usuarios:', err);
      changeAlertStatusAndMessage(
        true, 
        'error', 
        `No se pudieron obtener las estadísticas de usuarios: ${err.message || 'Error desconocido'}`
      );
    } finally {
      setIsLoadingStats(false);
    }
  }, [changeAlertStatusAndMessage]);

  const getTotalNewUsers = () => {
    if (!options.datasets || !options.datasets[0] || !options.datasets[0].data) return 0;
    return options.datasets[0].data.reduce((acc, curr) => acc + curr, 0);
  };

  const getTotalAccumulated = () => {
    if (!options.datasets || !options.datasets[1] || !options.datasets[1].data || options.datasets[1].data.length === 0) return 0;
    return options.datasets[1].data[options.datasets[1].data.length - 1];
  };

  const getAveragePerDay = () => {
    const total = getTotalNewUsers();
    if (total === 0 || !dateRange[0] || !dateRange[1]) return 0;
    
    const diffTime = Math.abs(dateRange[1] - dateRange[0]);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1; // Evitar división por cero
    
    return (total / diffDays).toFixed(1);
  };

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
      {isLoadingStats && <Loader text="Obteniendo estadísticas de usuarios..." />}
      {!isLoadingStats && (<><div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<SummarizeIcon/>} title="Total usuarios" value={getTotalAccumulated()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<EventIcon/>} title="Nuevos usuarios" value={getTotalNewUsers()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<TaskAltIcon/>} title="Promedio por día" value={getAveragePerDay()}/>
          </div>
          {wd?.localStorage && (<div className="shadow-secondarySh p-4 rounded-xl">
            <ChartLine options={options} />
          </div>)}</>)}
      </div></>}
    </div>
  )
}
