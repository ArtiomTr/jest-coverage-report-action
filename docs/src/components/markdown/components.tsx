import {
    Code as ChakraInlineCode,
    ListItem,
    OrderedList,
    Text,
    UnorderedList,
} from '@chakra-ui/react';
import { Components } from '@mdx-js/react';
import React from 'react';

import { Code } from './Code';
import { MarkdownHeading } from './MarkdownHeading';
import { MdLink } from './MdLink';
import { ResponsiveImage } from '../ResponsiveImage';

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
    a: MdLink,
    p: Text,
    code: Code,
    inlineCode: (props) => (
        <ChakraInlineCode
            fontSize="var(--children-font-size, var(--chakra-fontSizes-sm))"
            {...props}
        />
    ),
    ResponsiveImage,
};
