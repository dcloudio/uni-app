/**
 * uni-app x 蒸汽模式编译产物要求的最低 HBuilderX runtime 版本。
 *
 * 版本固定为两段式数字字符串。template/style 字节码协议、UTS 通道协议、
 * 蒸汽渲染运行时接口或其他编译产物发生不兼容变更时，必须提升此版本号。
 *
 * 该值与 compilerVersion 的含义不同：compilerVersion 表示当前使用的编译器
 * 版本，MIN_RUNTIME_VERSION 表示编译产物要求的最低 runtime 版本。
 */
export const MIN_RUNTIME_VERSION = '5.31'
