function initUTSJSONObjectProperties(obj) {
    const propertyDescriptor = {
        enumerable: false,
        configurable: false,
        writable: false,
    };
    const propertyList = [
        '_content',
        '_getValue',
        'toJSON',
        'get',
        'set',
        'getAny',
        'getString',
        'getNumber',
        'getBoolean',
        'getJSON',
        'getArray',
        'toMap',
        'forEach',
    ];
    const propertyDescriptorMap = {};
    for (let i = 0; i < propertyList.length; i++) {
        const property = propertyList[i];
        propertyDescriptorMap[property] = Object.assign(Object.assign({}, propertyDescriptor), { value: obj[property] });
    }
    Object.defineProperties(obj, propertyDescriptorMap);
}
class UTSJSONObject {
    constructor(content = {}) {
        this._content = content;
        Object.assign(this, content);
        initUTSJSONObjectProperties(this);
    }
    toJSON() {
        return this._content;
    }
    _getValue(keyPathOrKey) {
        if (keyPathOrKey.includes('.')) {
            let keys = keyPathOrKey.split('.');
            let value = this._content;
            for (let key of keys) {
                if (value instanceof Object) {
                    value = value[key];
                }
                else {
                    return null;
                }
            }
            return value;
        }
        else {
            return this._content[keyPathOrKey];
        }
    }
    get(key) {
        return this._getValue(key);
    }
    set(key, value) {
        this._content[key] = value;
    }
    getAny(key) {
        return this._getValue(key);
    }
    getString(key) {
        const value = this._getValue(key);
        if (typeof value === 'string') {
            return value;
        }
        else {
            return null;
        }
    }
    getNumber(key) {
        const value = this._getValue(key);
        if (typeof value === 'number') {
            return value;
        }
        else {
            return null;
        }
    }
    getBoolean(key) {
        const boolean = this._getValue(key);
        if (typeof boolean === 'boolean') {
            return boolean;
        }
        else {
            return null;
        }
    }
    getJSON(key) {
        let value = this._getValue(key);
        if (value instanceof Object) {
            return new UTSJSONObject(value);
        }
        else {
            return null;
        }
    }
    getArray(key) {
        let value = this._getValue(key);
        if (value instanceof Array) {
            return value;
        }
        else {
            return null;
        }
    }
    toMap() {
        let map = new Map();
        for (let key in this._content) {
            map.set(key, this._content[key]);
        }
        return map;
    }
    forEach(callback) {
        for (let key in this._content) {
            callback(this._content[key], key);
        }
    }
}

const OriginalJSON = JSON;
const UTSJSON = {
    parse: (text, reviver) => {
        try {
            const parseResult = OriginalJSON.parse(text, reviver);
            if (Array.isArray(parseResult)) {
                return parseResult;
            }
            return new UTSJSONObject(parseResult);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    parseArray(text) {
        try {
            const parseResult = OriginalJSON.parse(text);
            if (Array.isArray(parseResult)) {
                return parseResult;
            }
            return null;
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    parseObject(text) {
        try {
            const parseResult = OriginalJSON.parse(text);
            if (Array.isArray(parseResult)) {
                return null;
            }
            return new UTSJSONObject(parseResult);
        }
        catch (error) {
            console.error(error);
            return null;
        }
    },
    stringify: (value) => {
        return OriginalJSON.stringify(value);
    },
};

var IDENTIFIER;
(function (IDENTIFIER) {
    IDENTIFIER["UTSJSONObject"] = "UTSJSONObject";
    IDENTIFIER["JSON"] = "JSON";
    IDENTIFIER["UTS"] = "UTS";
    IDENTIFIER["DEFINE_COMPONENT"] = "defineComponent";
    IDENTIFIER["VUE"] = "vue";
})(IDENTIFIER || (IDENTIFIER = {}));
var UTS_CLASS_METADATA_KIND;
(function (UTS_CLASS_METADATA_KIND) {
    UTS_CLASS_METADATA_KIND[UTS_CLASS_METADATA_KIND["CLASS"] = 0] = "CLASS";
    UTS_CLASS_METADATA_KIND[UTS_CLASS_METADATA_KIND["INTERFACE"] = 1] = "INTERFACE";
    UTS_CLASS_METADATA_KIND[UTS_CLASS_METADATA_KIND["TYPE"] = 2] = "TYPE";
})(UTS_CLASS_METADATA_KIND || (UTS_CLASS_METADATA_KIND = {}));
var UTS_SPECIAL_PROPERTY;
(function (UTS_SPECIAL_PROPERTY) {
    UTS_SPECIAL_PROPERTY["UTS_METADATA_KEY"] = "$UTSMetadata$";
    UTS_SPECIAL_PROPERTY["TEMP_UTS_METADATA_KEY"] = "$TempUTSMetadata$";
})(UTS_SPECIAL_PROPERTY || (UTS_SPECIAL_PROPERTY = {}));

var DiagnosticCategory;
(function (DiagnosticCategory) {
    DiagnosticCategory[DiagnosticCategory["Warning"] = 0] = "Warning";
    DiagnosticCategory[DiagnosticCategory["Error"] = 1] = "Error";
    DiagnosticCategory[DiagnosticCategory["Suggestion"] = 2] = "Suggestion";
    DiagnosticCategory[DiagnosticCategory["Message"] = 3] = "Message";
})(DiagnosticCategory || (DiagnosticCategory = {}));

// <auto-generated />
// generated from 'packages/shared/src/diagnosticMessages.json'
function diag(code, category, key, message, reportsUnnecessary, elidedInCompatabilityPyramid, reportsDeprecated) {
    return { code, category, key, message, reportsUnnecessary, elidedInCompatabilityPyramid, reportsDeprecated };
}
/** @internal */
({
    Type_literal_property_must_have_a_type_annotation: diag(100000, DiagnosticCategory.Error, "Type_literal_property_must_have_a_type_annotation_100000", "Type literal property must have a type annotation."),
    Only_one_extends_heritage_clause_is_allowed_for_interface: diag(100001, DiagnosticCategory.Error, "Only_one_extends_heritage_clause_is_allowed_for_interface_100001", "Only one extends heritage clause is allowed for interface"),
    Variable_declaration_must_have_initializer: diag(100002, DiagnosticCategory.Error, "Variable_declaration_must_have_initializer_100002", "Variable declaration must have initializer."),
});

function isUTSMetadata(metadata) {
    return !!(metadata &&
        metadata.kind in UTS_CLASS_METADATA_KIND &&
        metadata.interfaces);
}
function isNativeType(proto) {
    return !proto || proto === Object.prototype;
}
const utsMetadataKey = UTS_SPECIAL_PROPERTY.UTS_METADATA_KEY;
/**
 * 处理复杂的继承关系。
 * 例如：
 * class A extends abstract class B，abstract class B implements interface C
 * new A() instanceof C -> true
 */
function getParentTypeList(type) {
    const metadata = utsMetadataKey in type ? type[utsMetadataKey] : {};
    let interfaces = [];
    if (!isUTSMetadata(metadata)) {
        interfaces = [];
    }
    else {
        interfaces = metadata.interfaces || [];
    }
    const proto = Object.getPrototypeOf(type);
    if (!isNativeType(proto)) {
        interfaces.push(proto.constructor);
    }
    return interfaces;
}
function isImplementationOf(leftType, rightType, visited = []) {
    if (isNativeType(leftType)) {
        return false;
    }
    if (leftType === rightType) {
        return true;
    }
    visited.push(leftType);
    const parentTypeList = getParentTypeList(leftType);
    return parentTypeList.some((parentType) => {
        if (visited.includes(parentType)) {
            return false;
        }
        return isImplementationOf(parentType, rightType, visited);
    });
}
function isInstanceOf(value, type) {
    const isNativeInstanceofType = value instanceof type;
    if (isNativeInstanceofType || typeof value !== 'object') {
        return isNativeInstanceofType;
    }
    const proto = Object.getPrototypeOf(value).constructor;
    return isImplementationOf(proto, type);
}

const UTS = {
    isInstanceOf,
};

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __esDecorate(ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
}
function __runInitializers(thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
}
function __propKey(x) {
    return typeof x === "symbol" ? x : "".concat(x);
}
function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

var __createBinding = Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
});

function __exportStar(m, o) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p)) __createBinding(o, m, p);
}

function __values(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

/** @deprecated */
function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

function __spreadArray(to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: false } : f ? f(v) : v; } : f; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator], i;
    return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
    function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
    function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
}
var __setModuleDefault = Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
};

function __importStar(mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
}

function __importDefault(mod) {
    return (mod && mod.__esModule) ? mod : { default: mod };
}

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
}

function __classPrivateFieldIn(state, receiver) {
    if (receiver === null || (typeof receiver !== "object" && typeof receiver !== "function")) throw new TypeError("Cannot use 'in' operator on non-object");
    return typeof state === "function" ? receiver === state : state.has(receiver);
}

function __addDisposableResource(env, value, async) {
    if (value !== null && value !== void 0) {
        if (typeof value !== "object" && typeof value !== "function") throw new TypeError("Object expected.");
        var dispose;
        if (async) {
            if (!Symbol.asyncDispose) throw new TypeError("Symbol.asyncDispose is not defined.");
            dispose = value[Symbol.asyncDispose];
        }
        if (dispose === void 0) {
            if (!Symbol.dispose) throw new TypeError("Symbol.dispose is not defined.");
            dispose = value[Symbol.dispose];
        }
        if (typeof dispose !== "function") throw new TypeError("Object not disposable.");
        env.stack.push({ value: value, dispose: dispose, async: async });
    }
    else if (async) {
        env.stack.push({ async: true });
    }
    return value;
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function __disposeResources(env) {
    function fail(e) {
        env.error = env.hasError ? new _SuppressedError(e, env.error, "An error was suppressed during disposal.") : e;
        env.hasError = true;
    }
    function next() {
        while (env.stack.length) {
            var rec = env.stack.pop();
            try {
                var result = rec.dispose && rec.dispose.call(rec.value);
                if (rec.async) return Promise.resolve(result).then(next, function(e) { fail(e); return next(); });
            }
            catch (e) {
                fail(e);
            }
        }
        if (env.hasError) throw env.error;
    }
    return next();
}

// @ts-ignore
globalThis.JSON = UTSJSON;
// @ts-ignore
globalThis.UTSJSONObject = UTSJSONObject;

export { UTSJSON as JSON, UTS, UTSJSONObject, __addDisposableResource, __assign, __asyncDelegator, __asyncGenerator, __asyncValues, __await, __awaiter, __classPrivateFieldGet, __classPrivateFieldIn, __classPrivateFieldSet, __createBinding, __decorate, __disposeResources, __esDecorate, __exportStar, __extends, __generator, __importDefault, __importStar, __makeTemplateObject, __metadata, __param, __propKey, __read, __rest, __runInitializers, __setFunctionName, __spread, __spreadArray, __spreadArrays, __values };
