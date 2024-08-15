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
/**
 * @file
 * @kit ArkGraphics2D
 */
/**
 * The date structure that provides the basis for graphics.
 *
 * @namespace common2D
 * @syscap SystemCapability.Graphics.Drawing
 * @since 11
 */
declare namespace common2D {
    /**
     * Provide a description in the form of color ARGB.
     * @typedef Color
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    interface Color {
        /**
         * Alpha component of color, from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        alpha: number;
        /**
         * Red component of color, from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        red: number;
        /**
         * Green component of color, from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        green: number;
        /**
         * Blue component of color, from 0 to 255.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        blue: number;
    }
    /**
     * Provides the definition of the rectangle.
     * @typedef Rect
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    interface Rect {
        /**
         * Left Position of Rectangle.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        left: number;
        /**
         * Top side position of the rectangle
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        top: number;
        /**
         * Right Position of Rectangle.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        right: number;
        /**
         * Position of the bottom side of the rectangle.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        bottom: number;
    }
    /**
     * Coordinates in the font layout.
     * @typedef Point
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    interface Point {
        /**
         * X-axis coordinate.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        x: number;
        /**
         * Y-axis coordinate.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        y: number;
    }
}
export default common2D;
