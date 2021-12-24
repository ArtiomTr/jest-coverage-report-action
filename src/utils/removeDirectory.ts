import { rm, rmdir } from 'fs-extra';
import { satisfies } from 'semver';

export const removeDirectory = (path: string) => {
    if (satisfies(process.version, '>=14.14.0')) {
        return rm(path, { force: true, recursive: true });
    } else {
        return rmdir(path, { recursive: true });
    }
};
