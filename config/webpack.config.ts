import { Configuration } from 'webpack';
import { CheckerPlugin } from 'awesome-typescript-loader';

const config: Configuration = {
  entry: './source/main.ts',
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.ts/,
        use: 'awesome-typescript-loader',
      },
    ],
  },
  output: {
    filename: './build/main.js',
  },
  plugins: [new CheckerPlugin()],
  resolve: {
    extensions: ['ts'],
  },
};

export default config;
