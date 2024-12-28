const fs = require('fs')
const path = require('path')
const parser = require("@babel/parser")
const BLACKLIST = [
  'initUniExtApi',
]

function initAutoImportMap (isUniAppX = false) {
  const harmonyDistDir = path.resolve(__dirname, '../packages/uni-app-harmony', isUniAppX ? 'dist-x' : 'dist')
  const autoImportMap = isUniAppX ? {
    '@dcloudio/uni-app-x-runtime': path.resolve(harmonyDistDir, 'uni.api.ets')
  } : {
    '@dcloudio/uni-app-runtime': path.resolve(harmonyDistDir, 'uni.api.ets')
  }
  const ohpmPageckageDir = path.resolve(harmonyDistDir, 'packages')
  if (!fs.existsSync(ohpmPageckageDir)) {
    return autoImportMap
  }
  const packages = fs.readdirSync(ohpmPageckageDir)
  packages.forEach(package => {
    const packageEntryFilePath = path.resolve(ohpmPageckageDir, package, 'utssdk/app-harmony/index.ets')
    if (!fs.existsSync(packageEntryFilePath)) {
      return
    }
    autoImportMap[`@uni_modules/${package.toLowerCase()}`] = packageEntryFilePath
  })
  return autoImportMap
}

function getExportList (filePath) {
  const file = fs.readFileSync(filePath, 'utf-8')
  const ast = parser.parse(file, {
    sourceType: 'module',
    plugins: ['typescript'],
  })
  const exportNames = []
  ast.program.body.forEach(node => {
    if (node.type === 'ExportNamedDeclaration') {
      if (node.specifiers && node.specifiers.length) {
        node.specifiers.forEach(specifier => {
          if (specifier.exported) {
            exportNames.push([specifier.exported.name])
          }
        })
      } else if (node.declaration) {
        exportNames.push([node.declaration.id.name])
      }
    }
  })
  return exportNames.filter(name => !BLACKLIST.includes(name))
}

exports.genHarmonyExtApiExport = function (isUniAppX = false) {
  const autoImportMap = initAutoImportMap(isUniAppX)
  const result = {}
  Object.keys(autoImportMap).forEach(key => {
    result[key] = getExportList(autoImportMap[key])
  })
  return result
}