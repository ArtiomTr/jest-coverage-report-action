import { context } from "@actions/github";

import { getReportTag } from "../constants/getReportTag";
import { getFormattedCoverage } from "../format/getFormattedCoverage";
import { getFormattedFailReason } from "../format/getFormattedFailReason";
import { Icons } from "../format/Icons";
import { insertArgs } from "../format/insertArgs";
import REPORT from "../format/REPORT.md";
import strings from "../format/strings.json";
import { FailReason, Report } from "../typings/Report";

export const getReportBody = (
  icons: Icons,
  headReport: Report,
  baseReport: Report | undefined,
  coverageThreshold: number | undefined,
  dir?: string,
  customTitle?: string
) => {
  let reportContent: string;
  let failReason = headReport.failReason;

  let normalizedBaseReport: Report = baseReport as Report;

  if (
    !baseReport ||
    !baseReport?.success ||
    !baseReport?.summary ||
    !baseReport?.details ||
    baseReport?.failReason
  ) {
    console.log(
      "Head is ok, but the base branch does not have valid coverage. Some features will be disabled."
    );

    normalizedBaseReport = headReport;
  }

  if (
    headReport.success &&
    headReport.summary &&
    headReport.details &&
    !headReport.failReason
  ) {
    reportContent = getFormattedCoverage(
      icons,
      headReport.summary,
      normalizedBaseReport.summary!,
      headReport.details,
      normalizedBaseReport.details!,
      coverageThreshold
    );
  } else {
    failReason = failReason ?? FailReason.UNKNOWN_ERROR;
    reportContent = getFormattedFailReason(
      failReason,
      icons,
      coverageThreshold,
      headReport.summary?.find((value) => value.title === "Statements")
        ?.percentage,
      headReport.error
    );
    if (
      failReason === FailReason.UNDER_THRESHOLD &&
      headReport.summary &&
      headReport.details
    ) {
      reportContent = reportContent.concat(
        "\n",
        getFormattedCoverage(
          icons,
          headReport.summary,
          normalizedBaseReport.summary!,
          headReport.details,
          normalizedBaseReport.details!,
          coverageThreshold
        )
      );
    }
  }

  const reportBody = insertArgs(REPORT, {
    head: getReportTag(dir),
    title: insertArgs(customTitle || strings.summary.title, {
      dir: dir ? `for \`${dir}\`` : "",
    }),
    body: reportContent,
    sha:
      context.payload.after ??
      context.payload.pull_request?.head.sha ??
      context.sha,
  });

  return reportBody;
};
