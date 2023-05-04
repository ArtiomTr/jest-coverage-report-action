import { loadConfig } from 'c12';

export const parseJestConfig = async (
    workingDirectory: string
): Promise<unknown> => {
    let { config } = await loadConfig({
        cwd: workingDirectory,
        name: 'jest',
    });

    if (!config || Object.keys(config).length === 0) {
        config = await loadConfig({
            cwd: workingDirectory,
            name: 'jest',
            packageJson: true,
        });
    }

    return config;
};
