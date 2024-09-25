/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module is used for face detection.
 * @kit CoreVisionKit
 * */
import type image from '@ohos.multimedia.image';
/**
 * This module is used for face detection. Specifically, it identifies multiple faces in a picture,
 * return the number of faces, direction of each face, rectangular box of the face, and coordinates of the facial features.
 * @namespace faceDetector
 * @syscap SystemCapability.AI.Face.Detector
 * @since 5.0.0(12)
 */
declare namespace faceDetector {
    export interface VisionInfo {
        /**
         * Image information to be identified.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly pixelMap: image.PixelMap;
    }
    /**
     * Indicates the position of the pixel point
     * @interface Point
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    export interface FacePoint {
        /**
         * Horizontal coordinates of pixel point.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly x: number;
        /**
         * The vertical coordinate of the pixel point
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly y: number;
    }
    /**
     * Describe the orientation of a face in three-dimensional space.
     * @interface FacePose
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    export interface FacePose {
        /**
         * Head-shaped yaw, rotating the object around the Y axis (localRotationY)
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly yaw: number;
        /**
         * Head-shaped pitch, rotating the object around the X axis (localRotationX)
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly pitch: number;
        /**
         * Head-shaped roll, rotating the object around the Z axis (localRotationZ)
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly roll: number;
    }
    /**
     * Describe the position and size of the face rectangle
     * @interface FaceRectangle
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    export interface FaceRectangle {
        /**
         * Indicates the horizontal coordinate of the upper left corner of the face rectangle.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the face rectangle.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly top: number;
        /**
         * width of the face rectangle.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly width: number;
        /**
         * height of the face rectangle.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly height: number;
    }
    /**
     * The result information of face recognition, including face number, coordinate information, and face
     * detection results.
     * @interface Face
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    export interface Face {
        /**
         * An array of numbers that represents the face detection results. The value range of each element
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly probability: number;
        /**
         *  detail for FacePose.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly pose: FacePose;
        /**
         *  detail for FaceRectangle.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly rect: FaceRectangle;
        /**
         *  detail for FacePoint.
         * @syscap SystemCapability.AI.Face.Detector
         * @since 5.0.0(12)
         */
        readonly points: Array<FacePoint>;
    }
    /**
     * Recognize face information contained in pictures.
     * @param { VisionInfo } visionInfo - The image information.
     * @returns { Promise<Array<Face>> } The result of face recognition.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1008800001 - Failed to run, please try again.
     * @throws { BusinessError } 1008800002 - The service is abnormal.
     * @syscap SystemCapability.AI.Face.Detector
     * @since 5.0.0(12)
     */
    function detect(visionInfo: VisionInfo): Promise<Array<Face>>;
}
export default faceDetector;
