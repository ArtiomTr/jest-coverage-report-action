import { getInput } from '@actions/core';
import { z } from 'zod';

const optionSchema = z.strictObject({
    githubToken: z.string(),
    testScript: z.string().optional(),
    workingDirectory: z.string().optional(),
    annotations: z
        .enum(['none', 'coverage', 'failed-tests', 'all'])
        .default('all'),
    packageManager: z.enum(['npm', 'yarn', 'pnpm']).default('npm'),
    skipStep: z.enum(['none', 'install', 'all']).default('none'),
    customTitle: z.string().optional(),
    coverageFile: z.string().optional(),
    baseCoverageFile: z.string().optional(),
    prNumber: z.coerce.number().optional(),
    output: z
        .string()
        .transform((i) => i.split(',').map((j) => j.trim()))
        .pipe(z.enum(['comment', 'report-markdown']).array())
        .default('comment'),
});

export type Options = z.infer<typeof optionSchema>;

export const getOptions = () => {
    return optionSchema.safeParse({
        githubToken: getInput('github-token'),
        testScript: getInput('test-script'),
        workingDirectory: getInput('working-directory'),
        annotations: getInput('annotations'),
        packageManager: getInput('package-manager'),
        skipStep: getInput('skip-step'),
        customTitle: getInput('custom-title'),
        coverageFile: getInput('coverage-file'),
        baseCoverageFile: getInput('base-coverage-file'),
        prNumber: getInput('prnumber'),
        output: getInput('output'),
    });
};
