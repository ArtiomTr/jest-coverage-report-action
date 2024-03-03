import { TextEncoder } from 'util';

import { exec } from '@actions/exec';
import { mocked } from 'ts-jest/utils';

import { getTestCommand } from '../../src/utils/getTestCommand';

beforeEach(() => {
    mocked(exec).mockClear();
});

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

        expect(
            await getTestCommand('bunx jest', 'report.json', undefined)
        ).toBe(
            'bunx jest --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );
    });

    it('should handle double hyphens for npm', async () => {
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
                'npm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary"',
                'report.json',
                undefined
            )
        ).toBe(
            'npm run test:coverage -- --coverageReporters="text" --coverageReporters="text-summary" --ci --json --coverage --testLocationInResults --outputFile="report.json"'
        );
    });

    it('should handle double hyphens when pnpm version is unknown', async () => {
        mocked(exec).mockImplementation(() => {
            return Promise.reject(new Error('Unknown failure'));
        });

        expect(
            await getTestCommand(
                'pnpm run test:coverage',
                'report.json',
                undefined
            )
        ).toBe(
            'pnpm run test:coverage -- --ci --json --coverage --testLocationInResults --outputFile="report.json"'
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

    it('should handle double hyphens for pnpm < 7.0.0', async () => {
        mocked(exec).mockImplementation((command, _args, options) => {
            if (command.trim() === 'pnpm -v' && options?.listeners?.stdout) {
                options.listeners.stdout(
                    Buffer.from(new TextEncoder().encode('6.6.6'))
                );
            }

            return Promise.resolve(1);
        });

        expect(
            await getTestCommand(
                'pnpm run test:coverage',
                'report.json',
                undefined
            )
        ).toBe(
            'pnpm run test:coverage -- --ci --json --coverage --testLocationInResults --outputFile="report.json"'
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

    it('should handle double hyphens for pnpm >= 7.0.0', async () => {
        mocked(exec).mockImplementation((command, _args, options) => {
            if (command.trim() === 'pnpm -v' && options?.listeners?.stdout) {
                options.listeners.stdout(
                    Buffer.from(new TextEncoder().encode('7.7.7'))
                );
            }

            return Promise.resolve(1);
        });

        expect(
            await getTestCommand(
                'pnpm run test:coverage',
                'report.json',
                undefined
            )
        ).toBe(
            'pnpm run test:coverage --ci --json --coverage --testLocationInResults --outputFile="report.json"'
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
