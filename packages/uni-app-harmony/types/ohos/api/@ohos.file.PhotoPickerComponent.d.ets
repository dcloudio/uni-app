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
 * @file A component which support other applications to select photos or videos
 * @kit MediaLibraryKit
 */
import photoAccessHelper from '@ohos.file.photoAccessHelper';
/**
 * Declare struct PhotoPickerComponent
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
@Component
export declare struct PhotoPickerComponent {
    /**
     * PickerOptions
     *
     * @type { ?PickerOptions }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    pickerOptions?: PickerOptions;
    /**
     * Callback when select photos or videos
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onSelect?: (uri: string) => void;
    /**
     * Callback when Deselect photos or videos
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onDeselect?: (uri: string) => void;
    /**
     * Callback when click item. include click camera item and thumbnail item, will return itemInfo
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onItemClicked?: (itemInfo: ItemInfo, clickType: ClickType) => boolean;
    /**
     * Callback when enter photo browser, will return photoBrowserInfo
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onEnterPhotoBrowser?: (photoBrowserInfo: PhotoBrowserInfo) => boolean;
    /**
     * Callback when exit photo browser, will return photoBrowserInfo
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onExitPhotoBrowser?: (photoBrowserInfo: PhotoBrowserInfo) => boolean;
    /**
     * Callback when pickerController is ready.
     * Set data to picker component by pickerController is supported after pickerController is ready
     *
     * @type { ?function }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    onPickerControllerReady?: () => void;
    /**
     * PickerController
     *
     * @type { ?PickerController }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    @ObjectLink
    pickerController: PickerController;
    /**
     * Build function of PhotoPickerComponent
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    build(): void;
}
/**
 * The class for PickerController
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
@Observed
export declare class PickerController {
    /**
     * Set data to picker component
     *
     * @param { DataType } dataType - data type
     * @param { Object } data - data
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    setData(dataType: DataType, data: Object): void;
    /**
     * Set max select count to picker component, include max_total_count, max_photo_count and max_video_count.
     *
     * @param { MaxSelected } maxSelected - max select count data
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    setMaxSelected(maxSelected: MaxSelected): void;
}
/**
 * PickerOptions Object
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class PickerOptions extends photoAccessHelper.BaseSelectOptions {
    /**
     * Support set checkBox color
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    checkBoxColor?: string;
    /**
     * Support set backgroundColor
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    backgroundColor?: string;
    /**
     * Support repeat select
     *
     * @type { ?boolean }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    isRepeatSelectSupported?: boolean;
    /**
     * Support to set checkbox text color
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    checkboxTextColor?: string;
    /**
     * Support to set photo browser background color mode
     *
     * @type { ?PickerColorMode }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    photoBrowserBackgroundColorMode?: PickerColorMode;
    /**
     * Support to set max select number remind mode.
     *
     * @type { ?ReminderMode }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    maxSelectedReminderMode?: ReminderMode;
    /**
     * Support to set display orientation
     *
     * @type { ?PickerOrientation }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    orientation?: PickerOrientation;
    /**
     * Support to set select mode
     *
     * @type { ?SelectMode }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    selectMode?: SelectMode;
    /**
     * Support to set max photo select number
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    maxPhotoSelectNumber?: number;
    /**
     * Support to set max video select number
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    maxVideoSelectNumber?: number;
}
/**
 * ItemInfo
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class ItemInfo {
    /**
     * itemType. include CAMERA and THUMBNAIL.
     *
     * @type { ?ItemType }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    itemType?: ItemType;
    /**
     * Uri. if the itemType is CAMERA, it will be null
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    uri?: string;
    /**
     * MimeType. if the itemType is CAMERA, it will be null
     *
     * @type { ?string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    mimeType?: string;
    /**
     * Width. if the itemType is CAMERA, it will be null
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    width?: number;
    /**
     * Height. if the itemType is CAMERA, it will be null
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    height?: number;
    /**
     * Size. if the itemType is CAMERA, it will be null
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    size?: number;
    /**
     * Duration. if the itemType is CAMERA, it will be null; if photos, return -1
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    duration?: number;
}
/**
 * PhotoBrowserInfo
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class PhotoBrowserInfo {
    /**
     * AnimatorParams. include duration and curve
     *
     * @type { ?AnimatorParams }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    animatorParams?: AnimatorParams;
}
/**
 * AnimatorParams
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class AnimatorParams {
    /**
     * Animate duration
     *
     * @type { ?number }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    duration?: number;
    /**
     * Animate curve
     *
     * @type { ?Curve | ICurve | string }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    curve?: Curve | ICurve | string;
}
/**
 * MaxSelected
 *
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare class MaxSelected {
    /**
     * data. support to set max_total_count, max_photo_count and max_video_count.
     *
     * @type { ?Map<MaxCountType, number> }
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    data?: Map<MaxCountType, number>;
}
/**
 * DataType represents the type of the data set to picker component
 *
 * @enum { number } DataType
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum DataType {
    /**
     * DataType: set selected uris to picker component, the data should be a array of uri
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    SET_SELECTED_URIS = 1,
    /**
     * SET_ALBUM_URI. set selected album uri to picker component
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    SET_ALBUM_URI = 2
}
/**
 * ItemType. include CAMERA and THUMBNAIL
 *
 * @enum { number } ItemType
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum ItemType {
    /**
     * THUMBNAIL. photos or videos item
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    THUMBNAIL = 0,
    /**
     * CAMERA. camera item
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    CAMERA = 1
}
/**
 * ClickType. include SELECTED and DESELECTED
 *
 * @enum { number } ClickType
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum ClickType {
    /**
     * SELECTED. click to select photos or videos, if click camera item, the clickType is SELECTED.
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    SELECTED = 0,
    /**
     * DESELECTED. click to deselect photos or videos
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    DESELECTED = 1
}
/**
 * PickerOrientation. include VERTICAL and HORIZONTAL
 *
 * @enum { number } PickerOrientation
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum PickerOrientation {
    /**
     * VERTICAL. vertical display
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    VERTICAL = 0,
    /**
     * HORIZONTAL. horizontal display
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    HORIZONTAL = 1
}
/**
 * SelectMode. include SINGLE_SELECT and MULTI_SELECT
 *
 * @enum { number } SelectMode
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum SelectMode {
    /**
     * SINGLE_SELECT. single select
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    SINGLE_SELECT = 0,
    /**
     * MULTI_SELECT. multi select
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    MULTI_SELECT = 1
}
/**
 * PickerColorMode. include AUTO, LIGHT and DARK
 *
 * @enum { number } PickerColorMode
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum PickerColorMode {
    /**
     * AUTO. follow system color
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    AUTO = 0,
    /**
     * LIGHT. light color
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    LIGHT = 1,
    /**
     * DARK. dark color
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    DARK = 2
}
/**
 * ReminderMode, include NONE, TOAST and MASK
 *
 * @enum { number } ReminderMode
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum ReminderMode {
    /**
     * NONE. no need to remind
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    NONE = 0,
    /**
     * TOAST. remind by toast
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    TOAST = 1,
    /**
     * MASK. remind by mask
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    MASK = 2
}
/**
 * MaxCountType. include TOTAL_MAX_COUNT, PHOTO_MAX_COUNT and VIDEO_MAX_COUNT
 *
 * @enum { number } MaxCountType
 * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
 * @atomicservice
 * @since 12
 */
export declare enum MaxCountType {
    /**
     * TOTAL_MAX_COUNT. total max count
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    TOTAL_MAX_COUNT = 0,
    /**
     * PHOTO_MAX_COUNT. photo max count
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    PHOTO_MAX_COUNT = 1,
    /**
     * VIDEO_MAX_COUNT. video max count
     *
     * @syscap SystemCapability.FileManagement.PhotoAccessHelper.Core
     * @atomicservice
     * @since 12
     */
    VIDEO_MAX_COUNT = 2
}
