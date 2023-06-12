"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const uni_cli_shared_1 = require("@dcloudio/uni-cli-shared");
const utils_1 = require("../utils");
function uniPagesJsonPlugin() {
    return (0, uni_cli_shared_1.defineUniPagesJsonPlugin)((opts) => {
        return {
            name: 'uni:h5-pages-json',
            enforce: 'pre',
            transform(code, id, opt) {
                if (opts.filter(id)) {
                    const { resolvedConfig } = opts;
                    const ssr = (0, utils_1.isSSR)(opt);
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
    const pagesJson = (0, uni_cli_shared_1.normalizePagesJson)(jsonStr, process.env.UNI_PLATFORM);
    const { importLayoutComponentsCode, defineLayoutComponentsCode } = generateLayoutComponentsCode(globalName, pagesJson);
    const definePagesCode = generatePagesDefineCode(pagesJson, config);
    const uniRoutesCode = generateRoutes(globalName, pagesJson, config);
    const uniConfigCode = generateConfig(globalName, pagesJson, config);
    const cssCode = generateCssCode(config);
    return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, useI18n, setupWindow, setupPage } from '@dcloudio/uni-mp-weibo'
import { appId, appName, appVersion, appVersionCode, debug, networkTimeout, router, async, sdkConfigs, qqMapKey, googleMapKey, aMapKey, aMapSecurityJsCode, aMapServiceHost, nvue, locale, fallbackLocale, darkmode, themeConfig } from './${uni_cli_shared_1.MANIFEST_JSON_JS}'
const locales = import.meta.globEager('./locale/*.json')
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
// 兼容 wx 对象
function registerGlobalCode(config, ssr) {
    const name = getGlobal(ssr);
    const enableTreeShaking = (0, uni_cli_shared_1.isEnableTreeShaking)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
    if (enableTreeShaking && config.command === 'build' && !ssr) {
        // 非 SSR 的发行模式，补充全局 uni 对象
        return `import { upx2px, getApp } from '@dcloudio/uni-mp-weibo';${name}.uni = {};${name}.wx = {};${name}.rpx2px = upx2px`;
    }
    return `
import {uni,upx2px,getCurrentPages,getApp,UniServiceJSBridge,UniViewJSBridge} from '@dcloudio/uni-mp-weibo'
${name}.getApp = getApp
${name}.getCurrentPages = getCurrentPages
${name}.wx = uni
${name}.uni = uni
${name}.UniViewJSBridge = UniViewJSBridge
${name}.UniServiceJSBridge = UniServiceJSBridge
${name}.rpx2px = upx2px
${name}.__setupPage = (com)=>setupPage(com)
`;
}
function generateCssCode(config) {
    const define = config.define;
    const cssFiles = [uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'base.css'];
    if (config.isProduction) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'shadow.css');
    }
    // if (define.__UNI_FEATURE_PAGES__) {
    cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'async.css');
    // }
    if (define.__UNI_FEATURE_RESPONSIVE__) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'layout.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR__) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'pageHead.css');
    }
    if (define.__UNI_FEATURE_TABBAR__) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'tabBar.css');
    }
    if (define.__UNI_FEATURE_NVUE__) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'nvue.css');
    }
    if (define.__UNI_FEATURE_PULL_DOWN_REFRESH__) {
        cssFiles.push(uni_cli_shared_1.MP_WEIBO_FRAMEWORK_STYLE_PATH + 'pageRefresh.css');
    }
    if (define.__UNI_FEATURE_NAVIGATIONBAR_SEARCHINPUT__) {
        cssFiles.push(uni_cli_shared_1.BASE_COMPONENTS_STYLE_PATH + 'input.css');
    }
    const enableTreeShaking = (0, uni_cli_shared_1.isEnableTreeShaking)((0, uni_cli_shared_1.parseManifestJsonOnce)(process.env.UNI_INPUT_DIR));
    if (config.command === 'serve' || !enableTreeShaking) {
        // 开发模式或禁用摇树优化，自动添加所有API相关css
        Object.keys(uni_cli_shared_1.WEIBO_API_DEPS_CSS).forEach((name) => {
            const styles = uni_cli_shared_1.WEIBO_API_DEPS_CSS[name];
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
    let pagePathWithExtname = (0, uni_cli_shared_1.normalizePagePath)(pageOptions.path, 'h5');
    if (!pagePathWithExtname) {
        // 不存在时，仍引用，此时编译会报错文件不存在
        pagePathWithExtname = pageOptions.path + '.vue';
    }
    const pageIdent = (0, uni_cli_shared_1.normalizeIdentifier)(pageOptions.path);
    return `const ${pageIdent}Loader = ()=>import('./${pagePathWithExtname}').then(com => setupPage(com.default || com))
const ${pageIdent} = defineAsyncComponent(extend({loader:${pageIdent}Loader},AsyncComponentOptions))`;
}
function generatePagesDefineCode(pagesJson, _config) {
    const { pages } = pagesJson;
    return (`const AsyncComponentOptions = {
      delay: async.delay,
      timeout: async.timeout,
      suspensible: async.suspensible
    }
    if(async.loading){
      AsyncComponentOptions.loadingComponent = {
        name:'SystemAsyncLoading',
        render(){
          return createVNode(resolveComponent(async.loading))
        }
      }
    }
    if(async.error){
      AsyncComponentOptions.errorComponent = {
        name:'SystemAsyncError',
        render(){
          return createVNode(resolveComponent(async.error))
        }
      }
    }
  ` + pages.map((pageOptions) => generatePageDefineCode(pageOptions)).join('\n'));
}
function generatePageRoute({ path, meta }, _config) {
    const { isEntry } = meta;
    const alias = isEntry ? `\n  alias:'/${path}',` : '';
    // 目前单页面未处理 query=>props
    return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{setup(){ const app = getApp(); const query = app && app.$route && app.$route.query || {}; return ()=>renderPage(${(0, uni_cli_shared_1.normalizeIdentifier)(path)},query)}},
  loader: ${(0, uni_cli_shared_1.normalizeIdentifier)(path)}Loader,
  meta: ${JSON.stringify(meta)}
}`;
}
function generatePagesRoute(pagesRouteOptions, config) {
    return pagesRouteOptions.map((pageOptions) => generatePageRoute(pageOptions, config));
}
function generateRoutes(globalName, pagesJson, config) {
    return `
function renderPage(component,props){
  return (openBlock(), createBlock(PageComponent, null, {page: withCtx(() => [createVNode(component, extend({},props,{ref: "page"}), null, 512 /* NEED_PATCH */)]), _: 1 /* STABLE */}))
}
${globalName}.__uniRoutes=[${[
        ...generatePagesRoute((0, uni_cli_shared_1.normalizePagesRoute)(pagesJson), config),
    ].join(',')}].map(uniRoute=>(uniRoute.meta.route = (uniRoute.alias || uniRoute.path).slice(1),uniRoute))`;
}
function generateConfig(globalName, pagesJson, config) {
    delete pagesJson.pages;
    delete pagesJson.subPackages;
    delete pagesJson.subpackages;
    pagesJson.compilerVersion = process.env.UNI_COMPILER_VERSION;
    return `${globalName}.__uniConfig=extend(${JSON.stringify(pagesJson)},{
  appId,
  appName,
  appVersion,
  appVersionCode,
  async,
  debug,
  networkTimeout,
  sdkConfigs,
  qqMapKey,
  googleMapKey,
  aMapKey,
  aMapSecurityJsCode,
  aMapServiceHost,
  nvue,
  locale,
  fallbackLocale,
  locales:Object.keys(locales).reduce((res,name)=>{const locale=name.replace(/\\.\\/locale\\/(uni-app.)?(.*).json/,'$2');extend(res[locale]||(res[locale]={}),locales[name].default);return res},{}),
  router,
  darkmode,
  themeConfig,
})
`;
}
