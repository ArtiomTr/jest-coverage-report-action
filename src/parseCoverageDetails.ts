const coverageDetailsRegexp = /^([^0-9|-]+)(?:\|\s*([0-9]+\.?[0-9]*)\s*)(?:\|\s*([0-9]+\.?[0-9]*)\s*)(?:\|\s*([0-9]+\.?[0-9]*)\s*)(?:\|\s*([0-9]+\.?[0-9]*)\s*)/gm;

export type FileCoverageDetail = {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
};

export type ParsedCoverageDetails = Record<string, FileCoverageDetail>;

export const parseCoverageDetails = (source: string): ParsedCoverageDetails => {
    source = source.slice(source.indexOf('-'), source.lastIndexOf('-'));

    const output: ParsedCoverageDetails = {};

    source.replace(
        coverageDetailsRegexp,
        (_junk, filename, statements, branches, functions, lines) => {
            filename = filename.trim();
            if (filename !== 'All files') {
                output[filename] = {
                    statements: parseFloat(statements),
                    branches: parseFloat(branches),
                    functions: parseFloat(functions),
                    lines: parseFloat(lines),
                };
            }
            return '';
        }
    );

    return output;
};
