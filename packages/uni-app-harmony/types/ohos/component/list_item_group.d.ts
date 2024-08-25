/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
 * Defines the list item group style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Defines the list item group style.
 *
 * @enum { number }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare enum ListItemGroupStyle {
    /**
     * Show custom style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Show custom style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    NONE = 0,
    /**
     * Show default style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Show default style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    CARD = 1
}
/**
 * Defines the list item group options.
 *
 * @interface ListItemGroupOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the list item group options.
 *
 * @interface ListItemGroupOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the list item group options.
 *
 * @interface ListItemGroupOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare interface ListItemGroupOptions {
    /**
     * Describes the ListItemGroup header.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Describes the ListItemGroup header.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the ListItemGroup header.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    header?: CustomBuilder;
    /**
     * Describes the ListItemGroup footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Describes the ListItemGroup footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the ListItemGroup footer.
     *
     * @type { ?CustomBuilder }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    footer?: CustomBuilder;
    /**
     * Describes the ListItemGroup space.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Describes the ListItemGroup space.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Describes the ListItemGroup space.
     *
     * @type { ?(number | string) }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    space?: number | string;
    /**
     * Describes the ListItemGroup style.
     *
     * @type { ?ListItemGroupStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Describes the ListItemGroup style.
     *
     * @type { ?ListItemGroupStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    style?: ListItemGroupStyle;
}
/**
 * Defines the ListItemGroup component
 *
 * @interface ListItemGroupInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the ListItemGroup component
 *
 * @interface ListItemGroupInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the ListItemGroup component
 *
 * @interface ListItemGroupInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
interface ListItemGroupInterface {
    /**
     * Called when interface is called.
     *
     * @param { ListItemGroupOptions } options
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when interface is called.
     *
     * @param { ListItemGroupOptions } options
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when interface is called.
     *
     * @param { ListItemGroupOptions } options
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    (options?: ListItemGroupOptions): ListItemGroupAttribute;
}
/**
 * Defines the item group attribute functions.
 *
 * @extends CommonMethod<ListItemGroupAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines the item group attribute functions.
 *
 * @extends CommonMethod<ListItemGroupAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines the item group attribute functions.
 *
 * @extends CommonMethod<ListItemGroupAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare class ListItemGroupAttribute extends CommonMethod<ListItemGroupAttribute> {
    /**
     * Called when the ListItemGroup split line style is set.
     *
     * @param { {
     *   strokeWidth: Length;
     *   color?: ResourceColor;
     *   startMargin?: Length;
     *   endMargin?: Length;
     * } | null } value
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Called when the ListItemGroup split line style is set.
     *
     * @param { {
     *   strokeWidth: Length;
     *   color?: ResourceColor;
     *   startMargin?: Length;
     *   endMargin?: Length;
     * } | null } value
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Called when the ListItemGroup split line style is set.
     *
     * @param { {
     *   strokeWidth: Length;
     *   color?: ResourceColor;
     *   startMargin?: Length;
     *   endMargin?: Length;
     * } | null } value
     * @returns { ListItemGroupAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    divider(value: {
        strokeWidth: Length;
        color?: ResourceColor;
        startMargin?: Length;
        endMargin?: Length;
    } | null): ListItemGroupAttribute;
    /**
     * Set children main size for ListItemGroup.
     *
     * @param { ChildrenMainSize } value - children main size for ListItemGroup
     * @returns { ListItemGroupAttribute } the attribute of the ListItemGroup.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    childrenMainSize(value: ChildrenMainSize): ListItemGroupAttribute;
}
/**
 * Defines ListItemGroup Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines ListItemGroup Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ListItemGroup Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ListItemGroupInstance: ListItemGroupAttribute;
/**
 * Defines ListItemGroup Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 */
/**
 * Defines ListItemGroup Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Defines ListItemGroup Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare const ListItemGroup: ListItemGroupInterface;
