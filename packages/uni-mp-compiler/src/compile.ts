import fs from 'fs'
import { baseParse } from '@vue/compiler-core'
import { isString, extend } from '@vue/shared'
import { hash, parseFilterNames } from '@dcloudio/uni-cli-shared'
import { generate } from './codegen'
import { CompilerOptions } from './options'
import {
  DirectiveTransform,
  NodeTransform,
  transform,
  TransformContext,
} from './transform'
import { transformExpression } from './transforms/transformExpression'
import { transformIdentifier } from './transforms/transformIdentifier'
import { transformIf } from './transforms/vIf'
import { transformFor } from './transforms/vFor'
import { generate as genTemplate } from './template/codegen'
import { transformOn } from './transforms/vOn'
import { transformElement } from './transforms/transformElement'
import { transformBind } from './transforms/vBind'
import { transformComponent } from './transforms/transformComponent'
import {
  ArrowFunctionExpression,
  BlockStatement,
  CallExpression,
  callExpression,
  ConditionalExpression,
  identifier,
  isCallExpression,
  isConditionalExpression,
  isIdentifier,
  isObjectExpression,
  isObjectProperty,
  isSpreadElement,
  objectExpression,
  ObjectExpression,
  ObjectProperty,
  ReturnStatement,
  SpreadElement,
} from '@babel/types'
import { createObjectExpression } from './ast'
import { EXTEND } from './runtimeHelpers'

export type TransformPreset = [
  NodeTransform[],
  Record<string, DirectiveTransform>
]

export function getBaseTransformPreset({
  prefixIdentifiers,
  skipTransformIdentifier,
}: {
  prefixIdentifiers: boolean
  skipTransformIdentifier: boolean
}): TransformPreset {
  const nodeTransforms = [transformIf, transformFor]
  if (!skipTransformIdentifier) {
    nodeTransforms.push(transformIdentifier)
  }
  nodeTransforms.push(transformElement)
  nodeTransforms.push(transformComponent)
  if (prefixIdentifiers) {
    nodeTransforms.push(transformExpression)
  }
  return [nodeTransforms, { on: transformOn, bind: transformBind }]
}

export function baseCompile(template: string, options: CompilerOptions = {}) {
  const prefixIdentifiers =
    options.prefixIdentifiers === true || options.mode === 'module'
  const ast = isString(template) ? baseParse(template, options) : template
  const [nodeTransforms, directiveTransforms] = getBaseTransformPreset({
    prefixIdentifiers,
    skipTransformIdentifier: options.skipTransformIdentifier === true,
  })

  options.hashId = genHashId(options)

  if (options.filename) {
    if (!options.filters && options.miniProgram?.filter) {
      options.filters = parseFilters(
        options.miniProgram.filter.lang,
        options.filename
      )
    }
  }

  const context = transform(
    ast,
    extend({}, options, {
      prefixIdentifiers,
      nodeTransforms: [...nodeTransforms, ...(options.nodeTransforms || [])],
      directiveTransforms: extend(
        {},
        directiveTransforms,
        options.directiveTransforms || {}
      ),
    })
  )
  const result = extend(
    generate(
      extend(ast, {
        renderData: createRenderDataExpr(context.scope.properties, context),
        bindingComponents: context.bindingComponents,
      }),
      options
    ),
    { ast }
  )
  if (options.filename && options.miniProgram?.emitFile) {
    genTemplate(ast, {
      scopeId: options.scopeId,
      filename: options.filename,
      directive: options.miniProgram.directive,
      emitFile: options.miniProgram.emitFile,
      slot: options.miniProgram.slot,
    })
  }

  return result
}

function genHashId(options: CompilerOptions) {
  if (options.hashId) {
    return options.hashId
  }
  if (options.scopeId) {
    return options.scopeId.replace('data-v-', '')
  }
  if (options.filename) {
    return hash(options.filename)
  }
  return ''
}

function parseFilters(lang: string, filename: string) {
  filename = filename.split('?')[0]
  if (fs.existsSync(filename)) {
    return parseFilterNames(lang as any, fs.readFileSync(filename, 'utf8'))
  }
  return []
}

function createRenderDataExpr(
  properties: (ObjectProperty | SpreadElement)[],
  context: TransformContext
) {
  const objExpr = createObjectExpression(properties)
  if (context.renderDataSpread || !hasSpreadElement(objExpr)) {
    return objExpr
  }
  return transformObjectSpreadExpr(objExpr, context)
}

function hasSpreadElement(expr: ObjectExpression): boolean {
  return expr.properties.some((prop) => {
    if (isSpreadElement(prop)) {
      return true
    } else {
      const objExpr = parseReturnObjExpr(prop as ObjectProperty)
      if (objExpr) {
        return hasSpreadElement(objExpr)
      }
    }
  })
}

function parseReturnObjExpr(prop: ObjectProperty) {
  if (
    isObjectProperty(prop) &&
    isCallExpression(prop.value) &&
    isIdentifier(prop.value.callee) &&
    prop.value.callee.name === '_vFor'
  ) {
    // 目前硬编码
    return (
      (
        (prop.value.arguments[1] as ArrowFunctionExpression)
          .body as BlockStatement
      ).body[0] as ReturnStatement
    ).argument as ObjectExpression
  }
}

function transformObjectPropertyExpr(
  prop: ObjectProperty,
  context: TransformContext
) {
  // vFor
  const objExpr = parseReturnObjExpr(prop)
  if (objExpr) {
    if (hasSpreadElement(objExpr)) {
      ;(
        (
          (
            (prop.value as CallExpression)
              .arguments[1] as ArrowFunctionExpression
          ).body as BlockStatement
        ).body[0] as ReturnStatement
      ).argument = transformObjectSpreadExpr(objExpr, context)
    }
  }
  return prop
}

function transformObjectSpreadExpr(
  objExpr: ObjectExpression,
  context: TransformContext
) {
  const properties = objExpr.properties as (ObjectProperty | SpreadElement)[]
  const args: (ObjectExpression | ConditionalExpression)[] = []
  let objExprProperties: ObjectProperty[] = []
  properties.forEach((prop) => {
    if (isObjectProperty(prop)) {
      objExprProperties.push(transformObjectPropertyExpr(prop, context))
    } else {
      if (objExprProperties.length) {
        args.push(objectExpression(objExprProperties))
      }
      args.push(
        transformConditionalExpression(
          prop.argument as ConditionalExpression,
          context
        )
      )
      objExprProperties = []
    }
  })
  if (objExprProperties.length) {
    args.push(objectExpression(objExprProperties))
  }
  if (args.length === 1) {
    return args[0] as ObjectExpression
  }
  return callExpression(identifier(context.helperString(EXTEND)), args)
}
function transformConditionalExpression(
  expr: ConditionalExpression,
  context: TransformContext
) {
  const { consequent, alternate } = expr
  if (isObjectExpression(consequent) && hasSpreadElement(consequent)) {
    expr.consequent = transformObjectSpreadExpr(consequent, context)
  }
  if (isObjectExpression(alternate)) {
    if (hasSpreadElement(alternate)) {
      expr.alternate = transformObjectSpreadExpr(alternate, context)
    }
  } else if (isConditionalExpression(alternate)) {
    transformConditionalExpression(alternate, context)
  }
  return expr
}
