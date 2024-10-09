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
/**
 * Providers interfaces to creat a {@link KVManager} instance.
 *
 *  @namespace distributedData
 * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
 * @since 7
 * @deprecated since 9
 * @useinstead ohos.data.distributedKVStore
 */
declare namespace distributedData {
    /**
     * Provides configuration information for {@link KVManager} instances,
     * including the caller's package name and distributed network type.
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.KVManagerConfig
     */
    interface KVManagerConfig {
        /**
         * Indicates the user information
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         */
        userInfo: UserInfo;
        /**
         * Indicates the bundleName
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManagerConfig#bundleName
         */
        bundleName: string;
    }
    /**
     * Manages user information.
     *
     * <p>This class provides methods for obtaining the user ID and type, setting the user ID and type,
     * and checking whether two users are the same.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     */
    interface UserInfo {
        /**
         * Indicates the user ID to set
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         */
        userId?: string;
        /**
         * Indicates the user type to set
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         */
        userType?: UserType;
    }
    /**
     * Enumerates user types.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     */
    enum UserType {
        /**
         * Indicates a user that logs in to different devices using the same account.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         */
        SAME_USER_ID = 0
    }
    /**
     * KVStore constants
     *
     * @namespace Constants
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Constants
     */
    namespace Constants {
        /**
         * max key length.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_KEY_LENGTH
         */
        const MAX_KEY_LENGTH = 1024;
        /**
         * max value length.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_VALUE_LENGTH
         */
        const MAX_VALUE_LENGTH = 4194303;
        /**
         * max device coordinate key length.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_KEY_LENGTH_DEVICEs
         */
        const MAX_KEY_LENGTH_DEVICE = 896;
        /**
         * max store id length.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_STORE_ID_LENGTH
         */
        const MAX_STORE_ID_LENGTH = 128;
        /**
         * max query length.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_QUERY_LENGTH
         */
        const MAX_QUERY_LENGTH = 512000;
        /**
         * max batch operation size.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Constants#MAX_BATCH_SIZE
         */
        const MAX_BATCH_SIZE = 128;
    }
    /**
     * Indicates the {@code ValueType}.
     *
     * <p>{@code ValueType} is obtained based on the value.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.ValueType
     */
    enum ValueType {
        /**
         * Indicates that the value type is string.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#STRING
         */
        STRING = 0,
        /**
         * Indicates that the value type is int.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#INTEGER
         */
        INTEGER = 1,
        /**
         * Indicates that the value type is float.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#FLOAT
         */
        FLOAT = 2,
        /**
         * Indicates that the value type is byte array.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#BYTE_ARRAY
         * */
        BYTE_ARRAY = 3,
        /**
         * Indicates that the value type is boolean.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#BOOLEAN
         * */
        BOOLEAN = 4,
        /**
         * Indicates that the value type is double.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ValueType#DOUBLE
         */
        DOUBLE = 5
    }
    /**
     * Obtains {@code Value} objects stored in a {@link KVStore} database.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Value
     */
    interface Value {
        /**
         * Indicates value type
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @see ValueType
         * @type {number}
         * @memberof Value
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Value#type
         */
        type: ValueType;
        /**
         * Indicates value
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Value#value
         */
        value: Uint8Array | string | number | boolean;
    }
    /**
     * Provides key-value pairs stored in the distributed database.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Entry
     */
    interface Entry {
        /**
         * Indicates key
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Entry#key
         */
        key: string;
        /**
         * Indicates value
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Entry#value
         */
        value: Value;
    }
    /**
     * Receives notifications of all data changes, including data insertion, update, and deletion.
     *
     * <p>If you have subscribed to {@code KVStore}, you will receive data change notifications and obtain the changed data
     * from the parameters in callback methods upon data insertion, update, or deletion.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.ChangeNotification
     */
    interface ChangeNotification {
        /**
         * Indicates data addition records.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ChangeNotification#insertEntries
         */
        insertEntries: Entry[];
        /**
         * Indicates data update records.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ChangeNotification#updateEntries
         */
        updateEntries: Entry[];
        /**
         * Indicates data deletion records.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ChangeNotification#deleteEntries
         */
        deleteEntries: Entry[];
        /**
         * Indicates from device id.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.ChangeNotification#deviceId
         */
        deviceId: string;
    }
    /**
     * Indicates the database synchronization mode.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.SyncMode
     */
    enum SyncMode {
        /**
         * Indicates that data is only pulled from the remote end.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SyncMode#PULL_ONLY
         */
        PULL_ONLY = 0,
        /**
         * Indicates that data is only pushed from the local end.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SyncMode#PUSH_ONLY
         */
        PUSH_ONLY = 1,
        /**
         * Indicates that data is pushed from the local end, and then pulled from the remote end.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SyncMode#PUSH_PULL
         */
        PUSH_PULL = 2
    }
    /**
     * Describes the subscription type.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.SubscribeType
     */
    enum SubscribeType {
        /**
         * Subscription to local data changes
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SubscribeType#SUBSCRIBE_TYPE_LOCAL
         */
        SUBSCRIBE_TYPE_LOCAL = 0,
        /**
         * Subscription to remote data changes
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SubscribeType#SUBSCRIBE_TYPE_REMOTE
         */
        SUBSCRIBE_TYPE_REMOTE = 1,
        /**
         * Subscription to both local and remote data changes
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SubscribeType#SUBSCRIBE_TYPE_ALL
         */
        SUBSCRIBE_TYPE_ALL = 2
    }
    /**
     * Describes the {@code KVStore} type.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.KVStoreType
     */
    enum KVStoreType {
        /**
         * Device-collaboration database, as specified by {@code DeviceKVStore}
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreType#DEVICE_COLLABORATION
         */
        DEVICE_COLLABORATION = 0,
        /**
         * Single-version database, as specified by {@code SingleKVStore}
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreType#SINGLE_VERSION
         */
        SINGLE_VERSION = 1,
        /**
         * Multi-version database, as specified by {@code MultiKVStore}
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 7
         * @deprecated since 9
         */
        MULTI_VERSION = 2
    }
    /**
     * Describes the {@code KVStore} type.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.SecurityLevel
     */
    enum SecurityLevel {
        /**
         * NO_LEVEL: mains not set the security level.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 7
         * @deprecated since 9
         */
        NO_LEVEL = 0,
        /**
         * S0: mains the db is public.
         * There is no impact even if the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         */
        S0 = 1,
        /**
         * S1: mains the db is low level security
         * There are some low impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SecurityLevel#S1
         */
        S1 = 2,
        /**
         * S2: mains the db is middle level security
         * There are some major impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SecurityLevel#S2
         */
        S2 = 3,
        /**
         * S3: mains the db is high level security
         * There are some severity impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SecurityLevel#S3
         */
        S3 = 5,
        /**
         * S4: mains the db is critical level security
         * There are some critical impact, when the data is leaked.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SecurityLevel#S4
         */
        S4 = 6
    }
    /**
     * Provides configuration options for creating a {@code KVStore}.
     *
     * <p>You can determine whether to create another database if a {@code KVStore} database is missing,
     * whether to encrypt the database, and the database type.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Options
     */
    interface Options {
        /**
         * Indicates whether to create a database when the database file does not exist
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#createIfMissing
         */
        createIfMissing?: boolean;
        /**
         * Indicates setting whether database files are encrypted
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#encrypt
         */
        encrypt?: boolean;
        /**
         * Indicates setting whether to back up database files
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#backup
         */
        backup?: boolean;
        /**
         * Indicates setting whether database files are automatically synchronized
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#autoSync
         */
        autoSync?: boolean;
        /**
         * Indicates setting the database type
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#kvStoreType
         */
        kvStoreType?: KVStoreType;
        /**
         * Indicates setting the database security level
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#securityLevel
         */
        securityLevel?: SecurityLevel;
        /**
         * Indicates schema object
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Options#schema
         */
        schema?: Schema;
    }
    /**
     * Represents the database schema.
     *
     * You can create Schema objects and put them in Options when creating or opening the database.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Schema
     */
    class Schema {
        /**
         * A constructor used to create a Schema instance.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Schema#constructor
         */
        constructor();
        /**
         * Indicates the root json object.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Schema#root
         */
        root: FieldNode;
        /**
         * Indicates the string array of json.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Schema#indexes
         */
        indexes: Array<string>;
        /**
         * Indicates the mode of schema.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Schema#mode
         */
        mode: number;
        /**
         * Indicates the skip size of schema.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Schema#skip
         */
        skip: number;
    }
    /**
     * Represents a node of a {@link Schema} instance.
     *
     * <p>Through the {@link Schema} instance, you can define the fields contained in the values stored in a database.
     *
     * <p>A FieldNode of the {@link Schema} instance is either a leaf or a non-leaf node.
     *
     * <p>The leaf node must have a value; the non-leaf node must have a child {@code FieldNode}.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.FieldNode
     */
    class FieldNode {
        /**
         * A constructor used to create a FieldNode instance with the specified field.
         * name Indicates the field node name.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.FieldNode#constructor
         */
        constructor(name: string);
        /**
         * Adds a child node to this {@code FieldNode}.
         *
         * <p>Adding a child node makes this node a non-leaf node. Field value will be ignored if it has child node.
         *
         * @param child The field node to append.
         * @returns Returns true if the child node is successfully added to this {@code FieldNode}; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.FieldNode#appendChild
         */
        appendChild(child: FieldNode): boolean;
        /**
         * Indicates the default value of field node.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.FieldNode#default
         */
        default: string;
        /**
         * Indicates the nullable of database field.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.FieldNode#nullable
         */
        nullable: boolean;
        /**
         * Indicates the type of value.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.FieldNode#type
         */
        type: number;
    }
    /**
     * Provide methods to obtain the result set of the {@code KvStore} database.
     *
     * <p>The result set is created by using the {@code getResultSet} method in the {@code DeviceKVStore} class. This interface also provides
     * methods for moving the data read position in the result set.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.KVStoreResultSet
     */
    interface KvStoreResultSet {
        /**
         * Obtains the number of lines in a result set.
         *
         * @returns Returns the number of lines.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#getCount
         */
        getCount(): number;
        /**
         * Obtains the current read position in a result set.
         *
         * @returns Returns the current read position. The read position starts with 0.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#getPosition
         */
        getPosition(): number;
        /**
         * Moves the read position to the first line.
         *
         * <p>If the result set is empty, false is returned.
         *
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#moveToFirst
         */
        moveToFirst(): boolean;
        /**
         * Moves the read position to the last line.
         *
         * <p>If the result set is empty, false is returned.
         *
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#moveToLast
         */
        moveToLast(): boolean;
        /**
         * Moves the read position to the next line.
         *
         * <p>If the result set is empty or the data in the last line is being read, false is returned.
         *
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#moveToNext
         */
        moveToNext(): boolean;
        /**
         * Moves the read position to the previous line.
         *
         * <p>If the result set is empty or the data in the first line is being read, false is returned.
         *
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#moveToPrevious
         */
        moveToPrevious(): boolean;
        /**
         * Moves the read position by a relative offset to the current position.
         *
         * @param offset Indicates the relative offset to the current position. A negative offset indicates moving backwards, and a
         * positive offset indicates moving forwards. For example, if the current position is entry 1 and this offset is 2,
         * the destination position will be entry 3; if the current position is entry 3 and this offset is -2,
         * the destination position will be entry 1. The valid final position after moving forwards starts with 0. If the
         * final position is invalid, false will be returned.
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#move
         */
        move(offset: number): boolean;
        /**
         * Moves the read position from 0 to an absolute position.
         *
         * @param position Indicates the absolute position.
         * @returns Returns true if the operation succeeds; return false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#moveToPosition
         */
        moveToPosition(position: number): boolean;
        /**
         * Checks whether the read position is the first line.
         *
         * @returns Returns true if the read position is the first line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#isFirst
         */
        isFirst(): boolean;
        /**
         * Checks whether the read position is the last line.
         *
         * @returns Returns true if the read position is the last line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#isLast
         */
        isLast(): boolean;
        /**
         * Checks whether the read position is before the last line.
         *
         * @returns Returns true if the read position is before the first line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#isBeforeFirst
         */
        isBeforeFirst(): boolean;
        /**
         * Checks whether the read position is after the last line.
         *
         * @returns Returns true if the read position is after the last line; returns false otherwise.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#isAfterLast
         */
        isAfterLast(): boolean;
        /**
         * Obtains a key-value pair.
         *
         * @returns Returns a key-value pair.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVStoreResultSet#getEntry
         */
        getEntry(): Entry;
    }
    /**
     * Represents a database query using a predicate.
     *
     * <p>This class provides a constructor used to create a {@code Query} instance, which is used to query data matching specified
     * conditions in the database.
     *
     * <p>This class also provides methods for adding predicates to the {@code Query} instance.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.Query
     */
    class Query {
        /**
         * A constructor used to create a Query instance.
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#constructor
         */
        constructor();
        /**
         * Resets this {@code Query} object.
         *
         * @returns Returns the reset {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#reset
         */
        reset(): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is equal to the specified long value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value IIndicates the long value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#equalTo
         */
        equalTo(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not equal to the specified int value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the int value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#notEqualTo
         */
        notEqualTo(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is greater than or equal to the
         * specified int value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the int value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#greaterThan
         */
        greaterThan(field: string, value: number | string | boolean): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is less than the specified int value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the int value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#lessThan
         */
        lessThan(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is greater than or equal to the
         * specified int value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the int value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#greaterThanOrEqualTo
         */
        greaterThanOrEqualTo(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is less than or equal to the
         * specified int value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the int value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#lessThanOrEqualTo
         */
        lessThanOrEqualTo(field: string, value: number | string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is null.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#isNull
         */
        isNull(field: string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is within the specified int value list.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param valueList Indicates the int value list.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#inNumber
         */
        inNumber(field: string, valueList: number[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is within the specified string value list.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param valueList Indicates the string value list.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#inString
         */
        inString(field: string, valueList: string[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not within the specified int value list.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param valueList Indicates the int value list.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#notInNumber
         */
        notInNumber(field: string, valueList: number[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not within the specified string value list.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param valueList Indicates the string value list.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#notInString
         */
        notInString(field: string, valueList: string[]): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is similar to the specified string value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the string value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#like
         */
        like(field: string, value: string): Query;
        /**
         * Constructs a {@code Query} object to query entries with the specified field whose value is not similar to the specified string value.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @param value Indicates the string value.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#unlike
         */
        unlike(field: string, value: string): Query;
        /**
         * Constructs a {@code Query} object with the and condition.
         *
         * <p>Multiple predicates should be connected using the and or or condition.
         *
         * @returns Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#and
         */
        and(): Query;
        /**
         * Constructs a {@code Query} object with the or condition.
         *
         * <p>Multiple predicates should be connected using the and or or condition.
         *
         * @returns Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#or
         */
        or(): Query;
        /**
         * Constructs a {@code Query} object to sort the query results in ascending order.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#orderByAsc
         */
        orderByAsc(field: string): Query;
        /**
         * Constructs a {@code Query} object to sort the query results in descending order.
         *
         * @param field Indicates the field, which must start with $. and cannot contain ^.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#orderByDesc
         */
        orderByDesc(field: string): Query;
        /**
         * Constructs a {@code Query} object to specify the number of results and the start position.
         *
         * @param total Indicates the number of results.
         * @param offset Indicates the start position.
         * @returns Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#limit
         */
        limit(total: number, offset: number): Query;
        /**
         * Creates a {@code query} condition with a specified field that is not null.
         *
         * @param field Indicates the specified field.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#isNotNull
         */
        isNotNull(field: string): Query;
        /**
         * Creates a query condition group with a left bracket.
         *
         * <p>Multiple query conditions in an {@code Query} object can be grouped. The query conditions in a group can be used as a
         * whole to combine with other query conditions.
         *
         * @returns Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#beginGroup
         */
        beginGroup(): Query;
        /**
         * Creates a query condition group with a right bracket.
         *
         * <p>Multiple query conditions in an {@code Query} object can be grouped. The query conditions in a group can be used as a
         * whole to combine with other query conditions.
         *
         * @returns Returns the {@coed Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#endGroup
         */
        endGroup(): Query;
        /**
         * Creates a query condition with a specified key prefix.
         *
         * @param prefix Indicates the specified key prefix.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#prefixKey
         */
        prefixKey(prefix: string): Query;
        /**
         * Sets a specified index that will be preferentially used for query.
         *
         * @param index Indicates the index to set.
         * @returns Returns the {@coed Query} object.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#setSuggestIndex
         */
        setSuggestIndex(index: string): Query;
        /**
         * Add device ID key prefix.Used by {@code DeviceKVStore}.
         *
         * @param deviceId Specify device id to query from.
         * @returns Returns the {@code Query} object with device ID prefix added.
         * @throws Throws this exception if input is invalid.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#deviceId
         */
        deviceId(deviceId: string): Query;
        /**
         * Get a String that represents this {@code Query}.
         *
         * <p>The String would be parsed to DB query format.
         * The String length should be no longer than 500kb.
         *
         * @returns String representing this {@code Query}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.Query#getSqlLike
         */
        getSqlLike(): string;
    }
    /**
     * Represents a key-value distributed database and provides methods for adding, deleting, modifying, querying,
     * and subscribing to distributed data.
     *
     * <p>You can create distributed databases of different types by {@link KVManager#getKVStore (Options, String)}
     * with input parameter {@code Options}. Distributed database types are defined in {@code KVStoreType},
     * including {@code SingleKVStore}.
     *
     *
     * @version 1
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.SingleKVStore
     */
    interface KVStore {
        /**
         * Writes a key-value pair of the string type into the {@code KvStore} database.
         *
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param key Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param value Indicates the string value, which must be less than 4 MB as a UTF-8 byte array.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#put
         */
        put(key: string, value: Uint8Array | string | number | boolean, callback: AsyncCallback<void>): void;
        /**
         * Writes a key-value pair of the string type into the {@code KvStore} database.
         *
         * <p>If you do not want to synchronize this key-value pair to other devices, set the write option in the local database.
         *
         * @param key Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @param value Indicates the string value, which must be less than 4 MB as a UTF-8 byte array.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#put
         */
        put(key: string, value: Uint8Array | string | number | boolean): Promise<void>;
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param key Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and
         * {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#delete
         */
        delete(key: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the key-value pair based on a specified key.
         *
         * @param key Indicates the key. The length must be less than {@code MAX_KEY_LENGTH}.
         * Spaces before and after the key will be cleared.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and
         * {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#delete
         */
        delete(key: string): Promise<void>;
        /**
         * Registers a {@code KvStoreObserver} for the database. When data in the distributed database changes, the callback in
         * {@code KvStoreObserver} will be invoked.
         *
         * @param type Indicates the subscription type, which is defined in {@code SubscribeType}.
         * @param listener Indicates the observer of data change events in the distributed database.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#on
         */
        on(event: 'dataChange', type: SubscribeType, listener: Callback<ChangeNotification>): void;
        /**
         * Subscribe the {@code KvStore} database based on the specified subscribeType and {@code KvStoreObserver}.
         *
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#on
         */
        on(event: 'syncComplete', syncCallback: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Unsubscribe the {@code KvStore} database based on the specified subscribeType and {@code KvStoreObserver}.
         *
         * @param listener Indicates the data change observer registered by {#subscribe(SubscribeType, KvStoreObserver)}.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#off
         */
        off(event: 'dataChange', listener?: Callback<ChangeNotification>): void;
        /**
         * UnRegister the {@code KvStore} database synchronization callback.
         *
         * @param syncCallback Indicates the callback used to send the synchronization result to caller.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#off
         */
        off(event: 'syncComplete', syncCallback?: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Inserts key-value pairs into the {@code KvStore} database in batches.
         *
         * @param entries Indicates the key-value pairs to be inserted in batches.
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#putBatch
         */
        putBatch(entries: Entry[], callback: AsyncCallback<void>): void;
        /**
         * Inserts key-value pairs into the {@code KvStore} database in batches.
         *
         * @param entries Indicates the key-value pairs to be inserted in batches.
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#putBatch
         */
        putBatch(entries: Entry[]): Promise<void>;
        /**
         * Deletes key-value pairs in batches from the {@code KvStore} database.
         *
         * @param keys Indicates the key-value pairs to be deleted in batches.
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#deleteBatch
         */
        deleteBatch(keys: string[], callback: AsyncCallback<void>): void;
        /**
         * Deletes key-value pairs in batches from the {@code KvStore} database.
         *
         * @param keys Indicates the key-value pairs to be deleted in batches.
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#deleteBatch
         */
        deleteBatch(keys: string[]): Promise<void>;
        /**
         * Starts a transaction operation in the {@code KvStore} database.
         *
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#startTransaction
         */
        startTransaction(callback: AsyncCallback<void>): void;
        /**
         * Starts a transaction operation in the {@code KvStore} database.
         *
         * <p>After the database transaction is started, you can submit or roll back the operation.
         *
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#startTransaction
         */
        startTransaction(): Promise<void>;
        /**
         * Submits a transaction operation in the {@code KvStore} database.
         *
         * @param callback
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#commit
         */
        commit(callback: AsyncCallback<void>): void;
        /**
         * Submits a transaction operation in the {@code KvStore} database.
         *
         * @param callback
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#commit
         */
        commit(): Promise<void>;
        /**
         * Rolls back a transaction operation in the {@code KvStore} database.
         *
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#rollback
         */
        rollback(callback: AsyncCallback<void>): void;
        /**
         * Rolls back a transaction operation in the {@code KvStore} database.
         *
         * @throws Throws this exception if a database error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#rollback
         */
        rollback(): Promise<void>;
        /**
         * Sets whether to enable synchronization.
         *
         * @param enabled Specifies whether to enable synchronization. The value true means to enable
         * synchronization, and false means the opposite.
         * @throws Throws this exception if an internal service error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#enableSync
         */
        enableSync(enabled: boolean, callback: AsyncCallback<void>): void;
        /**
         * Sets whether to enable synchronization.
         *
         * @param enabled Specifies whether to enable synchronization. The value true means to enable
         * synchronization, and false means the opposite.
         * @throws Throws this exception if an internal service error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#enableSync
         */
        enableSync(enabled: boolean): Promise<void>;
        /**
         * Sets synchronization range labels.
         *
         * <p>The labels determine the devices with which data will be synchronized.
         *
         * @param localLabels Indicates the synchronization labels of the local device.
         * @param remoteSupportLabels Indicates the labels of the devices with which data will be synchronized.
         * @throws Throws this exception if an internal service error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#setSyncRange
         */
        setSyncRange(localLabels: string[], remoteSupportLabels: string[], callback: AsyncCallback<void>): void;
        /**
         * Sets synchronization range labels.
         *
         * <p>The labels determine the devices with which data will be synchronized.
         *
         * @param localLabels Indicates the synchronization labels of the local device.
         * @param remoteSupportLabels Indicates the labels of the devices with which data will be synchronized.
         * @throws Throws this exception if an internal service error occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#setSyncRange
         */
        setSyncRange(localLabels: string[], remoteSupportLabels: string[]): Promise<void>;
    }
    /**
     * Provides methods related to single-version distributed databases.
     *
     * <p>To create a {@code SingleKVStore} database,
     * you can use the {@link data.distributed.common.KVManager#getKVStore​(Options, String)} method
     * with {@code KVStoreType} set to {@code SINGLE_VERSION} for the input parameter {@code Options}.
     * This database synchronizes data to other databases in time sequence.
     * The {@code SingleKVStore} database does not support
     * synchronous transactions, or data search using snapshots.
     *
     * @version 1
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.SingleKVStore
     */
    interface SingleKVStore extends KVStore {
        /**
         * Obtains the {@code String} value of a specified key.
         *
         * @param key Indicates the key of the boolean value to be queried.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#get
         */
        get(key: string, callback: AsyncCallback<Uint8Array | string | boolean | number>): void;
        /**
         * Obtains the {@code String} value of a specified key.
         *
         * @param key Indicates the key of the boolean value to be queried.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#get
         */
        get(key: string): Promise<Uint8Array | string | boolean | number>;
        /**
         * Obtains all key-value pairs that match a specified key prefix.
         *
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the list of all key-value pairs that match the specified key prefix.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getEntries
         */
        getEntries(keyPrefix: string, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains all key-value pairs that match a specified key prefix.
         *
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the list of all key-value pairs that match the specified key prefix.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getEntries
         */
        getEntries(keyPrefix: string): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getEntries
         */
        getEntries(query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getEntries
         */
        getEntries(query: Query): Promise<Entry[]>;
        /**
         * Obtains the result sets with a specified prefix from a {@code KvStore} database. The {@code KvStoreResultSet} object can be used to
         * query all key-value pairs that meet the search criteria. Each {@code KvStore} instance can have a maximum of four
         * {@code KvStoreResultSet} objects at the same time. If you have created four objects, calling this method will return a
         * failure. Therefore, you are advised to call the closeResultSet method to close unnecessary {@code KvStoreResultSet} objects
         * in a timely manner.
         *
         * @param keyPrefix Indicates the key prefix to match.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSet
         */
        getResultSet(keyPrefix: string, callback: AsyncCallback<KvStoreResultSet>): void;
        /**
         * Obtains the result sets with a specified prefix from a {@code KvStore} database. The {@code KvStoreResultSet} object can be used to
         * query all key-value pairs that meet the search criteria. Each {@code KvStore} instance can have a maximum of four
         * {@code KvStoreResultSet} objects at the same time. If you have created four objects, calling this method will return a
         * failure. Therefore, you are advised to call the closeResultSet method to close unnecessary {@code KvStoreResultSet} objects
         * in a timely manner.
         *
         * @param keyPrefix Indicates the key prefix to match.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSet
         */
        getResultSet(keyPrefix: string): Promise<KvStoreResultSet>;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSet
         */
        getResultSet(query: Query, callback: AsyncCallback<KvStoreResultSet>): void;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSet
         */
        getResultSet(query: Query): Promise<KvStoreResultSet>;
        /**
         * Closes a {@code KvStoreResultSet} object returned by getResultSet.
         *
         * @param resultSet Indicates the {@code KvStoreResultSet} object to close.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#closeResultSet
         */
        closeResultSet(resultSet: KvStoreResultSet, callback: AsyncCallback<void>): void;
        /**
         * Closes a {@code KvStoreResultSet} object returned by getResultSet.
         *
         * @param resultSet Indicates the {@code KvStoreResultSet} object to close.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#closeResultSet
         */
        closeResultSet(resultSet: KvStoreResultSet): Promise<void>;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSize
         */
        getResultSize(query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getResultSize
         */
        getResultSize(query: Query): Promise<number>;
        /**
         * void removeDeviceData​({@link String} deviceId) throws {@link KvStoreException}
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#removeDeviceData
         */
        removeDeviceData(deviceId: string, callback: AsyncCallback<void>): void;
        /**
         * void removeDeviceData​({@link String} deviceId) throws {@link KvStoreException}
         *
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#removeDeviceData
         */
        removeDeviceData(deviceId: string): Promise<void>;
        /**
         * Synchronize the database to the specified devices with the specified delay allowed.
         *
         * @param deviceIds Indicates the list of devices to which to synchronize the database.
         * @param mode Indicates the synchronization mode. The value can be {@code PUSH}, {@code PULL}, or {@code PUSH_PULL}.
         * @param delayMs Indicates the delay allowed for the synchronization, in milliseconds.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#sync
         */
        sync(deviceIds: string[], mode: SyncMode, delayMs?: number): void;
        /**
         * Register a {@code KvStoreObserver} for the database. When data in the distributed database changes, the callback
         * in the {@code KvStoreObserver} will be invoked.
         *
         * @param type Indicates the subscription type, which is defined in {@code SubscribeType}.
         * @param listener Indicates the observer of data change events in the distributed database.
         * @throws Throws this exception if no {@code SingleKvStore} database is available.
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#on
         */
        on(event: 'dataChange', type: SubscribeType, listener: Callback<ChangeNotification>): void;
        /**
         * Register a SingleKvStore database synchronization callback.
         * <p> Sync result is returned through asynchronous callback.
         *
         * @param syncCallback Indicates the callback used to send the synchronization result to the caller.
         * @throws Throws this exception if no {@code SingleKvStore} database is available.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#on
         */
        on(event: 'syncComplete', syncCallback: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Unsubscribe the SingleKvStore database based on the specified subscribeType and {@code KvStoreObserver}.
         *
         * @param listener Indicates the data change observer registered by {#subscribe(SubscribeType, KvStoreObserver)}.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#off
         */
        off(event: 'dataChange', listener?: Callback<ChangeNotification>): void;
        /**
         * UnRegister the SingleKvStore database synchronization callback.
         *
         * @throws Throws this exception if no {@code SingleKvStore} database is available.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#off
         */
        off(event: 'syncComplete', syncCallback?: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Sets the default delay allowed for database synchronization
         *
         * @param defaultAllowedDelayMs Indicates the default delay allowed for the database synchronization, in milliseconds.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#setSyncParam
         */
        setSyncParam(defaultAllowedDelayMs: number, callback: AsyncCallback<void>): void;
        /**
         * Sets the default delay allowed for database synchronization
         *
         * @param defaultAllowedDelayMs Indicates the default delay allowed for the database synchronization, in milliseconds.
         * @throws Throws this exception if any of the following errors occurs:{@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#setSyncParam
         */
        setSyncParam(defaultAllowedDelayMs: number): Promise<void>;
        /**
         * Get the security level of the database.
         *
         * @returns SecurityLevel {@code SecurityLevel} the security level of the database.
         * @throws Throws this exception if any of the following errors occurs:{@code SERVER_UNAVAILABLE},
         * {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getSecurityLevel
         */
        getSecurityLevel(callback: AsyncCallback<SecurityLevel>): void;
        /**
         * Get the security level of the database.
         *
         * @returns SecurityLevel {@code SecurityLevel} the security level of the database.
         * @throws Throws this exception if any of the following errors occurs:{@code SERVER_UNAVAILABLE},
         * {@code IPC_ERROR}, and {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.SingleKVStore#getSecurityLevel
         */
        getSecurityLevel(): Promise<SecurityLevel>;
    }
    /**
     * Manages distributed data by device in a distributed system.
     *
     * <p>To create a {@code DeviceKVStore} database, you can use the {@link data.distributed.common.KVManager.getKvStore(Options, String)}
     * method with {@code KvStoreType} set to {@code DEVICE_COLLABORATION} for the input parameter Options. This database manages distributed
     * data by device, and cannot modify data synchronized from remote devices. When an application writes a key-value pair entry
     * into the database, the system automatically adds the ID of the device running the application to the key.
     *
     * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
     * @since 8
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.DeviceKVStore
     */
    interface DeviceKVStore extends KVStore {
        /**
         * Obtains the {@code String} value matching a specified device ID and key.
         *
         * @param deviceId Indicates the device to be queried.
         * @param key Indicates the key of the value to be queried.
         * @returns Returns the value matching the given criteria.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#get
         */
        get(deviceId: string, key: string, callback: AsyncCallback<boolean | string | number | Uint8Array>): void;
        /**
         * Obtains the {@code String} value matching a specified device ID and key.
         *
         * @param deviceId Indicates the device to be queried.
         * @param key Indicates the key of the value to be queried.
         * @returns Returns the value matching the given criteria.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}, and {@code KEY_NOT_FOUND}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#get
         */
        get(deviceId: string, key: string): Promise<boolean | string | number | Uint8Array>;
        /**
         * Obtains all key-value pairs matching a specified device ID and key prefix.
         *
         * @param deviceId Identifies the device whose data is to be queried.
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the list of all key-value pairs meeting the given criteria.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(deviceId: string, keyPrefix: string, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains all key-value pairs matching a specified device ID and key prefix.
         *
         * @param deviceId Identifies the device whose data is to be queried.
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the list of all key-value pairs meeting the given criteria.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(deviceId: string, keyPrefix: string): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(query: Query): Promise<Entry[]>;
        /**
         * Obtains the list of key-value pairs matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the key-value pairs belong.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(deviceId: string, query: Query, callback: AsyncCallback<Entry[]>): void;
        /**
         * Obtains the list of key-value pairs matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the key-value pairs belong.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the list of key-value pairs matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getEntries
         */
        getEntries(deviceId: string, query: Query): Promise<Entry[]>;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified device ID and key prefix.
         *
         * <p>The {@code KvStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code KvStore}
         * instance can have a maximum of four {@code KvStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KvStoreResultSet} objects in a timely manner.
         *
         * @param deviceId Identifies the device whose data is to be queried.
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the {@code KvStoreResultSet} objects.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(deviceId: string, keyPrefix: string, callback: AsyncCallback<KvStoreResultSet>): void;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified device ID and key prefix.
         *
         * <p>The {@code KvStoreResultSet} object can be used to query all key-value pairs that meet the search criteria. Each {@code KvStore}
         * instance can have a maximum of four {@code KvStoreResultSet} objects at the same time. If you have created four objects,
         * calling this method will return a failure. Therefore, you are advised to call the closeResultSet method to close unnecessary
         * {@code KvStoreResultSet} objects in a timely manner.
         *
         * @param deviceId Identifies the device whose data is to be queried.
         * @param keyPrefix Indicates the key prefix to match.
         * @returns Returns the {@code KvStoreResultSet} objects.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(deviceId: string, keyPrefix: string): Promise<KvStoreResultSet>;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(query: Query, callback: AsyncCallback<KvStoreResultSet>): void;
        /**
         * Obtains the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(query: Query): Promise<KvStoreResultSet>;
        /**
         * Obtains the {@code KvStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the {@code KvStoreResultSet} object belongs.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(deviceId: string, query: Query, callback: AsyncCallback<KvStoreResultSet>): void;
        /**
         * Obtains the {@code KvStoreResultSet} object matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the {@code KvStoreResultSet} object belongs.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the {@code KvStoreResultSet} object matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSet
         */
        getResultSet(deviceId: string, query: Query): Promise<KvStoreResultSet>;
        /**
         * Closes a {@code KvStoreResultSet} object returned by getResultSet.
         *
         * @param resultSet Indicates the {@code KvStoreResultSet} object to close.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#closeResultSet
         */
        closeResultSet(resultSet: KvStoreResultSet, callback: AsyncCallback<void>): void;
        /**
         * Closes a {@code KvStoreResultSet} object returned by getResultSet.
         *
         * @param resultSet Indicates the {@code KvStoreResultSet} object to close.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#closeResultSet
         */
        closeResultSet(resultSet: KvStoreResultSet): Promise<void>;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSize
         */
        getResultSize(query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching the specified {@code Query} object.
         *
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSize
         */
        getResultSize(query: Query): Promise<number>;
        /**
         * Obtains the number of results matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the results belong.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSize
         */
        getResultSize(deviceId: string, query: Query, callback: AsyncCallback<number>): void;
        /**
         * Obtains the number of results matching a specified device ID and {@code Query} object.
         *
         * @param deviceId Indicates the ID of the device to which the results belong.
         * @param query Indicates the {@code Query} object.
         * @returns Returns the number of results matching the specified {@code Query} object.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#getResultSize
         */
        getResultSize(deviceId: string, query: Query): Promise<number>;
        /**
         * Removes data of a specified device from the current database. This method is used to remove only the data
         * synchronized from remote devices. This operation does not synchronize data to other databases or affect
         * subsequent data synchronization.
         *
         * @param deviceId Identifies the device whose data is to be removed. The value cannot be the current device ID.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#removeDeviceData
         */
        removeDeviceData(deviceId: string, callback: AsyncCallback<void>): void;
        /**
         * Removes data of a specified device from the current database. This method is used to remove only the data
         * synchronized from remote devices. This operation does not synchronize data to other databases or affect
         * subsequent data synchronization.
         *
         * @param deviceId Identifies the device whose data is to be removed. The value cannot be the current device ID.
         * @throws Throws this exception if any of the following errors occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR}, {@code DB_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#removeDeviceData
         */
        removeDeviceData(deviceId: string): Promise<void>;
        /**
         * Synchronize the {@code DeviceKVStore} databases.
         *
         * <p>This method returns immediately and sync result will be returned through asynchronous callback.
         *
         * @permission ohos.permission.DISTRIBUTED_DATASYNC
         * @param deviceIds Indicates the list of IDs of devices whose
         * @param delayMs Indicates the delay allowed for the synchronization, in milliseconds.
         * {@code DeviceKVStore} databases are to be synchronized.
         * @param mode Indicates the synchronization mode, {@code PUSH}, {@code PULL}, or
         * {@code PUSH_PULL}.
         * @throws Throws this exception if no DeviceKVStore database is available.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#sync
         */
        sync(deviceIds: string[], mode: SyncMode, delayMs?: number): void;
        /**
         * Register a {@code KvStoreObserver} for the database. When data in the distributed database changes, the
         * callback in the {@code KvStoreObserver} will be invoked.
         *
         * @param type Indicates the subscription type, which is defined in {@code SubscribeType}.
         * @param listener Indicates the observer of data change events in the distributed database.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#on
         */
        on(event: 'dataChange', type: SubscribeType, listener: Callback<ChangeNotification>): void;
        /**
         * Register a DeviceKVStore database synchronization callback.
         *
         * <p>Sync result is returned through asynchronous callback.
         *
         * @param syncCallback Indicates the callback used to send the synchronization result to the caller.
         * @throws Throws this exception if no DeviceKVStore database is available.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#on
         */
        on(event: 'syncComplete', syncCallback: Callback<Array<[
            string,
            number
        ]>>): void;
        /**
         * Unsubscribe the DeviceKVStore database based on the specified subscribeType and {@code KvStoreObserver}.
         *
         * @param listener Indicates the data change observer registered by {#subscribe(SubscribeType, KvStoreObserver)}.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code IPC_ERROR},
         * {@code DB_ERROR}, and {@code STORE_ALREADY_SUBSCRIBE}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#off
         */
        off(event: 'dataChange', listener?: Callback<ChangeNotification>): void;
        /**
         * UnRegister the DeviceKVStore database synchronization callback.
         *
         * @throws Throws this exception if no DeviceKVStore database is available.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.DeviceKVStore#off
         */
        off(event: 'syncComplete', syncCallback?: Callback<Array<[
            string,
            number
        ]>>): void;
    }
    /**
     * Creates a {@link KVManager} instance based on the configuration information.
     *
     * <p>You must pass {@link KVManagerConfig} to provide configuration information
     * for creating the {@link KVManager} instance.
     *
     * @param config Indicates the {@link KVStore} configuration information,
     * including the user information and package name.
     * @returns Returns the {@code KVManager} instance.
     * @throws Throws exception if input is invalid.
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore#createKVManager
     */
    function createKVManager(config: KVManagerConfig, callback: AsyncCallback<KVManager>): void;
    /**
     * Creates a {@link KVManager} instance based on the configuration information.
     *
     * <p>You must pass {@link KVManagerConfig} to provide configuration information
     * for creating the {@link KVManager} instance.
     *
     * @param config Indicates the {@link KVStore} configuration information,
     * including the user information and package name.
     * @returns Returns the {@code KVManager} instance.
     * @throws Throws exception if input is invalid.
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore#createKVManager
     */
    function createKVManager(config: KVManagerConfig): Promise<KVManager>;
    /**
     * Provides interfaces to manage a {@code KVStore} database, including obtaining, closing, and deleting the {@code KVStore}.
     *
     * @version 1
     * @syscap SystemCapability.DistributedDataManager.KVStore.Core
     * @since 7
     * @deprecated since 9
     * @useinstead ohos.data.distributedKVStore.KVManager
     */
    interface KVManager {
        /**
         * Creates and obtains a {@code KVStore} database by specifying {@code Options} and {@code storeId}.
         *
         * @param options Indicates the options used for creating and obtaining the {@code KVStore} database,
         * including {@code isCreateIfMissing}, {@code isEncrypt}, and {@code KVStoreType}.
         * @param storeId Identifies the {@code KVStore} database.
         * The value of this parameter must be unique for the same application,
         * and different applications can share the same value.
         * @returns Returns a {@code KVStore}, or {@code SingleKVStore}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#getKVStore
         */
        getKVStore<T extends KVStore>(storeId: string, options: Options): Promise<T>;
        /**
         * Creates and obtains a {@code KVStore} database by specifying {@code Options} and {@code storeId}.
         *
         * @param options Indicates the options used for creating and obtaining the {@code KVStore} database,
         * including {@code isCreateIfMissing}, {@code isEncrypt}, and {@code KVStoreType}.
         * @param storeId Identifies the {@code KVStore} database.
         * The value of this parameter must be unique for the same application,
         * and different applications can share the same value.
         * @returns Returns a {@code KVStore}, or {@code SingleKVStore}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 7
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#getKVStore
         */
        getKVStore<T extends KVStore>(storeId: string, options: Options, callback: AsyncCallback<T>): void;
        /**
         * Closes the {@code KvStore} database.
         *
         * <p>Warning: This method is not thread-safe. If you call this method to stop a KvStore database that is running, your
         * thread may crash.
         *
         * <p>The {@code KvStore} database to close must be an object created by using the {@code getKvStore} method. Before using this
         * method, release the resources created for the database, for example, {@code KvStoreResultSet} for {@code SingleKvStore},
         * otherwise closing the database will fail. If you are attempting to close a database that is already closed, an error
         * will be returned.
         *
         * @param kvStore Indicates the {@code KvStore} database to close.
         * @throws Throws this exception if any of the following errors
         * occurs:{@code INVALID_ARGUMENT}, {@code SERVER_UNAVAILABLE},
         * {@code STORE_NOT_OPEN}, {@code STORE_NOT_FOUND}, {@code DB_ERROR},
         * {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#closeKVStore
         */
        closeKVStore(appId: string, storeId: string, kvStore: KVStore, callback: AsyncCallback<void>): void;
        /**
         * Closes the {@code KvStore} database.
         *
         * <p>Warning: This method is not thread-safe. If you call this method to stop a KvStore database that is running, your
         * thread may crash.
         *
         * <p>The {@code KvStore} database to close must be an object created by using the {@code getKvStore} method. Before using this
         * method, release the resources created for the database, for example, {@code KvStoreResultSet} for {@code SingleKvStore},
         * otherwise closing the database will fail. If you are attempting to close a database that is already closed, an error
         * will be returned.
         *
         * @param kvStore Indicates the {@code KvStore} database to close.
         * @throws Throws this exception if any of the following errors
         * occurs:{@code INVALID_ARGUMENT}, {@code SERVER_UNAVAILABLE},
         * {@code STORE_NOT_OPEN}, {@code STORE_NOT_FOUND}, {@code DB_ERROR},
         * {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#closeKVStore
         */
        closeKVStore(appId: string, storeId: string, kvStore: KVStore): Promise<void>;
        /**
         * Deletes the {@code KvStore} database identified by storeId.
         *
         * <p>Before using this method, close all {@code KvStore} instances in use that are identified by the same storeId.
         *
         * <p>You can use this method to delete a {@code KvStore} database not in use. After the database is deleted, all its data will be
         * lost.
         *
         * @param storeId Identifies the {@code KvStore} database to delete.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code STORE_NOT_FOUND},
         * {@code DB_ERROR}, {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#deleteKVStore
         */
        deleteKVStore(appId: string, storeId: string, callback: AsyncCallback<void>): void;
        /**
         * Deletes the {@code KvStore} database identified by storeId.
         *
         * <p>Before using this method, close all {@code KvStore} instances in use that are identified by the same storeId.
         *
         * <p>You can use this method to delete a {@code KvStore} database not in use. After the database is deleted, all its data will be
         * lost.
         *
         * @param storeId Identifies the {@code KvStore} database to delete.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code INVALID_ARGUMENT},
         * {@code SERVER_UNAVAILABLE}, {@code STORE_NOT_FOUND},
         * {@code DB_ERROR}, {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#deleteKVStore
         */
        deleteKVStore(appId: string, storeId: string): Promise<void>;
        /**
         * Obtains the storeId of all {@code KvStore} databases that are created by using the {@code getKvStore} method and not deleted by
         * calling the {@code deleteKvStore} method.
         *
         * @returns Returns the storeId of all created {@code KvStore} databases.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code DB_ERROR},
         * {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#getAllKVStoreId
         */
        getAllKVStoreId(appId: string, callback: AsyncCallback<string[]>): void;
        /**
         * Obtains the storeId of all {@code KvStore} databases that are created by using the {@code getKvStore} method and not deleted by
         * calling the {@code deleteKvStore} method.
         *
         * @returns Returns the storeId of all created {@code KvStore} databases.
         * @throws Throws this exception if any of the following errors
         * occurs: {@code SERVER_UNAVAILABLE}, {@code DB_ERROR},
         * {@code PERMISSION_DENIED}, and {@code IPC_ERROR}.
         * @syscap SystemCapability.DistributedDataManager.KVStore.Core
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#getAllKVStoreId
         */
        getAllKVStoreId(appId: string): Promise<string[]>;
        /**
         * register DeviceChangeCallback to get notification when device's status changed
         *
         * @param deathCallback device change callback {@code DeviceChangeCallback}
         * @throws    exception maybe occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#on
         */
        on(event: 'distributedDataServiceDie', deathCallback: Callback<void>): void;
        /**
         * unRegister DeviceChangeCallback and can not receive notification
         *
         * @param deathCallback device change callback {@code DeviceChangeCallback} which has been registered.
         * @throws exception maybe occurs.
         * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
         * @since 8
         * @deprecated since 9
         * @useinstead ohos.data.distributedKVStore.KVManager#off
         */
        off(event: 'distributedDataServiceDie', deathCallback?: Callback<void>): void;
    }
}
/**
 * Providers interfaces to creat a {@link KVManager} instance.
 * @syscap SystemCapability.DistributedDataManager.KVStore.DistributedKVStore
 * @since 7
 * @deprecated since 9
 */
export default distributedData;
