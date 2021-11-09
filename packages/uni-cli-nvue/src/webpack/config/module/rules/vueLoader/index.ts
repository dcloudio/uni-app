import { RuleSetRule } from 'webpack'
import { makeMap } from '@vue/shared'
import type { CompilerOptions, CompiledResult } from 'vue-template-compiler'
import {
  initEasycomsOnce,
  resolveComponentsLibPath,
} from '@dcloudio/uni-cli-shared'
import { createCompilerOptions } from './compilerOptions'
import { resolveLib } from '../../../../../utils'
import { generateEasycomCode } from './easycom'
import { VueLoaderOptions } from '../../../../../../lib/vue-loader'
import { resolveLoader } from '../../../../loader'
import { NVueCompilerOptions } from '../../../../../types'
const preprocessLoader = {
  loader: resolveLoader('preprocess'),
  options: {
    type: ['js', 'html'],
  },
}

export function createVueLoader(options: NVueCompilerOptions): RuleSetRule {
  initEasycomsOnce(process.env.UNI_INPUT_DIR, {
    dirs: [resolveComponentsLibPath()],
    platform: process.env.UNI_PLATFORM,
  })
  return {
    test: [/\.nvue(\?[^?]+)?$/, /\.vue(\?[^?]+)?$/],
    use: [
      {
        loader: resolveLib('vue-loader'),
        options: {
          hotReload: false,
          compiler: createCompiler(),
          compilerOptions: createCompilerOptions(options),
        } as VueLoaderOptions,
      },
      preprocessLoader,
    ],
  }
}

const isUnaryTag = makeMap(
  'image,area,base,br,col,embed,frame,hr,img,input,isindex,keygen,' +
    'link,meta,param,source,track,wbr'
)

type CompileFunction = (
  template: string,
  options?: CompilerOptions
) => CompiledResult<string>

function compileTemplate(
  source: string,
  options: CompilerOptions,
  compile: CompileFunction
) {
  const res = compile(source, options)
  ;(res as any).components = generateEasycomCode([
    ...((options as any).isUnaryTag.autoComponents || []),
  ])
  return res
}

function createCompiler() {
  const compiler = require(resolveLib('weex-template-compiler'))
  const oldCompile = compiler.compile
  compiler.compile = function (source: string, options: CompilerOptions = {}) {
    ;(options as any).isUnaryTag = isUnaryTag
    // 将 autoComponents 挂在 isUnaryTag 上边
    ;(options as any).isUnaryTag.autoComponents = new Set()
    options.preserveWhitespace = false
    return compileTemplate(source, options, oldCompile)
  }
  return compiler
}
