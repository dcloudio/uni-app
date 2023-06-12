import type { ViteDevServer } from 'vite';
/**
 * devServer时提供static等目录的静态资源服务
 * @param server
 * @param param
 */
export declare const initStatic: (server: ViteDevServer) => void;
export declare function createPublicFileFilter(base?: string): (id: unknown) => boolean;
