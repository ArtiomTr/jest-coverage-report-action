import report from '../mock-data/jsonReport.json';

import { createReport, getSha } from '../../src/stages/createReport';
import { createDataCollector } from '../../src/utils/DataCollector';
import { JsonReport } from '../../src/typings/JsonReport';

import * as all from '@actions/github';

const { mockContext, clearContextMock } = all as any;

describe('createReport', () => {
    it('should match snapshots', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        dataCollector.add(report);
        mockContext({ payload: { after: '123456' } });
        expect(await createReport(dataCollector)).toMatchSnapshot();
        expect(
            await createReport(dataCollector, 'custom directory')
        ).toMatchSnapshot();
        expect(
            await createReport(
                dataCollector,
                'directory',
                'Custom title with directory - {{ dir }}'
            )
        ).toMatchSnapshot();
        clearContextMock();
    });

    it('should extract commit shasum from context', async () => {
        mockContext({ payload: { after: '123456' } });
        expect(getSha()).toBe('123456');
        clearContextMock();

        mockContext({ payload: { pull_request: { head: { sha: '123456' } } } });
        expect(getSha()).toBe('123456');
        clearContextMock();

        mockContext({ payload: {}, sha: '123456' });
        expect(getSha()).toBe('123456');
        clearContextMock();
    });
});
