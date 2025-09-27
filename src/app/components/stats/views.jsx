"use client";
import React, { useEffect, useState, useMemo, useContext } from 'react';
import { redirect } from 'next/navigation'
import { Context } from '../../context/Context';
import StatisticsCard from '../statisticsCard';
import ChartLine from '../chart';
import SectionTitle from '../sectionTitle';
import RangePicker from '../rangePicker';
import statsService from '../../services/statsService';
import Loader from "../loader";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EventIcon from '@mui/icons-material/Event';
import SummarizeIcon from '@mui/icons-material/Summarize';
import CancelIcon from '@mui/icons-material/Cancel';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
 
export default function Views() {
  const [wd, setWd] = useState(null);
  const [options, setOptions] = useState({});
  const [isLoadingStats, setIsLoadingStats] = useState(false);
  const { changeAlertStatusAndMessage, account } = useContext(Context);
  
  const getStats = async (dates) => {
    try{
      setIsLoadingStats(true);
      const statsOptions = await statsService.getViews(dates[0], dates[1]);
      setOptions(statsOptions);
      setIsLoadingStats(false);
    }catch(err) {
      setIsLoadingStats(false);
      console.log(err);
      changeAlertStatusAndMessage(true, 'error', 'Las estadísticas de vistas no han podido ser obtenidas... Por favor recargue la página.')
    }
  } 

  const getAll = () => {
    const initialValue = 0;
    if(options.datasets) {
      const sumWithInitial = options.datasets[0]?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      return sumWithInitial
    }
  }

  const getAbout = () => {
    const initialValue = 0;
    if(options.datasets) {
      const sumWithInitial = options.datasets[1]?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      return sumWithInitial
    }
  }

  const getServices = () => {
    const initialValue = 0;
    if(options.datasets) {
      const sumWithInitial = options.datasets[2]?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      return sumWithInitial
    }
  }

  const getProducts = () => {
    const initialValue = 0;
    if(options.datasets) {
      const sumWithInitial = options.datasets[3]?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      return sumWithInitial
    }
  }

  const getContact = () => {
    const initialValue = 0;
    if(options.datasets) {
      const sumWithInitial = options.datasets[4]?.data?.reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue,
      );
      return sumWithInitial
    }
  }

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
      {isLoadingStats && <Loader text="Obteniendo estadísticas de vistas..." />}
      {!isLoadingStats && (<><div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<SummarizeIcon/>} title="Total vistas" value={getAll()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<EventIcon/>} title="Accesorios" value={getAbout()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<TaskAltIcon/>} title="Electrónica" value={getServices()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<CheckCircleIcon/>} title="Regalos" value={getProducts()}/>
            <StatisticsCard className="col-span-4 md:col-span-1" icon={<CancelIcon/>} title="Contacto" value={getContact()}/>
          </div>
          {wd?.localStorage && (<div className="shadow-secondarySh p-4 rounded-lg">
            <ChartLine options={options} />
          </div>)}</>)}
      </div></>}
    </div>
  )
}
