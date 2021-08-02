import { LoaderContext } from 'webpack'

const loaderUtils = require('loader-utils')

function recyclableLoader(this: LoaderContext<{}>, content: string, map: any) {
  const vueLoaderOptions = this.loaders.find(
    (loader) => loader.ident === 'vue-loader-options'
  )
  if (vueLoaderOptions) {
    const params = loaderUtils.parseQuery(this.resourceQuery)
    if (params.recyclable) {
      ;(vueLoaderOptions as any).options.compilerOptions.recyclable = true
    }
  } else {
    throw new Error('vue-loader-options parse error')
  }

  this.callback(null, content, map)
}

export default recyclableLoader
