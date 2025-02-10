interface NormalizeResult {
    name?: string;
    type: string;
    subType?: string;
    className?: string;
    description?: string;
    value?: Object;
}
interface ObjectResultValue {
    properties: Array<NormalizeResult>;
}
interface ObjectResult extends NormalizeResult {
    value: ObjectResultValue;
}
interface ArrayResultValue {
    properties: Array<NormalizeResult>;
}
interface ArrayResult extends NormalizeResult {
    value: ArrayResultValue;
}
interface SetResultEntry {
    value: NormalizeResult;
}
interface SetResultValue {
    entries: Array<SetResultEntry>;
}
interface SetResult extends NormalizeResult {
    value: SetResultValue;
}
interface MapResultEntry {
    key: NormalizeResult;
    value: NormalizeResult;
}
interface MapResultValue {
    entries: Array<MapResultEntry>;
}
interface MapResult extends NormalizeResult {
    value: MapResultValue;
}
type MessageType = 'log' | 'warn' | 'error' | 'info' | 'debug';
interface Message {
    type: MessageType;
    args: Array<Object>;
}
function formatMessage(type: MessageType, args: Array<Object | null>): Message {
    try {
        return {
            type,
            args: formatArgs(args)
        };
    } catch (e) {}
    return {
        type,
        args: []
    };
}
function formatArgs(args: Array<Object | null>) {
    return args.map((arg)=>formatArg(arg));
}
function formatArg(arg: Object | null, depth: number = 0): NormalizeResult {
    if (depth >= 7) {
        return {
            type: 'object',
            value: '[Maximum depth reached]'
        };
    }
    const type = typeof arg;
    switch(type){
        case 'string':
            return formatString(arg as string);
        case 'number':
            return formatNumber(arg as number);
        case 'boolean':
            return formatBoolean(arg as boolean);
        case 'object':
            try {
                return formatObject(arg as object, depth);
            } catch (e) {
                return {
                    type: 'object',
                    value: {
                        properties: []
                    }
                };
            }
        case 'undefined':
            return formatUndefined();
        case 'function':
            return formatFunction(arg as Function);
        case 'symbol':
            return formatUnknown('symbol', arg as Object);
        case 'bigint':
            return formatBigInt(arg as Object);
    }
}
function formatFunction(value: Function): NormalizeResult {
    return {
        type: 'function',
        value: `function ${value.name}() {}`
    };
}
function formatUndefined(): NormalizeResult {
    return {
        type: 'undefined'
    };
}
function formatBoolean(value: boolean): NormalizeResult {
    return {
        type: 'boolean',
        value: String(value)
    };
}
function formatNumber(value: number): NormalizeResult {
    return {
        type: 'number',
        value: String(value)
    };
}
function formatBigInt(value: Object): NormalizeResult {
    return {
        type: 'bigint',
        value: String(value)
    };
}
function formatString(value: string): NormalizeResult {
    return {
        type: 'string',
        value
    };
}
function formatUnknown(type: string, value: Object): NormalizeResult {
    return {
        type,
        value: String(value)
    };
}
function formatObject(value: object, depth: number): NormalizeResult {
    if (value === null) {
        return {
            type: 'null'
        };
    }
    if (Array.isArray(value)) {
        return {
            type: 'object',
            subType: 'array',
            value: {
                properties: value.map((v: Object | null, i: number): NormalizeResult =>formatArrayElement(v, i, depth + 1))
            }
        } as ArrayResult;
    }
    if (value instanceof Set) {
        return {
            type: 'object',
            subType: 'set',
            className: 'Set',
            description: `Set(${value.size})`,
            value: {
                entries: Array.from(value).map((v: Object | null): SetResultEntry =>formatSetEntry(v, depth + 1))
            }
        } as SetResult;
    }
    if (value instanceof Map) {
        return {
            type: 'object',
            subType: 'map',
            className: 'Map',
            description: `Map(${value.size})`,
            value: {
                entries: Array.from(value.entries()).map((v: Array<Object | null>): MapResultEntry =>formatMapEntry(v, depth + 1))
            }
        } as MapResult;
    }
    if (value instanceof Promise) {
        return {
            type: 'object',
            subType: 'promise',
            value: {
                properties: []
            }
        } as ObjectResult;
    }
    if (value instanceof RegExp) {
        return {
            type: 'object',
            subType: 'regexp',
            value: String(value),
            className: 'Regexp'
        };
    }
    if (value instanceof Date) {
        return {
            type: 'object',
            subType: 'date',
            value: String(value),
            className: 'Date'
        };
    }
    if (value instanceof Error) {
        return {
            type: 'object',
            subType: 'error',
            value: value.message || String(value),
            className: value.name || 'Error'
        };
    }
    let className: string | undefined = undefined;
    let entries = Object.entries(value);
    if (isHarmonyBuilderParams(value)) {
        entries = entries.filter((ref)=>{
            let key = ref[0];
            return key !== 'modifier' && key !== 'nodeContent';
        });
    }
    return {
        type: 'object',
        className,
        value: {
            properties: entries.map((entry: [string, Object | null]): NormalizeResult =>formatObjectProperty(entry[0], entry[1], depth + 1))
        }
    } as ObjectResult;
}
function isHarmonyBuilderParams(value: Object) {
    return value.modifier && value.modifier._attribute && value.nodeContent;
}
function formatObjectProperty(name: string, value: Object | null, depth: number) {
    const result = formatArg(value, depth);
    result.name = name;
    return result;
}
function formatArrayElement(value: Object | null, index: number, depth: number) {
    const result = formatArg(value, depth);
    result.name = `${index}`;
    return result;
}
function formatSetEntry(value: Object | null, depth: number): SetResultEntry {
    return {
        value: formatArg(value, depth)
    };
}
function formatMapEntry(value: Array<Object | null>, depth: number): MapResultEntry {
    return {
        key: formatArg(value[0], depth),
        value: formatArg(value[1], depth)
    };
}
function __f__(type: MessageType, filename: string, ...args: Object[]) {
    const message = formatMessage(type, args.concat([
        filename
    ]));
    return message;
}
export { __f__ as __f__ };
