function parseApis (modules, test) {
  return modules.reduce(function (apis, module) {
    const apiList = module.apiList
    apiList && Object.keys(apiList).forEach(name => {
      if (test(name, apiList[name])) {
        apis.add(name.replace('uni.', ''))
      }
    })
    return apis
  }, new Set())
}

module.exports = {
  parseUserApis (configModules = [], allModules = []) {
    const blackboxApis = parseApis(configModules, function (name, value) {
      return value === false
    })
    const allApis = parseApis(allModules, function () {
      return true
    })
    return [...allApis].filter(name => !blackboxApis.has(name))
  }
}
