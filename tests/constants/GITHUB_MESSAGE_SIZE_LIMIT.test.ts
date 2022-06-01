import { GITHUB_MESSAGE_SIZE_LIMIT } from '../../src/constants/GITHUB_MESSAGE_SIZE_LIMIT';

describe('GITHUB_MESSAGE_SIZE_LIMIT', () => {
    it('should be 65535', () => {
        expect(GITHUB_MESSAGE_SIZE_LIMIT).toBe(65535);
    });
});
