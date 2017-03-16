const webpack = require('webpack')
const path = require('path')

module.exports = {
  entry: './index.js',
  output: {
    filename: 'build.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    hot: true,
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8868
  },
  module: {
    rules: [
      {
       test: /\.js$/,
       exclude: /(node_modules|bower_components)/,
       loader: 'babel-loader',
       query: {
         presets: ['es2015']
       }
     },
     {
        test: /\.scss$/,
        use: [{
            loader: "style-loader"
        }, {
            loader: "css-loader"
        }, {
            loader: "sass-loader"
        }, {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
        }]
      }
    ]
  },
  plugins: [
   new webpack.HotModuleReplacementPlugin(),
   // 开启全局的模块热替换(HMR)
  //  new ExtractTextPlugin("index.scss")
   new webpack.NamedModulesPlugin()
   // 当模块热替换(HMR)时在浏览器控制台输出对用户更友好的模块名字信息
 ],
}
