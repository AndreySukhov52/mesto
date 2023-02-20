// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // подключили плагин
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    main: path.resolve(__dirname, 'src', 'pages', 'index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
    publicPath: '',
  },
  mode: 'development',
  devServer: {
    static: path.resolve(__dirname, './dist'), // путь, куда "смотрит" режим разработчика
    compress: true, // это ускорит загрузку в режиме разработки
    port: 8080, // порт, чтобы открывать сайт по адресу localhost:8080, но можно поменять порт
    watchFiles: ['*/**/*.html'],
    open: true // сайт будет открываться сам при запуске npm run dev
  },
  module: {
    rules: [{
      test: /\.js$/,
      use: 'babel-loader',
      exclude: '/node_modules/'
    },
    // добавили правило для обработки файлов
    {
      // регулярное выражение, которое ищет все файлы с такими расширениями
      test: /\.(png|svg|jpg|gif|woff(2)?|eot|ttf|otf)$/,
      type: 'asset/resource'
    },
    {
      // применять это правило только к CSS-файлам
      test: /\.css$/,
      // при обработке этих файлов нужно использовать
      // MiniCssExtractPlugin.loader и css-loader
      use: [MiniCssExtractPlugin.loader, {
        loader: 'css-loader',
        options: { importLoaders: 1 }
      },
      'postcss-loader']
    }
  ]

  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src', 'index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin()
  ]
}

//