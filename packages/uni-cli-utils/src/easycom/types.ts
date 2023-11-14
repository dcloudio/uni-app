export interface Options {
  inputDir: string
  outputDir: string
  dts?: string
  allowOverrides?: boolean
}

export interface ResolvedOptions extends Required<Options> {
  globs: string[]
  customGlobs: EasyComCustom[]
}

interface ImportInfo {
  as?: string
  name?: string
  from: string
}
type SideEffectsInfo = (ImportInfo | string)[] | ImportInfo | string | undefined

export interface ComponentInfo extends ImportInfo {
  sideEffects?: SideEffectsInfo
}

export interface EasyComOptions {
  autoscan?: boolean
  custom?: Record<string, string>
}

export interface EasyComCustom {
  /**
   * 组件标签名（正则）
   * ^uni-(.*)
   */
  tag: string
  /**
   * 组件路径
   * @dcloudio/uni-ui/lib/uni-$1/uni-$1.vue
   */
  path: string
  /**
   * 绝对路径的glob
   */
  glob: string
  /**
   * 根据文件解析组件名
   * @param filename
   */
  parseTag(filename: string): string
}
