import { i18n } from '../../src/utils/i18n';

describe('i18n', () => {
    it('should insert arguments & icons', () => {
        expect(i18n('{{ a }}', { a: 'hello' })).toBe('hello');
        expect(i18n(':x: {{ a }}', { a: 'hello' })).toBe('❌ hello');
        expect(i18n(':not_specified_icon:')).toBe(':not_specified_icon:');
    });

    it('should read string from strings.json', () => {
        expect(i18n('status')).toBe('St.');
        expect(i18n('errors.multiple')).toBe('Multiple errors occurred');
    });
});
