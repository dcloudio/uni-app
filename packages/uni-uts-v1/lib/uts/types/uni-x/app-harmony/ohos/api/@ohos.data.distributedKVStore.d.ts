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
import { AsyncCallback, Callback } from './@ohos.base';
import BaseContext from './application/BaseContext';
/**
 * Provider interfaces to create a {@link KVManager} instance.
 *
 * @namespace distributedKVStore
 * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
 * @since 9
 */
declare namespace distributedKVStore {
    /**
     * Provides configuration information to create a {@link KVManager} instance,
     * which includes the caller's package name and ability or hap context.
     *
     * @interface KVManagerConfig
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface KVManagerConfig {
        /**
         * Indicates the bundleName
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        bundleName: string;
        /**
         * Indicates the ability or hap context
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * if swap the area, you should close all the KV store and use the new Context to create the KVManager
         * @since 9
         */
        /**
         * Indicates the ability or hap context
         *
         * @type { BaseContext }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * if swap the area, you should close all the KV store and use the new BaseContext to create the KVManager
         * @since 10
         */
        context: BaseContext;
    }
    /**
     * KVStore constants
     *
     * @interface Constants
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface Constants {
        /**
         * Max key length is 1024.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_KEY_LENGTH: number;
        /**
         * Max value length is 4194303.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_VALUE_LENGTH: number;
        /**
         * Max device coordinate key length is 896.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_KEY_LENGTH_DEVICE: number;
        /**
         * Max store id length is 128.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_STORE_ID_LENGTH: number;
        /**
         * Max query length is 512000.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_QUERY_LENGTH: number;
        /**
         * Max batch operation size is 128.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        readonly MAX_BATCH_SIZE: number;
    }
    /**
     * Indicates the {@code ValueType}.
     * <p>{@code ValueType} is obtained based on the value.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    enum ValueType {
        /**
         * Indicates that the value type is string.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        STRING,
        /**
         * Indicates that the value type is int.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        INTEGER,
        /**
         * Indicates that the value type is float.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        FLOAT,
        /**
         * Indicates that the value type is byte array.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        BYTE_ARRAY,
        /**
         * Indicates that the value type is boolean.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        BOOLEAN,
        /**
         * Indicates that the value type is double.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        DOUBLE
    }
    /**
     * Obtains {@code Value} objects stored in a {@link SingleKVStore} or {@link DeviceKVStore} database.
     *
     * @interface Value
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface Value {
        /**
         * Indicates the value type
         *
         * @type { ValueType }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         * @see ValueType
         */
        type: ValueType;
        /**
         * Indicates the value
         *
         * @type { Uint8Array | string | number | boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        value: Uint8Array | string | number | boolean;
    }
    /**
     * Provides key-value pairs stored in the distributedKVStore.
     *
     * @interface Entry
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface Entry {
        /**
         * Indicates the key
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        key: string;
        /**
         * Indicates the value
         *
         * @type { Value }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        value: Value;
    }
    /**
     * Receive notifications of all data changes, including data insertion, update, and deletion.
     * <p>If you have subscribed to {@code SingleKVStore} or {@code DeviceKVStore}, you will receive
     * data change notifications and obtain the changed data from the parameters in callback methods
     * upon data insertion, update or deletion.
     *
     * @interface ChangeNotification
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface ChangeNotification {
        /**
         * Indicates data insertion records.
         *
         * @type { Entry[] }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        insertEntries: Entry[];
        /**
         * Indicates data update records.
         *
         * @type { Entry[] }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        updateEntries: Entry[];
        /**
         * Indicates data deletion records.
         *
         * @type { Entry[] }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deleteEntries: Entry[];
        /**
         * Indicates the device id which brings the data change.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deviceId: string;
    }
    /**
     * Indicates the database synchronization mode.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    enum SyncMode {
        /**
         * Indicates that data is only pulled from the remote end.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        PULL_ONLY,
        /**
         * Indicates that data is only pushed from the local end.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        PUSH_ONLY,
        /**
         * Indicates that data is pushed from the local end, and then pulled from the remote end.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        PUSH_PULL
    }
    /**
     * Describes the subscription type.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    enum SubscribeType {
        /**
         * Subscription to local data changes
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        SUBSCRIBE_TYPE_LOCAL,
        /**
         * Subscription to remote data changes
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        SUBSCRIBE_TYPE_REMOTE,
        /**
         * Subscription to both local and remote data changes
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        SUBSCRIBE_TYPE_ALL
    }
    /**
     * Describes the KVStore type.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    enum KVStoreType {
        /**
         * Device-collaboration database, as specified by {@code DeviceKVStore}
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        DEVICE_COLLABORATION,
        /**
         * Single-version database, as specified by {@code SingleKVStore}
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        SINGLE_VERSION
    }
    /**
     * Describes the KVStore security level.
     *
     * @enum { number }
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    enum SecurityLevel {
        /**
         * S1: means the db is in the low security level
         * There are some low impact when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        S1,
        /**
         * S2: means the db is in the middle security level
         * There are some major impact when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        S2,
        /**
         * S3: means the db is in the high security level
         * There are some severity impact when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        S3,
        /**
         * S4: means the db is in the critical security level
         * There are some critical impact when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        S4
    }
    /**
     * Provides configuration options to create a {@code SingleKVStore} or {@code DeviceKVStore}.
     *
     * @interface Options
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface Options {
        /**
         * Indicates whether to create a database when the database file does not exist
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        createIfMissing?: boolean;
        /**
         * Indicates whether database files to be encrypted
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        encrypt?: boolean;
        /**
         * Indicates whether to back up database files
         *
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        backup?: boolean;
        /**
         * Indicates whether database files are automatically synchronized
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @type { ?boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        autoSync?: boolean;
        /**
         * Indicates the database type
         *
         * @type { ?KVStoreType }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        kvStoreType?: KVStoreType;
        /**
         * Indicates the database security level
         *
         * @type { SecurityLevel }
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        securityLevel: SecurityLevel;
        /**
         * Indicates the database schema
         *
         * @type { ?Schema }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        schema?: Schema;
    }
    /**
     * Represents the database schema.
     * You can set the schema object in options when create or open the database.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 9
     */
    class Schema {
        /**
         * A constructor used to create a Schema instance.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        constructor();
        /**
         * Indicates the root json object.
         *
         * @type { FieldNode }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        root: FieldNode;
        /**
         * Indicates the string array of json.
         *
         * @type { Array<string> }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        indexes: Array<string>;
        /**
         * Indicates the mode of schema.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        mode: number;
        /**
         * Indicates the skip size of schema.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        skip: number;
    }
    /**
     * Represents a node of a {@link Schema} instance.
     * <p>With a {@link Schema} instance, you can define the value fields which stored in the database.
     * <p>A FieldNode of the {@link Schema} instance is either a leaf or a non-leaf node.
     * <p>The leaf node must have a value; the non-leaf node must have a child {@code FieldNode}.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 9
     */
    class FieldNode {
        /**
         * A constructor used to create a FieldNode instance with the specified field.
         * name Indicates the field node name.
         *
         * @param { string } name - It can not be empty.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        constructor(name: string);
        /**
         * Adds a child node to this {@code FieldNode}.
         * <p>Add a child node to makes this node a non-leaf node and field value will be ignored if it has a child node.
         *
         * @param { FieldNode } child - The field node to append.
         * @returns { boolean } Returns true if the child node is successfully added to this {@code FieldNode} and false otherwise.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect Parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        appendChild(child: FieldNode): boolean;
        /**
         * Indicates the default value of field node.
         *
         * @type { string }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        default: string;
        /**
         * Indicates the nullable of database field.
         *
         * @type { boolean }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        nullable: boolean;
        /**
         * Indicates the type of value.
         *
         * @type { number }
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        type: number;
    }
    /**
     * Provides methods to operate the result set of the {@code SingleKVStore} or {@code DeviceKVStore} database.
     * <p>The result set is created by using the {@code getResultSet} method in the {@code SingleKVStore} or
     * {@code DeviceKVStore} class. This interface also provides methods to move the data read
     * position in the result set.
     *
     * @interface KVStoreResultSet
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface KVStoreResultSet {
        /**
         * Obtains the number of lines in a result set.
         *
         * @returns { number } Returns the number of lines.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getCount(): number;
        /**
         * Obtains the current read position in a result set.
         *
         * @returns { number } Returns the current read position. The read position starts with 0.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getPosition(): number;
        /**
         * Moves the read position to the first line.
         * <p>If the result set is empty, false is returned.
         *
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        moveToFirst(): boolean;
        /**
         * Moves the read position to the last line.
         * <p>If the result set is empty, false is returned.
         *
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        moveToLast(): boolean;
        /**
         * Moves the read position to the next line.
         * <p>If the result set is empty or the data in the last line is being read, false is returned.
         *
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        moveToNext(): boolean;
        /**
         * Moves the read position to the previous line.
         * <p>If the result set is empty or the data in the first line is being read, false is returned.
         *
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        moveToPrevious(): boolean;
        /**
         * Moves the read position by a relative offset to the current position.
         *
         * @param { number } offset - Indicates the relative offset to the current position. A negative offset indicates moving
         * backwards, and a positive offset indicates moving forwards. For example, if the current position is entry 1 and
         * this offset is 2, the destination position will be entry 3; if the current position is entry 3 and this offset is -2,
         * the destination position will be entry 1. The valid final position after moving forwards starts with 0. If the
         * final position is invalid, false will be returned.
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        move(offset: number): boolean;
        /**
         * Moves the read position from 0 to an absolute position.
         *
         * @param { number } position - Indicates the absolute position.
         * @returns { boolean } Returns true if the operation succeeds; return false otherwise.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        moveToPosition(position: number): boolean;
        /**
         * Checks whether the read position is the first line.
         *
         * @returns { boolean } Returns true if the read position is the first line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isFirst(): boolean;
        /**
         * Checks whether the read position is the last line.
         *
         * @returns { boolean } Returns true if the read position is the last line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isLast(): boolean;
        /**
         * Checks whether the read position is before the last line.
         *
         * @returns { boolean } Returns true if the read position is before the first line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isBeforeFirst(): boolean;
        /**
         * Checks whether the read position is after the last line.
         *
         * @returns { boolean } Returns true if the read position is after the last line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isAfterLast(): boolean;
        /**
         * Obtains a key-value pair.
         *
         * @returns { Entry } Returns a key-value pair.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntry(): Entry;
    }
    /**
     * Represents a database query using predicates.
     * <p>This class provides a constructor used to create a {@code Query} instance, which is used to query data
     * matching specified conditions in the database.
     * <p>This class also provides methods to add predicates to the {@code Query} instance.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    class Query {
        /**
         * A constructor used to create a Query instance.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        constructor();
        /**
         * Resets this {@code Query} object.
         *
         * @returns { Query } Returns the reset {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        reset(): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is equal to the specified long value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string | boolean } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        equalTo(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not equal to the specified int value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string | boolean } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        notEqualTo(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is greater than or equal to the
         * specified int value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string | boolean } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        greaterThan(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is less than the specified int value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        lessThan(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is greater than or
         * equal to the specified int value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        greaterThanOrEqualTo(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is less than or equal to the
         * specified int value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number | string } value - Indicates the value to be compared.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        lessThanOrEqualTo(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is null.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isNull(field: string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is within the specified int value list.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number[] } valueList - Indicates the int value list.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        inNumber(field: string, valueList: number[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is within the specified string value list.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { string[] } valueList - Indicates the string value list.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        inString(field: string, valueList: string[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not within the specified int value list.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { number[] } valueList - Indicates the int value list.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        notInNumber(field: string, valueList: number[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not within the specified string value list.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { string[] } valueList - Indicates the string value list.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        notInString(field: string, valueList: string[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is similar to the specified string value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { string } value - Indicates the string value.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        like(field: string, value: string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not similar to the specified string value.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @param { string } value - Indicates the string value.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        unlike(field: string, value: string): Query;
        /**
         * Constructs a {@code Query} object with the and condition.
         * <p>Multiple predicates should be connected using the and or or condition.
         *
         * @returns { Query } Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        and(): Query;
        /**
         * Constructs a {@code Query} object with the or condition.
         * <p>Multiple predicates should be connected using the and or or condition.
         *
         * @returns { Query } Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        or(): Query;
        /**
         * Constructs a {@code Query} object to sort the query results in ascending order.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        orderByAsc(field: string): Query;
        /**
         * Constructs a {@code Query} object to sort the query results in descending order.
         *
         * @param { string } field - Indicates the field, which cannot contain ^.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        orderByDesc(field: string): Query;
        /**
         * Constructs a {@code Query} object to specify the number of results and the start position.
         *
         * @param { number } total - Indicates the number of results.
         * @param { number } offset - Indicates the start position.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        limit(total: number, offset: number): Query;
        /**
         * Creates a {@code Query} condition with a specified field that is not null.
         *
         * @param { string } field - Indicates the specified field.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        isNotNull(field: string): Query;
        /**
         * Creates a query condition group with a left bracket.
         * <p>Multiple query conditions in an {@code Query} object can be grouped. The query conditions in a group can be used as a
         * whole to combine with other query conditions.
         *
         * @returns { Query } Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        beginGroup(): Query;
        /**
         * Creates a query condition group with a right bracket.
         * <p>Multiple query conditions in an {@code Query} object can be grouped. The query conditions in a group can be used as a
         * whole to combine with other query conditions.
         *
         * @returns { Query } Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        endGroup(): Query;
        /**
         * Creates a query condition with a specified key prefix.
         *
         * @param { string } prefix - Indicates the specified key prefix.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        prefixKey(prefix: string): Query;
        /**
         * Sets a specified index that will be preferentially used for query.
         *
         * @param { string } index - Indicates the index to set.
         * @returns { Query } Returns the {@coed Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        setSuggestIndex(index: string): Query;
        /**
         * Add device ID key prefix.Used by {@code DeviceKVStore}.
         *
         * @param { string } deviceId - Specify device id to query from, It can not be empty.
         * @returns { Query } Returns the {@code Query} object with device ID prefix added.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deviceId(deviceId: string): Query;
        /**
         * Get a String that represents this {@code Query}.
         * <p>The String would be parsed to DB query format.
         * The String length should be no longer than 500kb.
         *
         * @returns { string } String representing this {@code Query}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getSqlLike(): string;
    }
    /**
     * Provides methods related to single-version distributed databases.
     * <p>To create a {@code SingleKVStore} database,
     * you can use the {@link data.distributed.common.KVManager#getKVStore​(Options, String)} method
     * with {@code KVStoreType} set to {@code SINGLE_VERSION} for the input parameter {@code Options}.
     * This database synchronizes data to other databases in time sequence.
     * The {@code SingleKVStore} database does not support
     * synchronous transactions, or data search using snapshots.
     *
     * @interface SingleKVStore
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface SingleKVStore {
        /**
         * Writes a key-value pair of the string type into the {@code SingleKVStore} database.
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { Uint8Array | string | number | boolean } value - Indicates the value to be inserted.
         * @param { AsyncCallback<void> } callback - the callback of put.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Writes a key-value pair of the string type into the {@code SingleKVStore} database.
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { Uint8Array | string | number | boolean } value - Indicates the value to be inserted.
         * @param { AsyncCallback<void> } callback - the callback of put.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        put(key: string, value: Uint8Array | string | number | boolean, callback: AsyncCallback<void>): void;
        /**
         * Writes a key-value pair of the string type into the {@code SingleKVStore} database.
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { Uint8Array | string | number | boolean } value - Indicates the value to be inserted.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Writes a key-value pair of the string type into the {@code SingleKVStore} database.
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { Uint8Array | string | number | boolean } value - Indicates the value to be inserted.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        put(key: string, value: Uint8Array | string | number | boolean): Promise<void>;
        /**
         * Inserts key-value pairs into the {@code SingleKVStore} database in batches.
         *
         * @param { Entry[] } entries - Indicates the key-value pairs to be inserted in batches.
         * @param { AsyncCallback<void> } callback - the callback of putBatch.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Inserts key-value pairs into the {@code SingleKVStore} database in batches.
         *
         * @param { Entry[] } entries - Indicates the key-value pairs to be inserted in batches.
         * @param { AsyncCallback<void> } callback - the callback of putBatch.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        putBatch(entries: Entry[], callback: AsyncCallback<void>): void;
        /**
         * Inserts key-value pairs into the {@code SingleKVStore} database in batches.
         *
         * @param { Entry[] } entries - Indicates the key-value pairs to be inserted in batches.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Inserts key-value pairs into the {@code SingleKVStore} database in batches.
         *
         * @param { Entry[] } entries - Indicates the key-value pairs to be inserted in batches.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        putBatch(entries: Entry[]): Promise<void>;
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { AsyncCallback<void> } callback - the callback of delete.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param { AsyncCallback<void> } callback - the callback of delete.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        delete(key: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param { string } key - Indicates the key. Length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        delete(key: string): Promise<void>;
        /**
         * Deletes key-value pairs in batches from the {@code SingleKVStore} database.
         *
         * @param { string[] } keys - Indicates the key-value pairs to be deleted in batches, It can not be empty.
         * @param { AsyncCallback<void> } callback - the callback of deleteBatch.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Deletes key-value pairs in batches from the {@code SingleKVStore} database.
         *
         * @param { string[] } keys - Indicates the key-value pairs to be deleted in batches, It can not be empty.
         * @param { AsyncCallback<void> } callback - the callback of deleteBatch.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        deleteBatch(keys: string[], callback: AsyncCallback<void>): void;
        /**
         * Deletes key-value pairs in batches from the {@code SingleKVStore} database.
         *
         * @param { string[] } keys - Indicates the key-value pairs to be deleted in batches, It can not be empty.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Deletes key-value pairs in batches from the {@code SingleKVStore} database.
         *
         * @param { string[] } keys - Indicates the key-value pairs to be deleted in batches, It can not be empty.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        deleteBatch(keys: string[]): Promise<void>;
        /**
         * Removes data of the specified device from current database. This method is used to remove only the data
         * synchronized from remote devices. This operation does not synchronize data to other databases or affect
         * subsequent data synchronization.
         *
         * @param { string } deviceId - Identifies the device whose data is to be removed and the value cannot be the current device ID.
         * @param { AsyncCallback<void> } callback - the callback of removeDeviceData.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        removeDeviceData(deviceId: string, callback: AsyncCallback<void>): void;
        /**
         * Removes data of the specified device from current database. This method is used to remove only the data
         * synchronized from remote devices. This operation does not synchronize data to other databases or affect
         * subsequent data synchronization.
         *
         * @param { string } deviceId - Identifies the device whose data is to be removed and the value cannot be the current device ID.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        removeDeviceData(deviceId: string): Promise<void>;
        /**
         * Obtains the value of a specified key.
         *
         * @param { string } key - Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<boolean | string | number | Uint8Array> } callback -
         * {Uint8Array|string|boolean|number}: the returned value specified by the key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        get(key: string, callback: AsyncCallback<boolean | string | number | Uint8Array>): void;
        /**
         * Obtains the value of a specified key.
         *
         * @param { string } key - Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<boolean | string | number | Uint8Array> }
         * {Uint8Array|string|boolean|number}: the returned value specified by the key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        get(key: string): Promise<boolean | string | number | Uint8Array>;
        /**
         * Obtains all key-value pairs that match a specified key prefix.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * that match the specified key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(keyPrefix: string, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains all key-value pairs that match a specified key prefix.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs that match the
         * specified key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(keyPrefix: string): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * matching the specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs matching the
         * specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(query: Query): Promise<Entry[]>;
        /**
         * Obtains the result set with a specified prefix from a {@code SingleKVStore} database. The {@code KVStoreResultSet}
         * object can be used to query all key-value pairs that meet the search criteria. Each {@code SingleKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created
         * four objects, calling this method will return a failure. Therefore, you are advised to call the closeResultSet
         * method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the result set with a specified prefix from a {@code SingleKVStore} database. The {@code KVStoreResultSet}
         * object can be used to query all key-value pairs that meet the search criteria. Each {@code SingleKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created
         * four objects, calling this method will return a failure. Therefore, you are advised to call the closeResultSet
         * method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(keyPrefix: string, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the result set with a specified prefix from a {@code SingleKVStore} database. The {@code KVStoreResultSet}
         * object can be used to query all key-value pairs that meet the search criteria. Each {@code SingleKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created
         * four objects, calling this method will return a failure. Therefore, you are advised to call the closeResultSet
         * method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the result set with a specified prefix from a {@code SingleKVStore} database. The {@code KVStoreResultSet}
         * object can be used to query all key-value pairs that meet the search criteria. Each {@code SingleKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created
         * four objects, calling this method will return a failure. Therefore, you are advised to call the closeResultSet
         * method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(keyPrefix: string): Promise<KVStoreResultSet>;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(query: Query, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(query: Query): Promise<KVStoreResultSet>;
        /**
         * Closes a {@code KVStoreResultSet} object returned by getResultSet method.
         *
         * @param { KVStoreResultSet } resultSet - Indicates the {@code KVStoreResultSet} object to close.
         * @param { AsyncCallback<void> } callback - the callback of closeResultSet.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        closeResultSet(resultSet: KVStoreResultSet, callback: AsyncCallback<void>): void;
        /**
         * Closes a {@code KVStoreResultSet} object returned by getResultSet method.
         *
         * @param { KVStoreResultSet } resultSet - Indicates the {@code KVStoreResultSet} object to close.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        closeResultSet(resultSet: KVStoreResultSet): Promise<void>;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<number> } callback - {number}: the number of results matching the
         * specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getResultSize(query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<number> } {number}: the number of results matching the specified
         * {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getResultSize(query: Query): Promise<number>;
        /**
         * Backs up a database in the specified filename.
         *
         * @param { string } file - Indicates the database backup filename, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<void> } callback - the callback of backup.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        backup(file: string, callback: AsyncCallback<void>): void;
        /**
         * Backs up a database in the specified filename.
         *
         * @param { string } file - Indicates the database backup filename, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        backup(file: string): Promise<void>;
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } file - Indicates the database backup filename, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<void> } callback - the callback of restore.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        restore(file: string, callback: AsyncCallback<void>): void;
        /**
         * Restores a database from a specified database file.
         *
         * @param { string } file - Indicates the database backup filename, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        restore(file: string): Promise<void>;
        /**
         * Delete database backup files based on the specified filenames.
         *
         * @param { Array<string> } files - Indicates the backup filenames to be deleted, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<Array<[string, number]>> } callback - {Array<[string, number]>}:
         * the list of backup file and it's corresponding delete result which 0 means delete success
         * and otherwise failed.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deleteBackup(files: Array<string>, callback: AsyncCallback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Delete database backup files based on the specified filenames.
         *
         * @param { Array<string> } files - Indicates the backup filenames to be deleted, It can not be empty and
         * The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<Array<[string, number]>> } {Array<[string, number]>}: the list of backup
         * file and it's corresponding delete result which 0 means delete success and otherwise failed.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deleteBackup(files: Array<string>): Promise<Array<[
            string,
            number
        ]>>;
        /**
         * Starts a transaction operation in the {@code SingleKVStore} database.
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @param { AsyncCallback<void> } callback - the callback of startTransaction.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Starts a transaction operation in the {@code SingleKVStore} database.
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @param { AsyncCallback<void> } callback - the callback of startTransaction.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        startTransaction(callback: AsyncCallback<void>): void;
        /**
         * Starts a transaction operation in the {@code SingleKVStore} database.
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Starts a transaction operation in the {@code SingleKVStore} database.
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @throws { BusinessError } 14800047 - The WAL file size exceeds the default limit.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        startTransaction(): Promise<void>;
        /**
         * Submits a transaction operation in the {@code SingleKVStore} database.
         *
         * @param { AsyncCallback<void> } callback - the callback of commit.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        commit(callback: AsyncCallback<void>): void;
        /**
         * Submits a transaction operation in the {@code SingleKVStore} database.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        commit(): Promise<void>;
        /**
         * Rolls back a transaction operation in the {@code SingleKVStore} database.
         *
         * @param { AsyncCallback<void> } callback - the callback of rollback.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        rollback(callback: AsyncCallback<void>): void;
        /**
         * Rolls back a transaction operation in the {@code SingleKVStore} database.
         *
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        rollback(): Promise<void>;
        /**
         * Sets whether to enable synchronization.
         *
         * @param { boolean } enabled - Specifies whether to enable synchronization. The value true
         * means to enable synchronization, and false means the opposite.
         * @param { AsyncCallback<void> } callback - the callback of enableSync.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        enableSync(enabled: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets whether to enable synchronization.
         *
         * @param { boolean } enabled - Specifies whether to enable synchronization. The value true
         * means to enable synchronization, and false means the opposite.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        enableSync(enabled: boolean): Promise<void>;
        /**
         * Sets synchronization range labels.
         * <p>The labels determine the devices with which data will be synchronized.
         *
         * @param { string[] } localLabels - Indicates the synchronization labels of the local device.
         * @param { string[] } remoteSupportLabels - Indicates the labels of the devices with which
         * data will be synchronized.
         * @param { AsyncCallback<void> } callback - the callback of setSyncRange.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        setSyncRange(localLabels: string[], remoteSupportLabels: string[], callback: AsyncCallback<void>): void;
        /**
         * Sets synchronization range labels.
         * <p>The labels determine the devices with which data will be synchronized.
         *
         * @param { string[] } localLabels - Indicates the synchronization labels of the local device.
         * @param { string[] } remoteSupportLabels - Indicates the labels of the devices with which
         * data will be synchronized.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        setSyncRange(localLabels: string[], remoteSupportLabels: string[]): Promise<void>;
        /**
         * Sets the default delay allowed for database synchronization
         *
         * @param { number } defaultAllowedDelayMs - Indicates the default delay allowed for the
         * database synchronization, in milliseconds.
         * @param { AsyncCallback<void> } callback - the callback of setSyncParam.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        setSyncParam(defaultAllowedDelayMs: number, callback: AsyncCallback<void>): void;
        /**
         * Sets the default delay allowed for database synchronization
         *
         * @param { number } defaultAllowedDelayMs - Indicates the default delay allowed for the
         * database synchronization, in milliseconds.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        setSyncParam(defaultAllowedDelayMs: number): Promise<void>;
        /**
         * Synchronize the database to the specified devices with the specified delay allowed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string[] } deviceIds - Indicates the list of devices to which to synchronize the database.
         * @param { SyncMode } mode - Indicates the synchronization mode. The value can be {@code PUSH},
         * {@code PULL}, or {@code PUSH_PULL}.
         * @param { number } delayMs - Indicates the delay allowed for the synchronization, in milliseconds.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        sync(deviceIds: string[], mode: SyncMode, delayMs?: number): void;
        /**
         * Synchronize the database to the specified devices with the specified delay allowed.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param { string[] } deviceIds - Indicates the list of devices to which to synchronize the database.
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { SyncMode } mode - Indicates the synchronization mode. The value can be {@code PUSH},
         * {@code PULL}, or {@code PUSH_PULL}.
         * @param { number } delayMs - Indicates the delay allowed for the synchronization, in milliseconds.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        sync(deviceIds: string[], query: Query, mode: SyncMode, delayMs?: number): void;
        /**
         * Register a callback to the database and when data in the distributed database has changed,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Subscribed event name, fixed as 'dataChange', indicates the data change event.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@code SubscribeType}.
         * @param { Callback<ChangeNotification> } listener - {ChangeNotification}: the {@code ChangeNotification}
         * object indicates the data change events in the distributed database.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Register a callback to the database and when data in the distributed database has changed,
         * the callback will be invoked.
         *
         * @param { 'dataChange' } event - Subscribed event name, fixed as 'dataChange', indicates the data change event.
         * @param { SubscribeType } type - Indicates the subscription type, which is defined in {@code SubscribeType}.
         * @param { Callback<ChangeNotification> } listener - {ChangeNotification}: the {@code ChangeNotification}
         * object indicates the data change events in the distributed database.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        on(event: 'dataChange', type: SubscribeType, listener: Callback<ChangeNotification>): void;
        /**
         * Register a databases synchronization callback to the database.
         * <p> Sync result is returned through asynchronous callback.
         *
         * @param { 'syncComplete' } event - Subscribed event name, fixed as 'syncComplete', indicates the synchronization completion event.
         * @param { Callback<Array<[string, number]>> } syncCallback - {Array<[string, number]>}: the
         * deviceId and it's corresponding synchronization result which 0 means synchronization success
         * and otherwise failed.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        on(event: 'syncComplete', syncCallback: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Unsubscribe from the SingleKVStore database based on the specified subscribeType and listener.
         *
         * @param { 'dataChange' } event - The unsubscribe event name, fixed as 'dataChange', indicates the data change event.
         * @param { Callback<ChangeNotification> } listener - {ChangeNotification}: the {@code ChangeNotification}
         * object indicates the data change events in the distributed database.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        off(event: 'dataChange', listener?: Callback<ChangeNotification>): void;
        /**
         * Unregister the database synchronization callback.
         *
         * @param { 'syncComplete' } event - The unsubscribe event name, fixed as 'syncComplete', indicates the synchronization completion event.
         * @param { Callback<Array<[string, number]>> } syncCallback - {Array<[string, number]>}: the
         * deviceId and it's corresponding synchronization result which 0 means synchronization success
         * and otherwise failed.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        off(event: 'syncComplete', syncCallback?: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Get the security level of the database.
         *
         * @param { AsyncCallback<SecurityLevel> } callback - {SecurityLevel}: the {@code SecurityLevel}
         * object indicates the security level of the database.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getSecurityLevel(callback: AsyncCallback<SecurityLevel>): void;
        /**
         * Get the security level of the database.
         *
         * @returns { Promise<SecurityLevel> } {SecurityLevel}: the {@code SecurityLevel} object indicates
         * the security level of the database.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getSecurityLevel(): Promise<SecurityLevel>;
    }
    /**
     * Provides methods related to device-collaboration distributed databases.
     * <p>To create a {@code DeviceKVStore} database, you can use the {@link data.distributed.common.KVManager.getKVStore(Options, String)}
     * method with {@code KVStoreType} set to {@code DEVICE_COLLABORATION} for the input parameter Options. This database manages distributed
     * data by device, and cannot modify data synchronized from remote devices. When an application writes a key-value pair entry
     * into the database, the system automatically adds the ID of the device running the application to the key.
     *
     * @interface DeviceKVStore
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 9
     */
    interface DeviceKVStore extends SingleKVStore {
        /**
         * Obtains the value matching the local device ID and specified key.
         *
         * @param { string } key - Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<boolean | string | number | Uint8Array> } callback -
         * {Uint8Array|string|boolean|number}: the returned value specified by the local device ID and specified key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        get(key: string, callback: AsyncCallback<boolean | string | number | Uint8Array>): void;
        /**
         * Obtains the value matching the local device ID and specified key.
         *
         * @param { string } key - Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<boolean | string | number | Uint8Array> }
         * {Uint8Array|string|boolean|number}: the returned value specified by the local device ID and specified key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        get(key: string): Promise<boolean | string | number | Uint8Array>;
        /**
         * Obtains the value matching a specified device ID and key.
         *
         * @param { string } deviceId - Indicates the device to be queried.
         * @param { string } key - Indicates the key of the value to be queried. The length must be less than {@code MAX_KEY_LENGTH}.
         * @param { AsyncCallback<boolean | string | number | Uint8Array> } callback -
         * {boolean | string | number | Uint8Array}: the returned value specified by the deviceId and key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        get(deviceId: string, key: string, callback: AsyncCallback<boolean | string | number | Uint8Array>): void;
        /**
         * Obtains the value matching a specified device ID and key.
         *
         * @param { string } deviceId - Indicates the device to be queried.
         * @param { string } key - Indicates the key of the value to be queried. The length must be less than {@code MAX_KEY_LENGTH}.
         * @returns { Promise<boolean | string | number | Uint8Array> }
         * {Uint8Array|string|boolean|number}: the returned value specified by the deviceId and key.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100004 - Not found.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        get(deviceId: string, key: string): Promise<boolean | string | number | Uint8Array>;
        /**
         * Obtains all key-value pairs that match the local device ID and specified key prefix.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * that match the local device ID and specified key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(keyPrefix: string, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains all key-value pairs that match the local device ID and specified key prefix.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs that match the
         * local device ID and specified key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(keyPrefix: string): Promise<Entry[]>;
        /**
         * Obtains all key-value pairs matching a specified device ID and key prefix.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * that match the specified deviceId and key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getEntries(deviceId: string, keyPrefix: string, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains all key-value pairs matching a specified device ID and key prefix.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs that match the
         * specified deviceId and key prefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getEntries(deviceId: string, keyPrefix: string): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * matching the local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs matching the local device ID and
         * specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getEntries(query: Query): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the key-value pairs belong.
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<Entry[]> } callback - {Entry[]}: the list of all key-value pairs
         * matching the specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getEntries(deviceId: string, query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the key-value pairs belong.
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<Entry[]> } {Entry[]}: the list of all key-value pairs matching the
         * specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getEntries(deviceId: string, query: Query): Promise<Entry[]>;
        /**
         * Obtains the result set with the local device ID and specified prefix from a {@code DeviceKVStore} database.
         * The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria.
         * Each {@code DeviceKVStore} instance can have a maximum of four {@code KVStoreResultSet} objects at the same time.
         * If you have created four objects, calling this method will return a failure. Therefore, you are advised to
         * call the closeResultSet method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the result set with the local device ID and specified prefix from a {@code DeviceKVStore} database.
         * The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria.
         * Each {@code DeviceKVStore} instance can have a maximum of four {@code KVStoreResultSet} objects at the same time.
         * If you have created four objects, calling this method will return a failure. Therefore, you are advised to
         * call the closeResultSet method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(keyPrefix: string, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the result set with the local device ID and specified prefix from a {@code DeviceKVStore} database.
         * The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria.
         * Each {@code DeviceKVStore} instance can have a maximum of four {@code KVStoreResultSet} objects at the same time.
         * If you have created four objects, calling this method will return a failure. Therefore, you are advised to
         * call the closeResultSet method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the result set with the local device ID and specified prefix from a {@code DeviceKVStore} database.
         * The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria.
         * Each {@code DeviceKVStore} instance can have a maximum of four {@code KVStoreResultSet} objects at the same time.
         * If you have created four objects, calling this method will return a failure. Therefore, you are advised to
         * call the closeResultSet method to close unnecessary {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(keyPrefix: string): Promise<KVStoreResultSet>;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified device ID and key prefix.
         * <p>The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code DeviceKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified device ID and key prefix.
         * <p>The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code DeviceKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 10
         */
        getResultSet(deviceId: string, keyPrefix: string, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified device ID and key prefix.
         * <p>The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code DeviceKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the specified device ID and key prefix.
         * <p>The {@code KVStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code DeviceKVStore}
         * instance can have a maximum of four {@code KVStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KVStoreResultSet} objects in a timely manner.
         *
         * @param { string } deviceId - Identifies the device whose data is to be queried.
         * @param { string } keyPrefix - Indicates the key prefix to match.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and keyPrefix.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 10
         */
        getResultSet(deviceId: string, keyPrefix: string): Promise<KVStoreResultSet>;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(query: Query, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the {@code KVStoreResultSet} object matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 10
         */
        getResultSet(query: Query): Promise<KVStoreResultSet>;
        /**
         * Obtains the {@code KVStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the {@code KVStoreResultSet} object belongs.
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the {@code KVStoreResultSet} object belongs.
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<KVStoreResultSet> } callback - {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 10
         */
        getResultSet(deviceId: string, query: Query, callback: AsyncCallback<KVStoreResultSet>): void;
        /**
         * Obtains the {@code KVStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the {@code KVStoreResultSet} object belongs.
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        /**
         * Obtains the {@code KVStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the {@code KVStoreResultSet} object belongs.
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<KVStoreResultSet> } {KVStoreResultSet}: the {@code KVStoreResultSet}
         * object matching the specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100001 - Over max limits.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 10
         */
        getResultSet(deviceId: string, query: Query): Promise<KVStoreResultSet>;
        /**
         * Obtains the number of results matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<number> } callback - {number}: the number of results matching the
         * local device ID and specified {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getResultSize(query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching the local device ID and specified {@code Query} object.
         *
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<number> } {number}: the number of results matching the local device ID and specified
         * {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getResultSize(query: Query): Promise<number>;
        /**
         * Obtains the number of results matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the results belong.
         * @param { Query } query - Indicates the {@code Query} object.
         * @param { AsyncCallback<number> } callback - {number}: the number of results matching the
         * specified deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getResultSize(deviceId: string, query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching a specified device ID and {@code Query} object.
         *
         * @param { string } deviceId - Indicates the ID of the device to which the results belong.
         * @param { Query } query - Indicates the {@code Query} object.
         * @returns { Promise<number> } {number}: the number of results matching the specified
         * deviceId and {@code Query} object.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @throws { BusinessError } 15100005 - Database or result set already closed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        getResultSize(deviceId: string, query: Query): Promise<number>;
    }
    /**
     * Creates a {@link KVManager} instance based on the configuration information.
     * <p>You must pass {@link KVManagerConfig} to provide configuration information
     * to create a {@link KVManager} instance.
     *
     * @param { KVManagerConfig } config - Indicates the KVStore configuration information,
     * including the package name and context, and package name can not be empty.
     * @returns { KVManager } : the {@code KVManager} instance.
     * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
     * <br>2.Incorrect parameters types;
     * <br>3.Parameter verification failed.
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    function createKVManager(config: KVManagerConfig): KVManager;
    /**
     * Provides interfaces to manage a {@code SingleKVStore} database, including obtaining, closing, and deleting the {@code SingleKVStore}.
     *
     * @interface KVManager
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 9
     */
    interface KVManager {
        /**
         * Creates and obtains a KVStore database by specifying {@code Options} and {@code storeId}.
         *
         * @param { string } storeId - Identifies the KVStore database. The value of this parameter must be unique
         * for the same application, and different applications can share the same value. The storeId can consist
         * of only letters, digits, and underscores (_), and cannot exceed 128 characters.
         * @param { Options } options - Indicates the {@code Options} object used for creating and
         * obtaining the KVStore database.
         * @param { AsyncCallback<T> } callback - {T}: the {@code SingleKVStore} or {@code DeviceKVStore} instance.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100002 - Open existed database with changed options.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getKVStore<T>(storeId: string, options: Options, callback: AsyncCallback<T>): void;
        /**
         * Creates and obtains a KVStore database by specifying {@code Options} and {@code storeId}.
         *
         * @param { string } storeId - Identifies the KVStore database. The value of this parameter must be unique
         * for the same application, and different applications can share the same value. The storeId can consist
         * of only letters, digits, and underscores (_), and cannot exceed 128 characters.
         * @param { Options } options - Indicates the {@code Options} object used for creating and
         * obtaining the KVStore database.
         * @returns { Promise<T> } {T}: the {@code SingleKVStore} or {@code DeviceKVStore} instance.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @throws { BusinessError } 15100002 - Open existed database with changed options.
         * @throws { BusinessError } 15100003 - Database corrupted.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getKVStore<T>(storeId: string, options: Options): Promise<T>;
        /**
         * Closes the KVStore database.
         * <p>Warning: This method is not thread-safe. If you call this method to stop a KVStore database that is running, your
         * thread may crash.
         * <p>The KVStore database to close must be an object created by using the {@code getKVStore} method. Before using this
         * method, release the resources created for the database, for example, {@code KVStoreResultSet} for KVStore, otherwise
         * closing the database will fail.
         *
         * @param { string } appId - Identifies the application that the database belong to, and cannot exceed 256 characters.
         * @param { string } storeId - Identifies the KVStore database to close. The storeId can consist of only letters, digits,
         * and underscores (_), and cannot exceed 128 characters.
         * @param { AsyncCallback<void> } callback - the callback of closeKVStore.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        closeKVStore(appId: string, storeId: string, callback: AsyncCallback<void>): void;
        /**
         * Closes the KVStore database.
         * <p>Warning: This method is not thread-safe. If you call this method to stop a KVStore database that is running, your
         * thread may crash.
         * <p>The KVStore database to close must be an object created by using the {@code getKVStore} method. Before using this
         * method, release the resources created for the database, for example, {@code KVStoreResultSet} for KVStore, otherwise
         * closing the database will fail.
         *
         * @param { string } appId - Identifies the application that the database belong to, and cannot exceed 256 characters.
         * @param { string } storeId - Identifies the KVStore database to close. The storeId can consist of only letters, digits,
         * and underscores (_), and cannot exceed 128 characters.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        closeKVStore(appId: string, storeId: string): Promise<void>;
        /**
         * Deletes the KVStore database identified by storeId.
         * <p>Before using this method, close all KVStore instances in use that are identified by the same storeId.
         * <p>You can use this method to delete a KVStore database not in use. After the database is deleted, all its data will be
         * lost.
         *
         * @param { string } appId - Identifies the application that the database belong to, and cannot exceed 256 characters.
         * @param { string } storeId - Identifies the KVStore database to delete. The storeId can consist of only letters, digits,
         * and underscores (_), and cannot exceed 128 characters.
         * @param { AsyncCallback<void> } callback - the callback of deleteKVStore.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100004 - Not found.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deleteKVStore(appId: string, storeId: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the KVStore database identified by storeId.
         * <p>Before using this method, close all KVStore instances in use that are identified by the same storeId.
         * <p>You can use this method to delete a KVStore database not in use. After the database is deleted, all its data will be
         * lost.
         *
         * @param { string } appId - Identifies the application that the database belong to, and cannot exceed 256 characters.
         * @param { string } storeId - Identifies the KVStore database to delete. The storeId can consist of only letters, digits,
         * and underscores (_), and cannot exceed 128 characters.
         * @returns { Promise<void> } the promise returned by the function.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @throws { BusinessError } 15100004 - Not found.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        deleteKVStore(appId: string, storeId: string): Promise<void>;
        /**
         * Obtains the storeId of all KVStore databases that are created by using the {@code getKVStore} method and not deleted by
         * calling the {@code deleteKVStore} method.
         *
         * @param { string } appId - Identifies the application that obtains the databases, and cannot exceed 256 characters.
         * @param { AsyncCallback<string[]> } callback - {string[]}: the storeId of all created KVStore databases.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getAllKVStoreId(appId: string, callback: AsyncCallback<string[]>): void;
        /**
         * Obtains the storeId of all KVStore databases that are created by using the {@code getKVStore} method and not deleted by
         * calling the {@code deleteKVStore} method.
         *
         * @param { string } appId - Identifies the application that obtains the databases, and cannot exceed 256 characters.
         * @returns { Promise<string[]> } {string[]}: the storeId of all created KVStore databases.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified.
         * <br>2.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 9
         */
        getAllKVStoreId(appId: string): Promise<string[]>;
        /**
         * Register a death callback to get notification when the data manager service is terminated.
         * <p>If the data manager service is terminated,you need to re-subscribe to data change notifications and synchronization
         * completion notifications, and calling the sync method will return a failure.
         *
         * @param { 'distributedDataServiceDie' } event - Subscribed event name, fixed as 'distributedDataServiceDie', as a service status change events.
         * @param { Callback<void> } deathCallback - callback to be invoked when the data manager service is terminated.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        on(event: 'distributedDataServiceDie', deathCallback: Callback<void>): void;
        /**
         * Unregister the death callback. Not notification will be received when the data manager service is terminated.
         * <p>The unregistered death callback must be a registered death callback of the database. If no death callback parameter
         * is passed, all database death callbacks will be unregistered.
         *
         * @param { 'distributedDataServiceDie' } event - Unsubscribe event name, fixed as 'distributedDataServiceDie', as a service status change events.
         * @param { Callback<void> } deathCallback - the data manager service is terminated callback which has been registered.
         * @throws { BusinessError } 401 - Parameter error.Possible causes:1.Mandatory parameters are left unspecified;
         * <br>2.Incorrect parameters types;
         * <br>3.Parameter verification failed.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 9
         */
        off(event: 'distributedDataServiceDie', deathCallback?: Callback<void>): void;
    }
}
export default distributedKVStore;
