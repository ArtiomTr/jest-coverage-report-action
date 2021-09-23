import { insertArgs } from '../../src/utils/insertArgs';

describe('insertArgs', () => {
    it('should insert arguments', () => {
        expect(insertArgs('{{ arg }}', { arg: 'hello' })).toBe('hello');
        expect(insertArgs('Hello, {{ name }}!', { name: 'world' })).toBe(
            'Hello, world!'
        );
        expect(
            insertArgs('First: {{ arg1 }}, second: {{ arg2 }}', {
                arg1: 'hello',
                arg2: 2,
            })
        ).toBe('First: hello, second: 2');
    });

    it('should skip arguments, which are not provided', () => {
        expect(insertArgs('{{ notGivenArgument }}', {})).toBe(
            '{{ notGivenArgument }}'
        );
        expect(
            insertArgs('{{ given }}, {{ notGivenArgument }}', { given: 'a' })
        ).toBe('a, {{ notGivenArgument }}');
    });
});
