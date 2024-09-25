/*
* Copyright (c) 2024 Huawei Device Co., Ltd.
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
import lang from '../../arkts/@arkts.lang';
import collections from '../../arkts/@arkts.collections';
/**
 * Contains sendable resource descriptor information.
 *
 * @interface SendableResource
 * @syscap SystemCapability.Global.ResourceManager
 * @crossplatform
 * @atomicservice
 * @since 12
 */
interface SendableResource extends lang.ISendable {
    /**
     * bundle name in hap
     *
     * @type { string }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    bundleName: string;
    /**
     * module name in hap
     *
     * @type { string }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    moduleName: string;
    /**
     * resource id in hap
     *
     * @type { number }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    id: number;
    /**
     * Set params.
     *
     * @type { ?collections.Array <string | number> }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    params?: collections.Array<string | number>;
    /**
     * Set type.
     *
     * @type { ?number }
     * @syscap SystemCapability.Global.ResourceManager
     * @crossplatform
     * @atomicservice
     * @since 12
     */
    type?: number;
}
