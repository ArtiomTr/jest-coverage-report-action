import { parseJestConfig } from './parseJestConfig';
import { JestThreshold } from '../typings/JestThreshold';

export const tryGetJestThreshold = async (
    workingDirectory: string
): Promise<JestThreshold | undefined> => {
    try {
        const config = (await parseJestConfig(workingDirectory)) as
            | { coverageThreshold: JestThreshold }
            | undefined;

        return config?.coverageThreshold;
    } catch (err) {
        console.log(
            '[Warning] Failed to parse jest configuration.',
            '"coverageThreshold" from config file will be ignored.',
            err
        );
        return undefined;
    }
};
