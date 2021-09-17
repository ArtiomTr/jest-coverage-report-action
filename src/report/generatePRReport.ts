import { setFailed } from "@actions/core";
import { getOctokit } from "@actions/github";

import { fetchPreviousReport } from "./fetchPreviousReport";
import { getReportBody } from "./getReportBody";
import { Icons } from "../format/Icons";
import { FailReason, Report } from "../typings/Report";

export const generatePRReport = async (
  icons: Icons,
  headReport: Report,
  baseReport: Report,
  coverageThreshold: number | undefined,
  repo: { owner: string; repo: string },
  pr: { number: number },
  octokit: ReturnType<typeof getOctokit>,
  dir?: string,
  customTitle?: string
) => {
  const previousReport = await fetchPreviousReport(octokit, repo, pr, dir);

  try {
    const reportBody = getReportBody(
      icons,
      headReport,
      baseReport,
      coverageThreshold,
      dir,
      customTitle
    );

    if (previousReport) {
      await octokit.issues.updateComment({
        ...repo,
        body: reportBody,
        comment_id: (previousReport as { id: number }).id,
      });
    } else {
      await octokit.issues.createComment({
        ...repo,
        body: reportBody,
        issue_number: pr.number,
      });
    }

    if (headReport.failReason || !headReport.success || headReport.error) {
      setFailed(headReport.failReason ?? FailReason.UNKNOWN_ERROR);
    }
  } catch (error) {
    console.error(
      "Error deleting and/or creating comment. This can happen for PR's originating from a fork without write permissions.",
      error
    );

    setFailed(error);
  }
};
