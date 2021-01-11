import { formatPercentageDelta } from './formatPercentageDelta';

const APPROXIMATION_THRESHOLD = 1;

export const formatPercentage = (
    headPercentage: number,
    basePercentage: number = headPercentage
) => {
    const delta = basePercentage - headPercentage;

    return `\`\`\`diff
!   ${headPercentage}% 
\`\`\` ${
        Math.abs(delta) > APPROXIMATION_THRESHOLD
            ? formatPercentageDelta(delta)
            : ''
    }`;
};
