import { shrinkLongPath, RepoInfo } from '../../../src/format/details/shrinkLongPath';

const repoInfo: RepoInfo = {
    owner: 'test-owner',
    repo: 'test-repo',
    sha: 'abc123',
};

describe('shrinkLongPath', () => {
    describe('without repoInfo', () => {
        it('should shrink long paths', () => {
            expect(shrinkLongPath('hello/world/this/is/a.ts')).toBe(
                '<div title="hello/world/this/is/a.ts">`...` / a.ts</div>'
            );
            expect(shrinkLongPath('hello/asdfasdfasdfasdfasdfasdfa.ts')).toBe(
                '<div title="hello/asdfasdfasdfasdfasdfasdfa.ts">`...` / asdfasdfasdfasdfasdfasdfa.ts</div>'
            );
        });

        it('should not touch short paths', () => {
            expect(shrinkLongPath('hello/a.ts')).toBe('hello/a.ts');
            expect(shrinkLongPath('asdf/d.ts')).toBe('asdf/d.ts');
        });

        it('should not trim long paths without directory', () => {
            expect(shrinkLongPath('asdfasdfasdfasdfasdfasdfasdfasdfasdfa.ts')).toBe(
                'asdfasdfasdfasdfasdfasdfasdfasdfasdfa.ts'
            );
        });

        it('should remove ../ prefix from paths', () => {
            expect(shrinkLongPath('../src/file.ts')).toBe('src/file.ts');
            expect(shrinkLongPath('../../src/file.ts')).toBe('src/file.ts');
            expect(shrinkLongPath('../../../very/long/path/to/file.ts')).toBe(
                '<div title="very/long/path/to/file.ts">`...` / file.ts</div>'
            );
        });
    });

    describe('with repoInfo (linkify)', () => {
        it('should linkify short paths', () => {
            expect(shrinkLongPath('src/file.ts', repoInfo)).toBe(
                '[src/file.ts](https://github.com/test-owner/test-repo/blob/abc123/src/file.ts)'
            );
        });

        it('should linkify only the filename for long paths', () => {
            expect(shrinkLongPath('hello/world/this/is/a.ts', repoInfo)).toBe(
                '`...` / [a.ts](https://github.com/test-owner/test-repo/blob/abc123/hello/world/this/is/a.ts "hello/world/this/is/a.ts")'
            );
        });

        it('should remove ../ prefix and linkify', () => {
            expect(shrinkLongPath('../src/file.ts', repoInfo)).toBe(
                '[src/file.ts](https://github.com/test-owner/test-repo/blob/abc123/src/file.ts)'
            );
            expect(shrinkLongPath('../../src/Button.tsx', repoInfo)).toBe(
                '[src/Button.tsx](https://github.com/test-owner/test-repo/blob/abc123/src/Button.tsx)'
            );
        });

        it('should handle long paths with ../ prefix', () => {
            expect(shrinkLongPath('../../very/long/path/to/file.ts', repoInfo)).toBe(
                '`...` / [file.ts](https://github.com/test-owner/test-repo/blob/abc123/very/long/path/to/file.ts "very/long/path/to/file.ts")'
            );
        });
    });
});
