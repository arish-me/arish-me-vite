'use client'

import React, { useState } from "react";
import Header from '@/components/home/header'
import AboutMe from '@/components/home/about-me'
import GetInTouch from '@/components/home/get-in-touch'
import HelmetWrapper from '@/components/HelmetWrapper';

const HomePage = () => {

  return (
    <>
    <HelmetWrapper
      showDefault={true}
      url={window.location.href}
    />
    <Header/>
    <AboutMe/>
    <GetInTouch/>
    </>
  )
}

export default HomePage