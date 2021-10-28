import {
    Box,
    CircularProgress,
    Flex,
    Heading,
    IconButton,
    useClipboard,
} from '@chakra-ui/react';
import type { EditorProps, OnChange } from '@monaco-editor/react';
import { StyledOcticon } from '@primer/components';
import {
    CheckIcon,
    ClippyIcon,
} from '@primer/components/node_modules/@primer/octicons-react';
import dynamic from 'next/dynamic';
import React, { useCallback, useReducer, useRef } from 'react';

const Editor = dynamic(import('@monaco-editor/react'), {
    ssr: false,
    loading: () => <CircularProgress isIndeterminate color="brand.500" />,
});

export type EditorWithCopyProps = EditorProps & {
    title?: string;
    blockClassName?: string;
};

export const EditorWithCopy = ({
    title,
    blockClassName,
    ...props
}: EditorWithCopyProps) => {
    const [copyValue, setCopyValue] = useReducer(
        (prevState, value: string) => ({ value, version: prevState.version++ }),
        {
            value: props.value,
            version: 0,
        }
    );

    const { onCopy: performCopy, hasCopied } = useClipboard(copyValue.value);

    const text = useRef(props.value);

    const onChange = useCallback<OnChange>(
        (currentText, e) => {
            text.current = currentText;
            props.onChange?.(currentText, e);
        },
        [props.onChange]
    );

    const copy = useCallback(() => {
        setCopyValue(text.current);
        setTimeout(performCopy);
    }, []);

    return (
        <Box
            className={blockClassName}
            width={props.width ?? '100%'}
            height={props.height}
        >
            {title && (
                <Flex
                    justifyContent="center"
                    backgroundColor="#252527"
                    width="100%"
                    padding="2"
                >
                    <Heading
                        size="sm"
                        fontWeight="normal"
                        color="white"
                        as="summary"
                        listStyleType="none"
                    >
                        {title}
                    </Heading>
                </Flex>
            )}
            <Box position="relative" width="100%" height="100%">
                <IconButton
                    onClick={copy}
                    aria-label="Copy code"
                    position="absolute"
                    zIndex="1"
                    top="5"
                    right="5"
                    icon={
                        hasCopied ? (
                            <StyledOcticon
                                as={CheckIcon}
                                color="text.success"
                            />
                        ) : (
                            <ClippyIcon />
                        )
                    }
                />
                <Editor
                    loading={
                        <CircularProgress color="brand.500" isIndeterminate />
                    }
                    theme="vs-dark"
                    {...props}
                    onChange={onChange}
                />
            </Box>
        </Box>
    );
};
