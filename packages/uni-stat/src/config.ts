// 访问开始即启动小程序，访问结束结分为：进入后台超过5min、在前台无任何操作超过30min、在新的来源打开小程序；
export const STAT_VERSION = process.env.UNI_COMPILER_VERSION
export const STAT_URL = 'https://tongji.dcloud.io/uni/stat'
export const STAT_H5_URL = 'https://tongji.dcloud.io/uni/stat.gif'
export const STAT_KEY = 'qkTHEIegZGcL5iy3'
export const PAGE_PVER_TIME = 1800 // 页面在前台无操作结束访问时间 单位s
export const APP_PVER_TIME = 300 // 应用在后台结束访问时间 单位s
export const OPERATING_TIME = 10 // 数据上报时间 单位s
export const DIFF_TIME = 60 * 1000 * 60 * 24
