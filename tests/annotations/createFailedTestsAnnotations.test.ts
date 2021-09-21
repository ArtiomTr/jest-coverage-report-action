import { resolve } from 'path';

import { createFailedTestsAnnotations } from '../../src/annotations/createFailedTestsAnnotations';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport3.json';

describe('createFailedTestsAnnotations', () => {
    it('should create failed tests annotations', () => {
        const oldCwd = process.cwd;

        const currentWorkingDir = resolve(__dirname, '..', '..');

        process.cwd = jest.fn(() => currentWorkingDir);

        expect(
            createFailedTestsAnnotations((jsonReport as unknown) as JsonReport)
        ).toMatchSnapshot();

        process.cwd = oldCwd;
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
