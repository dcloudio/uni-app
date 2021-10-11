'use strict';

var uniCliShared = require('@dcloudio/uni-cli-shared');
var initMiniProgramPlugin = require('@dcloudio/uni-mp-vite');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var initMiniProgramPlugin__default = /*#__PURE__*/_interopDefaultLegacy(initMiniProgramPlugin);

const uniMiniProgramWeixinPlugin = {
    name: 'vite:uni-mp-weixin',
    config() {
        return {
            define: {
                __VUE_CREATED_DEFERRED__: JSON.stringify('false'),
            },
        };
    },
};
const options = {
    vite: {
        alias: {
            'uni-mp-runtime': uniCliShared.resolveBuiltIn('@dcloudio/uni-mp-weixin/dist/uni.mp.esm.js'),
        },
    },
    global: 'wx',
    app: {
        darkmode: true,
        subpackages: true,
    },
    project: {
        filename: 'project.config.json',
    },
    template: {
        extname: '.wxml',
    },
    style: {
        extname: '.wxss',
        cssVars: {
            '--status-bar-height': '25px',
            '--window-top': '0px',
            '--window-bottom': '0px',
            '--window-left': '0px',
            '--window-right': '0px',
        },
    },
    filter: {
        extname: '.wxs',
        tag: 'wxs',
    },
};
var index = [uniMiniProgramWeixinPlugin, ...initMiniProgramPlugin__default["default"](options)];

module.exports = index;
