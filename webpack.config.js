const path = require('path');
module.exports = {
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
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
      },
    ]
  },
};
