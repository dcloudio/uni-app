export const loadedSubPackages = []

/**
 * 指定路由 ready 后，检查是否触发分包预加载
 * @param {Object} route
 */
export function preloadSubPackages (route) {
  if (!__uniConfig.preloadRule) {
    return
  }
  const options = __uniConfig.preloadRule[route]
  if (!options || !Array.isArray(options.packages)) {
    return
  }
  const packages = options.packages.filter(root => loadedSubPackages.indexOf(root) === -1)
  if (!packages.length) {
    return
  }
  loadSubPackages(options.packages)
  // 暂不需要网络下载
  // const network = options.network || 'wifi'
  // if (network === 'wifi') {
  //   uni.getNetworkType({
  //     success (res) {
  //       if (process.env.NODE_ENV !== 'production') {
  //         console.log('UNIAPP[preloadRule]:' + res.networkType + ':' + JSON.stringify(options))
  //       }
  //       if (res.networkType === 'wifi') {
  //         loadSubPackages(options.packages)
  //       }
  //     }
  //   })
  // } else {
  //   if (process.env.NODE_ENV !== 'production') {
  //     console.log('UNIAPP[preloadRule]:' + JSON.stringify(options))
  //   }
  //   loadSubPackages(options.packages)
  // }
}

export function loadPage (route, callback) {
  let isInSubPackage = false
  const subPackages = __uniConfig.subPackages
  if (Array.isArray(subPackages)) {
    const subPackage = subPackages.find(subPackage => route.indexOf(subPackage.root) === 0)
    if (subPackage) {
      isInSubPackage = true
      loadSubPackage(subPackage.root, callback)
    }
  }
  if (!isInSubPackage) {
    callback()
  }
}

function loadSubPackage (root, callback) {
  if (loadedSubPackages.indexOf(root) !== -1) {
    return callback()
  }
  loadSubPackages([root], () => {
    callback()
  })
}

const SUB_FILENAME = 'app-sub-service.js'

function evaluateScriptFiles (files, callback) {
  __uniConfig.onServiceReady(() => {
    weex.requireModule('plus').evalJSFiles(files, callback)
  })
}

function loadSubPackages (packages, callback) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('UNIAPP[loadSubPackages]:' + JSON.stringify(packages))
  }
  const startTime = Date.now()
  evaluateScriptFiles(packages.map(root => {
    loadedSubPackages.push(root)
    return root + '/' + SUB_FILENAME
  }), res => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[loadSubPackages]:耗时(' + (Date.now() - startTime) + ')')
    }
    callback && callback(true)
  })
}
