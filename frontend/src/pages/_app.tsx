// import "@/styles/globals.css";
// import type { AppProps } from "next/app";

// export default function App({ Component, pageProps }: AppProps) {
//   return <Component {...pageProps} />;
// }

import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import * as React from 'react';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme(); // Create a default theme or customize as needed

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline /> {/* Global styles for Material-UI */}
            <Component {...pageProps} />
        </ThemeProvider>
    );
}
