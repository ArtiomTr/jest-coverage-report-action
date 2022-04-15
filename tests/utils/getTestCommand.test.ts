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

    it('should add double hyphens for npm and pnpm', async () => {
        expect(
            await getTestCommand(
                'npm run test:coverage',
                'report.json',
                undefined
            )
        ).toBe(
            'npm run test:coverage -- --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );

        expect(
            await getTestCommand(
                'pnpm run test:coverage',
                'report.json',
                undefined
            )
        ).toBe(
            'pnpm run test:coverage -- --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );
    });

    it('should not add two sets of double hyphens for npm and pnpm', async () => {
        expect(
            await getTestCommand(
                'npm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary"',
                'report.json',
                undefined
            )
        ).toBe(
            'npm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary" --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );

        expect(
            await getTestCommand(
                'pnpm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary"',
                'report.json',
                undefined
            )
        ).toBe(
            'pnpm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary" --ci --json --coverage --testLocationInResults --outputFile="report.json"'
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
