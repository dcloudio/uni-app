import fs from 'fs-extra'
import path from 'path'
import { sync } from 'fast-glob'

function resolve(file: string) {
  return path.resolve(__dirname, file)
}

const uniComponentsPath = resolve('../packages/uni-components')
const libXPath = path.resolve(uniComponentsPath, './lib-x')
const libXVaporPath = path.resolve(uniComponentsPath, './lib-x-vapor')

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
          // 查找 ${originName}.vue 或 ${originName}.uvue
          const originComponentPath = ['.vue', '.uvue']
            .map(ext => path.join(componentsDir, `${component.originName}${ext}`))
            .find(p => fs.existsSync(p))
          const targetPaths = [
            path.resolve(libXPath, component.targetName),
            path.resolve(libXVaporPath, component.targetName),
          ]

          targetPaths.forEach((targetPath) => {
            // 将 ${originName}.(vue|uvue) 改名复制为 ${targetName}.vue
            if (originComponentPath) {
              const targetFilePath = path.resolve(targetPath, `${component.targetName}.vue`)
              fs.copySync(originComponentPath, targetFilePath)
            }

            // 复制 uni-${originName}/components 中的其他内容，跳过 originName.(vue|uvue)
            if (fs.existsSync(componentsDir)) {
              const originNames = new Set([`${component.originName}.vue`, `${component.originName}.uvue`])
              sync(path.join(componentsDir, '*')).forEach(itemPath => {
                const itemName = path.basename(itemPath)
                if (!originNames.has(itemName)) {
                  const targetItemPath = path.resolve(targetPath, itemName)
                  fs.copySync(itemPath, targetItemPath)
                }
              })
            }
          })
        })
      })
    })
  } catch (error) {
    console.error('[syncExtComponentFile] sync ext component file error:', error)
  }
}
