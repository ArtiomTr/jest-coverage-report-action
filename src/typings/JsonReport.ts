export type JsonReport = {
    numFailedTestSuites: number;
    numFailedTests: number;
    numPassedTestSuites: number;
    numPassedTests: number;
    numPendingTestSuites: number;
    numPendingTests: number;
    numRuntimeErrorTestSuites: number;
    numTodoTests: number;
    numTotalTestSuites: number;
    numTotalTests: number;
    openHandles?: unknown[];
    snapshot: Snapshot;
    startTime: number;
    success: boolean;
    testResults?: TestResult[];
    wasInterrupted: boolean;
    coverageMap: CoverageMap;
};

export type Snapshot = {
    added: number;
    didUpdate: boolean;
    failure: boolean;
    filesAdded: number;
    filesRemoved: number;
    filesRemovedList?: unknown[];
    filesUnmatched: number;
    filesUpdated: number;
    matched: number;
    total: number;
    unchecked: number;
    uncheckedKeysByFile?: unknown[];
    unmatched: number;
    updated: number;
};

export type TestResult = {
    assertionResults?: AssertionResult[];
    endTime: number;
    message: string;
    name: string;
    startTime: number;
    status: string;
    summary: string;
};

export type AssertionResult = {
    ancestorTitles?: string[];
    failureMessages?: string[];
    fullName: string;
    location: Location;
    status: string;
    title: string;
};

export type Location = {
    column?: number;
    line: number;
};

export type Range = {
    start?: Location;
    end?: Location;
};

export type CoverageMap = Record<string, FileCoverage>;

export type FileCoverage = {
    path: string;
    statementMap: StatementMap;
    fnMap: FunctionMap;
    branchMap: BranchMap;
    s: HitMap;
    f: HitMap;
    b: ArrayHitMap;
};

export type StatementMap = Record<number, StatementCoverage>;

export type StatementCoverage = {
    start: Location;
    end: Location;
};

export type FunctionMap = Record<number, FunctionCoverage>;

export type FunctionCoverage = {
    name: string;
    decl: Range;
    loc: Range;
};

export type BranchMap = Record<number, BranchCoverage>;

export type BranchCoverage = {
    loc: Range;
    type: string;
    locations?: Range[];
};

export type HitMap = Record<number, number>;

export type ArrayHitMap = Record<number, number[]>;
