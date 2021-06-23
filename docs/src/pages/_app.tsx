import { ChakraProvider } from '@chakra-ui/react';
import ThemeProvider from '@primer/components/lib/ThemeProvider';
import { AppProps } from 'next/app';
import React from 'react';

import '../../styles/globals.css';

import { Footer } from '../components/Footer';
import { Header, HeaderLink } from '../components/Header';
import { theme } from '../theme';

const links: Array<HeaderLink> = [
    {
        label: 'Quick start',
        href: '/quick-start',
    },
    {
        label: 'Upgrading to v2',
        href: '/migrate',
    },
];

const App = ({ Component, pageProps }: AppProps) => (
    <ChakraProvider theme={theme}>
        <ThemeProvider>
            <Header links={links} />
            <main>
                <Component {...pageProps} />
            </main>
            <Footer />
        </ThemeProvider>
    </ChakraProvider>
);

export default App;
