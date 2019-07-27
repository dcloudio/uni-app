const Path = require('path')

let uid = 0

function getUID () {
  return uid++
}

function genImportCode (name, path) {
  return `import * as ${name} from '${path}';\n`
}

function genPropsCode (key, value) {
  return `'${key}': ${value},\n`
}

module.exports = function genRequireCode (baseDirname, modules) {
  const uid = getUID()
  let importCode = ''
  let moduleProps = ''

  modules.forEach((file, index) => {
    const moduleName = `require_context_module_${uid}_${index}`

    const moduleAbsolutePath = Path.resolve(baseDirname, file).replace(/\\/g, '/')
    importCode += genImportCode(moduleName, moduleAbsolutePath)
    moduleProps += genPropsCode(file, moduleName)
  })
  const requireFnCode = (`
  (function() {
    var map = {
      ${moduleProps}
    };
    var req = function req(key) {
      return map[key] || (function() { throw new Error("Cannot find module '" + key + "'.") }());
    }
    req.keys = function() {
      return Object.keys(map);
    }
    return req;
  })()
`)

  return {
    importCode,
    requireFnCode
  }
}
