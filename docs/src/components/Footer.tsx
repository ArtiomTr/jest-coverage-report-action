import {
    Box,
    Container,
    Divider,
    Grid,
    GridItem,
    Heading,
    HStack,
    List,
    ListItem,
    Text,
} from '@chakra-ui/react';
import React from 'react';

import Logo from '../../assets/logo.svg';

export const Footer = () => (
    <Box backgroundColor="gray.50" as="footer">
        <Divider />
        <Container paddingY="6" maxWidth="container.lg">
            <Grid templateColumns={['1fr', null, 'repeat(4, 1fr)']}>
                <GridItem>
                    <Heading
                        size="md"
                        marginBottom="2"
                        marginTop="5"
                        color="gray.600"
                        as="h5"
                    >
                        Resources
                    </Heading>
                    <List spacing="3">
                        <ListItem>Docs</ListItem>
                        <ListItem>Configurator</ListItem>
                        <ListItem>Contribute</ListItem>
                    </List>
                </GridItem>
                <GridItem>
                    <Heading
                        size="md"
                        marginBottom="2"
                        marginTop="5"
                        color="gray.600"
                        as="h5"
                    >
                        Repository
                    </Heading>
                    <List spacing="3">
                        <ListItem>GitHub</ListItem>
                        <ListItem>Issues</ListItem>
                        <ListItem>Releases</ListItem>
                        <ListItem>Star</ListItem>
                    </List>
                </GridItem>
                <GridItem>
                    <Heading
                        size="md"
                        marginBottom="2"
                        marginTop="5"
                        color="gray.600"
                        as="h5"
                    >
                        Contacts
                    </Heading>
                    <List spacing="3">
                        <ListItem>Author</ListItem>
                        <ListItem>Email</ListItem>
                    </List>
                </GridItem>
            </Grid>
            <Divider marginY="5" />
            <HStack>
                <Logo color="var(--chakra-colors-gray-400)" height={52} />
                <Text color="gray.400">Copyright © 2020</Text>
            </HStack>
        </Container>
    </Box>
);
