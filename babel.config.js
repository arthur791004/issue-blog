module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': '.',
        },
      },
    ],
    ['styled-components', { ssr: true }],
  ],
};
