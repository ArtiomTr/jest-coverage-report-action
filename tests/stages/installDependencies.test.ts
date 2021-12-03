import { exec } from '@actions/exec';
import { rm } from 'fs-extra';

import { installDependencies } from '../../src/stages/installDependencies';

const clearMocks = () => {
    (exec as jest.Mock<any, any>).mockClear();
    (rm as jest.Mock<any, any>).mockClear();
};

beforeEach(clearMocks);

describe('installDependencies', () => {
    it('should remove "node_modules" directory', async () => {
        await installDependencies();

        expect(rm).toBeCalledWith('node_modules', {
            recursive: true,
        });
    });

    it('should remove "node_modules" directory, which is under specified working directory', async () => {
        await installDependencies(undefined, 'workingDir');

        expect(rm).toBeCalledWith('workingDir/node_modules', {
            recursive: true,
        });
    });

    it('should install dependencies', async () => {
        await installDependencies();

        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using npm', async () => {
        await installDependencies('npm');

        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies using yarn', async () => {
        await installDependencies('yarn');

        expect(exec).toBeCalledWith('yarn install', undefined, {
            cwd: undefined,
        });
    });

    it('should install dependencies under specified working directory', async () => {
        await installDependencies(undefined, 'workingDir');

        expect(exec).toBeCalledWith('npm install', undefined, {
            cwd: 'workingDir',
        });
    });

    it("shouldn't install dependencies, if node_modules directory deletion failed", async () => {
        try {
            (rm as jest.Mock<any, any>).mockImplementationOnce(() => {
                throw 0;
            });
            await installDependencies();
        } catch {
            /** ignore error */
        }

        expect(exec).not.toBeCalled();
    });
});
