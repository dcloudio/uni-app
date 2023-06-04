/// <reference types="node" />
import { IncomingMessage, ServerResponse } from 'http';
interface UniStaticMiddlewareOptions {
    etag: boolean;
    resolve: (pathname: string) => string | void;
}
export type NextHandler = () => void | Promise<void>;
export declare function uniStaticMiddleware(opts: UniStaticMiddlewareOptions): (req: IncomingMessage, res: ServerResponse, next: NextHandler) => void | Promise<void> | ServerResponse<IncomingMessage>;
export {};
