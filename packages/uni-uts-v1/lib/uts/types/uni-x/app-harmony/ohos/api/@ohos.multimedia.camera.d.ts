/*
 * Copyright (C) 2022 Huawei Device Co., Ltd.
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
import { ErrorCallback, AsyncCallback } from './@ohos.base';
import type Context from './application/BaseContext';
import image from './@ohos.multimedia.image';
import type colorSpaceManager from './@ohos.graphics.colorSpaceManager';
import photoAccessHelper from './@ohos.file.photoAccessHelper';
/**
 * @namespace camera
 * @syscap SystemCapability.Multimedia.Camera.Core
 * @since 10
 */
/**
 * @namespace camera
 * @syscap SystemCapability.Multimedia.Camera.Core
 * @atomicservice
 * @since 12
 */
declare namespace camera {
    /**
     * Creates a CameraManager instance.
     *
     * @param { Context } context - Current application context.
     * @returns { CameraManager } CameraManager instance.
     * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
     * @throws { BusinessError } 7400201 - Camera service fatal error.
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    function getCameraManager(context: Context): CameraManager;
    /**
     * Enum for camera status.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum CameraStatus {
        /**
         * Appear status.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_STATUS_APPEAR = 0,
        /**
         * Disappear status.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_STATUS_DISAPPEAR = 1,
        /**
         * Available status.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_STATUS_AVAILABLE = 2,
        /**
         * Unavailable status.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_STATUS_UNAVAILABLE = 3
    }
    /**
     * Profile for camera streams.
     *
     * @typedef Profile
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface Profile {
        /**
         * Camera format.
         *
         * @type { CameraFormat }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly format: CameraFormat;
        /**
         * Picture size.
         *
         * @type { Size }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly size: Size;
    }
    /**
     * Frame rate range.
     *
     * @typedef FrameRateRange
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface FrameRateRange {
        /**
         * Min frame rate.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly min: number;
        /**
         * Max frame rate.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly max: number;
    }
    /**
     * Video profile.
     *
     * @typedef VideoProfile
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface VideoProfile extends Profile {
        /**
         * Frame rate in unit fps (frames per second).
         *
         * @type { FrameRateRange }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly frameRateRange: FrameRateRange;
    }
    /**
     * Camera output capability.
     *
     * @typedef CameraOutputCapability
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraOutputCapability {
        /**
         * Preview profiles.
         *
         * @type { Array<Profile> }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly previewProfiles: Array<Profile>;
        /**
         * Photo profiles.
         *
         * @type { Array<Profile> }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly photoProfiles: Array<Profile>;
        /**
         * Video profiles.
         *
         * @type { Array<VideoProfile> }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly videoProfiles: Array<VideoProfile>;
        /**
         * All the supported metadata Object Types.
         *
         * @type { Array<MetadataObjectType> }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly supportedMetadataObjectTypes: Array<MetadataObjectType>;
    }
    /**
     * Enum for camera error code.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum CameraErrorCode {
        /**
         * Parameter missing or parameter type incorrect.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        INVALID_ARGUMENT = 7400101,
        /**
         * Operation not allowed.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        OPERATION_NOT_ALLOWED = 7400102,
        /**
         * Session not config.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        SESSION_NOT_CONFIG = 7400103,
        /**
         * Session not running.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        SESSION_NOT_RUNNING = 7400104,
        /**
         * Session config locked.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        SESSION_CONFIG_LOCKED = 7400105,
        /**
         * Device setting locked.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        DEVICE_SETTING_LOCKED = 7400106,
        /**
         * Can not use camera cause of conflict.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CONFLICT_CAMERA = 7400107,
        /**
         * Camera disabled cause of security reason.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        DEVICE_DISABLED = 7400108,
        /**
         * Can not use camera cause of preempted.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        DEVICE_PREEMPTED = 7400109,
        /**
         * Unresolved conflicts with current configurations.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        UNRESOLVED_CONFLICTS_WITH_CURRENT_CONFIGURATIONS = 7400110,
        /**
         * Camera service fatal error.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        SERVICE_FATAL_ERROR = 7400201
    }
    /**
     * Camera manager object.
     *
     * @interface CameraManager
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraManager {
        /**
         * Gets supported camera descriptions.
         *
         * @returns { Array<CameraDevice> } An array of supported cameras.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        getSupportedCameras(): Array<CameraDevice>;
        /**
         * Gets supported output capability for specific camera.
         *
         * @param { CameraDevice } camera - Camera device.
         * @returns { CameraOutputCapability } The camera output capability.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.CameraManager#getSupportedOutputCapability
         */
        getSupportedOutputCapability(camera: CameraDevice): CameraOutputCapability;
        /**
         * Gets supported scene mode for specific camera.
         *
         * @param { CameraDevice } camera - Camera device.
         * @returns { Array<SceneMode> } An array of supported scene mode of camera.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getSupportedSceneModes(camera: CameraDevice): Array<SceneMode>;
        /**
         * Gets supported output capability for specific camera.
         *
         * @param { CameraDevice } camera - Camera device.
         * @param { SceneMode } mode - Scene mode.
         * @returns { CameraOutputCapability } The camera output capability.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getSupportedOutputCapability(camera: CameraDevice, mode: SceneMode): CameraOutputCapability;
        /**
         * Determine whether camera is muted.
         *
         * @returns { boolean } Is camera muted.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        isCameraMuted(): boolean;
        /**
         * Creates a CameraInput instance by camera.
         *
         * @permission ohos.permission.CAMERA
         * @param { CameraDevice } camera - Camera device used to create the instance.
         * @returns { CameraInput } The CameraInput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Creates a CameraInput instance by camera.
         *
         * @permission ohos.permission.CAMERA
         * @param { CameraDevice } camera - Camera device used to create the instance.
         * @returns { CameraInput } The CameraInput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createCameraInput(camera: CameraDevice): CameraInput;
        /**
         * Creates a CameraInput instance by camera position and type.
         *
         * @permission ohos.permission.CAMERA
         * @param { CameraPosition } position - Target camera position.
         * @param { CameraType } type - Target camera type.
         * @returns { CameraInput } The CameraInput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Creates a CameraInput instance by camera position and type.
         *
         * @permission ohos.permission.CAMERA
         * @param { CameraPosition } position - Target camera position.
         * @param { CameraType } type - Target camera type.
         * @returns { CameraInput } The CameraInput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createCameraInput(position: CameraPosition, type: CameraType): CameraInput;
        /**
         * Creates a PreviewOutput instance.
         *
         * @param { Profile } profile - Preview output profile.
         * @param { string } surfaceId - Surface object id used in camera photo output.
         * @returns { PreviewOutput } The PreviewOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Creates a PreviewOutput instance.
         *
         * @param { Profile } profile - Preview output profile.
         * @param { string } surfaceId - Surface object id used in camera photo output.
         * @returns { PreviewOutput } The PreviewOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createPreviewOutput(profile: Profile, surfaceId: string): PreviewOutput;
        /**
         * Creates a PhotoOutput instance.
         *
         * @param { Profile } profile - Photo output profile.
         * @param { string } surfaceId - Surface object id used in camera photo output.
         * @returns { PhotoOutput } The PhotoOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.CameraManager#createPhotoOutput
         */
        createPhotoOutput(profile: Profile, surfaceId: string): PhotoOutput;
        /**
         * Creates a PhotoOutput instance without surfaceId.
         * Call PhotoOutput capture interface will give a callback,
         * {@link on(type: 'photoAvailable', callback: AsyncCallback<Photo>)}
         *
         * @param { Profile } profile - Photo output profile.
         * @returns { PhotoOutput } The PhotoOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Creates a PhotoOutput instance without surfaceId.
         * Call PhotoOutput capture interface will give a callback,
         * {@link on(type: 'photoAvailable', callback: AsyncCallback<Photo>)}
         *
         * @param { Profile } profile - Photo output profile.
         * @returns { PhotoOutput } The PhotoOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createPhotoOutput(profile: Profile): PhotoOutput;
        /**
         * Creates a VideoOutput instance.
         *
         * @param { VideoProfile } profile - Video profile.
         * @param { string } surfaceId - Surface object id used in camera video output.
         * @returns { VideoOutput } The VideoOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Creates a VideoOutput instance.
         *
         * @param { VideoProfile } profile - Video profile.
         * @param { string } surfaceId - Surface object id used in camera video output.
         * @returns { VideoOutput } The VideoOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createVideoOutput(profile: VideoProfile, surfaceId: string): VideoOutput;
        /**
         * Creates a MetadataOutput instance.
         *
         * @param { Array<MetadataObjectType> } metadataObjectTypes - Array of MetadataObjectType.
         * @returns { MetadataOutput } The MetadataOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Creates a MetadataOutput instance.
         *
         * @param { Array<MetadataObjectType> } metadataObjectTypes - Array of MetadataObjectType.
         * @returns { MetadataOutput } The MetadataOutput instance.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        createMetadataOutput(metadataObjectTypes: Array<MetadataObjectType>): MetadataOutput;
        /**
         * Gets a CaptureSession instance.
         *
         * @returns { CaptureSession } The CaptureSession instance.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.CameraManager#createSession
         */
        createCaptureSession(): CaptureSession;
        /**
         * Gets a Session instance by specific scene mode.
         *
         * @param { SceneMode } mode - Scene mode.
         * @returns { T } The specific Session instance by specific scene mode.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        createSession<T extends Session>(mode: SceneMode): T;
        /**
         * Subscribes camera status change event callback.
         *
         * @param { 'cameraStatus' } type - Event type.
         * @param { AsyncCallback<CameraStatusInfo> } callback - Callback used to get the camera status change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'cameraStatus', callback: AsyncCallback<CameraStatusInfo>): void;
        /**
         * Unsubscribes from camera status change event callback.
         *
         * @param { 'cameraStatus' } type - Event type.
         * @param { AsyncCallback<CameraStatusInfo> } callback - Callback used to get the camera status change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'cameraStatus', callback?: AsyncCallback<CameraStatusInfo>): void;
        /**
         * Check if the device has a torch.
         *
         * @returns { boolean } this value that specifies whether the device has a torch.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        isTorchSupported(): boolean;
        /**
         * Check if a specifies torch mode is supported.
         * @param { TorchMode } mode - torch mode.
         * @returns { boolean } is torch mode supported.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        isTorchModeSupported(mode: TorchMode): boolean;
        /**
         * Get current torch mode.
         *
         * @returns { TorchMode } torch mode.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getTorchMode(): TorchMode;
        /**
         * Set torch mode to the device.
         *
         * @param { TorchMode } mode - torch mode.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Set torch mode to the device.
         *
         * @param { TorchMode } mode - torch mode.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        setTorchMode(mode: TorchMode): void;
        /**
         * Subscribes torch status change event callback.
         *
         * @param { 'torchStatusChange' } type - Event type
         * @param { AsyncCallback<TorchStatusInfo> } callback - Callback used to return the torch status change
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'torchStatusChange', callback: AsyncCallback<TorchStatusInfo>): void;
        /**
         * Unsubscribes torch status change event callback.
         *
         * @param { 'torchStatusChange' } type - Event type
         * @param { AsyncCallback<TorchStatusInfo> } callback - Callback used to return the torch status change
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'torchStatusChange', callback?: AsyncCallback<TorchStatusInfo>): void;
    }
    /**
     * Torch status info.
     *
     * @typedef TorchStatusInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface TorchStatusInfo {
        /**
         * is torch available
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        readonly isTorchAvailable: boolean;
        /**
         * is torch active
         *
         * @type { boolean }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        readonly isTorchActive: boolean;
        /**
         * the current torch brightness level.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        readonly torchLevel: number;
    }
    /**
     * Enum for torch mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    enum TorchMode {
        /**
         * The device torch is always off.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        OFF = 0,
        /**
         * The device torch is always on.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        ON = 1,
        /**
         * The device continuously monitors light levels and uses the torch when necessary.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        AUTO = 2
    }
    /**
     * Camera status info.
     *
     * @typedef CameraStatusInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraStatusInfo {
        /**
         * Camera instance.
         *
         * @type { CameraDevice }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        camera: CameraDevice;
        /**
         * Current camera status.
         *
         * @type { CameraStatus }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        status: CameraStatus;
    }
    /**
     * Enum for camera position.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    /**
     * Enum for camera position.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @atomicservice
     * @since 12
     */
    enum CameraPosition {
        /**
         * Unspecified position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Unspecified position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        CAMERA_POSITION_UNSPECIFIED = 0,
        /**
         * Back position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Back position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        CAMERA_POSITION_BACK = 1,
        /**
         * Front position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Front position.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        CAMERA_POSITION_FRONT = 2,
        /**
         * Camera that is inner position when the device is folded.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Camera that is inner position when the device is folded.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @atomicservice
         * @since 12
         */
        CAMERA_POSITION_FOLD_INNER = 3
    }
    /**
     * Enum for camera type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum CameraType {
        /**
         * Default camera type
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_TYPE_DEFAULT = 0,
        /**
         * Wide camera
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_TYPE_WIDE_ANGLE = 1,
        /**
         * Ultra wide camera
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_TYPE_ULTRA_WIDE = 2,
        /**
         * Telephoto camera
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_TYPE_TELEPHOTO = 3,
        /**
         * True depth camera
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_TYPE_TRUE_DEPTH = 4
    }
    /**
     * Enum for camera connection type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum ConnectionType {
        /**
         * Built-in camera.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_CONNECTION_BUILT_IN = 0,
        /**
         * Camera connected using USB
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_CONNECTION_USB_PLUGIN = 1,
        /**
         * Remote camera
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_CONNECTION_REMOTE = 2
    }
    /**
     * Camera device object.
     *
     * @typedef CameraDevice
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraDevice {
        /**
         * Camera id attribute.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly cameraId: string;
        /**
         * Camera position attribute.
         *
         * @type { CameraPosition }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly cameraPosition: CameraPosition;
        /**
         * Camera type attribute.
         *
         * @type { CameraType }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly cameraType: CameraType;
        /**
         * Camera connection type attribute.
         *
         * @type { ConnectionType }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly connectionType: ConnectionType;
        /**
         * Camera sensor orientation attribute.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        readonly cameraOrientation: number;
    }
    /**
     * Size parameter.
     *
     * @typedef Size
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface Size {
        /**
         * Height.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        height: number;
        /**
         * Width.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        width: number;
    }
    /**
     * Point parameter.
     *
     * @typedef Point
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface Point {
        /**
         * x co-ordinate
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        x: number;
        /**
         * y co-ordinate
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        y: number;
    }
    /**
     * Camera input object.
     *
     * @interface CameraInput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraInput {
        /**
         * Open camera.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400107 - Can not use camera cause of conflict.
         * @throws { BusinessError } 7400108 - Camera disabled cause of security reason.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        open(callback: AsyncCallback<void>): void;
        /**
         * Open camera.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400107 - Can not use camera cause of conflict.
         * @throws { BusinessError } 7400108 - Camera disabled cause of security reason.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        open(): Promise<void>;
        /**
         * Open camera.
         *
         * @param { boolean } isSecureEnabled - Enable secure camera.
         * @returns { Promise<bigint> } Promise used to return the result.
         * @throws { BusinessError } 7400107 - Can not use camera cause of conflict.
         * @throws { BusinessError } 7400108 - Camera disabled cause of security reason.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        open(isSecureEnabled: boolean): Promise<bigint>;
        /**
         * Close camera.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        close(callback: AsyncCallback<void>): void;
        /**
         * Close camera.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        close(): Promise<void>;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { CameraDevice } camera - Camera device.
         * @param { ErrorCallback } callback - Callback used to get the camera input errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'error', camera: CameraDevice, callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { CameraDevice } camera - Camera device.
         * @param { ErrorCallback } callback - Callback used to get the camera input errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'error', camera: CameraDevice, callback?: ErrorCallback): void;
    }
    /**
     * Enumerates the camera scene modes.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    enum SceneMode {
        /**
         * Normal photo mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        NORMAL_PHOTO = 1,
        /**
         * Normal video mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        NORMAL_VIDEO = 2,
        /**
         * Secure camera mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        SECURE_PHOTO = 12
    }
    /**
     * Enum for camera format type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum CameraFormat {
        /**
         * RGBA 8888 Format.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_FORMAT_RGBA_8888 = 3,
        /**
         * YUV 420 Format.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_FORMAT_YUV_420_SP = 1003,
        /**
         * JPEG Format.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        CAMERA_FORMAT_JPEG = 2000,
        /**
         * YCBCR P010 Format.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        CAMERA_FORMAT_YCBCR_P010,
        /**
         * YCRCB P010 Format.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        CAMERA_FORMAT_YCRCB_P010
    }
    /**
     * Enum for flash mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum FlashMode {
        /**
         * Close mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FLASH_MODE_CLOSE = 0,
        /**
         * Open mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FLASH_MODE_OPEN = 1,
        /**
         * Auto mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FLASH_MODE_AUTO = 2,
        /**
         * Always open mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FLASH_MODE_ALWAYS_OPEN = 3
    }
    /**
     * Flash Query object.
     *
     * @interface FlashQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface FlashQuery {
        /**
         * Check if device has flash light.
         *
         * @returns { boolean } The flash light support status.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Check if device has flash light.
         * Move to FlashQuery interface from Flash since 12.
         *
         * @returns { boolean } The flash light support status.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        hasFlash(): boolean;
        /**
         * Checks whether a specified flash mode is supported.
         *
         * @param { FlashMode } flashMode - Flash mode
         * @returns { boolean } Is the flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Checks whether a specified flash mode is supported.
         * Move to FlashQuery interface from Flash since 12.
         *
         * @param { FlashMode } flashMode - Flash mode
         * @returns { boolean } Is the flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        isFlashModeSupported(flashMode: FlashMode): boolean;
    }
    /**
     * Flash object.
     *
     * @interface Flash
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Flash extends FlashQuery {
        /**
         * Gets current flash mode.
         *
         * @returns { FlashMode } The current flash mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getFlashMode(): FlashMode;
        /**
         * Sets flash mode.
         *
         * @param { FlashMode } flashMode - Target flash mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setFlashMode(flashMode: FlashMode): void;
    }
    /**
     * Enum for exposure mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum ExposureMode {
        /**
         * Lock exposure mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        EXPOSURE_MODE_LOCKED = 0,
        /**
         * Auto exposure mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        EXPOSURE_MODE_AUTO = 1,
        /**
         * Continuous automatic exposure.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        EXPOSURE_MODE_CONTINUOUS_AUTO = 2
    }
    /**
     * AutoExposureQuery object.
     *
     * @interface AutoExposureQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface AutoExposureQuery {
        /**
         * Checks whether a specified exposure mode is supported.
         *
         * @param { ExposureMode } aeMode - Exposure mode
         * @returns { boolean } Is the exposure mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Checks whether a specified exposure mode is supported.
         * Move to AutoExposureQuery interface from AutoExposure interface since 12.
         *
         * @param { ExposureMode } aeMode - Exposure mode
         * @returns { boolean } Is the exposure mode supported.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        isExposureModeSupported(aeMode: ExposureMode): boolean;
        /**
         * Query the exposure compensation range.
         *
         * @returns { Array<number> } The array of compensation range.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Query the exposure compensation range.
         * Move to AutoExposureQuery interface from AutoExposure interface since 12.
         *
         * @returns { Array<number> } The array of compensation range.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getExposureBiasRange(): Array<number>;
    }
    /**
     * AutoExposure object.
     *
     * @interface AutoExposure
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface AutoExposure extends AutoExposureQuery {
        /**
         * Gets current exposure mode.
         *
         * @returns { ExposureMode } The current exposure mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getExposureMode(): ExposureMode;
        /**
         * Sets Exposure mode.
         *
         * @param { ExposureMode } aeMode - Exposure mode
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setExposureMode(aeMode: ExposureMode): void;
        /**
         * Gets current metering point.
         *
         * @returns { Point } The current metering point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getMeteringPoint(): Point;
        /**
         * Set the center point of the metering area.
         *
         * @param { Point } point - metering point
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setMeteringPoint(point: Point): void;
        /**
         * Query the exposure compensation range.
         *
         * @returns { Array<number> } The array of compensation range.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getExposureBiasRange(): Array<number>;
        /**
         * Set exposure compensation.
         *
         * @param { number } exposureBias - Exposure compensation
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Set exposure compensation.
         *
         * @param { number } exposureBias - Exposure compensation
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        setExposureBias(exposureBias: number): void;
        /**
         * Query the exposure value.
         *
         * @returns { number } The exposure value.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getExposureValue(): number;
    }
    /**
     * Enum for focus mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum FocusMode {
        /**
         * Manual mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_MODE_MANUAL = 0,
        /**
         * Continuous auto mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_MODE_CONTINUOUS_AUTO = 1,
        /**
         * Auto mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_MODE_AUTO = 2,
        /**
         * Locked mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_MODE_LOCKED = 3
    }
    /**
     * Enum for focus state.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum FocusState {
        /**
         * Scan state.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_STATE_SCAN = 0,
        /**
         * Focused state.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_STATE_FOCUSED = 1,
        /**
         * Unfocused state.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FOCUS_STATE_UNFOCUSED = 2
    }
    /**
     * Focus Query object.
     *
     * @interface FocusQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface FocusQuery {
        /**
         * Checks whether a specified focus mode is supported.
         *
         * @param { FocusMode } afMode - Focus mode.
         * @returns { boolean } Is the focus mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Checks whether a specified focus mode is supported.
         * Move to FocusQuery interface from Focus interface since 12.
         *
         * @param { FocusMode } afMode - Focus mode.
         * @returns { boolean } Is the focus mode supported.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        isFocusModeSupported(afMode: FocusMode): boolean;
    }
    /**
     * Focus object.
     *
     * @interface Focus
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Focus extends FocusQuery {
        /**
         * Gets current focus mode.
         *
         * @returns { FocusMode } The current focus mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getFocusMode(): FocusMode;
        /**
         * Sets focus mode.
         *
         * @param { FocusMode } afMode - Target focus mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setFocusMode(afMode: FocusMode): void;
        /**
         * Sets focus point.
         *
         * @param { Point } point - Target focus point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setFocusPoint(point: Point): void;
        /**
         * Gets current focus point.
         *
         * @returns { Point } The current focus point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getFocusPoint(): Point;
        /**
         * Gets current focal length.
         *
         * @returns { number } The current focal point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getFocalLength(): number;
    }
    /**
     * Enum for smooth zoom mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    enum SmoothZoomMode {
        /**
         * Normal zoom mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        NORMAL = 0
    }
    /**
     * SmoothZoomInfo object
     *
     * @typedef SmoothZoomInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface SmoothZoomInfo {
        /**
         * The duration of smooth zoom.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        duration: number;
    }
    /**
     * Zoom query object.
     *
     * @interface ZoomQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface ZoomQuery {
        /**
         * Gets all supported zoom ratio range.
         *
         * @returns { Array<number> } The zoom ratio range.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Gets all supported zoom ratio range.
         * Move to ZoomQuery interface from Zoom since 12.
         *
         * @returns { Array<number> } The zoom ratio range.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getZoomRatioRange(): Array<number>;
    }
    /**
     * Zoom object.
     *
     * @interface Zoom
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Zoom extends ZoomQuery {
        /**
         * Gets zoom ratio.
         *
         * @returns { number } The zoom ratio value.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Gets zoom ratio.
         *
         * @returns { number } The zoom ratio value.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getZoomRatio(): number;
        /**
         * Sets zoom ratio.
         *
         * @param { number } zoomRatio - Target zoom ratio.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setZoomRatio(zoomRatio: number): void;
        /**
         * Sets target zoom ratio by smooth method.
         *
         * @param { number } targetRatio - Target zoom ratio.
         * @param { SmoothZoomMode } mode - Smooth zoom mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setSmoothZoom(targetRatio: number, mode?: SmoothZoomMode): void;
    }
    /**
     * Enum for video stabilization mode.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum VideoStabilizationMode {
        /**
         * Turn off video stablization.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        OFF = 0,
        /**
         * LOW mode provides basic stabilization effect.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        LOW = 1,
        /**
         * MIDDLE mode means algorithms can achieve better effects than LOW mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        MIDDLE = 2,
        /**
         * HIGH mode means algorithms can achieve better effects than MIDDLE mode.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        HIGH = 3,
        /**
         * Camera HDF can select mode automatically.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        AUTO = 4
    }
    /**
     * Stabilization Query object.
     *
     * @interface StabilizationQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface StabilizationQuery {
        /**
         * Check whether the specified video stabilization mode is supported.
         *
         * @param { VideoStabilizationMode } vsMode - Video Stabilization mode.
         * @returns { boolean } Is flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Check whether the specified video stabilization mode is supported.
         * Move to StabilizationQuery interface from Stabilization since 12.
         *
         * @param { VideoStabilizationMode } vsMode - Video Stabilization mode.
         * @returns { boolean } Is flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        isVideoStabilizationModeSupported(vsMode: VideoStabilizationMode): boolean;
    }
    /**
     * Stabilization object.
     *
     * @interface Stabilization
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Stabilization extends StabilizationQuery {
        /**
         * Query the video stabilization mode currently in use.
         *
         * @returns { VideoStabilizationMode } The current video stabilization mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        getActiveVideoStabilizationMode(): VideoStabilizationMode;
        /**
         * Set video stabilization mode.
         *
         * @param { VideoStabilizationMode } mode - video stabilization mode to set.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        setVideoStabilizationMode(mode: VideoStabilizationMode): void;
    }
    /**
     * Color Management Query object.
     *
     * @interface ColorManagementQuery
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface ColorManagementQuery {
        /**
         * Gets the supported color space types.
         *
         * @returns { Array<colorSpaceManager.ColorSpace> } The array of the supported color space for the session.
         * @throws { BusinessError } 7400103 - Session not config, only throw in session usage.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getSupportedColorSpaces(): Array<colorSpaceManager.ColorSpace>;
    }
    /**
     * Color Management object.
     *
     * @interface ColorManagement
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface ColorManagement extends ColorManagementQuery {
        /**
         * Gets the specific color space type.
         *
         * @returns { colorSpaceManager.ColorSpace } Current color space.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getActiveColorSpace(): colorSpaceManager.ColorSpace;
        /**
         * Sets a color space for the session.
         *
         * @param { colorSpaceManager.ColorSpace } colorSpace - The type of color space.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - The colorSpace does not match the format.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        setColorSpace(colorSpace: colorSpaceManager.ColorSpace): void;
    }
    /**
     * Session object.
     *
     * @interface Session
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Session {
        /**
         * Begin capture session config.
         *
         * @throws { BusinessError } 7400105 - Session config locked.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Begin capture session config.
         *
         * @throws { BusinessError } 7400105 - Session config locked.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        beginConfig(): void;
        /**
         * Commit capture session config.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        commitConfig(callback: AsyncCallback<void>): void;
        /**
         * Commit capture session config.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        commitConfig(): Promise<void>;
        /**
         * Determines whether the camera input can be added into the session.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraInput } cameraInput - Target camera input to add.
         * @returns { boolean } You can add the input into the session.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        canAddInput(cameraInput: CameraInput): boolean;
        /**
         * Adds a camera input.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraInput } cameraInput - Target camera input to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Adds a camera input.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraInput } cameraInput - Target camera input to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        addInput(cameraInput: CameraInput): void;
        /**
         * Removes a camera input.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraInput } cameraInput - Target camera input to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Removes a camera input.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraInput } cameraInput - Target camera input to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        removeInput(cameraInput: CameraInput): void;
        /**
         * Determines whether the camera output can be added into the session.
         * This method is valid after Session.addInput(cameraInput) and before Session.commitConfig().
         *
         * @param { CameraOutput } cameraOutput - Target camera output to add.
         * @returns { boolean } You can add the output into the session.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        canAddOutput(cameraOutput: CameraOutput): boolean;
        /**
         * Adds a camera output.
         * This method is valid after Session.addInput(cameraInput) and before Session.commitConfig().
         *
         * @param { CameraOutput } cameraOutput - Target camera output to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Adds a camera output.
         * This method is valid after Session.addInput(cameraInput) and before Session.commitConfig().
         *
         * @param { CameraOutput } cameraOutput - Target camera output to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        addOutput(cameraOutput: CameraOutput): void;
        /**
         * Removes a camera output.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraOutput } cameraOutput - Target camera output to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Removes a camera output.
         * This method is valid between Session.beginConfig() and Session.commitConfig().
         *
         * @param { CameraOutput } cameraOutput - Target camera output to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        removeOutput(cameraOutput: CameraOutput): void;
        /**
         * Starts capture session.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Starts capture session.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Starts capture session.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        /**
         * Starts capture session.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        start(): Promise<void>;
        /**
         * Stops capture session.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stops capture session.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        stop(): Promise<void>;
        /**
         * Release capture session instance.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release capture session instance.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        release(): Promise<void>;
    }
    /**
     * Capture session object.
     *
     * @interface CaptureSession
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     * @deprecated since 11
     * @useinstead ohos.multimedia.camera.VideoSession
     */
    interface CaptureSession {
        /**
         * Begin capture session config.
         *
         * @throws { BusinessError } 7400105 - Session config locked.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#beginConfig
         */
        beginConfig(): void;
        /**
         * Commit capture session config.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#commitConfig
         */
        commitConfig(callback: AsyncCallback<void>): void;
        /**
         * Commit capture session config.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#commitConfig
         */
        commitConfig(): Promise<void>;
        /**
         * Adds a camera input.
         *
         * @param { CameraInput } cameraInput - Target camera input to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#addInput
         */
        addInput(cameraInput: CameraInput): void;
        /**
         * Removes a camera input.
         *
         * @param { CameraInput } cameraInput - Target camera input to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#removeInput
         */
        removeInput(cameraInput: CameraInput): void;
        /**
         * Adds a camera output.
         *
         * @param { CameraOutput } cameraOutput - Target camera output to add.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#addOutput
         */
        addOutput(cameraOutput: CameraOutput): void;
        /**
         * Removes a camera output.
         *
         * @param { CameraOutput } cameraOutput - Target camera output to remove.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#removeOutput
         */
        removeOutput(cameraOutput: CameraOutput): void;
        /**
         * Starts capture session.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#start
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Starts capture session.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#start
         */
        start(): Promise<void>;
        /**
         * Stops capture session.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#stop
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stops capture session.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#stop
         */
        stop(): Promise<void>;
        /**
         * Release capture session instance.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#release
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release capture session instance.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#release
         */
        release(): Promise<void>;
        /**
         * Check if device has flash light.
         *
         * @returns { boolean } The flash light support status.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Flash#hasFlash
         */
        hasFlash(): boolean;
        /**
         * Checks whether a specified flash mode is supported.
         *
         * @param { FlashMode } flashMode - Flash mode
         * @returns { boolean } Is the flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Flash#isFlashModeSupported
         */
        isFlashModeSupported(flashMode: FlashMode): boolean;
        /**
         * Gets current flash mode.
         *
         * @returns { FlashMode } The current flash mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Flash#getFlashMode
         */
        getFlashMode(): FlashMode;
        /**
         * Sets flash mode.
         *
         * @param { FlashMode } flashMode - Target flash mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Flash#setFlashMode
         */
        setFlashMode(flashMode: FlashMode): void;
        /**
         * Checks whether a specified exposure mode is supported.
         *
         * @param { ExposureMode } aeMode - Exposure mode
         * @returns { boolean } Is the exposure mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#isExposureModeSupported
         */
        isExposureModeSupported(aeMode: ExposureMode): boolean;
        /**
         * Gets current exposure mode.
         *
         * @returns { ExposureMode } The current exposure mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#getExposureMode
         */
        getExposureMode(): ExposureMode;
        /**
         * Sets Exposure mode.
         *
         * @param { ExposureMode } aeMode - Exposure mode
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#setExposureMode
         */
        setExposureMode(aeMode: ExposureMode): void;
        /**
         * Gets current metering point.
         *
         * @returns { Point } The current metering point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#getMeteringPoint
         */
        getMeteringPoint(): Point;
        /**
         * Set the center point of the metering area.
         *
         * @param { Point } point - metering point
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#setMeteringPoint
         */
        setMeteringPoint(point: Point): void;
        /**
         * Query the exposure compensation range.
         *
         * @returns { Array<number> } The array of compensation range.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#getExposureBiasRange
         */
        getExposureBiasRange(): Array<number>;
        /**
         * Set exposure compensation.
         *
         * @param { number } exposureBias - Exposure compensation
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#setExposureBias
         */
        setExposureBias(exposureBias: number): void;
        /**
         * Query the exposure value.
         *
         * @returns { number } The exposure value.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.AutoExposure#getExposureValue
         */
        getExposureValue(): number;
        /**
         * Checks whether a specified focus mode is supported.
         *
         * @param { FocusMode } afMode - Focus mode.
         * @returns { boolean } Is the focus mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#isFocusModeSupported
         */
        isFocusModeSupported(afMode: FocusMode): boolean;
        /**
         * Gets current focus mode.
         *
         * @returns { FocusMode } The current focus mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#getFocusMode
         */
        getFocusMode(): FocusMode;
        /**
         * Sets focus mode.
         *
         * @param { FocusMode } afMode - Target focus mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#setFocusMode
         */
        setFocusMode(afMode: FocusMode): void;
        /**
         * Sets focus point.
         *
         * @param { Point } point - Target focus point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#setFocusPoint
         */
        setFocusPoint(point: Point): void;
        /**
         * Gets current focus point.
         *
         * @returns { Point } The current focus point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#getFocusPoint
         */
        getFocusPoint(): Point;
        /**
         * Gets current focal length.
         *
         * @returns { number } The current focal point.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Focus#getFocalLength
         */
        getFocalLength(): number;
        /**
         * Gets all supported zoom ratio range.
         *
         * @returns { Array<number> } The zoom ratio range.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Zoom#getZoomRatioRange
         */
        getZoomRatioRange(): Array<number>;
        /**
         * Gets zoom ratio.
         *
         * @returns { number } The zoom ratio value.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Zoom#getZoomRatio
         */
        getZoomRatio(): number;
        /**
         * Sets zoom ratio.
         *
         * @param { number } zoomRatio - Target zoom ratio.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Zoom#setZoomRatio
         */
        setZoomRatio(zoomRatio: number): void;
        /**
         * Check whether the specified video stabilization mode is supported.
         *
         * @param { VideoStabilizationMode } vsMode - Video Stabilization mode.
         * @returns { boolean } Is flash mode supported.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Stabilization#isVideoStabilizationModeSupported
         */
        isVideoStabilizationModeSupported(vsMode: VideoStabilizationMode): boolean;
        /**
         * Query the video stabilization mode currently in use.
         *
         * @returns { VideoStabilizationMode } The current video stabilization mode.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Stabilization#getActiveVideoStabilizationMode
         */
        getActiveVideoStabilizationMode(): VideoStabilizationMode;
        /**
         * Set video stabilization mode.
         *
         * @param { VideoStabilizationMode } mode - video stabilization mode to set.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Stabilization#setVideoStabilizationMode
         */
        setVideoStabilizationMode(mode: VideoStabilizationMode): void;
        /**
         * Subscribes focus status change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.VideoSession#on
         */
        on(type: 'focusStateChange', callback: AsyncCallback<FocusState>): void;
        /**
         * Unsubscribes from focus status change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.VideoSession#off
         */
        off(type: 'focusStateChange', callback?: AsyncCallback<FocusState>): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.VideoSession#on
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.VideoSession#off
         */
        off(type: 'error', callback?: ErrorCallback): void;
    }
    /**
     * Photo session object.
     *
     * @interface PhotoSession
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface PhotoSession extends Session, Flash, AutoExposure, Focus, Zoom, ColorManagement {
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Subscribes focus state change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'focusStateChange', callback: AsyncCallback<FocusState>): void;
        /**
         * Unsubscribes from focus state change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'focusStateChange', callback?: AsyncCallback<FocusState>): void;
        /**
         * Subscribes zoom info event callback.
         *
         * @param { 'smoothZoomInfoAvailable' } type - Event type.
         * @param { AsyncCallback<SmoothZoomInfo> } callback - Callback used to get the zoom info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'smoothZoomInfoAvailable', callback: AsyncCallback<SmoothZoomInfo>): void;
        /**
         * Unsubscribes from zoom info event callback.
         *
         * @param { 'smoothZoomInfoAvailable' } type - Event type.
         * @param { AsyncCallback<SmoothZoomInfo> } callback - Callback used to get the zoom info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'smoothZoomInfoAvailable', callback?: AsyncCallback<SmoothZoomInfo>): void;
    }
    /**
     * Video session object.
     *
     * @interface VideoSession
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface VideoSession extends Session, Flash, AutoExposure, Focus, Zoom, Stabilization, ColorManagement {
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Subscribes focus state change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'focusStateChange', callback: AsyncCallback<FocusState>): void;
        /**
         * Unsubscribes from focus state change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'focusStateChange', callback?: AsyncCallback<FocusState>): void;
        /**
         * Subscribes zoom info event callback.
         *
         * @param { 'smoothZoomInfoAvailable' } type - Event type.
         * @param { AsyncCallback<SmoothZoomInfo> } callback - Callback used to get the zoom info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'smoothZoomInfoAvailable', callback: AsyncCallback<SmoothZoomInfo>): void;
        /**
         * Unsubscribes from zoom info event callback.
         *
         * @param { 'smoothZoomInfoAvailable' } type - Event type.
         * @param { AsyncCallback<SmoothZoomInfo> } callback - Callback used to get the zoom info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'smoothZoomInfoAvailable', callback?: AsyncCallback<SmoothZoomInfo>): void;
    }
    /**
     * Secure camera session object.
     *
     * @interface SecureSession
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface SecureSession extends Session, Flash, AutoExposure, Focus, Zoom {
        /**
         * Add Secure output for camera.
         *
         * @param { PreviewOutput } previewOutput - Specify the output as a secure flow.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400102 - Operation not allowed.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        addSecureOutput(previewOutput: PreviewOutput): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the capture session errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Subscribes focus status change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'focusStateChange', callback: AsyncCallback<FocusState>): void;
        /**
         * Unsubscribes from focus status change event callback.
         *
         * @param { 'focusStateChange' } type - Event type.
         * @param { AsyncCallback<FocusState> } callback - Callback used to get the focus state change.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'focusStateChange', callback?: AsyncCallback<FocusState>): void;
    }
    /**
     * Camera output object.
     *
     * @interface CameraOutput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CameraOutput {
        /**
         * Release output instance.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release output instance.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        release(): Promise<void>;
    }
    /**
     * Preview output object.
     *
     * @interface PreviewOutput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface PreviewOutput extends CameraOutput {
        /**
         * Start output instance.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#start
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Start output instance.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#start
         */
        start(): Promise<void>;
        /**
         * Stop output instance.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#stop
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stop output instance.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.Session#stop
         */
        stop(): Promise<void>;
        /**
         * Subscribes frame start event callback.
         *
         * @param { 'frameStart' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'frameStart', callback: AsyncCallback<void>): void;
        /**
         * Unsubscribes from frame start event callback.
         *
         * @param { 'frameStart' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'frameStart', callback?: AsyncCallback<void>): void;
        /**
         * Subscribes frame end event callback.
         *
         * @param { 'frameEnd' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'frameEnd', callback: AsyncCallback<void>): void;
        /**
         * Unsubscribes from frame end event callback.
         *
         * @param { 'frameEnd' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'frameEnd', callback?: AsyncCallback<void>): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the preview output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the preview output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Get supported frame rates which can be set during session running.
         *
         * @returns { Array<FrameRateRange> } The array of supported frame rate range.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getSupportedFrameRates(): Array<FrameRateRange>;
        /**
         * Set a frame rate range.
         *
         * @param { number } minFps - Minimum frame rate per second.
         * @param { number } maxFps - Maximum frame rate per second.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400110 - Unresolved conflicts with current configurations.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        setFrameRate(minFps: number, maxFps: number): void;
        /**
         * Get active frame rate range which has been set before.
         *
         * @returns { FrameRateRange } The active frame rate range.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getActiveFrameRate(): FrameRateRange;
    }
    /**
     * Enumerates the image rotation angles.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum ImageRotation {
        /**
         * The capture image rotates 0 degrees.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        ROTATION_0 = 0,
        /**
         * The capture image rotates 90 degrees.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        ROTATION_90 = 90,
        /**
         * The capture image rotates 180 degrees.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        ROTATION_180 = 180,
        /**
         * The capture image rotates 270 degrees.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        ROTATION_270 = 270
    }
    /**
     * Photo capture location
     *
     * @typedef Location
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface Location {
        /**
         * Latitude.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        latitude: number;
        /**
         * Longitude.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        longitude: number;
        /**
         * Altitude.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        altitude: number;
    }
    /**
     * Enumerates the image quality levels.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum QualityLevel {
        /**
         * High image quality.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        QUALITY_LEVEL_HIGH = 0,
        /**
         * Medium image quality.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        QUALITY_LEVEL_MEDIUM = 1,
        /**
         * Low image quality.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        QUALITY_LEVEL_LOW = 2
    }
    /**
     * Photo capture options to set.
     *
     * @typedef PhotoCaptureSetting
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface PhotoCaptureSetting {
        /**
         * Photo image quality.
         *
         * @type { ?QualityLevel }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        quality?: QualityLevel;
        /**
         * Photo rotation.
         *
         * @type { ?ImageRotation }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        rotation?: ImageRotation;
        /**
         * Photo location.
         *
         * @type { ?Location }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        location?: Location;
        /**
         * Set the mirror photo function switch, default to false.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        mirror?: boolean;
    }
    /**
     * Photo object
     *
     * @typedef Photo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface Photo {
        /**
         * Main image.
         *
         * @type { image.Image }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        main: image.Image;
        /**
         * Release Photo object.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        release(): Promise<void>;
    }
    /**
     * Photo output object.
     *
     * @interface PhotoOutput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface PhotoOutput extends CameraOutput {
        /**
         * Start capture output.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400104 - Session not running.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        capture(callback: AsyncCallback<void>): void;
        /**
         * Start capture output.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400104 - Session not running.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        capture(): Promise<void>;
        /**
         * Start capture output.
         *
         * @param { PhotoCaptureSetting } setting - Photo capture settings.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400104 - Session not running.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        capture(setting: PhotoCaptureSetting, callback: AsyncCallback<void>): void;
        /**
         * Start capture output.
         *
         * @param { PhotoCaptureSetting } setting - Photo capture settings.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400104 - Session not running.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        /**
         * Start capture output.
         * Remove optional param.
         *
         * @param { PhotoCaptureSetting } setting - Photo capture settings.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400104 - Session not running.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        capture(setting: PhotoCaptureSetting): Promise<void>;
        /**
         * Subscribes photo available event callback.
         *
         * @param { 'photoAvailable' } type - Event type.
         * @param { AsyncCallback<Photo> } callback - Callback used to get the Photo.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'photoAvailable', callback: AsyncCallback<Photo>): void;
        /**
         * Unsubscribes photo available event callback.
         *
         * @param { 'photoAvailable' } type - Event type.
         * @param { AsyncCallback<Photo> } callback - Callback used to get the Photo.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'photoAvailable', callback?: AsyncCallback<Photo>): void;
        /**
         * Subscribes photo asset event callback.
         *
         * @param { 'photoAssetAvailable' } type - Event type.
         * @param { AsyncCallback<photoAccessHelper.PhotoAsset> } callback - Callback used to get the asset.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'photoAssetAvailable', callback: AsyncCallback<photoAccessHelper.PhotoAsset>): void;
        /**
         * Unsubscribes photo asset event callback.
         *
         * @param { 'photoAssetAvailable' } type - Event type.
         * @param { AsyncCallback<photoAccessHelper.PhotoAsset> } callback - Callback used to get the asset.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'photoAssetAvailable', callback?: AsyncCallback<photoAccessHelper.PhotoAsset>): void;
        /**
         * Check whether to support mirror photo.
         *
         * @returns { boolean } Is the mirror supported.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        isMirrorSupported(): boolean;
        /**
         * Subscribes capture start event callback.
         *
         * @param { 'captureStart' } type - Event type.
         * @param { AsyncCallback<number> } callback - Callback used to get the capture ID.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.PhotoOutput#captureStartWithInfo
         */
        on(type: 'captureStart', callback: AsyncCallback<number>): void;
        /**
         * Unsubscribes from capture start event callback.
         *
         * @param { 'captureStart' } type - Event type.
         * @param { AsyncCallback<number> } callback - Callback used to get the capture ID.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         * @deprecated since 11
         * @useinstead ohos.multimedia.camera.PhotoOutput#captureStartWithInfo
         */
        off(type: 'captureStart', callback?: AsyncCallback<number>): void;
        /**
         * Subscribes capture start event callback.
         *
         * @param { 'captureStartWithInfo' } type - Event type.
         * @param { AsyncCallback<CaptureStartInfo> } callback - Callback used to get the capture start info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        on(type: 'captureStartWithInfo', callback: AsyncCallback<CaptureStartInfo>): void;
        /**
         * Unsubscribes from capture start event callback.
         *
         * @param { 'captureStartWithInfo' } type - Event type.
         * @param { AsyncCallback<CaptureStartInfo> } callback - Callback used to get the capture start info.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        off(type: 'captureStartWithInfo', callback?: AsyncCallback<CaptureStartInfo>): void;
        /**
         * Subscribes frame shutter event callback.
         *
         * @param { 'frameShutter' } type - Event type.
         * @param { AsyncCallback<FrameShutterInfo> } callback - Callback used to get the frame shutter information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'frameShutter', callback: AsyncCallback<FrameShutterInfo>): void;
        /**
         * Unsubscribes from frame shutter event callback.
         *
         * @param { 'frameShutter' } type - Event type.
         * @param { AsyncCallback<FrameShutterInfo> } callback - Callback used to get the frame shutter information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'frameShutter', callback?: AsyncCallback<FrameShutterInfo>): void;
        /**
         * Subscribes frame shutter end event callback.
         *
         * @param { 'frameShutterEnd' } type - Event type.
         * @param { AsyncCallback<FrameShutterEndInfo> } callback - Callback used to get the frame shutter end information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'frameShutterEnd', callback: AsyncCallback<FrameShutterEndInfo>): void;
        /**
         * Unsubscribes from frame shutter end event callback.
         *
         * @param { 'frameShutterEnd' } type - Event type.
         * @param { AsyncCallback<FrameShutterEndInfo> } callback - Callback used to get the frame shutter end information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'frameShutterEnd', callback?: AsyncCallback<FrameShutterEndInfo>): void;
        /**
         * Subscribes capture end event callback.
         *
         * @param { 'captureEnd' } type - Event type.
         * @param { AsyncCallback<CaptureEndInfo> } callback - Callback used to get the capture end information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'captureEnd', callback: AsyncCallback<CaptureEndInfo>): void;
        /**
         * Unsubscribes from capture end event callback.
         *
         * @param { 'captureEnd' } type - Event type.
         * @param { AsyncCallback<CaptureEndInfo> } callback - Callback used to get the capture end information.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'captureEnd', callback?: AsyncCallback<CaptureEndInfo>): void;
        /**
         * Subscribes capture ready event callback. After receiving the callback, can proceed to the next capture
         *
         * @param { 'captureReady' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to notice capture ready.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'captureReady', callback: AsyncCallback<void>): void;
        /**
         * Unsubscribes from capture ready event callback.
         *
         * @param { 'captureReady' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to notice capture ready.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'captureReady', callback?: AsyncCallback<void>): void;
        /**
         * Subscribes estimated capture duration event callback.
         *
         * @param { 'estimatedCaptureDuration' } type - Event type.
         * @param { AsyncCallback<number> } callback - Callback used to notify the estimated capture duration (in milliseconds).
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        on(type: 'estimatedCaptureDuration', callback: AsyncCallback<number>): void;
        /**
         * Unsubscribes from estimated capture duration event callback.
         *
         * @param { 'estimatedCaptureDuration' } type - Event type.
         * @param { AsyncCallback<number> } callback - Callback used to notify the estimated capture duration (in milliseconds).
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        off(type: 'estimatedCaptureDuration', callback?: AsyncCallback<number>): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the photo output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the photo output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'error', callback?: ErrorCallback): void;
        /**
         * Confirm if moving photo supported.
         *
         * @returns { boolean } TRUE if the moving photo is supported.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        isMovingPhotoSupported(): boolean;
        /**
         * Enable moving photo.
         *
         * @permission ohos.permission.MICROPHONE
         * @param { boolean } enabled - Target state for moving photo.
         * @throws { BusinessError } 201 - permission denied.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        enableMovingPhoto(enabled: boolean): void;
    }
    /**
     * Frame shutter callback info.
     *
     * @typedef FrameShutterInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface FrameShutterInfo {
        /**
         * Capture id.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        captureId: number;
        /**
         * Timestamp for frame.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        timestamp: number;
    }
    /**
     * Frame shutter end callback info.
     *
     * @typedef FrameShutterEndInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 12
     */
    interface FrameShutterEndInfo {
        /**
         * Capture id.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        captureId: number;
    }
    /**
     * Capture start info.
     *
     * @typedef CaptureStartInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 11
     */
    interface CaptureStartInfo {
        /**
         * Capture id.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        captureId: number;
        /**
         * Time(in milliseconds) is the shutter time for the photo.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 11
         */
        time: number;
    }
    /**
     * Capture end info.
     *
     * @typedef CaptureEndInfo
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface CaptureEndInfo {
        /**
         * Capture id.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        captureId: number;
        /**
         * Frame count.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        frameCount: number;
    }
    /**
     * Video output object.
     *
     * @interface VideoOutput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface VideoOutput extends CameraOutput {
        /**
         * Start video output.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Start video output.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        start(): Promise<void>;
        /**
         * Stop video output.
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stop video output.
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        stop(): Promise<void>;
        /**
         * Get supported frame rates which can be set during session running.
         *
         * @returns { Array<FrameRateRange> } The array of supported frame rate range.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getSupportedFrameRates(): Array<FrameRateRange>;
        /**
         * Set a frame rate range.
         *
         * @param { number } minFps - Minimum frame rate per second.
         * @param { number } maxFps - Maximum frame rate per second.
         * @throws { BusinessError } 7400101 - Parameter missing or parameter type incorrect.
         * @throws { BusinessError } 7400110 - Unresolved conflicts with current configurations.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        setFrameRate(minFps: number, maxFps: number): void;
        /**
         * Get active frame rate range which has been set before.
         *
         * @returns { FrameRateRange } The active frame rate range.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 12
         */
        getActiveFrameRate(): FrameRateRange;
        /**
         * Subscribes frame start event callback.
         *
         * @param { 'frameStart' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'frameStart', callback: AsyncCallback<void>): void;
        /**
         * Unsubscribes from frame start event callback.
         *
         * @param { 'frameStart' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'frameStart', callback?: AsyncCallback<void>): void;
        /**
         * Subscribes frame end event callback.
         *
         * @param { 'frameEnd' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'frameEnd', callback: AsyncCallback<void>): void;
        /**
         * Unsubscribes from frame end event callback.
         *
         * @param { 'frameEnd' } type - Event type.
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'frameEnd', callback?: AsyncCallback<void>): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the video output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the video output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'error', callback?: ErrorCallback): void;
    }
    /**
     * Metadata object type.
     *
     * @enum { number }
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    enum MetadataObjectType {
        /**
         * Face detection type.
         *
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        FACE_DETECTION = 0
    }
    /**
     * Rectangle definition.
     *
     * @typedef Rect
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface Rect {
        /**
         * X coordinator of top left point.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        topLeftX: number;
        /**
         * Y coordinator of top left point.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        topLeftY: number;
        /**
         * Width of this rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        width: number;
        /**
         * Height of this rectangle.
         *
         * @type { number }
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        height: number;
    }
    /**
     * Metadata object basis.
     *
     * @typedef MetadataObject
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface MetadataObject {
        /**
         * Metadata object type.
         *
         * @type { MetadataObjectType }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly type: MetadataObjectType;
        /**
         * Metadata object timestamp in milliseconds.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly timestamp: number;
        /**
         * The axis-aligned bounding box of detected metadata object.
         *
         * @type { Rect }
         * @readonly
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        readonly boundingBox: Rect;
    }
    /**
     * Metadata Output object
     *
     * @interface MetadataOutput
     * @syscap SystemCapability.Multimedia.Camera.Core
     * @since 10
     */
    interface MetadataOutput extends CameraOutput {
        /**
         * Start output metadata
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        start(callback: AsyncCallback<void>): void;
        /**
         * Start output metadata
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 7400103 - Session not config.
         * @throws { BusinessError } 7400201 - Camera service fatal error.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        start(): Promise<void>;
        /**
         * Stop output metadata
         *
         * @param { AsyncCallback<void> } callback - Callback used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        stop(callback: AsyncCallback<void>): void;
        /**
         * Stop output metadata
         *
         * @returns { Promise<void> } Promise used to return the result.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        stop(): Promise<void>;
        /**
         * Subscribes to metadata objects available event callback.
         *
         * @param { 'metadataObjectsAvailable' } type - Event type.
         * @param { AsyncCallback<Array<MetadataObject>> } callback - Callback used to get the available metadata objects.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'metadataObjectsAvailable', callback: AsyncCallback<Array<MetadataObject>>): void;
        /**
         * Unsubscribes from metadata objects available event callback.
         *
         * @param { 'metadataObjectsAvailable' } type - Event type.
         * @param { AsyncCallback<Array<MetadataObject>> } callback - Callback used to get the available metadata objects.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'metadataObjectsAvailable', callback?: AsyncCallback<Array<MetadataObject>>): void;
        /**
         * Subscribes to error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the video output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        on(type: 'error', callback: ErrorCallback): void;
        /**
         * Unsubscribes from error events.
         *
         * @param { 'error' } type - Event type.
         * @param { ErrorCallback } callback - Callback used to get the video output errors.
         * @syscap SystemCapability.Multimedia.Camera.Core
         * @since 10
         */
        off(type: 'error', callback?: ErrorCallback): void;
    }
}
export default camera;
