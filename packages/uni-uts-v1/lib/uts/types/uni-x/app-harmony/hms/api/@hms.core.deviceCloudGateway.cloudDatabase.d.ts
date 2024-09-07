/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Define cloud database capabilities.
 * @kit CloudFoundationKit
 */
import { AsyncCallback } from '@ohos.base';
/**
 * This module provides cloud database capabilities.
 * Cloud resources are connected to AppGallery Connect. Before using the resources, you need to enable the corresponding services.
 *
 * @namespace cloudDatabase
 * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
 * @stagemodelonly
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace cloudDatabase {
    /**
     * Initialize the cloud database instance according to the zone name.
     * @param { string } zone - zone name.
     * @returns { DatabaseZone } Cloud database zone instance.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    function zone(zone: string): DatabaseZone;
    /**
     * Cloud database zone instance, which is used to perform operations on data in the storage area.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class DatabaseZone {
        /**
         * Query the data that conform the conditions from the Cloud DB zone.
         * @permission ohos.permission.INTERNET
         * @param { DatabaseQuery<T> } condition - Query condition
         * @returns { Promise<T[]> } Query result.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        query<T extends DatabaseObject>(condition: DatabaseQuery<T>): Promise<T[]>;
        /**
         * Query the data that conform the conditions from the Cloud DB zone.
         * @permission ohos.permission.INTERNET
         * @param { DatabaseQuery<T> } condition - Query condition
         * @param { AsyncCallback<T[]> } callback - Query result.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        query<T extends DatabaseObject>(condition: DatabaseQuery<T>, callback: AsyncCallback<T[]>): void;
        /**
         * Query the data that conform the conditions from the Cloud DB zone and perform arithmetic calculations on the specified fields.
         * @permission ohos.permission.INTERNET
         * @param { DatabaseQuery<T> } condition - Query condition
         * @param { string } fieldName - Specifies the name of the field to be calculated in the query object.
         * @param { QueryCalculate } calculate - calculate type.
         * @returns { Promise<number> } calculate result.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        calculateQuery<T extends DatabaseObject>(condition: DatabaseQuery<T>, fieldName: string, calculate: QueryCalculate): Promise<number>;
        /**
         * Query the data that conform the conditions from the Cloud DB zone and perform arithmetic calculations on the specified fields.
         * @permission ohos.permission.INTERNET
         * @param { DatabaseQuery<T> } condition - Query condition
         * @param { string } fieldName - Specifies the name of the field to be calculated in the query object.
         * @param { QueryCalculate } calculate - calculate type.
         * @param { AsyncCallback<number> } callback - calculate result.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        calculateQuery<T extends DatabaseObject>(condition: DatabaseQuery<T>, fieldName: string, calculate: QueryCalculate, callback: AsyncCallback<number>): void;
        /**
         * Upsert one or more objects to Cloud DB zone.
         * If an object with the same primary key already exists in the storage area, the existing object is updated.
         * If it does not exist, one or more new objects are written.
         * @permission ohos.permission.INTERNET
         * @param { T[] | T } objectList - One or more objects to be Upserted.
         * @returns { Promise<number> } Obtains the operation result and returns the number of records that are successfully upsert.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        upsert<T extends DatabaseObject>(objectList: T[] | T): Promise<number>;
        /**
         * Upsert one or more objects to Cloud DB zone.
         * If an object with the same primary key already exists in the storage area, the existing object is updated.
         * If it does not exist, one or more new objects are written.
         * @permission ohos.permission.INTERNET
         * @param { T[] | T } objectList - One or more objects to be Upserted.
         * @param { AsyncCallback<number> } callback Obtains the operation result and returns the number of records that are successfully upsert.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        upsert<T extends DatabaseObject>(objectList: T[] | T, callback: AsyncCallback<number>): void;
        /**
         * Delete one or more objects to Cloud DB zone.
         * @permission ohos.permission.INTERNET
         * @param { T[] | T } objectList - One or more objects to be deleted.
         * @returns { Promise<number> } the operation result and returns the number of records that are successfully deleted.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        delete<T extends DatabaseObject>(objectList: T[] | T): Promise<number>;
        /**
         * Delete one or more objects to Cloud DB zone.
         * @permission ohos.permission.INTERNET
         * @param { T[] | T } objectList -  One or more objects to be deleted.
         * @param { AsyncCallback<number> } callback Obtains the operation result and returns the number of records that are successfully deleted.
         * @throws { BusinessError } 201 - No Internet permission.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 1008230001 - Network connection error.
         * @throws { BusinessError } 1008230002 - Schema config error.
         * @throws { BusinessError } 1008230003 - Natural object error.
         * @throws { BusinessError } 1008230009 - Client internal error.
         * @throws { BusinessError } 1008231001 - Server error.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        delete<T extends DatabaseObject>(objectList: T[] | T, callback: AsyncCallback<number>): void;
    }
    /**
     * Database data type base class, which is inherited when the table structure is generated on the cloud side.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class DatabaseObject {
        /**
         * Data Type Name.
         * @returns { string } Data Type Name.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        naturalbase_ClassName(): string;
    }
    /**
     * Data types supported by Cloud DB columns.
     * @typedef {string | number | boolean | Uint8Array | Date}
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    type FieldType = string | number | boolean | Uint8Array | Date;
    /**
     * Database Query Calculation Type.
     * @enum { number }
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum QueryCalculate {
        /**
         * Calculate the average.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        AVERAGE = 0,
        /**
         * Calculate the sum.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        SUM = 1,
        /**
         * Calculate the maximum value.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MAXIMUM = 2,
        /**
         * Calculate the minimum value.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        MINIMUM = 3,
        /**
         * Calculate the total number of records.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        COUNT = 4
    }
    /**
     * Provides rich predicate queries to construct query conditions. Construct your own DatabaseQuery object based on the above predicate query method.
     * The cloud database will obtain the corresponding object from the storage area based on the specified query conditions and return the query result.
     * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    class DatabaseQuery<T extends DatabaseObject> {
        /**
         * Set the information about the entity type to be queried.
         * @param { new () => T } entityClass - Concrete type constructor.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        constructor(entityClass: new () => T);
        /**
         * Adds the query condition that the value of a field in the entity class is equal to the specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T> } The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        equalTo(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds the query condition that the value of a field in the entity class is not equal to the specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T> } The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        notEqualTo(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds a query condition in which the value of a field of the string type in an entity class starts with a specified substring.
         * @param { string } fieldName -  Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T> } The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        beginsWith(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds a query condition in which a field value of the string type in an entity class ends with a specified substring.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        endsWith(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds a query condition in which the value of a field of the string type in an entity class contains a specified substring.
         * @param { string } fieldName - Field name in entity class.me in entity class.me in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        contains(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Add a query condition that the value of a field in an entity class is greater than a specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        greaterThan(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Add a query condition that the value of a field in an entity class is greater than or equal to a specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        greaterThanOrEqualTo(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Add a query condition that the value of a field in an entity class is less than the specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        lessThan(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds a query condition that the value of a field in an entity class is less than or equal to a specified value.
         * @param { string } fieldName - Field name in entity class.
         * @param { FieldType } value - The specified value for the selected field.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        lessThanOrEqualTo(fieldName: string, value: FieldType): DatabaseQuery<T>;
        /**
         * Adds a query condition in which the value of a field in an entity class is contained in a specified array.
         * @param { string } fieldName - Field name in entity class.me in entity class.
         * @param { FieldType[] } values - Specified array range.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        in(fieldName: string, values: FieldType[]): DatabaseQuery<T>;
        /**
         * Add the query condition that the value of a field in the entity class is empty.
         * @param { string } fieldName - Field name in entity class.me in entity class.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isNull(fieldName: string): DatabaseQuery<T>;
        /**
         * Add the query condition that the value of a field in the entity class is not empty.
         * @param { string } fieldName - Field name in entity class.me in entity class.me in entity class.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        isNotNull(fieldName: string): DatabaseQuery<T>;
        /**
         * Sorts query results by a specified field in ascending order.
         * When using this method to sort fields, you are advised to create indexes for the sorted fields.
         * Otherwise, when the number of data records of the object type reaches a certain value,
         * the query may time out or fail due to low query efficiency, affecting user experience.
         * This method is recommended for equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (), lessThan (),
         * lessThanOrEqualTo (), in (), beginsWith (), endsWith (), contains (), isNull (), isNotNull (), and limit ().
         * @param { string } fieldName - Field name in entity class.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        orderByAsc(fieldName: string): DatabaseQuery<T>;
        /**
         * Sort query results by specified field in descending order.
         * When using this method to sort fields, you are advised to create indexes for the sorted fields.
         * Otherwise, when the number of data records of the object type reaches a certain value,
         * the query may time out or fail due to low query efficiency, affecting user experience.
         * This method is recommended for equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (), lessThan (), lessThanOrEqualTo (),
         * in (), beginsWith (), endsWith (), contains (), isNull (), isNotNull (), and limit ().
         * @param { string } fieldName - Field name in entity class.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        orderByDesc(fieldName: string): DatabaseQuery<T>;
        /**
         * Specifies the number of data records in the returned query result set.
         * If offset is not set, the first count objects are obtained by default.
         * If the number of objects in the query result set is less than the value of count, all objects are returned.
         * @param { number } count - Limit the number of data records that can be obtained.
         * @param { number } [offset] - Specifies the start position of the data record.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        limit(count: number, offset?: number): DatabaseQuery<T>;
        /**
         * This method is called to put the left parenthesis"'
         * ("Append to any query condition and concatenate the right parenthesis with the same query") "Used in combination.
         * beginGroup () and endGroup () must appear in pairs and be used together with other query conditions.
         * Between the beginGroup () and endGroup () methods, you can use equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (),
         * lessThan (), lessThanOrEqualTo (), in (), beginsWith (), endsWith (), isNull (), isNotNull (), and contains ().
         * One or more of the preceding query conditions can be used at the same time. That is, the space between two parentheses cannot be empty.
         * The beginGroup () method cannot be used directly before the and () and or () methods. That is, beginGroup ().and (),
         * beginGroup ().and ().endGroup (), beginGroup ().or (), and beginGroup ().or ().endGroup () are not supported.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        beginGroup(): DatabaseQuery<T>;
        /**
         * This method is called to put the right parenthesis"'
         * )"Append to any query condition and concatenate the left parenthesis with the same query"( "Used in combination.
         * beginGroup () and endGroup () must appear in pairs and be used together with other query conditions.
         * Between the beginGroup () and endGroup () methods, you can use equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (),
         * lessThan (), lessThanOrEqualTo (), in (), beginsWith (),endsWith (), isNull (), isNotNull (), and contains ().
         * One or more of the preceding query conditions can be used at the same time. That is, the space between two parentheses cannot be empty.
         * The endGroup () method cannot be used directly after the and () and or () methods. That is, beginGroup ().and ().endGroup (), and (),
         * endGroup (), beginGroup ().or ().endGroup (), and or ().endGroup () are not supported.
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        endGroup(): DatabaseQuery<T>;
        /**
         * Combines the two conditions before and after or using the OR operation and returns the union of the two query results.
         *
         * The or () method can be used only with other query conditions.
         * when and equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (), lessThan (), lessThanOrEqualTo (), in (), beginsWith (),
         * endsWith (), isNull (), isNotN ull () and contains () together. When used in combination, the union of the two query results is returned.
         * When used in combination with the and () method, and () cannot be used directly after or (). That is, the usage of or ().and () is not supported.
         * When used in combination with the beginGroup () and endGroup () methods:
         * Multi-layer nesting is supported, and beginGroup () and endGroup () must appear in pairs.
         * The beginGroup () method cannot be used before the or () method, and the endGroup () method cannot be used after the or () method.
         * That is, beginGroup ().or (),beginGroup ().or ().endGroup (), and or ().endGroup () are not supported.
         * It cannot be used together with orderByAsc (), orderByDesc (), or limit ().
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        or(): DatabaseQuery<T>;
        /**
         * Combines the two conditions using the and operation and returns the intersection of the two query results.
         *
         * The and () method can be used only with other query conditions.
         * when and equalTo (), notEqualTo (), greaterThan (), greaterThanOrEqualTo (), lessThan (), lessThanOrEqualTo (), in (), beginsWith (),
         * endsWith (), isNull (), isNotN When ull () and contains () are used together, the intersection of the two query results is returned.
         * When the and () method is used together with the or () method,
         * the and () method cannot be directly followed by the or () method. That is, and ().or () is not supported.
         * When used in combination with the beginGroup () and endGroup () methods:
         * Multi-layer nesting is supported, and beginGroup () and endGroup () must appear in pairs.
         * The beginGroup () method cannot be used before the and () method, and the endGroup () method cannot be used after the and () method.
         * That is, beginGroup ().and (),beginGroup ().and ().endGroup (), and and ().endGroup () are not supported.
         * It cannot be used together with orderByAsc (), orderByDesc (), or limit ().
         * @returns { DatabaseQuery<T>} The DatabaseQuery object that contains this condition.
         * @syscap SystemCapability.DeviceCloudGateway.CloudFoundation
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        and(): DatabaseQuery<T>;
    }
}
export default cloudDatabase;
