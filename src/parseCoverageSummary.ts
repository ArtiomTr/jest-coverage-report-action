const statsRegexp = /(?:Statements|Branches|Functions|Lines)\s*:\s*([0-9]+(?:\.[0-9]+)?)[^(]+\(\s+([0-9])+\/([0-9]+)/g;

export type CoverageSummaryStat = {
    percentage: number;
    covered: number;
    total: number;
};

export type ParsedCoverageSummary = {
    statements: CoverageSummaryStat;
    branches: CoverageSummaryStat;
    functions: CoverageSummaryStat;
    lines: CoverageSummaryStat;
};

export const parseCoverageSummary = (source: string): ParsedCoverageSummary => {
    const map: ParsedCoverageSummary = {} as ParsedCoverageSummary;

    source.replace(statsRegexp, (key, percentage, covered, total) => {
        const stat: CoverageSummaryStat = {
            percentage: parseFloat(percentage),
            covered: parseInt(covered),
            total: parseInt(total),
        };

        if (key.includes('Statements')) {
            map.statements = stat;
        } else if (key.includes('Branches')) {
            map.branches = stat;
        } else if (key.includes('Functions')) {
            map.functions = stat;
        } else if (key.includes('Lines')) {
            map.lines = stat;
        }

        return '';
    });

    return map;
};
