// Run with Node.js >= 23.6:
// node --test uni_modules/uni-install-wgt/tests/differential-version.test.cjs
// Execute the real UTS Worker after removing types; only native I/O is mocked.
'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const os = require('node:os');
const path = require('node:path');
const vm = require('node:vm');
const { spawnSync } = require('node:child_process');
const { stripTypeScriptTypes } = require('node:module');

if (typeof stripTypeScriptTypes !== 'function') {
  throw new Error('These Worker regression tests require Node.js >= 23.6');
}

const pluginRoot = path.resolve(__dirname, '..');
const projectRoot = path.resolve(pluginRoot, '../..');
const workerSource = fs.readFileSync(path.join(pluginRoot, 'workers/install-wgt-worker.uts'), 'utf8');
const diffHelper = path.join(projectRoot, 'scripts/create-wgt-diff.cjs');
const appId = '__UNI__CF467B8';

class JSONObject {
  constructor(value) { this.value = value; }
  static keys(value) { return Object.keys(value.value); }
  getString(key) { return typeof this.value[key] === 'string' ? this.value[key] : null; }
  getNumber(key) { return typeof this.value[key] === 'number' ? this.value[key] : null; }
  getArray(key) { return Array.isArray(this.value[key]) ? this.value[key] : null; }
  getJSON(key) {
    const value = this.value[key];
    return value != null && typeof value === 'object' && !Array.isArray(value)
      ? new JSONObject(value)
      : null;
  }
}

function compileWorker(platform) {
  const active = [true];
  const lines = [];
  for (const line of workerSource.split('\n')) {
    const conditional = line.match(/^\s*\/\/ #ifdef (\S+)/);
    if (conditional) {
      active.push(active[active.length - 1] && conditional[1] === platform);
    } else if (/^\s*\/\/ #endif/.test(line)) {
      assert.ok(active.length > 1, 'balanced platform directives');
      active.pop();
    } else if (active[active.length - 1] && !/^import /.test(line)) {
      lines.push(line);
    }
  }
  assert.equal(active.length, 1, 'balanced platform directives');
  const javascript = stripTypeScriptTypes(
    lines.join('\n').replace('export class InstallWgtWorker', 'class InstallWgtWorker'),
  );
  const context = vm.createContext({
    UTSJSONObject: JSONObject,
    WorkerTaskImpl: class {},
    options: null,
    JSON: {
      parseObject(source) {
        try { return new JSONObject(JSON.parse(source)); } catch { return null; }
      },
    },
  });
  vm.runInContext('Number.prototype.toInt = function () { return Math.trunc(this); };', context);
  return vm.runInContext(`${javascript}\nInstallWgtWorker`, context);
}

function manifest(name = '2.1.7', code = '217', extra = {}) {
  return {
    id: appId,
    version: { name, code },
    'uni-app-x': { compilerRuleVersion: 2 },
    ...extra,
  };
}

function createInstallHarness(Worker, {
  target = manifest('2.1.7', '217', { 'app-wgtu': { baseVersion: '2.1.6' } }),
  current = manifest('2.1.6', '216'),
  runtimeVersion = '2.1.6',
  ignoreVersion = false,
} = {}) {
  const worker = new Worker();
  Object.assign(worker, {
    runtimeAppId: appId,
    runtimeAppVersion: runtimeVersion,
    runtimeCompilerRuleVersion: 2,
    currentResourcePath: '/active',
    txnPath: '/txn',
    ignoreVersion,
  });
  const files = new Map([
    ['/active/manifest.json', JSON.stringify(current)],
    ['/active/app-config.js', 'base-config'],
    ['/active/app-service.js', 'base-service'],
    ['/active/static/logo.png', 'delete-me'],
    ['/package/manifest.json', JSON.stringify(target)],
    ['/package/app-config.js', 'target-config'],
    ['/package/app-service.js', 'target-service'],
    ['/package/static/added.txt', 'new-file'],
  ]);
  const messages = [];
  const copies = [];
  const activations = [];
  worker.getUnzippedResourcePath = () => '/package';
  worker.readUtf8File = (file) => files.get(file) ?? null;
  worker.requireFile = (file) => files.has(file);
  worker.removeDirectoryIfPresent = () => true;
  worker.isResourceSourceDirectoryEntry = () => false;
  worker.copyResourceDirectory = (source, targetPath, filtered) => {
    copies.push({ source, target: targetPath, filtered: Array.from(filtered) });
    for (const [file, contents] of Array.from(files)) {
      if (!file.startsWith(`${source}/`)) continue;
      const relative = file.slice(source.length + 1);
      if (!filtered.includes(relative)) files.set(`${targetPath}/${relative}`, contents);
    }
    return true;
  };
  worker.installValidatedResource = (differential) => {
    activations.push({ differential, path: worker.unzippedResourcePath });
    worker.terminalSuccess(worker.unzippedResourcePath);
  };
  worker.postMessage = (message) => messages.push(message);
  return { worker, files, messages, copies, activations, run: () => worker.validateAndInstall() };
}

function expectFailure(harness, code, expectedMessage) {
  harness.run();
  assert.equal(harness.messages.length, 1);
  assert.equal(harness.messages[0].type, 'terminal-failure');
  assert.equal(harness.messages[0].code, code);
  if (expectedMessage !== undefined) assert.equal(harness.messages[0].message, expectedMessage);
  assert.equal(harness.copies.length, 0, 'invalid metadata fails before copying resources');
  assert.equal(harness.activations.length, 0);
}

const downgradeMessage = 'differential WGT version must not be lower than the current WGT version';

for (const platform of ['APP-IOS', 'APP-ANDROID']) {
  const Worker = compileWorker(platform);
  for (const [name, code] of [['2.1.7', '217'], ['2.1.6', '216'], ['2.1.6', '217'],
    ['2.1.6', '1'], ['2.1.7', '1']]) {
    test(`${platform}: base 2.1.6 can install target ${name}/${code}`, () => {
      const target = manifest(name, code, {
        'app-wgtu': { baseVersion: '2.1.6', deleteFiles: ['/static/logo.png'] },
      });
      const harness = createInstallHarness(Worker, { target });
      harness.run();
      assert.equal(harness.messages[0].type, 'terminal-success');
      assert.equal(harness.messages[0].versionName, name, 'Runtime receives the target version');
      assert.equal(harness.activations[0].differential, true);
      assert.deepEqual(harness.copies.map((entry) => entry.source), ['/active', '/package']);
      const mergedManifest = JSON.parse(harness.files.get('/txn/merged-www/manifest.json'));
      assert.deepEqual(mergedManifest, target, 'overlay retains target version and base metadata');
      assert.equal(harness.files.has('/txn/merged-www/static/logo.png'), false);
      assert.equal(harness.files.get('/txn/merged-www/static/added.txt'), 'new-file');
    });
  }

  test(`${platform}: omitted ignoreVersion rejects differential downgrade by default`, () => {
    assert.equal(new Worker().ignoreVersion, false);
    expectFailure(createInstallHarness(Worker, {
      target: manifest('2.1.5', '215', { 'app-wgtu': { baseVersion: '2.1.6' } }),
    }), 103611, downgradeMessage);
  });

  for (const name of ['2.1.5', '2.1.6', '2.1.7']) {
    for (const ignoreVersion of [false, true]) {
      test(`${platform}: differential target ${name}, ignoreVersion=${ignoreVersion}`, () => {
        const harness = createInstallHarness(Worker, {
          target: manifest(name, '217', { 'app-wgtu': { baseVersion: '2.1.6' } }),
          ignoreVersion,
        });
        if (!ignoreVersion && name === '2.1.5') {
          expectFailure(harness, 103611, downgradeMessage);
        } else {
          harness.run();
          assert.equal(harness.messages[0].type, 'terminal-success');
          assert.equal(harness.messages[0].versionName, name);
          assert.equal(harness.activations[0].differential, true);
        }
      });
    }
  }

  for (const ignoreVersion of [false, true]) {
    test(`${platform}: Runtime base mismatch still fails with ignoreVersion=${ignoreVersion}`, () => {
      expectFailure(createInstallHarness(Worker, { runtimeVersion: '2.1.5', ignoreVersion }), 103622);
    });
    test(`${platform}: current manifest base mismatch still fails with ignoreVersion=${ignoreVersion}`, () => {
      expectFailure(createInstallHarness(Worker, { current: manifest('2.1.5', '215'), ignoreVersion }), 103622);
    });
    test(`${platform}: Runtime base mismatch takes priority over downgrade, ignoreVersion=${ignoreVersion}`, () => {
      expectFailure(createInstallHarness(Worker, {
        target: manifest('2.1.5', '215', { 'app-wgtu': { baseVersion: '2.1.6' } }),
        runtimeVersion: '2.1.7',
        ignoreVersion,
      }), 103622);
    });
    test(`${platform}: current manifest base mismatch takes priority over downgrade, ignoreVersion=${ignoreVersion}`, () => {
      expectFailure(createInstallHarness(Worker, {
        target: manifest('2.1.5', '215', { 'app-wgtu': { baseVersion: '2.1.6' } }),
        current: manifest('2.1.7', '217'),
        ignoreVersion,
      }), 103622);
    });
  }

  for (const [metadata, code] of [[{}, 103620], [{ baseVersion: '' }, 103621],
    [{ baseVersion: 'bad' }, 103621], [{ baseVersion: 216 }, 103621]]) {
    test(`${platform}: rejects invalid base metadata ${JSON.stringify(metadata)}`, () => {
      expectFailure(createInstallHarness(Worker, {
        target: manifest('2.1.7', '217', { 'app-wgtu': metadata }),
      }), code);
    });
  }

  for (const version of [{ name: 'bad', code: '217' }, { code: '217' },
    { name: '2.1.7' }, { name: '2.1.7', code: 'bad' }]) {
    test(`${platform}: target version fields remain mandatory and validated ${JSON.stringify(version)}`, () => {
      expectFailure(createInstallHarness(Worker, {
        target: manifest(undefined, undefined, { version, 'app-wgtu': { baseVersion: '2.1.6' } }),
      }), 103610);
    });
  }

  for (const [target, code] of [
    [manifest('2.1.7', '217', { id: '__UNI__OTHER', 'app-wgtu': { baseVersion: '2.1.6' } }), 103614],
    [manifest('2.1.7', '217', { 'uni-app-x': {}, 'app-wgtu': { baseVersion: '2.1.6' } }), 103618],
    [manifest('2.1.7', '217', { 'uni-app-x': { compilerRuleVersion: 3 }, 'app-wgtu': { baseVersion: '2.1.6' } }), 103619],
  ]) {
    test(`${platform}: differential update retains app/compiler validation (${code})`, () => {
      expectFailure(createInstallHarness(Worker, { target }), code);
    });
  }

  for (const name of ['2.1.5', '2.1.6', '2.1.7']) {
    for (const ignoreVersion of [false, true]) {
      test(`${platform}: full package ${name}, ignoreVersion=${ignoreVersion}`, () => {
        const harness = createInstallHarness(Worker, { target: manifest(name, '217'), ignoreVersion });
        if (!ignoreVersion && name !== '2.1.7') {
          expectFailure(harness, 103611);
        } else {
          harness.run();
          assert.equal(harness.messages[0].type, 'terminal-success');
          assert.equal(harness.messages[0].versionName, name);
          assert.equal(harness.activations[0].differential, false);
        }
      });
    }
  }

  for (const [base, targetName, comparison] of [
    ['2.1.9', '2.1.10', 1],
    ['2.1.10', '2.1.9', -1],
    ['2.1.6', '02.01.006', 0],
    ['2.1.6', '2.1.6.0', 0],
    ['2.1.6.0', '2.1.6', 0],
    ['2.99999999999999999999999999999999999999', '2.100000000000000000000000000000000000000', 1],
    ['2.9007199254740993', '2.9007199254740992', -1],
  ]) {
    test(`${platform}: both package types compare ${targetName} against ${base} numerically`, () => {
      for (const differential of [false, true]) {
        const harness = createInstallHarness(Worker, {
          current: manifest(base, '216'),
          runtimeVersion: base,
          target: manifest(targetName, '1', differential ? { 'app-wgtu': { baseVersion: base } } : {}),
        });
        if (comparison < 0 || (!differential && comparison === 0)) {
          expectFailure(harness, 103611, differential ? downgradeMessage : undefined);
        } else {
          harness.run();
          assert.equal(harness.messages[0].type, 'terminal-success');
          assert.equal(harness.messages[0].versionName, targetName);
          assert.equal(harness.activations[0].differential, differential);
        }
      }
    });
  }
}

function createDiffFixture(t, targetVersion) {
  const root = fs.mkdtempSync(path.join(os.tmpdir(), 'wgt-version-test-'));
  t.after(() => fs.rmSync(root, { recursive: true, force: true }));
  const base = path.join(root, 'base');
  const target = path.join(root, 'target');
  const delta = path.join(root, 'delta');
  fs.mkdirSync(path.join(base, 'static'), { recursive: true });
  fs.mkdirSync(path.join(target, 'static'), { recursive: true });
  fs.writeFileSync(path.join(base, 'manifest.json'), JSON.stringify(manifest('2.1.6', '216')));
  fs.writeFileSync(path.join(target, 'manifest.json'), JSON.stringify(manifest('2.1.7', '217', { version: targetVersion })));
  fs.writeFileSync(path.join(base, 'app-service.js'), 'base');
  fs.writeFileSync(path.join(target, 'app-service.js'), 'target');
  fs.writeFileSync(path.join(base, 'static/logo.png'), 'deleted');
  fs.writeFileSync(path.join(target, 'static/new.txt'), 'added');
  const result = spawnSync(process.execPath, [diffHelper, base, target, delta, '2.1.6', '216'], { encoding: 'utf8' });
  return { result, delta };
}

for (const version of [{ name: '2.1.7', code: '217' }, { name: '2.1.6', code: '216' },
  { name: '2.1.6', code: '217' }]) {
  test(`diff generator preserves independent target ${version.name}/${version.code}`, (t) => {
    const { result, delta } = createDiffFixture(t, version);
    assert.equal(result.status, 0, result.stderr);
    const report = JSON.parse(result.stdout);
    assert.equal(report.baseVersion, '2.1.6');
    assert.equal(report.targetVersion, version.name);
    assert.equal(report.targetVersionCode, version.code);
    assert.deepEqual(report.deleted, ['/static/logo.png']);
    assert.deepEqual(report.added, ['/static/new.txt']);
    const outputManifest = JSON.parse(fs.readFileSync(path.join(delta, 'manifest.json'), 'utf8'));
    assert.deepEqual(outputManifest.version, version);
    assert.deepEqual(outputManifest['app-wgtu'], { baseVersion: '2.1.6', deleteFiles: ['/static/logo.png'] });
    assert.equal(fs.readFileSync(path.join(delta, 'app-service.js'), 'utf8'), 'target');
  });
}

for (const version of [{ name: 'invalid', code: '217' }, { name: '2.1.7', code: 'invalid' },
  { name: '2.1.7' }]) {
  test(`diff generator rejects invalid target ${JSON.stringify(version)}`, (t) => {
    const { result, delta } = createDiffFixture(t, version);
    assert.equal(result.status, 1);
    assert.match(JSON.parse(result.stderr).error, /manifest.json must contain/);
    assert.equal(fs.existsSync(delta), false);
  });
}
