import * as core from '@actions/core';

export const createDataCollector = <T>(): DataCollector<T> => {
    const errors: Array<Error> = [];
    const collectedData: Array<T> = [];
    const messages: Array<string> = [];

    const error = (error: Error) => {
        errors.push(error);
        core.error(
            error.toString().concat(error.stack ? `\n${error.stack}` : '')
        );
    };

    const add = (data: T) => {
        collectedData.push(data);
    };

    const info = (message: string) => {
        messages.push(message);
        core.info(message);
    };

    const get = () => ({
        data: collectedData,
        errors,
        messages,
    });

    return {
        error,
        add,
        get,
        info,
    };
};

export type CollectedData<T> = {
    errors: Array<Error>;
    messages: Array<string>;
    data: Array<T>;
};

export type DataCollector<T> = {
    error: (error: Error) => void;
    info: (message: string) => void;
    add: (data: T) => void;
    get: () => CollectedData<T>;
};
