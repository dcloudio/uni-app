"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.syncExtComponentFile = syncExtComponentFile;
var fs_extra_1 = __importDefault(require("fs-extra"));
var path_1 = __importDefault(require("path"));
var fast_glob_1 = require("fast-glob");
function resolve(file) {
    return path_1.default.resolve(__dirname, file);
}
var uniComponentsPath = resolve('../packages/uni-components');
var libXPath = path_1.default.resolve(uniComponentsPath, './lib-x');
var components = [{
        originName: 'loading',
        targetName: 'uniloading'
    }];
function syncExtComponentFile(apiDirs) {
    try {
        apiDirs.forEach(function (apiDir) {
            components.forEach(function (component) {
                // 查找 uni-${originName} 组件
                var componentDir = "uni-".concat(component.originName);
                (0, fast_glob_1.sync)(path_1.default.join(apiDir, "./".concat(componentDir, "/package.json"))).forEach(function (packageJsonPath) {
                    var componentsDir = path_1.default.resolve(packageJsonPath, '../components', component.originName);
                    var originComponentPath = path_1.default.join(componentsDir, "".concat(component.originName, ".vue"));
                    var targetPath = path_1.default.resolve(libXPath, component.targetName);
                    // 复制 uni-${originName}/components/${originName}/${originName}.vue 到 targetPath/${targetName}.vue
                    if (fs_extra_1.default.existsSync(originComponentPath)) {
                        var targetFilePath = path_1.default.resolve(targetPath, "".concat(component.targetName, ".vue"));
                        fs_extra_1.default.copySync(originComponentPath, targetFilePath);
                    }
                    // 复制 uni-${originName}/components 中的其他内容
                    if (fs_extra_1.default.existsSync(componentsDir)) {
                        (0, fast_glob_1.sync)(path_1.default.join(componentsDir, '*')).forEach(function (itemPath) {
                            var itemName = path_1.default.basename(itemPath);
                            // 跳过已经处理过的 originName 目录
                            if (itemPath !== originComponentPath) {
                                var targetItemPath = path_1.default.resolve(targetPath, itemName);
                                fs_extra_1.default.copySync(itemPath, targetItemPath);
                            }
                        });
                    }
                });
            });
        });
    }
    catch (error) {
        console.error('[syncExtComponentFile] sync ext component file error:', error);
    }
}
