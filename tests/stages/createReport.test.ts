import * as all from '@actions/github';

import { createReport, getSha } from '../../src/stages/createReport';
import { JsonReport } from '../../src/typings/JsonReport';
import { Options } from '../../src/typings/Options';
import { createDataCollector } from '../../src/utils/DataCollector';
import report from '../mock-data/jsonReport.json';

const { mockContext, clearContextMock } = all as any;

const DEFAULT_OPTIONS: Options = {
    token: '',
    preTestScript: '',
    testScript: '',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'all',
};

describe('createReport', () => {
    it('should match snapshots', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        dataCollector.add(report);

        mockContext({ payload: { after: '123456' } });
        expect(
            await createReport(
                dataCollector,
                {
                    ...DEFAULT_OPTIONS,
                    workingDirectory: 'custom directory',
                },
                []
            )
        ).toMatchSnapshot();
        expect(
            await createReport(dataCollector, DEFAULT_OPTIONS, [])
        ).toMatchSnapshot();

        expect(
            await createReport(
                dataCollector,
                {
                    ...DEFAULT_OPTIONS,
                    workingDirectory: 'directory',
                    customTitle: 'Custom title with directory - {{ dir }}',
                },
                []
            )
        ).toMatchSnapshot();

        clearContextMock();
    });

    it('should match snapshots (failed report)', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        dataCollector.add({ ...report, success: false });

        mockContext({ payload: { after: '123456' } });

        expect(
            await createReport(dataCollector, DEFAULT_OPTIONS, [])
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
