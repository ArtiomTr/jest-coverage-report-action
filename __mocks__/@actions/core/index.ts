import { vi } from 'vitest';

const input: Record<string, unknown> = {};

export const getInput = (name: string) => input[name];

export const mockInput = (newInput: Record<string, unknown>) => {
    Object.assign(input, newInput);
};

export const clearInputMock = () => {
    Object.keys(input).map((key) => {
        delete input[key];
    });
};

export const error = vi.fn();
export const info = vi.fn();
export const setFailed = vi.fn();
