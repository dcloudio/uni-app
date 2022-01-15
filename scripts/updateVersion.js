const fs = require('fs')
const path = require('path')
const colors = require('picocolors')
const { prompt } = require('enquirer')
const { resolvePackages } = require('./utils')
const args = process.argv.slice(2)
const packages = [
  ...resolvePackages('../packages'),
  ...resolvePackages('../packages/playground').map((pkg) =>
    path.join('playground', pkg)
  ),
]

const getPkgRoot = (pkg) => path.resolve(__dirname, '../packages/' + pkg)

function updateVersions(module, oldVersion, newVersion) {
  // 1. update root package.json
  updatePackage(path.resolve(__dirname, '..'), module, oldVersion, newVersion)
  // 2. update all packages
  packages.forEach((p) =>
    updatePackage(getPkgRoot(p), module, oldVersion, newVersion)
  )
}

function updatePackage(pkgRoot, module, oldVersion, newVersion) {
  const pkgPath = path.resolve(pkgRoot, 'package.json')
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'))
  updateDeps(pkg, 'dependencies', module, oldVersion, newVersion)
  updateDeps(pkg, 'devDependencies', module, oldVersion, newVersion)
  updateDeps(pkg, 'peerDependencies', module, oldVersion, newVersion)
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n')
}

function updateDeps(pkg, depType, module, oldVersion, newVersion) {
  const deps = pkg[depType]
  if (!deps) return
  function updateVersion(name) {
    if (deps[name].includes(oldVersion)) {
      deps[name] = deps[name].replace(oldVersion, newVersion)
      console.log(
        colors.yellow(`${pkg.name} -> ${depType} -> ${name}@${newVersion}`)
      )
    }
  }
  if (deps[module]) {
    updateVersion(module)
  }
  if (module === 'vue') {
    Object.keys(deps)
      .filter((name) => name.startsWith('@vue/'))
      .forEach((name) => updateVersion(name))
  }
}
if (args.length !== 3) {
  console.log('node update-version.js vue 3.2.21 3.2.22')
  process.exit(0)
}
async function run() {
  const [module, oldVersion, newVersion] = args
  await prompt({
    type: 'confirm',
    name: 'yes',
    message: `bump ${module} from ${oldVersion} to ${newVersion}. Confirm?`,
  })
  updateVersions(module, oldVersion, newVersion)
}

run()
