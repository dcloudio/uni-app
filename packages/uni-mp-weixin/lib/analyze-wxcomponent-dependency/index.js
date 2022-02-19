const fs = require('fs-extra');
const path = require('path');
const { addExtension } = require('./utils.js');
const { MpComponentFileExtension, WxMpFileExtension } = require('./constant.js');
const CollectDependency = require('./collect-dependency.js');

const extToCollectMethodName = {
    [WxMpFileExtension.js]: 'getJsDeps',
    [WxMpFileExtension.wxs]: 'getJsDeps',
    [WxMpFileExtension.wxss]: 'getWxCssDeps',
    [WxMpFileExtension.wxml]: 'getWxHtmlDeps',
    [WxMpFileExtension.json]: 'getJsonDeps',
};

class Depend {
    constructor (context, readFileSync, existsSync) {
        this.existsSync = existsSync || fs.existsSync.bind(fs);
        this.readFileSync = readFileSync || fs.readFileSync.bind(fs);
        this.componentLogicFiles = new Set();
        this.files = new Set();
        this.context = context;
        this.allComponents = new Set();
        this.collectDependency = new CollectDependency(context, this.readFileSync, this.existsSync, this.addExtension.bind(this));
    }

    addExtension (filePath, ext = '') {
        if (ext === WxMpFileExtension.json) {
            this.allComponents.add(filePath);
        }
        return `${filePath}.${ext}`;
    }

    // 将文件添加到树中
    addToTree (filePath) {
        filePath = path.resolve(filePath);
        if (this.files.has(filePath)) {
            return;
        }
        this.files.add(filePath);
        const deps = this.getDeps(filePath) || [];
        deps.forEach(dep => this.addToTree(dep));
    }

    getDeps (filePath) {
        const extension = path.extname(filePath).slice(1);
        const collectMethod = extToCollectMethodName[extension];
        if (!collectMethod) {
            return [];
        }

        const files = this.collectDependency[collectMethod](filePath);
        const logicFiles = files.filter(filePath => filePath.endsWith(WxMpFileExtension.js));
        logicFiles.forEach(logicFile => this.componentLogicFiles.add(logicFile));
        return files;
    }

    getDepsByPageOrComponentPath (absPath) {
        MpComponentFileExtension.forEach(ext => {
            const filePath = this.addExtension(absPath, ext);
            if (this.existsSync(filePath)) {
                if (ext === WxMpFileExtension.js) {
                    this.componentLogicFiles.add(filePath);
                }
                this.addToTree(filePath);
            }
        });
    }

    getDepsByComponents (components) {
        components.forEach(page => {
            // 获取绝对地址
            const absPath = path.join(this.context, page);
            this.getDepsByPageOrComponentPath(absPath);
        });

        return this.files;
    }
}

module.exports = Depend;
