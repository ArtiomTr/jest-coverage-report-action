module.exports = {
    schema: require.resolve('@octokit/graphql-schema/schema.graphql'),
    documents: ['src/graphql/*.graphql'],
};
