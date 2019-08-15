import React from 'react';
import App from 'next/app';
import GlobalStyle from '@/components/GlobalStyle';

export default class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <>
        <GlobalStyle />
        <Component {...pageProps} />
      </>
    );
  }
}
