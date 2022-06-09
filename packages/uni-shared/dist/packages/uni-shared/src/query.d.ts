export declare function stringifyQuery(obj?: Record<string, any>, encodeStr?: typeof encodeURIComponent): string;
/**
 * Decode text using `decodeURIComponent`. Returns the original text if it
 * fails.
 *
 * @param text - string to decode
 * @returns decoded string
 */
export declare function decode(text: string | number): string;
export declare function decodedQuery(query?: Record<string, any>): Record<string, string>;
export declare const PLUS_RE: RegExp;
/**
 * https://github.com/vuejs/vue-router-next/blob/master/src/query.ts
 * @internal
 *
 * @param search - search string to parse
 * @returns a query object
 */
export declare function parseQuery(search: string): Record<string, any>;
