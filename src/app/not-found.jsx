"use client";
import React from 'react';
import WebContainer from './components/webContainer';
import NotFoundComponent from './components/notFound';

export default function NotFound() {

  return (
    <WebContainer>
      <div className="flex items-center justify-center min-h-screen">
        <NotFoundComponent />
      </div>
    </WebContainer>
  )
}
