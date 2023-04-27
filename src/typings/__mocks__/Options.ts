import { vi } from 'vitest';

export const getOptions = vi.fn(() => ({
    token: 'TOKEN',
    testScript: 'test script',
    iconType: 'emoji',
    annotations: 'all',
    threshold: 80,
    packageManager: 'npm',
    skipStep: 'none',
}));
