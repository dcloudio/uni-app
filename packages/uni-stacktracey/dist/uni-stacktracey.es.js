import fs from 'fs';
import path from 'path';
import os from 'os';

/*  ------------------------------------------------------------------------ */
const O = Object, isBrowser = 
/* eslint-disable */
typeof window !== 'undefined' &&
    /* eslint-disable */
    window.window === window &&
    /* eslint-disable */
    window.navigator, nodeRequire = isBrowser ? null : module.require, // to prevent bundlers from expanding the require call
lastOf = (x) => x[x.length - 1], nixSlashes$1 = (x) => x.replace(/\\/g, '/'), pathRoot = isBrowser ? window.location.href : nixSlashes$1(process.cwd()) + '/';
/*  ------------------------------------------------------------------------ */
class StackTracey {
    constructor(input, uniPlatform, offset) {
        this.itemsHeader = [];
        this.isMP = false;
        const originalInput = input, isParseableSyntaxError = input && input instanceof SyntaxError && !isBrowser;
        /*  new StackTracey ()            */
        if (!input) {
            input = new Error();
            offset = offset === undefined ? 1 : offset;
        }
        /*  new StackTracey (Error)      */
        if (input instanceof Error) {
            input = input.stack || '';
        }
        /*  new StackTracey (string)     */
        if (typeof input === 'string') {
            this.isMP = uniPlatform === 'mp-weixin';
            input = this.rawParse(input)
                .slice(offset)
                .map((x) => this.extractEntryMetadata(x));
        }
        /*  new StackTracey (array)      */
        if (Array.isArray(input)) {
            if (isParseableSyntaxError) {
                const rawLines = nodeRequire('util')
                    .inspect(originalInput)
                    .split('\n'), fileLine = rawLines[0].split(':'), line = fileLine.pop(), file = fileLine.join(':');
                if (file) {
                    input.unshift({
                        file: nixSlashes$1(file),
                        line: line,
                        column: (rawLines[2] || '').indexOf('^') + 1,
                        sourceLine: rawLines[1],
                        callee: '(syntax error)',
                        syntaxError: true,
                    });
                }
            }
            this.items = input;
        }
        else {
            this.items = [];
        }
    }
    extractEntryMetadata(e) {
        const decomposedPath = this.decomposePath(e.file || '');
        const fileRelative = decomposedPath[0];
        const externalDomain = decomposedPath[1];
        return O.assign(e, {
            calleeShort: e.calleeShort || lastOf((e.callee || '').split('.')),
            fileRelative: fileRelative,
            fileShort: this.shortenPath(fileRelative),
            fileName: lastOf((e.file || '').split('/')),
            thirdParty: this.isThirdParty(fileRelative, externalDomain) && !e.index,
            externalDomain: externalDomain,
        });
    }
    shortenPath(relativePath) {
        return relativePath
            .replace(/^node_modules\//, '')
            .replace(/^webpack\/bootstrap\//, '')
            .replace(/^__parcel_source_root\//, '');
    }
    decomposePath(fullPath) {
        let result = fullPath;
        if (isBrowser)
            result = result.replace(pathRoot, '');
        const externalDomainMatch = result.match(/^(http|https)\:\/\/?([^\/]+)\/{1,}(.*)/);
        const externalDomain = externalDomainMatch
            ? externalDomainMatch[2]
            : undefined;
        result = externalDomainMatch ? externalDomainMatch[3] : result;
        // if (!isBrowser) result = nodeRequire!('path').relative(pathRoot, result)
        return [
            nixSlashes$1(result).replace(/^.*\:\/\/?\/?/, ''),
            externalDomain,
        ];
    }
    isThirdParty(relativePath, externalDomain) {
        if (this.isMP) {
            if (typeof externalDomain === 'undefined')
                return false;
            return externalDomain !== 'usr';
        }
        return (
        // 由于 hello-uniapp web 端报错携带 hellouniapp.dcloud.net.cn
        // externalDomain ||
        relativePath[0] === '~' || // webpack-specific heuristic
            relativePath[0] === '/' || // external source
            relativePath.indexOf('@dcloudio') !== -1 ||
            relativePath.indexOf('weex-main-jsfm') !== -1 ||
            relativePath.indexOf('webpack/bootstrap') === 0);
    }
    rawParse(str) {
        const lines = (str || '').split('\n');
        const entries = lines.map((line, index) => {
            line = line.trim();
            let callee, fileLineColumn = [], native, planA, planB;
            if (line.indexOf('file:') !== -1) {
                line = line.replace(/file:\/\/(.*)www/, 'file://');
            }
            if ((planA = line.match(/at (.+) \(eval at .+ \((.+)\), .+\)/)) || // eval calls
                (planA = line.match(/at (.+) \((.+)\)/)) ||
                (line.slice(0, 3) !== 'at ' && (planA = line.match(/(.*)@(.*)/)))) {
                this.itemsHeader.push('%StacktraceyItem%');
                callee = planA[1];
                native = planA[2] === 'native';
                fileLineColumn = (planA[2].match(/(.*):(\d+):(\d+)/) ||
                    planA[2].match(/(.*):(\d+)/) ||
                    planA[2].match(/\[(.*)\]/) ||
                    []).slice(1);
            }
            else if ((planB = line.match(/^(at\s*)*(.*)\s+(.+):(\d+):(\d+)/))) {
                this.itemsHeader.push('%StacktraceyItem%');
                callee = planB[2].trim();
                fileLineColumn = planB.slice(3);
            }
            else {
                this.itemsHeader.push(line);
                return undefined;
            }
            /*  Detect things like Array.reduce
                TODO: detect more built-in types            */
            if (callee && !fileLineColumn[0]) {
                const type = callee.split('.')[0];
                if (type === 'Array') {
                    native = true;
                }
            }
            return {
                beforeParse: line,
                callee: callee || '',
                /* eslint-disable */
                index: isBrowser && fileLineColumn[0] === window.location.href,
                native: native || false,
                file: nixSlashes$1(fileLineColumn[0] || ''),
                line: parseInt(fileLineColumn[1] || '', 10) || undefined,
                column: parseInt(fileLineColumn[2] || '', 10) || undefined,
            };
        });
        return entries.filter((x) => x !== undefined);
    }
    maxColumnWidths() {
        return {
            callee: 30,
            file: 60,
            sourceLine: 80,
        };
    }
    asTable(opts) {
        const maxColumnWidths = (opts && opts.maxColumnWidths) || this.maxColumnWidths();
        const trimmed = this
            .filter((e) => !e.thirdParty)
            .map((e) => parseItem(e, maxColumnWidths, this.isMP));
        const trimmedThirdParty = this
            .filter((e) => e.thirdParty)
            .map((e) => parseItem(e, maxColumnWidths, this.isMP));
        return {
            items: trimmed.items,
            thirdPartyItems: trimmedThirdParty.items,
        };
    }
}
const trimEnd = (s, n) => s && (s.length > n ? s.slice(0, n - 1) + '…' : s);
const trimStart = (s, n) => s && (s.length > n ? '…' + s.slice(-(n - 1)) : s);
function parseItem(e, maxColumnWidths, isMP) {
    if (!e.parsed) {
        return e.beforeParse;
    }
    const filePath = (isMP ? e.file && e.file : e.fileShort && e.fileShort) +
        `${e.line ? ':' + e.line : ''}` +
        `${e.column ? ':' + e.column : ''}`;
    return [
        'at ' + trimEnd(isMP ? e.callee : e.calleeShort, maxColumnWidths.callee),
        trimStart(filePath || '', maxColumnWidths.file),
        trimEnd((e.sourceLine || '').trim() || '', maxColumnWidths.sourceLine),
    ];
}
['map', 'filter', 'slice', 'concat'].forEach((method) => {
    StackTracey.prototype[method] = function ( /*...args */) {
        // no support for ...args in Node v4 :(
        return new StackTracey(this.items[method].apply(this.items, arguments));
    };
});
/*  ------------------------------------------------------------------------ */
var StackTracey$1 = StackTracey;

var util$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	/**
	 * This is a helper function for getting values from parameter/options
	 * objects.
	 *
	 * @param args The object we are extracting values from
	 * @param name The name of the property we are getting.
	 * @param defaultValue An optional value to return if the property is missing
	 * from the object. If this is not specified and the property is missing, an
	 * error will be thrown.
	 */
	function getArg(aArgs, aName, aDefaultValue) {
	  if (aName in aArgs) {
	    return aArgs[aName]
	  } else if (arguments.length === 3) {
	    return aDefaultValue
	  }
	  throw new Error('"' + aName + '" is a required argument.')
	}
	exports.getArg = getArg;

	const urlRegexp =
	  /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.-]*)(?::(\d+))?(.*)$/;
	const dataUrlRegexp = /^data:.+\,.+$/;

	function urlParse(aUrl) {
	  const match = aUrl.match(urlRegexp);
	  if (!match) {
	    return null
	  }
	  return {
	    scheme: match[1],
	    auth: match[2],
	    host: match[3],
	    port: match[4],
	    path: match[5],
	  }
	}
	exports.urlParse = urlParse;

	function urlGenerate(aParsedUrl) {
	  let url = '';
	  if (aParsedUrl.scheme) {
	    url += aParsedUrl.scheme + ':';
	  }
	  url += '//';
	  if (aParsedUrl.auth) {
	    url += aParsedUrl.auth + '@';
	  }
	  if (aParsedUrl.host) {
	    url += aParsedUrl.host;
	  }
	  if (aParsedUrl.port) {
	    url += ':' + aParsedUrl.port;
	  }
	  if (aParsedUrl.path) {
	    url += aParsedUrl.path;
	  }
	  return url
	}
	exports.urlGenerate = urlGenerate;

	const MAX_CACHED_INPUTS = 32;

	/**
	 * Takes some function `f(input) -> result` and returns a memoized version of
	 * `f`.
	 *
	 * We keep at most `MAX_CACHED_INPUTS` memoized results of `f` alive. The
	 * memoization is a dumb-simple, linear least-recently-used cache.
	 */
	function lruMemoize(f) {
	  const cache = [];

	  return function (input) {
	    for (let i = 0; i < cache.length; i++) {
	      if (cache[i].input === input) {
	        const temp = cache[0];
	        cache[0] = cache[i];
	        cache[i] = temp;
	        return cache[0].result
	      }
	    }

	    const result = f(input);

	    cache.unshift({
	      input,
	      result,
	    });

	    if (cache.length > MAX_CACHED_INPUTS) {
	      cache.pop();
	    }

	    return result
	  }
	}

	/**
	 * Normalizes a path, or the path portion of a URL:
	 *
	 * - Replaces consecutive slashes with one slash.
	 * - Removes unnecessary '.' parts.
	 * - Removes unnecessary '<dir>/..' parts.
	 *
	 * Based on code in the Node.js 'path' core module.
	 *
	 * @param aPath The path or url to normalize.
	 */
	const normalize = lruMemoize(function normalize(aPath) {
	  let path = aPath;
	  const url = urlParse(aPath);
	  if (url) {
	    if (!url.path) {
	      return aPath
	    }
	    path = url.path;
	  }
	  const isAbsolute = exports.isAbsolute(path);

	  // Split the path into parts between `/` characters. This is much faster than
	  // using `.split(/\/+/g)`.
	  const parts = [];
	  let start = 0;
	  let i = 0;
	  while (true) {
	    start = i;
	    i = path.indexOf('/', start);
	    if (i === -1) {
	      parts.push(path.slice(start));
	      break
	    } else {
	      parts.push(path.slice(start, i));
	      while (i < path.length && path[i] === '/') {
	        i++;
	      }
	    }
	  }

	  let up = 0;
	  for (i = parts.length - 1; i >= 0; i--) {
	    const part = parts[i];
	    if (part === '.') {
	      parts.splice(i, 1);
	    } else if (part === '..') {
	      up++;
	    } else if (up > 0) {
	      if (part === '') {
	        // The first part is blank if the path is absolute. Trying to go
	        // above the root is a no-op. Therefore we can remove all '..' parts
	        // directly after the root.
	        parts.splice(i + 1, up);
	        up = 0;
	      } else {
	        parts.splice(i, 2);
	        up--;
	      }
	    }
	  }
	  path = parts.join('/');

	  if (path === '') {
	    path = isAbsolute ? '/' : '.';
	  }

	  if (url) {
	    url.path = path;
	    return urlGenerate(url)
	  }
	  return path
	});
	exports.normalize = normalize;

	/**
	 * Joins two paths/URLs.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be joined with the root.
	 *
	 * - If aPath is a URL or a data URI, aPath is returned, unless aPath is a
	 *   scheme-relative URL: Then the scheme of aRoot, if any, is prepended
	 *   first.
	 * - Otherwise aPath is a path. If aRoot is a URL, then its path portion
	 *   is updated with the result and aRoot is returned. Otherwise the result
	 *   is returned.
	 *   - If aPath is absolute, the result is aPath.
	 *   - Otherwise the two paths are joined with a slash.
	 * - Joining for example 'http://' and 'www.example.com' is also supported.
	 */
	function join(aRoot, aPath) {
	  if (aRoot === '') {
	    aRoot = '.';
	  }
	  if (aPath === '') {
	    aPath = '.';
	  }
	  const aPathUrl = urlParse(aPath);
	  const aRootUrl = urlParse(aRoot);
	  if (aRootUrl) {
	    aRoot = aRootUrl.path || '/';
	  }

	  // `join(foo, '//www.example.org')`
	  if (aPathUrl && !aPathUrl.scheme) {
	    if (aRootUrl) {
	      aPathUrl.scheme = aRootUrl.scheme;
	    }
	    return urlGenerate(aPathUrl)
	  }

	  if (aPathUrl || aPath.match(dataUrlRegexp)) {
	    return aPath
	  }

	  // `join('http://', 'www.example.com')`
	  if (aRootUrl && !aRootUrl.host && !aRootUrl.path) {
	    aRootUrl.host = aPath;
	    return urlGenerate(aRootUrl)
	  }

	  const joined =
	    aPath.charAt(0) === '/'
	      ? aPath
	      : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);

	  if (aRootUrl) {
	    aRootUrl.path = joined;
	    return urlGenerate(aRootUrl)
	  }
	  return joined
	}
	exports.join = join;

	exports.isAbsolute = function (aPath) {
	  return aPath.charAt(0) === '/' || urlRegexp.test(aPath)
	};

	/**
	 * Make a path relative to a URL or another path.
	 *
	 * @param aRoot The root path or URL.
	 * @param aPath The path or URL to be made relative to aRoot.
	 */
	function relative(aRoot, aPath) {
	  if (aRoot === '') {
	    aRoot = '.';
	  }

	  aRoot = aRoot.replace(/\/$/, '');

	  // It is possible for the path to be above the root. In this case, simply
	  // checking whether the root is a prefix of the path won't work. Instead, we
	  // need to remove components from the root one by one, until either we find
	  // a prefix that fits, or we run out of components to remove.
	  let level = 0;
	  while (aPath.indexOf(aRoot + '/') !== 0) {
	    const index = aRoot.lastIndexOf('/');
	    if (index < 0) {
	      return aPath
	    }

	    // If the only part of the root that is left is the scheme (i.e. http://,
	    // file:///, etc.), one or more slashes (/), or simply nothing at all, we
	    // have exhausted all components, so the path is not relative to the root.
	    aRoot = aRoot.slice(0, index);
	    if (aRoot.match(/^([^\/]+:\/)?\/*$/)) {
	      return aPath
	    }

	    ++level;
	  }

	  // Make sure we add a "../" for each component we removed from the root.
	  return Array(level + 1).join('../') + aPath.substr(aRoot.length + 1)
	}
	exports.relative = relative;

	const supportsNullProto = (function () {
	  const obj = Object.create(null);
	  return !('__proto__' in obj)
	})();

	function identity(s) {
	  return s
	}

	/**
	 * Because behavior goes wacky when you set `__proto__` on objects, we
	 * have to prefix all the strings in our set with an arbitrary character.
	 *
	 * See https://github.com/mozilla/source-map/pull/31 and
	 * https://github.com/mozilla/source-map/issues/30
	 *
	 * @param String aStr
	 */
	function toSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return '$' + aStr
	  }

	  return aStr
	}
	exports.toSetString = supportsNullProto ? identity : toSetString;

	function fromSetString(aStr) {
	  if (isProtoString(aStr)) {
	    return aStr.slice(1)
	  }

	  return aStr
	}
	exports.fromSetString = supportsNullProto ? identity : fromSetString;

	function isProtoString(s) {
	  if (!s) {
	    return false
	  }

	  const length = s.length;

	  if (length < 9 /* "__proto__".length */) {
	    return false
	  }

	  /* eslint-disable no-multi-spaces */
	  if (
	    s.charCodeAt(length - 1) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 2) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 3) !== 111 /* 'o' */ ||
	    s.charCodeAt(length - 4) !== 116 /* 't' */ ||
	    s.charCodeAt(length - 5) !== 111 /* 'o' */ ||
	    s.charCodeAt(length - 6) !== 114 /* 'r' */ ||
	    s.charCodeAt(length - 7) !== 112 /* 'p' */ ||
	    s.charCodeAt(length - 8) !== 95 /* '_' */ ||
	    s.charCodeAt(length - 9) !== 95 /* '_' */
	  ) {
	    return false
	  }
	  /* eslint-enable no-multi-spaces */

	  for (let i = length - 10; i >= 0; i--) {
	    if (s.charCodeAt(i) !== 36 /* '$' */) {
	      return false
	    }
	  }

	  return true
	}

	/**
	 * Comparator between two mappings where the original positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same original source/line/column, but different generated
	 * line and column the same. Useful when searching for a mapping with a
	 * stubbed out mapping.
	 */
	function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal) {
	  let cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0 || onlyCompareOriginal) {
	    return cmp
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  return strcmp(mappingA.name, mappingB.name)
	}
	exports.compareByOriginalPositions = compareByOriginalPositions;

	/**
	 * Comparator between two mappings with deflated source and name indices where
	 * the generated positions are compared.
	 *
	 * Optionally pass in `true` as `onlyCompareGenerated` to consider two
	 * mappings with the same generated line and column, but different
	 * source/name/original line and column the same. Useful when searching for a
	 * mapping with a stubbed out mapping.
	 */
	function compareByGeneratedPositionsDeflated(
	  mappingA,
	  mappingB,
	  onlyCompareGenerated
	) {
	  let cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0 || onlyCompareGenerated) {
	    return cmp
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp
	  }

	  return strcmp(mappingA.name, mappingB.name)
	}
	exports.compareByGeneratedPositionsDeflated =
	  compareByGeneratedPositionsDeflated;

	function strcmp(aStr1, aStr2) {
	  if (aStr1 === aStr2) {
	    return 0
	  }

	  if (aStr1 === null) {
	    return 1 // aStr2 !== null
	  }

	  if (aStr2 === null) {
	    return -1 // aStr1 !== null
	  }

	  if (aStr1 > aStr2) {
	    return 1
	  }

	  return -1
	}

	/**
	 * Comparator between two mappings with inflated source and name strings where
	 * the generated positions are compared.
	 */
	function compareByGeneratedPositionsInflated(mappingA, mappingB) {
	  let cmp = mappingA.generatedLine - mappingB.generatedLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.generatedColumn - mappingB.generatedColumn;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = strcmp(mappingA.source, mappingB.source);
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalLine - mappingB.originalLine;
	  if (cmp !== 0) {
	    return cmp
	  }

	  cmp = mappingA.originalColumn - mappingB.originalColumn;
	  if (cmp !== 0) {
	    return cmp
	  }

	  return strcmp(mappingA.name, mappingB.name)
	}
	exports.compareByGeneratedPositionsInflated =
	  compareByGeneratedPositionsInflated;

	/**
	 * Strip any JSON XSSI avoidance prefix from the string (as documented
	 * in the source maps specification), and then parse the string as
	 * JSON.
	 */
	function parseSourceMapInput(str) {
	  return JSON.parse(str.replace(/^\)]}'[^\n]*\n/, ''))
	}
	exports.parseSourceMapInput = parseSourceMapInput;

	/**
	 * Compute the URL of a source given the the source root, the source's
	 * URL, and the source map's URL.
	 */
	function computeSourceURL(sourceRoot, sourceURL, sourceMapURL) {
	  sourceURL = sourceURL || '';

	  if (sourceRoot) {
	    // This follows what Chrome does.
	    if (sourceRoot[sourceRoot.length - 1] !== '/' && sourceURL[0] !== '/') {
	      sourceRoot += '/';
	    }
	    // The spec says:
	    //   Line 4: An optional source root, useful for relocating source
	    //   files on a server or removing repeated values in the
	    //   “sources” entry.  This value is prepended to the individual
	    //   entries in the “source” field.
	    sourceURL = sourceRoot + sourceURL;
	  }

	  // Historically, SourceMapConsumer did not take the sourceMapURL as
	  // a parameter.  This mode is still somewhat supported, which is why
	  // this code block is conditional.  However, it's preferable to pass
	  // the source map URL to SourceMapConsumer, so that this function
	  // can implement the source URL resolution algorithm as outlined in
	  // the spec.  This block is basically the equivalent of:
	  //    new URL(sourceURL, sourceMapURL).toString()
	  // ... except it avoids using URL, which wasn't available in the
	  // older releases of node still supported by this library.
	  //
	  // The spec says:
	  //   If the sources are not absolute URLs after prepending of the
	  //   “sourceRoot”, the sources are resolved relative to the
	  //   SourceMap (like resolving script src in a html document).
	  if (sourceMapURL) {
	    const parsed = urlParse(sourceMapURL);
	    if (!parsed) {
	      throw new Error('sourceMapURL could not be parsed')
	    }
	    if (parsed.path) {
	      // Strip the last path component, but keep the "/".
	      const index = parsed.path.lastIndexOf('/');
	      if (index >= 0) {
	        parsed.path = parsed.path.substring(0, index + 1);
	      }
	    }
	    sourceURL = join(urlGenerate(parsed), sourceURL);
	  }

	  return normalize(sourceURL)
	}
	exports.computeSourceURL = computeSourceURL;
} (util$1));

var arraySet = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

/**
 * A data structure which is a combination of an array and a set. Adding a new
 * member is O(1), testing for membership is O(1), and finding the index of an
 * element is O(1). Removing elements from the set is not supported. Only
 * strings are supported for membership.
 */
let ArraySet$1 = class ArraySet {
  constructor() {
    this._array = [];
    this._set = new Map();
  }

  /**
   * Static method for creating ArraySet instances from an existing array.
   */
  static fromArray(aArray, aAllowDuplicates) {
    const set = new ArraySet();
    for (let i = 0, len = aArray.length; i < len; i++) {
      set.add(aArray[i], aAllowDuplicates);
    }
    return set
  }

  /**
   * Return how many unique items are in this ArraySet. If duplicates have been
   * added, than those do not count towards the size.
   *
   * @returns Number
   */
  size() {
    return this._set.size
  }

  /**
   * Add the given string to this set.
   *
   * @param String aStr
   */
  add(aStr, aAllowDuplicates) {
    const isDuplicate = this.has(aStr);
    const idx = this._array.length;
    if (!isDuplicate || aAllowDuplicates) {
      this._array.push(aStr);
    }
    if (!isDuplicate) {
      this._set.set(aStr, idx);
    }
  }

  /**
   * Is the given string a member of this set?
   *
   * @param String aStr
   */
  has(aStr) {
    return this._set.has(aStr)
  }

  /**
   * What is the index of the given string in the array?
   *
   * @param String aStr
   */
  indexOf(aStr) {
    const idx = this._set.get(aStr);
    if (idx >= 0) {
      return idx
    }
    throw new Error('"' + aStr + '" is not in the set.')
  }

  /**
   * What is the element at the given index?
   *
   * @param Number aIdx
   */
  at(aIdx) {
    if (aIdx >= 0 && aIdx < this._array.length) {
      return this._array[aIdx]
    }
    throw new Error('No element indexed by ' + aIdx)
  }

  /**
   * Returns the array representation of this set (which has the proper indices
   * indicated by indexOf). Note that this is a copy of the internal array used
   * for storing the members so that no one can mess with internal state.
   */
  toArray() {
    return this._array.slice()
  }
};
arraySet.ArraySet = ArraySet$1;

var sourceMapConsumer = {};

var binarySearch$1 = {};

/* -*- Mode: js; js-indent-level: 2; -*- */

(function (exports) {
	/*
	 * Copyright 2011 Mozilla Foundation and contributors
	 * Licensed under the New BSD license. See LICENSE or:
	 * http://opensource.org/licenses/BSD-3-Clause
	 */

	exports.GREATEST_LOWER_BOUND = 1;
	exports.LEAST_UPPER_BOUND = 2;

	/**
	 * Recursive implementation of binary search.
	 *
	 * @param aLow Indices here and lower do not contain the needle.
	 * @param aHigh Indices here and higher do not contain the needle.
	 * @param aNeedle The element being searched for.
	 * @param aHaystack The non-empty array being searched.
	 * @param aCompare Function which takes two elements and returns -1, 0, or 1.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 */
	function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias) {
	  // This function terminates when one of the following is true:
	  //
	  //   1. We find the exact element we are looking for.
	  //
	  //   2. We did not find the exact element, but we can return the index of
	  //      the next-closest element.
	  //
	  //   3. We did not find the exact element, and there is no next-closest
	  //      element than the one we are searching for, so we return -1.
	  const mid = Math.floor((aHigh - aLow) / 2) + aLow;
	  const cmp = aCompare(aNeedle, aHaystack[mid], true);
	  if (cmp === 0) {
	    // Found the element we are looking for.
	    return mid
	  } else if (cmp > 0) {
	    // Our needle is greater than aHaystack[mid].
	    if (aHigh - mid > 1) {
	      // The element is in the upper half.
	      return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias)
	    }

	    // The exact needle element was not found in this haystack. Determine if
	    // we are in termination case (3) or (2) and return the appropriate thing.
	    if (aBias == exports.LEAST_UPPER_BOUND) {
	      return aHigh < aHaystack.length ? aHigh : -1
	    }
	    return mid
	  }

	  // Our needle is less than aHaystack[mid].
	  if (mid - aLow > 1) {
	    // The element is in the lower half.
	    return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias)
	  }

	  // we are in termination case (3) or (2) and return the appropriate thing.
	  if (aBias == exports.LEAST_UPPER_BOUND) {
	    return mid
	  }
	  return aLow < 0 ? -1 : aLow
	}

	/**
	 * This is an implementation of binary search which will always try and return
	 * the index of the closest element if there is no exact hit. This is because
	 * mappings between original and generated line/col pairs are single points,
	 * and there is an implicit region between each of them, so a miss just means
	 * that you aren't on the very start of a region.
	 *
	 * @param aNeedle The element you are looking for.
	 * @param aHaystack The array that is being searched.
	 * @param aCompare A function which takes the needle and an element in the
	 *     array and returns -1, 0, or 1 depending on whether the needle is less
	 *     than, equal to, or greater than the element, respectively.
	 * @param aBias Either 'binarySearch.GREATEST_LOWER_BOUND' or
	 *     'binarySearch.LEAST_UPPER_BOUND'. Specifies whether to return the
	 *     closest element that is smaller than or greater than the one we are
	 *     searching for, respectively, if the exact element cannot be found.
	 *     Defaults to 'binarySearch.GREATEST_LOWER_BOUND'.
	 */
	exports.search = function search(aNeedle, aHaystack, aCompare, aBias) {
	  if (aHaystack.length === 0) {
	    return -1
	  }

	  let index = recursiveSearch(
	    -1,
	    aHaystack.length,
	    aNeedle,
	    aHaystack,
	    aCompare,
	    aBias || exports.GREATEST_LOWER_BOUND
	  );
	  if (index < 0) {
	    return -1
	  }

	  // We have found either the exact element, or the next-closest element than
	  // the one we are searching for. However, there may be more than one such
	  // element. Make sure we always return the smallest of these.
	  while (index - 1 >= 0) {
	    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0) {
	      break
	    }
	    --index;
	  }

	  return index
	};
} (binarySearch$1));

var readWasmExports = {};
var readWasm$2 = {
  get exports(){ return readWasmExports; },
  set exports(v){ readWasmExports = v; },
};

/* Determine browser vs node environment by testing the default top level context. Solution courtesy of: https://stackoverflow.com/questions/17575790/environment-detection-node-js-or-browser */
{
  // Web version of reading a wasm file into an array buffer.

  let mappingsWasm = null;

  readWasm$2.exports = function readWasm() {
    if (typeof mappingsWasm === 'string') {
      return fetch(mappingsWasm).then((response) => response.arrayBuffer())
    }
    if (mappingsWasm instanceof ArrayBuffer) {
      return Promise.resolve(mappingsWasm)
    }
    throw new Error(
      'You must provide the string URL or ArrayBuffer contents ' +
        'of lib/mappings.wasm by calling ' +
        "SourceMapConsumer.initialize({ 'lib/mappings.wasm': ... }) " +
        'before using SourceMapConsumer'
    )
  };

  readWasmExports.initialize = (input) => (mappingsWasm = input);
}

const readWasm$1 = readWasmExports;

/**
 * Provide the JIT with a nice shape / hidden class.
 */
function Mapping() {
  this.generatedLine = 0;
  this.generatedColumn = 0;
  this.lastGeneratedColumn = null;
  this.source = null;
  this.originalLine = null;
  this.originalColumn = null;
  this.name = null;
}

let cachedWasm = null;

var wasm$1 = function wasm() {
  if (cachedWasm) {
    return cachedWasm
  }

  const callbackStack = [];

  cachedWasm = readWasm$1()
    .then((buffer) => {
      return WebAssembly.instantiate(buffer, {
        env: {
          mapping_callback(
            generatedLine,
            generatedColumn,

            hasLastGeneratedColumn,
            lastGeneratedColumn,

            hasOriginal,
            source,
            originalLine,
            originalColumn,

            hasName,
            name
          ) {
            const mapping = new Mapping();
            // JS uses 1-based line numbers, wasm uses 0-based.
            mapping.generatedLine = generatedLine + 1;
            mapping.generatedColumn = generatedColumn;

            if (hasLastGeneratedColumn) {
              // JS uses inclusive last generated column, wasm uses exclusive.
              mapping.lastGeneratedColumn = lastGeneratedColumn - 1;
            }

            if (hasOriginal) {
              mapping.source = source;
              // JS uses 1-based line numbers, wasm uses 0-based.
              mapping.originalLine = originalLine + 1;
              mapping.originalColumn = originalColumn;

              if (hasName) {
                mapping.name = name;
              }
            }

            callbackStack[callbackStack.length - 1](mapping);
          },

          start_all_generated_locations_for() {
            console.time('all_generated_locations_for');
          },
          end_all_generated_locations_for() {
            console.timeEnd('all_generated_locations_for');
          },

          start_compute_column_spans() {
            console.time('compute_column_spans');
          },
          end_compute_column_spans() {
            console.timeEnd('compute_column_spans');
          },

          start_generated_location_for() {
            console.time('generated_location_for');
          },
          end_generated_location_for() {
            console.timeEnd('generated_location_for');
          },

          start_original_location_for() {
            console.time('original_location_for');
          },
          end_original_location_for() {
            console.timeEnd('original_location_for');
          },

          start_parse_mappings() {
            console.time('parse_mappings');
          },
          end_parse_mappings() {
            console.timeEnd('parse_mappings');
          },

          start_sort_by_generated_location() {
            console.time('sort_by_generated_location');
          },
          end_sort_by_generated_location() {
            console.timeEnd('sort_by_generated_location');
          },

          start_sort_by_original_location() {
            console.time('sort_by_original_location');
          },
          end_sort_by_original_location() {
            console.timeEnd('sort_by_original_location');
          },
        },
      })
    })
    .then((Wasm) => {
      return {
        exports: Wasm.instance.exports,
        withMappingCallback: (mappingCallback, f) => {
          callbackStack.push(mappingCallback);
          try {
            f();
          } finally {
            callbackStack.pop();
          }
        },
      }
    })
    .then(null, (e) => {
      cachedWasm = null;
      throw e
    });

  return cachedWasm
};

/* -*- Mode: js; js-indent-level: 2; -*- */

/*
 * Copyright 2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE or:
 * http://opensource.org/licenses/BSD-3-Clause
 */

const util = util$1;
const binarySearch = binarySearch$1;
const ArraySet = arraySet.ArraySet;
const readWasm = readWasmExports;
const wasm = wasm$1;

const INTERNAL = Symbol('smcInternal');

let SourceMapConsumer$1 = class SourceMapConsumer {
  constructor(aSourceMap, aSourceMapURL) {
    // If the constructor was called by super(), just return Promise<this>.
    // Yes, this is a hack to retain the pre-existing API of the base-class
    // constructor also being an async factory function.
    if (aSourceMap == INTERNAL) {
      return Promise.resolve(this)
    }

    return _factory(aSourceMap, aSourceMapURL)
  }

  static initialize(opts) {
    readWasm.initialize(opts['lib/mappings.wasm']);
  }

  static fromSourceMap(aSourceMap, aSourceMapURL) {
    return _factoryBSM(aSourceMap, aSourceMapURL)
  }

  /**
   * Construct a new `SourceMapConsumer` from `rawSourceMap` and `sourceMapUrl`
   * (see the `SourceMapConsumer` constructor for details. Then, invoke the `async
   * function f(SourceMapConsumer) -> T` with the newly constructed consumer, wait
   * for `f` to complete, call `destroy` on the consumer, and return `f`'s return
   * value.
   *
   * You must not use the consumer after `f` completes!
   *
   * By using `with`, you do not have to remember to manually call `destroy` on
   * the consumer, since it will be called automatically once `f` completes.
   *
   * ```js
   * const xSquared = await SourceMapConsumer.with(
   *   myRawSourceMap,
   *   null,
   *   async function (consumer) {
   *     // Use `consumer` inside here and don't worry about remembering
   *     // to call `destroy`.
   *
   *     const x = await whatever(consumer);
   *     return x * x;
   *   }
   * );
   *
   * // You may not use that `consumer` anymore out here; it has
   * // been destroyed. But you can use `xSquared`.
   * console.log(xSquared);
   * ```
   */
  static async with(rawSourceMap, sourceMapUrl, f) {
    const consumer = await new SourceMapConsumer(rawSourceMap, sourceMapUrl);
    try {
      return await f(consumer)
    } finally {
      consumer.destroy();
    }
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  _parseMappings(aStr, aSourceRoot) {
    throw new Error('Subclasses must implement _parseMappings')
  }

  /**
   * Iterate over each mapping between an original source/line/column and a
   * generated line/column in this source map.
   *
   * @param Function aCallback
   *        The function that is called with each mapping.
   * @param Object aContext
   *        Optional. If specified, this object will be the value of `this` every
   *        time that `aCallback` is called.
   * @param aOrder
   *        Either `SourceMapConsumer.GENERATED_ORDER` or
   *        `SourceMapConsumer.ORIGINAL_ORDER`. Specifies whether you want to
   *        iterate over the mappings sorted by the generated file's line/column
   *        order or the original's source/line/column order, respectively. Defaults to
   *        `SourceMapConsumer.GENERATED_ORDER`.
   */
  eachMapping(aCallback, aContext, aOrder) {
    throw new Error('Subclasses must implement eachMapping')
  }

  /**
   * Returns all generated line and column information for the original source,
   * line, and column provided. If no column is provided, returns all mappings
   * corresponding to a either the line we are searching for or the next
   * closest line that has any mappings. Otherwise, returns all mappings
   * corresponding to the given line and either the column we are searching for
   * or the next closest column that has any offsets.
   *
   * The only argument is an object with the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number is 1-based.
   *   - column: Optional. the column number in the original source.
   *    The column number is 0-based.
   *
   * and an array of objects is returned, each with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *    line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *    The column number is 0-based.
   */
  allGeneratedPositionsFor(aArgs) {
    throw new Error('Subclasses must implement allGeneratedPositionsFor')
  }

  destroy() {
    throw new Error('Subclasses must implement destroy')
  }
};

/**
 * The version of the source mapping spec that we are consuming.
 */
SourceMapConsumer$1.prototype._version = 3;
SourceMapConsumer$1.GENERATED_ORDER = 1;
SourceMapConsumer$1.ORIGINAL_ORDER = 2;

SourceMapConsumer$1.GREATEST_LOWER_BOUND = 1;
SourceMapConsumer$1.LEAST_UPPER_BOUND = 2;

sourceMapConsumer.SourceMapConsumer = SourceMapConsumer$1;

/**
 * A BasicSourceMapConsumer instance represents a parsed source map which we can
 * query for information about the original file positions by giving it a file
 * position in the generated source.
 *
 * The first parameter is the raw source map (either as a JSON string, or
 * already parsed to an object). According to the spec, source maps have the
 * following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - sources: An array of URLs to the original source files.
 *   - names: An array of identifiers which can be referenced by individual mappings.
 *   - sourceRoot: Optional. The URL root from which all sources are relative.
 *   - sourcesContent: Optional. An array of contents of the original source files.
 *   - mappings: A string of base64 VLQs which contain the actual mappings.
 *   - file: Optional. The generated file this source map is associated with.
 *
 * Here is an example source map, taken from the source map spec[0]:
 *
 *     {
 *       version : 3,
 *       file: "out.js",
 *       sourceRoot : "",
 *       sources: ["foo.js", "bar.js"],
 *       names: ["src", "maps", "are", "fun"],
 *       mappings: "AA,AB;;ABCDE;"
 *     }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit?pli=1#
 */
class BasicSourceMapConsumer extends SourceMapConsumer$1 {
  constructor(aSourceMap, aSourceMapURL) {
    return super(INTERNAL).then((that) => {
      let sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }

      const version = util.getArg(sourceMap, 'version');
      let sources = util.getArg(sourceMap, 'sources');
      // Sass 3.3 leaves out the 'names' array, so we deviate from the spec (which
      // requires the array) to play nice here.
      const names = util.getArg(sourceMap, 'names', []);
      let sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
      const sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
      const mappings = util.getArg(sourceMap, 'mappings');
      const file = util.getArg(sourceMap, 'file', null);

      // Once again, Sass deviates from the spec and supplies the version as a
      // string rather than a number, so we use loose equality checking here.
      if (version != that._version) {
        throw new Error('Unsupported version: ' + version)
      }

      if (sourceRoot) {
        sourceRoot = util.normalize(sourceRoot);
      }

      sources = sources
        .map(String)
        // Some source maps produce relative source paths like "./foo.js" instead of
        // "foo.js".  Normalize these first so that future comparisons will succeed.
        // See bugzil.la/1090768.
        .map(util.normalize)
        // Always ensure that absolute sources are internally stored relative to
        // the source root, if the source root is absolute. Not doing this would
        // be particularly problematic when the source root is a prefix of the
        // source (valid, but why??). See github issue #199 and bugzil.la/1188982.
        .map(function (source) {
          return sourceRoot &&
            util.isAbsolute(sourceRoot) &&
            util.isAbsolute(source)
            ? util.relative(sourceRoot, source)
            : source
        });

      // Pass `true` below to allow duplicate names and sources. While source maps
      // are intended to be compressed and deduplicated, the TypeScript compiler
      // sometimes generates source maps with duplicates in them. See Github issue
      // #72 and bugzil.la/889492.
      that._names = ArraySet.fromArray(names.map(String), true);
      that._sources = ArraySet.fromArray(sources, true);

      that._absoluteSources = that._sources.toArray().map(function (s) {
        return util.computeSourceURL(sourceRoot, s, aSourceMapURL)
      });

      that.sourceRoot = sourceRoot;
      that.sourcesContent = sourcesContent;
      that._mappings = mappings;
      that._sourceMapURL = aSourceMapURL;
      that.file = file;

      that._computedColumnSpans = false;
      that._mappingsPtr = 0;
      that._wasm = null;

      return wasm().then((w) => {
        that._wasm = w;
        return that
      })
    })
  }

  /**
   * Utility function to find the index of a source.  Returns -1 if not
   * found.
   */
  _findSourceIndex(aSource) {
    let relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    if (this._sources.has(relativeSource)) {
      return this._sources.indexOf(relativeSource)
    }

    // Maybe aSource is an absolute URL as returned by |sources|.  In
    // this case we can't simply undo the transform.
    for (let i = 0; i < this._absoluteSources.length; ++i) {
      if (this._absoluteSources[i] == aSource) {
        return i
      }
    }

    return -1
  }

  /**
   * Create a BasicSourceMapConsumer from a SourceMapGenerator.
   *
   * @param SourceMapGenerator aSourceMap
   *        The source map that will be consumed.
   * @param String aSourceMapURL
   *        The URL at which the source map can be found (optional)
   * @returns BasicSourceMapConsumer
   */
  static fromSourceMap(aSourceMap, aSourceMapURL) {
    return new BasicSourceMapConsumer(aSourceMap.toString())
  }

  get sources() {
    return this._absoluteSources.slice()
  }

  _getMappingsPtr() {
    if (this._mappingsPtr === 0) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this._mappingsPtr
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  _parseMappings(aStr, aSourceRoot) {
    const size = aStr.length;

    const mappingsBufPtr = this._wasm.exports.allocate_mappings(size);
    const mappingsBuf = new Uint8Array(
      this._wasm.exports.memory.buffer,
      mappingsBufPtr,
      size
    );
    for (let i = 0; i < size; i++) {
      mappingsBuf[i] = aStr.charCodeAt(i);
    }

    const mappingsPtr = this._wasm.exports.parse_mappings(mappingsBufPtr);

    if (!mappingsPtr) {
      const error = this._wasm.exports.get_last_error();
      let msg = `Error parsing mappings (code ${error}): `;

      // XXX: keep these error codes in sync with `fitzgen/source-map-mappings`.
      switch (error) {
        case 1:
          msg +=
            'the mappings contained a negative line, column, source index, or name index';
          break
        case 2:
          msg += 'the mappings contained a number larger than 2**32';
          break
        case 3:
          msg += 'reached EOF while in the middle of parsing a VLQ';
          break
        case 4:
          msg += 'invalid base 64 character while parsing a VLQ';
          break
        default:
          msg += 'unknown error code';
          break
      }

      throw new Error(msg)
    }

    this._mappingsPtr = mappingsPtr;
  }

  eachMapping(aCallback, aContext, aOrder) {
    const context = aContext || null;
    const order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;
    const sourceRoot = this.sourceRoot;

    this._wasm.withMappingCallback(
      (mapping) => {
        if (mapping.source !== null) {
          mapping.source = this._sources.at(mapping.source);
          mapping.source = util.computeSourceURL(
            sourceRoot,
            mapping.source,
            this._sourceMapURL
          );

          if (mapping.name !== null) {
            mapping.name = this._names.at(mapping.name);
          }
        }

        aCallback.call(context, mapping);
      },
      () => {
        switch (order) {
          case SourceMapConsumer$1.GENERATED_ORDER:
            this._wasm.exports.by_generated_location(this._getMappingsPtr());
            break
          case SourceMapConsumer$1.ORIGINAL_ORDER:
            this._wasm.exports.by_original_location(this._getMappingsPtr());
            break
          default:
            throw new Error('Unknown order of iteration.')
        }
      }
    );
  }

  allGeneratedPositionsFor(aArgs) {
    let source = util.getArg(aArgs, 'source');
    const originalLine = util.getArg(aArgs, 'line');
    const originalColumn = aArgs.column || 0;

    source = this._findSourceIndex(source);
    if (source < 0) {
      return []
    }

    if (originalLine < 1) {
      throw new Error('Line numbers must be >= 1')
    }

    if (originalColumn < 0) {
      throw new Error('Column numbers must be >= 0')
    }

    const mappings = [];

    this._wasm.withMappingCallback(
      (m) => {
        let lastColumn = m.lastGeneratedColumn;
        if (this._computedColumnSpans && lastColumn === null) {
          lastColumn = Infinity;
        }
        mappings.push({
          line: m.generatedLine,
          column: m.generatedColumn,
          lastColumn,
        });
      },
      () => {
        this._wasm.exports.all_generated_locations_for(
          this._getMappingsPtr(),
          source,
          originalLine - 1,
          'column' in aArgs,
          originalColumn
        );
      }
    );

    return mappings
  }

  destroy() {
    if (this._mappingsPtr !== 0) {
      this._wasm.exports.free_mappings(this._mappingsPtr);
      this._mappingsPtr = 0;
    }
  }

  /**
   * Compute the last column for each generated mapping. The last column is
   * inclusive.
   */
  computeColumnSpans() {
    if (this._computedColumnSpans) {
      return
    }

    this._wasm.exports.compute_column_spans(this._getMappingsPtr());
    this._computedColumnSpans = true;
  }

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  originalPositionFor(aArgs) {
    const needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column'),
    };

    if (needle.generatedLine < 1) {
      throw new Error('Line numbers must be >= 1')
    }

    if (needle.generatedColumn < 0) {
      throw new Error('Column numbers must be >= 0')
    }

    let bias = util.getArg(
      aArgs,
      'bias',
      SourceMapConsumer$1.GREATEST_LOWER_BOUND
    );
    if (bias == null) {
      bias = SourceMapConsumer$1.GREATEST_LOWER_BOUND;
    }

    let mapping;
    this._wasm.withMappingCallback(
      (m) => (mapping = m),
      () => {
        this._wasm.exports.original_location_for(
          this._getMappingsPtr(),
          needle.generatedLine - 1,
          needle.generatedColumn,
          bias
        );
      }
    );

    if (mapping) {
      if (mapping.generatedLine === needle.generatedLine) {
        let source = util.getArg(mapping, 'source', null);
        if (source !== null) {
          source = this._sources.at(source);
          source = util.computeSourceURL(
            this.sourceRoot,
            source,
            this._sourceMapURL
          );
        }

        let name = util.getArg(mapping, 'name', null);
        if (name !== null) {
          name = this._names.at(name);
        }

        return {
          source,
          line: util.getArg(mapping, 'originalLine', null),
          column: util.getArg(mapping, 'originalColumn', null),
          name,
        }
      }
    }

    return {
      source: null,
      line: null,
      column: null,
      name: null,
    }
  }

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  hasContentsOfAllSources() {
    if (!this.sourcesContent) {
      return false
    }
    return (
      this.sourcesContent.length >= this._sources.size() &&
      !this.sourcesContent.some(function (sc) {
        return sc == null
      })
    )
  }

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  sourceContentFor(aSource, nullOnMissing) {
    if (!this.sourcesContent) {
      return null
    }

    const index = this._findSourceIndex(aSource);
    if (index >= 0) {
      return this.sourcesContent[index]
    }

    let relativeSource = aSource;
    if (this.sourceRoot != null) {
      relativeSource = util.relative(this.sourceRoot, relativeSource);
    }

    let url;
    if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot))) {
      // XXX: file:// URIs and absolute paths lead to unexpected behavior for
      // many users. We can help them out when they expect file:// URIs to
      // behave like it would if they were running a local HTTP server. See
      // https://bugzilla.mozilla.org/show_bug.cgi?id=885597.
      const fileUriAbsPath = relativeSource.replace(/^file:\/\//, '');
      if (url.scheme == 'file' && this._sources.has(fileUriAbsPath)) {
        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)]
      }

      if (
        (!url.path || url.path == '/') &&
        this._sources.has('/' + relativeSource)
      ) {
        return this.sourcesContent[this._sources.indexOf('/' + relativeSource)]
      }
    }

    // This function is used recursively from
    // IndexedSourceMapConsumer.prototype.sourceContentFor. In that case, we
    // don't want to throw if we can't find the source - we just want to
    // return null, so we provide a flag to exit gracefully.
    if (nullOnMissing) {
      return null
    }

    throw new Error('"' + relativeSource + '" is not in the SourceMap.')
  }

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *   - bias: Either 'SourceMapConsumer.GREATEST_LOWER_BOUND' or
   *     'SourceMapConsumer.LEAST_UPPER_BOUND'. Specifies whether to return the
   *     closest element that is smaller than or greater than the one we are
   *     searching for, respectively, if the exact element cannot be found.
   *     Defaults to 'SourceMapConsumer.GREATEST_LOWER_BOUND'.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  generatedPositionFor(aArgs) {
    let source = util.getArg(aArgs, 'source');
    source = this._findSourceIndex(source);
    if (source < 0) {
      return {
        line: null,
        column: null,
        lastColumn: null,
      }
    }

    const needle = {
      source,
      originalLine: util.getArg(aArgs, 'line'),
      originalColumn: util.getArg(aArgs, 'column'),
    };

    if (needle.originalLine < 1) {
      throw new Error('Line numbers must be >= 1')
    }

    if (needle.originalColumn < 0) {
      throw new Error('Column numbers must be >= 0')
    }

    let bias = util.getArg(
      aArgs,
      'bias',
      SourceMapConsumer$1.GREATEST_LOWER_BOUND
    );
    if (bias == null) {
      bias = SourceMapConsumer$1.GREATEST_LOWER_BOUND;
    }

    let mapping;
    this._wasm.withMappingCallback(
      (m) => (mapping = m),
      () => {
        this._wasm.exports.generated_location_for(
          this._getMappingsPtr(),
          needle.source,
          needle.originalLine - 1,
          needle.originalColumn,
          bias
        );
      }
    );

    if (mapping) {
      if (mapping.source === needle.source) {
        let lastColumn = mapping.lastGeneratedColumn;
        if (this._computedColumnSpans && lastColumn === null) {
          lastColumn = Infinity;
        }
        return {
          line: util.getArg(mapping, 'generatedLine', null),
          column: util.getArg(mapping, 'generatedColumn', null),
          lastColumn,
        }
      }
    }

    return {
      line: null,
      column: null,
      lastColumn: null,
    }
  }
}

BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer$1;
sourceMapConsumer.BasicSourceMapConsumer = BasicSourceMapConsumer;

/**
 * An IndexedSourceMapConsumer instance represents a parsed source map which
 * we can query for information. It differs from BasicSourceMapConsumer in
 * that it takes "indexed" source maps (i.e. ones with a "sections" field) as
 * input.
 *
 * The first parameter is a raw source map (either as a JSON string, or already
 * parsed to an object). According to the spec for indexed source maps, they
 * have the following attributes:
 *
 *   - version: Which version of the source map spec this map is following.
 *   - file: Optional. The generated file this source map is associated with.
 *   - sections: A list of section definitions.
 *
 * Each value under the "sections" field has two fields:
 *   - offset: The offset into the original specified at which this section
 *       begins to apply, defined as an object with a "line" and "column"
 *       field.
 *   - map: A source map definition. This source map could also be indexed,
 *       but doesn't have to be.
 *
 * Instead of the "map" field, it's also possible to have a "url" field
 * specifying a URL to retrieve a source map from, but that's currently
 * unsupported.
 *
 * Here's an example source map, taken from the source map spec[0], but
 * modified to omit a section which uses the "url" field.
 *
 *  {
 *    version : 3,
 *    file: "app.js",
 *    sections: [{
 *      offset: {line:100, column:10},
 *      map: {
 *        version : 3,
 *        file: "section.js",
 *        sources: ["foo.js", "bar.js"],
 *        names: ["src", "maps", "are", "fun"],
 *        mappings: "AAAA,E;;ABCDE;"
 *      }
 *    }],
 *  }
 *
 * The second parameter, if given, is a string whose value is the URL
 * at which the source map was found.  This URL is used to compute the
 * sources array.
 *
 * [0]: https://docs.google.com/document/d/1U1RGAehQwRypUTovF1KRlpiOFze0b-_2gc6fAH0KY0k/edit#heading=h.535es3xeprgt
 */
class IndexedSourceMapConsumer extends SourceMapConsumer$1 {
  constructor(aSourceMap, aSourceMapURL) {
    return super(INTERNAL).then((that) => {
      let sourceMap = aSourceMap;
      if (typeof aSourceMap === 'string') {
        sourceMap = util.parseSourceMapInput(aSourceMap);
      }

      const version = util.getArg(sourceMap, 'version');
      const sections = util.getArg(sourceMap, 'sections');

      if (version != that._version) {
        throw new Error('Unsupported version: ' + version)
      }

      that._sources = new ArraySet();
      that._names = new ArraySet();
      that.__generatedMappings = null;
      that.__originalMappings = null;
      that.__generatedMappingsUnsorted = null;
      that.__originalMappingsUnsorted = null;

      let lastOffset = {
        line: -1,
        column: 0,
      };
      return Promise.all(
        sections.map((s) => {
          if (s.url) {
            // The url field will require support for asynchronicity.
            // See https://github.com/mozilla/source-map/issues/16
            throw new Error(
              'Support for url field in sections not implemented.'
            )
          }
          const offset = util.getArg(s, 'offset');
          const offsetLine = util.getArg(offset, 'line');
          const offsetColumn = util.getArg(offset, 'column');

          if (
            offsetLine < lastOffset.line ||
            (offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
          ) {
            throw new Error(
              'Section offsets must be ordered and non-overlapping.'
            )
          }
          lastOffset = offset;

          const cons = new SourceMapConsumer$1(
            util.getArg(s, 'map'),
            aSourceMapURL
          );
          return cons.then((consumer) => {
            return {
              generatedOffset: {
                // The offset fields are 0-based, but we use 1-based indices when
                // encoding/decoding from VLQ.
                generatedLine: offsetLine + 1,
                generatedColumn: offsetColumn + 1,
              },
              consumer,
            }
          })
        })
      ).then((s) => {
        that._sections = s;
        return that
      })
    })
  }

  // `__generatedMappings` and `__originalMappings` are arrays that hold the
  // parsed mapping coordinates from the source map's "mappings" attribute. They
  // are lazily instantiated, accessed via the `_generatedMappings` and
  // `_originalMappings` getters respectively, and we only parse the mappings
  // and create these arrays once queried for a source location. We jump through
  // these hoops because there can be many thousands of mappings, and parsing
  // them is expensive, so we only want to do it if we must.
  //
  // Each object in the arrays is of the form:
  //
  //     {
  //       generatedLine: The line number in the generated code,
  //       generatedColumn: The column number in the generated code,
  //       source: The path to the original source file that generated this
  //               chunk of code,
  //       originalLine: The line number in the original source that
  //                     corresponds to this chunk of generated code,
  //       originalColumn: The column number in the original source that
  //                       corresponds to this chunk of generated code,
  //       name: The name of the original symbol which generated this chunk of
  //             code.
  //     }
  //
  // All properties except for `generatedLine` and `generatedColumn` can be
  // `null`.
  //
  // `_generatedMappings` is ordered by the generated positions.
  //
  // `_originalMappings` is ordered by the original positions.
  get _generatedMappings() {
    if (!this.__generatedMappings) {
      this._sortGeneratedMappings();
    }

    return this.__generatedMappings
  }

  get _originalMappings() {
    if (!this.__originalMappings) {
      this._sortOriginalMappings();
    }

    return this.__originalMappings
  }

  get _generatedMappingsUnsorted() {
    if (!this.__generatedMappingsUnsorted) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__generatedMappingsUnsorted
  }

  get _originalMappingsUnsorted() {
    if (!this.__originalMappingsUnsorted) {
      this._parseMappings(this._mappings, this.sourceRoot);
    }

    return this.__originalMappingsUnsorted
  }

  _sortGeneratedMappings() {
    const mappings = this._generatedMappingsUnsorted;
    mappings.sort(util.compareByGeneratedPositionsDeflated);
    this.__generatedMappings = mappings;
  }

  _sortOriginalMappings() {
    const mappings = this._originalMappingsUnsorted;
    mappings.sort(util.compareByOriginalPositions);
    this.__originalMappings = mappings;
  }

  /**
   * The list of original sources.
   */
  get sources() {
    const sources = [];
    for (let i = 0; i < this._sections.length; i++) {
      for (let j = 0; j < this._sections[i].consumer.sources.length; j++) {
        sources.push(this._sections[i].consumer.sources[j]);
      }
    }
    return sources
  }

  /**
   * Returns the original source, line, and column information for the generated
   * source's line and column positions provided. The only argument is an object
   * with the following properties:
   *
   *   - line: The line number in the generated source.  The line number
   *     is 1-based.
   *   - column: The column number in the generated source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - source: The original source file, or null.
   *   - line: The line number in the original source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the original source, or null.  The
   *     column number is 0-based.
   *   - name: The original identifier, or null.
   */
  originalPositionFor(aArgs) {
    const needle = {
      generatedLine: util.getArg(aArgs, 'line'),
      generatedColumn: util.getArg(aArgs, 'column'),
    };

    // Find the section containing the generated position we're trying to map
    // to an original position.
    const sectionIndex = binarySearch.search(
      needle,
      this._sections,
      function (aNeedle, section) {
        const cmp =
          aNeedle.generatedLine - section.generatedOffset.generatedLine;
        if (cmp) {
          return cmp
        }

        return aNeedle.generatedColumn - section.generatedOffset.generatedColumn
      }
    );
    const section = this._sections[sectionIndex];

    if (!section) {
      return {
        source: null,
        line: null,
        column: null,
        name: null,
      }
    }

    return section.consumer.originalPositionFor({
      line: needle.generatedLine - (section.generatedOffset.generatedLine - 1),
      column:
        needle.generatedColumn -
        (section.generatedOffset.generatedLine === needle.generatedLine
          ? section.generatedOffset.generatedColumn - 1
          : 0),
      bias: aArgs.bias,
    })
  }

  /**
   * Return true if we have the source content for every source in the source
   * map, false otherwise.
   */
  hasContentsOfAllSources() {
    return this._sections.every(function (s) {
      return s.consumer.hasContentsOfAllSources()
    })
  }

  /**
   * Returns the original source content. The only argument is the url of the
   * original source file. Returns null if no original source content is
   * available.
   */
  sourceContentFor(aSource, nullOnMissing) {
    for (let i = 0; i < this._sections.length; i++) {
      const section = this._sections[i];

      const content = section.consumer.sourceContentFor(aSource, true);
      if (content) {
        return content
      }
    }
    if (nullOnMissing) {
      return null
    }
    throw new Error('"' + aSource + '" is not in the SourceMap.')
  }

  /**
   * Returns the generated line and column information for the original source,
   * line, and column positions provided. The only argument is an object with
   * the following properties:
   *
   *   - source: The filename of the original source.
   *   - line: The line number in the original source.  The line number
   *     is 1-based.
   *   - column: The column number in the original source.  The column
   *     number is 0-based.
   *
   * and an object is returned with the following properties:
   *
   *   - line: The line number in the generated source, or null.  The
   *     line number is 1-based.
   *   - column: The column number in the generated source, or null.
   *     The column number is 0-based.
   */
  generatedPositionFor(aArgs) {
    for (let i = 0; i < this._sections.length; i++) {
      const section = this._sections[i];

      // Only consider this section if the requested source is in the list of
      // sources of the consumer.
      if (
        section.consumer._findSourceIndex(util.getArg(aArgs, 'source')) === -1
      ) {
        continue
      }
      const generatedPosition = section.consumer.generatedPositionFor(aArgs);
      if (generatedPosition) {
        const ret = {
          line:
            generatedPosition.line +
            (section.generatedOffset.generatedLine - 1),
          column:
            generatedPosition.column +
            (section.generatedOffset.generatedLine === generatedPosition.line
              ? section.generatedOffset.generatedColumn - 1
              : 0),
        };
        return ret
      }
    }

    return {
      line: null,
      column: null,
    }
  }

  /**
   * Parse the mappings in a string in to a data structure which we can easily
   * query (the ordered arrays in the `this.__generatedMappings` and
   * `this.__originalMappings` properties).
   */
  _parseMappings(aStr, aSourceRoot) {
    const generatedMappings = (this.__generatedMappingsUnsorted = []);
    const originalMappings = (this.__originalMappingsUnsorted = []);
    for (let i = 0; i < this._sections.length; i++) {
      const section = this._sections[i];

      const sectionMappings = [];
      section.consumer.eachMapping((m) => sectionMappings.push(m));

      for (let j = 0; j < sectionMappings.length; j++) {
        const mapping = sectionMappings[j];

        // TODO: test if null is correct here.  The original code used
        // `source`, which would actually have gotten used as null because
        // var's get hoisted.
        // See: https://github.com/mozilla/source-map/issues/333
        let source = util.computeSourceURL(
          section.consumer.sourceRoot,
          null,
          this._sourceMapURL
        );
        this._sources.add(source);
        source = this._sources.indexOf(source);

        let name = null;
        if (mapping.name) {
          this._names.add(mapping.name);
          name = this._names.indexOf(mapping.name);
        }

        // The mappings coming from the consumer for the section have
        // generated positions relative to the start of the section, so we
        // need to offset them to be relative to the start of the concatenated
        // generated file.
        const adjustedMapping = {
          source,
          generatedLine:
            mapping.generatedLine + (section.generatedOffset.generatedLine - 1),
          generatedColumn:
            mapping.generatedColumn +
            (section.generatedOffset.generatedLine === mapping.generatedLine
              ? section.generatedOffset.generatedColumn - 1
              : 0),
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name,
        };

        generatedMappings.push(adjustedMapping);
        if (typeof adjustedMapping.originalLine === 'number') {
          originalMappings.push(adjustedMapping);
        }
      }
    }
  }

  eachMapping(aCallback, aContext, aOrder) {
    const context = aContext || null;
    const order = aOrder || SourceMapConsumer$1.GENERATED_ORDER;

    let mappings;
    switch (order) {
      case SourceMapConsumer$1.GENERATED_ORDER:
        mappings = this._generatedMappings;
        break
      case SourceMapConsumer$1.ORIGINAL_ORDER:
        mappings = this._originalMappings;
        break
      default:
        throw new Error('Unknown order of iteration.')
    }

    const sourceRoot = this.sourceRoot;
    mappings
      .map(function (mapping) {
        let source = null;
        if (mapping.source !== null) {
          source = this._sources.at(mapping.source);
          source = util.computeSourceURL(sourceRoot, source, this._sourceMapURL);
        }
        return {
          source,
          generatedLine: mapping.generatedLine,
          generatedColumn: mapping.generatedColumn,
          originalLine: mapping.originalLine,
          originalColumn: mapping.originalColumn,
          name: mapping.name === null ? null : this._names.at(mapping.name),
        }
      }, this)
      .forEach(aCallback, context);
  }

  /**
   * Find the mapping that best matches the hypothetical "needle" mapping that
   * we are searching for in the given "haystack" of mappings.
   */
  _findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias) {
    // To return the position we are searching for, we must first find the
    // mapping for the given position and then return the opposite position it
    // points to. Because the mappings are sorted, we can use binary search to
    // find the best mapping.

    if (aNeedle[aLineName] <= 0) {
      throw new TypeError(
        'Line must be greater than or equal to 1, got ' + aNeedle[aLineName]
      )
    }
    if (aNeedle[aColumnName] < 0) {
      throw new TypeError(
        'Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]
      )
    }

    return binarySearch.search(aNeedle, aMappings, aComparator, aBias)
  }

  allGeneratedPositionsFor(aArgs) {
    const line = util.getArg(aArgs, 'line');

    // When there is no exact match, BasicSourceMapConsumer.prototype._findMapping
    // returns the index of the closest mapping less than the needle. By
    // setting needle.originalColumn to 0, we thus find the last mapping for
    // the given line, provided such a mapping exists.
    const needle = {
      source: util.getArg(aArgs, 'source'),
      originalLine: line,
      originalColumn: util.getArg(aArgs, 'column', 0),
    };

    needle.source = this._findSourceIndex(needle.source);
    if (needle.source < 0) {
      return []
    }

    if (needle.originalLine < 1) {
      throw new Error('Line numbers must be >= 1')
    }

    if (needle.originalColumn < 0) {
      throw new Error('Column numbers must be >= 0')
    }

    const mappings = [];

    let index = this._findMapping(
      needle,
      this._originalMappings,
      'originalLine',
      'originalColumn',
      util.compareByOriginalPositions,
      binarySearch.LEAST_UPPER_BOUND
    );
    if (index >= 0) {
      let mapping = this._originalMappings[index];

      if (aArgs.column === undefined) {
        const originalLine = mapping.originalLine;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we found. Since
        // mappings are sorted, this is guaranteed to find all mappings for
        // the line we found.
        while (mapping && mapping.originalLine === originalLine) {
          let lastColumn = mapping.lastGeneratedColumn;
          if (this._computedColumnSpans && lastColumn === null) {
            lastColumn = Infinity;
          }
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn,
          });

          mapping = this._originalMappings[++index];
        }
      } else {
        const originalColumn = mapping.originalColumn;

        // Iterate until either we run out of mappings, or we run into
        // a mapping for a different line than the one we were searching for.
        // Since mappings are sorted, this is guaranteed to find all mappings for
        // the line we are searching for.
        while (
          mapping &&
          mapping.originalLine === line &&
          mapping.originalColumn == originalColumn
        ) {
          let lastColumn = mapping.lastGeneratedColumn;
          if (this._computedColumnSpans && lastColumn === null) {
            lastColumn = Infinity;
          }
          mappings.push({
            line: util.getArg(mapping, 'generatedLine', null),
            column: util.getArg(mapping, 'generatedColumn', null),
            lastColumn,
          });

          mapping = this._originalMappings[++index];
        }
      }
    }

    return mappings
  }

  destroy() {
    for (let i = 0; i < this._sections.length; i++) {
      this._sections[i].consumer.destroy();
    }
  }
}
sourceMapConsumer.IndexedSourceMapConsumer = IndexedSourceMapConsumer;

/*
 * Cheat to get around inter-twingled classes.  `factory()` can be at the end
 * where it has access to non-hoisted classes, but it gets hoisted itself.
 */
function _factory(aSourceMap, aSourceMapURL) {
  let sourceMap = aSourceMap;
  if (typeof aSourceMap === 'string') {
    sourceMap = util.parseSourceMapInput(aSourceMap);
  }

  const consumer =
    sourceMap.sections != null
      ? new IndexedSourceMapConsumer(sourceMap, aSourceMapURL)
      : new BasicSourceMapConsumer(sourceMap, aSourceMapURL);
  return Promise.resolve(consumer)
}

function _factoryBSM(aSourceMap, aSourceMapURL) {
  return BasicSourceMapConsumer.fromSourceMap(aSourceMap, aSourceMapURL)
}

/*
 * Copyright 2009-2011 Mozilla Foundation and contributors
 * Licensed under the New BSD license. See LICENSE.txt or:
 * http://opensource.org/licenses/BSD-3-Clause
 */
var SourceMapConsumer = sourceMapConsumer.SourceMapConsumer;

const splitRE = /\r?\n/;
const range = 2;
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
let isWindows = false;
try {
    isWindows = os.platform() === 'win32';
}
catch (error) { }
function normalizePath(id) {
    return isWindows ? id.replace(/\\/g, '/') : id;
}
function generateCodeFrameSourceMapConsumer(consumer, m, options = {}) {
    if (m.file) {
        const res = consumer.originalPositionFor({
            line: m.line,
            column: m.column,
        });
        if (res.source != null && res.line != null && res.column != null) {
            let code = consumer.sourceContentFor(res.source, true);
            if (code) {
                code = generateCodeFrame(code, { line: res.line, column: res.column });
                if (options.replaceTabsWithSpace) {
                    code = code.replace(/\t/g, ' ');
                }
                return {
                    type: m.type,
                    file: options.sourceRoot
                        ? normalizePath(path.relative(options.sourceRoot, res.source.replace('\\\\?\\', '')))
                        : res.source,
                    line: res.line,
                    column: res.column,
                    message: m.message,
                    code,
                };
            }
        }
    }
}
function initConsumer(filename) {
    if (fs.existsSync(filename)) {
        return new SourceMapConsumer(fs.readFileSync(filename, 'utf8'));
    }
    return Promise.resolve(undefined);
}
function generateCodeFrameWithSourceMapPath(filename, messages, options = {}) {
    if (typeof messages === 'string') {
        try {
            messages = JSON.parse(messages);
        }
        catch (e) { }
    }
    if (Array.isArray(messages) && messages.length) {
        return new Promise((resolve) => {
            initConsumer(filename).then((consumer) => {
                resolve(messages
                    .map((m) => {
                    if (m.file && consumer) {
                        const message = generateCodeFrameSourceMapConsumer(consumer, m, options);
                        if (message) {
                            return message;
                        }
                    }
                    if (!m.file) {
                        m.file = '';
                    }
                    return m;
                })
                    .filter(Boolean));
            });
        });
    }
    return Promise.resolve([]);
}
function resolveSourceMapPath(sourceMapFilename, name, outputDir) {
    const is_uni_modules = path.basename(path.dirname(name)) === 'uni_modules';
    return path.resolve(outputDir, '../.sourcemap/app', name, is_uni_modules ? 'utssdk' : '', sourceMapFilename);
}
function generateCodeFrameWithKotlinStacktrace(stacktrace, { name, inputDir, outputDir }) {
    const sourceMapFilename = resolveSourceMapPath('app-android/index.kt.map', name, outputDir);
    return generateCodeFrameWithStacktrace(stacktrace, /e:\s+(.*):\s+\(([0-9]+),\s+([0-9]+)\):\s+(.*)/g, {
        sourceRoot: inputDir,
        sourceMapFilename,
    });
}
function generateCodeFrameWithSwiftStacktrace(stacktrace, { name, inputDir, outputDir }) {
    const sourceMapFilename = resolveSourceMapPath('app-ios/index.swift.map', name, outputDir);
    return generateCodeFrameWithStacktrace(stacktrace, /(.*):([0-9]+):([0-9]+):\s+error:\s+(.*)/g, {
        sourceRoot: inputDir,
        sourceMapFilename,
    });
}
function generateCodeFrameWithStacktrace(stacktrace, regexp, { sourceRoot, sourceMapFilename, replaceTabsWithSpace, }) {
    return new Promise((resolve) => {
        initConsumer(sourceMapFilename).then((consumer) => {
            if (!consumer) {
                return resolve(stacktrace);
            }
            resolve(stacktrace.replace(regexp, (substring, file, line, column, message) => {
                const m = generateCodeFrameSourceMapConsumer(consumer, {
                    type: 'error',
                    file,
                    message,
                    line: parseInt(line),
                    column: parseInt(column),
                }, { sourceRoot, replaceTabsWithSpace });
                if (!m) {
                    return substring;
                }
                return `error: ${message}
at ${m.file}:${m.line}:${m.column}
${m.code}
`;
            }));
        });
    });
}

// @ts-ignore
{
    // @ts-ignore
    if (SourceMapConsumer.initialize) {
        // @ts-ignore
        SourceMapConsumer.initialize({
            'lib/mappings.wasm': 'https://unpkg.com/source-map@0.7.3/lib/mappings.wasm',
        });
    }
}
const nixSlashes = (x) => x.replace(/\\/g, '/');
const sourcemapCatch = {};
function stacktracey(stacktrace, opts) {
    const stack = opts.preset.parseStacktrace(stacktrace);
    let parseStack = Promise.resolve();
    stack.items.forEach((item, index) => {
        const fn = (item, index) => {
            const { line = 0, column = 0, file, fileName, fileRelative } = item;
            if (item.thirdParty) {
                return Promise.resolve();
            }
            function _getSourceMapContent(file, fileName, fileRelative) {
                return opts.preset
                    .getSourceMapContent(file, fileName, fileRelative)
                    .then((content) => {
                    if (content) {
                        return getConsumer(content).then((consumer) => {
                            return parseSourceMapContent(consumer, {
                                line: line + (opts.preset.lineOffset || 0),
                                column,
                            }, !!opts.withSourceContent);
                        });
                    }
                });
            }
            try {
                return _getSourceMapContent(file, fileName, fileRelative).then((sourceMapContent) => {
                    if (sourceMapContent) {
                        const { source, sourcePath, sourceLine, sourceColumn, sourceContent, fileName = '', } = sourceMapContent;
                        stack.items[index] = Object.assign({}, item, {
                            file: source,
                            line: sourceLine,
                            column: sourceColumn,
                            fileShort: sourcePath,
                            fileRelative: source,
                            fileName,
                            thirdParty: isThirdParty(sourcePath),
                            parsed: true,
                            sourceContent,
                        });
                        /**
                         * 以 .js 结尾
                         * 包含 app-service.js 则需要再解析 两次
                         * 不包含 app-service.js 则无需再解析 一次
                         */
                        const curItem = stack.items[index];
                        if (stack.isMP &&
                            curItem.beforeParse.indexOf('app-service') !== -1) {
                            return fn(curItem, index);
                        }
                    }
                });
            }
            catch (error) {
                return Promise.resolve();
            }
        };
        parseStack = parseStack.then(() => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    fn(item, index).then(resolve);
                }, 0);
            });
        });
    });
    const _promise = new Promise((resolve, reject) => {
        parseStack
            .then(() => {
            const parseError = opts.preset.asTableStacktrace({
                stack,
                maxColumnWidths: {
                    callee: 999,
                    file: 999,
                    sourceLine: 999,
                },
                stacktrace,
            });
            resolve(parseError);
        })
            .catch(() => {
            resolve(stacktrace);
        });
    });
    return _promise;
}
function isThirdParty(relativePath) {
    return relativePath.indexOf('@dcloudio') !== -1;
}
function getConsumer(content) {
    return new Promise((resolve, reject) => {
        try {
            if (SourceMapConsumer.with) {
                SourceMapConsumer.with(content, null, (consumer) => {
                    resolve(consumer);
                });
            }
            else {
                // @ts-ignore
                const consumer = SourceMapConsumer(content);
                resolve(consumer);
            }
        }
        catch (error) {
            reject();
        }
    });
}
function getSourceMapContent(sourcemapUrl) {
    try {
        return (sourcemapCatch[sourcemapUrl] ||
            (sourcemapCatch[sourcemapUrl] = new Promise((resolve, reject) => {
                try {
                    if (/^[http|https]+:/i.test(sourcemapUrl)) {
                        uni.request({
                            url: sourcemapUrl,
                            success: (res) => {
                                if (res.statusCode === 200) {
                                    sourcemapCatch[sourcemapUrl] = res.data;
                                    resolve(sourcemapCatch[sourcemapUrl]);
                                }
                                else {
                                    resolve((sourcemapCatch[sourcemapUrl] = ''));
                                }
                            },
                            fail() {
                                resolve((sourcemapCatch[sourcemapUrl] = ''));
                            },
                        });
                    }
                    else {
                        sourcemapCatch[sourcemapUrl] = fs.readFileSync(sourcemapUrl, 'utf-8');
                        resolve(sourcemapCatch[sourcemapUrl]);
                    }
                }
                catch (error) {
                    resolve('');
                }
            })));
    }
    catch (error) {
        return '';
    }
}
function parseSourceMapContent(consumer, obj, withSourceContent) {
    // source -> 'uni-app:///node_modules/@sentry/browser/esm/helpers.js'
    const { source, line: sourceLine, column: sourceColumn, } = consumer.originalPositionFor(obj);
    if (source) {
        const sourcePathSplit = source.split('/');
        const sourcePath = sourcePathSplit.slice(3).join('/');
        const fileName = sourcePathSplit.pop();
        return {
            source,
            sourcePath,
            sourceLine: sourceLine === null ? 0 : sourceLine,
            sourceColumn: sourceColumn === null ? 0 : sourceColumn,
            fileName,
            sourceContent: withSourceContent
                ? consumer.sourceContentFor(source) || ''
                : '',
        };
    }
}
function joinItem(item) {
    if (typeof item === 'string') {
        return item;
    }
    const a = item[0];
    const b = item[1] ? `  ${item[1]}` : '';
    const c = item[2] ? ` ${item[2]}` : '';
    return `${a}${b}${c}`;
}
function uniStracktraceyPreset(opts) {
    const { base, sourceRoot, splitThirdParty, uniPlatform, lineOffset } = opts;
    let stack;
    return {
        /**
         *
         * 微信特殊处理
         * 微信解析步骤：
         *    1. //usr/app-service.js -> 'weixin/__APP__/app-service.map.map'
         *    2. //usr/pages/API/app-service.js -> 'weixin/pages/API/app-service.map.map'
         *    3. uni-list-item/uni-list-item.js -> ${base}/uni-list-item/uni-list-item.js.map
         */
        parseSourceMapUrl(file, fileName, fileRelative) {
            // 组合 sourceMapUrl
            if (fileRelative.indexOf('(') !== -1)
                fileRelative = fileRelative.match(/\((.*)/)[1];
            if (!base || !fileRelative)
                return '';
            if (sourceRoot) {
                return `${fileRelative.replace(sourceRoot, base + '/')}.map`;
            }
            let baseAfter = '';
            if (stack.isMP) {
                if (fileRelative.indexOf('app-service.js') !== -1) {
                    baseAfter = (base.match(/\w$/) ? '/' : '') + '__WEIXIN__';
                    if (fileRelative === fileName) {
                        baseAfter += '/__APP__';
                    }
                    fileRelative = fileRelative.replace('.js', '.map');
                }
                if (baseAfter && !!fileRelative.match(/^\w/))
                    baseAfter += '/';
            }
            return `${base}${baseAfter}${fileRelative}.map`;
        },
        getSourceMapContent(file, fileName, fileRelative) {
            if (stack.isMP && fileRelative.indexOf('.js') === -1) {
                return Promise.resolve('');
            }
            const sourcemapUrl = this.parseSourceMapUrl(file, fileName, fileRelative);
            return Promise.resolve(getSourceMapContent(sourcemapUrl));
        },
        parseStacktrace(stacktrace) {
            stack = new StackTracey$1(stacktrace, uniPlatform);
            return stack;
        },
        asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
            const errorName = stacktrace.split('\n')[0];
            const lines = stack.asTable
                ? stack.asTable(maxColumnWidths ? { maxColumnWidths } : undefined)
                : { items: [], thirdPartyItems: [] };
            if (lines.items.length || lines.thirdPartyItems.length) {
                const { items: stackLines, thirdPartyItems: stackThirdPartyLines } = lines;
                const userError = stack.itemsHeader
                    .map((item) => {
                    if (item === '%StacktraceyItem%') {
                        const _stack = stackLines.shift();
                        return _stack ? joinItem(_stack) : '';
                    }
                    return item;
                })
                    .filter(Boolean)
                    .join('\n');
                const thirdParty = stackThirdPartyLines.length
                    ? stackThirdPartyLines.map(joinItem).join('\n')
                    : '';
                if (splitThirdParty) {
                    return {
                        userError,
                        thirdParty,
                    };
                }
                return userError + '\n' + thirdParty;
            }
            else {
                if (splitThirdParty) {
                    return {
                        userError: errorName,
                        thirdParty: '',
                    };
                }
                return errorName;
            }
        },
        lineOffset,
    };
}
function utsStracktraceyPreset(opts) {
    const { inputRoot, outputRoot, sourceMapRoot } = opts;
    let errStack = [];
    return {
        parseSourceMapUrl(file, fileName, fileRelative) {
            return path.resolve(sourceMapRoot, path.relative(outputRoot, file) + '.map');
        },
        getSourceMapContent(file, fileName, fileRelative) {
            // 根据 base,filename 组合 sourceMapUrl
            return Promise.resolve(getSourceMapContent(this.parseSourceMapUrl(file, fileName, fileRelative)));
        },
        parseStacktrace(str) {
            const lines = (str || '').split('\n');
            const entries = lines
                .map((line, index) => {
                line = line.trim();
                const matches = line.match(/\s*(.+\.kt):([0-9]+):([0-9]+):\s+(.*)/);
                if (matches) {
                    errStack.push('%StacktraceyItem%');
                }
                else {
                    errStack.push(line);
                    return;
                }
                const fileName = matches[1].replace(/^.*(\\|\/|\:)/, '');
                return {
                    beforeParse: line,
                    callee: '',
                    index: false,
                    native: false,
                    file: nixSlashes(matches[1]),
                    line: parseInt(matches[2]),
                    column: parseInt(matches[3]),
                    fileName,
                    fileShort: line,
                    errMsg: matches[4] || '',
                    calleeShort: '',
                    fileRelative: '',
                    thirdParty: false,
                };
            })
                .filter((x) => x !== undefined);
            return {
                items: entries,
                itemsHeader: [],
            };
        },
        asTableStacktrace({ maxColumnWidths, stacktrace, stack }) {
            return errStack
                .map((item) => {
                if (item === '%StacktraceyItem%') {
                    const _stack = stack.items.shift();
                    if (_stack) {
                        return `at ${nixSlashes(path.relative(inputRoot, _stack.file.replace('\\\\?\\', '')))}:${_stack.line}:${_stack.column}
${_stack.errMsg}`;
                    }
                    return '';
                }
                return item;
            })
                .join('\n');
        },
    };
}

export { SourceMapConsumer, generateCodeFrame, generateCodeFrameSourceMapConsumer, generateCodeFrameWithKotlinStacktrace, generateCodeFrameWithSourceMapPath, generateCodeFrameWithSwiftStacktrace, stacktracey, uniStracktraceyPreset, utsStracktraceyPreset };
