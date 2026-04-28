/**
 * 宿主 uni-app 构建会向模块注入全局 `uni`（小程序常见）。
 * 本包通过 `typeof uni` 做运行时探测；此处最小声明避免 TS 报「找不到名称 uni」。
 * 完整类型以业务工程中的 `@dcloudio/types` 为准。
 */
declare const uni: Record<string, unknown> | undefined
