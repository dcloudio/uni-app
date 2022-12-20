"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUTSComponents = exports.resolveUTSCompiler = exports.resolveUtsModule = exports.resolveUtsAppModule = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const fast_glob_1 = __importDefault(require("fast-glob"));
const hbx_1 = require("./hbx");
const utils_1 = require("./utils");
/**
 * 解析 app 平台的 uts 插件，任意平台（android|ios）存在即可
 * @param id
 * @param importer
 * @returns
 */
function resolveUtsAppModule(id, importer) {
    id = path_1.default.resolve(importer, id);
    if (id.includes('utssdk') || id.includes('uni_modules')) {
        const parts = (0, utils_1.normalizePath)(id).split('/');
        const parentDir = parts[parts.length - 2];
        if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
            const basedir = parentDir === 'uni_modules' ? 'utssdk' : '';
            if (fs_1.default.existsSync(path_1.default.resolve(id, basedir, 'index.uts'))) {
                return id;
            }
            const resolvePlatformDir = (p) => {
                return path_1.default.resolve(id, basedir, p);
            };
            const extname = ['.uts'];
            if (resolveUtsFile(resolvePlatformDir('app-android'), extname)) {
                return id;
            }
            if (resolveUtsFile(resolvePlatformDir('app-ios'), extname)) {
                return id;
            }
        }
    }
}
exports.resolveUtsAppModule = resolveUtsAppModule;
// 仅限 root/uni_modules/test-plugin | root/utssdk/test-plugin 格式
function resolveUtsModule(id, importer) {
    if (process.env.UNI_PLATFORM === 'app' ||
        process.env.UNI_PLATFORM === 'app-plus') {
        return resolveUtsAppModule(id, importer);
    }
    id = path_1.default.resolve(importer, id);
    if (id.includes('utssdk') || id.includes('uni_modules')) {
        const parts = (0, utils_1.normalizePath)(id).split('/');
        const parentDir = parts[parts.length - 2];
        if (parentDir === 'uni_modules' || parentDir === 'utssdk') {
            const basedir = parentDir === 'uni_modules' ? 'utssdk' : '';
            const resolvePlatformDir = (p) => {
                return path_1.default.resolve(id, basedir, p);
            };
            let index = resolveUtsFile(resolvePlatformDir(process.env.UNI_UTS_PLATFORM));
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
exports.resolveUtsModule = resolveUtsModule;
function resolveUtsFile(dir, extensions = ['.uts', '.ts', '.js']) {
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
function initUTSComponents(inputDir, platform) {
    const components = [];
    if (platform !== 'app' && platform !== 'app-plus') {
        return components;
    }
    const easycomsObj = Object.create(null);
    const dirs = resolveUTSComponentDirs(inputDir);
    dirs.forEach((dir) => {
        const is_uni_modules_utssdk = dir.endsWith('utssdk');
        const is_ussdk = !is_uni_modules_utssdk && path_1.default.dirname(dir).endsWith('utssdk');
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
                    easycomsObj[`^${name}$`] = `\0${importDir}?uts-proxy`;
                }
            });
        }
    });
    Object.keys(easycomsObj).forEach((name) => {
        components.push({
            pattern: new RegExp(name),
            replacement: easycomsObj[name],
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
