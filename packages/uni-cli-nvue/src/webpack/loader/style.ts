import { LoaderContext } from 'webpack'
import { genStyle } from '../../utils'

function styleLoader(this: LoaderContext<{}>, content: string, map: any) {
  this.callback(null, 'module.exports = ' + genStyle(content, this), map)
}

export default styleLoader
