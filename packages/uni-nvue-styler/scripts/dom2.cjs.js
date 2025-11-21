'use strict';

var shared = require('@vue/shared');

const COLOR_TYPES = ['UniNativeColor', 'UniNativeBorderColor'];
function isColorType(propertyType) {
    return propertyType && COLOR_TYPES.includes(propertyType);
}

const NUMBER_TYPES = ['number'];
function isNumberType(propertyType) {
    return propertyType && NUMBER_TYPES.includes(propertyType);
}

const STRING_TYPES = ['string'];
function isStringType(propertyType) {
    return propertyType && STRING_TYPES.includes(propertyType);
}

const UNIT_TYPES = ['UniCSSUnitValue', 'UniNativeBorderRadius'];
function isUnitType(propertyType) {
    return propertyType && UNIT_TYPES.includes(propertyType);
}

const BORDER_WIDTH_TYPES = ['UniCSSBorderWidthType'];
function isBorderWidthType(propertyType) {
    return propertyType && BORDER_WIDTH_TYPES.includes(propertyType);
}

const TRANSITION_CLASS_NAME = 'UniNativeTransition';
const TRANSITION_DELAY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Delay`;
const TRANSITION_DURATION_CLASS_NAME = `${TRANSITION_CLASS_NAME}Duration`;
const TRANSITION_PROPERTY_CLASS_NAME = `${TRANSITION_CLASS_NAME}Property`;
const TRANSITION_TIMING_FUNCTION_CLASS_NAME = `${TRANSITION_CLASS_NAME}TimingFunction`;
const TRANSITION_TYPES = [
    TRANSITION_DELAY_CLASS_NAME,
    TRANSITION_DURATION_CLASS_NAME,
    TRANSITION_PROPERTY_CLASS_NAME,
    // 复数，单词拼写不对，应该是：Properties
    TRANSITION_PROPERTY_CLASS_NAME + 's',
    TRANSITION_TIMING_FUNCTION_CLASS_NAME,
];
function isTransitionType(propertyType) {
    return propertyType && TRANSITION_TYPES.includes(propertyType);
}

function genRuntimeCode() {
    // eslint-disable-next-line no-restricted-globals
    const appCssJson = require('../lib/dom2/app-css.json');
    // eslint-disable-next-line no-restricted-globals
    const properties = require('../lib/dom2/properties.json');
    const allProperties = Object.keys(properties);
    const codes = [
        `// 此文件是根据 app-css.json 和 properties.json 动态生成，请勿手动修改`,
        `import { toSharedDataStyleColorValue } from '../color'`,
        `import { toSharedDataStyleNumberValue } from '../number'`,
        `import { toSharedDataStyleStringValue } from '../string'`,
        `import { toSharedDataStyleUnitValue } from '../unit'`,
        `import { toSharedDataStyleBorderWidthValue } from '../borderWidth'`,
        `import { createToSharedDataStyleCombinedValue } from './utils'`,
    ];
    const enumCodes = [];
    const entries = [];
    Object.keys(appCssJson).forEach((propertyName) => {
        const propertyId = allProperties.indexOf(propertyName);
        if (propertyId === -1) {
            console.warn(`Property ${propertyName} not found in properties.json`);
            return;
        }
        const propertyOptions = appCssJson[propertyName];
        let processorCode;
        const propertyType = propertyOptions.type;
        if (!propertyType) {
            console.warn(`Property ${propertyName} has no type`);
            entries.push(`['${propertyName}', [${propertyId}, toSharedDataStyleStringValue]]`);
            return;
        }
        const isSingleType = typeof propertyType === 'string';
        const isUnionType = Array.isArray(propertyType);
        if (isSingleType) {
            processorCode = createValueProcessor(propertyType);
        }
        else if (isUnionType &&
            !isEnumAndNumberType(propertyType, propertyOptions)) {
            // enum 和 number 目前无法区分，暂不支持运行时解析
            processorCode = createCombinedValueProcessor(propertyName, propertyType);
        }
        if (propertyType && shouldGenEnumCode(propertyType, propertyOptions)) {
            enumCodes.push(genEnumCode(propertyName, propertyOptions.values, propertyOptions.defaultValue));
        }
        entries.push(`['${propertyName}', [${propertyId}, ${processorCode ||
            (shouldGenEnumCode(propertyType, propertyOptions)
                ? genEnumProcessorName(propertyName)
                : `toSharedDataStyleStringValue`)}]]`);
    });
    codes.push(`export const UniCSSPropertyVariable = ${allProperties.indexOf('variable')}`);
    codes.push(`export const processors = new Map<string, [number, (value: string, propertyName: string) => any]>([${entries.join(', \n')}])`);
    codes.push(...enumCodes);
    return codes.join('\n');
    function genEnumProcessorName(propertyName) {
        return `toSharedDataStyle${shared.capitalize(shared.camelize(propertyName + ''))}Value`;
    }
    function shouldGenEnumCode(propertyType, propertyOptions) {
        if (hasEnumType(propertyType, propertyOptions)) {
            if (shared.isArray(propertyType)) {
                return !isEnumAndNumberType(propertyType, propertyOptions);
            }
            return true;
        }
        return false;
    }
    function hasEnumType(propertyType, propertyOptions) {
        if (!propertyOptions.values) {
            return false;
        }
        if (typeof propertyType === 'string') {
            return true;
        }
        return propertyType.some((type) => !createValueProcessor(type));
    }
    function isEnumAndNumberType(propertyType, propertyOptions) {
        if (hasEnumType(propertyType, propertyOptions)) {
            return propertyType.some((type) => isNumberType(type));
        }
        return false;
    }
    function createCombinedValueProcessor(propertyName, propertyType) {
        const types = new Set();
        propertyType.forEach((type) => {
            types.add(createValueProcessor(type) ?? genEnumProcessorName(propertyName));
        });
        if (types.size > 1) {
            return `createToSharedDataStyleCombinedValue([${Array.from(types).join(', ')}])`;
        }
        return Array.from(types)[0];
    }
    function createValueProcessor(propertyType) {
        if (isUnitType(propertyType)) {
            return `toSharedDataStyleUnitValue`;
        }
        else if (isColorType(propertyType)) {
            return `toSharedDataStyleColorValue`;
        }
        else if (isNumberType(propertyType)) {
            return `toSharedDataStyleNumberValue`;
        }
        else if (isStringType(propertyType) || isTransitionType(propertyType)) {
            return `toSharedDataStyleStringValue`;
        }
        else if (isBorderWidthType(propertyType)) {
            return `toSharedDataStyleBorderWidthValue`;
        }
    }
    function genEnumCode(name, values, defaultValue) {
        return `function toSharedDataStyle${shared.capitalize(shared.camelize(name + ''))}Value(value: string | number) {
  switch (value) {
${genEnumSwitch(values, values.indexOf(defaultValue))}
  }
}`;
    }
    function genEnumSwitch(values, defaultIndex) {
        const cases = values
            .map((value, index) => {
            return `    case '${value}':\n      return ${index}`;
        })
            .join('\n');
        return `${cases}\n    default:\n      return ${defaultIndex}`;
    }
}

exports.genRuntimeCode = genRuntimeCode;
