import { Heading } from '@chakra-ui/layout';
import React, { PropsWithChildren } from 'react';

import { ScreenContainer, ScreenContainerProps } from './ScreenContainer';
import { GradientHeading } from '../GradientHeading';

export type InfoScreenProps = PropsWithChildren<
    Omit<ScreenContainerProps, 'shadow' | 'children'> & {
        even?: boolean;
        shadow?: boolean;
        title: string;
        description: string;
        subtitle?: string;
    }
>;

export const InfoScreen = ({
    even,
    children,
    title,
    description,
    shadow,
    subtitle,
    ...screenContainerProps
}: InfoScreenProps) => (
    <ScreenContainer
        boxProps={{
            backgroundColor: even && 'gray.50',
            position: shadow ? 'relative' : undefined,
            boxShadow:
                shadow &&
                `0 -5px 10px var(--chakra-colors-gray-${even ? '100' : '200'})`,
        }}
        display="flex"
        flexDir="column"
        height="auto"
        maxHeight="100vh"
        paddingTop="7"
        {...screenContainerProps}
    >
        {subtitle && <Heading color="gray.500">{subtitle}</Heading>}
        <GradientHeading
            lineHeight={1.4}
            size="3xl"
            marginTop="3"
            marginBottom="5"
            zIndex={2}
            gradient="linear-gradient(335deg, rgba(81,10,50,1) 0%, rgba(128,19,54,1) 36%, rgba(238,69,64,1) 100%);"
        >
            {title}
        </GradientHeading>
        <Heading
            fontWeight="normal"
            as="p"
            size="lg"
            maxWidth="3xl"
            color="gray.600"
            zIndex={2}
            paddingBottom="5"
        >
            {description}
        </Heading>
        {children}
    </ScreenContainer>
);
