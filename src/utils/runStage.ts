import { DataCollector } from './DataCollector';
import { i18n } from './i18n';

export type SuccessfulStageResult<T> = [success: true, output: T];

export type FailedStageResult = [success: false, output: undefined];

export type StageResult<T> = SuccessfulStageResult<T> | FailedStageResult;

const SKIP_SYMBOL = Symbol();

export const runStage = async <T, V>(
    stage: string,
    dataCollector: DataCollector<V>,
    action: (skip: () => never) => Promise<T> | T
): Promise<StageResult<T>> => {
    const stageKey = `stages.${stage}`;
    dataCollector.info(
        i18n('stages.defaults.begin', {
            stage: i18n(stageKey).toLowerCase(),
        })
    );

    const skip = () => {
        throw SKIP_SYMBOL;
    };

    try {
        const output = await action(skip);
        return [true, output];
    } catch (error) {
        if (error === SKIP_SYMBOL) {
            dataCollector.info(
                i18n('stages.defaults.skip', {
                    stage: i18n(stageKey),
                })
            );
        } else {
            dataCollector.info(
                i18n('stages.defaults.fail', {
                    stage: i18n(stageKey),
                })
            );
            dataCollector.error(error as Error);
        }

        return [false, undefined];
    } finally {
        dataCollector.info(
            i18n('stages.defaults.end', {
                stage: i18n(stageKey),
            })
        );
    }
};
