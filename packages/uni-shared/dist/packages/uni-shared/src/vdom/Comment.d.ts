import { UniElement } from './Element';
import { IUniPageNode, UniNode } from './Node';
export declare class UniCommentNode extends UniNode {
    constructor(text: string, container: UniElement | IUniPageNode);
    toJSON(opts?: {
        attr?: boolean;
    }): {
        i?: undefined;
    } | {
        i: number;
    };
}
