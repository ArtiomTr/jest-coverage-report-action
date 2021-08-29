import { readFile } from 'fs-extra';

import { collectCoverage } from '../../src/stages/collectCoverage';
import { FailReason } from '../../src/typings/Report';

const clearMocks = () => {
    (readFile as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('collectCoverage', () => {
    it('should read report file by default', async () => {
        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => 'Value');

        await expect(collectCoverage()).resolves.toBe('Value');
        expect(readFile).toBeCalledWith('report.json');

        (readFile as jest.Mock<any, any>).mockImplementationOnce(
            () => 'New value'
        );

        await expect(collectCoverage('customFolder')).resolves.toBe(
            'New value'
        );
        expect(readFile).toBeCalledWith('customFolder/report.json');
    });

    it('should throw error if report not found', async () => {
        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw {
                code: 'ENOENT',
            };
        });

        await expect(collectCoverage()).rejects.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });

    it('should throw unknown error', async () => {
        (readFile as jest.Mock<any, any>).mockImplementationOnce(() => {
            throw new Error('Custom error');
        });

        await expect(collectCoverage()).rejects.not.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });
});
