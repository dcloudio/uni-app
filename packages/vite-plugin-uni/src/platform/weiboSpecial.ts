import { readFileSync, writeFileSync, copySync, emptyDirSync } from 'fs-extra'
import path from 'path'

export function formatWeiboHtml(): void {
  const html = readFileSync(
    path.join(process.env.UNI_OUTPUT_DIR, 'index.html'),
    'utf-8'
  )
  const moduleRegex = /(<script type="module").*(<\/script>)/g
  const noModuleRegex = /<script nomodule/g
  const crossoriginRegex = /crossorigin/g
  let newHtml = html
    .replace(moduleRegex, '')
    .replace(noModuleRegex, '<script')
    .replace(crossoriginRegex, '')
  writeFileSync(
    path.join(process.env.UNI_OUTPUT_DIR, 'index.html'),
    newHtml,
    'utf-8'
  )
}
export function copyWeiboSrc(inputDir: string): void {
  const fileDIR = path.join(process.cwd(), 'src')
  emptyDirSync(fileDIR)
  copySync(path.resolve(inputDir), fileDIR)
}
