import { hyphenate } from '@vue/shared';

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
const DOM2_CSS_DOCS_BASE_URL = 'https://doc.dcloud.net.cn/uni-app-x/css';
function getDom2PropertyDocsUrl(property) {
    return `${DOM2_CSS_DOCS_BASE_URL}/${hyphenateStyleProperty(property)}.html#suggestion`;
}
function appendDom2Docs(reason, url) {
    return url ? `${reason} 详见：${url}` : reason;
}
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
function tryExpandSingleValueVarShorthand(decl, props, value, dom2) {
    // 只在 dom2 运行时兜底展开，避免影响其它平台现有行为。
    if (!dom2) {
        return null;
    }
    // 当整个简写值只有一个 var() 时，无法静态判断它属于哪个子属性，
    // 这里直接复制到每个长属性，交给运行时再解析。
    if (!isSingleCssVarValue(value)) {
        return null;
    }
    return expandShorthand(decl, props, value);
}
function expandShorthand(decl, props, value) {
    const { important, raws, source } = decl;
    return props.map((prop) => createDecl(prop, value, important, raws, source));
}

const backgroundColor = 'background-color' ;
const backgroundImage = 'background-image' ;
function isCssVarValue$3(value) {
    return /^var\(/i.test(value);
}
function isBackgroundImageValue(value) {
    return value === 'none' || /^linear-gradient(.+)$/.test(value);
}
function isBackgroundColorValue(value) {
    return (!isCssVarValue$3(value) &&
        !isBackgroundImageValue(value) &&
        (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)));
}
const handleTransformBackground = (decl, dom2) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, [backgroundImage, backgroundColor], value, dom2);
    if (singleVarResult) {
        return singleVarResult;
    }
    if (dom2) {
        const values = splitValues(value);
        if (values.length === 2) {
            const variableIndex = values.findIndex(isCssVarValue$3);
            const otherIndex = variableIndex === 0 ? 1 : 0;
            if (variableIndex >= 0 &&
                !isCssVarValue$3(values[otherIndex]) &&
                (isBackgroundImageValue(values[otherIndex]) ||
                    isBackgroundColorValue(values[otherIndex]))) {
                const variableValue = values[variableIndex];
                const otherValue = values[otherIndex];
                const variableIsImage = isBackgroundColorValue(otherValue);
                return [
                    createDecl(backgroundImage, variableIsImage ? variableValue : otherValue, important, raws, source),
                    createDecl(backgroundColor, variableIsImage ? otherValue : variableValue, important, raws, source),
                ];
            }
        }
    }
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
    return dom2 && /\bvar\(/i.test(value)
        ? expandShorthand(decl, [backgroundImage, backgroundColor], value)
        : [decl];
};
function createTransformBackground(options) {
    return (decl) => {
        {
            return handleTransformBackground(decl, !!options.dom2);
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

const borderWidth = '-width' ;
const borderStyle = '-style' ;
const borderColor = '-color' ;
const BORDER_WIDTH_REGEXP = /^(?:[\d.]+\S*|thin|medium|thick)$/;
const BORDER_CALC_WIDTH_REGEXP = /^calc\(.+\)$/i;
// 这里按完整 CSS line-style 识别，后续再交给 border-*-style 的既有校验逻辑报精确错误。
const BORDER_STYLE_REGEXP = /^(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset)$/;
function createBorderVarOrderWarning(prop, value) {
    return supportedValueWithTipsReason(prop, value, '(border shorthand with CSS variables must follow `width style color`, for example: `1px solid var(--color, #999999)`)');
}
function isCssVarValue$2(value) {
    return value.startsWith('var(');
}
function isBorderWidthValue(value, dom2) {
    return (isCssVarValue$2(value) ||
        BORDER_WIDTH_REGEXP.test(value) ||
        (dom2 && BORDER_CALC_WIDTH_REGEXP.test(value)));
}
function isBorderStyleValue(value) {
    return isCssVarValue$2(value) || BORDER_STYLE_REGEXP.test(value);
}
function isBorderColorValue(value, dom2) {
    return (isCssVarValue$2(value) ||
        (!isBorderWidthValue(value, dom2) && !BORDER_STYLE_REGEXP.test(value)));
}
function createTransformBorder(options) {
    return (decl, onWarning) => {
        const { prop, value, important, raws, source } = decl;
        const dom2 = !!options.dom2;
        const singleVarResult = tryExpandSingleValueVarShorthand(decl, [prop + borderWidth, prop + borderStyle, prop + borderColor], value, dom2);
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
                    (!isBorderWidthValue(splitResult[0], dom2) ||
                        !isBorderStyleValue(splitResult[1]) ||
                        !isBorderColorValue(splitResult[2], dom2)))) {
                onWarning?.(createBorderVarOrderWarning(prop, value));
                return [];
            }
            result = splitResult;
            splitResult = [];
        }
        else {
            result = [
                (str) => isBorderWidthValue(str, dom2),
                (str) => BORDER_STYLE_REGEXP.test(str),
                (str) => /\S+/.test(str),
            ].map((matches) => {
                const index = splitResult.findIndex(matches);
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
function transformFlexFlowDecl(decl, dom2) {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const splitResult = splitValues(value);
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, [flexDirection, flexWrap], value, dom2);
    // 单个 var() 无法提前判断是 direction 还是 wrap，dom2 下直接平铺。
    if (singleVarResult) {
        return singleVarResult;
    }
    const matchers = [
        /^(column|column-reverse|row|row-reverse)$/,
        /^(nowrap|wrap|wrap-reverse)$/,
    ];
    const result = matchers.map((item) => {
        const index = splitResult.findIndex((str) => item.test(str));
        return index < 0 ? null : splitResult.splice(index, 1)[0];
    });
    if (dom2 &&
        splitResult.length === 1 &&
        /^var\(/i.test(splitResult[0]) &&
        (result[0] === null || result[1] === null)) {
        result[result[0] === null ? 0 : 1] = splitResult.pop();
    }
    if (splitResult.length) {
        return dom2 && /\bvar\(/i.test(value)
            ? expandShorthand(decl, [flexDirection, flexWrap], value)
            : [decl];
    }
    return [
        createDecl(flexDirection, result[0] || 'column', important, raws, source),
        createDecl(flexWrap, result[1] || 'nowrap', important, raws, source),
    ];
}
function createTransformFlexFlow(dom2) {
    return (decl) => transformFlexFlowDecl(decl, dom2);
}

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
const transitionLonghands = [
    transitionProperty,
    transitionDuration,
    transitionTimingFunction,
    transitionDelay,
];
const TRANSITION_TIME_REGEXP = /^\d*\.?\d+(?:ms|s)$/;
function isCssVarValue$1(value) {
    return /^var\(/i.test(value);
}
function containsCssVar(value) {
    return /\bvar\(/i.test(value);
}
function tryTransformTransitionNestedVariable(decl, dom2) {
    if (!dom2) {
        return null;
    }
    const values = splitValues(decl.value);
    if (values.length < 2 ||
        values.length > 4 ||
        !values.some(containsCssVar) ||
        values.some(isCssVarValue$1) ||
        TRANSITION_TIME_REGEXP.test(values[0]) ||
        !TRANSITION_TIME_REGEXP.test(values[1]) ||
        (values[3] && !TRANSITION_TIME_REGEXP.test(values[3]))) {
        return null;
    }
    const { important, raws, source } = decl;
    return values.map((value, index) => createDecl(transitionLonghands[index], value, important, raws, source));
}
function transformTransitionDecl(decl, dom2) {
    let { value, important, raws, source } = decl;
    value = value.trim();
    if (TRANSITION_TIME_REGEXP.test(value)) {
        return [createDecl(transitionDuration, value, important, raws, source)];
    }
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, transitionLonghands, value, dom2);
    if (singleVarResult) {
        return singleVarResult;
    }
    const variableResult = tryTransformTransitionNestedVariable(decl, dom2);
    if (variableResult) {
        return variableResult;
    }
    if (dom2 && /\bvar\(/i.test(value)) {
        return expandShorthand(decl, transitionLonghands, value);
    }
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
}
function createTransformTransition(dom2) {
    return (decl) => transformTransitionDecl(decl, dom2);
}

const flexGrow = 'flex-grow' ;
const flexShrink = 'flex-shrink' ;
const flexBasis = 'flex-basis' ;
function isCssVarValue(value) {
    return /^var\(/i.test(value);
}
function transformFlexDecl(decl, dom2) {
    let { value, important, raws, source } = decl;
    value = value.trim();
    const result = [];
    const splitResult = splitValues(value);
    const singleVarResult = tryExpandSingleValueVarShorthand(decl, [flexGrow, flexShrink, flexBasis], value, dom2);
    // 单个 var() 无法提前拆出 grow/shrink/basis，dom2 下按完整简写平铺。
    if (singleVarResult) {
        return singleVarResult;
    }
    const variableResult = dom2 && /\bvar\(/i.test(value)
        ? expandShorthand(decl, [flexGrow, flexShrink, flexBasis], value)
        : null;
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
        if (isFlexGrowValid(v1) || (dom2 && isCssVarValue(v1))) {
            if (isFlexShrinkValid(v2)) {
                // flex: 1 2 => 1 2 0%
                result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, v2, important, raws, source), createDecl(flexBasis, '0%', important, raws, source));
                return result;
            }
            else {
                if (dom2 && isCssVarValue(v2)) {
                    return variableResult || [decl];
                }
                // flex: 1 100px => 1 1 100px
                result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, '1', important, raws, source), createDecl(flexBasis, v2, important, raws, source));
                return result;
            }
        }
        else {
            return variableResult || [decl];
        }
    }
    else if (splitResult.length === 3) {
        const [v1, v2, v3] = splitResult;
        if ((isFlexGrowValid(v1) || (dom2 && isCssVarValue(v1))) &&
            (isFlexShrinkValid(v2) || (dom2 && isCssVarValue(v2)))) {
            result.push(createDecl(flexGrow, v1, important, raws, source), createDecl(flexShrink, v2, important, raws, source), createDecl(flexBasis, v3, important, raws, source));
            return result;
        }
        else {
            // fallback
            return variableResult || [decl];
        }
    }
    // 其它情况，原样返回
    return variableResult || [decl];
}
function createTransformFlex(dom2) {
    return (decl) => transformFlexDecl(decl, dom2);
}

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
        fillMode: 'forwards',
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
    return (decl, onWarning) => {
        const { value, important, raws, source } = decl;
        const singleVarResult = tryExpandSingleValueVarShorthand(decl, animationLonghands, value, !!options.dom2);
        if (singleVarResult) {
            return singleVarResult;
        }
        // animation 的各值域无法仅凭变量位置可靠判断，保留完整值交给运行时投影。
        if (/\bvar\(/i.test(value)) {
            return expandShorthand(decl, animationLonghands, value);
        }
        const animation = parseAnimation(value.trim());
        if (!animation) {
            return [decl];
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
    const transformBorder = createTransformBorder(options)
        ;
    const styleMap = {
        transition: createTransformTransition(dom2),
        border: transformBorder,
        background: createTransformBackground(options),
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
        ['flex-flow' ]: createTransformFlexFlow(dom2),
    };
    if (dom2) {
        styleMap.animation = createTransformAnimation(options);
    }
    {
        styleMap.flex = createTransformFlex(dom2);
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
                const res = transform(decl, (reason, property = decl.prop) => {
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
                        decl.warn(helper.result, appendDom2Docs(reason, dom2 ? getDom2PropertyDocsUrl(property) : undefined));
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
