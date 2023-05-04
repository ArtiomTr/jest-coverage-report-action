import { loadConfig } from 'c12';

export const parseJestConfig = async (
    workingDirectory: string
): Promise<unknown> => {
    let { config } = await loadConfig({
        cwd: workingDirectory,
        name: 'jest',
    });

    if (!config || Object.keys(config).length === 0) {
        const packageJson = await loadConfig({
            cwd: workingDirectory,
            configFile: 'package.json',
        });

        config = packageJson.config?.jest || {};
    }

    return config;
};
