"use client";
import React, { useState, useEffect, useContext } from "react"
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import { createTheme } from '@mui/material/styles';
import { ThemeProvider } from '@mui/material/styles';
import Box from '@mui/material/Box';
import PatientInfo from "./clinicalHistory/patientInfo";
import { Context } from '../context/Context';
import TabWrapper from "./tabWrapper";
import AdministrativeComments from "./clinicalHistory/administrativesComments";
import clinicalHistoryService from '@/app/services/clinicalHistoryService';
import MedicalFiles from "./clinicalHistory/medicalFiles";
import Plan from "./clinicalHistory/plan";
import EvolutionRoute from "./clinicalHistory/evolutionRoute";

export default function ClinicalHistoryTabs({ patientId }) {
    const [tabValue, setTabValue] = useState("1");
    const [isLoading, setIsLoading] = useState(false);
    const { account, changeAlertStatusAndMessage } = useContext(Context);
    const [clinicalHistory, setClinicalHistory] = useState({});

    const addComment = async (newComment) => {
        try {
            if (clinicalHistory.comments) {
                const updatedComments = [...clinicalHistory.comments, {commentedBy: account?.firstName + ' ' + account?.lastName, comment: newComment}];
                const updatedClinicalHistory = { 
                    ...clinicalHistory, 
                    comments: updatedComments 
                };
                await updateClinicalHistory(updatedClinicalHistory);
                changeAlertStatusAndMessage(true, 'success', 'Comentario agregado con éxito!');
            } else {
                const newClinicalHistory = { 
                    ...clinicalHistory, 
                    comments: [{commentedBy: account?.firstName + ' ' + account?.lastName, comment: newComment}],
                    patientId
                };
                await createClinicalHistory(newClinicalHistory);
            }
        } catch (error) {
            console.error("Error al actualizar los comentarios:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar los comentarios.');
        }
    };

    const updateComment = async (newCommentText, commentIndex) => {
        try {
            const updatedComments = clinicalHistory.comments.map((comment, index) =>
                index === commentIndex ? {
                    ...comment,
                    comment: newCommentText
                } : comment
            );
    
            const updatedClinicalHistory = {
                ...clinicalHistory,
                comments: updatedComments
            };
    
            await updateClinicalHistory(updatedClinicalHistory);
            changeAlertStatusAndMessage(true, 'success', 'Comentario actualizado con éxito!');
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar el comentario.');
        }
    };

    const deleteComment = async (commentIndex) => {
        try {
            const updatedComments = clinicalHistory.comments.filter((_, index) => index !== commentIndex);
            const updatedClinicalHistory = { 
                ...clinicalHistory, 
                comments: updatedComments 
            };
            await updateClinicalHistory(updatedClinicalHistory);
            changeAlertStatusAndMessage(true, 'success', 'Comentario eliminado con éxito!');
        } catch (error) {
            console.error("Error al actualizar los comentarios:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar los comentarios.');
        }
    };

    const addEvolutionComment = async (newComment) => {
        try {
            if (clinicalHistory.comments) {
                const updatedComments = [...clinicalHistory.evolutionComments, {commentedBy: account?.firstName + ' ' + account?.lastName, comment: newComment}];
                const updatedClinicalHistory = { 
                    ...clinicalHistory, 
                    evolutionComments: updatedComments 
                };
                await updateClinicalHistory(updatedClinicalHistory);
                changeAlertStatusAndMessage(true, 'success', 'Comentario agregado con éxito!');
            } else {
                const newClinicalHistory = { 
                    ...clinicalHistory, 
                    evolutionComments: [{commentedBy: account?.firstName + ' ' + account?.lastName, comment: newComment}],
                    patientId
                };
                await createClinicalHistory(newClinicalHistory);
            }
        } catch (error) {
            console.error("Error al actualizar los comentarios:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar los comentarios.');
        }
    };

    const updateEvolutionComment = async (newCommentText, commentIndex) => {
        try {
            const updatedComments = clinicalHistory.evolutionComments.map((comment, index) =>
                index === commentIndex ? {
                    ...comment,
                    comment: newCommentText
                } : comment
            );
    
            const updatedClinicalHistory = {
                ...clinicalHistory,
                evolutionComments: updatedComments
            };
    
            await updateClinicalHistory(updatedClinicalHistory);
            changeAlertStatusAndMessage(true, 'success', 'Comentario actualizado con éxito!');
        } catch (error) {
            console.error("Error al actualizar el comentario:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar el comentario.');
        }
    }

    const deleteEvolutionCmm = async (commentIndex) => {
        try {
            const updatedComments = clinicalHistory.evolutionComments.filter((_, index) => index !== commentIndex);
            const updatedClinicalHistory = { 
                ...clinicalHistory, 
                evolutionComments: updatedComments 
            };
            await updateClinicalHistory(updatedClinicalHistory);
            changeAlertStatusAndMessage(true, 'success', 'Comentario eliminado con éxito!');
        } catch (error) {
            console.error("Error al actualizar los comentarios:", error);
            changeAlertStatusAndMessage(true, 'error', 'Hubo un problema al actualizar los comentarios.');
        }
    };

    const updateClinicalHistory = async (newdata) => {  
        try{
            setIsLoading(true);
            if(!newdata.patientId) {
                const newClinicalHistory = {
                    patientId
                };
                await createClinicalHistory(newClinicalHistory);
                const history = await getClinicalHistory();
                const fullClHistory = {...history, ...newdata};
                await clinicalHistoryService.editClinicalHistory(patientId, fullClHistory);
                await getClinicalHistory();
            }else {
                await clinicalHistoryService.editClinicalHistory(patientId, newdata);
                await getClinicalHistory();
            }
            setIsLoading(false);
        }catch(err) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'La historia clinica no pudo ser editada... Por favor recargue la página.')
        }
    }

    const createClinicalHistory = async (newClinicalHistory) => {
        try{
            setIsLoading(true);
            await clinicalHistoryService.addClinicalHistory(newClinicalHistory);
            await getClinicalHistory();
            changeAlertStatusAndMessage(true, 'success', 'Historia clinica creada con éxito!')
            setIsLoading(false);
        }catch(err) {
            setIsLoading(false);
            changeAlertStatusAndMessage(true, 'error', 'La historia clinica no pudo ser creada... Por favor recargue la página.')
        }
    } 

    const getClinicalHistory = async () => {
        try{
            setIsLoading(true);
            const history = await clinicalHistoryService.getByPatientId(patientId);
            setClinicalHistory(history);
            setIsLoading(false);
            return history;
        }catch(err) {
            setIsLoading(false);
            console.log(err);
            changeAlertStatusAndMessage(true, 'error', 'Es posible que el paciente aún no posea historia clinica asociada.')
        }
    }  

    useEffect(() => {
        const fetchClinicalHistory = async () => {
            await getClinicalHistory();
        };
        fetchClinicalHistory();
    }, []);

    const theme = createTheme({
        palette: {
            primary: {
            main: '#48A9A6'
            }
        },
        components: {
          MuiPickersDay: {
              styleOverrides: {
                root: {
                  color: '#C1666B',
                  borderRadius: 20,
                  borderWidth: 0,
                  borderColor: '#C1666B',
                  border: '0px solid',
                  backgroundColor: '#C1666B',
                }
              }
          },
          MuiPickersMonth: {
              styleOverrides: {
                  root: {
                    color: '#C1666B',
                    borderRadius: 20,
                    borderWidth: 0,
                    borderColor: '#C1666B',
                    border: '0px solid',
                    backgroundColor: '#C1666B',
                  },
                  monthButton: {
                      color: '#C1666B',
                      borderRadius: 20,
                      borderWidth: 0,
                      borderColor: '#C1666B',
                      border: '0px solid',
                      backgroundColor: '#C1666B',
                    }
              }
          }
        }
    });

    const handleChangeTabValue = (_, newValue) => setTabValue(newValue);

    return (
        <div className="my-6 md:my-12">
            <ThemeProvider theme={theme}>
            <Box sx={{ width: '100%', justifyContent: 'center', display: 'flex', flexDirection: 'column' }} className="w-full">
                    <TabContext value={tabValue}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', display: 'flex', justifyContent: 'center' }}>
                        <TabList 
                            onChange={handleChangeTabValue} 
                            textColor="primary" 
                            indicatorColor="primary"
                            variant="scrollable"
                            scrollButtons
                            allowScrollButtonsMobile
                            sx={{
                              '& .MuiTab-root': { 
                                fontWeight: 'bold', 
                                textTransform: 'none', 
                                minWidth: 100, 
                                color: 'gray', 
                                '&.Mui-selected': { 
                                    color: '#48A9A6', 
                                    backgroundColor: 'rgba(72, 169, 166, 0.2)', 
                                    transition: 'all 0.3s ease-in-out'
                                } 
                            },
                            '& .MuiTabs-scrollButtons': {
                              color: '#48A9A6',
                              '&.Mui-disabled': { opacity: 0.3 }
                            },
                            '& .MuiTabs-indicator': { 
                                backgroundColor: '#48A9A6' 
                            }                        
                            }}                    
                        >
                            <Tab label="Datos del paciente" value="1" />
                            <Tab label="Comentarios administrativos" value="2" />
                            <Tab label="Estudios" value="3" />
                            <Tab label="Resumen y plan" value="4" />
                            <Tab label="Hoja de evolución" value="5" />
                        </TabList>
                        </Box>
                        <TabWrapper value="1">
                            <PatientInfo patientId={patientId} />
                        </TabWrapper>   
                        <TabWrapper value="2">
                            <AdministrativeComments isLoading={isLoading} historyComments={clinicalHistory.comments || []} addComment={(comment) => addComment(comment)} updateComment={(comment, index) => updateComment(comment, index)} deleteCmm={(comment) => deleteComment(comment)} />
                        </TabWrapper>   
                        <TabWrapper value="3">
                            <MedicalFiles patientId={patientId} clinicalHistory={clinicalHistory} updateClinicalHistory={async (updatedClinicalHistory) => await updateClinicalHistory(updatedClinicalHistory)}/>
                        </TabWrapper>   
                        <TabWrapper value="4">
                            <Plan patientId={patientId} clinicalHistory={clinicalHistory} updateClinicalHistory={async (updatedClinicalHistory) => await updateClinicalHistory(updatedClinicalHistory)}/>
                        </TabWrapper>   
                        <TabWrapper value="5">
                            <EvolutionRoute evolutionComments={clinicalHistory.evolutionComments || []} addEvolutionComment={(comment) => addEvolutionComment(comment)} updateComment={(comment, index) => updateEvolutionComment(comment, index)} deleteEvolutionCmm={(comment) => deleteEvolutionCmm(comment)} />
                        </TabWrapper>    
                    </TabContext>
                </Box>
            </ThemeProvider>
        </div>
    )
}
