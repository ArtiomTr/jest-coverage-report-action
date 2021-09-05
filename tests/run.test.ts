import { run } from '../src/run';
import { getCoverage } from '../src/stages/getCoverage';

jest.mock('../src/typings/Options.ts');
jest.mock('../src/stages/getCoverage.ts');
jest.mock('../src/stages/switchBranch.ts');
jest.mock('../src/stages/createReport.ts');
jest.mock('../src/report/generatePRReport.ts');
jest.mock('../src/report/generateCommitReport.ts');
jest.mock('../src/annotations/createFailedTestsAnnotations.ts');
jest.mock('../src/annotations/createCoverageAnnotations.ts');
jest.mock('../src/format/annotations/formatFailedTestsAnnotations.ts');
jest.mock('../src/format/annotations/formatCoverageAnnotations.ts');

const standardReport = {
    numFailedTestSuites: 0,
    numFailedTests: 0,
    numPassedTestSuites: 5,
    numPassedTests: 12,
    numPendingTestSuites: 0,
    numPendingTests: 0,
    numRuntimeErrorTestSuites: 0,
    numTodoTests: 0,
    numTotalTestSuites: 5,
    numTotalTests: 12,
    openHandles: [],
    snapshot: {
        added: 0,
        didUpdate: false,
        failure: false,
        filesAdded: 0,
        filesRemoved: 0,
        filesRemovedList: [],
        filesUnmatched: 0,
        filesUpdated: 0,
        matched: 0,
        total: 0,
        unchecked: 0,
        uncheckedKeysByFile: [],
        unmatched: 0,
        updated: 0,
    },
    startTime: 1627105768580,
    success: true,
    testResults: [
        {
            assertionResults: [
                {
                    ancestorTitles: [],
                    failureMessages: [],
                    fullName: 'CheckboxWithLabel changes the text after click',
                    location: {
                        column: 1,
                        line: 8,
                    },
                    status: 'passed',
                    title: 'CheckboxWithLabel changes the text after click',
                },
            ],
            endTime: 1627105769947,
            message: '',
            name:
                '/jest/examples/typescript/__tests__/CheckboxWithLabel-test.tsx',
            startTime: 1627105769318,
            status: 'passed',
            summary: '',
        },
    ],
    wasInterrupted: false,
    coverageMap: {
        '/jest/examples/typescript/CheckboxWithLabel.tsx': {
            path: '/jest/examples/typescript/CheckboxWithLabel.tsx',
            statementMap: {
                '0': {
                    start: {
                        line: 12,
                        column: 26,
                    },
                    end: {
                        line: 35,
                        column: 1,
                    },
                },
                '1': {
                    start: {
                        line: 18,
                        column: 36,
                    },
                    end: {
                        line: 18,
                        column: 57,
                    },
                },
            },
            fnMap: {
                '0': {
                    name: '(anonymous_0)',
                    decl: {
                        start: {
                            line: 12,
                            column: 26,
                        },
                        end: {
                            line: 12,
                            column: 27,
                        },
                    },
                    loc: {
                        start: {
                            line: 17,
                            column: 30,
                        },
                        end: {
                            line: 35,
                            column: 1,
                        },
                    },
                    line: 17,
                },
            },
            branchMap: {
                '0': {
                    loc: {
                        start: {
                            line: 32,
                            column: 7,
                        },
                        end: {
                            line: 32,
                            column: 37,
                        },
                    },
                    type: 'cond-expr',
                    locations: [
                        {
                            start: {
                                line: 32,
                                column: 19,
                            },
                            end: {
                                line: 32,
                                column: 26,
                            },
                        },
                        {
                            start: {
                                line: 32,
                                column: 29,
                            },
                            end: {
                                line: 32,
                                column: 37,
                            },
                        },
                    ],
                    line: 32,
                },
            },
            s: {
                '0': 1,
                '1': 2,
            },
            f: {
                '0': 2,
            },
            b: {
                '0': [1, 1],
            },
            _coverageSchema: '1a1c01bbd47fc00a2c39e90264f33305004495a9',
            hash: '11a3f9ce2a01eb444f023b8a63926f73f3dc5300',
        },
    },
};

describe('run', () => {
    it('should run in PR', async () => {
        (getCoverage as jest.Mock).mockReturnValueOnce(standardReport);

        await run();
    });
});
