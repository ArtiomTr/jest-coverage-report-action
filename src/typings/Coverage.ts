export type CoverageDetail = {
    filename: string;
    statements: number;
    branches: number;
    functions: number;
    lines: number;
};

export type CoverageDetailsMap = Record<string, CoverageDetail>;

export type CoverageSummary = {
    title: string;
    covered: number;
    total: number;
    percentage: number;
};
