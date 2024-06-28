/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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
 * @kit ArkData
 */

import commonType from './@ohos.data.commonType';
/**
 * Provides methods for cloud capabilities.
 *
 * @namespace cloudData
 * @syscap SystemCapability.DistributedDataManager.CloudSync.Config
 * @since 10
 */
declare namespace cloudData {
    /**
     * Enumerates the strategy types of cloud sync.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
     * @since 12
     */
    enum StrategyType {
        /**
         * Sync via the network.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        NETWORK
    }
    /**
     * Enumerates the types of cloud sync via the network.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
     * @since 12
     */
    enum NetWorkStrategy {
        /**
         * Sync using WiFi.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        WIFI = 1,
        /**
         * Sync using the cellular network.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        CELLULAR = 2
    }
    /**
     * Sets cloud strategy.
     *
     * @param { StrategyType } strategy - Indicates the strategy type of the cloud sync.
     * @param { Array<commonType.ValueType> } param - Indicates specific strategy of the cloud sync.
     * @returns { Promise<void> } Promise used to return the result.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types;
       * 3. Parameter verification failed.
     * @throws { BusinessError } 801 - Capability not supported.
     * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
     * @since 12
     */
    function setCloudStrategy(strategy: StrategyType, param?: Array<commonType.ValueType>): Promise<void>;
}
export default cloudData;
