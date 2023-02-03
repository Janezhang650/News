const path = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const uglify = require('uglifyjs-webpack-plugin');

module.exports = {
  // 模式：开发  生产
  mode: 'development', // production
  // source-map
  devtool: 'source-map',
  // 优化 禁止压缩  最小化
  optimization: {
    minimize: false
  },
  // 入口
  entry: {
    index: path.resolve(__dirname, './src/js/index.js'),
    detail: path.resolve(__dirname, './src/js/detail.js'),
    collections: path.resolve(__dirname, './src/js/collection.js')
  },
  // 输出、打包设置
  output: {
    // 路径
    path: path.resolve(__dirname, './dist'),
    // 打包后的文件名
    filename: 'js/[name].js'
  },
  // 模块设置
  module: {
    // 模块匹配规则
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: path.resolve(__dirname, 'node_modules'),
        query: {
          'presets': ['latest']
        }
      },
      {
        test: /\.tpl$/,
        loader: 'ejs-loader'
      },
      {
        test:/\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [autoprefixer('last 5 versions')]
              }
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
        loader: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
      }
    ]
  },
  // 插件配置
  plugins: [
    new uglify(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/index.html'),
      title: '新闻头条',
      chunks: ['index'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'detail.html',
      template: path.resolve(__dirname, 'src/detail.html'),
      title: '新闻详情',
      chunks: ['detail'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new HtmlWebpackPlugin({
      filename: 'collection.html',
      template: path.resolve(__dirname, 'src/collection.html'),
      title: '我的新闻',
      chunks: ['collection'],
      chunksSortMode: 'manual',
      excludeChunks: ['node_modules'],
      hash: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
  ],
  // 开发服务器配置
  devServer: {
    watchOptions: {
      ignored: /node_modules/
    },
    open: true,
    host: 'localhost',
    port: 3000
  }
}