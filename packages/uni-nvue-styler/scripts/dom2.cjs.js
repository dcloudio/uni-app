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
        const isSingleType = typeof propertyType === 'string';
        const isUnionType = Array.isArray(propertyType);
        if (isSingleType) {
            processorCode = createValueProcessor(propertyType);
        }
        else if (isUnionType) {
            processorCode = createCombinedValueProcessor(propertyName, propertyType, propertyOptions);
        }
        if (propertyOptions.values) {
            if (isSingleType ||
                (isUnionType &&
                    // 如果是联合类型，且每一个都不是定制处理器
                    !propertyType.every((type) => createValueProcessor(type)))) {
                enumCodes.push(genEnumCode(propertyName, propertyOptions.values, propertyOptions.defaultValue));
            }
        }
        entries.push(`['${propertyName}', [${propertyId}, ${processorCode ||
            (propertyOptions.values
                ? genEnumProcessorName(propertyName)
                : `toSharedDataStyleStringValue`)}]]`);
    });
    codes.push(`export const UniCSSPropertyVariable = ${allProperties.indexOf('variable')}`);
    codes.push(`export const processors = new Map<string, [number, (value: string) => any]>([${entries.join(', \n')}])`);
    codes.push(...enumCodes);
    return codes.join('\n');
    function genEnumProcessorName(propertyName) {
        return `toSharedDataStyle${shared.capitalize(shared.camelize(propertyName + ''))}Value`;
    }
    function createCombinedValueProcessor(propertyName, propertyType, propertyOptions) {
        // 目前仅支持两个的联合
        if (propertyType.length === 2 && propertyOptions.values) {
            const basicType = propertyType[1];
            const enumType = propertyType[0];
            if (!(isNumberType(basicType) || isUnitType(basicType))) {
                throw new Error(`Unsupported property type: ${basicType}`);
            }
            return `createToSharedDataStyleCombinedValue([${[
                createValueProcessor(basicType),
                createValueProcessor(enumType) ?? genEnumProcessorName(propertyName),
            ].join(', ')}])`;
        }
        else {
            throw new Error(`Unsupported property type: ${propertyType.join(', ')}`);
        }
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
        else if (isStringType(propertyType)) {
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
