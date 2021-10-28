import { parseCoverage } from '../../src/stages/parseCoverage';
import { ActionError } from '../../src/typings/ActionError';
import { FailReason } from '../../src/typings/Report';

describe('parseCoverage', () => {
    it('should parse valid JSON', () => {
        expect(parseCoverage('{ "data": "I\'m valid JSON!" }')).toStrictEqual({
            data: "I'm valid JSON!",
        });
    });

    it('should throw error if JSON is not valid', () => {
        expect(() => parseCoverage('not valid json')).toThrowError(
            new ActionError(FailReason.INVALID_COVERAGE_FORMAT)
        );
    });
});
