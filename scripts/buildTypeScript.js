function createBuildTypeScriptPlugin(pluginFactory, typescript) {
  let context
  // rpt2 在多个插件之间共享 TypeScript 实例；所有入口必须传入同一个适配器。
  const compiler = {
    ...typescript,
    createLanguageService(host, ...args) {
      const service = typescript.createLanguageService(host, ...args)
      const options = context
      // 类型检查、声明生成和 watch 保持完整项目范围。
      if (
        !options ||
        options.check !== false ||
        options.watch ||
        host.getCompilationSettings().declaration
      )
        return service
      const emit = service.getEmitOutput.bind(service)
      let roots
      service.getEmitOutput = (filename, ...emitArgs) => {
        // 磁盘缓存命中时 rpt2 不调用 emit，避免热构建额外创建 Program。
        if (!roots) {
          const originalRoots = new Set(host.getScriptFileNames())
          const program = typescript.createProgram(
            [...originalRoots],
            host.getCompilationSettings()
          )
          roots = new Set([options.entryFile])
          for (const source of program.getSourceFiles()) {
            // 无关模块也可能间接引入全局声明或模块补充，必须从完整依赖图保留。
            if (
              (source.isDeclarationFile &&
                originalRoots.has(source.fileName)) ||
              !typescript.isExternalModule(source) ||
              source.statements.some(
                (statement) =>
                  typescript.isNamespaceExportDeclaration(statement) ||
                  (typescript.isModuleDeclaration(statement) &&
                    (statement.flags &
                      typescript.NodeFlags.GlobalAugmentation ||
                      typescript.isStringLiteral(statement.name)))
              )
            )
              roots.add(source.fileName)
          }
          host.getScriptFileNames = () => [...roots]
        }
        // Rollup 别名或虚拟模块可能引入入口静态依赖之外的文件。
        roots.add(filename)
        return emit(filename, ...emitArgs)
      }
      return service
    },
  }

  return (options, entryFile, watch = false, transpileInclude) => {
    // 只给纯转译输出选择专用范围；类型检查、声明和 watch 继续使用完整包配置。
    if (
      transpileInclude &&
      options.check === false &&
      !watch &&
      options.tsconfigOverride?.compilerOptions?.declaration === false
    ) {
      options = {
        ...options,
        tsconfigOverride: {
          ...options.tsconfigOverride,
          include: transpileInclude,
        },
      }
    }
    const plugin = pluginFactory({ ...options, typescript: compiler })
    const configure = plugin.options
    plugin.options = function (...args) {
      // rpt2 0.32 在同步 options 钩子内创建服务，将配置绑定到该服务而非最后一个入口。
      const previous = context
      context = { entryFile, check: options.check, watch }
      try {
        return configure.apply(this, args)
      } finally {
        context = previous
      }
    }
    return plugin
  }
}

module.exports = { createBuildTypeScriptPlugin }
