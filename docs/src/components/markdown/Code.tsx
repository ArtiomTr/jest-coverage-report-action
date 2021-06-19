import { CodeProps } from '@mdx-js/react';
import React from 'react';

import classes from './Code.module.scss';
import { EditorWithCopy } from '../EditorWithCopy';

export const Code = ({ children, className }: CodeProps) => (
    <EditorWithCopy
        options={{
            readOnly: false,
            scrollBeyondLastLine: false,
        }}
        blockClassName={classes['code']}
        height={Math.max(children.split('\n').length * 19, 80) + 'px'}
        value={children}
        language={className.replace('language-', '')}
    />
);
