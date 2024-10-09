/*
 * Copyright (c) 2023-2024 Huawei Device Co., Ltd.
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
export declare class EditableTitleBarMenuItem {
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
     * Icon label for this menu item.
     * @type { ?ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    label?: ResourceStr;
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
 * Declaration of the image item .
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
export type EditableTitleBarItem = EditableTitleBarMenuItem;
/**
 * Declaration of the left icon type.
 * @enum { EditableLeftIconType }.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declaration of the left icon type.
 * @enum { EditableLeftIconType }.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare enum EditableLeftIconType {
    /**
     * The back type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The back type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    Back = 0,
    /**
     * The cancel type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * The cancel type.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    Cancel = 1
}
/**
 * Indicates the options of the editable title bar.
 *
 * @interface EditableTitleBarOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
export declare interface EditableTitleBarOptions {
    /**
     * Background color.
     *
     * @type { ?ResourceColor }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    backgroundColor?: ResourceColor;
    /**
     * Background blur style.
     *
     * @type { ?BlurStyle }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    backgroundBlurStyle?: BlurStyle;
    /**
     * Indicates the types of the safe area.
     *
     * @type { ?Array<SafeAreaType> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    safeAreaTypes?: Array<SafeAreaType>;
    /**
     * Indicates the edges of the safe area.
     *
     * @type { ?Array<SafeAreaEdge> }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    safeAreaEdges?: Array<SafeAreaEdge>;
}
/**
 * Declaration of the editable title bar.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declaration of the editable title bar.
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
@Component
export declare struct EditableTitleBar {
    /**
     * Style of the left icon.
     * @type { EditableLeftIconType }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Style of the left icon.
     * @type { EditableLeftIconType }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    leftIconStyle: EditableLeftIconType;
    /**
     * Image item between the left icon and the title.
     * @type { ?EditableTitleBarItem }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    imageItem?: EditableTitleBarItem;
    /**
     * Title of this title bar.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Title of this title bar.
     * @type { ResourceStr }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    title: ResourceStr;
    /**
     * Sub-Title of this title bar.
     * @type { ?ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    subtitle?: ResourceStr;
    /**
     * Whether to required the save icon.
     * @type { boolean }
     * @default true
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    isSaveIconRequired: boolean;
    /**
     * Menu items on the right side.
     * @type { ?Array<EditableTitleBarMenuItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Menu items on the right side.
     * @type { ?Array<EditableTitleBarMenuItem> }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    menuItems?: Array<EditableTitleBarMenuItem>;
    /**
     * Callback function when click on the save icon at the right side.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback function when click on the save icon at the right side.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onSave?: () => void;
    /**
     * Callback function when click on the cancel icon at the left side.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Callback function when click on the cancel icon at the left side.
     * @type { ?() => void }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    onCancel?: () => void;
    /**
     * Indicates the options of titlebar.
     * @type { EditableTitleBarOptions }
     * @default {expandSafeAreaTypes: SafeAreaType.SYSTEM, expandSafeAreaEdges: SafeAreaEdge.TOP}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    options: EditableTitleBarOptions;
    /**
     * Sets the content margin.
     * @type { ?LocalizedMargin }
     * @default {start: LengthMetrics.resource($r('sys.float.margin_left')),
     * <br> end: LengthMetrics.resource($r('sys.float.margin_right'))}
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    @Prop
    contentMargin?: LocalizedMargin;
}
