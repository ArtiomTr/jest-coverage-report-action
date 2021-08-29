import { TestRunReport } from '../typings/Report';
import { createMarkdownSpoiler } from '../utils/createMarkdownSpoiler';

export const formatRunReport = (report: TestRunReport): string => {
    const parts = [`# ${report.title}`];
    if (report.failures) {
        parts.push(
            createMarkdownSpoiler({
                summary: report.getSummary,
                body: report.failures,
            })
        );
    } else {
        parts.push(`## ${report.summary}`);
    }
    return parts.join('\n');
};
