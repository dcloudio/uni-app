/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides the vision base capabilities.
 * @kit CoreVisionKit
 */
import visionBase from '@hms.ai.vision.visionBase';
/**
 * Provides the ability to detect skeletal points
 * @namespace skeletonDetection
 * @syscap SystemCapability.AI.Vision.SkeletonDetection
 * @since 5.0.0(12)
 */
declare namespace skeletonDetection {
    /**
     * skeleton point type
     * @enum { number }
     * @syscap SystemCapability.AI.Vision.SkeletonDetection
     * @since 5.0.0(12)
     */
    enum SkeletonPointType {
        /**
         * Nose
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        NOSE = 0,
        /**
         * Left eye
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_EYE = 1,
        /**
         * Right eye
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_EYE = 2,
        /**
         * Left ear
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_EAR = 3,
        /**
         * Right ear
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_EAR = 4,
        /**
         * Left shoulder
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_SHOULDER = 5,
        /**
         * Right shoulder
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_SHOULDER = 6,
        /**
         * Left elbow
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_ELBOW = 7,
        /**
         * Right elbow
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_ELBOW = 8,
        /**
         * Left wrist
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_WRIST = 9,
        /**
         * Right wrist
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_WRIST = 10,
        /**
         * Left hip
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_HIP = 11,
        /**
         * Right hip
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_HIP = 12,
        /**
         * Left knee
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_KNEE = 13,
        /**
         * Right knee
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_KNEE = 14,
        /**
         * Left ankle
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        LEFT_ANKLE = 15,
        /**
         * Right ankle
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        RIGHT_ANKLE = 16
    }
    /**
     * Describe the point of Skeleton
     * @interface SkeletonPoint
     * @syscap SystemCapability.AI.Vision.SkeletonDetection
     * @since 5.0.0(12)
     */
    interface SkeletonPoint {
        /**
         * Score of the skeleton.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        score: number;
        /**
         * Point of the skeleton.
         * @type { visionBase.Point }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        point: visionBase.Point;
        /**
         * Skeleton type of the skeleton.
         * @type { SkeletonPointType }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        type: SkeletonPointType;
    }
    /**
     * Describe the point of Skeleton
     * @interface Skeleton
     * @syscap SystemCapability.AI.Vision.SkeletonDetection
     * @since 5.0.0(12)
     */
    interface Skeleton {
        /**
         * Bounding box of the skeletons.
         * @type { visionBase.BoundingBox }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        boundingBox: visionBase.BoundingBox;
        /**
         * Score of the skeletons.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        score: number;
        /**
         * Skeleton points of the human body.
         * @type { Array<SkeletonPoint> }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        points: Array<SkeletonPoint>;
    }
    /**
     * Skeleton Detection Response Class.
     * @class
     * @extends visionBase.Response
     * @syscap SystemCapability.AI.Vision.SkeletonDetection
     * @since 5.0.0(12)
     */
    class SkeletonDetectionResponse extends visionBase.Response {
        /**
         * Skeletons.
         * @type { Array<Skeleton> }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        skeletons: Array<Skeleton>;
    }
    /**
     * Class representing the skeleton detector engine.
     * @extends visionBase.Analyzer
     * @syscap SystemCapability.AI.Vision.SkeletonDetection
     * @since 5.0.0(12)
     */
    class SkeletonDetector extends visionBase.Analyzer {
        /**
         * The SkeletonDetector constructor is private and cannot be instantiated directly.
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        private constructor();
        /**
         * Creates an instance of SkeletonDetector.
         * @returns { Promise<SkeletonDetector> } - The engine of skeleton detection.
         * @throws { BusinessError } 1011000001 - The service is abnormal.
         * @throws { BusinessError } 1011000002 - Failed to initialize the model. Please try again later.
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        static create(): Promise<SkeletonDetector>;
        /**
         * Process the skeleton detection requests. Supports single-task processing only, does not support batch task processing.
         * @param { visionBase.Request } request - The skeleton detection request, contains information of the image.
         * @returns { Promise<SkeletonDetectionResponse> } - The result of skeleton detection.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1011000001 - The service is abnormal.
         * @throws { BusinessError } 1011000003 - Failed to run the model, please try again.
         * @throws { BusinessError } 1011000004 - Running the model timed out. Try again later.
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        process(request: visionBase.Request): Promise<SkeletonDetectionResponse>;
        /**
         * Release the vision base analyzer service.
         * @returns { Promise<void> }
         * @syscap SystemCapability.AI.Vision.SkeletonDetection
         * @since 5.0.0(12)
         */
        destroy(): Promise<void>;
    }
}
export default skeletonDetection;
