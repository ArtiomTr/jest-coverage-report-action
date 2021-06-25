import { Flex, Heading, HeadingProps, useStyleConfig } from '@chakra-ui/react';
import { HashIcon } from '@primer/octicons-react';
import Link from 'next/link';
import React from 'react';

import classes from './MarkdownHeading.module.scss';

export type MarkdownHeadingProps = HeadingProps;

export const MarkdownHeading = ({
    id,
    children,
    ...props
}: MarkdownHeadingProps) => {
    const { fontSize } = useStyleConfig('Heading', props);

    return (
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
                <Heading
                    sx={{
                        '--children-font-size': fontSize as string,
                    }}
                    {...props}
                >
                    {children}
                </Heading>
            </Flex>
        </Link>
    );
};
