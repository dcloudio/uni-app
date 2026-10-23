const path = require('path')

function createFrameworkTemplateCompiler(compiler, root) {
  const normalizedRoot = root.replace(/\\/g, '/')
  // Windows 盘符和 UNC 路径需按 Windows 规则比较大小写。
  const pathApi = /^[a-z]:\/|^\/\//i.test(normalizedRoot)
    ? path.win32
    : path.posix
  return {
    ...compiler,
    compile(source, options = {}) {
      const filename = options.filename?.replace(/\\/g, '/')
      return compiler.compile(source, {
        ...options,
        // 组件 ID 使用仓库相对路径，避免检出目录和操作系统改变发布产物。
        filename: filename
          ? pathApi.relative(normalizedRoot, filename).replace(/\\/g, '/')
          : filename,
        isUniPage: options.isUniPage
          ? () => options.isUniPage(options.filename)
          : undefined,
      })
    },
  }
}

exports.createFrameworkTemplateCompiler = createFrameworkTemplateCompiler
