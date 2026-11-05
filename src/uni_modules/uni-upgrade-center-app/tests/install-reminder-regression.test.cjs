const test = require('node:test');
const assert = require('node:assert/strict');
const { createHarness, packageInfo } = require('./helpers.cjs');

for (const mode of ['vapor', 'vdom', 'uni1']) {
  test(mode + ': APK remind=true 不打开初始升级页，下载后等待确认', async () => {
    const { manager, state } = createHarness(mode);
    await manager.showUpdate(packageInfo());
    assert.equal(state.downloads.length, 1);
    assert.equal(state.dialogs.length + state.navigation.length + state.storage.length, 0);
    assert.equal(state.modals.length + state.installs.length, 0);
    await manager.showUpdate(packageInfo());
    assert.equal(state.downloads.length, 1);
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
    assert.equal(state.modals.length, 1);
    assert.equal(state.modals[0].confirmText, '安装');
    assert.equal(state.installs.length, 0);
    state.modals[0].success({ confirm: false });
    state.modals[0].complete();
    assert.equal(state.installs.length + state.ready.length + state.restarts, 0);
  });
  for (const flag of [false, undefined]) {
    test(mode + ': APK remind=' + flag + ' 保留普通弹窗，silent 不启用 APK 提醒下载', async () => {
      const { manager, state } = createHarness(mode);
      await manager.showUpdate(packageInfo({ is_update_prompt: flag, is_silently: true }));
      assert.equal(state.downloads.length, 0);
      assert.equal(state.dialogs.length + state.navigation.length, 1);
    });
  }
}

test('cloudURL 下载前解析，不改调用方包信息', async () => {
  const { manager, state } = createHarness('vapor');
  const info = packageInfo({ url: 'cloud://test/update.apk' });
  const result = await manager.showUpdate(info);
  assert.equal(state.downloads[0].url, result.url);
  assert.match(result.url, /^https:\/\/cdn/);
  assert.equal(info.url, 'cloud://test/update.apk');
});

test('cloudURL 解析失败 reject 且不下载或打开页面', async () => {
  const { manager, state } = createHarness('vapor', { cloudFails: true });
  await assert.rejects(manager.showUpdate(packageInfo({ url: 'cloud://test/update.apk' })));
  assert.equal(state.downloads.length + state.dialogs.length + state.navigation.length, 0);
});

for (const mode of ['vapor', 'uni1', 'ios']) {
  test(mode + ': WGT 提醒下载安装后才 ready/modal，并守卫重复回调', async () => {
    const { manager, state } = createHarness(mode);
    const info = packageInfo({ type: 'wgt', url: 'https://example.com/update.wgt', platform: [mode === 'ios' ? 'iOS' : 'Android'] });
    await manager.showUpdate(info);
    assert.equal(state.downloads.length, 1);
    assert.equal(state.dialogs.length + state.navigation.length + state.modals.length, 0);
    await manager.showUpdate(info);
    assert.equal(state.downloads.length, 1);
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
    assert.equal(state.wgtInstalls.length, 1);
    assert.equal(state.modals.length + state.ready.length, 0);
    state.wgtInstalls[0].onSuccess();
    state.wgtInstalls[0].onSuccess();
    assert.equal(state.ready.length, 1);
    assert.equal(state.modals.length, 1);
    assert.equal(state.modals[0].confirmText, '重启');
    assert.equal(state.restarts, 0);
  });
}

test('VDOM WGT 不走不支持的自动安装', async () => {
  const { manager, state } = createHarness('vdom');
  await manager.showUpdate(packageInfo({ type: 'wgt' }));
  assert.equal(state.downloads.length, 0);
  assert.equal(state.dialogs.length, 1);
});

test('WGT silent 能力保留，不主动提示或重启', async () => {
  const { manager, state } = createHarness('vapor');
  await manager.showUpdate(packageInfo({ type: 'wgt', is_silently: true, is_update_prompt: false }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  state.wgtInstalls[0].onSuccess();
  assert.equal(state.ready.length, 1);
  assert.equal(state.modals.length + state.toasts.length + state.restarts, 0);
});

test('WGT 安装失败释放任务锁供重试', async () => {
  const { manager, state } = createHarness('vapor');
  const info = packageInfo({ type: 'wgt' });
  await manager.showUpdate(info);
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  state.wgtInstalls[0].onFail('test install failure');
  assert.equal(state.failed.length, 1);
  await manager.showUpdate(info);
  assert.equal(state.downloads.length, 2);
});

test('WGT toast 仅在安装后提醒并调用 applyUpdate', async () => {
  const { manager, state } = createHarness('vapor');
  await manager.showUpdate(packageInfo({ type: 'wgt', update_prompt: 'toast' }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  assert.equal(state.toasts.length + state.restarts, 0);
  state.wgtInstalls[0].onSuccess();
  assert.equal(state.toasts.length, 1);
  assert.equal(state.restarts, 1);
});

for (const mode of ['vapor', 'vdom']) {
  test(mode + ': 通知插件抛错不阻塞 APK 确认及 SHA256 校验安装', async () => {
    const { manager, state } = createHarness(mode, { notificationsFail: true });
    await manager.showUpdate(packageInfo({ verify_sha256: true, sha256: 'a'.repeat(64) }));
    state.downloads[0].progress({ totalBytesExpectedToWrite: 100, totalBytesWritten: 10 });
    state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
    assert.equal(state.modals.length, 1);
    assert.equal(state.verifies.length + state.installs.length, 0);
    state.modals[0].success({ confirm: true });
    state.modals[0].complete();
    assert.equal(state.verifies.length, 1);
    assert.equal(state.installs.length, 1);
    assert.equal(state.ready.length + state.restarts, 0);
    assert.ok(state.warnings.length >= 3);
  });
}

test('通知取消异常不阻塞 WGT 自动安装与重启提示', () => {
  const { manager, state } = createHarness('vapor', { notificationsFail: true });
  manager.startNotificationDownload(packageInfo({ type: 'wgt', is_update_prompt: false }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  assert.equal(state.modals.length, 0);
  assert.equal(state.wgtInstalls.length, 1);
  state.wgtInstalls[0].onSuccess();
  assert.equal(state.ready.length, 1);
  assert.equal(state.modals[0].confirmText, '重启');
  assert.equal(state.modals[0].content, '新版本已安装（2.0.0）\n点击重启立即生效或下次启动应用时生效');
  assert.doesNotMatch(state.modals[0].content, /release notes/);
});

for (const mode of ['vapor', 'uni1', 'ios']) {
  for (const content of [undefined, null, '', '自定义重启提醒\n请重启应用']) {
    test(mode + ': WGT 重启提醒优先使用云端文案，空值使用版本默认文案：' + content, () => {
      const { manager, state } = createHarness(mode);
      const info = packageInfo({ type: 'wgt', version: '3.2.1', update_prompt_content: content });
      manager.notifyUpdateReady(info);
      assert.equal(state.modals.length, 1);
      assert.equal(state.modals[0].content, content || '新版本已安装（3.2.1）\n点击重启立即生效或下次启动应用时生效');
      assert.doesNotMatch(state.modals[0].content, /release notes/);
    });
  }
}

test('ready 监听器直接 applyUpdate 不重复打开重启提示', async () => {
  const { manager, state } = createHarness('vapor');
  manager.onUpdateReady(() => manager.applyUpdate());
  await manager.showUpdate(packageInfo({ type: 'wgt' }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.wgt' });
  state.wgtInstalls[0].onSuccess();
  assert.equal(state.restarts, 1);
  assert.equal(state.modals.length, 0);
});

test('iOS APK 保留普通升级弹窗', async () => {
  const { manager, state } = createHarness('ios');
  await manager.showUpdate(packageInfo({ platform: ['iOS'] }));
  assert.equal(state.downloads.length, 0);
  assert.equal(state.dialogs.length, 1);
});

test('checkUpdate 仅检查，无参 showUpdate 使用缓存提醒包', async () => {
  const { manager, state } = createHarness('vapor');
  const event = await manager.checkUpdate();
  assert.equal(event.hasUpdate, true);
  assert.equal(state.downloads.length + state.dialogs.length, 0);
  await manager.showUpdate();
  assert.equal(state.downloads.length, 1);
  assert.equal(state.dialogs.length, 0);
});

test('APK 用户确认后才校验 SHA256，校验完成后才唤起安装器', async () => {
  const { manager, state } = createHarness('vapor', { deferVerify: true });
  await manager.showUpdate(packageInfo({ verify_sha256: true, sha256: 'a'.repeat(64) }));
  state.downloads[0].success({ statusCode: 200, tempFilePath: '/cache/update.apk' });
  assert.equal(state.verifies.length + state.installs.length, 0);
  state.modals[0].success({ confirm: true });
  state.modals[0].complete();
  assert.equal(state.verifies.length, 1);
  assert.equal(state.installs.length, 0);
  state.verifies[0].success();
  assert.equal(state.installs.length, 1);
});
