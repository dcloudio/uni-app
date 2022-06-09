interface Timer {
    setTimeout: Function;
    clearTimeout: Function;
}
/**
 * 需要手动传入 timer,主要是解决 App 平台的定制 timer
 * @param fn
 * @param delay
 * @param timer
 * @returns
 */
export declare function debounce(fn: Function, delay: number, { clearTimeout, setTimeout }: Timer): {
    (this: any): void;
    cancel(): void;
};
export {};
