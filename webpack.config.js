const path = require('path')
const outputPath = path.join(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const plugins = [
  new CopyWebpackPlugin({ patterns: [{ from: 'public', to: outputPath }] })
]
if (process.env.NODE_ENV = 'development') {
  // plugins.push(new CopyWebpackPlugin({ patterns: [{ from: 'utools', to: outputPath }] }),)
}

console.log(111,process.env.NODE_FFFF)
module.exports = {
  target: 'web',
  mode: process.env.NODE_FFFF,
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: outputPath
  },
  plugins,
  performance: {
    hints: false
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    alias: {
      src: path.resolve(__dirname, './src')
    }
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|png|jpg|gif|wav|mp3)$/i,
        use: [
          {
            loader: 'url-loader',
          },
        ],
      },      
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(less|css)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: { url: false }
          },
          {
            loader: 'less-loader'
          }
        ]
      }
    ]
  }
}
