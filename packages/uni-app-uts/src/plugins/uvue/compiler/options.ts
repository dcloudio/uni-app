import { BindingMetadata, CompilerError } from '@vue/compiler-core'
import { RawSourceMap } from 'source-map'
import { DirectiveTransform, NodeTransform } from './transform'

interface SharedTransformCodegenOptions {
  targetLanguage: 'kotlin' | 'swift'
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
   * Filename for source map generation.
   * Also used for self-recursive reference in templates
   * @default ''
   */
  filename?: string
}
export interface CodegenOptions extends SharedTransformCodegenOptions {
  /**
   * function
   * @default 'default'
   */
  mode?: 'default' | 'function'
  /**
   * Generate source map?
   * @default false
   */
  sourceMap?: boolean
}

export interface ErrorHandlingOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
}

export interface TransformOptions
  extends SharedTransformCodegenOptions,
    ErrorHandlingOptions {
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
}

export type CompilerOptions = TransformOptions & CodegenOptions

export interface CodegenResult {
  code: string
  map?: RawSourceMap
}
