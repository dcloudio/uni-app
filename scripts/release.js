const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const colors = require('picocolors')
const semver = require('semver')
const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')
const { targets } = require('./utils')

const isDryRun = args.dry
const skipTests = args.skipTests
const skipBuild = args.skipBuild
const onlyDist = args.onlyDist
const packages = fs
  .readdirSync(path.resolve(__dirname, '../packages'))
  .filter(
    (p) => !p.endsWith('.ts') && !p.startsWith('.') && !p.includes('playground')
  )

const skippedPackages = []

const bin = (name) => path.resolve(__dirname, '../node_modules/.bin/' + name)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(colors.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)
const step = (msg) => console.log(colors.cyan(msg))

async function main() {
  const targetVersion = (
    await prompt({
      type: 'input',
      name: 'version',
      message: 'Input custom version',
      initial: currentVersion,
    })
  ).version

  if (!semver.valid(targetVersion)) {
    throw new Error(`invalid target version: ${targetVersion}`)
  }

  const { yes } = await prompt({
    type: 'confirm',
    name: 'yes',
    message: `Releasing v${targetVersion}. Confirm?`,
  })

  if (!yes) {
    return
  }

  // run tests before release
  step('\nRunning tests...')
  if (!skipTests && !isDryRun) {
    await run(bin('jest'), ['--clearCache'])
    await run('pnpm', ['test', '--', '--bail'])
  } else {
    console.log(`(skipped)`)
  }

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)

  // build all packages with types
  step('\nBuilding all packages...')
  if (!skipBuild && !isDryRun) {
    let args = ['run', 'build']
    if (onlyDist) {
      const gitignore = fs.readFileSync(path.join(__dirname, '../.gitignore'), 'utf-8')
      args = args.concat(targets.filter(target => gitignore.includes(`packages/${target}/dist`)))
    }
    await run('pnpm', args)
    // test generated dts files
    step('\nVerifying type declarations...')
    await run('pnpm', ['run', 'test-dts'])
  } else {
    console.log(`(skipped)`)
  }

  // update pnpm-lock.yaml
  step('\nUpdating lockfile...')
  await run(`pnpm`, ['install', '--prefer-offline'])

  const { stdout } = await run('git', ['diff'], { stdio: 'pipe' })
  if (stdout) {
    step('\nCommitting changes...')
    await runIfNotDry('git', ['add', '-A'])
    await runIfNotDry('git', ['commit', '-m', `release: v${targetVersion}`])
  } else {
    console.log('No changes to commit.')
  }

  // publish packages
  step('\nPublishing packages...')
  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion, runIfNotDry)
  }

  // push to GitHub
  step('\nPushing to GitHub...')
  await runIfNotDry('git', ['tag', `v${targetVersion}`])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/v${targetVersion}`])
  await runIfNotDry('git', ['push'])

  if (isDryRun) {
    console.log(`\nDry run finished - run git diff to see package changes.`)
  }

  if (skippedPackages.length) {
    console.log(
      colors.yellow(
        `The following packages are skipped and NOT published:\n- ${skippedPackages.join(
          '\n- '
        )}`
      )
    )
  }
  console.log()
}

function updateVersions(version) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), version, true)
  // 2. update all packages
  packages.forEach((p) => updatePackage(getPkgRoot(p), version))
}

function updatePackage(pkgRoot, version, ignoreDeps = false) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  if (!ignoreDeps) {
    updateDeps(pkg, 'dependencies', version)
    updateDeps(pkg, 'devDependencies', version)
    updateDeps(pkg, 'peerDependencies', version)
    updateDeps(pkg, 'optionalDependencies', version)
  }
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function updateDeps(pkg, depType, version) {
  const deps = pkg[depType]
  if (!deps) return
  Object.keys(deps).forEach((dep) => {
    if (
      dep.startsWith('@dcloudio') &&
      packages.includes(dep.replace(/^@dcloudio\//, ''))
    ) {
      console.log(
        colors.yellow(`${pkg.name} -> ${depType} -> ${dep}@${version}`)
      )
      deps[dep] = version
    }
  })
}

async function publishPackage(pkgName, version, runIfNotDry) {
  if (skippedPackages.includes(pkgName)) {
    return
  }
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  const releaseTag = 'vue3'

  step(`Publishing ${pkgName}...`)
  try {
    await runIfNotDry(
      // note: use of yarn is intentional here as we rely on its publishing
      // behavior.
      'yarn',
      [
        'publish',
        '--new-version',
        version,
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ],
      {
        cwd: pkgRoot,
        stdio: 'pipe',
      }
    )
    console.log(colors.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr.match(/previously published/)) {
      console.log(colors.red(`Skipping already published: ${pkgName}`))
    } else {
      console.error(e)
    }
  }
}

main().catch((err) => {
  console.error(err)
})
