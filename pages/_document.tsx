import Document, { Html, Head, Main, NextScript } from 'next/document';

class Doc extends Document {
  render() {
    return (
      <Html>
        <Head title="Voyage Protocol">
          <link
            href="https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;700&display=swap"
            rel="stylesheet"
          />
          {/* import __ENV.js to avoid building environment-specific containers */}
          {/* eslint-disable-next-line @next/next/no-sync-scripts */}
          <script src={'/__ENV.js'} />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Doc;
