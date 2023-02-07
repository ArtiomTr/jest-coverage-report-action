import { getInput } from '@actions/core';
import { context, getOctokit } from '@actions/github';
import * as yup from 'yup';

import { icons } from '../format/strings.json';

export type IconType = keyof typeof icons;

export type AnnotationType = 'all' | 'none' | 'coverage' | 'failed-tests';
export type PackageManagerType = 'npm' | 'yarn' | 'pnpm';
export type SkipStepType = 'all' | 'none' | 'install';
export type OutputType = 'comment' | 'report-markdown';

export type GithubRepo = {
    clone_url: string;
};

export type GithubRef = {
    ref: string;
    sha: string;
    repo: GithubRepo;
};

export type PullRequest = {
    base: GithubRef;
    head: GithubRef;
    number: number;
};
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
    prNumber: null | number;
    pullRequest: null | PullRequest;
    output: Array<OutputType>;
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

const validOutputTypeOptions: Array<OutputType> = [
    'comment',
    'report-markdown',
];

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
    packageManager: yup.string().required().oneOf(packageManagerOptions),
    skipStep: yup.string().required().oneOf(validSkipStepOptions),
    customTitle: yup.string(),
    coverageFile: yup.string(),
    baseCoverageFile: yup.string(),
    prNumber: yup.number().nullable(),
    pullRequest: yup.object().nullable(),
    output: yup
        .array()
        .required()
        .transform((_, originalValue: string) => originalValue.split(', '))
        .of(yup.string().required().oneOf(validOutputTypeOptions)),
});

export const shouldInstallDeps = (skipStep: SkipStepType): Boolean =>
    !['all', 'install'].includes(skipStep);

export const shouldRunTestScript = (skipStep: SkipStepType): Boolean =>
    !['all'].includes(skipStep);

export const getOptions = async (): Promise<Options> => {
    const token = getInput('github-token', {
        required: true,
    });
    const octokit = getOctokit(token);
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
    const prNumber: number | null = Number(
        getInput('prnumber') || context?.payload?.pull_request?.number
    );
    const output = getInput('output');
    let pullRequest = context?.payload?.pull_request || null;

    if (!pullRequest && !Number.isNaN(prNumber)) {
        const { data: pr } = await octokit.rest.pulls.get({
            owner: context.repo.owner,
            repo: context.repo.repo,
            pull_number: prNumber,
        });
        pullRequest = pr as PullRequest;
    }
    try {
        const options: Options = (await optionSchema.validate({
            token,
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
            prNumber: prNumber || null,
            pullRequest,
            output,
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
