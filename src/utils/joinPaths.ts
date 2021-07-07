import { join } from 'path';

export const joinPaths = (...segments: Array<string | undefined>) =>
    join(...(segments as string[]).filter((segment) => segment !== undefined));
