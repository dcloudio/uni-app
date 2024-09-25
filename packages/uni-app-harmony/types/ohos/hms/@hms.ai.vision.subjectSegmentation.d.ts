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
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        left: number;
        /**
         * Indicates the vertical coordinate of the upper left corner of the object rectangle.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        top: number;
        /**
         * width of the object rectangle.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        width: number;
        /**
         * height of the object rectangle.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        height: number;
    }
    /**
     * @Indicates the config of segmentation.
     * @interface SegmentationConfig
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface SegmentationConfig {
        /**
         * The Optional maxCount: maximum number of output subjects. default 6, max 20.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        maxCount?: number;
        /**
         * Whether eachSubject information needed.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        enableSubjectDetails?: boolean;
        /**
         * Whether foregroundImage needed.
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         * @since 5.0.0(12)
         */
        enableSubjectForegroundImage?: boolean;
    }
    /**
     * @Indicates the result of EachSubjectResult ability.
     * @interface SubjectResult
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    export interface SubjectResult {
        /**
         * Indicates the foreground image.
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         */
        foregroundImage: image.PixelMap;
        /**
         * Indicates the maskList.
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         */
        mattingList: Int32Array;
        /**
         * Indicates the bounding box of subject body.
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
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
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         */
        subjectCount: number;
        /**
         * Indicates all subjects information.
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         */
        fullSubject: SubjectResult;
        /**
         * Indicates each subject information.
         * @since 5.0.0(12)
         * @syscap SystemCapability.AI.Vision.SubjectSegmentation
         */
        subjectDetails?: Array<SubjectResult>;
    }
    /**
     * Get the image segment result.
     * @param { VisionInfo } visionInfo - The image information to be divided.
     * @param { SegmentationConfig } config - Configuration information of the image to be segmented.
     * @throws { BusinessError } 200 - Run timed out, please try again later.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1011000001 - Failed to run, please try again.
     * @throws { BusinessError } 1011000002 - The service is abnormal.
     * @syscap SystemCapability.AI.Vision.SubjectSegmentation
     * @since 5.0.0(12)
     */
    function doSegmentation(visionInfo: VisionInfo, config?: SegmentationConfig): Promise<SegmentationResult>;
}
export default subjectSegmentation;
