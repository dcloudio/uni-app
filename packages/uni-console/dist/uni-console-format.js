function formatMessage(type, args) {
    try {
        return {
            type,
            args: formatArgs(args),
        };
    }
    catch (e) {
        // originalConsole.error(e)
    }
    return {
        type,
        args: [],
    };
}
function formatArgs(args) {
    return args.map((arg) => formatArg(arg));
}
function formatArg(arg, depth = 0) {
    if (depth >= 7) {
        return {
            type: 'object',
            value: '[Maximum depth reached]',
        };
    }
    const type = typeof arg;
    switch (type) {
        case 'string':
            return formatString(arg);
        case 'number':
            return formatNumber(arg);
        case 'boolean':
            return formatBoolean(arg);
        case 'object':
            try {
                // 鸿蒙里边 object 可能包含 nativePtr 指针，该指针 typeof 是 object
                // 但是又不能访问上边的任意属性，否则会报：TypeError: Can not get Prototype on non ECMA Object
                // 所以这里需要捕获异常，防止报错
                return formatObject(arg, depth);
            }
            catch (e) {
                return {
                    type: 'object',
                    value: {
                        properties: [],
                    },
                };
            }
        case 'undefined':
            return formatUndefined();
        case 'function':
            return formatFunction(arg);
        case 'symbol':
            {
                return formatUnknown('symbol', arg);
            }
        case 'bigint':
            return formatBigInt(arg);
    }
}
function formatFunction(value) {
    return {
        type: 'function',
        value: `function ${value.name}() {}`,
    };
}
function formatUndefined() {
    return {
        type: 'undefined',
    };
}
function formatBoolean(value) {
    return {
        type: 'boolean',
        value: String(value),
    };
}
function formatNumber(value) {
    return {
        type: 'number',
        value: String(value),
    };
}
function formatBigInt(value) {
    return {
        type: 'bigint',
        value: String(value),
    };
}
function formatString(value) {
    return {
        type: 'string',
        value,
    };
}
function formatUnknown(type, value) {
    return {
        type,
        value: String(value),
    };
}
function formatObject(value, depth) {
    if (value === null) {
        return {
            type: 'null',
        };
    }
    if (Array.isArray(value)) {
        return {
            type: 'object',
            subType: 'array',
            value: {
                properties: value.map((v, i) => formatArrayElement(v, i, depth + 1)),
            },
        };
    }
    if (value instanceof Set) {
        return {
            type: 'object',
            subType: 'set',
            className: 'Set',
            description: `Set(${value.size})`,
            value: {
                entries: Array.from(value).map((v) => formatSetEntry(v, depth + 1)),
            },
        };
    }
    if (value instanceof Map) {
        return {
            type: 'object',
            subType: 'map',
            className: 'Map',
            description: `Map(${value.size})`,
            value: {
                entries: Array.from(value.entries()).map((v) => formatMapEntry(v, depth + 1)),
            },
        };
    }
    if (value instanceof Promise) {
        return {
            type: 'object',
            subType: 'promise',
            value: {
                properties: [],
            },
        };
    }
    if (value instanceof RegExp) {
        return {
            type: 'object',
            subType: 'regexp',
            value: String(value),
            className: 'Regexp',
        };
    }
    if (value instanceof Date) {
        return {
            type: 'object',
            subType: 'date',
            value: String(value),
            className: 'Date',
        };
    }
    if (value instanceof Error) {
        return {
            type: 'object',
            subType: 'error',
            value: value.message || String(value),
            className: value.name || 'Error',
        };
    }
    let className = undefined;
    let entries = Object.entries(value);
    if (isHarmonyBuilderParams(value)) {
        entries = entries.filter(([key]) => key !== 'modifier' && key !== 'nodeContent');
    }
    return {
        type: 'object',
        className,
        value: {
            properties: entries.map((entry) => formatObjectProperty(entry[0], entry[1], depth + 1)),
        },
    };
}
function isHarmonyBuilderParams(value) {
    return value.modifier && value.modifier._attribute && value.nodeContent;
}
function formatObjectProperty(name, value, depth) {
    const result = formatArg(value, depth);
    result.name = name;
    return result;
}
function formatArrayElement(value, index, depth) {
    const result = formatArg(value, depth);
    result.name = `${index}`;
    return result;
}
function formatSetEntry(value, depth) {
    return {
        value: formatArg(value, depth),
    };
}
function formatMapEntry(value, depth) {
    return {
        key: formatArg(value[0], depth),
        value: formatArg(value[1], depth),
    };
}

function __f__(type, filename, ...args) {
    const message = formatMessage(type, [...args, filename]);
    return message;
}

export { __f__ };
