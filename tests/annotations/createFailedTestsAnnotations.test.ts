import { relative } from 'path';

import { describe, expect, it, vi } from 'vitest';

import { createFailedTestsAnnotations } from '../../src/annotations/createFailedTestsAnnotations';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport3.json';

vi.mock('path');

describe('createFailedTestsAnnotations', () => {
    it('should create failed tests annotations', () => {
        vi.mocked(relative).mockImplementation((_, second) => second);

        expect(
            createFailedTestsAnnotations((jsonReport as unknown) as JsonReport)
        ).toMatchSnapshot();

        vi.mocked(relative).mockClear();
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
