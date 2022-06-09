export declare const defaultRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};
export declare const defaultMiniProgramRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};
export declare const defaultNVueRpx2Unit: {
    unit: string;
    unitRatio: number;
    unitPrecision: number;
};
export declare type Rpx2UnitOptions = typeof defaultRpx2Unit;
export declare function createRpx2Unit(unit: string, unitRatio: number, unitPrecision: number): (val: string) => string;
