import { getInput } from '@actions/core';
import * as yup from 'yup';

import { icons } from '../format/strings.json';

export type IconType = keyof typeof icons;

export type AnnotationType = 'all' | 'none' | 'coverage' | 'failed-tests';
export type PackageManagerType = 'npm' | 'yarn' | 'pnpm';
export type SkipStepType = 'all' | 'none' | 'install';

export type Options = {
    token: string;
    testScript: string;
    iconType: IconType;
    annotations: AnnotationType;
    threshold?: number;
    workingDirectory?: string;
    packageManager: PackageManagerType;
    skipStep: SkipStepType;
    customTitle?: string;
    coverageFile?: string;
    baseCoverageFile?: string;
    preTestScript?: string;
};

const validAnnotationOptions: Array<AnnotationType> = [
    'all',
    'none',
    'coverage',
    'failed-tests',
];

const packageManagerOptions: Array<PackageManagerType> = [
    'npm',
    'yarn',
    'pnpm',
];

const validIconOptions = Object.keys(icons);

const validSkipStepOptions: Array<SkipStepType> = ['all', 'none', 'install'];

const optionSchema = yup.object().shape({
    token: yup.string().required(),
    preTestScript: yup.string(),
    testScript: yup.string().required(),
    iconType: yup.string().required().oneOf(validIconOptions),
    annotations: yup.string().required().oneOf(validAnnotationOptions),
    threshold: yup
        .number()
        .transform((value) => (isNaN(value) ? undefined : value))
        .min(0)
        .max(100),
    workingDirectory: yup.string(),
    packageManager: yup.string().required().oneOf(packageManagerOptions),
    skipStep: yup.string().required().oneOf(validSkipStepOptions),
    customTitle: yup.string(),
    coverageFile: yup.string(),
    baseCoverageFile: yup.string(),
});

export const shouldInstallDeps = (skipStep: SkipStepType): Boolean =>
    !['all', 'install'].includes(skipStep);

export const shouldRunTestScript = (skipStep: SkipStepType): Boolean =>
    !['all'].includes(skipStep);

export const getOptions = async (): Promise<Options> => {
    const token = getInput('github-token', {
        required: true,
    });

    const preTestScript = getInput('pre-test-script');
    const testScript = getInput('test-script');
    const threshold = getInput('threshold');
    const workingDirectory = getInput('working-directory');
    const iconType = getInput('icons');
    const annotations = getInput('annotations');
    const packageManager = getInput('package-manager');
    const skipStep = getInput('skip-step');
    const customTitle = getInput('custom-title');
    const coverageFile = getInput('coverage-file');
    const baseCoverageFile = getInput('base-coverage-file');

    try {
        const options: Options = (await optionSchema.validate({
            token,
            preTestScript,
            testScript,
            threshold,
            workingDirectory,
            iconType,
            annotations,
            packageManager,
            skipStep,
            customTitle,
            coverageFile,
            baseCoverageFile,
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
