const { readFileSync, outputFileSync } = require('fs-extra')

const { resolve } = require('node:path')


const cssJson = JSON.parse(
  readFileSync(resolve(__dirname, '../packages/uni-nvue-styler/lib/css.json'), 'utf-8')
)

function camelize(str) {
  return str.replace(/-(\w)/g, (_, c) => (c ? c.toUpperCase() : ''))
}

exports.buildCss = () => {

  const entries = []
  cssJson.properties.forEach(item => {
    // 如果存在unixTags字段，则该样式只有unixTags中的标签支持；不存在则所有标签都支持
    if (Array.isArray(item.unixTags) && item.unixTags.length > 0) {
      const tags = item.unixTags.map(tag => tag.toUpperCase())
      // 提前格式化好告警信息所需的格式，提高运行时性能
      const tagsString = item.unixTags
        .map(item => `<${item.toLowerCase()}>`)
        .join(`|`)
      entries.push(
        `new Array<any | null>('${camelize(
          item.name
        )}', new Array<any>(new Array<string>(${tags
          .map(tag => `"${tag}"`)
          .join(', ')}), ${JSON.stringify(tagsString)}))`
      )
    }
  })

  outputFileSync(
    resolve(__dirname, '../packages/uni-nvue-styler/src/dom2/css/tags.ts'),
    `// 此文件是根据 css.json 动态生成，请勿手动修改
// @ts-expect-error
export const cssMap = new Map<string, any[]>(new Array<Array<any | null>>(${entries.join(
      ', '
    )}))`
  )

}