import { readConfig } from 'jest-config';

export const getThreshold = async (workingDirectory: string) => {
    const config = await readConfig(
        {
            _: [],
            $0: '',
        },
        workingDirectory
    );

    return config.globalConfig.coverageThreshold;
};
