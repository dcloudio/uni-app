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

const borderWidth = '-width' ;
const borderStyle = '-style' ;
const borderColor = '-color' ;
const BORDER_WIDTH_REGEXP = /^(?:[\d.]+\S*|thin|medium|thick)$/;
const BORDER_STYLE_REGEXP = /^(?:solid|dashed|dotted|none)$/;
const BORDER_SHORTHAND_VAR_ORDER_WARNING = '__borderShorthandVarOrderWarning';
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
    return (decl) => {
        const { prop, value, important, raws, source } = decl;
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
                decl[BORDER_SHORTHAND_VAR_ORDER_WARNING] =
                    createBorderVarOrderWarning(prop, value);
                return [];
            }
            result = splitResult;
            splitResult = [];
        }
        else {
            result = [
                /^[\d\.]+\S*|^(thin|medium|thick)$/,
                /^(solid|dashed|dotted|none)$/,
                /\S+/,
            ].map((item) => {
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

function getDeclTransforms(options) {
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
    {
        styleMap.flex = transformFlex;
    }
    let result = {};
    {
        result = styleMap;
    }
    return result;
}
let DeclTransforms;
const expanded = Symbol('expanded');
function expand(options) {
    const plugin = {
        postcssPlugin: `${options.type || 'nvue'}:expand`,
        Declaration(decl, helper) {
            if (decl[expanded]) {
                return;
            }
            if (!DeclTransforms) {
                DeclTransforms = getDeclTransforms();
            }
            const transform = DeclTransforms[decl.prop];
            if (transform) {
                const res = transform(decl);
                const reason = decl[BORDER_SHORTHAND_VAR_ORDER_WARNING];
                if (reason && helper && decl.warn) {
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
                    delete decl[BORDER_SHORTHAND_VAR_ORDER_WARNING];
                }
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

export { expand };
