const { wxComponentsStr } = require('./constant');
const fs = require('fs-extra');
const path = require('path');
const { generateAsset } = require('./util');

module.exports = class Analyze {
    constructor (emitFileMap, AnalyzeWxcomponentDependency, compilation) {
        this.emitFileMap = emitFileMap;
        this.compilation = compilation;
        this.AnalyzeWxcomponentDependency = AnalyzeWxcomponentDependency;
    }

    readFileSync (file) {
        if (!file.startsWith(process.env.UNI_INPUT_DIR)) {
            file = path.resolve(process.env.UNI_INPUT_DIR, file.substring(1, Number.MAX_SAFE_INTEGER));
        }

        const wxComponentAbsPath = `${process.env.UNI_INPUT_DIR}/${wxComponentsStr}`;
        if (file.startsWith(wxComponentAbsPath)) {
            return fs.readFileSync(file);
        } else {
            const assets = this.compilation.assets;
            const pathWithoutRelative = path.resolve(file);
            const relativePath = path.relative(process.env.UNI_INPUT_DIR, pathWithoutRelative);
            const memoryFileInfo = assets[relativePath];
            if (memoryFileInfo) {
                return memoryFileInfo.source();
            }
            // 针对json文件，当前由 generate-json 发出，所以资源尚未同步到compilations.assets中
            return JSON.stringify(this.emitFileMap.get(relativePath));
        }
    }

    existsSync (file) {
        // 类似补丁吧，传过来的路径可能不是/Users
        if (!file.startsWith(process.env.UNI_INPUT_DIR)) {
            file = path.resolve(process.env.UNI_INPUT_DIR, file.substring(1));
        }
        const wxComponentAbsPath = `${process.env.UNI_INPUT_DIR}/${wxComponentsStr}`;
        if (file.startsWith(wxComponentAbsPath)) {
            return fs.existsSync(file);
        }
        // vue组件的js文件忽略
        // if (file.endsWith('.js')) {
        //   return false;
        // }

        const assets = this.compilation.assets;
        const pathWithoutRelative = path.resolve(file);
        const relativePath = path.relative(process.env.UNI_INPUT_DIR, pathWithoutRelative);
        // 针对json文件，当前由 generate-json 发出，所以资源尚未同步到compilations.assets中
        if (relativePath.endsWith('.json')) {
            return !!this.emitFileMap.get(relativePath);
        }
        return !!assets[relativePath];
    }

    findAllWxComponentsDependency (componentsPath, useMemoryCache = false) {
        const context = process.env.UNI_INPUT_DIR;
        let instance;
        if (useMemoryCache) {
            instance = new this.AnalyzeWxcomponentDependency(context, this.readFileSync.bind(this), this.existsSync.bind(this));
        } else {
            instance = new this.AnalyzeWxcomponentDependency(context);
        }
        return {
            dependFiles: instance.getDepsByComponents(componentsPath),
            allComponents: [...instance.allComponents],
        };
    }

    copyWxComponent (pkgRoot, originalFilePath, targetPath) {
        const thisCompilationAssets = this.compilation.assets;
        const suffix = path.extname(originalFilePath);
        if (!['.js', '.json', '.wxss'].includes(suffix)) {
            return fs.copySync(originalFilePath, targetPath);
        }
        let jsonSource = fs.readFileSync(originalFilePath, 'utf8');
        const assetPath = path.relative(process.env.UNI_OUTPUT_DIR, targetPath);

        if (suffix === '.js') {
            // 计算到 root/common/index 的相对路径
            const relativeToDist = path.relative(path.dirname(assetPath), `${pkgRoot}/common/index.js`);
            jsonSource = `require('${relativeToDist}');${jsonSource}`;
            thisCompilationAssets[assetPath] = generateAsset(jsonSource);
        }
        // 后续需要更新组件引用路径，所以不采用文件复制方式
        // json 后面需要修改包外组件引用路径：copy-outer-components-for-independent
        // wxss 需要注入 全局样式：inject-main-css-to-independent-plugin
        if (['.json', '.wxss'].includes(suffix)) {
            thisCompilationAssets[assetPath] = generateAsset(jsonSource);
        }
    }

    getDependFiles (obj, wxComponentFileDependencyCache, useMemoryCache = false) {
        let tmpAllComponents = [];
        for (const pkgRoot in obj) {
            const wxComponents = [...obj[pkgRoot]];
            wxComponents.forEach(wxComponent => {
                if (!wxComponentFileDependencyCache[wxComponent]) {
                    const {
                        dependFiles,
                        allComponents
                    } = this.findAllWxComponentsDependency([wxComponent], useMemoryCache);
                    tmpAllComponents = [...tmpAllComponents, ...allComponents];
                    wxComponentFileDependencyCache[wxComponent] = dependFiles || [];
                }
            });
        }
        return new Set(tmpAllComponents);
    }
};
