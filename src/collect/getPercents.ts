export const getPercents = (covered: number, total: number): number => {
    if (total === 0) return 100;

    return (covered / total) * 100;
};
