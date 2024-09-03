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
 * @kit ArkGraphics2D
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        moveTo(x: number, y: number): void;
        /**
         * Draws a line segment from the last point of a path to the target point.
         * @param { number } x - Indicates the x coordinate of the target point.
         * @param { number } y - Indicates the y coordinate of the target point.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
        /**
         * Get path length.
         * @param { boolean } forceClosed - Whether to close the Path.
         * @returns { number } Return path length.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getLength(forceClosed: boolean): number;
    }
    /**
     * Enumerates storage filter mode.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum FilterMode {
        /**
         * Single sample point (nearest neighbor).
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        FILTER_MODE_NEAREST = 0,
        /**
         * Interpolate between 2x2 sample points (bilinear interpolation).
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        FILTER_MODE_LINEAR = 1
    }
    /**
     * Provides an interface to the drawing, and samplingOptions used when sampling from the image.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class SamplingOptions {
        /**
         * Constructor for the samplingOptions.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        constructor();
        /**
         * Constructor for the samplingOptions with filter mode.
         * @param { FilterMode } filterMode - Storage filter mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        constructor(filterMode: FilterMode);
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        constructor(pixelmap: image.PixelMap);
        /**
         * If rectangle is stroked, use pen to stroke width describes the line thickness,
         * else use brush to fill the rectangle.
         * @param { common2D.Rect } rect - Rectangle to draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawRect(rect: common2D.Rect): void;
        /**
         * If rectangle is stroked, use pen to stroke width describes the line thickness,
         * else use brush to fill the rectangle.
         * @param { number } left - Indicates the left position of the rectangle.
         * @param { number } top - Indicates the top position of the rectangle.
         * @param { number } right - Indicates the right position of the rectangle.
         * @param { number } bottom - Indicates the bottom position of the rectangle.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        drawRect(left: number, top: number, right: number, bottom: number): void;
        /**
         * If radius is zero or less, nothing is drawn. If circle is stroked, use pen to
         * stroke width describes the line thickness, else use brush to fill the circle.
         * @param { number } x - X coordinate of the circle center.
         * @param { number } y - Y coordinate of the circle center.
         * @param { number } radius - The radius of the circle must be greater than 0.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawCircle(x: number, y: number, radius: number): void;
        /**
         * Draw a pixelmap, with the upper left corner at (left, top).
         * @param { image.PixelMap } pixelmap - PixelMap.
         * @param { number } left - Left side of image.
         * @param { number } top - Top side of image.
         * @throws { BusinessError } 401 - Parameter error.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        /**
         * Draw a pixelmap, with the upper left corner at (left, top).
         * @param { image.PixelMap } pixelmap - PixelMap.
         * @param { number } left - Left side of image.
         * @param { number } top - Top side of image.
         * @param { SamplingOptions } samplingOptions - SamplingOptions used to describe the sampling mode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        drawImage(pixelmap: image.PixelMap, left: number, top: number, samplingOptions?: SamplingOptions): void;
        /**
         * Fills clip with color color. Mode determines how ARGB is combined with destination.
         * @param { common2D.Color } color - The range of color channels must be [0, 255].
         * @param { BlendMode } blendMode - Used to combine source color and destination. The default value is SRC_OVER.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawColor(color: common2D.Color, blendMode?: BlendMode): void;
        /**
         * Fills the clipped rectangle with the specified ARGB color.
         * @param { number } alpha - Alpha channel of color. The range of alpha must be [0, 255].
         * @param { number } red - Red channel of color. The range of red must be [0, 255].
         * @param { number } green - Green channel of color. The range of green must be [0, 255].
         * @param { number } blue - Blue channel of color. The range of blue must be [0, 255].
         * @param { BlendMode } blendMode - Used to combine source color and destination. The default value is SRC_OVER.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        drawColor(alpha: number, red: number, green: number, blue: number, blendMode?: BlendMode): void;
        /**
         * Draw a point.
         * @param { number } x - X coordinate position of the point.
         * @param { number } y - Y coordinate position of the point.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawPoint(x: number, y: number): void;
        /**
         * Draws a path.
         * @param { Path } path - Path to draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawLine(x0: number, y0: number, x1: number, y1: number): void;
        /**
         * Draws a textBlob
         * @param { TextBlob } blob - TextBlob to draw.
         * @param { number } x - X coordinate of the text start point.
         * @param { number } y - Y coordinate of the text start point.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        drawTextBlob(blob: TextBlob, x: number, y: number): void;
        /**
         * Draws the pixelmap base on the mesh which is evenly distributed across the pixelmap.
         * @param { image.PixelMap } pixelmap - The pixelmap to draw using the mesh.
         * @param { number } meshWidth - The number of columns in the mesh.
         * @param { number } meshHeight - The number of rows in the mesh.
         * @param { Array<number> } vertices - Array of vertices, specifying where the mesh should be drawn.
         * @param { number } vertOffset - Number of vert elements to skip before drawing.
         * @param { Array<number> } colors - Array of colors, specifying a color at each vertex.
         * @param { number } colorOffset - Number of color elements to skip before drawing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        drawPixelMapMesh(pixelmap: image.PixelMap, meshWidth: number, meshHeight: number, vertices: Array<number>, vertOffset: number, colors: Array<number>, colorOffset: number): void;
        /**
         * Draws a region.
         * @param { Region } region - Region object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        drawRegion(region: Region): void;
        /**
         * Set pen to a canvas.
         * @param { Pen } pen - object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        attachPen(pen: Pen): void;
        /**
         * Set brush to a canvas.
         * @param { Brush } brush - Object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
        /**
         * Saves the current canvas status (canvas matrix) to the top of the stack.
         * @returns { number } Return the number of saved states.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        save(): number;
        /**
         * Saves matrix and clip, and allocates a bitmap for subsequent drawing.
         * Calling restore discards changes to matrix and clip, and draws the bitmap.
         * @param { common2D.Rect | null} rect - Optional layer size. The default value is null.
         * @param { Brush | null} brush - Optional brush effect used to draw the layer. The default value is null.
         * @returns { number } Return the number of saved states before this call.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        saveLayer(rect?: common2D.Rect | null, brush?: Brush | null): number;
        /**
         * Restores the canvas status (canvas matrix) saved on the top of the stack.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        restore(): void;
        /**
         * Restores the specific number of the canvas status (canvas matrix) saved in the stack.
         * @param { number } count - Depth of state stack to restore.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        restoreToCount(count: number): void;
        /**
         * Gets the number of the canvas status (canvas matrix) saved in the stack.
         * @returns { number } Return represent depth of save state stack.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getSaveCount(): number;
        /**
         * Scales by sx on the x-axis and sy on the y-axis.
         * @param { number } sx - Indicates the amount to scale on x-axis.
         * @param { number } sy - Indicates the amount to scale on y-axis.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        scale(sx: number, sy: number): void;
        /**
         * Skews by sx on the x-axis and sy on the y-axis.
         * @param { number } sx - Indicates the value skew transformation on x-axis.
         * @param { number } sy - Indicates the value skew transformation on y-axis.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        skew(sx: number, sy: number): void;
        /**
         * Rotates by degrees, positive degrees rotates clockwise.
         * @param { number } degrees - Indicates the amount to rotate, in degrees.
         * @param { number } sx - Indicates the x-axis value of the point to rotate about.
         * @param { number } sy - Indicates the y-axis value of the point to rotate about.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        rotate(degrees: number, sx: number, sy: number): void;
        /**
         * Translates by dx along the x-axis and dy along the y-axis.
         * @param { number } dx - Indicates the distance to translate on x-axis.
         * @param { number } dy - Indicates the distance to translate on y-axis.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        translate(dx: number, dy: number): void;
        /**
         * Replaces the clipping area with the intersection or difference of the current clipping area and path,
         * and use a clipping edge that is aliased or anti-aliased.
         * @param { Path } path - To combine with clip.
         * @param { ClipOp } clipOp - Indicates the operation to apply to clip. The default value is intersect.
         * @param { boolean } doAntiAlias - True if clip is to be anti-aliased. The default value is false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        clipPath(path: Path, clipOp?: ClipOp, doAntiAlias?: boolean): void;
        /**
         * Replaces the clipping area with the intersection or difference between the
         * current clipping area and Rect, and use a clipping edge that is aliased or anti-aliased.
         * @param { common2D.Rect } rect - To combine with clipping area.
         * @param { ClipOp } clipOp - Indicates the operation to apply to clip. The default value is intersect.
         * @param { boolean } doAntiAlias - True if clip is to be anti-aliased. The default value is false.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        clipRect(rect: common2D.Rect, clipOp?: ClipOp, doAntiAlias?: boolean): void;
    }
    /**
     * Enumerates clip operations.
     *
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum ClipOp {
        /**
         * Clips with difference.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DIFFERENCE = 0,
        /**
         * Clips with intersection.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INTERSECT = 1
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        static makeFromString(text: string, font: Font, encoding?: TextEncoding): TextBlob;
        /**
         * Creating a textblob object based on RunBuffer information
         * @param { Array<TextBlobRunBuffer> } pos - The array of TextBlobRunBuffer.
         * @param { Font } font - Font used for this run.
         * @param { common2D.Rect } bounds - Optional run bounding box. The default value is null;
         * @returns { TextBlob } TextBlob object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
        /**
         * Generate typeface from file.
         * @param { string } filePath - file path for typeface.
         * @returns { Typeface } Typeface.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static makeFromFile(filePath: string): Typeface;
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableSubpixel(isSubpixel: boolean): void;
        /**
         * Increases stroke width when creating glyph bitmaps to approximate a bold typeface.
         * @param { boolean } isEmbolden - Setting for bold approximation.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableEmbolden(isEmbolden: boolean): void;
        /**
         * Requests linearly scalable font and glyph metrics.
         * @param { boolean } isLinearMetrics - Setting for linearly scalable font and glyph metrics.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        enableLinearMetrics(isLinearMetrics: boolean): void;
        /**
         * Sets text size in points. Has no effect if textSize is not greater than or equal to zero.
         * @param { number } textSize - Typographic height of text. The height of the text must be greater than 0.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        measureText(text: string, encoding: TextEncoding): number;
        /**
         * Sets text scale on x-axis to font.
         * @param { number } scaleX - Text scaleX.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setScaleX(scaleX: number): void;
        /**
         * Sets text skew on x-axis to font.
         * @param { number } skewX - Text skewX.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setSkewX(skewX: number): void;
    }
    /**
     * Indicate when certain metrics are valid; the underline or strikeout metrics may be valid and zero.
     * Fonts with embedded bitmaps may not have valid underline or strikeout metrics.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum FontMetricsFlags {
        /**
         * Set if underlineThickness of FontMetrics is valid.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        UNDERLINE_THICKNESS_VALID = 1 << 0,
        /**
         * Set if underlinePosition of FontMetrics is valid.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        UNDERLINE_POSITION_VALID = 1 << 1,
        /**
         * Set if strikethroughThickness of FontMetrics is valid.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        STRIKETHROUGH_THICKNESS_VALID = 1 << 2,
        /**
         * Set if strikethroughPosition of FontMetrics is valid.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        STRIKETHROUGH_POSITION_VALID = 1 << 3,
        /**
         * set if top, bottom, xMin, xMax of FontMetrics invalid.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BOUNDS_INVALID = 1 << 4
    }
    /**
     * The metrics of an Font.
     * @typedef FontMetrics
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    interface FontMetrics {
        /**
         * Indicating which metrics are valid.
         * @type { ?FontMetricsFlags }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        flags?: FontMetricsFlags;
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
        /**
         * Average character width, zero if unknown.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        avgCharWidth?: number;
        /**
         * Maximum character width, zero if unknown.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        maxCharWidth?: number;
        /**
         * Greatest extent to left of origin of any glyph bounding box, typically negative; deprecated with variable fonts.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        xMin?: number;
        /**
         * Greatest extent to right of origin of any glyph bounding box, typically positive; deprecated with variable fonts.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        xMax?: number;
        /**
         * Height of lower-case 'x', zero if unknown, typically negative.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        xHeight?: number;
        /**
         * Height of an upper-case letter, zero if unknown, typically negative.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        capHeight?: number;
        /**
         * Underline thickness.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        underlineThickness?: number;
        /**
         * Distance from baseline to top of stroke, typically positive.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        underlinePosition?: number;
        /**
         * Strikethrough thickness.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        strikethroughThickness?: number;
        /**
         * Distance from baseline to bottom of stroke, typically negative.
         * @type { ?number }
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        strikethroughPosition?: number;
    }
    /**
     * MaskFilter is the class for object that perform transformations on an alpha-channel mask before drawing it.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class MaskFilter {
        /**
         * Makes a MaskFilter with a blur effect.
         * @param { BlurType } blurType - Indicates the blur type.
         * @param { number } sigma - Indicates the standard deviation of the Gaussian blur to apply. Must be > 0.
         * @returns { MaskFilter } MaskFilter object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static createBlurMaskFilter(blurType: BlurType, sigma: number): MaskFilter;
    }
    /**
     * Defines a PathEffect, which is used to affects stroked paths.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class PathEffect {
        /**
         * Makes a dash PathEffect.
         * @param { Array<number> } intervals - Array of ON and OFF distances. Must contain an even number of entries (>=2),
         * with the even indices specifying the "on" intervals, and the odd indices specifying the "off" intervals.
         * @param { number } phase - Offset into the intervals array.
         * @returns { PathEffect } PathEffect object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static createDashPathEffect(intervals: Array<number>, phase: number): PathEffect;
        /**
         * Makes a corner PathEffect.
         * @param { number } radius - Indicates the radius of the tangent circle at the corners of the path.
         * The radius must be greater than 0.
         * @returns { PathEffect } PathEffect object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static createCornerPathEffect(radius: number): PathEffect;
    }
    /**
     * Defines a ShadowLayer, which is used to specify the color, blur radius, and offset of the shadow.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class ShadowLayer {
        /**
         * Makes a new ShadowLayer.
         *
         * @param { number } blurRadius - The blur radius of the shadow. The blur radius must be greater than 0.
         * @param { number } x - The offset point on x-axis.
         * @param { number } y - The offset point on y-axis.
         * @param { common2D.Color } color - The shadow color. The range of color channels must be [0, 255].
         * @returns { ShadowLayer } ShadowLayer object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @static
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        static create(blurRadius: number, x: number, y: number, color: common2D.Color): ShadowLayer;
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
         * @param { common2D.Color } color - The range of color channels must be [0, 255].
         * @param { BlendMode } mode - BlendMode.
         * @returns { ColorFilter } Colorfilter object.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
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
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
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
     * Enumerate join styles. The join style defines the shape of the joins of a
     * polyline segment drawn by the pen.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum JoinStyle {
        /**
         * Miter corner. If the angle of a polyline is small, its miter length may be inappropriate.
         * In this case, you need to use the miter limit to limit the miter length.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        MITER_JOIN = 0,
        /**
         * Round corner.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ROUND_JOIN = 1,
        /**
         * Bevel corner.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        BEVEL_JOIN = 2
    }
    /**
     * Enumerates cap styles of a pen. The cap style defines
     * the style of both ends of a segment drawn by the pen.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum CapStyle {
        /**
         * No cap style. Both ends of the segment are cut off square.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        FLAT_CAP = 0,
        /**
         * Square cap style. Both ends have a square, the height of which
         * is half of the width of the segment, with the same width.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        SQUARE_CAP = 1,
        /**
         * Round cap style. Both ends have a semicircle centered, the diameter of which
         * is the same as the width of the segment.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        ROUND_CAP = 2
    }
    /**
     * Enumerates blur type.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum BlurType {
        /**
         * Fuzzy inside and outside.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        NORMAL = 0,
        /**
         * Solid inside, fuzzy outside.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        SOLID = 1,
        /**
         * Nothing inside, fuzzy outside.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        OUTER = 2,
        /**
         * Fuzzy inside, nothing outside.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INNER = 3
    }
    /**
     * Provides settings for strokes during drawing.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Pen {
        /**
        * Set the color of the pen.
        * @param { common2D.Color } color - The range of color channels must be [0, 255].
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types; 3. Parameter verification failed.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setColor(color: common2D.Color): void;
        /**
        * Set the AGRB color of the pen.
         * @param { number } alpha - Alpha channel of color. The range of alpha must be [0, 255].
         * @param { number } red - Red channel of color. The range of red must be [0, 255].
         * @param { number } green - Green channel of color. The range of green must be [0, 255].
         * @param { number } blue - Blue channel of color. The range of blue must be [0, 255].
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 12
        */
        setColor(alpha: number, red: number, green: number, blue: number): void;
        /**
        * Sets the thickness of the pen used by the paint to outline the shape.
        *
        * @param { number } width - Zero thickness for hairline; greater than zero for pen thickness.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setStrokeWidth(width: number): void;
        /**
        * Requests, but does not require, that edge pixels draw opaque or with partial transparency.
        *
        * @param { boolean } aa - Setting for antialiasing.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setAntiAlias(aa: boolean): void;
        /**
        * Replaces alpha, leaving RGB
        *
        * @param { number } alpha - Alpha channel of color. The range of alpha must be [0, 255].
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types; 3. Parameter verification failed.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setAlpha(alpha: number): void;
        /**
        * Sets ColorFilter to pen
        *
        * @param { ColorFilter } filter - ColorFilter to apply to subsequent draw.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setColorFilter(filter: ColorFilter): void;
        /**
         * Sets MaskFilter to pen.
         *
         * @param { MaskFilter } filter - MaskFilter to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setMaskFilter(filter: MaskFilter): void;
        /**
         * Sets PathEffect to pen.
         *
         * @param { PathEffect } effect - PathEffect to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setPathEffect(effect: PathEffect): void;
        /**
         * Sets ShadowLayer to pen.
         *
         * @param { ShadowLayer } shadowLayer - ShadowLayer to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setShadowLayer(shadowLayer: ShadowLayer): void;
        /**
        * Sets a blender that implements the specified blendmode enum.
        *
        * @param { BlendMode } mode - Blendmode.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types; 3. Parameter verification failed.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setBlendMode(mode: BlendMode): void;
        /**
        * Request color distribution error.
        *
        * @param { boolean } dither - Whether the color is distributed incorrectly.
        * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
        * <br>2. Incorrect parameter types.
        * @syscap SystemCapability.Graphics.Drawing
        * @since 11
        */
        setDither(dither: boolean): void;
        /**
         * Sets the JoinStyle for a pen.
         *
         * @param { JoinStyle } style - The JoinStyle.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setJoinStyle(style: JoinStyle): void;
        /**
         * Obtains the JoinStyle of a pen.
         *
         * @returns { JoinStyle } The JoinStyle.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getJoinStyle(): JoinStyle;
        /**
         * Sets the CapStyle for a pen.
         *
         * @param { CapStyle } style - The CapStyle.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setCapStyle(style: CapStyle): void;
        /**
         * Obtains the CapStyle of a pen.
         *
         * @returns { CapStyle } The CapStyle.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        getCapStyle(): CapStyle;
    }
    /**
     * Provides settings for brush fill when drawing.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 11
     */
    class Brush {
        /**
         * Set the color of the brush.
         * @param { common2D.Color } color - The range of color channels must be [0, 255].
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setColor(color: common2D.Color): void;
        /**
         * Set the ARGB color of the brush.
         * @param { number } alpha - Alpha channel of color. The range of alpha must be [0, 255].
         * @param { number } red - Red channel of color. The range of red must be [0, 255].
         * @param { number } green - Green channel of color. The range of green must be [0, 255].
         * @param { number } blue - Blue channel of color. The range of blue must be [0, 255].
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setColor(alpha: number, red: number, green: number, blue: number): void;
        /**
         * Requests, but does not require, that edge pixels draw opaque or with partial transparency.
         * @param { boolean } aa - Setting for antialiasing.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setAntiAlias(aa: boolean): void;
        /**
         * Replaces alpha, leaving RGB
         * @param { number } alpha - Alpha channel of color. The range of alpha must be [0, 255].
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setAlpha(alpha: number): void;
        /**
         * Sets ColorFilter to brush
         * @param { ColorFilter } filter - ColorFilter to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setColorFilter(filter: ColorFilter): void;
        /**
         * Sets MaskFilter to brush.
         * @param { MaskFilter } filter - MaskFilter to apply to subsequent draw.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setMaskFilter(filter: MaskFilter): void;
        /**
         * Sets ShadowLayer to brush.
         *
         * @param { ShadowLayer } shadowLayer - ShadowLayer painting.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setShadowLayer(shadowLayer: ShadowLayer): void;
        /**
         * Sets a blender that implements the specified blendmode enum.
         * @param { BlendMode } mode - Blendmode.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types; 3. Parameter verification failed.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 11
         */
        setBlendMode(mode: BlendMode): void;
    }
    /**
     * Describes a region object.
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    class Region {
        /**
         * Determines whether the test point is in the region.
         * @param { number } x - Indicates the x coordinate of the point. The parameter must be an integer.
         * @param { number } y - Indicates the y coordinate of the point. The parameter must be an integer.
         * @returns { boolean } Returns true if (x, y) is inside region; returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        isPointContained(x: number, y: number): boolean;
        /**
         * Determines whether other region is in the region.
         * @param { Region } other - Other region object.
         * @returns { boolean } Returns true if other region is completely inside the region object;
         * <br>returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        isRegionContained(other: Region): boolean;
        /**
         * Replaces region with the result of region op region.
         * @param { Region } region - Region object.
         * @param { RegionOp } regionOp - Operation type.
         * @returns { boolean } Returns true if replaced region is not empty; returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        op(region: Region, regionOp: RegionOp): boolean;
        /**
         * Determines whether rect and region does not intersect.
         * @param { number } left - Left position of rectangle. The parameter must be an integer.
         * @param { number } top - Top position of rectangle. The parameter must be an integer.
         * @param { number } right - Right position of rectangle. The parameter must be an integer.
         * @param { number } bottom - Bottom position of rectangle. The parameter must be an integer.
         * @returns { boolean } Returns true if rect and region is not intersect; returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        quickReject(left: number, top: number, right: number, bottom: number): boolean;
        /**
         * Sets the region to match outline of path within clip.
         * @param { Path } path - Providing outline.
         * @param { Region } clip - Region object.
         * @returns { boolean } Returns true if constructed region is not empty; returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setPath(path: Path, clip: Region): boolean;
        /**
         * Sets a rect to region.
         * @param { number } left - Left position of rectangle. The parameter must be an integer.
         * @param { number } top - Top position of rectangle. The parameter must be an integer.
         * @param { number } right - Right position of rectangle. The parameter must be an integer.
         * @param { number } bottom - Bottom position of rectangle. The parameter must be an integer.
         * @returns { boolean } Returns true if constructed region is not empty; returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        setRect(left: number, top: number, right: number, bottom: number): boolean;
    }
    /**
     * Enumerates of operations when two regions are combined.
     * @enum { number }
     * @syscap SystemCapability.Graphics.Drawing
     * @since 12
     */
    enum RegionOp {
        /**
         * Difference operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        DIFFERENCE = 0,
        /**
         * Intersect operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        INTERSECT = 1,
        /**
         * Union operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        UNION = 2,
        /**
         * Xor operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        XOR = 3,
        /**
         * Reverse difference operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        REVERSE_DIFFERENCE = 4,
        /**
         * Replace operation.
         * @syscap SystemCapability.Graphics.Drawing
         * @since 12
         */
        REPLACE = 5
    }
}
export default drawing;
