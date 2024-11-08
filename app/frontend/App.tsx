import React, { useEffect } from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@/context/ThemeContext";
import AppRouter from '@/AppRouter';


const App = () => {
useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.GOOGLE_ANALYTICS_ID}`;
    script.async = true;
    document.head.appendChild(script);
    window.dataLayer = window.dataLayer || [];
    function gtag() {
        window.dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", import.meta.env.VITE_GOOGLE_ANALYTICS_ID);
}, []);
  return (
    <React.StrictMode>
    <ThemeProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
      </ThemeProvider>
    </React.StrictMode>
  );
};

export default App;