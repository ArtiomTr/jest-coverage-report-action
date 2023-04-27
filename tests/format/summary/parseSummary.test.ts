import { describe, expect, it } from 'vitest';

import { parseSummary } from '../../../src/format/summary/parseSummary';
import report from '../../mock-data/jsonReport.json';

describe('parseSummary', () => {
    it('should parse summary from mock data', () => {
        expect(parseSummary(report)).toMatchSnapshot();
    });
});
