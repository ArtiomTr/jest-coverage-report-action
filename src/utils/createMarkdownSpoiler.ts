export type SpoilerConfig = {
    body: string;
    summary: string;
};

export const createMarkdownSpoiler = ({
    body,
    summary,
}: SpoilerConfig): string => `
<details><summary>${summary}</summary>
<br/>

${body}

</details>
`;
