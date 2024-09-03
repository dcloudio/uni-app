/*
 * Copyright (c) 2021 Huawei Device Co., Ltd.
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
import { ResultSet as _ResultSet } from './data/rdb/resultSet';
import Context from './application/BaseContext';
/**
 * Provides methods for rdbStore create and delete.
 *
 * @namespace rdb
 * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.data.relationalStore
 */
declare namespace rdb {
    /**
     * Obtains an RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { number } version - Indicates the database version for upgrade or downgrade.
     * @param { AsyncCallback<RdbStore> } callback - The RDB store {@link RdbStore}.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.getRdbStore
     */
    function getRdbStore(context: Context, config: StoreConfig, version: number, callback: AsyncCallback<RdbStore>): void;
    /**
     * Obtains an RDB store.
     * You can set parameters of the RDB store as required. In general, this method is recommended
     * to obtain a rdb store.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { StoreConfig } config - Indicates the {@link StoreConfig} configuration of the database related to this RDB store.
     * @param { number } version - Indicates the database version for upgrade or downgrade.
     * @returns { Promise<RdbStore> } The RDB store {@link RdbStore}.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.getRdbStore
     */
    function getRdbStore(context: Context, config: StoreConfig, version: number): Promise<RdbStore>;
    /**
     * Deletes the database with a specified name.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @param { AsyncCallback<void> } callback - The callback of deleteRdbStore.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.deleteRdbStore
     */
    function deleteRdbStore(context: Context, name: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes the database with a specified name.
     *
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } name - Indicates the database name.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.deleteRdbStore
     */
    function deleteRdbStore(context: Context, name: string): Promise<void>;
    /**
     * Indicates the database synchronization mode.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.SyncMode
     */
    enum SyncMode {
        /**
         * Indicates the data is pushed to remote device from local device.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.SyncMode.SYNC_MODE_PUSH
         */
        SYNC_MODE_PUSH = 0,
        /**
         * Indicates the data is pulled from remote device to local device.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.SyncMode.SYNC_MODE_PULL
         */
        SYNC_MODE_PULL = 1
    }
    /**
     * Describes the subscription type.
     *
     * @permission ohos.permission.DISTRIBUTED_DATASYNC
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.SubscribeType
     */
    enum SubscribeType {
        /**
         * Subscription to remote data changes
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.SubscribeType.SUBSCRIBE_TYPE_REMOTE
         */
        SUBSCRIBE_TYPE_REMOTE = 0
    }
    /**
     * Provides methods for managing the relational database (RDB).
     * This class provides methods for creating, querying, updating, and deleting RDBs.
     *
     * @interface RdbStore
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.RdbStore
     */
    interface RdbStore {
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the row of data to be inserted into the table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The row ID if the operation is successful. returns -1 otherwise.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.insert
         */
        insert(table: string, values: ValuesBucket, callback: AsyncCallback<number>): void;
        /**
         * Inserts a row of data into the target table.
         *
         * @param { string } table - Indicates the row of data to be inserted into the table.
         * @param { ValuesBucket } values - Indicates the row of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } Return the row ID if the operation is successful. return -1 otherwise.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.insert
         */
        insert(table: string, values: ValuesBucket): Promise<number>;
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @param { AsyncCallback<number> } callback - The number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.batchInsert
         */
        batchInsert(table: string, values: Array<ValuesBucket>, callback: AsyncCallback<number>): void;
        /**
         * Inserts a batch of data into the target table.
         *
         * @param { string } table - Indicates the target table.
         * @param { Array<ValuesBucket> } values - Indicates the rows of data {@link ValuesBucket} to be inserted into the table.
         * @returns { Promise<number> } Return the number of values that were inserted if the operation is successful. returns -1 otherwise.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.batchInsert
         */
        batchInsert(table: string, values: Array<ValuesBucket>): Promise<number>;
        /**
         * Updates data in the database based on a a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates Indicates the row of data to be updated in the database.
         * The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.update
         */
        update(values: ValuesBucket, predicates: RdbPredicates, callback: AsyncCallback<number>): void;
        /**
         * Updates data in the database based on a a specified instance object of RdbPredicates.
         *
         * @param { ValuesBucket } values - Indicates Indicates the row of data to be updated in the database.
         * The key-value pairs are associated with column names of the database table.
         * @param { RdbPredicates } predicates - Indicates the specified update condition by the instance object of  {@link RdbPredicates}.
         * @returns { Promise<number> } Return the number of affected rows.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.update
         */
        update(values: ValuesBucket, predicates: RdbPredicates): Promise<number>;
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @param { AsyncCallback<number> } callback - The number of affected rows.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.delete
         */
        delete(predicates: RdbPredicates, callback: AsyncCallback<number>): void;
        /**
         * Deletes data from the database based on a specified instance object of RdbPredicates.
         *
         * @param { RdbPredicates } predicates - The specified delete condition by the instance object of {@link RdbPredicates}.
         * @returns { Promise<number> } Return the number of affected rows.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.delete
         */
        delete(predicates: RdbPredicates): Promise<number>;
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is empty array, the query applies to all columns.
         * @param { AsyncCallback<ResultSet> } callback - The {@link ResultSet} object if the operation is successful.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.query
         */
        query(predicates: RdbPredicates, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on specified conditions.
         *
         * @param { RdbPredicates } predicates - The specified query condition by the instance object of {@link RdbPredicates}.
         * @param { Array<string> } columns - The columns to query. If the value is null, the query applies to all columns.
         * @returns { Promise<ResultSet> } Return the {@link ResultSet} object if the operation is successful.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.query
         */
        query(predicates: RdbPredicates, columns?: Array<string>): Promise<ResultSet>;
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<ResultSet> } callback
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.querySql
         */
        querySql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<ResultSet>): void;
        /**
         * Queries data in the database based on SQL statement.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<ResultSet> } Return the {@link ResultSet} object if the operation is successful.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.querySql
         */
        querySql(sql: string, bindArgs?: Array<ValueType>): Promise<ResultSet>;
        /**
         * Executes an SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @param { AsyncCallback<void> } callback - The callback of executeSql.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.executeSql
         */
        executeSql(sql: string, bindArgs: Array<ValueType>, callback: AsyncCallback<void>): void;
        /**
         * Executes an SQL statement that contains specified parameters but returns no value.
         *
         * @param { string } sql - Indicates the SQL statement to execute.
         * @param { Array<ValueType> } bindArgs - Indicates the {@link ValueType} values of the parameters in the SQL statement. The values are strings.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.executeSql
         */
        executeSql(sql: string, bindArgs?: Array<ValueType>): Promise<void>;
        /**
         * Begin Transaction before execute your sql.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.beginTransaction
         */
        beginTransaction(): void;
        /**
         * Commit the the sql you have executed.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.commit
         */
        commit(): void;
        /**
         * Roll back the sql you have already executed.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.rollBack
         */
        rollBack(): void;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the tables name you want to set.
         * @param { AsyncCallback<void> } callback - The callback of setDistributedTables.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.setDistributedTables
         */
        setDistributedTables(tables: Array<string>, callback: AsyncCallback<void>): void;
        /**
         * Set table to be distributed table.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { Array<string> } tables - Indicates the tables name you want to set.
         * @returns { Promise<void> } The promise returned by the function.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.setDistributedTables
         */
        setDistributedTables(tables: Array<string>): Promise<void>;
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table - {string}: The distributed table name.
         * @param { AsyncCallback<string> } callback
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.obtainDistributedTableName
         */
        obtainDistributedTableName(device: string, table: string, callback: AsyncCallback<string>): void;
        /**
         * Obtain distributed table name of specified remote device according to local table name.
         * When query remote device database, distributed table name is needed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string } device - Indicates the remote device.
         * @param { string } table
         * @returns { Promise<string> } {string}: The distributed table name.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.obtainDistributedTableName
         */
        obtainDistributedTableName(device: string, table: string): Promise<string>;
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the remote device.
         * @param { RdbPredicates } predicates - {Array<[string, number]>}: Devices sync status array, {string}: device id, {number}: device sync status.
         * @param { AsyncCallback<Array<[string, number]>> } callback
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.sync
         */
        sync(mode: SyncMode, predicates: RdbPredicates, callback: AsyncCallback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Sync data between devices.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { SyncMode } mode - Indicates the remote device.
         * @param { RdbPredicates } predicates
         * @returns { Promise<Array<[string, number]>> } {Array<[string, number]>}: Devices sync status array, {string}: device id, {number}: device sync status.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.sync
         */
        sync(mode: SyncMode, predicates: RdbPredicates): Promise<Array<[
            string,
            number
        ]>>;
        /**
         * Registers an observer for the database. When data in the distributed database changes,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: The observer of data change events in the distributed database.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.on
         */
        on(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;
        /**
         * Remove specified observer of specified type from the database.
         *
         * @param { 'dataChange' } event - Indicates the event must be string 'dataChange'.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@link SubscribeType}.
         * If its value is SUBSCRIBE_TYPE_REMOTE, ohos.permission.DISTRIBUTED_DATASYNC is required.
         * @param { Callback<Array<string>> } observer - {Array<string>}: The data change observer already registered.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbStore.off
         */
        off(event: 'dataChange', type: SubscribeType, observer: Callback<Array<string>>): void;
    }
    /**
     * Indicates possible value types
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.ValueType
     */
    type ValueType = number | string | boolean;
    /**
     * Values in buckets are stored in key-value pairs
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.ValuesBucket
     */
    type ValuesBucket = {
        [key: string]: ValueType | Uint8Array | null;
    };
    /**
     * Manages relational database configurations.
     *
     * @interface StoreConfig
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.StoreConfig
     */
    interface StoreConfig {
        /**
         * Manages relational database configurations.
         *
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.StoreConfig
         */
        name: string;
    }
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.relationalStore.RdbPredicates
     */
    class RdbPredicates {
        /**
         * A parameterized constructor used to create an RdbPredicates instance.
         *
         * @param { string } name - Indicates the table name of the database.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.constructor
         */
        constructor(name: string);
        /**
         * Sync data between devices.
         * When query database, this function should not be called.
         *
         * @param { Array<string> } devices - Indicates specified remote devices.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.inDevices
         */
        inDevices(devices: Array<string>): RdbPredicates;
        /**
         * Specify all remote devices which connect to local device when syncing distributed database.
         * When query database, this function should not be called.
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.inAllDevices
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.equalTo
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.notEqualTo
         */
        notEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Adds a left parenthesis to the RdbPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the left parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.beginWrap
         */
        beginWrap(): RdbPredicates;
        /**
         * Adds a right parenthesis to the RdbPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together
         * with beginWrap().
         *
         * @returns { RdbPredicates } - The {@link RdbPredicates} with the right parenthesis.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.endWrap
         */
        endWrap(): RdbPredicates;
        /**
         * Adds an or condition to the RdbPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns { RdbPredicates } Returns the {@link RdbPredicates} with the or condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.or
         */
        or(): RdbPredicates;
        /**
         * Adds an and condition to the RdbPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns { RdbPredicates } Returns the {@link RdbPredicates} with the or condition.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.and
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.contains
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.beginsWith
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.endsWith
         */
        endsWith(field: string, value: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.isNull
         */
        isNull(field: string): RdbPredicates;
        /**
         * Configure the RdbPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { RdbPredicates } - The {@link RdbPredicates} self.
         * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified; 2. Incorrect parameter types.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.isNotNull
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.like
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
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.glob
         */
        glob(field: string, value: string): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.between
         */
        between(field: string, low: ValueType, high: ValueType): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is int and value is
         * out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates  the maximum value to.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.notBetween
         */
        notBetween(field: string, low: ValueType, high: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.greaterThan
         */
        greaterThan(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.lessThan
         */
        lessThan(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.greaterThanOrEqualTo
         */
        greaterThanOrEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.lessThanOrEqualTo
         */
        lessThanOrEqualTo(field: string, value: ValueType): RdbPredicates;
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.orderByAsc
         */
        orderByAsc(field: string): RdbPredicates;
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.orderByDesc
         */
        orderByDesc(field: string): RdbPredicates;
        /**
         * Restricts each row of the query result to be unique.
         *
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.distinct
         */
        distinct(): RdbPredicates;
        /**
         * Restricts the max number of return records.
         *
         * @param { number } value - Indicates the max length of the return list.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.limitAs
         */
        limitAs(value: number): RdbPredicates;
        /**
         * Configure RdbPredicates to specify the start position of the returned result.
         * Use this method together with limit(int).
         *
         * @param { number } rowOffset - Indicates the start position of the returned result. The value is a positive integer.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.offsetAs
         */
        offsetAs(rowOffset: number): RdbPredicates;
        /**
         * Configure RdbPredicates to group query results by specified columns.
         *
         * @param { Array<string> } fields - Indicates the specified columns by which query results are grouped.
         * @returns { RdbPredicates } - The SQL query statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.groupBy
         */
        groupBy(fields: Array<string>): RdbPredicates;
        /**
         * Configure RdbPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @param { string } field - Indicates the name of the index column.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.indexedBy
         */
        indexedBy(field: string): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.in
         */
        in(field: string, value: Array<ValueType>): RdbPredicates;
        /**
         * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
         * are out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with {@link RdbPredicates}.
         * @returns { RdbPredicates } - The SQL statement with the specified {@link RdbPredicates}.
         * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.relationalStore.RdbPredicates.notIn
         */
        notIn(field: string, value: Array<ValueType>): RdbPredicates;
    }
    /**
     * Configure RdbPredicates to match the specified field whose data type is ValueType array and values
     * are out of a given range.
     * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
     * @since 7
     * @deprecated since 9
     */
    export type ResultSet = _ResultSet;
}
/**
 * Provides methods for rdbStore create and delete.
 * @syscap SystemCapability.DistributedDataManager.RelationalStore.Core
 * @since 7
 * @deprecated since 9
 */
export default rdb;
