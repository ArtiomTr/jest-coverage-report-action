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
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <meta
                        name="google-site-verification"
                        content="e75fzjan1n2eI93J4_tO7zpyk-Bz1MFqalr4okHe7e8"
                    />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-BT9580VG7N"
                    ></script>
                    <script src="/analytics.js" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}
