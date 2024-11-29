/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2024-2024. All rights reserved.
 */
/**
 * @file This module provides the vision base capabilities.
 * @kit CoreVisionKit
 */
import visionBase from '@hms.ai.vision.visionBase';
/**
 * Provides the ability to detect multiple object frames
 * @namespace objectDetection
 * @syscap SystemCapability.AI.Vision.ObjectDetection
 * @since 5.0.0(12)
 */
declare namespace objectDetection {
    /**
     * Describe the result of Object
     * @interface VisionObject
     * @syscap SystemCapability.AI.Vision.ObjectDetection
     * @since 5.0.0(12)
     */
    interface VisionObject {
        /**
         * Bounding box of the vision object.
         * @type { visionBase.BoundingBox }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        boundingBox: visionBase.BoundingBox;
        /**
         * Score of the vision object.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        score: number;
        /**
         * Labels of the vision object.
         * 0: Sceen, 1: Animal, 2: Plant, 3: Building, 4: Tree, 5: PersonFace, 6: Table, 7: Text 8: PersonHead,
         * 9: Cathead, 10: Doghead, 13: Person.
         * @type { Array<number> }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        labels: Array<number>;
        /**
         * Unique identifiers for vision objects. IDs start from 0.
         * @type { number }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        id: number;
    }
    /**
     * Class representing the response of object detection.
     * @extends visionBase.Response
     * @syscap SystemCapability.AI.Vision.ObjectDetection
     * @since 5.0.0(12)
     */
    class ObjectDetectionResponse extends visionBase.Response {
        /**
         * Detection result data.
         * @type { Array<VisionObject> }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        objects: Array<VisionObject>;
    }
    /**
     * Class representing the object detector engine.
     * @extends visionBase.Analyzer
     * @syscap SystemCapability.AI.Vision.ObjectDetection
     * @since 5.0.0(12)
     */
    class ObjectDetector extends visionBase.Analyzer {
        /**
         * The ObjectDetector constructor is private and cannot be instantiated directly.
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        private constructor();
        /**
         * Creates an instance of ObjectDetector.
         * @returns { Promise<ObjectDetector> } - The engine of object detection.
         * @throws { BusinessError } 1011000001 - The service is abnormal.
         * @throws { BusinessError } 1011000002 - Failed to initialize the model. Please try again later.
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        static create(): Promise<ObjectDetector>;
        /**
         * Process the object detection requests. Supports single-task processing only, does not support batch task processing.
         * @param { visionBase.Request } request - The object detection request, contains information of the image.
         * @returns { Promise<ObjectDetectionResponse> } - The result of object detection.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @throws { BusinessError } 1011000001 - The service is abnormal.
         * @throws { BusinessError } 1011000003 - Failed to run the model, please try again.
         * @throws { BusinessError } 1011000004 - Running the model timed out. Try again later.
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        process(request: visionBase.Request): Promise<ObjectDetectionResponse>;
        /**
         * Release the vision base analyzer service.
         * @returns { Promise<void> }
         * @syscap SystemCapability.AI.Vision.ObjectDetection
         * @since 5.0.0(12)
         */
        destroy(): Promise<void>;
    }
}
export default objectDetection;
