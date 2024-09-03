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
 * @kit ArkData
 */
/**
 * Indicates possible value types
 *
 * @typedef { number | string | boolean }
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @stagemodelonly
 * @since 10
 */
/**
 * Indicates possible value types
 *
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @stagemodelonly
 * @crossplatform
 * @since 12
 */
export type ValueType = number | string | boolean;
/**
 * Values in buckets are stored in key-value pairs
 *
 * @typedef { Record<string, ValueType | Uint8Array | null> }
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @stagemodelonly
 * @since 10
 */
export type ValuesBucket = Record<string, ValueType | Uint8Array | null>;
