import { ParserPlugin } from '@babel/parser'
import { GeneratorOptions } from '@babel/generator'
import {
  CallExpression,
  Expression,
  ObjectExpression,
  ObjectProperty,
  SpreadElement,
} from '@babel/types'
import {
  NodeTransform as VueNodeTransform,
  DirectiveTransform as VueDirectiveTransform,
} from '@vue/compiler-core'
import { MiniProgramCompilerOptions } from '@dcloudio/uni-cli-shared'
import { BindingMetadata, CompilerError, RootNode } from '@vue/compiler-core'
import IdentifierGenerator from './identifier'
import { TransformContext } from './transform'
import { VForOptions } from './transforms/vFor'

export interface CodegenRootNode extends RootNode {
  renderData: ObjectExpression | CallExpression
  bindingComponents: TransformContext['bindingComponents']
}

export interface ErrorHandlingOptions {
  onWarn?: (warning: CompilerError) => void
  onError?: (error: CompilerError) => void
}

interface ParserOptions {
  /**
   * e.g. platform native elements, e.g. `<div>` for browsers
   */
  isNativeTag?: (tag: string) => boolean
  /**
   * e.g. native elements that can self-close, e.g. `<img>`, `<br>`, `<hr>`
   */
  isVoidTag?: (tag: string) => boolean
  /**
   * Separate option for end users to extend the native elements list
   */
  isCustomElement?: (tag: string) => boolean | void
}

interface SharedTransformCodegenOptions {
  inline?: boolean
  isTS?: boolean
  root?: string
  filename?: string
  bindingMetadata?: BindingMetadata
  prefixIdentifiers?: boolean
  miniProgram?: MiniProgramCompilerOptions
}

export interface TransformOptions
  extends SharedTransformCodegenOptions,
    ErrorHandlingOptions {
  hashId?: string | null
  scopeId?: string | null
  filters?: string[]
  renderDataSpread?: boolean
  cacheHandlers?: boolean
  nodeTransforms?: VueNodeTransform[]
  directiveTransforms?: Record<string, VueDirectiveTransform | undefined>
  isBuiltInComponent?: (tag: string) => symbol | void
  isCustomElement?: (tag: string) => boolean | void
  expressionPlugins?: ParserPlugin[]
  skipTransformIdentifier?: boolean
  bindingCssVars?: string[]
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

export interface CodegenOptions extends SharedTransformCodegenOptions {
  mode?: 'module' | 'function'
  scopeId?: string | null
  sourceMap?: boolean
  runtimeModuleName?: string
  runtimeGlobalName?: string
  generatorOpts?: GeneratorOptions
}

export interface TemplateCodegenOptions
  extends Omit<MiniProgramCompilerOptions, 'filter'> {
  scopeId?: string | null
  filename: string
  isBuiltInComponent: Required<TransformOptions>['isBuiltInComponent']
  isMiniProgramComponent(
    name: string
  ): 'plugin' | 'component' | 'dynamicLib' | 'ext' | undefined
}

export type CompilerOptions = ParserOptions & TransformOptions & CodegenOptions
