/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @kit CameraKit
 */
import type Context from './application/Context';
import type camera from './@ohos.multimedia.camera';
/**
 * @namespace cameraPicker
 * @syscap SystemCapability.Multimedia.Camera.Core
 * @since 11
 */
/**
 * @namespace cameraPicker
 * @syscap SystemCapability.Multimedia.Camera.Core
 * @atomicservice
 * @since 12
 */
declare namespace cameraPicker {
    /**
     * Picker profile settings for take photo and record video.
     *
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    /**
     * Picker profile settings for take photo and record video.
     *
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @atomicservice
     * @since 12
     */
    class PickerProfile {
        /**
         * The camera position to be used.
         *
         * @type { camera.CameraPosition }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The camera position to be used.
         *
         * @type { camera.CameraPosition }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        cameraPosition: camera.CameraPosition;
        /**
         * The uri of the result to be saved.
         *
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The uri of the result to be saved.
         *
         * @type { ?string }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        saveUri?: string;
        /**
         * The max duration of the video.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The max duration of the video.
         *
         * @type { ?number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        videoDuration?: number;
    }
    /**
     * Enum for camera picker media type.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    /**
     * Enum for camera picker media type.
     *
     * @enum { string }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @atomicservice
     * @since 12
     */
    enum PickerMediaType {
        /**
         * Type image, picker provide an ability to take photo.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Type image, picker provide an ability to take photo.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        PHOTO = 'photo',
        /**
         * Type video, picker provide an ability to record video.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Type video, picker provide an ability to record video.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        VIDEO = 'video'
    }
    /**
     * The picker result info for pick function.
     *
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    /**
     * The picker result info for pick function.
     *
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @atomicservice
     * @since 12
     */
    class PickerResult {
        /**
         * The result code.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The result code.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        resultCode: number;
        /**
         * The result saved uri.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The result saved uri.
         *
         * @type { string }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        resultUri: string;
        /**
         * The result resource type.
         *
         * @type { PickerMediaType }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * The result resource type.
         *
         * @type { PickerMediaType }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        mediaType: PickerMediaType;
    }
    /**
     * Pick function to get a photo or video result.
     *
     * @param { Context } context - From UIExtensionAbility.
     * @param { Array<PickerMediaType> } mediaTypes - Pick media type.
     * @param { PickerProfile } pickerProfile - Picker input Profile.
     * @returns { Promise<PickerResult> } pick result.
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    /**
     * Pick function to get a photo or video result.
     *
     * @param { Context } context - From UIExtensionAbility.
     * @param { Array<PickerMediaType> } mediaTypes - Pick media type.
     * @param { PickerProfile } pickerProfile - Picker input Profile.
     * @returns { Promise<PickerResult> } pick result.
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @atomicservice
     * @since 12
     */
    function pick(context: Context, mediaTypes: Array<PickerMediaType>, pickerProfile: PickerProfile): Promise<PickerResult>;
}
export default cameraPicker;
