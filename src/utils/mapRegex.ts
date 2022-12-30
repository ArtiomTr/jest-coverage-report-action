export const mapRegex = <T>(
    text: string,
    regex: RegExp,
    matchReplace: (result: RegExpExecArray) => T,
    otherReplace: (result: string) => T
): T[] => {
    const regexCopy = new RegExp(regex, 'g');

    let result: RegExpExecArray | null = null;

    let lastIndex = 0;

    const mappedOutput: T[] = [];

    const addUnmatched = (index: number) => {
        const unmatched = text.substring(lastIndex, index);

        if (unmatched.length > 0) {
            mappedOutput.push(otherReplace(unmatched));
        }
    };

    while ((result = regexCopy.exec(text)) !== null) {
        addUnmatched(result.index);
        mappedOutput.push(matchReplace(result));

        lastIndex = result.index + result[0].length;
    }

    addUnmatched(text.length);
    return mappedOutput;
};
