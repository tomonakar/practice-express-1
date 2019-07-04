module.exports = {
  context: __dirname + '/app',  // クライアントのJSディレクトリを指定
  entry: './entry',             // エントリーファイル
  mode: 'none',
  output: {
    path: __dirname + '/public/javascripts', // バンドルしたファイルの出力先
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    }]
  }
};