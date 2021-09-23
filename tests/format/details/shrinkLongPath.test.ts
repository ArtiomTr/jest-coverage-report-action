import { shrinkLongPath } from '../../../src/format/details/shrinkLongPath';

describe('shrinkLongPath', () => {
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
});
