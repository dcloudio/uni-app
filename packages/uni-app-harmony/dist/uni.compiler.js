'use strict';

var appVite = require('@dcloudio/uni-app-vite');
var path = require('path');
var fs = require('fs-extra');
var uniCliShared = require('@dcloudio/uni-cli-shared');

function _interopDefault (e) { return e && e.__esModule ? e : { default: e }; }

var appVite__default = /*#__PURE__*/_interopDefault(appVite);
var path__default = /*#__PURE__*/_interopDefault(path);
var fs__default = /*#__PURE__*/_interopDefault(fs);

const commondGlobals = {
    vue: 'Vue',
    '@vue/shared': 'uni.VueShared',
};
const harmonyGlobals = [
    /^@ohos\./,
    /^@kit\./,
    /^@hms\./,
    '@ohos/hypium',
    '@ohos/hamock',
];
function isHarmoneyGlobal(id) {
    return harmonyGlobals.some((harmonyGlobal) => typeof harmonyGlobal === 'string'
        ? harmonyGlobal === id
        : harmonyGlobal.test(id));
}
function generateHarmonyImportSpecifier(id) {
    return id.replace(/([@\.])/g, function (_, $1) {
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
        .map((hamonyPackageName) => `import ${generateHarmonyImportSpecifier(hamonyPackageName)} from '${hamonyPackageName}';`);
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
function genAppHarmonyIndex(inputDir, utsPlugins) {
    if (!process.env.UNI_APP_HARMONY_PROJECT_PATH) {
        return;
    }
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
                    importCodes.push(`import { ${inject[1]} } from './${plugin}/utssdk/app-harmony'`);
                    extApiCodes.push(`uni.${apiName} = ${apiName}`);
                }
            });
        }
        else {
            const ident = uniCliShared.camelize(plugin);
            importCodes.push(`import * as ${ident} from './${plugin}/utssdk/app-harmony'`);
            registerCodes.push(`uni.registerUTSPlugin('uni_modules/${plugin}', ${ident})`);
        }
    });
    const importProviderCodes = [];
    const registerProviderCodes = [];
    const providers = uniCliShared.getUniExtApiProviderRegisters();
    providers.forEach((provider) => {
        const parts = provider.class.split('.');
        const className = parts[parts.length - 1];
        importProviderCodes.push(`import { ${className} } from './${provider.plugin}/utssdk/app-harmony'`);
        registerProviderCodes.push(`registerUniProvider('${provider.service}', '${provider.name}', new ${className}())`);
    });
    if (importProviderCodes.length) {
        importProviderCodes.unshift(`import { registerUniProvider } from '../uni-app/lib/uni-api-shared'`);
        importCodes.push(...importProviderCodes);
        extApiCodes.push(...registerProviderCodes);
    }
    fs__default.default.writeFileSync(path__default.default.resolve(uniCliShared.resolveUTSCompiler().resolveAppHarmonyUniModulesRootDir(process.env.UNI_APP_HARMONY_PROJECT_PATH), 'index.generated.ets'), `// This file is automatically generated by uni-app.
// Do not modify this file -- YOUR CHANGES WILL BE ERASED!
${importCodes.join('\n')}

export function initUniModules(uni: ESObject) {
  initUniExtApi(uni)
  ${registerCodes.join('\n  ')}
}

function initUniExtApi(uni: ESObject) {
  ${extApiCodes.join('\n  ')}
}
`);
}

var index = [appVite__default.default, uniAppHarmonyPlugin];

module.exports = index;
