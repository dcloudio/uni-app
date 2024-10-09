/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module is used for image segmentation.
 * @kit CoreVisionKit
 * */
import type image from '@ohos.multimedia.image';
/**
 * This module is used for intelligent image segmentation in a photo.
 * The return consists of two parts,fullSubject (mandatory) and subjectDetails (optional).
 * @namespace subjectSegmentation
 * @syscap SystemCapability.AI.Vision.SubjectSegmentation
 * @since 5.0.0(12)
 */
declare namespace subjectSegmentation {
    /**
     * Visual configuration information, including related content such as pictures or video frame to be recognized.
     * @interface VisionInfo
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface VisionInfo {
        /**
         * Image information to be identified.
         * @type { image.PixelMap }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        pixelMap: image.PixelMap;
    }
    /**
     * Describe the position and size of the rectangle.
     * @interface Rectangle
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface Rectangle {
        /**
         * Indicates the horizontal coordinate of the upper left corner of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * width of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * height of the object rectangle.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * @interface SegmentationConfig
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface SegmentationConfig {
        /**
         * The Optional maxCount: maximum number of output subjects. default 6, max 20.
         * @type { ?number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        maxCount?: number;
        /**
         * Whether eachSubject information needed.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        enableSubjectDetails?: boolean;
        /**
         * Whether foregroundImage needed.
         * @type { ?boolean }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        enableSubjectForegroundImage?: boolean;
    }
    /**
     * @interface SubjectResult
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface SubjectResult {
        /**
         * Indicates the foreground image.
         * @type { image.PixelMap }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        foregroundImage: image.PixelMap;
        /**
         * Indicates the maskList.
         * @type { Int32Array }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        mattingList: Int32Array;
        /**
         * Indicates the bounding box of subject body.
         * @type { Rectangle }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        subjectRectangle: Rectangle;
    }
    /**
     * Indicates the result of segment method.
     * @interface SegmentationResult
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface SegmentationResult {
        /**
         * Indicates the number of objects in the image.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        subjectCount: number;
        /**
         * Indicates all subjects information.
         * @type { SubjectResult }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        fullSubject: SubjectResult;
        /**
         * Indicates each subject information.
         * @type { ?Array<SubjectResult> }
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        subjectDetails?: Array<SubjectResult>;
    }
    /**
     * Get the image segment result.
     * @param { VisionInfo } visionInfo - The image information to be divided.
     * @param { SegmentationConfig } config - Configuration information of the image to be segmented.
     * @returns { Promise<SegmentationResult> }
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1011000001 - Failed to run, please try again.
     * @throws { BusinessError } 1011000002 - The service is abnormal.
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    function doSegmentation(visionInfo: VisionInfo, config?: SegmentationConfig): Promise<SegmentationResult>;
    /**
     * Init the segmentation service.
     * @returns { Promise<boolean> }
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    function init(): Promise<boolean>;
    /**
     * Release the segmentation service.
     * @returns { Promise<void> }
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    function release(): Promise<void>;
}
export default subjectSegmentation;
