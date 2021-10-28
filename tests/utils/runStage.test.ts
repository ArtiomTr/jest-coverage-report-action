import { createDataCollector } from '../../src/utils/DataCollector';
import { runStage } from '../../src/utils/runStage';

describe('runStage', () => {
    it('should run successfully', async () => {
        const dataCollector = createDataCollector();
        const [succeed, result] = await runStage(
            'initialize',
            dataCollector,
            () => {
                return Promise.resolve('some result');
            }
        );

        expect(succeed).toBeTruthy();
        expect(result).toBe('some result');
        expect(dataCollector.get().messages).toStrictEqual([
            'Begin initialization stage...',
            'Initialization stage ended',
        ]);
    });

    it('should skip', async () => {
        const dataCollector = createDataCollector();
        const [succeed, result] = await runStage(
            'initialize',
            dataCollector,
            (skip) => {
                skip();
            }
        );

        expect(succeed).toBeFalsy();
        expect(result).toBe(undefined);
        expect(dataCollector.get().messages).toStrictEqual([
            'Begin initialization stage...',
            'Initialization stage skipped',
            'Initialization stage ended',
        ]);
    });

    it('should fail', async () => {
        const dataCollector = createDataCollector();
        const [succeed, result] = await runStage(
            'initialize',
            dataCollector,
            () => {
                return Promise.reject('New error');
            }
        );

        expect(succeed).toBeFalsy();
        expect(result).toBe(undefined);
        expect(dataCollector.get().messages).toStrictEqual([
            'Begin initialization stage...',
            'Initialization stage failed',
            'Initialization stage ended',
        ]);
        expect(dataCollector.get().errors).toStrictEqual(['New error']);
    });
});
