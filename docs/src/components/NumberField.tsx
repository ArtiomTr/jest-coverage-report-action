import {
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputProps,
    NumberInputStepper,
    Text,
} from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

export type NumberFieldProps = {
    name: string;
    label?: string;
} & NumberInputProps;

export const NumberField = ({
    name,
    label,
    ...otherInputProps
}: NumberFieldProps) => {
    const [{ value }, , { setValue }] = useField(name);

    return (
        <React.Fragment>
            {label && <Text>{label}</Text>}
            <NumberInput
                onChange={(_, newValue) =>
                    setValue(isNaN(newValue) ? undefined : newValue)
                }
                value={value}
                {...otherInputProps}
            >
                <NumberInputField />
                <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                </NumberInputStepper>
            </NumberInput>
        </React.Fragment>
    );
};
