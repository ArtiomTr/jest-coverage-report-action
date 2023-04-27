import { relative } from 'path';

import { describe, expect, it, vi } from 'vitest';

import { createCoverageAnnotations } from '../../src/annotations/createCoverageAnnotations';
import { JsonReport } from '../../src/typings/JsonReport';
import jsonReport from '../mock-data/jsonReport.json';
import jsonReport2 from '../mock-data/jsonReport2.json';
import jsonReport3 from '../mock-data/jsonReport3.json';

vi.mock('path');

describe('createCoverageAnnotations', () => {
    it('should match snapshot', () => {
        vi.mocked(relative).mockImplementation((_, second) => second);

        expect(createCoverageAnnotations(jsonReport)).toMatchSnapshot();

        expect(
            createCoverageAnnotations((jsonReport2 as unknown) as JsonReport)
        ).toMatchSnapshot();

        expect(
            createCoverageAnnotations((jsonReport3 as unknown) as JsonReport)
        ).toMatchSnapshot();

        vi.mocked(relative).mockClear();
    });
});
