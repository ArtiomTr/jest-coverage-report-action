const input: Record<string, unknown> = {};

export const getInput = (name: string) => input[name];

export const mockInput = (newInput: Record<string, unknown>) => {
    Object.assign(input, newInput);
};

export const clearInputMock = () => {
    Object.keys(input).map((key) => {
        delete input[key];
    });
};

export const setFailed = jest.fn();
