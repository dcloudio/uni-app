"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isUniHelpers = exports.isUTSProxy = exports.tscOutDir = exports.uvueOutDir = exports.genUniExtApiDeclarationFileOnce = exports.initUTSSwiftAutoImportsOnce = exports.initUTSKotlinAutoImportsOnce = exports.resolveUniTypeScript = exports.parseUniExtApiNamespacesJsOnce = exports.parseUniExtApiNamespacesOnce = exports.parseSwiftPackageWithPluginId = exports.parseKotlinPackageWithPluginId = exports.initUTSComponents = exports.parseUTSComponent = exports.getUTSComponentAutoImports = exports.isUTSComponent = exports.resolveUTSCompilerVersion = exports.resolveUTSCompiler = exports.resolveUTSModule = exports.resolveUTSAppModule = void 0;
// 重要，该文件编译后的 js 需要同步到 vue2 编译器 uni-cli-shared/lib/uts
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const hbx_1 = require("./hbx");
const utils_1 = require("./utils");
const uni_modules_1 = require("./uni_modules");
function once(fn, ctx = null) {
    let res;
    return ((...args) => {
        if (fn) {
            res = fn.apply(ctx, args);
            fn = null;
        }
        return res;
    });
}
/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
function resolveUTSAppModule(platform, id, importer, includeUTSSDK = true) {
    id = path_1.default.resolve(importer, id);
    if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
        const parts = (0, utils_1.normalizePath)(id).split('/');
        const parentDir = parts[parts.length - 2];
        if (parentDir === 'uni_modules' ||
            (includeUTSSDK && parentDir === 'utssdk')) {
            const basedir = parentDir === 'uni_modules' ? 'utssdk' : '';
            if (process.env.UNI_APP_X_UVUE_SCRIPT_ENGINE === 'js') {
                // js engine
                if (parentDir === 'uni_modules') {
                    const appJsIndex = path_1.default.resolve(id, basedir, 'app-js', 'index.uts');
                    if (fs_extra_1.default.existsSync(appJsIndex)) {
                        return appJsIndex;
                    }
                }
            }
            if (fs_extra_1.default.existsSync(path_1.default.resolve(id, basedir, 'index.uts'))) {
                return id;
            }
            const fileName = id.split('?')[0];
            const resolvePlatformDir = (p) => {
                return path_1.default.resolve(fileName, basedir, p);
            };
            const extname = ['.uts', '.vue', '.uvue'];
            if (platform === 'app-harmony') {
                if (resolveUTSFile(resolvePlatformDir(platform), extname)) {
                    return id;
                }
                return;
            }
            if (resolveUTSFile(resolvePlatformDir('app-android'), extname)) {
                return id;
            }
            if (resolveUTSFile(resolvePlatformDir('app-ios'), extname)) {
                return id;
            }
        }
    }
}
exports.resolveUTSAppModule = resolveUTSAppModule;
// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
function resolveUTSModule(id, importer, includeUTSSDK = true) {
    if (process.env.UNI_PLATFORM === 'app' ||
        process.env.UNI_PLATFORM === 'app-plus' ||
        process.env.UNI_PLATFORM === 'app-harmony') {
        return resolveUTSAppModule(process.env.UNI_UTS_PLATFORM, id, importer);
    }
    id = path_1.default.resolve(importer, id);
    if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
        const parts = (0, utils_1.normalizePath)(id).split('/');
        const parentDir = parts[parts.length - 2];
        if (parentDir === 'uni_modules' ||
            (includeUTSSDK && parentDir === 'utssdk')) {
            const basedir = parentDir === 'uni_modules' ? 'utssdk' : '';
            const resolvePlatformDir = (p) => {
                return path_1.default.resolve(id, basedir, p);
            };
            let index = resolveUTSFile(resolvePlatformDir(process.env.UNI_UTS_PLATFORM));
            if (index) {
                return index;
            }
            index = path_1.default.resolve(id, basedir, 'index.uts');
            if (fs_extra_1.default.existsSync(index)) {
                return index;
            }
        }
    }
}
exports.resolveUTSModule = resolveUTSModule;
function resolveUTSFile(dir, extensions = ['.uts', '.ts', '.js']) {
    for (let i = 0; i < extensions.length; i++) {
        const indexFile = path_1.default.join(dir, 'index' + extensions[i]);
        if (fs_extra_1.default.existsSync(indexFile)) {
            return indexFile;
        }
    }
}
function resolveUTSCompiler(throwError = false) {
    let compilerPath = '';
    if (process.env.UNI_COMPILE_TARGET === 'ext-api' &&
        process.env.UNI_APP_NEXT_WORKSPACE) {
        return require(path_1.default.resolve(process.env.UNI_APP_NEXT_WORKSPACE, 'packages/uni-uts-v1'));
    }
    if ((0, hbx_1.isInHBuilderX)()) {
        try {
            compilerPath = require.resolve(path_1.default.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts-v1'));
        }
        catch (e) { }
    }
    if (!compilerPath) {
        try {
            compilerPath = require.resolve('@dcloudio/uni-uts-v1', {
                paths: [process.env.UNI_CLI_CONTEXT || process.cwd()],
            });
        }
        catch (e) {
            if (throwError) {
                throw `Error: Cannot find module '@dcloudio/uni-uts-v1'`;
            }
            console.error((0, utils_1.installDepTips)('devDependencies', '@dcloudio/uni-uts-v1', resolveUTSCompilerVersion()));
            process.exit(0);
        }
    }
    return require(compilerPath);
}
exports.resolveUTSCompiler = resolveUTSCompiler;
function resolveUTSCompilerVersion() {
    let utsCompilerVersion = '';
    try {
        utsCompilerVersion = require('../package.json').version;
    }
    catch (e) {
        try {
            // vue2
            utsCompilerVersion = require('../../package.json').version;
        }
        catch (e) { }
    }
    if (utsCompilerVersion.startsWith('2.0.')) {
        utsCompilerVersion = '^3.0.0-alpha-3060920221117001';
    }
    return utsCompilerVersion;
}
exports.resolveUTSCompilerVersion = resolveUTSCompilerVersion;
const utsComponents = new Map();
function isUTSComponent(name) {
    return utsComponents.has(name);
}
exports.isUTSComponent = isUTSComponent;
function getUTSComponentAutoImports(language) {
    const utsComponentAutoImports = {};
    utsComponents.forEach(({ kotlinPackage, swiftModule }, name) => {
        const source = language === 'kotlin' ? kotlinPackage : swiftModule;
        const className = (0, utils_1.capitalize)((0, utils_1.camelize)(name)) + 'Element';
        if (!utsComponentAutoImports[source]) {
            utsComponentAutoImports[source] = [[className]];
        }
        else {
            if (!utsComponentAutoImports[source].find((item) => item[0] === className)) {
                utsComponentAutoImports[source].push([className]);
            }
        }
    });
    return utsComponentAutoImports;
}
exports.getUTSComponentAutoImports = getUTSComponentAutoImports;
function parseUTSComponent(name, type) {
    const meta = utsComponents.get(name);
    if (meta) {
        const namespace = meta[type === 'swift' ? 'swiftModule' : 'kotlinPackage'] || '';
        const className = (0, utils_1.capitalize)((0, utils_1.camelize)(name)) + 'Component';
        return {
            className,
            namespace,
            source: meta.source,
        };
    }
}
exports.parseUTSComponent = parseUTSComponent;
function initUTSComponents(inputDir, platform) {
    utsComponents.clear();
    const components = [];
    const isApp = platform === 'app' || platform === 'app-plus';
    const easycomsObj = {};
    const dirs = resolveUTSComponentDirs(inputDir);
    dirs.forEach((dir) => {
        const is_uni_modules_utssdk = dir.endsWith('utssdk');
        const is_ussdk = !is_uni_modules_utssdk && path_1.default.dirname(dir).endsWith('utssdk');
        const pluginId = is_uni_modules_utssdk
            ? path_1.default.basename(path_1.default.dirname(dir))
            : path_1.default.basename(dir);
        if (is_uni_modules_utssdk || is_ussdk) {
            // dir 是 uni_modules/test-plugin/utssdk 或者 utssdk/test-plugin
            // 需要分平台解析，不能直接解析 utssdk 目录下的文件，因为 utssdk 目录下可能存在多个平台的文件
            const cwd = isApp
                ? dir
                : path_1.default.join(dir, platform === 'h5' ? 'web' : platform);
            fast_glob_1.default
                .sync('**/*.vue', {
                cwd,
                absolute: true,
            })
                .forEach((file) => {
                let name = parseVueComponentName(file);
                if (!name) {
                    if (file.endsWith('index.vue')) {
                        name = path_1.default.basename(is_uni_modules_utssdk ? path_1.default.dirname(dir) : dir);
                    }
                }
                if (name) {
                    const source = '@/' +
                        (0, utils_1.normalizePath)(isApp
                            ? path_1.default.relative(inputDir, is_uni_modules_utssdk ? path_1.default.dirname(dir) : dir)
                            : path_1.default.relative(inputDir, file));
                    easycomsObj[`^${name}$`] = {
                        source: isApp ? `${source}?uts-proxy` : source,
                        kotlinPackage: parseKotlinPackageWithPluginId(pluginId, is_uni_modules_utssdk),
                        swiftModule: parseSwiftPackageWithPluginId(pluginId, is_uni_modules_utssdk),
                    };
                }
            });
        }
    });
    Object.keys(easycomsObj).forEach((name) => {
        const obj = easycomsObj[name];
        const componentName = name.slice(1, -1);
        components.push({
            name: componentName,
            pattern: new RegExp(name),
            replacement: obj.source,
        });
        utsComponents.set(componentName, {
            source: obj.source,
            kotlinPackage: obj.kotlinPackage,
            swiftModule: obj.swiftModule,
        });
    });
    return components;
}
exports.initUTSComponents = initUTSComponents;
function resolveUTSComponentDirs(inputDir) {
    const utssdkDir = path_1.default.resolve(inputDir, 'utssdk');
    const uniModulesDir = path_1.default.resolve(inputDir, 'uni_modules');
    return (fs_extra_1.default.existsSync(utssdkDir)
        ? fast_glob_1.default.sync('*', {
            cwd: utssdkDir,
            absolute: true,
            onlyDirectories: true,
        })
        : []).concat(fs_extra_1.default.existsSync(uniModulesDir)
        ? fast_glob_1.default.sync('*/utssdk', {
            cwd: uniModulesDir,
            absolute: true,
            onlyDirectories: true,
        })
        : []);
}
const nameRE = /name\s*:\s*['|"](.*)['|"]/;
function parseVueComponentName(file) {
    const content = fs_extra_1.default.readFileSync(file, 'utf8');
    const matches = content.match(nameRE);
    if (matches) {
        return matches[1];
    }
}
function prefix(id) {
    if (process.env.UNI_UTS_MODULE_PREFIX &&
        !id.startsWith(process.env.UNI_UTS_MODULE_PREFIX)) {
        return process.env.UNI_UTS_MODULE_PREFIX + '-' + id;
    }
    return id;
}
function parseKotlinPackageWithPluginId(id, is_uni_modules) {
    return 'uts.sdk.' + (is_uni_modules ? 'modules.' : '') + (0, utils_1.camelize)(prefix(id));
}
exports.parseKotlinPackageWithPluginId = parseKotlinPackageWithPluginId;
function parseSwiftPackageWithPluginId(id, is_uni_modules) {
    return ('UTSSDK' +
        (is_uni_modules ? 'Modules' : '') +
        (0, utils_1.capitalize)((0, utils_1.camelize)(prefix(id))));
}
exports.parseSwiftPackageWithPluginId = parseSwiftPackageWithPluginId;
async function parseUniExtApiAutoImports(uniExtApiAutoImports, extApis, parseSource) {
    if (Object.keys(extApis).length) {
        const { parseExportIdentifiers } = resolveUTSCompiler();
        for (const name in extApis) {
            const options = extApis[name];
            if ((0, utils_1.isArray)(options) && options.length >= 2) {
                const pluginId = path_1.default.basename(options[0]);
                const source = parseSource(pluginId);
                if (uniExtApiAutoImports[source]) {
                    continue;
                }
                uniExtApiAutoImports[source] = [];
                const filename = `uni_modules/${pluginId}/utssdk/interface.uts`;
                const interfaceFileName = path_1.default.resolve(process.env.UNI_INPUT_DIR, filename);
                if (fs_extra_1.default.existsSync(interfaceFileName)) {
                    const ids = await parseExportIdentifiers(interfaceFileName);
                    ids
                        // 过滤掉 Uni
                        .filter((id) => id !== 'Uni')
                        .forEach((id) => {
                        uniExtApiAutoImports[source].push([id]);
                    });
                }
            }
        }
    }
    return uniExtApiAutoImports;
}
let uniExtApiKotlinAutoImports = null;
async function parseUniExtApiKotlinAutoImportsOnce(extApis) {
    if (uniExtApiKotlinAutoImports) {
        return uniExtApiKotlinAutoImports;
    }
    uniExtApiKotlinAutoImports = {};
    return parseUniExtApiAutoImports(uniExtApiKotlinAutoImports, extApis, (pluginId) => {
        return parseKotlinPackageWithPluginId(pluginId, true);
    });
}
let uniExtApiSwiftAutoImports = null;
async function parseUniExtApiSwiftAutoImportsOnce(extApis) {
    if (uniExtApiSwiftAutoImports) {
        return uniExtApiSwiftAutoImports;
    }
    uniExtApiSwiftAutoImports = {};
    return parseUniExtApiAutoImports(uniExtApiSwiftAutoImports, extApis, (pluginId) => {
        return parseSwiftPackageWithPluginId(pluginId, true);
    });
}
exports.parseUniExtApiNamespacesOnce = once((platform, language) => {
    const extApis = (0, exports.parseUniExtApiNamespacesJsOnce)(platform, language);
    const namespaces = {};
    Object.keys(extApis).forEach((name) => {
        const options = extApis[name];
        let source = options[0];
        const pluginId = path_1.default.basename(options[0]);
        if (language === 'kotlin') {
            source = parseKotlinPackageWithPluginId(pluginId, true);
        }
        else if (language === 'swift') {
            source = parseSwiftPackageWithPluginId(pluginId, true);
        }
        namespaces[name] = [source, options[1]];
    });
    return namespaces;
});
exports.parseUniExtApiNamespacesJsOnce = once((platform, language) => {
    const extApis = (0, uni_modules_1.parseUniExtApis)(true, platform, language);
    const namespaces = {};
    Object.keys(extApis).forEach((name) => {
        const options = extApis[name];
        if ((0, utils_1.isArray)(options) && options.length >= 2) {
            namespaces[name.replace('uni.', '')] = [options[0], options[1]];
        }
    });
    return namespaces;
});
function resolveUniTypeScript() {
    if ((0, hbx_1.isInHBuilderX)()) {
        return require(path_1.default.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts-v1', 'node_modules', '@dcloudio', 'uni-uts-v1', 'lib', 'typescript'));
    }
    return require('@dcloudio/uni-uts-v1/lib/typescript');
}
exports.resolveUniTypeScript = resolveUniTypeScript;
async function initUTSAutoImports(autoImports, platform, language) {
    const utsComponents = getUTSComponentAutoImports(language);
    Object.keys(utsComponents).forEach((source) => {
        if (autoImports[source]) {
            autoImports[source].push(...utsComponents[source]);
        }
        else {
            autoImports[source] = utsComponents[source];
        }
    });
    const extApis = (0, uni_modules_1.parseUniExtApis)(true, platform, language);
    const extApiImports = await (language === 'kotlin'
        ? parseUniExtApiKotlinAutoImportsOnce
        : parseUniExtApiSwiftAutoImportsOnce)(extApis);
    Object.keys(extApiImports).forEach((source) => {
        if (autoImports[source]) {
            autoImports[source].push(...extApiImports[source]);
        }
        else {
            autoImports[source] = extApiImports[source];
        }
    });
    return autoImports;
}
let autoKotlinImports = null;
async function initUTSKotlinAutoImportsOnce() {
    if (autoKotlinImports) {
        return autoKotlinImports;
    }
    autoKotlinImports = {};
    return initUTSAutoImports(autoKotlinImports, 'app-android', 'kotlin');
}
exports.initUTSKotlinAutoImportsOnce = initUTSKotlinAutoImportsOnce;
let autoSwiftImports = null;
async function initUTSSwiftAutoImportsOnce() {
    if (autoSwiftImports) {
        return autoSwiftImports;
    }
    autoSwiftImports = {};
    return initUTSAutoImports(autoSwiftImports, 'app-ios', 'swift');
}
exports.initUTSSwiftAutoImportsOnce = initUTSSwiftAutoImportsOnce;
exports.genUniExtApiDeclarationFileOnce = once((tscInputDir) => {
    const extApis = (0, uni_modules_1.parseUniExtApis)(true, 'app-android', 'kotlin');
    // 之所以往上一级写，是因为 tscInputDir 会被 empty，目前时机有问题，比如先生成了d.ts，又被empty
    const fileName = path_1.default.resolve(tscInputDir, '../uni-ext-api.d.ts');
    if (fs_extra_1.default.existsSync(fileName)) {
        try {
            // 先删除
            fs_extra_1.default.unlinkSync(fileName);
        }
        catch (e) { }
    }
    if (Object.keys(extApis).length) {
        const apis = [];
        for (const name in extApis) {
            const options = extApis[name];
            if ((0, utils_1.isArray)(options) && options.length >= 2) {
                const api = name.replace('uni.', '');
                apis.push('  ' + api + `: typeof import("${options[0]}")["${options[1]}"]`);
            }
        }
        if (apis.length) {
            fs_extra_1.default.outputFileSync(fileName, `
interface Uni {
${apis.join('\n')}
}
`);
        }
    }
});
function uvueOutDir(platform) {
    return path_1.default.join(process.env.UNI_APP_X_UVUE_DIR, platform);
}
exports.uvueOutDir = uvueOutDir;
function tscOutDir(platform) {
    return path_1.default.join(process.env.UNI_APP_X_TSC_DIR, platform);
}
exports.tscOutDir = tscOutDir;
const UTSProxyRE = /\?uts-proxy$/;
const UniHelpersRE = /\?uni_helpers$/;
function isUTSProxy(id) {
    return UTSProxyRE.test(id);
}
exports.isUTSProxy = isUTSProxy;
function isUniHelpers(id) {
    return UniHelpersRE.test(id);
}
exports.isUniHelpers = isUniHelpers;
