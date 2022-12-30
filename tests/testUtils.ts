export const mocked = <T extends (...args: any[]) => any>(
    fn: T
): jest.Mock<ReturnType<T>, Parameters<T>> => {
    return (fn as unknown) as jest.Mock<ReturnType<T>, Parameters<T>>;
};
