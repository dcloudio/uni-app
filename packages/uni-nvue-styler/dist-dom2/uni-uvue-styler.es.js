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

const backgroundColor = 'background-color' ;
const backgroundImage = 'background-image' ;
const handleTransformBackground = (decl) => {
    let { value, important, raws, source } = decl;
    value = value.trim();
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
    const splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/); // 1pt
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
function createTransformBorder(options) {
    return (decl) => {
        const { prop, value, important, raws, source } = decl;
        let splitResult = value.replace(/\s*,\s*/g, ',').split(/\s+/);
        const havVar = splitResult.some((str) => str.startsWith('var('));
        let result = [];
        // 包含 var ，直接视为 width/style/color 都使用默认值
        if (havVar) {
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
    const splitResult = value.split(/\s+/);
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
    const splitResult = value.split(/\s+/);
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
        const splitResult = value.trim().split(/\s+/);
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
    const splitResult = value.split(/\s+/);
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
        Declaration(decl) {
            if (decl[expanded]) {
                return;
            }
            if (!DeclTransforms) {
                DeclTransforms = getDeclTransforms();
            }
            const transform = DeclTransforms[decl.prop];
            if (transform) {
                const res = transform(decl);
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
