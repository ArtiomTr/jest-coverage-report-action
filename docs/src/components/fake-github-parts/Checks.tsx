import { Box, Grid, VStack } from '@chakra-ui/react';
import React, { PropsWithChildren } from 'react';

export type ChecksProps = PropsWithChildren<{}>;

export const Checks = ({ children }: ChecksProps) => (
    <VStack alignItems="stretch">
        <Box backgroundColor="gray.50">
            <Grid templateColumns="50px 1fr">{children}</Grid>
        </Box>
    </VStack>
);
