import type { operations } from '@octokit/openapi-types';

export type Annotation = Required<
    Required<
        operations['checks/create']['requestBody']['content']['application/json']
    >['output']
>['annotations'][number];
