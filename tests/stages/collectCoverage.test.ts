import { collectCoverage } from '../../src/stages/collectCoverage';
import { FailReason } from '../../src/typings/Report';

describe('collectCoverage', () => {
    it('should read report file by default', async () => {
        await expect(
            collectCoverage().then((value) => value.toString())
        ).resolves.toBe('report.json');

        await expect(
            collectCoverage('customFolder').then((value) => value.toString())
        ).resolves.toBe('customFolder/report.json');
    });

    it('should throw error if report not found', async () => {
        await expect(collectCoverage('[enoent]')).rejects.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });

    it('should throw unknown error', async () => {
        await expect(collectCoverage('[error]')).rejects.not.toBe(
            FailReason.REPORT_NOT_FOUND
        );
    });
});
