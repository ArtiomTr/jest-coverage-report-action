import {
    Code as ChakraInlineCode,
    Link as ChakraLink,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Components } from '@mdx-js/react';
import NextLink from 'next/link';
import React from 'react';

import { Code } from './Code';
import { MarkdownHeading } from './MarkdownHeading';

export const components: Components = {
    h1: (props) => <MarkdownHeading as="h1" size="2xl" {...props} />,
    h2: (props) => <MarkdownHeading as="h2" size="xl" {...props} />,
    h3: (props) => <MarkdownHeading as="h3" size="lg" {...props} />,
    h4: (props) => <MarkdownHeading as="h4" size="md" {...props} />,
    h5: (props) => <MarkdownHeading as="h5" size="sm" {...props} />,
    h6: (props) => <MarkdownHeading as="h6" size="xs" {...props} />,
    ol: OrderedList,
    ul: UnorderedList,
    li: ListItem,
    a: ({ href, ...other }) => (
        <NextLink passHref href={href}>
            <ChakraLink color="brand.500" {...other} />
        </NextLink>
    ),
    p: Text,
    code: Code,
    inlineCode: (props) => <ChakraInlineCode {...props} />,
};
