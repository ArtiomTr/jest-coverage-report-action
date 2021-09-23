export const context: Record<string, unknown> = {};

export const mockContext = (newContext: Record<string, unknown>) => {
    Object.assign(context, newContext);
};

export const clearContextMock = () => {
    Object.keys(context).map((key) => {
        delete context[key];
    });
};

export const getOctokit = jest.fn();
