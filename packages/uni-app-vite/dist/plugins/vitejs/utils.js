"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processSrcSet = exports.generateCodeFrame = exports.posToNumber = exports.pad = exports.isObject = exports.asyncReplace = exports.isDataUrl = exports.dataUrlRE = exports.isExternalUrl = exports.externalRE = exports.cleanUrl = exports.hashRE = exports.queryRE = exports.normalizePath = exports.isWindows = exports.deepImportRE = exports.bareImportRE = exports.slash = void 0;
/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/utils.ts
 */
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
function slash(p) {
    return p.replace(/\\/g, '/');
}
exports.slash = slash;
exports.bareImportRE = /^[\w@](?!.*:\/\/)/;
exports.deepImportRE = /^([^@][^/]*)\/|^(@[^/]+\/[^/]+)\//;
exports.isWindows = os_1.default.platform() === 'win32';
function normalizePath(id) {
    return path_1.default.posix.normalize(exports.isWindows ? slash(id) : id);
}
exports.normalizePath = normalizePath;
exports.queryRE = /\?.*$/s;
exports.hashRE = /#.*$/s;
const cleanUrl = (url) => url.replace(exports.hashRE, '').replace(exports.queryRE, '');
exports.cleanUrl = cleanUrl;
exports.externalRE = /^(https?:)?\/\//;
const isExternalUrl = (url) => exports.externalRE.test(url);
exports.isExternalUrl = isExternalUrl;
exports.dataUrlRE = /^\s*data:/i;
const isDataUrl = (url) => exports.dataUrlRE.test(url);
exports.isDataUrl = isDataUrl;
function asyncReplace(input, re, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        let match;
        let remaining = input;
        let rewritten = '';
        while ((match = re.exec(remaining))) {
            rewritten += remaining.slice(0, match.index);
            rewritten += yield replacer(match);
            remaining = remaining.slice(match.index + match[0].length);
        }
        rewritten += remaining;
        return rewritten;
    });
}
exports.asyncReplace = asyncReplace;
function isObject(value) {
    return Object.prototype.toString.call(value) === '[object Object]';
}
exports.isObject = isObject;
const splitRE = /\r?\n/;
const range = 2;
function pad(source, n = 2) {
    const lines = source.split(splitRE);
    return lines.map((l) => ` `.repeat(n) + l).join(`\n`);
}
exports.pad = pad;
function posToNumber(source, pos) {
    if (typeof pos === 'number')
        return pos;
    const lines = source.split(splitRE);
    const { line, column } = pos;
    let start = 0;
    for (let i = 0; i < line - 1; i++) {
        start += lines[i].length + 1;
    }
    return start + column;
}
exports.posToNumber = posToNumber;
function generateCodeFrame(source, start = 0, end) {
    start = posToNumber(source, start);
    end = end || start;
    const lines = source.split(splitRE);
    let count = 0;
    const res = [];
    for (let i = 0; i < lines.length; i++) {
        count += lines[i].length + 1;
        if (count >= start) {
            for (let j = i - range; j <= i + range || end > count; j++) {
                if (j < 0 || j >= lines.length)
                    continue;
                const line = j + 1;
                res.push(`${line}${' '.repeat(Math.max(3 - String(line).length, 0))}|  ${lines[j]}`);
                const lineLength = lines[j].length;
                if (j === i) {
                    // push underline
                    const pad = start - (count - lineLength) + 1;
                    const length = Math.max(1, end > count ? lineLength - pad : end - start);
                    res.push(`   |  ` + ' '.repeat(pad) + '^'.repeat(length));
                }
                else if (j > i) {
                    if (end > count) {
                        const length = Math.max(Math.min(end - count, lineLength), 1);
                        res.push(`   |  ` + '^'.repeat(length));
                    }
                    count += lineLength + 1;
                }
            }
            break;
        }
    }
    return res.join('\n');
}
exports.generateCodeFrame = generateCodeFrame;
const escapedSpaceCharacters = /( |\\t|\\n|\\f|\\r)+/g;
function processSrcSet(srcs, replacer) {
    return __awaiter(this, void 0, void 0, function* () {
        const imageCandidates = srcs
            .split(',')
            .map((s) => {
            const [url, descriptor] = s
                .replace(escapedSpaceCharacters, ' ')
                .trim()
                .split(' ', 2);
            return { url, descriptor };
        })
            .filter(({ url }) => !!url);
        const ret = yield Promise.all(imageCandidates.map(({ url, descriptor }) => __awaiter(this, void 0, void 0, function* () {
            return {
                url: yield replacer({ url, descriptor }),
                descriptor,
            };
        })));
        const url = ret.reduce((prev, { url, descriptor }, index) => {
            descriptor = descriptor || '';
            return (prev +=
                url + ` ${descriptor}${index === ret.length - 1 ? '' : ', '}`);
        }, '');
        return url;
    });
}
exports.processSrcSet = processSrcSet;
