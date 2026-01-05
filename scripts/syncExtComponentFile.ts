import fs from 'fs-extra'
import path from 'path'
import { sync } from 'fast-glob'
import { parse } from '@vue/compiler-sfc'


function resolve(file: string) {
  return path.resolve(__dirname, file)
}

// 暂只 sync loading 组件，如果其他组件也需要，还需要配置内置组件等
interface syncExtComponentOptions {
  name?: string
  index?: string
  css?: string
  dir?: string
  preContext: unknown
  path?: string
  libX?: syncExtComponentOptions
}
type Platform = 'web' | 'mp-weixin' | 'mp-alipay'

const uniComponentsPath = resolve('../packages/uni-components')
const uniComponentsStyleXPath = path.resolve(uniComponentsPath, './style-x')

const syncExtComponents: Record<string, { web?: syncExtComponentOptions, 'mp'?: syncExtComponentOptions }> = {
  'uni-loading': {
    web: {
      name: 'Loading',
      path: path.resolve(uniComponentsPath, './src/vue'),
      dir: 'loading',
      index: 'index-x',
      css: 'loading',
      preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: false, MP_WEIXIN: false, H5: true, WEB: true }
    },
    ['mp']: {
      preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: true, H5: false, WEB: false },
      libX: {
        path: path.resolve(uniComponentsPath, './lib-x'),
        dir: 'uniloading',
        index: 'uniloading',
        preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: true, H5: false, WEB: false },
      }
    }
  }
}
interface ScriptContent {
  import: string
  content: string
}
function createVueSFCCode(name: string, templateContent: string, scriptContent: ScriptContent) {
  return `<script setup lang="ts">
${scriptContent.import}

${scriptContent.content}
</script>

<template>
${templateContent}
</template>
`
}
export function syncExtComponentFile(apiDirs: string[], platform: Platform = 'web') {
  const { preprocess } = require('../packages/uni-preprocess')
  try {
    apiDirs.forEach((apiDir) => {
      const extComponentDir = apiDir
      Object.keys(syncExtComponents).forEach(componentName => {
        sync(path.join(extComponentDir, `./${componentName}/package.json`)).forEach(packageJsonPath => {
          const packageJson = fs.readJsonSync(packageJsonPath, { encoding: 'utf-8' })

          const componentOptions = syncExtComponents[componentName]
          const platforms = Object.keys(componentOptions)

          let syncExtComponentOption = componentOptions[platform as Platform]
          const supported = packageJson['uni_modules']?.components[platform]

          if ((supported === true || typeof supported === 'undefined') && syncExtComponentOption) {
            const componentPath = path.resolve(packageJsonPath, '../components')
            sync(path.join(componentPath, '**')).forEach(filePath => {
              const { name: buildInComponentName, ext, dir } = path.parse(path.relative(componentPath, filePath))
              switch (ext) {
                case '.uvue':
                case '.vue': {
                  const originCode = fs.readFileSync(filePath, { encoding: 'utf-8' })
                  if (syncExtComponentOption.name) {
                    let vueCode = preprocess(
                      preprocess(originCode, { type: 'html', context: syncExtComponentOption.preContext }).code,
                      { type: 'js', context: syncExtComponentOption.preContext }
                    ).code
                    const sfcParseResult = parse(vueCode)
                    if (sfcParseResult.errors.length) {
                      console.error(`[uni-h5 (syncExtComponentFile)] ${componentName} parse ${filePath} error:`, sfcParseResult.errors)
                      return
                    } else {
                      const descriptor = sfcParseResult.descriptor
                      let scriptSetupContent = descriptor.scriptSetup?.content || ''
                      let scriptContent = descriptor.script?.content || ''
                      const parseScriptContent: ScriptContent = { import: '', content: '' }
                      if (scriptSetupContent.length) {
                        const regex = /^\s*(import[\s\S]*?from\s+['"][\s\S]*?['"];?)/gm

                        const imports: string[] = []
                        let execResult
                        while (execResult = regex.exec(scriptSetupContent)) {
                          const importStr = execResult[1]
                          imports.push(importStr)
                          scriptSetupContent = scriptSetupContent.replace(execResult[0], '')
                          regex.lastIndex = 0
                        }
                        parseScriptContent.import = imports.join('\n')
                        parseScriptContent.content = scriptSetupContent
                      } else if (scriptContent.length) {
                        parseScriptContent.content = scriptContent
                      }
                      const finalVueCode = createVueSFCCode(syncExtComponentOption.name!, descriptor.template?.content || '', parseScriptContent)
                      if (syncExtComponentOption.path) {
                        fs.outputFileSync(path.resolve(syncExtComponentOption.path, `${syncExtComponentOption.dir ?? dir}/${syncExtComponentOption.index ?? buildInComponentName}.vue`), finalVueCode)
                      }
                      fs.outputFileSync(path.resolve(uniComponentsStyleXPath, `${syncExtComponentOption.css ?? buildInComponentName}.css`), descriptor.styles.map(styleBlock => styleBlock.content).join('\n'))
                    }
                  }
                  // libX 暂只支持 .vue 文件
                  const libX = syncExtComponentOption.libX
                  if (libX) {
                    let vueCode = preprocess(
                      preprocess(originCode, { type: 'html', context: libX.preContext }).code,
                      { type: 'js', context: libX.preContext }
                    ).code
                    if (libX.path) {
                      fs.outputFileSync(path.resolve(libX.path, `${libX.dir ?? buildInComponentName}/${libX.index ?? buildInComponentName}.vue`), vueCode)
                    }
                  }
                  break;
                }
                case '.ts':
                case '.js':
                case '.uts': {
                  const { name, ext } = path.parse(filePath)
                  const originCode = fs.readFileSync(filePath, { encoding: 'utf-8' })
                  const preCode = preprocess(
                    originCode,
                    {
                      type: 'js',
                      context: syncExtComponentOption.preContext
                    }
                  ).code

                  const _path = syncExtComponentOption.path || syncExtComponentOption.libX.path
                  const _dir = syncExtComponentOption.dir || syncExtComponentOption.libX.dir
                  if (_path) {
                    fs.outputFileSync(
                      path.resolve(_path, `${_dir ?? dir}/${name}.ts`),
                      preCode
                    )
                  }
                  break;
                }
              }
            })
          }

        })
      })
    })
  } catch (error) {
    console.error('[uni-h5 (syncExtComponentFile)] sync ext component file error:', error)
  }
}
