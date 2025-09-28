"use client";
import React, { useEffect, useContext } from 'react';
import WebContainer from '../components/webContainer';
import { Context } from "../context/Context";
import Carrousel from '../components/carrousel';
import Link from 'next/link';
import Image from 'next/image';
import ImageAndTextSection from '../components/ImageAndTextSection';
import PromoBanner from '../components/promoBanner';

export default function Home() {
  return (

      <div className="bg-white">
            <video id="video" className="relative z-10 w-full mx-auto rounded-3xl md:w-2/6" autoPlay muted loop>
            <source src="mariana_bacas.mp4" type="video/mp4"/>
        </video>
    </div>

  )
}
