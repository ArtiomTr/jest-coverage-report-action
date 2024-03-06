export enum FailReason {
    TESTS_FAILED = 'testsFailed',
    INVALID_COVERAGE_FORMAT = 'invalidFormat',
    UNDER_THRESHOLD = 'underThreshold',
    UNKNOWN_ERROR = 'unknownError',
    REPORT_NOT_FOUND = 'reportNotFound',
    READING_COVERAGE_FILE_FAILED = 'readingCoverageFileFailed',
    FAILED_GETTING_COVERAGE = 'failedGettingCoverage',
    MISSING_CHECKS_PERMISSION = 'missingChecksPermission',
}

export type TestRunReport =
    | {
          success: true;
          title: string;
          summary: string;
      }
    | {
          success: false;
          title: string;
          summary: string;
          failures: string;
      };

export type SummaryReport = {
    text: string;
};
