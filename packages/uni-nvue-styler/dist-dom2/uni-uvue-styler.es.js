import { hyphenate, camelize } from '@vue/shared';

function createDecl(prop, value, important, raws, source) {
    const decl = {
        type: 'decl',
        prop,
        value: value.toString(),
        raws,
        source,
    };
    if (important) {
        decl.important = true;
    }
    return decl;
}
const NUM_REGEXP = /^[-]?\d*\.?\d+$/;
const LENGTH_REGEXP = /^[-+]?\d*\.?\d+(\S*)$/;
const SUPPORTED_VALUES_REGEXP = /supported values are: ([^)]+)/;
const isNumber = (val) => typeof val === 'number';
const cacheStringFunction = (fn) => {
    const cache = Object.create(null);
    return ((str) => {
        const hit = cache[str];
        return hit || (cache[str] = fn(str));
    });
};
const hyphenateRE = /([A-Z])/g;
const hyphenateStyleProperty = cacheStringFunction((str) => str
    .replace(hyphenateRE, (_, m) => {
    if (typeof m === 'string') {
        return '-' + m.toLowerCase();
    }
    return m;
})
    .toLowerCase());
function autofixedReason(v, result) {
    return 'NOTE: property value `' + v + '` is autofixed to `' + result + '`';
}
function validReason(k, v) {
    return ('ERROR: property value `' +
        v +
        '` is not valid for `' +
        hyphenateStyleProperty(k) +
        '`');
}
function defaultValueReason(k, v) {
    return ('NOTE: property value `' +
        v +
        '` is the DEFAULT value for `' +
        hyphenateStyleProperty(k) +
        '` (could be removed)');
}
function supportedEnumReason(k, v, items) {
    const reason = 'ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenateStyleProperty(k) +
        '`';
    return items.length
        ? reason + ' (supported values are: `' + items.join('`|`') + '`)'
        : reason;
}
function supportedValueWithTipsReason(k, v, tips) {
    return ('ERROR: property value `' +
        v +
        '` is not supported for `' +
        hyphenateStyleProperty(k) +
        '` ' +
        tips);
}
function supportedPropertyReason(k) {
    return ('WARNING: `' +
        hyphenateStyleProperty(k) +
        '` is not a standard property name (may not be supported)');
}
function getPlatformVersion(platform, dom2) {
    return dom2 ? platform?.unixVaporVer : platform?.unixVer;
}
function getSupportedPlatforms(uniPlatform, dom2 = false) {
    const supportedPlatforms = [];
    if (getPlatformVersion(uniPlatform?.app?.android, dom2) !== 'x') {
        supportedPlatforms.push('app-android');
    }
    if (getPlatformVersion(uniPlatform?.app?.ios, dom2) !== 'x') {
        supportedPlatforms.push('app-ios');
    }
    if (getPlatformVersion(uniPlatform?.app?.harmony, dom2) !== 'x') {
        supportedPlatforms.push('app-harmony');
    }
    return supportedPlatforms;
}
function normalizeReasons(reasons, k, v) {
    let enums = [];
    for (let i = 0; i < reasons.length; i++) {
        const reason = reasons[i];
        if (SUPPORTED_VALUES_REGEXP.test(reason)) {
            const match = reason.match(SUPPORTED_VALUES_REGEXP);
            if (match) {
                const values = match[1]
                    .split('|')
                    .map((item) => item.replace(/`/g, ''))
                    .filter(Boolean);
                enums.push(...values);
                reasons.splice(i, 1);
                i--;
            }
        }
    }
    if (enums.length > 0) {
        const unsupportedReason = supportedEnumReason(k, v, []);
        reasons = reasons.filter((reason) => reason !== unsupportedReason);
        enums = [...new Set(enums)];
        reasons.push(supportedEnumReason(k, v, enums));
    }
    return reasons;
}
// http://www.w3.org/TR/css3-color/#svg-color
const EXTENDED_COLOR_KEYWORDS = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgreen: '#006400',
    darkgrey: '#A9A9A9',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    grey: '#808080',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgray: '#D3D3D3',
    lightgreen: '#90EE90',
    lightgrey: '#D3D3D3',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    lime: '#00FF00',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    navy: '#000080',
    oldlace: '#FDF5E6',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    purple: '#800080',
    red: '#FF0000',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    silver: '#C0C0C0',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    yellow: '#FFFF00',
    yellowgreen: '#9ACD32',
};
/**
 * css value 分割多值，兼容包含括号的 css 方法，比如 var/env/calc() 等
 */
function splitValues(value) {
    const trimmedValue = value.trim();
    if (!trimmedValue.includes('(')) {
        return trimmedValue.split(/\s+/);
    }
    const parts = [];
    let current = '';
    let depth = 0;
    for (let i = 0; i < trimmedValue.length; i++) {
        const char = trimmedValue[i];
        if (char === '(') {
            depth++;
            current += char;
        }
        else if (char === ')') {
            if (depth > 0) {
                depth--;
            }
            current += char;
        }
        else if (/\s/.test(char)) {
            if (depth === 0) {
                if (current) {
                    parts.push(current);
                    current = '';
                }
            }
            else {
                // 多个空格处理一个
                if (current.length > 0 && !/\s$/.test(current)) {
                    current += ' ';
                }
            }
        }
        else {
            current += char;
        }
    }
    if (current) {
        parts.push(current);
    }
    return parts;
}

const backgroundColor = 'background-color' ;
const backgroundImage = 'background-image' ;
const handleTransformBackground = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    if (value === 'none') {
        return [
            createDecl(backgroundImage, 'none', important, raws, source),
            createDecl(backgroundColor, 'transparent', important, raws, source),
        ];
    }
    if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
        return [
            createDecl(backgroundImage, 'none', important, raws, source),
            createDecl(backgroundColor, value, important, raws, source),
        ];
    }
    else if (/^linear-gradient(.+)$/.test(value)) {
        return [
            createDecl(backgroundImage, value, important, raws, source),
            createDecl(backgroundColor, 'transparent', important, raws, source),
        ];
    }
    else if (value == '') {
        return [
            createDecl(backgroundImage, 'none', important, raws, source),
            createDecl(backgroundColor, 'transparent', important, raws, source),
        ];
    }
    return [decl];
};
function createTransformBackground(options) {
    return (decl) => {
        {
            return handleTransformBackground(decl);
        }
    };
}

const borderTop = 'border-top-' ;
const borderRight = 'border-right-' ;
const borderBottom = 'border-bottom-' ;
const borderLeft = 'border-left-' ;
const transformBorderColor = (decl) => {
    let { prop, value, important, raws, source } = decl;
    value = value.trim();
    const _property_split = hyphenate(prop).split('-');
    let property = _property_split[_property_split.length - 1];
    const splitResult = splitValues(value); // 1pt
    switch (splitResult.length) {
        case 1:
            if (_property_split.length === 3) {
                // border-top-width
                return [decl];
            }
            // border-width
            splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
            break;
        case 2:
            splitResult.push(splitResult[0], splitResult[1]);
            break;
        case 3:
            splitResult.push(splitResult[1]);
            break;
    }
    return [
        createDecl(borderTop + property, splitResult[0], important, raws, source),
        createDecl(borderRight + property, splitResult[1], important, raws, source),
        createDecl(borderBottom + property, splitResult[2], important, raws, source),
        createDecl(borderLeft + property, splitResult[3], important, raws, source),
    ];
};

const transformBorderStyle = transformBorderColor;

const transformBorderWidth = transformBorderColor;

function isSingleCssVarValue(value) {
    const trimmedValue = value.trim();
    if (splitValues(trimmedValue).length !== 1 || !/^var\(/i.test(trimmedValue)) {
        return false;
    }
    let depth = 0;
    for (let i = 0; i < trimmedValue.length; i++) {
        const char = trimmedValue[i];
        if (char === '(') {
            depth++;
        }
        else if (char === ')') {
            if (depth === 0) {
                return false;
            }
            depth--;
            if (depth === 0 && trimmedValue.slice(i + 1).trim()) {
                return false;
            }
        }
    }
    return depth === 0;
}
function tryExpandSingleValueVarShorthand(decl, props, value) {
    // 当整个简写值只有一个 var() 时，无法静态判断它属于哪个子属性，
    // 这里直接复制到每个长属性，交给运行时再解析。
    if (!isSingleCssVarValue(value)) {
        return null;
    }
    const { important, raws, source } = decl;
    return props.map((prop) => createDecl(prop, value, important, raws, source));
}

const borderWidth = '-width' ;
const borderStyle = '-style' ;
const borderColor = '-color' ;
const BORDER_WIDTH_REGEXP = /^(?:[\d.]+\S*|thin|medium|thick)$/;
// 这里按完整 CSS line-style 识别，后续再交给 border-*-style 的既有校验逻辑报精确错误。
const BORDER_STYLE_REGEXP = /^(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/;
function createBorderVarOrderWarning(prop, value) {
    return supportedValueWithTipsReason(prop, value, '(border shorthand with CSS variables must follow `width style color`, for example: `1px solid var(--color, #999999)`)');
}
function isCssVarValue(value) {
    return value.startsWith('var(');
}
function isBorderWidthValue(value) {
    return isCssVarValue(value) || BORDER_WIDTH_REGEXP.test(value);
}
function isBorderStyleValue(value) {
    return isCssVarValue(value) || BORDER_STYLE_REGEXP.test(value);
}
function isBorderColorValue(value) {
    return (isCssVarValue(value) ||
        (!BORDER_WIDTH_REGEXP.test(value) && !BORDER_STYLE_REGEXP.test(value)));
}
function createTransformBorder(options) {
    return (decl, onWarning) => {
        const { prop, value, important, raws, source } = decl;
        const singleVarResult = tryExpandSingleValueVarShorthand(decl, [prop + borderWidth, prop + borderStyle, prop + borderColor], value);
        // 单个 var() 无法提前判断是 width/style/color，dom2 下先平铺后继续展开。
        if (singleVarResult) {
            return [
                ...transformBorderWidth(singleVarResult[0]),
                ...transformBorderStyle(singleVarResult[1]),
                ...transformBorderColor(singleVarResult[2]),
            ];
        }
        let splitResult = splitValues(value);
        const havVar = splitResult.some((str) => str.startsWith('var('));
        let result = [];
        // 包含 var 时按位置解析，避免把 style 误判成 color
        if (havVar) {
            if (splitResult.length > 3 ||
                (splitResult.length === 3 &&
                    (!isBorderWidthValue(splitResult[0]) ||
                        !isBorderStyleValue(splitResult[1]) ||
                        !isBorderColorValue(splitResult[2])))) {
                onWarning?.(createBorderVarOrderWarning(prop, value));
                return [];
            }
            result = splitResult;
            splitResult = [];
        }
        else {
            result = [BORDER_WIDTH_REGEXP, BORDER_STYLE_REGEXP, /\S+/].map((item) => {
                const index = splitResult.findIndex((str) => item.test(str));
                return index < 0 ? null : splitResult.splice(index, 1)[0];
            });
        }
        if (splitResult.length > 0 && value != '') {
            return [decl];
        }
        const defaultWidth = (str) => {
            if (str != null) {
                return str.trim();
            }
            return 'medium';
        };
        const defaultStyle = (str) => {
            if (str != null) {
                return str.trim();
            }
            return 'none';
        };
        const defaultColor = (str) => {
            if (str != null) {
                return str.trim();
            }
            return '#000000';
        };
        return [
            ...transformBorderWidth(createDecl(prop + borderWidth, defaultWidth(result[0]), important, raws, source)),
            ...transformBorderStyle(createDecl(prop + borderStyle, defaultStyle(result[1]), important, raws, source)),
            ...transformBorderColor(createDecl(prop + borderColor, defaultColor(result[2]), important, raws, source)),
        ];
    };
}

const borderTopLeftRadius = 'border-top-left-radius'
    ;
const borderTopRightRadius = 'border-top-right-radius'
    ;
const borderBottomRightRadius = 'border-bottom-right-radius'
    ;
const borderBottomLeftRadius = 'border-bottom-left-radius'
    ;
const transformBorderRadius = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const splitResult = splitValues(value);
    if (value.includes('/')) {
        return [decl];
    }
    switch (splitResult.length) {
        case 1:
            splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
            break;
        case 2:
            splitResult.push(splitResult[0], splitResult[1]);
            break;
        case 3:
            splitResult.push(splitResult[1]);
            break;
    }
    return [
        createDecl(borderTopLeftRadius, splitResult[0], important, raws, source),
        createDecl(borderTopRightRadius, splitResult[1], important, raws, source),
        createDecl(borderBottomRightRadius, splitResult[2], important, raws, source),
        createDecl(borderBottomLeftRadius, splitResult[3], important, raws, source),
    ];
};

const flexDirection = 'flex-direction' ;
const flexWrap = 'flex-wrap' ;
const transformFlexFlow = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const splitResult = splitValues(value);
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, [flexDirection, flexWrap], value);
    // 单个 var() 无法提前判断是 direction 还是 wrap，dom2 下直接平铺。
    if (singleVarResult) {
        return singleVarResult;
    }
    const result = [
        /^(column|column-reverse|row|row-reverse)$/,
        /^(nowrap|wrap|wrap-reverse)$/,
    ].map((item) => {
        const index = splitResult.findIndex((str) => item.test(str));
        return index < 0 ? null : splitResult.splice(index, 1)[0];
    });
    if (splitResult.length) {
        return [decl];
    }
    return [
        createDecl(flexDirection, result[0] || 'column', important, raws, source),
        createDecl(flexWrap, result[1] || 'nowrap', important, raws, source),
    ];
};

const top = '-top' ;
const right = '-right' ;
const bottom = '-bottom' ;
const left = '-left' ;
const createTransformBox = (type) => {
    return (decl) => {
        const { value, important, raws, source } = decl;
        const splitResult = splitValues(value);
        switch (splitResult.length) {
            case 1:
                splitResult.push(splitResult[0], splitResult[0], splitResult[0]);
                break;
            case 2:
                splitResult.push(splitResult[0], splitResult[1]);
                break;
            case 3:
                splitResult.push(splitResult[1]);
                break;
        }
        return [
            createDecl(type + top, splitResult[0], important, raws, source),
            createDecl(type + right, splitResult[1], important, raws, source),
            createDecl(type + bottom, splitResult[2], important, raws, source),
            createDecl(type + left, splitResult[3], important, raws, source),
        ];
    };
};
const transformMargin = createTransformBox('margin');

const transformPadding = createTransformBox('padding');

const transitionProperty = 'transition-property'
    ;
const transitionDuration = 'transition-duration'
    ;
const transitionTimingFunction = 'transition-timing-function'
    ;
const transitionDelay = 'transition-delay' ;
const transformTransition = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const result = [];
    let match;
    // 针对 cubic-bezier 特殊处理
    // eg: cubic-bezier(0.42, 0, 1.0, 3) // (0.2,-2,0.8,2)
    if (value.includes('cubic-bezier')) {
        const CHUNK_REGEXP = /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*((\S*)|cubic-bezier\(.*\))?\s*(\d*\.?\d+(?:ms|s)?)?$/;
        match = value.match(CHUNK_REGEXP);
    }
    else {
        const CHUNK_REGEXP = /^(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?\s*(\S*)?\s*(\d*\.?\d+(?:ms|s)?)?$/;
        match = value.match(CHUNK_REGEXP);
    }
    if (!match) {
        return result;
    }
    match[1] &&
        result.push(createDecl(transitionProperty, match[1], important, raws, source));
    match[2] &&
        result.push(createDecl(transitionDuration, match[2], important, raws, source));
    match[3] &&
        result.push(createDecl(transitionTimingFunction, match[3], important, raws, source));
    match[4] &&
        result.push(createDecl(transitionDelay, match[4], important, raws, source));
    return result;
};

const flexGrow = 'flex-grow' ;
const flexShrink = 'flex-shrink' ;
const flexBasis = 'flex-basis' ;
const transformFlex = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const result = [];
    const splitResult = splitValues(value);
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, [flexGrow, flexShrink, flexBasis], value);
    // 单个 var() 无法提前拆出 grow/shrink/basis，dom2 下按 border 的兜底逻辑平铺。
    if (singleVarResult) {
        return singleVarResult;
    }
    // 是否 flex-grow 的有效值 <number [0,∞]>
    const isFlexGrowValid = (v) => isNumber(Number(v)) && !Number.isNaN(Number(v));
    const isFlexShrinkValid = (v) => isNumber(Number(v)) && !Number.isNaN(Number(v)) && Number(v) >= 0;
    const isFlexBasisValid = (v) => typeof v === 'string' && v.trim() !== '';
    if (splitResult.length === 1) {
        // 关键字处理
        if (value === 'none') {
            result.push(createDecl(flexGrow, '0', important, raws, source), createDecl(flexShrink, '0', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
            return result;
        }
        if (value === 'auto') {
            result.push(createDecl(flexGrow, '1', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
            return result;
        }
        if (value === 'initial') {
            result.push(createDecl(flexGrow, '0', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, 'auto', important, raws, source));
            return result;
        }
        const v = splitResult[0];
        // number 视为 flex-grow
        if (isFlexGrowValid(v)) {
            if (Number(v) < 0) {
                return [];
            }
            result.push(createDecl(flexGrow, v, important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, '0%', important, raws, source));
            return result;
        }
        else if (isFlexBasisValid(v)) {
            result.push(createDecl(flexGrow, '1', important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, v, important, raws, source));
            return result;
        }
        else {
            return [decl];
        }
    }
    else if (splitResult.length === 2) {
        const [v1, v2] = splitResult;
        if (isFlexGrowValid(v1)) {
            if (isFlexShrinkValid(v2)) {
                // flex: 1 2 => 1 2 0%
                result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, v2, important, raws, source), createDecl(flexBasis, '0%', important, raws, source));
                return result;
            }
            else {
                // flex: 1 100px => 1 1 100px
                result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, v2, important, raws, source));
                return result;
            }
        }
        else {
            return [decl];
        }
    }
    else if (splitResult.length === 3) {
        const [v1, v2, v3] = splitResult;
        if (isFlexGrowValid(v1) && isFlexShrinkValid(v2)) {
            result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, v2, important, raws, source), createDecl(flexBasis, v3, important, raws, source));
            return result;
        }
        else {
            // fallback
            return [decl];
        }
    }
    // 其它情况，原样返回
    return [decl];
};

function createEnumNormalize(items) {
    return (v) => {
        const index = items.indexOf(v);
        if (index > 0) {
            return { value: v };
        }
        if (index === 0) {
            return {
                value: v,
                reason: function reason(k, v, result) {
                    return defaultValueReason(k, v);
                },
            };
        }
        return {
            value: null,
            reason: function reason(k, v, result) {
                return supportedEnumReason(k, v, items);
            },
        };
    };
}
function createEnumNormalizeWithPlatform(items) {
    return (v, { platform, dom2 }) => {
        const property = items.find((item) => item.name === v);
        const supportedEnum = items
            .filter((item) => {
            const supportedPlatforms = getSupportedPlatforms(item.uniPlatform, !!dom2);
            return supportedPlatforms.includes(platform);
        })
            .map((item) => item.name);
        if (property) {
            const supportedPlatforms = getSupportedPlatforms(property.uniPlatform, !!dom2);
            // TODO 未跨平台支持的属性特殊提示
            if (!supportedPlatforms.includes(platform)) {
                return {
                    value: null,
                    reason: function reason(k, v, result) {
                        return supportedEnumReason(k, v, supportedEnum);
                    },
                };
            }
            return { value: v };
        }
        return {
            value: null,
            reason: function reason(k, v, result) {
                return supportedEnumReason(k, v, supportedEnum);
            },
        };
    };
}

const normalizeTimingFunction = (v) => {
    v = (v || '').toString();
    if (v.match(/^(?:linear|ease|ease-in|ease-out|ease-in-out)$/)) {
        return { value: v };
    }
    let match;
    if ((match = v.match(/^cubic-bezier\(\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*,\s*(.*)\s*\)$/))) {
        if (match[1].match(NUM_REGEXP) &&
            match[2].match(NUM_REGEXP) &&
            match[3].match(NUM_REGEXP) &&
            match[4].match(NUM_REGEXP)) {
            const ret = [
                parseFloat(match[1]),
                parseFloat(match[2]),
                parseFloat(match[3]),
                parseFloat(match[4]),
            ].join(',');
            return { value: 'cubic-bezier(' + ret + ')' };
        }
    }
    return {
        value: null,
        reason(k, v, result) {
            return supportedEnumReason(k, v, [
                'linear',
                'ease',
                'ease-in',
                'ease-out',
                'ease-in-out',
                'cubic-bezier(n,n,n,n)',
            ]);
        },
    };
};

const KEYFRAMES_NAME_RE = /^-?[A-Za-z_][A-Za-z0-9_-]*$/;
const ANIMATION_NUMBER_RE = /^[+-]?\d*\.?\d+$/;
const MAX_F32_VALUE = 3.4028234663852886e38;
const RESERVED_KEYFRAMES_NAMES = new Set([
    'default',
    'inherit',
    'initial',
    'none',
    'revert',
    'revert-layer',
    'unset',
]);
function normalizeAnimationDecimal(value) {
    const negative = value[0] === '-';
    const unsigned = value.replace(/^[+-]/, '');
    const [integer = '', fraction = ''] = unsigned.split('.');
    const normalizedInteger = integer.replace(/^0+(?=\d)/, '') || '0';
    const normalizedFraction = fraction.replace(/0+$/, '');
    const normalized = normalizedFraction
        ? `${normalizedInteger}.${normalizedFraction}`
        : normalizedInteger;
    return negative && normalized !== '0' ? `-${normalized}` : normalized;
}
function splitAnimationList(value) {
    const result = [];
    let start = 0;
    let depth = 0;
    for (let i = 0; i < value.length; i++) {
        const char = value[i];
        if (char === '(') {
            depth++;
        }
        else if (char === ')') {
            if (depth === 0) {
                return null;
            }
            depth--;
        }
        else if (char === ',' && depth === 0) {
            const item = value.slice(start, i).trim();
            if (!item) {
                return null;
            }
            result.push(item);
            start = i + 1;
        }
    }
    if (depth !== 0) {
        return null;
    }
    const item = value.slice(start).trim();
    if (!item) {
        return null;
    }
    result.push(item);
    return result;
}
function createAnimationListNormalize(normalize) {
    return (v, options) => {
        const items = splitAnimationList((v || '').toString());
        if (!items) {
            return {
                value: null,
                reason: validReason,
            };
        }
        const values = [];
        for (let i = 0; i < items.length; i++) {
            const result = normalize(items[i], options);
            if (result.value === null) {
                return result;
            }
            values.push(result.value);
        }
        return {
            value: values.length === 1 ? values[0] : values.join(','),
        };
    };
}
function createAnimationTimeNormalize(allowNegative) {
    return (v) => {
        const value = (v || '').toString().toLowerCase();
        const match = value.match(/^([+-]?(?:\d+(?:\.\d+)?|\.\d+))(ms|s)$/);
        if (match && (allowNegative || value[0] !== '-')) {
            const milliseconds = Number(match[1]) * (match[2] === 's' ? 1000 : 1);
            if (Number.isFinite(milliseconds) &&
                Math.abs(milliseconds) <= MAX_F32_VALUE) {
                return { value };
            }
        }
        return {
            value: null,
            reason(k, v) {
                return supportedEnumReason(k, v, [
                    allowNegative ? 'time' : 'non-negative time',
                ]);
            },
        };
    };
}
const normalizeAnimationNameItem = (v) => {
    const value = (v || '').toString();
    const lowerValue = value.toLowerCase();
    if (lowerValue === 'none') {
        return { value: 'none' };
    }
    if (KEYFRAMES_NAME_RE.test(value) &&
        !RESERVED_KEYFRAMES_NAMES.has(lowerValue)) {
        return { value };
    }
    return {
        value: null,
        reason: validReason,
    };
};
const normalizeAnimationIterationCountItem = (v) => {
    const value = (v || '').toString().toLowerCase();
    if (value === 'infinite') {
        return { value };
    }
    const count = Number(value);
    if (ANIMATION_NUMBER_RE.test(value) && Number.isFinite(count) && count >= 0) {
        const normalizedValue = normalizeAnimationDecimal(value);
        return {
            value: normalizedValue === count.toString() ? count : normalizedValue,
        };
    }
    return {
        value: null,
        reason(k, v) {
            return supportedEnumReason(k, v, ['non-negative number', 'infinite']);
        },
    };
};
function createAnimationKeywordNormalize(items) {
    const normalize = createEnumNormalize(items);
    return (v, options) => normalize((v || '').toString().toLowerCase(), options);
}
function createSupportedAnimationKeywordNormalize(property) {
    const normalize = createEnumNormalizeWithPlatform(property.values || []);
    return (v, options) => normalize((v || '').toString().toLowerCase(), options);
}
function createAnimationSyntaxOrKeywordNormalize(syntaxNormalize, property) {
    const keywords = new Set((property.values || []).map((item) => item.name.toLowerCase()));
    const keywordNormalize = createSupportedAnimationKeywordNormalize(property);
    return (v, options) => {
        const value = (v || '').toString().toLowerCase();
        return keywords.has(value)
            ? keywordNormalize(value, options)
            : syntaxNormalize(value, options);
    };
}
const normalizeAnimationDelayItem = createAnimationTimeNormalize(true);
const normalizeAnimationDirectionItem = createAnimationKeywordNormalize([
    'normal',
    'reverse',
    'alternate',
    'alternate-reverse',
]);
const normalizeAnimationDurationItem = createAnimationTimeNormalize(false);
const normalizeAnimationFillModeItem = createAnimationKeywordNormalize([
    'none',
    'forwards',
    'backwards',
    'both',
]);
const normalizeAnimationPlayStateItem = createAnimationKeywordNormalize([
    'running',
    'paused',
]);
const normalizeAnimationTimingFunctionItem = (v, options) => {
    const value = (v || '').toString().toLowerCase();
    const result = normalizeTimingFunction(value);
    if (typeof result.value === 'string' &&
        result.value.startsWith('cubic-bezier(')) {
        const values = value
            .slice(13, -1)
            .split(',')
            .map((item) => item.trim());
        const numbers = values.map(Number);
        if (numbers.some((value) => !Number.isFinite(value) || Math.abs(value) > MAX_F32_VALUE)) {
            return normalizeTimingFunction('');
        }
        result.value = `cubic-bezier(${values
            .map(normalizeAnimationDecimal)
            .join(',')})`;
    }
    return result;
};
function isValidValue(normalize, value) {
    return normalize(value, {}).value !== null;
}
function parseSingleAnimation(value) {
    const tokens = splitValues(value);
    if (!tokens.length) {
        return null;
    }
    const result = {
        name: 'none',
        duration: '0s',
        delay: '0s',
        timingFunction: 'ease',
        iterationCount: '1',
        direction: 'normal',
        fillMode: 'none',
        playState: 'running',
    };
    let hasDuration = false;
    let hasDelay = false;
    let hasTimingFunction = false;
    let hasIterationCount = false;
    let hasDirection = false;
    let hasFillMode = false;
    let hasPlayState = false;
    let hasName = false;
    let noneCount = 0;
    for (let i = 0; i < tokens.length; i++) {
        const token = tokens[i];
        const keyword = token.toLowerCase();
        if (keyword === 'none') {
            noneCount++;
            continue;
        }
        if (isValidValue(normalizeAnimationDelayItem, keyword)) {
            if (!hasDuration) {
                if (!isValidValue(normalizeAnimationDurationItem, keyword)) {
                    return null;
                }
                result.duration = keyword;
                hasDuration = true;
            }
            else if (!hasDelay) {
                result.delay = keyword;
                hasDelay = true;
            }
            else {
                return null;
            }
            continue;
        }
        if (!hasTimingFunction &&
            isValidValue(normalizeAnimationTimingFunctionItem, keyword)) {
            result.timingFunction = keyword;
            hasTimingFunction = true;
            continue;
        }
        if (!hasIterationCount &&
            isValidValue(normalizeAnimationIterationCountItem, keyword)) {
            result.iterationCount = keyword;
            hasIterationCount = true;
            continue;
        }
        if (!hasDirection &&
            isValidValue(normalizeAnimationDirectionItem, keyword)) {
            result.direction = keyword;
            hasDirection = true;
            continue;
        }
        if (!hasFillMode && isValidValue(normalizeAnimationFillModeItem, keyword)) {
            result.fillMode = keyword;
            hasFillMode = true;
            continue;
        }
        if (!hasPlayState &&
            isValidValue(normalizeAnimationPlayStateItem, keyword)) {
            result.playState = keyword;
            hasPlayState = true;
            continue;
        }
        if (!hasName && isValidValue(normalizeAnimationNameItem, token)) {
            result.name = token;
            hasName = true;
            continue;
        }
        return null;
    }
    // none 同时属于 animation-name 和 animation-fill-mode，按剩余槽位消歧。
    for (let i = 0; i < noneCount; i++) {
        if (!hasName) {
            result.name = 'none';
            hasName = true;
        }
        else if (!hasFillMode) {
            result.fillMode = 'none';
            hasFillMode = true;
        }
        else {
            return null;
        }
    }
    return result;
}
function parseAnimation(value) {
    const items = splitAnimationList(value);
    if (!items) {
        return null;
    }
    const animations = [];
    for (let i = 0; i < items.length; i++) {
        const animation = parseSingleAnimation(items[i]);
        if (!animation) {
            return null;
        }
        animations.push(animation);
    }
    return {
        name: animations.map((animation) => animation.name).join(','),
        duration: animations.map((animation) => animation.duration).join(','),
        delay: animations.map((animation) => animation.delay).join(','),
        timingFunction: animations
            .map((animation) => animation.timingFunction)
            .join(','),
        iterationCount: animations
            .map((animation) => animation.iterationCount)
            .join(','),
        direction: animations.map((animation) => animation.direction).join(','),
        fillMode: animations.map((animation) => animation.fillMode).join(','),
        playState: animations.map((animation) => animation.playState).join(','),
    };
}
const normalizeAnimation = (v) => parseAnimation((v || '').toString())
    ? { value: v }
    : { value: null, reason: validReason };
function createAnimationTimingFunctionNormalize(property) {
    const keywordNormalize = createSupportedAnimationKeywordNormalize(property);
    const itemNormalize = (v, options) => {
        const value = (v || '').toString().toLowerCase();
        const result = normalizeAnimationTimingFunctionItem(value);
        if (result.value === null) {
            return result;
        }
        const keyword = typeof result.value === 'string' &&
            result.value.startsWith('cubic-bezier(')
            ? 'cubic-bezier()'
            : value;
        const supported = keywordNormalize(keyword, options);
        return supported.value === null ? supported : result;
    };
    return createAnimationListNormalize(itemNormalize);
}
const animationNormalizeFactoryMap = {
    animation: () => normalizeAnimation,
    animationDelay: () => createAnimationListNormalize(normalizeAnimationDelayItem),
    animationDirection: (property) => createAnimationListNormalize(createSupportedAnimationKeywordNormalize(property)),
    animationDuration: (property) => createAnimationListNormalize(createAnimationSyntaxOrKeywordNormalize(normalizeAnimationDurationItem, property)),
    animationFillMode: (property) => createAnimationListNormalize(createSupportedAnimationKeywordNormalize(property)),
    animationIterationCount: (property) => createAnimationListNormalize(createAnimationSyntaxOrKeywordNormalize(normalizeAnimationIterationCountItem, property)),
    animationName: (property) => createAnimationListNormalize(createAnimationSyntaxOrKeywordNormalize(normalizeAnimationNameItem, property)),
    animationPlayState: (property) => createAnimationListNormalize(createSupportedAnimationKeywordNormalize(property)),
    animationTimingFunction: createAnimationTimingFunctionNormalize,
};

const normalizeColor = (v) => {
    v = (v || '').toString();
    if (v.match(/^#[0-9a-fA-F]{6}$/)) {
        return { value: v };
    }
    // rgba issues 13371
    if (v.match(/^#[0-9a-fA-F]{4}$/)) {
        return {
            value: '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3] + v[4] + v[4],
            reason: function reason(k, v, result) {
                return autofixedReason(v, result);
            },
        };
    }
    if (v.match(/^#[0-9a-fA-F]{8}$/)) {
        return {
            value: v,
        };
    }
    if (v.match(/^#[0-9a-fA-F]{3}$/)) {
        return {
            value: '#' + v[1] + v[1] + v[2] + v[2] + v[3] + v[3],
            reason: function reason(k, v, result) {
                return autofixedReason(v, result);
            },
        };
    }
    if (EXTENDED_COLOR_KEYWORDS[v]) {
        return {
            value: EXTENDED_COLOR_KEYWORDS[v],
            reason: function reason(k, v, result) {
                return autofixedReason(v, result);
            },
        };
    }
    let arrColor, r, g, b, a;
    const RGB_REGEXP = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/gi;
    const RGBA_REGEXP = /^rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d*\.?\d+)\s*\)$/gi;
    if ((arrColor = RGB_REGEXP.exec(v))) {
        r = parseInt(arrColor[1]);
        g = parseInt(arrColor[2]);
        b = parseInt(arrColor[3]);
        if (r >= 0 && r <= 255 && g >= 0 && g <= 255 && b >= 0 && b <= 255) {
            return { value: 'rgb(' + [r, g, b].join(',') + ')' };
        }
    }
    if ((arrColor = RGBA_REGEXP.exec(v))) {
        r = parseInt(arrColor[1]);
        g = parseInt(arrColor[2]);
        b = parseInt(arrColor[3]);
        a = parseFloat(arrColor[4]);
        if (r >= 0 &&
            r <= 255 &&
            g >= 0 &&
            g <= 255 &&
            b >= 0 &&
            b <= 255 &&
            a >= 0 &&
            a <= 1) {
            return { value: 'rgba(' + [r, g, b, a].join(',') + ')' };
        }
    }
    if (v === 'transparent') {
        return { value: 'rgba(0,0,0,0)' };
    }
    return {
        value: null,
        reason(k, v, result) {
            return validReason(k, v);
        },
    };
};

const normalizeInteger = (v) => {
    v = (v || '').toString();
    if (v.match(/^[-+]?\d+$/)) {
        return { value: parseInt(v, 10) };
    }
    return {
        value: null,
        reason: function reason(k, v, result) {
            return supportedEnumReason(k, v, ['integer']);
        },
    };
};

function normalizeCssVar(value, keepVar = false) {
    if (keepVar) {
        return value;
    }
    // 目前框架在运行时 initVar 会处理特征值替换为常量
    return value
        .replaceAll(`var(--window-top)`, `CSS_VAR_WINDOW_TOP`)
        .replaceAll(`var(--window-bottom)`, `CSS_VAR_WINDOW_BOTTOM`)
        .replaceAll(`var(--status-bar-height)`, `CSS_VAR_STATUS_BAR_HEIGHT`);
}

function createNormalizeLength({ removePx, property, } = {}) {
    return (v, options) => {
        v = (v || '').toString();
        if (!v.includes('calc(') &&
            ((/var\([^)]+\)/.test(v) &&
                (/--uni-safe-area-inset-(top|bottom|left|right)/.test(v) ||
                    /--status-bar-height/.test(v))) ||
                /--window-(top|bottom)/.test(v) ||
                /env\(([^)]+)\)/.test(v))) {
            v = v.replace(/\s/g, '');
            return { value: normalizeCssVar(v, options.keepVar) };
        }
        const match = v.match(LENGTH_REGEXP);
        if (match) {
            var unit = match[1];
            {
                if (!unit || (unit === 'px' && removePx)) {
                    return { value: parseFloat(v) };
                }
                else if (unit === 'px' ||
                    unit === 'rpx' ||
                    // 只有line-height支持em单位
                    (unit === 'em' && property === 'line-height')) {
                    return { value: v };
                }
            }
        }
        return {
            value: null,
            reason(k, v, result) {
                return supportedEnumReason(k, v, ['number', 'pixel']);
            },
        };
    };
}
const normalizeLength = createNormalizeLength({
    removePx: true,
});
const normalizeLengthWithOptions = createNormalizeLength;
const normalizePercent = (v) => {
    v = (v || '').toString();
    const match = v.match(LENGTH_REGEXP);
    if (match) {
        var unit = match[1];
        if (unit === '%') {
            return { value: v };
        }
    }
    return {
        value: null,
        reason(k, v, result) {
            return supportedEnumReason(k, v, ['percent']);
        },
    };
};

const normalizeNumber = (v) => {
    v = (v || '').toString();
    var match = v.match(LENGTH_REGEXP);
    if (match && !match[1]) {
        return { value: parseFloat(v) };
    }
    return {
        value: null,
        reason: function reason(k, v, result) {
            return supportedEnumReason(k, v, ['number']);
        },
    };
};

const normalizeString = (v) => {
    v = (v || '').toString().replace(/["']/g, '');
    return {
        value: v,
    };
};

const normalizeTransform = (v) => {
    return { value: v };
};

const normalizeInterval = (v, options) => {
    v = (v || 0).toString();
    let match;
    if ((match = v.match(/^\d*\.?\d+(ms|s)?$/))) {
        {
            // uvue 需要单位
            if (match[1]) {
                return { value: v };
            }
        }
    }
    return {
        value: null,
        reason(k, v, result) {
            return supportedEnumReason(k, v, ['number of seconds', 'milliseconds']);
        },
    };
};

function createCombinedNormalize(normalizes) {
    return (v, options) => {
        const reasons = [];
        for (let i = 0; i < normalizes.length; i++) {
            const result = normalizes[i](v, options);
            if (result.value !== null) {
                return result;
            }
            if (result.reason) {
                reasons.push(result.reason);
            }
        }
        return {
            value: null,
            reason(k, v, result) {
                return normalizeReasons(reasons.map((reason) => reason(k, v, result)), k, v).join('\n');
            },
        };
    };
}

const normalizeGradient = (v) => {
    v = (v || '').toString();
    if (/^linear-gradient(.+)$/s.test(v)) {
        return { value: v };
    }
    return {
        // 枚举里会做reason提示
        value: null,
    };
};
const normalizeUrl = (v) => {
    v = (v || '').toString();
    if (/^url(.+)$/s.test(v)) {
        return { value: v };
    }
    return {
        value: null,
    };
};

function normalizePlatform(normalize, uniPlatform) {
    return (v, options, declInfo) => {
        // platform 未定义时候忽略
        const currentPlatform = options.platform;
        const supportedPlatforms = getSupportedPlatforms(uniPlatform, !!options.dom2);
        // TODO 未跨平台支持的属性特殊提示
        if (!supportedPlatforms.includes(currentPlatform)) {
            return {
                value: v,
                reason(k, v, result) {
                    return supportedPropertyReason(k);
                },
            };
        }
        return normalize(v, options, declInfo);
    };
}

function normalizeShorthandProperty(normalize) {
    return (v, options) => {
        v = (v || '').toString();
        const value = [];
        const reasons = [];
        const results = v.split(/\s+/).map((v) => normalize(v, options));
        for (let i = 0; i < results.length; ++i) {
            const res = results[i];
            if (res.value === null) {
                return res;
            }
            if (res.reason) {
                reasons.push(res.reason);
            }
            value.push(res.value);
        }
        return {
            value: value.length === 1 ? value[0] : value.join(' '),
            reason: function (k, v, result) {
                return reasons.map((reason) => reason(k, v, result)).join('\n');
            },
        };
    };
}

function normalizeFontFace(normalize) {
    return (v, options, declInfo) => {
        if (declInfo?.atRule === 'font-face') {
            return {
                value: null,
                reason(k, v, result) {
                    const items = ['font-family', 'src'];
                    const name = '@' + declInfo.atRule;
                    return ('ERROR: property `' +
                        hyphenateStyleProperty(k) +
                        '` is not supported for `' +
                        name +
                        '` (supported properties are: `' +
                        items.join('`|`') +
                        '`)');
                },
            };
        }
        return normalize(v, options, declInfo);
    };
}
// 只有@font-face下的src属性才支持
const normalizeSrc = (v, options, declInfo) => {
    if (declInfo?.atRule === 'font-face') {
        return { value: v };
    }
    return {
        value: null,
        reason(k, v, result) {
            return supportedPropertyReason(k);
        },
    };
};

const normalizeFlexFlow = (v) => {
    v = (v || '').toString();
    const values = v.split(/\s+/);
    // flex-flow 需要定义每一个属性值
    if (values.length === 1) {
        return {
            value: v,
            reason(k, v, result) {
                return supportedValueWithTipsReason(k, v, '(both property values must be explicitly defined)');
            },
        };
    }
    return {
        value: v,
    };
};

// transition-property 不读 css.json
// 从 property.ts 中移动到 map 里，避免循环依赖
const normalizeProperty = (v, options) => {
    v = (v || '').toString();
    v = v
        .split(/\s*,\s*/)
        .map(camelize)
        .join(',');
    // [all, none] 是特殊值
    {
        if (v === 'all' || v === 'none') {
            return { value: v };
        }
    }
    if (v.split(/\s*,\s*/).every((p) => {
        return !!getNormalizeMap(options)[p];
    })) {
        return { value: v };
    }
    return {
        value: null,
        reason: function reason(k, v, result) {
            return supportedEnumReason(k, v, ['css property']);
        },
    };
};
const normalizeDefault = (v) => {
    return { value: v };
};
// 特定属性
const uvueNormalizeMap = {
    transform: normalizeTransform,
    fontFamily: normalizeString,
    textDecoration: normalizeDefault,
    boxShadow: normalizeDefault,
    textShadow: normalizeDefault,
    // transition-property 支持逗号多值分割
    transitionProperty: normalizeProperty,
    transitionTimingFunction: normalizeTimingFunction,
};
const restrictionMap = {
    ["length" /* Restriction.LENGTH */]: normalizeLength,
    ["percentage" /* Restriction.PERCENTAGE */]: normalizePercent,
    ["number" /* Restriction.NUMBER */]: normalizeNumber,
    ["number(0-1)" /* Restriction.NUMBER_0_1 */]: normalizeNumber,
    ["integer" /* Restriction.INTEGER */]: normalizeInteger,
    ["color" /* Restriction.COLOR */]: normalizeColor,
    ["time" /* Restriction.TIME */]: normalizeInterval,
    ["property" /* Restriction.PROPERTY */]: normalizeProperty,
    ["timing-function" /* Restriction.TIMING_FUNCTION */]: normalizeTimingFunction,
    ["gradient" /* Restriction.GRADIENT */]: normalizeGradient,
    ["url" /* Restriction.URL */]: normalizeUrl,
};
// @font-face下不支持的属性
const invalidFontFaceProperties = ['fontWeight', 'fontStyle', 'fontVariant'];
function getUVueNormalizeMap(options) {
    const dom2 = !!options.dom2;
    const result = {
        src: normalizeSrc,
    };
    let cssJson;
    try {
        // eslint-disable-next-line no-restricted-globals
        cssJson = require('../lib/css.json');
    }
    catch (e) {
        // 单元测试环境，源码目录
        // eslint-disable-next-line no-restricted-globals
        cssJson = require('../../lib/css.json');
    }
    const { properties } = cssJson;
    for (let i = 0; i < properties.length; i++) {
        const property = properties[i];
        const prop = camelize(property.name);
        let normalize;
        const dom2NormalizeFactory = dom2 && animationNormalizeFactoryMap[prop];
        const customNormalize = uvueNormalizeMap[prop];
        if (dom2NormalizeFactory) {
            normalize = dom2NormalizeFactory(property);
        }
        else if (customNormalize) {
            normalize = customNormalize;
        }
        else {
            const normalizes = getNormalizes(property, options);
            if (normalizes.length > 1) {
                normalize = createCombinedNormalize(normalizes);
            }
            else if (normalizes.length === 1) {
                normalize = normalizes[0];
            }
            else {
                normalize = normalizeDefault;
            }
            // 简写属性
            if (property.shorthand) {
                normalize = normalizeShorthandProperty(normalize);
            }
            // 处理@font-face下不支持的属性
            if (invalidFontFaceProperties.includes(prop)) {
                normalize = normalizeFontFace(normalize);
            }
            // 校验flexFlow属性值的个数，先临时写死，后续考虑根据css.json动态判断
            if (prop === 'flexFlow') {
                normalize = createCombinedNormalize([normalizeFlexFlow, normalize]);
            }
        }
        result[prop] = normalizePlatform(normalize, property.uniPlatform);
    }
    return result;
}
// 读取 css.json 的 restrictions
function getNormalizes(property, options) {
    const normalizes = [];
    const restrictions = property.restrictions || [];
    restrictions.forEach((restriction) => {
        let normalize = restrictionMap[restriction];
        if (normalize) {
            if (restriction === "length" /* Restriction.LENGTH */) {
                // 如果同时有number和length，例如line-height: 1.5, line-height: 16px，则不能移除px
                normalize = normalizeLengthWithOptions({
                    removePx: options.keepUnitPx
                        ? false
                        : !restrictions.includes("number" /* Restriction.NUMBER */),
                    property: property.name,
                });
            }
            normalizes.push(normalize);
        }
    });
    // enum
    if (property?.values?.length) {
        normalizes.push(createEnumNormalizeWithPlatform(property.values));
    }
    return normalizes;
}
const normalizeMaps = {};
function getNormalizeMap(options) {
    const cacheKey = `uvue:${!!options.dom2}:${!!options.keepUnitPx}`
        ;
    if (normalizeMaps[cacheKey]) {
        return normalizeMaps[cacheKey];
    }
    let normalizeMap;
    {
        normalizeMap = getUVueNormalizeMap(options);
    }
    normalizeMaps[cacheKey] = normalizeMap;
    return normalizeMap;
}

const animationName = 'animation-name' ;
const animationDuration = 'animation-duration'
    ;
const animationDelay = 'animation-delay' ;
const animationTimingFunction = 'animation-timing-function'
    ;
const animationIterationCount = 'animation-iteration-count'
    ;
const animationDirection = 'animation-direction'
    ;
const animationFillMode = 'animation-fill-mode'
    ;
const animationPlayState = 'animation-play-state'
    ;
const animationLonghands = [
    animationName,
    animationDuration,
    animationDelay,
    animationTimingFunction,
    animationIterationCount,
    animationDirection,
    animationFillMode,
    animationPlayState,
];
function createTransformAnimation(options) {
    const normalizeMap = getNormalizeMap(options);
    return (decl, onWarning) => {
        const { value, important, raws, source } = decl;
        const singleVarResult = tryExpandSingleValueVarShorthand(decl, animationLonghands, value);
        if (singleVarResult) {
            return singleVarResult;
        }
        // 无法静态确定变量所属槽位时，完整平铺并由运行时按目标 longhand 投影。
        if (/\bvar\(/i.test(value)) {
            return animationLonghands.map((prop) => createDecl(prop, value, important, raws, source));
        }
        const animation = parseAnimation(value.trim());
        if (!animation) {
            return [decl];
        }
        const values = [
            ['animationName', animation.name],
            ['animationDuration', animation.duration],
            ['animationDelay', animation.delay],
            ['animationTimingFunction', animation.timingFunction],
            ['animationIterationCount', animation.iterationCount],
            ['animationDirection', animation.direction],
            ['animationFillMode', animation.fillMode],
            ['animationPlayState', animation.playState],
        ];
        let invalid = false;
        for (let i = 0; i < values.length; i++) {
            const [property, value] = values[i];
            const result = normalizeMap[property](value, options);
            if (result.value === null) {
                invalid = true;
                if (result.reason) {
                    onWarning?.(result.reason(property, value, result.value));
                }
            }
        }
        if (invalid) {
            return [];
        }
        return [
            createDecl(animationName, animation.name, important, raws, source),
            createDecl(animationDuration, animation.duration, important, raws, source),
            createDecl(animationDelay, animation.delay, important, raws, source),
            createDecl(animationTimingFunction, animation.timingFunction, important, raws, source),
            createDecl(animationIterationCount, animation.iterationCount, important, raws, source),
            createDecl(animationDirection, animation.direction, important, raws, source),
            createDecl(animationFillMode, animation.fillMode, important, raws, source),
            createDecl(animationPlayState, animation.playState, important, raws, source),
        ];
    };
}

function getDeclTransforms(options, dom2) {
    const transformBorder = createTransformBorder()
        ;
    const styleMap = {
        transition: transformTransition,
        border: transformBorder,
        background: createTransformBackground(),
        ['border-top' ]: transformBorder,
        ['border-right' ]: transformBorder,
        ['border-bottom' ]: transformBorder,
        ['border-left' ]: transformBorder,
        ['border-style' ]: transformBorderStyle ,
        ['border-width' ]: transformBorderWidth ,
        ['border-color' ]: transformBorderColor ,
        ['border-radius' ]: transformBorderRadius
            ,
        // uvue已经支持这些简写属性，不需要展开
        // margin,padding继续展开，确保样式的优先级
        margin: transformMargin,
        padding: transformPadding,
        ['flex-flow' ]: transformFlexFlow,
    };
    if (dom2) {
        styleMap.animation = createTransformAnimation(options);
    }
    {
        styleMap.flex = transformFlex;
    }
    let result = {};
    {
        result = styleMap;
    }
    return result;
}
const declTransforms = {};
const expanded = Symbol('expanded');
function expand$1(options) {
    const type = options.type || 'nvue';
    const dom2 = !!options.dom2;
    const transformCacheKey = `${type}:${dom2}:${options.platform || ''}`;
    const plugin = {
        postcssPlugin: `${options.type || 'nvue'}:expand`,
        Declaration(decl, helper) {
            if (decl[expanded]) {
                return;
            }
            const transforms = declTransforms[transformCacheKey] ||
                (declTransforms[transformCacheKey] = getDeclTransforms(options, dom2));
            const transform = transforms[decl.prop];
            if (transform) {
                const res = transform(decl, (reason) => {
                    if (!helper || !decl.warn) {
                        return;
                    }
                    let needLog = false;
                    if (options.logLevel === 'NOTE') {
                        needLog = true;
                    }
                    else if (options.logLevel === 'ERROR') {
                        if (reason.startsWith('ERROR:')) {
                            needLog = true;
                        }
                    }
                    else {
                        if (!reason.startsWith('NOTE:')) {
                            needLog = true;
                        }
                    }
                    if (needLog) {
                        decl.warn(helper.result, reason);
                    }
                });
                const isSame = res.length === 1 && res[0] === decl;
                if (!isSame) {
                    decl.replaceWith(res);
                }
            }
            decl[expanded] = true;
        },
    };
    return plugin;
}

function expand(options = {}) {
    return expand$1(Object.assign({}, options, { dom2: true }));
}

export { expand };
