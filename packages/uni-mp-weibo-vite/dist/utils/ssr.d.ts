import { Rpx2UnitOptions } from '@dcloudio/uni-shared';
import type { ConfigEnv, ResolvedConfig, UserConfig } from 'vite';
export declare const isSSR: (opt: {
    ssr?: boolean;
} | boolean | undefined) => boolean;
export declare function isSsrManifest(command: ConfigEnv['command'], config: UserConfig | ResolvedConfig): boolean;
export declare const initSsrAliasOnce: () => void;
export declare function initSsrDefine(config: ResolvedConfig): typeof globalThis & {
    __IMPORT_META_ENV_BASE_URL__: any;
};
export declare function generateSsrDefineCode(config: ResolvedConfig, { unit, unitRatio, unitPrecision }: Rpx2UnitOptions): string;
export declare function generateSsrEntryServerCode(): string;
export declare function rewriteSsrVue(): void;
export declare function rewriteSsrResolve(): void;
export declare function rewriteSsrNativeTag(): void;
export declare function rewriteSsrRenderStyle(inputDir: string): void;
