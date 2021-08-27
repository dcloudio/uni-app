import { LoaderContext } from 'webpack'
import {
  preNVueJs,
  preNVueCss,
  preNVueHtml,
  preNVueJson,
} from '@dcloudio/uni-cli-shared'
import { normalizePreprocessErrMsg } from '../../utils/preprocess'
const utils = require('loader-utils')
function preprocessLoader(this: LoaderContext<{}>, content: string, map: any) {
  if (!content.includes('#endif')) {
    return this.callback(null, content, map)
  }
  const types: ('js' | 'html' | 'css' | 'json')[] = utils.getOptions(this)
    .type || ['js']
  const resourcePath = this.resourcePath
  types.forEach((type) => {
    try {
      content = preContent(type, content)
    } catch (e) {
      console.error(normalizePreprocessErrMsg(type, resourcePath))
    }
  })
  this.callback(null, content, map)
}

function preContent(
  type: 'js' | 'html' | 'css' | 'json' | string,
  content: string
) {
  switch (type) {
    case 'js':
      return preNVueJs(content)
    case 'html':
      return preNVueHtml(content)
    case 'css':
      return preNVueCss(content)
    case 'json':
      return preNVueJson(content)
  }
  return content
}
export default preprocessLoader
