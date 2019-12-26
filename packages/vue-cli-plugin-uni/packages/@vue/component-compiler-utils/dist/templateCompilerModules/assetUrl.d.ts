import { ASTNode } from './utils';
export interface AssetURLOptions {
    [name: string]: string | string[];
}
declare const _default: (userOptions?: AssetURLOptions | undefined) => {
    postTransformNode: (node: ASTNode) => void;
};
export default _default;
