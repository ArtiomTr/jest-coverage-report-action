import { getInput } from '@actions/core';
import * as yup from 'yup';

import { icons } from '../format/strings.json';

export type IconType = keyof typeof icons;

export type AnnotationType = 'all' | 'none' | 'coverage' | 'failed-tests';

export type Options = {
    token: string;
    testScript: string;
    iconType: IconType;
    annotations: AnnotationType;
    threshold?: number;
    workingDirectory?: string;
};

const validAnnotationOptions: Array<AnnotationType> = [
    'all',
    'none',
    'coverage',
    'failed-tests',
];

const validIconOptions = Object.keys(icons);

const optionSchema = yup.object().shape({
    token: yup.string().required(),
    testScript: yup.string().required(),
    iconType: yup.string().required().oneOf(validIconOptions),
    annotations: yup.string().required().oneOf(validAnnotationOptions),
    threshold: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0)
        .max(100),
    workingDirectory: yup.string(),
});

export const getOptions = async (): Promise<Options> => {
    const token = getInput('github_token', {
        required: true,
    });

    const testScript = getInput('test_script');
    const threshold = getInput('threshold');
    const workingDirectory = getInput('working_directory');
    const iconType = getInput('icons');
    const annotations = getInput('annotations');

    try {
        const options: Options = (await optionSchema.validate({
            token,
            testScript,
            threshold,
            workingDirectory,
            iconType,
            annotations,
        })) as Options;

        return options;
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            throw new Error(
                [err.message, ...err.errors].filter(Boolean).join('\n')
            );
        }

        throw err;
    }
};
