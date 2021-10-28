import { withExplanation } from '../../src/utils/withExplanation';

describe('withExplanation', () => {
    it('should add explanation', () => {
        expect(withExplanation('test', 'This is simple explanation')).toBe(
            '<div title="This is simple explanation">test<sup>:grey_question:</sup></div>'
        );
    });
});
