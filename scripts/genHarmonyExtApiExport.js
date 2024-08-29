const fs = require('fs')
const path = require('path')
const parser = require("@babel/parser")
const BLACKLIST = [
  'initUniExtApi',
]

const harmonyDistDir = path.resolve(__dirname, '../packages/uni-app-harmony/dist')
const autoImportMap = {
  '@dcloudio/uni-app-runtime': path.resolve(harmonyDistDir, 'uni.api.ets')
}

function initAutoImportMap() {
  const providersDir = path.resolve(harmonyDistDir, 'providers')
  if (!fs.existsSync(providersDir)) {
    return
  }
  const providers = fs.readdirSync(providersDir)
  providers.forEach(provider => {
    const providerEntryFilePath = path.resolve(providersDir, provider, 'index.ets')
    if (!fs.existsSync(providerEntryFilePath)) {
      return
    }
    autoImportMap[`@dcloudio/uni-app-runtime/src/main/ets/uni-app-harmony/providers/${provider}`] = providerEntryFilePath
  })
}

function getExportList(filePath) {
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

exports.genHarmonyExtApiExport = function () {
  initAutoImportMap()
  const result = {}
  Object.keys(autoImportMap).forEach(key => {
    result[key] = getExportList(autoImportMap[key])
  })
  return result
}