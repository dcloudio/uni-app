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
     * @param { number } size - Icon size.
     * @param { boolean } hasBorder - Icon set border or not.
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
     * @param { number } size - Icon size.
     * @param { image.PixelMap } mask - Mask pixelMap.
     * @param { boolean } hasBorder - Icon set border or not.
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
     * @param { Array<Icon> } icons - The icons pixelMap array.
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
     * @param { Array<Icon> } icons - The layered icons pixelMap array.
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
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly bundleName: string;
        /**
         * Icon pixelMap.
         *
         * @type { image.PixelMap }
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
         * Icon size.
         *
         * @type { number }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        size: number;
        /**
         * Icon set border or not.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.UIDesign.Core
         * @atomicservice
         * @since 5.0.0(12)
         */
        hasBorder?: boolean;
        /**
         * Parallel number of task.
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
