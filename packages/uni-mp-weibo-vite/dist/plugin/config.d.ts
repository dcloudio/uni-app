import type { Plugin, ResolvedConfig } from 'vite';
export declare function createConfig(options: {
    resolvedConfig: ResolvedConfig | null;
}): Plugin['config'];
