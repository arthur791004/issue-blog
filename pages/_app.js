import React from 'react';
import App from 'next/app';
import Head from 'next/head';
import { ApolloProvider } from '@apollo/react-hooks';
import { getDataFromTree } from '@apollo/react-ssr';
import { createApolloClient } from '@/services/apollo';
import GlobalStyle from '@/components/GlobalStyle';

const getInitialApolloState = async (AppTree, props) => {
  const client = createApolloClient();

  await getDataFromTree(<AppTree {...props} apolloClient={client} />);

  // getDataFromTree does not call componentWillUnmount
  // head side effect therefore need to be cleared manually
  Head.rewind();

  return client.extract();
};

export default class MyApp extends App {
  static async getInitialProps(context) {
    const { AppTree } = context;
    const props = App.getInitialProps ? await App.getInitialProps(context) : {};
    const apolloState = await getInitialApolloState(AppTree, props);

    return { ...props, apolloState };
  }

  constructor(props) {
    super(props);
    this.apolloClient = createApolloClient(props.apolloState);
  }

  render() {
    const { Component, pageProps } = this.props;

    return (
      <ApolloProvider client={this.apolloClient}>
        <GlobalStyle />
        <Component {...pageProps} />
      </ApolloProvider>
    );
  }
}
