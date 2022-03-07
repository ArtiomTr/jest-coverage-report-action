import { createMarkdownSpoiler } from '../../src/utils/createMarkdownSpoiler';

describe('createMarkdownSpoiler', () => {
    it('should create markdown spoiler', () => {
        expect(
            createMarkdownSpoiler({
                body: 'This is body',
                summary: 'This is summary',
            })
        ).toBe(`
<details><summary>This is summary</summary>
<br/>

This is body

</details>
`);
    });
});
