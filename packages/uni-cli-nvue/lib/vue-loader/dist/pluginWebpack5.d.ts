import { Compiler, Plugin } from 'webpack';
declare class VueLoaderPlugin implements Plugin {
    static NS: string;
    apply(compiler: Compiler): void;
}
export default VueLoaderPlugin;
