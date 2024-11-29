/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides the vision base capabilities.
 * @kit CoreVisionKit
 */
import type image from '@ohos.multimedia.image';
/**
 * Vision base
 * @namespace visionBase
 * @syscap SystemCapability.AI.Vision.VisionBase
 * @since 5.0.0(12)
 */
declare namespace visionBase {
    /**
     * Scene mode, which is used to indicate the business scene mode corresponding to the request,
     * and the engine service side will set the task priority based on this mode.
     * @enum { number }
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    enum SceneMode {
        /**
         * Foreground entity(default).
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        FOREGROUND = 1,
        /**
         * Background entity.
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        BACKGROUND = 2
    }
    /**
     * Class representing the packaged visual data.
     * @typedef ImageData
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface ImageData {
        /**
         * PixelMap of the image data.
         * @type { image.PixelMap }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        pixelMap: image.PixelMap;
    }
    /**
     * Type of input data
     * @typedef { ImageData | ImageData[] }
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    type InputData = ImageData | ImageData[];
    /**
     * Describe the position and size of the rectangle
     * @interface BoundingBox
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface BoundingBox {
        /**
         * Indicates the horizontal coordinate of the upper left corner of the object.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the object.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * Width of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * Height of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * Indicates the position of the pixel point
     * @interface Point
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface Point {
        /**
         * Horizontal coordinates of pixel point.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        x: number;
        /**
         * Vertical coordinates of pixel point.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        y: number;
    }
    /**
     * Describe the orientation in three-dimensional space.
     * @interface Orientation
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    interface Orientation {
        /**
         * Head-shaped yaw, rotating the object around the Y axis (localRotationY)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        yaw: number;
        /**
         * Head-shaped pitch, rotating the object around the X axis (localRotationX)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        pitch: number;
        /**
         * Head-shaped roll, rotating the object around the Z axis (localRotationZ)
         * @type { number }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        roll: number;
    }
    /**
     * Base class to request model ability.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Request {
        /**
         * Input image, supports one-time calculations, cannot be used to carry data for multiple tasks.
         * @type { InputData }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        inputData: InputData;
        /**
         * Request scene
         * @type { ?SceneMode }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        scene?: SceneMode;
        /**
         * Request Id defined by developers to track the request.
         * @type { ?string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        requestId?: string;
    }
    /**
     * Response Base Class, serving as the return result for capability requests.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Response {
        /**
         * Request Id defined by developers to track the request. One-to-one correspondence with VisionBaseRequest.
         * @type { ?string }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        requestId?: string;
    }
    /**
     * Analyzer Base Class, serving as the ability engine.
     * @syscap SystemCapability.AI.Vision.VisionBase
     * @since 5.0.0(12)
     */
    class Analyzer {
        /**
         * Release the vision base analyzer service.
         * @returns { Promise<void> }
         * @syscap SystemCapability.AI.Vision.VisionBase
         * @since 5.0.0(12)
         */
        destroy(): Promise<void>;
    }
}
export default visionBase;
