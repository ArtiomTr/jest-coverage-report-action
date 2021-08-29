import { dirname } from 'path';

/**
 * Find a common path from a list of filepaths.
 */
export const findCommonPath = (filepaths: string[]): string => {
    let commonRoot = '';
    if (filepaths.length) {
        // If the paths are sorted, any prefix common to all paths will be common to the sorted first and last strings.
        const sortedPaths = [...filepaths].sort();
        const first = sortedPaths[0];
        const last = sortedPaths[sortedPaths.length - 1];

        const len = Math.min(first.length, last.length);
        for (let i = 0; i < len; i++) {
            const ch1 = first[i];
            const ch2 = last[i];
            if (ch1 == ch2) {
                commonRoot += ch1;
            } else {
                break;
            }
        }

        // If it doesn't appear to be a directory (partial filename), get the parent directory
        if (commonRoot.length && commonRoot[commonRoot.length - 1] !== '/') {
            commonRoot = dirname(commonRoot) + '/';
        }
    }
    return commonRoot;
};
