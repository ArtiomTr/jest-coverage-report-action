import { Fragment } from '@covbot/jsx-markdown/jsx-runtime';

import { mapRegex } from '../utils/mapRegex.js';

export type TextWithLinksProps = {
    text: string;
    links: Record<string, string>;
};

const linkRegex = /\[(?<text>[^\]]*)\]\(#(?<link>\w+)\)/;

const getLink = (result: RegExpExecArray, links: Record<string, string>) => {
    const text = result.groups?.text;
    const linkId = result.groups?.link;

    if (typeof text !== 'string') {
        throw new Error('Invalid link format - link must contain text.');
    }

    if (typeof linkId !== 'string') {
        throw new Error('Invalid link format - link must contain url id');
    }

    const link = links[linkId];

    if (typeof link !== 'string') {
        throw new Error(`Unknown link with id "${linkId}" received.`);
    }

    return <a href={link}>{text}</a>;
};

const mapText = (text: string) => <>{text}</>;

export const TextWithLinks = ({ text, links }: TextWithLinksProps) => {
    return (
        <Fragment>
            {mapRegex(
                text,
                linkRegex,
                (result) => getLink(result, links),
                mapText
            )}
        </Fragment>
    );
};
