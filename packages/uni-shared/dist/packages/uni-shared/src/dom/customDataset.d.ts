interface HTMLElementWithDataset extends HTMLElement {
    __uniDataset?: Record<string, any>;
}
export declare const initCustomDatasetOnce: () => void;
export declare function getCustomDataset(el: HTMLElement | HTMLElementWithDataset): DOMStringMap & Record<string, any>;
export {};
