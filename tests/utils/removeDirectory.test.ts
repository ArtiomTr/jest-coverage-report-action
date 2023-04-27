import { rm, rmdir } from 'fs-extra';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

import { removeDirectory } from '../../src/utils/removeDirectory';

const originalProcess = process;

vi.mock('fs-extra');

beforeEach(() => {
    vi.mocked(rm).mockClear();
    vi.mocked(rmdir).mockClear();
});

afterEach(() => {
    global.process = originalProcess;
});

describe('removeDirectory', () => {
    it('should call rmdir when node version is < 14.14.0', async () => {
        global.process = {
            ...originalProcess,
            version: 'v14.3.9',
        };
        await removeDirectory('asdf');
        expect(rm).not.toBeCalled();
        expect(rmdir).toBeCalled();
    });

    it('should call rm when node version is >=14.14.0', async () => {
        global.process = {
            ...originalProcess,
            version: 'v14.14.0',
        };
        await removeDirectory('asdf');
        expect(rm).toBeCalled();
        expect(rmdir).not.toBeCalled();
    });
});
