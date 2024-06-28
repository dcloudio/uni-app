/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * Provides an interface for drawing polylines.
 *
 * @interface PolylineInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Provides an interface for drawing polylines.
 *
 * @interface PolylineInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides an interface for drawing polylines.
 *
 * @interface PolylineInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides an interface for drawing polylines.
 *
 * @interface PolylineInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface PolylineInterface {
    /**
     * Uses new to create Polyline.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Uses new to create Polyline.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @form
     * @since 9
     */
    /**
     * Uses new to create Polyline.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 10
     */
    /**
     * Uses new to create Polyline.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @atomicservice
     * @since 11
     */
    new (value?: {
        width?: string | number;
        height?: string | number;
    }): PolylineAttribute;
    /**
     * Called when using the draw fold.
     *
     * @param { object } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when using the draw fold.
     *
     * @param { object } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when using the draw fold.
     *
     * @param { object } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when using the draw fold.
     *
     * @param { object } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    (value?: {
        width?: string | number;
        height?: string | number;
    }): PolylineAttribute;
}
/**
 * @extends CommonShapeMethod<PolylineAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * @extends CommonShapeMethod<PolylineAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * @extends CommonShapeMethod<PolylineAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * @extends CommonShapeMethod<PolylineAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class PolylineAttribute extends CommonShapeMethod<PolylineAttribute> {
    /**
     * Called when the polyline is set to pass through the coordinate point list.
     *
     * @param { Array<any> } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Called when the polyline is set to pass through the coordinate point list.
     *
     * @param { Array<any> } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Called when the polyline is set to pass through the coordinate point list.
     *
     * @param { Array<any> } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Called when the polyline is set to pass through the coordinate point list.
     *
     * @param { Array<any> } value
     * @returns { PolylineAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    points(value: Array<any>): PolylineAttribute;
}
/**
 * Defines Polyline Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Polyline Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Polyline Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Polyline Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Polyline: PolylineInterface;
/**
 * Defines Polyline Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Defines Polyline Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Polyline Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Polyline Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const PolylineInstance: PolylineAttribute;
