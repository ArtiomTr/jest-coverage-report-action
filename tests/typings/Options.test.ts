import * as all from '@actions/core';
import * as allGh from '@actions/github';
import { ObjectSchema } from 'yup';

import {
    getOptions,
    shouldInstallDeps,
    shouldRunTestScript,
} from '../../src/typings/Options';

const { mockInput, clearInputMock } = all as any;
const { mockContext, getOctokit } = allGh as any;

const pr = {
    base: {
        ref: '123',
    },
    head: {
        ref: '456',
        sha: '123456789',
    },
    number: 1234,
};
const options = {
    ['github-token']: 'TOKEN',
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
const OctokitMock = () => ({
    pulls: {
        get: jest.fn(() => ({ data: pr })),
    },
});
const baseContext = {
    repo: {
        owner: 'test',
        repo: 'test-repo',
    },
};
const prContext = {
    ...baseContext,
    eventName: 'pull_request',
    payload: {
        pull_request: pr,
    },
};
const pushContext = {
    ...baseContext,
    eventName: 'push',
    payload: {},
};

describe('getOptions', () => {
    let octokit: ReturnType<typeof OctokitMock>;

    beforeEach(() => {
        octokit = OctokitMock();
        getOctokit.mockReturnValueOnce(octokit);
        mockContext(pushContext);
    });

    afterEach(() => {
        clearInputMock();
    });

    it('should return options object', async () => {
        mockInput(options);

        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
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
            prNumber: null,
            pullRequest: null,
        });
    });

    it('should validate input', async () => {
        mockInput({ ...options, ['github-token']: undefined });
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

    it('should use pull_request from context if it exists', async () => {
        mockContext(prContext);
        mockInput(options);

        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
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
            prNumber: 1234,
            pullRequest: pr,
        });
    });

    it('should lookup pullRequest from input prnumber if it exists and no pull_request is on context', async () => {
        mockContext(pushContext);
        mockInput({ ...options, prnumber: '1234' });
        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
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
            prNumber: 1234,
            pullRequest: pr,
        });
        expect(octokit.pulls.get).toBeCalledTimes(1);
    });

    it('should not lookup pullRequest from prNumber if pull_request does exist on context', async () => {
        mockContext(prContext);
        mockInput({ ...options, prnumber: '1234' });
        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
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
            prNumber: 1234,
            pullRequest: pr,
        });
        expect(octokit.pulls.get).not.toBeCalled();
    });

    it('should return null prNumber and pullRequest with no prnumber input on push context', async () => {
        mockContext(pushContext);
        mockInput(options);
        expect(await getOptions()).toStrictEqual({
            token: 'TOKEN',
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
            prNumber: null,
            pullRequest: null,
        });
        expect(octokit.pulls.get).not.toBeCalled();
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
