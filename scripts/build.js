const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')

const { extract } = require('./apiExtractor')

const { targets: allTargets, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
// const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const isRelease = args.release
// const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a

run()

async function run() {
  if (!targets.length) {
    await buildAll(allTargets)
  } else {
    await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
  }
}

async function buildAll(targets) {
  for (const target of targets) {
    console.log(`\n${chalk.blueBright(chalk.bold(target))}:`)
    await build(target)
  }
}

async function build(target) {
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
  if (target !== 'uni-cloud') {
    await fs.remove(`${pkgDir}/dist`)
  }
  // }

  const env = devOnly ? 'development' : 'production'

  if (hasViteBundler) {
    await execa(
      'vite',
      ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
      {
        stdio: 'inherit',
        env: Object.assign({ FORMAT: 'es' }, process.env),
      }
    )
    if (target === 'uni-h5') {
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
        [`NODE_ENV:${env}`, types ? `TYPES:true` : ``, `TARGET:${target}`]
          .filter(Boolean)
          .join(','),
      ],
      { stdio: 'inherit' }
    )
    if (types) {
      await extract(target)
    }
  }
}
