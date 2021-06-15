import { Box, Container, HStack, Link, Text } from '@chakra-ui/react';
import React from 'react';

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
            <Text>jest-coverage-report-action</Text>
            <HStack>
                <Link>Docs</Link>
            </HStack>
        </Container>
    </Box>
);
