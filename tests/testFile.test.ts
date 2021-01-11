import { testFunction } from '../src/testFile';

describe('a', () => {
    it('a', () => {
        expect(testFunction(1, 2)).toBe(3);
    });
});
