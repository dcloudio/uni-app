import {
  type IfStatement,
  type ImportDeclaration,
  type Node,
  type ObjectProperty,
  type Program,
  type Statement,
  type StringLiteral,
  isBlockStatement,
  isCallExpression,
  isIdentifier,
  isIfStatement,
  isImportDeclaration,
  isMemberExpression,
  isObjectExpression,
  isObjectProperty,
  isStringLiteral,
  isUnaryExpression,
  isVariableDeclaration,
} from '@babel/types'
import { walk } from 'estree-walker'
import MagicString from 'magic-string'
import type { PluginContext } from 'rollup'
import { camelize, capitalize, hyphenate } from '@vue/shared'
import { addLeadingSlash } from '@dcloudio/uni-shared'
import { M } from '../messages'
import { BINDING_COMPONENTS, EXTNAME_VUE_RE } from '../constants'
import { isAppVue, normalizeMiniProgramFilename, removeExt } from '../utils'
import { cleanUrl, parseVueRequest } from '../vite/utils'
import { addMiniProgramUsingComponents } from '../json/mp/jsonFile'

type BindingComponents = Record<
  string,
  { tag: string; type: 'unknown' | 'setup' | 'self' }
>

const mainDescriptors = new Map<string, MainDescriptor>()
const scriptDescriptors = new Map<string, ScriptDescriptor>()
const templateDescriptors = new Map<string, TemplateDescriptor>()

interface MainDescriptor {
  imports: ImportDeclaration[]
  script: string
  template: string
}

function findImportTemplateSource(ast: Program) {
  const importDeclaration = ast.body.find(
    (node) =>
      isImportDeclaration(node) &&
      node.source.value.includes('vue&type=template')
  ) as ImportDeclaration
  if (importDeclaration) {
    return importDeclaration.source.value
  }
}

function findImportScriptSource(ast: Program) {
  const importDeclaration = ast.body.find(
    (node) =>
      isImportDeclaration(node) && node.source.value.includes('vue&type=script')
  ) as ImportDeclaration
  if (importDeclaration) {
    return importDeclaration.source.value
  }
}

async function resolveSource(
  filename: string,
  source: string | undefined,
  resolve: PluginContext['resolve']
) {
  if (!source) {
    return
  }
  const resolveId = await resolve(source, filename)
  if (resolveId) {
    return resolveId.id
  }
}

export async function parseMainDescriptor(
  filename: string,
  ast: Program,
  resolve: ParseDescriptor['resolve']
): Promise<MainDescriptor> {
  const script = await resolveSource(
    filename,
    findImportScriptSource(ast),
    resolve
  )
  const template = await resolveSource(
    filename,
    findImportTemplateSource(ast),
    resolve
  )
  const imports = await parseVueComponentImports(
    filename,
    ast.body.filter((node) => isImportDeclaration(node)) as ImportDeclaration[],
    resolve
  )
  if (!script) {
    // inline script
    await parseScriptDescriptor(filename, ast, { resolve, isExternal: false })
  }
  if (!template) {
    // inline template
    await parseTemplateDescriptor(filename, ast, { resolve, isExternal: false })
  }
  const descriptor = {
    imports,
    script: script ? parseVueRequest(script).filename : filename,
    template: template ? parseVueRequest(template).filename : filename,
  }
  mainDescriptors.set(filename, descriptor)
  return descriptor
}

export function updateMiniProgramComponentsByScriptFilename(
  scriptFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string
) {
  const mainFilename = findMainFilenameByScriptFilename(scriptFilename)
  if (mainFilename) {
    updateMiniProgramComponentsByMainFilename(
      mainFilename,
      inputDir,
      normalizeComponentName
    )
  }
}

export function updateMiniProgramComponentsByTemplateFilename(
  templateFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string
) {
  const mainFilename = findMainFilenameByTemplateFilename(templateFilename)
  if (mainFilename) {
    updateMiniProgramComponentsByMainFilename(
      mainFilename,
      inputDir,
      normalizeComponentName
    )
  }
}

function findMainFilenameByScriptFilename(scriptFilename: string) {
  const keys = [...mainDescriptors.keys()]
  return keys.find((key) => mainDescriptors.get(key)!.script === scriptFilename)
}

function findMainFilenameByTemplateFilename(templateFilename: string) {
  const keys = [...mainDescriptors.keys()]
  return keys.find(
    (key) => mainDescriptors.get(key)!.template === templateFilename
  )
}

export async function updateMiniProgramGlobalComponents(
  filename: string,
  ast: Program,
  {
    inputDir,
    resolve,
    normalizeComponentName,
  }: {
    inputDir: string
    resolve: ParseDescriptor['resolve']
    normalizeComponentName: (name: string) => string
  }
) {
  const { bindingComponents, imports } = await parseGlobalDescriptor(
    filename,
    ast,
    resolve
  )
  addMiniProgramUsingComponents(
    'app',
    createUsingComponents(
      bindingComponents,
      imports,
      inputDir,
      normalizeComponentName
    )
  )
  return {
    imports,
  }
}

function createUsingComponents(
  bindingComponents: BindingComponents,
  imports: ImportDeclaration[],
  inputDir: string,
  normalizeComponentName: (name: string) => string
) {
  const usingComponents: Record<string, string> = {}
  imports.forEach(({ source: { value }, specifiers: [specifier] }) => {
    const { name } = specifier.local
    if (!bindingComponents[name]) {
      return
    }
    const componentName = normalizeComponentName(
      hyphenate(bindingComponents[name].tag)
    )
    if (!usingComponents[componentName]) {
      usingComponents[componentName] = addLeadingSlash(
        removeExt(normalizeMiniProgramFilename(value, inputDir))
      )
    }
  })
  return usingComponents
}

export function updateMiniProgramComponentsByMainFilename(
  mainFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string
) {
  const mainDescriptor = mainDescriptors.get(mainFilename)
  if (!mainDescriptor) {
    return
  }
  const templateDescriptor = templateDescriptors.get(mainDescriptor.template)
  if (!templateDescriptor) {
    return
  }
  const scriptDescriptor = scriptDescriptors.get(mainDescriptor.script)
  if (!scriptDescriptor) {
    return
  }
  const bindingComponents = parseBindingComponents(
    {
      ...templateDescriptor.bindingComponents,
      ...scriptDescriptor.setupBindingComponents,
    },
    scriptDescriptor.bindingComponents
  )
  const imports = parseImports(
    mainDescriptor.imports,
    scriptDescriptor.imports,
    templateDescriptor.imports
  )

  addMiniProgramUsingComponents(
    removeExt(normalizeMiniProgramFilename(mainFilename, inputDir)),
    createUsingComponents(
      bindingComponents,
      imports,
      inputDir,
      normalizeComponentName
    )
  )
}

function findBindingComponent(
  tag: string,
  bindingComponents: BindingComponents
) {
  return Object.keys(bindingComponents).find((name) => {
    const componentTag = bindingComponents[name].tag
    const camelName = camelize(componentTag)
    const PascalName = capitalize(camelName)
    return tag === componentTag || tag === camelName || tag === PascalName
  })
}

function normalizeComponentId(id: string) {
  // _unref(test) => test
  if (id.includes('_unref(')) {
    return id.replace('_unref(', '').replace(')', '')
  }
  // $setup["test"] => test
  if (id.includes('$setup[')) {
    return id.replace('$setup["', '').replace('"', '')
  }
  return id
}

function parseBindingComponents(
  templateBindingComponents: BindingComponents,
  scriptBindingComponents: BindingComponents
) {
  const bindingComponents: BindingComponents = {}
  Object.keys(templateBindingComponents).forEach((id) => {
    bindingComponents[normalizeComponentId(id)] = templateBindingComponents[id]
  })
  Object.keys(scriptBindingComponents).forEach((id) => {
    const { tag } = scriptBindingComponents[id]
    const name = findBindingComponent(tag, templateBindingComponents)
    if (name) {
      bindingComponents[id] = bindingComponents[name]
    }
  })
  return bindingComponents
}

function parseImports(
  mainImports: ImportDeclaration[],
  scriptImports: ImportDeclaration[],
  templateImports: ImportDeclaration[]
) {
  const imports = [...mainImports, ...templateImports, ...scriptImports]
  return imports
}

export interface TemplateDescriptor {
  bindingComponents: BindingComponents
  imports: ImportDeclaration[]
}
/**
 * 解析 template
 * @param filename
 * @param code
 * @param ast
 * @param options
 * @returns
 */
export async function parseTemplateDescriptor(
  filename: string,
  ast: Program,
  options: ParseDescriptor
): Promise<TemplateDescriptor> {
  // 外置时查找所有 vue component import
  const imports = options.isExternal
    ? await parseVueComponentImports(
        filename,
        ast.body.filter((node) =>
          isImportDeclaration(node)
        ) as ImportDeclaration[],
        options.resolve
      )
    : []
  const descriptor = {
    bindingComponents: findBindingComponents(ast.body),
    imports,
  }
  templateDescriptors.set(filename, descriptor)
  return descriptor
}

interface ParseDescriptor {
  resolve: PluginContext['resolve']
  isExternal: boolean
}
export interface ScriptDescriptor extends TemplateDescriptor {
  setupBindingComponents: BindingComponents
}

async function parseGlobalDescriptor(
  filename: string,
  ast: Program,
  resolve: PluginContext['resolve']
) {
  // 外置时查找所有 vue component import
  const imports = (
    await parseVueComponentImports(
      filename,
      ast.body.filter((node) =>
        isImportDeclaration(node)
      ) as ImportDeclaration[],
      resolve
    )
  ).filter((item) => !isAppVue(cleanUrl(item.source.value)))
  return {
    bindingComponents: parseGlobalComponents(ast),
    imports,
  }
}
/**
 * 解析 script
 * @param filename
 * @param code
 * @param ast
 * @param options
 * @returns
 */
export async function parseScriptDescriptor(
  filename: string,
  ast: Program,
  options: ParseDescriptor
): Promise<ScriptDescriptor> {
  // 外置时查找所有 vue component import
  const imports = options.isExternal
    ? await parseVueComponentImports(
        filename,
        ast.body.filter((node) =>
          isImportDeclaration(node)
        ) as ImportDeclaration[],
        options.resolve
      )
    : []
  const descriptor: ScriptDescriptor = {
    bindingComponents: parseComponents(ast),
    setupBindingComponents: findBindingComponents(ast.body),
    imports,
  }

  scriptDescriptors.set(filename, descriptor)
  return descriptor
}

/**
 * 解析编译器生成的 bindingComponents
 * @param ast
 * @returns
 */
function findBindingComponents(ast: Statement[]): BindingComponents {
  const mapping = findUnpluginComponents(ast)
  for (const node of ast) {
    if (!isVariableDeclaration(node)) {
      continue
    }
    const declarator = node.declarations[0]
    if (
      isIdentifier(declarator.id) &&
      declarator.id.name === BINDING_COMPONENTS
    ) {
      const bindingComponents = JSON.parse(
        (declarator.init as StringLiteral).value
      ) as Record<string, { name: string; type: 'unknown' | 'setup' | 'self' }>
      return Object.keys(bindingComponents).reduce<BindingComponents>(
        (bindings, tag) => {
          const { name, type } = bindingComponents[tag]
          bindings[mapping[name] || name] = {
            tag,
            type: type,
          }
          return bindings
        },
        {}
      )
    }
  }
  return {}
}
/**
 * 兼容：unplugin_components
 * https://github.com/dcloudio/uni-app/issues/3057
 * @param ast
 * @returns
 */
function findUnpluginComponents(ast: Statement[]): Record<string, string> {
  const res = Object.create(null)
  // if(!Array){}
  const ifStatement = ast.find(
    (statement) =>
      isIfStatement(statement) &&
      isUnaryExpression(statement.test) &&
      statement.test.operator === '!' &&
      isIdentifier(statement.test.argument) &&
      statement.test.argument.name === 'Array'
  ) as IfStatement
  if (!ifStatement) {
    return res
  }
  if (!isBlockStatement(ifStatement.consequent)) {
    return res
  }
  for (const node of ifStatement.consequent.body) {
    if (!isVariableDeclaration(node)) {
      continue
    }
    const { id, init } = node.declarations[0]
    if (
      isIdentifier(id) &&
      isIdentifier(init) &&
      init.name.includes('unplugin_components')
    ) {
      res[id.name] = init.name
    }
  }
  return res
}

/**
 * 查找全局组件定义：app.component('component-a',{})
 * @param ast
 * @returns
 */
function parseGlobalComponents(ast: Program) {
  const bindingComponents: BindingComponents = {}
  ;(walk as any)(ast, {
    enter(child: Node) {
      if (!isCallExpression(child)) {
        return
      }
      const { callee } = child
      // .component
      if (
        !isMemberExpression(callee) ||
        !isIdentifier(callee.property) ||
        callee.property.name !== 'component'
      ) {
        return
      }
      // .component('component-a',{})
      const args = child.arguments
      if (args.length !== 2) {
        return
      }
      const [name, value] = args
      if (!isStringLiteral(name)) {
        return console.warn(
          M['mp.component.args[0]'].replace('{0}', 'app.component')
        )
      }
      if (!isIdentifier(value)) {
        return console.warn(
          M['mp.component.args[1]'].replace('{0}', 'app.component')
        )
      }
      bindingComponents[value.name] = {
        tag: name.value,
        type: 'unknown',
      }
    },
  })
  return bindingComponents
}
/**
 * 从 components 中查找定义的组件
 * @param ast
 * @param bindingComponents
 */
function parseComponents(ast: Program) {
  const bindingComponents: BindingComponents = {}
  ;(walk as any)(ast, {
    enter(child: Node) {
      if (!isObjectExpression(child)) {
        return
      }
      const componentsProp = child.properties.find(
        (prop) =>
          isObjectProperty(prop) &&
          isIdentifier(prop.key) &&
          prop.key.name === 'components'
      ) as ObjectProperty
      if (!componentsProp) {
        return
      }
      const componentsExpr = componentsProp.value
      if (!isObjectExpression(componentsExpr)) {
        return
      }
      componentsExpr.properties.forEach((prop) => {
        if (!isObjectProperty(prop)) {
          return
        }
        if (!isIdentifier(prop.key) && !isStringLiteral(prop.key)) {
          return
        }
        if (!isIdentifier(prop.value)) {
          return
        }
        bindingComponents[prop.value.name] = {
          tag: isIdentifier(prop.key) ? prop.key.name : prop.key.value,
          type: 'unknown',
        }
      })
    },
  })
  return bindingComponents
}
/**
 * vue component imports
 * @param filename
 * @param imports
 * @param resolve
 * @returns
 */
async function parseVueComponentImports(
  importer: string,
  imports: ImportDeclaration[],
  resolve: PluginContext['resolve']
) {
  const vueComponentImports: ImportDeclaration[] = []
  for (let i = 0; i < imports.length; i++) {
    const { source } = imports[i]
    if (parseVueRequest(source.value).query.vue) {
      continue
    }
    const resolveId = await resolve(source.value, importer)
    if (!resolveId) {
      continue
    }
    const { filename } = parseVueRequest(resolveId.id)
    if (EXTNAME_VUE_RE.test(filename)) {
      source.value = resolveId.id
      vueComponentImports.push(imports[i])
    }
  }
  return vueComponentImports
}
/**
 * static import => dynamic import
 * @param code
 * @param imports
 * @param dynamicImport
 * @returns
 */
export async function transformDynamicImports(
  code: string,
  imports: ImportDeclaration[],
  {
    id,
    sourceMap,
    dynamicImport,
  }: {
    id?: string
    sourceMap?: boolean
    dynamicImport: (name: string, source: string) => string
  }
) {
  if (!imports.length) {
    return {
      code,
      map: null,
    }
  }
  const s = new MagicString(code)
  for (let i = 0; i < imports.length; i++) {
    const {
      start,
      end,
      specifiers: [specifier],
      source,
    } = imports[i]
    s.overwrite(
      start!,
      end!,
      dynamicImport(specifier.local.name, source.value) + ';'
    )
  }
  return {
    code: s.toString(),
    map: null,
  }
}
