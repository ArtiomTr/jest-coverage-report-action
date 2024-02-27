import { relative } from 'path';

import { createCoverageAnnotations } from '../../src/annotations/createCoverageAnnotations';
import { CoverageAnnotationType } from '../../src/typings/CoverageAnnotationType';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport.json';
import jsonReport2 from '../mock-data/jsonReport2.json';
import jsonReport3 from '../mock-data/jsonReport3.json';
import jsonReport4 from '../mock-data/jsonReport4.json';

jest.mock('path');

describe('createCoverageAnnotations', () => {
    it('should match snapshot', () => {
        (relative as jest.Mock<any, any>).mockImplementation(
            (_, second) => second
        );

        expect(createCoverageAnnotations(jsonReport, [CoverageAnnotationType.Branch, CoverageAnnotationType.Function, CoverageAnnotationType.Statement])).toMatchSnapshot();

        expect(
            createCoverageAnnotations((jsonReport2 as unknown) as JsonReport, [CoverageAnnotationType.Branch, CoverageAnnotationType.Function, CoverageAnnotationType.Statement])
        ).toMatchSnapshot();

        expect(
            createCoverageAnnotations((jsonReport3 as unknown) as JsonReport, [])
        ).toMatchSnapshot();

        expect(
            createCoverageAnnotations((jsonReport4 as unknown) as JsonReport, [CoverageAnnotationType.Function])
        ).toMatchSnapshot();

        (relative as jest.Mock<any, any>).mockClear();
    });
});
