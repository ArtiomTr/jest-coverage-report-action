import { JsonReport } from '../typings/JsonReport';
import { FailReason } from '../typings/Report';

export const parseCoverage = (src: string): JsonReport => {
    try {
        return JSON.parse(src);
    } catch (err) {
        throw FailReason.INVALID_COVERAGE_FORMAT;
    }
};
