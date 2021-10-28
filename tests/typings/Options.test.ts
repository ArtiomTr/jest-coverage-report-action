import * as all from '@actions/core';
import { ObjectSchema } from 'yup';

import {
    getOptions,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../../src/typings/Options';

const { mockInput, clearInputMock } = all as any;

const options = {
    ['github-token']: 'TOKEN',
    ['pre-test-script']: 'npm run codegen',
    ['test-script']: 'npm run test:coverage',
    threshold: '80',
    ['working-directory']: 'dir',
    icons: 'ascii',
    annotations: 'all',
    ['package-manager']: 'npm',
    ['skip-step']: 'none',
    ['custom-title']: 'title',
    ['coverage-file']: 'file.json',
    ['base-coverage-file']: 'base.json',
};

describe('getOptions', () => {
    it('should return options object', async () => {
        mockInput(options);

        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
            preTestScript: 'npm run codegen',
            testScript: 'npm run test:coverage',
            threshold: 80,
            workingDirectory: 'dir',
            iconType: 'ascii',
            annotations: 'all',
            packageManager: 'npm',
            skipStep: 'none',
            customTitle: 'title',
            coverageFile: 'file.json',
            baseCoverageFile: 'base.json',
        });

        clearInputMock();
    });

    it('should validate input', async () => {
        mockInput({ ...options, ['github-token']: undefined });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['pre-test-script']: null });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['test-script']: undefined });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, threshold: 105 });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, threshold: -1 });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['icons']: 'asdf' });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['annotations']: 'asdf' });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['skip-step']: 'asdf' });
        await expect(getOptions()).rejects.toBeDefined();
        clearInputMock();

        mockInput({ ...options, ['threshold']: 'asdf' });
        await expect(getOptions()).resolves.toBeDefined();
        clearInputMock();
    });

    it('should throw non-validation error', async () => {
        const validate = ObjectSchema.prototype.validate;

        ObjectSchema.prototype.validate = jest.fn(() => {
            throw new Error('Any error');
        });

        await expect(getOptions()).rejects.toStrictEqual(
            new Error('Any error')
        );

        ObjectSchema.prototype.validate = validate;
    });
});

describe('shouldInstallDeps', () => {
    it('should return false', () => {
        expect(shouldInstallDeps('install')).toBeFalsy();
        expect(shouldInstallDeps('all')).toBeFalsy();
    });

    it('should return true', () => {
        expect(shouldInstallDeps('none')).toBeTruthy();
    });
});

describe('shouldRunTestScript', () => {
    it('should return false', () => {
        expect(shouldRunTestScript('all')).toBeFalsy();
    });

    it('should return true', () => {
        expect(shouldRunTestScript('install')).toBeTruthy();
        expect(shouldRunTestScript('none')).toBeTruthy();
    });
});
