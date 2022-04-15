export enum ThresholdType {
    STATEMENTS = 'statements',
    FUNCTIONS = 'functions',
    BRANCHES = 'branches',
    LINES = 'lines',
}

export type ThresholdResult = {
    path: string;
    expected: number;
    received: number;
    type: ThresholdType;
};
