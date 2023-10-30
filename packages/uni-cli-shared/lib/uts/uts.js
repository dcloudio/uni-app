"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseUniExtApiNamespacesJsOnce = exports.parseUniExtApiNamespacesOnce = exports.parseSwiftPackageWithPluginId = exports.parseKotlinPackageWithPluginId = exports.initUTSComponents = exports.parseUTSComponent = exports.isUTSComponent = exports.resolveUTSCompiler = exports.resolveUTSModule = exports.resolveUTSAppModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const hbx_1 = require("./hbx");
const utils_1 = require("./utils");
const uni_modules_1 = require("./uni_modules");
// 重要，该文件编译后的 js 需要同步到 vue2 编译器 uni-cli-shared/lib/uts
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
function resolveUTSAppModule(id, importer, includeUTSSDK = true) {
    id = path_1.default.resolve(importer, id);
    if (id.includes('uni_modules') || (includeUTSSDK && id.includes('utssdk'))) {
        const parts = (0, utils_1.normalizePath)(id).split('/');
        const parentDir = parts[parts.length - 2];
        if (parentDir === 'uni_modules' ||
            (includeUTSSDK && parentDir === 'utssdk')) {
            const basedir = parentDir === 'uni_modules' ? 'utssdk' : '';
            if (fs_1.default.existsSync(path_1.default.resolve(id, basedir, 'index.uts'))) {
                return id;
            }
            const resolvePlatformDir = (p) => {
                return path_1.default.resolve(id, basedir, p);
            };
            const extname = ['.uts'];
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
        process.env.UNI_PLATFORM === 'app-plus') {
        return resolveUTSAppModule(id, importer);
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
            if (fs_1.default.existsSync(index)) {
                return index;
            }
        }
    }
}
exports.resolveUTSModule = resolveUTSModule;
function resolveUTSFile(dir, extensions = ['.uts', '.ts', '.js']) {
    for (let i = 0; i < extensions.length; i++) {
        const indexFile = path_1.default.join(dir, 'index' + extensions[i]);
        if (fs_1.default.existsSync(indexFile)) {
            return indexFile;
        }
    }
}
function resolveUTSCompiler() {
    let compilerPath = '';
    if ((0, hbx_1.isInHBuilderX)()) {
        try {
            compilerPath = require.resolve(path_1.default.resolve(process.env.UNI_HBUILDERX_PLUGINS, 'uniapp-uts-v1'));
        }
        catch (e) { }
    }
    if (!compilerPath) {
        try {
            compilerPath = require.resolve('@dcloudio/uni-uts-v1', {
                paths: [process.env.UNI_CLI_CONTEXT],
            });
        }
        catch (e) {
            let utsCompilerVersion = utils_1.version;
            if (utils_1.version.startsWith('2.0.')) {
                utsCompilerVersion = '^3.0.0-alpha-3060920221117001';
            }
            console.error((0, utils_1.installDepTips)('devDependencies', '@dcloudio/uni-uts-v1', utsCompilerVersion));
            process.exit(0);
        }
    }
    return require(compilerPath);
}
exports.resolveUTSCompiler = resolveUTSCompiler;
const utsComponents = new Map();
function isUTSComponent(name) {
    return utsComponents.has(name);
}
exports.isUTSComponent = isUTSComponent;
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
    if (platform !== 'app' && platform !== 'app-plus') {
        return components;
    }
    const easycomsObj = {};
    const dirs = resolveUTSComponentDirs(inputDir);
    dirs.forEach((dir) => {
        const is_uni_modules_utssdk = dir.endsWith('utssdk');
        const is_ussdk = !is_uni_modules_utssdk && path_1.default.dirname(dir).endsWith('utssdk');
        const pluginId = is_uni_modules_utssdk
            ? path_1.default.basename(path_1.default.dirname(dir))
            : path_1.default.basename(dir);
        if (is_uni_modules_utssdk || is_ussdk) {
            fast_glob_1.default
                .sync('**/*.vue', {
                cwd: dir,
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
                    const importDir = (0, utils_1.normalizePath)(is_uni_modules_utssdk ? path_1.default.dirname(dir) : dir);
                    easycomsObj[`^${name}$`] = {
                        source: `${importDir}?uts-proxy`,
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
    return fast_glob_1.default
        .sync('*', {
        cwd: utssdkDir,
        absolute: true,
        onlyDirectories: true,
    })
        .concat(fast_glob_1.default.sync('*/utssdk', {
        cwd: uniModulesDir,
        absolute: true,
        onlyDirectories: true,
    }));
}
const nameRE = /name\s*:\s*['|"](.*)['|"]/;
function parseVueComponentName(file) {
    const content = fs_1.default.readFileSync(file, 'utf8');
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
