import * as core from '@actions/core';

import { ActionError } from '../../src/typings/ActionError';
import { FailReason } from '../../src/typings/Report';
import { createDataCollector } from '../../src/utils/DataCollector';

describe('DataCollector', () => {
    beforeEach(() => {
        (core.error as jest.Mock).mockClear();
        (core.info as jest.Mock).mockClear();
    });

    it('should collect data', () => {
        const dataCollector = createDataCollector();

        dataCollector.add('hello');
        dataCollector.add('world');
        dataCollector.add('this');

        expect(core.error).not.toHaveBeenCalled();
        expect(core.info).not.toHaveBeenCalled();

        expect(dataCollector.get().data).toStrictEqual([
            'hello',
            'world',
            'this',
        ]);
    });

    it('should collect errors', () => {
        const dataCollector = createDataCollector();

        dataCollector.error(new ActionError(FailReason.TESTS_FAILED));
        dataCollector.error(new Error('world'));
        dataCollector.error(
            new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: 'somepath',
            })
        );

        expect(core.error).toHaveBeenCalledTimes(3);
        expect(core.info).not.toHaveBeenCalled();

        expect(dataCollector.get().errors).toStrictEqual([
            new ActionError(FailReason.TESTS_FAILED),
            new Error('world'),
            new ActionError(FailReason.REPORT_NOT_FOUND, {
                coveragePath: 'somepath',
            }),
        ]);
    });

    it('should collect info', () => {
        const dataCollector = createDataCollector();

        dataCollector.info('hello');
        dataCollector.info('world');
        dataCollector.info('this');

        expect(core.error).not.toHaveBeenCalled();
        expect(core.info).toHaveBeenCalledTimes(3);

        expect(dataCollector.get().messages).toStrictEqual([
            'hello',
            'world',
            'this',
        ]);
    });
});
