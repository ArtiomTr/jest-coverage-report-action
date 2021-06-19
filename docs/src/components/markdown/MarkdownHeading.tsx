import { Flex, Heading, HeadingProps } from '@chakra-ui/react';
import { HashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import React from 'react';

import classes from './MarkdownHeading.module.scss';

export type MarkdownHeadingProps = HeadingProps;

export const MarkdownHeading = ({ id, ...props }: MarkdownHeadingProps) => (
    <Link href={`#${id}`}>
        <Flex
            borderColor="gray.150"
            borderBottomWidth="thin"
            className={classes['heading']}
            alignItems="center"
            justifyContent="flex-start"
            marginY="3"
        >
            <span className={classes['heading__anchor']} id={id} />
            <HashIcon size={24} className={classes['heading__icon']} />
            <Heading {...props} />
        </Flex>
    </Link>
);
