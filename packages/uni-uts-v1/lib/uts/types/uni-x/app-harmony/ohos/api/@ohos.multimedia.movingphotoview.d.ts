/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
 * @file A component which support applications to show moving photo data
 * @kit MediaLibraryKit
 */
import photoAccessHelper from './@ohos.file.photoAccessHelper';
/**
 * Defines the moving photo view options.
 *
 * @interface MovingPhotoViewOptions
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare interface MovingPhotoViewOptions {
    /**
     * moving photo data.
     *
     * @type { photoAccessHelper.MovingPhoto }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    movingPhoto: photoAccessHelper.MovingPhoto;
    /**
     * controller of MovingPhotoView.
     *
     * @type { ?MovingPhotoViewController }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    controller?: MovingPhotoViewController;
}
/**
 * Defines the moving photo view interface.
 *
 * @interface MovingPhotoViewInterface
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface MovingPhotoViewInterface {
    /**
     * Set the options.
     *
     * @param { MovingPhotoViewOptions } options
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    (options: MovingPhotoViewOptions): MovingPhotoViewAttribute;
}
/**
 * function that moving photo view media events callback.
 *
 * @typedef { function } MovingPhotoViewEventCallback
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare type MovingPhotoViewEventCallback = () => void;
/**
 * Defines the moving photo view attribute functions.
 *
 * @extends CommonMethod<MovingPhotoViewAttribute>
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class MovingPhotoViewAttribute extends CommonMethod<MovingPhotoViewAttribute> {
    /**
     * Called when judging whether the video is muted.
     *
     * @param { boolean } isMuted
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    muted(isMuted: boolean): MovingPhotoViewAttribute;
    /**
     * Called when determining the zoom type of the view.
     *
     * @param { ImageFit } value
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    objectFit(value: ImageFit): MovingPhotoViewAttribute;
    /**
     * Called when the video is played.
     *
     * @param { MovingPhotoViewEventCallback } callback
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onStart(callback: MovingPhotoViewEventCallback): MovingPhotoViewAttribute;
    /**
     * Called when the video playback stopped.
     *
     * @param { MovingPhotoViewEventCallback } callback
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onStop(callback: MovingPhotoViewEventCallback): MovingPhotoViewAttribute;
    /**
     * Called when the video playback paused.
     *
     * @param { MovingPhotoViewEventCallback } callback
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onPause(callback: MovingPhotoViewEventCallback): MovingPhotoViewAttribute;
    /**
     * Called when the video playback ends.
     *
     * @param { MovingPhotoViewEventCallback } callback
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onFinish(callback: MovingPhotoViewEventCallback): MovingPhotoViewAttribute;
    /**
     * Called when playback fails.
     *
     * @param { MovingPhotoViewEventCallback } callback
     * @returns { MovingPhotoViewAttribute }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onError(callback: MovingPhotoViewEventCallback): MovingPhotoViewAttribute;
}
/**
 * Defines the MovingPhotoView controller.
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
export class MovingPhotoViewController {
    /**
     * constructor.
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * Start play moving photo.
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    startPlayback();
    /**
     * Stop play moving photo.
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    stopPlayback();
}
/**
 * Defines MovingPhotoView Component.
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const MovingPhotoView: MovingPhotoViewInterface;
/**
 * Defines MovingPhotoView Component instance.
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const MovingPhotoViewInstance: MovingPhotoViewAttribute;
