const mediaQuerys = []

module.exports = {
  splitMediaPlugin: function (root, result) {
    root.walkAtRules(rule => {
      if (rule.params.indexOf('prefers-color-scheme') !== -1) {
        root.removeChild(rule)

        mediaQuerys.push(rule)
      }
    })
  },
  generateMediaQuerys: function ({ outputDir, filename = 'index.dark.css' }) {
    if (mediaQuerys.length) {
      const fs = require('fs')
      const path = require('path')
      const postcss = require('postcss')
      const uglifycss = require('uglifycss')

      const mediaRoot = postcss.root()
      mediaRoot.append(mediaQuerys.sort((a, b) => a.source.input.file > b.source.input.file ? 1 : -1))

      fs.writeFileSync(
        path.resolve(outputDir, filename),
        uglifycss.processString(mediaRoot.toResult().css),
        { encoding: 'utf-8', flag: 'w+' }
      )
    }
  }
}
