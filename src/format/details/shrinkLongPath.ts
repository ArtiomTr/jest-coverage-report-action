import { dirname, basename } from 'path';

// if path is longer than LONG_PATH_LENGTH, it is assumed to be a long path
const LONG_PATH_LENGTH = 20;

export const shrinkLongPath = (filename: string) => {
    const dir = dirname(filename);

    if (dir.length >= LONG_PATH_LENGTH) {
        return `<span title=${dir}>\`...\`</span>/${basename(filename)}`;
    }

    return filename;
};
