import { ActionError } from '../typings/ActionError.js';
import { JsonReport } from '../typings/JsonReport.js';
import { FailReason } from '../typings/Report.js';

export const parseCoverage = (src: string): JsonReport => {
    try {
        return JSON.parse(src);
    } catch (err) {
        throw new ActionError(FailReason.INVALID_COVERAGE_FORMAT);
    }
};
