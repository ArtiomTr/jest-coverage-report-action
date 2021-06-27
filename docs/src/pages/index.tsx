import {
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    HeadingProps,
    Text,
} from '@chakra-ui/react';
import {
    ArrowRightIcon,
    ChecklistIcon,
    ProjectIcon,
} from '@primer/octicons-react';
import Head from 'next/head';
import Link from 'next/link';
import React from 'react';

import classes from './Home.module.scss';
import AnnotationExampleImage from '../../assets/annotation-example.jpg';
import Blob1 from '../../assets/blob1.svg';
import CoverageCommentExampleImage from '../../assets/coverage-comment-example.jpg';
import Dots from '../../assets/dots.svg';
import { EditorWithCopy } from '../components/EditorWithCopy';
import { GradientHeading } from '../components/GradientHeading';
import { HomeExample } from '../components/HomeExample';
import { InfoImageScreen } from '../components/landing/InfoImageScreen';
import { InfoScreen } from '../components/landing/InfoScreen';
import { ScreenContainer } from '../components/landing/ScreenContainer';

const exampleConfiguration = `name: 'coverage'
on:
    pull_request:
        branches:
            - master
jobs:
    coverage:
        runs-on: ubuntu-latest
        steps:
            - uses: actions/checkout@v1
            - uses: artiomtr/jest-coverage-report-action@v2
              with:
                  github-token: \${{ secrets.GITHUB_TOKEN }}
                  #   threshold: 80 # optional parameter
`;

const sharedHeadingProps: HeadingProps = {
    as: 'h1',
    fontWeight: 'extrabold',
    textAlign: ['center', null, null, 'left'],
    size: '4xl',
};

const Home = () => (
    <React.Fragment>
        <Head>
            <title>Jest coverage report action</title>
            <meta
                name="description"
                content="Track your code coverage in every pull request"
            />
        </Head>
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
                    <GradientHeading
                        className={classes['accentText']}
                        {...sharedHeadingProps}
                        gradient="linear-gradient(335deg, rgba(81,10,50,1) 0%, rgba(128,19,54,1) 36%, rgba(238,69,64,1) 100%);"
                    >
                        in every pull request.
                    </GradientHeading>
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
        <InfoImageScreen
            subtitle="This action is..."
            title="Responsible"
            description="Helps you keep track coverage of your project. Forms a reporting comment for each PR. In addition, highlights files with reduced coverage and new files."
            images={CoverageCommentExampleImage.images}
            alt="Example of coverage comment"
            even
        />
        <InfoImageScreen
            title="Observant"
            description="This action will help you to spot uncovered lines of code and failed tests by creating annotations. Annotations are generated for every not covered statement / branch / function and failed test."
            images={AnnotationExampleImage.images}
            alt="Example of generated annotations"
            shadow
        />
        <InfoScreen
            title="Fast & serious"
            description="The rich configuration allows you to easily and reliably customize the action to your needs."
            even
            shadow
            alignItems="flex-start"
            position="relative"
        >
            <Button
                zIndex="1"
                marginTop="10"
                leftIcon={<ProjectIcon />}
                variant="outline"
            >
                Try online configurator
            </Button>
            <Blob1
                className={classes['blob']}
                width="50vw"
                color="var(--chakra-colors-gray-100)"
            />
            <Dots
                width={200}
                className={classes['dots-grid']}
                color="var(--chakra-colors-gray-200)"
            />
        </InfoScreen>
        <InfoScreen
            title="Ready to start?"
            description="The „Quick start“ guide will help you set up an action for your project."
            alignItems="flex-start"
            maxHeight="auto"
        >
            <Flex marginBottom="5" justifyContent="center" alignItems="center">
                <Link passHref href="/quick-start">
                    <Button as="a" leftIcon={<ChecklistIcon />}>
                        Quick start
                    </Button>
                </Link>
                <Text ml="2">or copy & paste example configuration:</Text>
            </Flex>
            <EditorWithCopy
                height="360px"
                title="example-action.yml"
                value={exampleConfiguration}
                language="yaml"
                options={{
                    readOnly: true,
                    scrollBeyondLastLine: false,
                    scrollbar: {
                        vertical: 'hidden',
                        handleMouseWheel: false,
                    },
                }}
                blockClassName={classes['readonlyEditor']}
            />
        </InfoScreen>
    </React.Fragment>
);

export default Home;
