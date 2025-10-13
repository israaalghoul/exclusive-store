import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { createRoot } from 'react-dom/client'
import { StrictMode } from 'react'
import theme from "./theme";
import App from './App.jsx'
import './index.css'
import {BrowserRouter } from "react-router-dom";



createRoot(document.getElementById('root')).render(

  <StrictMode>
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)


