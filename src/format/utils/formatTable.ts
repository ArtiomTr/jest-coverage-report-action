export const formatTable = (table: string, legend?: string) =>
    `
${table}

${legend ? '> ' + legend : ''}
`;
