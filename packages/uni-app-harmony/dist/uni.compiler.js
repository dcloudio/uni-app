'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var appVite = require('@dcloudio/uni-app-vite');
var uniAppUts = require('@dcloudio/uni-app-uts');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var appVite__default = /*#__PURE__*/_interopDefault(appVite);
var path__default = /*#__PURE__*/_interopDefault(path);

var ExternalModuls = [
	{
		type: "extapi",
		plugin: "uni-facialVerify",
		apis: [
			"startFacialRecognitionVerify",
			"getFacialRecognitionMetaInfo"
		],
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-location-system",
		provider: "system",
		service: "location",
		version: "1.0.0"
	},
	{
		type: "provider",
		plugin: "uni-oauth-huawei",
		provider: "huawei",
		service: "oauth",
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-payment-alipay",
		provider: "alipay",
		service: "payment",
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-payment-huawei",
		provider: "huawei",
		service: "payment",
		version: "1.0.0"
	},
	{
		type: "provider",
		plugin: "uni-payment-wxpay",
		provider: "wxpay",
		service: "payment",
		version: "1.0.0"
	},
	{
		type: "extapi",
		plugin: "uni-push",
		apis: [
			"getPushClientId",
			"onPushMessage",
			"offPushMessage",
			"createPushMessage",
			"setAppBadgeNumber"
		],
		version: "1.0.2"
	}
];

var ExternalModulesX = [
	{
		type: "extapi",
		plugin: "uni-facialVerify",
		apis: [
			"startFacialRecognitionVerify",
			"getFacialRecognitionMetaInfo"
		],
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-location-system",
		provider: "system",
		service: "location",
		version: "1.0.0"
	},
	{
		type: "extapi",
		plugin: "uni-map-tencent",
		apis: [
			"createMapContext"
		],
		version: "1.0.0"
	},
	{
		type: "provider",
		plugin: "uni-oauth-huawei",
		provider: "huawei",
		service: "oauth",
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-payment-alipay",
		provider: "alipay",
		service: "payment",
		version: "1.0.2"
	},
	{
		type: "provider",
		plugin: "uni-payment-huawei",
		provider: "huawei",
		service: "payment",
		version: "1.0.0"
	},
	{
		type: "provider",
		plugin: "uni-payment-wxpay",
		provider: "wxpay",
		service: "payment",
		version: "1.0.0"
	},
	{
		type: "extapi",
		plugin: "uni-push",
		apis: [
			"getPushClientId",
			"onPushMessage",
			"offPushMessage",
			"createPushMessage",
			"setAppBadgeNumber"
		],
		version: "1.0.2"
	}
];

/**
 * uni-app内部extapi发行到ohpm的uni_modules组织下的包列表
 * 注意此列表会同时被框架编译器和用户项目编译器引用
 */
// type ExternalModuleSubType = 'customElements' | 'components' | 'pages' | 'utssdk'
// TODO 未来component类型的provider需要重构，比如uni-map-tencent需要依赖内置基础模块uni-map，先基于现状实现。
const ComponentsWithProvider = [];
const ComponentsWithProviderX = ['uni-map'];

const isX = process.env.UNI_APP_X === 'true';
const StandaloneExtApis = isX ? ExternalModulesX : ExternalModuls;
const Providers = StandaloneExtApis.filter((item) => item.type === 'provider');
const ComponentWithProviderList = isX
    ? ComponentsWithProviderX
    : ComponentsWithProvider;
if (isX) {
    Providers.push({
        type: 'provider',
        plugin: 'uni-map',
        provider: 'tencent',
        service: 'map',
        version: '1.0.0',
    });
}
const ApiModules = StandaloneExtApis.filter((item) => item.type === 'extapi');
const commandGlobals = {
    vue: 'Vue',
    '@vue/shared': 'uni.VueShared',
};
const harmonyGlobals = [
    /^@ohos\./,
    /^@kit\./,
    /^@hms\./,
    /^@arkts\./,
    /^@system\./,
    '@ohos/hypium',
    '@ohos/hamock',
];
function isHarmonyGlobal(id) {
    return harmonyGlobals.some((harmonyGlobal) => typeof harmonyGlobal === 'string'
        ? harmonyGlobal === id
        : harmonyGlobal.test(id));
}
function generateHarmonyImportSpecifier(id) {
    return id.replace(/([@\/\.])/g, function (_, $1) {
        switch ($1) {
            case '.':
                return '_';
            case '/':
                return '__';
            default:
                return '';
        }
    });
}
function generateHarName(moduleName) {
    return moduleName.replace(/@/g, '').replace(/\//g, '__').replace(/-/g, '_');
}
function generateHarmonyImportExternalCode(harmonyPackageNames) {
    return harmonyPackageNames
        .filter((harmonyPackageName) => isHarmonyGlobal(harmonyPackageName))
        .map((harmonyPackageName) => `import ${generateHarmonyImportSpecifier(harmonyPackageName)} from '${harmonyPackageName}';`)
        .join('');
}
function uniAppHarmonyPlugin() {
    return {
        name: 'uni:app-harmony',
        apply: 'build',
        config() {
            return {
                build: {
                    rollupOptions: {
                        external: [...Object.keys(commandGlobals), ...harmonyGlobals],
                        output: {
                            globals: function (id) {
                                if (id.startsWith('@kit.')) {
                                    console.warn('@kit开头的包无法在页面或组件内正常使用，请改用其他方式引用，或使用uts插件引用。');
                                }
                                return (commandGlobals[id] ||
                                    (isHarmonyGlobal(id)
                                        ? generateHarmonyImportSpecifier(id)
                                        : ''));
                            },
                        },
                    },
                },
            };
        },
        async generateBundle(_, bundle) {
            const utsExtApis = new Set();
            const utsPlugins = uniCliShared.getCurrentCompiledUTSPlugins();
            const utsProviders = uniCliShared.getCurrentCompiledUTSProviders();
            // utsPlugins.difference(utsProviders)
            utsPlugins.forEach((plugin) => {
                if (utsProviders.has(plugin)) {
                    return;
                }
                utsExtApis.add(plugin);
            });
            if (uniCliShared.isNormalCompileTarget()) {
                // 此方法仅需要处理非provider
                genAppHarmonyUniModules(this, process.env.UNI_INPUT_DIR, utsExtApis);
                for (const key in bundle) {
                    const serviceBundle = bundle[key];
                    if (serviceBundle.code) {
                        serviceBundle.code =
                            generateHarmonyImportExternalCode(serviceBundle.imports) +
                                serviceBundle.code;
                    }
                }
            }
        },
        async writeBundle() {
            if (!uniCliShared.isNormalCompileTarget()) {
                return;
            }
            // 1.0 特有逻辑，x 上由其他插件完成
            if (process.env.UNI_APP_X !== 'true') {
                // x 上暂时编译所有uni ext api，不管代码里是否调用了
                await uniCliShared.buildUniExtApis();
            }
        },
    };
}
/**
 * TODO 微信支付上线时，务必提醒相关同事统一使用wxpay，不要用weixin
 */
function getProviders(module, allProviders) {
    return allProviders.filter((item) => item.plugin.startsWith(module + '-'));
}
const DefaultModule = {
// 'uni-getLocation': {
//   system: {},
// },
};
function getManifestModules(inputDir) {
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const modules = manifest?.['app-harmony']?.distribute?.modules;
    const realModules = {};
    for (const moduleName in modules) {
        if (DefaultModule[moduleName]) {
            realModules[moduleName] = Object.assign({}, DefaultModule[moduleName], modules[moduleName]);
        }
        else {
            realModules[moduleName] = modules[moduleName];
        }
    }
    return realModules;
}
/**
 * 获取manifest.json中勾选的provider
 * 仅处理payment等参数内包含provider的api，地图模块不在此处理
 */
function getRelatedProviders(inputDir, allProviders) {
    const relatedProviders = [];
    const manifestModules = getManifestModules(inputDir);
    if (!manifestModules) {
        return relatedProviders;
    }
    for (const uniModule in manifestModules) {
        const providers = getProviders(uniModule, allProviders);
        if (!providers.length) {
            continue;
        }
        const manifestModule = manifestModules[uniModule];
        for (const name in manifestModule) {
            const providerConf = manifestModule[name];
            if (!providerConf) {
                continue;
            }
            if (!isHarmonyOSProvider(providerConf)) {
                continue;
            }
            const plugin = uniModule + '-' + name;
            const provider = providers.find((item) => item.plugin === plugin);
            if (!provider) {
                continue;
            }
            relatedProviders.push({
                service: provider.service,
                name,
                plugin: uniModule + '-' + name,
            });
        }
    }
    return relatedProviders;
}
function isHarmonyOSProvider(providerConf) {
    return (!providerConf.__platform__ ||
        !Array.isArray(providerConf.__platform__) ||
        providerConf.__platform__.includes('harmonyos'));
}
const ModuleAlias = {
    'uni-facialRecognitionVerify': 'uni-facialVerify',
};
// 获取uni_modules中的相关模块
function getRelatedModules(inputDir) {
    const modules = [];
    const manifestModules = getManifestModules(inputDir);
    if (!manifestModules) {
        return modules;
    }
    for (let manifestModuleName in manifestModules) {
        if (ComponentWithProviderList.includes(manifestModuleName)) {
            const manifestModuleInfo = manifestModules[manifestModuleName];
            for (const provider in manifestModuleInfo) {
                const manifestPlugin = manifestModuleName + '-' + provider;
                const providerConf = manifestModuleInfo[provider];
                if (!isHarmonyOSProvider(providerConf)) {
                    continue;
                }
                const apiModule = ApiModules.find((item) => item.plugin === manifestPlugin);
                if (apiModule) {
                    modules.push(manifestPlugin);
                }
                continue;
            }
        }
        if (ModuleAlias[manifestModuleName]) {
            manifestModuleName = ModuleAlias[manifestModuleName];
        }
        const apiModule = ApiModules.find((item) => item.plugin === manifestModuleName);
        if (!apiModule) {
            continue;
        }
        modules.push(manifestModuleName);
    }
    return modules;
}
function getTreeshakeModules(context) {
    const ids = Array.from(context.getModuleIds());
    const uniExtApis = new Set();
    ids.forEach((id) => {
        const moduleInfo = context.getModuleInfo(id);
        if (moduleInfo &&
            moduleInfo.meta &&
            Array.isArray(moduleInfo.meta.uniExtApis)) {
            moduleInfo.meta.uniExtApis.forEach((api) => {
                uniExtApis.add(api);
            });
        }
    });
    const { getPluginInjectApis } = uniCliShared.resolveUTSCompiler();
    // uts 插件里使用的 ext api 和组件
    const pluginInjectApis = getPluginInjectApis();
    pluginInjectApis.forEach((api) => {
        uniExtApis.add(api);
    });
    const modules = new Set();
    uniExtApis.forEach((api) => {
        const uniApiName = api.replace(/^uni./, '');
        const moduleInfo = ApiModules.find((item) => {
            return item.apis && item.apis.includes(uniApiName);
        });
        if (moduleInfo) {
            modules.add(moduleInfo.plugin);
        }
    });
    return Array.from(modules);
}
function genAppHarmonyUniModules(context, inputDir, utsPlugins) {
    const uniModulesDir = path__default.default.resolve(inputDir, 'uni_modules');
    const importCodes = [];
    const extApiCodes = [];
    const registerCodes = [];
    const projectDeps = [];
    Array.from(utsPlugins)
        .sort()
        .forEach((plugin) => {
        const injects = uniCliShared.parseUniExtApi(path__default.default.resolve(uniModulesDir, plugin), plugin, true, 'app-harmony', 'arkts');
        const harmonyPackageName = `@uni_modules/${plugin.toLowerCase()}`;
        if (injects) {
            Object.keys(injects).forEach((key) => {
                const inject = injects[key];
                if (Array.isArray(inject) && inject.length > 1) {
                    const apiName = inject[1];
                    importCodes.push(`import { ${inject[1]} } from '${harmonyPackageName}'`);
                    extApiCodes.push(`uni.${apiName} = ${apiName}`);
                }
            });
        }
        const ident = uniCliShared.camelize(plugin);
        importCodes.push(`import * as ${ident} from '${harmonyPackageName}'`);
        registerCodes.push(`uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`);
        projectDeps.push({
            moduleSpecifier: harmonyPackageName,
            plugin,
            source: 'local',
        });
    });
    const relatedModules = getRelatedModules(inputDir);
    let relatedModulesAndUsedModules = relatedModules;
    if (isX) {
        relatedModulesAndUsedModules = Array.from(new Set([
            ...relatedModulesAndUsedModules,
            ...getTreeshakeModules(context),
        ]));
    }
    relatedModulesAndUsedModules.sort().forEach((module) => {
        const harmonyModuleName = `@uni_modules/${module.toLowerCase()}`;
        if (utsPlugins.has(module)) ;
        else {
            const matchedStandaloneExtApi = StandaloneExtApis.find((item) => item.plugin === module);
            if (matchedStandaloneExtApi) {
                projectDeps.push({
                    moduleSpecifier: harmonyModuleName,
                    plugin: module,
                    source: 'ohpm',
                    version: '*',
                });
                matchedStandaloneExtApi.apis?.forEach((apiName) => {
                    importCodes.push(`import { ${apiName} } from '${harmonyModuleName}'`);
                    extApiCodes.push(`uni.${apiName} = ${apiName}`);
                });
                if (module.startsWith('uni-map-')) {
                    // TODO 临时处理，后续需要内置基础uni-map模块并优化此问题
                    importCodes.push(`import { UniMapElement } from '${harmonyModuleName}'`);
                    extApiCodes.push(`globalThis.UniMapElement = UniMapElement`);
                    const ident = uniCliShared.camelize(module);
                    importCodes.push(`import * as ${ident} from '${harmonyModuleName}'`);
                    registerCodes.push(`uni.registerUTSPlugin('uni_modules/${module}', ${ident})`);
                }
            }
        }
    });
    const importProviderCodes = [];
    const registerProviderCodes = [];
    const providers = uniCliShared.getUniExtApiProviderRegisters();
    const allProviders = providers.map((provider) => {
        return {
            service: provider.service,
            name: provider.name,
            moduleSpecifier: `@uni_modules/${provider.plugin.toLowerCase()}`,
            plugin: provider.plugin,
            source: 'local',
            version: undefined,
        };
    });
    Providers.forEach((provider) => {
        if (allProviders.find((item) => item.plugin === provider.plugin)) {
            return;
        }
        allProviders.push({
            service: provider.service,
            name: provider.provider,
            moduleSpecifier: `@uni_modules/${provider.plugin.toLowerCase()}`,
            plugin: provider.plugin,
            source: 'ohpm',
            version: '*',
        });
    });
    const relatedProviders = getRelatedProviders(inputDir, allProviders);
    relatedProviders.sort().forEach((relatedProvider) => {
        const provider = allProviders.find((item) => item.service === relatedProvider.service &&
            item.name === relatedProvider.name);
        if (!provider) {
            return;
        }
        projectDeps.push({
            moduleSpecifier: provider.moduleSpecifier,
            plugin: provider.plugin,
            source: provider.source,
            version: provider.version,
        });
        const className = uniCliShared.formatExtApiProviderName(provider.service, provider.name);
        importProviderCodes.push(`import { ${className} } from '${provider.moduleSpecifier}'`);
        registerProviderCodes.push(`registerUniProvider('${provider.service}', '${provider.name}', new ${className}())`);
    });
    if (importProviderCodes.length) {
        importCodes.push(...importProviderCodes);
        extApiCodes.push(...registerProviderCodes);
    }
    const pluginCustomElements = uniCliShared.getUTSPluginCustomElements();
    Object.keys(pluginCustomElements)
        .sort()
        .forEach((pluginId) => {
        if (!utsPlugins.has(pluginId)) {
            // 可能没使用，没编译
            return;
        }
        const elements = [...pluginCustomElements[pluginId]];
        if (elements.length) {
            importCodes.push(`import { ${elements
                .map((name) => uniCliShared.capitalize(uniCliShared.camelize(name)) + 'Element')
                .join(', ')} } from '@uni_modules/${pluginId.toLowerCase()}'`);
            elements.forEach((element) => {
                registerCodes.push(`customElements.define('${element.replace('uni-', '')}', ${uniCliShared.capitalize(uniCliShared.camelize(element)) + 'Element'})`);
            });
        }
    });
    const importIds = [];
    if (relatedProviders.length) {
        importIds.push('registerUniProvider');
    }
    if (Object.keys(pluginCustomElements).length) {
        importIds.push('customElements');
    }
    importIds.push('uni');
    importCodes.unshift(`import { ${importIds.join(', ')} } from '${process.env.UNI_APP_X !== 'true'
        ? '@dcloudio/uni-app-runtime'
        : '@dcloudio/uni-app-x-runtime'}'`);
    context.emitFile({
        type: 'asset',
        fileName: 'uni_modules/index.generated.ets',
        source: `// This file is automatically generated by uni-app.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${importCodes.join('\n')}

export function initUniModules() {
  initUniExtApi()
  ${registerCodes.join('\n  ')}
}

function initUniExtApi() {
  ${extApiCodes.join('\n  ')}
}
`,
    });
    const dependencies = {};
    const modules = [];
    projectDeps.forEach((dep) => {
        if (dep.source === 'local') {
            const depPath = './uni_modules/' + dep.plugin;
            dependencies[dep.moduleSpecifier] = depPath;
            modules.push({
                name: generateHarName(dep.moduleSpecifier),
                srcPath: depPath,
            });
        }
        else {
            if (!dependencies[dep.moduleSpecifier]) {
                dependencies[dep.moduleSpecifier] = `./libs/${generateHarName(dep.moduleSpecifier)}.har`;
            }
        }
    });
    context.emitFile({
        type: 'asset',
        fileName: 'uni_modules/oh-package.json5',
        source: JSON.stringify({ dependencies }, null, 2),
    });
    context.emitFile({
        type: 'asset',
        fileName: 'uni_modules/build-profile.json5',
        source: JSON.stringify({ modules }, null, 2),
    });
}

const externalModulesX = ExternalModulesX;
var index = [
    process.env.UNI_APP_X === 'true' ? uniAppUts.initUniAppXHarmonyPlugin : appVite__default.default,
    uniAppHarmonyPlugin,
];

exports.default = index;
exports.externalModulesX = externalModulesX;
