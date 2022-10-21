import { loadConfig } from 'c12';

export const parseJestConfig = (workingDirectory: string): Promise<unknown> => {
    return loadConfig({
        cwd: workingDirectory,
        name: 'jest',
    });
};
