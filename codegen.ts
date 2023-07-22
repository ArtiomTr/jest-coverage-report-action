import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    overwrite: true,
    schema: require.resolve('@octokit/graphql-schema/schema.graphql'),
    documents: ['src/graphql/*.graphql'],
    generates: {
        'src/generated/graphql.ts': {
            plugins: [
                'typescript',
                'typescript-resolvers',
                'typescript-document-nodes',
                'typescript-operations',
            ],
            config: {
                gqlImport: '../gql',
            },
        },
    },
};

export default config;
