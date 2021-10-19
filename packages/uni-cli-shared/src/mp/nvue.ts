import fs from 'fs'
import path from 'path'
import { getNVueFlexDirection } from '../json/app/manifest/nvue'
export function genNVueCssCode(manifestJson: Record<string, any>) {
  let nvueCssCode = fs.readFileSync(
    path.resolve(__dirname, '../../lib/nvue.css'),
    'utf8'
  )
  const flexDirection = getNVueFlexDirection(manifestJson)
  if (flexDirection !== 'column') {
    nvueCssCode = nvueCssCode.replace('column', flexDirection)
  }
  return nvueCssCode
}
