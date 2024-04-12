/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
import drawing from '../@ohos.graphics.drawing';
/**
 * Size info.
 *
 * @interface Size
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export interface Size {
    /**
     * Get the width of the Size.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    width: number;
    /**
     * Get the height of the Size.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    height: number;
}
/**
 * Defines DrawContext.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export class DrawContext {
    /**
     * Get size of the DrawContext.
     *
     * @returns { Size } The size of the DrawContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get size(): Size;
    /**
     * Get canvas of the DrawContext.
     *
     * @returns { drawing.Canvas } The canvas of the DrawContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    get canvas(): drawing.Canvas;
}
/**
  * Defined a vector with two values.
  *
  * @interface Vector2
  * @syscap SystemCapability.ArkUI.ArkUI.Full
  * @crossplatform
  * @since 11
  */
interface Vector2 {
    /**
     * Value for x-axis of the vector.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    x: number;
    /**
     * Value for y-axis of the vector.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    y: number;
}
/**
 * Defined a vector with three values.
 *
 * @interface Vector3
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
interface Vector3 {
    /**
     * Value for x-axis of the vector.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    x: number;
    /**
     * Value for y-axis of the vector.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    y: number;
    /**
     * Value for z-axis of the vector.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    z: number;
}
/**
 * It's a 4x4 matrix, represent by number[].
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Matrix4 = [
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number,
    number
];
/**
 * Offset info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Offset = Vector2;
/**
 * Position info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Position = Vector2;
/**
 * Pivot info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Pivot = Vector2;
/**
 * Scale info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Scale = Vector2;
/**
 * Translation info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Translation = Vector2;
/**
 * Rotation info.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export type Rotation = Vector3;
/**
 * Frame info, include the position info and size info.
 *
 * @interface Frame
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 11
 */
export declare interface Frame {
    /**
     * Position value for x-axis of the frame info.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    x: number;
    /**
     * Position value for y-axis of the frame info.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    y: number;
    /**
     * Size value for width of the frame info.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    width: number;
    /**
     * Size value for height of the frame info.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 11
     */
    height: number;
}
