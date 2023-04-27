import { sep } from 'path';

import { exec } from '@actions/exec';
import { readFile } from 'fs-extra';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { getCoverage } from '../../src/stages/getCoverage';
import { ActionError } from '../../src/typings/ActionError';
import { JsonReport } from '../../src/typings/JsonReport';
import { Options } from '../../src/typings/Options';
import { FailReason } from '../../src/typings/Report';
import { createDataCollector } from '../../src/utils/DataCollector';
import { removeDirectory } from '../../src/utils/removeDirectory';

vi.mock('@actions/exec');
vi.mock('@actions/core');
vi.mock('@actions/github');
vi.mock('fs-extra');
vi.mock('../../src/utils/removeDirectory');

const defaultOptions: Options = {
    token: '',
    testScript: 'default script',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'none',
    prNumber: null,
    pullRequest: null,
    output: ['comment'],
};

const clearMocks = () => {
    vi.mocked(exec).mockClear();
    vi.mocked(readFile).mockClear();
    vi.mocked(removeDirectory).mockClear();
};

beforeEach(clearMocks);

describe('getCoverage', () => {
    it('should run all steps', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            defaultOptions,
            false,
            undefined
        );

        expect(removeDirectory).toBeCalledWith('node_modules');
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(
            exec
        ).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            { cwd: undefined }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should pass working-directory', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, workingDirectory: 'testDir' },
            false,
            undefined
        );

        expect(removeDirectory).toBeCalledWith(`testDir${sep}node_modules`);
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: 'testDir',
        });
        expect(
            exec
        ).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            { cwd: 'testDir' }
        );
        expect(readFile).toHaveBeenCalledWith(`testDir${sep}report.json`);

        expect(jsonReport).toStrictEqual({});
    });

    it('should pass package-manager', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReportYarn = await getCoverage(
            dataCollector,
            { ...defaultOptions, packageManager: 'yarn' },
            false,
            undefined
        );

        expect(exec).toBeCalledWith('yarn install', undefined, {
            cwd: undefined,
        });

        expect(jsonReportYarn).toStrictEqual({});

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReportPnpm = await getCoverage(
            dataCollector,
            { ...defaultOptions, packageManager: 'pnpm' },
            false,
            undefined
        );

        expect(exec).toBeCalledWith('pnpm install', undefined, {
            cwd: undefined,
        });

        expect(jsonReportPnpm).toStrictEqual({});
    });

    it('should skip installation step', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'install' },
            false,
            undefined
        );

        expect(removeDirectory).not.toBeCalledWith('node_modules');
        expect(exec).not.toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(
            exec
        ).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            { cwd: undefined }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should skip all steps', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            false,
            undefined
        );

        expect(removeDirectory).not.toBeCalledWith('node_modules');
        expect(exec).not.toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(exec).not.toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should run all steps, ignoring skip-step option', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(removeDirectory).toBeCalledWith('node_modules');
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(exec).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should run all steps, ignoring skip-step option', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(removeDirectory).toBeCalledWith('node_modules');
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(exec).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should ignore failing install stage', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );
        vi.mocked(exec).mockImplementationOnce(() => {
            throw new Error('not installed');
        });

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(removeDirectory).toBeCalledWith('node_modules');
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(exec).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should ignore failing test stage', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );
        vi.mocked(exec).mockImplementation((command: string) => {
            if (command.startsWith('default script')) {
                throw new Error('tests failed');
            }

            return Promise.resolve(0);
        });

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(removeDirectory).toBeCalledWith('node_modules');
        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
        expect(exec).toBeCalledWith(
            'default script --ci --json --coverage --testLocationInResults --outputFile="report.json"',
            [],
            {
                cwd: undefined,
            }
        );
        expect(readFile).toHaveBeenCalledWith('report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should throw error if report file not found', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(
            // FIXME: something wrong here
            () => undefined as any
        );

        await expect(
            getCoverage(
                dataCollector,
                { ...defaultOptions, skipStep: 'all' },
                true,
                undefined
            )
        ).rejects.toBeDefined();
    });

    it('should read coverage from specified coverage file', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('{}'))
        );

        const jsonReport = await getCoverage(
            dataCollector,
            defaultOptions,
            false,
            'custom filepath'
        );

        expect(removeDirectory).not.toBeCalled();
        expect(exec).not.toBeCalled();
        expect(readFile).toBeCalledWith('custom filepath');
        expect(readFile).toBeCalledTimes(1);

        expect(jsonReport).toStrictEqual({});
    });

    it('should return error, if reading from specified coverage file failed', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        vi.mocked(readFile).mockImplementationOnce(() => {
            throw new Error('a');
        });

        await expect(
            getCoverage(dataCollector, defaultOptions, false, 'custom filepath')
        ).rejects.toStrictEqual(
            new ActionError(FailReason.FAILED_GETTING_COVERAGE)
        );

        expect(removeDirectory).not.toBeCalled();
        expect(exec).not.toBeCalled();
        expect(readFile).toBeCalledWith('custom filepath');
        expect(readFile).toBeCalledTimes(1);
        expect(dataCollector.get().errors).toStrictEqual([
            new ActionError(FailReason.READING_COVERAGE_FILE_FAILED, {
                error: new Error('a').toString(),
            }),
        ]);
    });
});
