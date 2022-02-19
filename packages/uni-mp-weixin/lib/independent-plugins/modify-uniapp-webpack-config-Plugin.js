class ModifyUniAppWebpackConfigPlugin {
  apply (compiler) {
    compiler.hooks.environment.tap('ModifyUniAppWebpackConfigPlugin', () => {
      // 不注册webpack内置的splitchunksplugin
      delete compiler.options.optimization.splitChunks;
    });
  }
}

module.exports = ModifyUniAppWebpackConfigPlugin;
