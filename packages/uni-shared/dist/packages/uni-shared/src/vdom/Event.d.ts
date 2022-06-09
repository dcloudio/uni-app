export declare function normalizeEventType(type: string, options?: AddEventListenerOptions): string;
export interface UniEventListener {
    (evt: UniEvent): void;
    modifiers?: string[];
    wxsEvent?: string;
}
interface UniEventOptions {
    bubbles: boolean;
    cancelable: boolean;
}
export declare class UniEvent {
    type: string;
    bubbles: boolean;
    cancelable: boolean;
    defaultPrevented: boolean;
    detail?: Record<string, any>;
    timeStamp: number;
    _stop: boolean;
    _end: boolean;
    constructor(type: string, opts: UniEventOptions);
    preventDefault(): void;
    stopImmediatePropagation(): void;
    stopPropagation(): void;
}
export declare function createUniEvent(evt: Record<string, any>): UniEvent;
export declare class UniEventTarget {
    listeners: Record<string, UniEventListener[]>;
    dispatchEvent(evt: UniEvent): boolean;
    addEventListener(type: string, listener: UniEventListener, options?: AddEventListenerOptions): void;
    removeEventListener(type: string, callback: UniEventListener, options?: AddEventListenerOptions): void;
}
export declare function parseEventName(name: string): [string, EventListenerOptions | undefined];
export {};
