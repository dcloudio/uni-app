import fs from 'fs-extra'
import type { SFCDescriptor } from '@vue/compiler-sfc'
import { isVueSfcFile, preUVueHtml } from '@dcloudio/uni-cli-shared'
import { compile } from '../compiler'
import type {
  CodegenResult,
  TemplateCompilerOptions,
} from '../compiler/options'
import { genRenderFunctionDecl } from '../compiler/utils'
import type { TransformPluginContext } from 'rollup'
import { getDescriptor, getResolvedOptions } from '../descriptorCache'

export function genTemplate(
  { template }: SFCDescriptor,
  options: TemplateCompilerOptions & { genDefaultAs?: string }
) {
  if (!template || !template.content) {
    return {
      code:
        options.mode === 'module'
          ? genRenderFunctionDecl(options) + ` { return null }`
          : `null`,
      easyComponentAutoImports: {},
      preamble: '',
      elements: [],
      imports: [],
    } as CodegenResult
  }
  const { preprocessLang, preprocessOptions } = options
  const preprocessor = preprocessLang
    ? (require('@vue/consolidate')[preprocessLang] as PreProcessor | undefined)
    : false
  return compile(
    preprocessor
      ? preprocess(
          { source: template.content, filename: '', preprocessOptions },
          preprocessor
        )
      : template.content,
    options
  )
}

export const genTemplateCode = genTemplate

interface PreProcessor {
  render(
    source: string,
    options: any,
    cb: (err: Error | null, res: string) => void
  ): void
}

function preprocess(
  {
    source,
    filename,
    preprocessOptions,
  }: { source: string; filename: string; preprocessOptions: any },
  preprocessor: PreProcessor
): string {
  // Consolidate exposes a callback based API, but the callback is in fact
  // called synchronously for most templating engines. In our case, we have to
  // expose a synchronous API so that it is usable in Jest transforms (which
  // have to be sync because they are applied via Node.js require hooks)
  let res: string = ''
  let err: Error | null = null

  preprocessor.render(
    source,
    { filename, ...preprocessOptions },
    (_err, _res) => {
      if (_err) err = _err
      res = _res
    }
  )

  if (err) throw err
  return res
}

export async function tryResolveTemplateSrc(
  descriptor: SFCDescriptor,
  pluginContext?: TransformPluginContext
) {
  if (!pluginContext) {
    return
  }
  if (!descriptor.template) {
    return
  }
  if (descriptor.template.src) {
    const resolved = await pluginContext.resolve(
      descriptor.template.src,
      descriptor.filename
    )
    if (resolved) {
      const filename = resolved.id
      // 如果引入的vue文件，读取对应的template
      if (isVueSfcFile(filename)) {
        const srcDescriptor = getDescriptor(filename, getResolvedOptions())
        if (srcDescriptor && srcDescriptor.template?.content) {
          descriptor.template.content = srcDescriptor.template.content
        }
      } else {
        descriptor.template.content = preUVueHtml(
          fs.readFileSync(filename, 'utf-8')
        )
      }
    }
  }
}
