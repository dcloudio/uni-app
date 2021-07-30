import { Configuration } from 'webpack'

export function createOutput(): Configuration['output'] {
  return {
    path: process.env.UNI_OUTPUT_DIR,
    filename: '[name].js',
  }
}
