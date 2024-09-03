/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit CoreFileKit
 */
import { AsyncCallback } from './@ohos.base';
/**
 * Provides filesystem statistics APIs.
 *
 * @namespace storageStatistics
 * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
 * @since 8
 */
declare namespace storageStatistics {
    /**
     * Get the bundle statistics.
     *
     * @interface BundleStats
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @since 9
     */
    export interface BundleStats {
        /**
         * The size of application installation data.
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
         * @since 9
         */
        appSize: number;
        /**
         * The size of application cache data.
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
         * @since 9
         */
        cacheSize: number;
        /**
         * The size of application local data, distributed data and database data.
         *
         * @type { number }
         * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
         * @since 9
         */
        dataSize: number;
    }
    /**
     * Get the current bundle statistics.
     *
     * @param { AsyncCallback<BundleStats> } callback - callback
     * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:Mandatory
  parameters are left unspecified;
     * @throws { BusinessError } 13600001 - IPC error.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @since 9
     */
    function getCurrentBundleStats(callback: AsyncCallback<BundleStats>): void;
    /**
     * Get the current bundle statistics.
     *
     * @returns { Promise<BundleStats> } return Promise
     * @throws { BusinessError } 401 - The input parameter is invalid.Possible causes:Mandatory
  parameters are left unspecified;
     * @throws { BusinessError } 13600001 - IPC error.
     * @throws { BusinessError } 13900042 - Unknown error.
     * @syscap SystemCapability.FileManagement.StorageService.SpatialStatistics
     * @since 9
     */
    function getCurrentBundleStats(): Promise<BundleStats>;
}
export default storageStatistics;
