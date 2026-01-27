import { basename } from 'path';

// if path is longer than LONG_PATH_LENGTH, it is assumed to be a long path
const LONG_PATH_LENGTH = 20;

export type RepoInfo = {
    owner: string;
    repo: string;
    sha: string;
};

// Remove leading ../ segments from the path
const cleanPath = (filename: string): string => {
    return filename.replace(/^(\.\.\/)+/, '');
};

const getFileUrl = (filename: string, repoInfo?: RepoInfo): string | undefined => {
    if (!repoInfo) return undefined;
    const cleanedPath = cleanPath(filename);
    const repoUrl = `https://github.com/${repoInfo.owner}/${repoInfo.repo}`;
    return `${repoUrl}/blob/${repoInfo.sha}/${cleanedPath}`;
};

export const shrinkLongPath = (filename: string, repoInfo?: RepoInfo) => {
    const cleanedFilename = cleanPath(filename);
    const base = basename(cleanedFilename);
    const fileUrl = getFileUrl(filename, repoInfo);

    if (cleanedFilename.length >= LONG_PATH_LENGTH && base !== cleanedFilename) {
        if (fileUrl) {
            // Only linkify the filename, not the ... prefix
            return `\`...\` / [${base}](${fileUrl} "${cleanedFilename}")`;
        }
        return `<div title="${cleanedFilename}">\`...\` / ${base}</div>`;
    }

    if (fileUrl) {
        return `[${cleanedFilename}](${fileUrl})`;
    }
    return cleanedFilename;
};
