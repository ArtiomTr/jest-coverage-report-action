import { createFailedTestsAnnotations } from '../../src/annotations/createFailedTestsAnnotations';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport3.json';

describe('createFailedTestsAnnotations', () => {
    it('should create failed tests annotations', () => {
        expect(
            createFailedTestsAnnotations((jsonReport as unknown) as JsonReport)
        ).toMatchSnapshot();
    });

    it('should return empty array', () => {
        expect(createFailedTestsAnnotations({} as JsonReport)).toStrictEqual(
            []
        );
        expect(
            createFailedTestsAnnotations(({
                testResults: [{}],
            } as unknown) as JsonReport)
        ).toStrictEqual([]);
    });
});
