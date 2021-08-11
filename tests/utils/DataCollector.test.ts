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

        dataCollector.error('hello');
        dataCollector.error(new Error('world'));
        dataCollector.error('this');

        expect(dataCollector.get().errors).toStrictEqual([
            'hello',
            new Error('world'),
            'this',
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
