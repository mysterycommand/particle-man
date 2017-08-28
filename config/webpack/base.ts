import { relative } from 'path';

import { Configuration } from 'webpack';

import * as BabelMinify from 'babel-minify-webpack-plugin';
import * as Clean from 'clean-webpack-plugin';
import * as ForkTsChecker from 'fork-ts-checker-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';
import * as Html from 'html-webpack-plugin';

import {
  cwd,
  configPath,
  sourcePath,
  buildPath,
  tsconfigPath,
  templatePath,
  entryPath,
  stylePath,
} from './paths';

const { extract } = ExtractText;

const configuration: Configuration = {
  cache: true,
  // devtool: 'source-map',
  entry: entryPath,

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
                root: cwd,
                // sourceMap: true,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                precision: 2,
                // sourceComments: true,
                // sourceMap: true,
              },
            },
          ],
        }),
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: buildPath,
    publicPath: '',
  },

  plugins: [
    new BabelMinify(),
    new Clean([relative(cwd, buildPath)], { root: cwd }),
    new ExtractText({
      filename: '[name].css',
    }),
    new ForkTsChecker({ tsconfig: tsconfigPath }),
    new Html({
      template: templatePath,
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
