export const insertArgs = (
    text: string,
    args: Record<string, string | number | undefined>
) => {
    Object.keys(args).forEach(
        (argName) =>
            args[argName] !== undefined &&
            args[argName] !== null &&
            (text = text.replace(`{{ ${argName} }}`, args[argName] as string))
    );
    return text;
};
