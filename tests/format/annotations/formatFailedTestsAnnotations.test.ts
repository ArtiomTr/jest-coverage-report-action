import * as all from '@actions/github';

import { Annotation } from '../../../src/annotations/Annotation';
import { formatFailedTestsAnnotations } from '../../../src/format/annotations/formatFailedTestsAnnotations';

const { mockContext, clearContextMock } = all as any;

const annotations: Annotation[] = [
    {
        annotation_level: 'failure',
        path: 'tests/index.test.ts',
        start_line: 30,
        end_line: 25,
        title: 'test > lol > a',
        message: 'Test failed...',
    },
    {
        annotation_level: 'failure',
        path: 'tests/sendMessage.test.ts',
        start_line: 11,
        end_line: 11,
        title: 'test > lol > a',
        message: 'Test failed...',
    },
];

beforeEach(clearContextMock);

describe('formatFailedTestsAnnotations', () => {
    it('should format failed tests annotations for PR', () => {
        mockContext({
            repo: {
                owner: 'test-bot',
                repo: 'test',
            },
            payload: {
                pull_request: {
                    head: {
                        sha: '987654',
                    },
                },
            },
        });

        expect(
            formatFailedTestsAnnotations(
                {
                    title: 'Test success',
                    summary: 'Some summary',
                    failures: 'Failures',
                },
                annotations
            )
        ).toMatchSnapshot();
    });

    it('should format failed tests annotations for commit', () => {
        mockContext({
            repo: {
                owner: 'test-bot',
                repo: 'test',
            },
            payload: {},
            sha: 'as12d1',
        });

        expect(
            formatFailedTestsAnnotations(
                {
                    title: 'Test success',
                    summary: 'Some summary',
                    failures: 'Failures',
                },
                annotations
            )
        ).toMatchSnapshot();
    });

    it('should return only 50 annotations', () => {
        mockContext({
            repo: {
                owner: 'test-bot',
                repo: 'test',
            },
            payload: {},
            sha: 'as12d1',
        });

        expect(
            formatFailedTestsAnnotations(
                {
                    title: 'Test success',
                    summary: 'Some summary',
                    failures: 'Failures',
                },
                new Array(53).fill(0).map(() => ({ ...annotations[0] }))
            )
        ).toMatchSnapshot();
    });
});
