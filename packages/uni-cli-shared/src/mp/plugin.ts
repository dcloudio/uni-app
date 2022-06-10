import { UniViteCopyPluginTarget } from '../vite/plugins/copy'
import { parseJson } from '../json/json'


/**
 * 小程序插件配置文件（`plugin.json`），仅含微信小程序插件、支付宝小程序插件
 *
 * @tutorial {@link https://opendocs.alipay.com/mini/plugin/plugin-development}
 * @tutorial {@link https://developers.weixin.qq.com/miniprogram/dev/framework/plugin/development.html#%E6%8F%92%E4%BB%B6%E9%85%8D%E7%BD%AE%E6%96%87%E4%BB%B6}
 */
interface MiniProgramPluginConfig {
    /** 所有向小程序开放的页面（支付宝） */
    publicPages?: Record<string, string>;

    /** 插件所有页面（支付宝：包含向小程序开放的以及不向小程序开放的页面，微信：向小程序开放的所有页面） */
    pages?: Record<string, string> | string[];

    /** 面向第三方小程序的 js 接口 */
    main?: string;

    /** 所有向小程序开放的自定义组件 */
    publicComponents?: Record<string, string>;
}

export const copyMiniProgramPluginJson: UniViteCopyPluginTarget = {
  src: ['plugin.json'],
  get dest() {
    return process.env.UNI_OUTPUT_DIR
  },
  transform(source) {
    const pluginConfig = parseJson<MiniProgramPluginConfig>(source.toString(), true)

    // 在此认为`plugin.json`格式都为微信小程序插件的格式！要额外处理的只有支付宝小程序插件！
    if (process.env.UNI_PLATFORM === 'mp-alipay') {
        if (pluginConfig.pages) {
            if (!Array.isArray(pluginConfig.pages)) {
                if (!pluginConfig.publicPages) {
                    pluginConfig.publicPages = pluginConfig.pages;
                }
                pluginConfig.pages = Object.values(pluginConfig.pages);
            }
        }
    }

    return JSON.stringify(pluginConfig, null, 2)
  },
}
