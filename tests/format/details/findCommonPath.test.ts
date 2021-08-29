import { findCommonPath } from '../../../src/format/details/findCommonPath';

describe('findCommonPath', () => {
    it('should find common filepath', () => {
        expect(
            findCommonPath([
                'src/details/a.ts',
                'src/details/b.ts',
                'src/format/hello.ts',
            ])
        ).toBe('src/');

        expect(
            findCommonPath([
                'src/details/hello/world/a.ts',
                'src/details/hello/world/b.ts',
                'src/format/hello.ts',
            ])
        ).toBe('src/');

        expect(
            findCommonPath([
                'src/details/hello/world/a.ts',
                'src/details/hello/world/b.ts',
                'src/details/hello/world/hello.ts',
            ])
        ).toBe('src/details/hello/world/');
    });

    it('should return empty string', () => {
        expect(findCommonPath([])).toBe('');
        expect(
            findCommonPath([
                'src/details/hello/world/a.ts',
                'src/details/hello/world/b.ts',
                'src/details/hello/world/hello.ts',
                'hello',
            ])
        ).toBe('');
    });

    it('should return common folder (not part of filename)', () => {
        expect(
            findCommonPath([
                'src/details/hello/world/hello.ts',
                'src/details/hello/world/helloTest.ts',
                'src/details/hello/world/helloasd',
            ])
        ).toBe('src/details/hello/world/');

        expect(
            findCommonPath([
                'src/details/hello/world/hello.ts',
                'src/details/helloasd.ts',
                'src/details/hello.ts',
            ])
        ).toBe('src/details/');
    });
});
