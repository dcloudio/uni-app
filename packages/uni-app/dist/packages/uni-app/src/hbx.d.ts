export declare function formatAppLog(type: 'log' | 'info' | 'debug' | 'warn' | 'error', filename: string, ...args: unknown[]): void;
export declare function formatH5Log(type: keyof Console, filename: string, ...args: unknown[]): void;
