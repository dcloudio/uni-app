/*
 * Copyright (C) 2024 Huawei Device Co., Ltd.
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
 * @file A component which supports applications to select album
 * @kit MediaLibraryKit
 */
import { PickerColorMode } from '@ohos.file.PhotoPickerComponent';
/**
 * AlbumPickerComponent: can select a certain album and display the images in that album through PhotoPickerComponent
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
@Component
export declare struct AlbumPickerComponent {
    /**
     * AlbumPickerOptions
     *
     * @type { ?AlbumPickerOptions }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Corea
     * @atomicservice
     * @since 12
     */
    albumPickerOptions?: AlbumPickerOptions;
    /**
     * Callback when select an album, will return album uri
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onAlbumClick?: (albumInfo: AlbumInfo) => boolean;
}
/**
 * AlbumPickerOptions Object
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class AlbumPickerOptions {
    /**
     * AlbumPickerComponent theme color
     *
     * @type { ?PickerColorMode }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    themeColorMode?: PickerColorMode;
}
/**
 * AlbumInfo: include album uri
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class AlbumInfo {
    /**
     * Album uri
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    uri?: string;
}
