import fs from 'fs-extra'
import path from 'path'
import { sync } from 'fast-glob'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const uniComponentsPath = resolve('../packages/uni-components')
const libXPath = path.resolve(uniComponentsPath, './lib-x')

const components = [{
  originName: 'loading',
  targetName: 'uniloading'
}]

export function syncExtComponentFile(apiDirs: string[]) {
  try {
    apiDirs.forEach((apiDir) => {
      components.forEach((component) => {
        // 查找 uni-${originName} 组件
        const componentDir = `uni-${component.originName}`
        sync(path.join(apiDir, `./${componentDir}/package.json`)).forEach(packageJsonPath => {
          const componentsDir = path.resolve(packageJsonPath, '../components', component.originName)
          const originComponentPath = path.join(componentsDir, `${component.originName}.vue`)
          const targetPath = path.resolve(libXPath, component.targetName)

          // 复制 uni-${originName}/components/${originName}/${originName}.vue 到 targetPath/${targetName}.vue
          if (fs.existsSync(originComponentPath)) {
            const targetFilePath = path.resolve(targetPath, `${component.targetName}.vue`)
            fs.copySync(originComponentPath, targetFilePath)
          }

          // 复制 uni-${originName}/components 中的其他内容
          if (fs.existsSync(componentsDir)) {
            sync(path.join(componentsDir, '*')).forEach(itemPath => {
              const itemName = path.basename(itemPath)
              // 跳过已经处理过的 originName 目录
              if (itemPath !== originComponentPath) {
                const targetItemPath = path.resolve(targetPath, itemName)
                fs.copySync(itemPath, targetItemPath)
              }
            })
          }
        })
      })
    })
  } catch (error) {
    console.error('[syncExtComponentFile] sync ext component file error:', error)
  }
}
