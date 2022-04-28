declare namespace GtPush {
  /**
   * 设置调试模式
   * @param debugMode 打开或关闭调试模式
   */
  function setDebugMode(debugMode: boolean): void
  /**
   * 初始化GtPush
   */
  function init(obj: {
    /**
     * 个推官网生成的appid
     */
    appid: string
    /**
     * 错误回调
     */
    onError?: (res: {error: any}) => void
    /**
     * 个推终端ID回调，标识当前终端和应用
     */
    onClientId?: (res: { cid: string }) => void
    /**
     * 个推终端ID在线状态回调
     */
    onlineState?: (res: { online: boolean }) => void
    /**
     * 推送消息回调
     */
    onPushMsg?: (res: { message: string }) => void
  }): void
}
export default GtPush
