export declare const EventOptionFlags: {
    capture: number;
    once: number;
    passive: number;
};
export declare function encodeOptions(options?: AddEventListenerOptions): number;
export declare const EventModifierFlags: {
    stop: number;
    prevent: number;
    self: number;
};
export declare function encodeModifier(modifiers: string[]): number;
