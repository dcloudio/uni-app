import path from 'path'
import { extend, isFunction } from '@vue/shared'
import type { RPT2Options } from 'rollup-plugin-typescript2'
import { isInHBuilderX } from '../../shared'
interface UTS2JavaScriptOptions extends Omit<RPT2Options, 'transformers'> {
  inputDir: string
  version: string
}
type uts2js = (options: UTS2JavaScriptOptions) => import('rollup').Plugin[]

export const uts2js: uts2js = (options) => {
  // TODO 目前开发阶段禁用缓存，禁用check
  extend(options, { clean: true, check: false })
  // @ts-expect-error
  if (isFunction(globalThis.uts2js)) {
    // @ts-expect-error
    return globalThis.uts2js(options)
  }
  if (!options.tsconfig) {
    options.tsconfig = path.resolve(
      __dirname,
      '../../../lib/tsconfig/tsconfig.json'
    )
  }
  if (!options.typescript) {
    options.typescript = require('../../../lib/typescript')
  }
  if (isInHBuilderX()) {
    options.tsconfigOverride = {
      compilerOptions: {
        typeRoots: [
          options.inputDir,
          path.resolve(
            process.env.UNI_HBUILDERX_PLUGINS,
            'uniapp-cli-vite',
            'node_modules'
          ),
        ],
      },
    }
  }
  return require('../../../lib/javascript').uts2js(options)
}
