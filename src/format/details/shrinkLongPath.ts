import { dirname, basename } from 'path';

// if path is longer than LONG_PATH_LENGTH, it is assumed to be a long path
const LONG_PATH_LENGTH = 20;

export const shrinkLongPath = (filename: string) => {
    if (filename.length >= LONG_PATH_LENGTH) {
        return `<span title=${dirname(filename)}>\`…\`</span> / ${basename(
            filename
        )}`;
    }

    return filename;
};
