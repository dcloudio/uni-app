import path from 'path'
export const templateDir = path.resolve(__dirname, '../lib/template/')
export function nvueOutDir() {
  return path.join(process.env.UNI_OUTPUT_DIR, '../.nvue')
}
