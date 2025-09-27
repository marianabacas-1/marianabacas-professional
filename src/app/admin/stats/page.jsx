"use client";
import React, { useState, useEffect, useContext } from "react";
import WebTitle from "../../components/webTitle";
import WebContainer from "../../components/webContainer";
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { Context } from "../../context/Context";
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';
import Views from "../../components/stats/views";
import Users from "../../components/stats/users";
import Sales from "../../components/stats/sales";

export default function ProductsPage() {
  const [tabValue, setTabValue] = useState('1');
  const [loading, setLoading] = useState(true);
  const { changeAlertStatusAndMessage, accessToken } = useContext(Context);  
  const router = useRouter();

  const handleChangeTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  useEffect(() => {
    if(!accessToken || !localStorage.getItem('accessToken')) {
      router.push('/login')
    }
  }, [accessToken]);

  return (
    <WebContainer>
      <WebTitle text="Panel de estadísticas" />
          <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} className="w-full">
                  <TabContext value={tabValue} className="w-full">
                      <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }} className="w-full">
                      <TabList
                          onChange={handleChangeTabValue}
                          textColor="primary"
                          indicatorColor="primary"
                          sx={{
                              '& .MuiTab-root': { 
                                fontWeight: 'bold', 
                                textTransform: 'none', 
                                minWidth: 100, 
                                color: 'gray', 
                                borderRadius: '10px 10px 0px 0px',
                                position: 'relative',
                          
                                backgroundImage: 'linear-gradient(to right, black 100%, transparent 0)',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '0% 100%',
                                transition: 'background-size 0.3s ease-in-out, color 0.3s ease-in-out, background-color 0.3s ease-in-out',
                          
                                '&:hover': { 
                                  color: 'white', 
                                  backgroundColor: 'rgba(0, 0, 0, 0.6)' 
                                },
                          
                                '&.Mui-selected': { 
                                  color: 'white',
                                  backgroundColor: 'rgba(0, 0, 0, 1)',
                                  backgroundSize: '100% 100%', 
                                },
                          
                                '&:not(.Mui-selected)': {
                                  backgroundSize: '0% 100%', 
                                }
                              },
                              '& .MuiTabs-indicator': { backgroundColor: 'transparent' }
                            }}
                          >
                          <Tab label="Ventas" value="1" />
                          <Tab label="Vistas" value="2" />
                          <Tab label="Usuarios" value="3" />
                      </TabList>
                      </Box>
                      <TabPanel className="pt-8" value="1">
                       <Sales/>
                      </TabPanel>
                      <TabPanel className="pt-8" value="2">
                        <Views/>
                      </TabPanel>
                      <TabPanel className="pt-8" value="3">
                       <Users/>
                      </TabPanel>
                  </TabContext>
              </Box>
    </WebContainer>
  );
}
