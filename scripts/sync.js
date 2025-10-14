const path = require('path')
const fs = require('fs-extra')
// const { sync } = require('fast-glob')
const { config } = require('dotenv')
config()
if (process.env.UNI_APP_SYNTAX_DIR) {
  fs.copySync(path.resolve(process.env.UNI_APP_SYNTAX_DIR, 'uts/common'), path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uts/common'))
  fs.copySync(path.resolve(process.env.UNI_APP_SYNTAX_DIR, 'uts/app-android'), path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/app-android'))
  fs.copySync(path.resolve(process.env.UNI_APP_SYNTAX_DIR, 'uts/app-ios'), path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/app-ios'))
  fs.copySync(path.resolve(process.env.UNI_APP_SYNTAX_DIR, 'uts/app-js'), path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/app-js'))
}
// 不再需要同步 vue 的类型，DOM2仓库会同步
// if (process.env.UNI_APP_VUE_TYPES_DIR) {
//   ['reactivity', 'runtime-core', 'shared'].forEach(pkg => {
//     const fileName = pkg + '/dist/' + pkg + '.d.ts'
//     fs.copySync(
//       path.resolve(process.env.UNI_APP_VUE_TYPES_DIR, 'packages', fileName),
//       path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/@vue', fileName)
//     )
//   })
// }

// if (process.env.UNI_APsP_ANDROID_TYPES_DIR) {
//   const globals = ['kotlin/Comparable', 'kotlin/Byte', 'kotlin/UByte', 'kotlin/Short', 'kotlin/UShort', 'kotlin/Int', 'kotlin/UInt', 'kotlin/Long', 'kotlin/ULong', 'kotlin/Float', 'kotlin/Double']

//   const inputDir = path.resolve(process.env.UNI_APP_ANDROID_TYPES_DIR)
//   const outputDir = path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/app-android/global')
//   let references = []
//   globals.forEach(g => {
//     references.push(g + '.d.ts');
//     [g, g + '.d.ts'].forEach(file => {
//       const inputFile = path.resolve(inputDir, file)
//       const outputFile = path.resolve(outputDir, file)
//       if (fs.existsSync(inputFile)) {
//         fs.copySync(inputFile, outputFile)
//       }
//     })
//   })
//   fs.outputFileSync(
//     path.resolve(outputDir, 'index.d.ts'),
//     `${references.map(r => `/// <reference path="./${r}" />`).join('\n')}
// `
//   )
// }


// process.env.UNI_APP_TYPES_APP_ANDROID = '/Applications/HBuilderX-Dev.app/Contents/HBuilderX/plugins/uts-development-android/uts-types/app-android'
// const androidPaths = {}
// sync('**/*.d.ts', {
//   cwd: process.env.UNI_APP_TYPES_APP_ANDROID, ignore: [
//     // '*.d.ts',
//     // 'uts',
//     // 'dc',
//     // 'io',
//     // '**/dcloud/**/*',
//     // '**/weex/**/*',
//     // '**/bindingx/**/*',
//   ]
// })
//   .forEach(file => {
//     const dirname = path.dirname(file).replace(/\\/g, '/')
//     // 白名单：
//     if (!['android', 'androidx', 'java', 'javax', 'kotlin', 'kotlinx'].some((name) => dirname.startsWith(name + '/'))) {
//       return
//     }
//     const packageName = dirname.replace(/\//g, '.')
//     if (androidPaths[packageName]) {
//       return
//     }
//     androidPaths[packageName + '.*'] = [`${dirname}/*.d.ts`]

//   })
// console.log('app-android paths', Object.keys(androidPaths).length)
// fs.outputFileSync(
//   path.resolve(__dirname, '../packages/uni-uts-v1/lib/uts/types/uni-x/app-android/paths.json'),
//   JSON.stringify(androidPaths, null, 2)
// )

const hyphenateRE = /\B([A-Z])/g
function hyphenate(str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
}

async function syncDom2UniCSSPropertyID() {
  const uniAppXDir = path.dirname(require.resolve('@dcloudio/uni-app-x'))
  const UniCSSPropertyFilename = path.resolve(uniAppXDir, 'types', 'dom2', 'UniCSSProperty.d.ts')
  const UniCSSPropertyContent = fs.readFileSync(UniCSSPropertyFilename, 'utf-8')
  const { parse } = require('../packages/uts/dist')
  const ast = await parse(UniCSSPropertyContent)
  const properties = []
  for (const item of ast.body) {
    if (item.type === 'ExportDeclaration') {
      if (item.declaration.type === 'TsEnumDeclaration' && item.declaration.id.value === 'UniCSSPropertyID') {
        item.declaration.members.forEach(member => {
          // 将首字母小写，驼峰转连字符
          properties.push(hyphenate(member.id.value))
        })
      }
    }
  }
  fs.outputFileSync(path.resolve(__dirname, '../packages/uni-nvue-styler/lib/dom2/properties.json'), JSON.stringify(properties, null, 2))
}
syncDom2UniCSSPropertyID()