import { decimalToString } from "./utils/decimalToString";
import { Icons } from "./Icons";
import { insertArgs } from "./insertArgs";
import { errors } from "./strings.json";
import { FailReason } from "../typings/Report";

const errorToDisplay = (error?: Error) =>
  error ? `\n\`\`\`\n${error.stack}\n\`\`\`` : "";

export const getFormattedFailReason = (
  reason: FailReason,
  icons: Icons,
  coverageThreshold?: number,
  currentCoverage?: number,
  error?: Error
): string =>
  `${icons.errorIcon} ${insertArgs(errors[reason], {
    coverageThreshold: coverageThreshold && decimalToString(coverageThreshold),
    currentCoverage: currentCoverage && decimalToString(currentCoverage),
    coveragePath: "report.json",
  })}${errorToDisplay(error)}`;
