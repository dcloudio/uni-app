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
const alreadyPublishedPackages = []

const bin = (name) => path.resolve(__dirname, '../node_modules/.bin/' + name)
const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', ...opts })
const dryRun = (bin, args, opts = {}) =>
  console.log(colors.blue(`[dryrun] ${bin} ${args.join(' ')}`), opts)
const runIfNotDry = isDryRun ? dryRun : run
const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)
const step = (msg) => console.log(colors.cyan(msg))
const getErrorOutput = (error) =>
  [error.shortMessage, error.stdout, error.stderr].filter(Boolean).join('\n')

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

  step('\nChecking remote history...')
  await ensureGitBranchIsPublishable()

  // publish packages
  step('\nPublishing packages...')
  for (const pkg of packages) {
    await publishPackage(pkg, targetVersion, runIfNotDry)
  }

  // push to GitHub
  step('\nPushing to GitHub...')
  await runIfNotDry('git', ['push'])
  await syncReleaseTag(targetVersion, runIfNotDry)

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
  if (alreadyPublishedPackages.length) {
    console.log(
      colors.yellow(
        `The following packages are already published for this version and were skipped:\n- ${alreadyPublishedPackages.join(
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
  const pkgId = `${pkg.name}@${version}`

  if (await isVersionPublished(pkg.name, version)) {
    alreadyPublishedPackages.push(pkgId)
    console.log(colors.yellow(`Skipping already published: ${pkgId}`))
    return
  }

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
        stdio: 'pipe',
      }
    )
    console.log(colors.green(`Successfully published ${pkgName}@${version}`))
  } catch (e) {
    const output = getErrorOutput(e)
    if (/previously published/i.test(output)) {
      console.log(colors.red(`Skipping already published: ${pkgName}`))
    } else {
      throw new Error(
        [
          `Failed to publish ${pkgName}.`,
          output,
        ].filter(Boolean).join('\n')
      )
    }
  }
}

async function isVersionPublished(pkgName, version) {
  try {
    const { stdout } = await run(
      'npm',
      ['view', `${pkgName}@${version}`, 'version', '--json'],
      { stdio: 'pipe' }
    )
    return stdout.trim().length > 0
  } catch (e) {
    const output = getErrorOutput(e)
    if (
      /E404|404|No match found for version|is not in this registry/i.test(output)
    ) {
      return false
    }
    throw new Error(
      [
        `Failed to check publish status for ${pkgName}@${version}.`,
        output,
      ].filter(Boolean).join('\n')
    )
  }
}

async function ensureGitBranchIsPublishable() {
  let upstream
  try {
    const result = await run('git', [
      'rev-parse',
      '--abbrev-ref',
      '--symbolic-full-name',
      '@{upstream}',
    ], { stdio: 'pipe' })
    upstream = result.stdout.trim()
  } catch (e) {
    console.log(colors.yellow('No upstream branch configured. Skipping git remote check.'))
    return
  }

  await run('git', ['fetch', '--quiet'])
  const { stdout } = await run(
    'git',
    ['rev-list', '--left-right', '--count', `HEAD...${upstream}`],
    { stdio: 'pipe' }
  )
  const [ahead, behind] = stdout.trim().split(/\s+/).map(Number)

  if (behind > 0) {
    const message = [`Current branch is behind ${upstream} by ${behind} commit(s).`]
    if (ahead > 0) {
      message.push(`Local branch is also ahead by ${ahead} commit(s).`)
    }
    message.push('Please pull/rebase before publishing.')
    throw new Error(message.join(' '))
  }
}

async function syncReleaseTag(version, runIfNotDry) {
  const tagName = `v${version}`
  const headSha = await getGitRefSha('HEAD')
  const localTagSha = await getGitRefSha(`refs/tags/${tagName}`)
  const remoteTagSha = await getRemoteTagSha(tagName)

  if (localTagSha && remoteTagSha && localTagSha !== remoteTagSha) {
    throw new Error(
      `Tag ${tagName} exists locally (${localTagSha}) and remotely (${remoteTagSha}) but points to different commits.`
    )
  }

  const existingTagSha = remoteTagSha || localTagSha
  if (existingTagSha) {
    if (existingTagSha === headSha) {
      console.log(colors.yellow(`Tag ${tagName} already exists at HEAD. Skipping tag creation.`))
    } else {
      console.log(
        colors.yellow(
          `Tag ${tagName} already exists at ${existingTagSha} instead of HEAD ${headSha}. Skipping tag update.`
        )
      )
    }
    if (!remoteTagSha && localTagSha) {
      await runIfNotDry('git', ['push', 'origin', `refs/tags/${tagName}`])
    }
    return
  }

  await runIfNotDry('git', ['tag', tagName])
  await runIfNotDry('git', ['push', 'origin', `refs/tags/${tagName}`])
}

async function getGitRefSha(ref) {
  try {
    const { stdout } = await run('git', ['rev-parse', ref], { stdio: 'pipe' })
    return stdout.trim()
  } catch (e) {
    const output = getErrorOutput(e)
    if (/unknown revision|Needed a single revision|ambiguous argument|not a valid ref/i.test(output)) {
      return null
    }
    throw e
  }
}

async function getRemoteTagSha(tagName) {
  const { stdout } = await run(
    'git',
    ['ls-remote', '--tags', 'origin', `refs/tags/${tagName}`],
    { stdio: 'pipe' }
  )
  const line = stdout.trim()
  if (!line) {
    return null
  }
  return line.split(/\s+/)[0]
}

main().catch((err) => {
  console.error(err)
})
