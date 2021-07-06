import { getInput } from '@actions/core';
import get from 'lodash/get';

import { insertArgs } from './format/insertArgs';
import strings from './strings.json';

const iconRegex = /:(\w+):/g;

const iconType = getInput('icons');

const icons = (strings.icons as Record<string, Record<string, string>>)[
    iconType
];

export const i18n = (key: string, args?: Record<string, unknown>) => {
    const string = get(strings, key, key) as string;

    const normalizedIconsString = string.replace(
        iconRegex,
        (initialValue, key) => {
            if (key in icons) {
                return icons[key];
            } else {
                return initialValue;
            }
        }
    );

    if (!args) {
        return normalizedIconsString;
    }

    return insertArgs(normalizedIconsString, args as Record<string, string>);
};
