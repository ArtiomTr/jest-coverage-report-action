import { Link as ChakraLink, ListItem } from '@chakra-ui/layout';
import NextLink from 'next/link';
import React from 'react';

import { LinkProps } from './LinkProps';

export const FooterLink = ({ label, href }: LinkProps) => (
    <ListItem>
        <NextLink href={href} passHref>
            <ChakraLink>{label}</ChakraLink>
        </NextLink>
    </ListItem>
);
