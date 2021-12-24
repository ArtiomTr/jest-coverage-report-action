import crypto from 'crypto';

export const hashString = (str: string) => {
    return crypto.createHash('md5').update(str).digest('hex');
};

export const hashObject = (obj: object) => {
    return hashString(JSON.stringify(obj));
};
