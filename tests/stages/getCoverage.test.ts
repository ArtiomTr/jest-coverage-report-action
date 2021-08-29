import { getCoverage } from '../../src/stages/getCoverage';
import { createDataCollector } from '../../src/utils/DataCollector';

describe('getCoverage', () => {
    it('default case', async () => {
        const dataCollector = createDataCollector();
        await getCoverage();
    });
});
