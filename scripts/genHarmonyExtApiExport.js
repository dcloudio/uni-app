const fs = require('fs')
const path = require('path')
const parser = require("@babel/parser")
const BLACKLIST = [
  'initUniExtApi',
  'initUniComponentExtApi'
]

function initAutoImportMap (isUniAppX = false) {
  const harmonyDistDir = path.resolve(__dirname, '../packages/uni-app-harmony', isUniAppX ? 'dist-x' : 'dist')
  const autoImportMap = isUniAppX ? {
    [path.resolve(harmonyDistDir, 'uni.api.ets')]: '@dcloudio/uni-app-x-runtime'
  } : {
    [path.resolve(harmonyDistDir, 'uni.api.ets')]: '@dcloudio/uni-app-runtime'
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
    autoImportMap[packageEntryFilePath] = `@uni_modules/${package.toLowerCase()}`
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
            const exportName = specifier.exported.name
            if (!BLACKLIST.includes(exportName)) {
              exportNames.push([exportName])
            }
          }
        })
      } else if (node.declaration) {
        const exportName = node.declaration.id.name
        if (!BLACKLIST.includes(exportName)) {
          exportNames.push([exportName])
        }
      }
    }
  })
  return exportNames
}

exports.genHarmonyExtApiExport = function (isUniAppX = false) {
  const autoImportMap = initAutoImportMap(isUniAppX)
  const result = {}
  for (const fileName in autoImportMap) {
    const packageName = autoImportMap[fileName]
    result[packageName] = result[packageName] || []
    result[packageName].push(...getExportList(fileName))
  }
  return result
}