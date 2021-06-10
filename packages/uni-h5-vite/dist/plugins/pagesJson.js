"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniPagesJsonPlugin = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const slash_1 = __importDefault(require("slash"));
const shared_1 = require("@vue/shared");
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
                        code: (resolvedConfig.command === 'serve' ||
                            (resolvedConfig.command === 'build' && ssr)
                            ? registerGlobalCode(resolvedConfig, ssr)
                            : '') + generatePagesJsonCode(ssr, code, resolvedConfig),
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
    const pagesJson = uni_cli_shared_1.normalizePagesJson(jsonStr, process.env.UNI_INPUT_DIR, process.env.UNI_PLATFORM);
    const { importLayoutComponentsCode, defineLayoutComponentsCode } = generateLayoutComponentsCode(globalName, pagesJson);
    const definePagesCode = generatePagesDefineCode(pagesJson, config);
    const uniRoutesCode = generateRoutes(globalName, pagesJson, config);
    const uniConfigCode = generateConfig(globalName, pagesJson, config);
    const manifestJsonPath = slash_1.default(path_1.default.resolve(process.env.UNI_INPUT_DIR, 'manifest.json.js'));
    const cssCode = generateCssCode(config);
    return `
import { defineAsyncComponent, resolveComponent, createVNode, withCtx, openBlock, createBlock } from 'vue'
import { PageComponent, AsyncLoadingComponent, AsyncErrorComponent } from '@dcloudio/uni-h5'
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
function normalizePageIdentifier(path) {
    return shared_1.capitalize(shared_1.camelize(path.replace(/\//g, '-')));
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
    const windowNames = [
        'topWindow',
        'leftWindow',
        'rightWindow',
    ];
    let importLayoutComponentsCode = '';
    let defineLayoutComponentsCode = `${globalName}.__uniLayout = ${globalName}.__uniLayout || {}\n`;
    windowNames.forEach((name) => {
        const windowConfig = pagesJson[name];
        if (windowConfig && windowConfig.path) {
            importLayoutComponentsCode += `import ${name} from './${windowConfig.path}'\n`;
            defineLayoutComponentsCode += `${globalName}.__uniConfig.${name}.component = ${name}\n`;
        }
    });
    return {
        importLayoutComponentsCode,
        defineLayoutComponentsCode,
    };
}
function generatePageDefineCode(pageOptions) {
    const pageIdent = normalizePageIdentifier(pageOptions.path);
    return `const ${pageIdent}Loader = ()=>import('./${pageOptions.path}?mpType=page')
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
function normalizePagesRoute(pagesJson) {
    const firstPagePath = pagesJson.pages[0].path;
    const tabBarList = (pagesJson.tabBar && pagesJson.tabBar.list) || [];
    return pagesJson.pages.map((pageOptions) => {
        const pagePath = pageOptions.path;
        const name = normalizePageIdentifier(pagePath);
        const isEntry = firstPagePath === pagePath ? true : undefined;
        const tabBarIndex = tabBarList.findIndex((tabBarPage) => tabBarPage.pagePath === pagePath);
        const isTabBar = tabBarIndex !== -1 ? true : undefined;
        const isNVue = fs_1.default.existsSync(path_1.default.join(process.env.UNI_INPUT_DIR, pagePath + '.nvue'));
        let windowTop = 0;
        const meta = shared_1.extend({
            route: pageOptions.path,
            isNVue: isNVue ? true : undefined,
            isQuit: isEntry || isTabBar ? true : undefined,
            isEntry,
            isTabBar,
            tabBarIndex,
            windowTop,
        }, pageOptions.style);
        return {
            name,
            path: pageOptions.path,
            meta,
        };
    });
}
function generatePageRoute({ name, path, meta }, config) {
    const { isEntry } = meta;
    const alias = isEntry ? `\n  alias:'/${path}',` : '';
    return `{
  path:'/${isEntry ? '' : path}',${alias}
  component:{setup(){return ()=>renderPage(${name})}},
  loader: ${normalizePageIdentifier(path)}Loader,
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
        ...generatePagesRoute(normalizePagesRoute(pagesJson), config),
    ].join(',')}]`;
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
