import { LoaderContext } from 'webpack'
import { preJs, preCss, preHtml, preJson } from '@dcloudio/uni-cli-shared'
import { normalizePreprocessErrMsg } from '../../utils/preprocess'
const utils = require('loader-utils')
function preprocessLoader(this: LoaderContext<{}>, content: string, map: any) {
  if (content.indexOf('#ifdef') === -1) {
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
      return preJs(content)
    case 'html':
      return preHtml(content)
    case 'css':
      return preCss(content)
    case 'json':
      return preJson(content)
  }
  return content
}
export default preprocessLoader
