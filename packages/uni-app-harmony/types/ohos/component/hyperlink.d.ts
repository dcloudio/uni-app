/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
 * Defines the hyperlink interface.
 *
 * @interface HyperlinkInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the hyperlink interface.
 *
 * @interface HyperlinkInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
interface HyperlinkInterface {
    /**
     * Return to get Hyperlink.
     * adress: Web page redirected by the hyperlink component.
     * content: Hyperlinks in the hyperlink component display text.
     *
     * @param { string | Resource } address
     * @param { string | Resource } content
     * @returns { HyperlinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Return to get Hyperlink.
     * adress: Web page redirected by the hyperlink component.
     * content: Hyperlinks in the hyperlink component display text.
     *
     * @param { string | Resource } address
     * @param { string | Resource } content
     * @returns { HyperlinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    (address: string | Resource, content?: string | Resource): HyperlinkAttribute;
}
/**
 * Defines the hyperlink attribute functions
 *
 * @extends CommonMethod<HyperlinkAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines the hyperlink attribute functions
 *
 * @extends CommonMethod<HyperlinkAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare class HyperlinkAttribute extends CommonMethod<HyperlinkAttribute> {
    /**
     * Set Color
     *
     * @param { Color | number | string | Resource } value
     * @returns { HyperlinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set Color
     *
     * @param { Color | number | string | Resource } value
     * @returns { HyperlinkAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    color(value: Color | number | string | Resource): HyperlinkAttribute;
}
/**
 * Defines Hyperlink Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Hyperlink Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare const Hyperlink: HyperlinkInterface;
/**
 * Defines Hyperlink Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Hyperlink Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
declare const HyperlinkInterface: HyperlinkAttribute;
