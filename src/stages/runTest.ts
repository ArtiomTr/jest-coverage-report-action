import { exec } from '@actions/exec';

import { JsonReport } from '../typings/JsonReport';
import { DataCollector } from '../utils/DataCollector';
import { getTestCommand } from '../utils/getTestCommand';

const THRESHOLD_NOT_MET_REGEX = /Jest:.+not met:.+\d%/gm;

export const runTest = async (
    testCommand: string,
    workingDirectory?: string,
    dataCollector?: DataCollector<JsonReport>
) => {
    let thresholdErrors: string[] = [];
    try {
        await exec(
            await getTestCommand(testCommand, 'report.json', workingDirectory),
            [],
            {
                cwd: workingDirectory,
                listeners: {
                    stderr: (data: Buffer) => {
                        const output = data.toString();

                        const matches =
                            output.match(THRESHOLD_NOT_MET_REGEX) ?? [];

                        if (matches) {
                            thresholdErrors = [...thresholdErrors, ...matches];
                        }
                    },
                },
            }
        );
    } catch (error) {
        if (thresholdErrors.length) {
            thresholdErrors.forEach((err) =>
                dataCollector?.error(new Error(err))
            );
        }
    }
};
