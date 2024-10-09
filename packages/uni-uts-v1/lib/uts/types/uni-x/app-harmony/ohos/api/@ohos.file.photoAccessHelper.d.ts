/*
 * Copyright (C) 2023 Huawei Device Co., Ltd.
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
 * @file Helper functions to access image and video assets
 * @kit MediaLibraryKit
 */
import type { AsyncCallback, Callback } from './@ohos.base';
import type Context from './application/Context';
import type image from './@ohos.multimedia.image';
import type dataSharePredicates from './@ohos.data.dataSharePredicates';
/**
 * Helper functions to access image and video assets
 *
 * @namespace photoAccessHelper
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @since 10
 */
/**
 * Helper functions to access image and video assets
 *
 * @namespace photoAccessHelper
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 11
 */
declare namespace photoAccessHelper {
    /**
     * Returns an instance of PhotoAccessHelper
     *
     * @param { Context } context - Hap context information
     * @returns { PhotoAccessHelper } Instance of PhotoAccessHelper
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @StageModelOnly
     * @since 10
     */
    /**
     * Returns an instance of PhotoAccessHelper
     *
     * @param { Context } context - Hap context information
     * @returns { PhotoAccessHelper } Instance of PhotoAccessHelper
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types; 3. Parameter verification failed.
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @StageModelOnly
     * @atomicservice
     * @since 11
     */
    function getPhotoAccessHelper(context: Context): PhotoAccessHelper;
    /**
     * Enumeration of different types of photos
     *
     * @enum { number } PhotoType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * Enumeration of different types of photos
     *
     * @enum { number } PhotoType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    enum PhotoType {
        /**
         * Image asset
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Image asset
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        IMAGE = 1,
        /**
         * Video asset
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Video asset
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        VIDEO
    }
    /**
     * Enumeration of different categories of photos
     *
     * @enum { number } PhotoSubtype
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @systemapi
     * @since 10
     */
    /**
     * Enumeration of different categories of photos
     *
     * @enum { number } PhotoSubtype
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    enum PhotoSubtype {
        /**
         * Default Photo Type
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @systemapi
         * @since 10
         */
        /**
         * Default Photo Type
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        DEFAULT = 0,
        /**
         * Moving Photo Type
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        MOVING_PHOTO = 3
    }
    /**
     * Enumeration of dynamic range type
     *
     * @enum { number } DynamicRangeType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 12
     */
    enum DynamicRangeType {
        /**
         * SDR(Standard-Dynamic Range) format
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        SDR = 0,
        /**
         * HDR(High-Dynamic Range) format
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        HDR = 1
    }
    /**
     * Enumeration of different recommendation type
     *
     * @enum { number } RecommendationType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    enum RecommendationType {
        /**
         * QR_OR_BAR_CODE indicates that QR code or barcode photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        QR_OR_BAR_CODE = 1,
        /**
         * QR_CODE indicates that QR code photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        QR_CODE = 2,
        /**
         * BAR_CODE indicates that barcode photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        BAR_CODE = 3,
        /**
         * ID_CARD indicates that QR code or barcode photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        ID_CARD = 4,
        /**
         * PROFILE_PICTURE indicates that profile picture photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        PROFILE_PICTURE = 5,
        /**
         * PASSPORT indicates that passport photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        PASSPORT = 6,
        /**
         * BANK_CARD indicates that bank card photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        BANK_CARD = 7,
        /**
         * DRIVER_LICENSE indicates that driver license photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        DRIVER_LICENSE = 8,
        /**
         * DRIVING_LICENSE indicates that driving license photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        DRIVING_LICENSE = 9,
        /**
         * FEATURED_SINGLE_PORTRAIT indicates that featured single portrait photos can be recommended
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        FEATURED_SINGLE_PORTRAIT = 10
    }
    /**
     * Enumeration of delivery mode.
     *
     * @enum { number } DeliveryMode
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 11
     */
    enum DeliveryMode {
        /**
         * Fast delivery mode
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        FAST_MODE = 0,
        /**
         * High quality delivery mode
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        HIGH_QUALITY_MODE = 1,
        /**
         * Balance delivery mode
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        BALANCE_MODE = 2
    }
    /**
     * Options to request media asset
     *
     * @interface RequestOptions
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 11
     */
    interface RequestOptions {
        /**
         * Indicates the delivery mode
         *
         * @type { DeliveryMode }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        deliveryMode: DeliveryMode;
    }
    /**
     * Media asset data handler
     *
     * @interface MediaAssetDataHandler
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 11
     */
    interface MediaAssetDataHandler<T> {
        /**
         * Indicates required media asset data is prepared
         *
         * @param { T } data - the returned data of media asset
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        /**
         * Indicates required media asset data is prepared
         *
         * @param { T } data - the returned data of media asset
         * @param { Map<string, string> } [map] - additional information for the data
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        onDataPrepared(data: T, map?: Map<string, string>): void;
    }
    /**
     * Media asset manager
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 11
     */
    class MediaAssetManager {
        /**
         * Request image
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { PhotoAsset } asset - the photo asset requested
         * @param { RequestOptions } requestOptions - the request options
         * @param { MediaAssetDataHandler<image.ImageSource> } dataHandler - data handler used to obtain media asset data when ImageSource is prepared
         * @returns { Promise<string> } Returns request id
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        static requestImage(context: Context, asset: PhotoAsset, requestOptions: RequestOptions, dataHandler: MediaAssetDataHandler<image.ImageSource>): Promise<string>;
        /**
         * Request image data
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { PhotoAsset } asset - the photo asset requested
         * @param { RequestOptions } requestOptions - the request options
         * @param { MediaAssetDataHandler<ArrayBuffer> } dataHandler - data handler used obtain media asset data when data is prepared
         * @returns { Promise<string> } Returns request id
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        static requestImageData(context: Context, asset: PhotoAsset, requestOptions: RequestOptions, dataHandler: MediaAssetDataHandler<ArrayBuffer>): Promise<string>;
        /**
         * Request moving photo
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { PhotoAsset } asset - the photo asset requested
         * @param { RequestOptions } requestOptions - the request options
         * @param { MediaAssetDataHandler<MovingPhoto> } dataHandler - data handler used to obtain moving photo when data is prepared
         * @returns { Promise<string> } Returns request id
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        static requestMovingPhoto(context: Context, asset: PhotoAsset, requestOptions: RequestOptions, dataHandler: MediaAssetDataHandler<MovingPhoto>): Promise<string>;
        /**
         * Cancel request
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { string } requestId - the request id to be canceled
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        static cancelRequest(context: Context, requestId: string): Promise<void>;
        /**
         * Request video file
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { PhotoAsset } asset - the photo asset requested
         * @param { RequestOptions } requestOptions - the request options
         * @param { string } fileUri - the destination file uri to save the video data
         * @param { MediaAssetDataHandler<boolean> } dataHandler - data handler used to notify the client that data has been written to the application sandbox
         * @returns { Promise<string> } Returns request id
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        static requestVideoFile(context: Context, asset: PhotoAsset, requestOptions: RequestOptions, fileUri: string, dataHandler: MediaAssetDataHandler<boolean>): Promise<string>;
        /**
         * Load moving photo
         *
         * @param { Context } context - Hap context information
         * @param { string } imageFileUri - image file uri of the moving photo to be loaded
         * @param { string } videoFileUri - video file uri of the moving photo to be loaded
         * @returns { Promise<MovingPhoto> } Returns moving photo
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - Internal system error
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        static loadMovingPhoto(context: Context, imageFileUri: string, videoFileUri: string): Promise<MovingPhoto>;
    }
    /**
     * Indicates the type of photo asset member.
     *
     * @typedef { number | string | boolean } MemberType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    type MemberType = number | string | boolean;
    /**
     * Defines the photo asset
     *
     * @interface PhotoAsset
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * Defines the photo asset
     *
     * @interface PhotoAsset
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    interface PhotoAsset {
        /**
         * uri of the asset.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * uri of the asset.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        readonly uri: string;
        /**
         * Photo type, image or video
         *
         * @type { PhotoType }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly photoType: PhotoType;
        /**
         * Display name (with a file name extension) of the asset.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly displayName: string;
        /**
         * Returns the value of the specified member.
         *
         * @param { string } member - Photo asset member. for example : get(PhotoKeys.SIZE)
         * @returns { MemberType } Returns the value of the specified photo asset member
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000014 - Member is not a valid PhotoKey
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        get(member: string): MemberType;
        /**
         * Set a new value to the specified member
         *
         * @param { string } member - Photo asset member
         * @param { string } value - The new value of the member.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000014 - Member is not a valid PhotoKey
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @example : set(PhotoKeys.TITLE, "newTitle"), call commitModify after set
         */
        set(member: string, value: string): void;
        /**
         * Modify metadata of the asset
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { AsyncCallback<void> } callback - Returns void.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Modify metadata of the asset
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { AsyncCallback<void> } callback - Returns void.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        commitModify(callback: AsyncCallback<void>): void;
        /**
         * Modify metadata of the asset
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Modify metadata of the asset
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000001 - Invalid display name
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        commitModify(): Promise<void>;
        /**
         * Open the asset in read only mode
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { AsyncCallback<number> } callback - Returns the read only fd
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         */
        getReadOnlyFd(callback: AsyncCallback<number>): void;
        /**
         * Open the asset in read only mode
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @returns { Promise<number> } Returns the read only fd
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         */
        getReadOnlyFd(): Promise<number>;
        /**
         * Close the asset
         *
         * @param { number } fd - The opened fd of the asset.
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         */
        close(fd: number, callback: AsyncCallback<void>): void;
        /**
         * Close the asset
         *
         * @param { number } fd - The opened fd of the asset.
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         */
        close(fd: number): Promise<void>;
        /**
         * Get thumbnail of the asset
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { AsyncCallback<image.PixelMap> } callback - Returns the thumbnail's pixelMap.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getThumbnail(callback: AsyncCallback<image.PixelMap>): void;
        /**
         * Get thumbnail of the asset
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { image.Size } size - Thumbnail's size
         * @param { AsyncCallback<image.PixelMap> } callback - Returns the thumbnail's pixelMap.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getThumbnail(size: image.Size, callback: AsyncCallback<image.PixelMap>): void;
        /**
         * Get thumbnail of the asset
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { image.Size } [size] - Thumbnail's size
         * @returns { Promise<image.PixelMap> } Returns the thumbnail's pixelMap.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getThumbnail(size?: image.Size): Promise<image.PixelMap>;
    }
    /**
     * Enumeration of photo asset members
     *
     * @enum { string } PhotoKeys
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum PhotoKeys {
        /**
         * Asset uri, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        URI = 'uri',
        /**
         * Photo type of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        PHOTO_TYPE = 'media_type',
        /**
         * Asset name, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DISPLAY_NAME = 'display_name',
        /**
         * Size of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        SIZE = 'size',
        /**
         * Creation date of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DATE_ADDED = 'date_added',
        /**
         * Modified date of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DATE_MODIFIED = 'date_modified',
        /**
         * Duration of video files, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DURATION = 'duration',
        /**
         * Width of the image asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        WIDTH = 'width',
        /**
         * Height of the image asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        HEIGHT = 'height',
        /**
         * Date taken of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DATE_TAKEN = 'date_taken',
        /**
         * Orientation of the image asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        ORIENTATION = 'orientation',
        /**
         * Favorite state of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        FAVORITE = 'is_favorite',
        /**
         * Title of the asset
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        TITLE = 'title',
        /**
         * Creation time of the asset in milliseconds, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        DATE_ADDED_MS = 'date_added_ms',
        /**
         * Modified time of the asset in milliseconds, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        DATE_MODIFIED_MS = 'date_modified_ms',
        /**
         * Photo subtype of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        PHOTO_SUBTYPE = 'subtype',
        /**
         * Cover position of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        COVER_POSITION = 'cover_position',
        /**
         * Dynamic range type of the asset, read only
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        DYNAMIC_RANGE_TYPE = 'dynamic_range_type'
    }
    /**
     * Enumeration of photo album members.
     *
     * @enum { string } AlbumKeys
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum AlbumKeys {
        /**
         * Album uri
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        URI = 'uri',
        /**
         * Album name
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        ALBUM_NAME = 'album_name'
    }
    /**
     * Options to fetch assets or albums
     *
     * @interface FetchOptions
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    interface FetchOptions {
        /**
         * Indicates the members to query.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        fetchColumns: Array<string>;
        /**
         * Predicates to query
         *
         * @type { dataSharePredicates.DataSharePredicates }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        predicates: dataSharePredicates.DataSharePredicates;
    }
    /**
     * Config to create photo asset
     *
     * @interface PhotoCreationConfig
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    interface PhotoCreationConfig {
        /**
         * Title of the asset
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        title?: string;
        /**
         * Extension of the asset
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        fileNameExtension: string;
        /**
         * Specify photo type of the asset to create, include image or video
         *
         * @type { PhotoType }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        photoType: PhotoType;
        /**
         * Specify photo subtype of the asset to create, include default or moving_photo
         *
         * @type { ?PhotoSubtype }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        subtype?: PhotoSubtype;
    }
    /**
     * Options to create a photo asset
     *
     * @interface CreateOptions
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * Options to create a photo asset
     *
     * @interface CreateOptions
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    interface CreateOptions {
        /**
         * Title of the asset
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Title of the asset
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        title?: string;
        /**
         * Specify subtype of the asset to create
         *
         * @type { ?PhotoSubtype }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        subtype?: PhotoSubtype;
    }
    /**
     * The fetch result of assets or albums
     *
     * @interface FetchResult
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    interface FetchResult<T> {
        /**
         * Obtains the total number of objects in the fetch result.
         *
         * @returns { number } Total number of objects.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getCount(): number;
        /**
         * Checks whether the result set points to the last row.
         * You need to check whether the object is the last one before calling getNextObject.
         *
         * @returns { boolean } Whether the object is the last one in the fetch result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        isAfterLast(): boolean;
        /**
         * Obtains the first object in the fetch result.
         *
         * @param { AsyncCallback<T> } callback - Returns the first object in the fetch result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getFirstObject(callback: AsyncCallback<T>): void;
        /**
         * Obtains the first object in the fetch result.
         *
         * @returns { Promise<T> } Returns the first object in the fetch result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getFirstObject(): Promise<T>;
        /**
         * Obtains the next object in the fetch result.
         * Before calling this method, you must use isAfterLast() to check whether the current position is the last row
         * in the fetch result. This method only works when the current position is not the last row.
         *
         * @param { AsyncCallback<T> } callback - Returns the next object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getNextObject(callback: AsyncCallback<T>): void;
        /**
         * Obtains the next object in the fetch result.
         * Before calling this method, you must use isAfterLast() to check whether the current position is the last row
         * in the fetch result. This method only works when the current position is not the last row.
         *
         * @returns { Promise<T> } Returns the next object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getNextObject(): Promise<T>;
        /**
         * Obtains the last object in the fetch result
         *
         * @param { AsyncCallback<T> } callback - Returns the last object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getLastObject(callback: AsyncCallback<T>): void;
        /**
         * Obtains the last object in the fetch result
         *
         * @returns { Promise<T> } Returns the last object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getLastObject(): Promise<T>;
        /**
         * Obtains the object with the specified index in the fetch result.
         *
         * @param { number } index - Index of the object to obtain.
         * @param { AsyncCallback<T> } callback - Returns the object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getObjectByPosition(index: number, callback: AsyncCallback<T>): void;
        /**
         * Obtains the object with the specified index in the fetch result.
         *
         * @param { number } index - Index of the asset to obtain.
         * @returns { Promise<T> } Returns the object
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getObjectByPosition(index: number): Promise<T>;
        /**
         * Obtains all objects in the fetch result.
         *
         * @param { AsyncCallback<Array<T>> } callback - Returns all the objects
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAllObjects(callback: AsyncCallback<Array<T>>): void;
        /**
         * Obtains all objects in the fetch result.
         *
         * @returns { Promise<Array<T>> } Returns all the objects
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAllObjects(): Promise<Array<T>>;
        /**
         * Releases the fetch result.
         *
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        close(): void;
    }
    /**
     * Album type.
     *
     * @enum { number } AlbumType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum AlbumType {
        /**
         * Album created by user.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        USER = 0,
        /**
         * Album created by system, which metadata cannot be modified.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        SYSTEM = 1024
    }
    /**
     * Album subtype
     *
     * @enum { number } AlbumSubtype
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum AlbumSubtype {
        /**
         * Generic user-created albums.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        USER_GENERIC = 1,
        /**
         * Favorite album, which assets are marked as favorite.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        FAVORITE = 1025,
        /**
         * Video album, which contains all video assets.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        VIDEO,
        /**
         * Image album
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @systemapi
         * @since 11
         */
        /**
         * Image album
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        IMAGE = 1031,
        /**
         * Any album
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        ANY = 2147483647
    }
    /**
     * Defines the abstract interface of albums.
     *
     * @interface AbsAlbum
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    interface AbsAlbum {
        /**
         * Album type
         *
         * @type { AlbumType }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly albumType: AlbumType;
        /**
         * Album subtype
         *
         * @type { AlbumSubtype }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly albumSubtype: AlbumSubtype;
        /**
         * Album name.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        albumName: string;
        /**
         * Album uri.
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly albumUri: string;
        /**
         * Number of assets in the album
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly count: number;
        /**
         * Cover uri for the album
         *
         * @type { string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        readonly coverUri: string;
        /**
         * Fetch assets in an album.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { FetchOptions } options - Fetch options.
         * @param { AsyncCallback<FetchResult<PhotoAsset>> } callback - Returns the fetch result
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAssets(options: FetchOptions, callback: AsyncCallback<FetchResult<PhotoAsset>>): void;
        /**
         * Fetch assets in an album.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { FetchOptions } options - Fetch options.
         * @returns { Promise<FetchResult<PhotoAsset>> } Returns the fetch result
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAssets(options: FetchOptions): Promise<FetchResult<PhotoAsset>>;
    }
    /**
     * Defines the album.
     *
     * @interface Album
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    interface Album extends AbsAlbum {
        /**
         * Number of image assets in the album
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        readonly imageCount?: number;
        /**
         * Number of video assets in the album
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        readonly videoCount?: number;
        /**
         * Modify metadata for the album
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        commitModify(callback: AsyncCallback<void>): void;
        /**
         * Modify metadata for the album
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        commitModify(): Promise<void>;
        /**
         * Add assets to the album.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<PhotoAsset> } assets - Assets to add
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAlbumChangeRequest#addAssets
         */
        addAssets(assets: Array<PhotoAsset>, callback: AsyncCallback<void>): void;
        /**
         * Add assets to the album.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<PhotoAsset> } assets - Assets to add
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAlbumChangeRequest#addAssets
         */
        addAssets(assets: Array<PhotoAsset>): Promise<void>;
        /**
         * Remove assets from the album.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<PhotoAsset> } assets - Assets to remove
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAlbumChangeRequest#removeAssets
         */
        removeAssets(assets: Array<PhotoAsset>, callback: AsyncCallback<void>): void;
        /**
         * Remove assets from the album.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<PhotoAsset> } assets - Assets to remove
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAlbumChangeRequest#removeAssets
         */
        removeAssets(assets: Array<PhotoAsset>): Promise<void>;
    }
    /**
     * Helper functions to access photos and albums.
     *
     * @interface PhotoAccessHelper
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * Helper functions to access photos and albums.
     *
     * @interface PhotoAccessHelper
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    interface PhotoAccessHelper {
        /**
         * Fetch photo assets
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { FetchOptions } options - Fetch options.
         * @param { AsyncCallback<FetchResult<PhotoAsset>> } callback - Returns the fetch result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAssets(options: FetchOptions, callback: AsyncCallback<FetchResult<PhotoAsset>>): void;
        /**
         * Fetch photo assets
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { FetchOptions } options - Retrieval options.
         * @returns { Promise<FetchResult<PhotoAsset>> } Returns the fetch result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAssets(options: FetchOptions): Promise<FetchResult<PhotoAsset>>;
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { CreateOptions } options - Asset create option
         * @param { AsyncCallback<string> } callback - Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { CreateOptions } options - Asset create option
         * @param { AsyncCallback<string> } callback - Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        createAsset(photoType: PhotoType, extension: string, options: CreateOptions, callback: AsyncCallback<string>): void;
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { AsyncCallback<string> } callback - Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { AsyncCallback<string> } callback - Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        createAsset(photoType: PhotoType, extension: string, callback: AsyncCallback<string>): void;
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { CreateOptions } [options] - Optional asset create option
         * @returns { Promise<string> } Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Create a photo asset:
         *   1. (Suggested)Integrate security component without WRITE_IMAGEVIDEO permission;
         *   2. Get WRITE_IMAGEVIDEO permission by ACL;
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { CreateOptions } [options] - Optional asset create option
         * @returns { Promise<string> } Returns the uri of the newly created asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        createAsset(photoType: PhotoType, extension: string, options?: CreateOptions): Promise<string>;
        /**
         * Fetch albums.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { AlbumType } type - Album type.
         * @param { AlbumSubtype } subtype - Album subtype.
         * @param { FetchOptions } options - options to fetch albums
         * @param { AsyncCallback<FetchResult<Album>> } callback - Returns the fetch result
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAlbums(type: AlbumType, subtype: AlbumSubtype, options: FetchOptions, callback: AsyncCallback<FetchResult<Album>>): void;
        /**
         * Fetch albums.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { AlbumType } type - Album type.
         * @param { AlbumSubtype } subtype - Album subtype.
         * @param { AsyncCallback<FetchResult<Album>> } callback - Returns the fetch result
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAlbums(type: AlbumType, subtype: AlbumSubtype, callback: AsyncCallback<FetchResult<Album>>): void;
        /**
         * Fetch albums.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { AlbumType } type - Album type.
         * @param { AlbumSubtype } subtype - Album subtype.
         * @param { FetchOptions } [options] - options to fetch albums
         * @returns { Promise<FetchResult<Album>> } - Returns the fetch result
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        getAlbums(type: AlbumType, subtype: AlbumSubtype, options?: FetchOptions): Promise<FetchResult<Album>>;
        /**
         * Register change notify for the specified uri.
         *
         * @param { string } uri - PhotoAsset's uri, album's uri or DefaultChangeUri
         * @param { boolean } forChildUris - Monitor the child uris.
         * @param { Callback<ChangeData> } callback - Returns the changed data
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        registerChange(uri: string, forChildUris: boolean, callback: Callback<ChangeData>): void;
        /**
         * Unregister change notify for the specified uri.
         *
         * @param { string } uri - PhotoAsset's uri, album's uri or DefaultChangeUri
         * @param { Callback<ChangeData> } [callback] - The callback function to unregister.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        unRegisterChange(uri: string, callback?: Callback<ChangeData>): void;
        /**
         * Create a pop-up box to delete photos
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<string> } uriList - List of the asset uris to be deleted
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAssetChangeRequest#deleteAssets
         */
        createDeleteRequest(uriList: Array<string>, callback: AsyncCallback<void>): void;
        /**
         * Create a pop-up box to delete photos
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Array<string> } uriList - List of the asset uris to be deleted
         * @returns { Promise<void> } - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900012 - Permission denied
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         * @deprecated since 11
         * @useinstead photoAccessHelper.MediaAssetChangeRequest#deleteAssets
         */
        createDeleteRequest(uriList: Array<string>): Promise<void>;
        /**
         * Create a save dialog to save photos
         *
         * @param { Array<string> } srcFileUris - List of the file uris to be saved
         * @param { Array<PhotoCreationConfig> } photoCreationConfigs - List of the photo asset creation configs
         * @returns { Promise<Array<string>> } - Returns the media library file uri list to application which has been authorized
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - Internal system error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        showAssetsCreationDialog(srcFileUris: Array<string>, photoCreationConfigs: Array<PhotoCreationConfig>): Promise<Array<string>>;
        /**
         * Release PhotoAccessHelper instance
         *
         * @param { AsyncCallback<void> } callback - Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        release(callback: AsyncCallback<void>): void;
        /**
         * Release PhotoAccessHelper instance
         *
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900020 - Invalid argument
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        release(): Promise<void>;
        /**
         * Apply the change request of asset or album.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { MediaChangeRequest } mediaChangeRequest - The change request to be applied
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        applyChanges(mediaChangeRequest: MediaChangeRequest): Promise<void>;
    }
    /**
     * Enumeration types of data change.
     *
     * @enum { number } NotifyType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum NotifyType {
        /**
         * Data(assets or albums) have been newly created
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        NOTIFY_ADD,
        /**
         * Data(assets or albums) have been modified
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        NOTIFY_UPDATE,
        /**
         * Data(assets or albums) have been removed
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        NOTIFY_REMOVE,
        /**
         * Assets have been added to an album.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        NOTIFY_ALBUM_ADD_ASSET,
        /**
         * Assets have been removed from an album.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        NOTIFY_ALBUM_REMOVE_ASSET
    }
    /**
     * Enumeration uris for registerChange.
     *
     * @enum { string } DefaultChangeUri
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    enum DefaultChangeUri {
        /**
         * Uri for default PhotoAsset, use with forDescendant{true}, will receive all PhotoAsset's change notifications
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DEFAULT_PHOTO_URI = 'file://media/Photo',
        /**
         * Uri for default Album, use with forDescendant{true}, will receive all Album's change notifications
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        DEFAULT_ALBUM_URI = 'file://media/PhotoAlbum'
    }
    /**
     * Defines the change data
     *
     * @interface ChangeData
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    interface ChangeData {
        /**
         * The NotifyType of ChangeData
         *
         * @type { NotifyType }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        type: NotifyType;
        /**
         * The changed uris
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        uris: Array<string>;
        /**
         * Change details of the asset uris to an album.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        extraUris: Array<string>;
    }
    /**
     * PhotoViewMIMETypes represents the type of media resource that photo picker selects.
     *
     * @enum { string } PhotoViewMIMETypes
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * PhotoViewMIMETypes represents the type of media resource that photo picker selects.
     *
     * @enum { string } PhotoViewMIMETypes
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    export enum PhotoViewMIMETypes {
        /**
         * IMAGE_TYPE indicates that the selected media resources are images.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * IMAGE_TYPE indicates that the selected media resources are images.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        IMAGE_TYPE = 'image/*',
        /**
         * VIDEO_TYPE indicates that the selected media resources are videos.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * VIDEO_TYPE indicates that the selected media resources are videos.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        VIDEO_TYPE = 'video/*',
        /**
         * IMAGE_VIDEO_TYPE indicates that the selected media resources are images and videos.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * IMAGE_VIDEO_TYPE indicates that the selected media resources are images and videos.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        IMAGE_VIDEO_TYPE = '*/*',
        /**
         * MOVING_PHOTO_IMAGE_TYPE indicates that the selected media resources are moving photos.
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        MOVING_PHOTO_IMAGE_TYPE = 'image/movingPhoto'
    }
    /**
     * Class BaseSelectOptions, which is extracted from class PhotoSelectOptions
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    class BaseSelectOptions {
        /**
         * The Type of the file in the picker window.
         *
         * @type { ?PhotoViewMIMETypes }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * The Type of the file in the picker window.
         *
         * @type { ?PhotoViewMIMETypes }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The Type of the file in the picker window.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?PhotoViewMIMETypes }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        MIMEType?: PhotoViewMIMETypes;
        /**
         * Maximum number of images for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Maximum number of images for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        /**
         * Maximum number of images for a single selection.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        maxSelectNumber?: number;
        /**
         * Support search.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        /**
         * Support search.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        isSearchSupported?: boolean;
        /**
         * Support taking photos.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        /**
         * Support taking photos.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        isPhotoTakingSupported?: boolean;
        /**
        * The recommendation options when use recommendation photo function.
        *
        * @type { ?RecommendationOptions }
        * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
        * @atomicservice
        * @since 11
        */
        /**
         * The recommendation options when use recommendation photo function.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?RecommendationOptions }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        recommendationOptions?: RecommendationOptions;
        /**
         * The uri for the preselected files.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        /**
         * The uri for the preselected files.
         * Move from class PhotoSelectOptions to it's base class BaseSelectOptions
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        preselectedUris?: Array<string>;
        /**
         * Support preview in single selection mode or not
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        isPreviewForSingleSelectionSupported?: boolean;
    }
    /**
     * PhotoSelectOptions Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * PhotoSelectOptions Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    /**
     * PhotoSelectOptions extends base class BaseSelectOptions
     *
     * @extends BaseSelectOptions
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    class PhotoSelectOptions extends BaseSelectOptions {
        /**
         * Support editing photos.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        isEditSupported?: boolean;
        /**
         * Support select original photo or not
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        isOriginalSupported?: boolean;
        /**
         * SubWindow name
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        subWindowName?: string;
    }
    /**
     * Options for recommend photos
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    class RecommendationOptions {
        /**
         * The recommendation photo type when select photo in photo picker.
         *
         * @type { ?RecommendationType }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        recommendationType?: RecommendationType;
        /**
         * The textContextInfo to recommend images.
         *
         * @type { ?TextContextInfo }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        textContextInfo?: TextContextInfo;
    }
    /**
     * Defines the text context info.
     *
     * @interface TextContextInfo
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    interface TextContextInfo {
        /**
         * The Simplified Chinese(UTF-8) text within 250 to recommend images.
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        text?: string;
    }
    /**
     * PhotoSelectResult Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * PhotoSelectResult Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    class PhotoSelectResult {
        /**
         * The uris for the selected files.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * The uris for the selected files.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        photoUris: Array<string>;
        /**
         * Original option.
         *
         * @type { boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Original option.
         *
         * @type { boolean }
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        isOriginalPhoto: boolean;
    }
    /**
     * PhotoViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 10
     */
    /**
     * PhotoViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    class PhotoViewPicker {
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } [option] - represents the options provided in select mode.
         * @returns { Promise<PhotoSelectResult> } Returns the uris for the selected files.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } [option] - represents the options provided in select mode.
         * @returns { Promise<PhotoSelectResult> } Returns the uris for the selected files.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        select(option?: PhotoSelectOptions): Promise<PhotoSelectResult>;
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<PhotoSelectResult> } callback - Returns the PhotoSelectResult by photo picker
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<PhotoSelectResult> } callback - Returns the PhotoSelectResult by photo picker
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        select(option: PhotoSelectOptions, callback: AsyncCallback<PhotoSelectResult>): void;
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { AsyncCallback<PhotoSelectResult> } callback - Returns the PhotoSelectResult by photo picker
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 10
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { AsyncCallback<PhotoSelectResult> } callback - Returns the PhotoSelectResult by photo picker
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 13900042 - Unknown error
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        select(callback: AsyncCallback<PhotoSelectResult>): void;
    }
    /**
     * Enumeration of resource type.
     *
     * @enum { number } ResourceType
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    enum ResourceType {
        /**
         * Image resource
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        IMAGE_RESOURCE = 1,
        /**
         * Video resource
         *
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        VIDEO_RESOURCE = 2
    }
    /**
     * Defines the interface of media change request.
     *
     * @interface MediaChangeRequest
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    interface MediaChangeRequest {
    }
    /**
     * Defines the class of media asset change request.
     *
     * @implements MediaChangeRequest
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 11
     */
    class MediaAssetChangeRequest implements MediaChangeRequest {
        /**
         * The constructor to create a MediaAssetChangeRequest instance.
         *
         * @param { PhotoAsset } asset - Specify which asset to change
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        /**
         * The constructor to create a MediaAssetChangeRequest instance.
         *
         * @param { PhotoAsset } asset - Specify which asset to change
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        constructor(asset: PhotoAsset);
        /**
         * Create image asset change request.
         *
         * @param { Context } context - Hap context information
         * @param { string } fileUri - File uri
         * @returns { MediaAssetChangeRequest } - Returns a MediaAssetChangeRequest instance
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900002 - No such file
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        /**
         * Create image asset change request.
         *
         * @param { Context } context - Hap context information
         * @param { string } fileUri - File uri
         * @returns { MediaAssetChangeRequest } - Returns a MediaAssetChangeRequest instance
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900002 - No such file
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        static createImageAssetRequest(context: Context, fileUri: string): MediaAssetChangeRequest;
        /**
         * Create video asset change request.
         *
         * @param { Context } context - Hap context information
         * @param { string } fileUri - File uri
         * @returns { MediaAssetChangeRequest } - Returns a MediaAssetChangeRequest instance
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900002 - No such file
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        static createVideoAssetRequest(context: Context, fileUri: string): MediaAssetChangeRequest;
        /**
         * Create asset change request.
         *
         * @param { Context } context - Hap context information
         * @param { PhotoType } photoType - Photo asset type
         * @param { string } extension - Asset extension
         * @param { CreateOptions } [options] - Optional asset create option
         * @returns { MediaAssetChangeRequest } - Returns a MediaAssetChangeRequest instance
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        static createAssetRequest(context: Context, photoType: PhotoType, extension: string, options?: CreateOptions): MediaAssetChangeRequest;
        /**
         * Delete assets.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { Array<PhotoAsset> } assets - Assets to delete
         * @returns { Promise<void> } - Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        static deleteAssets(context: Context, assets: Array<PhotoAsset>): Promise<void>;
        /**
         * Delete assets.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @param { Context } context - Hap context information
         * @param { Array<string> } uriList - Uris of assets to delete
         * @returns { Promise<void> } - Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000002 - Invalid asset uri
         * @throws { BusinessError } 14000011 - System inner fail
         * @static
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        static deleteAssets(context: Context, uriList: Array<string>): Promise<void>;
        /**
         * Get the asset.
         *
         * @returns { PhotoAsset } - Returns the asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        /**
         * Get the asset.
         *
         * @returns { PhotoAsset } - Returns the asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        getAsset(): PhotoAsset;
        /**
         * Set title of the asset.
         *
         * @param { string } title - the new title of the asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        /**
         * Set title of the asset.
         *
         * @param { string } title - the new title of the asset
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        setTitle(title: string): void;
        /**
         * Get write cache handler.
         *
         * @permission ohos.permission.WRITE_IMAGEVIDEO
         * @returns { Promise<number> } Returns the write cache handler
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        getWriteCacheHandler(): Promise<number>;
        /**
         * Add resource of the asset using file uri.
         *
         * @param { ResourceType } type - Resource type
         * @param { string } fileUri - File uri
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 13900002 - No such file
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        addResource(type: ResourceType, fileUri: string): void;
        /**
         * Add resource of the asset using ArrayBuffer.
         *
         * @param { ResourceType } type - Resource type
         * @param { ArrayBuffer } data - Data buffer to add
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 11
         */
        addResource(type: ResourceType, data: ArrayBuffer): void;
        /**
         * Save the photo asset captured by camera.
         *
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        saveCameraPhoto(): void;
        /**
         * Discard the photo asset captured by camera.
         *
         * @throws { BusinessError } 14000011 - Internal system error
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 12
         */
        discardCameraPhoto(): void;
    }
    /**
     * Defines the class of media album change request.
     *
     * @implements MediaChangeRequest
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @since 11
     */
    class MediaAlbumChangeRequest implements MediaChangeRequest {
        /**
         * The constructor to create a MediaAlbumChangeRequest instance.
         *
         * @param { Album } album - Specify which album to change
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        constructor(album: Album);
        /**
         * Get the album.
         *
         * @returns { Album } - Returns the album
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        getAlbum(): Album;
        /**
         * Set name of the album.
         *
         * @param { string } name - the new name to set
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        setAlbumName(name: string): void;
        /**
         * Add assets into the album.
         *
         * @param { Array<PhotoAsset> } assets - the assets to add
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        addAssets(assets: Array<PhotoAsset>): void;
        /**
         * Remove assets from the album.
         *
         * @param { Array<PhotoAsset> } assets - the assets to be removed
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @throws { BusinessError } 14000016 - Operation Not Support
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @since 11
         */
        removeAssets(assets: Array<PhotoAsset>): void;
    }
    /**
     * Defines the moving photo.
     *
     * @interface MovingPhoto
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    interface MovingPhoto {
        /**
         * Request the image and video content of the moving photo and write to destination uri.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { string } imageFileUri - Destination uri of the image content to be written
         * @param { string } videoFileUri - Destination uri of the video content to be written
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        requestContent(imageFileUri: string, videoFileUri: string): Promise<void>;
        /**
         * Request content of the moving photo for the given resource type and write to destination uri.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { ResourceType } resourceType - The resource type of the content to request
         * @param { string } fileUri - Destination uri of the content to be written
         * @returns { Promise<void> } Returns void
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        requestContent(resourceType: ResourceType, fileUri: string): Promise<void>;
        /**
         * Request content of the moving photo for the given resource type and return the array buffer.
         *
         * @permission ohos.permission.READ_IMAGEVIDEO
         * @param { ResourceType } resourceType - The resource type of the content to request
         * @returns { Promise<ArrayBuffer> } Returns array buffer of the content
         * @throws { BusinessError } 201 - Permission denied
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        requestContent(resourceType: ResourceType): Promise<ArrayBuffer>;
        /**
         * Get uri of the moving photo.
         *
         * @returns { string } Returns uri of the moving photo
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14000011 - System inner fail
         * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
         * @atomicservice
         * @since 12
         */
        getUri(): string;
    }
}
export default photoAccessHelper;
