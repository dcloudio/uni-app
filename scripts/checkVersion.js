const path = require('path')
const fs = require('fs')
const execa = require('execa')
const { resolvePackages } = require('./utils')

const workspaceConfigPath = path.resolve(__dirname, '../pnpm-workspace.yaml')

function parseYamlString(value) {
  value = value.trim()
  if (
    (value.startsWith("'") && value.endsWith("'")) ||
    (value.startsWith('"') && value.endsWith('"'))
  ) {
    return value.slice(1, -1)
  }
  return value
}

function parseYamlPair(line) {
  const match = line.match(/^((?:'[^']+'|"[^"]+"|[^:]+)):\s*(.*)$/)
  if (!match) {
    return
  }
  return [parseYamlString(match[1]), parseYamlString(match[2])]
}

function loadCatalogs(filename) {
  const catalogs = {
    default: Object.create(null),
  }
  if (!fs.existsSync(filename)) {
    return catalogs
  }

  let section = ''
  let catalogName = ''
  fs.readFileSync(filename, 'utf8')
    .split(/\r?\n/)
    .forEach((line) => {
      if (!line.trim() || line.trimStart().startsWith('#')) {
        return
      }

      const indent = line.match(/^\s*/)[0].length
      const trimmed = line.trim()

      if (indent === 0) {
        section = ''
        catalogName = ''
        if (trimmed === 'catalog:') {
          section = 'catalog'
          catalogName = 'default'
        } else if (trimmed === 'catalogs:') {
          section = 'catalogs'
        }
        return
      }

      if (section === 'catalog' && indent === 2) {
        const pair = parseYamlPair(trimmed)
        if (pair) {
          catalogs.default[pair[0]] = pair[1]
        }
      } else if (section === 'catalogs') {
        if (indent === 2 && trimmed.endsWith(':')) {
          catalogName = parseYamlString(trimmed.slice(0, -1))
          catalogs[catalogName] = catalogs[catalogName] || Object.create(null)
        } else if (indent === 4 && catalogName) {
          const pair = parseYamlPair(trimmed)
          if (pair) {
            catalogs[catalogName][pair[0]] = pair[1]
          }
        }
      }
    })

  return catalogs
}

const catalogs = loadCatalogs(workspaceConfigPath)

function resolveCatalogVersion(name, version) {
  if (typeof version !== 'string' || !version.startsWith('catalog:')) {
    return version
  }
  const catalogName = version.slice('catalog:'.length) || 'default'
  const catalog = catalogs[catalogName]
  return (catalog && catalog[name]) || version
}

function resolvePackageVersion(name, fallback) {
  const pkg = require('../package.json')
  const version =
    (pkg.dependencies && pkg.dependencies[name]) ||
    (pkg.devDependencies && pkg.devDependencies[name]) ||
    (pkg.peerDependencies && pkg.peerDependencies[name]) ||
    (catalogs.default && catalogs.default[name]) ||
    fallback
  return resolveCatalogVersion(name, version)
}

async function getVersion(name, tag = 'latest') {
  return (
    await execa('npm', ['view', name + '@' + tag, 'version'])
  ).stdout.trim()
}

const pkgs = {
  vue: {
    latest: '3.4.21',
  },
  'vue-router': {
    latest: '4.3.0',
  },
  vuex: {
    latest: '4.1.0',
  },
  pinia: {
    latest: '2.1.7',
  },
  'vue-i18n': {
    next: '9.1.9',
  },
  vite: {
    latest: '5.2.8',
  },
  '@vitejs/plugin-vue': {
    latest: '5.0.4',
  },
  '@vitejs/plugin-vue-jsx': {
    latest: '3.1.0',
  },
  '@vitejs/plugin-legacy': {
    latest: '5.3.2',
  },
  '@dcloudio/types': {
    latest: '3.4.8',
  },
  autoprefixer: {
    latest: '10.4.19',
  },
  'rollup-plugin-copy': {
    latest: '3.5.0',
  },
  typescript: {
    latest: '5.4.2',
  },
}

async function checkVersions() {
  for (const name of Object.keys(pkgs)) {
    for (const tag of Object.keys(pkgs[name])) {
      const oldVersion = pkgs[name][tag]
      const currentVersion = resolvePackageVersion(name, oldVersion)
      const newVersion = await getVersion(name, tag)
      if (currentVersion !== newVersion) {
        console.log(
          name +
            ':' +
            ' '.repeat(
              80 - (name + ':' + currentVersion + ' => ' + newVersion).length
            ) +
            currentVersion +
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
    ;(deps[name] || (deps[name] = {}))[owner] = resolveCatalogVersion(
      name,
      dependencies[name]
    )
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
