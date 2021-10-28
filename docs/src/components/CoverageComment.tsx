import { Box, Divider, GridItem, Heading, Text } from '@chakra-ui/react';
import Label from '@primer/components/lib/Label';
import PointerBox from '@primer/components/lib/PointerBox';
import React from 'react';

import { BotLogo } from './BotLogo';
import classes from './CoverageComment.module.scss';

const decimalToString = (n: number, digitsAfterDot = 2): string =>
    n.toFixed(digitsAfterDot).replace(/\.?0+$/, '');

export type CoverageCommentProps = {
    totalStatements: number;
    coveredStatements: number;
    totalBranches: number;
    coveredBranches: number;
    totalFunctions: number;
    coveredFunctions: number;
    totalLines: number;
    coveredLines: number;
    threshold?: number;
    className?: string;
};

const DEFAULT_STEP = 20;

const getStatusOfPercents = (percentage: number, threshold = 60) => {
    let step = DEFAULT_STEP;

    if (threshold > 100 - DEFAULT_STEP * 2) {
        step = (100 - threshold) / 2;
    }

    if (percentage < threshold) {
        return '🔴';
    } else if (percentage < threshold + step) {
        return '🟡';
    } else {
        return '🟢';
    }
};

const CoverageRow = ({
    covered,
    total,
    title,
    threshold,
}: {
    covered: number;
    total: number;
    title: string;
    threshold?: number;
}) => (
    <tr>
        <td>{getStatusOfPercents((covered / total) * 100, threshold)}</td>
        <td>{title}</td>
        <td>{decimalToString((covered / total) * 100)}%</td>
        <td>
            {covered}/{total}
        </td>
    </tr>
);

export const CoverageComment = ({
    totalStatements,
    coveredStatements,
    totalBranches,
    coveredBranches,
    totalFunctions,
    coveredFunctions,
    totalLines,
    coveredLines,
    threshold,
    className,
}: CoverageCommentProps) => (
    <React.Fragment>
        <GridItem className={className} justifyContent="center" display="flex">
            <BotLogo />
        </GridItem>
        <GridItem className={className}>
            <PointerBox caret="left-top" bg="#fafafa">
                <Box
                    paddingX="3"
                    paddingY="1.5"
                    borderBottomColor="gray.150"
                    borderBottomWidth="thin"
                >
                    <Text display="inline" fontWeight="bold">
                        github-actions
                    </Text>
                    <Label ml="1" outline>
                        bot
                    </Label>
                </Box>
                <Box
                    paddingX="3"
                    paddingY="1.5"
                    backgroundColor="white"
                    borderBottomRadius="5px"
                >
                    <Heading mb="1" fontSize="2xl">
                        Coverage report
                    </Heading>
                    <Divider />
                    {((coveredLines / totalLines) * 100 < threshold ??
                        -Infinity) && (
                        <Text marginY="2">
                            ❌ Total statement coverage is less than specified
                            threshold. Current coverage is{' '}
                            {decimalToString((coveredLines / totalLines) * 100)}
                            %, but the minimum is {threshold}%.
                        </Text>
                    )}
                    <Heading marginY="2" fontSize="xl">
                        Total coverage
                    </Heading>
                    <table className={classes['table']}>
                        <thead>
                            <tr>
                                <td>Status</td>
                                <td>Category</td>
                                <td>Percentage</td>
                                <td>Covered / Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            <CoverageRow
                                title="Statements"
                                covered={coveredStatements}
                                total={totalStatements}
                                threshold={threshold}
                            />
                            <CoverageRow
                                title="Branches"
                                covered={coveredBranches}
                                total={totalBranches}
                                threshold={threshold}
                            />
                            <CoverageRow
                                title="Functions"
                                covered={coveredFunctions}
                                total={totalFunctions}
                                threshold={threshold}
                            />
                            <CoverageRow
                                title="Lines"
                                covered={coveredLines}
                                total={totalLines}
                                threshold={threshold}
                            />
                        </tbody>
                    </table>
                    <Box
                        pl="5"
                        mt="2"
                        borderLeftColor="gray.300"
                        borderLeftWidth="thick"
                        color="gray.500"
                    >
                        Status of coverage: 🟢 - ok, 🟡 - slightly more than
                        threshold, 🔴 - under the threshold
                    </Box>
                    <Box marginY="4" align="right">
                        Report generated by 🧪jest coverage report action
                    </Box>
                </Box>
            </PointerBox>
        </GridItem>
    </React.Fragment>
);
