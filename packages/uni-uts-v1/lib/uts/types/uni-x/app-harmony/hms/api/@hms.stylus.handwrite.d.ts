/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file Provide auxiliary handwrite ability
 * @bundle com.huawei.hmos.hwstylusfeature/Penkit/ets/hsp/HandwritePaint 5.0.0(12)
 * @kit Penkit
 */
import { Callback } from '@ohos.base';
/**
 * Provide instant shape ability to draw standard shapes. This ability will recognize shapes from the original handwriting input event.
 * The shape recognition will be triggered when the input event paused for some time.
 *
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
export class InstantShapeGenerator {
    /**
     * Pass touch event to do recognition. This function must be called inside the Component's onTouch callback handler.
     *
     * @param {TouchEvent} event - Indicates the touch event received from the Component's onTouch callback handler.
     * @returns {void}
     * @throws { BusinessError } 1010410001 - internal recognition engine has been released.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    processTouchEvent(event: TouchEvent): void;
    /**
     * Extract shape information from given shape string and generate Path2D object with that information.
     * This method can convert string to a Path2D object, can be called after loading handwriting content(e.g. shape string) from file.
     *
     * @param {string} shapeString - Indicates shape information string.
     * @param {number} penSize - Indicates pen size to draw the result shape. Some of the shape results vary according to this value such as the arrow.
     * @returns {Path2D} - A Path2D object contains all the shape information and can be drawn directly.
     * @throws { BusinessError } 1010410001 - internal recognition engine has been released.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    getPathFromString(shapeString: string, penSize: number): Path2D;
    /**
    * Notify component size change. The size of the shape(e.g. radius of circle) varys according to the component size.
    *
    * @param {number} width - Indicates new component width.
    * @param {number} height - Indicates new component height.
    * @returns {void}
    * @throws { BusinessError } 1010410001 - internal recognition engine has been released.
    * @syscap SystemCapability.Stylus.Handwrite
    * @stagemodelonly
    * @atomicservice
    * @since 5.0.0(12)
    */
    notifyAreaChange(width: number, height: number): void;
    /**
     * Set pause time to trigger recognition. The unit of pause time is millisecond.
     *
     * @param {number} time - Indicates target pause time.
     * @returns {void}
     * @throws { BusinessError } 1010410001 - internal recognition engine has been released.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    setPauseTime(time: number): void;
    /**
     * Release resource to free memory.
     *
     * @returns {void}
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    release(): void;
    /**
     * Register a callback to handle shape result.
     *
     * @param {Callback<ShapeInfo>} callback - Callback invoded to return shape result.
     * @returns {InstantShapeGenerator} - Returns current instance.
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    onShapeRecognized(callback: Callback<ShapeInfo>): InstantShapeGenerator;
}
/**
 * Defines the standard shape result.
 *
 * @typedef ShapeInfo
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
export interface ShapeInfo {
    /**
    * Path2D object of the shape.
    *
    * @type {Path2D}
    * @syscap SystemCapability.Stylus.Handwrite
    * @stagemodelonly
    * @atomicservice
    * @since 5.0.0(12)
    */
    shapePath: Path2D;
    /**
    * Shape information, can be saved to file.
    *
    * @type {string}
    * @syscap SystemCapability.Stylus.Handwrite
    * @stagemodelonly
    * @atomicservice
    * @since 5.0.0(12)
    */
    shapeString: string;
    /**
     * Shape type.
     *
     * @type {number}
     * @syscap SystemCapability.Stylus.Handwrite
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    shapeType: number;
}
/**
 * Provide point prediction ability based on the input touch event and historical event.
 *
 * @syscap SystemCapability.Stylus.Handwrite
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
export class PointPredictor {
    /**
    * Get prediction point according to the given input touch event.
    *
    * @param {TouchEvent} event - Indicates the touch event received by component.
    * @returns {TouchPoint} - Returns prediction point.
    * @syscap SystemCapability.Stylus.Handwrite
    * @stagemodelonly
    * @atomicservice
    * @since 5.0.0(12)
    */
    getPredictionPoint(event: TouchEvent): TouchPoint;
}
