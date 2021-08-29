import { joinPaths } from './joinPaths';
import { REPORT_PATH } from '../constants/REPORT_PATH';
export const getReportPath = (workingDirectory?: string) =>
    joinPaths(workingDirectory, REPORT_PATH);
