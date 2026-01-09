module.exports = {
  presets: [
    ['@babel/preset-env', {
      targets: {
        ios: '13',
        safari: '13',
        chrome: '70',
        firefox: '70',
        edge: '79'
      },
      useBuiltIns: 'usage',
      corejs: 3
    }],
    ['@babel/preset-react', { runtime: 'automatic' }],
    '@babel/preset-typescript'
  ]
};
