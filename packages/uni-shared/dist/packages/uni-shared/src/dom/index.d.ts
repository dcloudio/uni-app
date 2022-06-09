export { initCustomDatasetOnce, getCustomDataset } from './customDataset';
export * from './style';
export declare function passive(passive: boolean): {
    passive: boolean;
};
export declare function normalizeDataset(el: Element): any;
export declare function normalizeTarget(el: HTMLElement): {
    id: string;
    dataset: DOMStringMap & Record<string, any>;
    offsetTop: number;
    offsetLeft: number;
};
export declare function addFont(family: string, source: string, desc?: FontFaceDescriptors): Promise<void>;
export declare function scrollTo(scrollTop: number | string, duration: number, isH5?: boolean): void;
