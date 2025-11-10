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
const handleTransformBackgroundNvue = (decl) => {
    const { value, important, raws, source } = decl;
    if (/^#?\S+$/.test(value) || /^rgba?(.+)$/.test(value)) {
        return [createDecl(backgroundColor, value, important, raws, source)];
    }
    else if (/^linear-gradient(.+)$/.test(value)) {
        return [createDecl(backgroundImage, value, important, raws, source)];
    }
    else if (value == '') {
        return [decl];
    }
    return [decl];
};
function createTransformBackground(options) {
    return (decl) => {
        // nvue 平台维持原有逻辑不变
        const isUvuePlatform = options.type === 'uvue';
        if (isUvuePlatform) {
            return handleTransformBackground(decl);
        }
        else {
            return handleTransformBackgroundNvue(decl);
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
        background: createTransformBackground(options),
        borderTop: transformBorder,
        borderRight: transformBorder,
        borderBottom: transformBorder,
        borderLeft: transformBorder,
        borderStyle: transformBorderStyle ,
        borderWidth: transformBorderWidth ,
        borderColor: transformBorderColor ,
        borderRadius: transformBorderRadius
            ,
        // uvue已经支持这些简写属性，不需要展开
        // margin,padding继续展开，确保样式的优先级
        margin: transformMargin,
        padding: transformPadding,
        flexFlow: transformFlexFlow,
    };
    if (options.type === 'uvue') {
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
                DeclTransforms = getDeclTransforms(options);
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

function toSharedDataStyleValueError(error) {
    if ((process.env.NODE_ENV !== 'production')) {
        console.warn(error);
    }
}

function toSharedDataStyleColorValue(value) {
    return `${value}`;
}

function toSharedDataStyleNumberValue(value) {
    const numValue = parseFloat(String(value));
    if (!isNaN(numValue)) {
        return numValue;
    }
    return toSharedDataStyleValueError(`Invalid number value: ${value}`);
}

function toSharedDataStyleStringValue(value) {
    return `${value}`;
}

var Units = [
	"NONE",
	"AUTO",
	"PX",
	"RPX",
	"PCT",
	"EM",
	"REM",
	"DEG",
	"RAD",
	"S",
	"MS"
];

const unitMatchRe = /^(-?(?:\d*\.\d+|\d+\.?\d*))(%|[a-zA-Z]+)?$/;
function parseUnitValue(value, defaultUnit = 'NONE') {
    if (value === 'auto') {
        return {
            value: 0,
            unit: 'AUTO',
        };
    }
    const unitMatch = value.match(unitMatchRe);
    if (unitMatch) {
        const value = parseFloat(unitMatch[1]);
        const unit = unitMatch[2] ? unitMatch[2].toUpperCase() : null;
        if (unit === null) {
            return {
                value: value,
                unit: defaultUnit,
            };
        }
        return {
            value: value,
            unit: unit === '%' ? 'PCT' : unit,
        };
    }
}
function toSharedDataStyleUnitValue(value) {
    const unitValue = parseUnitValue(String(value));
    if (unitValue) {
        unitValue.unit = Units.indexOf(unitValue.unit);
        return unitValue;
    }
    return toSharedDataStyleValueError(`Invalid unit value: ${value}`);
}

const UniCSSPropertyVariable = 1;
const processors = new Map([
    ['align-content', [48, toSharedDataStyleAlignContent]],
    ['align-items', [46, toSharedDataStyleAlignItems]],
    ['align-self', [47, toSharedDataStyleAlignSelf]],
    ['flex-basis', [44, toSharedDataStyleUnitValue]],
    ['flex-direction', [39, toSharedDataStyleFlexDirection]],
    ['flex-grow', [42, toSharedDataStyleNumberValue]],
    ['flex-shrink', [43, toSharedDataStyleNumberValue]],
    ['flex-wrap', [40, toSharedDataStyleFlexWrap]],
    ['justify-content', [45, toSharedDataStyleJustifyContent]],
    ['bottom', [4, toSharedDataStyleUnitValue]],
    ['display', [50, toSharedDataStyleDisplay]],
    ['height', [7, toSharedDataStyleUnitValue]],
    ['left', [5, toSharedDataStyleUnitValue]],
    ['max-height', [11, toSharedDataStyleUnitValue]],
    ['max-width', [10, toSharedDataStyleUnitValue]],
    ['min-height', [9, toSharedDataStyleUnitValue]],
    ['min-width', [8, toSharedDataStyleUnitValue]],
    ['position', [51, toSharedDataStylePosition]],
    ['right', [3, toSharedDataStyleUnitValue]],
    ['top', [2, toSharedDataStyleUnitValue]],
    ['width', [6, toSharedDataStyleUnitValue]],
    ['visibility', [52, toSharedDataStyleVisibility]],
    ['background-clip', [67, toSharedDataStyleBackgroundClip]],
    ['background-color', [65, toSharedDataStyleColorValue]],
    ['background-image', [66, toSharedDataStyleStringValue]],
    ['border-color', [58, toSharedDataStyleStringValue]],
    ['border-bottom-color', [62, toSharedDataStyleColorValue]],
    ['border-left-color', [61, toSharedDataStyleColorValue]],
    ['border-right-color', [63, toSharedDataStyleColorValue]],
    ['border-top-color', [56, toSharedDataStyleColorValue]],
    ['border-style', [25, toSharedDataStyleBorderStyle]],
    ['border-bottom-style', [34, toSharedDataStyleBorderBottomStyle]],
    ['border-left-style', [37, toSharedDataStyleBorderLeftStyle]],
    ['border-right-style', [31, toSharedDataStyleBorderRightStyle]],
    ['border-top-style', [28, toSharedDataStyleBorderTopStyle]],
    ['border-bottom-width', [33, toSharedDataStyleUnitValue]],
    ['border-left-width', [36, toSharedDataStyleUnitValue]],
    ['border-right-width', [30, toSharedDataStyleUnitValue]],
    ['border-top-width', [27, toSharedDataStyleUnitValue]],
    ['border-bottom-left-radius', [54, toSharedDataStyleNumberValue]],
    ['border-bottom-right-radius', [55, toSharedDataStyleNumberValue]],
    ['border-top-left-radius', [59, toSharedDataStyleNumberValue]],
    ['border-top-right-radius', [60, toSharedDataStyleNumberValue]],
    ['box-shadow', [93, toSharedDataStyleStringValue]],
    ['box-sizing', [12, toSharedDataStyleBoxSizing]],
    ['margin-bottom', [16, toSharedDataStyleUnitValue]],
    ['margin-left', [17, toSharedDataStyleUnitValue]],
    ['margin-right', [15, toSharedDataStyleUnitValue]],
    ['margin-top', [14, toSharedDataStyleUnitValue]],
    ['padding-bottom', [21, toSharedDataStyleUnitValue]],
    ['padding-left', [22, toSharedDataStyleUnitValue]],
    ['padding-right', [20, toSharedDataStyleUnitValue]],
    ['padding-top', [19, toSharedDataStyleUnitValue]],
    ['opacity', [92, toSharedDataStyleNumberValue]],
    ['overflow', [53, toSharedDataStyleOverflow]],
    ['pointer-events', [94, toSharedDataStylePointerEvents]],
    ['z-index', [49, toSharedDataStyleNumberValue]],
    ['transform', [85, toSharedDataStyleStringValue]],
    ['transform-origin', [86, toSharedDataStyleStringValue]],
    ['transition-delay', [90, toSharedDataStyleStringValue]],
    ['transition-duration', [89, toSharedDataStyleStringValue]],
    ['transition-property', [88, toSharedDataStyleStringValue]],
    ['transition-timing-function', [91, toSharedDataStyleStringValue]],
    ['color', [75, toSharedDataStyleColorValue]],
    ['font-family', [68, toSharedDataStyleStringValue]],
    ['font-size', [69, toSharedDataStyleUnitValue]],
    ['font-style', [70, toSharedDataStyleFontStyle]],
    ['font-weight', [71, toSharedDataStyleFontWeight]],
    ['letter-spacing', [73, toSharedDataStyleUnitValue]],
    ['line-height', [72, toSharedDataStyleLineHeight]],
    ['text-align', [76, toSharedDataStyleTextAlign]],
    ['text-decoration-line', [79, toSharedDataStyleTextDecorationLine]],
    ['text-overflow', [82, toSharedDataStyleTextOverflow]],
    ['text-shadow', [83, toSharedDataStyleStringValue]],
    ['white-space', [84, toSharedDataStyleWhiteSpace]],
]);
function toSharedDataStyleAlignContent(value) {
    switch (value) {
        case 'auto':
            return 0;
        case 'flex-start':
            return 1;
        case 'center':
            return 2;
        case 'flex-end':
            return 3;
        case 'stretch':
            return 4;
        case 'baseline':
            return 5;
        case 'space-between':
            return 6;
        case 'space-around':
            return 7;
        case 'space-evenly':
            return 8;
        default:
            return 4;
    }
}
function toSharedDataStyleAlignItems(value) {
    switch (value) {
        case 'auto':
            return 0;
        case 'flex-start':
            return 1;
        case 'center':
            return 2;
        case 'flex-end':
            return 3;
        case 'stretch':
            return 4;
        case 'baseline':
            return 5;
        case 'space-between':
            return 6;
        case 'space-around':
            return 7;
        case 'space-evenly':
            return 8;
        default:
            return 4;
    }
}
function toSharedDataStyleAlignSelf(value) {
    switch (value) {
        case 'auto':
            return 0;
        case 'flex-start':
            return 1;
        case 'center':
            return 2;
        case 'flex-end':
            return 3;
        case 'stretch':
            return 4;
        case 'baseline':
            return 5;
        case 'space-between':
            return 6;
        case 'space-around':
            return 7;
        case 'space-evenly':
            return 8;
        default:
            return 0;
    }
}
function toSharedDataStyleFlexDirection(value) {
    switch (value) {
        case 'row':
            return 0;
        case 'row-reverse':
            return 1;
        case 'column':
            return 2;
        case 'column-reverse':
            return 3;
        default:
            return 2;
    }
}
function toSharedDataStyleFlexWrap(value) {
    switch (value) {
        case 'nowrap':
            return 0;
        case 'wrap':
            return 1;
        case 'wrap-reverse':
            return 2;
        default:
            return 0;
    }
}
function toSharedDataStyleJustifyContent(value) {
    switch (value) {
        case 'auto':
            return 0;
        case 'flex-start':
            return 1;
        case 'center':
            return 2;
        case 'flex-end':
            return 3;
        case 'stretch':
            return 4;
        case 'baseline':
            return 5;
        case 'space-between':
            return 6;
        case 'space-around':
            return 7;
        case 'space-evenly':
            return 8;
        default:
            return 1;
    }
}
function toSharedDataStyleDisplay(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'flex':
            return 1;
        default:
            return 1;
    }
}
function toSharedDataStylePosition(value) {
    switch (value) {
        case 'relative':
            return 0;
        case 'absolute':
            return 1;
        case 'fixed':
            return 2;
        case 'sticky':
            return 3;
        case 'static':
            return 4;
        default:
            return 0;
    }
}
function toSharedDataStyleVisibility(value) {
    switch (value) {
        case 'visible':
            return 0;
        case 'hidden':
            return 1;
        default:
            return 0;
    }
}
function toSharedDataStyleBackgroundClip(value) {
    switch (value) {
        case 'border-box':
            return 0;
        case 'padding-box':
            return 1;
        case 'content-box':
            return 2;
        default:
            return 0;
    }
}
function toSharedDataStyleBorderStyle(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'solid':
            return 1;
        case 'dashed':
            return 2;
        case 'dotted':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleBorderBottomStyle(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'solid':
            return 1;
        case 'dashed':
            return 2;
        case 'dotted':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleBorderLeftStyle(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'solid':
            return 1;
        case 'dashed':
            return 2;
        case 'dotted':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleBorderRightStyle(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'solid':
            return 1;
        case 'dashed':
            return 2;
        case 'dotted':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleBorderTopStyle(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'solid':
            return 1;
        case 'dashed':
            return 2;
        case 'dotted':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleBoxSizing(value) {
    switch (value) {
        case 'content-box':
            return 0;
        case 'border-box':
            return 1;
        default:
            return 1;
    }
}
function toSharedDataStyleOverflow(value) {
    switch (value) {
        case 'visible':
            return 0;
        case 'hidden':
            return 1;
        default:
            return 1;
    }
}
function toSharedDataStylePointerEvents(value) {
    switch (value) {
        case 'auto':
            return 0;
        case 'none':
            return 1;
        default:
            return 0;
    }
}
function toSharedDataStyleFontStyle(value) {
    switch (value) {
        case 'normal':
            return 0;
        case 'italic':
            return 1;
        default:
            return 0;
    }
}
function toSharedDataStyleFontWeight(value) {
    switch (value) {
        case 'normal':
            return 0;
        case 'bold':
            return 1;
        case 'lighter':
            return 2;
        case 'bolder':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleLineHeight(value) {
    switch (value) {
        case 'normal':
            return 0;
        default:
            return -1;
    }
}
function toSharedDataStyleTextAlign(value) {
    switch (value) {
        case 'left':
            return 0;
        case 'right':
            return 1;
        case 'center':
            return 2;
        default:
            return 0;
    }
}
function toSharedDataStyleTextDecorationLine(value) {
    switch (value) {
        case 'none':
            return 0;
        case 'underline':
            return 1;
        case 'overline':
            return 2;
        case 'line-through':
            return 3;
        default:
            return 0;
    }
}
function toSharedDataStyleTextOverflow(value) {
    switch (value) {
        case 'clip':
            return 0;
        case 'ellipsis':
            return 1;
        default:
            return 0;
    }
}
function toSharedDataStyleWhiteSpace(value) {
    switch (value) {
        case 'normal':
            return 0;
        case 'nowrap':
            return 1;
        case 'pre':
            return 2;
        case 'pre-wrap':
            return 3;
        case 'pre-line':
            return 4;
        case 'break-spaces':
            return 5;
        default:
            return 0;
    }
}

function toSharedDataStyle(style, result = {}) {
    style.forEach((value, key) => {
        if (key.startsWith('--')) {
            if (!result[UniCSSPropertyVariable]) {
                result[UniCSSPropertyVariable] = {};
            }
            result[UniCSSPropertyVariable][key] =
                value;
        }
        else {
            const processor = processors.get(key);
            if (processor) {
                const newValue = processor[1](value);
                if (typeof newValue !== 'undefined') {
                    result[processor[0]] = newValue;
                }
            }
        }
    });
    return result;
}

export { expand, toSharedDataStyle };
