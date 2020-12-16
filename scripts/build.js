const fs = require('fs-extra')
const path = require('path')
const chalk = require('chalk')
const execa = require('execa')
const { gzipSync } = require('zlib')
const { compress } = require('brotli')

const { extract } = require('./apiExtractor')

const { targets: allTargets, fuzzyMatchTarget } = require('./utils')

const args = require('minimist')(process.argv.slice(2))
const targets = args._
const formats = args.formats || args.f
const devOnly = args.devOnly || args.d
const isRelease = args.release
const buildTypes = args.t || args.types || isRelease
const buildAllMatching = args.all || args.a

run()

async function run() {
  if (!targets.length) {
    await buildAll(allTargets)
    checkAllSizes(allTargets)
  } else {
    await buildAll(fuzzyMatchTarget(targets, buildAllMatching))
    checkAllSizes(fuzzyMatchTarget(targets, buildAllMatching))
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

  const bundler = pkg.buildOptions && pkg.buildOptions.bundler
  const types = buildTypes && pkg.types
  // if building a specific format, do not remove dist.
  if (!formats && bundler !== 'vite') {
    await fs.remove(`${pkgDir}/dist`)
  }

  const env = devOnly ? 'development' : 'production'

  if (bundler === 'vite') {
    return await execa(
      'vite',
      ['build', '--config', path.resolve(pkgDir, 'vite.config.ts')],
      {
        stdio: 'inherit'
      }
    )
  } else if (bundler === 'tsc') {
    return await execa(
      'tsc',
      ['--listEmittedFiles', types ? `--declaration` : '', '-p', pkgDir],
      {
        stdio: 'inherit'
      }
    )
  }

  await execa(
    'rollup',
    [
      '-c',
      '--environment',
      [`NODE_ENV:${env}`, types ? `TYPES:true` : ``, `TARGET:${target}`]
        .filter(Boolean)
        .join(',')
    ],
    { stdio: 'inherit' }
  )
  if (types) {
    await extract(target)
  }
}

function checkAllSizes(targets) {
  if (devOnly) {
    return
  }
  console.log()
  for (const target of targets) {
    checkSize(target)
  }
  console.log()
}

function checkSize(target) {
  const pkgDir = path.resolve(`packages/${target}`)
  if (require(path.join(pkgDir, 'package.json')).buildOptions) {
    return
  }
  console.log(`${chalk.blueBright(target)}:`)
  checkFileSize(`${pkgDir}/dist/vue.runtime.esm.js`)
  checkFileSize(`${pkgDir}/dist/uni.api.esm.js`)
  checkFileSize(`${pkgDir}/dist/uni.mp.esm.js`)
}

function checkFileSize(filePath) {
  if (!fs.existsSync(filePath)) {
    return
  }
  const file = fs.readFileSync(filePath)
  const minSize = (file.length / 1024).toFixed(2) + 'kb'
  const gzipped = gzipSync(file)
  const gzippedSize = (gzipped.length / 1024).toFixed(2) + 'kb'
  const compressed = compress(file)
  const compressedSize = (compressed.length / 1024).toFixed(2) + 'kb'
  console.log(
    `${chalk.gray(
      chalk.bold(path.basename(filePath))
    )} min:${minSize} / gzip:${gzippedSize} / brotli:${compressedSize}`
  )
}
