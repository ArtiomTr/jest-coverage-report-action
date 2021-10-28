import { Box, Grid, GridItem, Heading, Text, useToast } from '@chakra-ui/react';
import { StyledOcticon } from '@primer/components';
import BorderBox from '@primer/components/lib/BorderBox';
import Button, { ButtonGroup } from '@primer/components/lib/Button';
import PointerBox from '@primer/components/lib/PointerBox';
import {
    GitMergeIcon,
    TriangleDownIcon,
    XCircleFillIcon,
} from '@primer/octicons-react';
import React from 'react';

import { CheckItem } from './CheckItem';
import { Checks } from './Checks';

export type PrFooterProps = {
    className?: string;
};

export const PrFooter = ({ className }: PrFooterProps) => {
    const showMergeToast = useToast({
        status: 'error',
        variant: 'left-accent',
        position: 'bottom-left',
        title: 'Ha ha, nice try',
        duration: 1500,
    });

    return (
        <BorderBox
            className={className}
            borderRadius={0}
            borderWidth="3px 0 0 0"
        >
            <Grid templateColumns="60px 1fr" marginTop="2">
                <GridItem
                    justifyContent="center"
                    alignItems="flex-start"
                    display="flex"
                >
                    <BorderBox
                        padding={1}
                        bg="bg.warning"
                        borderColor="border.warning"
                    >
                        <StyledOcticon
                            size={24}
                            color="border.warning"
                            icon={GitMergeIcon}
                        />
                    </BorderBox>
                </GridItem>
                <GridItem>
                    <PointerBox borderColor="border.warning" caret="left-top">
                        <Grid padding={3} templateColumns="50px 1fr">
                            <GridItem
                                rowSpan={2}
                                justifyContent="center"
                                alignItems="flex-start"
                                display="flex"
                            >
                                <StyledOcticon
                                    size="medium"
                                    color="icon.danger"
                                    icon={XCircleFillIcon}
                                />
                            </GridItem>
                            <GridItem>
                                <Heading fontSize="md" color="red.500">
                                    All checks have failed
                                </Heading>
                            </GridItem>
                            <GridItem>
                                <Text fontSize="sm" color="gray.600">
                                    3 failing checks
                                </Text>
                            </GridItem>
                        </Grid>
                        <Checks>
                            <CheckItem>
                                <Text ml="2" fontSize="sm">
                                    coverage / coverage (pull_request)
                                </Text>
                                <Text ml="3" color="gray.500" fontSize="sm">
                                    Failing after 50s — coverage
                                </Text>
                            </CheckItem>
                            <CheckItem>
                                <Text ml="2" fontSize="sm">
                                    coverage / Coverage annotations (🧪
                                    jest-coverage-report-action)...
                                </Text>
                            </CheckItem>
                            <CheckItem last>
                                <Text ml="2" fontSize="sm">
                                    coverage / Tests annotations (🧪
                                    jest-coverage-report-action) (p...
                                </Text>
                            </CheckItem>
                        </Checks>
                        <Box padding="3">
                            <ButtonGroup>
                                <Button onClick={() => showMergeToast()} css>
                                    Merge
                                </Button>
                                <Button css pl={2} pr={2}>
                                    <TriangleDownIcon />
                                </Button>
                            </ButtonGroup>
                        </Box>
                    </PointerBox>
                </GridItem>
            </Grid>
        </BorderBox>
    );
};
