import { relative, resolve } from 'path';

import { Configuration } from 'webpack';

import * as BabelMinify from 'babel-minify-webpack-plugin';
import * as Clean from 'clean-webpack-plugin';
import * as ForkTsChecker from 'fork-ts-checker-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';
import * as Html from 'html-webpack-plugin';

const root = process.cwd();

const config = resolve(root, 'config');
const source = resolve(root, 'source');
const build = resolve(root, 'build');

const tsconfig = resolve(config, 'tsconfig.json');
const template = resolve(source, 'index.ejs');
const entry = resolve(source, 'main.ts');
const style = resolve(source, 'main.scss');

const { extract } = ExtractText;

export const PROD = 'production';
export const DEV = 'development';

process.env.NODE_ENV || (process.env.NODE_ENV = PROD);
const configuration: Configuration = {
  cache: true,
  devtool: process.env.NODE_ENV === PROD ? false : 'eval-source-map',
  devServer:
    process.env.NODE_ENV === PROD
      ? {}
      : {
          contentBase: '.',
          stats: {
            colors: true,
          },
        },
  entry,

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
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                root,
                sourceMap: process.env.NODE_ENV === DEV,
              },
            },
            {
              loader: 'sass-loader',
              options: {
                outputStyle: 'compressed',
                precision: 2,
                sourceMap: process.env.NODE_ENV === DEV,
              },
            },
          ],
        }),
      },
    ],
  },

  output: {
    filename: '[name].js',
    path: build,
    publicPath: '.',
  },

  plugins: [
    new Clean([relative(root, build)], { root }),
    new ExtractText({
      filename: '[name].css',
    }),
  ].concat(
    process.env.NODE_ENV === PROD
      ? [
          new BabelMinify(),
          new Html({
            template,
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
        ]
      : [new ForkTsChecker({ tsconfig })],
  ),

  resolve: {
    extensions: ['.ts', '.js'],
  },
};

export default configuration;
