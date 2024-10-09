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
import { AsyncCallback, Callback } from './@ohos.base';
import Context from './application/BaseContext';
/**
 * Provides methods for rdbStore create and delete.
 *
 * @namespace relationalStore
 * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
 * @since 9
 */
/**
 * Provides methods for rdbStore create and delete.
 *
 * @namespace relationalStore
 * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
 * @crossplatform
 * @since 10
 */
declare namespace relationalStore {
    /**
     * Describes the status of asset
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    enum AssetStatus {
        /**
         * ASSET_NORMAL: means the status of asset is normal.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_NORMAL,
        /**
         * ASSET_ABNORMAL: means the asset needs to be inserted.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_INSERT,
        /**
         * ASSET_ABNORMAL: means the asset needs to be updated.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_UPDATE,
        /**
         * ASSET_ABNORMAL: means the asset needs to be deleted.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_DELETE,
        /**
         * ASSET_ABNORMAL: means the status of asset is abnormal.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_ABNORMAL,
        /**
         * ASSET_DOWNLOADING: means the status of asset is downloading.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ASSET_DOWNLOADING
    }
    /**
     * Records information of the asset.
     *
     * @interface Asset
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    interface Asset {
        /**
         * The name of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        name: string;
        /**
         * The uri of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        uri: string;
        /**
         * The path of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        path: string;
        /**
         * The create time of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        createTime: string;
        /**
         * The modify time of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        modifyTime: string;
        /**
         * The size of asset.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        size: string;
        /**
         * The status of asset.
         *
         * @type { ?AssetStatus }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        status?: AssetStatus;
    }
    /**
     * Indicates several assets in one column
     *
     * @typedef { Asset[] } Assets
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    type Assets = Asset[];
    /**
     * Indicates possible value types
     *
     * @typedef { null | number | string | boolean | Uint8Array } ValueType
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Indicates possible value types
     *
     * @typedef { null | number | string | boolean | Uint8Array | Asset | Assets } ValueType
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Indicates possible value types
     *
     * @typedef { null | number | string | boolean | Uint8Array | Asset | Assets | Float32Array | bigint } ValueType
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 12
     */
    type ValueType = null | number | string | boolean | Uint8Array | Asset | Assets | Float32Array | bigint;
    /**
     * Values in buckets are stored in key-value pairs
     *
     * @typedef { Record<string, ValueType> } ValuesBucket
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Values in buckets are stored in key-value pairs, move Uint8Array add to ValueType
     *
     * @typedef { Record<string, ValueType> } ValuesBucket
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Values in buckets are stored in key-value pairs, change {[key: string]: ValueType;} to Record<string, ValueType>
     *
     * @typedef { Record<string, ValueType> } ValuesBucket
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 11
     */
    type ValuesBucket = Record<string, ValueType>;
    /**
     * The type of the priority key can be number or string
     *
     * @typedef { number | string } PRIKeyType
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    type PRIKeyType = number | string;
    /**
     * The time is in UTC format.
     *
     * @typedef { Date } UTCTime
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    type UTCTime = Date;
    /**
     * Indicates the primary key and UTC time of the modified rows.
     *
     * @typedef { Map<PRIKeyType, UTCTime> } ModifyTime
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    type ModifyTime = Map<PRIKeyType, UTCTime>;
    /**
     * Manages relational database configurations.
     *
     * @interface StoreConfig
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Manages relational database configurations.
     *
     * @interface StoreConfig
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    interface StoreConfig {
        /**
         * The database name.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * The database name.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        name: string;
        /**
         * Specifies the security level of the database.
         *
         * @type { SecurityLevel }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 9
         */
        securityLevel: SecurityLevel;
        /**
         * Specifies whether the database is encrypted.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        encrypt?: boolean;
        /**
         * The data group id of application.
         *
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @StageModelOnly
         * @since 10
         */
        dataGroupId?: string;
        /**
         * Specifies the directory relative to the database directory obtained from context
         *
         * @type { ?string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 11
         */
        customDir?: string;
        /**
         * Specifies whether to clean up dirty data that is synchronized to
         * the local but deleted in the cloud.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        autoCleanDirtyData?: boolean;
        /**
         * Specifies whether database allows rebuild.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        allowRebuild?: boolean;
        /**
         * Specifies whether the database opened is read-only.
         * If isReadOnly is true, other configuration items will become invalid.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        isReadOnly?: boolean;
        /**
         * Indicates the names of the shared library containing fts etc.
         *
         * @type { ?Array<string> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        pluginLibs?: Array<string>;
    }
    /**
     * The cloud sync progress
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    enum Progress {
        /**
         * SYNC_BEGIN: means the sync process begin.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        SYNC_BEGIN,
        /**
         * SYNC_BEGIN: means the sync process is in progress
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        SYNC_IN_PROGRESS,
        /**
         * SYNC_BEGIN: means the sync process is finished
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        SYNC_FINISH
    }
    /**
     * Describes the statistic of the cloud sync process.
     *
     * @interface Statistic
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    interface Statistic {
        /**
         * Describes the total number of data to sync.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        total: number;
        /**
         * Describes the number of successfully synced data.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        successful: number;
        /**
         * Describes the number of data failed to sync.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        failed: number;
        /**
         * Describes the number of data remained to sync.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        remained: number;
    }
    /**
     * Describes the {@code Statistic} details of the table.
     *
     * @interface TableDetails
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    interface TableDetails {
        /**
         * Describes the {@code Statistic} details of the upload process.
         *
         * @type { Statistic }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        upload: Statistic;
        /**
         * Describes the {@code Statistic} details of the download process.
         *
         * @type { Statistic }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        download: Statistic;
    }
    /**
     * Describes the status of {@code Progress}.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    enum ProgressCode {
        /**
         * SUCCESS: means the status of progress is success.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        SUCCESS,
        /**
         * UNKNOWN_ERROR: means the progress meets unknown error.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        UNKNOWN_ERROR,
        /**
         * NETWORK_ERROR: means the progress meets network error.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        NETWORK_ERROR,
        /**
         * CLOUD_DISABLED: means cloud is disabled.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        CLOUD_DISABLED,
        /**
         * LOCKED_BY_OTHERS: means the progress is locked by others.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        LOCKED_BY_OTHERS,
        /**
         * RECORD_LIMIT_EXCEEDED: means the record exceeds the limit.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        RECORD_LIMIT_EXCEEDED,
        /**
         * NO_SPACE_FOR_ASSET: means the cloud has no space for the asset.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        NO_SPACE_FOR_ASSET,
        /**
         * BLOCKED_BY_NETWORK_STRATEGY: means the sync blocked by network strategy.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        BLOCKED_BY_NETWORK_STRATEGY
    }
    /**
     * Describes detail of the cloud sync {@code Progress}.
     *
     * @interface ProgressDetails
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    interface ProgressDetails {
        /**
         * Describes the status of data sync progress.
         *
         * @type { Progress }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        schedule: Progress;
        /**
         * Describes the code of data sync progress.
         *
         * @type { ProgressCode }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        code: ProgressCode;
        /**
         * The statistic details of the tables.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * The statistic details of the tables.
         *
         * @type { Record<string, TableDetails> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 11
         */
        details: Record<string, TableDetails>;
    }
    /**
     * Defines information about the SQL statements executed.
     *
     * @interface SqlExecutionInfo
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 12
     */
    interface SqlExecutionInfo {
        /**
         * Array of SQL statements executed. When the args of batchInsert is too large, there may be more than one SQL.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        sql: Array<string>;
        /**
         * Total time used for executing the SQL statements, in μs.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        totalTime: number;
        /**
         * Maximum time allowed to obtain the SQL file handle, in μs.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        waitTime: number;
        /**
         * Time used to prepare SQL and args, in μs.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        prepareTime: number;
        /**
         * Time used to execute the SQL statements, in μs.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        executeTime: number;
    }
    /**
     * Describes the {@code RdbStore} type.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 9
     */
    enum SecurityLevel {
        /**
         * S1: means the db is low level security
         * There are some low impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 9
         */
        S1 = 1,
        /**
         * S2: means the db is middle level security
         * There are some major impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 9
         */
        S2 = 2,
        /**
         * S3: means the db is high level security
         * There are some severity impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 9
         */
        S3 = 3,
        /**
         * S4: means the db is critical level security
         * There are some critical impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 9
         */
        S4 = 4
    }
    /**
     * Indicates the database synchronization mode.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    enum SyncMode {
        /**
         * Indicates the data is pushed to remote device from local device.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        SYNC_MODE_PUSH = 0,
        /**
         * Indicates the data is pulled from remote device to local device.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        SYNC_MODE_PULL = 1,
        /**
         * Indicates the data is pulled from remote device to local device.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        SYNC_MODE_TIME_FIRST,
        /**
         * Indicates force push the native data to the cloud.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        SYNC_MODE_NATIVE_FIRST,
        /**
         * Indicates the data is pulled from cloud to local device.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        SYNC_MODE_CLOUD_FIRST
    }
    /**
     * Describes the subscription type.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    enum SubscribeType {
        /**
         * Subscription to remote data changes
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        SUBSCRIBE_TYPE_REMOTE = 0,
        /**
         * Subscription to cloud data changes
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Subscription to cloud data changes
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        SUBSCRIBE_TYPE_CLOUD,
        /**
         * Subscription to cloud data changes details
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Subscription to cloud data changes details
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        SUBSCRIBE_TYPE_CLOUD_DETAILS,
        /**
         * Subscription to local data changes details
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        SUBSCRIBE_TYPE_LOCAL_DETAILS
    }
    /**
     * Describes the change type.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    enum ChangeType {
        /**
         * Means the change type is data change.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Means the change type is data change.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        DATA_CHANGE,
        /**
         * Means the change type is asset change.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Means the change type is asset change.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        ASSET_CHANGE
    }
    /**
     * Indicates the notify info
     *
     * @interface ChangeInfo
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    interface ChangeInfo {
        /**
         * Indicates the changed table
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        table: string;
        /**
         * Indicates the changed type
         *
         * @type { ChangeType }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        type: ChangeType;
        /**
         * Indicates if there is a string primary key, the inserted will keep data's primary keys
         * otherwise it will keep the data's rowid.
         *
         * @type { Array<string> | Array<number> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        inserted: Array<string> | Array<number>;
        /**
         * Indicates if there is a string primary key, the updated will keep data's primary keys
         * otherwise it will keep the data's rowid.
         *
         * @type { Array<string> | Array<number> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        updated: Array<string> | Array<number>;
        /**
         * Indicates if there is a string primary key, the deleted will keep data's primary keys
         * otherwise it will keep the data's rowid.
         *
         * @type { Array<string> | Array<number> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        deleted: Array<string> | Array<number>;
    }
    /**
     * Describes the distribution type of the tables.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    enum DistributedType {
        /**
         * Indicates the table is distributed among the devices
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        DISTRIBUTED_DEVICE,
        /**
         * Indicates the table is distributed between the cloud and the devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Indicates the table is distributed between the cloud and the devices.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        DISTRIBUTED_CLOUD
    }
    /**
     * Manages the distributed configuration of the table.
     *
     * @interface DistributedConfig
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 10
     */
    interface DistributedConfig {
        /**
         * Specifies whether the database auto sync.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        autoSync: boolean;
    }
    /**
     * Describes the conflict resolutions to insert data into the table.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    enum ConflictResolution {
        /**
         * Implements no action when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_NONE = 0,
        /**
         * Implements rollback operation when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_ROLLBACK = 1,
        /**
         * Implements abort operation when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_ABORT = 2,
        /**
         * Implements fail operation when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_FAIL = 3,
        /**
         * Implements ignore operation when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_IGNORE = 4,
        /**
         * Implements replace operation operator when conflict occurs.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        ON_CONFLICT_REPLACE = 5
    }
    /**
     * Describes the data origin sources.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
     * @since 11
     */
    enum Origin {
        /**
         * Indicates the data source is local.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        LOCAL,
        /**
         * Indicates the data source is cloud.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        CLOUD,
        /**
         * Indicates the data source is remote.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        REMOTE
    }
    /**
     * Enumerates the field.
     *
     * @enum { string }
     * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
     * @since 11
     */
    enum Field {
        /**
         * Cursor field.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        CURSOR_FIELD = '#_cursor',
        /**
         * Origin field. For details, see {@link Origin}.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        ORIGIN_FIELD = '#_origin',
        /**
         * Deleted flag field.
         * Indicates whether data has deleted in cloud.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        DELETED_FLAG_FIELD = '#_deleted_flag',
        /**
         * Owner field.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        OWNER_FIELD = '#_cloud_owner',
        /**
         * Privilege field.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        PRIVILEGE_FIELD = '#_cloud_privilege',
        /**
         * Sharing resource field.
         *
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        SHARING_RESOURCE_FIELD = '#_sharing_resource_field'
    }
    /**
     * Enumerates the type of rebuild.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 12
     */
    enum RebuildType {
        /**
         * The database is not rebuilt or repaired.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        NONE,
        /**
         * The database is rebuilt.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        REBUILT,
        /**
         * The database is repaired.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        REPAIRED
    }
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    class RdbPredicates {
        /**
         * A parameterized constructor used to create a RdbPredicates instance.
         *
         * @param { string } name - Indicates the table name of the database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * A parameterized constructor used to create a RdbPredicates instance.
         *
         * @param { string } name - Indicates the table name of the database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        constructor(name: string);
        /**
         * Specifies remote devices which connect to local device when syncing distributed database.
         * When query database, this function should not be called.
         *
         * @param { Array<string> } devices - Indicates specified remote devices.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        inDevices(devices: Array<string>): RdbPredicates;
        /**
         * Specifies all remote devices which connect to local device when syncing distributed database.
         * When query database, this function should not be called.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        inAllDevices(): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        equalTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is not equal to
         * a specified value.
         * This method is similar to != of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the field whose data type is ValueType and value is not equal to
         * a specified value.
         * This method is similar to != of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        notEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Adds a left parenthesis to the RdbPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the left parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Adds a left parenthesis to the RdbPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the left parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        beginWrap(): RdbPredicates;
        /**
         * Adds a right parenthesis to the RdbPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together with beginWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the right parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Adds a right parenthesis to the RdbPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together with beginWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the right parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        endWrap(): RdbPredicates;
        /**
         * Adds an or condition to the RdbPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the or condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Adds an or condition to the RdbPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the or condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        or(): RdbPredicates;
        /**
         * Adds an and condition to the RdbPredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the and condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Adds an and condition to the RdbPredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the and condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        and(): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * contains a specified value.
         * This method is similar to contains of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * contains a specified value.
         * This method is similar to contains of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        contains(field: string, value: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value starts
         * with a specified string.
         * This method is similar to value% of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value starts
         * with a specified string.
         * This method is similar to value% of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        beginsWith(field: string, value: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * ends with a specified string.
         * This method is similar to %value of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the field whose data type is string and value
         * ends with a specified string.
         * This method is similar to %value of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        endsWith(field: string, value: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isNull(field: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isNotNull(field: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the fields whose data type is string and value is
         * similar to a specified string.
         * This method is similar to like of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} that match the specified field.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure the RdbPredicates to match the fields whose data type is string and value is
         * similar to a specified string.
         * This method is similar to like of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The {@link RdbPredicates} that match the specified field.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        like(field: string, value: string): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.
         * Different from like, the input parameters of this method are case-sensitive.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.
         * Different from like, the input parameters of this method are case-sensitive.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        glob(field: string, value: string): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose value is within a given range.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to match the specified field whose value is within a given range.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        between(field: string, low: ValueType, high: ValueType): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose value is out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to match the specified field whose value is out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        notBetween(field: string, low: ValueType, high: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        greaterThan(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        lessThan(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        greaterThanOrEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        lessThanOrEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        orderByAsc(field: string): RdbPredicates;
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        orderByDesc(field: string): RdbPredicates;
        /**
         * Restricts each row of the query result to be unique.
         *
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts each row of the query result to be unique.
         *
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        distinct(): RdbPredicates;
        /**
         * Restricts the max number of return records.
         *
         * @param { number } value - Indicates the max length of the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restricts the max number of return records.
         *
         * @param { number } value - Indicates the max length of the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        limitAs(value: number): RdbPredicates;
        /**
         * Configure RdbPredicates to specify the start position of the returned result.
         * Use this method together with limit(number).
         *
         * @param { number } rowOffset - Indicates the start position of the returned result. The value is a positive integer.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to specify the start position of the returned result.
         * Use this method together with limit(number).
         *
         * @param { number } rowOffset - Indicates the start position of the returned result. The value is a positive integer.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        offsetAs(rowOffset: number): RdbPredicates;
        /**
         * Configure RdbPredicates to group query results by specified columns.
         *
         * @param { Array<string> } fields - Indicates the specified columns by which query results are grouped.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to group query results by specified columns.
         *
         * @param { Array<string> } fields - Indicates the specified columns by which query results are grouped.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        groupBy(fields: Array<string>): RdbPredicates;
        /**
         * Configure RdbPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @param { string } field - Indicates the name of the index column.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @param { string } field - Indicates the name of the index column.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        indexedBy(field: string): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        in(field: string, value: Array<ValueType>): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        notIn(field: string, value: Array<ValueType>): RdbPredicates;
        /**
         * Sets the RdbPredicates to match the field whose data type is string and value
         * does not contain the specified value.
         * This method is similar to "Not like %value%" of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value that is not contained.
         * @returns { RdbPredicates } - The {@Link RdbPredicates} set.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        notContains(field: string, value: string): RdbPredicates;
        /**
         * Sets the RdbPredicates to match the field whose data type is string and value
         * is not like the specified value.
         * This method is similar to "Not like" of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to compare against.
         * @returns { RdbPredicates } - The {@Link RdbPredicates} set.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        notLike(field: string, value: string): RdbPredicates;
    }
    /**
     * Provides methods for accessing a database result set generated by querying the database.
     *
     * @interface ResultSet
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Provides methods for accessing a database result set generated by querying the database.
     *
     * @interface ResultSet
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    interface ResultSet {
        /**
         * Obtains the names of all columns in a result set.
         * The column names are returned as a string array, in which the strings are in the same order
         * as the columns in the result set.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the names of all columns in a result set.
         * The column names are returned as a string array, in which the strings are in the same order
         * as the columns in the result set.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        columnNames: Array<string>;
        /**
         * Obtains the number of columns in the result set.
         * The returned number is equal to the length of the string array returned by the
         * columnNames method.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the number of columns in the result set.
         * The returned number is equal to the length of the string array returned by the
         * columnNames method.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        columnCount: number;
        /**
         * Obtains the number of rows in the result set.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the number of rows in the result set.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        rowCount: number;
        /**
         * Obtains the current index of the result set.
         * The result set index starts from 0.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the current index of the result set.
         * The result set index starts from 0.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        rowIndex: number;
        /**
         * Checks whether the cursor is positioned at the first row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the cursor is positioned at the first row.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isAtFirstRow: boolean;
        /**
         * Checks whether the cursor is positioned at the last row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the cursor is positioned at the last row.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isAtLastRow: boolean;
        /**
         * Checks whether the cursor is positioned after the last row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the cursor is positioned after the last row.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isEnded: boolean;
        /**
         * Checks whether the cursor is positioned before the first row.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the cursor is positioned before the first row.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isStarted: boolean;
        /**
         * Checks whether the current result set is closed.
         * If the result set is closed by calling the close method, true will be returned.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the current result set is closed.
         * If the result set is closed by calling the close method, true will be returned.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        isClosed: boolean;
        /**
         * Obtains the column index based on the specified column name.
         * The column name is passed as an input parameter.
         *
         * @param { string } columnName - Indicates the name of the specified column in the result set.
         * @returns { number } The index of the specified column.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the column index based on the specified column name.
         * The column name is passed as an input parameter.
         *
         * @param { string } columnName - Indicates the name of the specified column in the result set.
         * @returns { number } The index of the specified column.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the column index based on the specified column name.
         * The column name is passed as an input parameter.
         *
         * @param { string } columnName - Indicates the name of the specified column in the result set.
         * @returns { number } The index of the specified column.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getColumnIndex(columnName: string): number;
        /**
         * Obtains the column name based on the specified column index.
         * The column index is passed as an input parameter.
         *
         * @param { number } columnIndex - Indicates the index of the specified column in the result set.
         * @returns { string } The name of the specified column.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the column name based on the specified column index.
         * The column index is passed as an input parameter.
         *
         * @param { number } columnIndex - Indicates the index of the specified column in the result set.
         * @returns { string } The name of the specified column.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the column name based on the specified column index.
         * The column index is passed as an input parameter.
         *
         * @param { number } columnIndex - Indicates the index of the specified column in the result set.
         * @returns { string } The name of the specified column.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getColumnName(columnIndex: number): string;
        /**
         * Go to the specified row of the result set forwards or backwards by an offset relative to its current position.
         * A positive offset indicates moving backwards, and a negative offset indicates moving forwards.
         *
         * @param { number } offset - Indicates the offset relative to the current position.
         * @returns { boolean } True if the result set is moved successfully and does not go beyond the range;
         *                   Returns false otherwise.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the specified row of the result set forwards or backwards by an offset relative to its current position.
         * A positive offset indicates moving backwards, and a negative offset indicates moving forwards.
         *
         * @param { number } offset - Indicates the offset relative to the current position.
         * @returns { boolean } True if the result set is moved successfully and does not go beyond the range;
         *                   Returns false otherwise.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the specified row of the result set forwards or backwards by an offset relative to its current position.
         * A positive offset indicates moving backwards, and a negative offset indicates moving forwards.
         *
         * @param { number } offset - Indicates the offset relative to the current position.
         * @returns { boolean } True if the result set is moved successfully and does not go beyond the range;
         *                   Returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goTo(offset: number): boolean;
        /**
         * Go to the specified row of the result set.
         *
         * @param { number } position - Indicates the index of the specified row, which starts from 0.
         * @returns { boolean } True if the result set is moved successfully; Returns false otherwise.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the specified row of the result set.
         *
         * @param { number } position - Indicates the index of the specified row, which starts from 0.
         * @returns { boolean } True if the result set is moved successfully; Returns false otherwise.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the specified row of the result set.
         *
         * @param { number } position - Indicates the index of the specified row, which starts from 0.
         * @returns { boolean } True if the result set is moved successfully; Returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goToRow(position: number): boolean;
        /**
         * Go to the first row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the first row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the first row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goToFirstRow(): boolean;
        /**
         * Go to the last row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the last row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the last row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is empty.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goToLastRow(): boolean;
        /**
         * Go to the next row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the last row.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the next row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the last row.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the next row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the last row.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goToNextRow(): boolean;
        /**
         * Go to the previous row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the first row.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Go to the previous row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the first row.
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Go to the previous row of the result set.
         *
         * @returns { boolean } True if the result set is moved successfully;
         *                    Returns false otherwise, for example, if the result set is already in the first row.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800019 - The SQL must be a query statement.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        goToPreviousRow(): boolean;
        /**
         * Obtains the value of the specified column in the current row as a byte array.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Blob type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Uint8Array } The value of the specified column as a byte array.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the value of the specified column in the current row as a byte array.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Blob type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Uint8Array } The value of the specified column as a byte array.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as a byte array.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Blob type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Uint8Array } The value of the specified column as a byte array.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getBlob(columnIndex: number): Uint8Array;
        /**
         * Obtains the value of the specified column in the current row as string.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the string type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { string } The value of the specified column as a string.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the value of the specified column in the current row as string.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the string type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { string } The value of the specified column as a string.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as string.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the string type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { string } The value of the specified column as a string.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getString(columnIndex: number): string;
        /**
         * Obtains the value of the specified column in the current row as long.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the integer type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a long.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the value of the specified column in the current row as long.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the integer type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a long.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as long.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the integer type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a long.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getLong(columnIndex: number): number;
        /**
         * Obtains the value of the specified column in the current row as double.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the double type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a double.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtains the value of the specified column in the current row as double.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the double type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a double.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as double.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null, the specified column is not of the double type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { number } The value of the specified column as a double.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getDouble(columnIndex: number): number;
        /**
         * Obtains the value of the specified column in the current row as an asset.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Asset type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Asset } The value of the specified column as an asset.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as an asset.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Asset type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Asset } The value of the specified column as an asset.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getAsset(columnIndex: number): Asset;
        /**
         * Obtains the value of the specified column in the current row as assets.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Assets type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Assets } The value of the specified column as assets.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Obtains the value of the specified column in the current row as assets.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Assets type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { Assets } The value of the specified column as assets.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getAssets(columnIndex: number): Assets;
        /**
         * Obtains the value of the specified column in the current row.
         * The implementation class determines whether to throw an exception if the value of the specified column
         * in the current row is null or the specified column is not of the Assets type.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { ValueType } The value of the specified column.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        getValue(columnIndex: number): ValueType;
        /**
         * Obtains the values of all columns in the specified row.
         *
         * @returns { ValuesBucket } Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 11
         */
        /**
         * Obtains the values of all columns in the specified row.
         *
         * @returns { ValuesBucket } Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        getRow(): ValuesBucket;
        /**
         * Checks whether the value of the specified column in the current row is null.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { boolean } True if the value of the specified column in the current row is null;
         *                    Returns false otherwise.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Checks whether the value of the specified column in the current row is null.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { boolean } True if the value of the specified column in the current row is null;
         *                    Returns false otherwise.
         * @throws { BusinessError } 14800013 - The column value is null or the column type is incompatible.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Checks whether the value of the specified column in the current row is null.
         *
         * @param { number } columnIndex - Indicates the specified column index, which starts from 0.
         * @returns { boolean } True if the value of the specified column in the current row is null;
         *                    Returns false otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @throws { BusinessError } 14800013 - Column out of bounds.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        isColumnNull(columnIndex: number): boolean;
        /**
         * Closes the result set.
         * Calling this method on the result set will release all of its resources and makes it ineffective.
         *
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Closes the result set.
         * Calling this method on the result set will release all of its resources and makes it ineffective.
         *
         * @throws { BusinessError } 14800012 - The result set is empty or the specified location is invalid.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Closes the result set.
         * Calling this method on the result set will release all of its resources and makes it ineffective.
         *
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800012 - Row out of bounds.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        close(): void;
    }
    /**
     * Provides methods for managing the relational database (RDB).
     * This class provides methods for creating, querying, updating, and deleting RDBs.
     *
     * @interface RdbStore
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Provides methods for managing the relational database (RDB).
     * This class provides methods for creating, querying, updating, and deleting RDBs.
     *
     * @interface RdbStore
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    interface RdbStore {
        /**
         * Set RdbStore version. The version number must be an integer greater than 0.
         * Obtains the RdbStore version.
         *
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Set RdbStore version. The version number must be an integer greater than 0.
         * Obtains the RdbStore version.
         *
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Set RdbStore version. The version number must be an integer greater than 0.
         * Obtains the RdbStore version.
         *
         * @type { number }
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        version: number;
        /**
         * Set whether the database is rebuilt.
         *
         * @type {RebuildType}
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        rebuilt: RebuildType;
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        insert(table: string, values: ValuesBucket, callback: AsyncCallback<number>): void;
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        insert(table: string, values: ValuesBucket, conflict: ConflictResolution, callback: AsyncCallback<number>): void;
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        insert(table: string, values: ValuesBucket): Promise<number>;
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { Promise<number> } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { Promise<number> } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        insert(table: string, values: ValuesBucket, conflict: ConflictResolution): Promise<number>;
        /**
         * Inserts a row of data into the target table with sync interface.
         *
         * @param { string } table - Indicates the target table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { number } The row ID if the operation is successful. return -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        insertSync(table: string, values: ValuesBucket, conflict?: ConflictResolution): number;
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        batchInsert(table: string, values: Array<ValuesBucket>, callback: AsyncCallback<number>): void;
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        batchInsert(table: string, values: Array<ValuesBucket>): Promise<number>;
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns { number } The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        batchInsertSync(table: string, values: Array<ValuesBucket>): number;
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        update(values: ValuesBucket, predicates: RdbPredicates, callback: AsyncCallback<number>): void;
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        update(values: ValuesBucket, predicates: RdbPredicates, conflict: ConflictResolution, callback: AsyncCallback<number>): void;
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        update(values: ValuesBucket, predicates: RdbPredicates): Promise<number>;
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        update(values: ValuesBucket, predicates: RdbPredicates, conflict: ConflictResolution): Promise<number>;
        /**
         * Updates data in the database based on a specified instance object of RdbPredicates with sync interface.
         *
         * @param { ValuesBucket } values - Indicates the row of data to be updated in the database.
         *                         The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { ConflictResolution } conflict - Indicates the {@link ConflictResolution} to insert data into the table.
         * @returns { number } The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        updateSync(values: ValuesBucket, predicates: RdbPredicates, conflict?: ConflictResolution): number;
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        delete(predicates: RdbPredicates, callback: AsyncCallback<number>): void;
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<number> } The number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<number> } return the number of affected rows.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<number> } return the number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        delete(predicates: RdbPredicates): Promise<number>;
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates with sync interface.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns { number } return the number of affected rows.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        deleteSync(predicates: RdbPredicates): number;
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        query(predicates: RdbPredicates, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is empty array, the query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is empty array, the query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is empty array, the query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        query(predicates: RdbPredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is null, the query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is null, the query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is null, the query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        query(predicates: RdbPredicates, columns?: Array<string>): Promise<ResultSet>;
        /**
         * Queries data in the database based on specified conditions with sync function.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is empty array, the query applies to all columns.
         * @returns { ResultSet } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        querySync(predicates: RdbPredicates, columns?: Array<string>): ResultSet;
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        querySql(sql: string, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        querySql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        querySql(sql: string, bindArgs?: Array<ValueType>): Promise<ResultSet>;
        /**
         * Queries data in the database based on SQL statement with sync interface.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { ResultSet } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        querySqlSync(sql: string, bindArgs?: Array<ValueType>): ResultSet;
        /**
         * Obtains the modify time of rows corresponding to the primary keys.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { string } columnName - Indicates the name of the column to check.
         * @param { PRIKeyType[] } primaryKeys - Indicates the primary keys of the rows to check.
         * @returns { Promise<ModifyTime> } -The promise returned by the function. ModifyTime indicates the modify time of current row.
         * If this table does not support cloud, the {@link ModifyTime} will be empty.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 3 - 4  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The columnName must be not empty string. 5. The PRIKey must be number or string.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Obtains the modify time of rows corresponding to the primary keys.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { string } columnName - Indicates the name of the column to check.
         * @param { PRIKeyType[] } primaryKeys - Indicates the primary keys of the rows to check.
         * @returns { Promise<ModifyTime> } -The promise returned by the function. ModifyTime indicates the modify time of current row.
         * If this table does not support cloud, the {@link ModifyTime} will be empty.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 3 - 4  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The columnName must be not empty string. 5. The PRIKey must be number or string.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        getModifyTime(table: string, columnName: string, primaryKeys: PRIKeyType[]): Promise<ModifyTime>;
        /**
         * Obtains the modify time of rows corresponding to the primary keys.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { string } columnName - Indicates the name of the column to check.
         * @param { PRIKeyType[] } primaryKeys - Indicates the primary keys of the rows to check.
         * @param { AsyncCallback<ModifyTime> } callback - The callback of getModifyTime. ModifyTime indicates the modify time of current row.
         * If this table does not support cloud, the {@link ModifyTime} will be empty.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 3 - 4  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The columnName must be not empty string. 5. The PRIKey must be number or string.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Obtains the modify time of rows corresponding to the primary keys.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { string } columnName - Indicates the name of the column to check.
         * @param { PRIKeyType[] } primaryKeys - Indicates the primary keys of the rows to check.
         * @param { AsyncCallback<ModifyTime> } callback - The callback of getModifyTime. ModifyTime indicates the modify time of current row.
         * If this table does not support cloud, the {@link ModifyTime} will be empty.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 3 - 4  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The columnName must be not empty string. 5. The PRIKey must be number or string.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        getModifyTime(table: string, columnName: string, primaryKeys: PRIKeyType[], callback: AsyncCallback<ModifyTime>): void;
        /**
         * Cleans the dirty data, which is the data deleted in the cloud.
         *
         * Data with a cursor smaller than the specified cursor will be cleaned up.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { number } cursor - Indicates the position of the data to be cleaned up.
         * @param { AsyncCallback<void> } callback - Indicates the callback invoked to return the result.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The cursor must be valid cursor.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        /**
         * Cleans the dirty data, which is the data deleted in the cloud.
         *
         * Data with a cursor smaller than the specified cursor will be cleaned up.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { number } cursor - Indicates the position of the data to be cleaned up.
         * @param { AsyncCallback<void> } callback - Indicates the callback invoked to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The cursor must be valid cursor.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cleanDirtyData(table: string, cursor: number, callback: AsyncCallback<void>): void;
        /**
         * Cleans all dirty data deleted in the cloud.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { AsyncCallback<void> } callback - The callback of clean.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        /**
         * Cleans all dirty data deleted in the cloud.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { AsyncCallback<void> } callback - The callback of clean.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cleanDirtyData(table: string, callback: AsyncCallback<void>): void;
        /**
         * Cleans dirty data deleted in the cloud.
         *
         * If a cursor is specified, data with a cursor smaller than the specified cursor will be cleaned up.
         * otherwise clean all.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { number } [cursor] - Indicates the cursor.
         * @returns { Promise<void> } -The promise returned by the function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The cursor must be valid cursor.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 11
         */
        /**
         * Cleans dirty data deleted in the cloud.
         *
         * If a cursor is specified, data with a cursor smaller than the specified cursor will be cleaned up.
         * otherwise clean all.
         *
         * @param { string } table - Indicates the name of the table to check.
         * @param { number } [cursor] - Indicates the cursor.
         * @returns { Promise<void> } -The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be not nullptr.
         * 3. The tablesNames must be not empty string. 4. The cursor must be valid cursor.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cleanDirtyData(table: string, cursor?: number): Promise<void>;
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        executeSql(sql: string, callback: AsyncCallback<void>): void;
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        executeSql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<void>): void;
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Executes a SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        executeSql(sql: string, bindArgs?: Array<ValueType>): Promise<void>;
        /**
         * Executes a SQL statement that contains specified parameters and returns a value of ValueType.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } args - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ValueType> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        execute(sql: string, args?: Array<ValueType>): Promise<ValueType>;
        /**
         * Executes a SQL statement that contains specified parameters and returns a value of ValueType.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { number } txId - Indicates the transaction ID which is obtained by beginTrans or 0.
         * @param { Array<ValueType> } args - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ValueType> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        execute(sql: string, txId: number, args?: Array<ValueType>): Promise<ValueType>;
        /**
         * Executes a SQL statement that contains specified parameters and returns a value of ValueType with sync interface.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } args - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { ValueType } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        executeSync(sql: string, args?: Array<ValueType>): ValueType;
        /**
         * BeginTransaction before execute your sql.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * BeginTransaction before execute your sql.
         *
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * BeginTransaction before execute your sql.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        beginTransaction(): void;
        /**
         * Begins a transaction before executing the SQL statement.
         *
         * @returns { Promise<number> } Returns the transaction ID.
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 801 - Capability not supported the sql(attach,begin,commit,rollback etc.).
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        beginTrans(): Promise<number>;
        /**
         * Commit the the sql you have executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Commit the the sql you have executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Commit the the sql you have executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        commit(): void;
        /**
         * Commits the SQL statement executed.
         *
         * @param { number } txId - Indicates the transaction ID which is obtained by beginTrans.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        commit(txId: number): Promise<void>;
        /**
         * Roll back the sql you have already executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Roll back the sql you have already executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Roll back the sql you have already executed.
         *
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        rollBack(): void;
        /**
         * Rolls back the SQL statement executed.
         *
         * @param { number } txId - Indicates the transaction ID which is obtained by beginTrans.
         * @returns { Promise<void> } Promise used to return the result.
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        rollback(txId: number): Promise<void>;
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @param { AsyncCallback<void> } callback - The callback of backup.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @param { AsyncCallback<void> } callback - The callback of backup.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @param { AsyncCallback<void> } callback - The callback of backup.
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800010 - Invalid database path.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        backup(destName: string, callback: AsyncCallback<void>): void;
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Backs up a database in a specified name.
         *
         * @param { string } destName - Indicates the name that saves the database backup.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        backup(destName: string): Promise<void>;
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @param { AsyncCallback<void> } callback - The callback of restore.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @param { AsyncCallback<void> } callback - The callback of restore.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @param { AsyncCallback<void> } callback - The callback of restore.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        restore(srcName: string, callback: AsyncCallback<void>): void;
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 10
         */
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } srcName - Indicates the name that saves the database file.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        restore(srcName: string): Promise<void>;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        setDistributedTables(tables: Array<string>, callback: AsyncCallback<void>): void;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        setDistributedTables(tables: Array<string>): Promise<void>;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * This method only works when type equals to DistributedType.DISTRIBUTED_CLOUD
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * ohos.permission.DISTRIBUTED_DATASYNC is required only when type is DISTRIBUTED_DEVICE.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        setDistributedTables(tables: Array<string>, type: DistributedType, callback: AsyncCallback<void>): void;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * This method only works when type equals to DistributedType.DISTRIBUTED_CLOUD
         * @param { DistributedConfig } config - Indicates the distributed config of the tables. For details, see {@link DistributedConfig}.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * ohos.permission.DISTRIBUTED_DATASYNC is required only when type is DISTRIBUTED_DEVICE.
         * @param { DistributedConfig } config - Indicates the distributed config of the tables. For details, see {@link DistributedConfig}.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        setDistributedTables(tables: Array<string>, type: DistributedType, config: DistributedConfig, callback: AsyncCallback<void>): void;
        /**
         * Set table to be a distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * This method only works when type equals to DistributedType.DISTRIBUTED_CLOUD
         * @param { DistributedConfig } config - Indicates the distributed config of the tables. For details, see {@link DistributedConfig}.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Set table to be a distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the table names you want to set.
         * @param { DistributedType } type - Indicates the distributed type {@link DistributedType}.
         * ohos.permission.DISTRIBUTED_DATASYNC is required only when type is DISTRIBUTED_DEVICE.
         * @param { DistributedConfig } config - Indicates the distributed config of the tables. For details, see {@link DistributedConfig}.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800051 - The type of the distributed table does not match.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        setDistributedTables(tables: Array<string>, type?: DistributedType, config?: DistributedConfig): Promise<void>;
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table - {string}: the distributed table name.
         * @param { AsyncCallback<string> } callback
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table - {string}: the distributed table name.
         * @param { AsyncCallback<string> } callback
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        obtainDistributedTableName(device: string, table: string, callback: AsyncCallback<string>): void;
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table
         * @returns { Promise<string> } {string}: the distributed table name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table
         * @returns { Promise<string> } {string}: the distributed table name.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        obtainDistributedTableName(device: string, table: string): Promise<string>;
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the database synchronization mode.
         * @param { RdbPredicates } predicates - The specified sync condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<Array<[string, number]>> } callback - {Array<[string, number]>}: devices sync status array,
         *                                                              {string}: device id,
         *                                                              {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the database synchronization mode.
         * @param { RdbPredicates } predicates - The specified sync condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<Array<[string, number]>> } callback - {Array<[string, number]>}: devices sync status array,
         *                                                              {string}: device id,
         *                                                              {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        sync(mode: SyncMode, predicates: RdbPredicates, callback: AsyncCallback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the database synchronization mode.
         * @param { RdbPredicates } predicates - The specified sync condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<Array<[string, number]>> } {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the database synchronization mode.
         * @param { RdbPredicates } predicates - The specified sync condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<Array<[string, number]>> } {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        sync(mode: SyncMode, predicates: RdbPredicates): Promise<Array<[
            string,
            number
        ]>>;
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @param { AsyncCallback<void> } callback - {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The progress must be a callback type. 5. The callback must be a function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @param { AsyncCallback<void> } callback - {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The progress must be a callback type. 5. The callback must be a function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cloudSync(mode: SyncMode, progress: Callback<ProgressDetails>, callback: AsyncCallback<void>): void;
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @returns { Promise<void> } : devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The progress must be a callback type.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @returns { Promise<void> } : devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The progress must be a callback type.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cloudSync(mode: SyncMode, progress: Callback<ProgressDetails>): Promise<void>;
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { string[] } tables - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @param { AsyncCallback<void> } callback - {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The tablesNames must be not empty. 5. The progress must be a callback type.
         * 6. The callback must be a function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { string[] } tables - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @param { AsyncCallback<void> } callback - {Array<[string, number]>}: devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The tablesNames must be not empty. 5. The progress must be a callback type.
         * 6. The callback must be a function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cloudSync(mode: SyncMode, tables: string[], progress: Callback<ProgressDetails>, callback: AsyncCallback<void>): void;
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { string[] } tables - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @returns { Promise<void> } : devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The tablesNames must be not empty. 5. The progress must be a callback type.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 10
         */
        /**
         * Sync data to cloud.
         *
         * @param { SyncMode } mode - indicates the database synchronization mode.
         * @param { string[] } tables - indicates the database synchronization mode.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @returns { Promise<void> } : devices sync status array, {string}: device id, {number}: device sync status.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 4  parameter(s). 2. The RdbStore must be not nullptr.
         * 3. The mode must be a SyncMode of cloud. 4. The tablesNames must be not empty. 5. The progress must be a callback type.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.CloudSync.Client
         * @since 12
         */
        cloudSync(mode: SyncMode, tables: string[], progress: Callback<ProgressDetails>): Promise<void>;
        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param { string } device - Indicates specified remote device.
         * @param { string } table - Indicates the target table.
         * @param { RdbPredicates } predicates - The specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param { string } device - Indicates specified remote device.
         * @param { string } table - Indicates the target table.
         * @param { RdbPredicates } predicates - The specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        remoteQuery(device: string, table: string, predicates: RdbPredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param { string } device - Indicates specified remote device.
         * @param { string } table - Indicates the target table.
         * @param { RdbPredicates } predicates - The specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Queries remote data in the database based on specified conditions before Synchronizing Data.
         *
         * @param { string } device - Indicates specified remote device.
         * @param { string } table - Indicates the target table.
         * @param { RdbPredicates } predicates - The specified remote remote query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to remote query. If the value is empty array, the remote query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        remoteQuery(device: string, table: string, predicates: RdbPredicates, columns: Array<string>): Promise<ResultSet>;
        /**
         * Registers an observer for the database. When data in the distributed database changes,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: the observer of data change events in the distributed database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Registers an observer for the database. When data in the distributed database changes,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: the observer of data change events in the distributed database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        on(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;
        /**
         * Registers an observer for the database. When data in the distributed database or the local database changes,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * If its value is SUBSCRIBE_TYPE_LOCAL_DETAILS, the callback will be invoked for data changes in the local database.
         * @param { Callback<Array<string>> | Callback<Array<ChangeInfo>> } observer
         * {Array<string>}: The observer of data change events in the distributed database.
         * {Array<ChangeInfo>}: The change info of data change events in the distributed database or the local database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 202 - Permission verification failed, application which is not a system application uses system API.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Registers an observer for the database. When data in the distributed database changes,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> | Callback<Array<ChangeInfo>> } observer
         * {Array<string>}: The observer of data change events in the distributed database.
         * {Array<ChangeInfo>}: The change info of data change events in the distributed database.
         * @throws { BusinessError } 202 - Permission verification failed, application which is not a system application uses system API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        on(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>> | Callback<Array<ChangeInfo>>): void;
        /**
         * Registers an observer for the database.
         *
         * @param { string } event - Indicates the subscription event.
         * @param { boolean } interProcess - Indicates whether it is an interprocess subscription or an in-process subscription.
         * @param { Callback<void> } observer - The observer of data change events in the database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Registers an observer for the database.
         *
         * @param { string } event - Indicates the subscription event.
         * @param { boolean } interProcess - Indicates whether it is an interprocess subscription or an in-process subscription.
         * @param { Callback<void> } observer - The observer of data change events in the database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        on(event: string, interProcess: boolean, observer: Callback<void>): void;
        /**
         * Register an automatic synchronization callback to the database.
         *
         * @param { 'autoSyncProgress' } event - Indicates the event must be string 'autoSyncProgress'.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 3  parameter(s)! 2. The RdbStore must be valid.
         * 3. The event must be a not empty string. 4. The progress must be function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 11
         */
        /**
         * Register an automatic synchronization callback to the database.
         *
         * @param { 'autoSyncProgress' } event - Indicates the event must be string 'autoSyncProgress'.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 2 - 3  parameter(s)! 2. The RdbStore must be valid.
         * 3. The event must be a not empty string. 4. The progress must be function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        on(event: 'autoSyncProgress', progress: Callback<ProgressDetails>): void;
        /**
         * Subscribes to the SQL statistics.
         * @param { 'statistics' } event - Indicates the event type, which must be 'statistics'.
         * @param { Callback<SqlExecutionInfo> } observer - Indicates the callback used to return the SQL execution statistics {@link SqlExeInfo} in the database.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1.Mandatory parameters are left unspecified; 2.Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        on(event: 'statistics', observer: Callback<SqlExecutionInfo>): void;
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: the data change observer already registered.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 9
         */
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: the data change observer already registered.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        off(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { 'dataChange' } event - indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> | Callback<Array<ChangeInfo>> } observer - {Array<string>}: the data change observer already registered.
         * {Array<ChangeInfo>}: the change info already registered.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 202 - Permission verification failed, application which is not a system application uses system API.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { 'dataChange' } event - indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> | Callback<Array<ChangeInfo>> } observer - {Array<string>}: the data change observer already registered.
         * {Array<ChangeInfo>}: the change info already registered.
         * @throws { BusinessError } 202 - Permission verification failed, application which is not a system application uses system API.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        off(event: 'dataChange', type: SubscribeType, observer?: Callback<Array<string>> | Callback<Array<ChangeInfo>>): void;
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { string } event - Indicates the subscription event.
         * @param { boolean } interProcess - Indicates whether it is an interprocess subscription or an in-process subscription.
         * @param { Callback<void> } observer - The data change observer already registered.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { string } event - Indicates the subscription event.
         * @param { boolean } interProcess - Indicates whether it is an interprocess subscription or an in-process subscription.
         * @param { Callback<void> } observer - The data change observer already registered.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        off(event: string, interProcess: boolean, observer?: Callback<void>): void;
        /**
         * Unregister the database auto synchronization callback.
         *
         * @param { 'autoSyncProgress' } event - indicates the event must be string 'autoSyncProgress'.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be valid.
         * 3. The event must be a not empty string. 4. The progress must be function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 11
         */
        /**
         * Unregister the database auto synchronization callback.
         *
         * @param { 'autoSyncProgress' } event - indicates the event must be string 'autoSyncProgress'.
         * @param { Callback<ProgressDetails> } progress - the specified sync condition by the instance object of {@link ProgressDetails}.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Need 1 - 3  parameter(s)! 2. The RdbStore must be valid.
         * 3. The event must be a not empty string. 4. The progress must be function.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        off(event: 'autoSyncProgress', progress?: Callback<ProgressDetails>): void;
        /**
         * Unsubscribes from the SQL statistics.
         * @param { 'statistics' } event - Indicates the event type, which must be 'statistics'.
         * @param { Callback<SqlExecutionInfo> } observer - Indicates the callback to unregister.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        off(event: 'statistics', observer?: Callback<SqlExecutionInfo>): void;
        /**
         * Notifies the registered observers of a change to the data resource specified by Uri.
         *
         * @param { string } event - Indicates the subscription event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 10
         */
        /**
         * Notifies the registered observers of a change to the data resource specified by Uri.
         *
         * @param { string } event - Indicates the subscription event.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800050 - Failed to obtain subscription service.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        emit(event: string): void;
        /**
         * Close the RdbStore and all resultSets.
         *
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. The store must not be nullptr.
         * @throws { BusinessError } 14800000 - Inner error.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        close(): Promise<void>;
        /**
         * Attaches a database file to the currently linked database.
         *
         * @param { string } fullPath - Indicates the path of the database file to attach.
         * @param { string } attachName - Indicates the alias of the database.
         * @param { number } waitTime - Indicates the maximum time allowed for attaching the database file.
         * @returns { Promise<number> } Promise used to return the number of attached databases.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800010 - Invalid database path.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800016 - The database is already attached.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        attach(fullPath: string, attachName: string, waitTime?: number): Promise<number>;
        /**
         * Attaches a database file to the currently linked database.
         *
         * @param { Context } context - Indicates the context of an application or ability.
         * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
         * @param { string } attachName - Indicates the alias of the database.
         * @param { number } waitTime - Indicates the maximum time allowed for attaching the database file.
         * @returns { Promise<number> } Promise used to return the number of attached databases.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 801 - Capability not supported.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800010 - Invalid database path.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800016 - The database is already attached.
         * @throws { BusinessError } 14801001 - Only supported in stage mode.
         * @throws { BusinessError } 14801002 - The data group id is not valid.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        attach(context: Context, config: StoreConfig, attachName: string, waitTime?: number): Promise<number>;
        /**
         * Detaches a database from this database.
         *
         * @param { string } attachName - Indicates the alias of the database.
         * @param { number } waitTime - Indicates the maximum time allowed for detaching the database.
         * @returns { Promise<number> } Return the current number of attached databases.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 12
         */
        detach(attachName: string, waitTime?: number): Promise<number>;
        /**
         * Locks data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified lock condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800018 - No data meets the condition.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        lockRow(predicates: RdbPredicates): Promise<void>;
        /**
         * Unlocks data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified Unlock condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<void> } The promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800018 - No data meets the condition.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        unlockRow(predicates: RdbPredicates): Promise<void>;
        /**
         * Queries locked data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is null, the query applies to all columns.
         * @returns { Promise<ResultSet> } The {@link ResultSet} object if the operation is successful.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
         * <br>2. Incorrect parameter types.
         * @throws { BusinessError } 14800000 - Inner error.
         * @throws { BusinessError } 14800011 - Database corrupted.
         * @throws { BusinessError } 14800014 - Already closed.
         * @throws { BusinessError } 14800015 - The database does not respond.
         * @throws { BusinessError } 14800021 - SQLite: Generic error.
         * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
         * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
         * @throws { BusinessError } 14800024 - SQLite: The database file is locked.
         * @throws { BusinessError } 14800025 - SQLite: A table in the database is locked.
         * @throws { BusinessError } 14800026 - SQLite: The database is out of memory.
         * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
         * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
         * @throws { BusinessError } 14800029 - SQLite: The database is full.
         * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
         * @throws { BusinessError } 14800031 - SQLite: TEXT or BLOB exceeds size limit.
         * @throws { BusinessError } 14800032 - SQLite: Abort due to constraint violation.
         * @throws { BusinessError } 14800033 - SQLite: Data type mismatch.
         * @throws { BusinessError } 14800034 - SQLite: Library used incorrectly.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @crossplatform
         * @since 12
         */
        queryLockedRow(predicates: RdbPredicates, columns?: Array<string>): Promise<ResultSet>;
    }
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { AsyncCallback<RdbStore> } callback - The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14800011 - Failed to open database by database corrupted.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { AsyncCallback<RdbStore> } callback - The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14800011 - Failed to open database by database corrupted.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { AsyncCallback<RdbStore> } callback - The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Invalid database path.
     * @throws { BusinessError } 14800011 - Database corrupted.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @throws { BusinessError } 14800017 - Config changed.
     * @throws { BusinessError } 14800021 - SQLite: Generic error.
     * @throws { BusinessError } 14800022 - SQLite: Callback routine requested an abort.
     * @throws { BusinessError } 14800023 - SQLite: Access permission denied.
     * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
     * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
     * @throws { BusinessError } 14800029 - SQLite: The database is full.
     * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 12
     */
    function getRdbStore(context: Context, config: StoreConfig, callback: AsyncCallback<RdbStore>): void;
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns { Promise<RdbStore> } The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14800011 - Failed to open database by database corrupted.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns { Promise<RdbStore> } The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14800011 - Failed to open database by database corrupted.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Obtains a RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns { Promise<RdbStore> } The RDB store {@link RdbStore}.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Invalid database path.
     * @throws { BusinessError } 14800011 - Database corrupted.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @throws { BusinessError } 14800017 - Config changed.
     * @throws { BusinessError } 14800021 - SQLite: Generic error.
     * @throws { BusinessError } 14800027 - SQLite: Attempt to write a readonly database.
     * @throws { BusinessError } 14800028 - SQLite: Some kind of disk I/O error occurred.
     * @throws { BusinessError } 14800029 - SQLite: The database is full.
     * @throws { BusinessError } 14800030 - SQLite: Unable to open the database file.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 12
     */
    function getRdbStore(context: Context, config: StoreConfig): Promise<RdbStore>;
    /**
     * Deletes the database with a specified name.
     * When specify custom directory, this function should not be called.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @param { AsyncCallback<void> } callback - The callback of deleteRdbStore.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Deletes the database with a specified name.
     * When specify custom directory, this function should not be called.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @param { AsyncCallback<void> } callback - The callback of deleteRdbStore.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    function deleteRdbStore(context: Context, name: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes the database with a specified store config.
     * When specify custom directory, this function should be called.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { AsyncCallback<void> } callback - The callback of deleteRdbStore.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    function deleteRdbStore(context: Context, config: StoreConfig, callback: AsyncCallback<void>): void;
    /**
     * Deletes the database with a specified name.
     * When specify custom directory, this function should not be called.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 9
     */
    /**
     * Deletes the database with a specified name.
     * When specify custom directory, this function should not be called.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes the database with a specified name.
     * When specify custom directory, this function should not be called.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Invalid database path.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 12
     */
    function deleteRdbStore(context: Context, name: string): Promise<void>;
    /**
     * Deletes the database with a specified store config.
     * When specify custom directory, this function should be called.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Failed to open or delete database by invalid database path.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 10
     */
    /**
     * Deletes the database with a specified store config.
     * When specify custom directory, this function should be called.
     *
     * @param { Context } context - Indicates the context of an application or ability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     * <br>2. Incorrect parameter types.
     * @throws { BusinessError } 801 - Capability not supported.
     * @throws { BusinessError } 14800000 - Inner error.
     * @throws { BusinessError } 14800010 - Invalid database path.
     * @throws { BusinessError } 14801001 - Only supported in stage mode.
     * @throws { BusinessError } 14801002 - The data group id is not valid.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @crossplatform
     * @since 12
     */
    function deleteRdbStore(context: Context, config: StoreConfig): Promise<void>;
}
export default relationalStore;
