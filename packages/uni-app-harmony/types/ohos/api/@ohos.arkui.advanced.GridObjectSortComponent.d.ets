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
 * @file
 * @kit ArkUI
 */
/**
 * Controls the style types of GridObjectSortComponent.
 * @enum { string }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export declare enum GridObjectSortComponentType {
    /**
     * The GridObjectSortComponent image text type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    IMAGE_TEXT = "image_text",
    /**
     * The GridObjectSortComponent text type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    TEXT = "text"
}
/**
 * Declaration of the GridObjectSortComponent item.
 * @interface GridObjectSortComponentIteml
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface GridObjectSortComponentItem {
    /**
     * id of GridObjectSortComponent item.
     * @type { number | string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    id: number | string;
    /**
     * GridObjectSortComponent item text.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    text: ResourceStr;
    /**
     * selected of GridObjectSortComponent item, true is show area, false is add area.
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    selected: boolean;
    /**
     * order of GridObjectSortComponentItem, Used for sorting dataList.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    order: number;
    /**
     * image resource path of the GridObjectSortComponent item.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    url?: ResourceStr;
}
/**
 * GridObjectSortComponentOptions of GridObjectSortComponent.
 * @interface GridEditOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface GridObjectSortComponentOptions {
    /**
     * Configuration GridObjectSortComponent type.
     * @type { GridObjectSortComponentType }
     * @default GridObjectSortComponentType.TEXT
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    type?: GridObjectSortComponentType;
    /**
     * The size of the GridObjectSortComponent image.
     * @type { ?number | ?Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    imageSize?: number | Resource;
    /**
     * The title displayed in the unedited state of the  GridObjectSortComponent.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    normalTitle?: ResourceStr;
    /**
     * The title displayed in the GridObjectSortComponent edit state.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    editTitle?: ResourceStr;
    /**
     * Display Area Title, First subtitle of the GridObjectSortComponent.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    showAreaTitle?: ResourceStr;
    /**
     * Add Zone Title, second subtitle of the GridObjectSortComponent.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    addAreaTitle?: ResourceStr;
}
/**
 * Declare struct GridObjectSortComponent.
 * @struct { GridObjectSortComponent }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
@Component
export declare struct GridObjectSortComponent {
    /**
     * Component types and parameters of the GridObjectSortComponent.
     * @type { GridObjectSortComponentOptions }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    @Prop
    options: GridObjectSortComponentOptions;
    /**
     * Data list of GridObjectSortComponent.
     * @type { Array<GridObjectSortComponentItem> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    dataList: Array<GridObjectSortComponentItem>;
    /**
     * Callback when Obtain edited data.
     * @type { (select: Array<GridObjectSortComponentItem>, unselect: Array<GridObjectSortComponentItem>) => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onSave: (select: Array<GridObjectSortComponentItem>, unselect: Array<GridObjectSortComponentItem>) => void;
    /**
     * Cancel callback for saving data.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    onCancel: () => void;
    /**
     * Build function of GridObjectSortComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    build(): void;
}
