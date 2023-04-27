import { sep } from 'path';

import { readFile } from 'fs-extra';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { collectCoverage } from '../../src/stages/collectCoverage';
import { ActionError } from '../../src/typings/ActionError';
import { FailReason } from '../../src/typings/Report';
import { createDataCollector } from '../../src/utils/DataCollector';

vi.mock('fs-extra');
vi.mock('@actions/core');

const clearMocks = () => {
    vi.mocked(readFile).mockClear();
};

beforeEach(clearMocks);

describe('collectCoverage', () => {
    it('should read report.json by default', async () => {
        const dataCollector = createDataCollector();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('Value'))
        );

        await expect(collectCoverage(dataCollector)).resolves.toBe('Value');
        expect(readFile).toBeCalledWith('report.json');
    });

    it('should read report.json from correct path when working directory is provided', async () => {
        const dataCollector = createDataCollector();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('New value'))
        );

        await expect(
            collectCoverage(dataCollector, 'customFolder')
        ).resolves.toBe('New value');
        expect(readFile).toBeCalledWith(`customFolder${sep}report.json`);
    });

    it('should read report from correct path when working directory and custom report path is provided', async () => {
        const dataCollector = createDataCollector();

        vi.mocked(readFile).mockImplementationOnce(() =>
            Promise.resolve(Buffer.from('New value'))
        );

        await expect(
            collectCoverage(
                dataCollector,
                'customFolder',
                './customReport.json'
            )
        ).resolves.toBe('New value');
        expect(readFile).toBeCalledWith(`customFolder${sep}customReport.json`);
    });

    it('should throw error if report not found', async () => {
        const dataCollector = createDataCollector();

        vi.mocked(readFile).mockImplementationOnce(() => {
            throw {
                code: 'ENOENT',
            };
        });

        await expect(collectCoverage(dataCollector)).rejects.toStrictEqual(
            new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: 'report.json',
            })
        );
    });

    it('should throw unknown error', async () => {
        const dataCollector = createDataCollector();

        vi.mocked(readFile).mockImplementationOnce(() => {
            throw new Error('Custom error');
        });

        await expect(collectCoverage(dataCollector)).rejects.not.toStrictEqual(
            new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: 'report.json',
            })
        );
    });
});
