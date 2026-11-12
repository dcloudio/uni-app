const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

function loadTypeScript() {
  const relative = 'plugins/uniapp-uts-v1/node_modules/@dcloudio/uni-uts-v1/lib/typescript/lib/typescript.js';
  const root = process.env.HBUILDERX_PATH;
  if (root) {
    for (const base of [root, path.join(root, 'Contents/HBuilderX')]) {
      const candidate = path.join(base, relative);
      if (fs.existsSync(candidate)) return require(candidate);
    }
    throw new Error('HBUILDERX_PATH 下未找到 ' + relative);
  }
  throw new Error('纯 Node 测试需要 HBuilderX TypeScript；请设置 HBUILDERX_PATH 为 HBuilderX .app 或包含 plugins 的目录。');
}

const ts = loadTypeScript();
const moduleRoot = path.resolve(__dirname, '..');
const modes = {
  vapor: ['APP', 'APP-ANDROID', 'UNI-APP-X', 'VUE3-VAPOR'],
  vdom: ['APP', 'APP-ANDROID', 'UNI-APP-X'],
  ios: ['APP', 'APP-IOS', 'UNI-APP-X', 'VUE3-VAPOR'],
  uni1: ['APP', 'APP-ANDROID', 'APP-PLUS'],
  nvue: ['APP', 'APP-ANDROID', 'APP-PLUS', 'APP-NVUE'],
  harmony: ['APP', 'APP-HARMONY'],
  'x-harmony': ['APP', 'APP-HARMONY', 'UNI-APP-X', 'VUE3-VAPOR']
};

function preprocess(source, flags) {
  const stack = [];
  let enabled = true;
  function evaluate(expression) {
    const tokens = expression.match(/\s*(\|\||&&|!|\(|\)|[\w-]+)\s*/g) || [];
    assert.equal(tokens.join('').replace(/\s/g, ''), expression.replace(/\s/g, ''), '无效条件表达式');
    let index = 0;
    const take = () => tokens[index++]?.trim();
    const peek = () => tokens[index]?.trim();
    function atom() {
      const token = take();
      if (token === '!') return !atom();
      if (token === '(') {
        const value = or();
        assert.equal(take(), ')', '条件表达式缺少右括号');
        return value;
      }
      assert.match(token || '', /^[\w-]+$/, '条件表达式缺少标记');
      return flags.has(token);
    }
    function and() {
      let value = atom();
      while (peek() === '&&') { take(); const next = atom(); value = value && next; }
      return value;
    }
    function or() {
      let value = and();
      while (peek() === '||') { take(); const next = and(); value = value || next; }
      return value;
    }
    const result = or();
    assert.equal(index, tokens.length, '条件表达式有剩余标记');
    return result;
  }
  const result = source.split(/\r?\n/).filter(line => {
    const directive = line.match(/^\s*(?:\/\/|\/\*|<!--)\s*#(ifdef|ifndef|else|endif)\b\s*(.*?)\s*(?:\*\/|-->)?\s*$/);
    if (!directive) return enabled;
    const [, command, expression] = directive;
    if (command === 'endif') {
      assert.ok(stack.length, '孤立 #endif');
      enabled = stack.pop().parent;
    } else if (command === 'else') {
      const current = stack[stack.length - 1];
      assert.ok(current && !current.elseSeen, '孤立或重复 #else');
      current.elseSeen = true;
      enabled = current.parent && !current.condition;
    } else {
      const value = evaluate(expression);
      const condition = command === 'ifndef' ? !value : value;
      stack.push({ parent: enabled, condition, elseSeen: false });
      enabled = enabled && condition;
    }
    return false;
  }).join('\n');
  assert.equal(stack.length, 0, '未闭合条件编译块');
  return result;
}

function packageInfo(overrides = {}) {
  return {
    _id: 'release', appid: 'test', name: 'test', title: 'update', type: 'native_app', version: '2.0.0', code: 102,
    url: 'https://example.com/update.apk', platform: ['Android'], contents: 'release notes',
    store_list: null, sha256: null, is_mandatory: false, is_silently: false, is_update_prompt: true,
    ...overrides
  };
}

function createHarness(mode, options = {}) {
  assert.ok(modes[mode], '未知 mode: ' + mode);
  const flags = new Set(modes[mode]);
  const state = {
    downloads: [], dialogs: [], navigation: [], storage: [], removed: [], storageData: new Map(),
    modals: [], installs: [], verifies: [], failed: [], checked: [], wgtInstalls: [], ready: [],
    toasts: [], restarts: 0, warnings: [], notifications: [], cloudRequests: [], fileInfos: [],
    appHideHooks: [], appShowHooks: []
  };
  const download = args => {
    state.downloads.push(args);
    return { onProgressUpdate(callback) { args.progress = callback; }, abort() {} };
  };
  const restart = () => { state.restarts++; if (options.restartFails) throw new Error('restart unavailable'); };
  const check = args => options.check ? options.check(args) : Promise.resolve(packageInfo());
  const verify = (filePath, sha256, success, fail) => {
    state.verifies.push({ filePath, sha256, success, fail });
    if (!options.deferVerify) success();
  };
  const wgt = {
    getWgtCacheFilePath: () => '/cache/update.wgt', getWgtCacheRecord: () => null,
    clearWgtCache() {}, saveWgtCacheRecord() {}, isSameWgtPackage: () => false,
    installVaporWgt: args => state.wgtInstalls.push(args)
  };
  const notification = kind => args => {
    state.notifications.push({ kind, args });
    if (options.notificationsFail) throw new Error(kind + ' unavailable');
  };
  const modules = {
    './call-check-version': { default: check, isWgtPackage: info => info != null && info.type === 'wgt' },
    './': { restart }, './verify-package': { verifyPackageSha256: verify },
    './download': { probeFileSize() {}, createUpgradeDownloadTask: download }, './install-wgt': wgt,
    '@/uni_modules/uts-progressNotification': {
      createNotificationProgress: notification('progress'), finishNotificationProgress: notification('finish'),
      cancelNotificationProgress: notification('cancel')
    },
    '@/uni_modules/uts-openSchema': { openSchema() {} }, '@dcloudio/uni-app': {
      onAppHide: fn => state.appHideHooks.push(fn), onAppShow: fn => state.appShowHooks.push(fn)
    }
  };
  const uni = {
    downloadFile: download, installApk: args => state.installs.push(args),
    setStorageSync(key, value) { state.storage.push({ key, value }); state.storageData.set(key, value); },
    getStorageSync: key => state.storageData.get(key),
    removeStorageSync(key) { state.removed.push(key); state.storageData.delete(key); },
    openDialogPage(args) { state.dialogs.push(args); options.openFails ? args.fail({ errMsg: 'open failed' }) : args.success(); },
    navigateTo(args) { state.navigation.push(args); options.openFails ? args.fail({ errMsg: 'open failed' }) : args.success(); },
    closeDialogPage() {}, navigateBack() {}, showModal: args => state.modals.push(args), showToast: args => state.toasts.push(args),
    saveFile(args) { args.success?.({ savedFilePath: args.tempFilePath }); args.complete?.(); }, removeSavedFile() {},
    env: { CACHE_PATH: '/cache/' }, getSystemInfoSync: () => ({ appId: 'test', appVersion: '1.0.0' }),
    getAppBaseInfo: () => ({ appWgtVersion: '1.1.0' }),
    getFileSystemManager: () => ({ getFileInfo: args => state.fileInfos.push(args) })
  };
  const plus = { runtime: {
    install(filePath, args, success, fail) {
      const record = { filePath, onSuccess: success, onFail: fail, success, fail };
      (filePath.endsWith('.wgt') ? state.wgtInstalls : state.installs).push(record);
    }, restart, quit: restart, getProperty(appid, callback) { callback({ version: '1.1.0' }); }
  } };
  const uniCloud = {
    getTempFileURL(args) {
      state.cloudRequests.push(args);
      return options.cloudResolve ? options.cloudResolve(args) : options.cloudFails ? Promise.reject('resolve failed') :
        Promise.resolve({ fileList: [{ tempFileURL: 'https://cdn.example.com/update.apk?token=temporary' }] });
    }
  };
  function load(relative, imports = modules, extra = {}) {
    const filename = path.join(moduleRoot, relative);
    let source = fs.readFileSync(filename, 'utf8');
    if (/\.(?:u)?vue$/.test(relative)) source = source.match(/<script\b[^>]*>([\s\S]*?)<\/script>/)[1];
    source = preprocess(source, flags) + (extra.append || '');
    const compiled = ts.transpileModule(source, {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }, reportDiagnostics: true,
      fileName: filename + '.ts'
    });
    const errors = (compiled.diagnostics || []).filter(item => item.category === ts.DiagnosticCategory.Error);
    assert.equal(errors.length, 0, errors.map(item => ts.flattenDiagnosticMessageText(item.messageText, '\n')).join('\n'));
    const context = {
      exports: {}, console: { log() {}, warn: (...args) => state.warnings.push(args), error() {} },
      uni, plus, uniCloud, getCurrentPages: () => [],
      require(id) { assert.ok(imports[id], '非预期 import: ' + id); return imports[id]; }, ...extra.globals
    };
    vm.runInNewContext(compiled.outputText, context, { filename });
    return context;
  }
  if (options.realVerify && flags.has('UNI-APP-X')) modules['./verify-package'] = load('utils/verify-package.ts').exports;
  const managerExports = load('utils/update-manager.ts').exports;
  const manager = managerExports.createUpdateManager();
  manager.onUpdateFailed(event => state.failed.push(event));
  manager.onUpdateReady(event => state.ready.push(event));
  manager.onCheckForUpdate(event => state.checked.push(event));
  function loadPopup() {
    const imports = {
      ...modules,
      '../../utils/call-check-version': modules['./call-check-version'],
      '../../utils/update-manager': managerExports, '../utils/update-manager': managerExports,
      '../../utils/verify-package': modules['./verify-package'], '../../utils/install-wgt': wgt,
      '../../utils': { platform_iOS: 'iOS', platform_Android: 'Android', platform_Harmony: 'Harmony', restart, probeFileSize() {} },
      '../utils': { platform_iOS: 'iOS', platform_Android: 'Android', platform_Harmony: 'Harmony', compare: (a, b) => a === b ? 0 : -1, createUpgradeDownloadTask: download }
    };
    if (flags.has('UNI-APP-X')) {
      const hooks = {};
      const context = load('pages/uni-app-x/upgrade-popup.uvue', imports, {
        globals: { ref: value => ({ value }), computed: getter => ({ get value() { return getter(); } }),
          onLoad: callback => hooks.load = callback, onUnload() {}, onBackPress() {} },
        append: '\nglobalThis.popup = { show, downloadPackage, installPackage, restartApp, packageInfo, downloadSuccess, verifyBlocked };'
      });
      return { ...context.popup, onLoad: hooks.load };
    }
    const definition = load('pages/upgrade-popup.vue', imports).exports.default;
    const instance = { ...definition.data(), $emit() {} };
    for (const [name, method] of Object.entries(definition.methods)) instance[name] = method.bind(instance);
    for (const [name, getter] of Object.entries(definition.computed)) Object.defineProperty(instance, name, { get: getter.bind(instance) });
    instance.onLoad = definition.onLoad.bind(instance);
    return instance;
  }
  const performCheckUpdate = (...args) => load('utils/check-update.ts', { './update-manager': managerExports }).exports.default(...args);
  return { manager, state, load, loadPopup, performCheckUpdate, uni, plus, uniCloud };
}

module.exports = { createHarness, packageInfo, preprocess, modes };
