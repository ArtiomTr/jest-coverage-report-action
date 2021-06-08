import { join } from 'path';

import { readFile } from 'fs-extra';

import { parseCoverage } from '../src/collect/parseCoverage';

describe('parseCoverage', () => {
    it('', async () => {
        const src = (await readFile(join(__dirname, 'report.json'))).toString();
        console.log(parseCoverage(JSON.parse(src)));
    });
});
