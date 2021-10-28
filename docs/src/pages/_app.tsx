import { ChakraProvider } from '@chakra-ui/react';
import ThemeProvider from '@primer/components/lib/ThemeProvider';
import { AppProps } from 'next/app';
import React from 'react';

import '../../styles/globals.css';

import { LinkProps } from 'src/components/LinkProps';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { theme } from '../theme';

const links: Array<LinkProps> = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Quick start',
        href: '/quick-start',
    },
    {
        label: 'Upgrading to v2',
        href: '/migrate',
    },
    {
        label: 'Configuration',
        href: '/configuration',
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
