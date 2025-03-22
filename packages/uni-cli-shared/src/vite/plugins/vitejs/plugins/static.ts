import fs from 'fs'
import path from 'path'
import { normalizePath } from '../utils'
import { parseJson } from '../../../../json/json'

const uniModulesStaticRe = /^uni_modules\/[^/]+\/static\//
export function createIsStaticFile() {
  let subPackageStatics: string[] = []
  const pagesFilename = path.join(process.env.UNI_INPUT_DIR, 'pages.json')
  if (fs.existsSync(pagesFilename)) {
    const pagesJson = parseJson(
      fs.readFileSync(pagesFilename, 'utf8'),
      true,
      pagesFilename
    ) as UniApp.PagesJson
    subPackageStatics = (pagesJson.subPackages || pagesJson.subpackages || [])
      .filter((subPackage) => subPackage.root)
      .map((subPackage) => {
        return normalizePath(path.join(subPackage.root, 'static')) + '/'
      })
  }
  return function isStaticFile(relativeFile: string): boolean {
    if (path.isAbsolute(relativeFile)) {
      relativeFile = normalizePath(
        path.relative(process.env.UNI_INPUT_DIR, relativeFile)
      )
    }
    return (
      relativeFile.startsWith('static/') ||
      uniModulesStaticRe.test(relativeFile) ||
      subPackageStatics.some((s) => relativeFile.startsWith(s))
    )
  }
}

let isStaticFile: (file: string) => boolean
export function getIsStaticFile() {
  if (!isStaticFile) {
    isStaticFile = createIsStaticFile()
  }
  return isStaticFile
}
