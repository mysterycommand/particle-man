import { resolve, relative } from 'path';

import { Configuration } from 'webpack';

import * as BabelMinify from 'babel-minify-webpack-plugin';
import * as Clean from 'clean-webpack-plugin';
import * as ForkTsChecker from 'fork-ts-checker-webpack-plugin';
import * as ExtractText from 'extract-text-webpack-plugin';
import * as Html from 'html-webpack-plugin';

const { extract } = ExtractText;

const rootPath = resolve(__dirname, '../');

const configPath = resolve(rootPath, 'config');
const sourcePath = resolve(rootPath, 'source');
const buildPath = resolve(rootPath, 'build');

const tsconfigPath = resolve(configPath, 'tsconfig.json');
const templatePath = resolve(sourcePath, 'index.ejs');
const entryPath = resolve(sourcePath, 'main.ts');
const stylePath = resolve(sourcePath, 'main.scss');

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
                root: rootPath,
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
    new Clean([relative(rootPath, buildPath)], { root: rootPath }),
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
