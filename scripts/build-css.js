const { readFileSync, outputFileSync } = require('fs-extra')

const { resolve } = require('node:path')


const cssJson = JSON.parse(
  readFileSync(resolve(__dirname, '../packages/uni-nvue-styler/lib/css.json'), 'utf-8')
)

exports.buildCss = () => {

  const entries = []
  cssJson.properties.forEach(item => {
    // 如果存在unixTags字段，则该样式只有unixTags中的标签支持；不存在则所有标签都支持
    if (Array.isArray(item.unixTags) && item.unixTags.length > 0) {
      entries.push(
        `['${item.name}', ${JSON.stringify(item.unixTags)}]`
      )
    }
  })

  outputFileSync(
    resolve(__dirname, '../packages/uni-nvue-styler/src/dom2/css/tags.ts'),
    `// 此文件是根据 css.json 动态生成，请勿手动修改
export const cssMap = new Map<string, string[]>([${entries.join(
      ', '
    )}])`
  )

}