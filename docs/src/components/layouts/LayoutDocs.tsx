import { Container } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

import { LayoutProps } from './LayoutProps';
import { MarkdownWrapper } from '../markdown/MarkdownWrapper';

export const LayoutDocs = ({ children, meta }: LayoutProps) => (
    <React.Fragment>
        <Head>
            <title>{meta.title} | Jest Coverage Report action</title>
            <meta name="description" content={meta.description as string} />
        </Head>
        <Container minHeight="100vh" maxWidth="container.lg">
            <MarkdownWrapper>{children}</MarkdownWrapper>
        </Container>
    </React.Fragment>
);
