// 访问开始即启动小程序，访问结束结分为：进入后台超过5min、在前台无任何操作超过30min、在新的来源打开小程序；
export const STAT_VERSION = '0.0.1'

export const PAGE_PVER_TIME = 1800 // 页面在前台无操作结束访问时间 单位s
// export const PAGE_PVER_TIME = 0
export const APP_PVER_TIME = 300 // 应用在后台结束访问时间 单位s
// export const APP_PVER_TIME = 0
// export const OPERATING_TIME = 10 // 数据上报时间 单位s
export const OPERATING_TIME = 10 // 数据上报时间 单位s

export const DEBUG = true
