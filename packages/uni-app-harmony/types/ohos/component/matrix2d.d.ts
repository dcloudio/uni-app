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
 * @kit ArkUI
 */
/**
 * 2D transformation matrix, supporting rotation, translation, and scaling of the X-axis and Y-axis
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 8
 */
/**
 * 2D transformation matrix, supporting rotation, translation, and scaling of the X-axis and Y-axis
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 9
 * @form
 */
/**
 * 2D transformation matrix, supporting rotation, translation, and scaling of the X-axis and Y-axis
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 * @form
 */
/**
 * 2D transformation matrix, supporting rotation, translation, and scaling of the X-axis and Y-axis
 *
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 * @form
 */
declare class Matrix2D {
    /**
     * Horizontal Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Horizontal Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Horizontal Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Horizontal Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scaleX?: number;
    /**
     * Vertical Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Vertical Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Vertical Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Vertical Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    rotateY?: number;
    /**
     * Horizontal Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Horizontal Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Horizontal Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Horizontal Tilt
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    rotateX?: number;
    /**
     * Vertical Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Vertical Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Vertical Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Vertical Zoom
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scaleY?: number;
    /**
     * Horizontal movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Horizontal movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Horizontal movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Horizontal movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    translateX?: number;
    /**
     * Vertical movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Vertical movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Vertical movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Vertical movement
     *
     * @type { ?number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    translateY?: number;
    /**
     * Transforms the current 2D matrix back to the identity matrix (i.e., without any rotational
     * translation scaling effect)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Transforms the current 2D matrix back to the identity matrix (i.e., without any rotational
     * translation scaling effect)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Transforms the current 2D matrix back to the identity matrix (i.e., without any rotational
     * translation scaling effect)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Transforms the current 2D matrix back to the identity matrix (i.e., without any rotational
     * translation scaling effect)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    identity(): Matrix2D;
    /**
     * Transform the current 2D matrix into an inverse matrix (that is, the transformation effect
     * is the opposite effect of the original)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Transform the current 2D matrix into an inverse matrix (that is, the transformation effect
     * is the opposite effect of the original)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Transform the current 2D matrix into an inverse matrix (that is, the transformation effect
     * is the opposite effect of the original)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Transform the current 2D matrix into an inverse matrix (that is, the transformation effect
     * is the opposite effect of the original)
     *
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    invert(): Matrix2D;
    /**
     * The matrix is superimposed in right multiplication mode. When the input parameter is empty,
     * the matrix is superimposed.
     *
     * @param { Matrix2D } other - Matrix to be superimposed
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * The matrix is superimposed in right multiplication mode. When the input parameter is empty,
     * the matrix is superimposed.
     *
     * @param { Matrix2D } other - Matrix to be superimposed
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @deprecated since 10
     * @form
     */
    multiply(other?: Matrix2D): Matrix2D;
    /**
     * Adds the rotation effect of the X and Y axes to the current matrix.
     *
     * @param { number } rx - Rotation effect of the X-axis
     * @param { number } ry - Rotation effect of the Y-axis
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the rotation effect of the X and Y axes to the current matrix.
     *
     * @param { number } rx - Rotation effect of the X-axis
     * @param { number } ry - Rotation effect of the Y-axis
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @deprecated since 10
     * @useinstead rotate
     * @form
     */
    rotate(rx?: number, ry?: number): Matrix2D;
    /**
     * Adds the rotation effect of the X and Y axes to the current matrix.
     *
     * @param { number } degree - The rotation angle, clockwise in radians.
     * @param { number } rx - Rotation effect of the X-axis
     * @param { number } ry - Rotation effect of the Y-axis
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the rotation effect of the X and Y axes to the current matrix.
     *
     * @param { number } degree - The rotation angle, clockwise in radians.
     * @param { number } rx - Rotation effect of the X-axis
     * @param { number } ry - Rotation effect of the Y-axis
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    rotate(degree: number, rx?: number, ry?: number): Matrix2D;
    /**
     * Adds the translation effect of the X and Y axes to the current matrix.
     *
     * @param { number } tx - X-axis translation effect
     * @param { number } ty - Y-axis translation effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the translation effect of the X and Y axes to the current matrix.
     *
     * @param { number } tx - X-axis translation effect
     * @param { number } ty - Y-axis translation effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds the translation effect of the X and Y axes to the current matrix.
     *
     * @param { number } tx - X-axis translation effect
     * @param { number } ty - Y-axis translation effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the translation effect of the X and Y axes to the current matrix.
     *
     * @param { number } tx - X-axis translation effect
     * @param { number } ty - Y-axis translation effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    translate(tx?: number, ty?: number): Matrix2D;
    /**
     * Adds the scaling effect of the X and Y axes to the current matrix.
     *
     * @param { number } sx - X-axis scaling effect
     * @param { number } sy - Y-axis scaling effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 8
     */
    /**
     * Adds the scaling effect of the X and Y axes to the current matrix.
     *
     * @param { number } sx - X-axis scaling effect
     * @param { number } sy - Y-axis scaling effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 9
     * @form
     */
    /**
     * Adds the scaling effect of the X and Y axes to the current matrix.
     *
     * @param { number } sx - X-axis scaling effect
     * @param { number } sy - Y-axis scaling effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Adds the scaling effect of the X and Y axes to the current matrix.
     *
     * @param { number } sx - X-axis scaling effect
     * @param { number } sy - Y-axis scaling effect
     * @returns { Matrix2D }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    scale(sx?: number, sy?: number): Matrix2D;
    /**
     * Constructs a 2D change matrix object. The default value is the unit matrix.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     * @form
     */
    /**
     * Constructs a 2D change matrix object. The default value is the unit matrix.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     * @form
     */
    constructor();
    /**
     * Constructs a 2D change matrix object. The default value is the unit matrix.
     *
     * @param { LengthMetricsUnit } [unit] - the unit mode
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @form
     * @since 12
     */
    constructor(unit: LengthMetricsUnit);
}
