import { SFCDescriptor } from '@vue/compiler-sfc'
import consolidate from '@vue/consolidate'
import { compile } from '../compiler'
import { TemplateCompilerOptions } from '../compiler/options'
import { genRenderFunctionDecl } from '../compiler/utils'

export function genTemplate(
  { template }: SFCDescriptor,
  options: TemplateCompilerOptions
) {
  if (!template || !template.content) {
    return {
      code:
        options.mode === 'module'
          ? genRenderFunctionDecl(options) + ` { return null }`
          : `null`,
      easyComponentAutoImports: {},
      importEasyComponents: [],
      importUTSComponents: [],
      elements: [],
      imports: [],
    }
  }
  const { preprocessLang, preprocessOptions } = options
  const preprocessor = preprocessLang
    ? (consolidate[preprocessLang as keyof typeof consolidate] as
        | PreProcessor
        | undefined)
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
