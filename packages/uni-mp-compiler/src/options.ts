import { ParserPlugin } from '@babel/parser'
import { Expression, ObjectProperty, SpreadElement } from '@babel/types'
import { BindingMetadata, CompilerError } from '@vue/compiler-core'
import IdentifierGenerator from './identifier'
import { DirectiveTransform, NodeTransform } from './transform'
import { VForOptions } from './transforms/vFor'

export interface ErrorHandlingOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
}

interface SharedTransformCodegenOptions {
  inline?: boolean
  isTS?: boolean
  filename?: string
  bindingMetadata?: BindingMetadata
  prefixIdentifiers?: boolean
}

export interface TransformOptions
  extends SharedTransformCodegenOptions,
    ErrorHandlingOptions {
  cacheHandlers?: boolean
  nodeTransforms?: NodeTransform[]
  directiveTransforms?: Record<string, DirectiveTransform | undefined>
  isBuiltInComponent?: (tag: string) => symbol | void
  isCustomElement?: (tag: string) => boolean | void
  expressionPlugins?: ParserPlugin[]
  skipTransformIdentifier?: boolean
}

export interface CodegenRootScope {
  id: IdentifierGenerator
  identifiers: string[]
  properties: (ObjectProperty | SpreadElement)[]
  parent: CodegenScope | null
}
export interface CodegenVIfScopeInit {
  name: 'if' | 'else-if' | 'else' | string
  condition?: Expression
}
export type CodegenVForScopeInit = VForOptions & { locals: string[] }
export interface CodegenVIfScope extends CodegenRootScope, CodegenVIfScopeInit {
  parentScope: CodegenRootScope | CodegenVForScope
}
export interface CodegenVForScope
  extends CodegenRootScope,
    CodegenVForScopeInit {}

export type CodegenScope = CodegenRootScope | CodegenVIfScope | CodegenVForScope

interface EmittedFile {
  fileName?: string
  name?: string
  source?: string | Uint8Array
  type: 'asset'
}

export interface CodegenOptions extends SharedTransformCodegenOptions {
  mode?: 'module' | 'function'
  scopeId?: string | null
  runtimeModuleName?: string
  runtimeGlobalName?: string
  miniProgram?: {
    emitFile?: (emittedFile: EmittedFile) => string
  }
}

export interface TemplateCodegenOptions {
  filename: string
  emitFile: (emittedFile: EmittedFile) => string
}

export type CompilerOptions = TransformOptions & CodegenOptions
