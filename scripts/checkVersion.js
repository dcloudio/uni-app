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
    latest: '3.2.30',
  },
  'vue-router': {
    latest: '4.0.12',
  },
  vuex: {
    latest: '4.0.2',
  },
  'vue-i18n': {
    next: '9.1.9',
  },
  vite: {
    latest: '2.8.1',
  },
  '@vitejs/plugin-vue': {
    latest: '2.2.0',
  },
  '@vitejs/plugin-vue-jsx': {
    latest: '1.3.5',
  },
  '@vitejs/plugin-legacy': {
    latest: '1.7.1',
  },
  '@dcloudio/types': {
    latest: '2.5.16',
  },
  autoprefixer: {
    latest: '10.4.2',
  },
  'rollup-plugin-copy': {
    latest: '3.4.0',
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

const paths = [
  path.resolve(__dirname, '../packages/vite-plugin-uni/node_modules'),
]

const vuePkgs = [
  require.resolve('vite/package.json'),
  require.resolve('@vitejs/plugin-vue/package.json'),
  require.resolve('@vitejs/plugin-vue-jsx/package.json'),
  require.resolve('@vitejs/plugin-legacy/package.json', { paths }),
  require.resolve('@vue/compiler-core/package.json', { paths }),
  require.resolve('@vue/compiler-dom/package.json', { paths }),
  require.resolve('@vue/compiler-sfc/package.json', { paths }),
]

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
