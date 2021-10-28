import { isAnnotationEnabled } from '../../src/annotations/isAnnotationEnabled';

describe('isAnnotationEnabled', () => {
    it('should return true', () => {
        expect(
            isAnnotationEnabled('failed-tests', 'failed-tests')
        ).toBeTruthy();
        expect(isAnnotationEnabled('all', 'failed-tests')).toBeTruthy();
    });

    it('should return false', () => {
        expect(isAnnotationEnabled('none', 'failed-tests')).toBeFalsy();
        expect(isAnnotationEnabled('coverage', 'failed-tests')).toBeFalsy();
    });
});
