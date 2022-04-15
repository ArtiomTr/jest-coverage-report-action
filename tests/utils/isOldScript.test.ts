import { sep } from 'path';

import { readFile } from 'fs-extra';

import { isOldScript } from '../../src/utils/isOldScript';

beforeEach(() => {
    (readFile as jest.Mock<any, any>).mockClear();
});

describe('isOldScript', () => {
    it('should detect old scripts', async () => {
        expect(
            await isOldScript('npx jest --outputFile=report.json', undefined)
        ).toBe(true);

        expect(
            await isOldScript('pnpx jest --outputFile=report.json', undefined)
        ).toBe(true);

        expect(
            await isOldScript('yarn jest --outputFile=report.json', undefined)
        ).toBe(true);

        expect(
            await isOldScript('npm test -- --outputFile=report.json', undefined)
        ).toBe(true);

        expect(
            await isOldScript(
                'pnpm test -- --outputFile=report.json',
                undefined
            )
        ).toBe(true);

        expect(
            await isOldScript('yarn test --outputFile=report.json', undefined)
        ).toBe(true);

        expect(await isOldScript('npx jest', undefined)).toBe(false);
        expect(await isOldScript('pnpx jest', undefined)).toBe(false);
        expect(await isOldScript('yarn jest', undefined)).toBe(false);
        expect(await isOldScript('npm test', undefined)).toBe(false);
        expect(await isOldScript('pnpm test', undefined)).toBe(false);
        expect(
            await isOldScript(
                'yaasync async async async async async async async rn test',
                undefined
            )
        ).toBe(false);
    });

    it('should detect old scripts in package.json file', async () => {
        (readFile as jest.Mock<any, any>).mockReturnValue(
            JSON.stringify({
                scripts: {
                    test: 'npx jest --outputFile=report.json',
                    'test:coverage': 'npx jest',
                },
            })
        );

        expect(await isOldScript('npm test', undefined)).toBe(true);
        expect(await isOldScript('pnpm test', undefined)).toBe(true);
        expect(await isOldScript('yarn test', undefined)).toBe(true);
        expect(await isOldScript('yarn run test', undefined)).toBe(true);
        expect(await isOldScript('yarn run test:coverage', undefined)).toBe(
            false
        );
        expect(await isOldScript('npm run test', undefined)).toBe(true);
        expect(await isOldScript('npm run test:coverage', undefined)).toBe(
            false
        );
        expect(await isOldScript('npm run test -- --coverage', undefined)).toBe(
            true
        );
        expect(await isOldScript('pnpm run test', undefined)).toBe(true);
        expect(await isOldScript('pnpm run test:coverage', undefined)).toBe(
            false
        );
        expect(
            await isOldScript('pnpm run test -- --coverage', undefined)
        ).toBe(true);

        (readFile as jest.Mock<any, any>).mockClear();

        (readFile as jest.Mock<any, any>).mockReturnValue(
            JSON.stringify({
                scripts: {
                    test: 'npx jest --outputFile=report.json',
                    'test:coverage': 'npx jest',
                },
            })
        );

        expect(await isOldScript('npm test', undefined)).toBe(true);

        expect(readFile).toBeCalledWith('package.json');

        expect(await isOldScript('npm test', 'hello')).toBe(true);

        expect(readFile).toBeCalledWith(`hello${sep}package.json`);
    });
});
