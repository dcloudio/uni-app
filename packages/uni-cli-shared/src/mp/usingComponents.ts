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
import {
  addMiniProgramComponentPackageRoot,
  addMiniProgramUsingComponents,
  findMiniProgramSubPackageRoot,
  resolveMiniProgramComponentPackageRoot,
} from '../json/mp/jsonFile'
import {
  parseIndependentRoot,
  withIndependentRoot,
  withoutIndependentRoot,
} from '../json/mp/subpackage'

type BindingComponents = Record<
  string,
  { tag: string; type: 'unknown' | 'setup' | 'self' }
>

const mainDescriptors = new Map<string, MainDescriptor>()
const scriptDescriptors = new Map<string, ScriptDescriptor>()
const templateDescriptors = new Map<string, TemplateDescriptor>()
const scriptDescriptorMainMap = new Map<string, string>()
const templateDescriptorMainMap = new Map<string, string>()
// 存储全局组件名到完整源文件路径的映射
const globalComponentSourceMap = new Map<string, string>()

export function getGlobalComponentSource(componentName: string) {
  return globalComponentSourceMap.get(componentName)
}

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
  resolve: PluginContext['resolve'],
  root?: string
) {
  if (!source) {
    return
  }
  const resolveId = await resolve(
    source,
    root ? withIndependentRoot(filename, root) : filename
  )
  if (resolveId) {
    return resolveId.id
  }
}

export async function parseMainDescriptor(
  filename: string,
  ast: Program,
  resolve: ParseDescriptor['resolve'],
  root?: string
): Promise<MainDescriptor> {
  const script = await resolveSource(
    filename,
    findImportScriptSource(ast),
    resolve,
    root
  )
  const template = await resolveSource(
    filename,
    findImportTemplateSource(ast),
    resolve,
    root
  )
  const imports = await parseVueComponentImports(
    root ? withIndependentRoot(filename, root) : filename,
    ast.body.filter((node) => isImportDeclaration(node)) as ImportDeclaration[],
    resolve
  )
  if (!script) {
    // inline script
    await parseScriptDescriptor(filename, ast, {
      resolve,
      isExternal: false,
      root,
    })
  }
  if (!template) {
    // inline template
    await parseTemplateDescriptor(filename, ast, {
      resolve,
      isExternal: false,
      root,
    })
  }
  const descriptor = {
    imports,
    script: script
      ? createDescriptorKey(
          parseVueRequest(script).filename,
          parseIndependentRoot(script) || root
        )
      : createDescriptorKey(filename, root),
    template: template
      ? createDescriptorKey(
          parseVueRequest(template).filename,
          parseIndependentRoot(template) || root
        )
      : createDescriptorKey(filename, root),
  }
  const mainDescriptorKey = createDescriptorKey(filename, root)
  updateMainDescriptorIndex(mainDescriptorKey, descriptor)
  return descriptor
}

function updateMainDescriptorIndex(
  mainDescriptorKey: string,
  descriptor: MainDescriptor
) {
  const oldDescriptor = mainDescriptors.get(mainDescriptorKey)
  if (oldDescriptor && oldDescriptor.script !== descriptor.script) {
    scriptDescriptorMainMap.delete(oldDescriptor.script)
  }
  if (oldDescriptor && oldDescriptor.template !== descriptor.template) {
    templateDescriptorMainMap.delete(oldDescriptor.template)
  }
  mainDescriptors.set(mainDescriptorKey, descriptor)
  scriptDescriptorMainMap.set(descriptor.script, mainDescriptorKey)
  templateDescriptorMainMap.set(descriptor.template, mainDescriptorKey)
}

export function updateMiniProgramComponentsByScriptFilename(
  scriptFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string,
  root?: string,
  packageRoot?: string
) {
  const mainFilename = findMainFilenameByScriptFilename(
    createDescriptorKey(scriptFilename, root)
  )
  if (mainFilename) {
    updateMiniProgramComponentsByMainFilename(
      mainFilename,
      inputDir,
      normalizeComponentName,
      root,
      packageRoot
    )
  }
}

export function updateMiniProgramComponentsByTemplateFilename(
  templateFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string,
  root?: string,
  packageRoot?: string
) {
  const mainFilename = findMainFilenameByTemplateFilename(
    createDescriptorKey(templateFilename, root)
  )
  if (mainFilename) {
    updateMiniProgramComponentsByMainFilename(
      mainFilename,
      inputDir,
      normalizeComponentName,
      root,
      packageRoot
    )
  }
}

function findMainFilenameByScriptFilename(scriptFilename: string) {
  return scriptDescriptorMainMap.get(scriptFilename)
}

function findMainFilenameByTemplateFilename(templateFilename: string) {
  return templateDescriptorMainMap.get(templateFilename)
}

export async function updateMiniProgramGlobalComponents(
  filename: string,
  ast: Program,
  {
    inputDir,
    resolve,
    normalizeComponentName,
    root,
  }: {
    inputDir: string
    resolve: ParseDescriptor['resolve']
    normalizeComponentName: (name: string) => string
    root?: string
  }
) {
  const { bindingComponents, imports } = await parseGlobalDescriptor(
    filename,
    ast,
    resolve,
    root
  )
  // 存储全局组件名到完整源文件路径的映射
  imports.forEach(({ source: { value }, specifiers: [specifier] }) => {
    const { name } = specifier.local
    if (!bindingComponents[name]) {
      return
    }
    if (!globalComponentSourceMap.has(bindingComponents[name].tag)) {
      globalComponentSourceMap.set(
        bindingComponents[name].tag,
        withoutIndependentRoot(value)
      )
    }
  })
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
  normalizeComponentName: (name: string) => string,
  ownerFilename?: string,
  ownerPackageRoot?: string
) {
  const usingComponents: Record<string, string> = {}
  const ownerSubPackageRoot =
    ownerPackageRoot ||
    (ownerFilename && findMiniProgramSubPackageRoot(ownerFilename))
  imports.forEach(({ source: { value }, specifiers: [specifier] }) => {
    const { name } = specifier.local
    if (!bindingComponents[name]) {
      return
    }
    const componentName = normalizeComponentName(
      hyphenate(bindingComponents[name].tag)
    )
    if (!usingComponents[componentName]) {
      let componentFilename = removeExt(
        normalizeMiniProgramFilename(withoutIndependentRoot(value), inputDir)
      )
      if (componentFilename.startsWith('uni_modules/')) {
        addMiniProgramComponentPackageRoot(
          componentFilename,
          ownerSubPackageRoot
        )
        const componentPackageRoot = resolveMiniProgramComponentPackageRoot(
          componentFilename,
          ownerSubPackageRoot
        )
        if (
          ownerSubPackageRoot &&
          componentPackageRoot === ownerSubPackageRoot
        ) {
          componentFilename = `${ownerSubPackageRoot}/${componentFilename}`
        }
      }
      usingComponents[componentName] = addLeadingSlash(componentFilename)
    }
  })
  return usingComponents
}

export function updateMiniProgramComponentsByMainFilename(
  mainFilename: string,
  inputDir: string,
  normalizeComponentName: (name: string) => string,
  root?: string,
  packageRoot?: string
) {
  const mainDescriptor = mainDescriptors.get(
    createDescriptorKey(mainFilename, root)
  )
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
  const normalizedOwnerFilename = removeExt(
    normalizeMiniProgramFilename(withoutIndependentRoot(mainFilename), inputDir)
  )
  const ownerFilename =
    packageRoot && normalizedOwnerFilename.startsWith('uni_modules/')
      ? `${packageRoot}/${normalizedOwnerFilename}`
      : normalizedOwnerFilename

  addMiniProgramUsingComponents(
    ownerFilename,
    createUsingComponents(
      bindingComponents,
      imports,
      inputDir,
      normalizeComponentName,
      ownerFilename,
      root ? undefined : packageRoot
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
        options.root ? withIndependentRoot(filename, options.root) : filename,
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
  templateDescriptors.set(
    createDescriptorKey(filename, options.root),
    descriptor
  )
  return descriptor
}

interface ParseDescriptor {
  resolve: PluginContext['resolve']
  isExternal: boolean
  root?: string
}
export interface ScriptDescriptor extends TemplateDescriptor {
  setupBindingComponents: BindingComponents
}

async function parseGlobalDescriptor(
  filename: string,
  ast: Program,
  resolve: PluginContext['resolve'],
  root?: string
) {
  // 外置时查找所有 vue component import
  const imports = (
    await parseVueComponentImports(
      root ? withIndependentRoot(filename, root) : filename,
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
        options.root ? withIndependentRoot(filename, options.root) : filename,
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

  scriptDescriptors.set(createDescriptorKey(filename, options.root), descriptor)
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

function createDescriptorKey(filename: string, root?: string) {
  return root ? withIndependentRoot(filename, root) : filename
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
