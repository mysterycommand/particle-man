import { resolve } from 'path';

import { Configuration } from 'webpack';
import * as ForkTsChecker from 'fork-ts-checker-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';
import * as Html from 'html-webpack-plugin';

const { description } = require('../package');
const tsconfig = resolve(__dirname, 'tsconfig.json');

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
          configFile: tsconfig,
          transpileOnly: true,
        },
      },
    ],
  },

  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '../build'),
    publicPath: '',
  },

  plugins: [
    new ForkTsChecker({ tsconfig }),
    new ExtractText('main.css'),
    new Html({ template: 'source/index.ejs' }),
  ],
  resolve: {
    extensions: ['ts'],
  },
};

export default configuration;
