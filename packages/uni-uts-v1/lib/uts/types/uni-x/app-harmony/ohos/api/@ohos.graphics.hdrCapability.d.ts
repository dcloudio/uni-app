/*
* Copyright (C) 2022-2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit ArkGraphics2D
 */

/**
 * HDR Capability.
 *
 * @namespace hdrCapability
 * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
 * @since 11
 */
/**
 * HDR Capability.
 *
 * @namespace hdrCapability
 * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
 * @atomicservice
 * @since 12
 */
declare namespace hdrCapability {
    /**
     * Enumerates the HDR Format
     *
     * @enum { number }
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @since 11
     */
    /**
     * Enumerates the HDR Format
     *
     * @enum { number }
     * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
     * @atomicservice
     * @since 12
     */
    enum HDRFormat {
        /**
         * Not support HDR.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * Not support HDR.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        NONE = 0,
        /**
         * HLG format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * HLG format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        VIDEO_HLG = 1,
        /**
         * HDR10 format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * HDR10 format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        VIDEO_HDR10 = 2,
        /**
         * HDR Vivid format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * HDR Vivid format supported by video.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        VIDEO_HDR_VIVID = 3,
        /**
         * HDR Vivid format supported by image, stored in dual JPEG format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * HDR Vivid format supported by image, stored in dual JPEG format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        IMAGE_HDR_VIVID_DUAL = 4,
        /**
         * HDR Vivid format supported by image, stored in single HEIF format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * HDR Vivid format supported by image, stored in single HEIF format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        IMAGE_HDR_VIVID_SINGLE = 5,
        /**
         * ISO HDR format supported by image, stored in dual JPEG format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * ISO HDR format supported by image, stored in dual JPEG format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        IMAGE_HDR_ISO_DUAL = 6,
        /**
         * ISO HDR format supported by image, stored in single HEIF format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @since 11
         */
        /**
         * ISO HDR format supported by image, stored in single HEIF format.
         *
         * @syscap SystemCapability.Graphic.Graphic2D.ColorManager.Core
         * @atomicservice
         * @since 12
         */
        IMAGE_HDR_ISO_SINGLE = 7
    }
}
export default hdrCapability;
