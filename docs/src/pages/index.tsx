import {
    Box,
    Button,
    Container,
    ContainerProps,
    Grid,
    GridItem,
    Heading,
    HeadingProps,
    Text,
} from '@chakra-ui/react';
import { BoxProps, Flex } from '@primer/components';
import { ArrowRightIcon } from '@primer/octicons-react';
import Link from 'next/link';
import React, { ComponentProps, PropsWithChildren } from 'react';

import classes from './Home.module.scss';
import { HomeExample } from '../components/HomeExample';

const sharedHeadingProps: HeadingProps = {
    as: 'h1',
    fontWeight: 'extrabold',
    fontSize: ['5xl', '6xl', '7xl'],
    textAlign: ['center', null, null, 'left'],
};

const ScreenContainer = ({
    height = '100vh',
    children,
    boxProps = {},
    ...other
}: PropsWithChildren<{ height?: string; boxProps?: BoxProps }> &
    ContainerProps) => (
    <Box overflow="hidden" {...(boxProps as ComponentProps<typeof Box>)}>
        <Container
            maxWidth="container.lg"
            height={`max(${height}, 500px)`}
            {...other}
        >
            {children}
        </Container>
    </Box>
);

const Home = () => (
    <React.Fragment>
        <ScreenContainer
            height="calc(100vh - 60px)"
            display="flex"
            justifyContent={{
                base: 'center',
                sm: 'flex-start',
                lg: 'center',
            }}
            flexDir="column"
        >
            <Grid templateColumns={{ md: '1fr', lg: '1fr 350px' }}>
                <GridItem
                    marginY={{
                        md: 10,
                        lg: 0,
                    }}
                >
                    <Heading {...sharedHeadingProps}>
                        Track your code coverage
                    </Heading>
                    <Heading
                        className={classes['accentText']}
                        {...sharedHeadingProps}
                        background="linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%)"
                        backgroundClip="text"
                        sx={{
                            WebkitTextFillColor: 'transparent',
                        }}
                    >
                        in every pull request.
                    </Heading>
                    <Flex
                        justifyContent={['center', null, null, 'flex-start']}
                        paddingY="4"
                    >
                        <Link href="#quick-start">
                            <Button
                                className={classes['tryIt']}
                                variant="outline"
                                rightIcon={<ArrowRightIcon />}
                            >
                                Try it
                            </Button>
                        </Link>
                    </Flex>
                </GridItem>
                <GridItem
                    display={{
                        base: 'none',
                        sm: 'block',
                    }}
                    position="relative"
                >
                    <HomeExample />
                </GridItem>
            </Grid>
        </ScreenContainer>
        <ScreenContainer
            boxProps={{
                backgroundColor: 'gray.50',
            }}
        >
            <Heading>Coverage report comments</Heading>
            <Text></Text>
        </ScreenContainer>
        <ScreenContainer>
            <Heading>Annotations</Heading>
            <Text></Text>
        </ScreenContainer>
        <ScreenContainer
            boxProps={{
                backgroundColor: 'gray.50',
            }}
        >
            <Heading>Rich configuration</Heading>
            <Text></Text>
        </ScreenContainer>
        <ScreenContainer>
            <Heading paddingY="16" id="quick-start">
                Quick start
            </Heading>
        </ScreenContainer>
    </React.Fragment>
);

export default Home;
