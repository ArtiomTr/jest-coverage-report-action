export const readFile = (path: string) => {
    if (path.includes('[enoent]')) {
        const err = new Error('file not found');
        (err as NodeJS.ErrnoException).code = 'ENOENT';
        throw err;
    }

    if (path.includes('[error]')) {
        throw new Error('UNKNOWN ERROR');
    }

    return Buffer.from(path);
};

export const rmdir = jest.fn();
