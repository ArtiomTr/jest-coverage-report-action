import { GridItem, Heading, List } from '@chakra-ui/layout';
import React from 'react';

export type FooterSectionProps = {
    heading: string;
    children?: React.ReactNode;
};

export const FooterSection = ({ heading, children }: FooterSectionProps) => (
    <GridItem>
        <Heading
            size="md"
            marginBottom="2"
            marginTop="5"
            color="gray.600"
            as="h5"
        >
            {heading}
        </Heading>
        <List spacing="3">{children}</List>
    </GridItem>
);
