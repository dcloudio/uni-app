import type {
  BindingMetadata,
  CompilerError,
  RootNode,
} from '@vue/compiler-core'
import type { TransformPluginContext } from 'rollup'
import type { RawSourceMap } from 'source-map-js'
import type { DirectiveTransform, NodeTransform } from './transform'

interface SharedTransformCodegenOptions {
  /**
   * @default 'default'
   */
  mode?: 'default' | 'module'
  rootDir?: string
  targetLanguage?: 'kotlin' | 'swift'
  /**
   * Transform expressions like {{ foo }} to `_ctx.foo`.
   * @default false
   */
  prefixIdentifiers?: boolean
  /**
   * Optional binding metadata analyzed from script - used to optimize
   * binding access when `prefixIdentifiers` is enabled.
   */
  bindingMetadata?: BindingMetadata
  /**
   * Compile the function for inlining inside setup().
   * This allows the function to directly access setup() local bindings.
   */
  inline?: boolean
  /**
   * Filename for source map generation.
   * Also used for self-recursive reference in templates
   * @default ''
   */
  filename?: string
  /**
   * 编译的模板类名
   */
  className?: string
  /**
   * 解析 uts component 组件
   * @param name
   * @param type
   */
  parseUTSComponent?: (
    name: string,
    type: 'kotlin' | 'swift'
  ) =>
    | {
        className: string
        namespace: string
        source: string
      }
    | undefined
    | void
}
export interface CodegenOptions extends SharedTransformCodegenOptions {
  inMap?: RawSourceMap
  /**
   * Generate source map?
   * @default false
   */
  sourceMap?: boolean
  /**
   * 匹配 easycom 组件
   * @param tag
   */
  matchEasyCom?: (
    tag: string,
    uts: boolean
  ) => string | false | undefined | void
  /**
   * template的offset
   */
  originalLineOffset?: number
  /**
   * script的offset
   */
  generatedLineOffset?: number
}

export interface ErrorHandlingOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
}

export interface TransformOptions
  extends SharedTransformCodegenOptions,
    ErrorHandlingOptions {
  rootDir?: string
  /**
   * Cache v-on handlers to avoid creating new inline functions on each render,
   * also avoids the need for dynamically patching the handlers by wrapping it.
   * e.g `@click="foo"` by default is compiled to `{ onClick: foo }`. With this
   * option it's compiled to:
   * ```js
   * { onClick: _cache[0] || (_cache[0] = e => _ctx.foo(e)) }
   * ```
   * - Requires "prefixIdentifiers" to be enabled because it relies on scope
   * analysis to determine if a handler is safe to cache.
   * @default false
   */
  cacheHandlers?: boolean
  /**
   * An array of node transforms to be applied to every AST node.
   */
  nodeTransforms?: NodeTransform[]
  /**
   * An object of { name: transform } to be applied to every directive attribute
   * node found on element nodes.
   */
  directiveTransforms?: Record<string, DirectiveTransform | undefined>
  /**
   * If the pairing runtime provides additional built-in elements, use this to
   * mark them as built-in so the compiler will generate component vnodes
   * for them.
   */
  isBuiltInComponent?: (tag: string) => symbol | void
  /**
   * Used by some transforms that expects only native elements
   */
  isCustomElement?: (tag: string) => boolean | void
  /**
   * SFC scoped styles ID
   */
  scopeId?: string | null
  /**
   * Indicates this SFC template has used :slotted in its styles
   * Defaults to `true` for backwards compatibility - SFC tooling should set it
   * to `false` if no `:slotted` usage is detected in `<style>`
   */
  slotted?: boolean
}

export type TemplateCompilerOptions = {
  /**
   * e.g. platform native elements, e.g. `<div>` for browsers
   */
  isNativeTag?: (tag: string) => boolean

  preprocessLang?: string
  preprocessOptions?: any
  pluginContext?: TransformPluginContext
} & TransformOptions &
  CodegenOptions

export interface CodegenResult {
  ast?: RootNode
  code: string
  preamble?: string
  easyComponentAutoImports: Record<string, [string, string]>
  elements: string[]
  map?: RawSourceMap
}
