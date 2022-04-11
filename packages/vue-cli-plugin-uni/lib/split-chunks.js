const path = require('path')

const {
  normalizePath
} = require('@dcloudio/uni-cli-shared')

const subPkgsInfo = Object.values(process.UNI_SUBPACKAGES)
const normalFilter = ({ independent }) => !independent
const independentFilter = ({ independent }) => independent
const map2Root = ({ root }) => root + '/'
const normalSubPackageRoots = subPkgsInfo.filter(normalFilter).map(map2Root)
const independentSubpackageRoots = subPkgsInfo.filter(independentFilter).map(map2Root)

function createCacheGroups () {
  const cacheGroups = {}
  if (process.UNI_CONFUSION) { // 加密
    cacheGroups.confusion = {
      enforce: true,
      test: function (module) {
        if (!module.resource) {
          return false
        }
        if (process.UNI_CONFUSION.includes(normalizePath(module.resource))) {
          return true
        }
        return false
      },
      name: 'app-confusion',
      chunks: 'all'
    }
  }

  process.env.UNI_OPT_SUBPACKAGES && Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
    cacheGroups[root] = {
      enforce: true,
      test: function (module) {
        if (!module.resource) {
          return false
        }
        if (normalizePath(module.resource).includes(root + '/')) {
          return true
        }
        return false
      },
      name: root + '/app-sub-service',
      chunks: 'all'
    }
  })
  return cacheGroups
}

module.exports = function getSplitChunks () {
  const {
    normalizePath
  } = require('@dcloudio/uni-cli-shared')

  if (process.env.UNI_USING_V3) {
    return {
      cacheGroups: createCacheGroups()
    }
  }

  if (!process.env.UNI_USING_COMPONENTS) {
    return {
      cacheGroups: {
        commons: {
          minChunks: 2,
          name: 'common/vendor',
          chunks: 'all'
        }
      }
    }
  }

  const mainPath = normalizePath(path.resolve(process.env.UNI_INPUT_DIR, 'main.'))

  if (!process.env.UNI_OPT_SUBPACKAGES) {
    return {
      chunks (chunk) { // 防止 node_modules 内 vue 组件被 split
        return chunk.name.indexOf('node-modules') !== 0
      },
      cacheGroups: {
        default: false,
        vendors: false,
        commons: {
          test (module) {
            if (module.type === 'css/mini-extract') {
              return false
            }
            if (module.resource && (
              module.resource.indexOf('.vue') !== -1 ||
                module.resource.indexOf('.nvue') !== -1 ||
                normalizePath(module.resource).indexOf(mainPath) === 0 // main.js
            )) {
              return false
            }
            return true
          },
          minChunks: 1,
          name: 'common/vendor',
          chunks: 'all'
        }
      }
    }
  }

  function baseTest (module) {
    if (module.type === 'css/mini-extract') {
      return false
    }
    if (module.resource) {
      const resource = normalizePath(module.resource)
      if (
        resource.indexOf('.vue') !== -1 ||
        resource.indexOf('.nvue') !== -1 ||
        resource.indexOf(mainPath) === 0 // main.js
      ) {
        return false
      }
    }
    return true
  }
  // TODO 独立分包

  const cacheGroups = {
    default: false,
    vendors: false,
    commons: {
      test (module, chunks) {
        if (!baseTest(module)) {
          return false
        }
        const matchSubPackages = findSubPackages(chunks)
        const matchSubPackagesCount = matchSubPackages.size
        const isMainPackage = ( // 非分包 或 两个及以上分包 或 主包内有使用
          matchSubPackagesCount === 0 ||
          matchSubPackagesCount > 1 ||
          (
            matchSubPackagesCount === 1 &&
            hasMainPackage(chunks)
          ) ||
          (
            matchSubPackagesCount === 1 &&
            hasMainPackageComponent(module, matchSubPackages.values().next().value)
          )
        )
        if (isMainPackage && process.env.UNI_OPT_TRACE) {
          console.log('main', module.resource, chunks.map(chunk => chunk.name))
        }
        return isMainPackage
      },
      minSize: 0,
      minChunks: 1,
      name: 'common/vendor',
      chunks: 'all'
    }
  }

  const findSubPackages = function (chunks) {
    return chunks.reduce((pkgs, item) => {
      const name = normalizePath(item.name)
      const pkgRoot = normalSubPackageRoots.find(root => name.indexOf(root) === 0)
      pkgRoot && pkgs.add(pkgRoot)
      return pkgs
    }, new Set())
  }

  const hasMainPackage = function (chunks) {
    return chunks.find(item => !subPackageRoots.find(root => item.name.indexOf(root) === 0))
  }

  const hasMainPackageComponent = function (module, subPackageRoot) {
    if (module.resource && module.reasons) {
      for (let index = 0; index < module.reasons.length; index++) {
        const m = module.reasons[index]

        if (m.module && m.module.resource) {
          const resource = normalizePath(m.module.resource)
          if (
            resource.indexOf('.vue') !== -1 ||
            resource.indexOf('.nvue') !== -1
          ) {
            if (resource.indexOf(subPackageRoot) === -1) {
              if (process.env.UNI_OPT_TRACE) {
                console.log('move module to main chunk:', module.resource,
                  'from', subPackageRoot, 'for component in main package:', resource)
              }

              // 独立分包除外
              const independentRoot = independentSubpackageRoots.find(root => resource.indexOf(root) >= 0)
              if (!independentRoot) {
                return true
              }
            }
          } else {
            return hasMainPackageComponent(m.module, subPackageRoot)
          }
        }
      }
    }
    return false
  }

  const subPackageRoots = Object.keys(process.UNI_SUBPACKAGES).map(root => root + '/')

  Object.keys(process.UNI_SUBPACKAGES).forEach(root => {
    (function (root) {
      cacheGroups[root + '/commons'] = {
        test (module, chunks) {
          if (!baseTest(module)) {
            return false
          }
          const matchSubPackages = findSubPackages(chunks)
          if (
            matchSubPackages.size === 1 &&
            matchSubPackages.has(root + '/') &&
            !hasMainPackage(chunks) &&
            !hasMainPackageComponent(module, matchSubPackages.values().next().value)
          ) {
            if (process.env.UNI_OPT_TRACE) {
              console.log(root, module.resource, chunks.map(chunk => chunk.name))
            }
            return true
          }
        },
        minSize: 0,
        minChunks: 1,
        name: normalizePath(path.join(root, 'common/vendor')),
        chunks: 'all'
      }
    })(root)
  })

  return {
    chunks (chunk) { // 防止 node_modules 内 vue 组件被 split
      return chunk.name.indexOf('node-modules') !== 0
    },
    cacheGroups
  }
}
