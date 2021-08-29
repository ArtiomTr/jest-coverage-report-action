import * as all from '@actions/github';

import { getConsoleLink } from '../../src/utils/getConsoleLink';

const { mockContext, clearContextMock } = all as any;

describe('getConsoleLink', () => {
    it('should return link (from payload)', () => {
        mockContext({
            payload: {
                repository: {
                    html_url: 'https://github.com/test/test-repo',
                },
            },
            runId: 111,
        });
        expect(getConsoleLink()).toBe(
            'https://github.com/test/test-repo/actions/runs/111'
        );
        clearContextMock();
    });

    it('should return link (built from context)', () => {
        mockContext({
            payload: {},
            repo: {
                owner: 'test',
                repo: 'test-repo',
            },
            runId: 111,
        });
        expect(getConsoleLink()).toBe(
            'https://github.com/test/test-repo/actions/runs/111'
        );
        clearContextMock();
    });
});
