const test = require('node:test');
const assert = require('node:assert/strict');
const { createHarness, packageInfo, modes } = require('./helpers.cjs');

for (const mode of Object.keys(modes)) {
  test(mode + ': 实际 call-check-version 保留 options 和模式上报字段', async () => {
    const { load, uniCloud } = createHarness(mode);
    const check = load('utils/call-check-version.ts', {}).exports.default;
    let request;
    const info = packageInfo();
    uniCloud.callFunction = args => {
      request = args;
      if (args.success) args.success({ result: info });
      return Promise.resolve({ result: info });
    };
    const options = { appid: 'override', appVersion: '3.0.0', appWgtVersion: '3.1.0' };
    const result = await check(options);
    assert.equal(result.version, info.version);
    assert.equal(request.data.appid, options.appid);
    assert.equal(request.data.appVersion, options.appVersion);
    assert.equal(request.data.wgtVersion, options.appWgtVersion);
    if (modes[mode].includes('UNI-APP-X')) {
      assert.equal(request.data.is_uniapp_x, true);
      assert.equal(request.data.is_vapor, mode === 'vapor' || mode === 'ios');
    } else assert.equal(request.data.is_uniapp_x, undefined);
  });
}

test('实际 call-check-version 发布配置失败进入 manager 的准确 check 身份', async () => {
  let check;
  const { manager, state, load, uniCloud } = createHarness('vapor', { check: options => check(options) });
  check = load('utils/call-check-version.ts', {}).exports.default;
  uniCloud.callFunction = () => Promise.resolve({ result: { code: -103, message: 'invalid release' } });
  const event = await manager.checkUpdate();
  assert.equal(state.failed[0].taskId, event.taskContext.taskId);
  assert.equal(state.failed[0].checkId, event.checkId);
  assert.equal(state.failed[0].code, -103);
  assert.equal(state.failed[0].retryable, false);
});

test('实际 check-update-nvue 裸包入口仍能被 uni1 popup 读取并清理', async () => {
  const { load, loadPopup, uniCloud, plus, state } = createHarness('nvue');
  plus.runtime.appid = 'legacy-app';
  plus.runtime.version = '1.0.0';
  uniCloud.callFunction = args => args.success({ result: packageInfo({ is_update_prompt: false, is_mandatory: true }) });
  await load('utils/check-update-nvue.js', {}).exports.default();
  const key = state.storage[0].key;
  const popup = loadPopup();
  popup.onLoad({ local_storage_key: key });
  assert.equal(state.storageData.has(key), false);
  assert.equal(popup.packageInfo.type, 'native_app');
  assert.equal(popup.taskContext.checkId, 0);
  popup.downloadPackage();
  state.downloads[0].fail({ errMsg: 'legacy network failure' });
  assert.equal(state.failed[0].checkId, 0);
  assert.equal(state.failed[0].taskId, popup.taskContext.taskId);
});

for (const mode of ['vapor', 'vdom', 'uni1']) {
  test(mode + ': 普通 popup APK 安装失败保留原 context，且不触发 WGT ready/restart', async () => {
    const { manager, state, loadPopup } = createHarness(mode);
    const event = await manager.checkUpdate();
    await manager.showUpdate(packageInfo({ is_update_prompt: false, is_mandatory: true }), null, event.taskContext);
    const popup = loadPopup();
    popup.onLoad({ local_storage_key: state.storage[0].key });
    popup.downloadPackage();
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
    await manager.checkUpdate();
    await state.installs[0].fail(mode === 'uni1' ? { code: 5, message: 'install unavailable' } : { errCode: 5, errMsg: 'install unavailable' });
    assert.equal(state.failed.length, 1);
    assert.equal(state.failed[0].stage, 'install');
    assert.equal(state.failed[0].taskId, event.taskContext.taskId);
    assert.equal(state.failed[0].checkId, event.checkId);
    assert.equal(state.ready.length + state.restarts, 0);
  });
}

for (const sha256 of ['a'.repeat(64), null, 'invalid']) {
  test('真实 APK 校验 helper 在确认后执行或阻止安装：' + (sha256?.length || 'missing'), async () => {
    const { manager, state } = createHarness('vapor', { realVerify: true });
    const event = await manager.checkUpdate();
    await manager.showUpdate(packageInfo({ verify_sha256: true, sha256 }), null, event.taskContext);
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
    assert.equal(state.fileInfos.length + state.failed.length + state.installs.length, 0);
    state.modals[0].success({ confirm: true });
    state.modals[0].complete();
    if (sha256?.length === 64) {
      assert.equal(state.fileInfos[0].digestAlgorithm, 'sha256');
      assert.equal(state.installs.length, 0);
      state.fileInfos[0].success({ digest: sha256.toUpperCase() });
      assert.equal(state.installs.length, 1);
    } else {
      assert.equal(state.fileInfos.length + state.installs.length, 0);
      assert.equal(state.failed[0].stage, 'verify');
      assert.equal(state.failed[0].retryable, false);
      assert.equal(state.failed[0].taskId, event.taskContext.taskId);
    }
  });
}

test('uni1 忽略 verify_sha256 开关，确认后正常安装 APK', async () => {
  const { manager, state } = createHarness('uni1');
  await manager.showUpdate(packageInfo({ verify_sha256: true, sha256: null }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
  state.modals[0].success({ confirm: true });
  assert.equal(state.verifies.length + state.failed.length + state.ready.length + state.restarts, 0);
  assert.equal(state.installs.length, 1);
});

test('WGT 历史记录同时打开 silent/remind 时保留静默安装，不提示或主动重启', async () => {
  const { manager, state } = createHarness('vapor');
  await manager.showUpdate(packageInfo({ type: 'wgt', is_silently: true, is_update_prompt: true }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  state.wgtInstalls[0].onSuccess();
  assert.equal(state.ready.length, 1);
  assert.equal(state.modals.length + state.toasts.length + state.restarts, 0);
});

test('后续无更新检查不改变已有缓存包 A 的 context', async () => {
  let calls = 0;
  const { manager, state } = createHarness('vdom', { check: () => Promise.resolve(packageInfo({ code: ++calls === 1 ? 102 : 0, is_update_prompt: false })) });
  const a = await manager.checkUpdate();
  const b = await manager.checkUpdate();
  assert.equal(b.hasUpdate, false);
  await manager.showUpdate();
  assert.equal(state.storage[0].value.taskContext.checkId, a.checkId);
  assert.equal(state.storage[0].value.taskContext.taskId, a.taskContext.taskId);
});

test('通知插件失败不阻塞 download 失败事件及重试，旧任务回调不污染新下载', async () => {
  const { manager, state } = createHarness('vapor', { notificationsFail: true });
  await manager.showUpdate(packageInfo(), null, { taskId: 'old-task', checkId: 1 });
  state.downloads[0].fail({ errMsg: 'network failed' });
  assert.equal(state.failed.length, 1);
  await manager.showUpdate(packageInfo(), null, { taskId: 'new-task', checkId: 2 });
  state.downloads[0].fail({ errMsg: 'late callback' });
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/old.apk' });
  assert.equal(state.failed.length, 1);
  assert.equal(state.modals.length, 0);
  state.downloads[1].success({ statusCode: 200, tempFilePath: '/cache/new.apk' });
  state.modals[0].fail({ errMsg: 'prompt unavailable' });
  assert.equal(state.failed[1].taskId, 'new-task');
  assert.equal(state.failed[1].checkId, 2);
});

test('重复打开同包已下载通知复用原任务 context，而非后来的检查或手动 context', async () => {
  const { manager, state } = createHarness('vapor');
  const a = await manager.checkUpdate();
  await manager.showUpdate(a.packageInfo, null, a.taskContext);
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
  state.modals[0].success({ confirm: false });
  state.modals[0].complete();
  await manager.checkUpdate();
  manager.startNotificationDownload(a.packageInfo);
  assert.equal(state.downloads.length, 1);
  state.modals[1].fail({ errMsg: 'prompt unavailable' });
  assert.equal(state.failed[0].taskId, a.taskContext.taskId);
  assert.equal(state.failed[0].checkId, a.checkId);
});
