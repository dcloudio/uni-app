const fs = require('fs-extra')
const path = require('path')
const colors = require('picocolors')
const execa = require('execa')
const { spawn } = require('child_process')
const { parse } = require('jsonc-parser')
const { config } = require('dotenv')
const { genHarmonyExtApiExport } = require('./genHarmonyExtApiExport')

config()

const { extract } = require('./apiExtractor')

const { targets: allTargets, fuzzyMatchTarget, priority } = require('./utils')

const rootDir = path.resolve(__dirname, '..')
const args = require('minimist')(process.argv.slice(2))
const targets = args._
// const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const isRelease = args.release
const multiProcess = args.m
// const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a
const transpileOnly = args.transpileOnly

const arkTSOnly = args.ets

run()

async function run() {
  if (!targets.length) {
    await buildAll(allTargets)
  } else {
    await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
  }
}

function buildWithChildProcess(target) {
  const args = [__filename, target]
  devOnly && args.push('-d')
  isRelease && args.push('--release')
  const child = spawn('node', args, {
    cwd: process.cwd(),
    stdio: 'inherit',
  })
  return new Promise((resolve, reject) => {
    child.on('exit', () => {
      const exitCode = child.exitCode
      if (exitCode === 0) {
        resolve()
      } else {
        reject(new Error(`build ${target} failed with error code ${exitCode}`))
      }
    })
  })
}

function getTargetGroup(targets) {
  const group = {}
  for (let i = 0; i < targets.length; i++) {
    const target = targets[i]
    const targetPriority = priority[target]
    if (!group[targetPriority]) {
      group[targetPriority] = [target]
    } else {
      group[targetPriority].push(target)
    }
  }
  return group
}

async function buildAll(targets) {
  if (!multiProcess) {
    for (const target of targets) {
      try {
        await build(target)
      } catch (e) {
        console.error(e)
      }
    }
    return
  }
  if (targets.length === 1) {
    // child process or single target
    await build(targets[0])
    return
  }
  console.warn('compiling with multi process')
  const group = getTargetGroup(targets)
  const keys = Object.keys(group).sort((a, b) => {
    return b - a
  })
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i]
    const groupTargets = group[key]
    await Promise.all(
      groupTargets.map((target) => buildWithChildProcess(target))
    )
  }
}

async function build(target) {
  console.log(`\n${colors.bold(target)}:`)
  const pkgDir = path.resolve(`packages/${target}`)
  const pkg = require(`${pkgDir}/package.json`)

  // only build published packages for release
  if (isRelease && pkg.private) {
    return
  }
  const tsconfigJsonPath = path.resolve(pkgDir, 'tsconfig.json')
  let hasTscBundler = false
  const hasViteBundler =
    !arkTSOnly && fs.existsSync(path.resolve(pkgDir, 'vite.config.ts'))
  if (fs.existsSync(tsconfigJsonPath)) {
    const tsconfigJson = require(tsconfigJsonPath)
    if (
      tsconfigJson.extends &&
      tsconfigJson.extends.includes('tsconfig.node.json')
    ) {
      hasTscBundler = true
    }
  }
  const hasRollupBundler =
    !arkTSOnly && fs.existsSync(path.resolve(pkgDir, 'build.json'))

  const hasArkTSBundler = fs.existsSync(path.resolve(pkgDir, 'build.ets.json'))

  const types = target.endsWith('-shared') || pkg.types
  // if building a specific format, do not remove dist.
  // if (!formats && bundler !== 'vite') {
  if (!['uni-cloud', 'uni-automator'].includes(target)) {
    await fs.remove(`${pkgDir}/dist`)
  }
  // }

  const env = devOnly ? 'development' : 'production'

  if (hasViteBundler) {
    const env = {}
    if (target === 'size-check') {
      env.UNI_PLATFORM = 'h5'
    }
    await execa(
      'vite',
      ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
      {
        stdio: 'inherit',
        env: Object.assign({ FORMAT: 'es' }, process.env, env),
        cwd: pkgDir,
      }
    )
    await sleep(500)
    if (target === 'uni-h5') {
      await execa(
        'vite',
        ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
        {
          stdio: 'inherit',
          env: Object.assign({ FORMAT: 'cjs' }, process.env),
          cwd: pkgDir,
        }
      )
      await sleep(500)
      // uni-h5(uni-app x)
      await execa(
        'vite',
        ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
        {
          stdio: 'inherit',
          env: Object.assign(
            { FORMAT: 'es', UNI_APP_X: 'true' },
            process.env,
            env
          ),
          cwd: pkgDir,
        }
      )
      await sleep(500)
      await execa(
        'vite',
        ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
        {
          stdio: 'inherit',
          env: Object.assign(
            { FORMAT: 'cjs', UNI_APP_X: 'true' },
            process.env,
            env
          ),
          cwd: pkgDir,
        }
      )
      await sleep(500)
    }
    if (target === 'uni-app-plus') {
      await execa(
        'vite',
        ['build', '--config', path.resolve(pkgDir, 'x.vite.config.ts')],
        {
          stdio: 'inherit',
          env: Object.assign({ FORMAT: 'es' }, process.env, env),
          cwd: pkgDir,
        }
      )
      await sleep(500)
    }
  }
  if (hasTscBundler) {
    const enableSourceMap = process.env.ENABLE_SOURCEMAP === 'true'
    const args = [
      '--listEmittedFiles',
      '-p',
      path.resolve(pkgDir, 'tsconfig.json'),
    ]
    if (types) {
      args.push('--declaration')
    }

    if (enableSourceMap) {
      args.push('--sourceMap')
    }

    await execa('tsc', args, {
      stdio: 'inherit',
    })
    await sleep(500)
  }
  if (hasArkTSBundler) {
    if (
      process.env.UNI_APP_EXT_API_DIR &&
      process.env.UNI_APP_EXT_API_INTERNAL_DIR
    ) {
      await buildArkTS(
        target,
        parse(fs.readFileSync(path.resolve(pkgDir, 'build.ets.json'), 'utf8'))
      )
    } else {
      console.error(
        `Please set UNI_APP_EXT_API_DIR and UNI_APP_EXT_API_INTERNAL_DIR in .env file`
      )
    }
  }
  if (hasRollupBundler) {
    await execa(
      'rollup',
      [
        '-c',
        '--environment',
        [
          `NODE_ENV:${env}`,
          types ? `TYPES:true` : ``,
          `TARGET:${target}`,
          transpileOnly ? `TRANSPILE_ONLY:true` : ``,
        ]
          .filter(Boolean)
          .join(','),
      ],
      { stdio: 'inherit' }
    )
    await sleep(500)

    if (types && target !== 'uni-uts-vite') {
      await extract(target)
    }
  }
}

async function buildArkTS(target, buildJson) {
  const projectDir = path.resolve(__dirname, '../packages', target)
  const { bundleArkTS } = require('../packages/uts/dist')
  const { compileArkTSExtApi } = require('../packages/uni-uts-v1/dist')
  const start = Date.now()
  if (!Array.isArray(buildJson)) {
    buildJson = [buildJson]
  }
  for (const options of buildJson) {
    const inputs = Object.keys(options.input)
    const alias = options.alias || {}
    const replacements = options.replacements || {}
    const vars = {}
    const envs = {}
    Object.keys(replacements).forEach((key) => {
      if (key.startsWith('process.env.')) {
        envs[key.replace('process.env.', '')] = replacements[key]
      } else {
        vars[key] = replacements[key]
      }
    })
    // console.log(vars, envs)
    for (const input of inputs) {
      const buildOptions = {
        input: {
          root: projectDir,
          filename: path.resolve(projectDir, input),
          paths: Object.keys(alias).reduce((paths, key) => {
            paths[key] = alias[key].replace('<rootDir>', rootDir)
            return paths
          }, {}),
          externals: options.externals || [],
          parseOptions: {
            tsx: true,
            noEarlyErrors: true,
            allowComplexUnionType: true,
            allowTsLitType: true,
          },
          globals: {
            vars,
            envs,
          },
        },
        output: {
          outDir: path.resolve(projectDir, 'dist'),
          outFilename: options.input[input],
          package: '',
          imports: [],
          sourceMap: false,
          extname: path.extname(options.input[input]) ?? '.ets',
          logFilename: false,
          isPlugin: true,
          transform: {
            autoImportExternals: options.autoImports || {},
          },
          treeshake: {
            noSideEffects: true,
          },
          wrapperFunctionName: options.wrapper?.name,
          wrapperFunctionArgs: options.wrapper?.args,
        },
      }
      // console.log(buildOptions)
      await bundleArkTS(buildOptions).then((res) => {
        console.log('bundle: ' + (Date.now() - start) + 'ms')
        // console.log(JSON.stringify(res))、
        const filePath = path.resolve(
          buildOptions.output.outDir,
          buildOptions.output.outFilename
        )
        if (input !== 'temp/uni-ext-api/index.uts') {
          if (options.banner) {
            fs.writeFileSync(
              filePath,
              options.banner + '\n' + fs.readFileSync(filePath, 'utf8')
            )
          }
          return
        }
        const fileContent =
          (options.banner ? options.banner + '\n' : '') +
          fs
            .readFileSync(filePath, 'utf8')
            .replace(
              'export type Request<T>',
              'export type Request<T = Object>'
            )
            .replace(
              'export class RequestOptions<T>',
              'export class RequestOptions<T = Object>'
            )
            .replace(
              'export class RequestSuccess<T>',
              'export class RequestSuccess<T = Object>'
            )
        fs.writeFileSync(filePath, fileContent)
      })
    }
  }
  // 先生成一遍提供给ohpm包使用
  const extApiExportJsonPath = path.resolve(
    __dirname,
    '../packages/uni-uts-v1/lib/arkts/ext-api-export.json'
  )
  const extApiExport = genHarmonyExtApiExport()
  fs.outputJSON(extApiExportJsonPath, extApiExport, { spaces: 2 })

  const harBuildJson = require(path.resolve(
    projectDir,
    'temp/uni-ext-api/build.har.json'
  ))
  const standaloneExtApis = []
  for (let i = 0; i < harBuildJson.length; i++) {
    const { input, output, type, plugin, apis, provider, service } =
      harBuildJson[i]
    await compileArkTSExtApi(path.resolve(input, '..'), input, output, {
      isExtApi: true,
      isOhpmPackage: true,
      transform: {},
    })
    let version = '1.0.0'
    const packageJsonPath = path.resolve(input, 'package.json')
    if (fs.existsSync(packageJsonPath)) {
      const packageJson = fs.readJSONSync(packageJsonPath)
      version = packageJson.version || '1.0.0'
    }
    standaloneExtApis.push({
      type,
      plugin,
      apis,
      provider,
      service,
      version,
    })
  }
  fs.outputJSON(
    path.resolve(projectDir, 'src/compiler/standalone-ext-apis.json'),
    standaloneExtApis,
    { spaces: 2 }
  )
  const extApiExportWithHar = genHarmonyExtApiExport()
  fs.outputJSON(extApiExportJsonPath, extApiExportWithHar, { spaces: 2 })
}

async function sleep(ms) {
  global.gc && global.gc()
  console.log('gc sleep')
  return new Promise((resolve) => setTimeout(resolve, ms))
}
