import { REPORT_PATH } from '../../src/constants/REPORT_PATH';

describe('REPORT_PATH', () => {
    it('should be "report.json"', () => {
        expect(REPORT_PATH).toBe('report.json');
    });
});
