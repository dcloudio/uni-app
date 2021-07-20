"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIENT_PUBLIC_PATH = exports.FS_PREFIX = void 0;
/**
 * https://github.com/vitejs/vite/blob/main/packages/vite/src/node/constants.ts
 */
/**
 * Prefix for resolved fs paths, since windows paths may not be valid as URLs.
 */
exports.FS_PREFIX = `/@fs/`;
exports.CLIENT_PUBLIC_PATH = `/@vite/client`;
