import { getInput } from '@actions/core';
import get from 'lodash/get';

import { insertArgs } from './insertArgs';
import strings from '../format/strings.json';

const iconRegex = /:(\w+):/g;

const iconType = getInput('icons');

const icons = (strings.icons as Record<string, Record<string, string>>)[
    iconType || 'emoji'
];

export const i18n = (key: string, args?: Record<string, unknown>) => {
    let string = get(strings, key, key) as string | string[];

    if (Array.isArray(string)) {
        string = string.join('\n');
    }

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
