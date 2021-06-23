import { Box, CircularProgress } from '@chakra-ui/react';
import { CodeProps } from '@mdx-js/react';
import { DiffEditor, DiffEditorProps } from '@monaco-editor/react';
import React from 'react';

import classes from './Code.module.scss';
import { EditorWithCopy } from '../EditorWithCopy';

const staticProps = {
    options: {
        readOnly: true,
        scrollBeyondLastLine: false,
        scrollbar: {
            vertical: 'hidden',
            handleMouseWheel: false,
        },
    },
    blockClassName: classes['code'],
} as const;

const additionsRegex = /^\+(\s[^\n]*\n)/gm;
const deletionsRegex = /^-(\s[^\n]*\n)/gm;

const getOriginalCode = (code: string) =>
    code.replace(additionsRegex, '').replace(deletionsRegex, ' $1');
const getModifiedCode = (code: string) =>
    code.replace(deletionsRegex, '').replace(additionsRegex, ' $1');

const WrappedDiffEditor = ({
    blockClassName,
    ...other
}: DiffEditorProps & { blockClassName?: string }) => (
    <Box
        className={blockClassName}
        width={other.width ?? '100%'}
        height={other.height}
    >
        <DiffEditor {...other} />
    </Box>
);

export const Code = ({ children, className, diff }: CodeProps) => {
    const Component = diff ? WrappedDiffEditor : EditorWithCopy;

    const language = className.replace('language-', '');

    let lineCount;

    if (diff) {
        lineCount = Math.max(
            getOriginalCode(children).split('\n').length,
            getModifiedCode(children).split('\n').length
        );
    } else {
        lineCount = children.split('\n').length;
    }

    return (
        <Component
            {...staticProps}
            loading={<CircularProgress color="brand.500" isIndeterminate />}
            theme="vs-dark"
            height={Math.max(lineCount * 19, 80) + 'px'}
            value={children}
            original={diff && getOriginalCode(children)}
            modified={diff && getModifiedCode(children)}
            language={language}
            originalLanguage={language}
            modifiedLanguage={language}
        />
    );
};
