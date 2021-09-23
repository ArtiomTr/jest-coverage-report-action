import { readFile } from 'fs-extra';

import { collectCoverage } from '../../src/stages/collectCoverage';
import { FailReason } from '../../src/typings/Report';
import { createDataCollector } from '../../src/utils/DataCollector';

const clearMocks = () => {
    (readFile as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('collectCoverage', () => {
    it('should read report file by default', async () => {
        const dataCollector = createDataCollector();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => 'Value');

        await expect(collectCoverage(dataCollector)).resolves.toBe('Value');
        expect(readFile).toBeCalledWith('report.json');

        (readFile as jest.Mock<any, any>).mockImplementationOnce(
            () => 'New value'
        );

        await expect(
            collectCoverage(dataCollector, 'customFolder')
        ).resolves.toBe('New value');
        expect(readFile).toBeCalledWith('customFolder/report.json');

        (readFile as jest.Mock<any, any>).mockImplementationOnce(
            () => 'Value 3'
        );
        await expect(
            collectCoverage(dataCollector, 'asdf', 'path')
        ).resolves.toBe('Value 3');
        expect(readFile).toBeCalledWith('path');
    });

    it('should throw error if report not found', async () => {
        const dataCollector = createDataCollector();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw {
                code: 'ENOENT',
            };
        });

        await expect(collectCoverage(dataCollector)).rejects.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });

    it('should throw unknown error', async () => {
        const dataCollector = createDataCollector();

        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw new Error('Custom error');
        });

        await expect(collectCoverage(dataCollector)).rejects.not.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });
});
