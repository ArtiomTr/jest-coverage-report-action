import * as allCore from '@actions/core';
import * as all from '@actions/github';
import { getOctokit } from '@actions/github';
import { mocked } from 'ts-jest/utils';

import { Annotation } from '../src/annotations/Annotation';
import { createCoverageAnnotations } from '../src/annotations/createCoverageAnnotations';
import { createFailedTestsAnnotations } from '../src/annotations/createFailedTestsAnnotations';
import { formatCoverageAnnotations } from '../src/format/annotations/formatCoverageAnnotations';
import { formatFailedTestsAnnotations } from '../src/format/annotations/formatFailedTestsAnnotations';
import { run } from '../src/run';
import { createReport } from '../src/stages/createReport';
import { getCoverage } from '../src/stages/getCoverage';
import { switchBranch } from '../src/stages/switchBranch';
import { JsonReport } from '../src/typings/JsonReport';
import { getOptions, Options } from '../src/typings/Options';
import { SummaryReport, TestRunReport } from '../src/typings/Report';
import { CollectedData, createDataCollector } from '../src/utils/DataCollector';

const { mockContext, clearContextMock } = all as any;
const { setFailed } = allCore;
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

const defaultOptions: Options = {
    token: '',
    testScript: '',
    iconType: 'emoji',
    annotations: 'all',
    packageManager: 'npm',
    skipStep: 'all',
    prNumber: 345,
    pullRequest: {
        number: 345,
        base: {
            ref: '123',
        },
        head: {
            sha: '73342',
            ref: '456',
        },
    },
};

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

const getOptionsMock = mocked(getOptions);
const getCoverageMock = mocked(getCoverage);
const switchBranchMock = mocked(switchBranch);
const createReportMock = mocked(createReport);

(getOctokit as jest.Mock<any, any>).mockReturnValue({
    checks: {
        create: (fn: () => any) => {
            fn();
        },
    },
});

beforeEach(() => {
    switchBranchMock.mockClear();
    getOptionsMock.mockClear();
    getCoverageMock.mockClear();
    createReportMock.mockClear();
    (setFailed as jest.Mock).mockClear();

    getOptionsMock.mockResolvedValue(defaultOptions);
    getCoverageMock.mockResolvedValue(standardReport);
    createReportMock.mockReturnValue({
        runReport: {} as TestRunReport,
    } as SummaryReport);
    clearContextMock();
});

describe('run', () => {
    beforeEach(() => {
        mockContext({
            eventName: 'pull_request',
            payload: {
                pull_request: {
                    base: {
                        ref: '123',
                    },
                },
            },
        });
    });
    it('should fail if not initialized', async () => {
        getOptionsMock.mockRejectedValue({});
        await expect(run()).rejects.toThrowError('Initialization failed.');
    });

    it('should run in PR', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        const dataCollectorAddSpy = jest.spyOn(dataCollector, 'add');
        await run(dataCollector);
        expect(getCoverageMock).toBeCalledTimes(2);
        expect(switchBranchMock).toBeCalledWith('123');
        expect(dataCollectorAddSpy).toBeCalledTimes(2);
    });

    it('should skip if report is not generated', async () => {
        createReportMock.mockImplementation(() => {
            throw new Error();
        });
        await run();
        expect(getCoverageMock).toBeCalledTimes(2);
        expect(switchBranchMock).toBeCalledWith('123');
    });

    it('should skip if headCoverage is not generated', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        const dataCollectorAddSpy = jest.spyOn(dataCollector, 'add');
        getCoverageMock.mockRejectedValue('');
        await run(dataCollector);
        expect(dataCollectorAddSpy).toBeCalledTimes(0);
    });

    it('should set failed if there are errors in dataCollector', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        const dataCollectorMock = {
            ...dataCollector,
            get: jest.fn(),
        };
        dataCollectorMock.get.mockReturnValue({
            errors: [new Error('error')],
        } as CollectedData<JsonReport>);
        await run(dataCollectorMock);
        expect(setFailed).toBeCalledWith('Jest coverage report action failed');
    });

    it('should succeed if there are no errors in dataCollector', async () => {
        const dataCollector = createDataCollector<JsonReport>();
        const dataCollectorMock = {
            ...dataCollector,
            get: jest.fn(),
        };
        dataCollectorMock.get.mockReturnValue(({
            errors: [],
        } as unknown) as CollectedData<JsonReport>);
        await run(dataCollectorMock);
        expect(setFailed).not.toBeCalled();
    });

    it('should run if not in PR and no pr-number is supplied', async () => {
        getOptionsMock.mockResolvedValue({
            ...defaultOptions,
            prNumber: null,
            pullRequest: null,
        });
        mockContext({
            eventName: 'push',
            payload: {},
        });
        await run();
        expect(getCoverageMock).toBeCalledTimes(1);
        expect(switchBranchMock).not.toBeCalled();
    });

    it('should run if not in PR and pr-number is supplied', async () => {
        mockContext({
            eventName: 'push',
            payload: {},
        });
        const dataCollector = createDataCollector<JsonReport>();
        const dataCollectorAddSpy = jest.spyOn(dataCollector, 'add');
        await run(dataCollector);
        expect(getCoverageMock).toBeCalledTimes(2);
        expect(switchBranchMock).toBeCalledWith('123');
        expect(dataCollectorAddSpy).toBeCalledTimes(2);
    });

    describe('failedAnnotations', () => {
        const createFailedTestsAnnotationsMock = mocked(
            createFailedTestsAnnotations
        );

        const formatFailedTestsAnnotationsMock = mocked(
            formatFailedTestsAnnotations
        );

        beforeEach(() => {
            createFailedTestsAnnotationsMock.mockClear();
            formatFailedTestsAnnotationsMock.mockClear();
        });

        it('should skip failed test annotations if only coverage is selected', async () => {
            getOptionsMock.mockResolvedValue({
                ...defaultOptions,
                annotations: 'coverage',
            });
            await run();
            expect(createFailedTestsAnnotationsMock).not.toBeCalled();
        });

        it('should skip if there are no failed tests', async () => {
            createFailedTestsAnnotationsMock.mockReturnValue([]);
            await run();
            expect(formatFailedTestsAnnotationsMock).not.toBeCalled();
        });

        it('should generate failed test annotations', async () => {
            createFailedTestsAnnotationsMock.mockReturnValue([
                {} as Annotation,
            ]);
            await run();
            expect(formatFailedTestsAnnotationsMock).toBeCalled();
        });
    });

    describe('coverageAnnotations', () => {
        const createCoverageAnnotationsMock = mocked(createCoverageAnnotations);
        const formatCoverageAnnotationsMock = mocked(formatCoverageAnnotations);

        beforeEach(() => {
            createCoverageAnnotationsMock.mockClear();
            formatCoverageAnnotationsMock.mockClear();
        });

        it('should skip coverage annotations if only failed test is selected', async () => {
            getOptionsMock.mockResolvedValue({
                ...defaultOptions,
                annotations: 'failed-tests',
            });
            await run();
            expect(createCoverageAnnotationsMock).not.toBeCalled();
        });

        it('should skip if there are no coverage annotations', async () => {
            createCoverageAnnotationsMock.mockReturnValue([]);
            await run();
            expect(formatCoverageAnnotationsMock).not.toBeCalled();
        });

        it('should generate coverage annotations', async () => {
            createCoverageAnnotationsMock.mockReturnValue([{} as Annotation]);
            await run();
            expect(formatCoverageAnnotationsMock).toBeCalled();
        });
    });
});
