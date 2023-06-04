"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uniStaticMiddleware = void 0;
const fs_1 = __importDefault(require("fs"));
const url_1 = __importDefault(require("url"));
const lite_1 = __importDefault(require("mime/lite"));
function normalizeFile(filename, isEtag) {
    const stats = fs_1.default.statSync(filename);
    return {
        stats,
        headers: normalizeHeaders(filename, stats, isEtag),
    };
}
function normalizeHeaders(filename, stats, isEtag) {
    const headers = {
        'Content-Length': stats.size,
        'Content-Type': lite_1.default.getType(filename) || '',
        'Last-Modified': stats.mtime.toUTCString(),
    };
    if (isEtag) {
        headers['ETag'] = `W/"${stats.size}-${stats.mtime.getTime()}"`;
    }
    return headers;
}
function send(req, res, filename, stats, headers) {
    let code = 200;
    // eslint-disable-next-line no-restricted-syntax
    headers = { ...headers };
    const opts = {};
    for (const key in headers) {
        const value = res.getHeader(key);
        if (value) {
            headers[key] = value;
        }
    }
    if (res.getHeader('content-type')) {
        headers['Content-Type'] = res.getHeader('content-type');
    }
    if (req.headers.range) {
        code = 206;
        const [x, y] = req.headers.range.replace('bytes=', '').split('-');
        const end = (opts.end = parseInt(y, 10) || stats.size - 1);
        const start = (opts.start = parseInt(x, 10) || 0);
        if (start >= stats.size || end >= stats.size) {
            res.setHeader('Content-Range', `bytes */${stats.size}`);
            res.statusCode = 416;
            return res.end();
        }
        headers['Content-Range'] = `bytes ${start}-${end}/${stats.size}`;
        headers['Content-Length'] = end - start + 1;
        headers['Accept-Ranges'] = 'bytes';
    }
    res.writeHead(code, headers);
    fs_1.default.createReadStream(filename, opts).pipe(res);
}
function uniStaticMiddleware(opts) {
    const isEtag = !!opts.etag;
    return function staticMiddleware(req, res, next) {
        const pathname = url_1.default.parse(req.url).pathname;
        if (!pathname) {
            return next();
        }
        const filename = opts.resolve(pathname);
        if (!filename) {
            return next();
        }
        const data = normalizeFile(filename, isEtag);
        if (!data) {
            return next();
        }
        if (isEtag && req.headers['if-none-match'] === data.headers['ETag']) {
            res.writeHead(304);
            return res.end();
        }
        return send(req, res, filename, data.stats, data.headers);
    };
}
exports.uniStaticMiddleware = uniStaticMiddleware;
