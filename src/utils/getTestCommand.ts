import { isOldScript } from './isOldScript';

export const getTestCommand = async (
    command: string,
    _outputFile: string,
    workingDirectory: string | undefined
) => {
    if (await isOldScript(command, workingDirectory)) {
        // TODO: add warning here
        return command;
    }

    // building new command
    const newCommandBuilder: (string | boolean)[] = [command];

    return newCommandBuilder.filter(Boolean).join(' ');
};
