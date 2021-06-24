import { Select, SelectProps, Text } from '@chakra-ui/react';
import { useField } from 'formik';
import React from 'react';

export type SelectFieldProps = {
    name: string;
    options: string[];
    label?: string;
} & SelectProps;

export const SelectField = ({
    options,
    name,
    label,
    ...otherSelectProps
}: SelectFieldProps) => {
    const [inputProps] = useField(name);

    return (
        <React.Fragment>
            {label && <Text>{label}</Text>}
            <Select {...inputProps} {...otherSelectProps}>
                {options.map((option, index) => (
                    <option value={option} key={index}>
                        {option}
                    </option>
                ))}
            </Select>
        </React.Fragment>
    );
};
