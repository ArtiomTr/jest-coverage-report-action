import {
    Container,
    Divider,
    Flex,
    Heading,
    List,
    ListItem,
} from '@chakra-ui/react';
import { Box } from '@primer/components';
import { useRouter } from 'next/dist/client/router';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

import { LayoutProps } from './LayoutProps';
import { MarkdownWrapper } from '../markdown/MarkdownWrapper';
import { MdLink } from '../markdown/MdLink';
import { Rating } from '../Rating';

export const LayoutDocs = ({ children, meta }: LayoutProps) => {
    const { pathname } = useRouter();

    return (
        <React.Fragment>
            <Head>
                <title>{meta.title} | Jest Coverage Report action</title>
                <meta name="description" content={meta.description as string} />
            </Head>
            <Container marginY="5" minHeight="100vh" maxWidth="container.lg">
                <MarkdownWrapper>{children}</MarkdownWrapper>
                <Divider marginY="5" />
                <Rating />
                <Divider marginY="5" />
                <Flex justifyContent="space-between">
                    <Box>
                        {Array.isArray(meta.related) && (
                            <React.Fragment>
                                <Heading
                                    color="brand.600"
                                    fontSize="lg"
                                    as="h6"
                                >
                                    Related
                                </Heading>
                                <List>
                                    {meta.related.map((link: string) => (
                                        <ListItem textTransform="capitalize">
                                            <NextLink href={link}>
                                                {link
                                                    .split('/')
                                                    .reverse()[0]
                                                    .split('-')
                                                    .join(' ')}
                                            </NextLink>
                                        </ListItem>
                                    ))}
                                </List>
                            </React.Fragment>
                        )}
                    </Box>
                    <MdLink
                        href={`https://github.com/ArtiomTr/jest-coverage-report-action/tree/master/docs/src/pages${pathname}.md`}
                    >
                        View this page on GitHub
                    </MdLink>
                </Flex>
            </Container>
        </React.Fragment>
    );
};
