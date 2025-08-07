const path = require('path')
const { defineReactCompilerLoaderOption, reactCompilerLoader } = require('react-compiler-webpack')

module.exports = {
  entry: {
    bundle: './src/index.tsx',
    // panel_options: './src/panel_options.js',
    // otros puntos de entrada si los tienes
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[contenthash].chunk.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'),
    },
    port: 4000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  watchOptions: {
    ignored: /node_modules/,
    poll: 500,
  },

  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset/resource',
      },
      {
        test: /\.[mc]?[jt]sx?$/i,
        exclude: /node_modules/,
        use: [
          "babel-loader",
          {
            loader: reactCompilerLoader,
            options: defineReactCompilerLoaderOption({})
          }
        ]
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, 'src'),
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
    ],
  },
}


