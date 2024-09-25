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
 * Surface Rectangle information.
 *
 * @interface SurfaceRect
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
declare interface SurfaceRect {
    /**
     * The horizontal offset of the surface relative to XComponent.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    offsetX?: number;
    /**
     * The vertical offset of the surface relative to XComponent.
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    offsetY?: number;
    /**
     * The width of the surface created by XComponent
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    surfaceWidth: number;
    /**
     * The height of the surface created by XComponent
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    surfaceHeight: number;
}
/**
 * Surface rotation options.
 *
 * @interface SurfaceRotationOptions
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
declare interface SurfaceRotationOptions {
    /**
     * Lock property of the surface rotation.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    lock?: boolean;
}
/**
 * Defines XComponentController
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponentController
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare class XComponentController {
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Constructor.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    constructor();
    /**
     * Get the id of surface created by XComponent.
     *
     * @returns { string } The id of surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Get the id of surface created by XComponent.
     *
     * @returns { string } The id of surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getXComponentSurfaceId(): string;
    /**
     * Get the context of native XComponent.
     *
     * @returns { Object } The context of native XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Get the context of native XComponent.
     *
     * @returns { Object } The context of native XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    getXComponentContext(): Object;
    /**
     * Set the surface size created by XComponent.
     *
     * @param { object } value - surface size
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     */
    /**
     * Set the surface size created by XComponent.
     *
     * @param { object } value - surface size
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @deprecated since 12
     * @useinstead setXComponentSurfaceRect
     */
    setXComponentSurfaceSize(value: {
        surfaceWidth: number;
        surfaceHeight: number;
    }): void;
    /**
     * Set the rectangle information of surface created by XComponent.
     *
     * @param { SurfaceRect } rect - The surface rectangle information.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setXComponentSurfaceRect(rect: SurfaceRect): void;
    /**
     * Get the rectangle information of Surface created by XComponent.
     *
     * @returns { SurfaceRect } The surface rectangle information.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getXComponentSurfaceRect(): SurfaceRect;
    /**
     * Set the rotation options of the Surface created by XComponent.
     *
     * @param { SurfaceRotationOptions } rotationOptions - The surface rotation options.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    setXComponentSurfaceRotation(rotationOptions: SurfaceRotationOptions): void;
    /**
     * Get the rotation options result of the Surface created by XComponent.
     *
     * @returns { Required<SurfaceRotationOptions> } The surface rotation options result.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    getXComponentSurfaceRotation(): Required<SurfaceRotationOptions>;
    /**
     * Called after the surface is first created.
     *
     * @param { string } surfaceId - The id of the surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    onSurfaceCreated(surfaceId: string): void;
    /**
     * Called after the surface rectangle information is changed.
     *
     * @param { string } surfaceId - The id of the surface created by XComponent.
     * @param { SurfaceRect } rect - The rectangle information of the surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    onSurfaceChanged(surfaceId: string, rect: SurfaceRect): void;
    /**
     * Called when the surface is about to be destroyed.
     *
     * @param { string } surfaceId - The id of the surface created by XComponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    onSurfaceDestroyed(surfaceId: string): void;
    /**
     * Start image analyzer.
     *
     * @param { ImageAnalyzerConfig } config - Image analyzer config.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 110001 - Image analysis feature is unsupported.
     * @throws { BusinessError } 110002 - Image analysis is currently being executed.
     * @throws { BusinessError } 110003 - Image analysis is stopped.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    startImageAnalyzer(config: ImageAnalyzerConfig): Promise<void>;
    /**
     * Stop image analyzer.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    stopImageAnalyzer(): void;
}
/**
 * Defines XComponent.
 *
 * @interface XComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent.
 *
 * @interface XComponentInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
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
    /**
     * Constructor parameters
     *
     * @param { object } value - Indicates the options of the xcomponent.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
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
    /**
     * Constructor parameters
     *
     * @param { object } value - Indicates the options of the xcomponent.
     * @returns { XComponentAttribute } The attribute of the xcomponent.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
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
/**
 * Defines XComponentAttribute.
 *
 * @extends CommonMethod<XComponentAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
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
    /**
     * Called when judging whether the xcomponent surface is created.
     *
     * @param { function } [callback] - Called when judging whether the xcomponent surface is created.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
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
    /**
     * Called when judging whether the xcomponent is destroyed.
     *
     * @param { function } event - Called when judging whether the xcomponent is destroyed.
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    onDestroy(event: () => void): XComponentAttribute;
    /**
     * Enable image analyzer for XComponent.
     *
     * @param { boolean } enable
     * @returns { XComponentAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 12
     */
    enableAnalyzer(enable: boolean): XComponentAttribute;
}
/**
 * Defines XComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const XComponent: XComponentInterface;
/**
 * Defines XComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines XComponent Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 12
 */
declare const XComponentInstance: XComponentAttribute;
