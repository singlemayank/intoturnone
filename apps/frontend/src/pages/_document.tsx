import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';

class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
        <link rel="icon" type="image/png" href="/favicon.ico.png" />
          {/* ✅ Google Fonts moved here to avoid Next.js warning */}
          <link
            href="https://fonts.googleapis.com/css2?family=Orbitron:wght@600&display=swap"
            rel="stylesheet"
          />

          {/* ✅ Google AdSense */}
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8895269533677060"
            crossOrigin="anonymous"
          ></script>
          
         
          {/* Default favicon for dark mode */}
          <link rel="icon" href="/favicon-white.png" media="(prefers-color-scheme: dark)" />
          
          {/* Override for light mode */}
          <link rel="icon" href="/favicon-black.png" media="(prefers-color-scheme: light)" />
        
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
