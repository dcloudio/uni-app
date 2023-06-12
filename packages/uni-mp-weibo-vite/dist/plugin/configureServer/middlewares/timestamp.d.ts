import { IncomingMessage, ServerResponse } from 'http';
import type { ViteDevServer } from 'vite';
import { NextHandler } from './static';
export declare function uniTimestampMiddleware(server: ViteDevServer): (req: IncomingMessage, _: ServerResponse, next: NextHandler) => Promise<void>;
