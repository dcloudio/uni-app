import type { MPProtocol } from './types'

export const onSocketOpen: MPProtocol = {
  args() {
    if (__GLOBAL__.__uni_console__) {
      if (__GLOBAL__.__uni_console_warned__) {
        return
      }
      __GLOBAL__.__uni_console_warned__ = true
      console.warn(
        `开发模式下小程序日志回显会使用 socket 连接，为了避免冲突，建议使用 SocketTask 的方式去管理 WebSocket 或手动关闭日志回显功能。[详情](https://uniapp.dcloud.net.cn/tutorial/run/mp-log.html)`
      )
    }
  },
}

export const onSocketMessage: MPProtocol = onSocketOpen
