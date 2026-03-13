const path = require('path')
const fs = require('fs')
const { parseJson } = require('@dcloudio/uni-cli-shared/lib/json')
const { normalizePath } = require('@dcloudio/uni-cli-shared/lib/util')

function getFilterPaths () {
  const inputDir = normalizePath(process.env.UNI_INPUT_DIR)
  const pagesJsonPath = path.join(inputDir, 'pages.json')
  const pagesJson = parseJson(
    fs.readFileSync(pagesJsonPath, 'utf-8'),
    true
  )
  const allPagesJson = parseJson(
    fs.readFileSync(pagesJsonPath, 'utf-8'),
    false
  )

  const pages = pagesJson.pages.map(page =>
    normalizePath(path.join(inputDir, page.path))
  )
  const allPages = allPagesJson.pages.map(page =>
    normalizePath(path.join(inputDir, page.path))
  )

  const subPackages = (pagesJson.subPackages || pagesJson.subpackages || [])
    .map(subPackage =>
      subPackage.pages.map(page =>
        normalizePath(path.join(inputDir, subPackage.root, page.path))
      )
    )
    .flat()
  const allSubPackages = (
    allPagesJson.subPackages ||
    allPagesJson.subpackages ||
    []
  )
    .map(subPackage =>
      subPackage.pages.map(page =>
        normalizePath(path.join(inputDir, subPackage.root, page.path))
      )
    )
    .flat()
  const EXTNAME_VUE = ['.vue', '.nvue']
  const filterFiles = [
    ...allPages.filter(page => !pages.includes(page)),
    ...allSubPackages.filter(page => !subPackages.includes(page))
  ]
    .map(file => EXTNAME_VUE.map(ext => file + ext))
    .flat()
  return filterFiles
}

module.exports = {
  getFilterPaths
}
