import { vi } from 'vitest';

const realPath = await vi.importActual('path');

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const relative = vi.fn((realPath as any).relative);
