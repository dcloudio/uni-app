/*
 * Copyright (c) 2022 Huawei Device Co., Ltd.
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
 * @kit LocalizationKit
 */
/**
 * Contains rawFile descriptor information.
 *
 * @interface RawFileDescriptor
 * @syscap SystemCapability.Global.ResourceManager
 * @since 8
 */
/**
 * Contains rawFile descriptor information.
 *
 * @interface RawFileDescriptor
 * @syscap SystemCapability.Global.ResourceManager
 * @atomicservice
 * @since 11
 */
/**
* Contains rawFile descriptor information.
*
* @interface RawFileDescriptor
* @syscap SystemCapability.Global.ResourceManager
* @crossplatform
* @atomicservice
* @since 12
*/
export interface RawFileDescriptor {
    /**
     * rawfile descriptor
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @since 8
     */
    /**
     * rawfile descriptor
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @atomicservice
     * @since 11
     */
    /**
     * rawfile descriptor
     *
     * @type { number }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    fd: number;
    /**
     * the offset from where the raw file starts in the HAP
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @since 8
     */
    /**
     * the offset from where the raw file starts in the HAP
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @atomicservice
     * @since 11
     */
    /**
     * the offset from where the raw file starts in the HAP
     *
     * @type { number }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    offset: number;
    /**
     * the length of the raw file in the HAP
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @since 8
     */
    /**
     * the length of the raw file in the HAP
     *
     * @syscap SystemCapability.Global.ResourceManager
     * @atomicservice
     * @since 11
     */
    /**
     * the length of the raw file in the HAP
     *
     * @type { number }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    length: number;
}
