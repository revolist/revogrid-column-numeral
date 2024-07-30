const path = require('path');

module.exports = {
  mode: 'development', // or 'production' depending on your needs
  entry: './demo/index.js', // your main JS file
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, '.'),
  },
  resolve: {
    alias: {
      '@revolist/revogrid-column-numeral': path.resolve(__dirname, '../'),
    },
  },
  devServer: {
    static: path.resolve(__dirname, '.'), // where to serve the files from
    port: 3000, // you can use any port you like
  },
};
