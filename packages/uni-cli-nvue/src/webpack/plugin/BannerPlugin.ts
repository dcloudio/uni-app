import { Compilation, Compiler } from 'webpack'
import { ConcatSource } from 'webpack-sources'
interface BannerPluginOptions {
  banner: string
}
export default class BannerPlugin {
  private banner: () => string
  /**
   * @param {BannerPluginArgument} options options object
   */
  constructor(options: BannerPluginOptions) {
    this.banner = () => options.banner
  }

  /**
   * Apply the plugin
   * @param {Compiler} compiler the compiler instance
   * @returns {void}
   */
  apply(compiler: Compiler) {
    const banner = this.banner
    compiler.hooks.compilation.tap('BannerPlugin', (compilation) => {
      compilation.hooks.processAssets.tap(
        {
          name: 'BannerPlugin',
          stage: Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE_TRANSFER,
        },
        () => {
          for (const chunk of compilation.chunks) {
            if (!chunk.canBeInitial()) {
              continue
            }
            for (const file of chunk.files) {
              const data = {
                chunk,
                filename: file,
              }
              const comment = compilation.getPath(banner, data)
              compilation.updateAsset(
                file,
                (old) => new ConcatSource(comment, '\n', old as any) as any
              )
            }
          }
        }
      )
    })
  }
}
