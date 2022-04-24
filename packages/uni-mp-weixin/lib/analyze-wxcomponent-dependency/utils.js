const path = require('path');
const fs = require('fs-extra');

module.exports = {
    resolveToContext(dirName, relativePath, context) {
        if (relativePath.startsWith('/')) {
            return `${context}${relativePath}`;
        }
        return path.resolve(dirName, relativePath);
    },
    // 获取某个路径的脚本文件
    transformScript: function (url, value, existsSync = fs.existsSync) {
        url = `${url}/${value}`;
        const ext = path.extname(url);
        // 如果存在后缀，表示当前已经是一个文件
        const exts = ['.js', '.wxs'];
        if (exts.includes(ext) && existsSync(url)) {
            return url;
        }
        // a/b/c => a/b/c.js
        const jsFile = url + '.js';
        if (existsSync(jsFile)) {
            return jsFile;
        }

        // a/b/c => a/b/c.js
        const wxsFile = url + '.wxs';
        if (existsSync(wxsFile)) {
            return wxsFile;
        }

        // a/b/c => a/b/c/index.js
        const jsIndexFile = path.join(url, 'index.js');
        if (existsSync(jsIndexFile)) {
            return jsIndexFile;
        }

        const wxsIndexFile = path.join(url, 'index.wxs');
        if (existsSync(wxsIndexFile)) {
            return wxsIndexFile;
        }
        return null;
    }
};
