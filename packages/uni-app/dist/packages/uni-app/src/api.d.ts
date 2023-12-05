/**
 * uni 对象是跨实例的，而此处列的 API 均是需要跟当前实例关联的，比如 requireNativePlugin 获取 dom 时，依赖当前 weex 实例
 */
/// <reference types="@dcloudio/types" />
export declare function getCurrentSubNVue(): UniApp.SubNVue;
export declare function requireNativePlugin(name: string): any;
