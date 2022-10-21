import { loadConfig } from 'c12';

export const parseJestConfig = async (
    workingDirectory: string
): Promise<unknown> => {
    const { config } = await loadConfig({
        cwd: workingDirectory,
        name: 'jest',
    });

    return config;
};
