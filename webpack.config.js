const path = require('path');

const libraryName = 'revo-column-number';

const common = {
  mode: 'production',
  entry: {
    [libraryName]: './src/index.ts'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  externals: [
    'numbro',
    'numeral',
    '@revolist/revogrid',
    /^@revolist\/revogrid\//,
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};


module.exports = [{
  ...common,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].umd.cjs',
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },
}, {
  ...common,
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].mjs',
    libraryTarget: 'module',
  },
  experiments: {
    outputModule: true // Enables experimental support for ESM output
  },
}];
