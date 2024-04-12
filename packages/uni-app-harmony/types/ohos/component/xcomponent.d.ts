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
 * Defines XComponentController
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
declare class XComponentController {
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    constructor();
    /**
     * Get the id of surface created by XComponent.
     *
     * @returns { string } The id of surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    getXComponentSurfaceId(): string;
    /**
     * Get the context of native XComponent.
     *
     * @returns { Object } The context of native XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    getXComponentContext(): Object;
    /**
     * Set the surface size created by XComponent.
     *
     * @param { object } value - surface size
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    setXComponentSurfaceSize(value: {
        surfaceWidth: number;
        surfaceHeight: number;
    }): void;
}
/**
 * Defines XComponent.
 *
 * @interface XComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
interface XComponentInterface {
    /**
     * Constructor parameters
     *
     * @param { object } value - Indicates the options of the xcomponent.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    (value: {
        id: string;
        type: string;
        libraryname?: string;
        controller?: XComponentController;
    }): XComponentAttribute;
    /**
     * Constructor parameters
     *
     * @param { object } value - Indicates the options of the xcomponent.
     * @returns { XComponentAttribute } The attribute of the xcomponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    (value: {
        id: string;
        type: XComponentType;
        libraryname?: string;
        controller?: XComponentController;
    }): XComponentAttribute;
}
/**
 * Defines XComponentAttribute.
 *
 * @extends CommonMethod<XComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
declare class XComponentAttribute extends CommonMethod<XComponentAttribute> {
    /**
     * Called when judging whether the xcomponent surface is created.
     *
     * @param { function } [callback] - Called when judging whether the xcomponent surface is created.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    onLoad(callback: (event?: object) => void): XComponentAttribute;
    /**
     * Called when judging whether the xcomponent is destroyed.
     *
     * @param { function } event - Called when judging whether the xcomponent is destroyed.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    onDestroy(event: () => void): XComponentAttribute;
}
/**
 * Defines XComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
declare const XComponent: XComponentInterface;
/**
 * Defines XComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
declare const XComponentInstance: XComponentAttribute;
