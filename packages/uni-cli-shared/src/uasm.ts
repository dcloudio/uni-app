import fs from 'fs-extra'
import path from 'node:path'
import { sync } from 'fast-glob'
import type {
  DiagnosticWithLocation,
  EntityName,
  Expression,
  Node,
  NodeFactory,
  SourceFile,
  TransformationContext,
  TransformerFactory,
  VisitResult,
} from 'typescript'
import type { Plugin } from 'vite'
import { camelize, capitalize, normalizePath } from './utils'
import {
  parseKotlinPackageWithPluginId,
  parseSwiftModuleWithPluginId,
} from './uts'

type TypeScriptCompiler = typeof import('typescript')

export interface UasmSourceEdit {
  start: number
  end: number
  content: string
}

export interface LoadUasmTransformOptions {
  targetArchs?: string[]
  resolve(modulePath: string): ResolvedUasmLoad | undefined
}

export interface LoadUasmTransformerOptions extends LoadUasmTransformOptions {
  typescript: TypeScriptCompiler
  methodNames?: readonly string[]
  resolveLoader?: (modulePath: string) => ResolvedUasmLoader | undefined
  onSourceEdit?: (edit: UasmSourceEdit) => void
  resolveError?: (modulePath: string) => string
  reportDiagnostic(
    context: TransformationContext,
    diagnostic: DiagnosticWithLocation
  ): void
}

export interface UasmTransformOptions extends LoadUasmTransformOptions {
  createLoadUasmTransformer: typeof createLoadUasmTransformer
}

export type UasmTransformerFactoryCreator = (
  typescript: TypeScriptCompiler
) => { before: TransformerFactory<SourceFile> }

export type UasmPlatform = 'app-android' | 'app-ios' | 'app-harmony'

export interface UasmArchResources {
  dir: string
  file: string
}

export interface UasmPlatformResources {
  dir: string
  archs: Record<string, UasmArchResources>
}

export interface UasmModule {
  name: string
  platforms: Partial<Record<UasmPlatform, UasmPlatformResources>>
  web?: UasmWebResources
}

export interface UasmWebResources {
  entry: string
}

export interface UasmWebLoadDescriptor {
  id: string
  entry: string
}

export type ResolvedUasmLoad = string | UasmWebLoadDescriptor

export interface UasmLoaderDescriptor {
  type: string
  value: string
  imports?: string[]
}

export type ResolvedUasmLoader = string | UasmLoaderDescriptor

export interface ResolvedUasmModule {
  name: string
  platform: UasmPlatform
  arch?: string
  dir: string
  file?: string
}

const UASM_PLATFORMS: UasmPlatform[] = ['app-android', 'app-ios', 'app-harmony']
const UASM_IOS_MANIFEST_VERSION = 1

interface UasmIOSManifestFile {
  size: number
  mtimeMs: number
  mode: number
  link?: string
}

interface UasmIOSCopyManifest {
  version: typeof UASM_IOS_MANIFEST_VERSION
  libraryIdentifier: string
  files: Record<string, UasmIOSManifestFile>
}

let uasmModules: Record<string, UasmModule> = Object.create(null)

export function parseUniAppXTargetArchs(
  value = process.env.UNI_APP_X_TARGET_ARCHS
): string[] {
  if (!value) {
    return []
  }
  try {
    const targetArchs = JSON.parse(value)
    return Array.isArray(targetArchs)
      ? targetArchs.filter(
          (arch): arch is string => typeof arch === 'string' && !!arch
        )
      : []
  } catch {
    return []
  }
}

export function initUasmTransformOptions(
  platform: UasmPlatform
): UasmTransformOptions {
  return {
    targetArchs: parseUniAppXTargetArchs(),
    resolve: (modulePath: string) => resolveUasmLoadPath(modulePath, platform),
    createLoadUasmTransformer,
  }
}

export function initUasmTransformerCreator(
  platform: UasmPlatform
): UasmTransformerFactoryCreator | undefined {
  if (process.env.UNI_APP_X_DOM2 !== 'true') {
    return
  }
  const options = initUasmTransformOptions(platform)
  return (typescript) => ({
    before: options.createLoadUasmTransformer({
      ...options,
      typescript,
      resolveLoader:
        platform === 'app-android'
          ? resolveUasmAndroidLoader
          : platform === 'app-ios'
          ? resolveUasmIOSLoader
          : undefined,
      reportDiagnostic(context, diagnostic) {
        const utsContext = context as TransformationContext & {
          error?(diagnostic: DiagnosticWithLocation): void
        }
        if (utsContext.error) {
          utsContext.error(diagnostic)
        } else {
          throw new Error(diagnostic.messageText.toString())
        }
      },
    }),
  })
}

export function initUasmWebTransformOptions(): UasmTransformOptions {
  return {
    resolve: resolveUasmWebLoad,
    createLoadUasmTransformer(options) {
      return createLoadUasmTransformer({
        ...options,
        methodNames: ['loadUasm'],
        resolveError(modulePath) {
          const moduleName = parseUasmModuleName(modulePath)
          const entry = moduleName
            ? `uni_modules/${moduleName}/uasm/web/${moduleName}.js`
            : 'uni_modules/<插件ID>/uasm/web/<插件ID>.js'
          return `无法加载 uasm 插件[${modulePath}]，请确认插件路径正确，且插件已提供入口文件 ${entry}`
        },
      })
    },
  }
}

function createUasmDiagnostic(
  options: LoadUasmTransformerOptions,
  sourceFile: SourceFile,
  node: Node,
  messageText: string
): DiagnosticWithLocation {
  return {
    file: sourceFile,
    start: node.getStart(sourceFile),
    length: node.getWidth(sourceFile),
    code: 0,
    category: options.typescript.DiagnosticCategory.Error,
    messageText,
  }
}

export function createLoadUasmTransformer(
  options: LoadUasmTransformerOptions
): TransformerFactory<SourceFile> {
  const { typescript, resolve, reportDiagnostic } = options
  const methodNames = new Set(
    options.methodNames || ['loadUasm', 'loadUasmSync']
  )
  const targetArchs = options.targetArchs?.join(', ') || '未指定'

  return (context) => {
    const { factory } = context

    return (sourceFile) => {
      const imports = new Set<string>()
      const visitor = (node: Node): VisitResult<Node> => {
        if (
          typescript.isCallExpression(node) &&
          node.arguments.length >= 1 &&
          typescript.isPropertyAccessExpression(node.expression) &&
          methodNames.has(node.expression.name.text) &&
          typescript.isIdentifier(node.expression.expression) &&
          node.expression.expression.escapedText === 'uni'
        ) {
          const methodName = node.expression.name.text
          const firstArg = node.arguments[0]
          if (
            !typescript.isStringLiteral(firstArg) &&
            !typescript.isNoSubstitutionTemplateLiteral(firstArg)
          ) {
            reportDiagnostic(
              context,
              createUasmDiagnostic(
                options,
                sourceFile,
                firstArg,
                `uni.${methodName}(modulePath) 的 modulePath 参数必须是字符串字面量`
              )
            )
            return node
          }

          const resolved = resolve(firstArg.text)
          if (!resolved) {
            reportDiagnostic(
              context,
              createUasmDiagnostic(
                options,
                sourceFile,
                firstArg,
                options.resolveError?.(firstArg.text) ||
                  `无法加载 uasm 插件[${firstArg.text}]，当前设备支持的 ABI：${targetArchs}。请确认插件路径正确，且插件已提供匹配的库文件`
              )
            )
            return node
          }

          const loader = options.resolveLoader?.(firstArg.text)
          if (loader && typeof loader !== 'string') {
            loader.imports?.forEach((module) => imports.add(module))
          }

          options.onSourceEdit?.({
            start: firstArg.getStart(sourceFile),
            end: firstArg.getEnd(),
            content: resolveUasmSourceEdit(resolved),
          })
          return factory.updateCallExpression(
            node,
            node.expression,
            node.typeArguments,
            [
              typeof resolved === 'string'
                ? factory.createStringLiteral(resolved)
                : factory.createObjectLiteralExpression(
                    [
                      factory.createPropertyAssignment(
                        'id',
                        factory.createStringLiteral(resolved.id)
                      ),
                      factory.createPropertyAssignment(
                        'loader',
                        factory.createArrowFunction(
                          undefined,
                          undefined,
                          [],
                          undefined,
                          factory.createToken(
                            typescript.SyntaxKind.EqualsGreaterThanToken
                          ),
                          factory.createCallExpression(
                            factory.createToken(
                              typescript.SyntaxKind.ImportKeyword
                            ) as import('typescript').Expression,
                            undefined,
                            [factory.createStringLiteral(resolved.entry)]
                          )
                        )
                      ),
                    ],
                    false
                  ),
              ...(loader
                ? [createUasmLoader(factory, loader, typescript)]
                : []),
              ...node.arguments.slice(1),
            ]
          )
        }
        return typescript.visitEachChild(node, visitor, context)
      }

      const transformed = typescript.visitNode(
        sourceFile,
        visitor
      ) as SourceFile
      if (!imports.size) {
        return transformed
      }
      return factory.updateSourceFile(transformed, [
        ...Array.from(imports).map((module) =>
          factory.createImportDeclaration(
            undefined,
            undefined,
            factory.createStringLiteral(module)
          )
        ),
        ...transformed.statements,
      ])
    }
  }
}

function resolveUasmAndroidLoader(modulePath: string) {
  const moduleName = parseUasmModuleName(modulePath)
  if (!moduleName) {
    return
  }
  const packageName = parseKotlinPackageWithPluginId(moduleName, true)
  const className = capitalize(camelize(moduleName))
  return `${packageName}.${className}`
}

function resolveUasmIOSLoader(modulePath: string) {
  const moduleName = parseUasmModuleName(modulePath)
  if (!moduleName) {
    return
  }
  const swiftModule = parseSwiftModuleWithPluginId(moduleName, true)
  const className = capitalize(camelize(moduleName))
  const type = `${swiftModule}.${className}`
  return {
    type: `${type}.Type`,
    value: `${type}.self`,
    imports: [swiftModule],
  }
}

function createUasmLoader(
  factory: NodeFactory,
  loader: ResolvedUasmLoader,
  typescript: TypeScriptCompiler
): Expression {
  const descriptor =
    typeof loader === 'string' ? { type: loader, value: loader } : loader
  const [firstType, ...restType] = descriptor.type.split('.')
  const typeName = restType.reduce<EntityName>(
    (typeName, name) => factory.createQualifiedName(typeName, name),
    factory.createIdentifier(firstType)
  )
  const [firstValue, ...restValue] = descriptor.value.split('.')
  const expression = restValue.reduce<Expression>(
    (expression, name) =>
      factory.createPropertyAccessExpression(expression, name),
    factory.createIdentifier(firstValue)
  )
  return factory.createArrowFunction(
    undefined,
    undefined,
    [],
    factory.createTypeReferenceNode(typeName),
    factory.createToken(typescript.SyntaxKind.EqualsGreaterThanToken),
    expression
  )
}

function resolveUasmSourceEdit(resolved: ResolvedUasmLoad) {
  if (typeof resolved === 'string') {
    return JSON.stringify(resolved)
  }
  return `{ id: ${JSON.stringify(
    resolved.id
  )}, loader: () => import(${JSON.stringify(resolved.entry)}) }`
}

export function initUasmModules(inputDir: string) {
  uasmModules = scanUasmModules(inputDir, UASM_PLATFORMS)
  return uasmModules
}

export function uniUasmPlugin(inputDir = process.env.UNI_INPUT_DIR): Plugin {
  let processed = false
  initUasmModules(inputDir)
  return {
    name: 'uni:uasm',
    apply: 'build',
    enforce: 'post',
    writeBundle() {
      if (processed || !shouldCopyUasmIOSFrameworks()) {
        return
      }
      copyUasmIOSFrameworks(inputDir)
      processed = true
    },
  }
}

function shouldCopyUasmIOSFrameworks() {
  return (
    process.env.UNI_UTS_PLATFORM === 'app-ios' &&
    (process.env.UNI_NODE_ENV || process.env.NODE_ENV) === 'development' &&
    process.env.UNI_APP_X_DOM2 === 'true' &&
    !process.env.UNI_COMPILE_TARGET
  )
}

function copyUasmIOSFrameworks(inputDir: string) {
  const dependenciesDir = process.env.HX_DEPENDENCIES_DIR
  if (!dependenciesDir) {
    return
  }
  const libraryIdentifier =
    process.env.HX_RUN_DEVICE_TYPE === 'ios_simulator'
      ? 'ios-arm64-simulator'
      : 'ios-arm64'
  const targetDir = path.resolve(dependenciesDir, 'modules')

  for (const module of Object.values(uasmModules)) {
    const resources = module.platforms['app-ios']
    if (!resources) {
      continue
    }
    const frameworksDir = path.resolve(inputDir, resources.dir)
    const pluginRelativeDir = path.join('uni_modules', module.name, 'uasm')
    const manifestFile = path.resolve(
      dependenciesDir,
      'app-ios',
      'uasm',
      pluginRelativeDir,
      'manifest.json'
    )
    const sourceDirs = fs
      .readdirSync(frameworksDir, { withFileTypes: true })
      .filter(
        (entry) =>
          isDirectoryEntry(frameworksDir, entry) &&
          entry.name.endsWith('.xcframework')
      )
      .map((entry) => ({
        name: entry.name,
        dir: path.resolve(frameworksDir, entry.name, libraryIdentifier),
      }))
      .filter(({ dir }) => fs.existsSync(dir))
      .sort((a, b) => a.name.localeCompare(b.name))
    const manifest = resolveUasmIOSCopyManifest(sourceDirs, libraryIdentifier)
    const oldManifest = readUasmIOSCopyManifest(manifestFile)
    if (JSON.stringify(oldManifest) === JSON.stringify(manifest)) {
      continue
    }
    sourceDirs.forEach(({ dir }) =>
      fs.copySync(dir, targetDir, { overwrite: true })
    )
    fs.outputJsonSync(manifestFile, manifest, { spaces: 2 })
  }
}

function resolveUasmIOSCopyManifest(
  sourceDirs: { name: string; dir: string }[],
  libraryIdentifier: string
): UasmIOSCopyManifest {
  const manifest: UasmIOSCopyManifest = {
    version: UASM_IOS_MANIFEST_VERSION,
    libraryIdentifier,
    files: Object.create(null),
  }
  sourceDirs.forEach(({ name, dir }) => {
    sync('**/*', {
      cwd: dir,
      dot: true,
      onlyFiles: false,
      followSymbolicLinks: false,
    })
      .sort()
      .forEach((file) => {
        const absoluteFile = path.resolve(dir, file)
        const stat = fs.lstatSync(absoluteFile)
        if (!stat.isFile() && !stat.isSymbolicLink()) {
          return
        }
        const manifestFile: UasmIOSManifestFile = {
          size: stat.size,
          mtimeMs: stat.mtimeMs,
          mode: stat.mode,
        }
        if (stat.isSymbolicLink()) {
          manifestFile.link = fs.readlinkSync(absoluteFile)
        }
        manifest.files[normalizePath(path.join(name, file))] = manifestFile
      })
  })
  return manifest
}

function readUasmIOSCopyManifest(file: string) {
  try {
    return fs.readJsonSync(file) as UasmIOSCopyManifest
  } catch {}
}

function scanUasmModules(
  inputDir: string,
  platformsToScan: readonly UasmPlatform[]
) {
  const modules: Record<string, UasmModule> = Object.create(null)
  const uniModulesDir = path.resolve(inputDir, 'uni_modules')
  if (!fs.existsSync(uniModulesDir)) {
    return modules
  }

  fs.readdirSync(uniModulesDir, { withFileTypes: true }).forEach((entry) => {
    if (!isDirectoryEntry(uniModulesDir, entry)) {
      return
    }
    const platforms: UasmModule['platforms'] = {}
    for (const platform of platformsToScan) {
      const resources = scanUasmPlatform(inputDir, entry.name, platform)
      if (resources) {
        platforms[platform] = resources
      }
    }
    const web = scanUasmWeb(inputDir, entry.name)
    if (Object.keys(platforms).length || web) {
      modules[entry.name] = {
        name: entry.name,
        platforms,
        ...(web ? { web } : {}),
      }
    }
  })
  return modules
}

export function getUasmModules() {
  return uasmModules
}

export function resolveUasmTargetArch(
  moduleName: string,
  platform: UasmPlatform,
  targetArchs = parseUniAppXTargetArchs()
): string | undefined {
  const archs = uasmModules[moduleName]?.platforms[platform]?.archs
  return archs && targetArchs.find((arch) => archs[arch])
}

export function resolveUasmModule(
  moduleName: string,
  platform: UasmPlatform,
  targetArchs = parseUniAppXTargetArchs()
): ResolvedUasmModule | undefined {
  return resolveUasmModuleFrom(uasmModules, moduleName, platform, targetArchs)
}

export function parseUasmModuleName(modulePath: string): string | undefined {
  const normalized = modulePath.replace(/^@?\//, '')
  return /^uni_modules\/([^/]+)$/.exec(normalized)?.[1]
}

export function resolveUasmWebLoad(
  modulePath: string
): UasmWebLoadDescriptor | undefined {
  const moduleName = parseUasmModuleName(modulePath)
  const entry = moduleName && uasmModules[moduleName]?.web?.entry
  if (!moduleName || !entry) {
    return
  }
  return {
    id: moduleName,
    entry: `@/${entry}`,
  }
}

export function resolveUasmLoadPath(
  modulePath: string,
  platform: UasmPlatform,
  isProduction = (process.env.UNI_NODE_ENV || process.env.NODE_ENV) !==
    'development',
  targetArchs = parseUniAppXTargetArchs()
): string | undefined {
  const moduleName = parseUasmModuleName(modulePath)
  if (!moduleName || !uasmModules[moduleName]?.platforms[platform]) {
    return
  }
  if (platform === 'app-ios') {
    return moduleName
  }
  const libraryName = `lib${moduleName}.so`
  if (isProduction) {
    return libraryName
  }
  const file = resolveUasmModule(moduleName, platform, targetArchs)?.file
  if (!file) {
    return
  }
  return platform === 'app-harmony' ? libraryName : file
}

function resolveUasmModuleFrom(
  modules: Record<string, UasmModule>,
  moduleName: string,
  platform: UasmPlatform,
  targetArchs: string[]
): ResolvedUasmModule | undefined {
  const resources = modules[moduleName]?.platforms[platform]
  if (!resources) {
    return
  }
  if (platform === 'app-ios') {
    return {
      name: moduleName,
      platform,
      dir: resources.dir,
    }
  }
  const arch = targetArchs.find((arch) => resources.archs[arch])
  if (!arch) {
    return
  }
  const archResources = resources.archs[arch]
  return {
    name: moduleName,
    platform,
    arch,
    dir: archResources.dir,
    file: archResources.file,
  }
}

export function resolveUasmCopyAssets(
  platform: UasmPlatform,
  isProduction: boolean,
  targetArchs = parseUniAppXTargetArchs()
) {
  const resourceDir = platform === 'app-ios' ? 'frameworks' : 'libs'
  if (isProduction) {
    return [`uni_modules/*/uasm/${platform}/${resourceDir}/**/*`]
  }
  if (platform === 'app-ios' || !targetArchs.length) {
    return []
  }
  return Object.keys(uasmModules).reduce<string[]>((assets, moduleName) => {
    const resolved = resolveUasmModule(moduleName, platform, targetArchs)
    if (resolved) {
      assets.push(`${resolved.dir}/**/*`)
    }
    return assets
  }, [])
}

function scanUasmPlatform(
  inputDir: string,
  moduleName: string,
  platform: UasmPlatform
): UasmPlatformResources | undefined {
  const resourceDir = platform === 'app-ios' ? 'frameworks' : 'libs'
  const relativeDir = normalizePath(
    path.join('uni_modules', moduleName, 'uasm', platform, resourceDir)
  )
  const absoluteDir = path.resolve(inputDir, relativeDir)
  if (!fs.existsSync(absoluteDir)) {
    return
  }

  const resources: UasmPlatformResources = {
    dir: relativeDir,
    archs: Object.create(null),
  }
  if (platform !== 'app-ios') {
    fs.readdirSync(absoluteDir, { withFileTypes: true }).forEach((entry) => {
      if (!isDirectoryEntry(absoluteDir, entry)) {
        return
      }
      const relativeArchDir = normalizePath(path.join(relativeDir, entry.name))
      const file = normalizePath(
        path.join(relativeArchDir, `lib${moduleName}.so`)
      )
      if (!fs.existsSync(path.resolve(inputDir, file))) {
        return
      }
      resources.archs[entry.name] = {
        dir: relativeArchDir,
        file,
      }
    })
    if (!Object.keys(resources.archs).length) {
      return
    }
  }
  return resources
}

function scanUasmWeb(
  inputDir: string,
  moduleName: string
): UasmWebResources | undefined {
  const entry = normalizePath(
    path.join('uni_modules', moduleName, 'uasm', 'web', `${moduleName}.js`)
  )
  if (fs.existsSync(path.resolve(inputDir, entry))) {
    return { entry }
  }
}

function isDirectoryEntry(parentDir: string, entry: fs.Dirent) {
  if (entry.isDirectory()) {
    return true
  }
  if (!entry.isSymbolicLink()) {
    return false
  }
  try {
    return fs.statSync(path.resolve(parentDir, entry.name)).isDirectory()
  } catch {
    return false
  }
}
