const coverageDetailsRegexp = new RegExp(
    '^([^0-9|-]+)' +
        '(?:\\|\\s*([0-9]+\\.?[0-9]*)\\s*)'.repeat(4) +
        '(?:\\|\\s*([0-9.\\-\\s,]*)\\s*)$',
    'gm'
);

export type Range = {
    start: number;
    end: number | null;
};

export type FileCoverageDetail = {
    statements: number;
    branches: number;
    functions: number;
    lines: number;
    uncoveredLines: Array<Range>;
};

export type ParsedCoverageDetails = Record<string, FileCoverageDetail>;

export const parseCoverageDetails = (source: string): ParsedCoverageDetails => {
    source = source.slice(source.indexOf('-'), source.lastIndexOf('-'));

    const output: ParsedCoverageDetails = {};

    source.replace(
        coverageDetailsRegexp,
        (
            _junk,
            filename,
            statements,
            branches,
            functions,
            lines,
            uncovered: string
        ) => {
            filename = filename.trim();
            if (filename !== 'All files') {
                output[filename] = {
                    statements: parseFloat(statements),
                    branches: parseFloat(branches),
                    functions: parseFloat(functions),
                    lines: parseFloat(lines),
                    uncoveredLines: uncovered.split(',').map((range) => {
                        if (range.includes('-')) {
                            const [start, end] = range.split('-');
                            return {
                                start: parseInt(start),
                                end: parseInt(end),
                            };
                        } else {
                            return { start: parseInt(range), end: null };
                        }
                    }),
                };
            }
            return '';
        }
    );

    return output;
};
