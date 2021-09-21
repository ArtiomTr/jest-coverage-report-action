import { relative } from 'path';

import { createFailedTestsAnnotations } from '../../src/annotations/createFailedTestsAnnotations';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport3.json';

jest.mock('path');

describe('createFailedTestsAnnotations', () => {
    it('should create failed tests annotations', () => {
        (relative as jest.Mock<any, any>).mockImplementation(
            (_, second) => second
        );

        expect(
            createFailedTestsAnnotations((jsonReport as unknown) as JsonReport)
        ).toMatchSnapshot();

        (relative as jest.Mock<any, any>).mockClear();
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
