/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file This module is used for face compare.
 * @kit CoreVisionKit
 * */
import type image from '@ohos.multimedia.image';
/**
 * Identify and extract facial features, perform high-precision comparison on portraits,
 * and provide confidence scores to determine whether the objects are the same person.
 * @namespace faceComparator
 * @syscap SystemCapability.AI.Face.Comparator
 * @since 5.0.0(12)
 */
declare namespace faceComparator {
    /**
     * Visual configuration information, including related pictures.
     * @interface VisionInfo
     * @syscap SystemCapability.AI.Face.Comparator
     * @since 5.0.0(12)
     */
    export interface VisionInfo {
        /**
         * Image information to be identified.
         * @type {image.PixelMap}
         * @syscap SystemCapability.AI.Face.Comparator
         * @since 5.0.0(12)
         */
        readonly pixelMap: image.PixelMap;
    }
    /**
    * @Indicates The result of face compare.
    * @interface FaceCompareResult
    * @syscap SystemCapability.AI.Face.Comparator
    * @since 5.0.0(12)
    */
    export interface FaceCompareResult {
        /**
         * Determine if it's the same person
         * @type {boolean}
         * @syscap SystemCapability.AI.Face.Comparator
         * @since 5.0.0(12)
         */
        readonly isSamePerson: boolean;
        /**
         * Calculate the similarity between two faces. The value ranges from 0 to 1.
         * @type {number}
         * @syscap SystemCapability.AI.Face.Comparator
         * @since 5.0.0(12)
         */
        readonly similarity: number;
    }
    /**
     * Recognize face information contained in pictures.
     * @param { VisionInfo } visionInfo1 - The image information.
     * @param { VisionInfo } visionInfo2 - The image information.
     * @returns { Promise<FaceCompareResult> } The result of face comparison.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1008400001 - Failed to run, please try again.
     * @throws { BusinessError } 1008400002 - The service is abnormal.
     * @syscap SystemCapability.AI.Face.Comparator
     * @since 5.0.0(12)
     */
    function compareFaces(visionInfo1: VisionInfo, visionInfo2: VisionInfo): Promise<FaceCompareResult>;
}
export default faceComparator;
