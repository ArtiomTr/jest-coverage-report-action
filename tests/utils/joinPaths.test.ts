import { join } from 'path';

import { joinPaths } from '../../src/utils/joinPaths';

describe('joinPaths', () => {
    it('should filter undefined paths', () => {
        expect(
            joinPaths('hello', undefined, 'a', undefined, undefined, 'b')
        ).toBe(join('hello', 'a', 'b'));

        expect(joinPaths('asdf', undefined, 'bcc')).toBe(join('asdf', 'bcc'));
    });
});
