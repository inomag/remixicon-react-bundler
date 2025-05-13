// webpack.config.js (ESM)
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import nodeExternals from 'webpack-node-externals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('webpack').Configuration} */
export default {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js', // Should be .js, not .ts
    library: {
      type: 'module',
    },
    clean: true,
  },
  mode: 'production',
  experiments: {
    outputModule: true,
  },
  externals: [nodeExternals()],
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'ts-loader'],
        exclude: /node_modules/,
      },
    ],
  },
};
