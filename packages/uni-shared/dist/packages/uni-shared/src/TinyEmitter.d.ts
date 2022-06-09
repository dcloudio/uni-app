interface E {
    e: Record<string, unknown>;
    on: (name: EventName, callback: EventCallback, ctx?: any) => this;
    once: (name: EventName, callback: EventCallback, ctx?: any) => this;
    emit: (name: EventName, ...args: any[]) => this;
    off: (name: EventName, callback?: EventCallback) => this;
}
declare const E: new () => E;
export declare type EventName = string;
export declare type EventCallback = Function;
export default E;
