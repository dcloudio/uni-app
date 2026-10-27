"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExtComponentFile = exports.syncExtApiDir = exports.normalizeTrailingNewline = exports.removeSfcStyles = exports.parseSfc = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const fast_glob_1 = require("fast-glob");
const prettier_1 = require("prettier");
function resolve(file) {
    return path_1.default.resolve(__dirname, file);
}
const uniComponentsPath = resolve('../packages/uni-components');
const PREPROCESS_KEYS = [
    'APP',
    'APP_ANDROID',
    'APP_IOS',
    'APP_HARMONY',
    'APP_HARMONY_JSVM',
    'H5',
    'WEB',
    'MP',
    'VUE3_VAPOR',
];
function createPreContext(context) {
    const preContext = PREPROCESS_KEYS.reduce((preContext, key) => {
        preContext[key] = false;
        return preContext;
    }, {});
    return { ...preContext, ...context };
}
// Web Vapor 从 uni-ext-api 编译 Loading；这里仍负责旧 Web 和两种 MP 的副本，不能随 Vapor 迁移删除。
const syncTargets = [
    {
        path: path_1.default.resolve(uniComponentsPath, './lib-x/uniloading'),
        componentName: 'uniloading',
        scriptLang: 'uts',
        context: createPreContext({ MP: true }),
    },
    {
        path: path_1.default.resolve(uniComponentsPath, './lib-x-vapor/uniloading'),
        componentName: 'uniloading',
        scriptLang: 'ts',
        context: createPreContext({ MP: true, VUE3_VAPOR: true }),
    },
    {
        path: path_1.default.resolve(uniComponentsPath, './src/vue/loading'),
        componentName: 'index-x',
        scriptLang: 'ts',
        context: createPreContext({ WEB: true, H5: true }),
        stylePath: path_1.default.resolve(uniComponentsPath, './style-x/loading.css'),
    },
];
const components = [
    {
        originName: 'loading',
        targetName: 'uniloading',
    },
];
function parseSfc(code, filename) {
    return (0, compiler_sfc_1.parse)(code, { filename });
}
exports.parseSfc = parseSfc;
function removeSfcStyles(code) {
    return normalizeTrailingNewline(code.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ''));
}
exports.removeSfcStyles = removeSfcStyles;
function normalizeTrailingNewline(code) {
    const newline = code.includes('\r\n') ? '\r\n' : '\n';
    return code.replace(/(?:\r?\n)+$/, newline);
}
exports.normalizeTrailingNewline = normalizeTrailingNewline;
function syncExtApiDir(sourceDir, outputDir) {
    if (fs_extra_1.default.existsSync(outputDir)) {
        fs_extra_1.default.emptyDirSync(outputDir);
    }
    fs_extra_1.default.copySync(sourceDir, outputDir);
    (0, fast_glob_1.sync)('**/*.uts', { absolute: true, cwd: outputDir }).forEach((file) => {
        fs_extra_1.default.renameSync(file, file + '.ts');
    });
    (0, fast_glob_1.sync)('**/*.{vue,uvue}', { absolute: true, cwd: outputDir }).forEach((file) => {
        const newFile = file.replace(/\.uvue$/, '.vue');
        if (newFile !== file)
            fs_extra_1.default.renameSync(file, newFile);
        const content = fs_extra_1.default.readFileSync(newFile, 'utf8');
        const normalized = content
            .replace(/\r\n/g, '\n')
            .replace(/\.uvue(['"])/g, '.vue$1');
        if (normalized !== content)
            fs_extra_1.default.writeFileSync(newFile, normalized);
    });
}
exports.syncExtApiDir = syncExtApiDir;
function syncExtComponentFile(apiDirs, targets = syncTargets) {
    try {
        const { preprocess } = require('../packages/uni-preprocess');
        apiDirs.forEach((apiDir) => {
            components.forEach((component) => {
                const componentDir = `uni-${component.originName}`;
                (0, fast_glob_1.sync)(`${componentDir}/package.json`, {
                    cwd: apiDir,
                    absolute: true,
                }).forEach((packageJsonPath) => {
                    const componentsDir = path_1.default.resolve(packageJsonPath, '../components');
                    syncComponent(componentsDir, component, preprocess, targets);
                });
            });
        });
    }
    catch (error) {
        console.error('[syncExtComponentFile] sync ext component file error:', error);
        throw error;
    }
}
exports.syncExtComponentFile = syncExtComponentFile;
function syncComponent(componentsDir, component, preprocess, targets) {
    if (!fs_extra_1.default.existsSync(componentsDir)) {
        return;
    }
    const componentRoot = fs_extra_1.default.existsSync(path_1.default.join(componentsDir, component.originName))
        ? path_1.default.join(componentsDir, component.originName)
        : componentsDir;
    // glob 模式固定使用正斜杠，文件路径交给 cwd 和 path.resolve 处理。
    const files = (0, fast_glob_1.sync)('**/*', { cwd: componentRoot, onlyFiles: true }).map((file) => path_1.default.resolve(componentRoot, file));
    const originComponentPath = ['.vue', '.uvue']
        .map((ext) => path_1.default.join(componentRoot, `${component.originName}${ext}`))
        .find((filePath) => files.includes(filePath));
    targets.forEach((target) => {
        files.forEach((filePath) => {
            const relativePath = path_1.default.relative(componentRoot, filePath);
            const { dir, name, ext } = path_1.default.parse(relativePath);
            const code = fs_extra_1.default.readFileSync(filePath, 'utf8').replace(/\r\n/g, '\n');
            // MP 使用 UniElement 类型，与 APP 的辅助文件实现相同。
            const preprocessContext = name === 'useLoadingStyle' && target.context.MP
                ? { ...target.context, APP: true }
                : target.context;
            const preprocessedCode = preprocess(code, {
                type: 'auto',
                context: preprocessContext,
            }).code;
            if (ext === '.vue' || ext === '.uvue') {
                const isMainComponent = filePath === originComponentPath;
                const targetName = isMainComponent ? target.componentName : name;
                const targetCode = normalizeScriptLang(preprocessedCode, target.scriptLang);
                const targetFilePath = path_1.default.resolve(target.path, dir, `${targetName}.vue`);
                const { descriptor, errors } = parseSfc(targetCode, filePath);
                if (errors.length) {
                    console.error(`[syncExtComponentFile] parse ${filePath} error:`, errors);
                    return;
                }
                if (target.stylePath) {
                    fs_extra_1.default.outputFileSync(target.stylePath, normalizeTrailingNewline(descriptor.styles.map((style) => style.content).join('\n')));
                    fs_extra_1.default.outputFileSync(targetFilePath, removeSfcStyles(targetCode));
                }
                else {
                    fs_extra_1.default.outputFileSync(targetFilePath, targetCode);
                }
                return;
            }
            if (ext === '.ts' || ext === '.js' || ext === '.uts') {
                const targetFilePath = path_1.default.resolve(target.path, dir, `${name}.${target.scriptLang}`);
                fs_extra_1.default.outputFileSync(targetFilePath, target.scriptLang === 'ts'
                    ? (0, prettier_1.format)(preprocessedCode, {
                        ...prettier_1.resolveConfig.sync(targetFilePath),
                        filepath: targetFilePath,
                        endOfLine: 'lf',
                    })
                    : preprocessedCode);
            }
        });
    });
}
function normalizeScriptLang(code, scriptLang) {
    return code.replace(/<script\b([^>]*)>/gi, (_match, attrs) => {
        const langPattern = /\s+lang\s*=\s*(['"])[^'"]*\1/i;
        const normalizedAttrs = langPattern.test(attrs)
            ? attrs.replace(langPattern, ` lang="${scriptLang}"`)
            : `${attrs} lang="${scriptLang}"`;
        return `<script${normalizedAttrs}>`;
    });
}
