const validChoices = ['all', 'none'];

export const isAnnotationsOptionValid = (option: string): boolean =>
    validChoices.includes(option);
