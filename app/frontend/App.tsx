import React from 'react';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from "@/context/ThemeContext";
import AppRouter from '@/AppRouter';

const App = () => {
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