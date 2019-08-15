import React from 'react';
import Document from 'next/document';
import { ServerStyleSheet, StyleSheetManager } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(context) {
    const sheet = new ServerStyleSheet();
    const { renderPage } = context;
    const { styles, ...initialProps } = await Document.getInitialProps(context);
    const styleElement = sheet.getStyleElement();

    // eslint-disable-next-line no-param-reassign
    context.renderPage = () =>
      renderPage({
        enhanceApp: App => props => (
          <StyleSheetManager sheet={sheet.instance}>
            <App {...props} />
          </StyleSheetManager>
        ),
      });

    sheet.seal();

    return {
      ...initialProps,
      styles: (
        <>
          {styles}
          {styleElement}
        </>
      ),
    };
  }
}
