"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExtComponentFile = void 0;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var compiler_sfc_1 = require("@vue/compiler-sfc");
var fast_glob_1 = require("fast-glob");
function resolve(file) {
    return path_1.default.resolve(__dirname, file);
}
var uniComponentsPath = resolve('../packages/uni-components');
var PREPROCESS_KEYS = [
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
    var preContext = PREPROCESS_KEYS.reduce(function (preContext, key) {
        preContext[key] = false;
        return preContext;
    }, {});
    return __assign(__assign({}, preContext), context);
}
var syncTargets = [
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
var components = [
    {
        originName: 'loading',
        targetName: 'uniloading',
    },
];
function syncExtComponentFile(apiDirs) {
    try {
        var preprocess_1 = require('../packages/uni-preprocess').preprocess;
        apiDirs.forEach(function (apiDir) {
            components.forEach(function (component) {
                var componentDir = "uni-".concat(component.originName);
                (0, fast_glob_1.sync)(path_1.default.join(apiDir, "./".concat(componentDir, "/package.json"))).forEach(function (packageJsonPath) {
                    var componentsDir = path_1.default.resolve(packageJsonPath, '../components');
                    syncComponent(componentsDir, component, preprocess_1, syncTargets);
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
    var files = (0, fast_glob_1.sync)(path_1.default.join(componentsDir, '**/*'), { onlyFiles: true });
    var originComponentPath = ['.vue', '.uvue']
        .map(function (ext) { return path_1.default.join(componentsDir, "".concat(component.originName).concat(ext)); })
        .find(function (filePath) { return files.includes(filePath); });
    targets.forEach(function (target) {
        files.forEach(function (filePath) {
            var relativePath = path_1.default.relative(componentsDir, filePath);
            var _a = path_1.default.parse(relativePath), dir = _a.dir, name = _a.name, ext = _a.ext;
            var code = fs_extra_1.default.readFileSync(filePath, 'utf8');
            // MP 使用 UniElement 类型，与 APP 的辅助文件实现相同。
            var preprocessContext = name === 'useLoadingStyle' && target.context.MP
                ? __assign(__assign({}, target.context), { APP: true }) : target.context;
            var preprocessedCode = preprocess(code, {
                type: 'auto',
                context: preprocessContext,
            }).code;
            if (ext === '.vue' || ext === '.uvue') {
                var isMainComponent = filePath === originComponentPath;
                var targetName = isMainComponent ? target.componentName : name;
                var targetCode = normalizeScriptLang(preprocessedCode, target.scriptLang);
                var targetFilePath = path_1.default.resolve(target.path, dir, "".concat(targetName, ".vue"));
                var _b = (0, compiler_sfc_1.parse)(targetCode, {
                    filename: filePath,
                }), descriptor = _b.descriptor, errors = _b.errors;
                if (errors.length) {
                    console.error("[syncExtComponentFile] parse ".concat(filePath, " error:"), errors);
                    return;
                }
                if (target.stylePath) {
                    fs_extra_1.default.outputFileSync(target.stylePath, normalizeTrailingNewline(descriptor.styles.map(function (style) { return style.content; }).join('\n')));
                    fs_extra_1.default.outputFileSync(targetFilePath, removeStyles(targetCode));
                }
                else {
                    fs_extra_1.default.outputFileSync(targetFilePath, targetCode);
                }
                return;
            }
            if (ext === '.ts' || ext === '.js' || ext === '.uts') {
                fs_extra_1.default.outputFileSync(path_1.default.resolve(target.path, dir, "".concat(name, ".").concat(target.scriptLang)), preprocessedCode);
            }
        });
    });
}
function normalizeScriptLang(code, scriptLang) {
    return code.replace(/<script\b([^>]*)>/gi, function (_match, attrs) {
        var langPattern = /\s+lang\s*=\s*(['"])[^'"]*\1/i;
        var normalizedAttrs = langPattern.test(attrs)
            ? attrs.replace(langPattern, " lang=\"".concat(scriptLang, "\""))
            : "".concat(attrs, " lang=\"").concat(scriptLang, "\"");
        return "<script".concat(normalizedAttrs, ">");
    });
}
function removeStyles(code) {
    return normalizeTrailingNewline(code.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ''));
}
function normalizeTrailingNewline(code) {
    var newline = code.includes('\r\n') ? '\r\n' : '\n';
    return code.replace(/(?:\r?\n)+$/, newline);
}
