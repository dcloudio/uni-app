"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.urlToBuiltUrl = exports.getAssetHash = exports.getAssetFilename = exports.fileToUrl = exports.checkPublicFile = exports.registerAssetToChunk = exports.assetPlugin = exports.chunkToEmittedAssetsMap = exports.assetUrlRE = void 0;
/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/plugins/asset.ts
 */
const path_1 = __importDefault(require("path"));
const url_1 = require("url");
const fs_1 = __importStar(require("fs"));
const lite_1 = __importDefault(require("mime/lite"));
const utils_1 = require("../utils");
const constants_1 = require("../constants");
const magic_string_1 = __importDefault(require("magic-string"));
const crypto_1 = require("crypto");
exports.assetUrlRE = /__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?/g;
// urls in JS must be quoted as strings, so when replacing them we need
// a different regex
const assetUrlQuotedRE = /"__VITE_ASSET__([a-z\d]{8})__(?:\$_(.*?)__)?"/g;
const rawRE = /(\?|&)raw(?:&|$)/;
const urlRE = /(\?|&)url(?:&|$)/;
exports.chunkToEmittedAssetsMap = new WeakMap();
const assetCache = new WeakMap();
const assetHashToFilenameMap = new WeakMap();
// save hashes of the files that has been emitted in build watch
const emittedHashMap = new WeakMap();
/**
 * Also supports loading plain strings with import text from './foo.txt?raw'
 */
function assetPlugin(config) {
    // assetHashToFilenameMap initialization in buildStart causes getAssetFilename to return undefined
    assetHashToFilenameMap.set(config, new Map());
    return {
        name: 'vite:asset',
        buildStart() {
            assetCache.set(config, new Map());
            emittedHashMap.set(config, new Set());
        },
        resolveId(id) {
            if (!config.assetsInclude(utils_1.cleanUrl(id))) {
                return;
            }
            // imports to absolute urls pointing to files in /public
            // will fail to resolve in the main resolver. handle them here.
            const publicFile = checkPublicFile(id, config);
            if (publicFile) {
                return id;
            }
        },
        load(id) {
            return __awaiter(this, void 0, void 0, function* () {
                if (id.startsWith('\0')) {
                    // Rollup convention, this id should be handled by the
                    // plugin that marked it with \0
                    return;
                }
                // raw requests, read from disk
                if (rawRE.test(id)) {
                    const file = checkPublicFile(id, config) || utils_1.cleanUrl(id);
                    // raw query, read file and return as string
                    return `export default ${JSON.stringify(yield fs_1.promises.readFile(file, 'utf-8'))}`;
                }
                if (!config.assetsInclude(utils_1.cleanUrl(id)) && !urlRE.test(id)) {
                    return;
                }
                id = id.replace(urlRE, '$1').replace(/[\?&]$/, '');
                const url = yield fileToUrl(id, config, this);
                return `export default ${JSON.stringify(url)}`;
            });
        },
        renderChunk(code, chunk) {
            let match;
            let s;
            while ((match = assetUrlQuotedRE.exec(code))) {
                s = s || (s = new magic_string_1.default(code));
                const [full, hash, postfix = ''] = match;
                // some internal plugins may still need to emit chunks (e.g. worker) so
                // fallback to this.getFileName for that.
                const file = getAssetFilename(hash, config) || this.getFileName(hash);
                registerAssetToChunk(chunk, file);
                const outputFilepath = config.base + file + postfix;
                s.overwrite(match.index, match.index + full.length, JSON.stringify(outputFilepath));
            }
            if (s) {
                return {
                    code: s.toString(),
                    map: config.build.sourcemap ? s.generateMap({ hires: true }) : null,
                };
            }
            else {
                return null;
            }
        },
        generateBundle(_, bundle) {
            // do not emit assets for SSR build
            if (config.command === 'build' && config.build.ssr) {
                for (const file in bundle) {
                    if (bundle[file].type === 'asset' &&
                        !file.includes('ssr-manifest.json')) {
                        delete bundle[file];
                    }
                }
            }
        },
    };
}
exports.assetPlugin = assetPlugin;
function registerAssetToChunk(chunk, file) {
    let emitted = exports.chunkToEmittedAssetsMap.get(chunk);
    if (!emitted) {
        emitted = new Set();
        exports.chunkToEmittedAssetsMap.set(chunk, emitted);
    }
    emitted.add(utils_1.cleanUrl(file));
}
exports.registerAssetToChunk = registerAssetToChunk;
function checkPublicFile(url, { publicDir }) {
    // note if the file is in /public, the resolver would have returned it
    // as-is so it's not going to be a fully resolved path.
    if (!publicDir || !url.startsWith('/')) {
        return;
    }
    const publicFile = path_1.default.join(publicDir, utils_1.cleanUrl(url));
    if (fs_1.default.existsSync(publicFile)) {
        return publicFile;
    }
    else {
        return;
    }
}
exports.checkPublicFile = checkPublicFile;
function fileToUrl(id, config, ctx) {
    if (config.command === 'serve') {
        return fileToDevUrl(id, config);
    }
    else {
        return fileToBuiltUrl(id, config, ctx);
    }
}
exports.fileToUrl = fileToUrl;
function fileToDevUrl(id, config) {
    let rtn;
    if (checkPublicFile(id, config)) {
        // in public dir, keep the url as-is
        rtn = id;
    }
    else if (id.startsWith(config.root)) {
        // in project root, infer short public path
        rtn = '/' + path_1.default.posix.relative(config.root, id);
    }
    else {
        // outside of project root, use absolute fs path
        // (this is special handled by the serve static middleware
        rtn = path_1.default.posix.join(constants_1.FS_PREFIX + id);
    }
    return config.base + rtn.replace(/^\//, '');
}
function getAssetFilename(hash, config) {
    var _a;
    return (_a = assetHashToFilenameMap.get(config)) === null || _a === void 0 ? void 0 : _a.get(hash);
}
exports.getAssetFilename = getAssetFilename;
/**
 * Register an asset to be emitted as part of the bundle (if necessary)
 * and returns the resolved public URL
 */
function fileToBuiltUrl(id, config, pluginContext, skipPublicCheck = false) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!skipPublicCheck && checkPublicFile(id, config)) {
            return config.base + id.slice(1);
        }
        const cache = assetCache.get(config);
        const cached = cache.get(id);
        if (cached) {
            return cached;
        }
        const file = utils_1.cleanUrl(id);
        const content = yield fs_1.promises.readFile(file);
        let url;
        if (config.build.lib ||
            (!file.endsWith('.svg') &&
                content.length < Number(config.build.assetsInlineLimit))) {
            // base64 inlined as a string
            url = `data:${lite_1.default.getType(file)};base64,${content.toString('base64')}`;
        }
        else {
            // emit as asset
            // rollup supports `import.meta.ROLLUP_FILE_URL_*`, but it generates code
            // that uses runtime url sniffing and it can be verbose when targeting
            // non-module format. It also fails to cascade the asset content change
            // into the chunk's hash, so we have to do our own content hashing here.
            // https://bundlers.tooling.report/hashing/asset-cascade/
            // https://github.com/rollup/rollup/issues/3415
            const map = assetHashToFilenameMap.get(config);
            const contentHash = getAssetHash(content);
            const { search, hash } = url_1.parse(id);
            const postfix = (search || '') + (hash || '');
            const basename = path_1.default.basename(file);
            const ext = path_1.default.extname(basename);
            const fileName = path_1.default.posix.join(config.build.assetsDir, `${basename.slice(0, -ext.length)}.${contentHash}${ext}`);
            if (!map.has(contentHash)) {
                map.set(contentHash, fileName);
            }
            const emittedSet = emittedHashMap.get(config);
            if (!emittedSet.has(contentHash)) {
                pluginContext.emitFile({
                    fileName,
                    type: 'asset',
                    source: content,
                });
                emittedSet.add(contentHash);
            }
            url = `__VITE_ASSET__${contentHash}__${postfix ? `$_${postfix}__` : ``}`;
        }
        cache.set(id, url);
        return url;
    });
}
function getAssetHash(content) {
    return crypto_1.createHash('sha256').update(content).digest('hex').slice(0, 8);
}
exports.getAssetHash = getAssetHash;
function urlToBuiltUrl(url, importer, config, pluginContext) {
    return __awaiter(this, void 0, void 0, function* () {
        if (checkPublicFile(url, config)) {
            return config.base + url.slice(1);
        }
        const file = url.startsWith('/')
            ? path_1.default.join(config.root, url)
            : path_1.default.join(path_1.default.dirname(importer), url);
        return fileToBuiltUrl(file, config, pluginContext, 
        // skip public check since we just did it above
        true);
    });
}
exports.urlToBuiltUrl = urlToBuiltUrl;
