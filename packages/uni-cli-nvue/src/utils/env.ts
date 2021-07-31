export function initEnv(options: NVueCompilerOptions) {
  if (options.styleCompiler === 'uni-app') {
    process.env.UNI_NVUE_STYLE_COMPILER = 'uni-app'
  }
}
