import { context, getOctokit } from '@actions/github';

import { ParsedCoverageDetails } from '../collect/parseCoverageDetails';

type Annotation = {
    path: string;
    start_line: number;
    end_line: number;
    start_column?: number;
    end_column?: number;
    annotation_level: 'notice' | 'warning' | 'failure';
    message: string;
    title?: string;
    raw_details?: string;
};

const detailsToAnnotations = (details: ParsedCoverageDetails) => {
    const annotations: Annotation[] = [];

    Object.entries(details).forEach(([filename, coverageDetail]) => {
        annotations.push(
            ...coverageDetail.uncoveredLines.map<Annotation>((range) => ({
                path: filename,
                start_line: range.start,
                end_line: range.end ?? range.start,
                message: '',
                annotation_level: 'warning',
            }))
        );
    });

    return annotations;
};

export const createAnnotations = (
    details: ParsedCoverageDetails,
    repo: { owner: string; repo: string },
    octokit: ReturnType<typeof getOctokit>
) =>
    octokit.checks.update({
        owner: repo.owner,
        repo: repo.repo,
        check_run_id: context.runId,
        output: {
            summary: '',
            annotations: detailsToAnnotations(details),
        },
    });
