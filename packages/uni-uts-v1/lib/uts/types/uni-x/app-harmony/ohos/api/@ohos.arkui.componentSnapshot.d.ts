/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit ArkUI
 */
import { AsyncCallback } from './@ohos.base';
import image from './@ohos.multimedia.image';
/**
 * This module allows developers to export snapshot image from a component or a custom builder.
 *
 * @namespace componentSnapshot
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * This module allows developers to export snapshot image from a component or a custom builder.
 *
 * @namespace componentSnapshot
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace componentSnapshot {
    /**
     * Defines the extra options for snapshot taking.
     *
     * @typedef SnapshotOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    interface SnapshotOptions {
        /**
         * Defines the scale property to render the snapshot.
         *
         * @type {?number}
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        scale?: number;
        /**
         * Whether to wait the rendering is finished.
         *
         * @type {?boolean}
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        waitUntilRenderFinished?: boolean;
    }
    /**
     * Take a snapshot of the target component.
     *
     * @param { string } id - Target component ID, set by developer through .id attribute.
     * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Invalid ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Take a snapshot of the target component.
     *
     * @param { string } id - Target component ID, set by developer through .id attribute.
     * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
     * @param { SnapshotOptions } [options] - Define the snapshot options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Invalid ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function get(id: string, callback: AsyncCallback<image.PixelMap>, options?: SnapshotOptions): void;
    /**
     * Take a snapshot of the target component.
     *
     * @param { string } id - Target component ID, set by developer through .id attribute.
     * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Invalid ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Take a snapshot of the target component.
     *
     * @param { string } id - Target component ID, set by developer through .id attribute.
     * @param { SnapshotOptions } [options] - Define the snapshot options.
    * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - Invalid ID.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function get(id: string, options?: SnapshotOptions): Promise<image.PixelMap>;
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @param { AsyncCallback<image.PixelMap> } callback - Callback that contains the snapshot in PixelMap format.
     * @param { number } [delay] - Defines the delay time to render the snapshot.
     * @param { boolean } [checkImageStatus] - Defines if check the image decoding status before taking snapshot.
     * @param { SnapshotOptions } [options] - Define the snapshot options.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createFromBuilder(builder: CustomBuilder, callback: AsyncCallback<image.PixelMap>, delay?: number, checkImageStatus?: boolean, options?: SnapshotOptions): void;
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Generate a snapshot from a custom component builder.
     *
     * @param { CustomBuilder } builder - Builder function of a custom component.
     * @param { number } [delay] - Defines the delay time to render the snapshot.
     * @param { boolean } [checkImageStatus] - Defines if check the image decoding status before taking snapshot.
     * @param { SnapshotOptions } [options] - Define the snapshot options.
     * @returns { Promise<image.PixelMap> } A Promise with the snapshot in PixelMap format.
     * @throws { BusinessError } 401 - Parameter error. Possible causes:
     * <br> 1. Mandatory parameters are left unspecified.
     * <br> 2. Incorrect parameters types.
     * <br> 3. Parameter verification failed.
     * @throws { BusinessError } 100001 - The builder is not a valid build function.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function createFromBuilder(builder: CustomBuilder, delay?: number, checkImageStatus?: boolean, options?: SnapshotOptions): Promise<image.PixelMap>;
}
export default componentSnapshot;
