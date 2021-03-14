const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

module.exports = {
  mode: 'production',
  entry:'./src/index.js',
  output: {
    path: path.resolve(__dirname,'dist'),
    filename: 'bundle.js',
    publicPath: "/"
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias:{
      '@component': path.resolve(__dirname,"src/components/"),
      '@styles' : path.resolve(__dirname,"src/styles/")
    }
  },
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
          MiniCssExtractPlugin.loader,
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
    }),
    new CleanWebpackPlugin(),
  ],
  optimization:{
    minimize:true,
    minimizer:[
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ]
  }

}