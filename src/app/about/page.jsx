"use client";
import React, { useState, useEffect } from 'react';
import WebTitle from "../components/webTitle";
import { Context } from '../context/Context';
import WebContainer from '../components/webContainer';
import visitsService from "../services/statsService";

export default function About() {

  useEffect(() => {
    const updateVisits = async () => {
      const body = { page: window.location.pathname };
      await visitsService.addVisit(body);
    }
    updateVisits();
  }, [])

  return (
    <WebContainer>
      <WebTitle text="Sobre Mi Celu" />
    </WebContainer>
  )
}
