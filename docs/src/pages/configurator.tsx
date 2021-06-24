import {
    Box,
    Container,
    Grid,
    GridItem,
    Heading,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs,
} from '@chakra-ui/react';
import { Formik } from 'formik';
import Head from 'next/head';
import React from 'react';
import { stringify } from 'yaml';

import { CoverageComment } from 'src/components/CoverageComment';
import { EditorWithCopy } from 'src/components/EditorWithCopy';
import { NumberField } from 'src/components/NumberField';
import { SelectField } from 'src/components/SelectField';
import { TextField } from 'src/components/TextField';

const standardConfiguration = {
    name: 'Coverage report',
    on: {
        pull_request: {
            branches: ['master'],
        },
    },
    jobs: {
        coverage: {
            'runs-on': 'ubuntu-latest',
            steps: [
                {
                    uses: 'actions/checkout',
                },
                {
                    uses: 'artiomtr/jest-coverage-report-action@v1.3',
                    with: {
                        github_token: '${{ secrets.GITHUB_TOKEN }}',
                    },
                },
            ],
        },
    },
};

const Configurator = () => (
    <React.Fragment>
        <Head>
            <title>Configurator | Jest Coverage Report action</title>
            <meta name="description" content="Configurator" />
        </Head>
        <Container marginY="5" maxWidth="container.lg">
            <Heading marginY="5">Configurator</Heading>
            <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }}>
                <GridItem>
                    <Formik
                        onSubmit={() => {
                            //
                        }}
                        initialValues={{
                            github_token: '${{ secrets.GITHUB_TOKEN }}',
                        }}
                    >
                        <Tabs onChange={(index) => console.log(index)}>
                            <TabList>
                                <Tab>Options</Tab>
                                <Tab>YAML</Tab>
                            </TabList>
                            <TabPanels>
                                <TabPanel>
                                    <Box width="100%" minHeight="360px">
                                        <TextField
                                            label="GitHub token"
                                            name="github_token"
                                        />
                                        <NumberField
                                            label="Threshold"
                                            name="threshold"
                                            min={0}
                                            max={100}
                                            step={1}
                                        />
                                        <SelectField
                                            label="Icons"
                                            name="icons"
                                            options={[
                                                'emoji',
                                                'ascii',
                                                'unicode',
                                            ]}
                                        />
                                        <SelectField
                                            label="Annotations"
                                            name="annotations"
                                            options={[
                                                'all',
                                                'none',
                                                'coverage',
                                                'failed-tests',
                                            ]}
                                        />
                                        <TextField
                                            label="Working directory"
                                            name="working_directory"
                                        />
                                        <TextField
                                            label="Testing script"
                                            name="test_script"
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    <EditorWithCopy
                                        language="yaml"
                                        value={stringify(standardConfiguration)}
                                        height="360px"
                                    />
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Formik>
                </GridItem>
                <GridItem>
                    <Grid templateColumns="60px 1fr">
                        <CoverageComment
                            totalLines={15}
                            coveredLines={14}
                            totalBranches={30}
                            coveredBranches={29}
                            totalFunctions={5}
                            coveredFunctions={5}
                            totalStatements={4}
                            coveredStatements={4}
                            threshold={50}
                        />
                    </Grid>
                </GridItem>
            </Grid>
        </Container>
    </React.Fragment>
);

export default Configurator;
