/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of HDS
 * @kit UIDesignKit
 */
import { LayeredDrawableDescriptor } from '@ohos.arkui.drawableDescriptor';
import image from '@ohos.multimedia.image';
/**
 * Provides HDS capabilities and methods.
 *
 * @namespace hdsDrawable
 * @syscap SystemCapability.UIDesign.Core
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace hdsDrawable {
    /**
     * Returns processed layered icon.
     *
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { LayeredDrawableDescriptor } layeredDrawableDescriptor - Icon drawable descriptor.
     * @param { number } size - Icon size. The unit is vp.
     * @param { boolean } hasBorder - Icon set border or not. The default value is false.
     * @returns { image.PixelMap } The processed layered icon returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsLayeredIcon(bundleName: string, layeredDrawableDescriptor: LayeredDrawableDescriptor, size: number, hasBorder?: boolean): image.PixelMap;
    /**
     * Returns processed icon.
     *
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { image.PixelMap } pixelMap - Icon pixelMap.
     * @param { number } size - Icon size. The unit is vp.
     * @param { image.PixelMap } mask - Mask pixelMap.
     * @param { boolean } hasBorder - Icon set border or not. The default value is false.
     * @returns { image.PixelMap } The processed icon returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsIcon(bundleName: string, pixelMap: image.PixelMap, size: number, mask: image.PixelMap, hasBorder?: boolean): image.PixelMap;
    /**
     * Returns processed icons.
     *
     * @param { Array<Icon> } icons - The icons pixelMap array. The maximum length of array is 500.
     * @param { image.PixelMap } mask - Mask pixelMap.
     * @param { Options } options - Icon options.
     * @returns { Promise<Array<ProcessedIcon>> } The promise of processed icons returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1012600001 - Task is busy.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsIcons(icons: Array<Icon>, mask: image.PixelMap, options: Options): Promise<Array<ProcessedIcon>>;
    /**
     * Returns processed layered icons.
     *
     * @param { Array<LayeredIcon> } icons - The layered icons pixelMap array. The maximum length of array is 500.
     * @param { Options } options - Icon options.
     * @returns { Promise<Array<ProcessedIcon>> } The promise of processed icons returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1012600001 - Task is busy.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsLayeredIcons(icons: Array<LayeredIcon>, options: Options): Promise<Array<ProcessedIcon>>;
    /**
     * Returns processed layered icon asynchronously.
     *
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { LayeredDrawableDescriptor } layeredDrawableDescriptor - Icon drawable descriptor.
     * @param { number } size - Icon size. The unit is vp.
     * @param { boolean } hasBorder - Icon set border or not. The default value is false.
     * @returns { Promise<image.PixelMap> } The promise of processed layered icon returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsLayeredIconAsync(bundleName: string, layeredDrawableDescriptor: LayeredDrawableDescriptor, size: number, hasBorder?: boolean): Promise<image.PixelMap>;
    /**
     * Returns processed icon asynchronously.
     *
     * @param { string } bundleName - Indicates the bundle name of the application.
     * @param { image.PixelMap } pixelMap - Icon pixelMap.
     * @param { number } size - Icon size. The unit is vp.
     * @param { image.PixelMap } mask - Mask pixelMap.
     * @param { boolean } hasBorder - Icon set border or not. The default value is false.
     * @returns { Promise<image.PixelMap> } The promise of processed icon returned by the function.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    function getHdsIconAsync(bundleName: string, pixelMap: image.PixelMap, size: number, mask: image.PixelMap, hasBorder?: boolean): Promise<image.PixelMap>;
    /**
     * Layered icon info.
     *
     * @interface LayeredIcon
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface LayeredIcon {
        /**
         * Indicates the bundle name of the application.
         *
         * @type { string }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        bundleName: string;
        /**
         * Icon drawable descriptor.
         *
         * @type { LayeredDrawableDescriptor }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        layeredDrawableDescriptor: LayeredDrawableDescriptor;
    }
    /**
     * Icon info.
     *
     * @interface Icon
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface Icon {
        /**
         * Indicates the bundle name of the application.
         *
         * @type { string }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        bundleName: string;
        /**
         * Icon pixelMap.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        pixelMap: image.PixelMap;
    }
    /**
     * Processed icon info.
     *
     * @interface ProcessedIcon
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface ProcessedIcon {
        /**
         * Indicates the bundle name of the application.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly bundleName: string;
        /**
         * Icon pixelMap.
         *
         * @type { image.PixelMap }
         * @readonly
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly pixelMap: image.PixelMap;
    }
    /**
     * Icon options.
     *
     * @interface Options
     * @syscap SystemCapability.UIDesign.Core
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface Options {
        /**
         * Icon size. The unit is vp.
         *
         * @type { number }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        size: number;
        /**
         * Icon set border or not. The default value is false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        hasBorder?: boolean;
        /**
         * Parallel number of task. The maximum value is 10.
         *
         * @type { ?number }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        parallelNumber?: number;
    }
}
export default hdsDrawable;
