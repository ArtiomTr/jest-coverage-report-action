import { TestRunReport } from '../typings/Report';

export const formatRunReport = (report: TestRunReport): string => {
    const parts = [`# ${report.title}`];
    if (report.failures) {
        parts.push(
            '<details>',
            `<summary>${report.summary}</summary>`,
            report.failures,
            '</details>'
        );
    } else {
        parts.push(`## ${report.summary}`);
    }
    return parts.join('\n');
};
