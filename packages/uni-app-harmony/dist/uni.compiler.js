'use strict';

var appVite = require('@dcloudio/uni-app-vite');
var uniAppUts = require('@dcloudio/uni-app-uts');
var path = require('path');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var appVite__default = /*#__PURE__*/_interopDefault(appVite);
var path__default = /*#__PURE__*/_interopDefault(path);

var StandaloneExtApis = [
	{
		type: "extapi",
		plugin: "uni-facialRecognitionVerify",
		apis: [
			"startFacialRecognitionVerify",
			"getFacialRecognitionMetaInfo"
		],
		version: "1.0.3"
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
// 仅存放重命名的provider service
const SupportedProviderService = {
    'uni-oauth': {
        huawei: 'huawei',
    },
    'uni-payment': {
        weixin: 'wxpay',
    },
};
/**
 * 获取manifest.json中勾选的provider
 */
function getRelatedProviders(inputDir) {
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const providers = [];
    const manifestModules = manifest?.['app-harmony']?.distribute?.modules;
    if (!manifestModules) {
        return providers;
    }
    for (const uniModule in manifestModules) {
        if (Object.prototype.hasOwnProperty.call(manifestModules, uniModule)) {
            const ProviderNameMap = SupportedProviderService[uniModule];
            if (!ProviderNameMap) {
                continue;
            }
            const relatedProviders = manifestModules[uniModule];
            for (const name in relatedProviders) {
                if (Object.prototype.hasOwnProperty.call(relatedProviders, name)) {
                    const providerConf = relatedProviders[name];
                    if (!providerConf) {
                        continue;
                    }
                    if (!providerConf.__platform__ ||
                        (Array.isArray(providerConf.__platform__) &&
                            providerConf.__platform__.includes('harmonyos'))) {
                        const providerName = ProviderNameMap[name];
                        providers.push({
                            service: uniModule.replace(/^uni-/, ''),
                            name: providerName || name,
                        });
                    }
                }
            }
        }
    }
    return providers;
}
const SupportedModules = {
    'uni-facialRecognitionVerify': 'uni-facialRecognitionVerify',
    'uni-push': 'uni-push',
};
// 获取uni_modules中的相关模块
function getRelatedModules(inputDir) {
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const modules = [];
    const manifestModules = manifest?.['app-harmony']?.distribute?.modules;
    if (!manifestModules) {
        return modules;
    }
    for (const manifestModule in manifestModules) {
        if (Object.prototype.hasOwnProperty.call(manifestModules, manifestModule)) {
            const moduleName = SupportedModules[manifestModule];
            if (!moduleName) {
                continue;
            }
            modules.push(moduleName);
        }
    }
    return modules;
}
function genAppHarmonyUniModules(context, inputDir, utsPlugins) {
    const uniModulesDir = path__default.default.resolve(inputDir, 'uni_modules');
    const importCodes = [];
    const extApiCodes = [];
    const registerCodes = [];
    const projectDeps = [];
    utsPlugins.forEach((plugin) => {
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
        else {
            const ident = uniCliShared.camelize(plugin);
            importCodes.push(`import * as ${ident} from '${harmonyPackageName}'`);
            registerCodes.push(`uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`);
        }
        projectDeps.push({
            moduleSpecifier: harmonyPackageName,
            plugin,
            source: 'local',
        });
    });
    const relatedProviders = getRelatedProviders(inputDir);
    const relatedModules = getRelatedModules(inputDir);
    relatedModules.forEach((module) => {
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
    StandaloneExtApis.filter((item) => {
        return item.type === 'provider';
    }).forEach((extapi) => {
        if (allProviders.find((item) => item.plugin === extapi.plugin)) {
            return;
        }
        const [_, service, provider] = extapi.plugin.split('-');
        allProviders.push({
            service,
            name: provider,
            moduleSpecifier: `@uni_modules/${extapi.plugin.toLowerCase()}`,
            plugin: extapi.plugin,
            source: 'ohpm',
            version: '*',
        });
    });
    relatedProviders.forEach((relatedProvider) => {
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
    importCodes.unshift(`import { registerUniProvider, uni } from '${process.env.UNI_APP_X !== 'true'
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

var index = [
    process.env.UNI_APP_X === 'true' ? uniAppUts.initUniAppXHarmonyPlugin : appVite__default.default,
    uniAppHarmonyPlugin,
];

module.exports = index;
