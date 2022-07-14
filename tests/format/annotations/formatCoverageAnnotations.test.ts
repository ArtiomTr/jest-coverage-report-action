import * as all from '@actions/github';

import { Annotation } from '../../../src/annotations/Annotation';
import { formatCoverageAnnotations } from '../../../src/format/annotations/formatCoverageAnnotations';
import { Options } from '../../../src/typings/Options';

const { mockContext, clearContextMock } = all as any;

const DEFAULT_OPTIONS: Options = {
    token: '',
    testScript: '',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'all',
    prNumber: 5,
    pullRequest: {
        number: 5,
        head: { sha: '123456', ref: '123' },
        base: { ref: '456' },
    },
};

const annotations: Annotation[] = [
    {
        start_line: 5,
        end_line: 5,
        start_column: 4,
        end_column: 21,
        path: '../../../../jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 9,
        end_line: 9,
        start_column: 4,
        end_column: 26,
        path: '../../../../jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 11,
        end_line: 11,
        start_column: 4,
        end_column: 24,
        path: '../../../../jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
    {
        start_line: 15,
        end_line: 15,
        start_column: 4,
        end_column: 26,
        path: '../../../../jest/examples/typescript/memory.ts',
        annotation_level: 'warning',
        title: '🧾 Statement is not covered',
        message: 'Warning! Not covered statement',
    },
];

beforeEach(clearContextMock);

describe('formatCoverageAnnotations', () => {
    it('should format annotations for PR', () => {
        mockContext({
            payload: {
                pull_request: {
                    head: {
                        sha: '123456',
                    },
                },
            },
        });

        expect(
            formatCoverageAnnotations(annotations, DEFAULT_OPTIONS)
        ).toMatchSnapshot();
    });

    it('should format annotations for commit', () => {
        mockContext({
            payload: {},
            sha: '111111',
        });

        expect(
            formatCoverageAnnotations(annotations, {
                ...DEFAULT_OPTIONS,
                prNumber: null,
                pullRequest: null,
            })
        ).toMatchSnapshot();
    });

    it('should leave only 50 annotations', () => {
        mockContext({
            payload: {},
            sha: '111111',
        });

        expect(
            formatCoverageAnnotations(
                new Array(52).fill(0).map(() => ({
                    ...annotations[0],
                })),
                {
                    ...DEFAULT_OPTIONS,
                    prNumber: null,
                    pullRequest: null,
                }
            )
        ).toMatchSnapshot();
    });
});
