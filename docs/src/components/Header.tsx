import {
    Box,
    Button,
    Container,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerHeader,
    DrawerOverlay,
    HStack,
    IconButton,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import { MarkGithubIcon, ThreeBarsIcon } from '@primer/octicons-react';
import { useRouter } from 'next/dist/client/router';
import Link from 'next/link';
import React from 'react';

import classes from './Header.module.scss';
import { LinkProps } from './LinkProps';
import Logo from '../../assets/logo.svg';

export type HeaderProps = {
    links: Array<LinkProps>;
};

export const Header = ({ links }: HeaderProps) => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    const { pathname } = useRouter();

    return (
        <React.Fragment>
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
                    <Link href="/" passHref>
                        <Logo
                            className={classes['logo']}
                            color="var(--chakra-colors-brand-600)"
                            height={32}
                        />
                    </Link>
                    <HStack>
                        <Link
                            passHref
                            href="https://www.github.com/ArtiomTr/jest-coverage-report-action"
                        >
                            <IconButton
                                as="a"
                                aria-label="Go to GitHub repository"
                                icon={<MarkGithubIcon size={20} />}
                            />
                        </Link>
                        <IconButton
                            aria-label="Open menu"
                            icon={<ThreeBarsIcon />}
                            onClick={onOpen}
                        />
                    </HStack>
                </Container>
            </Box>
            <Drawer placement="right" isOpen={isOpen} onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Menu</DrawerHeader>
                    <DrawerBody>
                        <VStack alignItems="stretch">
                            {links.map(({ label, href }, key) => (
                                <Link href={href} key={key} passHref>
                                    <Button
                                        borderColor={
                                            pathname === href
                                                ? 'brand.500'
                                                : 'gray.300'
                                        }
                                        borderLeftWidth="thick"
                                        onClick={onClose}
                                        as="a"
                                    >
                                        {label}
                                    </Button>
                                </Link>
                            ))}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </React.Fragment>
    );
};
