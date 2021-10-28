import { Box, BoxProps, Container, ContainerProps } from '@chakra-ui/react';
import React, { ComponentProps, PropsWithChildren } from 'react';

export type ScreenContainerProps = PropsWithChildren<{ boxProps?: BoxProps }> &
    ContainerProps;

export const ScreenContainer = ({
    height = '100vh',
    children,
    boxProps = {},
    ...other
}: ScreenContainerProps) => (
    <Box overflow="hidden" {...(boxProps as ComponentProps<typeof Box>)}>
        <Container
            maxWidth="container.lg"
            minHeight="500px"
            height={height}
            {...other}
        >
            {children}
        </Container>
    </Box>
);
