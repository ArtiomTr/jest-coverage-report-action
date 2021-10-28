import crypto from 'crypto';

import pick from 'lodash/pick';

import { Options } from '../typings/Options';

const OPTION_NAMES_TO_HASH = [
    'workingDirectory',
    'testScript',
    'coverageFile',
    'baseCoverageFile',
] as const;

type OptionsToHash = Pick<Options, typeof OPTION_NAMES_TO_HASH[number]>;

const hashString = (str: string) => {
    return crypto.createHash('md5').update(str).digest('hex');
};

const hashOptions = (options: OptionsToHash) => {
    const optionsToHash = pick(options, OPTION_NAMES_TO_HASH);

    return hashString(JSON.stringify(optionsToHash));
};

export const getReportTag = (options: OptionsToHash) => {
    const optionsHash = hashOptions(options);
    return `<!-- jest coverage report action for options with hash ${optionsHash} -->`;
};
