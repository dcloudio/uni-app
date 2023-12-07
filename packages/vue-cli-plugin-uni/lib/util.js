const fs = require('fs')
const path = require('path')

const {
  pathToGlob
} = require('@dcloudio/uni-cli-shared/lib/util')

let partialIdentifier = false
module.exports = {
  getPartialIdentifier () {
    if (!partialIdentifier) {
      partialIdentifier = {
        UNI_COMPILER_VERSION: require('../package.json').version
      }
      Object.keys(process.env).forEach(name => {
        if (name.indexOf('UNI_') === 0) {
          partialIdentifier[name] = process.env[name]
        }
      })
    }
    return partialIdentifier
  },
  getAutomatorCode () {
    const automator = `@dcloudio/uni-${process.env.UNI_SUB_PLATFORM || process.env.UNI_PLATFORM}/dist/automator`
    return process.env.UNI_AUTOMATOR_WS_ENDPOINT ? `import '${automator}';` : ''
  },
  getWatchOptions () {
    return {
      ignored: [
        pathToGlob(path.resolve(process.env.UNI_INPUT_DIR), '*.md'),
        path.resolve(process.env.UNI_INPUT_DIR, '.hbuilderx'),
        path.resolve(process.env.UNI_INPUT_DIR, '.editorconfig'),
        path.resolve(process.env.UNI_INPUT_DIR, '.gitignore'),
        path.resolve(process.env.UNI_INPUT_DIR, 'LICENSE'),
        path.resolve(process.env.UNI_INPUT_DIR, 'unpackage'),
        path.resolve(process.env.UNI_INPUT_DIR, 'uniCloud-aliyun'),
        path.resolve(process.env.UNI_INPUT_DIR, 'uniCloud-tcb'),
        path.resolve(process.env.UNI_INPUT_DIR, 'cloudfunctions-aliyun'),
        path.resolve(process.env.UNI_INPUT_DIR, 'cloudfunctions-tcb')
      ]
    }
  },
  getTsLoadOptions () {
    const {
      isInHBuilderX // 在 HBuilderX 的插件中
    } = require('@dcloudio/uni-cli-shared')
    const userTsConfigJson = path.resolve(process.env.UNI_INPUT_DIR, 'tsconfig.json')
    const defaultTsConfigJson = path.resolve(process.env.UNI_CLI_CONTEXT, 'tsconfig.json')

    const tsConfigJsonFile = fs.existsSync(userTsConfigJson) ? userTsConfigJson : defaultTsConfigJson

    const context = isInHBuilderX ? process.env.UNI_INPUT_DIR : process.env.UNI_CLI_CONTEXT

    function resolveModule (dir) {
      return path.resolve(process.env.UNI_CLI_CONTEXT, './node_modules', dir)
    }

    return {
      context,
      configFile: tsConfigJsonFile,
      compilerOptions: {
        baseUrl: context,
        typeRoots: [
          resolveModule('@dcloudio/types'),
          resolveModule('@types'),
          path.resolve(process.env.UNI_CLI_CONTEXT, 'types')
        ],
        types: [
          'uni-app',
          'uni-app-vue2',
          'webpack-env'
        ],
        paths: {
          '@/*': [
            path.join(process.env.UNI_INPUT_DIR, '*')
          ],
          vue: [
            resolveModule('vue')
          ],
          vuex: [
            resolveModule('vuex')
          ],
          'vue-class-component': [
            resolveModule('vue-class-component')
          ],
          'vue-property-decorator': [
            resolveModule('vue-property-decorator')
          ],
          tslib: [
            resolveModule('tslib')
          ],
          'mpvue-page-factory': [
            resolveModule('@dcloudio/vue-cli-plugin-uni/packages/mpvue-page-factory')
          ],
          '@vue/composition-api': [
            resolveModule('@dcloudio/vue-cli-plugin-uni/packages/@vue/composition-api')
          ],
          '@dcloudio/uni-app': [
            resolveModule('@dcloudio/uni-app')
          ]
        }
      },
      errorFormatter (error, colors) {
        const messageColor = error.severity === 'warning' ? colors.bold.yellow : colors.bold.red
        const filePath = path.relative(process.env.UNI_INPUT_DIR, error.file).replace('.vue.ts', '.vue')
        if (error.code === 2307 && error.content.includes('.vue')) {
          error.content = error.content.replace('Cannot find module ', '') +
            ' script 节点必须使用 lang="ts",文档参考地址:https://uniapp.dcloud.io/frame?id=vue-ts'
        }
        return messageColor(
          `[tsl] ERROR at ${filePath}:${error.line}
    TS${error.code}:${error.content}`
        )
      }
    }
  }
}
