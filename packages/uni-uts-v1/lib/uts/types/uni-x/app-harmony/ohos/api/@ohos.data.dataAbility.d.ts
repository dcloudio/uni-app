/*
 * Copyright (c) 2021-2023 Huawei Device Co., Ltd.
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

import rdb from './@ohos.data.rdb';
/**
 * Provides predicates for implementing diverse query methods.
 *
 * @namespace dataAbility
 * @syscap SystemCapability.DistributedDataManager.DataShare.Core
 * @since 7
 */
declare namespace dataAbility {
    /**
     * Create an RdbPredicates by table name and DataAbilityPredicates.
     * This method is similar to = of the SQL statement.
     *
     * @param { string } name - Indicates the table name.
     * @param { DataAbilityPredicates } dataAbilityPredicates - Indicates the dataAbility predicates.
     * @returns { rdb.RdbPredicates } Returns an RdbPredicates.
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @since 7
     */
    function createRdbPredicates(name: string, dataAbilityPredicates: DataAbilityPredicates): rdb.RdbPredicates;
    /**
     * Manages relational database configurations.
     *
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @since 7
     */
    class DataAbilityPredicates {
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is ValueType and value is equal
         * to a specified value.
         * This method is similar to = of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        equalTo(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is ValueType and value is unequal to
         * a specified value.
         * Configure the data capability predicate to match a field where the data type is a value type and the value is
         * not equal to the specified value.
         * This method is similar to != of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } value - Indicates the value to match with the DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        notEqualTo(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Adds a left parenthesis to the DataAbilityPredicates.
         * This method is similar to ( of the SQL statement and needs to be used together with endWrap().
         *
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates with the left parenthesis.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        beginWrap(): DataAbilityPredicates;
        /**
         * Adds a right parenthesis to the DataAbilityPredicates.
         * This method is similar to ) of the SQL statement and needs to be used together
         * with beginWrap().
         *
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates with the right parenthesis.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        endWrap(): DataAbilityPredicates;
        /**
         * Adds an or condition to the DataAbilityPredicates.
         * This method is similar to or of the SQL statement.
         *
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates with the or condition.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        or(): DataAbilityPredicates;
        /**
         * Adds an and condition to the DataAbilityPredicates.
         * This method is similar to and of the SQL statement.
         *
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates with the and condition.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        and(): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value
         * contains a specified value.
         * This method is similar to contains of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        contains(field: string, value: string): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value starts
         * with a specified string.
         * This method is similar to value% of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        beginsWith(field: string, value: string): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the field whose data type is string and value
         * ends with a specified string.
         * This method is similar to %value of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        endsWith(field: string, value: string): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the fields whose value is null.
         * This method is similar to is null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        isNull(field: string): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the specified fields whose value is not null.
         * This method is similar to is not null of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        isNotNull(field: string): DataAbilityPredicates;
        /**
         * Configure the DataAbilityPredicates to match the fields whose data type is string and value is
         * similar to a specified string.
         * This method is similar to like of the SQL statement.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with the DataAbilityPredicates. The percent sign (%)
         *                           in the value is a wildcard (like * in a regular expression).
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates that match the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        like(field: string, value: string): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is string and the value contains
         * a wildcard.Different from like, the input parameters of this method are case-sensitive.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { string } value - Indicates the value to match with DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns the SQL statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        glob(field: string, value: string): DataAbilityPredicates;
        /**
         * Restricts the value of the field to the range between low value and high value.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } low - Indicates the minimum value.
         * @param { ValueType } high - Indicates the maximum value.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        between(field: string, low: ValueType, high: ValueType): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is int and value is
         * out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { ValueType } low - Indicates the minimum value to match with DataAbilityPredicates}.
         * @param { ValueType } high - Indicates the maximum value to match with DataAbilityPredicates}.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        notBetween(field: string, low: ValueType, high: ValueType): DataAbilityPredicates;
        /**
         * Restricts the value of the field to be greater than the specified value.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } value - Indicates the String field.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        greaterThan(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Restricts the value of the field to be smaller than the specified value.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } value - Indicates the String field.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        lessThan(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Restricts the value of the field to be greater than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } value - Indicates the String field.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        greaterThanOrEqualTo(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Restricts the value of the field to be smaller than or equal to the specified value.
         *
         * @param { string } field - Indicates the column name.
         * @param { ValueType } value - Indicates the String field.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        lessThanOrEqualTo(field: string, value: ValueType): DataAbilityPredicates;
        /**
         * Restricts the ascending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        orderByAsc(field: string): DataAbilityPredicates;
        /**
         * Restricts the descending order of the return list. When there are several orders,
         * the one close to the head has the highest priority.
         *
         * @param { string } field - Indicates the column name for sorting the return list.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        orderByDesc(field: string): DataAbilityPredicates;
        /**
         * Restricts each row of the query result to be unique.
         *
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        distinct(): DataAbilityPredicates;
        /**
         * Restricts the max number of return records.
         *
         * @param { number } value - Indicates the max length of the return list.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified DataAbilityPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        limitAs(value: number): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to specify the start position of the returned result.
         * Use this method together with limit(int).
         *
         * @param { number } rowOffset - Indicates the start position of the returned result. The value is a positive integer.
         * @returns { DataAbilityPredicates } Returns the SQL query statement with the specified AbsPredicates.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        offsetAs(rowOffset: number): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to group query results by specified columns.
         *
         * @param { Array<string> } fields - Indicates the specified columns by which query results are grouped.
         * @returns { DataAbilityPredicates } Returns the DataAbilityPredicates with the specified columns by which query
         *                                    results are grouped.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        groupBy(fields: Array<string>): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to specify the index column.
         * Before using this method, you need to create an index column.
         *
         * @param { string } field - Indicates the name of the index column.
         * @returns { DataAbilityPredicates } Returns DataAbilityPredicates with the specified index column.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        indexedBy(field: string): DataAbilityPredicates;
        /**
         * Configure DataAbilityPredicates to match the specified field whose data type is ValueType array and values
         * are within a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns DataAbilityPredicates that matches the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        in(field: string, value: Array<ValueType>): DataAbilityPredicates;
        /**
         * Configure {@code DataAbilityPredicates} to match the specified field whose data type is String array and values
         * are out of a given range.
         *
         * @param { string } field - Indicates the column name in the database table.
         * @param { Array<ValueType> } value - Indicates the values to match with DataAbilityPredicates.
         * @returns { DataAbilityPredicates } Returns DataAbilityPredicates that matches the specified field.
         * @syscap SystemCapability.DistributedDataManager.DataShare.Core
         * @since 7
         */
        notIn(field: string, value: Array<ValueType>): DataAbilityPredicates;
    }
    /**
     * Indicates possible value types
     *
     * @typedef { number | string | boolean }
     * @syscap SystemCapability.DistributedDataManager.DataShare.Core
     * @since 7
     */
    type ValueType = number | string | boolean;
}
export default dataAbility;
