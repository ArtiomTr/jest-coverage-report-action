import { dirname } from 'path';

import isNil from 'lodash/isNil.js';
import micromatch from 'micromatch';

import { JestThreshold } from '../typings/JestThreshold.js';
import { JsonReport } from '../typings/JsonReport.js';
import { FailReason } from '../typings/Report.js';
import { ThresholdResult } from '../typings/ThresholdResult.js';
import { accumulateCoverageDetails } from '../utils/accumulateCoverageDetails.js';
import { checkSingleThreshold } from '../utils/checkSingleThreshold.js';
import { DataCollector } from '../utils/DataCollector.js';
import { getCoverageForDirectory } from '../utils/getCoverageForDirectory.js';
import { getFileCoverageMap } from '../utils/getFileCoverageMap.js';
import { joinPaths } from '../utils/joinPaths.js';

export const checkThreshold = (
    report: JsonReport,
    threshold: JestThreshold,
    workingDirectory: string | undefined,
    dataCollector: DataCollector<unknown>
) => {
    const cwd = joinPaths(process.cwd(), workingDirectory);
    // Maybe somehow take this from "format" stage?
    const coverageDetailMap = Object.fromEntries(
        Object.entries(getFileCoverageMap(report)).map(([key, value]) => [
            key.substring(cwd.length + 1),
            value,
        ])
    );

    const dirSet = new Set<string>();

    Object.keys(coverageDetailMap)
        .filter((value) => value === 'global')
        .forEach((value) => {
            let directory = dirname(value);

            while (directory !== '.') {
                dirSet.add(directory);
                directory = dirname(directory);
            }
        });

    const directories = Array.from(dirSet);

    const totalResults: ThresholdResult[] = [];

    Object.entries(threshold).forEach(([pattern, threshold]) => {
        const selectedDirectories = micromatch(directories, pattern);

        const coverageOfDirectories = selectedDirectories.map((directory) =>
            getCoverageForDirectory(directory, coverageDetailMap)
        );

        const thresholdResults = coverageOfDirectories.map((coverage, index) =>
            checkSingleThreshold(
                threshold,
                coverage,
                selectedDirectories[index]
            )
        );

        totalResults.push(
            ...(thresholdResults.filter(
                (value) => value !== undefined
            ) as ThresholdResult[])
        );
    });

    const files = Object.keys(coverageDetailMap);
    Object.entries(threshold).forEach(([pattern, threshold]) => {
        const selectedFiles = micromatch(files, pattern);

        const thresholdResults = selectedFiles.map((filename) =>
            checkSingleThreshold(
                threshold,
                coverageDetailMap[filename],
                filename
            )
        );

        totalResults.push(
            ...(thresholdResults.filter(
                (value) => value !== undefined
            ) as ThresholdResult[])
        );
    });

    if (!isNil(threshold.global)) {
        const uncheckedFiles = micromatch.not(
            files,
            Object.keys(threshold).concat(
                micromatch(directories, Object.keys(threshold)).map(
                    (value) => `${value}/**`
                )
            )
        );

        const uncheckedTotal = accumulateCoverageDetails(
            uncheckedFiles.map((filename) => coverageDetailMap[filename])
        );

        const globalResult = checkSingleThreshold(
            threshold.global,
            uncheckedTotal,
            'global'
        );

        if (globalResult) {
            totalResults.push(globalResult);
        }
    }

    if (totalResults.length > 0) {
        dataCollector.add(FailReason.UNDER_THRESHOLD);
    }

    return totalResults;
};
