import markdownTable from 'markdown-table';
import { Config } from '@jest/types';
import { match } from 'micromatch';

import { getFileCoverageDetailRow } from './getFileCoverageDetailRow';
import { CoverageDetailsMap, CoverageThreshold } from '../../typings/Coverage';
import { createMarkdownSpoiler } from '../../utils/createMarkdownSpoiler';
import { i18n } from '../../utils/i18n';
import { withExplanation } from '../../utils/withExplanation';

export const formatCoverageDetailsPart = (
    summary: string,
    headDetails: CoverageDetailsMap,
    baseDetails?: CoverageDetailsMap,
    threshold?: CoverageThreshold
): string | undefined => {
    const thresholdMap: Record<string, Config.CoverageThresholdValue> = {};

    const allFilenames = Object.keys(headDetails);

    Object.entries(threshold ?? {})
        .sort(([patternA], [patternB]) => {
            if (patternA === 'global') {
                return -1;
            }

            if (patternB === 'global') {
                return 1;
            }

            return 0;
        })
        .forEach(([pattern, thresholdValue]) => {
            const filenames =
                pattern === 'global'
                    ? allFilenames
                    : match(allFilenames, pattern);

            filenames.forEach((filename) => {
                thresholdMap[filename] = thresholdValue;
            });
        });

    const tableContent = allFilenames.map((filename) =>
        getFileCoverageDetailRow(
            filename,
            headDetails[filename],
            baseDetails?.[filename],
            thresholdMap[filename]
        )
    );

    if (tableContent.length > 0) {
        return createMarkdownSpoiler({
            body: markdownTable(
                [
                    [
                        withExplanation(
                            i18n('status'),
                            i18n('statusExplanation')
                        ),
                        i18n('filename'),
                        i18n('statements'),
                        i18n('branches'),
                        i18n('functions'),
                        i18n('lines'),
                    ],
                    ...tableContent,
                ],
                {
                    align: ['c', 'l', 'l', 'l', 'l', 'l'],
                }
            ),
            summary,
        });
    }

    return undefined;
};
