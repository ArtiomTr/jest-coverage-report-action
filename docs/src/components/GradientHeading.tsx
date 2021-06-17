import { Heading, HeadingProps } from '@chakra-ui/react';
import React from 'react';

export type GradientHeadingProps = {
    gradient: string;
} & HeadingProps;

export const GradientHeading = ({
    gradient,
    sx,
    ...other
}: GradientHeadingProps) => (
    <Heading
        backgroundClip="text"
        background={gradient}
        sx={{
            WebkitTextFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            ...sx,
        }}
        {...other}
    />
);
