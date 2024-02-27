interface CreatePushMessageOptions {
  /**
   * 是否覆盖上一次提示的消息
   * 可取值true或false，true为覆盖，false不覆盖，默认为permission中设置的cover值
   * Android - ALL (支持)
   * iOS - 5.0+ (不支持): 不支持覆盖消息，只能创建新的消息。
   */
  cover?: boolean
  /**
   * 提示消息延迟显示的时间
   * 当设备接收到推送消息后，可不立即显示，而是延迟一段时间显示，延迟时间单位为s，默认为0s，立即显示。
   */
  delay?: number
  /**
   * 推送消息的图标
   * 本地图片地址，相对路径 - 相对于当前页面的host位置，如"a.jpg"，注意当前页面为网络地址则不支持； 绝对路径 - 系统绝对路径，如Android平台"/sdcard/logo.png"，此类路径通常通过其它5+ API获取的； 扩展相对路径URL(RelativeURL) - 以"_"开头的相对路径，如"_www/a.jpg"； 本地路径URL - 以“file://”开头，后面跟随系统绝对路径。
   * Android - 2.3+ (支持)
   * iOS - ALL (不支持): 不支持自定义图片，固定使用应用图标。
   */
  icon?: string
  /**
   * 推送消息的提示音
   * 显示消息时的播放的提示音，可取值： “system”-表示使用系统通知提示音； “none”-表示不使用提示音； 默认值为“system”。
   * Android - 2.3+ (支持)
   * iOS - 5.1+ (支持): 当程序在前台运行时，提示音不生效。 注：通常应该设置延迟时间，当程序切换到后台才创建本地推送消息时生效。
   */
  sound?: 'system' | 'none'
  /**
   * 推送消息的标题
   * 在系统消息中心显示的通知消息标题，默认值为程序的名称。
   * Android - ALL (支持)
   * iOS - 5.0+ (不支持): 不支持设置消息的标题，固定为程序的名称。
   */
  title?: string // 推送消息的标题
  /**
   * 消息显示的内容，在系统通知中心中显示的文本内容。
   */
  content: string
  /**
   * 消息承载的数据，可根据业务逻辑自定义数据格式。
   */
  payload?: unknown
  /**
   * 直达的页面路径
   * 支持普通页面和tabBar页面，普通页面支持通过`?param1=value1`方式传参（tabBar页面不支持）
   */
  path?: string
  /**
   * 消息上显示的提示时间
   * 默认为当前时间，如果延迟显示则使用延时后显示消息的时间。
   * Android - ALL (支持)
   * iOS - 5.0+ (不支持): 不支持设定消息的显示时间，由系统自动管理消息的创建时间。
   */
  when?: Date
  /**
   * 接口调用成功的回调函数
   */
  success?: (result: unknown) => void
  /**
   * 接口调用失败的回调函数
   */
  fail?: (result: unknown) => void
  /**
   * 接口调用结束的回调函数（调用成功、失败都会执行）
   */
  complete?: (result: unknown) => void
}
export const API_CREATE_PUSH_MESSAGE = 'createPushMessage'
export type API_TYPE_CREATE_PUSH_MESSAGE = (
  options: CreatePushMessageOptions
) => void

export const CreatePushMessageOptions: ApiOptions<API_TYPE_CREATE_PUSH_MESSAGE> =
  {
    formatArgs: {
      content(value) {
        if (!value) {
          return `content is required`
        }
      },
    },
  }

export type API_TYPE_GET_CHANNEL_MANAGER = typeof uni.getChannelManager
export const API_GET_CHANNEL_MANAGER = 'getChannelManager'
