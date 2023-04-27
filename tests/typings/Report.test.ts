import { describe, expect, it } from 'vitest';

import { FailReason } from '../../src/typings/Report';

describe('FailReason', () => {
    it('should be defined', () => {
        expect(FailReason).toBeDefined();
    });
});
