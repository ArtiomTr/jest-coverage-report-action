import { readFile } from "fs-extra";

import { getRawCoverage } from "./getRawCoverage";
import { parseCoverage } from "./parseCoverage";
import { parseJsonReport } from "./parseJsonReport";
import { JsonReport } from "../typings/JsonReport";
import { PackageManagerType, SkipStepType } from "../typings/Options";
import { Report } from "../typings/Report";

export const collectCoverage = async (
  testCommand: string,
  packageManager: PackageManagerType,
  skipStep: SkipStepType,
  branch?: string,
  workingDirectory?: string,
  coverageFile?: string
): Promise<[Report, JsonReport | undefined]> => {
  const source = await getRawCoverage(
    testCommand,
    packageManager,
    skipStep,
    branch,
    workingDirectory,
    coverageFile
  );

  if (typeof source !== "string") {
    return [source, undefined];
  }

  const jsonReport = parseJsonReport(source);

  if (
    jsonReport.success === false &&
    (jsonReport as { failReason: unknown }).failReason !== undefined
  ) {
    return [jsonReport, undefined];
  }

  return [parseCoverage(jsonReport as JsonReport), jsonReport as JsonReport];
};
