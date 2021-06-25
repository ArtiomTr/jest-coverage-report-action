declare module '@mdx-js/react' {
    import * as React from 'react';
    type ComponentType =
        | 'blockquote'
        | 'code'
        | 'delete'
        | 'em'
        | 'hr'
        | 'img'
        | 'inlineCode'
        | 'li'
        | 'ol'
        | 'p'
        | 'pre'
        | 'strong'
        | 'sup'
        | 'table'
        | 'td'
        | 'th'
        | 'tbody'
        | 'thead'
        | 'thematicBreak'
        | 'tr'
        | 'ul';

    type HeadingProps = {
        id: string;
    };

    export type CodeProps = {
        children: string;
        className: string;
        metastring: string;
        [key: string]: boolean | string;
    };

    export type Components = {
        [key in ComponentType]?: React.ComponentType<{
            children: React.ReactNode;
        }>;
    } & {
        [key: string]: React.ComponentType;
    } & {
        a?: React.ComponentType<{ href: string }>;
        h1?: React.ComponentType<HeadingProps>;
        h2?: React.ComponentType<HeadingProps>;
        h3?: React.ComponentType<HeadingProps>;
        h4?: React.ComponentType<HeadingProps>;
        h5?: React.ComponentType<HeadingProps>;
        h6?: React.ComponentType<HeadingProps>;
        code?: React.ComponentType<CodeProps>;
    };
    export interface MDXProviderProps {
        children: React.ReactNode;
        components: Components;
    }
    export class MDXProvider extends React.Component<MDXProviderProps> {}
}
