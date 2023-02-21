const path = require('path')
const execa = require('execa')
const { resolvePackages } = require('./utils')

async function getVersion(name, tag = 'latest') {
  return (
    await execa('npm', ['view', name + '@' + tag, 'version'])
  ).stdout.trim()
}

const pkgs = {
  vue: {
    latest: '3.2.47',
  },
  'vue-router': {
    latest: '4.1.6',
  },
  vuex: {
    latest: '4.1.0',
  },
  pinia: {
    latest: '2.0.32',
  },
  'vue-i18n': {
    next: '9.1.9',
  },
  vite: {
    latest: '4.1.3',
  },
  '@vitejs/plugin-vue': {
    latest: '4.0.0',
  },
  '@vitejs/plugin-vue-jsx': {
    latest: '3.0.0',
  },
  '@vitejs/plugin-legacy': {
    latest: '4.0.1',
  },
  '@dcloudio/types': {
    latest: '3.2.11',
  },
  autoprefixer: {
    latest: '10.4.13',
  },
  'rollup-plugin-copy': {
    latest: '3.4.0',
  },
  typescript: {
    latest: '4.9.5',
  },
}

async function checkVersions() {
  for (const name of Object.keys(pkgs)) {
    for (const tag of Object.keys(pkgs[name])) {
      const oldVersion = pkgs[name][tag]
      const newVersion = await getVersion(name, tag)
      if (oldVersion !== newVersion) {
        console.log(
          name +
            ':' +
            ' '.repeat(
              80 - (name + ':' + oldVersion + ' => ' + newVersion).length
            ) +
            oldVersion +
            ' => ' +
            newVersion
        )
      } else {
        console.log(
          name +
            ':' +
            ' '.repeat(80 - (name + ':' + newVersion).length) +
            newVersion
        )
      }
    }
  }
}

const packages = resolvePackages('../packages').filter(
  (name) => name !== 'size-check'
)

const deps = Object.create(null)
function resolveDeps(owner, dependencies) {
  if (!dependencies) {
    return
  }
  Object.keys(dependencies).forEach((name) => {
    if (name.startsWith('@dcloudio')) {
      return
    }
    ;(deps[name] || (deps[name] = {}))[owner] = dependencies[name]
  })
}
function resolvePkgDeps(pkgPath) {
  const {
    name,
    dependencies,
    devDependencies,
    peerDependencies,
  } = require(pkgPath)
  resolveDeps(name, dependencies)
  // resolveDeps(name, devDependencies)
  resolveDeps(name, peerDependencies)
}

const { vuePkgs } = require('../packages/vite-plugin-uni/script.js')

function checkDeps() {
  vuePkgs.forEach((pkg) => resolvePkgDeps(pkg))
  packages.forEach((pkg) => {
    resolvePkgDeps(path.resolve(__dirname, '../packages', pkg, 'package.json'))
  })

  console.log(
    Object.keys(deps)
      .filter((name) => {
        const versions = Object.values(deps[name])
        return new Set(versions).size > 1
      })
      .map((name) => {
        return {
          name,
          owners: deps[name],
        }
      })
  )
}

async function run() {
  checkDeps()
  await checkVersions()
}

run()
