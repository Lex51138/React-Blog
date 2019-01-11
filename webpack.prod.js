const pathLib = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const ROOT_PATH = pathLib.resolve(__dirname);
const ENTRY_PATH = pathLib.resolve(ROOT_PATH, 'app');
const OUTPUT_PATH = pathLib.resolve(ROOT_PATH, 'build');
console.log(pathLib.resolve(ENTRY_PATH, 'index.js'));

module.exports = {
    entry: {
        index: ['babel-polyfill',pathLib.resolve(ENTRY_PATH, 'index.js')],
        vendor: ['react', 'react-dom', 'react-router-dom','react-router']
    },
    output: {
        path: OUTPUT_PATH,
        publicPath: '/',
        filename: '[name]-[chunkhash].js'
    },
   // devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            },
            {
                test:/\.css$/,
                exclude:/node_modules/,
                use:ExtractTextPlugin.extract({
                    fallback:'style-loader',
                    use:[
                        {
                            loader:'css-loader',
                            options:{
                                modules:true,
                                localIdentName:'[name]-[local]-[hash:base64:5]',
                                importLoaders:1
                            }
                        },
                        'postcss-loader'
                    ]
                })
            },
            {
                test: /\.css$/,
                include: /node_modules/,
                use: ['style-loader',
                    {
                        loader: 'css-loader'
                    },
                    'postcss-loader'
                ]
            },
            {
                test: /\.less$/,
                use: ["style-loader", 'css-loader', "postcss-loader", "less-loader"]
            },
            {
                test: /\.(png|jpg|gif|JPG|GIF|PNG|BMP|bmp|JPEG|jpeg)$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.(eot|woff|ttf|woff2|svg)$/,
                use: 'url-loader'
            }
        ]
    },
    plugins: [
        new CleanPlugin(['build']),
        new ProgressBarPlugin(),
        new webpack.optimize.AggressiveMergingPlugin(),//改善chunk传输
        new webpack.DefinePlugin({
            "progress.env.NODE_ENV": JSON.stringify('production')
        }),
        new HtmlWebpackPlugin({
            title: "Lex blog",
            inject: true, // 自动注入
            minify: {
                removeComments: true,        //去注释
                collapseWhitespace: true,    //压缩空格
                removeAttributeQuotes: true  //去除属性引用
                // more options:
                // https://github.com/kangax/html-minifier#options-quick-reference
            },
            //必须通过上面的 CommonsChunkPlugin 的依赖关系自动添加 js，css 等
            chunksSortMode: 'dependency',
            showErrors: true,
        }),
        new webpack.NoEmitOnErrorsPlugin(),//保证出错时页面不阻塞，且会在编译结束后报错
        new ExtractTextPlugin({
            filename:'bundle.[contenthash].css',
            disable:false,
            allChunks:true
        }),
        new ExtractTextPlugin('[name].[contenthash].css'),
        new webpack.HashedModuleIdsPlugin(),//用 HashedModuleIdsPlugin 可以轻松地实现 chunkhash 的稳定化
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: function (module) {
                return module.context && module.context.indexOf('node_modules') !== -1;
            }
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "manifest"
        }), 
        new webpack.optimize.UglifyJsPlugin({//打包优化
            comments: false,//去除注释
            compress: {
              warnings: false//去除警告
            }
          }),
          new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
             }
         }),
         new CompressionWebpackPlugin({ //gzip 压缩
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(js|css|jpg|png)$'    //压缩 js 与 css
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    ],
    resolve: {
        extensions: ['.js', '.json', '.sass', '.scss', '.less', 'jsx']
    },
};

