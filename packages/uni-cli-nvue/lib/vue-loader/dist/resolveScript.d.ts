import webpack = require('webpack');
import { SFCDescriptor, SFCScriptBlock } from '@vue/compiler-sfc';
import { VueLoaderOptions } from 'src';
/**
 * inline template mode can only be enabled if:
 * - is production (separate compilation needed for HMR during dev)
 * - template has no pre-processor (separate loader chain required)
 * - template is not using src
 */
export declare function canInlineTemplate(descriptor: SFCDescriptor, isProd: boolean): boolean;
export declare function resolveScript(descriptor: SFCDescriptor, scopeId: string, options: VueLoaderOptions, loaderContext: webpack.loader.LoaderContext): SFCScriptBlock | null;
