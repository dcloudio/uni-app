import { ref, shallowRef } from 'vue';
type SSRRef = (value: unknown, key?: string, shallow?: boolean) => ReturnType<typeof ref> | ReturnType<typeof shallowRef>;
export declare const ssrRef: SSRRef;
export declare const shallowSsrRef: SSRRef;
export declare function getSsrGlobalData(): any;
export {};
