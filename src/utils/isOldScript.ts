import { join } from 'path';

import { readFile } from 'fs-extra';

const packageScriptRegex = /^(?:(?:npm|yarn|pnpm)\s+(?:run\s+)?([\w:-]+))/;

export const isOldScript = async (
    command: string,
    workingDirectory: string | undefined
) => {
    if (command.includes('report.json')) {
        return true;
    }

    const matchResult = command.match(packageScriptRegex);

    if (matchResult) {
        const [, scriptName] = matchResult;

        try {
            const packageJson = JSON.parse(
                (
                    await readFile(
                        join(
                            ...([workingDirectory, 'package.json'].filter(
                                Boolean
                            ) as string[])
                        )
                    )
                ).toString()
            );

            const realScript = packageJson.scripts[scriptName];

            if (realScript.includes('report.json')) {
                return true;
            }
        } catch {
            /** ignore exceptions */
        }
    }

    return false;
};
