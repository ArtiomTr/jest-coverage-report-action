export const formatTable = (heading: string, table: string, legend?: string) =>
  `
### ${heading}

${table}

${legend ? "> " + legend : ""}
`;
