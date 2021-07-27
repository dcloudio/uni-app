/// <reference types="node" />
import webpack = require('webpack');
import { SFCDescriptor } from '@vue/compiler-sfc';
import { ParsedUrlQuery } from 'querystring';
import { VueLoaderOptions } from 'src';
export declare function selectBlock(descriptor: SFCDescriptor, scopeId: string, options: VueLoaderOptions, loaderContext: webpack.loader.LoaderContext, query: ParsedUrlQuery, appendExtension: boolean): void;
