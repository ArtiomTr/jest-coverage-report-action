export const createDataCollector = <T>(): DataCollector<T> => {
    const errors: Array<string | Error> = [];
    const collectedData: Array<T> = [];
    const messages: Array<string> = [];

    const error = (error: string | Error) => {
        errors.push(error);
    };

    const add = (data: T) => {
        collectedData.push(data);
    };

    const info = (message: string) => {
        messages.push(message);
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
    errors: Array<string | Error>;
    messages: Array<string>;
    data: Array<T>;
};

export type DataCollector<T> = {
    error: (error: string | Error) => void;
    info: (message: string) => void;
    add: (data: T) => void;
    get: () => CollectedData<T>;
};
