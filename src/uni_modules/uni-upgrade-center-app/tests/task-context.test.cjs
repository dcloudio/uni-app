const test = require('node:test');
const assert = require('node:assert/strict');
const { createHarness, packageInfo, preprocess } = require('./helpers.cjs');
const identity = event => ({ taskId: event.taskId, checkId: event.checkId });
const popupContext = state => state.storage.at(-1).value.taskContext;

test('条件编译 helper 支持嵌套、否定、括号、else 和不同注释格式', () => {
  const source = '// #ifdef APP && (UNI-APP-X || APP-PLUS)\na\n/* #ifndef APP-IOS */\nb\n// #else\nc\n// #endif\n<!-- #else -->\nd\n// #endif';
  assert.equal(preprocess(source, new Set(['APP', 'UNI-APP-X'])), 'a\nb');
  assert.equal(preprocess(source, new Set()), 'd');
  assert.throws(() => preprocess('// #endif', new Set()));
});

test('检查失败保留准确 checkId 和独立 opaque taskId', async () => {
  const { manager, state } = createHarness('vapor', { check: () => Promise.reject({ code: -103, message: 'bad release' }) });
  const a = await manager.checkUpdate();
  const b = await manager.checkUpdate();
  assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
  assert.equal(state.failed[0].checkId, a.checkId);
  assert.equal(state.failed[1].checkId, b.checkId);
  assert.notEqual(state.failed[0].taskId, state.failed[1].taskId);
  assert.equal(state.failed[0].retryable, false);
  assert.ok(!state.failed[0].taskId.includes('check'));
});

test('cloudURL 解析失败沿用检查时创建的任务，不受检查 B 影响', async () => {
  let rejectCloud;
  const { manager, state } = createHarness('vapor', {
    check: () => Promise.resolve(packageInfo({ url: 'cloud://test/update.apk' })),
    cloudResolve: () => new Promise((resolve, reject) => rejectCloud = reject)
  });
  const a = await manager.checkUpdate();
  const pending = manager.showUpdate(a.packageInfo, null, a.taskContext);
  await manager.checkUpdate();
  rejectCloud('resolve failed');
  await assert.rejects(pending);
  assert.equal(state.failed.length, 1);
  assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
  assert.equal(state.failed[0].packageInfo.url, 'cloud://test/update.apk');
  assert.equal(state.failed[0].stage, 'download');
});

for (const mode of ['vapor', 'vdom', 'uni1']) {
  test(mode + ': cloudURL 解析及下载失败 taskId 不变，不包含临时 URL', async () => {
    const { manager, state } = createHarness(mode, { check: () => Promise.resolve(packageInfo({ url: 'cloud://test/update.apk' })) });
    const a = await manager.checkUpdate();
    await manager.showUpdate(a.packageInfo, null, a.taskContext);
    await manager.checkUpdate();
    state.downloads[0].fail({ errMsg: 'download unavailable' });
    assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
    assert.ok(!a.taskContext.taskId.includes('cloud'));
    assert.ok(!a.taskContext.taskId.includes('http'));
    assert.ok(!a.taskContext.taskId.includes('temporary'));
  });
}

test('无参 showUpdate 使用缓存包及其 context，手动显式包绝不借用最新检查', async () => {
  const { manager, state } = createHarness('vdom', { check: () => Promise.resolve(packageInfo({ is_update_prompt: false })) });
  const a = await manager.checkUpdate();
  await manager.showUpdate();
  assert.deepEqual(identity(popupContext(state)), identity(a.taskContext));
  await manager.showUpdate(a.packageInfo);
  assert.equal(popupContext(state).checkId, 0);
  assert.notEqual(popupContext(state).taskId, a.taskContext.taskId);
  const firstManual = popupContext(state).taskId;
  await manager.showUpdate(a.packageInfo);
  assert.notEqual(popupContext(state).taskId, firstManual);
});

test('check-update 入口传递 event context，保留旧 options 参数', async () => {
  let received;
  const { performCheckUpdate, state } = createHarness('vdom', { check: options => { received = options; return Promise.resolve(packageInfo({ is_update_prompt: false })); } });
  const options = { appid: 'injected', appVersion: '1.0.0', appWgtVersion: '1.2.0' };
  await performCheckUpdate(options);
  assert.equal(received, options);
  assert.deepEqual(identity(popupContext(state)), identity(state.checked[0].taskContext));
});

for (const stage of ['prompt', 'verify', 'install']) {
  test('APK ' + stage + ' 异步失败保留 A context，不发 WGT ready/restart', async () => {
    const { manager, state } = createHarness('vapor', { deferVerify: true });
    const a = await manager.checkUpdate();
    await manager.showUpdate(a.packageInfo, null, a.taskContext);
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
    await manager.checkUpdate();
    if (stage === 'prompt') state.modals[0].fail({ errMsg: 'prompt failed' });
    else {
      // 直接下载 API 的 context 也必须拍快照，不接受后续调用方篡改。
      const info = packageInfo({ verify_sha256: true, sha256: 'a'.repeat(64) });
      const context = { ...a.taskContext };
      state.modals[0].complete();
      manager.notifyApkDownloaded(info, '/cache/update.apk', context);
      context.checkId = 999;
      state.modals[1].success({ confirm: true });
      state.modals[1].complete();
      if (stage === 'verify') state.verifies[0].fail('digest mismatch', true);
      else { state.verifies[0].success(); state.installs[0].fail({ errCode: 7, errMsg: 'install failed' }); }
    }
    assert.equal(state.failed.length, 1);
    assert.equal(state.failed[0].stage, stage);
    assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
    assert.equal(state.ready.length + state.restarts, 0);
  });
}

for (const mode of ['vapor', 'ios', 'uni1']) {
  test(mode + ': 后台 WGT ready/prompt/apply 失败始终保留 A 包和 context', async () => {
    const info = packageInfo({ type: 'wgt', url: 'https://example.com/update.wgt' });
    const { manager, state } = createHarness(mode, { check: () => Promise.resolve(info), restartFails: true });
    const a = await manager.checkUpdate();
    await manager.showUpdate(a.packageInfo, null, a.taskContext);
    await manager.checkUpdate();
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
    state.wgtInstalls[0].onSuccess();
    assert.deepEqual(identity(state.ready[0]), identity(a.taskContext));
    state.modals[0].fail({ errMsg: 'prompt failed' });
    manager.applyUpdate();
    assert.deepEqual(state.failed.map(identity), [identity(a.taskContext), identity(a.taskContext)]);
    assert.equal(state.failed[1].code, 'RESTART_FAILED');
    assert.equal(state.failed[1].packageInfo, info);
    manager.applyUpdate();
    assert.equal(state.restarts, 2, '失败恢复 ready，可再次 apply');
  });
}

for (const mode of ['vapor', 'uni1']) {
  test(mode + ': 通知 WGT 的下载、安装、ready 持有 context 快照', async () => {
    const { manager, state } = createHarness(mode);
    const a = await manager.checkUpdate();
    const context = { ...a.taskContext };
    const info = packageInfo({ type: 'wgt', is_update_prompt: false });
    manager.startNotificationDownload(info, context);
    context.checkId = 999;
    await manager.checkUpdate();
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
    assert.equal(state.modals.length, 0);
    assert.equal(state.wgtInstalls.length, 1);
    state.wgtInstalls[0].onFail('install failed');
    assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
    state.wgtInstalls[0].onSuccess();
    assert.deepEqual(identity(state.ready[0]), identity(a.taskContext));
  });
}

test('ios: 取消重启后进入后台再回前台自动重启', async () => {
  const info = packageInfo({ type: 'wgt', url: 'https://example.com/update.wgt', is_update_prompt: true });
  const { manager, state } = createHarness('ios', { check: () => Promise.resolve(info) });
  const a = await manager.checkUpdate();
  await manager.showUpdate(a.packageInfo, null, a.taskContext);
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  state.wgtInstalls[0].onSuccess();
  // 用户取消重启 → 延后到应用回到前台
  state.modals[0].success({ cancel: true });
  assert.equal(state.restarts, 0);
  assert.equal(state.appHideHooks.length, 1, '模块自行注册 onAppHide');
  assert.equal(state.appShowHooks.length, 1, '模块自行注册 onAppShow');
  state.appHideHooks[0]();
  state.appShowHooks[0]();
  assert.equal(state.restarts, 1);
});

test('旧 notifyUpdateReady(pkg, taskId, promptAfterInstall) 仍兼容，新 context 是第 4 个可选值', () => {
  const { manager, state } = createHarness('vapor');
  manager.notifyUpdateReady(packageInfo({ type: 'wgt', is_update_prompt: false }), 'external-task', true);
  assert.equal(state.ready[0].taskId, 'external-task');
  assert.equal(state.ready[0].checkId, 0);
  assert.equal(state.modals.length, 1);
  const info = packageInfo({ type: 'wgt', version: '3.0.0', is_update_prompt: false });
  manager.notifyUpdateReady(info, 'task-a', false, { taskId: 'task-a', checkId: 7 });
  assert.deepEqual(identity(state.ready[1]), { taskId: 'task-a', checkId: 7 });
});

for (const mode of ['vapor', 'vdom', 'uni1', 'nvue']) {
  test(mode + ': popup 独立存储 key、envelope 与旧裸包兼容，读取即清理', async () => {
    const { manager, state, loadPopup, uni } = createHarness(mode);
    const info = packageInfo({ is_update_prompt: false });
    await manager.showUpdate(info);
    const first = state.storage[0];
    await manager.showUpdate(info);
    const second = state.storage[1];
    assert.notEqual(first.key, second.key);
    assert.equal(first.value.packageInfo, info);
    assert.equal(first.value.taskContext.checkId, 0);
    assert.equal(info.taskContext, undefined, '不覆写包属性');
    const popup = loadPopup();
    popup.onLoad({ local_storage_key: first.key });
    assert.ok(state.removed.includes(first.key));
    assert.equal(state.storageData.has(second.key), true, '不清理其他 popup 的 key');
    const actual = mode === 'uni1' || mode === 'nvue' ? popup.packageInfo : popup.packageInfo.value;
    assert.equal(actual.url, info.url);
    uni.setStorageSync('__package_info__', info);
    popup.onLoad({ local_storage_key: '__package_info__' });
    assert.equal(state.storageData.has('__package_info__'), false);
    const legacy = mode === 'uni1' || mode === 'nvue' ? popup.packageInfo : popup.packageInfo.value;
    assert.equal(legacy.version, info.version);
  });

  test(mode + ': popup download/install 失败带原包 context，WGT 重启经过 manager', async () => {
    const { manager, state, loadPopup } = createHarness(mode, { restartFails: true });
    const a = await manager.checkUpdate();
    const info = packageInfo({ type: mode === 'vdom' ? 'native_app' : 'wgt', is_update_prompt: false, is_mandatory: true });
    await manager.showUpdate(info, null, a.taskContext);
    const popup = loadPopup();
    popup.onLoad({ local_storage_key: state.storage[0].key });
    await manager.checkUpdate();
    popup.downloadPackage();
    state.downloads[0].fail({ errMsg: 'network failed' });
    assert.equal(state.failed[0].stage, 'download');
    assert.deepEqual(identity(state.failed[0]), identity(a.taskContext));
    const filePath = mode === 'vdom' ? '/cache/update.apk' : '/cache/update.wgt';
    popup.downloadPackage();
    state.downloads[1].success({ statusCode: 200, tempFilePath: filePath });
    if (mode === 'vdom') state.installs[0].fail({ errCode: 7, errMsg: 'install failed' });
    else await state.wgtInstalls[0].onFail(mode === 'vapor' ? 'install failed' : { code: 7, message: 'install failed' });
    assert.equal(state.failed[1].stage, 'install');
    assert.deepEqual(identity(state.failed[1]), identity(a.taskContext));
    if (mode === 'vdom') {
      assert.equal(state.ready.length + state.restarts, 0);
      return;
    }
    popup.downloadPackage();
    state.downloads[2].success({ statusCode: 200, tempFilePath: filePath });
    await state.wgtInstalls[1].onSuccess();
    (popup.restartApp || popup.restart)();
    assert.equal(state.failed.at(-1).stage, 'apply');
    assert.deepEqual(identity(state.failed.at(-1)), identity(a.taskContext));
    assert.equal(state.failed.at(-1).packageInfo.version, info.version);
  });
}

for (const mode of ['vapor', 'vdom']) {
  test(mode + ': popup SHA256 失败只报一次 verify，不把 UI reset 当作 download 失败', async () => {
    const { manager, state, loadPopup } = createHarness(mode, { deferVerify: true });
    const info = packageInfo({ is_update_prompt: false, is_mandatory: true, verify_sha256: true, sha256: 'a'.repeat(64) });
    await manager.showUpdate(info, null, { taskId: 'popup-sha-task', checkId: 4 });
    const popup = loadPopup();
    popup.onLoad({ local_storage_key: state.storage[0].key });
    popup.installPackage();
    state.verifies[0].fail('digest mismatch', true);
    assert.equal(state.failed.length, 1);
    assert.equal(state.failed[0].stage, 'verify');
    assert.deepEqual(identity(state.failed[0]), { taskId: 'popup-sha-task', checkId: 4 });
    assert.equal(popup.downloadSuccess.value, false);
    assert.equal(state.installs.length, 0);
  });
}

test('Harmony 组件 show 保留 true/pkg 原参数，新增第 3 个可选 context；旧 2 参数消费者可忽略', async () => {
  const { manager, state, loadPopup, performCheckUpdate } = createHarness('harmony');
  const popup = loadPopup();
  await performCheckUpdate(popup);
  assert.equal(popup.shown, true);
  assert.deepEqual(identity(popup.taskContext), identity(state.checked[0].taskContext));
  const info = packageInfo();
  popup.show(true, info);
  assert.equal(popup.taskContext.checkId, 0);
  let received;
  await manager.showUpdate(info, { show(shown, pkg) { received = { shown, pkg }; } });
  assert.equal(received.shown, true);
  assert.equal(received.pkg, info);
});

for (const mode of ['vdom', 'uni1']) {
  test(mode + ': popup 打开失败清理本次 key 并发 prompt 失败事件', async () => {
    const { manager, state } = createHarness(mode, { openFails: true });
    const context = { taskId: 'open-task', checkId: 8 };
    await assert.rejects(manager.showUpdate(packageInfo({ is_update_prompt: false }), null, context));
    assert.equal(state.storageData.size, 0);
    assert.equal(state.failed.length, 1);
    assert.equal(state.failed[0].stage, 'prompt');
    assert.deepEqual(identity(state.failed[0]), identity(context));
  });
}
