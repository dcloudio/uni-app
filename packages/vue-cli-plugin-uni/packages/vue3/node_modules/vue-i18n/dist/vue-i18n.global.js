/*!
  * vue-i18n v9.1.7
  * (c) 2021 kazuya kawaguchi
  * Released under the MIT License.
  */
var VueI18n = (function (exports, vue) {
  'use strict';

  /**
   * Original Utilities
   * written by kazuya kawaguchi
   */
  const inBrowser = typeof window !== 'undefined';
  let mark;
  let measure;
  {
      const perf = inBrowser && window.performance;
      if (perf &&
          perf.mark &&
          perf.measure &&
          perf.clearMarks &&
          perf.clearMeasures) {
          mark = (tag) => perf.mark(tag);
          measure = (name, startTag, endTag) => {
              perf.measure(name, startTag, endTag);
              perf.clearMarks(startTag);
              perf.clearMarks(endTag);
          };
      }
  }
  const RE_ARGS = /\{([0-9a-zA-Z]+)\}/g;
  /* eslint-disable */
  function format(message, ...args) {
      if (args.length === 1 && isObject(args[0])) {
          args = args[0];
      }
      if (!args || !args.hasOwnProperty) {
          args = {};
      }
      return message.replace(RE_ARGS, (match, identifier) => {
          return args.hasOwnProperty(identifier) ? args[identifier] : '';
      });
  }
  const hasSymbol = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';
  const makeSymbol = (name) => hasSymbol ? Symbol(name) : name;
  const generateFormatCacheKey = (locale, key, source) => friendlyJSONstringify({ l: locale, k: key, s: source });
  const friendlyJSONstringify = (json) => JSON.stringify(json)
      .replace(/\u2028/g, '\\u2028')
      .replace(/\u2029/g, '\\u2029')
      .replace(/\u0027/g, '\\u0027');
  const isNumber = (val) => typeof val === 'number' && isFinite(val);
  const isDate = (val) => toTypeString(val) === '[object Date]';
  const isRegExp = (val) => toTypeString(val) === '[object RegExp]';
  const isEmptyObject = (val) => isPlainObject(val) && Object.keys(val).length === 0;
  function warn(msg, err) {
      if (typeof console !== 'undefined') {
          console.warn(`[intlify] ` + msg);
          /* istanbul ignore if */
          if (err) {
              console.warn(err.stack);
          }
      }
  }
  const assign = Object.assign;
  let _globalThis;
  const getGlobalThis = () => {
      // prettier-ignore
      return (_globalThis ||
          (_globalThis =
              typeof globalThis !== 'undefined'
                  ? globalThis
                  : typeof self !== 'undefined'
                      ? self
                      : typeof window !== 'undefined'
                          ? window
                          : typeof global !== 'undefined'
                              ? global
                              : {}));
  };
  function escapeHtml(rawText) {
      return rawText
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/"/g, '&quot;')
          .replace(/'/g, '&apos;');
  }
  const hasOwnProperty = Object.prototype.hasOwnProperty;
  function hasOwn(obj, key) {
      return hasOwnProperty.call(obj, key);
  }
  /* eslint-enable */
  /**
   * Useful Utilities By Evan you
   * Modified by kazuya kawaguchi
   * MIT License
   * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/index.ts
   * https://github.com/vuejs/vue-next/blob/master/packages/shared/src/codeframe.ts
   */
  const isArray = Array.isArray;
  const isFunction = (val) => typeof val === 'function';
  const isString = (val) => typeof val === 'string';
  const isBoolean = (val) => typeof val === 'boolean';
  const isObject = (val) => // eslint-disable-line
   val !== null && typeof val === 'object';
  const objectToString = Object.prototype.toString;
  const toTypeString = (value) => objectToString.call(value);
  const isPlainObject = (val) => toTypeString(val) === '[object Object]';
  // for converting list and named values to displayed strings.
  const toDisplayString = (val) => {
      return val == null
          ? ''
          : isArray(val) || (isPlainObject(val) && val.toString === objectToString)
              ? JSON.stringify(val, null, 2)
              : String(val);
  };
  const RANGE = 2;
  function generateCodeFrame(source, start = 0, end = source.length) {
      const lines = source.split(/\r?\n/);
      let count = 0;
      const res = [];
      for (let i = 0; i < lines.length; i++) {
          count += lines[i].length + 1;
          if (count >= start) {
              for (let j = i - RANGE; j <= i + RANGE || end > count; j++) {
                  if (j < 0 || j >= lines.length)
                      continue;
                  const line = j + 1;
                  res.push(`${line}${' '.repeat(3 - String(line).length)}|  ${lines[j]}`);
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

  /**
   * Event emitter, forked from the below:
   * - original repository url: https://github.com/developit/mitt
   * - code url: https://github.com/developit/mitt/blob/master/src/index.ts
   * - author: Jason Miller (https://github.com/developit)
   * - license: MIT
   */
  /**
   * Create a event emitter
   *
   * @returns An event emitter
   */
  function createEmitter() {
      const events = new Map();
      const emitter = {
          events,
          on(event, handler) {
              const handlers = events.get(event);
              const added = handlers && handlers.push(handler);
              if (!added) {
                  events.set(event, [handler]);
              }
          },
          off(event, handler) {
              const handlers = events.get(event);
              if (handlers) {
                  handlers.splice(handlers.indexOf(handler) >>> 0, 1);
              }
          },
          emit(event, payload) {
              (events.get(event) || [])
                  .slice()
                  .map(handler => handler(payload));
              (events.get('*') || [])
                  .slice()
                  .map(handler => handler(event, payload));
          }
      };
      return emitter;
  }

  const pathStateMachine = [];
  pathStateMachine[0 /* BEFORE_PATH */] = {
      ["w" /* WORKSPACE */]: [0 /* BEFORE_PATH */],
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
  };
  pathStateMachine[1 /* IN_PATH */] = {
      ["w" /* WORKSPACE */]: [1 /* IN_PATH */],
      ["." /* DOT */]: [2 /* BEFORE_IDENT */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */]
  };
  pathStateMachine[2 /* BEFORE_IDENT */] = {
      ["w" /* WORKSPACE */]: [2 /* BEFORE_IDENT */],
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */]
  };
  pathStateMachine[3 /* IN_IDENT */] = {
      ["i" /* IDENT */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["0" /* ZERO */]: [3 /* IN_IDENT */, 0 /* APPEND */],
      ["w" /* WORKSPACE */]: [1 /* IN_PATH */, 1 /* PUSH */],
      ["." /* DOT */]: [2 /* BEFORE_IDENT */, 1 /* PUSH */],
      ["[" /* LEFT_BRACKET */]: [4 /* IN_SUB_PATH */, 1 /* PUSH */],
      ["o" /* END_OF_FAIL */]: [7 /* AFTER_PATH */, 1 /* PUSH */]
  };
  pathStateMachine[4 /* IN_SUB_PATH */] = {
      ["'" /* SINGLE_QUOTE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */],
      ["\"" /* DOUBLE_QUOTE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */],
      ["[" /* LEFT_BRACKET */]: [
          4 /* IN_SUB_PATH */,
          2 /* INC_SUB_PATH_DEPTH */
      ],
      ["]" /* RIGHT_BRACKET */]: [1 /* IN_PATH */, 3 /* PUSH_SUB_PATH */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */]
  };
  pathStateMachine[5 /* IN_SINGLE_QUOTE */] = {
      ["'" /* SINGLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [5 /* IN_SINGLE_QUOTE */, 0 /* APPEND */]
  };
  pathStateMachine[6 /* IN_DOUBLE_QUOTE */] = {
      ["\"" /* DOUBLE_QUOTE */]: [4 /* IN_SUB_PATH */, 0 /* APPEND */],
      ["o" /* END_OF_FAIL */]: 8 /* ERROR */,
      ["l" /* ELSE */]: [6 /* IN_DOUBLE_QUOTE */, 0 /* APPEND */]
  };
  /**
   * Check if an expression is a literal value.
   */
  const literalValueRE = /^\s?(?:true|false|-?[\d.]+|'[^']*'|"[^"]*")\s?$/;
  function isLiteral(exp) {
      return literalValueRE.test(exp);
  }
  /**
   * Strip quotes from a string
   */
  function stripQuotes(str) {
      const a = str.charCodeAt(0);
      const b = str.charCodeAt(str.length - 1);
      return a === b && (a === 0x22 || a === 0x27) ? str.slice(1, -1) : str;
  }
  /**
   * Determine the type of a character in a keypath.
   */
  function getPathCharType(ch) {
      if (ch === undefined || ch === null) {
          return "o" /* END_OF_FAIL */;
      }
      const code = ch.charCodeAt(0);
      switch (code) {
          case 0x5b: // [
          case 0x5d: // ]
          case 0x2e: // .
          case 0x22: // "
          case 0x27: // '
              return ch;
          case 0x5f: // _
          case 0x24: // $
          case 0x2d: // -
              return "i" /* IDENT */;
          case 0x09: // Tab (HT)
          case 0x0a: // Newline (LF)
          case 0x0d: // Return (CR)
          case 0xa0: // No-break space (NBSP)
          case 0xfeff: // Byte Order Mark (BOM)
          case 0x2028: // Line Separator (LS)
          case 0x2029: // Paragraph Separator (PS)
              return "w" /* WORKSPACE */;
      }
      return "i" /* IDENT */;
  }
  /**
   * Format a subPath, return its plain form if it is
   * a literal string or number. Otherwise prepend the
   * dynamic indicator (*).
   */
  function formatSubPath(path) {
      const trimmed = path.trim();
      // invalid leading 0
      if (path.charAt(0) === '0' && isNaN(parseInt(path))) {
          return false;
      }
      return isLiteral(trimmed)
          ? stripQuotes(trimmed)
          : "*" /* ASTARISK */ + trimmed;
  }
  /**
   * Parse a string path into an array of segments
   */
  function parse(path) {
      const keys = [];
      let index = -1;
      let mode = 0 /* BEFORE_PATH */;
      let subPathDepth = 0;
      let c;
      let key; // eslint-disable-line
      let newChar;
      let type;
      let transition;
      let action;
      let typeMap;
      const actions = [];
      actions[0 /* APPEND */] = () => {
          if (key === undefined) {
              key = newChar;
          }
          else {
              key += newChar;
          }
      };
      actions[1 /* PUSH */] = () => {
          if (key !== undefined) {
              keys.push(key);
              key = undefined;
          }
      };
      actions[2 /* INC_SUB_PATH_DEPTH */] = () => {
          actions[0 /* APPEND */]();
          subPathDepth++;
      };
      actions[3 /* PUSH_SUB_PATH */] = () => {
          if (subPathDepth > 0) {
              subPathDepth--;
              mode = 4 /* IN_SUB_PATH */;
              actions[0 /* APPEND */]();
          }
          else {
              subPathDepth = 0;
              if (key === undefined) {
                  return false;
              }
              key = formatSubPath(key);
              if (key === false) {
                  return false;
              }
              else {
                  actions[1 /* PUSH */]();
              }
          }
      };
      function maybeUnescapeQuote() {
          const nextChar = path[index + 1];
          if ((mode === 5 /* IN_SINGLE_QUOTE */ &&
              nextChar === "'" /* SINGLE_QUOTE */) ||
              (mode === 6 /* IN_DOUBLE_QUOTE */ &&
                  nextChar === "\"" /* DOUBLE_QUOTE */)) {
              index++;
              newChar = '\\' + nextChar;
              actions[0 /* APPEND */]();
              return true;
          }
      }
      while (mode !== null) {
          index++;
          c = path[index];
          if (c === '\\' && maybeUnescapeQuote()) {
              continue;
          }
          type = getPathCharType(c);
          typeMap = pathStateMachine[mode];
          transition = typeMap[type] || typeMap["l" /* ELSE */] || 8 /* ERROR */;
          // check parse error
          if (transition === 8 /* ERROR */) {
              return;
          }
          mode = transition[0];
          if (transition[1] !== undefined) {
              action = actions[transition[1]];
              if (action) {
                  newChar = c;
                  if (action() === false) {
                      return;
                  }
              }
          }
          // check parse finish
          if (mode === 7 /* AFTER_PATH */) {
              return keys;
          }
      }
  }
  // path token cache
  const cache = new Map();
  function resolveValue(obj, path) {
      // check object
      if (!isObject(obj)) {
          return null;
      }
      // parse path
      let hit = cache.get(path);
      if (!hit) {
          hit = parse(path);
          if (hit) {
              cache.set(path, hit);
          }
      }
      // check hit
      if (!hit) {
          return null;
      }
      // resolve path value
      const len = hit.length;
      let last = obj;
      let i = 0;
      while (i < len) {
          const val = last[hit[i]];
          if (val === undefined) {
              return null;
          }
          last = val;
          i++;
      }
      return last;
  }
  /**
   * Transform flat json in obj to normal json in obj
   */
  function handleFlatJson(obj) {
      // check obj
      if (!isObject(obj)) {
          return obj;
      }
      for (const key in obj) {
          // check key
          if (!hasOwn(obj, key)) {
              continue;
          }
          // handle for normal json
          if (!key.includes("." /* DOT */)) {
              // recursive process value if value is also a object
              if (isObject(obj[key])) {
                  handleFlatJson(obj[key]);
              }
          }
          // handle for flat json, transform to normal json
          else {
              // go to the last object
              const subKeys = key.split("." /* DOT */);
              const lastIndex = subKeys.length - 1;
              let currentObj = obj;
              for (let i = 0; i < lastIndex; i++) {
                  if (!(subKeys[i] in currentObj)) {
                      currentObj[subKeys[i]] = {};
                  }
                  currentObj = currentObj[subKeys[i]];
              }
              // update last object value, delete old property
              currentObj[subKeys[lastIndex]] = obj[key];
              delete obj[key];
              // recursive process value if value is also a object
              if (isObject(currentObj[subKeys[lastIndex]])) {
                  handleFlatJson(currentObj[subKeys[lastIndex]]);
              }
          }
      }
      return obj;
  }

  const DEFAULT_MODIFIER = (str) => str;
  const DEFAULT_MESSAGE = (ctx) => ''; // eslint-disable-line
  const DEFAULT_MESSAGE_DATA_TYPE = 'text';
  const DEFAULT_NORMALIZE = (values) => values.length === 0 ? '' : values.join('');
  const DEFAULT_INTERPOLATE = toDisplayString;
  function pluralDefault(choice, choicesLength) {
      choice = Math.abs(choice);
      if (choicesLength === 2) {
          // prettier-ignore
          return choice
              ? choice > 1
                  ? 1
                  : 0
              : 1;
      }
      return choice ? Math.min(choice, 2) : 0;
  }
  function getPluralIndex(options) {
      // prettier-ignore
      const index = isNumber(options.pluralIndex)
          ? options.pluralIndex
          : -1;
      // prettier-ignore
      return options.named && (isNumber(options.named.count) || isNumber(options.named.n))
          ? isNumber(options.named.count)
              ? options.named.count
              : isNumber(options.named.n)
                  ? options.named.n
                  : index
          : index;
  }
  function normalizeNamed(pluralIndex, props) {
      if (!props.count) {
          props.count = pluralIndex;
      }
      if (!props.n) {
          props.n = pluralIndex;
      }
  }
  function createMessageContext(options = {}) {
      const locale = options.locale;
      const pluralIndex = getPluralIndex(options);
      const pluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? options.pluralRules[locale]
          : pluralDefault;
      const orgPluralRule = isObject(options.pluralRules) &&
          isString(locale) &&
          isFunction(options.pluralRules[locale])
          ? pluralDefault
          : undefined;
      const plural = (messages) => messages[pluralRule(pluralIndex, messages.length, orgPluralRule)];
      const _list = options.list || [];
      const list = (index) => _list[index];
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const _named = options.named || {};
      isNumber(options.pluralIndex) && normalizeNamed(pluralIndex, _named);
      const named = (key) => _named[key];
      // TODO: need to design resolve message function?
      function message(key) {
          // prettier-ignore
          const msg = isFunction(options.messages)
              ? options.messages(key)
              : isObject(options.messages)
                  ? options.messages[key]
                  : false;
          return !msg
              ? options.parent
                  ? options.parent.message(key) // resolve from parent messages
                  : DEFAULT_MESSAGE
              : msg;
      }
      const _modifier = (name) => options.modifiers
          ? options.modifiers[name]
          : DEFAULT_MODIFIER;
      const normalize = isPlainObject(options.processor) && isFunction(options.processor.normalize)
          ? options.processor.normalize
          : DEFAULT_NORMALIZE;
      const interpolate = isPlainObject(options.processor) &&
          isFunction(options.processor.interpolate)
          ? options.processor.interpolate
          : DEFAULT_INTERPOLATE;
      const type = isPlainObject(options.processor) && isString(options.processor.type)
          ? options.processor.type
          : DEFAULT_MESSAGE_DATA_TYPE;
      const ctx = {
          ["list" /* LIST */]: list,
          ["named" /* NAMED */]: named,
          ["plural" /* PLURAL */]: plural,
          ["linked" /* LINKED */]: (key, modifier) => {
              // TODO: should check `key`
              const msg = message(key)(ctx);
              return isString(modifier) ? _modifier(modifier)(msg) : msg;
          },
          ["message" /* MESSAGE */]: message,
          ["type" /* TYPE */]: type,
          ["interpolate" /* INTERPOLATE */]: interpolate,
          ["normalize" /* NORMALIZE */]: normalize
      };
      return ctx;
  }

  /** @internal */
  const errorMessages$2 = {
      // tokenizer error messages
      [0 /* EXPECTED_TOKEN */]: `Expected token: '{0}'`,
      [1 /* INVALID_TOKEN_IN_PLACEHOLDER */]: `Invalid token in placeholder: '{0}'`,
      [2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */]: `Unterminated single quote in placeholder`,
      [3 /* UNKNOWN_ESCAPE_SEQUENCE */]: `Unknown escape sequence: \\{0}`,
      [4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */]: `Invalid unicode escape sequence: {0}`,
      [5 /* UNBALANCED_CLOSING_BRACE */]: `Unbalanced closing brace`,
      [6 /* UNTERMINATED_CLOSING_BRACE */]: `Unterminated closing brace`,
      [7 /* EMPTY_PLACEHOLDER */]: `Empty placeholder`,
      [8 /* NOT_ALLOW_NEST_PLACEHOLDER */]: `Not allowed nest placeholder`,
      [9 /* INVALID_LINKED_FORMAT */]: `Invalid linked format`,
      // parser error messages
      [10 /* MUST_HAVE_MESSAGES_IN_PLURAL */]: `Plural must have messages`,
      [11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */]: `Unexpected empty linked modifier`,
      [12 /* UNEXPECTED_EMPTY_LINKED_KEY */]: `Unexpected empty linked key`,
      [13 /* UNEXPECTED_LEXICAL_ANALYSIS */]: `Unexpected lexical analysis in token: '{0}'`
  };
  function createCompileError(code, loc, options = {}) {
      const { domain, messages, args } = options;
      const msg = format((messages || errorMessages$2)[code] || '', ...(args || []))
          ;
      const error = new SyntaxError(String(msg));
      error.code = code;
      if (loc) {
          error.location = loc;
      }
      error.domain = domain;
      return error;
  }
  /** @internal */
  function defaultOnError(error) {
      throw error;
  }

  function createPosition(line, column, offset) {
      return { line, column, offset };
  }
  function createLocation(start, end, source) {
      const loc = { start, end };
      if (source != null) {
          loc.source = source;
      }
      return loc;
  }

  const CHAR_SP = ' ';
  const CHAR_CR = '\r';
  const CHAR_LF = '\n';
  const CHAR_LS = String.fromCharCode(0x2028);
  const CHAR_PS = String.fromCharCode(0x2029);
  function createScanner(str) {
      const _buf = str;
      let _index = 0;
      let _line = 1;
      let _column = 1;
      let _peekOffset = 0;
      const isCRLF = (index) => _buf[index] === CHAR_CR && _buf[index + 1] === CHAR_LF;
      const isLF = (index) => _buf[index] === CHAR_LF;
      const isPS = (index) => _buf[index] === CHAR_PS;
      const isLS = (index) => _buf[index] === CHAR_LS;
      const isLineEnd = (index) => isCRLF(index) || isLF(index) || isPS(index) || isLS(index);
      const index = () => _index;
      const line = () => _line;
      const column = () => _column;
      const peekOffset = () => _peekOffset;
      const charAt = (offset) => isCRLF(offset) || isPS(offset) || isLS(offset) ? CHAR_LF : _buf[offset];
      const currentChar = () => charAt(_index);
      const currentPeek = () => charAt(_index + _peekOffset);
      function next() {
          _peekOffset = 0;
          if (isLineEnd(_index)) {
              _line++;
              _column = 0;
          }
          if (isCRLF(_index)) {
              _index++;
          }
          _index++;
          _column++;
          return _buf[_index];
      }
      function peek() {
          if (isCRLF(_index + _peekOffset)) {
              _peekOffset++;
          }
          _peekOffset++;
          return _buf[_index + _peekOffset];
      }
      function reset() {
          _index = 0;
          _line = 1;
          _column = 1;
          _peekOffset = 0;
      }
      function resetPeek(offset = 0) {
          _peekOffset = offset;
      }
      function skipToPeek() {
          const target = _index + _peekOffset;
          // eslint-disable-next-line no-unmodified-loop-condition
          while (target !== _index) {
              next();
          }
          _peekOffset = 0;
      }
      return {
          index,
          line,
          column,
          peekOffset,
          charAt,
          currentChar,
          currentPeek,
          next,
          peek,
          reset,
          resetPeek,
          skipToPeek
      };
  }

  const EOF = undefined;
  const LITERAL_DELIMITER = "'";
  const ERROR_DOMAIN$1 = 'tokenizer';
  function createTokenizer(source, options = {}) {
      const location = options.location !== false;
      const _scnr = createScanner(source);
      const currentOffset = () => _scnr.index();
      const currentPosition = () => createPosition(_scnr.line(), _scnr.column(), _scnr.index());
      const _initLoc = currentPosition();
      const _initOffset = currentOffset();
      const _context = {
          currentType: 14 /* EOF */,
          offset: _initOffset,
          startLoc: _initLoc,
          endLoc: _initLoc,
          lastType: 14 /* EOF */,
          lastOffset: _initOffset,
          lastStartLoc: _initLoc,
          lastEndLoc: _initLoc,
          braceNest: 0,
          inLinked: false,
          text: ''
      };
      const context = () => _context;
      const { onError } = options;
      function emitError(code, pos, offset, ...args) {
          const ctx = context();
          pos.column += offset;
          pos.offset += offset;
          if (onError) {
              const loc = createLocation(ctx.startLoc, pos);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN$1,
                  args
              });
              onError(err);
          }
      }
      function getToken(context, type, value) {
          context.endLoc = currentPosition();
          context.currentType = type;
          const token = { type };
          if (location) {
              token.loc = createLocation(context.startLoc, context.endLoc);
          }
          if (value != null) {
              token.value = value;
          }
          return token;
      }
      const getEndToken = (context) => getToken(context, 14 /* EOF */);
      function eat(scnr, ch) {
          if (scnr.currentChar() === ch) {
              scnr.next();
              return ch;
          }
          else {
              emitError(0 /* EXPECTED_TOKEN */, currentPosition(), 0, ch);
              return '';
          }
      }
      function peekSpaces(scnr) {
          let buf = '';
          while (scnr.currentPeek() === CHAR_SP || scnr.currentPeek() === CHAR_LF) {
              buf += scnr.currentPeek();
              scnr.peek();
          }
          return buf;
      }
      function skipSpaces(scnr) {
          const buf = peekSpaces(scnr);
          scnr.skipToPeek();
          return buf;
      }
      function isIdentifierStart(ch) {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return ((cc >= 97 && cc <= 122) || // a-z
              (cc >= 65 && cc <= 90) || // A-Z
              cc === 95 // _
          );
      }
      function isNumberStart(ch) {
          if (ch === EOF) {
              return false;
          }
          const cc = ch.charCodeAt(0);
          return cc >= 48 && cc <= 57; // 0-9
      }
      function isNamedIdentifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      }
      function isListIdentifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ch = scnr.currentPeek() === '-' ? scnr.peek() : scnr.currentPeek();
          const ret = isNumberStart(ch);
          scnr.resetPeek();
          return ret;
      }
      function isLiteralStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 2 /* BraceLeft */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === LITERAL_DELIMITER;
          scnr.resetPeek();
          return ret;
      }
      function isLinkedDotStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 8 /* LinkedAlias */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "." /* LinkedDot */;
          scnr.resetPeek();
          return ret;
      }
      function isLinkedModifierStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 9 /* LinkedDot */) {
              return false;
          }
          peekSpaces(scnr);
          const ret = isIdentifierStart(scnr.currentPeek());
          scnr.resetPeek();
          return ret;
      }
      function isLinkedDelimiterStart(scnr, context) {
          const { currentType } = context;
          if (!(currentType === 8 /* LinkedAlias */ ||
              currentType === 12 /* LinkedModifier */)) {
              return false;
          }
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === ":" /* LinkedDelimiter */;
          scnr.resetPeek();
          return ret;
      }
      function isLinkedReferStart(scnr, context) {
          const { currentType } = context;
          if (currentType !== 10 /* LinkedDelimiter */) {
              return false;
          }
          const fn = () => {
              const ch = scnr.currentPeek();
              if (ch === "{" /* BraceLeft */) {
                  return isIdentifierStart(scnr.peek());
              }
              else if (ch === "@" /* LinkedAlias */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "|" /* Pipe */ ||
                  ch === ":" /* LinkedDelimiter */ ||
                  ch === "." /* LinkedDot */ ||
                  ch === CHAR_SP ||
                  !ch) {
                  return false;
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn();
              }
              else {
                  // other characters
                  return isIdentifierStart(ch);
              }
          };
          const ret = fn();
          scnr.resetPeek();
          return ret;
      }
      function isPluralStart(scnr) {
          peekSpaces(scnr);
          const ret = scnr.currentPeek() === "|" /* Pipe */;
          scnr.resetPeek();
          return ret;
      }
      function isTextStart(scnr, reset = true) {
          const fn = (hasSpace = false, prev = '', detectModulo = false) => {
              const ch = scnr.currentPeek();
              if (ch === "{" /* BraceLeft */) {
                  return prev === "%" /* Modulo */ ? false : hasSpace;
              }
              else if (ch === "@" /* LinkedAlias */ || !ch) {
                  return prev === "%" /* Modulo */ ? true : hasSpace;
              }
              else if (ch === "%" /* Modulo */) {
                  scnr.peek();
                  return fn(hasSpace, "%" /* Modulo */, true);
              }
              else if (ch === "|" /* Pipe */) {
                  return prev === "%" /* Modulo */ || detectModulo
                      ? true
                      : !(prev === CHAR_SP || prev === CHAR_LF);
              }
              else if (ch === CHAR_SP) {
                  scnr.peek();
                  return fn(true, CHAR_SP, detectModulo);
              }
              else if (ch === CHAR_LF) {
                  scnr.peek();
                  return fn(true, CHAR_LF, detectModulo);
              }
              else {
                  return true;
              }
          };
          const ret = fn();
          reset && scnr.resetPeek();
          return ret;
      }
      function takeChar(scnr, fn) {
          const ch = scnr.currentChar();
          if (ch === EOF) {
              return EOF;
          }
          if (fn(ch)) {
              scnr.next();
              return ch;
          }
          return null;
      }
      function takeIdentifierChar(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 97 && cc <= 122) || // a-z
                  (cc >= 65 && cc <= 90) || // A-Z
                  (cc >= 48 && cc <= 57) || // 0-9
                  cc === 95 || // _
                  cc === 36 // $
              );
          };
          return takeChar(scnr, closure);
      }
      function takeDigit(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return cc >= 48 && cc <= 57; // 0-9
          };
          return takeChar(scnr, closure);
      }
      function takeHexDigit(scnr) {
          const closure = (ch) => {
              const cc = ch.charCodeAt(0);
              return ((cc >= 48 && cc <= 57) || // 0-9
                  (cc >= 65 && cc <= 70) || // A-F
                  (cc >= 97 && cc <= 102)); // a-f
          };
          return takeChar(scnr, closure);
      }
      function getDigits(scnr) {
          let ch = '';
          let num = '';
          while ((ch = takeDigit(scnr))) {
              num += ch;
          }
          return num;
      }
      function readText(scnr) {
          const fn = (buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" /* BraceLeft */ ||
                  ch === "}" /* BraceRight */ ||
                  ch === "@" /* LinkedAlias */ ||
                  !ch) {
                  return buf;
              }
              else if (ch === "%" /* Modulo */) {
                  if (isTextStart(scnr)) {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
                  else {
                      return buf;
                  }
              }
              else if (ch === "|" /* Pipe */) {
                  return buf;
              }
              else if (ch === CHAR_SP || ch === CHAR_LF) {
                  if (isTextStart(scnr)) {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
                  else if (isPluralStart(scnr)) {
                      return buf;
                  }
                  else {
                      buf += ch;
                      scnr.next();
                      return fn(buf);
                  }
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(buf);
              }
          };
          return fn('');
      }
      function readNamedIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          if (scnr.currentChar() === EOF) {
              emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
          }
          return name;
      }
      function readListIdentifier(scnr) {
          skipSpaces(scnr);
          let value = '';
          if (scnr.currentChar() === '-') {
              scnr.next();
              value += `-${getDigits(scnr)}`;
          }
          else {
              value += getDigits(scnr);
          }
          if (scnr.currentChar() === EOF) {
              emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
          }
          return value;
      }
      function readLiteral(scnr) {
          skipSpaces(scnr);
          eat(scnr, `\'`);
          let ch = '';
          let literal = '';
          const fn = (x) => x !== LITERAL_DELIMITER && x !== CHAR_LF;
          while ((ch = takeChar(scnr, fn))) {
              if (ch === '\\') {
                  literal += readEscapeSequence(scnr);
              }
              else {
                  literal += ch;
              }
          }
          const current = scnr.currentChar();
          if (current === CHAR_LF || current === EOF) {
              emitError(2 /* UNTERMINATED_SINGLE_QUOTE_IN_PLACEHOLDER */, currentPosition(), 0);
              // TODO: Is it correct really?
              if (current === CHAR_LF) {
                  scnr.next();
                  eat(scnr, `\'`);
              }
              return literal;
          }
          eat(scnr, `\'`);
          return literal;
      }
      function readEscapeSequence(scnr) {
          const ch = scnr.currentChar();
          switch (ch) {
              case '\\':
              case `\'`:
                  scnr.next();
                  return `\\${ch}`;
              case 'u':
                  return readUnicodeEscapeSequence(scnr, ch, 4);
              case 'U':
                  return readUnicodeEscapeSequence(scnr, ch, 6);
              default:
                  emitError(3 /* UNKNOWN_ESCAPE_SEQUENCE */, currentPosition(), 0, ch);
                  return '';
          }
      }
      function readUnicodeEscapeSequence(scnr, unicode, digits) {
          eat(scnr, unicode);
          let sequence = '';
          for (let i = 0; i < digits; i++) {
              const ch = takeHexDigit(scnr);
              if (!ch) {
                  emitError(4 /* INVALID_UNICODE_ESCAPE_SEQUENCE */, currentPosition(), 0, `\\${unicode}${sequence}${scnr.currentChar()}`);
                  break;
              }
              sequence += ch;
          }
          return `\\${unicode}${sequence}`;
      }
      function readInvalidIdentifier(scnr) {
          skipSpaces(scnr);
          let ch = '';
          let identifiers = '';
          const closure = (ch) => ch !== "{" /* BraceLeft */ &&
              ch !== "}" /* BraceRight */ &&
              ch !== CHAR_SP &&
              ch !== CHAR_LF;
          while ((ch = takeChar(scnr, closure))) {
              identifiers += ch;
          }
          return identifiers;
      }
      function readLinkedModifier(scnr) {
          let ch = '';
          let name = '';
          while ((ch = takeIdentifierChar(scnr))) {
              name += ch;
          }
          return name;
      }
      function readLinkedRefer(scnr) {
          const fn = (detect = false, buf) => {
              const ch = scnr.currentChar();
              if (ch === "{" /* BraceLeft */ ||
                  ch === "%" /* Modulo */ ||
                  ch === "@" /* LinkedAlias */ ||
                  ch === "|" /* Pipe */ ||
                  !ch) {
                  return buf;
              }
              else if (ch === CHAR_SP) {
                  return buf;
              }
              else if (ch === CHAR_LF) {
                  buf += ch;
                  scnr.next();
                  return fn(detect, buf);
              }
              else {
                  buf += ch;
                  scnr.next();
                  return fn(true, buf);
              }
          };
          return fn(false, '');
      }
      function readPlural(scnr) {
          skipSpaces(scnr);
          const plural = eat(scnr, "|" /* Pipe */);
          skipSpaces(scnr);
          return plural;
      }
      // TODO: We need refactoring of token parsing ...
      function readTokenInPlaceholder(scnr, context) {
          let token = null;
          const ch = scnr.currentChar();
          switch (ch) {
              case "{" /* BraceLeft */:
                  if (context.braceNest >= 1) {
                      emitError(8 /* NOT_ALLOW_NEST_PLACEHOLDER */, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 2 /* BraceLeft */, "{" /* BraceLeft */);
                  skipSpaces(scnr);
                  context.braceNest++;
                  return token;
              case "}" /* BraceRight */:
                  if (context.braceNest > 0 &&
                      context.currentType === 2 /* BraceLeft */) {
                      emitError(7 /* EMPTY_PLACEHOLDER */, currentPosition(), 0);
                  }
                  scnr.next();
                  token = getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
                  context.braceNest--;
                  context.braceNest > 0 && skipSpaces(scnr);
                  if (context.inLinked && context.braceNest === 0) {
                      context.inLinked = false;
                  }
                  return token;
              case "@" /* LinkedAlias */:
                  if (context.braceNest > 0) {
                      emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                  }
                  token = readTokenInLinked(scnr, context) || getEndToken(context);
                  context.braceNest = 0;
                  return token;
              default:
                  let validNamedIdentifier = true;
                  let validListIdentifier = true;
                  let validLiteral = true;
                  if (isPluralStart(scnr)) {
                      if (context.braceNest > 0) {
                          emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                      }
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (context.braceNest > 0 &&
                      (context.currentType === 5 /* Named */ ||
                          context.currentType === 6 /* List */ ||
                          context.currentType === 7 /* Literal */)) {
                      emitError(6 /* UNTERMINATED_CLOSING_BRACE */, currentPosition(), 0);
                      context.braceNest = 0;
                      return readToken(scnr, context);
                  }
                  if ((validNamedIdentifier = isNamedIdentifierStart(scnr, context))) {
                      token = getToken(context, 5 /* Named */, readNamedIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validListIdentifier = isListIdentifierStart(scnr, context))) {
                      token = getToken(context, 6 /* List */, readListIdentifier(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if ((validLiteral = isLiteralStart(scnr, context))) {
                      token = getToken(context, 7 /* Literal */, readLiteral(scnr));
                      skipSpaces(scnr);
                      return token;
                  }
                  if (!validNamedIdentifier && !validListIdentifier && !validLiteral) {
                      // TODO: we should be re-designed invalid cases, when we will extend message syntax near the future ...
                      token = getToken(context, 13 /* InvalidPlace */, readInvalidIdentifier(scnr));
                      emitError(1 /* INVALID_TOKEN_IN_PLACEHOLDER */, currentPosition(), 0, token.value);
                      skipSpaces(scnr);
                      return token;
                  }
                  break;
          }
          return token;
      }
      // TODO: We need refactoring of token parsing ...
      function readTokenInLinked(scnr, context) {
          const { currentType } = context;
          let token = null;
          const ch = scnr.currentChar();
          if ((currentType === 8 /* LinkedAlias */ ||
              currentType === 9 /* LinkedDot */ ||
              currentType === 12 /* LinkedModifier */ ||
              currentType === 10 /* LinkedDelimiter */) &&
              (ch === CHAR_LF || ch === CHAR_SP)) {
              emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
          }
          switch (ch) {
              case "@" /* LinkedAlias */:
                  scnr.next();
                  token = getToken(context, 8 /* LinkedAlias */, "@" /* LinkedAlias */);
                  context.inLinked = true;
                  return token;
              case "." /* LinkedDot */:
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 9 /* LinkedDot */, "." /* LinkedDot */);
              case ":" /* LinkedDelimiter */:
                  skipSpaces(scnr);
                  scnr.next();
                  return getToken(context, 10 /* LinkedDelimiter */, ":" /* LinkedDelimiter */);
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isLinkedDotStart(scnr, context) ||
                      isLinkedDelimiterStart(scnr, context)) {
                      skipSpaces(scnr);
                      return readTokenInLinked(scnr, context);
                  }
                  if (isLinkedModifierStart(scnr, context)) {
                      skipSpaces(scnr);
                      return getToken(context, 12 /* LinkedModifier */, readLinkedModifier(scnr));
                  }
                  if (isLinkedReferStart(scnr, context)) {
                      skipSpaces(scnr);
                      if (ch === "{" /* BraceLeft */) {
                          // scan the placeholder
                          return readTokenInPlaceholder(scnr, context) || token;
                      }
                      else {
                          return getToken(context, 11 /* LinkedKey */, readLinkedRefer(scnr));
                      }
                  }
                  if (currentType === 8 /* LinkedAlias */) {
                      emitError(9 /* INVALID_LINKED_FORMAT */, currentPosition(), 0);
                  }
                  context.braceNest = 0;
                  context.inLinked = false;
                  return readToken(scnr, context);
          }
      }
      // TODO: We need refactoring of token parsing ...
      function readToken(scnr, context) {
          let token = { type: 14 /* EOF */ };
          if (context.braceNest > 0) {
              return readTokenInPlaceholder(scnr, context) || getEndToken(context);
          }
          if (context.inLinked) {
              return readTokenInLinked(scnr, context) || getEndToken(context);
          }
          const ch = scnr.currentChar();
          switch (ch) {
              case "{" /* BraceLeft */:
                  return readTokenInPlaceholder(scnr, context) || getEndToken(context);
              case "}" /* BraceRight */:
                  emitError(5 /* UNBALANCED_CLOSING_BRACE */, currentPosition(), 0);
                  scnr.next();
                  return getToken(context, 3 /* BraceRight */, "}" /* BraceRight */);
              case "@" /* LinkedAlias */:
                  return readTokenInLinked(scnr, context) || getEndToken(context);
              default:
                  if (isPluralStart(scnr)) {
                      token = getToken(context, 1 /* Pipe */, readPlural(scnr));
                      // reset
                      context.braceNest = 0;
                      context.inLinked = false;
                      return token;
                  }
                  if (isTextStart(scnr)) {
                      return getToken(context, 0 /* Text */, readText(scnr));
                  }
                  if (ch === "%" /* Modulo */) {
                      scnr.next();
                      return getToken(context, 4 /* Modulo */, "%" /* Modulo */);
                  }
                  break;
          }
          return token;
      }
      function nextToken() {
          const { currentType, offset, startLoc, endLoc } = _context;
          _context.lastType = currentType;
          _context.lastOffset = offset;
          _context.lastStartLoc = startLoc;
          _context.lastEndLoc = endLoc;
          _context.offset = currentOffset();
          _context.startLoc = currentPosition();
          if (_scnr.currentChar() === EOF) {
              return getToken(_context, 14 /* EOF */);
          }
          return readToken(_scnr, _context);
      }
      return {
          nextToken,
          currentOffset,
          currentPosition,
          context
      };
  }

  const ERROR_DOMAIN = 'parser';
  // Backslash backslash, backslash quote, uHHHH, UHHHHHH.
  const KNOWN_ESCAPES = /(?:\\\\|\\'|\\u([0-9a-fA-F]{4})|\\U([0-9a-fA-F]{6}))/g;
  function fromEscapeSequence(match, codePoint4, codePoint6) {
      switch (match) {
          case `\\\\`:
              return `\\`;
          case `\\\'`:
              return `\'`;
          default: {
              const codePoint = parseInt(codePoint4 || codePoint6, 16);
              if (codePoint <= 0xd7ff || codePoint >= 0xe000) {
                  return String.fromCodePoint(codePoint);
              }
              // invalid ...
              // Replace them with U+FFFD REPLACEMENT CHARACTER.
              return '�';
          }
      }
  }
  function createParser(options = {}) {
      const location = options.location !== false;
      const { onError } = options;
      function emitError(tokenzer, code, start, offset, ...args) {
          const end = tokenzer.currentPosition();
          end.offset += offset;
          end.column += offset;
          if (onError) {
              const loc = createLocation(start, end);
              const err = createCompileError(code, loc, {
                  domain: ERROR_DOMAIN,
                  args
              });
              onError(err);
          }
      }
      function startNode(type, offset, loc) {
          const node = {
              type,
              start: offset,
              end: offset
          };
          if (location) {
              node.loc = { start: loc, end: loc };
          }
          return node;
      }
      function endNode(node, offset, pos, type) {
          node.end = offset;
          if (type) {
              node.type = type;
          }
          if (location && node.loc) {
              node.loc.end = pos;
          }
      }
      function parseText(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(3 /* Text */, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseList(tokenizer, index) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(5 /* List */, offset, loc);
          node.index = parseInt(index, 10);
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseNamed(tokenizer, key) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(4 /* Named */, offset, loc);
          node.key = key;
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLiteral(tokenizer, value) {
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get brace left loc
          const node = startNode(9 /* Literal */, offset, loc);
          node.value = value.replace(KNOWN_ESCAPES, fromEscapeSequence);
          tokenizer.nextToken(); // skip brach right
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLinkedModifier(tokenizer) {
          const token = tokenizer.nextToken();
          const context = tokenizer.context();
          const { lastOffset: offset, lastStartLoc: loc } = context; // get linked dot loc
          const node = startNode(8 /* LinkedModifier */, offset, loc);
          if (token.type !== 12 /* LinkedModifier */) {
              // empty modifier
              emitError(tokenizer, 11 /* UNEXPECTED_EMPTY_LINKED_MODIFIER */, context.lastStartLoc, 0);
              node.value = '';
              endNode(node, offset, loc);
              return {
                  nextConsumeToken: token,
                  node
              };
          }
          // check token
          if (token.value == null) {
              emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
          }
          node.value = token.value || '';
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return {
              node
          };
      }
      function parseLinkedKey(tokenizer, value) {
          const context = tokenizer.context();
          const node = startNode(7 /* LinkedKey */, context.offset, context.startLoc);
          node.value = value;
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseLinked(tokenizer) {
          const context = tokenizer.context();
          const linkedNode = startNode(6 /* Linked */, context.offset, context.startLoc);
          let token = tokenizer.nextToken();
          if (token.type === 9 /* LinkedDot */) {
              const parsed = parseLinkedModifier(tokenizer);
              linkedNode.modifier = parsed.node;
              token = parsed.nextConsumeToken || tokenizer.nextToken();
          }
          // asset check token
          if (token.type !== 10 /* LinkedDelimiter */) {
              emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
          }
          token = tokenizer.nextToken();
          // skip brace left
          if (token.type === 2 /* BraceLeft */) {
              token = tokenizer.nextToken();
          }
          switch (token.type) {
              case 11 /* LinkedKey */:
                  if (token.value == null) {
                      emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                  }
                  linkedNode.key = parseLinkedKey(tokenizer, token.value || '');
                  break;
              case 5 /* Named */:
                  if (token.value == null) {
                      emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                  }
                  linkedNode.key = parseNamed(tokenizer, token.value || '');
                  break;
              case 6 /* List */:
                  if (token.value == null) {
                      emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                  }
                  linkedNode.key = parseList(tokenizer, token.value || '');
                  break;
              case 7 /* Literal */:
                  if (token.value == null) {
                      emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                  }
                  linkedNode.key = parseLiteral(tokenizer, token.value || '');
                  break;
              default:
                  // empty key
                  emitError(tokenizer, 12 /* UNEXPECTED_EMPTY_LINKED_KEY */, context.lastStartLoc, 0);
                  const nextContext = tokenizer.context();
                  const emptyLinkedKeyNode = startNode(7 /* LinkedKey */, nextContext.offset, nextContext.startLoc);
                  emptyLinkedKeyNode.value = '';
                  endNode(emptyLinkedKeyNode, nextContext.offset, nextContext.startLoc);
                  linkedNode.key = emptyLinkedKeyNode;
                  endNode(linkedNode, nextContext.offset, nextContext.startLoc);
                  return {
                      nextConsumeToken: token,
                      node: linkedNode
                  };
          }
          endNode(linkedNode, tokenizer.currentOffset(), tokenizer.currentPosition());
          return {
              node: linkedNode
          };
      }
      function parseMessage(tokenizer) {
          const context = tokenizer.context();
          const startOffset = context.currentType === 1 /* Pipe */
              ? tokenizer.currentOffset()
              : context.offset;
          const startLoc = context.currentType === 1 /* Pipe */
              ? context.endLoc
              : context.startLoc;
          const node = startNode(2 /* Message */, startOffset, startLoc);
          node.items = [];
          let nextToken = null;
          do {
              const token = nextToken || tokenizer.nextToken();
              nextToken = null;
              switch (token.type) {
                  case 0 /* Text */:
                      if (token.value == null) {
                          emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                      }
                      node.items.push(parseText(tokenizer, token.value || ''));
                      break;
                  case 6 /* List */:
                      if (token.value == null) {
                          emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                      }
                      node.items.push(parseList(tokenizer, token.value || ''));
                      break;
                  case 5 /* Named */:
                      if (token.value == null) {
                          emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                      }
                      node.items.push(parseNamed(tokenizer, token.value || ''));
                      break;
                  case 7 /* Literal */:
                      if (token.value == null) {
                          emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, getTokenCaption(token));
                      }
                      node.items.push(parseLiteral(tokenizer, token.value || ''));
                      break;
                  case 8 /* LinkedAlias */:
                      const parsed = parseLinked(tokenizer);
                      node.items.push(parsed.node);
                      nextToken = parsed.nextConsumeToken || null;
                      break;
              }
          } while (context.currentType !== 14 /* EOF */ &&
              context.currentType !== 1 /* Pipe */);
          // adjust message node loc
          const endOffset = context.currentType === 1 /* Pipe */
              ? context.lastOffset
              : tokenizer.currentOffset();
          const endLoc = context.currentType === 1 /* Pipe */
              ? context.lastEndLoc
              : tokenizer.currentPosition();
          endNode(node, endOffset, endLoc);
          return node;
      }
      function parsePlural(tokenizer, offset, loc, msgNode) {
          const context = tokenizer.context();
          let hasEmptyMessage = msgNode.items.length === 0;
          const node = startNode(1 /* Plural */, offset, loc);
          node.cases = [];
          node.cases.push(msgNode);
          do {
              const msg = parseMessage(tokenizer);
              if (!hasEmptyMessage) {
                  hasEmptyMessage = msg.items.length === 0;
              }
              node.cases.push(msg);
          } while (context.currentType !== 14 /* EOF */);
          if (hasEmptyMessage) {
              emitError(tokenizer, 10 /* MUST_HAVE_MESSAGES_IN_PLURAL */, loc, 0);
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      function parseResource(tokenizer) {
          const context = tokenizer.context();
          const { offset, startLoc } = context;
          const msgNode = parseMessage(tokenizer);
          if (context.currentType === 14 /* EOF */) {
              return msgNode;
          }
          else {
              return parsePlural(tokenizer, offset, startLoc, msgNode);
          }
      }
      function parse(source) {
          const tokenizer = createTokenizer(source, assign({}, options));
          const context = tokenizer.context();
          const node = startNode(0 /* Resource */, context.offset, context.startLoc);
          if (location && node.loc) {
              node.loc.source = source;
          }
          node.body = parseResource(tokenizer);
          // assert whether achieved to EOF
          if (context.currentType !== 14 /* EOF */) {
              emitError(tokenizer, 13 /* UNEXPECTED_LEXICAL_ANALYSIS */, context.lastStartLoc, 0, source[context.offset] || '');
          }
          endNode(node, tokenizer.currentOffset(), tokenizer.currentPosition());
          return node;
      }
      return { parse };
  }
  function getTokenCaption(token) {
      if (token.type === 14 /* EOF */) {
          return 'EOF';
      }
      const name = (token.value || '').replace(/\r?\n/gu, '\\n');
      return name.length > 10 ? name.slice(0, 9) + '…' : name;
  }

  function createTransformer(ast, options = {} // eslint-disable-line
  ) {
      const _context = {
          ast,
          helpers: new Set()
      };
      const context = () => _context;
      const helper = (name) => {
          _context.helpers.add(name);
          return name;
      };
      return { context, helper };
  }
  function traverseNodes(nodes, transformer) {
      for (let i = 0; i < nodes.length; i++) {
          traverseNode(nodes[i], transformer);
      }
  }
  function traverseNode(node, transformer) {
      // TODO: if we need pre-hook of transform, should be implemented to here
      switch (node.type) {
          case 1 /* Plural */:
              traverseNodes(node.cases, transformer);
              transformer.helper("plural" /* PLURAL */);
              break;
          case 2 /* Message */:
              traverseNodes(node.items, transformer);
              break;
          case 6 /* Linked */:
              const linked = node;
              traverseNode(linked.key, transformer);
              transformer.helper("linked" /* LINKED */);
              break;
          case 5 /* List */:
              transformer.helper("interpolate" /* INTERPOLATE */);
              transformer.helper("list" /* LIST */);
              break;
          case 4 /* Named */:
              transformer.helper("interpolate" /* INTERPOLATE */);
              transformer.helper("named" /* NAMED */);
              break;
      }
      // TODO: if we need post-hook of transform, should be implemented to here
  }
  // transform AST
  function transform(ast, options = {} // eslint-disable-line
  ) {
      const transformer = createTransformer(ast);
      transformer.helper("normalize" /* NORMALIZE */);
      // traverse
      ast.body && traverseNode(ast.body, transformer);
      // set meta information
      const context = transformer.context();
      ast.helpers = Array.from(context.helpers);
  }

  function createCodeGenerator(ast, options) {
      const { sourceMap, filename, breakLineCode, needIndent: _needIndent } = options;
      const _context = {
          source: ast.loc.source,
          filename,
          code: '',
          column: 1,
          line: 1,
          offset: 0,
          map: undefined,
          breakLineCode,
          needIndent: _needIndent,
          indentLevel: 0
      };
      const context = () => _context;
      function push(code, node) {
          _context.code += code;
      }
      function _newline(n, withBreakLine = true) {
          const _breakLineCode = withBreakLine ? breakLineCode : '';
          push(_needIndent ? _breakLineCode + `  `.repeat(n) : _breakLineCode);
      }
      function indent(withNewLine = true) {
          const level = ++_context.indentLevel;
          withNewLine && _newline(level);
      }
      function deindent(withNewLine = true) {
          const level = --_context.indentLevel;
          withNewLine && _newline(level);
      }
      function newline() {
          _newline(_context.indentLevel);
      }
      const helper = (key) => `_${key}`;
      const needIndent = () => _context.needIndent;
      return {
          context,
          push,
          indent,
          deindent,
          newline,
          helper,
          needIndent
      };
  }
  function generateLinkedNode(generator, node) {
      const { helper } = generator;
      generator.push(`${helper("linked" /* LINKED */)}(`);
      generateNode(generator, node.key);
      if (node.modifier) {
          generator.push(`, `);
          generateNode(generator, node.modifier);
      }
      generator.push(`)`);
  }
  function generateMessageNode(generator, node) {
      const { helper, needIndent } = generator;
      generator.push(`${helper("normalize" /* NORMALIZE */)}([`);
      generator.indent(needIndent());
      const length = node.items.length;
      for (let i = 0; i < length; i++) {
          generateNode(generator, node.items[i]);
          if (i === length - 1) {
              break;
          }
          generator.push(', ');
      }
      generator.deindent(needIndent());
      generator.push('])');
  }
  function generatePluralNode(generator, node) {
      const { helper, needIndent } = generator;
      if (node.cases.length > 1) {
          generator.push(`${helper("plural" /* PLURAL */)}([`);
          generator.indent(needIndent());
          const length = node.cases.length;
          for (let i = 0; i < length; i++) {
              generateNode(generator, node.cases[i]);
              if (i === length - 1) {
                  break;
              }
              generator.push(', ');
          }
          generator.deindent(needIndent());
          generator.push(`])`);
      }
  }
  function generateResource(generator, node) {
      if (node.body) {
          generateNode(generator, node.body);
      }
      else {
          generator.push('null');
      }
  }
  function generateNode(generator, node) {
      const { helper } = generator;
      switch (node.type) {
          case 0 /* Resource */:
              generateResource(generator, node);
              break;
          case 1 /* Plural */:
              generatePluralNode(generator, node);
              break;
          case 2 /* Message */:
              generateMessageNode(generator, node);
              break;
          case 6 /* Linked */:
              generateLinkedNode(generator, node);
              break;
          case 8 /* LinkedModifier */:
              generator.push(JSON.stringify(node.value), node);
              break;
          case 7 /* LinkedKey */:
              generator.push(JSON.stringify(node.value), node);
              break;
          case 5 /* List */:
              generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("list" /* LIST */)}(${node.index}))`, node);
              break;
          case 4 /* Named */:
              generator.push(`${helper("interpolate" /* INTERPOLATE */)}(${helper("named" /* NAMED */)}(${JSON.stringify(node.key)}))`, node);
              break;
          case 9 /* Literal */:
              generator.push(JSON.stringify(node.value), node);
              break;
          case 3 /* Text */:
              generator.push(JSON.stringify(node.value), node);
              break;
          default:
              {
                  throw new Error(`unhandled codegen node type: ${node.type}`);
              }
      }
  }
  // generate code from AST
  const generate = (ast, options = {} // eslint-disable-line
  ) => {
      const mode = isString(options.mode) ? options.mode : 'normal';
      const filename = isString(options.filename)
          ? options.filename
          : 'message.intl';
      const sourceMap = !!options.sourceMap;
      // prettier-ignore
      const breakLineCode = options.breakLineCode != null
          ? options.breakLineCode
          : mode === 'arrow'
              ? ';'
              : '\n';
      const needIndent = options.needIndent ? options.needIndent : mode !== 'arrow';
      const helpers = ast.helpers || [];
      const generator = createCodeGenerator(ast, {
          mode,
          filename,
          sourceMap,
          breakLineCode,
          needIndent
      });
      generator.push(mode === 'normal' ? `function __msg__ (ctx) {` : `(ctx) => {`);
      generator.indent(needIndent);
      if (helpers.length > 0) {
          generator.push(`const { ${helpers.map(s => `${s}: _${s}`).join(', ')} } = ctx`);
          generator.newline();
      }
      generator.push(`return `);
      generateNode(generator, ast);
      generator.deindent(needIndent);
      generator.push(`}`);
      const { code, map } = generator.context();
      return {
          ast,
          code,
          map: map ? map.toJSON() : undefined // eslint-disable-line @typescript-eslint/no-explicit-any
      };
  };

  function baseCompile(source, options = {}) {
      const assignedOptions = assign({}, options);
      // parse source codes
      const parser = createParser(assignedOptions);
      const ast = parser.parse(source);
      // transform ASTs
      transform(ast, assignedOptions);
      // generate javascript codes
      return generate(ast, assignedOptions);
  }

  const IntlifyDevToolsHooks = {
      I18nInit: 'i18n:init',
      FunctionTranslate: 'function:translate'
  };

  let devtools = null;
  function setDevToolsHook(hook) {
      devtools = hook;
  }
  function initI18nDevTools(i18n, version, meta) {
      // TODO: queue if devtools is undefined
      devtools &&
          devtools.emit(IntlifyDevToolsHooks.I18nInit, {
              timestamp: Date.now(),
              i18n,
              version,
              meta
          });
  }
  const translateDevTools = /* #__PURE__*/ createDevToolsHook(IntlifyDevToolsHooks.FunctionTranslate);
  function createDevToolsHook(hook) {
      return (payloads) => devtools && devtools.emit(hook, payloads);
  }

  /** @internal */
  const warnMessages$1 = {
      [0 /* NOT_FOUND_KEY */]: `Not found '{key}' key in '{locale}' locale messages.`,
      [1 /* FALLBACK_TO_TRANSLATE */]: `Fall back to translate '{key}' key with '{target}' locale.`,
      [2 /* CANNOT_FORMAT_NUMBER */]: `Cannot format a number value due to not supported Intl.NumberFormat.`,
      [3 /* FALLBACK_TO_NUMBER_FORMAT */]: `Fall back to number format '{key}' key with '{target}' locale.`,
      [4 /* CANNOT_FORMAT_DATE */]: `Cannot format a date value due to not supported Intl.DateTimeFormat.`,
      [5 /* FALLBACK_TO_DATE_FORMAT */]: `Fall back to datetime format '{key}' key with '{target}' locale.`
  };
  function getWarnMessage$1(code, ...args) {
      return format(warnMessages$1[code], ...args);
  }

  /**
   * Intlify core-base version
   * @internal
   */
  const VERSION$1 = '9.1.7';
  const NOT_REOSLVED = -1;
  const MISSING_RESOLVE_VALUE = '';
  function getDefaultLinkedModifiers() {
      return {
          upper: (val) => (isString(val) ? val.toUpperCase() : val),
          lower: (val) => (isString(val) ? val.toLowerCase() : val),
          // prettier-ignore
          capitalize: (val) => (isString(val)
              ? `${val.charAt(0).toLocaleUpperCase()}${val.substr(1)}`
              : val)
      };
  }
  let _compiler;
  function registerMessageCompiler(compiler) {
      _compiler = compiler;
  }
  // Additional Meta for Intlify DevTools
  let _additionalMeta = null;
  const setAdditionalMeta = /* #__PURE__*/ (meta) => {
      _additionalMeta = meta;
  };
  const getAdditionalMeta = /* #__PURE__*/ () => _additionalMeta;
  // ID for CoreContext
  let _cid = 0;
  function createCoreContext(options = {}) {
      // setup options
      const version = isString(options.version) ? options.version : VERSION$1;
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          isString(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const messages = isPlainObject(options.messages)
          ? options.messages
          : { [locale]: {} };
      const datetimeFormats = isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [locale]: {} };
      const numberFormats = isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [locale]: {} };
      const modifiers = assign({}, options.modifiers || {}, getDefaultLinkedModifiers());
      const pluralRules = options.pluralRules || {};
      const missing = isFunction(options.missing) ? options.missing : null;
      const missingWarn = isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
          ? options.missingWarn
          : true;
      const fallbackWarn = isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
          ? options.fallbackWarn
          : true;
      const fallbackFormat = !!options.fallbackFormat;
      const unresolving = !!options.unresolving;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      const processor = isPlainObject(options.processor) ? options.processor : null;
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      const escapeParameter = !!options.escapeParameter;
      const messageCompiler = isFunction(options.messageCompiler)
          ? options.messageCompiler
          : _compiler;
      const onWarn = isFunction(options.onWarn) ? options.onWarn : warn;
      // setup internal options
      const internalOptions = options;
      const __datetimeFormatters = isObject(internalOptions.__datetimeFormatters)
          ? internalOptions.__datetimeFormatters
          : new Map();
      const __numberFormatters = isObject(internalOptions.__numberFormatters)
          ? internalOptions.__numberFormatters
          : new Map();
      const __meta = isObject(internalOptions.__meta) ? internalOptions.__meta : {};
      _cid++;
      const context = {
          version,
          cid: _cid,
          locale,
          fallbackLocale,
          messages,
          datetimeFormats,
          numberFormats,
          modifiers,
          pluralRules,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackFormat,
          unresolving,
          postTranslation,
          processor,
          warnHtmlMessage,
          escapeParameter,
          messageCompiler,
          onWarn,
          __datetimeFormatters,
          __numberFormatters,
          __meta
      };
      // for vue-devtools timeline event
      {
          context.__v_emitter =
              internalOptions.__v_emitter != null
                  ? internalOptions.__v_emitter
                  : undefined;
      }
      // NOTE: experimental !!
      {
          initI18nDevTools(context, version, __meta);
      }
      return context;
  }
  /** @internal */
  function isTranslateFallbackWarn(fallback, key) {
      return fallback instanceof RegExp ? fallback.test(key) : fallback;
  }
  /** @internal */
  function isTranslateMissingWarn(missing, key) {
      return missing instanceof RegExp ? missing.test(key) : missing;
  }
  /** @internal */
  function handleMissing(context, key, locale, missingWarn, type) {
      const { missing, onWarn } = context;
      // for vue-devtools timeline event
      {
          const emitter = context.__v_emitter;
          if (emitter) {
              emitter.emit("missing" /* MISSING */, {
                  locale,
                  key,
                  type,
                  groupId: `${type}:${key}`
              });
          }
      }
      if (missing !== null) {
          const ret = missing(context, locale, key, type);
          return isString(ret) ? ret : key;
      }
      else {
          if (isTranslateMissingWarn(missingWarn, key)) {
              onWarn(getWarnMessage$1(0 /* NOT_FOUND_KEY */, { key, locale }));
          }
          return key;
      }
  }
  /** @internal */
  function getLocaleChain(ctx, fallback, start) {
      const context = ctx;
      if (!context.__localeChainCache) {
          context.__localeChainCache = new Map();
      }
      let chain = context.__localeChainCache.get(start);
      if (!chain) {
          chain = [];
          // first block defined by start
          let block = [start];
          // while any intervening block found
          while (isArray(block)) {
              block = appendBlockToChain(chain, block, fallback);
          }
          // prettier-ignore
          // last block defined by default
          const defaults = isArray(fallback)
              ? fallback
              : isPlainObject(fallback)
                  ? fallback['default']
                      ? fallback['default']
                      : null
                  : fallback;
          // convert defaults to array
          block = isString(defaults) ? [defaults] : defaults;
          if (isArray(block)) {
              appendBlockToChain(chain, block, false);
          }
          context.__localeChainCache.set(start, chain);
      }
      return chain;
  }
  function appendBlockToChain(chain, block, blocks) {
      let follow = true;
      for (let i = 0; i < block.length && isBoolean(follow); i++) {
          const locale = block[i];
          if (isString(locale)) {
              follow = appendLocaleToChain(chain, block[i], blocks);
          }
      }
      return follow;
  }
  function appendLocaleToChain(chain, locale, blocks) {
      let follow;
      const tokens = locale.split('-');
      do {
          const target = tokens.join('-');
          follow = appendItemToChain(chain, target, blocks);
          tokens.splice(-1, 1);
      } while (tokens.length && follow === true);
      return follow;
  }
  function appendItemToChain(chain, target, blocks) {
      let follow = false;
      if (!chain.includes(target)) {
          follow = true;
          if (target) {
              follow = target[target.length - 1] !== '!';
              const locale = target.replace(/!/g, '');
              chain.push(locale);
              if ((isArray(blocks) || isPlainObject(blocks)) &&
                  blocks[locale] // eslint-disable-line @typescript-eslint/no-explicit-any
              ) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  follow = blocks[locale];
              }
          }
      }
      return follow;
  }
  /** @internal */
  function updateFallbackLocale(ctx, locale, fallback) {
      const context = ctx;
      context.__localeChainCache = new Map();
      getLocaleChain(ctx, fallback, locale);
  }

  const RE_HTML_TAG = /<\/?[\w\s="/.':;#-\/]+>/;
  const WARN_MESSAGE = `Detected HTML in '{source}' message. Recommend not using HTML messages to avoid XSS.`;
  function checkHtmlMessage(source, options) {
      const warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      if (warnHtmlMessage && RE_HTML_TAG.test(source)) {
          warn(format(WARN_MESSAGE, { source }));
      }
  }
  const defaultOnCacheKey = (source) => source;
  let compileCache = Object.create(null);
  function compileToFunction(source, options = {}) {
      {
          // check HTML message
          checkHtmlMessage(source, options);
          // check caches
          const onCacheKey = options.onCacheKey || defaultOnCacheKey;
          const key = onCacheKey(source);
          const cached = compileCache[key];
          if (cached) {
              return cached;
          }
          // compile error detecting
          let occurred = false;
          const onError = options.onError || defaultOnError;
          options.onError = (err) => {
              occurred = true;
              onError(err);
          };
          // compile
          const { code } = baseCompile(source, options);
          // evaluate function
          const msg = new Function(`return ${code}`)();
          // if occurred compile error, don't cache
          return !occurred ? (compileCache[key] = msg) : msg;
      }
  }

  function createCoreError(code) {
      return createCompileError(code, null, { messages: errorMessages$1 } );
  }
  /** @internal */
  const errorMessages$1 = {
      [14 /* INVALID_ARGUMENT */]: 'Invalid arguments',
      [15 /* INVALID_DATE_ARGUMENT */]: 'The date provided is an invalid Date object.' +
          'Make sure your Date represents a valid date.',
      [16 /* INVALID_ISO_DATE_ARGUMENT */]: 'The argument provided is not a valid ISO date string'
  };

  const NOOP_MESSAGE_FUNCTION = () => '';
  const isMessageFunction = (val) => isFunction(val);
  // implementation of `translate` function
  function translate(context, ...args) {
      const { fallbackFormat, postTranslation, unresolving, fallbackLocale, messages } = context;
      const [key, options] = parseTranslateArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const escapeParameter = isBoolean(options.escapeParameter)
          ? options.escapeParameter
          : context.escapeParameter;
      const resolvedMessage = !!options.resolvedMessage;
      // prettier-ignore
      const defaultMsgOrKey = isString(options.default) || isBoolean(options.default) // default by function option
          ? !isBoolean(options.default)
              ? options.default
              : key
          : fallbackFormat // default by `fallbackFormat` option
              ? key
              : '';
      const enableDefaultMsg = fallbackFormat || defaultMsgOrKey !== '';
      const locale = isString(options.locale) ? options.locale : context.locale;
      // escape params
      escapeParameter && escapeParams(options);
      // resolve message format
      // eslint-disable-next-line prefer-const
      let [format, targetLocale, message] = !resolvedMessage
          ? resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn)
          : [
              key,
              locale,
              messages[locale] || {}
          ];
      // if you use default message, set it as message format!
      let cacheBaseKey = key;
      if (!resolvedMessage &&
          !(isString(format) || isMessageFunction(format))) {
          if (enableDefaultMsg) {
              format = defaultMsgOrKey;
              cacheBaseKey = format;
          }
      }
      // checking message format and target locale
      if (!resolvedMessage &&
          (!(isString(format) || isMessageFunction(format)) ||
              !isString(targetLocale))) {
          return unresolving ? NOT_REOSLVED : key;
      }
      if (isString(format) && context.messageCompiler == null) {
          warn(`The message format compilation is not supported in this build. ` +
              `Because message compiler isn't included. ` +
              `You need to pre-compilation all message format. ` +
              `So translate function return '${key}'.`);
          return key;
      }
      // setup compile error detecting
      let occurred = false;
      const errorDetector = () => {
          occurred = true;
      };
      // compile message format
      const msg = !isMessageFunction(format)
          ? compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector)
          : format;
      // if occurred compile error, return the message format
      if (occurred) {
          return format;
      }
      // evaluate message with context
      const ctxOptions = getMessageContextOptions(context, targetLocale, message, options);
      const msgContext = createMessageContext(ctxOptions);
      const messaged = evaluateMessage(context, msg, msgContext);
      // if use post translation option, proceed it with handler
      const ret = postTranslation ? postTranslation(messaged) : messaged;
      // NOTE: experimental !!
      {
          // prettier-ignore
          const payloads = {
              timestamp: Date.now(),
              key: isString(key)
                  ? key
                  : isMessageFunction(format)
                      ? format.key
                      : '',
              locale: targetLocale || (isMessageFunction(format)
                  ? format.locale
                  : ''),
              format: isString(format)
                  ? format
                  : isMessageFunction(format)
                      ? format.source
                      : '',
              message: ret
          };
          payloads.meta = assign({}, context.__meta, getAdditionalMeta() || {});
          translateDevTools(payloads);
      }
      return ret;
  }
  function escapeParams(options) {
      if (isArray(options.list)) {
          options.list = options.list.map(item => isString(item) ? escapeHtml(item) : item);
      }
      else if (isObject(options.named)) {
          Object.keys(options.named).forEach(key => {
              if (isString(options.named[key])) {
                  options.named[key] = escapeHtml(options.named[key]);
              }
          });
      }
  }
  function resolveMessageFormat(context, key, locale, fallbackLocale, fallbackWarn, missingWarn) {
      const { messages, onWarn } = context;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      let message = {};
      let targetLocale;
      let format = null;
      let from = locale;
      let to = null;
      const type = 'translate';
      for (let i = 0; i < locales.length; i++) {
          targetLocale = to = locales[i];
          if (locale !== targetLocale &&
              isTranslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage$1(1 /* FALLBACK_TO_TRANSLATE */, {
                  key,
                  target: targetLocale
              }));
          }
          // for vue-devtools timeline event
          if (locale !== targetLocale) {
              const emitter = context.__v_emitter;
              if (emitter) {
                  emitter.emit("fallback" /* FALBACK */, {
                      type,
                      key,
                      from,
                      to,
                      groupId: `${type}:${key}`
                  });
              }
          }
          message =
              messages[targetLocale] || {};
          // for vue-devtools timeline event
          let start = null;
          let startTag;
          let endTag;
          if (inBrowser) {
              start = window.performance.now();
              startTag = 'intlify-message-resolve-start';
              endTag = 'intlify-message-resolve-end';
              mark && mark(startTag);
          }
          if ((format = resolveValue(message, key)) === null) {
              // if null, resolve with object key path
              format = message[key]; // eslint-disable-line @typescript-eslint/no-explicit-any
          }
          // for vue-devtools timeline event
          if (inBrowser) {
              const end = window.performance.now();
              const emitter = context.__v_emitter;
              if (emitter && start && format) {
                  emitter.emit("message-resolve" /* MESSAGE_RESOLVE */, {
                      type: "message-resolve" /* MESSAGE_RESOLVE */,
                      key,
                      message: format,
                      time: end - start,
                      groupId: `${type}:${key}`
                  });
              }
              if (startTag && endTag && mark && measure) {
                  mark(endTag);
                  measure('intlify message resolve', startTag, endTag);
              }
          }
          if (isString(format) || isFunction(format))
              break;
          const missingRet = handleMissing(context, key, targetLocale, missingWarn, type);
          if (missingRet !== key) {
              format = missingRet;
          }
          from = to;
      }
      return [format, targetLocale, message];
  }
  function compileMessageFormat(context, key, targetLocale, format, cacheBaseKey, errorDetector) {
      const { messageCompiler, warnHtmlMessage } = context;
      if (isMessageFunction(format)) {
          const msg = format;
          msg.locale = msg.locale || targetLocale;
          msg.key = msg.key || key;
          return msg;
      }
      // for vue-devtools timeline event
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
          start = window.performance.now();
          startTag = 'intlify-message-compilation-start';
          endTag = 'intlify-message-compilation-end';
          mark && mark(startTag);
      }
      const msg = messageCompiler(format, getCompileOptions(context, targetLocale, cacheBaseKey, format, warnHtmlMessage, errorDetector));
      // for vue-devtools timeline event
      if (inBrowser) {
          const end = window.performance.now();
          const emitter = context.__v_emitter;
          if (emitter && start) {
              emitter.emit("message-compilation" /* MESSAGE_COMPILATION */, {
                  type: "message-compilation" /* MESSAGE_COMPILATION */,
                  message: format,
                  time: end - start,
                  groupId: `${'translate'}:${key}`
              });
          }
          if (startTag && endTag && mark && measure) {
              mark(endTag);
              measure('intlify message compilation', startTag, endTag);
          }
      }
      msg.locale = targetLocale;
      msg.key = key;
      msg.source = format;
      return msg;
  }
  function evaluateMessage(context, msg, msgCtx) {
      // for vue-devtools timeline event
      let start = null;
      let startTag;
      let endTag;
      if (inBrowser) {
          start = window.performance.now();
          startTag = 'intlify-message-evaluation-start';
          endTag = 'intlify-message-evaluation-end';
          mark && mark(startTag);
      }
      const messaged = msg(msgCtx);
      // for vue-devtools timeline event
      if (inBrowser) {
          const end = window.performance.now();
          const emitter = context.__v_emitter;
          if (emitter && start) {
              emitter.emit("message-evaluation" /* MESSAGE_EVALUATION */, {
                  type: "message-evaluation" /* MESSAGE_EVALUATION */,
                  value: messaged,
                  time: end - start,
                  groupId: `${'translate'}:${msg.key}`
              });
          }
          if (startTag && endTag && mark && measure) {
              mark(endTag);
              measure('intlify message evaluation', startTag, endTag);
          }
      }
      return messaged;
  }
  /** @internal */
  function parseTranslateArgs(...args) {
      const [arg1, arg2, arg3] = args;
      const options = {};
      if (!isString(arg1) && !isNumber(arg1) && !isMessageFunction(arg1)) {
          throw createCoreError(14 /* INVALID_ARGUMENT */);
      }
      // prettier-ignore
      const key = isNumber(arg1)
          ? String(arg1)
          : isMessageFunction(arg1)
              ? arg1
              : arg1;
      if (isNumber(arg2)) {
          options.plural = arg2;
      }
      else if (isString(arg2)) {
          options.default = arg2;
      }
      else if (isPlainObject(arg2) && !isEmptyObject(arg2)) {
          options.named = arg2;
      }
      else if (isArray(arg2)) {
          options.list = arg2;
      }
      if (isNumber(arg3)) {
          options.plural = arg3;
      }
      else if (isString(arg3)) {
          options.default = arg3;
      }
      else if (isPlainObject(arg3)) {
          assign(options, arg3);
      }
      return [key, options];
  }
  function getCompileOptions(context, locale, key, source, warnHtmlMessage, errorDetector) {
      return {
          warnHtmlMessage,
          onError: (err) => {
              errorDetector && errorDetector(err);
              {
                  const message = `Message compilation error: ${err.message}`;
                  const codeFrame = err.location &&
                      generateCodeFrame(source, err.location.start.offset, err.location.end.offset);
                  const emitter = context
                      .__v_emitter;
                  if (emitter) {
                      emitter.emit("compile-error" /* COMPILE_ERROR */, {
                          message: source,
                          error: err.message,
                          start: err.location && err.location.start.offset,
                          end: err.location && err.location.end.offset,
                          groupId: `${'translate'}:${key}`
                      });
                  }
                  console.error(codeFrame ? `${message}\n${codeFrame}` : message);
              }
          },
          onCacheKey: (source) => generateFormatCacheKey(locale, key, source)
      };
  }
  function getMessageContextOptions(context, locale, message, options) {
      const { modifiers, pluralRules } = context;
      const resolveMessage = (key) => {
          const val = resolveValue(message, key);
          if (isString(val)) {
              let occurred = false;
              const errorDetector = () => {
                  occurred = true;
              };
              const msg = compileMessageFormat(context, key, locale, val, key, errorDetector);
              return !occurred
                  ? msg
                  : NOOP_MESSAGE_FUNCTION;
          }
          else if (isMessageFunction(val)) {
              return val;
          }
          else {
              // TODO: should be implemented warning message
              return NOOP_MESSAGE_FUNCTION;
          }
      };
      const ctxOptions = {
          locale,
          modifiers,
          pluralRules,
          messages: resolveMessage
      };
      if (context.processor) {
          ctxOptions.processor = context.processor;
      }
      if (options.list) {
          ctxOptions.list = options.list;
      }
      if (options.named) {
          ctxOptions.named = options.named;
      }
      if (isNumber(options.plural)) {
          ctxOptions.pluralIndex = options.plural;
      }
      return ctxOptions;
  }

  const intlDefined = typeof Intl !== 'undefined';
  const Availabilities = {
      dateTimeFormat: intlDefined && typeof Intl.DateTimeFormat !== 'undefined',
      numberFormat: intlDefined && typeof Intl.NumberFormat !== 'undefined'
  };

  // implementation of `datetime` function
  function datetime(context, ...args) {
      const { datetimeFormats, unresolving, fallbackLocale, onWarn } = context;
      const { __datetimeFormatters } = context;
      if (!Availabilities.dateTimeFormat) {
          onWarn(getWarnMessage$1(4 /* CANNOT_FORMAT_DATE */));
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, overrides] = parseDateTimeArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.DateTimeFormat(locale).format(value);
      }
      // resolve format
      let datetimeFormat = {};
      let targetLocale;
      let format = null;
      let from = locale;
      let to = null;
      const type = 'datetime format';
      for (let i = 0; i < locales.length; i++) {
          targetLocale = to = locales[i];
          if (locale !== targetLocale &&
              isTranslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage$1(5 /* FALLBACK_TO_DATE_FORMAT */, {
                  key,
                  target: targetLocale
              }));
          }
          // for vue-devtools timeline event
          if (locale !== targetLocale) {
              const emitter = context.__v_emitter;
              if (emitter) {
                  emitter.emit("fallback" /* FALBACK */, {
                      type,
                      key,
                      from,
                      to,
                      groupId: `${type}:${key}`
                  });
              }
          }
          datetimeFormat =
              datetimeFormats[targetLocale] || {};
          format = datetimeFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, type);
          from = to;
      }
      // checking format and target locale
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(overrides)) {
          id = `${id}__${JSON.stringify(overrides)}`;
      }
      let formatter = __datetimeFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.DateTimeFormat(targetLocale, assign({}, format, overrides));
          __datetimeFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  /** @internal */
  function parseDateTimeArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let overrides = {};
      let value;
      if (isString(arg1)) {
          // Only allow ISO strings - other date formats are often supported,
          // but may cause different results in different browsers.
          if (!/\d{4}-\d{2}-\d{2}(T.*)?/.test(arg1)) {
              throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */);
          }
          value = new Date(arg1);
          try {
              // This will fail if the date is not valid
              value.toISOString();
          }
          catch (e) {
              throw createCoreError(16 /* INVALID_ISO_DATE_ARGUMENT */);
          }
      }
      else if (isDate(arg1)) {
          if (isNaN(arg1.getTime())) {
              throw createCoreError(15 /* INVALID_DATE_ARGUMENT */);
          }
          value = arg1;
      }
      else if (isNumber(arg1)) {
          value = arg1;
      }
      else {
          throw createCoreError(14 /* INVALID_ARGUMENT */);
      }
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          overrides = arg3;
      }
      if (isPlainObject(arg4)) {
          overrides = arg4;
      }
      return [options.key || '', value, options, overrides];
  }
  /** @internal */
  function clearDateTimeFormat(ctx, locale, format) {
      const context = ctx;
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context.__datetimeFormatters.has(id)) {
              continue;
          }
          context.__datetimeFormatters.delete(id);
      }
  }

  // implementation of `number` function
  function number(context, ...args) {
      const { numberFormats, unresolving, fallbackLocale, onWarn } = context;
      const { __numberFormatters } = context;
      if (!Availabilities.numberFormat) {
          onWarn(getWarnMessage$1(2 /* CANNOT_FORMAT_NUMBER */));
          return MISSING_RESOLVE_VALUE;
      }
      const [key, value, options, overrides] = parseNumberArgs(...args);
      const missingWarn = isBoolean(options.missingWarn)
          ? options.missingWarn
          : context.missingWarn;
      const fallbackWarn = isBoolean(options.fallbackWarn)
          ? options.fallbackWarn
          : context.fallbackWarn;
      const part = !!options.part;
      const locale = isString(options.locale) ? options.locale : context.locale;
      const locales = getLocaleChain(context, fallbackLocale, locale);
      if (!isString(key) || key === '') {
          return new Intl.NumberFormat(locale).format(value);
      }
      // resolve format
      let numberFormat = {};
      let targetLocale;
      let format = null;
      let from = locale;
      let to = null;
      const type = 'number format';
      for (let i = 0; i < locales.length; i++) {
          targetLocale = to = locales[i];
          if (locale !== targetLocale &&
              isTranslateFallbackWarn(fallbackWarn, key)) {
              onWarn(getWarnMessage$1(3 /* FALLBACK_TO_NUMBER_FORMAT */, {
                  key,
                  target: targetLocale
              }));
          }
          // for vue-devtools timeline event
          if (locale !== targetLocale) {
              const emitter = context.__v_emitter;
              if (emitter) {
                  emitter.emit("fallback" /* FALBACK */, {
                      type,
                      key,
                      from,
                      to,
                      groupId: `${type}:${key}`
                  });
              }
          }
          numberFormat =
              numberFormats[targetLocale] || {};
          format = numberFormat[key];
          if (isPlainObject(format))
              break;
          handleMissing(context, key, targetLocale, missingWarn, type);
          from = to;
      }
      // checking format and target locale
      if (!isPlainObject(format) || !isString(targetLocale)) {
          return unresolving ? NOT_REOSLVED : key;
      }
      let id = `${targetLocale}__${key}`;
      if (!isEmptyObject(overrides)) {
          id = `${id}__${JSON.stringify(overrides)}`;
      }
      let formatter = __numberFormatters.get(id);
      if (!formatter) {
          formatter = new Intl.NumberFormat(targetLocale, assign({}, format, overrides));
          __numberFormatters.set(id, formatter);
      }
      return !part ? formatter.format(value) : formatter.formatToParts(value);
  }
  /** @internal */
  function parseNumberArgs(...args) {
      const [arg1, arg2, arg3, arg4] = args;
      let options = {};
      let overrides = {};
      if (!isNumber(arg1)) {
          throw createCoreError(14 /* INVALID_ARGUMENT */);
      }
      const value = arg1;
      if (isString(arg2)) {
          options.key = arg2;
      }
      else if (isPlainObject(arg2)) {
          options = arg2;
      }
      if (isString(arg3)) {
          options.locale = arg3;
      }
      else if (isPlainObject(arg3)) {
          overrides = arg3;
      }
      if (isPlainObject(arg4)) {
          overrides = arg4;
      }
      return [options.key || '', value, options, overrides];
  }
  /** @internal */
  function clearNumberFormat(ctx, locale, format) {
      const context = ctx;
      for (const key in format) {
          const id = `${locale}__${key}`;
          if (!context.__numberFormatters.has(id)) {
              continue;
          }
          context.__numberFormatters.delete(id);
      }
  }

  /**
   * Vue I18n Version
   *
   * @remarks
   * Semver format. Same format as the package.json `version` field.
   *
   * @VueI18nGeneral
   */
  const VERSION = '9.1.7';
  /**
   * This is only called development env
   * istanbul-ignore-next
   */
  function initDev() {
      {
          {
              console.info(`You are running a development build of vue-i18n.\n` +
                  `Make sure to use the production build (*.prod.js) when deploying for production.`);
          }
      }
  }

  const warnMessages = {
      [6 /* FALLBACK_TO_ROOT */]: `Fall back to {type} '{key}' with root locale.`,
      [7 /* NOT_SUPPORTED_PRESERVE */]: `Not supported 'preserve'.`,
      [8 /* NOT_SUPPORTED_FORMATTER */]: `Not supported 'formatter'.`,
      [9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */]: `Not supported 'preserveDirectiveContent'.`,
      [10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */]: `Not supported 'getChoiceIndex'.`,
      [11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */]: `Component name legacy compatible: '{name}' -> 'i18n'`,
      [12 /* NOT_FOUND_PARENT_SCOPE */]: `Not found parent scope. use the global scope.`
  };
  function getWarnMessage(code, ...args) {
      return format(warnMessages[code], ...args);
  }

  function createI18nError(code, ...args) {
      return createCompileError(code, null, { messages: errorMessages, args } );
  }
  const errorMessages = {
      [14 /* UNEXPECTED_RETURN_TYPE */]: 'Unexpected return type in composer',
      [15 /* INVALID_ARGUMENT */]: 'Invalid argument',
      [16 /* MUST_BE_CALL_SETUP_TOP */]: 'Must be called at the top of a `setup` function',
      [17 /* NOT_INSLALLED */]: 'Need to install with `app.use` function',
      [22 /* UNEXPECTED_ERROR */]: 'Unexpected error',
      [18 /* NOT_AVAILABLE_IN_LEGACY_MODE */]: 'Not available in legacy mode',
      [19 /* REQUIRED_VALUE */]: `Required in value: {0}`,
      [20 /* INVALID_VALUE */]: `Invalid value`,
      [21 /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */]: `Cannot setup vue-devtools plugin`
  };

  const DEVTOOLS_META = '__INTLIFY_META__';
  const TransrateVNodeSymbol = makeSymbol('__transrateVNode');
  const DatetimePartsSymbol = makeSymbol('__datetimeParts');
  const NumberPartsSymbol = makeSymbol('__numberParts');
  const EnableEmitter = makeSymbol('__enableEmitter');
  const DisableEmitter = makeSymbol('__disableEmitter');
  const SetPluralRulesSymbol = makeSymbol('__setPluralRules');
  let composerID = 0;
  function defineCoreMissingHandler(missing) {
      return ((ctx, locale, key, type) => {
          return missing(locale, key, vue.getCurrentInstance() || undefined, type);
      });
  }
  function getLocaleMessages(locale, options) {
      const { messages, __i18n } = options;
      // prettier-ignore
      const ret = isPlainObject(messages)
          ? messages
          : isArray(__i18n)
              ? {}
              : { [locale]: {} };
      // merge locale messages of i18n custom block
      if (isArray(__i18n)) {
          __i18n.forEach(({ locale, resource }) => {
              if (locale) {
                  ret[locale] = ret[locale] || {};
                  deepCopy(resource, ret[locale]);
              }
              else {
                  deepCopy(resource, ret);
              }
          });
      }
      // handle messages for flat json
      if (options.flatJson) {
          for (const key in ret) {
              if (hasOwn(ret, key)) {
                  handleFlatJson(ret[key]);
              }
          }
      }
      return ret;
  }
  const isNotObjectOrIsArray = (val) => !isObject(val) || isArray(val);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function deepCopy(src, des) {
      // src and des should both be objects, and non of then can be a array
      if (isNotObjectOrIsArray(src) || isNotObjectOrIsArray(des)) {
          throw createI18nError(20 /* INVALID_VALUE */);
      }
      for (const key in src) {
          if (hasOwn(src, key)) {
              if (isNotObjectOrIsArray(src[key]) || isNotObjectOrIsArray(des[key])) {
                  // replace with src[key] when:
                  // src[key] or des[key] is not a object, or
                  // src[key] or des[key] is a array
                  des[key] = src[key];
              }
              else {
                  // src[key] and des[key] are both object, merge them
                  deepCopy(src[key], des[key]);
              }
          }
      }
  }
  // for Intlify DevTools
  const getMetaInfo = /* #__PURE__*/ () => {
      const instance = vue.getCurrentInstance();
      return instance && instance.type[DEVTOOLS_META] // eslint-disable-line @typescript-eslint/no-explicit-any
          ? { [DEVTOOLS_META]: instance.type[DEVTOOLS_META] } // eslint-disable-line @typescript-eslint/no-explicit-any
          : null;
  };
  /**
   * Create composer interface factory
   *
   * @internal
   */
  function createComposer(options = {}) {
      const { __root } = options;
      const _isGlobal = __root === undefined;
      let _inheritLocale = isBoolean(options.inheritLocale)
          ? options.inheritLocale
          : true;
      const _locale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale
          ? __root.locale.value
          : isString(options.locale)
              ? options.locale
              : 'en-US');
      const _fallbackLocale = vue.ref(
      // prettier-ignore
      __root && _inheritLocale
          ? __root.fallbackLocale.value
          : isString(options.fallbackLocale) ||
              isArray(options.fallbackLocale) ||
              isPlainObject(options.fallbackLocale) ||
              options.fallbackLocale === false
              ? options.fallbackLocale
              : _locale.value);
      const _messages = vue.ref(getLocaleMessages(_locale.value, options));
      const _datetimeFormats = vue.ref(isPlainObject(options.datetimeFormats)
          ? options.datetimeFormats
          : { [_locale.value]: {} });
      const _numberFormats = vue.ref(isPlainObject(options.numberFormats)
          ? options.numberFormats
          : { [_locale.value]: {} });
      // warning suppress options
      // prettier-ignore
      let _missingWarn = __root
          ? __root.missingWarn
          : isBoolean(options.missingWarn) || isRegExp(options.missingWarn)
              ? options.missingWarn
              : true;
      // prettier-ignore
      let _fallbackWarn = __root
          ? __root.fallbackWarn
          : isBoolean(options.fallbackWarn) || isRegExp(options.fallbackWarn)
              ? options.fallbackWarn
              : true;
      // prettier-ignore
      let _fallbackRoot = __root
          ? __root.fallbackRoot
          : isBoolean(options.fallbackRoot)
              ? options.fallbackRoot
              : true;
      // configure fall back to root
      let _fallbackFormat = !!options.fallbackFormat;
      // runtime missing
      let _missing = isFunction(options.missing) ? options.missing : null;
      let _runtimeMissing = isFunction(options.missing)
          ? defineCoreMissingHandler(options.missing)
          : null;
      // postTranslation handler
      let _postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : null;
      let _warnHtmlMessage = isBoolean(options.warnHtmlMessage)
          ? options.warnHtmlMessage
          : true;
      let _escapeParameter = !!options.escapeParameter;
      // custom linked modifiers
      // prettier-ignore
      const _modifiers = __root
          ? __root.modifiers
          : isPlainObject(options.modifiers)
              ? options.modifiers
              : {};
      // pluralRules
      let _pluralRules = options.pluralRules || (__root && __root.pluralRules);
      // runtime context
      // eslint-disable-next-line prefer-const
      let _context;
      function getCoreContext() {
          return createCoreContext({
              version: VERSION,
              locale: _locale.value,
              fallbackLocale: _fallbackLocale.value,
              messages: _messages.value,
              datetimeFormats: _datetimeFormats.value,
              numberFormats: _numberFormats.value,
              modifiers: _modifiers,
              pluralRules: _pluralRules,
              missing: _runtimeMissing === null ? undefined : _runtimeMissing,
              missingWarn: _missingWarn,
              fallbackWarn: _fallbackWarn,
              fallbackFormat: _fallbackFormat,
              unresolving: true,
              postTranslation: _postTranslation === null ? undefined : _postTranslation,
              warnHtmlMessage: _warnHtmlMessage,
              escapeParameter: _escapeParameter,
              __datetimeFormatters: isPlainObject(_context)
                  ? _context.__datetimeFormatters
                  : undefined,
              __numberFormatters: isPlainObject(_context)
                  ? _context.__numberFormatters
                  : undefined,
              __v_emitter: isPlainObject(_context)
                  ? _context.__v_emitter
                  : undefined,
              __meta: { framework: 'vue' }
          });
      }
      _context = getCoreContext();
      updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
      // track reactivity
      function trackReactivityValues() {
          return [
              _locale.value,
              _fallbackLocale.value,
              _messages.value,
              _datetimeFormats.value,
              _numberFormats.value
          ];
      }
      // locale
      const locale = vue.computed({
          get: () => _locale.value,
          set: val => {
              _locale.value = val;
              _context.locale = _locale.value;
          }
      });
      // fallbackLocale
      const fallbackLocale = vue.computed({
          get: () => _fallbackLocale.value,
          set: val => {
              _fallbackLocale.value = val;
              _context.fallbackLocale = _fallbackLocale.value;
              updateFallbackLocale(_context, _locale.value, val);
          }
      });
      // messages
      const messages = vue.computed(() => _messages.value);
      // datetimeFormats
      const datetimeFormats = vue.computed(() => _datetimeFormats.value);
      // numberFormats
      const numberFormats = vue.computed(() => _numberFormats.value);
      // getPostTranslationHandler
      function getPostTranslationHandler() {
          return isFunction(_postTranslation) ? _postTranslation : null;
      }
      // setPostTranslationHandler
      function setPostTranslationHandler(handler) {
          _postTranslation = handler;
          _context.postTranslation = handler;
      }
      // getMissingHandler
      function getMissingHandler() {
          return _missing;
      }
      // setMissingHandler
      function setMissingHandler(handler) {
          if (handler !== null) {
              _runtimeMissing = defineCoreMissingHandler(handler);
          }
          _missing = handler;
          _context.missing = _runtimeMissing;
      }
      function isResolvedTranslateMessage(type, arg // eslint-disable-line @typescript-eslint/no-explicit-any
      ) {
          return type !== 'translate' || !!arg.resolvedMessage === false;
      }
      function wrapWithDeps(fn, argumentParser, warnType, fallbackSuccess, fallbackFail, successCondition) {
          trackReactivityValues(); // track reactive dependency
          // NOTE: experimental !!
          let ret;
          {
              try {
                  setAdditionalMeta(getMetaInfo());
                  ret = fn(_context);
              }
              finally {
                  setAdditionalMeta(null);
              }
          }
          if (isNumber(ret) && ret === NOT_REOSLVED) {
              const [key, arg2] = argumentParser();
              if (__root &&
                  isString(key) &&
                  isResolvedTranslateMessage(warnType, arg2)) {
                  if (_fallbackRoot &&
                      (isTranslateFallbackWarn(_fallbackWarn, key) ||
                          isTranslateMissingWarn(_missingWarn, key))) {
                      warn(getWarnMessage(6 /* FALLBACK_TO_ROOT */, {
                          key,
                          type: warnType
                      }));
                  }
                  // for vue-devtools timeline event
                  {
                      const { __v_emitter: emitter } = _context;
                      if (emitter && _fallbackRoot) {
                          emitter.emit("fallback" /* FALBACK */, {
                              type: warnType,
                              key,
                              to: 'global',
                              groupId: `${warnType}:${key}`
                          });
                      }
                  }
              }
              return __root && _fallbackRoot
                  ? fallbackSuccess(__root)
                  : fallbackFail(key);
          }
          else if (successCondition(ret)) {
              return ret;
          }
          else {
              /* istanbul ignore next */
              throw createI18nError(14 /* UNEXPECTED_RETURN_TYPE */);
          }
      }
      // t
      function t(...args) {
          return wrapWithDeps(context => translate(context, ...args), () => parseTranslateArgs(...args), 'translate', root => root.t(...args), key => key, val => isString(val));
      }
      // rt
      function rt(...args) {
          const [arg1, arg2, arg3] = args;
          if (arg3 && !isObject(arg3)) {
              throw createI18nError(15 /* INVALID_ARGUMENT */);
          }
          return t(...[arg1, arg2, assign({ resolvedMessage: true }, arg3 || {})]);
      }
      // d
      function d(...args) {
          return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args), 'datetime format', root => root.d(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
      }
      // n
      function n(...args) {
          return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args), 'number format', root => root.n(...args), () => MISSING_RESOLVE_VALUE, val => isString(val));
      }
      // for custom processor
      function normalize(values) {
          return values.map(val => isString(val) ? vue.createVNode(vue.Text, null, val, 0) : val);
      }
      const interpolate = (val) => val;
      const processor = {
          normalize,
          interpolate,
          type: 'vnode'
      };
      // transrateVNode, using for `i18n-t` component
      function transrateVNode(...args) {
          return wrapWithDeps(context => {
              let ret;
              const _context = context;
              try {
                  _context.processor = processor;
                  ret = translate(_context, ...args);
              }
              finally {
                  _context.processor = null;
              }
              return ret;
          }, () => parseTranslateArgs(...args), 'translate', 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          root => root[TransrateVNodeSymbol](...args), key => [vue.createVNode(vue.Text, null, key, 0)], val => isArray(val));
      }
      // numberParts, using for `i18n-n` component
      function numberParts(...args) {
          return wrapWithDeps(context => number(context, ...args), () => parseNumberArgs(...args), 'number format', 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          root => root[NumberPartsSymbol](...args), () => [], val => isString(val) || isArray(val));
      }
      // datetimeParts, using for `i18n-d` component
      function datetimeParts(...args) {
          return wrapWithDeps(context => datetime(context, ...args), () => parseDateTimeArgs(...args), 'datetime format', 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          root => root[DatetimePartsSymbol](...args), () => [], val => isString(val) || isArray(val));
      }
      function setPluralRules(rules) {
          _pluralRules = rules;
          _context.pluralRules = _pluralRules;
      }
      // te
      function te(key, locale) {
          const targetLocale = isString(locale) ? locale : _locale.value;
          const message = getLocaleMessage(targetLocale);
          return resolveValue(message, key) !== null;
      }
      function resolveMessages(key) {
          let messages = null;
          const locales = getLocaleChain(_context, _fallbackLocale.value, _locale.value);
          for (let i = 0; i < locales.length; i++) {
              const targetLocaleMessages = _messages.value[locales[i]] || {};
              const messageValue = resolveValue(targetLocaleMessages, key);
              if (messageValue != null) {
                  messages = messageValue;
                  break;
              }
          }
          return messages;
      }
      // tm
      function tm(key) {
          const messages = resolveMessages(key);
          // prettier-ignore
          return messages != null
              ? messages
              : __root
                  ? __root.tm(key) || {}
                  : {};
      }
      // getLocaleMessage
      function getLocaleMessage(locale) {
          return (_messages.value[locale] || {});
      }
      // setLocaleMessage
      function setLocaleMessage(locale, message) {
          _messages.value[locale] = message;
          _context.messages = _messages.value;
      }
      // mergeLocaleMessage
      function mergeLocaleMessage(locale, message) {
          _messages.value[locale] = _messages.value[locale] || {};
          deepCopy(message, _messages.value[locale]);
          _context.messages = _messages.value;
      }
      // getDateTimeFormat
      function getDateTimeFormat(locale) {
          return _datetimeFormats.value[locale] || {};
      }
      // setDateTimeFormat
      function setDateTimeFormat(locale, format) {
          _datetimeFormats.value[locale] = format;
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      }
      // mergeDateTimeFormat
      function mergeDateTimeFormat(locale, format) {
          _datetimeFormats.value[locale] = assign(_datetimeFormats.value[locale] || {}, format);
          _context.datetimeFormats = _datetimeFormats.value;
          clearDateTimeFormat(_context, locale, format);
      }
      // getNumberFormat
      function getNumberFormat(locale) {
          return _numberFormats.value[locale] || {};
      }
      // setNumberFormat
      function setNumberFormat(locale, format) {
          _numberFormats.value[locale] = format;
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      }
      // mergeNumberFormat
      function mergeNumberFormat(locale, format) {
          _numberFormats.value[locale] = assign(_numberFormats.value[locale] || {}, format);
          _context.numberFormats = _numberFormats.value;
          clearNumberFormat(_context, locale, format);
      }
      // for debug
      composerID++;
      // watch root locale & fallbackLocale
      if (__root) {
          vue.watch(__root.locale, (val) => {
              if (_inheritLocale) {
                  _locale.value = val;
                  _context.locale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
          vue.watch(__root.fallbackLocale, (val) => {
              if (_inheritLocale) {
                  _fallbackLocale.value = val;
                  _context.fallbackLocale = val;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          });
      }
      // define composition API!
      const composer = {
          id: composerID,
          locale,
          fallbackLocale,
          get inheritLocale() {
              return _inheritLocale;
          },
          set inheritLocale(val) {
              _inheritLocale = val;
              if (val && __root) {
                  _locale.value = __root.locale.value;
                  _fallbackLocale.value = __root.fallbackLocale.value;
                  updateFallbackLocale(_context, _locale.value, _fallbackLocale.value);
              }
          },
          get availableLocales() {
              return Object.keys(_messages.value).sort();
          },
          messages,
          datetimeFormats,
          numberFormats,
          get modifiers() {
              return _modifiers;
          },
          get pluralRules() {
              return _pluralRules || {};
          },
          get isGlobal() {
              return _isGlobal;
          },
          get missingWarn() {
              return _missingWarn;
          },
          set missingWarn(val) {
              _missingWarn = val;
              _context.missingWarn = _missingWarn;
          },
          get fallbackWarn() {
              return _fallbackWarn;
          },
          set fallbackWarn(val) {
              _fallbackWarn = val;
              _context.fallbackWarn = _fallbackWarn;
          },
          get fallbackRoot() {
              return _fallbackRoot;
          },
          set fallbackRoot(val) {
              _fallbackRoot = val;
          },
          get fallbackFormat() {
              return _fallbackFormat;
          },
          set fallbackFormat(val) {
              _fallbackFormat = val;
              _context.fallbackFormat = _fallbackFormat;
          },
          get warnHtmlMessage() {
              return _warnHtmlMessage;
          },
          set warnHtmlMessage(val) {
              _warnHtmlMessage = val;
              _context.warnHtmlMessage = val;
          },
          get escapeParameter() {
              return _escapeParameter;
          },
          set escapeParameter(val) {
              _escapeParameter = val;
              _context.escapeParameter = val;
          },
          t,
          rt,
          d,
          n,
          te,
          tm,
          getLocaleMessage,
          setLocaleMessage,
          mergeLocaleMessage,
          getDateTimeFormat,
          setDateTimeFormat,
          mergeDateTimeFormat,
          getNumberFormat,
          setNumberFormat,
          mergeNumberFormat,
          getPostTranslationHandler,
          setPostTranslationHandler,
          getMissingHandler,
          setMissingHandler,
          [TransrateVNodeSymbol]: transrateVNode,
          [NumberPartsSymbol]: numberParts,
          [DatetimePartsSymbol]: datetimeParts,
          [SetPluralRulesSymbol]: setPluralRules
      };
      // for vue-devtools timeline event
      {
          composer[EnableEmitter] = (emitter) => {
              _context.__v_emitter = emitter;
          };
          composer[DisableEmitter] = () => {
              _context.__v_emitter = undefined;
          };
      }
      return composer;
  }

  /**
   * Convert to I18n Composer Options from VueI18n Options
   *
   * @internal
   */
  function convertComposerOptions(options) {
      const locale = isString(options.locale) ? options.locale : 'en-US';
      const fallbackLocale = isString(options.fallbackLocale) ||
          isArray(options.fallbackLocale) ||
          isPlainObject(options.fallbackLocale) ||
          options.fallbackLocale === false
          ? options.fallbackLocale
          : locale;
      const missing = isFunction(options.missing) ? options.missing : undefined;
      const missingWarn = isBoolean(options.silentTranslationWarn) ||
          isRegExp(options.silentTranslationWarn)
          ? !options.silentTranslationWarn
          : true;
      const fallbackWarn = isBoolean(options.silentFallbackWarn) ||
          isRegExp(options.silentFallbackWarn)
          ? !options.silentFallbackWarn
          : true;
      const fallbackRoot = isBoolean(options.fallbackRoot)
          ? options.fallbackRoot
          : true;
      const fallbackFormat = !!options.formatFallbackMessages;
      const modifiers = isPlainObject(options.modifiers) ? options.modifiers : {};
      const pluralizationRules = options.pluralizationRules;
      const postTranslation = isFunction(options.postTranslation)
          ? options.postTranslation
          : undefined;
      const warnHtmlMessage = isString(options.warnHtmlInMessage)
          ? options.warnHtmlInMessage !== 'off'
          : true;
      const escapeParameter = !!options.escapeParameterHtml;
      const inheritLocale = isBoolean(options.sync) ? options.sync : true;
      if (options.formatter) {
          warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */));
      }
      if (options.preserveDirectiveContent) {
          warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
      }
      let messages = options.messages;
      if (isPlainObject(options.sharedMessages)) {
          const sharedMessages = options.sharedMessages;
          const locales = Object.keys(sharedMessages);
          messages = locales.reduce((messages, locale) => {
              const message = messages[locale] || (messages[locale] = {});
              assign(message, sharedMessages[locale]);
              return messages;
          }, (messages || {}));
      }
      const { __i18n, __root } = options;
      const datetimeFormats = options.datetimeFormats;
      const numberFormats = options.numberFormats;
      const flatJson = options.flatJson;
      return {
          locale,
          fallbackLocale,
          messages,
          flatJson,
          datetimeFormats,
          numberFormats,
          missing,
          missingWarn,
          fallbackWarn,
          fallbackRoot,
          fallbackFormat,
          modifiers,
          pluralRules: pluralizationRules,
          postTranslation,
          warnHtmlMessage,
          escapeParameter,
          inheritLocale,
          __i18n,
          __root
      };
  }
  /**
   * create VueI18n interface factory
   *
   * @internal
   */
  function createVueI18n(options = {}) {
      const composer = createComposer(convertComposerOptions(options));
      // defines VueI18n
      const vueI18n = {
          // id
          id: composer.id,
          // locale
          get locale() {
              return composer.locale.value;
          },
          set locale(val) {
              composer.locale.value = val;
          },
          // fallbackLocale
          get fallbackLocale() {
              return composer.fallbackLocale.value;
          },
          set fallbackLocale(val) {
              composer.fallbackLocale.value = val;
          },
          // messages
          get messages() {
              return composer.messages.value;
          },
          // datetimeFormats
          get datetimeFormats() {
              return composer.datetimeFormats.value;
          },
          // numberFormats
          get numberFormats() {
              return composer.numberFormats.value;
          },
          // availableLocales
          get availableLocales() {
              return composer.availableLocales;
          },
          // formatter
          get formatter() {
              warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */));
              // dummy
              return {
                  interpolate() {
                      return [];
                  }
              };
          },
          set formatter(val) {
              warn(getWarnMessage(8 /* NOT_SUPPORTED_FORMATTER */));
          },
          // missing
          get missing() {
              return composer.getMissingHandler();
          },
          set missing(handler) {
              composer.setMissingHandler(handler);
          },
          // silentTranslationWarn
          get silentTranslationWarn() {
              return isBoolean(composer.missingWarn)
                  ? !composer.missingWarn
                  : composer.missingWarn;
          },
          set silentTranslationWarn(val) {
              composer.missingWarn = isBoolean(val) ? !val : val;
          },
          // silentFallbackWarn
          get silentFallbackWarn() {
              return isBoolean(composer.fallbackWarn)
                  ? !composer.fallbackWarn
                  : composer.fallbackWarn;
          },
          set silentFallbackWarn(val) {
              composer.fallbackWarn = isBoolean(val) ? !val : val;
          },
          // modifiers
          get modifiers() {
              return composer.modifiers;
          },
          // formatFallbackMessages
          get formatFallbackMessages() {
              return composer.fallbackFormat;
          },
          set formatFallbackMessages(val) {
              composer.fallbackFormat = val;
          },
          // postTranslation
          get postTranslation() {
              return composer.getPostTranslationHandler();
          },
          set postTranslation(handler) {
              composer.setPostTranslationHandler(handler);
          },
          // sync
          get sync() {
              return composer.inheritLocale;
          },
          set sync(val) {
              composer.inheritLocale = val;
          },
          // warnInHtmlMessage
          get warnHtmlInMessage() {
              return composer.warnHtmlMessage ? 'warn' : 'off';
          },
          set warnHtmlInMessage(val) {
              composer.warnHtmlMessage = val !== 'off';
          },
          // escapeParameterHtml
          get escapeParameterHtml() {
              return composer.escapeParameter;
          },
          set escapeParameterHtml(val) {
              composer.escapeParameter = val;
          },
          // preserveDirectiveContent
          get preserveDirectiveContent() {
              warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
              return true;
          },
          set preserveDirectiveContent(val) {
              warn(getWarnMessage(9 /* NOT_SUPPORTED_PRESERVE_DIRECTIVE */));
          },
          // pluralizationRules
          get pluralizationRules() {
              return composer.pluralRules || {};
          },
          // for internal
          __composer: composer,
          // t
          t(...args) {
              const [arg1, arg2, arg3] = args;
              const options = {};
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw createI18nError(15 /* INVALID_ARGUMENT */);
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          rt(...args) {
              return composer.rt(...args);
          },
          // tc
          tc(...args) {
              const [arg1, arg2, arg3] = args;
              const options = { plural: 1 };
              let list = null;
              let named = null;
              if (!isString(arg1)) {
                  throw createI18nError(15 /* INVALID_ARGUMENT */);
              }
              const key = arg1;
              if (isString(arg2)) {
                  options.locale = arg2;
              }
              else if (isNumber(arg2)) {
                  options.plural = arg2;
              }
              else if (isArray(arg2)) {
                  list = arg2;
              }
              else if (isPlainObject(arg2)) {
                  named = arg2;
              }
              if (isString(arg3)) {
                  options.locale = arg3;
              }
              else if (isArray(arg3)) {
                  list = arg3;
              }
              else if (isPlainObject(arg3)) {
                  named = arg3;
              }
              return composer.t(key, list || named || {}, options);
          },
          // te
          te(key, locale) {
              return composer.te(key, locale);
          },
          // tm
          tm(key) {
              return composer.tm(key);
          },
          // getLocaleMessage
          getLocaleMessage(locale) {
              return composer.getLocaleMessage(locale);
          },
          // setLocaleMessage
          setLocaleMessage(locale, message) {
              composer.setLocaleMessage(locale, message);
          },
          // mergeLocaleMessage
          mergeLocaleMessage(locale, message) {
              composer.mergeLocaleMessage(locale, message);
          },
          // d
          d(...args) {
              return composer.d(...args);
          },
          // getDateTimeFormat
          getDateTimeFormat(locale) {
              return composer.getDateTimeFormat(locale);
          },
          // setDateTimeFormat
          setDateTimeFormat(locale, format) {
              composer.setDateTimeFormat(locale, format);
          },
          // mergeDateTimeFormat
          mergeDateTimeFormat(locale, format) {
              composer.mergeDateTimeFormat(locale, format);
          },
          // n
          n(...args) {
              return composer.n(...args);
          },
          // getNumberFormat
          getNumberFormat(locale) {
              return composer.getNumberFormat(locale);
          },
          // setNumberFormat
          setNumberFormat(locale, format) {
              composer.setNumberFormat(locale, format);
          },
          // mergeNumberFormat
          mergeNumberFormat(locale, format) {
              composer.mergeNumberFormat(locale, format);
          },
          // getChoiceIndex
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          getChoiceIndex(choice, choicesLength) {
              warn(getWarnMessage(10 /* NOT_SUPPORTED_GET_CHOICE_INDEX */));
              return -1;
          },
          // for internal
          __onComponentInstanceCreated(target) {
              const { componentInstanceCreatedListener } = options;
              if (componentInstanceCreatedListener) {
                  componentInstanceCreatedListener(target, vueI18n);
              }
          }
      };
      // for vue-devtools timeline event
      {
          vueI18n.__enableEmitter = (emitter) => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const __composer = composer;
              __composer[EnableEmitter] && __composer[EnableEmitter](emitter);
          };
          vueI18n.__disableEmitter = () => {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const __composer = composer;
              __composer[DisableEmitter] && __composer[DisableEmitter]();
          };
      }
      return vueI18n;
  }

  const baseFormatProps = {
      tag: {
          type: [String, Object]
      },
      locale: {
          type: String
      },
      scope: {
          type: String,
          validator: (val) => val === 'parent' || val === 'global',
          default: 'parent'
      },
      i18n: {
          type: Object
      }
  };

  /**
   * Translation Component
   *
   * @remarks
   * See the following items for property about details
   *
   * @VueI18nSee [TranslationProps](component#translationprops)
   * @VueI18nSee [BaseFormatProps](component#baseformatprops)
   * @VueI18nSee [Component Interpolation](../guide/advanced/component)
   *
   * @example
   * ```html
   * <div id="app">
   *   <!-- ... -->
   *   <i18n path="term" tag="label" for="tos">
   *     <a :href="url" target="_blank">{{ $t('tos') }}</a>
   *   </i18n>
   *   <!-- ... -->
   * </div>
   * ```
   * ```js
   * import { createApp } from 'vue'
   * import { createI18n } from 'vue-i18n'
   *
   * const messages = {
   *   en: {
   *     tos: 'Term of Service',
   *     term: 'I accept xxx {0}.'
   *   },
   *   ja: {
   *     tos: '利用規約',
   *     term: '私は xxx の{0}に同意します。'
   *   }
   * }
   *
   * const i18n = createI18n({
   *   locale: 'en',
   *   messages
   * })
   *
   * const app = createApp({
   *   data: {
   *     url: '/term'
   *   }
   * }).use(i18n).mount('#app')
   * ```
   *
   * @VueI18nComponent
   */
  const Translation = {
      /* eslint-disable */
      name: 'i18n-t',
      props: assign({
          keypath: {
              type: String,
              required: true
          },
          plural: {
              type: [Number, String],
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              validator: (val) => isNumber(val) || !isNaN(val)
          }
      }, baseFormatProps),
      /* eslint-enable */
      setup(props, context) {
          const { slots, attrs } = context;
          const i18n = props.i18n ||
              useI18n({ useScope: props.scope });
          const keys = Object.keys(slots).filter(key => key !== '_');
          return () => {
              const options = {};
              if (props.locale) {
                  options.locale = props.locale;
              }
              if (props.plural !== undefined) {
                  options.plural = isString(props.plural) ? +props.plural : props.plural;
              }
              const arg = getInterpolateArg(context, keys);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const children = i18n[TransrateVNodeSymbol](props.keypath, arg, options);
              const assignedAttrs = assign({}, attrs);
              // prettier-ignore
              return isString(props.tag)
                  ? vue.h(props.tag, assignedAttrs, children)
                  : isObject(props.tag)
                      ? vue.h(props.tag, assignedAttrs, children)
                      : vue.h(vue.Fragment, assignedAttrs, children);
          };
      }
  };
  function getInterpolateArg({ slots }, keys) {
      if (keys.length === 1 && keys[0] === 'default') {
          // default slot only
          return slots.default ? slots.default() : [];
      }
      else {
          // named slots
          return keys.reduce((arg, key) => {
              const slot = slots[key];
              if (slot) {
                  arg[key] = slot();
              }
              return arg;
          }, {});
      }
  }

  function renderFormatter(props, context, slotKeys, partFormatter) {
      const { slots, attrs } = context;
      return () => {
          const options = { part: true };
          let overrides = {};
          if (props.locale) {
              options.locale = props.locale;
          }
          if (isString(props.format)) {
              options.key = props.format;
          }
          else if (isObject(props.format)) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              if (isString(props.format.key)) {
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  options.key = props.format.key;
              }
              // Filter out number format options only
              overrides = Object.keys(props.format).reduce((options, prop) => {
                  return slotKeys.includes(prop)
                      ? assign({}, options, { [prop]: props.format[prop] }) // eslint-disable-line @typescript-eslint/no-explicit-any
                      : options;
              }, {});
          }
          const parts = partFormatter(...[props.value, options, overrides]);
          let children = [options.key];
          if (isArray(parts)) {
              children = parts.map((part, index) => {
                  const slot = slots[part.type];
                  return slot
                      ? slot({ [part.type]: part.value, index, parts })
                      : [part.value];
              });
          }
          else if (isString(parts)) {
              children = [parts];
          }
          const assignedAttrs = assign({}, attrs);
          // prettier-ignore
          return isString(props.tag)
              ? vue.h(props.tag, assignedAttrs, children)
              : isObject(props.tag)
                  ? vue.h(props.tag, assignedAttrs, children)
                  : vue.h(vue.Fragment, assignedAttrs, children);
      };
  }

  const NUMBER_FORMAT_KEYS = [
      'localeMatcher',
      'style',
      'unit',
      'unitDisplay',
      'currency',
      'currencyDisplay',
      'useGrouping',
      'numberingSystem',
      'minimumIntegerDigits',
      'minimumFractionDigits',
      'maximumFractionDigits',
      'minimumSignificantDigits',
      'maximumSignificantDigits',
      'notation',
      'formatMatcher'
  ];
  /**
   * Number Format Component
   *
   * @remarks
   * See the following items for property about details
   *
   * @VueI18nSee [FormattableProps](component#formattableprops)
   * @VueI18nSee [BaseFormatProps](component#baseformatprops)
   * @VueI18nSee [Custom Formatting](../guide/essentials/number#custom-formatting)
   *
   * @VueI18nDanger
   * Not supported IE, due to no support `Intl.NumberFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat/formatToParts)
   *
   * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-numberformat)
   *
   * @VueI18nComponent
   */
  const NumberFormat = {
      /* eslint-disable */
      name: 'i18n-n',
      props: assign({
          value: {
              type: Number,
              required: true
          },
          format: {
              type: [String, Object]
          }
      }, baseFormatProps),
      /* eslint-enable */
      setup(props, context) {
          const i18n = props.i18n ||
              useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, NUMBER_FORMAT_KEYS, (...args) => 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          i18n[NumberPartsSymbol](...args));
      }
  };

  const DATETIME_FORMAT_KEYS = [
      'dateStyle',
      'timeStyle',
      'fractionalSecondDigits',
      'calendar',
      'dayPeriod',
      'numberingSystem',
      'localeMatcher',
      'timeZone',
      'hour12',
      'hourCycle',
      'formatMatcher',
      'weekday',
      'era',
      'year',
      'month',
      'day',
      'hour',
      'minute',
      'second',
      'timeZoneName'
  ];
  /**
   * Datetime Format Component
   *
   * @remarks
   * See the following items for property about details
   *
   * @VueI18nSee [FormattableProps](component#formattableprops)
   * @VueI18nSee [BaseFormatProps](component#baseformatprops)
   * @VueI18nSee [Custom Formatting](../guide/essentials/datetime#custom-formatting)
   *
   * @VueI18nDanger
   * Not supported IE, due to no support `Intl.DateTimeFormat#formatToParts` in [IE](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/formatToParts)
   *
   * If you want to use it, you need to use [polyfill](https://github.com/formatjs/formatjs/tree/main/packages/intl-datetimeformat)
   *
   * @VueI18nComponent
   */
  const DatetimeFormat = {
      /* eslint-disable */
      name: 'i18n-d',
      props: assign({
          value: {
              type: [Number, Date],
              required: true
          },
          format: {
              type: [String, Object]
          }
      }, baseFormatProps),
      /* eslint-enable */
      setup(props, context) {
          const i18n = props.i18n ||
              useI18n({ useScope: 'parent' });
          return renderFormatter(props, context, DATETIME_FORMAT_KEYS, (...args) => 
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          i18n[DatetimePartsSymbol](...args));
      }
  };

  function getComposer$2(i18n, instance) {
      const i18nInternal = i18n;
      if (i18n.mode === 'composition') {
          return (i18nInternal.__getInstance(instance) || i18n.global);
      }
      else {
          const vueI18n = i18nInternal.__getInstance(instance);
          return vueI18n != null
              ? vueI18n.__composer
              : i18n.global.__composer;
      }
  }
  function vTDirective(i18n) {
      const bind = (el, { instance, value, modifiers }) => {
          /* istanbul ignore if */
          if (!instance || !instance.$) {
              throw createI18nError(22 /* UNEXPECTED_ERROR */);
          }
          const composer = getComposer$2(i18n, instance.$);
          if (modifiers.preserve) {
              warn(getWarnMessage(7 /* NOT_SUPPORTED_PRESERVE */));
          }
          const parsedValue = parseValue(value);
          el.textContent = composer.t(...makeParams(parsedValue));
      };
      return {
          beforeMount: bind,
          beforeUpdate: bind
      };
  }
  function parseValue(value) {
      if (isString(value)) {
          return { path: value };
      }
      else if (isPlainObject(value)) {
          if (!('path' in value)) {
              throw createI18nError(19 /* REQUIRED_VALUE */, 'path');
          }
          return value;
      }
      else {
          throw createI18nError(20 /* INVALID_VALUE */);
      }
  }
  function makeParams(value) {
      const { path, locale, args, choice, plural } = value;
      const options = {};
      const named = args || {};
      if (isString(locale)) {
          options.locale = locale;
      }
      if (isNumber(choice)) {
          options.plural = choice;
      }
      if (isNumber(plural)) {
          options.plural = plural;
      }
      return [path, named, options];
  }

  function apply(app, i18n, ...options) {
      const pluginOptions = isPlainObject(options[0])
          ? options[0]
          : {};
      const useI18nComponentName = !!pluginOptions.useI18nComponentName;
      const globalInstall = isBoolean(pluginOptions.globalInstall)
          ? pluginOptions.globalInstall
          : true;
      if (globalInstall && useI18nComponentName) {
          warn(getWarnMessage(11 /* COMPONENT_NAME_LEGACY_COMPATIBLE */, {
              name: Translation.name
          }));
      }
      if (globalInstall) {
          // install components
          app.component(!useI18nComponentName ? Translation.name : 'i18n', Translation);
          app.component(NumberFormat.name, NumberFormat);
          app.component(DatetimeFormat.name, DatetimeFormat);
      }
      // install directive
      app.directive('t', vTDirective(i18n));
  }

  var global$1 = (typeof global !== "undefined" ? global :
              typeof self !== "undefined" ? self :
              typeof window !== "undefined" ? window : {});

  function getDevtoolsGlobalHook() {
      return getTarget().__VUE_DEVTOOLS_GLOBAL_HOOK__;
  }
  function getTarget() {
      // @ts-ignore
      return typeof navigator !== 'undefined'
          ? window
          : typeof global$1 !== 'undefined'
              ? global$1
              : {};
  }

  const HOOK_SETUP = 'devtools-plugin:setup';

  function setupDevtoolsPlugin(pluginDescriptor, setupFn) {
      const hook = getDevtoolsGlobalHook();
      if (hook) {
          hook.emit(HOOK_SETUP, pluginDescriptor, setupFn);
      }
      else {
          const target = getTarget();
          const list = target.__VUE_DEVTOOLS_PLUGINS__ = target.__VUE_DEVTOOLS_PLUGINS__ || [];
          list.push({
              pluginDescriptor,
              setupFn
          });
      }
  }

  const VueDevToolsLabels = {
      ["vue-devtools-plugin-vue-i18n" /* PLUGIN */]: 'Vue I18n devtools',
      ["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]: 'I18n Resources',
      ["vue-i18n-timeline" /* TIMELINE */]: 'Vue I18n'
  };
  const VueDevToolsPlaceholders = {
      ["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]: 'Search for scopes ...'
  };
  const VueDevToolsTimelineColors = {
      ["vue-i18n-timeline" /* TIMELINE */]: 0xffcd19
  };

  const VUE_I18N_COMPONENT_TYPES = 'vue-i18n: composer properties';
  let devtoolsApi;
  async function enableDevTools(app, i18n) {
      return new Promise((resolve, reject) => {
          try {
              setupDevtoolsPlugin({
                  id: "vue-devtools-plugin-vue-i18n" /* PLUGIN */,
                  label: VueDevToolsLabels["vue-devtools-plugin-vue-i18n" /* PLUGIN */],
                  packageName: 'vue-i18n',
                  homepage: 'https://vue-i18n.intlify.dev',
                  logo: 'https://vue-i18n.intlify.dev/vue-i18n-devtools-logo.png',
                  componentStateTypes: [VUE_I18N_COMPONENT_TYPES],
                  app
              }, api => {
                  devtoolsApi = api;
                  api.on.visitComponentTree(({ componentInstance, treeNode }) => {
                      updateComponentTreeTags(componentInstance, treeNode, i18n);
                  });
                  api.on.inspectComponent(({ componentInstance, instanceData }) => {
                      if (componentInstance.vnode.el.__VUE_I18N__ && instanceData) {
                          if (i18n.mode === 'legacy') {
                              // ignore global scope on legacy mode
                              if (componentInstance.vnode.el.__VUE_I18N__ !==
                                  i18n.global.__composer) {
                                  inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                              }
                          }
                          else {
                              inspectComposer(instanceData, componentInstance.vnode.el.__VUE_I18N__);
                          }
                      }
                  });
                  api.addInspector({
                      id: "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */,
                      label: VueDevToolsLabels["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */],
                      icon: 'language',
                      treeFilterPlaceholder: VueDevToolsPlaceholders["vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */]
                  });
                  api.on.getInspectorTree(payload => {
                      if (payload.app === app &&
                          payload.inspectorId === "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */) {
                          registerScope(payload, i18n);
                      }
                  });
                  api.on.getInspectorState(payload => {
                      if (payload.app === app &&
                          payload.inspectorId === "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */) {
                          inspectScope(payload, i18n);
                      }
                  });
                  api.on.editInspectorState(payload => {
                      if (payload.app === app &&
                          payload.inspectorId === "vue-i18n-resource-inspector" /* CUSTOM_INSPECTOR */) {
                          editScope(payload, i18n);
                      }
                  });
                  api.addTimelineLayer({
                      id: "vue-i18n-timeline" /* TIMELINE */,
                      label: VueDevToolsLabels["vue-i18n-timeline" /* TIMELINE */],
                      color: VueDevToolsTimelineColors["vue-i18n-timeline" /* TIMELINE */]
                  });
                  resolve(true);
              });
          }
          catch (e) {
              console.error(e);
              reject(false);
          }
      });
  }
  function updateComponentTreeTags(instance, // eslint-disable-line @typescript-eslint/no-explicit-any
  treeNode, i18n) {
      // prettier-ignore
      const global = i18n.mode === 'composition'
          ? i18n.global
          : i18n.global.__composer;
      if (instance && instance.vnode.el.__VUE_I18N__) {
          // add custom tags local scope only
          if (instance.vnode.el.__VUE_I18N__ !== global) {
              const label = instance.type.name || instance.type.displayName || instance.type.__file;
              const tag = {
                  label: `i18n (${label} Scope)`,
                  textColor: 0x000000,
                  backgroundColor: 0xffcd19
              };
              treeNode.tags.push(tag);
          }
      }
  }
  function inspectComposer(instanceData, composer) {
      const type = VUE_I18N_COMPONENT_TYPES;
      instanceData.state.push({
          type,
          key: 'locale',
          editable: true,
          value: composer.locale.value
      });
      instanceData.state.push({
          type,
          key: 'availableLocales',
          editable: false,
          value: composer.availableLocales
      });
      instanceData.state.push({
          type,
          key: 'fallbackLocale',
          editable: true,
          value: composer.fallbackLocale.value
      });
      instanceData.state.push({
          type,
          key: 'inheritLocale',
          editable: true,
          value: composer.inheritLocale
      });
      instanceData.state.push({
          type,
          key: 'messages',
          editable: false,
          value: getLocaleMessageValue(composer.messages.value)
      });
      instanceData.state.push({
          type,
          key: 'datetimeFormats',
          editable: false,
          value: composer.datetimeFormats.value
      });
      instanceData.state.push({
          type,
          key: 'numberFormats',
          editable: false,
          value: composer.numberFormats.value
      });
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getLocaleMessageValue(messages) {
      const value = {};
      Object.keys(messages).forEach((key) => {
          const v = messages[key];
          if (isFunction(v) && 'source' in v) {
              value[key] = getMessageFunctionDetails(v);
          }
          else if (isObject(v)) {
              value[key] = getLocaleMessageValue(v);
          }
          else {
              value[key] = v;
          }
      });
      return value;
  }
  const ESC = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      '&': '&amp;'
  };
  function escape(s) {
      return s.replace(/[<>"&]/g, escapeChar);
  }
  function escapeChar(a) {
      return ESC[a] || a;
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function getMessageFunctionDetails(func) {
      const argString = func.source ? `("${escape(func.source)}")` : `(?)`;
      return {
          _custom: {
              type: 'function',
              display: `<span>ƒ</span> ${argString}`
          }
      };
  }
  function registerScope(payload, i18n) {
      payload.rootNodes.push({
          id: 'global',
          label: 'Global Scope'
      });
      // prettier-ignore
      const global = i18n.mode === 'composition'
          ? i18n.global
          : i18n.global.__composer;
      for (const [keyInstance, instance] of i18n.__instances) {
          // prettier-ignore
          const composer = i18n.mode === 'composition'
              ? instance
              : instance.__composer;
          if (global === composer) {
              continue;
          }
          const label = keyInstance.type.name ||
              keyInstance.type.displayName ||
              keyInstance.type.__file;
          payload.rootNodes.push({
              id: composer.id.toString(),
              label: `${label} Scope`
          });
      }
  }
  function getComposer$1(nodeId, i18n) {
      if (nodeId === 'global') {
          return i18n.mode === 'composition'
              ? i18n.global
              : i18n.global.__composer;
      }
      else {
          const instance = Array.from(i18n.__instances.values()).find(item => item.id.toString() === nodeId);
          if (instance) {
              return i18n.mode === 'composition'
                  ? instance
                  : instance.__composer;
          }
          else {
              return null;
          }
      }
  }
  function inspectScope(payload, i18n) {
      const composer = getComposer$1(payload.nodeId, i18n);
      if (composer) {
          payload.state = makeScopeInspectState(composer);
      }
  }
  function makeScopeInspectState(composer) {
      const state = {};
      const localeType = 'Locale related info';
      const localeStates = [
          {
              type: localeType,
              key: 'locale',
              editable: true,
              value: composer.locale.value
          },
          {
              type: localeType,
              key: 'fallbackLocale',
              editable: true,
              value: composer.fallbackLocale.value
          },
          {
              type: localeType,
              key: 'availableLocales',
              editable: false,
              value: composer.availableLocales
          },
          {
              type: localeType,
              key: 'inheritLocale',
              editable: true,
              value: composer.inheritLocale
          }
      ];
      state[localeType] = localeStates;
      const localeMessagesType = 'Locale messages info';
      const localeMessagesStates = [
          {
              type: localeMessagesType,
              key: 'messages',
              editable: false,
              value: getLocaleMessageValue(composer.messages.value)
          }
      ];
      state[localeMessagesType] = localeMessagesStates;
      const datetimeFormatsType = 'Datetime formats info';
      const datetimeFormatsStates = [
          {
              type: datetimeFormatsType,
              key: 'datetimeFormats',
              editable: false,
              value: composer.datetimeFormats.value
          }
      ];
      state[datetimeFormatsType] = datetimeFormatsStates;
      const numberFormatsType = 'Datetime formats info';
      const numberFormatsStates = [
          {
              type: numberFormatsType,
              key: 'numberFormats',
              editable: false,
              value: composer.numberFormats.value
          }
      ];
      state[numberFormatsType] = numberFormatsStates;
      return state;
  }
  function addTimelineEvent(event, payload) {
      if (devtoolsApi) {
          let groupId;
          if (payload && 'groupId' in payload) {
              groupId = payload.groupId;
              delete payload.groupId;
          }
          devtoolsApi.addTimelineEvent({
              layerId: "vue-i18n-timeline" /* TIMELINE */,
              event: {
                  title: event,
                  groupId,
                  time: Date.now(),
                  meta: {},
                  data: payload || {},
                  logType: event === "compile-error" /* COMPILE_ERROR */
                      ? 'error'
                      : event === "fallback" /* FALBACK */ ||
                          event === "missing" /* MISSING */
                          ? 'warning'
                          : 'default'
              }
          });
      }
  }
  function editScope(payload, i18n) {
      const composer = getComposer$1(payload.nodeId, i18n);
      if (composer) {
          const [field] = payload.path;
          if (field === 'locale' && isString(payload.state.value)) {
              composer.locale.value = payload.state.value;
          }
          else if (field === 'fallbackLocale' &&
              (isString(payload.state.value) ||
                  isArray(payload.state.value) ||
                  isObject(payload.state.value))) {
              composer.fallbackLocale.value = payload.state.value;
          }
          else if (field === 'inheritLocale' && isBoolean(payload.state.value)) {
              composer.inheritLocale = payload.state.value;
          }
      }
  }

  // supports compatibility for legacy vue-i18n APIs
  function defineMixin(vuei18n, composer, i18n) {
      return {
          beforeCreate() {
              const instance = vue.getCurrentInstance();
              /* istanbul ignore if */
              if (!instance) {
                  throw createI18nError(22 /* UNEXPECTED_ERROR */);
              }
              const options = this.$options;
              if (options.i18n) {
                  const optionsI18n = options.i18n;
                  if (options.__i18n) {
                      optionsI18n.__i18n = options.__i18n;
                  }
                  optionsI18n.__root = composer;
                  if (this === this.$root) {
                      this.$i18n = mergeToRoot(vuei18n, optionsI18n);
                  }
                  else {
                      this.$i18n = createVueI18n(optionsI18n);
                  }
              }
              else if (options.__i18n) {
                  if (this === this.$root) {
                      this.$i18n = mergeToRoot(vuei18n, options);
                  }
                  else {
                      this.$i18n = createVueI18n({
                          __i18n: options.__i18n,
                          __root: composer
                      });
                  }
              }
              else {
                  // set global
                  this.$i18n = vuei18n;
              }
              vuei18n.__onComponentInstanceCreated(this.$i18n);
              i18n.__setInstance(instance, this.$i18n);
              // defines vue-i18n legacy APIs
              this.$t = (...args) => this.$i18n.t(...args);
              this.$rt = (...args) => this.$i18n.rt(...args);
              this.$tc = (...args) => this.$i18n.tc(...args);
              this.$te = (key, locale) => this.$i18n.te(key, locale);
              this.$d = (...args) => this.$i18n.d(...args);
              this.$n = (...args) => this.$i18n.n(...args);
              this.$tm = (key) => this.$i18n.tm(key);
          },
          mounted() {
              /* istanbul ignore if */
              {
                  this.$el.__VUE_I18N__ = this.$i18n.__composer;
                  const emitter = (this.__v_emitter = createEmitter());
                  const _vueI18n = this.$i18n;
                  _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                  emitter.on('*', addTimelineEvent);
              }
          },
          beforeUnmount() {
              const instance = vue.getCurrentInstance();
              /* istanbul ignore if */
              if (!instance) {
                  throw createI18nError(22 /* UNEXPECTED_ERROR */);
              }
              /* istanbul ignore if */
              {
                  if (this.__v_emitter) {
                      this.__v_emitter.off('*', addTimelineEvent);
                      delete this.__v_emitter;
                  }
                  const _vueI18n = this.$i18n;
                  _vueI18n.__disableEmitter && _vueI18n.__disableEmitter();
                  delete this.$el.__VUE_I18N__;
              }
              delete this.$t;
              delete this.$rt;
              delete this.$tc;
              delete this.$te;
              delete this.$d;
              delete this.$n;
              delete this.$tm;
              i18n.__deleteInstance(instance);
              delete this.$i18n;
          }
      };
  }
  function mergeToRoot(root, options) {
      root.locale = options.locale || root.locale;
      root.fallbackLocale = options.fallbackLocale || root.fallbackLocale;
      root.missing = options.missing || root.missing;
      root.silentTranslationWarn =
          options.silentTranslationWarn || root.silentFallbackWarn;
      root.silentFallbackWarn =
          options.silentFallbackWarn || root.silentFallbackWarn;
      root.formatFallbackMessages =
          options.formatFallbackMessages || root.formatFallbackMessages;
      root.postTranslation = options.postTranslation || root.postTranslation;
      root.warnHtmlInMessage = options.warnHtmlInMessage || root.warnHtmlInMessage;
      root.escapeParameterHtml =
          options.escapeParameterHtml || root.escapeParameterHtml;
      root.sync = options.sync || root.sync;
      root.__composer[SetPluralRulesSymbol](options.pluralizationRules || root.pluralizationRules);
      const messages = getLocaleMessages(root.locale, {
          messages: options.messages,
          __i18n: options.__i18n
      });
      Object.keys(messages).forEach(locale => root.mergeLocaleMessage(locale, messages[locale]));
      if (options.datetimeFormats) {
          Object.keys(options.datetimeFormats).forEach(locale => root.mergeDateTimeFormat(locale, options.datetimeFormats[locale]));
      }
      if (options.numberFormats) {
          Object.keys(options.numberFormats).forEach(locale => root.mergeNumberFormat(locale, options.numberFormats[locale]));
      }
      return root;
  }

  /**
   * Vue I18n factory
   *
   * @param options - An options, see the {@link I18nOptions}
   *
   * @returns {@link I18n} instance
   *
   * @remarks
   * If you use Legacy API mode, you need toto specify {@link VueI18nOptions} and `legacy: true` option.
   *
   * If you use composition API mode, you need to specify {@link ComposerOptions}.
   *
   * @VueI18nSee [Getting Started](../guide/)
   * @VueI18nSee [Composition API](../guide/advanced/composition)
   *
   * @example
   * case: for Legacy API
   * ```js
   * import { createApp } from 'vue'
   * import { createI18n } from 'vue-i18n'
   *
   * // call with I18n option
   * const i18n = createI18n({
   *   locale: 'ja',
   *   messages: {
   *     en: { ... },
   *     ja: { ... }
   *   }
   * })
   *
   * const App = {
   *   // ...
   * }
   *
   * const app = createApp(App)
   *
   * // install!
   * app.use(i18n)
   * app.mount('#app')
   * ```
   *
   * @example
   * case: for composition API
   * ```js
   * import { createApp } from 'vue'
   * import { createI18n, useI18n } from 'vue-i18n'
   *
   * // call with I18n option
   * const i18n = createI18n({
   *   legacy: false, // you must specify 'legacy: false' option
   *   locale: 'ja',
   *   messages: {
   *     en: { ... },
   *     ja: { ... }
   *   }
   * })
   *
   * const App = {
   *   setup() {
   *     // ...
   *     const { t } = useI18n({ ... })
   *     return { ... , t }
   *   }
   * }
   *
   * const app = createApp(App)
   *
   * // install!
   * app.use(i18n)
   * app.mount('#app')
   * ```
   *
   * @VueI18nGeneral
   */
  function createI18n(options = {}) {
      // prettier-ignore
      const __legacyMode = isBoolean(options.legacy)
          ? options.legacy
          : true;
      const __globalInjection = !!options.globalInjection;
      const __instances = new Map();
      // prettier-ignore
      const __global = __legacyMode
          ? createVueI18n(options)
          : createComposer(options);
      const symbol = makeSymbol('vue-i18n' );
      const i18n = {
          // mode
          get mode() {
              // prettier-ignore
              return __legacyMode
                      ? 'legacy'
                      : 'composition'
                  ;
          },
          // install plugin
          async install(app, ...options) {
              {
                  app.__VUE_I18N__ = i18n;
              }
              // setup global provider
              app.__VUE_I18N_SYMBOL__ = symbol;
              app.provide(app.__VUE_I18N_SYMBOL__, i18n);
              // global method and properties injection for Composition API
              if (!__legacyMode && __globalInjection) {
                  injectGlobalFields(app, i18n.global);
              }
              // install built-in components and directive
              {
                  apply(app, i18n, ...options);
              }
              // setup mixin for Legacy API
              if (__legacyMode) {
                  app.mixin(defineMixin(__global, __global.__composer, i18n));
              }
              // setup vue-devtools plugin
              {
                  const ret = await enableDevTools(app, i18n);
                  if (!ret) {
                      throw createI18nError(21 /* CANNOT_SETUP_VUE_DEVTOOLS_PLUGIN */);
                  }
                  const emitter = createEmitter();
                  if (__legacyMode) {
                      const _vueI18n = __global;
                      _vueI18n.__enableEmitter && _vueI18n.__enableEmitter(emitter);
                  }
                  else {
                      // eslint-disable-next-line @typescript-eslint/no-explicit-any
                      const _composer = __global;
                      _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
                  }
                  emitter.on('*', addTimelineEvent);
              }
          },
          // global accessor
          get global() {
              return __global;
          },
          // @internal
          __instances,
          // @internal
          __getInstance(component) {
              return __instances.get(component) || null;
          },
          // @internal
          __setInstance(component, instance) {
              __instances.set(component, instance);
          },
          // @internal
          __deleteInstance(component) {
              __instances.delete(component);
          }
      };
      return i18n;
  }
  /**
   * Use Composition API for Vue I18n
   *
   * @param options - An options, see {@link UseI18nOptions}
   *
   * @returns {@link Composer} instance
   *
   * @remarks
   * This function is mainly used by `setup`.
   *
   * If options are specified, Composer instance is created for each component and you can be localized on the component.
   *
   * If options are not specified, you can be localized using the global Composer.
   *
   * @example
   * case: Component resource base localization
   * ```html
   * <template>
   *   <form>
   *     <label>{{ t('language') }}</label>
   *     <select v-model="locale">
   *       <option value="en">en</option>
   *       <option value="ja">ja</option>
   *     </select>
   *   </form>
   *   <p>message: {{ t('hello') }}</p>
   * </template>
   *
   * <script>
   * import { useI18n } from 'vue-i18n'
   *
   * export default {
   *  setup() {
   *    const { t, locale } = useI18n({
   *      locale: 'ja',
   *      messages: {
   *        en: { ... },
   *        ja: { ... }
   *      }
   *    })
   *    // Something to do ...
   *
   *    return { ..., t, locale }
   *  }
   * }
   * </script>
   * ```
   *
   * @VueI18nComposition
   */
  function useI18n(options = {}) {
      const instance = vue.getCurrentInstance();
      if (instance == null) {
          throw createI18nError(16 /* MUST_BE_CALL_SETUP_TOP */);
      }
      if (!instance.appContext.app.__VUE_I18N_SYMBOL__) {
          throw createI18nError(17 /* NOT_INSLALLED */);
      }
      const i18n = vue.inject(instance.appContext.app.__VUE_I18N_SYMBOL__);
      /* istanbul ignore if */
      if (!i18n) {
          throw createI18nError(22 /* UNEXPECTED_ERROR */);
      }
      // prettier-ignore
      const global = i18n.mode === 'composition'
          ? i18n.global
          : i18n.global.__composer;
      // prettier-ignore
      const scope = isEmptyObject(options)
          ? ('__i18n' in instance.type)
              ? 'local'
              : 'global'
          : !options.useScope
              ? 'local'
              : options.useScope;
      if (scope === 'global') {
          let messages = isObject(options.messages) ? options.messages : {};
          if ('__i18nGlobal' in instance.type) {
              messages = getLocaleMessages(global.locale.value, {
                  messages,
                  __i18n: instance.type.__i18nGlobal
              });
          }
          // merge locale messages
          const locales = Object.keys(messages);
          if (locales.length) {
              locales.forEach(locale => {
                  global.mergeLocaleMessage(locale, messages[locale]);
              });
          }
          // merge datetime formats
          if (isObject(options.datetimeFormats)) {
              const locales = Object.keys(options.datetimeFormats);
              if (locales.length) {
                  locales.forEach(locale => {
                      global.mergeDateTimeFormat(locale, options.datetimeFormats[locale]);
                  });
              }
          }
          // merge number formats
          if (isObject(options.numberFormats)) {
              const locales = Object.keys(options.numberFormats);
              if (locales.length) {
                  locales.forEach(locale => {
                      global.mergeNumberFormat(locale, options.numberFormats[locale]);
                  });
              }
          }
          return global;
      }
      if (scope === 'parent') {
          let composer = getComposer(i18n, instance);
          if (composer == null) {
              {
                  warn(getWarnMessage(12 /* NOT_FOUND_PARENT_SCOPE */));
              }
              composer = global;
          }
          return composer;
      }
      // scope 'local' case
      if (i18n.mode === 'legacy') {
          throw createI18nError(18 /* NOT_AVAILABLE_IN_LEGACY_MODE */);
      }
      const i18nInternal = i18n;
      let composer = i18nInternal.__getInstance(instance);
      if (composer == null) {
          const type = instance.type;
          const composerOptions = assign({}, options);
          if (type.__i18n) {
              composerOptions.__i18n = type.__i18n;
          }
          if (global) {
              composerOptions.__root = global;
          }
          composer = createComposer(composerOptions);
          setupLifeCycle(i18nInternal, instance, composer);
          i18nInternal.__setInstance(instance, composer);
      }
      return composer;
  }
  function getComposer(i18n, target) {
      let composer = null;
      const root = target.root;
      let current = target.parent;
      while (current != null) {
          const i18nInternal = i18n;
          if (i18n.mode === 'composition') {
              composer = i18nInternal.__getInstance(current);
          }
          else {
              const vueI18n = i18nInternal.__getInstance(current);
              if (vueI18n != null) {
                  composer = vueI18n
                      .__composer;
              }
          }
          if (composer != null) {
              break;
          }
          if (root === current) {
              break;
          }
          current = current.parent;
      }
      return composer;
  }
  function setupLifeCycle(i18n, target, composer) {
      let emitter = null;
      vue.onMounted(() => {
          // inject composer instance to DOM for intlify-devtools
          if (target.vnode.el) {
              target.vnode.el.__VUE_I18N__ = composer;
              emitter = createEmitter();
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const _composer = composer;
              _composer[EnableEmitter] && _composer[EnableEmitter](emitter);
              emitter.on('*', addTimelineEvent);
          }
      }, target);
      vue.onUnmounted(() => {
          // remove composer instance from DOM for intlify-devtools
          if (target.vnode.el &&
              target.vnode.el.__VUE_I18N__) {
              emitter && emitter.off('*', addTimelineEvent);
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              const _composer = composer;
              _composer[DisableEmitter] && _composer[DisableEmitter]();
              delete target.vnode.el.__VUE_I18N__;
          }
          i18n.__deleteInstance(target);
      }, target);
  }
  const globalExportProps = [
      'locale',
      'fallbackLocale',
      'availableLocales'
  ];
  const globalExportMethods = ['t', 'rt', 'd', 'n', 'tm'];
  function injectGlobalFields(app, composer) {
      const i18n = Object.create(null);
      globalExportProps.forEach(prop => {
          const desc = Object.getOwnPropertyDescriptor(composer, prop);
          if (!desc) {
              throw createI18nError(22 /* UNEXPECTED_ERROR */);
          }
          const wrap = vue.isRef(desc.value) // check computed props
              ? {
                  get() {
                      return desc.value.value;
                  },
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  set(val) {
                      desc.value.value = val;
                  }
              }
              : {
                  get() {
                      return desc.get && desc.get();
                  }
              };
          Object.defineProperty(i18n, prop, wrap);
      });
      app.config.globalProperties.$i18n = i18n;
      globalExportMethods.forEach(method => {
          const desc = Object.getOwnPropertyDescriptor(composer, method);
          if (!desc || !desc.value) {
              throw createI18nError(22 /* UNEXPECTED_ERROR */);
          }
          Object.defineProperty(app.config.globalProperties, `$${method}`, desc);
      });
  }

  // register message compiler at vue-i18n
  registerMessageCompiler(compileToFunction);
  // NOTE: experimental !!
  {
      const target = getGlobalThis();
      target.__INTLIFY__ = true;
      setDevToolsHook(target.__INTLIFY_DEVTOOLS_GLOBAL_HOOK__);
  }
  {
      initDev();
  }

  exports.DatetimeFormat = DatetimeFormat;
  exports.NumberFormat = NumberFormat;
  exports.Translation = Translation;
  exports.VERSION = VERSION;
  exports.createI18n = createI18n;
  exports.useI18n = useI18n;
  exports.vTDirective = vTDirective;

  Object.defineProperty(exports, '__esModule', { value: true });

  return exports;

}({}, Vue));
