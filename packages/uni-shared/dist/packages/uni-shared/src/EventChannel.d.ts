declare type NavigateToOptionEvents = Record<string, (...args: any[]) => void>;
interface EventChannelListener {
    type: 'on' | 'once';
    fn: (...args: any[]) => void;
}
export declare class EventChannel {
    id?: number;
    private listener;
    private emitCache;
    constructor(id?: number, events?: NavigateToOptionEvents);
    emit(eventName: string, ...args: any[]): number | undefined;
    on(eventName: string, fn: EventChannelListener['fn']): void;
    once(eventName: string, fn: EventChannelListener['fn']): void;
    off(eventName: string, fn: EventChannelListener['fn']): void;
    _clearCache(eventName: string): void;
    _addListener(eventName: string, type: EventChannelListener['type'], fn: EventChannelListener['fn']): void;
}
export {};
