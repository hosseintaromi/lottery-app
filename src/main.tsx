import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from "./Ui /theme.ts";
import { RouterProvider } from "react-router-dom";
import router from "../routes.tsx";
import { RtlProvider } from './Ui /RtlProvider.tsx';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <RtlProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </RtlProvider>
        </ThemeProvider>
    </StrictMode>,
)
