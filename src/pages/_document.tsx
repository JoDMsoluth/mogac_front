import Document, { Head, Main, NextScript } from 'next/document';
import { Helmet } from 'react-helmet';
import { ServerStyleSheets } from '@material-ui/styles';
import { ServerStyleSheet } from 'styled-components';

interface DocumentProps {
  helmet: any;
  styles: any;
}

class MyDocument extends Document<DocumentProps> {
  static async getInitialProps(ctx: any) {
    // Render app and page and get the context of the page with collected side effects.

    const styledComponentsSheet = new ServerStyleSheet();
    const materialSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(
              materialSheets.collect(<App {...props} />),
            ),
        });
      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        helmet: Helmet.renderStatic(),
        styles: (
          <>
            {initialProps.styles}
            {materialSheets.getStyleElement()}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    const { htmlAttributes, bodyAttributes, ...helmet } = this.props.helmet;
    const htmlAttrs = htmlAttributes.toComponent();
    const bodyAttrs = bodyAttributes.toComponent();

    return (
      <html {...htmlAttrs}>
        <Head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no"
          />
          <meta name="description" content="My First Static Website" />
          <meta name="keywords" content="nextjs,static,website" />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.1/build/styles/atom-one-dark.min.css"
          />
          <script src="../../codemirror/codemirror.js"></script>
          <link rel="stylesheet" href="../../codemirror/codemirror.css" />
          <script src="../../codemirror/javascript.js"></script>
          <script src="https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.0.1/build/highlight.min.js"></script>
          <script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/10.0.1/languages/javascript.min.js"></script>

          <script>hljs.initHighlightingOnLoad();</script>

          {Object.values(helmet).map((el: any) => el.toComponent())}
        </Head>
        <body {...bodyAttrs}>
          <Main />

          {process.env.NODE_ENV === 'production' && (
            <script src="https://polyfill.io/v3/polyfill.min.js?features=es6,es7,es8,es9,NodeList.prototype.forEach&flags=gated" />
          )}
          <NextScript />
          <pre>
            <code className="plaintext">const name = a;</code>
          </pre>
        </body>
      </html>
    );
  }
}

export default MyDocument;
