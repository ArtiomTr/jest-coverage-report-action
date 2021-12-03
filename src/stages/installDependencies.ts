import { exec } from '@actions/exec';
import { rm } from 'fs-extra';

import { PackageManagerType } from '../typings/Options';
import { joinPaths } from '../utils/joinPaths';

export const installDependencies = async (
    packageManager: PackageManagerType = 'npm',
    workingDirectory?: string
) => {
    // NOTE: The `npm ci` command is not used. Because if your version of npm is old, the generated `package-lock.json` will also be old, and the latest version of `npm ci` will fail.
    await rm(joinPaths(workingDirectory, 'node_modules'), {
        recursive: true,
        force: true,
    });

    await exec(`${packageManager} install`, undefined, {
        cwd: workingDirectory,
    });
};
