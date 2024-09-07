/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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

import image from './@ohos.multimedia.image';
/**
* Declares the screenshot APIs.
*
* @namespace screenshot
* @syscap SystemCapability.WindowManager.WindowManager.Core
* @atomicservice
* @since 12
*/
declare namespace screenshot {
    /**
     * Takes a screenshot and picks it as a PickInfo object.
     *
     * @returns { Promise<PickInfo> } Promise used to return a PickInfo object.
     * @throws { BusinessError } 801 - Capability not supported on this device.
     * @throws { BusinessError } 1400003 - This display manager service works abnormally.
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @atomicservice
     * @since 12
     */
    function pick(): Promise<PickInfo>;
    /**
     * Describes the region of the screen to pick info.
     *
     * @interface PickInfo
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @atomicservice
     * @since 12
     */
    interface PickInfo {
        /**
         * the region of the screen to capture.
         *
         * @type { Rect }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        pickRect: Rect;
        /**
         * the region of the screen to capture pixelMap.
         *
         * @type { image.PixelMap }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        pixelMap: image.PixelMap;
    }
    /**
     * Describes the region of the screen to capture.
     *
     * @interface Rect
     * @syscap SystemCapability.WindowManager.WindowManager.Core
     * @atomicservice
     * @since 12
     */
    interface Rect {
        /**
         * The X-axis coordinate of the upper left vertex of the rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        left: number;
        /**
         * The Y-axis coordinate of the upper left vertex of the rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        top: number;
        /**
         * Width of the rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        width: number;
        /**
         * Height of the rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.WindowManager.WindowManager.Core
         * @atomicservice
         * @since 12
         */
        height: number;
    }
}
export default screenshot;
