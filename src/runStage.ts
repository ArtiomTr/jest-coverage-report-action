import { DataCollector } from './DataCollector';
import { i18n } from './i18n';

export type SuccessfulStageResult<T> = [success: true, ouptut: T];

export type FailedStageResult = [success: false, output: undefined];

export type StageResult<T> = SuccessfulStageResult<T> | FailedStageResult;

const SKIP_SYMBOL = Symbol();

export const runStage = async <T, V>(
    stage: string,
    dataCollector: DataCollector<V>,
    action: (skip: () => never) => Promise<T> | T
): Promise<StageResult<T>> => {
    dataCollector.info(i18n(`stages.${stage}.begin`));

    const skip = () => {
        throw SKIP_SYMBOL;
    };

    try {
        const output = await action(skip);
        return [true, output];
    } catch (error) {
        if (error === SKIP_SYMBOL) {
            dataCollector.info(i18n(`stages.${stage}.skip`));
        } else {
            dataCollector.info(i18n(`stages.${stage}.fail`));
            dataCollector.error(error);
        }

        return [false, undefined];
    } finally {
        dataCollector.info(i18n(`stages.${stage}.end`));
    }
};
