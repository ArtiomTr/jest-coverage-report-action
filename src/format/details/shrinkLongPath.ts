import { basename } from 'path';

// if path is longer than LONG_PATH_LENGTH, it is assumed to be a long path
const LONG_PATH_LENGTH = 20;

export const shrinkLongPath = (filename: string) => {
    const base = basename(filename);

    if (filename.length >= LONG_PATH_LENGTH && base !== filename) {
        return `<div title="${filename}">\`...\` / ${base}</div>`;
    }

    return filename;
};
