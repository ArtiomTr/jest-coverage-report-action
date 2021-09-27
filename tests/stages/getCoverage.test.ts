import { exec } from '@actions/exec';
import { readFile, rmdir } from 'fs-extra';

import { getCoverage } from '../../src/stages/getCoverage';
import { JsonReport } from '../../src/typings/JsonReport';
import { Options } from '../../src/typings/Options';
import { createDataCollector } from '../../src/utils/DataCollector';

const defaultOptions: Options = {
    token: '',
    testScript: 'default script',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'none',
};

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
    (rmdir as jest.Mock<any, any>).mockClear();
    (readFile as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('getCoverage', () => {
    it('should run all steps', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            defaultOptions,
            false,
            undefined
        );

        expect(rmdir).toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, workingDirectory: 'testDir' },
            false,
            undefined
        );

        expect(rmdir).toBeCalledWith('testDir/node_modules', {
            recursive: true,
        });
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
        expect(readFile).toHaveBeenCalledWith('testDir/report.json');

        expect(jsonReport).toStrictEqual({});
    });

    it('should pass package-manager', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, packageManager: 'yarn' },
            false,
            undefined
        );

        expect(exec).toBeCalledWith('yarn install', undefined, {
            cwd: undefined,
        });

        expect(jsonReport).toStrictEqual({});
    });

    it('should skip installation step', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'install' },
            false,
            undefined
        );

        expect(rmdir).not.toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            false,
            undefined
        );

        expect(rmdir).not.toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(rmdir).toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(rmdir).toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');
        (exec as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw new Error('not installed');
        });

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(rmdir).toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');
        (exec as jest.Mock<any, any>).mockImplementation((command: string) => {
            if (command.startsWith('default script')) {
                throw new Error('tests failed');
            }
        });

        const jsonReport = await getCoverage(
            dataCollector,
            { ...defaultOptions, skipStep: 'all' },
            true,
            undefined
        );

        expect(rmdir).toBeCalledWith('node_modules', { recursive: true });
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(
            () => undefined
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

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => '{}');

        const jsonReport = await getCoverage(
            dataCollector,
            defaultOptions,
            false,
            'custom filepath'
        );

        expect(rmdir).not.toBeCalled();
        expect(exec).not.toBeCalled();
        expect(readFile).toBeCalledWith('custom filepath');
        expect(readFile).toBeCalledTimes(1);

        expect(jsonReport).toStrictEqual({});
    });

    it('should return error, if reading from specified coverage file failed', async () => {
        const dataCollector = createDataCollector<JsonReport>();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw 'some error';
        });

        await expect(
            getCoverage(dataCollector, defaultOptions, false, 'custom filepath')
        ).rejects.toBe('failedGettingCoverage');

        expect(rmdir).not.toBeCalled();
        expect(exec).not.toBeCalled();
        expect(readFile).toBeCalledWith('custom filepath');
        expect(readFile).toBeCalledTimes(1);
        expect(dataCollector.get().errors).toStrictEqual([
            'readingCoverageFileFailed',
            'some error',
        ]);
    });
});
