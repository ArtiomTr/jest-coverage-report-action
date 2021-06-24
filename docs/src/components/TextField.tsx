import { Input, InputProps, Text } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

export type TextFieldProps = {
    name: string;
    label?: string;
} & InputProps;

export const TextField = ({
    name,
    label,
    ...otherInputProps
}: TextFieldProps) => {
    const [inputProps, { touched, error }] = useField<string>({
        name,
    });

    return (
        <React.Fragment>
            {label && <Text>{label}</Text>}
            <Input
                {...inputProps}
                isInvalid={touched && !!error}
                {...otherInputProps}
            />
        </React.Fragment>
    );
};
