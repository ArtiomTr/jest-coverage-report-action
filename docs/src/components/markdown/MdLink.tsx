import {
    Link as ChakraLink,
    LinkProps as ChakraLinkProps,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';

export type MdLinkProps = ChakraLinkProps & {
    href: string;
};

export const MdLink = ({ href, ...other }: MdLinkProps) => (
    <NextLink passHref href={href}>
        <ChakraLink color="brand.500" {...other} />
    </NextLink>
);
