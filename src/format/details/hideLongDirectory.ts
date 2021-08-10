import { dirname, basename } from 'path';

// if directory is longer than LONG_DIRECTORY_LENGTH, it is assumed to be a long directory
const LONG_DIRECTORY_LENGTH = 15;

export const hideLongDirectory = (filename: string) => {
    const dir = dirname(filename);

    if (dir.length >= LONG_DIRECTORY_LENGTH) {
        return `<span title=${dir}>\`...\`</span>/${basename(filename)}`;
    }

    return filename;
};
