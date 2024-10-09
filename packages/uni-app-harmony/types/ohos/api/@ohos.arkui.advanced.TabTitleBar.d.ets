/*
 * Copyright (c) 2023-2023 Huawei Device Co., Ltd.
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
 * Declaration of the menu item on the right side.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declaration of the menu item on the right side.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class TabTitleBarMenuItem {
    /**
     * Icon resource for this menu item.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Icon resource for this menu item.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    value: ResourceStr;
    /**
     * Whether to enable this menu item.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Whether to enable this menu item.
     * @type { ?boolean }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    isEnabled?: boolean;
    /**
     * Callback function when click on this menu item.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback function when click on this menu item.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    action?: () => void;
}
/**
 * Declaration of the tab item.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declaration of the tab item.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class TabTitleBarTabItem {
    /**
     * Text description for this tab item.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Text description for this tab item.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title: ResourceStr;
    /**
     * Icon resource for this tab item.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Icon resource for this tab item.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    icon?: ResourceStr;
}
/**
 * Declaration of the tabbed title bar.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declaration of the tabbed title bar.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@Component
export declare struct TabTitleBar {
    /**
     * Tab items on the left side.
     * @type { ?Array<TabTitleBarItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Tab items on the left side.
     * @type { ?Array<TabTitleBarItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    tabItems: Array<TabTitleBarTabItem>;
    /**
     * Menu items on the right side.
     * @type { Array<TabTitleBarMenuItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Menu items on the right side.
     * @type { Array<TabTitleBarMenuItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    menuItems?: Array<TabTitleBarMenuItem>;
    /**
     * Content builder. Each component corresponds to a tab item.
     * The builder needs to be transferred.
     * @type { () => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Content builder. Each component corresponds to a tab item.
     * The builder needs to be transferred.
     * @type { () => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    @BuilderParam
    swiperContent: () => void;
}
