import { Box, Grid, GridItem } from '@chakra-ui/react';
import StyledOcticon from '@primer/components/lib/StyledOcticon';
import Timeline from '@primer/components/lib/Timeline';
import { GitCommitIcon } from '@primer/octicons-react';
import React from 'react';

import { PrFooter } from './fake-github-parts/PrFooter';
import classes from './HomeExample.module.scss';
import { CoverageComment } from '../components/CoverageComment';

type TransformProps = {
    translate: {
        x: string;
        y: string;
    };
    scale: number;
};

const createTransforms = (transforms: Record<string, TransformProps>) =>
    Object.entries(transforms).reduce((acc, [key, { translate, scale }]) => {
        acc[
            key
        ] = `skew(-32deg, 0deg) rotate(15deg) translate(${translate.x}, ${translate.y}) scale(${scale})`;

        return acc;
    }, {});

const transforms = createTransforms({
    base: {
        translate: {
            x: 'calc(-50% + 41vw)',
            y: '0',
        },
        scale: 0.6,
    },
    md: {
        translate: {
            x: 'calc(-50% + 41vw)',
            y: '-10%',
        },
        scale: 0.7,
    },
    lg: {
        translate: {
            x: '-54%',
            y: '-8%',
        },
        scale: 0.7,
    },
});

export const HomeExample = () => (
    <Box
        position="absolute"
        width="700px"
        transformOrigin="center"
        transform={transforms}
        zIndex="-1"
    >
        <Grid templateColumns="60px 1fr">
            <GridItem />
            <GridItem className={classes['part1']}>
                <Timeline>
                    <Timeline.Item>
                        <Timeline.Badge css>
                            <StyledOcticon icon={GitCommitIcon} />
                        </Timeline.Badge>
                        <Timeline.Body>New commit</Timeline.Body>
                    </Timeline.Item>
                </Timeline>
            </GridItem>
            <CoverageComment
                totalStatements={435}
                coveredStatements={350}
                totalBranches={261}
                coveredBranches={213}
                totalFunctions={83}
                coveredFunctions={66}
                totalLines={823}
                coveredLines={644}
                threshold={80}
                className={classes['part2']}
            />
            <GridItem />
            <GridItem className={classes['part3']}>
                <Timeline>
                    <Timeline.Item />
                </Timeline>
            </GridItem>
        </Grid>
        <PrFooter className={classes['part3']} />
    </Box>
);
