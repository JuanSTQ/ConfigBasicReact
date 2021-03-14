const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


module.exports = {
  entry:'./src/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  mode: 'development',
  module:{
    rules:[
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader:'babel-loader'
        }
      },
      {
        test: /\.html$/,
        use:[
          {loader: 'html-loader'}
        ]
      },
      {
        test: /\.s?css$/, // /\.s[ac]ss$ /empieza con s termina con ss y entre medio puede ir [a o c] sass o css
        //recordemos que sass puede ser un .sass o .scss
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: './public/index.html', //donde se encutra
      filename: './index.html' //el archivo resultante en la raiz del proyecto
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css' //el archivo resultante
    })
  ],
  devServer:{
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 3006
  }
}