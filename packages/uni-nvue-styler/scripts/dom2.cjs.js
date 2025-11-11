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

function genRuntimeCode() {
    // eslint-disable-next-line no-restricted-globals
    const appCssJson = require('../lib/dom2/app-css.json');
    // eslint-disable-next-line no-restricted-globals
    const properties = require('../lib/dom2/properties.json');
    const allProperties = Object.keys(properties);
    const codes = [
        `import { toSharedDataStyleColorValue } from '../color'`,
        `import { toSharedDataStyleNumberValue } from '../number'`,
        `import { toSharedDataStyleStringValue } from '../string'`,
        `import { toSharedDataStyleUnitValue } from '../unit'`,
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
        if (typeof propertyType === 'string') {
            processorCode = createValueProcessor(propertyType);
        }
        if (propertyOptions.values) {
            enumCodes.push(genEnumCode(propertyName, propertyOptions.values, propertyOptions.defaultValue));
        }
        entries.push(`['${propertyName}', [${propertyId}, ${processorCode ||
            (propertyOptions.values
                ? `toSharedDataStyle${shared.capitalize(shared.camelize(propertyName + ''))}`
                : `toSharedDataStyleStringValue`)}]]`);
    });
    codes.push(`export const UniCSSPropertyVariable = ${allProperties.indexOf('variable')}`);
    codes.push(`export const processors = new Map<string, [number, (value: string) => any]>([${entries.join(', \n')}])`);
    codes.push(...enumCodes);
    return codes.join('\n');
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
    }
    function genEnumCode(name, values, defaultValue) {
        return `function toSharedDataStyle${shared.capitalize(shared.camelize(name + ''))}(value: string | number) {
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
