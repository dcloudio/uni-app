import type { Plugin } from 'vite';
import { FilterPattern } from '@rollup/pluginutils';
interface UniEasycomPluginOptions {
    include?: FilterPattern;
    exclude?: FilterPattern;
}
export declare function uniEasycomPlugin(options: UniEasycomPluginOptions): Plugin;
export {};
