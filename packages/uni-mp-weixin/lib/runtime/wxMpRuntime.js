
const logicGlobal = Function("return this")();
if (!logicGlobal.wpRuntimeInited) {
  logicGlobal.wpRuntimeInited = true;
  // https://developers.weixin.qq.com/miniprogram/dev/reference/api/App.html
  // 注册小程序。接受一个 Object 参数，其指定小程序的生命周期回调等。
  // App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
  const independentRoots = []; // 变量名不能更改，插件通过该名来静态替换值

  Object.assign(logicGlobal, {
    getApp: function () {
      return getApp() || getApp({ allowDefault: true });
    },
    App: function (appOpts = {}) {
      const launchOptions = wx.getLaunchOptionsSync();
      const entryPath = launchOptions.path || '';
      const isIndependentPage = independentRoots.find(pkgRoot => entryPath.startsWith(pkgRoot));

      // 实际上也可以不区分
      if (!isIndependentPage) {
        return App(appOpts);
      }

      // TODO 部分App上面挂载的东西 未提供api形式，这里可能不支持
      // 目前只针对云医用到的生命周期进行支持
      const app = this.getApp();
      // const { onLaunch, onShow, onHide, onError, onUnhandledRejection, onThemeChange } = appOpts;
      Object.assign(app, appOpts);
      app.onLaunch(launchOptions);
      wx.onAppShow(opts => app.onShow(opts));
      wx.onAppHide(opts => app.onHide(opts));
      wx.onError(opts => app.onError(opts));
      wx.onUnhandledRejection(opts => app.onUnhandledRejection(opts));
      wx.onThemeChange(opts => app.onThemeChange(opts));
    },
  });
}
