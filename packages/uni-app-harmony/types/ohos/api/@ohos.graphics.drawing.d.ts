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
 * @kit ArkGraphics 2D
 */
import type image from './@ohos.multimedia.image';
import type common2D from './@ohos.graphics.common2D';
/**
 * Provides functions such as 2D graphics rendering, text drawing, and image display.
 *
 * @namespace drawing
 * @syscap SystemCapability.Graphics.Drawing
 * @since 11
 */
declare namespace drawing {
    /**
     * Enumerate blending modes for colors.
     * Blend is a operation that use 4 components(red, green, blue, alpha) to generate
     * a new color from two colors(source, destination).
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    enum BlendMode {
        /**
         * Disable 4 regions(red, green, blue, alpha)
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        CLEAR = 0,
        /**
         * Use components of the source
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SRC = 1,
        /**
         * Use components of the destination
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DST = 2,
        /**
         * The source is placed above the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SRC_OVER = 3,
        /**
         * The Destination is placed above the source.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DST_OVER = 4,
        /**
         * Use source replaces the destination, and will not exceed the boundaries of the destination
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SRC_IN = 5,
        /**
         * Use destination, and will not exceed the boundaries of the source
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DST_IN = 6,
        /**
         * Source is use in outside of the boundaries of the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SRC_OUT = 7,
        /**
         * Destination is use in outside of the boundaries of the source.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DST_OUT = 8,
        /**
         * Source which overlaps the destination will replaces the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SRC_ATOP = 9,
        /**
         * Destination which overlaps the source will replaces the source.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DST_ATOP = 10,
        /**
         * Combine regions where source and destination do not overlap.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        XOR = 11,
        /**
         * The sum of the source and destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        PLUS = 12,
        /**
         * All components are multiplied.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        MODULATE = 13,
        /**
         * Multiply the complement values of the background and source color values,
         * and then complement the result.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SCREEN = 14,
        /**
         * Multiplies or screens the colors, depending on destination
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        OVERLAY = 15,
        /**
         * Choose a darker background and source color.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DARKEN = 16,
        /**
         * Choose a lighter background and source color.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        LIGHTEN = 17,
        /**
         * Brightens destination color to reflect the source color.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        COLOR_DODGE = 18,
        /**
         * Darkens destination color to reflect the source color.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        COLOR_BURN = 19,
        /**
         * Multiplies or screens the colors, depending on source
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        HARD_LIGHT = 20,
        /**
         * Lightens or Darkens the colors, depending on the source.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SOFT_LIGHT = 21,
        /**
         * Subtract the darker of the two colors from the brighter color.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        DIFFERENCE = 22,
        /**
         * Produces an effect similar to difference mode, but with lower contrast.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        EXCLUSION = 23,
        /**
         * Multiply the source color by the destination color and replace the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        MULTIPLY = 24,
        /**
         * Use the hue of the source and the saturation and brightness of the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        HUE = 25,
        /**
         * Use the saturation of the source and the hue and brightness of the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        SATURATION = 26,
        /**
         * Use the hue and saturation of the source and the brightness of the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        COLOR = 27,
        /**
         * Use the brightness of the source and the hue and saturation of the destination.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        LUMINOSITY = 28
    }
    /**
     * Describes a path object.
     *
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Path {
        /**
         * Sets the start point of a path
         * @param { number } x - Indicates the x coordinate of the start point.
         * @param { number } y - Indicates the y coordinate of the start point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        moveTo(x: number, y: number): void;
        /**
         * Draws a line segment from the last point of a path to the target point.
         * @param { number } x - Indicates the x coordinate of the target point.
         * @param { number } y - Indicates the y coordinate of the target point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        lineTo(x: number, y: number): void;
        /**
         * This is done by using angle arc mode. In this mode, a rectangle that encloses an ellipse is specified first,
         * and then a start angle and a sweep angle are specified.
         * The arc is a portion of the ellipse defined by the start angle and the sweep angle.
         * By default, a line segment from the last point of the path to the start point of the arc is also added.
         * @param { number } x1 - Indicates the x coordinate of the upper left corner of the rectangle.
         * @param { number } y1 - Indicates the y coordinate of the upper left corner of the rectangle.
         * @param { number } x2 - Indicates the x coordinate of the lower right corner of the rectangle.
         * @param { number } y2 - Indicates the y coordinate of the lower right corner of the rectangle.
         * @param { number } startDeg - Indicates the start angle, in degrees.
         * @param { number } sweepDeg - Indicates the angle to sweep, in degrees.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        arcTo(x1: number, y1: number, x2: number, y2: number, startDeg: number, sweepDeg: number): void;
        /**
         * Draws a quadratic Bezier curve from the last point of a path to the target point.
         * @param { number } ctrlX - Indicates the x coordinate of the control point.
         * @param { number } ctrlY - Indicates the y coordinate of the control point.
         * @param { number } endX - Indicates the x coordinate of the target point.
         * @param { number } endY - Indicates the y coordinate of the target point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        quadTo(ctrlX: number, ctrlY: number, endX: number, endY: number): void;
        /**
         * Draws a cubic Bezier curve from the last point of a path to the target point.
         * @param { number } ctrlX1 - Indicates the x coordinate of the first control point.
         * @param { number } ctrlY1 - Indicates the y coordinate of the first control point.
         * @param { number } ctrlX2 - Indicates the x coordinate of the second control point.
         * @param { number } ctrlY2 - Indicates the y coordinate of the second control point.
         * @param { number } endX - Indicates the x coordinate of the target point.
         * @param { number } endY - Indicates the y coordinate of the target point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        cubicTo(ctrlX1: number, ctrlY1: number, ctrlX2: number, ctrlY2: number, endX: number, endY: number): void;
        /**
         * Closes a path. A line segment from the start point to the last point of the path is added.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        close(): void;
        /**
         * Resets path data.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        reset(): void;
    }
    /**
     * Provides an interface to the drawing, and how to clip and transform the drawing.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Canvas {
        /**
         * Constructor for the Canvas.
         * @param { image.PixelMap } pixelmap - PixelMap.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        constructor(pixelmap: image.PixelMap);
        /**
         * If rectangle is stroked, use pen to stroke width describes the line thickness,
         * else use brush to fill the rectangle.
         * @param { common2D.Rect } rect - Rectangle to draw.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawRect(rect: common2D.Rect): void;
        /**
         * If radius is zero or less, nothing is drawn. If circle is stroked, use pen to
         * stroke width describes the line thickness, else use brush to fill the circle.
         * @param { number } x - X coordinate of the circle center.
         * @param { number } y - Y coordinate of the circle center.
         * @param { number } radius - Half the diameter of circle.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawCircle(x: number, y: number, radius: number): void;
        /**
         * Draw an pixelmap, with the upper left corner at (left, top).
         * @param { image.PixelMap } pixelmap - PixelMap.
         * @param { number } left - Left side of image.
         * @param { number } top - Top side of image.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawImage(pixelmap: image.PixelMap, left: number, top: number): void;
        /**
         * Fills clip with color color. Mode determines how ARGB is combined with destination.
         * @param { common2D.Color } color - Color in 32-bit argb format.
         * @param { BlendMode } blendMode - Used to combine source color and destination. The default value is SRC_OVER.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawColor(color: common2D.Color, blendMode?: BlendMode): void;
        /**
         * Draw a point.
         * @param { number } x - X coordinate position of the point.
         * @param { number } y - Y coordinate position of the point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawPoint(x: number, y: number): void;
        /**
         * Path contains an array of path contour, each of which may be open or closed.
         * @param { Path } path - Path to draw.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawPath(path: Path): void;
        /**
         * Draws line segment from startPt to endPt.
         * @param { number } x0 - X coordinate of the start point of the line segment.
         * @param { number } y0 - Y coordinate of the start point of the line segment.
         * @param { number } x1 - X coordinate of the end point of the line segment.
         * @param { number } y1 - Y coordinate of the end point of the line segment.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawLine(x0: number, y0: number, x1: number, y1: number): void;
        /**
         * Draws line segment from startPt to endPt.
         * @param { TextBlob } blob - X coordinate of the start point of the line segment.
         * @param { number } x - X coordinate of the text start point.
         * @param { number } y - Y coordinate of the text start point.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawTextBlob(blob: TextBlob, x: number, y: number): void;
        /**
         * Set pen to a canvas.
         * @param { Pen } pen - object.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        attachPen(pen: Pen): void;
        /**
         * Set brush to a canvas.
         * @param { Brush } brush - Object.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        attachBrush(brush: Brush): void;
        /**
         * Unset pen to a canvas.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        detachPen(): void;
        /**
         * Unset brush to a canvas.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        detachBrush(): void;
    }
    /**
     * Provide a description of the type and position of the text.
     * @typedef TextBlobRunBuffer
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    interface TextBlobRunBuffer {
        /**
         * Text model.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        glyph: number;
        /**
         * X-coordinate of the text start point.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        positionX: number;
        /**
         * Y-coordinate of the text start point.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        positionY: number;
    }
    /**
     * Encoding type of the description text.
     *
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    enum TextEncoding {
        /**
         * Use 1 byte to represent UTF-8 or ASCII
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        TEXT_ENCODING_UTF8 = 0,
        /**
         * Use 2 bytes to represent most of unicode
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        TEXT_ENCODING_UTF16 = 1,
        /**
         * Use 4 bytes to represent all unicode.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        TEXT_ENCODING_UTF32 = 2,
        /**
         * Use 2 bytes to represent the glyph index.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        TEXT_ENCODING_GLYPH_ID = 3
    }
    /**
     * Provide a description of the text
     *
     * class TextBlob
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class TextBlob {
        /**
         * Create a textblob from a string
         * @param { string } text - Drawn glyph content.
         * @param { Font } font - Specify text size, font, text scale, etc.
         * @param { TextEncoding } encoding - The default value is TEXT_ENCODING_UTF8.
         * @returns { TextBlob } TextBlob object.
         * @throws { BusinessError } 401 - Parameter error.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static makeFromString(text: string, font: Font, encoding?: TextEncoding): TextBlob;
        /**
         * Creating a textblob object based on RunBuffer information
         * @param { Array<TextBlobRunBuffer> } pos - The array of TextBlobRunBuffer.
         * @param { Font } font - Font used for this run.
         * @param { common2D.Rect } bounds - Optional run bounding box.
         * @returns { TextBlob } TextBlob object.
         * @throws { BusinessError } 401 - Parameter error.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static makeFromRunBuffer(pos: Array<TextBlobRunBuffer>, font: Font, bounds?: common2D.Rect): TextBlob;
        /**
         * Returns the bounding rectangle shape
         * @returns { common2D.Rect } Rect object.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        bounds(): common2D.Rect;
    }
    /**
     * The Typeface class specifies the typeface and intrinsic style of a font.
     *
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Typeface {
        /**
         * Get the family name for this typeface.
         * @returns { string } Family name.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        getFamilyName(): string;
    }
    /**
     * Font controls options applied when drawing and measuring text.
     *
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Font {
        /**
         * Requests, but does not require, that glyphs respect sub-pixel positioning.
         * @param { boolean } isSubpixel - Setting for sub-pixel positioning.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableSubpixel(isSubpixel: boolean): void;
        /**
         * Increases stroke width when creating glyph bitmaps to approximate a bold typeface.
         * @param { boolean } isEmbolden - Setting for bold approximation.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableEmbolden(isEmbolden: boolean): void;
        /**
         * Requests linearly scalable font and glyph metrics.
         * @param { boolean } isLinearMetrics - Setting for linearly scalable font and glyph metrics.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableLinearMetrics(isLinearMetrics: boolean): void;
        /**
         * Sets text size in points. Has no effect if textSize is not greater than or equal to zero.
         * @param { number } textSize - Typographic height of text.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setSize(textSize: number): void;
        /**
         * Obtains the text size.
         * @returns { number } Text size.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        getSize(): number;
        /**
         * Sets Typeface to font.
         * @param { Typeface } typeface - Font and style used to draw text.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setTypeface(typeface: Typeface): void;
        /**
         * Get Typeface to font.
         * @returns { Typeface } Typeface.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        getTypeface(): Typeface;
        /**
         * Get fontMetrics associated with typeface.
         * @returns { FontMetrics } The fontMetrics value returned to the caller.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        getMetrics(): FontMetrics;
        /**
         * Measure the width of text.
         * @param { string } text - Text Symbol Content.
         * @param { TextEncoding } encoding - Encoding format.
         * @returns { number } The width of text.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        measureText(text: string, encoding: TextEncoding): number;
    }
    /**
     * The metrics of an Font.
     * @typedef FontMetrics
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    interface FontMetrics {
        /**
         * Maximum range above the glyph bounding box.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        top: number;
        /**
         * Distance Retained Above Baseline.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        ascent: number;
        /**
         * The distance that remains below the baseline.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        descent: number;
        /**
         * Maximum range below the glyph bounding box.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        bottom: number;
        /**
         * Line Spacing.
         * @type { number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        leading: number;
    }
    /**
     * ColorFilters are optional objects in the drawing pipeline.
     *
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class ColorFilter {
        /**
         * Makes a color filter with the given color and blend mode.
         * @param { common2D.Color } color - Color.
         * @param { BlendMode } mode - BlendMode.
         * @returns { ColorFilter } Colorfilter object.
         * @throws { BusinessError } 401 - Parameter error.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static createBlendModeColorFilter(color: common2D.Color, mode: BlendMode): ColorFilter;
        /**
         * Create a color filter consisting of two filters.
         * @param { ColorFilter } outer - The filter is used next.
         * @param { ColorFilter } inner - The filter is used first.
         * @returns { ColorFilter } Colorfilter object.
         * @throws { BusinessError } 401 - Parameter error.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static createComposeColorFilter(outer: ColorFilter, inner: ColorFilter): ColorFilter;
        /**
         * Makes a color filter that converts between linear colors and sRGB colors.
         * @returns { ColorFilter } Colorfilter object.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static createLinearToSRGBGamma(): ColorFilter;
        /**
         * Makes a color filter that converts between sRGB colors and linear colors.
         * @returns { ColorFilter } Colorfilter object.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static createSRGBGammaToLinear(): ColorFilter;
        /**
         * Makes a color filter that multiplies the luma of its input into the alpha channel,
         * and sets the red, green, and blue channels to zero.
         * @returns { ColorFilter } Colorfilter.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static createLumaColorFilter(): ColorFilter;
    }
    /**
     * Provides settings for strokes during drawing.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Pen {
        /**
        * Set the color of the pen.
        * @param { common2D.Color } color - Set colors.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setColor(color: common2D.Color): void;
        /**
        * Sets the thickness of the pen used by the paint to outline the shape.
        *
        * @param { number } width - Zero thickness for hairline; greater than zero for pen thickness.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setStrokeWidth(width: number): void;
        /**
        * Requests, but does not require, that edge pixels draw opaque or with
        * partial transparency.
        *
        * @param { boolean } aa - Setting for antialiasing.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setAntiAlias(aa: boolean): void;
        /**
        * Replaces alpha, leaving RGB
        *
        * @param { number } alpha - Alpha component of color.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setAlpha(alpha: number): void;
        /**
        * Sets ColorFilter to pen
        *
        * @param { ColorFilter } filter - ColorFilter to apply to subsequent draw.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setColorFilter(filter: ColorFilter): void;
        /**
        * Sets a blender that implements the specified blendmode enum.
        *
        * @param { BlendMode } mode - Blendmode.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setBlendMode(mode: BlendMode): void;
        /**
        * Request color distribution error.
        *
        * @param { boolean } dither - Whether the color is distributed incorrectly.
        * @throws { BusinessError } 401 - Parameter error.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setDither(dither: boolean): void;
    }
    /**
     * Provides settings for brush fill when drawing.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Brush {
        /**
         * Set the color of the brush.
         * @param { common2D.Color } color - Set colors.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setColor(color: common2D.Color): void;
        /**
         * Requests, but does not require, that edge pixels draw opaque or with
         * partial transparency.
         * @param { boolean } aa - Setting for antialiasing.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setAntiAlias(aa: boolean): void;
        /**
         * Replaces alpha, leaving RGB
         * @param { number } alpha - Alpha component of color, value range: 0–255.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setAlpha(alpha: number): void;
        /**
         * Sets ColorFilter to brush
         * @param { ColorFilter } filter - ColorFilter to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setColorFilter(filter: ColorFilter): void;
        /**
         * Sets a blender that implements the specified blendmode enum.
         * @param { BlendMode } mode - Blendmode.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setBlendMode(mode: BlendMode): void;
    }
}
export default drawing;
