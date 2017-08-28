import { resolve } from 'path';

import { Configuration } from 'webpack';

import * as ForkTsChecker from 'fork-ts-checker-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';
import * as Html from 'html-webpack-plugin';

const { extract } = ExtractText;
const tsconfigPath = resolve(__dirname, 'tsconfig.json');

const configuration: Configuration = {
  cache: true,
  devtool: 'inline-source-map',
  entry: './source/main.ts',

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: tsconfigPath,
          transpileOnly: true,
        },
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root: '.',
                sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'expanded',
                precision: 9,
                sourceComments: true,
                sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '../build'),
    publicPath: '',
  },

  plugins: [
    new ForkTsChecker({ tsconfig: tsconfigPath }),
    new ExtractText('main.css'),
    new Html({
      template: 'source/index.ejs',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        conservativeCollapse: true,
        removeTagWhitespace: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        quoteCharacter: '"',
      },
    }),
  ],

  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default configuration;
