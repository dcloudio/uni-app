"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDefines = exports.parseExports = exports.genUniModulesExports = void 0;
const path_1 = __importDefault(require("path"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const merge_1 = require("merge");
function genUniModulesExports() {
    const uniModulesDir = path_1.default.resolve(process.env.UNI_INPUT_DIR, 'uni_modules');
    if (!fs_extra_1.default.existsSync(uniModulesDir)) {
        return '';
    }
    const importCodes = [];
    const assignCodes = [];
    fs_extra_1.default.readdirSync(uniModulesDir).forEach((uniModuleDir) => {
        var _a, _b;
        // 必须以 uni- 开头
        if (!uniModuleDir.startsWith('uni-')) {
            return;
        }
        const pkgPath = path_1.default.resolve(uniModulesDir, uniModuleDir, 'package.json');
        if (!fs_extra_1.default.existsSync(pkgPath)) {
            return;
        }
        const exports = (_b = (_a = JSON.parse(fs_extra_1.default.readFileSync(pkgPath, 'utf8'))) === null || _a === void 0 ? void 0 : _a.uni_modules) === null || _b === void 0 ? void 0 : _b.exports;
        if (exports) {
            const [exportsImportCodes, exportsAssignCodes] = parseExports(process.env.UNI_PLATFORM === 'h5' ? 'web' : process.env.UNI_PLATFORM, `@/uni_modules/${uniModuleDir}`, exports);
            importCodes.push(...exportsImportCodes);
            assignCodes.push(...exportsAssignCodes);
        }
    });
    if (!importCodes.length) {
        return '';
    }
    return `${importCodes.join('\n')}
${assignCodes.join('\n')}`;
}
exports.genUniModulesExports = genUniModulesExports;
function parseExports(platform, source, exports = {}) {
    const rootDefines = {};
    Object.keys(exports).forEach((name) => {
        if (name.startsWith('uni')) {
            rootDefines[name] = exports[name];
        }
    });
    const platformDefines = exports[platform];
    // 该平台不支持
    if (platformDefines === false) {
        return [[], []];
    }
    return parseDefines(source, (0, merge_1.recursive)(true, rootDefines, platformDefines));
}
exports.parseExports = parseExports;
function parseDefines(source, defines = {}) {
    const importCodes = [];
    const assignCodes = [];
    Object.keys(defines).forEach((name) => {
        const [defineImportCodes, defineAssignCodes] = parseDefine(source, name, defines[name]);
        importCodes.push(...defineImportCodes);
        assignCodes.push(...defineAssignCodes);
    });
    return [importCodes, assignCodes];
}
exports.parseDefines = parseDefines;
/**
 *  uni:'getBatteryInfo'
 * import getBatteryInfo from '..'
 *
 * uni:['getBatteryInfo']
 * import { getBatteryInfo } from '..'
 *
 * uni:['openLocation','chooseLocation']
 * import { openLocation, chooseLocation } from '..'
 *
 * uni:{
 *  onUserCaptureScreen: "onCaptureScreen"
 *  offUserCaptureScreen: "offCaptureScreen"
 * }
 *
 * uni.getBatteryInfo = getBatteryInfo
 * @param source
 * @param globalObject
 * @param define
 * @returns
 */
function parseDefine(source, globalObject, define) {
    const importCodes = [];
    const assignCodes = [];
    if (typeof define === 'string') {
        importCodes.push(`import ${define} from '${source}'`);
        assignCodes.push(`${globalObject}.${define} = ${define}`);
    }
    else if (Array.isArray(define)) {
        importCodes.push(`import { ${define.join(', ')} } from '${source}'`);
        define.forEach((d) => {
            assignCodes.push(`${globalObject}.${d} = ${d}`);
        });
    }
    else {
        const keys = Object.keys(define);
        const specifiers = [];
        keys.forEach((d) => {
            if (d !== define[d]) {
                specifiers.push(`${define[d]} as ${d}`);
            }
            else {
                specifiers.push(d);
            }
            assignCodes.push(`${globalObject}.${d} = ${d}`);
        });
        importCodes.push(`import { ${specifiers.join(', ')} } from '${source}'`);
    }
    return [importCodes, assignCodes];
}
