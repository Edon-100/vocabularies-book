const path = require('path')
const outputPath = path.join(__dirname, 'dist')
const CopyWebpackPlugin = require('copy-webpack-plugin')

module.exports = {
  target: 'web',
  mode: 'development',
  entry: {
    index: './src/index.tsx',
  },
  output: {
    filename: '[name].js',
    path: outputPath
  },
  plugins: [
    // new CopyWebpackPlugin({ patterns: [{ from: 'utools', to: outputPath }] }),
    new CopyWebpackPlugin({ patterns: [{ from: 'public', to: outputPath }] })
  ],
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
