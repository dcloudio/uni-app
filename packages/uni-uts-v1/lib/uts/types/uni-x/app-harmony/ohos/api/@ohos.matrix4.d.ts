/*
 * Copyright (c) 2020-2023 Huawei Device Co., Ltd.
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
 * Used to do matrix operations
 *
 * @namespace matrix4
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 7
 */
/**
 * Used to do matrix operations
 *
 * @namespace matrix4
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @since 10
 */
/**
 * Used to do matrix operations
 *
 * @namespace matrix4
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @crossplatform
 * @atomicservice
 * @since 11
 */
declare namespace matrix4 {
    /**
     * Set translation parameters
     *
     * @interface TranslateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set translation parameters
     *
     * @interface TranslateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set translation parameters
     *
     * @interface TranslateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface TranslateOption {
        /**
         * Indicates the translation distance of the x-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Indicates the translation distance of the x-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates the translation distance of the x-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        x?: number;
        /**
         * Indicates the translation distance of the y-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Indicates the translation distance of the y-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates the translation distance of the y-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        y?: number;
        /**
         * Indicates the translation distance of the z-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Indicates the translation distance of the z-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Indicates the translation distance of the z-axis, in px.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        z?: number;
    }
    /**
     * Set scaling parameters
     *
     * @interface ScaleOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set scaling parameters
     *
     * @interface ScaleOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set scaling parameters
     *
     * @interface ScaleOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface ScaleOption {
        /**
         * Zoom factor of the x-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Zoom factor of the x-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Zoom factor of the x-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        x?: number;
        /**
         * Zoom factor of the y-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Zoom factor of the y-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Zoom factor of the y-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        y?: number;
        /**
         * Zoom factor of the z-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Zoom factor of the z-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Zoom factor of the z-axis.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        z?: number;
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        centerX?: number;
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        centerY?: number;
    }
    /**
     * Set Rotation Parameters.
     *
     * @interface RotateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Set Rotation Parameters.
     *
     * @interface RotateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Set Rotation Parameters.
     *
     * @interface RotateOption
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface RotateOption {
        /**
         * Axis of rotation vector x coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Axis of rotation vector x coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Axis of rotation vector x coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        x?: number;
        /**
         * Axis of rotation vector y coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Axis of rotation vector y coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Axis of rotation vector y coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        y?: number;
        /**
         * Axis of rotation vector z coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Axis of rotation vector z coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Axis of rotation vector z coordinate.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        z?: number;
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Transform the x-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        centerX?: number;
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Transform the y-axis coordinate of the center point.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        centerY?: number;
        /**
         * Rotation angle.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Rotation angle.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Rotation angle.
         *
         * @type { ?number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        angle?: number;
    }
    /**
     * Set poly to poly point.
     *
     * @interface Point
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface Point {
        /**
         * Point x.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        x: number;
        /**
         * Point y.
         *
         * @type { number }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        y: number;
    }
    /**
     * Set poly to poly point options.
     *
     * @interface PolyToPolyOptions
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    export interface PolyToPolyOptions {
        /**
         * Array of point coordinates for the source polygon.
         *
         * @type { Array<Point> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        src: Array<Point>;
        /**
         * Start point index of the source polygon, which defaults to 0.
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        srcIndex?: number;
        /**
         * Array of point coordinates for the target polygon.
         *
         * @type { Array<Point> }
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        dst: Array<Point>;
        /**
         * Start index of the target polygon, which defaults to 0.
         *
         * @type { ?number }
         * @default src.Length/2
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        dstIndex?: number;
        /**
         * The number of points to be used.
         * If it is 0, it returns the identity matrix.
         * If it is 1, it returns a translation matrix that changed before two points.
         * If it is 2-4, it returns a transformation matrix.
         * @type { ?number }
         * @default 0
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        pointCount?: number;
    }
    /**
     * Matrix4Transit.
     *
     * @interface Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Matrix4Transit.
     *
     * @interface Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Matrix4Transit.
     *
     * @interface Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    interface Matrix4Transit {
        /**
         * Copy function of Matrix, which can copy a copy of the current matrix object.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Copy function of Matrix, which can copy a copy of the current matrix object.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Copy function of Matrix, which can copy a copy of the current matrix object.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        copy(): Matrix4Transit;
        /**
         * The inverse function of Matrix returns an inverse matrix of the current matrix object, that is, the effect is exactly the opposite.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * The inverse function of Matrix returns an inverse matrix of the current matrix object, that is, the effect is exactly the opposite.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * The inverse function of Matrix returns an inverse matrix of the current matrix object, that is, the effect is exactly the opposite.
         *
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        invert(): Matrix4Transit;
        /**
         * Matrix superposition function, which can superpose the effects of two matrices to generate a new matrix object.
         *
         * @param { Matrix4Transit } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Matrix superposition function, which can superpose the effects of two matrices to generate a new matrix object.
         *
         * @param { Matrix4Transit } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Matrix superposition function, which can superpose the effects of two matrices to generate a new matrix object.
         *
         * @param { Matrix4Transit } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        combine(options: Matrix4Transit): Matrix4Transit;
        /**
         * Matrix translation function, which can add the x-axis, Y-axis, or Z-axis translation effect to the current matrix.
         *
         * @param { TranslateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Matrix translation function, which can add the x-axis, Y-axis, or Z-axis translation effect to the current matrix.
         *
         * @param { TranslateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Matrix translation function, which can add the x-axis, Y-axis, or Z-axis translation effect to the current matrix.
         *
         * @param { TranslateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        translate(options: TranslateOption): Matrix4Transit;
        /**
         * Scaling function of the Matrix, which can add the x-axis, Y-axis, or Z-axis scaling effect to the current matrix.
         *
         * @param { ScaleOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Scaling function of the Matrix, which can add the x-axis, Y-axis, or Z-axis scaling effect to the current matrix.
         *
         * @param { ScaleOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Scaling function of the Matrix, which can add the x-axis, Y-axis, or Z-axis scaling effect to the current matrix.
         *
         * @param { ScaleOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        scale(options: ScaleOption): Matrix4Transit;
        /**
         * Skew function of the Matrix, which can add the x-axis, y-axis skew effect to the current matrix.
         * Skew function takes a generic point with coordinates (x0, y0, z0) to the point (x0 + x*y0, y0 + y*x0, z0),
         * where x, y are fixed parameters, called the shear factors.
         *
         * @param { number } x - the shear factor of x-axis.
         * @param { number } y - the shear factor of y-axis.
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        skew(x: number, y: number): Matrix4Transit;
        /**
         * Rotation function of the Matrix. You can add the x-axis, Y-axis, or Z-axis rotation effect to the current matrix.
         *
         * @param { RotateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Rotation function of the Matrix. You can add the x-axis, Y-axis, or Z-axis rotation effect to the current matrix.
         *
         * @param { RotateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Rotation function of the Matrix. You can add the x-axis, Y-axis, or Z-axis rotation effect to the current matrix.
         *
         * @param { RotateOption } options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        rotate(options: RotateOption): Matrix4Transit;
        /**
         * Matrix coordinate point conversion function, which can apply the current transformation effect to a coordinate point.
         *
         * @param { [number, number] } options
         * @returns { [number, number] } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @since 7
         */
        /**
         * Matrix coordinate point conversion function, which can apply the current transformation effect to a coordinate point.
         *
         * @param { [number, number] } options
         * @returns { [number, number] } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @since 10
         */
        /**
         * Matrix coordinate point conversion function, which can apply the current transformation effect to a coordinate point.
         *
         * @param { [number, number] } options
         * @returns { [number, number] } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 11
         */
        transformPoint(options: [
            number,
            number
        ]): [
            number,
            number
        ];
        /**
         * Sets matrix to map src to dst.
         *
         * @param { PolyToPolyOptions } options - polyToPoly options
         * @returns { Matrix4Transit } Return to Matrix4Transit
         * @syscap SystemCapability.ArkUI.ArkUI.Full
         * @crossplatform
         * @atomicservice
         * @since 12
         */
        setPolyToPoly(options: PolyToPolyOptions): Matrix4Transit;
    }
    /**
     * Constructor of Matrix, which can create a fourth-order matrix based on the input parameters. The matrix is column-first.
     *
     * @param { [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number] } options
     * options indicates a fourth-order matrix
     * The default value：
     * [1, 0, 0, 0,
     * 0, 1, 0, 0,
     * 0, 0, 1, 0,
     * 0, 0, 0, 1]
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Constructor of Matrix, which can create a fourth-order matrix based on the input parameters. The matrix is column-first.
     *
     * @param { [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number] } options
     * options indicates a fourth-order matrix
     * The default value：
     * [1, 0, 0, 0,
     * 0, 1, 0, 0,
     * 0, 0, 1, 0,
     * 0, 0, 0, 1]
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Constructor of Matrix, which can create a fourth-order matrix based on the input parameters. The matrix is column-first.
     *
     * @param { [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number] } options
     * options indicates a fourth-order matrix
     * The default value：
     * [1, 0, 0, 0,
     * 0, 1, 0, 0,
     * 0, 0, 1, 0,
     * 0, 0, 0, 1]
     * Fourth-order matrix notes:
     * m00 { number } -The x-axis scale value, the identity matrix defaults to 1.
     * m01 { number } -The second value, the rotation of the xyz axis affects this value.
     * m02 { number } -The third value, the rotation of the xyz axis affects this value.
     * m03 { number } -Meaningless.
     * m10 { number } -The fifth value, the rotation of the xyz axis affects this value.
     * m11 { number } -The y-axis scales the value, and the identity matrix defaults to 1.
     * m12 { number } -The 7th value, the rotation of the xyz axis affects this value.
     * m13 { number } -Meaningless.
     * m20 { number } -The 9th value, the rotation of the xyz axis affects this value.
     * m21 { number } -The 10th value, xyz axis rotation affects this value.
     * m22 { number } -The z-axis scale value, the identity matrix defaults to 1.
     * m23 { number } -Meaningless.
     * m30 { number } -The x-axis translation value in px, the identity matrix defaults to 0.
     * m31 { number } -Y-axis translation value, in px, the identity matrix defaults to 0.
     * m32 { number } -The z-axis translation value in px, the identity matrix defaults to 0.
     * m33 { number } -It takes effect in homogeneous coordinates to produce a perspective projection effect.
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    /**
     * Constructor of Matrix, which can create a fourth-order matrix based on the input parameters. The matrix is column-first.
     *
     * @param { [number,number,number,number,number,number,number,number,number,number,number,number,number,number,number,number] } options
     * options indicates a fourth-order matrix
     * The default value：
     * [1, 0, 0, 0,
     * 0, 1, 0, 0,
     * 0, 0, 1, 0,
     * 0, 0, 0, 1]
     * Fourth-order matrix notes:
     * m00 { number } -The x-axis scale value, the identity matrix defaults to 1.
     * m01 { number } -The second value, the rotation and skew of the xyz axis affects this value.
     * m02 { number } -The third value, the rotation of the xyz axis affects this value.
     * m03 { number } -The fourth value, the perspective projection affects this value.
     * m10 { number } -The fifth value, the rotation and skew of the xyz axis affects this value.
     * m11 { number } -The y-axis scales the value, and the identity matrix defaults to 1.
     * m12 { number } -The 7th value, the rotation of the xyz axis affects this value.
     * m13 { number } -The 8th value, the perspective projection affects this value.
     * m20 { number } -The 9th value, the rotation of the xyz axis affects this value.
     * m21 { number } -The 10th value, xyz axis rotation affects this value.
     * m22 { number } -The z-axis scale value, the identity matrix defaults to 1.
     * m23 { number } -The 12th value, the perspective projection affects this value.
     * m30 { number } -The x-axis translation value in px, the identity matrix defaults to 0.
     * m31 { number } -Y-axis translation value, in px, the identity matrix defaults to 0.
     * m32 { number } -The z-axis translation value in px, the identity matrix defaults to 0.
     * m33 { number } -It takes effect in homogeneous coordinates to produce a perspective projection effect.
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    function init(options: [
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
    ]): Matrix4Transit;
    /**
     * Matrix initialization function, which can return an identity matrix object.
     *
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     */
    /**
     * Matrix initialization function, which can return an identity matrix object.
     *
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @since 10
     */
    /**
     * Matrix initialization function, which can return an identity matrix object.
     *
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @crossplatform
     * @atomicservice
     * @since 11
     */
    function identity(): Matrix4Transit;
    /**
     * Copy function of Matrix, which can copy a copy of the current matrix object.
     *
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function copy(): Matrix4Transit;
    /**
     * The inverse function of Matrix returns an inverse matrix of the current matrix object, that is, the effect is exactly the opposite.
     *
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function invert(): Matrix4Transit;
    /**
     * Matrix superposition function, which can superpose the effects of two matrices to generate a new matrix object.
     *
     * @param { Matrix4Transit } options
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function combine(options: Matrix4Transit): Matrix4Transit;
    /**
     * Matrix translation function, which can add the x-axis, Y-axis, or Z-axis translation effect to the current matrix.
     *
     * @param { TranslateOption } options
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function translate(options: TranslateOption): Matrix4Transit;
    /**
     * Scaling function of the Matrix, which can add the x-axis, Y-axis, or Z-axis scaling effect to the current matrix.
     *
     * @param { ScaleOption } options
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function scale(options: ScaleOption): Matrix4Transit;
    /**
     * Rotation function of the Matrix. You can add the x-axis, Y-axis, or Z-axis rotation effect to the current matrix.
     *
     * @param { RotateOption } options
     * @returns { Matrix4Transit } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function rotate(options: RotateOption): Matrix4Transit;
    /**
     * Matrix coordinate point conversion function, which can apply the current transformation effect to a coordinate point.
     *
     * @param { [number, number] } options
     * @returns { [number, number] } Return to Matrix4Transit
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 7
     * @deprecated since 10
     */
    function transformPoint(options: [
        number,
        number
    ]): [
        number,
        number
    ];
}
export default matrix4;
