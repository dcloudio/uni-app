
/**
 * Transform flat json in obj to normal json in obj
 */
export declare function handleFlatJson(obj: unknown): unknown;

/**
 * Parse a string path into an array of segments
 */
export declare function parse(path: Path): string[] | undefined;

/** @VueI18nGeneral */
export declare type Path = string;

export declare type PathValue = string | number | boolean | Function | null | {
    [key: string]: PathValue;
} | PathValue[];

export declare function resolveValue(obj: unknown, path: Path): PathValue;

export { }
