export const isValidNumber = (value: unknown): value is number =>
    typeof value === 'number' && !isNaN(value);
