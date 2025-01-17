/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @file
 * @kit InputKit
 */
/**
 * InputEvent
 *
 * @interface InputEvent
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @since 9
 */
/**
 * InputEvent
 *
 * @typedef InputEvent
 * @syscap SystemCapability.MultimodalInput.Input.Core
 * @atomicservice
 * @since 12
 */
export declare interface InputEvent {
    /**
     * Unique event ID generated by the server
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * Unique event ID generated by the server
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    id: number;
    /**
     * ID of the device that reports the input event
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * ID of the device that reports the input event
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    deviceId: number;
    /**
     * Occurrence time of the input event
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * Occurrence time of the input event
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    actionTime: number;
    /**
     * ID of the target screen
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * ID of the target screen
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    screenId: number;
    /**
     * ID of the target window
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @since 9
     */
    /**
     * ID of the target window
     * @type { number }
     * @syscap SystemCapability.MultimodalInput.Input.Core
     * @atomicservice
     * @since 12
     */
    windowId: number;
}
