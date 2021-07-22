import path from 'path'

process.env.UNI_HBUILDERX_PLUGINS =
  process.env.UNI_HBUILDERX_PLUGINS ||
  path.resolve(__dirname, '../../../../../../')

export * from './env'
export { initModuleAlias } from './alias'
