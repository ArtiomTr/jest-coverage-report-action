import { Fragment } from '@covbot/jsx-markdown/jsx-runtime';

import { TextWithLinks } from './TextWithLinks.js';
import { getConsoleLink } from '../utils/getConsoleLink.js';
import { i18n } from '../utils/i18n.js';

export type ErrorViewProps = {
    error: string;
    details?: string;
};

const DOCUMENTATION_LINK =
    'https://github.com/artiomtr/jest-coverage-report-action/#readme';
const REPORT_ISSUE_LINK =
    'https://github.com/ArtiomTr/jest-coverage-report-action/issues/new';

export const ErrorView = ({ error, details }: ErrorViewProps) => {
    return (
        <Fragment>
            <p>
                <TextWithLinks
                    text={i18n(':x: {{ error }}', { error })}
                    links={{
                        console: getConsoleLink(),
                        docs: DOCUMENTATION_LINK,
                        issues: REPORT_ISSUE_LINK,
                    }}
                />
            </p>
            {details && <pre>{details}</pre>}
        </Fragment>
    );
};
