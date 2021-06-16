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
            gradient="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
        >
            {title}
        </GradientHeading>
        <Heading
            fontWeight="normal"
            as="p"
            size="lg"
            maxWidth="3xl"
            color="gray.600"
            paddingBottom="5"
        >
            {description}
        </Heading>
        {children}
    </ScreenContainer>
);
