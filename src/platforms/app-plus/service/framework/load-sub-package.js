const loadedSubPackages = []

/**
 * 指定路由 ready 后，检查是否触发分包预加载
 * @param {Object} route
 */
export function preloadSubPackages(route) {
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
  const network = options.network || 'wifi'
  if (network === 'wifi') {
    uni.getNetworkType({
      success(res) {
        if (process.env.NODE_ENV !== 'production') {
          console.log('UNIAPP[preloadRule]:' + res.networkType + ':' + JSON.stringify(options))
        }
        if (res.networkType === 'wifi') {
          loadSubPackages(options.packages)
        }
      }
    })
  } else {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[preloadRule]:' + JSON.stringify(options))
    }
    loadSubPackages(options.packages)
  }
}

export function loadPage(route, callback) {
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

function loadSubPackage(root, callback) {
  if (loadedSubPackages.indexOf(root) !== -1) {
    return callback()
  }
  loadSubPackages([root], () => {
    callback()
  })
}

function loadSubPackages(packages, callback) {
  if (process.env.NODE_ENV !== 'production') {
    console.log('UNIAPP[loadSubPackages]:' + JSON.stringify(packages))
  }
  const startTime = Date.now()
  Promise.all(
    packages.map(root => {
      // 目前阶段：假定一定会加载成功
      loadedSubPackages.push(root)
      return uni.loadSubPackage({
        root
      })
    })
  ).then(res => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('UNIAPP[loadSubPackages]:' + (Date.now() - startTime))
    }
    callback && callback(true)
  }).catch(err => {
    console.log(err)
    callback && callback(false)
  })
}
