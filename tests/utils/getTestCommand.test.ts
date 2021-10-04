import { getTestCommand } from '../../src/utils/getTestCommand';

describe('getTestCommand', () => {
    it('should modify command', async () => {
        expect(
            await getTestCommand('yarn jest', 'report.json', undefined)
        ).toBe(
            'yarn jest --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );

        expect(await getTestCommand('npx jest', 'report.json', undefined)).toBe(
            'npx jest --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );

        expect(
            await getTestCommand('pnpx jest', 'report.json', undefined)
        ).toBe(
            'pnpx jest --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );
    });

    it('should keep command', async () => {
        expect(
            await getTestCommand(
                'npm run test -- --outputFile="report.json"',
                'report2.json',
                undefined
            )
        ).toBe('npm run test -- --outputFile="report.json"');
    });
});
