'use strict';

var appVite = require('@dcloudio/uni-app-vite');
var path = require('path');
var fs = require('fs-extra');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var appVite__default = /*#__PURE__*/_interopDefault(appVite);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

var StandaloneExtApis = [
	{
	}
];

const commondGlobals = {
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
function isHarmoneyGlobal(id) {
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
function generateHarmonyImportExternalCode(hamonyPackageNames) {
    return hamonyPackageNames
        .filter((hamonyPackageName) => isHarmoneyGlobal(hamonyPackageName))
        .map((hamonyPackageName) => `import ${generateHarmonyImportSpecifier(hamonyPackageName)} from '${hamonyPackageName}';`)
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
                        external: [...Object.keys(commondGlobals), ...harmonyGlobals],
                        output: {
                            globals: function (id) {
                                return (commondGlobals[id] ||
                                    (isHarmoneyGlobal(id)
                                        ? generateHarmonyImportSpecifier(id)
                                        : ''));
                            },
                        },
                    },
                },
            };
        },
        async generateBundle(_, bundle) {
            genAppHarmonyIndex(process.env.UNI_INPUT_DIR, uniCliShared.getCurrentCompiledUTSPlugins());
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
            if (process.env.UNI_COMPILE_TARGET === 'uni_modules') {
                return;
            }
            // x 上暂时编译所有uni ext api，不管代码里是否调用了
            await uniCliShared.buildUniExtApis();
        },
    };
}
// 仅存放重命名的provider service
const SupportedProviderService = {
    oauth: {},
    payment: {
        weixin: 'wxpay',
    },
};
/**
 * 获取manifest.json中勾选的provider
 */
function getRelatedProviders(inputDir) {
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const providers = [];
    const sdkConfigs = manifest?.['app-plus']?.distribute?.sdkConfigs;
    if (!sdkConfigs) {
        return providers;
    }
    for (const service in sdkConfigs) {
        if (Object.prototype.hasOwnProperty.call(sdkConfigs, service)) {
            const ProviderNameMap = SupportedProviderService[service];
            if (!ProviderNameMap) {
                continue;
            }
            const relatedProviders = sdkConfigs[service];
            for (const name in relatedProviders) {
                if (Object.prototype.hasOwnProperty.call(relatedProviders, name)) {
                    const providerName = ProviderNameMap[name];
                    providers.push({
                        service,
                        name: providerName || name,
                    });
                }
            }
        }
    }
    return providers;
}
const SupportedModules = {
    FacialRecognitionVerify: 'uni-facialRecognitionVerify',
};
// 获取uni_modules中的相关模块
function getRelatedModules(inputDir) {
    const manifest = uniCliShared.parseManifestJsonOnce(inputDir);
    const modules = [];
    const manifestModules = manifest?.['app-plus']?.modules;
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
function genAppHarmonyIndex(inputDir, utsPlugins) {
    const uniModulesDir = path__default.default.resolve(inputDir, 'uni_modules');
    const importCodes = [];
    const extApiCodes = [];
    const registerCodes = [];
    utsPlugins.forEach((plugin) => {
        const injects = uniCliShared.parseUniExtApi(path__default.default.resolve(uniModulesDir, plugin), plugin, true, 'app-harmony', 'arkts');
        if (injects) {
            Object.keys(injects).forEach((key) => {
                const inject = injects[key];
                if (Array.isArray(inject) && inject.length > 1) {
                    const apiName = inject[1];
                    importCodes.push(`import { ${inject[1]} } from '@uni_modules/${plugin}'`);
                    extApiCodes.push(`uni.${apiName} = ${apiName}`);
                }
            });
        }
        else {
            const ident = uniCliShared.camelize(plugin);
            importCodes.push(`import * as ${ident} from '@uni_modules/${plugin}'`);
            registerCodes.push(`uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`);
        }
    });
    const relatedProviders = getRelatedProviders(inputDir);
    const relatedModules = getRelatedModules(inputDir);
    const projectDeps = [];
    relatedModules.forEach((module) => {
        if (utsPlugins.has(module)) {
            projectDeps.push({
                moduleSpecifier: `@uni_modules/${module}`,
                plugin: module,
                source: 'local',
            });
        }
        else {
            projectDeps.push({
                moduleSpecifier: `@uni_modules/${module}`,
                plugin: module,
                source: 'ohpm',
            });
        }
        importCodes.push(`import '@uni_modules/${module}'`);
    });
    const importProviderCodes = [];
    const registerProviderCodes = [];
    const providers = uniCliShared.getUniExtApiProviderRegisters();
    const allProviders = providers.map((provider) => {
        return {
            service: provider.service,
            name: provider.name,
            moduleSpecifier: `@uni_modules/${provider.plugin}`,
            plugin: provider.plugin,
            source: 'local',
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
            moduleSpecifier: `@uni_modules/${extapi.plugin}`,
            plugin: extapi.plugin,
            source: 'ohpm',
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
        });
        const className = uniCliShared.formatExtApiProviderName(provider.service, provider.name);
        importProviderCodes.push(`import { ${className} } from '${provider.moduleSpecifier}'`);
        registerProviderCodes.push(`registerUniProvider('${provider.service}', '${provider.name}', new ${className}())`);
    });
    if (importProviderCodes.length) {
        importProviderCodes.unshift(`import { registerUniProvider, uni } from '@dcloudio/uni-app-runtime'`);
        importCodes.push(...importProviderCodes);
        extApiCodes.push(...registerProviderCodes);
    }
    const uniModuleEntryDir = uniCliShared.resolveUTSCompiler().resolveAppHarmonyUniModulesEntryDir();
    fs__default.default.outputFileSync(path__default.default.resolve(uniModuleEntryDir, 'index.generated.ets'), `// This file is automatically generated by uni-app.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${importCodes.join('\n')}

export function initUniModules() {
  initUniExtApi()
  ${registerCodes.join('\n  ')}
}

function initUniExtApi() {
  ${extApiCodes.join('\n  ')}
}
`);
    const dependencies = {};
    const modules = [];
    projectDeps.forEach((dep) => {
        // TODO 依赖版本绑定编译器版本
        if (dep.source === 'local') {
            const depPath = './uni_modules/' + dep.plugin;
            dependencies[dep.moduleSpecifier] = depPath;
            modules.push({
                name: dep.moduleSpecifier
                    .replace(/@/g, '')
                    .replace(/\//g, '__')
                    .replace(/-/g, '_'),
                srcPath: depPath,
            });
        }
        else {
            dependencies[dep.moduleSpecifier] = '*';
        }
    });
    // TODO 写入到用户项目的oh-package.json5、build-profile.json5内
    fs__default.default.outputJSONSync(path__default.default.resolve(uniModuleEntryDir, 'oh-package.json5'), { dependencies }, { spaces: 2 });
    fs__default.default.outputJSONSync(path__default.default.resolve(uniModuleEntryDir, 'build-profile.json5'), { modules }, { spaces: 2 });
}

var index = [appVite__default.default, uniAppHarmonyPlugin];

module.exports = index;
