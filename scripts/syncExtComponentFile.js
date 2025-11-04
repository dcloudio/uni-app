"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExtComponentFile = syncExtComponentFile;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var fast_glob_1 = require("fast-glob");
var compiler_sfc_1 = require("@vue/compiler-sfc");
var uni_preprocess_1 = require("../packages/uni-preprocess");
function resolve(file) {
    return path_1.default.resolve(__dirname, file);
}
var syncExtComponents = {
    'uni-loading': (_a = {
            web: {
                name: 'Loading',
                dir: 'loading',
                index: 'index-x',
                css: 'loading',
                preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: false, MP_WEIXIN: false, H5: true, WEB: true }
            }
        },
        _a['mp-weixin'] = {
            preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: false, MP_WEIXIN: true, H5: false, WEB: false },
            libX: {
                dir: 'uniloading',
                index: 'uniloading',
                preContext: { APP: false, APP_ANDROID: false, APP_HARMONY: false, APP_IOS: false, MP: false, MP_WEIXIN: true, H5: false, WEB: false },
            }
        },
        _a)
};
function createVueSFCCode(name, templateContent, scriptContent) {
    return "<script setup lang=\"ts\">\n".concat(scriptContent.import, "\n\ndefineOptions({\n  name: ").concat(JSON.stringify(name), ",\n  __reserved: true,\n  compatConfig: {\n    MODE: 3\n  }\n})\n\n").concat(scriptContent.content, "\n</script>\n\n<template>\n").concat(templateContent, "\n</template>\n");
}
function syncExtComponentFile(apiDirs) {
    var uniComponentsPath = resolve('../packages/uni-components');
    var uniComponentsVuePath = path_1.default.resolve(uniComponentsPath, './src/vue');
    var uniComponentsLibXPath = path_1.default.resolve(uniComponentsPath, './lib-x');
    var uniComponentsStyleXPath = path_1.default.resolve(uniComponentsPath, './style-x');
    apiDirs.forEach(function (apiDir) {
        var extComponentDir = apiDir;
        Object.keys(syncExtComponents).forEach(function (componentName) {
            (0, fast_glob_1.sync)(path_1.default.join(extComponentDir, "./".concat(componentName, "/package.json"))).forEach(function (packageJsonPath) {
                var packageJson = fs_extra_1.default.readJsonSync(packageJsonPath, { encoding: 'utf-8' });
                var componentOptions = syncExtComponents[componentName];
                var platforms = Object.keys(componentOptions);
                platforms.forEach(function (platform) {
                    var _a;
                    var syncExtComponentOption = componentOptions[platform];
                    if (((_a = packageJson['uni_modules']) === null || _a === void 0 ? void 0 : _a.components[platform]) === true && syncExtComponentOption) {
                        var componentPath_1 = path_1.default.resolve(packageJsonPath, '../components');
                        (0, fast_glob_1.sync)(path_1.default.join(componentPath_1, '**')).forEach(function (filePath) {
                            var _a, _b, _c, _d, _e, _f, _g, _h, _j;
                            var _k = path_1.default.parse(path_1.default.relative(componentPath_1, filePath)), buildInComponentName = _k.name, ext = _k.ext, dir = _k.dir;
                            switch (ext) {
                                case '.vue': {
                                    var originCode = fs_extra_1.default.readFileSync(filePath, { encoding: 'utf-8' });
                                    if (syncExtComponentOption.name) {
                                        var vueCode = (0, uni_preprocess_1.preprocess)((0, uni_preprocess_1.preprocess)(originCode, { type: 'html', context: syncExtComponentOption.preContext }).code, { type: 'js', context: syncExtComponentOption.preContext }).code;
                                        var sfcParseResult = (0, compiler_sfc_1.parse)(vueCode);
                                        if (sfcParseResult.errors.length) {
                                            console.error("[uni-h5 (syncExtComponentFile)] ".concat(componentName, " parse ").concat(filePath, " error:"), sfcParseResult.errors);
                                            return;
                                        }
                                        else {
                                            var descriptor = sfcParseResult.descriptor;
                                            var scriptSetupContent = ((_a = descriptor.scriptSetup) === null || _a === void 0 ? void 0 : _a.content) || '';
                                            var scriptContent = ((_b = descriptor.script) === null || _b === void 0 ? void 0 : _b.content) || '';
                                            var parseScriptContent = { import: '', content: '' };
                                            if (scriptSetupContent.length) {
                                                var regex = /^\s*(import[\s\S]*?from\s+['"][\s\S]*?['"];?)/gm;
                                                var imports = [];
                                                var execResult = void 0;
                                                while (execResult = regex.exec(scriptSetupContent)) {
                                                    var importStr = execResult[1];
                                                    imports.push(importStr);
                                                    scriptSetupContent = scriptSetupContent.replace(execResult[0], '');
                                                    regex.lastIndex = 0;
                                                }
                                                parseScriptContent.import = imports.join('\n');
                                                parseScriptContent.content = scriptSetupContent;
                                            }
                                            else if (scriptContent.length) {
                                                parseScriptContent.content = scriptContent;
                                            }
                                            var finalVueCode = createVueSFCCode(syncExtComponentOption.name, ((_c = descriptor.template) === null || _c === void 0 ? void 0 : _c.content) || '', parseScriptContent);
                                            fs_extra_1.default.outputFileSync(path_1.default.resolve(uniComponentsVuePath, "".concat((_d = syncExtComponentOption.dir) !== null && _d !== void 0 ? _d : dir, "/").concat((_e = syncExtComponentOption.index) !== null && _e !== void 0 ? _e : buildInComponentName, ".vue")), finalVueCode);
                                            fs_extra_1.default.outputFileSync(path_1.default.resolve(uniComponentsStyleXPath, "".concat((_f = syncExtComponentOption.css) !== null && _f !== void 0 ? _f : buildInComponentName, ".css")), descriptor.styles.map(function (styleBlock) { return styleBlock.content; }).join('\n'));
                                        }
                                    }
                                    // libX 暂只支持 .vue 文件
                                    var libX = syncExtComponentOption.libX;
                                    if (libX) {
                                        var vueCode = (0, uni_preprocess_1.preprocess)((0, uni_preprocess_1.preprocess)(originCode, { type: 'html', context: libX.preContext }).code, { type: 'js', context: libX.preContext }).code;
                                        fs_extra_1.default.outputFileSync(path_1.default.resolve(uniComponentsLibXPath, "".concat((_g = libX.dir) !== null && _g !== void 0 ? _g : buildInComponentName, "/").concat((_h = libX.index) !== null && _h !== void 0 ? _h : buildInComponentName, ".vue")), vueCode);
                                    }
                                    break;
                                }
                                case '.ts':
                                case '.js':
                                case '.uts': {
                                    var _l = path_1.default.parse(filePath), name_1 = _l.name, ext_1 = _l.ext;
                                    var originCode = fs_extra_1.default.readFileSync(filePath, { encoding: 'utf-8' });
                                    var preCode = (0, uni_preprocess_1.preprocess)(originCode, {
                                        type: 'js',
                                        context: syncExtComponentOption.preContext
                                    }).code;
                                    fs_extra_1.default.outputFileSync(path_1.default.resolve(uniComponentsVuePath, "".concat((_j = syncExtComponentOption.dir) !== null && _j !== void 0 ? _j : dir, "/").concat(name_1, ".ts")), preCode);
                                    break;
                                }
                            }
                        });
                    }
                });
            });
        });
    });
}
