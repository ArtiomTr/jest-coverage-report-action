import { isOldScript } from './isOldScript';

export const getTestCommand = async (
    command: string,
    outputFile: string,
    workingDirectory: string | undefined
) => {
    if (await isOldScript(command, workingDirectory)) {
        // TODO: add warning here
        return command;
    }

    const isNpmStyle = command.startsWith('npm') || command.startsWith('pnpm');

    const hasDoubleHyhen = command.includes(' -- ');

    // building new command
    const newCommandBuilder: (string | boolean)[] = [
        command,
        // add two hypens if it is npm or pnpm package managers and two hyphens don't already exist
        isNpmStyle && !hasDoubleHyhen && '--',
        // argument which indicates that jest runs in CI environment
        '--ci',
        // telling jest that output should be in json format
        '--json',
        // force jest to collect coverage
        '--coverage',
        // argument which tells jest to include tests' locations in the generated json output
        '--testLocationInResults',
        // output file
        `--outputFile="${outputFile}"`,
    ];

    return newCommandBuilder.filter(Boolean).join(' ');
};
