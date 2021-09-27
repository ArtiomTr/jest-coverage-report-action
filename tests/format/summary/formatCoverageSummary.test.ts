import { formatCoverageSummary } from '../../../src/format/summary/formatCoverageSummary';

describe('formatCoverageSummary', () => {
    it('should format summary when head and base coverage specified', () => {
        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 23,
                        percentage: 76.67,
                        name: 'statements',
                    },
                ],
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 15,
                        percentage: 50,
                        name: 'statements',
                    },
                ],
                {
                    global: {
                        statements: 70,
                    },
                }
            )
        ).toMatchSnapshot();

        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 23,
                        percentage: 76.67,
                        name: 'statements',
                    },
                ],
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 29,
                        percentage: 96.67,
                        name: 'statements',
                    },
                ],
                {
                    global: {
                        statements: 70,
                    },
                }
            )
        ).toMatchSnapshot();
    });

    it('should format summary when head and base coverage specified (with threshold)', () => {
        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 23,
                        percentage: 76.67,
                        name: 'statements',
                    },
                ],
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 15,
                        percentage: 50,
                        name: 'statements',
                    },
                ],
                {
                    global: {
                        statements: 70,
                    },
                }
            )
        ).toMatchSnapshot();

        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 23,
                        percentage: 76.67,
                        name: 'statements',
                    },
                ],
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 29,
                        percentage: 96.67,
                        name: 'statements',
                    },
                ],
                {
                    global: {
                        statements: 80,
                    },
                }
            )
        ).toMatchSnapshot();
    });

    it('should format summary when head and base coverage specified (with threshold)', () => {
        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 23,
                        percentage: 76.67,
                        name: 'statements',
                    },
                ],
                undefined,
                {
                    global: {
                        statements: 90,
                    },
                }
            )
        ).toMatchSnapshot();

        expect(
            formatCoverageSummary(
                [
                    {
                        title: 'Statements',
                        total: 30,
                        covered: 29,
                        percentage: 96.67,
                        name: 'statements',
                    },
                ],
                undefined,
                {
                    global: {
                        statements: 90,
                    },
                }
            )
        ).toMatchSnapshot();
    });
});
