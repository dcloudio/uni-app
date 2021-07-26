"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const path_1 = __importDefault(require("path"));
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const pkg = require('@dcloudio/vite-plugin-uni/package.json');
function uniPagesJsonPlugin() {
    return uni_cli_shared_1.defineUniPagesJsonPlugin((opts) => {
        return {
            name: 'vite:uni-h5-pages-json',
            enforce: 'pre',
            transform(code, id, ssr) {
                if (opts.filter(id)) {
                    const { resolvedConfig } = opts;
                    return {
                        code: registerGlobalCode(resolvedConfig, ssr) +
                            generatePagesJsonCode(ssr, code, resolvedConfig),
                        map: { mappings: '' },
                    };
                }
            },
        };
    });
}
exports.uniPagesJsonPlugin = uniPagesJsonPlugin;
function generatePagesJsonCode(ssr, jsonStr, config) {
    const globalName = getGlobal(ssr);
    const pagesJson = uni_cli_shared_1.normalizePagesJson(jsonStr, process.env.UNI_PLATFORM);
    const { importLayoutComponentsCode, defineLayoutComponentsCode } = generateLayoutComponentsCode(globalName, pagesJson);
    const definePagesCode = generatePagesDefineCode(pagesJson, config);
    const uniRoutesCode = generateRoutes(globalName, pagesJson, config);
    const uniConfigCode = generateConfig(globalName, pagesJson, config);
    const manifestJsonPath = uni_cli_shared_1.normalizePath(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'manifest.json.js'));
    const cssCode = generateCssCode(config);
    return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, AsyncLoadingComponent, AsyncErrorComponent, setupWindow } from '@dcloudio/uni-h5'
import { appid, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, nvue } from '${manifestJsonPath}'
${importLayoutComponentsCode}
const extend = Object.assign
${cssCode}
${uniConfigCode}
${defineLayoutComponentsCode}
${definePagesCode}
${uniRoutesCode}
${config.command === 'serve' ? hmrCode : ''}
export {}
`;
}
const hmrCode = `if(import.meta.hot){
  import.meta.hot.on('invalidate', (data) => {
      import.meta.hot.invalidate()
  })
}`;
function getGlobal(ssr) {
    return ssr ? 'global' : 'window';
}
function registerGlobalCode(config, ssr) {
    const name = getGlobal(ssr);
    if (config.command === 'build' && !ssr) {
        // 非SSR的发行模式，补充全局 uni 对象
        return `${name}.uni = {}`;
    }
    const rpx2pxCode = !ssr && config.define.__UNI_FEATURE_RPX__
        ? `import {upx2px} from '@dcloudio/uni-h5'
  ${name}.rpx2px = upx2px
`
        : '';
    return `${rpx2pxCode}
import {uni,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-h5'
${name}.getApp = getApp
${name}.getCurrentPages = getCurrentPages
${name}.uni = uni
${name}.UniViewJSBridge = UniViewJSBridge
${name}.UniServiceJSBridge = UniServiceJSBridge
`;
}
function generateCssCode(config) {
    const define = config.define;
    const cssFiles = [uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'base.css'];
    // if (define.__UNI_FEATURE_PAGES__) {
    cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'async.css');
    // }
    if (define.__UNI_FEATURE_RESPONSIVE__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'layout.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'pageHead.css');
    }
    if (define.__UNI_FEATURE_TABBAR__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'tabBar.css');
    }
    if (define.__UNI_FEATURE_NVUE__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'nvue.css');
    }
    if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
        cssFiles.push(uni_cli_shared_1.H5_FRAMEWORK_STYLE_PATH + 'pageRefresh.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
        cssFiles.push(uni_cli_shared_1.BASE_COMPONENTS_STYLE_PATH + 'input.css');
    }
    if (config.command === 'serve') {
        // 开发模式，自动添加所有API相关css
        Object.keys(uni_cli_shared_1.API_DEPS_CSS).forEach((name) => {
            const styles = uni_cli_shared_1.API_DEPS_CSS[name];
            styles.forEach((style) => {
                if (!cssFiles.includes(style)) {
                    cssFiles.push(style);
                }
            });
        });
    }
    return cssFiles.map((file) => `import '${file}'`).join('\n');
}
function generateLayoutComponentsCode(globalName, pagesJson) {
    const windowNames = {
        topWindow: -1,
        leftWindow: -2,
        rightWindow: -3,
    };
    let importLayoutComponentsCode = '';
    let defineLayoutComponentsCode = `${globalName}.__uniLayout = ${globalName}.__uniLayout || {}\n`;
    Object.keys(windowNames).forEach((name) => {
        const windowConfig = pagesJson[name];
        if (windowConfig && windowConfig.path) {
            importLayoutComponentsCode += `import ${name} from './${windowConfig.path}'\n`;
            defineLayoutComponentsCode += `${globalName}.__uniConfig.${name}.component = setupWindow(${name},${windowNames[name]})\n`;
        }
    });
    return {
        importLayoutComponentsCode,
        defineLayoutComponentsCode,
    };
}
function generatePageDefineCode(pageOptions) {
    let pagePathWithExtname = uni_cli_shared_1.normalizePagePath(pageOptions.path, 'h5');
    if (!pagePathWithExtname) {
        // 不存在时，仍引用，此时编译会报错文件不存在
        pagePathWithExtname = pageOptions.path + '.vue';
    }
    const pageIdent = uni_cli_shared_1.normalizeIdentifier(pageOptions.path);
    return `const ${pageIdent}Loader = ()=>import('./${pagePathWithExtname}?mpType=page')
const ${pageIdent} = defineAsyncComponent(extend({loader:${pageIdent}Loader},AsyncComponentOptions))`;
}
function generatePagesDefineCode(pagesJson, _config) {
    const { pages } = pagesJson;
    return (`const AsyncComponentOptions = {
  loadingComponent: AsyncLoadingComponent,
  errorComponent: AsyncErrorComponent,
  delay: async.delay,
  timeout: async.timeout,
  suspensible: async.suspensible
}
` + pages.map((pageOptions) => generatePageDefineCode(pageOptions)).join('\n'));
}
function generatePageRoute({ path, meta }, _config) {
    const { isEntry } = meta;
    const alias = isEntry ? `\n  alias:'/${path}',` : '';
    return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{setup(){return ()=>renderPage(${uni_cli_shared_1.normalizeIdentifier(path)})}},
  loader: ${uni_cli_shared_1.normalizeIdentifier(path)}Loader,
  meta: ${JSON.stringify(meta)}
}`;
}
function generatePagesRoute(pagesRouteOptions, config) {
    return pagesRouteOptions.map((pageOptions) => generatePageRoute(pageOptions, config));
}
function generateRoutes(globalName, pagesJson, config) {
    return `
function renderPage(component){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, { ref: "page" }, null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
        ...generatePagesRoute(uni_cli_shared_1.normalizePagesRoute(pagesJson), config),
    ].join(',')}].map(uniRoute=>(uniRoute.meta.route = (uniRoute.alias || uniRoute.path).substr(1),uniRoute))`;
}
function generateConfig(globalName, pagesJson, config) {
    delete pagesJson.pages;
    delete pagesJson.subPackages;
    delete pagesJson.subpackages;
    pagesJson.compilerVersion = pkg['uni-app'].compilerVersion;
    return ((config.command === 'serve'
        ? ''
        : `${globalName}['____'+appid+'____']=true
delete ${globalName}['____'+appid+'____']
`) +
        `${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  nvue,
  router
})
`);
}
