import {
  coveredBranchesCounter,
  coveredLinesCounter,
  standardCoveredCounter,
  standardTotalCounter,
  totalBranchesCounter,
  totalLinesCounter,
} from "./counters";
import { getSummary } from "./getSummary";
import { JsonReport } from "../typings/JsonReport";

export const parseSummary = (jsonReport: JsonReport) => {
  return [
    getSummary(
      jsonReport.coverageMap,
      standardTotalCounter("s"),
      standardCoveredCounter("s"),
      "Statements"
    ),
    getSummary(
      jsonReport.coverageMap,
      totalBranchesCounter,
      coveredBranchesCounter,
      "Branches"
    ),
    getSummary(
      jsonReport.coverageMap,
      standardTotalCounter("f"),
      standardCoveredCounter("f"),
      "Functions"
    ),
    getSummary(
      jsonReport.coverageMap,
      totalLinesCounter,
      coveredLinesCounter,
      "Lines"
    ),
  ];
};
