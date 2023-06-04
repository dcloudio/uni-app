const fs = require('fs-extra')
const path = require('path')
const colors = require('picocolors')
const execa = require('execa')
const { spawn } = require('child_process')

const { extract } = require('./apiExtractor')

const { targets: allTargets, fuzzyMatchTarget, priority } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
// const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const isRelease = args.release
const multiProcess = args.m
// const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a
const transpileOnly = args.transpileOnly

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
      await build(target)
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
  const hasViteBundler = fs.existsSync(path.resolve(pkgDir, 'vite.config.ts'))
  if (fs.existsSync(tsconfigJsonPath)) {
    const tsconfigJson = require(tsconfigJsonPath)
    if (
      tsconfigJson.extends &&
      tsconfigJson.extends.includes('tsconfig.node.json')
    ) {
      hasTscBundler = true
    }
  }
  const hasRollupBundler = fs.existsSync(path.resolve(pkgDir, 'build.json'))

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
    if (target === 'uni-h5' || target === 'uni-mp-weibo') {
      await execa(
        'vite',
        ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
        {
          stdio: 'inherit',
          env: Object.assign({ FORMAT: 'cjs' }, process.env),
        }
      )
    }
  }
  if (hasTscBundler) {
    const args = [
      '--listEmittedFiles',
      '-p',
      path.resolve(pkgDir, 'tsconfig.json'),
    ]
    if (types) {
      args.push('--declaration')
    }
    await execa('tsc', args, {
      stdio: 'inherit',
    })
  }
  if (hasRollupBundler) {
    await execa(
      'rollup',
      [
        '-c',
        '--environment',
        [`NODE_ENV:${env}`, types ? `TYPES:true` : ``, `TARGET:${target}`, transpileOnly ? `TRANSPILE_ONLY:true` : ``]
          .filter(Boolean)
          .join(','),
      ],
      { stdio: 'inherit' }
    )
    if (types && target !== 'uni-uts-vite') {
      await extract(target)
    }
  }
}
