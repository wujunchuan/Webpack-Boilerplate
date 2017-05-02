const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const webpackConfig = {
  entry:{
    "vendor":[
      'jquery',
    ],
    "index":'./app/js/entry.js',
  },
  output:{
    //使用node内置path模块中加上__dirname全局变量防止不同操作系统之间的文件路径问题
    //path配置Webpack的结果存储在哪里
    path:path.resolve(__dirname,'dist'),
    //产生的bundle文件名
    filename:'[name].[chunkhash:8].js',
    //publicPath则被许多Webpack插件用于生产模式下更新内嵌css\html文件内的url值
    //publicPath:'/assets/'
    publicPath:'/'
  },
  module:{
    rules:[
      //babel for translate es6 to es5
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
      },
      {
        test:/\.css$/,
        exclude:/node_modules/,
        use: ExtractTextPlugin.extract({
          use:'css-loader'
        })
      }
    ]
  },
  plugins:[
    //bind jquery library to global
    new webpack.ProvidePlugin({
      $:'jquery',
      jQuery:'jquery'
    }),
    //优化,将通用模块(在这里指的是jQuery)抽离出来单独成块
    //添加manifest是为了避免每次vendor都在构建中改变,使得浏览器缓存机制失效
    new webpack.optimize.CommonsChunkPlugin({
      names:['vendor','manifest'],
    }),
    //自动生成页面:文件名带上hash后,hash变化都需要在HTML文件内手动修改引用文件名,这样太麻烦了
    //因此我们使用html-webpack-plugin 来帮我们自动处理这种事情,简化创建服务于webpack bundle 的HTML文件
    new HtmlWebpackPlugin({
      filename:'index.html',
      template:'index.html',
    }),
    new ExtractTextPlugin('[name].[chunkhash:8].css'),
  ],
  devServer:{
    //防止端口冲突,将Webpack-dev-server的端口切换成8081
    port:8081
  }
};

module.exports = webpackConfig;
