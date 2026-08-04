const args = require('minimist')(process.argv.slice(2))
const fs = require('fs')
const path = require('path')
const colors = require('picocolors')
const semver = require('semver')
const currentVersion = require('../package.json').version
const { prompt } = require('enquirer')
const execa = require('execa')
const { targets } = require('./utils')
const {
  ensurePatchFinalNewline,
  handleReleaseError,
} = require('./releaseUtils')

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
    try {
      await run(bin('jest'), ['--clearCache'])
      await run('pnpm', ['test', '--', '--bail'])
    } catch (err) {
      console.error(colors.red(err.shortMessage || err.message))
      const { continueBuild } = await prompt({
        type: 'confirm',
        name: 'continueBuild',
        message: 'Tests failed. Continue with build?',
        initial: false,
      })
      if (!continueBuild) {
        console.log(colors.yellow('Release stopped because tests failed.'))
        process.exitCode = 1
        return
      }
    }
  } else {
    console.log(`(skipped)`)
  }

  // update all package versions and inter-dependencies
  step('\nUpdating cross dependencies...')
  updateVersions(targetVersion)
  if (!isDryRun) {
    await stageUpdatedPackageVersions()
  }

  // build all packages with types
  step('\nBuilding all packages...')
  if (!skipBuild && !isDryRun) {
    let args = ['run', 'build']
    if (onlyDist) {
      const gitignore = fs.readFileSync(path.join(__dirname, '../.gitignore'), 'utf-8')
      args = args.concat(targets.filter(target => gitignore.includes(`packages/${target}/dist`)))
    }
    const buildSnapshot = await createBuildSnapshot()
    await run('pnpm', args)
    if (!(await confirmAndCleanBuildChanges(buildSnapshot))) {
      return
    }
    // test generated dts files
    step('\nVerifying type declarations...')
    await run('pnpm', ['run', 'test-dts'])
  } else {
    console.log(`(skipped)`)
  }

  // update pnpm-lock.yaml
  step('\nUpdating lockfile...')
  await run(`pnpm`, ['install', '--prefer-offline'])

  const { stdout } = await run('git', ['diff', 'HEAD'], { stdio: 'pipe' })
  if (stdout) {
    if (!isDryRun && !(await confirmWorkingTreeBeforeCommit())) {
      return
    }
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

async function stageUpdatedPackageVersions() {
  const packageJsonFiles = ['package.json'].concat(
    packages
      .map((pkg) => `packages/${pkg}/package.json`)
      .filter((file) => fs.existsSync(path.resolve(__dirname, '..', file)))
  )
  await run('git', ['add', '--', ...packageJsonFiles])
}

function updatePackage(pkgRoot, version, ignoreDeps = false) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    console.log(colors.yellow(`Cannot find package.json in ${pkgRoot}`))
    return
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  pkg.version = version
  // workspace:* 依赖交给 pnpm 处理
  // if (!ignoreDeps) {
  // updateDeps(pkg, 'dependencies', version)
  // updateDeps(pkg, 'devDependencies', version)
  // updateDeps(pkg, 'peerDependencies', version)
  // updateDeps(pkg, 'optionalDependencies', version)
  // }
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

async function createBuildSnapshot() {
  const [{ stdout: snapshot }, untrackedFiles] = await Promise.all([
    run('git', ['stash', 'create'], { stdio: 'pipe' }),
    getUntrackedFiles(),
  ])
  if (snapshot) {
    return { ref: snapshot.trim(), untrackedFiles }
  }

  const { stdout: head } = await run('git', ['rev-parse', 'HEAD'], {
    stdio: 'pipe',
  })
  return { ref: head.trim(), untrackedFiles }
}

async function getUntrackedFiles() {
  const { stdout } = await run(
    'git',
    ['ls-files', '--others', '--exclude-standard', '-z'],
    { stdio: 'pipe' }
  )
  return stdout.split('\0').filter(Boolean)
}

async function confirmAndCleanBuildChanges(snapshot) {
  const buildChanges = await getBuildChanges(snapshot)
  if (!buildChanges.trackedChanges && !buildChanges.newUntrackedFiles.length) {
    return true
  }

  console.log(colors.yellow('Git changes detected after build.'))
  if (buildChanges.trackedChanges) {
    console.log(buildChanges.trackedChanges)
  }
  if (buildChanges.newUntrackedFiles.length) {
    console.log(
      buildChanges.newUntrackedFiles.map((file) => `?? ${file}`).join('\n')
    )
  }

  const { clearBuildChanges } = await prompt({
    type: 'confirm',
    name: 'clearBuildChanges',
    message:
      'Clear build changes and continue release? Staged package versions will be kept.',
    initial: false,
  })
  if (!clearBuildChanges) {
    console.log(colors.yellow('Release stopped before clearing build changes.'))
    process.exitCode = 1
    return false
  }

  await cleanBuildChanges(snapshot)
  return true
}

async function getBuildChanges(snapshot) {
  const [{ stdout: trackedChanges }, untrackedFiles] = await Promise.all([
    run('git', ['diff', '--name-status', snapshot.ref], { stdio: 'pipe' }),
    getUntrackedFiles(),
  ])
  const initialUntrackedFiles = new Set(snapshot.untrackedFiles)
  return {
    trackedChanges,
    newUntrackedFiles: untrackedFiles.filter(
      (file) => !initialUntrackedFiles.has(file)
    ),
  }
}

async function cleanBuildChanges(snapshot) {
  const buildChanges = await getBuildChanges(snapshot)
  if (buildChanges.trackedChanges) {
    const { stdout: diff } = await run(
      'git',
      ['diff', '--binary', snapshot.ref],
      { stdio: 'pipe' }
    )
    await run('git', ['apply', '--reverse', '--whitespace=nowarn'], {
      input: ensurePatchFinalNewline(diff),
      stdio: 'pipe',
    })
  }
  buildChanges.newUntrackedFiles.forEach(removeUntrackedFile)
}

function removeUntrackedFile(file) {
  const repoRoot = path.resolve(__dirname, '..')
  const filePath = path.resolve(repoRoot, file)
  const relativePath = path.relative(repoRoot, filePath)
  if (
    relativePath.startsWith(`..${path.sep}`) ||
    path.isAbsolute(relativePath)
  ) {
    throw new Error(`Invalid untracked file path: ${file}`)
  }

  try {
    const stat = fs.lstatSync(filePath)
    if (!stat.isDirectory()) {
      fs.unlinkSync(filePath)
    }
  } catch (err) {
    if (err.code !== 'ENOENT') {
      throw err
    }
  }
}

async function confirmWorkingTreeBeforeCommit() {
  const { stdout } = await run('git', ['status', '--short'], {
    stdio: 'pipe',
  })
  if (stdout) {
    console.log(colors.yellow('\nGit changes to commit:'))
    console.log(stdout)
  }

  const { confirmCommit } = await prompt({
    type: 'confirm',
    name: 'confirmCommit',
    message: 'Confirm the working tree is ready to commit and continue release?',
    initial: false,
  })
  if (confirmCommit) {
    return true
  }

  console.log(colors.yellow('Release canceled before commit.'))
  process.exitCode = 1
  return false
}

async function publishPackage(pkgName, version, runIfNotDry) {
  if (skippedPackages.includes(pkgName)) {
    return
  }
  const pkgRoot = getPkgRoot(pkgName)
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  if (!fs.existsSync(pkgPath)) {
    console.log(colors.yellow(`Cannot find package.json in ${pkgRoot}`))
    return
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  if (pkg.private) {
    return
  }

  const releaseTag = 'vue3'

  step(`Publishing ${pkgName}...`)
  try {
    await runIfNotDry(
      // Don't change the package manager here as we rely on pnpm to handle
      // workspace:* deps
      'pnpm',
      [
        'publish',
        ...(releaseTag ? ['--tag', releaseTag] : []),
        '--access',
        'public',
      ],
      {
        cwd: pkgRoot,
        stdio: 'inherit',
      }
    )
    console.log(colors.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    if (e.stderr && e.stderr.match(/previously published/)) {
      console.log(colors.red(`Skipping already published: ${pkgName}`))
    } else {
      console.error(e)
    }
  }
}

main().catch(handleReleaseError)
