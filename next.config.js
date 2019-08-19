require('dotenv').config();

const babelLoader = {
  loader: 'babel-loader',
};

const svgrLoader = {
  loader: '@svgr/webpack',
  options: {
    babel: false,
    svgoConfig: {
      plugins: {
        removeViewBox: false,
      },
    },
  },
};

const urlLoader = {
  loader: 'url-loader',
  options: {
    limit: 1024,
  },
};

const env = {
  GITHUB_TOKEN: process.env.GITHUB_TOKEN,
};

const webpack = config => {
  config.module.rules.unshift({
    test: /\.svg$/,
    issuer: {
      test: /\.js$/,
    },
    use: [babelLoader, svgrLoader, urlLoader],
  });

  return config;
};

const config = {
  env,
  webpack,
};

module.exports = config;
