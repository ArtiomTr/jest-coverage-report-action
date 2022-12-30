import { toMarkdown } from 'mdast-util-to-markdown';

import { Errors } from '../components/Errors.js';

export const formatErrors = (errors: Array<Error>) => {
    return toMarkdown(
        <root>
            <Errors errors={errors} />
        </root>,
        {
            fences: true,
        }
    );
};
