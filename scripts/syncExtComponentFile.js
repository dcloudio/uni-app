"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExtComponentFile = void 0;
const fs_extra_1 = __importDefault(require("fs-extra"));
const path_1 = __importDefault(require("path"));
const compiler_sfc_1 = require("@vue/compiler-sfc");
const fast_glob_1 = require("fast-glob");
function resolve(file) {
    return path_1.default.resolve(__dirname, file);
}
const uniComponentsPath = resolve('../packages/uni-components');
const PREPROCESS_KEYS = [
    'APP',
    'APP_ANDROID',
    'APP_IOS',
    'APP_HARMONY',
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
function syncExtComponentFile(apiDirs) {
    try {
        const { preprocess } = require('../packages/uni-preprocess');
        apiDirs.forEach((apiDir) => {
            components.forEach((component) => {
                const componentDir = `uni-${component.originName}`;
                (0, fast_glob_1.sync)(path_1.default.join(apiDir, `./${componentDir}/package.json`)).forEach((packageJsonPath) => {
                    const componentsDir = path_1.default.resolve(packageJsonPath, '../components');
                    syncComponent(componentsDir, component, preprocess, syncTargets);
                });
            });
        });
    }
    catch (error) {
        console.error('[syncExtComponentFile] sync ext component file error:', error);
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
    const files = (0, fast_glob_1.sync)(path_1.default.join(componentRoot, '**/*'), { onlyFiles: true });
    const originComponentPath = ['.vue', '.uvue']
        .flatMap((ext) => [
        path_1.default.join(componentRoot, `${component.originName}${ext}`),
    ])
        .find((filePath) => files.includes(filePath));
    targets.forEach((target) => {
        files.forEach((filePath) => {
            const relativePath = path_1.default.relative(componentRoot, filePath);
            const { dir, name, ext } = path_1.default.parse(relativePath);
            const code = fs_extra_1.default.readFileSync(filePath, 'utf8');
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
                const { descriptor, errors } = (0, compiler_sfc_1.parse)(targetCode, {
                    filename: filePath,
                });
                if (errors.length) {
                    console.error(`[syncExtComponentFile] parse ${filePath} error:`, errors);
                    return;
                }
                if (target.stylePath) {
                    fs_extra_1.default.outputFileSync(target.stylePath, normalizeTrailingNewline(descriptor.styles.map((style) => style.content).join('\n')));
                    fs_extra_1.default.outputFileSync(targetFilePath, removeStyles(targetCode));
                }
                else {
                    fs_extra_1.default.outputFileSync(targetFilePath, targetCode);
                }
                return;
            }
            if (ext === '.ts' || ext === '.js' || ext === '.uts') {
                fs_extra_1.default.outputFileSync(path_1.default.resolve(target.path, `${name}.${target.scriptLang}`), preprocessedCode);
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
function removeStyles(code) {
    return normalizeTrailingNewline(code.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ''));
}
function normalizeTrailingNewline(code) {
    const newline = code.includes('\r\n') ? '\r\n' : '\n';
    return code.replace(/(?:\r?\n)+$/, newline);
}
