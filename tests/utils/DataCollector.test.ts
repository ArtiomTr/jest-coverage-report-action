import { ActionError } from '../../src/typings/ActionError';
import { FailReason } from '../../src/typings/Report';
import { createDataCollector } from '../../src/utils/DataCollector';

describe('DataCollector', () => {
    it('should collect data', () => {
        const dataCollector = createDataCollector();

        dataCollector.add('hello');
        dataCollector.add('world');
        dataCollector.add('this');

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

        expect(dataCollector.get().messages).toStrictEqual([
            'hello',
            'world',
            'this',
        ]);
    });
});
