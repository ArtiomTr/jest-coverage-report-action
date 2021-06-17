import Document, {
    DocumentContext,
    Head,
    Html,
    Main,
    NextScript,
} from 'next/document';
import React from 'react';

export default class CustomDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    public render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="shortcut icon" href="favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
