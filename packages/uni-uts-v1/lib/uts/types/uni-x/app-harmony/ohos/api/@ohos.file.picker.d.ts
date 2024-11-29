/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
 * @kit CoreFileKit
 */
import { AsyncCallback } from './@ohos.base';
import Context from './application/Context';
/**
 * Provide the capabilities to use different pickers.
 *
 * @namespace picker
 * @syscap SystemCapability.FileManagement.UserFileService
 * @since 9
 */
/**
 * Provide the capabilities to use different pickers.
 *
 * @namespace picker
 * @syscap SystemCapability.FileManagement.UserFileService
 * @atomicservice
 * @since 11
 */
/**
 * Provide the capabilities to use different pickers.
 *
 * @namespace picker
 * @syscap SystemCapability.FileManagement.UserFileService
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare namespace picker {
    /**
     * PhotoViewMIMETypes represents the type of media resource that photo picker selects.
     *
     * @enum { string } PhotoViewMIMETypes
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * PhotoViewMIMETypes represents the type of media resource that photo picker selects.
     *
     * @enum { string } PhotoViewMIMETypes
     * @syscap SystemCapability.FileManagement.UserFileService
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead ohos.file.photoAccessHelper/photoAccessHelper#PhotoViewMIMETypes
     */
    export enum PhotoViewMIMETypes {
        /**
         * Image type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Image type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        IMAGE_TYPE = 'image/*',
        /**
         * Video type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Video type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        VIDEO_TYPE = 'video/*',
        /**
         * Image and video type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Image and video type.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        IMAGE_VIDEO_TYPE = '*/*'
    }
    /**
     * PhotoSelectOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * PhotoSelectOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead ohos.file.photoAccessHelper/photoAccessHelper#PhotoSelectOptions
     */
    class PhotoSelectOptions {
        /**
         * The Type of the file in the picker window.
         *
         * @type { ?PhotoViewMIMETypes }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * The Type of the file in the picker window.
         *
         * @type { ?PhotoViewMIMETypes }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        MIMEType?: PhotoViewMIMETypes;
        /**
         * Maximum number of images for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Maximum number of images for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        maxSelectNumber?: number;
    }
    /**
     * PhotoSelectResult Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * PhotoSelectResult Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead ohos.file.photoAccessHelper/photoAccessHelper#PhotoSelectResult
     */
    class PhotoSelectResult {
        /**
         * The uris for the selected files.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * The uris for the selected files.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        photoUris: Array<string>;
        /**
         * Original option.
         *
         * @type { boolean }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Original option.
         *
         * @type { boolean }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         */
        isOriginalPhoto: boolean;
    }
    /**
     * PhotoSaveOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     * @deprecated since 12
     */
    class PhotoSaveOptions {
        /**
         * The names of the files to be saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        newFileNames?: Array<string>;
    }
    /**
     * PhotoViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * PhotoViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @atomicservice
     * @since 11
     * @deprecated since 12
     * @useinstead ohos.file.photoAccessHelper/photoAccessHelper#PhotoViewPicker
     */
    class PhotoViewPicker {
        /**
         * The constructor used to create a PhotoViewPicker object.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * The constructor used to create a PhotoViewPicker object.
         *
         * @param { Context } context - represents the context.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 12
         */
        constructor(context: Context);
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<PhotoSelectResult> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<PhotoSelectResult> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         * @deprecated since 12
         * @useinstead ohos.file.photoAccessHelper/photoAccessHelper.PhotoViewPicker#select
         */
        select(option?: PhotoSelectOptions): Promise<PhotoSelectResult>;
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<PhotoSelectResult> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { PhotoSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<PhotoSelectResult> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         * @deprecated since 12
         * @useinstead ohos.file.photoAccessHelper/photoAccessHelper.PhotoViewPicker#select
         */
        select(option: PhotoSelectOptions, callback: AsyncCallback<PhotoSelectResult>): void;
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { AsyncCallback<PhotoSelectResult> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the photo picker based on the selection mode.
         *
         * @param { AsyncCallback<PhotoSelectResult> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 11
         * @deprecated since 12
         * @useinstead ohos.file.photoAccessHelper/photoAccessHelper.PhotoViewPicker#select
         */
        select(callback: AsyncCallback<PhotoSelectResult>): void;
        /**
         * Pull up the photo picker based on the save mode.
         *
         * @param { PhotoSaveOptions } option - represents the options provided in save mode.
         * @returns { Promise<Array<string>> } Returns the uris for the saved files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         * @deprecated since 12
         * @useinstead save_button/SaveButton
         */
        save(option?: PhotoSaveOptions): Promise<Array<string>>;
        /**
         * Pull up the photo picker based on the save mode.
         *
         * @param { PhotoSaveOptions } option - represents the options provided in save mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         * @deprecated since 12
         * @useinstead save_button/SaveButton
         */
        save(option: PhotoSaveOptions, callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the photo picker based on the save mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         * @deprecated since 12
         * @useinstead save_button/SaveButton
         */
        save(callback: AsyncCallback<Array<string>>): void;
    }
    /**
     * Enumerates the picker's select mode types.
     *
     * @enum { number } DocumentSelectMode
     * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
     * @since 11
     */
    /**
     * Enumerates the picker's select mode types.
     *
     * @enum { number } DocumentSelectMode
     * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export enum DocumentSelectMode {
        /**
         * Indicates that only files are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @since 11
         */
        /**
         * Indicates that only files are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        FILE = 0,
        /**
         * Indicates that only folders are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @since 11
         */
        /**
         * Indicates that only folders are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        FOLDER = 1,
        /**
         * Indicates that files and folders are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @since 11
         */
        /**
         * Indicates that files and folders are allowed to be selected.
         *
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @atomicservice
         * @since 12
         */
        MIXED = 2
    }
    /**
     * Enumerates the picker's mode types.
     *
     * @enum { number } DocumentPickerMode
     * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
     * @atomicservice
     * @since 12
     */
    export enum DocumentPickerMode {
        /**
         * Document mode.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        DEFAULT = 0,
        /**
         * Download mode.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        DOWNLOAD = 1
    }
    /**
     * DocumentSelectOptions Object.
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * DocumentSelectOptions Object.
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class DocumentSelectOptions {
        /**
         * The default opening uri of the picker window.
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 10
         */
        /**
         * The default opening uri of the picker window.
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        defaultFilePathUri?: string;
        /**
         * Suffixes for file selected.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 10
         */
        /**
         * Suffixes for file selected.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        fileSuffixFilters?: Array<string>;
        /**
         * Maximum number of files for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 10
         */
        /**
         * Maximum number of files for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        maxSelectNumber?: number;
        /**
         * Selection mode.
         *
         * @type { ?DocumentSelectMode }
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @since 11
         */
        /**
         * Selection mode.
         *
         * @type { ?DocumentSelectMode }
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        selectMode?: DocumentSelectMode;
        /**
         * Granting Permissions to Specified Directories or Files.
         * The value true indicates that authorization is required.
         * When authmode is set to true, the defaultFilePathUri field is mandatory.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.FileManagement.UserFileService.FolderSelection
         * @atomicservice
         * @since 12
         */
        authMode?: boolean;
    }
    /**
     * DocumentSaveOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * DocumentSaveOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class DocumentSaveOptions {
        /**
         * The names of the files to be saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * The names of the files to be saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        newFileNames?: Array<string>;
        /**
         * The default opening uri of the picker window.
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 10
         */
        /**
         * The default opening uri of the picker window.
         *
         * @type { ?string }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        defaultFilePathUri?: string;
        /**
         * Suffixes for file saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 10
         */
        /**
         * Suffixes for file saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        fileSuffixChoices?: Array<string>;
        /**
         * picker mode.
         *
         * @type { ?DocumentPickerMode }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        pickerMode?: DocumentPickerMode;
    }
    /**
     * DocumentViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * DocumentViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class DocumentViewPicker {
        /**
         * The constructor used to create a DocumentViewPicker object.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        constructor();
        /**
         * The constructor used to create a DocumentViewPicker object.
         *
         * @param { Context } context - represents the context.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        constructor(context: Context);
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { DocumentSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<Array<string>> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { DocumentSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<Array<string>> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        select(option?: DocumentSelectOptions): Promise<Array<string>>;
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { DocumentSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { DocumentSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        select(option: DocumentSelectOptions, callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the selection mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        select(callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { DocumentSaveOptions } option - represents the options provided in save mode.
         * @returns { Promise<Array<string>> } Returns the uris for the saved files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { DocumentSaveOptions } option - represents the options provided in save mode.
         * @returns { Promise<Array<string>> } Returns the uris for the saved files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        save(option?: DocumentSaveOptions): Promise<Array<string>>;
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { DocumentSaveOptions } option - represents the options provided in save mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { DocumentSaveOptions } option - represents the options provided in save mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        save(option: DocumentSaveOptions, callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the document picker based on the save mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        save(callback: AsyncCallback<Array<string>>): void;
    }
    /**
     * AudioSelectOptions Object. Currently not supported.
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
   * AudioSelectOptions Object.
   *
   * @syscap SystemCapability.FileManagement.UserFileService
   * @crossplatform
   * @atomicservice
   * @since 12
   */
    class AudioSelectOptions {
        /**
         * Maximum number of audio for a single selection.
         *
         * @type { ?number }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        maxSelectNumber?: number;
    }
    /**
     * AudioSaveOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * AudioSaveOptions Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class AudioSaveOptions {
        /**
         * The names of the files to be saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * The names of the files to be saved.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        newFileNames?: Array<string>;
    }
    /**
     * AudioViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @since 9
     */
    /**
     * AudioViewPicker Object
     *
     * @syscap SystemCapability.FileManagement.UserFileService
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    class AudioViewPicker {
        /**
         * The constructor used to create a AudioViewPicker object.
         *
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 12
         */
        constructor();
        /**
         * The constructor used to create a AudioViewPicker object.
         *
         * @param { Context } context - represents the context.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @atomicservice
         * @since 12
         */
        constructor(context: Context);
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AudioSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<Array<string>> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AudioSelectOptions } option - represents the options provided in select mode.
         * @returns { Promise<Array<string>> } Returns the uris for the selected files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        select(option?: AudioSelectOptions): Promise<Array<string>>;
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AudioSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AudioSelectOptions } option - represents the options provided in select mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @since 12
         */
        select(option: AudioSelectOptions, callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the selection mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @since 12
         */
        select(callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AudioSaveOptions } option - represents the options provided in save mode.
         * @returns { Promise<Array<string>> } Returns the uris for the saved files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AudioSaveOptions } option - represents the options provided in save mode.
         * @returns { Promise<Array<string>> } Returns the uris for the saved files.
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        save(option?: AudioSaveOptions): Promise<Array<string>>;
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AudioSaveOptions } option - represents the options provided in save mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AudioSaveOptions } option - represents the options provided in save mode.
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @since 12
         */
        save(option: AudioSaveOptions, callback: AsyncCallback<Array<string>>): void;
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @since 9
         */
        /**
         * Pull up the audio picker based on the save mode.
         *
         * @param { AsyncCallback<Array<string>> } callback - callback
         * @syscap SystemCapability.FileManagement.UserFileService
         * @crossplatform
         * @since 12
         */
        save(callback: AsyncCallback<Array<string>>): void;
    }
}
export default picker;
