import { Box, Container, HStack } from '@chakra-ui/react';
import Link from 'next/link';
import React from 'react';

import classes from './Header.module.scss';
import Logo from '../../assets/logo.svg';

export const Header = () => (
    <Box
        as="header"
        backdropFilter="blur(2px)"
        position="sticky"
        top="0"
        paddingTop="4"
        paddingBottom="4"
        borderColor="gray.150"
        borderBottomWidth="1px"
        zIndex="sticky"
        backgroundColor="rgba(255, 255, 255, 0.8)"
    >
        <Container
            justifyContent="space-between"
            display="flex"
            maxW="container.lg"
        >
            <Link href="/">
                <Logo
                    className={classes['logo']}
                    color="var(--chakra-colors-brand-600)"
                    height={32}
                />
            </Link>
            <HStack></HStack>
        </Container>
    </Box>
);
