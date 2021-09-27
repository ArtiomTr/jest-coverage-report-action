import { Config } from '@jest/types';

export type CoverageDetail = {
    filename: string;
    statements: number;
    branches: number;
    functions: number;
    lines: number;
};

export type CoverageDetailsMap = Record<string, CoverageDetail>;

export type CoverageThreshold = Required<Config.GlobalConfig>['coverageThreshold'];

export type CoverageSummary = {
    name: keyof Config.CoverageThresholdValue;
    title: string;
    covered: number;
    total: number;
    percentage: number;
};
