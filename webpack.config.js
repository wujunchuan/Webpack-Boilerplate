const path = require('path');

const webpackConfig = {
  entry:{
    "index":'./app/entry.js'
  },
  output:{
    //使用node内置path模块中加上__dirname全局变量防止不同操作系统之间的文件路径问题
    //path配置Webpack的结果存储在哪里
    path:path.resolve(__dirname,'dist'),
    //产生的bundle文件名
    filename:'[name].js',
    //publicPath则被许多Webpack插件用于生产模式下更新内嵌css\html文件内的url值
    publicPath:'/assets/'
  },
  module:{
    rules:[
      //babel for translate es6 to es5
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
      },
    ]
  },
  devServer:{
    //防止端口冲突,将Webpack-dev-server的端口切换成8081
    port:8081
  }
};

module.exports = webpackConfig;
