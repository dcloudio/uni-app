import { Configuration } from 'webpack'

export const output: Configuration['output'] = {
  path: process.env.UNI_OUTPUT_DIR,
  filename: '[name].js',
}
