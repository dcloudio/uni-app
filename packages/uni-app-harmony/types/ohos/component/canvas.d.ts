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
 * Import the drawing canvas type object for Canvas.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare type DrawingCanvas = import('../api/@ohos.graphics.drawing').default.Canvas;
/**
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Filling style algorithm, which determines whether a point is within or outside the path. The following
 *    two configurations are supported:
 * "evenodd": odd and even round rule
 * "nonzero": (Default) Non-zero Wrap Rules
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasFillRule = "evenodd" | "nonzero";
/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Specifies the attribute of drawing the end of each line segment. The following configurations are supported:
 * "butt": (Default) Segment Ends in Square
 * "round": Segment ends in a circle
 * "square": The end of the segment ends in a square, but a rectangular area is added that is the same width
 *    as the segment and is half the thickness of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasLineCap = "butt" | "round" | "square";
/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Sets the attribute of how two connected parts (line segments, arcs, and curves) whose length is not 0
 *    are connected together. The following three configurations are supported:
 * "bevel": Fill the ends of the connected sections with an additional triangle-base area,
 *    each with its own independent rectangular corner.
 * "miter": (Default) An additional diamond region is formed by extending the outer edges of the connected portions
 *    so that they intersect at a point.
 * "round": Draw the shape of the corner by filling in an additional sector with the center at the end of the
 *    connected section. The radius of the fillet is the width of the segment.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasLineJoin = "bevel" | "miter" | "round";
/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Indicates the attribute of the current text direction. The options are as follows:
 * "inherit": (Default) Inherit current Canvas component settings
 * "ltr": The text direction is left to right.
 * "rtl": The text direction is from right to left.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasDirection = "inherit" | "ltr" | "rtl";
/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Describes the alignment mode for drawing text. The options are as follows:
 * "center": The text is centered.
 * "end": Where text aligns lines end (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 * "left": The text is left-aligned.
 * "right": The text is right-aligned.
 * "start": (Default) Where the text snap line begins (Left alignment refers to the local from left to right,
 *    and right alignment refers to the local from right to left)
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasTextAlign = "center" | "end" | "left" | "right" | "start";
/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Text baseline, which supports the following configurations:
 * "alphabetic": (Default) The text baseline is the standard letter baseline.
 * "bottom": The text baseline is at the bottom of the text block. The difference between the ideographic baseline
 *    and the ideographic baseline is that the ideographic baseline does not need to consider downlink letters.
 * "hanging": The text baseline is a hanging baseline.
 * "ideographic": The text baseline is the ideographic baseline; If the character itself exceeds the alphabetic
 *    baseline, the ideographic baseline is at the bottom of the character itself.
 * "middle": The text baseline is in the middle of the text block.
 * "top": The text baseline is at the top of the text block.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type CanvasTextBaseline = "alphabetic" | "bottom" | "hanging" | "ideographic" | "middle" | "top";
/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Sets the image smoothness attribute. The options are as follows:
 * "high": height
 * "low": (default)low
 * "medium": medium
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare type ImageSmoothingQuality = "high" | "low" | "medium";
/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Opaque objects that describe gradients, created by createLinearGradient() or createRadialGradient()
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class CanvasGradient {
    /**
     * Add a breakpoint defined by offset and color to the gradient
     *
     * @param { number } offset - Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
     * @param { string } color - CSS color value <color>. If the color value cannot be resolved to a valid CSS color value <color>
     *    a SYNTAX_ERR error is thrown.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Add a breakpoint defined by offset and color to the gradient
     *
     * @param { number } offset - Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
     * @param { string } color - CSS color value <color>. If the color value cannot be resolved to a valid CSS color value <color>
     *    a SYNTAX_ERR error is thrown.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Add a breakpoint defined by offset and color to the gradient
     *
     * @param { number } offset - Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
     * @param { string } color - Set the gradient color.
     *    a SYNTAX_ERR error is thrown.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Add a breakpoint defined by offset and color to the gradient
     *
     * @param { number } offset - Value between 0 and 1, out of range throws INDEX_SIZE_ERR error
     * @param { string } color - Set the gradient color.
     *    a SYNTAX_ERR error is thrown.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    addColorStop(offset: number, color: string): void;
}
/**
 * Path object, which provides basic methods for drawing paths.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Path object, which provides basic methods for drawing paths.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Path object, which provides basic methods for drawing paths.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Path object, which provides basic methods for drawing paths.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class CanvasPath {
    /**
     * Draw an arc path
     *
     * @param { number } x - The x-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } y - The y-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } radius - Radius of the arc.
     * @param { number } startAngle - Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
     * @param { number } endAngle - The end point of the arc, in radians.
     * @param { boolean } counterclockwise - If the value is true, the arc is drawn counterclockwise. Otherwise,
     *    the arc is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw an arc path
     *
     * @param { number } x - The x-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } y - The y-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } radius - Radius of the arc.
     * @param { number } startAngle - Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
     * @param { number } endAngle - The end point of the arc, in radians.
     * @param { boolean } counterclockwise - If the value is true, the arc is drawn counterclockwise. Otherwise,
     *    the arc is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw an arc path
     *
     * @param { number } x - The x-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } y - The y-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } radius - Radius of the arc.
     * @param { number } startAngle - Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
     * @param { number } endAngle - The end point of the arc, in radians.
     * @param { boolean } counterclockwise - If the value is true, the arc is drawn counterclockwise. Otherwise,
     *    the arc is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw an arc path
     *
     * @param { number } x - The x-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } y - The y-axis coordinate of the center (center of the circle) of the arc.
     * @param { number } radius - Radius of the arc.
     * @param { number } startAngle - Start point of an arc, which starts to be calculated in the x-axis direction. The unit is radian.
     * @param { number } endAngle - The end point of the arc, in radians.
     * @param { boolean } counterclockwise - If the value is true, the arc is drawn counterclockwise. Otherwise,
     *    the arc is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    arc(x: number, y: number, radius: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
    /**
     * Draw arc paths based on control points and radius
     *
     * @param { number } x1 - The x-axis coordinate of the first control point.
     * @param { number } y1 - The y-axis coordinate of the first control point.
     * @param { number } x2 - The x-axis coordinate of the second control point.
     * @param { number } y2 - The y-axis coordinate of the second control point.
     * @param { number } radius - Radius of the arc.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw arc paths based on control points and radius
     *
     * @param { number } x1 - The x-axis coordinate of the first control point.
     * @param { number } y1 - The y-axis coordinate of the first control point.
     * @param { number } x2 - The x-axis coordinate of the second control point.
     * @param { number } y2 - The y-axis coordinate of the second control point.
     * @param { number } radius - Radius of the arc.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw arc paths based on control points and radius
     *
     * @param { number } x1 - The x-axis coordinate of the first control point.
     * @param { number } y1 - The y-axis coordinate of the first control point.
     * @param { number } x2 - The x-axis coordinate of the second control point.
     * @param { number } y2 - The y-axis coordinate of the second control point.
     * @param { number } radius - Radius of the arc.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw arc paths based on control points and radius
     *
     * @param { number } x1 - The x-axis coordinate of the first control point.
     * @param { number } y1 - The y-axis coordinate of the first control point.
     * @param { number } x2 - The x-axis coordinate of the second control point.
     * @param { number } y2 - The y-axis coordinate of the second control point.
     * @param { number } radius - Radius of the arc.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    arcTo(x1: number, y1: number, x2: number, y2: number, radius: number): void;
    /**
     * Drawing Cubic Bessel Curve Paths
     *
     * @param { number } cp1x - The x-axis coordinate of the first control point.
     * @param { number } cp1y - The y-axis coordinate of the first control point.
     * @param { number } cp2x - The x-axis coordinate of the second control point.
     * @param { number } cp2y - The y-axis coordinate of the second control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Drawing Cubic Bessel Curve Paths
     *
     * @param { number } cp1x - The x-axis coordinate of the first control point.
     * @param { number } cp1y - The y-axis coordinate of the first control point.
     * @param { number } cp2x - The x-axis coordinate of the second control point.
     * @param { number } cp2y - The y-axis coordinate of the second control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Drawing Cubic Bessel Curve Paths
     *
     * @param { number } cp1x - The x-axis coordinate of the first control point.
     * @param { number } cp1y - The y-axis coordinate of the first control point.
     * @param { number } cp2x - The x-axis coordinate of the second control point.
     * @param { number } cp2y - The y-axis coordinate of the second control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Drawing Cubic Bessel Curve Paths
     *
     * @param { number } cp1x - The x-axis coordinate of the first control point.
     * @param { number } cp1y - The y-axis coordinate of the first control point.
     * @param { number } cp2x - The x-axis coordinate of the second control point.
     * @param { number } cp2y - The y-axis coordinate of the second control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    bezierCurveTo(cp1x: number, cp1y: number, cp2x: number, cp2y: number, x: number, y: number): void;
    /**
     * Returns the pen point to the start point of the current sub-path
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Returns the pen point to the start point of the current sub-path
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Returns the pen point to the start point of the current sub-path
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Returns the pen point to the start point of the current sub-path
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    closePath(): void;
    /**
     * Draw an Elliptic Path
     *
     * @param { number } x - x-axis coordinate of the center of the ellipse.
     * @param { number } y - y-axis coordinate of the center of the ellipse.
     * @param { number } radiusX - Radius of the major axis of the ellipse.
     * @param { number } radiusY - Radius of the minor axis of the ellipse.
     * @param { number } rotation - The rotation angle of the ellipse, in radians (not angular degrees).
     * @param { number } startAngle - The angle of the starting point to be drawn, measured from the x-axis in radians
     *    (not angular degrees).
     * @param { number } endAngle - The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
     * @param { boolean } counterclockwise - If the value is true, the ellipse is drawn counterclockwise. Otherwise,
     *    the ellipse is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw an Elliptic Path
     *
     * @param { number } x - x-axis coordinate of the center of the ellipse.
     * @param { number } y - y-axis coordinate of the center of the ellipse.
     * @param { number } radiusX - Radius of the major axis of the ellipse.
     * @param { number } radiusY - Radius of the minor axis of the ellipse.
     * @param { number } rotation - The rotation angle of the ellipse, in radians (not angular degrees).
     * @param { number } startAngle - The angle of the starting point to be drawn, measured from the x-axis in radians
     *    (not angular degrees).
     * @param { number } endAngle - The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
     * @param { boolean } counterclockwise - If the value is true, the ellipse is drawn counterclockwise. Otherwise,
     *    the ellipse is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw an Elliptic Path
     *
     * @param { number } x - x-axis coordinate of the center of the ellipse.
     * @param { number } y - y-axis coordinate of the center of the ellipse.
     * @param { number } radiusX - Radius of the major axis of the ellipse.
     * @param { number } radiusY - Radius of the minor axis of the ellipse.
     * @param { number } rotation - The rotation angle of the ellipse, in radians (not angular degrees).
     * @param { number } startAngle - The angle of the starting point to be drawn, measured from the x-axis in radians
     *    (not angular degrees).
     * @param { number } endAngle - The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
     * @param { boolean } counterclockwise - If the value is true, the ellipse is drawn counterclockwise. Otherwise,
     *    the ellipse is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw an Elliptic Path
     *
     * @param { number } x - x-axis coordinate of the center of the ellipse.
     * @param { number } y - y-axis coordinate of the center of the ellipse.
     * @param { number } radiusX - Radius of the major axis of the ellipse.
     * @param { number } radiusY - Radius of the minor axis of the ellipse.
     * @param { number } rotation - The rotation angle of the ellipse, in radians (not angular degrees).
     * @param { number } startAngle - The angle of the starting point to be drawn, measured from the x-axis in radians
     *    (not angular degrees).
     * @param { number } endAngle - The angle, in radians, at which the ellipse is to be drawn (not angular degrees).
     * @param { boolean } counterclockwise - If the value is true, the ellipse is drawn counterclockwise. Otherwise,
     *    the ellipse is drawn clockwise. The default value is false.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    ellipse(x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, counterclockwise?: boolean): void;
    /**
     * Connect sub-path using straight lines
     *
     * @param { number } x - The x-axis coordinate of the end point of the line.
     * @param { number } y - The y-axis coordinate of the end point of the line.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Connect sub-path using straight lines
     *
     * @param { number } x - The x-axis coordinate of the end point of the line.
     * @param { number } y - The y-axis coordinate of the end point of the line.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Connect sub-path using straight lines
     *
     * @param { number } x - The x-axis coordinate of the end point of the line.
     * @param { number } y - The y-axis coordinate of the end point of the line.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Connect sub-path using straight lines
     *
     * @param { number } x - The x-axis coordinate of the end point of the line.
     * @param { number } y - The y-axis coordinate of the end point of the line.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineTo(x: number, y: number): void;
    /**
     * Moves the start point of a new sub-path to the (x, y) coordinate.
     *
     * @param { number } x - The x-axis coordinate of the point.
     * @param { number } y - The y-axis coordinate of the point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Moves the start point of a new sub-path to the (x, y) coordinate.
     *
     * @param { number } x - The x-axis coordinate of the point.
     * @param { number } y - The y-axis coordinate of the point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Moves the start point of a new sub-path to the (x, y) coordinate.
     *
     * @param { number } x - The x-axis coordinate of the point.
     * @param { number } y - The y-axis coordinate of the point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Moves the start point of a new sub-path to the (x, y) coordinate.
     *
     * @param { number } x - The x-axis coordinate of the point.
     * @param { number } y - The y-axis coordinate of the point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    moveTo(x: number, y: number): void;
    /**
     * Draw quadratic Bezier curve paths
     *
     * @param { number } cpx - The x-axis coordinate of the control point.
     * @param { number } cpy - The y-axis coordinate of the control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw quadratic Bezier curve paths
     *
     * @param { number } cpx - The x-axis coordinate of the control point.
     * @param { number } cpy - The y-axis coordinate of the control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw quadratic Bezier curve paths
     *
     * @param { number } cpx - The x-axis coordinate of the control point.
     * @param { number } cpy - The y-axis coordinate of the control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw quadratic Bezier curve paths
     *
     * @param { number } cpx - The x-axis coordinate of the control point.
     * @param { number } cpy - The y-axis coordinate of the control point.
     * @param { number } x - x-axis coordinate of the end point.
     * @param { number } y - y-axis coordinate of the end point.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    quadraticCurveTo(cpx: number, cpy: number, x: number, y: number): void;
    /**
     * Draw Rectangular Paths
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw Rectangular Paths
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw Rectangular Paths
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw Rectangular Paths
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    rect(x: number, y: number, w: number, h: number): void;
}
/**
 * 2D path object for path drawing
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * 2D path object for path drawing
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * 2D path object for path drawing
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * 2D path object for path drawing
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class Path2D extends CanvasPath {
    /**
     * Adds a path according to the specified path variable.
     *
     * @param { Path2D } path - Indicates the path object to be added.
     * @param { Matrix2D } transform - Transformation matrix of the new trail
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds a path according to the specified path variable.
     *
     * @param { Path2D } path - Indicates the path object to be added.
     * @param { Matrix2D } transform - Transformation matrix of the new trail
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds a path according to the specified path variable.
     *
     * @param { Path2D } path - Indicates the path object to be added.
     * @param { Matrix2D } transform - Transformation matrix of the new trail
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds a path according to the specified path variable.
     *
     * @param { Path2D } path - Indicates the path object to be added.
     * @param { Matrix2D } transform - Transformation matrix of the new trail
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    addPath(path: Path2D, transform?: Matrix2D): void;
    /**
     * Create an empty path object.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create an empty path object.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create an empty path object.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create an empty path object.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor();
    /**
     * Create an empty path object.
     *
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(unit: LengthMetricsUnit);
    /**
     * Create a copy of a path object
     *
     * @param { Path2D } path - Path object to be copied
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create a copy of a path object
     *
     * @param { Path2D } path - Path object to be copied
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create a copy of a path object
     *
     * @param { Path2D } path - Path object to be copied
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create a copy of a path object
     *
     * @param { Path2D } path - Path object to be copied
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(path: Path2D);
    /**
     * Create a copy of a path object
     *
     * @param { Path2D } path - Path object to be copied
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(path: Path2D, unit: LengthMetricsUnit);
    /**
     * Create a new path according to the description.
     *
     * @param { string } d - Indicates the path string that compiles with the SVG path description specifications.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create a new path according to the description.
     *
     * @param { string } d - Indicates the path string that compiles with the SVG path description specifications.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create a new path according to the description.
     *
     * @param { string } d - Indicates the path string that compiles with the SVG path description specifications.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create a new path according to the description.
     *
     * @param { string } d - Indicates the path string that compiles with the SVG path description specifications.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(d: string);
    /**
     * Create a new path according to the description.
     *
     * @param { string } description - Indicates the path string that compiles with the SVG path description specifications.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(description: string, unit: LengthMetricsUnit);
}
/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 *
 * @interface CanvasPattern
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 *
 * @interface CanvasPattern
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 *
 * @interface CanvasPattern
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Describes an opaque object of a template, which is created using the createPattern() method.
 *
 * @interface CanvasPattern
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface CanvasPattern {
    /**
     * Adds the matrix transformation effect to the current template.
     *
     * @param { Matrix2D } transform - transformation matrix
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the matrix transformation effect to the current template.
     *
     * @param { Matrix2D } transform - transformation matrix
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds the matrix transformation effect to the current template.
     *
     * @param { Matrix2D } transform - transformation matrix
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the matrix transformation effect to the current template.
     *
     * @param { Matrix2D } transform - transformation matrix
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    setTransform(transform?: Matrix2D): void;
}
/**
 * Size information of the text
 *
 * @interface TextMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Size information of the text
 *
 * @interface TextMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Size information of the text
 *
 * @interface TextMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Size information of the text
 *
 * @interface TextMetrics
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare interface TextMetrics {
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly actualBoundingBoxAscent: number;
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the bottom of
     *    the rectangular boundary of the rendered text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly actualBoundingBoxDescent: number;
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the left of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the left of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the left of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the left of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly actualBoundingBoxLeft: number;
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the right of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the right of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the right of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, parallel to the baseline, distance from the alignment point determined by the textAlign property to
     *    the right of the text rectangle boundary.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly actualBoundingBoxRight: number;
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
     *    the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
     *    the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
     *    the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the alphabetic baseline of
     *    the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly alphabeticBaseline: number;
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
     *    em square in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
     *    em square in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
     *    em square in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, the distance from the horizontal line indicated by the textBaseline property to the top of the
     *    em square in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly emHeightAscent: number;
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *    em box in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *    em box in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *    em box in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *    em box in the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly emHeightDescent: number;
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
     *    highest rectangle boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
     *    highest rectangle boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
     *    highest rectangle boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the top of the
     *    highest rectangle boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly fontBoundingBoxAscent: number;
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *   rectangular boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *   rectangular boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *   rectangular boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to the bottom of the
     *   rectangular boundary of all fonts rendering text.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly fontBoundingBoxDescent: number;
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the hanging baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the hanging baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the hanging baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the hanging baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly hangingBaseline: number;
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the ideographic baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the ideographic baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the ideographic baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Double, distance from the horizontal line indicated by the textBaseline property to
     *    the ideographic baseline of the wireframe.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly ideographicBaseline: number;
    /**
     * Indicates the width of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Indicates the width of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates the width of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates the width of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly width: number;
    /**
     * Indicates the height of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Indicates the height of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates the height of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates the height of a character string. The value is of the double type.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly height: number;
}
/**
 * Bitmap image object that can be drawn onto the current Canvas
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Bitmap image object that can be drawn onto the current Canvas
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Bitmap image object that can be drawn onto the current Canvas
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Bitmap image object that can be drawn onto the current Canvas
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ImageBitmap {
    /**
     * Indicates the height of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Indicates the height of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates the height of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates the height of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly height: number;
    /**
     * Indicates the width of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Indicates the width of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates the width of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates the width of the CSS pixel unit of ImageData.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly width: number;
    /**
     * Releases all graphics resources associated with an ImageBitmap.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Releases all graphics resources associated with an ImageBitmap.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Releases all graphics resources associated with an ImageBitmap.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Releases all graphics resources associated with an ImageBitmap.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    close(): void;
    /**
     * Create an ImageBitmap object based on the transferred image path.
     *
     * @param { string } src - Path of the image object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create an ImageBitmap object based on the transferred image path.
     *
     * @param { string } src - Path of the image object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create an ImageBitmap object based on the transferred image path.
     *
     * @param { string } src - Path of the image object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create an ImageBitmap object based on the transferred image path.
     *
     * @param { string } src - Path of the image object.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(src: string);
    /**
     * Create an ImageBitmap object based on the transferred image path.
     *
     * @param { string } src - Path of the image object.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(src: string, unit: LengthMetricsUnit);
    /**
     * Transfer a PixelMap object to construct an ImageBitmap object.
     *
     * @param { PixelMap } data - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Transfer a PixelMap object to construct an ImageBitmap object.
     *
     * @param { PixelMap } data - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Transfer a PixelMap object to construct an ImageBitmap object.
     *
     * @param { PixelMap } data - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    constructor(data: PixelMap);
    /**
     * Transfer a PixelMap object to construct an ImageBitmap object.
     *
     * @param { PixelMap } data - PixelMap object
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    constructor(data: PixelMap, unit: LengthMetricsUnit);
}
/**
 * Image data object
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Image data object
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Image data object
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Image data object
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class ImageData {
    /**
     * Array containing image pixel data
     *
     * @type { Uint8ClampedArray }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Array containing image pixel data
     *
     * @type { Uint8ClampedArray }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Array containing image pixel data
     *
     * @type { Uint8ClampedArray }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Array containing image pixel data
     *
     * @type { Uint8ClampedArray }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly data: Uint8ClampedArray;
    /**
     * Width of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Width of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Width of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Width of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly height: number;
    /**
     * Height of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Height of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Height of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Height of the image.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly width: number;
    /**
     * Create an ImageData object based on the input parameters.
     *
     * @param { number } width - Width of the image.
     * @param { number } height - Height of the image.
     * @param { Uint8ClampedArray } data - Data of the image. If this parameter is not specified, the default value is a black rectangular image.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create an ImageData object based on the input parameters.
     *
     * @param { number } width - Width of the image.
     * @param { number } height - Height of the image.
     * @param { Uint8ClampedArray } data - Data of the image. If this parameter is not specified, the default value is a black rectangular image.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create an ImageData object based on the input parameters.
     *
     * @param { number } width - Width of the image.
     * @param { number } height - Height of the image.
     * @param { Uint8ClampedArray } data - Data of the image. If this parameter is not specified, the default value is a black rectangular image.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create an ImageData object based on the input parameters.
     *
     * @param { number } width - Width of the image.
     * @param { number } height - Height of the image.
     * @param { Uint8ClampedArray } data - Data of the image. If this parameter is not specified, the default value is a black rectangular image.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(width: number, height: number, data?: Uint8ClampedArray);
    /**
     * Create an ImageData object based on the input parameters.
     *
     * @param { number } width - Width of the image.
     * @param { number } height - Height of the image.
     * @param { Uint8ClampedArray } data - Data of the image. If this parameter is not specified, the default value is a black rectangular image.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(width: number, height: number, data?: Uint8ClampedArray, unit?: LengthMetricsUnit);
}
/**
 * This object allows you to set properties when creating a rendering context
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * This object allows you to set properties when creating a rendering context
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * This object allows you to set properties when creating a rendering context
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * This object allows you to set properties when creating a rendering context
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class RenderingContextSettings {
    /**
     * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Indicates whether anti-aliasing is enabled for canvas. The default value is false.
     *
     * @type { ?boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    antialias?: boolean;
    /**
     * Create an RenderingContextSettings object based on the antialias and alpha.
     *
     * @param { boolean } antialias - Indicates whether anti-aliasing is enabled for canvas
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Create an RenderingContextSettings object based on the antialias and alpha.
     *
     * @param { boolean } antialias - Indicates whether anti-aliasing is enabled for canvas
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Create an RenderingContextSettings object based on the antialias and alpha.
     *
     * @param { boolean } antialias - Indicates whether anti-aliasing is enabled for canvas
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Create an RenderingContextSettings object based on the antialias and alpha.
     *
     * @param { boolean } antialias - Indicates whether anti-aliasing is enabled for canvas
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(antialias?: boolean);
}
/**
 * Canvas renderer for drawing shapes, text, images and other objects
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Canvas renderer for drawing shapes, text, images and other objects
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Canvas renderer for drawing shapes, text, images and other objects
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Canvas renderer for drawing shapes, text, images and other objects
 *
 * @extends CanvasPath
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class CanvasRenderer extends CanvasPath {
    /**
     * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
     *    The default value is 1.0. If the value is out of range, the assignment is invalid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
     *    The default value is 1.0. If the value is out of range, the assignment is invalid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
     *    The default value is 1.0. If the value is out of range, the assignment is invalid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Transparency. The value ranges from 0.0 (completely transparent) to 1.0 (completely opaque).
     *    The default value is 1.0. If the value is out of range, the assignment is invalid.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    globalAlpha: number;
    /**
     * Type of composition operation applied when drawing a new shape. The following types are supported:
     * source-over: (Default) Draws a new drawing on top of an existing canvas context.
     * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
     *    Everything else is transparent.
     * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
     * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
     * destination-over: Draws a new graphic behind the existing canvas content.
     * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
     *    Everything else is transparent.
     * destination-out: Existing content remains where the new drawing does not overlap.
     * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
     *    which is drawn behind the canvas content.
     * lighter: The color of two overlapping shapes is determined by adding the color values.
     * copy: Only new graphics are displayed.
     * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Type of composition operation applied when drawing a new shape. The following types are supported:
     * source-over: (Default) Draws a new drawing on top of an existing canvas context.
     * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
     *    Everything else is transparent.
     * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
     * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
     * destination-over: Draws a new graphic behind the existing canvas content.
     * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
     *    Everything else is transparent.
     * destination-out: Existing content remains where the new drawing does not overlap.
     * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
     *    which is drawn behind the canvas content.
     * lighter: The color of two overlapping shapes is determined by adding the color values.
     * copy: Only new graphics are displayed.
     * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Type of composition operation applied when drawing a new shape. The following types are supported:
     * source-over: (Default) Draws a new drawing on top of an existing canvas context.
     * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
     *    Everything else is transparent.
     * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
     * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
     * destination-over: Draws a new graphic behind the existing canvas content.
     * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
     *    Everything else is transparent.
     * destination-out: Existing content remains where the new drawing does not overlap.
     * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
     *    which is drawn behind the canvas content.
     * lighter: The color of two overlapping shapes is determined by adding the color values.
     * copy: Only new graphics are displayed.
     * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Type of composition operation applied when drawing a new shape. The following types are supported:
     * source-over: (Default) Draws a new drawing on top of an existing canvas context.
     * source-in: The new drawing is drawn only where the new drawing overlaps the target canvas.
     *    Everything else is transparent.
     * source-out: Draws a new drawing where it does not overlap with the existing canvas content.
     * source-atop: The new drawing is drawn only where it overlaps the content of the existing canvas.
     * destination-over: Draws a new graphic behind the existing canvas content.
     * destination-in: Existing canvas content remains where the new drawing overlaps the existing canvas content.
     *    Everything else is transparent.
     * destination-out: Existing content remains where the new drawing does not overlap.
     * destination-atop: The existing canvas retains only the part that overlaps with the new drawing,
     *    which is drawn behind the canvas content.
     * lighter: The color of two overlapping shapes is determined by adding the color values.
     * copy: Only new graphics are displayed.
     * xor: In the image, those overlaps and other places outside of the normal drawing are transparent.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    globalCompositeOperation: string;
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    drawImage(image: ImageBitmap | PixelMap, dx: number, dy: number): void;
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    drawImage(image: ImageBitmap | PixelMap, dx: number, dy: number, dw: number, dh: number): void;
    /**
     *Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } sx - x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sy - y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sw - Width of the rectangle (cropping) selection box of the image.
     * @param { number } sh - Height of the rectangle (cropping) selection box of the image.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     *Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } sx - x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sy - y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sw - Width of the rectangle (cropping) selection box of the image.
     * @param { number } sh - Height of the rectangle (cropping) selection box of the image.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     *Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } sx - x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sy - y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sw - Width of the rectangle (cropping) selection box of the image.
     * @param { number } sh - Height of the rectangle (cropping) selection box of the image.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     *Draw an image on a canvas
     *
     * @param { ImageBitmap | PixelMap } image - Picture objects drawn to the canvas.
     * @param { number } sx - x coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sy - y coordinate of the upper left corner of the rectangle (cropping) selection box of the image.
     * @param { number } sw - Width of the rectangle (cropping) selection box of the image.
     * @param { number } sh - Height of the rectangle (cropping) selection box of the image.
     * @param { number } dx - x-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dy - y-axis coordinate of the upper left corner of the image on the target canvas.
     * @param { number } dw - Specifies the drawing width of the image on the target canvas. The width of the drawn image will be scaled.
     * @param { number } dh - Specifies the drawing height of the image on the target canvas. The height of the drawn image will be scaled.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    drawImage(image: ImageBitmap | PixelMap, sx: number, sy: number, sw: number, sh: number, dx: number, dy: number, dw: number, dh: number): void;
    /**
     * Clear the sub-path list and start a new path.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Clear the sub-path list and start a new path.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Clear the sub-path list and start a new path.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Clear the sub-path list and start a new path.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    beginPath(): void;
    /**
     * Sets the currently created path as the current clipping path
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the currently created path as the current clipping path
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the currently created path as the current clipping path
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the currently created path as the current clipping path
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    clip(fillRule?: CanvasFillRule): void;
    /**
     * Tailoring according to the specified path
     *
     * @param { Path2D } path - Path to be cut.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Tailoring according to the specified path
     *
     * @param { Path2D } path - Path to be cut.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Tailoring according to the specified path
     *
     * @param { Path2D } path - Path to be cut.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Tailoring according to the specified path
     *
     * @param { Path2D } path - Path to be cut.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    clip(path: Path2D, fillRule?: CanvasFillRule): void;
    /**
     * Fills existing paths according to the current fill style.
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Fills existing paths according to the current fill style.
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Fills existing paths according to the current fill style.
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Fills existing paths according to the current fill style.
     *
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fill(fillRule?: CanvasFillRule): void;
    /**
     * Fills the specified path according to the current fill style
     *
     * @param { Path2D } path - Path to be filled.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Fills the specified path according to the current fill style
     *
     * @param { Path2D } path - Path to be filled.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Fills the specified path according to the current fill style
     *
     * @param { Path2D } path - Path to be filled.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Fills the specified path according to the current fill style
     *
     * @param { Path2D } path - Path to be filled.
     * @param { CanvasFillRule } fillRule - Algorithm rule. For details, see {@link CanvasFillRule}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fill(path: Path2D, fillRule?: CanvasFillRule): void;
    /**
     * Draws an existing path according to the current stroke style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draws an existing path according to the current stroke style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draws an existing path according to the current stroke style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draws an existing path according to the current stroke style.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stroke(): void;
    /**
     * Draws the specified path according to the current stroke style
     *
     * @param { Path2D } path - Specified stroke path object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draws the specified path according to the current stroke style
     *
     * @param { Path2D } path - Specified stroke path object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draws the specified path according to the current stroke style
     *
     * @param { Path2D } path - Specified stroke path object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draws the specified path according to the current stroke style
     *
     * @param { Path2D } path - Specified stroke path object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    stroke(path: Path2D): void;
    /**
     * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
     * color: Color String
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     *
     * @type { string | CanvasGradient | CanvasPattern }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
     * color: Color String
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     *
     * @type { string | CanvasGradient | CanvasPattern }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
     *
     * @type { string | number | CanvasGradient | CanvasPattern }
     * string: Color String.
     * number: Indicates the color with number.
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Attributes that describe the fill color and style. The default value is # 000 (black). The options are as follows:
     *
     * @type { string | number | CanvasGradient | CanvasPattern }
     * string: Color String.
     * number: Indicates the color with number.
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fillStyle: string | number | CanvasGradient | CanvasPattern;
    /**
     * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
     * color: Color String
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     *
     * @type { string | CanvasGradient | CanvasPattern }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
     * color: Color String
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     *
     * @type { string | CanvasGradient | CanvasPattern }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
     *
     * @type { string | number | CanvasGradient | CanvasPattern }
     * string: Color String.
     * number: Indicates the color with number.
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Attributes of the stroke color and style. The default value is # 000 (black). The options are as follows:
     *
     * @type { string | number | CanvasGradient | CanvasPattern }
     * string: Color String.
     * number: Indicates the color with number.
     * CanvasGradient: Color gradient object. For details, see {@link CanvasGradient}.
     * CanvasPattern: Template object. For details, see {@link CanvasPattern}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeStyle: string | number | CanvasGradient | CanvasPattern;
    /**
     * Creates a linear gradient object that is specified along the parameter coordinates
     *
     * @param { number } x0 - The x-axis coordinate of the start point.
     * @param { number } y0 - The y-axis coordinate of the start point.
     * @param { number } x1 - x-axis coordinate of the end point.
     * @param { number } y1 - y-axis coordinate of the end point.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Creates a linear gradient object that is specified along the parameter coordinates
     *
     * @param { number } x0 - The x-axis coordinate of the start point.
     * @param { number } y0 - The y-axis coordinate of the start point.
     * @param { number } x1 - x-axis coordinate of the end point.
     * @param { number } y1 - y-axis coordinate of the end point.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Creates a linear gradient object that is specified along the parameter coordinates
     *
     * @param { number } x0 - The x-axis coordinate of the start point.
     * @param { number } y0 - The y-axis coordinate of the start point.
     * @param { number } x1 - x-axis coordinate of the end point.
     * @param { number } y1 - y-axis coordinate of the end point.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Creates a linear gradient object that is specified along the parameter coordinates
     *
     * @param { number } x0 - The x-axis coordinate of the start point.
     * @param { number } y0 - The y-axis coordinate of the start point.
     * @param { number } x1 - x-axis coordinate of the end point.
     * @param { number } y1 - y-axis coordinate of the end point.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    createLinearGradient(x0: number, y0: number, x1: number, y1: number): CanvasGradient;
    /**
     * Creates a template object using the specified image
     *
     * @param { ImageBitmap } image - Objects as duplicate image sources
     * @param { string | null } repetition - Specifies how to repeat images. The following four modes are supported:
     * "repeat": Repeated images in both X and Y directions
     * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
     * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
     * "no-repeat": Non-repeating images in both X and Y directions
     * @returns { CanvasPattern | null }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Creates a template object using the specified image
     *
     * @param { ImageBitmap } image - Objects as duplicate image sources
     * @param { string | null } repetition - Specifies how to repeat images. The following four modes are supported:
     * "repeat": Repeated images in both X and Y directions
     * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
     * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
     * "no-repeat": Non-repeating images in both X and Y directions
     * @returns { CanvasPattern | null }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Creates a template object using the specified image
     *
     * @param { ImageBitmap } image - Objects as duplicate image sources
     * @param { string | null } repetition - Specifies how to repeat images. The following four modes are supported:
     * "repeat": Repeated images in both X and Y directions
     * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
     * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
     * "no-repeat": Non-repeating images in both X and Y directions
     * "clamp": Replicate the edge color if the shader draws outside of its original bounds.
     * "mirror": Repeat the shader's image horizontally and vertically, alternating mirror images so that adjacent images always seam.
     * @returns { CanvasPattern | null }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Creates a template object using the specified image
     *
     * @param { ImageBitmap } image - Objects as duplicate image sources
     * @param { string | null } repetition - Specifies how to repeat images. The following four modes are supported:
     * "repeat": Repeated images in both X and Y directions
     * "repeat-x": Repeated images in the X-axis direction but not in the Y-axis direction
     * "repeat-y": The image is repeated in the Y axis direction, and the image is not repeated in the X axis direction.
     * "no-repeat": Non-repeating images in both X and Y directions
     * "clamp": Replicate the edge color if the shader draws outside of its original bounds.
     * "mirror": Repeat the shader's image horizontally and vertically, alternating mirror images so that adjacent images always seam.
     * @returns { CanvasPattern | null }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    createPattern(image: ImageBitmap, repetition: string | null): CanvasPattern | null;
    /**
     * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
     *
     * @param { number } x0 - The x-axis coordinate of the start circle.
     * @param { number } y0 - The y-axis coordinate of the start circle.
     * @param { number } r0 - Radius of the starting circle.
     * @param { number } x1 - The x-axis coordinate of the end circle.
     * @param { number } y1 - The y-axis coordinate of the end circle.
     * @param { number } r1 - Radius of the end circle.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
     *
     * @param { number } x0 - The x-axis coordinate of the start circle.
     * @param { number } y0 - The y-axis coordinate of the start circle.
     * @param { number } r0 - Radius of the starting circle.
     * @param { number } x1 - The x-axis coordinate of the end circle.
     * @param { number } y1 - The y-axis coordinate of the end circle.
     * @param { number } r1 - Radius of the end circle.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
     *
     * @param { number } x0 - The x-axis coordinate of the start circle.
     * @param { number } y0 - The y-axis coordinate of the start circle.
     * @param { number } r0 - Radius of the starting circle.
     * @param { number } x1 - The x-axis coordinate of the end circle.
     * @param { number } y1 - The y-axis coordinate of the end circle.
     * @param { number } r1 - Radius of the end circle.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Creates a radioactive gradient object based on parameters that determine the coordinates of two circles
     *
     * @param { number } x0 - The x-axis coordinate of the start circle.
     * @param { number } y0 - The y-axis coordinate of the start circle.
     * @param { number } r0 - Radius of the starting circle.
     * @param { number } x1 - The x-axis coordinate of the end circle.
     * @param { number } y1 - The y-axis coordinate of the end circle.
     * @param { number } r1 - Radius of the end circle.
     * @returns { CanvasGradient }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    createRadialGradient(x0: number, y0: number, r0: number, x1: number, y1: number, r1: number): CanvasGradient;
    /**
     * Creates a gradient around a point with given coordinates.
     *
     * @param { number } startAngle - The angle at which to begin the gradient, in radians.
     *                   Angle measurements start horizontally the right of the center and move around clockwise.
     * @param { number } x - The x-axis coordinate of the center of the gradient.
     * @param { number } y - The y-axis coordinate of the center of the gradient.
     * @returns { CanvasGradient } A CanvasGradient object that draws a conic gradient around the given coordinates.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Creates a gradient around a point with given coordinates.
     *
     * @param { number } startAngle - The angle at which to begin the gradient, in radians.
     *                   Angle measurements start horizontally the right of the center and move around clockwise.
     * @param { number } x - The x-axis coordinate of the center of the gradient.
     * @param { number } y - The y-axis coordinate of the center of the gradient.
     * @returns { CanvasGradient } A CanvasGradient object that draws a conic gradient around the given coordinates.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    createConicGradient(startAngle: number, x: number, y: number): CanvasGradient;
    /**
     * Provides filter effects such as blur and grayscale. You can set the following filter effects:
     * blur(<length>): Adds a Gaussian blur effect to the drawing
     * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
     * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
     *    When the value is 100%, there is no change in the image.
     * grayscale(<percentage>): Converts the image to a gray image. When the value is 100%, the image is completely gray.
     *    When the value is 0%, there is no change in the image.
     * hue-rotate(<degree>): Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
     * invert(<percentage>): Inverted image (representing the effect of a photographic negative). When the value is 100%,
     *    the image is completely inverted. When the value is 0%, there is no change in the image.
     * opacity(<percentage>): Transparency of the image. At 0%, the image is completely transparent.
     *    When the value is 100%, there is no change in the image.
     * saturate(<percentage>): Perform saturation processing on the image. At 0%, the image is completely un-saturated.
     *    When the value is 100%, there is no change in the image.
     * sepia(<percentage>): The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
     *    When the value is 0%, there is no change in the image.
     * none: Turn off filter effects
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Provides filter effects such as blur and grayscale. You can set the following filter effects:
     * blur(<length>): Adds a Gaussian blur effect to the drawing
     * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
     * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
     *    When the value is 100%, there is no change in the image.
     * grayscale(<percentage>): Converts the image to a gray image. When the value is 100%, the image is completely gray.
     *    When the value is 0%, there is no change in the image.
     * hue-rotate(<degree>): Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
     * invert(<percentage>): Inverted image (representing the effect of a photographic negative). When the value is 100%,
     *    the image is completely inverted. When the value is 0%, there is no change in the image.
     * opacity(<percentage>): Transparency of the image. At 0%, the image is completely transparent.
     *    When the value is 100%, there is no change in the image.
     * saturate(<percentage>): Perform saturation processing on the image. At 0%, the image is completely un-saturated.
     *    When the value is 100%, there is no change in the image.
     * sepia(<percentage>): The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
     *    When the value is 0%, there is no change in the image.
     * none: Turn off filter effects
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Provides filter effects such as blur and grayscale. You can set the following filter effects:
     * blur(<length>): Adds a Gaussian blur effect to the drawing
     * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
     * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
     *    When the value is 100%, there is no change in the image.
     * grayscale(<percentage>): Converts the image to a gray image. When the value is 100%, the image is completely gray.
     *    When the value is 0%, there is no change in the image.
     * hue-rotate(<degree>): Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
     * invert(<percentage>): Inverted image (representing the effect of a photographic negative). When the value is 100%,
     *    the image is completely inverted. When the value is 0%, there is no change in the image.
     * opacity(<percentage>): Transparency of the image. At 0%, the image is completely transparent.
     *    When the value is 100%, there is no change in the image.
     * saturate(<percentage>): Perform saturation processing on the image. At 0%, the image is completely un-saturated.
     *    When the value is 100%, there is no change in the image.
     * sepia(<percentage>): The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
     *    When the value is 0%, there is no change in the image.
     * none: Turn off filter effects
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Provides filter effects such as blur and grayscale. You can set the following filter effects:
     * blur(<length>): Adds a Gaussian blur effect to the drawing
     * brightness(<percentage>): Provides a linear multiplication for the drawing and adjusts the brightness level.
     * contrast(<percentage>): Adjusts the contrast of the image. When the value is 0%, the image is completely black.
     *    When the value is 100%, there is no change in the image.
     * grayscale(<percentage>): Converts the image to a gray image. When the value is 100%, the image is completely gray.
     *    When the value is 0%, there is no change in the image.
     * hue-rotate(<degree>): Perform color rotation on an image. When the value is 0 degrees, there is no change in the image.
     * invert(<percentage>): Inverted image (representing the effect of a photographic negative). When the value is 100%,
     *    the image is completely inverted. When the value is 0%, there is no change in the image.
     * opacity(<percentage>): Transparency of the image. At 0%, the image is completely transparent.
     *    When the value is 100%, there is no change in the image.
     * saturate(<percentage>): Perform saturation processing on the image. At 0%, the image is completely un-saturated.
     *    When the value is 100%, there is no change in the image.
     * sepia(<percentage>): The image is sepia (nostalgic style). At 100%, the image turns completely sepia.
     *    When the value is 0%, there is no change in the image.
     * none: Turn off filter effects
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    filter: string;
    /**
     * Creates a new, empty ImageData object of the specified size
     *
     * @param { number } sw - Width of the ImageData object.
     * @param { number } sh - Height of the ImageData object.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Creates a new, empty ImageData object of the specified size
     *
     * @param { number } sw - Width of the ImageData object.
     * @param { number } sh - Height of the ImageData object.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Creates a new, empty ImageData object of the specified size
     *
     * @param { number } sw - Width of the ImageData object.
     * @param { number } sh - Height of the ImageData object.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Creates a new, empty ImageData object of the specified size
     *
     * @param { number } sw - Width of the ImageData object.
     * @param { number } sh - Height of the ImageData object.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    createImageData(sw: number, sh: number): ImageData;
    /**
     * From an existing ImageData object, copy an object with the same width and height as the image.
     *    The image content is not copied.
     *
     * @param { ImageData } imagedata - ImageData object to be copied.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * From an existing ImageData object, copy an object with the same width and height as the image.
     *    The image content is not copied.
     *
     * @param { ImageData } imagedata - ImageData object to be copied.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * From an existing ImageData object, copy an object with the same width and height as the image.
     *    The image content is not copied.
     *
     * @param { ImageData } imagedata - ImageData object to be copied.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * From an existing ImageData object, copy an object with the same width and height as the image.
     *    The image content is not copied.
     *
     * @param { ImageData } imagedata - ImageData object to be copied.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    createImageData(imagedata: ImageData): ImageData;
    /**
     * Obtains the pixel data of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sw - The width of the rectangular area of the image data to be extracted.
     * @param { number } sh - The height of the rectangular area of the image data to be extracted.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains the pixel data of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sw - The width of the rectangular area of the image data to be extracted.
     * @param { number } sh - The height of the rectangular area of the image data to be extracted.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Obtains the pixel data of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sw - The width of the rectangular area of the image data to be extracted.
     * @param { number } sh - The height of the rectangular area of the image data to be extracted.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Obtains the pixel data of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the image data to be extracted.
     * @param { number } sw - The width of the rectangular area of the image data to be extracted.
     * @param { number } sh - The height of the rectangular area of the image data to be extracted.
     * @returns { ImageData }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    getImageData(sx: number, sy: number, sw: number, sh: number): ImageData;
    /**
     * Obtains the PixelMap of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sw - The width of the rectangular area of the PixelMap to be extracted.
     * @param { number } sh - The height of the rectangular area of the PixelMap to be extracted.
     * @returns { PixelMap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains the PixelMap of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sw - The width of the rectangular area of the PixelMap to be extracted.
     * @param { number } sh - The height of the rectangular area of the PixelMap to be extracted.
     * @returns { PixelMap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains the PixelMap of a specified area on the current canvas.
     *
     * @param { number } sx - x coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sy - y coordinate of the upper left corner of the rectangular area of the PixelMap to be extracted.
     * @param { number } sw - The width of the rectangular area of the PixelMap to be extracted.
     * @param { number } sh - The height of the rectangular area of the PixelMap to be extracted.
     * @returns { PixelMap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getPixelMap(sx: number, sy: number, sw: number, sh: number): PixelMap;
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number | string } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number | string } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number | string } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number | string } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    putImageData(imagedata: ImageData, dx: number | string, dy: number | string): void;
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @param { number } dirtyX - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (x coordinate) of the entire image data.
     * @param { number } dirtyY - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (y coordinate) of the entire image data.
     * @param { number } dirtyWidth - Width of the rectangular area in the source image data.
     *    The default is the width of the image data.
     * @param { number } dirtyHeight - Height of the rectangular area in the source image data.
     *    The default is the height of the image data.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @param { number } dirtyX - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (x coordinate) of the entire image data.
     * @param { number } dirtyY - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (y coordinate) of the entire image data.
     * @param { number } dirtyWidth - Width of the rectangular area in the source image data.
     *    The default is the width of the image data.
     * @param { number } dirtyHeight - Height of the rectangular area in the source image data.
     *    The default is the height of the image data.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number | string } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number | string } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @param { number | string } dirtyX - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (x coordinate) of the entire image data.
     * @param { number | string } dirtyY - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (y coordinate) of the entire image data.
     * @param { number | string } dirtyWidth - Width of the rectangular area in the source image data.
     *    The default is the width of the image data.
     * @param { number | string } dirtyHeight - Height of the rectangular area in the source image data.
     *    The default is the height of the image data.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Draws the specified ImageData object onto the canvas
     *
     * @param { ImageData } imagedata - ImageData object to be drawn.
     * @param { number | string } dx - Position offset of the source image data in the target canvas (the offset in the x-axis direction).
     * @param { number | string } dy - Position offset of the source image data in the target canvas (the offset in the y-axis direction).
     * @param { number | string } dirtyX - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (x coordinate) of the entire image data.
     * @param { number | string } dirtyY - Position of the upper left corner of the rectangular area in the source image data.
     *    The default is the upper left corner (y coordinate) of the entire image data.
     * @param { number | string } dirtyWidth - Width of the rectangular area in the source image data.
     *    The default is the width of the image data.
     * @param { number | string } dirtyHeight - Height of the rectangular area in the source image data.
     *    The default is the height of the image data.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    putImageData(imagedata: ImageData, dx: number | string, dy: number | string, dirtyX: number | string, dirtyY: number | string, dirtyWidth: number | string, dirtyHeight: number | string): void;
    /**
     * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
     *    The value false indicates that the image is not smooth.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
     *    The value false indicates that the image is not smooth.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
     *    The value false indicates that the image is not smooth.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Specifies whether to smooth the image. The value true indicates that the image is smooth (default value).
     *    The value false indicates that the image is not smooth.
     *
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    imageSmoothingEnabled: boolean;
    /**
     * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
     *
     * @type { ImageSmoothingQuality }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
     *
     * @type { ImageSmoothingQuality }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
     *
     * @type { ImageSmoothingQuality }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Smoothness level of the current image. For details, see {@link ImageSmoothingQuality}.
     *
     * @type { ImageSmoothingQuality }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    imageSmoothingQuality: ImageSmoothingQuality;
    /**
     * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
     *
     * @type { CanvasLineCap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
     *
     * @type { CanvasLineCap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
     *
     * @type { CanvasLineCap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Line segment endpoint attribute. For details, see {@link CanvasLineCap}.
     *
     * @type { CanvasLineCap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineCap: CanvasLineCap;
    /**
     * Dotted line offset attribute. The default value is 0.0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Dotted line offset attribute. The default value is 0.0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Dotted line offset attribute. The default value is 0.0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Dotted line offset attribute. The default value is 0.0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineDashOffset: number;
    /**
     * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
     *
     * @type { CanvasLineJoin }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
     *
     * @type { CanvasLineJoin }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
     *
     * @type { CanvasLineJoin }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Line segment connection point attribute. For details, see {@link CanvasLineJoin}.
     *
     * @type { CanvasLineJoin }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineJoin: CanvasLineJoin;
    /**
     * Line thickness attribute. The value cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Line thickness attribute. The value cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Line thickness attribute. The value cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Line thickness attribute. The value cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    lineWidth: number;
    /**
     * The value of this parameter cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The value of this parameter cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The value of this parameter cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The value of this parameter cannot be 0 or a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    miterLimit: number;
    /**
     * Gets the current segment style.
     *
     * @returns { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Gets the current segment style.
     *
     * @returns { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Gets the current segment style.
     *
     * @returns { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Gets the current segment style.
     *
     * @returns { number[] }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    getLineDash(): number[];
    /**
     * Sets the dashed line mode for line drawing.
     *
     * @param { number[] } segments - A set of numbers that describe the length of alternating drawn lines segments and
     *    spacing (coordinate space units).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Sets the dashed line mode for line drawing.
     *
     * @param { number[] } segments - A set of numbers that describe the length of alternating drawn lines segments and
     *    spacing (coordinate space units).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Sets the dashed line mode for line drawing.
     *
     * @param { number[] } segments - A set of numbers that describe the length of alternating drawn lines segments and
     *    spacing (coordinate space units).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Sets the dashed line mode for line drawing.
     *
     * @param { number[] } segments - A set of numbers that describe the length of alternating drawn lines segments and
     *    spacing (coordinate space units).
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    setLineDash(segments: number[]): void;
    /**
     * Clears the drawing content of a rectangular area.
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Clears the drawing content of a rectangular area.
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Clears the drawing content of a rectangular area.
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Clears the drawing content of a rectangular area.
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    clearRect(x: number, y: number, w: number, h: number): void;
    /**
     * Fills a specified rectangular area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Fills a specified rectangular area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Fills a specified rectangular area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Fills a specified rectangular area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fillRect(x: number, y: number, w: number, h: number): void;
    /**
     * Stroke Specify Rectangular Area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Stroke Specify Rectangular Area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Stroke Specify Rectangular Area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Stroke Specify Rectangular Area
     *
     * @param { number } x - The x-axis coordinate of the start point of the rectangle.
     * @param { number } y - The y-axis coordinate of the start point of the rectangle.
     * @param { number } w - Width of the rectangle.
     * @param { number } h - Height of the rectangle.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeRect(x: number, y: number, w: number, h: number): void;
    /**
     * Shadow blur radius. The default value is 0. The value cannot be a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Shadow blur radius. The default value is 0. The value cannot be a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Shadow blur radius. The default value is 0. The value cannot be a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Shadow blur radius. The default value is 0. The value cannot be a negative number.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    shadowBlur: number;
    /**
     * Shadow color. The default value is transparent black.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Shadow color. The default value is transparent black.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Shadow color. The default value is transparent black.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Shadow color. The default value is transparent black.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    shadowColor: string;
    /**
     * Horizontal offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Horizontal offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Horizontal offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Horizontal offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    shadowOffsetX: number;
    /**
     * Vertical offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Vertical offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Vertical offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Vertical offset distance of the shadow. The default value is 0.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    shadowOffsetY: number;
    /**
     * Top of the stack pop-up state in the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Top of the stack pop-up state in the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Top of the stack pop-up state in the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Top of the stack pop-up state in the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    restore(): void;
    /**
     * Saves the current drawing state to the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Saves the current drawing state to the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Saves the current drawing state to the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Saves the current drawing state to the drawing state stack
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    save(): void;
    /**
     * Fills the specified text at the specified location
     *
     * @param { string } text - Text string to be drawn.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the drawing.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Fills the specified text at the specified location
     *
     * @param { string } text - Text string to be drawn.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the drawing.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Fills the specified text at the specified location
     *
     * @param { string } text - Text string to be drawn.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the drawing.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Fills the specified text at the specified location
     *
     * @param { string } text - Text string to be drawn.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the drawing.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    fillText(text: string, x: number, y: number, maxWidth?: number): void;
    /**
     * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
     *
     * @param { string } text - Text string to be measured.
     * @returns { TextMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
     *
     * @param { string } text - Text string to be measured.
     * @returns { TextMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
     *
     * @param { string } text - Text string to be measured.
     * @returns { TextMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Measure the size of a specified text. For details about the return value, see {@link TextMetrics}.
     *
     * @param { string } text - Text string to be measured.
     * @returns { TextMetrics }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    measureText(text: string): TextMetrics;
    /**
     * Stroke specified text at specified position
     *
     * @param { string } text - Text string to be stroked.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the stroke.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Stroke specified text at specified position
     *
     * @param { string } text - Text string to be stroked.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the stroke.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Stroke specified text at specified position
     *
     * @param { string } text - Text string to be stroked.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the stroke.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Stroke specified text at specified position
     *
     * @param { string } text - Text string to be stroked.
     * @param { number } x - The x-axis coordinate of the start point of the text.
     * @param { number } y - The y-axis-axis coordinate of the start point of the text.
     * @param { number } maxWidth - Maximum width of the stroke.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    strokeText(text: string, x: number, y: number, maxWidth?: number): void;
    /**
     * Text drawing direction. For details, see {@link CanvasDirection}.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Text drawing direction. For details, see {@link CanvasDirection}.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text drawing direction. For details, see {@link CanvasDirection}.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text drawing direction. For details, see {@link CanvasDirection}.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    direction: CanvasDirection;
    /**
     * Font style. The default value is 14px sans-serif.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Font style. The default value is 14px sans-serif.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Font style. The default value is 14px sans-serif.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Font style. The default value is 14px sans-serif.
     *
     * @type { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    font: string;
    /**
     * Text alignment mode. For details, see {@link CanvasTextAlign}.
     *
     * @type { CanvasTextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Text alignment mode. For details, see {@link CanvasTextAlign}.
     *
     * @type { CanvasTextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text alignment mode. For details, see {@link CanvasTextAlign}.
     *
     * @type { CanvasTextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text alignment mode. For details, see {@link CanvasTextAlign}.
     *
     * @type { CanvasTextAlign }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    textAlign: CanvasTextAlign;
    /**
     * Text baseline. For details, see {@link CanvasTextBaseline}.
     *
     * @type { CanvasTextBaseline }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Text baseline. For details, see {@link CanvasTextBaseline}.
     *
     * @type { CanvasTextBaseline }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Text baseline. For details, see {@link CanvasTextBaseline}.
     *
     * @type { CanvasTextBaseline }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Text baseline. For details, see {@link CanvasTextBaseline}.
     *
     * @type { CanvasTextBaseline }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    textBaseline: CanvasTextBaseline;
    /**
     * Obtains the currently applied transformation matrix.
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Obtains the currently applied transformation matrix.
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Obtains the currently applied transformation matrix.
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Obtains the currently applied transformation matrix.
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    getTransform(): Matrix2D;
    /**
     * Resets the current transformation matrix using the identity matrix
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Resets the current transformation matrix using the identity matrix
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Resets the current transformation matrix using the identity matrix
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Resets the current transformation matrix using the identity matrix
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    resetTransform(): void;
    /**
     * Adds the effect of a rotation
     *
     * @param { number } angle - The radian of clockwise rotation, which can be converted to an angle value using the formula:
     *    degree * Math.PI / 180
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the effect of a rotation
     *
     * @param { number } angle - The radian of clockwise rotation, which can be converted to an angle value using the formula:
     *    degree * Math.PI / 180
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds the effect of a rotation
     *
     * @param { number } angle - The radian of clockwise rotation, which can be converted to an angle value using the formula:
     *    degree * Math.PI / 180
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the effect of a rotation
     *
     * @param { number } angle - The radian of clockwise rotation, which can be converted to an angle value using the formula:
     *    degree * Math.PI / 180
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    rotate(angle: number): void;
    /**
     * Increases the scaling effect of the X and Y axes.
     *
     * @param { number } x - Horizontal scaling factor
     * @param { number } y - Vertical scaling factor
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Increases the scaling effect of the X and Y axes.
     *
     * @param { number } x - Horizontal scaling factor
     * @param { number } y - Vertical scaling factor
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Increases the scaling effect of the X and Y axes.
     *
     * @param { number } x - Horizontal scaling factor
     * @param { number } y - Vertical scaling factor
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Increases the scaling effect of the X and Y axes.
     *
     * @param { number } x - Horizontal scaling factor
     * @param { number } y - Vertical scaling factor
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scale(x: number, y: number): void;
    /**
     * Adds 2D transformation effects, including rotation, translation, and scaling.
     *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds 2D transformation effects, including rotation, translation, and scaling.
     *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds 2D transformation effects, including rotation, translation, and scaling.
     *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds 2D transformation effects, including rotation, translation, and scaling.
     *    The current transformation matrix will not be overwritten. Multiple transformations will be superimposed.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    setTransform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    /**
     * The 2D transformation effect is added. The current transformation matrix is not overwritten and
     *    the transformations are superimposed for multiple times.
     *
     * @param { Matrix2D } transform - 2D transformation matrix. For details, see {@link Matrix2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The 2D transformation effect is added. The current transformation matrix is not overwritten and
     *    the transformations are superimposed for multiple times.
     *
     * @param { Matrix2D } transform - 2D transformation matrix. For details, see {@link Matrix2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The 2D transformation effect is added. The current transformation matrix is not overwritten and
     *    the transformations are superimposed for multiple times.
     *
     * @param { Matrix2D } transform - 2D transformation matrix. For details, see {@link Matrix2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The 2D transformation effect is added. The current transformation matrix is not overwritten and
     *    the transformations are superimposed for multiple times.
     *
     * @param { Matrix2D } transform - 2D transformation matrix. For details, see {@link Matrix2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    setTransform(transform?: Matrix2D): void;
    /**
     * Adds the 2D transformation effect, including rotation, translation, and scaling,
     *    and overwrites the current transformation matrix.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the 2D transformation effect, including rotation, translation, and scaling,
     *    and overwrites the current transformation matrix.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds the 2D transformation effect, including rotation, translation, and scaling,
     *    and overwrites the current transformation matrix.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the 2D transformation effect, including rotation, translation, and scaling,
     *    and overwrites the current transformation matrix.
     *
     * @param { number } a - Horizontal Zoom
     * @param { number } b - Vertical Tilt
     * @param { number } c - Horizontal Tilt
     * @param { number } d - Vertical Zoom
     * @param { number } e - Horizontal movement
     * @param { number } f - Vertical movement
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    transform(a: number, b: number, c: number, d: number, e: number, f: number): void;
    /**
     * Increases the translation effect of the X and Y axes
     *
     * @param { number } x - Horizontal movement distance
     * @param { number } y - Vertical travel distance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Increases the translation effect of the X and Y axes
     *
     * @param { number } x - Horizontal movement distance
     * @param { number } y - Vertical travel distance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Increases the translation effect of the X and Y axes
     *
     * @param { number } x - Horizontal movement distance
     * @param { number } y - Vertical travel distance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Increases the translation effect of the X and Y axes
     *
     * @param { number } x - Horizontal movement distance
     * @param { number } y - Vertical travel distance
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    translate(x: number, y: number): void;
    /**
     * Set a PixelMap to the current context. The drawing content is synchronized to the PixelMap.
     *
     * @param { PixelMap } value - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Set a PixelMap to the current context. The drawing content is synchronized to the PixelMap.
     *
     * @param { PixelMap } value - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set a PixelMap to the current context. The drawing content is synchronized to the PixelMap.
     *
     * @param { PixelMap } value - PixelMap object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    setPixelMap(value?: PixelMap): void;
    /**
     * transfer ImageBitmap to content.
     *
     * @param { ImageBitmap } bitmap
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * transfer ImageBitmap to content.
     *
     * @param { ImageBitmap } bitmap
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * transfer ImageBitmap to content.
     *
     * @param { ImageBitmap } bitmap
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * transfer ImageBitmap to content.
     *
     * @param { ImageBitmap } bitmap
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    transferFromImageBitmap(bitmap: ImageBitmap): void;
    /**
     * Allocate a layer for subsequent drawing.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    saveLayer(): void;
    /**
     * Remove changes to transform and clip since saveLayer was last called and draw the layer on canvas.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    restoreLayer(): void;
    /**
     * Clear the backing buffer, drawing state stack, any defined paths, and styles.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    reset(): void;
}
/**
 * Draw context object for the Canvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Draw context object for the Canvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Draw context object for the Canvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Draw context object for the Canvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class CanvasRenderingContext2D extends CanvasRenderer {
    /**
     * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The default value is 0, which is bound to the height of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly height: number;
    /**
     * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * The default value is 0, which is bound to the width of the specified canvas. The value is read-only.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    readonly width: number;
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    toDataURL(type?: string, quality?: any): string;
    /**
     * Start image analyzer.
     *
     * @param { ImageAnalyzerConfig } config - Image analyzer config.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 110001 - Image analysis feature is not supported.
     * @throws { BusinessError } 110002 - Image analysis is currently being executed.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    startImageAnalyzer(config: ImageAnalyzerConfig): Promise<void>;
    /**
     * Stop image analyzer.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    stopImageAnalyzer(): void;
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(settings?: RenderingContextSettings);
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(settings?: RenderingContextSettings, unit?: LengthMetricsUnit);
}
/**
 * Draw context object for the OffscreenCanvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Draw context object for the OffscreenCanvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Draw context object for the OffscreenCanvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Draw context object for the OffscreenCanvas component.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class OffscreenCanvasRenderingContext2D extends CanvasRenderer {
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Generate a character string in the data url format.
     *
     * @param { string } type - Image format. The default value is image/png.
     * @param { any } quality - If the image format is image/jpeg or image/webp, you can select the image quality from 0 to 1.
     *    If the value is out of the range, the default value 0.92 is used.
     * @returns { string }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    toDataURL(type?: string, quality?: any): string;
    /**
     * transfer the content to ImageBitmap
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * transfer the content to ImageBitmap
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * transfer the content to ImageBitmap
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * transfer the content to ImageBitmap
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    transferToImageBitmap(): ImageBitmap;
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { number } width - the width of the OffscreenCanvas
     * @param { number } height - the height of the OffscreenCanvas
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { number } width - the width of the OffscreenCanvas
     * @param { number } height - the height of the OffscreenCanvas
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { number } width - the width of the OffscreenCanvas
     * @param { number } height - the height of the OffscreenCanvas
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { number } width - the width of the OffscreenCanvas
     * @param { number } height - the height of the OffscreenCanvas
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(width: number, height: number, settings?: RenderingContextSettings);
    /**
     * Constructor of the canvas drawing context object, which is used to create a drawing context object.
     *
     * @param { number } width - the width of the OffscreenCanvas
     * @param { number } height - the height of the OffscreenCanvas
     * @param { RenderingContextSettings } settings - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(width: number, height: number, settings?: RenderingContextSettings, unit?: LengthMetricsUnit);
}
/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 *
 * @extends CanvasRenderer
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Draw an object off the screen. The drawing content is not directly displayed on the screen.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class OffscreenCanvas {
    /**
     * Height of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Height of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Height of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Height of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    height: number;
    /**
     * Width of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Width of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Width of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Width of the off-screen canvas.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    width: number;
    /**
     * Exports rendered content as an ImageBitmap object
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Exports rendered content as an ImageBitmap object
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Exports rendered content as an ImageBitmap object
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Exports rendered content as an ImageBitmap object
     *
     * @returns { ImageBitmap }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    transferToImageBitmap(): ImageBitmap;
    /**
     * Creates the context from the current OffscreenCanvas.
     *
     * @param { "2d" } contextType - The context type, only "2d" be supported now.
     *  "2d": Creates a {@link OffscreenCanvasRenderingContext2D} object representing a two-dimensional rendering context.
     * @param { RenderingContextSettings } options - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @returns { OffscreenCanvasRenderingContext2D } The rendering context of offscreen canvas, see {@link OffscreenCanvasRenderingContext2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Creates the context from the current OffscreenCanvas.
     *
     * @param { "2d" } contextType - The context type, only "2d" be supported now.
     *  "2d": Creates a {@link OffscreenCanvasRenderingContext2D} object representing a two-dimensional rendering context.
     * @param { RenderingContextSettings } options - Drawing attribute. For details, see {@link RenderingContextSettings}.
     * @returns { OffscreenCanvasRenderingContext2D } The rendering context of offscreen canvas, see {@link OffscreenCanvasRenderingContext2D}.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    getContext(contextType: "2d", options?: RenderingContextSettings): OffscreenCanvasRenderingContext2D;
    /**
     * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
     *
     * @param { number } width - Width of the off-screen canvas.
     * @param { number } height - Height of the off-screen canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
     *
     * @param { number } width - Width of the off-screen canvas.
     * @param { number } height - Height of the off-screen canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
     *
     * @param { number } width - Width of the off-screen canvas.
     * @param { number } height - Height of the off-screen canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
     *
     * @param { number } width - Width of the off-screen canvas.
     * @param { number } height - Height of the off-screen canvas.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor(width: number, height: number);
    /**
     * Constructor of the off-screen canvas, which is used to create an off-screen canvas object.
     *
     * @param { number } width - Width of the off-screen canvas.
     * @param { number } height - Height of the off-screen canvas.
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(width: number, height: number, unit: LengthMetricsUnit);
}
/**
 * Size info.
 *
 * @interface Size
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare interface Size {
    /**
     * Defines the width property.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    width: number;
    /**
     * Defines the height property.
     *
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    height: number;
}
/**
 * Defines DrawingRenderingContext.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 12
 */
declare class DrawingRenderingContext {
    /**
     * Get size of the DrawingRenderingContext.
     *
     * @returns { Size } The size of the DrawingRenderingContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    get size(): Size;
    /**
     * Get canvas of the DrawingRenderingContext.
     *
     * @returns { DrawingCanvas } The canvas of the DrawingRenderingContext.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    get canvas(): DrawingCanvas;
    /**
     * Invalidate the component, which will cause a re-render of the component.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 12
     */
    invalidate(): void;
    /**
     * Create DrawingRenderingContext with setting LengthMetricsUnit.
     *
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(unit?: LengthMetricsUnit);
}
/**
 *TextTimer component, which provides the text timer capability.
 *
 * @interface CanvasInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 *TextTimer component, which provides the text timer capability.
 *
 * @interface CanvasInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 *TextTimer component, which provides the text timer capability.
 *
 * @interface CanvasInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 *TextTimer component, which provides the text timer capability.
 *
 * @interface CanvasInterface
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
interface CanvasInterface {
    /**
     * Construct a canvas component.
     *
     * @param { CanvasRenderingContext2D } context - Canvas context object. For details, see {@link CanvasRenderingContext2D}.
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Construct a canvas component.
     *
     * @param { CanvasRenderingContext2D } context - Canvas context object. For details, see {@link CanvasRenderingContext2D}.
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Construct a canvas component.
     *
     * @param { CanvasRenderingContext2D } context - Canvas context object. For details, see {@link CanvasRenderingContext2D}.
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Construct a canvas component.
     *
     * @param { CanvasRenderingContext2D } context - Canvas context object. For details, see {@link CanvasRenderingContext2D}.
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    /**
     * Construct a canvas component.
     *
     * @param { CanvasRenderingContext2D | DrawingRenderingContext } context - Canvas context object.
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     * @form
     */
    (context?: CanvasRenderingContext2D | DrawingRenderingContext): CanvasAttribute;
}
/**
 * Provides attribute for Canvas.
 *
 * @extends CommonMethod<CanvasAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Provides attribute for Canvas.
 *
 * @extends CommonMethod<CanvasAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Provides attribute for Canvas.
 *
 * @extends CommonMethod<CanvasAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Provides attribute for Canvas.
 *
 * @extends CommonMethod<CanvasAttribute>
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class CanvasAttribute extends CommonMethod<CanvasAttribute> {
    /**
     * Event notification after the canvas component is constructed. You can draw the canvas at this time.
     *
     * @param { function } event
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Event notification after the canvas component is constructed. You can draw the canvas at this time.
     *
     * @param { function } event
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Event notification after the canvas component is constructed. You can draw the canvas at this time.
     *
     * @param { function } event
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Event notification after the canvas component is constructed. You can draw the canvas at this time.
     *
     * @param { function } event
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    onReady(event: () => void): CanvasAttribute;
    /**
     * Enable image analyzer for Canvas.
     *
     * @param { boolean } enable
     * @returns { CanvasAttribute }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 12
     */
    enableAnalyzer(enable: boolean): CanvasAttribute;
}
/**
 * Defines Canvas Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Canvas Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Canvas Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Canvas Component.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const Canvas: CanvasInterface;
/**
 * Defines Canvas Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * Defines Canvas Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * Defines Canvas Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * Defines Canvas Component instance.
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare const CanvasInstance: CanvasAttribute;
