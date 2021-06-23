import { getInput } from '@actions/core';
import * as yup from 'yup';

import { icons } from '../format/strings.json';

export type IconType = keyof typeof icons;

export type AnnotationType = 'all' | 'none' | 'coverage' | 'failed-tests';

export type PackageManagerType = 'npm' | 'yarn';

export type Options = {
    token: string;
    testScript: string;
    iconType: IconType;
    annotations: AnnotationType;
    threshold?: number;
    workingDirectory?: string;
    packageManager: PackageManagerType;
};

const validAnnotationOptions: Array<AnnotationType> = [
    'all',
    'none',
    'coverage',
    'failed-tests',
];

const packageManagerOptions: Array<PackageManagerType> = ['npm', 'yarn'];

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
    packageMana: yup.string(),
    packageManager: yup.string().required().oneOf(packageManagerOptions),
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
    const packageManager = getInput('package-manager');

    try {
        const options: Options = (await optionSchema.validate({
            token,
            testScript,
            threshold,
            workingDirectory,
            iconType,
            annotations,
            packageManager,
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
