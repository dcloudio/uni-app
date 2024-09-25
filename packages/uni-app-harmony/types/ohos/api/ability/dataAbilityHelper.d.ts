/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit AbilityKit
 */
import { AsyncCallback } from '../@ohos.base';
import { ResultSet } from '../data/rdb/resultSet';
import { DataAbilityOperation } from './dataAbilityOperation';
import { DataAbilityResult } from './dataAbilityResult';
import dataAbility from '../@ohos.data.dataAbility';
import rdb from '../@ohos.data.rdb';
/**
 * DataAbilityHelper
 *
 * @interface DataAbilityHelper
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
export interface DataAbilityHelper {
    /**
     * Opens a file in a specified remote path.
     *
     * @param { string } uri - Indicates the path of the file to open.
     * @param { string } mode - Indicates the file open mode, which can be "r" for read-only access, "w" for write-only
     *                   access (erasing whatever data is currently in the file), "wt" for write access that truncates
     *                   any existing file, "wa" for write-only access to append to any existing data, "rw" for read
     *                   and write access on any existing data, or "rwt" for read and write access that truncates any
     *                   existing file.
     * @param { AsyncCallback<number> } callback - Indicates the callback when openfile success
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    openFile(uri: string, mode: string, callback: AsyncCallback<number>): void;
    /**
     * Opens a file in a specified remote path.
     *
     * @param { string } uri - Indicates the path of the file to open.
     * @param { string } mode - Indicates the file open mode, which can be "r" for read-only access, "w" for write-only
     *                   access (erasing whatever data is currently in the file), "wt" for write access that truncates
     *                   any existing file, "wa" for write-only access to append to any existing data, "rw" for read and
     *                   write access on any existing data, or "rwt" for read and write access that truncates any
     *                   existing file.
     * @returns { Promise<number> } Returns the file descriptor.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    openFile(uri: string, mode: string): Promise<number>;
    /**
     * Registers an observer to observe data specified by the given uri.
     *
     * @param { 'dataChange' } type - dataChange.
     * @param { string } uri - Indicates the path of the data to operate.
     * @param { AsyncCallback<void> } callback - Indicates the callback when dataChange.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    on(type: 'dataChange', uri: string, callback: AsyncCallback<void>): void;
    /**
     * Deregisters all observers used for monitoring data specified by the given uri.
     *
     * @param { 'dataChange' } type - dataChange.
     * @param { string } uri - Indicates the path of the data to operate.
     * @param { AsyncCallback<void> } [callback] - Indicates the registered callback.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    off(type: 'dataChange', uri: string, callback?: AsyncCallback<void>): void;
    /**
     * Obtains the MIME type of the date specified by the given URI.
     *
     * @param { string } uri - Indicates the path of the data to operate.
     * @param { AsyncCallback<string> } callback - Indicates the callback method for obtaining the type of media resource,
     *                                             returning the media resource type that matches the uri pointing data.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getType(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Obtains the MIME type of the date specified by the given URI.
     *
     * @param { string } uri - Indicates the path of the data to operate.
     * @returns { Promise<string> } Returns the MIME type that matches the data specified by uri.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getType(uri: string): Promise<string>;
    /**
     * Obtains the MIME types of files supported.
     *
     * @param { string } uri - Indicates the path of the files to obtain.
     * @param { string } mimeTypeFilter - Indicates the MIME types of the files to obtain.
     * @param { AsyncCallback<Array<string>> } callback - Indicates the callback method for obtaining media resource
     *                                                    types, returning an array of matching media resource types.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getFileTypes(uri: string, mimeTypeFilter: string, callback: AsyncCallback<Array<string>>): void;
    /**
     * Obtains the MIME types of files supported.
     *
     * @param { string } uri - Indicates the path of the files to obtain.
     * @param { string } mimeTypeFilter - Indicates the MIME types of the files to obtain.
     * @returns { Promise<Array<string>> } Returns the matched MIME types Array.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getFileTypes(uri: string, mimeTypeFilter: string): Promise<Array<string>>;
    /**
     * Converts the given uri that refers to the Data ability into a normalized uri.
     *
     * @param { string } uri - Indicates the uri object to normalize.
     * @param { AsyncCallback<string> } callback - Indicates the callback method for uri normalization, and if the data
     *                                             function supports uri normalization, returns the normalized uri object;
     *                                             Otherwise return null.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    normalizeUri(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Converts the given uri that refers to the Data ability into a normalized uri.
     *
     * @param { string } uri - Indicates the uri object to normalize.
     * @returns { Promise<string> } Returns normalized uri object if Data ability supports URI normalization or null.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    normalizeUri(uri: string): Promise<string>;
    /**
     * Converts the given normalized uri generated by normalizeUri(uri) into a denormalized one.
     *
     * @param { string } uri - Indicates the uri object to normalize.
     * @param { AsyncCallback<string> } callback - Indicates the callback method of denormalization uri.If
     *                                             denormalization succeeds,the denormalization uri object is returned.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    denormalizeUri(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Converts the given normalized uri generated by normalizeUri(uri) into a denormalized one.
     *
     * @param { string } uri - Indicates the uri object to normalize.
     * @returns { Promise<string> } Returns the denormalized uri object if the denormalization is successful.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    denormalizeUri(uri: string): Promise<string>;
    /**
     * Notifies the registered observers of a change to the data resource specified by uri.
     *
     * @param { string } uri - Indicates the path of the data to operate.
     * @param { AsyncCallback<void> } callback - callback method.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    notifyChange(uri: string, callback: AsyncCallback<void>): void;
    /**
     * Notifies the registered observers of a change to the data resource specified by uri.
     *
     * @param { string } uri - Indicates the path of the data to operate.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    notifyChange(uri: string): Promise<void>;
    /**
     * Inserts a single data record into the database.
     *
     * @param { string } uri - Indicates the path of the data to insert.
     * @param { rdb.ValuesBucket } valuesBucket - Indicates the data record to insert. If this parameter is null, a blank
     *                                            row will be inserted.
     * @param { AsyncCallback<number> } callback - Indicates the callback method for data insertion, returning the index
     *                                             of the inserted data record.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    insert(uri: string, valuesBucket: rdb.ValuesBucket, callback: AsyncCallback<number>): void;
    /**
     * Inserts a single data record into the database.
     *
     * @param { string } uri - Indicates the path of the data to insert.
     * @param { rdb.ValuesBucket } valuesBucket - Indicates the data record to insert. If this parameter is null,
     *                                            a blank row will be inserted.
     * @returns { Promise<number> } Returns the index of the inserted data record.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    insert(uri: string, valuesBucket: rdb.ValuesBucket): Promise<number>;
    /**
     * Inserts multiple data records into the database.
     *
     * @param { string } uri - Indicates the path of the data to batchInsert.
     * @param { Array<rdb.ValuesBucket> } valuesBuckets - Indicates the data records to insert.
     * @param { AsyncCallback<number> } callback - Callback method indicating batch data insertion, returning the number
     *                                             of inserted data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    batchInsert(uri: string, valuesBuckets: Array<rdb.ValuesBucket>, callback: AsyncCallback<number>): void;
    /**
     * Inserts multiple data records into the database.
     *
     * @param { string } uri - Indicates the path of the data to batchInsert.
     * @param { Array<rdb.ValuesBucket> } valuesBuckets - Indicates the data records to insert.
     * @returns { Promise<number> } Returns the number of data records inserted.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    batchInsert(uri: string, valuesBuckets: Array<rdb.ValuesBucket>): Promise<number>;
    /**
     * Deletes one or more data records from the database.
     *
     * @param { string } uri - Indicates the path of the data to delete.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. You should define the
     *                                                           processing logic when this parameter is null.
     * @param { AsyncCallback<number> } callback - A callback method that indicates data deletion, returning the number of
     *                                             deleted data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    delete(uri: string, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<number>): void;
    /**
     * Deletes one or more data records from the database.
     *
     * @param { string } uri - Indicates the path of the data to delete.
     * @param { dataAbility.DataAbilityPredicates } [predicates] - Indicates filter criteria. You should define the
     *                                                             processing logic when this parameter is null.
     * @returns { Promise<number> } Returns the number of data records deleted.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    delete(uri: string, predicates?: dataAbility.DataAbilityPredicates): Promise<number>;
    /**
     * Deletes one or more data records from the database.
     *
     * @param { string } uri - Indicates the path of the data to delete.
     * @param { AsyncCallback<number> } callback - A callback method that indicates data deletion, returning
     *                                             the number of deleted data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    delete(uri: string, callback: AsyncCallback<number>): void;
    /**
     * Updates data records in the database.
     *
     * @param { string } uri - Indicates the path of data to update.
     * @param { rdb.ValuesBucket } valuesBucket - Indicates the data to update.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. You should define the
     *                                                           processing logic when this parameter is null.
     * @param { AsyncCallback<number> } callback - A callback method that indicates data updates, returning the number of
     *                                             updated data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    update(uri: string, valuesBucket: rdb.ValuesBucket, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<number>): void;
    /**
     * Updates data records in the database.
     *
     * @param { string } uri - Indicates the path of data to update.
     * @param { rdb.ValuesBucket } valuesBucket - Indicates the data to update.
     * @param { dataAbility.DataAbilityPredicates } [predicates] - Indicates filter criteria. You should define the
     *                                                             processing logic when this parameter is null.
     * @returns { Promise<number> } Returns the number of data records updated.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    update(uri: string, valuesBucket: rdb.ValuesBucket, predicates?: dataAbility.DataAbilityPredicates): Promise<number>;
    /**
     * Updates data records in the database.
     *
     * @param { string } uri - Indicates the path of data to update.
     * @param { rdb.ValuesBucket } valuesBucket - Indicates the data to update.
     * @param { AsyncCallback<number> } callback - A callback method that indicates data updates, returning the number of
     *                                             updated data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    update(uri: string, valuesBucket: rdb.ValuesBucket, callback: AsyncCallback<number>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { Array<string> } columns - Indicates columns to query. If this parameter is null, all columns are queried.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. You should define the
     *                                                           processing logic when this parameter is null.
     * @param { AsyncCallback<ResultSet> } callback - Indicates the callback method for data queries, returning the
     *                                                number of queried data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query(uri: string, columns: Array<string>, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<ResultSet>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { AsyncCallback<ResultSet> } callback - Indicates the callback method for data queries, returning the
     *                                                number of queried data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query(uri: string, callback: AsyncCallback<ResultSet>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { Array<string> } columns - Indicates columns to query. If this parameter is null, all columns are queried.
     * @param { AsyncCallback<ResultSet> } callback - Indicates the callback method for data queries, returning the
     *                                                number of queried data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query(uri: string, columns: Array<string>, callback: AsyncCallback<ResultSet>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. You should define the
     *                                                           processing logic when this parameter is null.
     * @param { AsyncCallback<ResultSet> } callback - Indicates the callback method for data queries, returning the
     *                                                number of queried data records.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query(uri: string, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<ResultSet>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { Array<string> } [columns] - Indicates columns to query. If this parameter is null, all columns are queried.
     * @param { dataAbility.DataAbilityPredicates } [predicates] - Indicates filter criteria. You should define the
     *                                                             processing logic when this parameter is null.
     * @returns { Promise<ResultSet> } Returns the query result {@link ResultSet}.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query(uri: string, columns?: Array<string>, predicates?: dataAbility.DataAbilityPredicates): Promise<ResultSet>;
    /**
     * Calls the extended API of the DataAbility. This method uses a promise to return the result.
     *
     * @param { string } uri - URI of the Data ability. Example: "dataability:///com.example.xxx.xxxx"
     * @param { string } method - Indicates the method to call.
     * @param { string } arg - Indicates the parameter of the String type.
     * @param { PacMap } extras - Indicates the parameter of the PacMap type.
     * @param { AsyncCallback<PacMap> } callback - A callback method that indicates a data operation and returns the
     *                                             result of the operation.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    call(uri: string, method: string, arg: string, extras: PacMap, callback: AsyncCallback<PacMap>): void;
    /**
     * Calls the extended API of the DataAbility. This method uses a promise to return the result.
     *
     * @param { string } uri - URI of the Data ability. Example: "dataability:///com.example.xxx.xxxx"
     * @param { string } method - Indicates the method to call.
     * @param { string } arg - Indicates the parameter of the String type.
     * @param { PacMap } extras - Indicates the parameter of the PacMap type.
     * @returns { Promise<PacMap> } Returns the query result {@link PacMap}.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    call(uri: string, method: string, arg: string, extras: PacMap): Promise<PacMap>;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { Array<DataAbilityOperation> } operations - Indicates the data operation list, which can contain multiple
     *                                                     operations on the database.
     * @param { AsyncCallback<Array<DataAbilityResult>> } callback - Callback method indicating batch operations,
     *                                                               returning the result of each operation in the
     *                                                               DataAbilityResult array.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    executeBatch(uri: string, operations: Array<DataAbilityOperation>, callback: AsyncCallback<Array<DataAbilityResult>>): void;
    /**
     * Queries data in the database.
     *
     * @param { string } uri - Indicates the path of data to query.
     * @param { Array<DataAbilityOperation> } operations - Indicates the data operation list, which can contain multiple
     *                                                     operations on the database.
     * @returns { Promise<Array<DataAbilityResult>> } Returns the result of each operation,
     *                                                in array {@link DataAbilityResult}.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    executeBatch(uri: string, operations: Array<DataAbilityOperation>): Promise<Array<DataAbilityResult>>;
}
/**
 * Defines a PacMap object for storing a series of values.
 *
 * @typedef PacMap
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
/**
 * Defines a PacMap object for storing a series of values.
 *
 * @typedef PacMap
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @since 11
 */
export interface PacMap {
    /**
     * Indicates the parameter of the PacMap type.
     * If a custom Sequenceable object is put in the PacMap object and will be transferred across processes,
     * you must call BasePacMap.setClassLoader(ClassLoader) to set a class loader for the custom object.
     * If the PacMap object is to be transferred to a non-OHOS process,
     * values of primitive types are supported, but not custom Sequenceable objects.
     *
     * @type { number | string | boolean | Array<string | number | boolean> | null }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    /**
     * Indicates the parameter of the PacMap type.
     * If a custom Sequenceable object is put in the PacMap object and will be transferred across processes,
     * you must call BasePacMap.setClassLoader(ClassLoader) to set a class loader for the custom object.
     * If the PacMap object is to be transferred to a non-OHOS process,
     * values of primitive types are supported, but not custom Sequenceable objects.
     *
     * @type { number | string | boolean | Array<string | number | boolean> | null }
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @since 11
     */
    [key: string]: number | string | boolean | Array<string | number | boolean> | null;
}
