const path = require('path');
const { generateAsset } = require('./utils');

// App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
class RunDefaultAppPlugin {
    apply (compiler) {
        compiler.hooks.emit.tapPromise('RunDefaultAppPlugin', compilation => {
            return new Promise((resolve, reject) => {
                try {
                    // debugger
                    const appJsInfo = compilation.assets["app.js"];
                    if (!appJsInfo) {
                        console.error('independent.error', 'invalid runDefaultApp');
                        resolve();
                        return;
                    }
                    const appSource = appJsInfo.source();
                    // App() 必须在 app.js 中调用，必须调用且只能调用一次。不然会出现无法预期的后果。
                    const runApp = 'if(getApp && !getApp()){ App({}) }';
                    compilation.assets["app.js"] = generateAsset(`${appSource};${runApp}`);

                    resolve();
                } catch (e) {
                    console.error('independent.error', 'RunDefaultAppPlugin', e);
                    reject(e);
                }
            });
        });
    }
}

module.exports = RunDefaultAppPlugin;