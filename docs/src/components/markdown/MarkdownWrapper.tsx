import { MDXProvider } from '@mdx-js/react';
import React, { PropsWithChildren } from 'react';

import { components } from './components';

export const MarkdownWrapper = ({ children }: PropsWithChildren<{}>) => (
    <MDXProvider components={components}>{children}</MDXProvider>
);
