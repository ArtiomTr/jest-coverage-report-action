export type ValidAnnotationsOption =
    | 'all'
    | 'none'
    | 'coverage'
    | 'failed-tests';

const validChoices: Array<ValidAnnotationsOption> = [
    'all',
    'none',
    'coverage',
    'failed-tests',
];

export const isAnnotationsOptionValid = (option: string): boolean =>
    validChoices.includes(option as ValidAnnotationsOption);
