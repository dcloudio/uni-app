/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines the capabilities of HealthServiceKit.
 * @kit HealthServiceKit
 * @bundle com.huawei.hmos.health.kit/HealthStore/ets/Index 5.0.0(12)
 */

import type common from '@ohos.app.ability.common';
/**
 * This module provides healthStore abilities.
 *
 * @namespace healthStore
 * @syscap SystemCapability.Health.HealthStore
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace healthStore {
    /**
     * Represents the data types of health data.
     *
     * @typedef DataType
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataType {
        /**
         * Identity value of data type, should be unique.
         *
         * @type { number }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly id: number;
        /**
         * Identity value of data type, should be unique.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly name?: string;
    }
    /**
     * Represents the application information.
     *
     * @typedef AppInfo
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface AppInfo {
        /**
         * Application bundle name, represents a native application in a consumer device.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly bundleName?: string;
        /**
         * Application ID, represents an server application which interacts with the Health cloud.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appId?: string;
        /**
         * Application name.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appName?: string;
        /**
         * Application version.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly version?: string;
    }
    /**
     * Predefined device category.
     *
     * @enum { string }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    enum DeviceCategory {
        /**
         * Represent a virtual device in which user input the value manually without running real action.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        MANUAL_INPUT = '000',
        /**
         * Represent smart phone device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        SMART_PHONE = '00E',
        /**
         * Represent watch device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        WEARABLE_WATCH = '06D',
        /**
         * Represent band device
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        WEARABLE_BAND = '06E',
        /**
         * Represent head phone device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        SMART_HEADPHONES = '082',
        /**
         * Represent weight measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_WEIGHT_SCALE = '0CB',
        /**
         * Represent blood sugar measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_BLOOD_SUGAR_MONITOR = '086',
        /**
         * Represent blood pressure measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_BLOOD_PRESSURE_MONITOR = '02B',
        /**
         * Represent heart rate measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_HEART_RATE_MONITOR = '088',
        /**
         * Represent body temperature measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_THERMOMETER = '0B3',
        /**
         * Represent body oxygen measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_BLOOD_OXYGEN_MONITOR = '0B4',
        /**
         * Represent rope skipping measurement device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_ROPE_SKIPPING = '095',
        /**
         * Represent treadmill.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_TREADMILL = '08F',
        /**
         * Represent exercise bike.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_EXERCISE_BIKE = '0BF',
        /**
         * Represent rowing machine.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_ROWING_MACHINE = '0C1',
        /**
         * Represent elliptical machine.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_ELLIPTICAL_MACHINE = '0C0',
        /**
         * Represent walking machine.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        HDK_WALKING_MACHINE = '092',
        /**
         * Represent SPORTS_GENIE device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        SPORTS_GENIE = 'A12'
    }
    /**
     * Represents the device information.
     *
     * @typedef DeviceInfo
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DeviceInfo {
        /**
         * Unique id of the device.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly uniqueId: string;
        /**
         * Device udid.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly udid?: string;
        /**
         * Name of the device.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly name?: string;
        /**
         * Device category.
         *
         * @type { ?DeviceCategory }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly category?: DeviceCategory;
        /**
         * Product id, predefined by Device Profile, check the specification for details.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly productId?: string;
        /**
         * Device model.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly model?: string;
        /**
         * Name of manufacturer.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly manufacturer?: string;
        /**
         * Mac address.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly mac?: string;
        /**
         * Serial number.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly sn?: string;
        /**
         * Hardware version.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly hardwareVersion?: string;
        /**
         * Software version.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly softwareVersion?: string;
        /**
         * Firmware version.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly firmwareVersion?: string;
    }
    /**
     * Represents the data source of health data.
     *
     * @typedef DataSource
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSource {
        /**
         * Identify of this data source.
         * Generated by the platform, you cant't change it.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly dataSourceId: string;
        /**
         * Device information.
         *
         * @type { ?DeviceInfo }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly deviceInfo?: DeviceInfo;
        /**
         * Application information.
         *
         * @type { ?AppInfo }
         * @readonly
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appInfo?: AppInfo;
    }
    /**
     * Represents the data source of health data.
     *
     * @typedef { Omit<DataSource, 'dataSourceId'> }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type DataSourceBase = Omit<DataSource, 'dataSourceId'>;
    /**
     * Represents basic info of health data.
     *
     * @typedef SampleDataBase
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SampleDataBase {
        /**
         * Data type of the data.
         *
         * @type { DataType }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        dataType: DataType;
        /**
         * Data source of the data.
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId: string;
        /**
         * Local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        localDate: string;
        /**
         * Start time of the data, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * End time of the data, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        endTime: number;
        /**
         * Time zone of the data.
         * In the format `GMT+0800`
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        timeZone: string;
        /**
         * Create time or modify time of the data, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        modifiedTime: number;
    }
    /**
     * Define the type for field value.
     *
     * @typedef { number | string | boolean }
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type HealthValueType = number | string | boolean;
    /**
     * Define the type for sequence field value.
     *
     * @typedef { number | string | boolean | object }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type SequenceValueType = number | string | boolean | object;
    /**
     * Represents a sample point data.
     * SamplePoint defines a model of an instantaneous sample measurement of th target,
     * it uses one or more fields to describe the data.
     * for example: blood pressure,
     *   the sampled value is a representation of a certain timestamp, so the startTime is equal to the endTime,
     *   and it contains three fields to describe it, systolic/diastolic/heartBrat.
     *
     * @typedef SamplePoint
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SamplePoint<K extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends SampleDataBase {
        /**
         * Fields of the data.
         *
         * @type { Pick<K, keyof K> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        fields: Pick<K, keyof K>;
    }
    /**
     * Sub data type of a sequence data type.
     *
     * @typedef { DataType }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type SubDataType = DataType;
    /**
     * Pace-related value type
     *
     * @typedef { Record<string, number> }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type PaceValueType = Record<string, number>;
    /**
     * Represents an exercise sequence summary data.
     * ExerciseSummary defines the statistics of a data type over the period during exercise.
     *
     * @typedef ExerciseSummary
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSummary {
        /**
         * Fields of the sequence summary data.
         *
         * @type { HealthValueType | PaceValueType }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        [P: string]: HealthValueType | PaceValueType;
    }
    /**
     * SequencePoint defines a model of an instantaneous sample data in exercise,
     * it uses one or more fields to describe the data.
     *
     * @typedef SequencePoint
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SequencePoint {
        /**
         * Start time of the data, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * Fields of the data.
         *
         * @type { HealthValueType }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        [P: string]: HealthValueType;
    }
    /**
     * Represents a exercise sequence.
     * Data of exercise sequence that last for a certain period of time,
     * it contains the sequence summary data and detailed sequence points.
     *
     * @typedef ExerciseSequence
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequence<K extends Record<string, ExerciseSummary> = Record<string, ExerciseSummary>, DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends SampleDataBase {
        /**
         *  The type of exercise
         *
         * @type { SubDataType }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        exerciseType: SubDataType;
        /**
         * Active duration time of the exercise sequence data, Unix epoch in millisecond.
         * The start/end time identifies the complete duration of the exercise.
         * However, the active duration time can be shorter.
         * If no value is assigned, the start/end time is used by default.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        duration?: number;
        /**
         * Summary data.
         *
         * @type { Pick<K, keyof K> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        summaries: Pick<K, keyof K>;
        /**
         * Detailed data.
         *
         * @type { ?Pick<DK, keyof DK> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        details?: Pick<DK, keyof DK>;
    }
    /**
     * Represents a health sequence.
     * Data of health sequence that last for a certain period of time,
     * it contains the feature fields and associated atomic sampling detailed sequence points.
     *
     * @typedef HealthSequence
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequence<K extends Record<string, HealthValueType> = Record<string, HealthValueType>, DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends SampleDataBase {
        /**
         * Summary data of HealthSequence.
         *
         * @type { Pick<K, keyof K> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        summaries: Pick<K, keyof K>;
        /**
         * Detailed data associated with the health sequence.
         *
         * @type { ?Pick<DK, keyof DK> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        details?: Pick<DK, keyof DK>;
    }
    /**
     * Order of result sort.
     *
     * @enum { number }
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum SortOrder {
        /**
         * In ascending order.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        ASC = 0,
        /**
         * In descending order.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        DESC = 1
    }
    /**
     * Represents data source options, used for query and delete.
     *
     * @typedef DataSourceOptions
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSourceOptions {
        /**
         * A unique data source id to associate a data source.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId?: string;
        /**
         * A unique device id to associate a device.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        deviceUniqueId?: string;
        /**
         * App bundle name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        appBundleName?: string;
        /**
         * App ID.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        appId?: string;
    }
    /**
     * DataRequest sub-users options
     *
     * @typedef SubUserOption
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SubUserOption {
    }
    /**
     * Base interface of request.
     *
     * @typedef DataRequest
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataRequest {
        /**
         * Start local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        startLocalDate: string;
        /**
         * End local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @type { string }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        endLocalDate: string;
        /**
         * Start time of request, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * End time of request, Unix epoch in millisecond.
         *
         * @type { number }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        endTime: number;
        /**
         * Related data source of this request.
         *
         * @type { ?DataSourceOptions }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceOptions?: DataSourceOptions;
    }
    /**
     * Base interface of data read request.
     *
     * @typedef DataReadRequest
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataReadRequest<DK extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends DataRequest {
        /**
         * Represents how many records will be read, omitted for read all the data.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        count?: number;
        /**
         * Represents the offset relative to the current position.
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        offset?: number;
        /**
         * Sort order, omitted for ascending order
         *
         * @type { ?SortOrder }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        sortOrder?: SortOrder;
    }
    /**
     * Represents SamplePoint read request using timestamp.
     *
     * @typedef SamplePointReadRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SamplePointReadRequest<FK extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related data type(s) of this request.
         *
         * @type { DataType | DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        samplePointDataType: DataType | DataType[];
        /**
         * Fields to read, omitted for read all the fields.
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @type { ?Partial<Pick<FK, keyof FK>> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        fields?: Partial<Pick<FK, keyof FK>>;
    }
    /**
     * Define read options when read ExerciseSequence and HealthSequence detail data.
     * It's valid to combine any of the options, but withDetails will override withPartialDetails.
     *
     * @typedef SequenceReadOptions
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SequenceReadOptions<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> {
        /**
         * Should read details.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        withDetails?: boolean;
        /**
         * Should read partial details.
         *
         * @type { ?(keyof DK)[] }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        withPartialDetails?: (keyof DK)[];
    }
    /**
     * Aggregation policy metrics type
     *
     * @typedef { 'max' | 'min' | 'avg' | 'sum' | 'last' | 'count' }
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type AggregateMetricScope = 'max' | 'min' | 'avg' | 'sum' | 'last' | 'count';
    /**
     * aggregation strategies
     *
     * @typedef { Partial<Record<AggregateMetricScope, number>> }
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type AggregateMetrics = Partial<Record<AggregateMetricScope, number>>;
    /**
     * Group policies
     *
     * @enum { number }
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    enum GroupUnitType {
        /**
         * Group By Day
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        DAY = 3
    }
    /**
     * Represents AggregateRequest group option.
     *
     * @typedef GroupOption
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface GroupOption {
        /**
         * Group policy
         *
         * @type { GroupUnitType }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        unitType: GroupUnitType;
        /**
         * How many group unit
         *
         * @type { ?number }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        duration?: number;
    }
    /**
     * Represents Aggregate read request.
     *
     * @typedef AggregateRequest
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AggregateRequest<T extends Record<string, AggregateMetrics> = Record<string, AggregateMetrics>, DK extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends Omit<DataReadRequest, 'startTime' | 'endTime'> {
        /**
         * Related data type of this request.
         *
         * @type { DataType }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        dataType: DataType;
        /**
         * Aggregate metrics to be read
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @type { Partial<Record<keyof T, AggregateMetricScope[]>> }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        metrics: Partial<Record<keyof T, AggregateMetricScope[]>>;
        /**
         * Group by
         *
         * @type { GroupOption }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        groupBy: GroupOption;
    }
    /**
     * Aggregating query results
     *
     * @typedef AggregateResult
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AggregateResult<T extends Record<string, AggregateMetrics> = Record<string, AggregateMetrics>> extends Omit<SampleDataBase, 'dataSourceId'> {
        /**
         * Fields to read, omitted for read all the fields.
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @type { Pick<T, keyof T> }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        fields: Pick<T, keyof T>;
    }
    /**
     * Represents ExerciseSequence read request.
     *
     * @typedef ExerciseSequenceReadRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequenceReadRequest<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Sub data type(s).
         * When the value is null, the Sub data type is unlimited.
         *
         * @type { SubDataType | SubDataType[] | null }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        exerciseType: SubDataType | SubDataType[] | null;
        /**
         * Read details options of ExerciseSequence
         *
         * @type { ?SequenceReadOptions<DK> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readOptions?: SequenceReadOptions<DK>;
    }
    /**
     * Represents HealthSequence read request.
     *
     * @typedef HealthSequenceReadRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequenceReadRequest<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * health sequence data type(s) of this request.
         *
         * @type { DataType | DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        healthSequenceDataType: DataType | DataType[];
        /**
         * Read details options of HealthSequence
         *
         * @type { ?SequenceReadOptions<DK> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readOptions?: SequenceReadOptions<DK>;
    }
    /**
     * Represents unix time based delete request.
     *
     * @typedef UnixTimeBasedDataDeleteRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface UnixTimeBasedDataDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related data type(s) of this request.
         *
         * @type { DataType | DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataType: DataType | DataType[];
    }
    /**
     * Represents sample point delete request.
     *
     * @typedef { UnixTimeBasedDataDeleteRequest }
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type SamplePointDeleteRequest = UnixTimeBasedDataDeleteRequest;
    /**
     * Represents exercise sequence delete request.
     *
     * @typedef ExerciseSequenceDeleteRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequenceDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Sub data type(s).
         * When the value is null, the Sub data type is unlimited.
         *
         * @type { SubDataType | SubDataType[] | null }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        exerciseType: SubDataType | SubDataType[] | null;
    }
    /**
     * Represents health sequence delete request.
     *
     * @typedef HealthSequenceDeleteRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequenceDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related health sequence data type(s) of this request.
         *
         * @type { DataType | DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        healthSequenceDataType: DataType | DataType[];
    }
    /**
     * Represents read request of data source.
     *
     * @typedef DataSourceReadRequest
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSourceReadRequest {
        /**
         * Identify of a data source.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId?: string;
        /**
         * Application bundle name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        bundleName?: string;
        /**
         * Unique id of the device.
         *
         * @type { ?string }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        deviceUniqueId?: string;
    }
    /**
     * Base interface of Authorization.
     *
     * @typedef AuthorizationBase
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationBase {
        /**
         * The data types of read permission required.
         *
         * @type { DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readDataTypes: DataType[];
        /**
         * The data types of write permission required.
         *
         * @type { DataType[] }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        writeDataTypes: DataType[];
    }
    /**
     * Parameter for request authorization.
     *
     * @typedef AuthorizationRequest
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationRequest extends AuthorizationBase {
    }
    /**
     * Response of authorization.
     *
     * @typedef AuthorizationResponse
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationResponse extends AuthorizationBase {
    }
    /*
     * {{{ API
     */
    /**
     * Init health store module.
     *
     * @param { common.Context } context - The context of current ability.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function init(context: common.Context): Promise<void>;
    /**
     * API of manipulate the data source.
     */
    /**
     * Read data source.
     * At least one HealthServiceKit permission is required.
     *
     * @param { DataSourceReadRequest } request - Data source to read.
     * @returns { Promise<DataSource[]> } Result of data source array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function readDataSource(request: DataSourceReadRequest): Promise<DataSource[]>;
    /**
     * Insert data source.
     * At least one HealthServiceKit permission is required.
     *
     * @param { DataSourceBase } dataSource Data source to insert.
     * @returns { Promise<string> } Returned a data source id.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function insertDataSource(dataSource: DataSourceBase): Promise<string>;
    /**
     * Update data source.
     * At least one HealthServiceKit permission is required.
     *
     * @param { DataSource } dataSource Data source to update.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function updateDataSource(dataSource: DataSource): Promise<void>;
    /**
     * API of manipulate the data store
     */
    /**
     * Read sample point data using timestamp from the health data store.
     * Requires read permission for the data type in the parameter.
     *
     * @param { SamplePointReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function readData<T extends SamplePoint>(request: SamplePointReadRequest): Promise<T[]>;
    /**
     * Read exercise sequence data from the health data store.
     * Requires read permission for the data type in the parameter.
     *
     * @param { ExerciseSequenceReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function readData<T extends ExerciseSequence>(request: ExerciseSequenceReadRequest): Promise<T[]>;
    /**
     * Read health sequence data from the health data store.
     * Requires read permission for the data type in the parameter.
     *
     * @param { HealthSequenceReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function readData<T extends HealthSequence>(request: HealthSequenceReadRequest): Promise<T[]>;
    /**
     * aggregate data from the health data store.
     * Requires read permission for the data type in the parameter.
     *
     * @param { AggregateRequest | AggregateRequest[] } request - A request of data aggregate.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function aggregateData<T extends AggregateResult>(request: AggregateRequest | AggregateRequest[]): Promise<T[]>;
    /**
     * Save sample point data to health data store.
     * Requires write permission for the data type in the parameter.
     *
     * @param { SamplePoint[] | SamplePoint } sampleData Health data to be saved.
     * @returns { Promise<void> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function saveData(sampleData: SamplePoint[] | SamplePoint): Promise<void>;
    /**
     * Save exercise sequence data to health data store.
     * Requires write permission for the data type in the parameter.
     *
     * @param { ExerciseSequence[] | ExerciseSequence } exerciseSequence Health data to be saved.
     * @returns { Promise<void> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function saveData(exerciseSequence: ExerciseSequence[] | ExerciseSequence): Promise<void>;
    /**
     * Save health sequence data to health data store.
     * Requires write permission for the data type in the parameter.
     *
     * @param { HealthSequence[] | HealthSequence } healthSequence Health data to be saved.
     * @returns { Promise<void> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function saveData(healthSequence: HealthSequence[] | HealthSequence): Promise<void>;
    /**
     * Delete data based on request.
     * Requires write permission for the data type in the parameter.
     *
     * @param { SamplePointDeleteRequest | SamplePointDeleteRequest[] } request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: SamplePointDeleteRequest | SamplePointDeleteRequest[]): Promise<void>;
    /**
     * Delete exercise sequence data based on request.
     * Requires write permission for the data type in the parameter.
     *
     * @param { ExerciseSequenceDeleteRequest | ExerciseSequenceDeleteRequest[] } request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: ExerciseSequenceDeleteRequest | ExerciseSequenceDeleteRequest[]): Promise<void>;
    /**
     * Delete health sequence data based on request.
     * Requires write permission for the data type in the parameter.
     *
     * @param { HealthSequenceDeleteRequest | HealthSequenceDeleteRequest[] } request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: HealthSequenceDeleteRequest | HealthSequenceDeleteRequest[]): Promise<void>;
    /**
     * Delete the given sample point data.
     * Requires write permission for the data type in the parameter.
     *
     * @param { SamplePoint | SamplePoint[] } samplePoint Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(samplePoint: SamplePoint | SamplePoint[]): Promise<void>;
    /**
     * Delete the given exercise sequence data.
     * Requires write permission for the data type in the parameter.
     *
     * @param { ExerciseSequence | ExerciseSequence[] } exerciseSequence Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(exerciseSequence: ExerciseSequence | ExerciseSequence[]): Promise<void>;
    /**
     * Delete the given health sequence data.
     * Requires write permission for the data type in the parameter.
     *
     * @param { HealthSequence | HealthSequence[] } healthSequence Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(healthSequence: HealthSequence | HealthSequence[]): Promise<void>;
    /**
     * Request authorizations.
     * Interfaces can be invoked after the fingerprint certificate is configured.
     *
     * @param { common.UIAbilityContext } context UIAbilityContext.
     * @param { AuthorizationRequest } request authorizations request.
     * @returns { Promise<AuthorizationResponse> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestAuthorizations(context: common.UIAbilityContext, request: AuthorizationRequest): Promise<AuthorizationResponse>;
    /**
     * Query authorizations.
     * Interfaces can be invoked after the fingerprint certificate is configured.
     *
     * @param { AuthorizationRequest } request query authorizations request.
     * @returns { Promise<AuthorizationResponse> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error. Possible causes: 1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types; 3.Parameter verification failed.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function getAuthorizations(request: AuthorizationRequest): Promise<AuthorizationResponse>;
    /**
     * Cancel authorizations.
     * Interfaces can be invoked after the fingerprint certificate is configured.
     *
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function cancelAuthorizations(): Promise<void>;
    /*
     * API }}}
     */
    /**
     * Define all the data types constant.
     *
     * @namespace healthDataTypes
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    namespace healthDataTypes {
        /**
         * Constant definition of the SamplePoint dataType daily activities.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DAILY_ACTIVITIES: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType heart rate.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HEART_RATE: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType blood oxygen saturation.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BLOOD_OXYGEN_SATURATION: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType stress.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const STRESS: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType body temperature.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BODY_TEMPERATURE: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType height.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HEIGHT: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType weight.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const WEIGHT: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType resting heart rate.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const RESTING_HEART_RATE: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType blood pressure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BLOOD_PRESSURE: healthStore.DataType;
        /**
         * Constant definition of the SamplePoint dataType skin temperature.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SKIN_TEMPERATURE: healthStore.DataType;
        /**
         * Constant definition of the HealthSequence dataType sleep record.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SLEEP_RECORD: healthStore.DataType;
        /**
         * Constant definition of the HealthSequence dataType nap record.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SLEEP_NAP_RECORD: healthStore.DataType;
        /**
         * Constant definition of the ExerciseSequence dataType workout.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const WORKOUT: healthStore.DataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType running.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const RUNNING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType indoor running.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const INDOOR_RUNNING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType trail running.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TRAIL_RUNNING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType walking.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const WALKING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType indoor walking.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const INDOOR_WALKING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType hiking.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HIKING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType cycling.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CYCLING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType indoor cycling.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const INDOOR_CYCLING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType spinning.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SPINNING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType bmx.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BMX: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType jumping rope.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const JUMPING_ROPE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType rower.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ROWER: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType rowing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ROWING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType pool swim.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const POOL_SWIM: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType open water swim.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const OPEN_WATER_SWIM: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType basketball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BASKETBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType diving.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DIVING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType scuba diving.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SCUBA_DIVING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType breath holding train.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BREATH_HOLDING_TRAIN: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType breath holding test.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BREATH_HOLDING_TEST: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType mountain hike.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const MOUNTAIN_HIKE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType biathlon.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BIATHLON: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType skiing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SKIING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType snowboarding.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SNOWBOARDING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType sled.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SLED: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType elliptical.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ELLIPTICAL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType strength training.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const STRENGTH_TRAINING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType badminton.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BADMINTON: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType aerobics.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const AEROBICS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType hiit.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HIIT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType yoga.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const YOGA: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType table-tennis.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TABLE_TENNIS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType physical training.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PHYSICAL_TRAINING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType core training.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CORE_TRAINING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType functional training.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FUNCTIONAL_TRAINING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType tennis.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TENNIS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType tai chi.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TAI_CHI: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType hula-hoop.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HULA_HOOP: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType boxing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BOXING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType pilates.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PILATES: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType golf practice.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const GOLF_PRACTICE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType golf course model.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const GOLF_COURSE_MODEL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType adventures.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ADVENTURES: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType playground race.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PLAYGROUND_RACE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType triathlon.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TRIATHLON: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType free training.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FREE_TRAINING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType stepper.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const STEPPER: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType cross fit.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CROSS_FIT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType taekwondo.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TAEKWONDO: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType free sparring.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FREE_SPARRING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType karate.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const KARATE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType fencing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FENCING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType belly dance.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BELLY_DANCE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType jazz dance.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const JAZZ_DANCE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType latin dance.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const LATIN_DANCE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType ballet.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BALLET: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType body combat.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BODY_COMBAT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType kendo.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const KENDO: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType single bar.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SINGLE_BAR: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType parallel bars.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PARALLEL_BARS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType air walker.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const AIR_WALKER: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType street dance.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const STREET_DANCE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType roller skating.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ROLLER_SKATING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType martial arts.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const MARTIAL_ARTS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType plaza dancing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PLAZA_DANCING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType dance.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DANCE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType Frisbee.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FRISBEE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType darts.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DARTS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType archery.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ARCHERY: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType horse riding.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HORSE_RIDING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType hunting.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HUNTING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType kite flying.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const KITE_FLYING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType tug of war.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const TUG_OF_WAR: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType swinging.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SWINGING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType stair climbing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const STAIR_CLIMBING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType obstacle race.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const OBSTACLE_RACE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType fishing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const FISHING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType pool.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const POOL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType bowling.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BOWLING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType volleyball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const VOLLEYBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType shuttlecock.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SHUTTLECOCK: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType handball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HANDBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType baseball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BASEBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType softball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SOFTBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType cricket.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CRICKET: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType rugby.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const RUGBY: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType soccer.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SOCCER: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType beach soccer.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BEACH_SOCCER: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType beach volleyball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BEACH_VOLLEYBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType gateball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const GATEBALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType hockey.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const HOCKEY: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType squash.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SQUASH: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType seoaktakraw.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SEPAKTAKRAW: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType dodge ball.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DODGE_BALL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType sailboat.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SAILBOAT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType surfing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SURFING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType drifting.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DRIFTING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType dragon boat.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DRAGON_BOAT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType canoeing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CANOEING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType motorboat.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const MOTORBOAT: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType sup.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SUP: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType skating.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SKATING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType ice hockey.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ICE_HOCKEY: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType curling.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CURLING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType snowmobile.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SNOWMOBILE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType skateboard.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SKATEBOARD: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType rock climbing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ROCK_CLIMBING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType bungee jumping.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const BUNGEE_JUMPING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType parkour.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PARKOUR: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType orienteering.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ORIENTEERING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType parachute.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PARACHUTE: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType racing car.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const RACING_CAR: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType cross-country skiing.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const CROSS_COUNTRY_SKIING: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType esports.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const ESPORTS: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType padel.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const PADEL: healthStore.SubDataType;
        /**
         * Constant definition of the ExerciseSequence exerciseType sense sport.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const SENSE_SPORT: healthStore.SubDataType;
    }
    /**
     * Define data model field structures used in the health store.
     *
     * @namespace healthFields
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    namespace healthFields {
        /**
         * Define the type for daily activities SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DailyActivities = {
            /**
             * Number of daily activities step, value must be [0, 500).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step: number;
            /**
             * Number of daily activities calorie in calories, value must be [0, 65536).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: number;
            /**
             * Number of daily activities distance in meters, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: number;
            /**
             * Duration of daily activities in minutes, value must be 0 or 1.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            duration?: number;
            /**
             * Status of daily activities.
             * The possible status values are as follows:
             *   2: Mountaineering
             *   3: Cycling
             *   4: running
             *   5: walking
             *   9: Swimming
             *   10: Fitness
             *   13: standing
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            status?: number;
            /**
             * Intensity status of daily activities,
             * The possible status values are as follows:
             *   0: not intensity status
             *   1: intensity status
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            isIntensity?: number;
            /**
             * Number of daily activities climb high altitude in meters.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            climbHighAltitude?: number;
            /**
             * Stand status of daily activities.
             * The possible status values are as follows:
             *   0: is not stand status
             *   1: stand status
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            isStand?: number;
        };
        /**
         * Define the type for daily activities aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        type DailyActivitiesAggregation = {
            /**
             * Sum of daily activities step.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            step: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities calorie.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            calorie: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities distance.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            distance: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities climb high altitude.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            climbHighAltitude: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities intensity status.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            isIntensity: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities stand status.
             *
             * @type { Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            isStand: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
        };
        /**
         * Define the type for heart rate aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRateAggregation = {
            /**
             * Aggregation of heart rate bpm.
             *
             * @type { Omit<AggregateMetrics, 'avg' | 'sum' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bpm: Omit<AggregateMetrics, 'avg' | 'sum' | 'count'>;
        };
        /**
         * Define the type for blood oxygen saturation aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturationAggregation = {
            /**
             * Aggregation of blood oxygen saturation spo2.
             *
             * @type { Omit<AggregateMetrics, 'sum' | 'count'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            spo2: Omit<AggregateMetrics, 'sum' | 'count'>;
        };
        /**
         * Define the type for stress aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StressAggregation = {
            /**
             * Aggregation of stress stressScore.
             *
             * @type { Omit<AggregateMetrics, 'sum'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            stressScore: Omit<AggregateMetrics, 'sum'>;
        };
        /**
         * Define the type for body temperature aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperatureAggregation = {
            /**
             * Aggregation of body temperature bodyTemperature.
             *
             * @type { Omit<AggregateMetrics, 'sum' | 'last'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyTemperature: Omit<AggregateMetrics, 'sum' | 'last'>;
        };
        /**
         * Define the type for resting heart rate aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RestingHeartRateAggregation = {
            /**
             * Aggregation of resting heart rate restBpm.
             *
             * @type { Omit<AggregateMetrics, 'sum' | 'count' | 'max' | 'min' | 'avg'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            restBpm: Omit<AggregateMetrics, 'sum' | 'count' | 'max' | 'min' | 'avg'>;
        };
        /**
         * Define the type for skin temperature aggregation structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkinTemperatureAggregation = {
            /**
             * Aggregation of skin temperature skinTemperature.
             *
             * @type { Omit<AggregateMetrics, 'sum' | 'last'> }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skinTemperature: Omit<AggregateMetrics, 'sum' | 'last'>;
        };
        /**
         * Define the type for heart rate SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRate = {
            /**
             * Heart rate in beats per minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bpm: number;
        };
        /**
         * Define the type for blood oxygen saturation SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturation = {
            /**
             * Blood oxygen saturation level, value must be (0, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            spo2: number;
        };
        /**
         * Define the type for stress SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Stress = {
            /**
             * Stress score, value must be [1, 99].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            stressScore: number;
        };
        /**
         * Define the type for body temperature SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperature = {
            /**
             * Body temperature in degrees Celsius, value must be [34, 42].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyTemperature: number;
        };
        /**
         * Define the type for user height SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Height = {
            /**
             * user height.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            height: number;
        };
        /**
         * Define the type for weight SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Weight = {
            /**
             * user bodyWeight, value must be [0.1, 500].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyWeight: number;
            /**
             * body mass index, value must be [1, 200].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bmi?: number;
            /**
             * body fat, value must be [0, 500].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyFat?: number;
            /**
             * body fat percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyFatRate?: number;
            /**
             * muscle mass, value must be [0.1, 150].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            muscleMass?: number;
            /**
             * basal metabolism, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            basalMetabolism?: number;
            /**
             * body moisture, value must be [0, 500].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            moisture?: number;
            /**
             * percentage of body water, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            moistureRate?: number;
            /**
             * Visceral Fat level, value must be [1, 59].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            visceralFatLevel?: number;
            /**
             * bone salt content, value must be [0.5, 5].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            boneSalt?: number;
            /**
             * Protein content, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            proteinRate?: number;
            /**
             * Body Score, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyScore?: number;
            /**
             * physical age, value must be [5, 99].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyAge?: number;
            /**
             * skeletal muscle mass, value must be [1, 150].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skeletalMuscleMass?: number;
            /**
             * Body fat scale impedance, value must be [0.1, 100000].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            impedance?: number;
        };
        /**
         * Define the type for restingHeartRate SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RestingHeartRate = {
            /**
             * Resting Heart rate in beats per minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            restBpm: number;
        };
        /**
         * Define the type for bloodPressure SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodPressure = {
            /**
             * Systolic blood pressure, value must be (0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bloodPressureSystolic: number;
            /**
             * diastolic blood pressure, value must be (0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bloodPressureDiastolic: number;
            /**
             * sphygmus, value must be (0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sphygmus?: number;
            /**
             * Measurement abnormality flag, value must be (0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            measurementAnomalyFlag?: number;
            /**
             * the activities before measurement, value must be (0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            beforeMeasureActivity?: number;
        };
        /**
         * Define the type for skinTemperature SamplePoint structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkinTemperature = {
            /**
             * Skin temperature, value must be [20, 42].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skinTemperature: number;
        };
        /**
         * Define exerciseSequence summary data structure
         */
        /**
         * Define the type for steps exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StepSummary = {
            /**
             * Total number of steps for exerciseSequence, value must be (0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalSteps: number;
        };
        /**
         * Define the type for distance exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DistanceSummary = {
            /**
             * Total distance for exerciseSequence in meters, value must be (0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalDistance: number;
        };
        /**
         * Define the type for PoolSwimFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PoolSwimFeature = {
            /**
             * pull times.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pullTimes: number;
            /**
             * Number of swimming.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            tripTimes: number;
            /**
             * Length of pool.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            poolLength?: number;
            /**
             * Main swimming position.
             * The possible status values are as follows:
             *   1: Breaststroke
             *   2: Freestyle swimming
             *   3: butterfly stroke
             *   4: Backstroke
             *   5: Mixed swimming
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimmingStroke?: number;
        };
        /**
         * Define the type for RowingFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowingFeature = {
            /**
             * Cumulative paddling times.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            strokesNum: number;
        };
        /**
         * Define the type for RowerFeature exerciseSummary structure.
         *
         * @typedef { RowingFeature }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowerFeature = RowingFeature;
        /**
         * Define the type for openWaterFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type OpenWaterSwimFeature = {
            /**
             * pull times.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pullTimes: number;
            /**
             * Main swimming position.
             * The possible status values are as follows:
             *   1: Breaststroke
             *   2: Freestyle swimming
             *   3: butterfly stroke
             *   4: Backstroke
             *   5: Mixed swimming
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimmingStroke?: number;
        };
        /**
         * Define the type for basketballFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BasketballFeature = {
            /**
             * Overall Score.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            overallScore: number;
            /**
             * burst Score.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            burstScore?: number;
            /**
             * jump Score.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jumpScore?: number;
            /**
             * run Score.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runScore?: number;
            /**
             * breakthrough Score.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breakthroughScore?: number;
            /**
             * sport Intensity Score.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sportIntensityScore?: number;
        };
        /**
         * Define the type for jumpSummary exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpSummary = {
            /**
             * jump Times.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jumpTimes: number;
            /**
             * max Jump Height.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxJumpHeight?: number;
            /**
             * maximum hold time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxPassageDuration?: number;
        };
        /**
         * Define the type for DivingFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DivingFeature = {
            /**
             * diving Time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingTime: number;
            /**
             * diving Count.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingCount: number;
            /**
             * diving Mode.
             * The possible status values are as follows:
             *   0: free diving
             *   1: Recreational Scuba Diving
             *   2: Technical Scuba Diving
             *   3: instrument diving
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingMode: number;
            /**
             * Maximum duration of a single underwater .
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxUnderwaterTime?: number;
            /**
             * underwater Time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            underwaterTime?: number;
            /**
             * flight ban time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noFlyTime?: number;
            /**
             * water Type.
             * The possible status values are as follows:
             *   1: Fresh water
             *   2: sea water
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterType?: number;
            /**
             * water Density.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterDensity?: number;
            /**
             * max Ascent Speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxAscentSpeed?: number;
            /**
             * max Descent Speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxDescentSpeed?: number;
        };
        /**
         * Define the type for ScubaDivingFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ScubaDivingFeature = {
            /**
             * diving Time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingTime: number;
            /**
             * diving Count.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingCount: number;
            /**
             * diving Mode.
             * The possible status values are as follows:
             *   0: free diving
             *   1: Recreational Scuba Diving
             *   2: Technical Scuba Diving
             *   3: instrument diving
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingMode: number;
            /**
             * Maximum duration of a single underwater .
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxUnderwaterTime?: number;
            /**
             * underwater Time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            underwaterTime?: number;
            /**
             * flight ban time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noFlyTime?: number;
            /**
             * cns.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cns?: number;
            /**
             * otu.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            otu?: number;
            /**
             * water Type.
             * The possible status values are as follows:
             *   1: Fresh water
             *   2: sea water
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterType?: number;
            /**
             * water Density.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterDensity?: number;
            /**
             * max Ascent Speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxAscentSpeed?: number;
            /**
             * max Descent Speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxDescentSpeed?: number;
        };
        /**
         * Define the type for breathHoldingTrainFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTrainFeature = {
            /**
             * breath Time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breathTime: number;
            /**
             * breath Holding Time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breathHoldingTime: number;
            /**
             * breath Holding Train Rhythm.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breathHoldingTrainRhythm?: number;
        };
        /**
         * Define the type for skiingFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkiingFeature = {
            /**
             * trip Times.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            tripTimes: number;
            /**
             * max Slope Percent.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxSlopePercent?: number;
            /**
             * max Slope Degree.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxSlopeDegree?: number;
            /**
             * total Time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalTime?: number;
            /**
             * total Distance.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalDistance?: number;
        };
        /**
         * Define the type for snowboardingFeature exerciseSummary structure.
         *
         * @typedef { SkiingFeature }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SnowboardingFeature = SkiingFeature;
        /**
         * Define the type for golfPracticeFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfPracticeFeature = {
            /**
             * Total swings.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfSwingCount: number;
            /**
             * average swing speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfSwingSpeed?: number;
            /**
             * max swing speed.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfMaxSwingSpeed?: number;
            /**
             * golf Swing Tempo.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfSwingTempo?: number;
            /**
             * Average Down Swing time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfDownSwingTime?: number;
            /**
             * Average Back Swing time.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfBackSwingTime?: number;
        };
        /**
         * Define the type for breathHoldingTestFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTestFeature = {
            /**
             * Diaphragm dotting time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            diaphragmTime: number;
        };
        /**
         * Define the type for golfCourseModelFeature exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfCourseModelFeature = {
            /**
             * Total swings.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfSwingCount: number;
            /**
             * Stadium name ID..
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            courseId: number;
            /**
             * Layer ID of the first half.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            branchId1?: number;
            /**
             * Layer ID of the second half.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            branchId2?: number;
            /**
             * Number of holes.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            holes: number;
            /**
             * Green in regulation (GIR).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            gir?: number;
            /**
             * Albatross.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            doubleEagle?: number;
            /**
             * Eagle.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            eagle?: number;
            /**
             * Birdie.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            birdie?: number;
            /**
             * Par.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            par?: number;
            /**
             * Bogey.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bogey?: number;
            /**
             * Double bogeys.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            doubleBogey?: number;
            /**
             * Total putts.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            putts?: number;
            /**
             * Avg putts.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgPutts?: number;
            /**
             * Par-3.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            par3?: number;
            /**
             * Par-4.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            par4?: number;
            /**
             * Par-5.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            par5?: number;
            /**
             * Fairway hits.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            fairwayHits?: number;
            /**
             * Hooks.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            fairwayLeft?: number;
            /**
             * Slices.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            fairwayRight?: number;
            /**
             * best handicap.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgHandicap?: number;
            /**
             * best handicap.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bestHandicap?: number;
            /**
             * total handicap.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalHandicap?: number;
        };
        /**
         * Define the type for calorie exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CalorieSummary = {
            /**
             * Total number of calories for exerciseSequence in calories, value must be (0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalCalories: number;
        };
        /**
         * Define the type for quantity exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type QuantitySummary = {
            /**
             * Average quantity for exerciseSequence, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avg: number;
            /**
             * Maximum quantity for exerciseSequence, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            max: number;
            /**
             * Minimum quantity for exerciseSequence, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            min?: number;
        };
        /**
         * Define the type for exercise heart rate summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ExerciseHeartRateSummary = QuantitySummary;
        /**
         * Define the type for divingDepthSummary structure.
         *
         * @typedef { Omit<QuantitySummary, 'min'> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DivingDepthSummary = Omit<QuantitySummary, 'min'>;
        /**
         * Define the type for waterTemperatureSummary structure.
         *
         * @typedef { Omit<QuantitySummary, 'avg'> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type WaterTemperatureSummary = Omit<QuantitySummary, 'avg'>;
        /**
         * Define the type for speed summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SpeedSummary = QuantitySummary;
        /**
         * Define the type for swimStrokeRate summary structure.
         *
         * @typedef { Omit<QuantitySummary, 'max' | 'min'> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SwimStrokeRateSummary = Omit<QuantitySummary, 'max' | 'min'>;
        /**
         * Define the type for swolfSummary summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SwolfSummary = QuantitySummary;
        /**
         * Define the type for cadence summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CadenceSummary = QuantitySummary;
        /**
         * Define the type for running form summary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningFormSummary = {
            /**
             * Average ground contact time for exerciseSequence in milliseconds, value must be [0, 5000].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundContactTime: number;
            /**
             * Average ground impact acceleration for exerciseSequence in G-forces.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundImpactAcceleration?: number;
            /**
             * Average swing angle for exerciseSequence in degree.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgSwingAngle?: number;
            /**
             * Average eversion excursion for exerciseSequence in degree.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgEversionExcursion?: number;
            /**
             * Average hang time for exerciseSequence in milliseconds.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgHangTime?: number;
            /**
             * Average rate of ground contact time to hang time for exerciseSequence.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundHangTimeRate?: number;
            /**
             * Fore foot strike pattern for exerciseSequence.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            foreFootStrikePattern?: number;
            /**
             * Hind foot strike pattern for exerciseSequence.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hindFootStrikePattern?: number;
            /**
             * Whole foot strike pattern for exerciseSequence.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wholeFootStrikePattern?: number;
            /**
             * Average impact peak for exerciseSequence in BW(multiples of body weight).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgImpactPeak?: number;
            /**
             * Average vertical impact rate for exerciseSequence in BW/S.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalImpactRate?: number;
            /**
             * Average vertical oscillation for exerciseSequence in centimeters.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalOscillation?: number;
            /**
             * Average vertical ratio for exerciseSequence in percentage.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalRatio?: number;
            /**
             * Average gc time balance for exerciseSequence, percentage of ground contact duration of the left foot
             * as compared to the ground contact duration of both feet (that of the right foot is 100% minus this value).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGcTimeBalance?: number;
        };
        /**
         * Define the type for altitude summary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type AltitudeSummary = {
            /**
             * Maximum altitude for exerciseSequence.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            max: number;
            /**
             * Minimum altitude for exerciseSequence.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            min: number;
            /**
             * Average altitude for exerciseSequence.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avg?: number;
            /**
             * Total ascent for exerciseSequence, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalAscent?: number;
            /**
             * Total descent for exerciseSequence, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalDescent?: number;
        };
        /**
         * Define the type for location summary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type LocationSummary = {
            /**
             * Starting latitude for exerciseSequence, value must be [-90, 90].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            startLat?: number;
            /**
             * Ending latitude for exerciseSequence, value must be [-90, 90].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endLat?: number;
            /**
             * Starting longitude for exerciseSequence, value must be [-180, 180].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            startLon?: number;
            /**
             * Ending longitude for exerciseSequence, value must be [-180, 180].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endLon?: number;
            /**
             * Coordinate information for exerciseSequence.
             * The possible values are: 'GCJ02', 'WGS84', 'BD09'
             *
             * @type { string }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            coordinate: string;
        };
        /**
         * Define the type for pedaling cadence summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PedalingCadenceSummary = QuantitySummary;
        /**
         * Define the type for power summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PowerSummary = QuantitySummary;
        /**
         * Define the type for strokeRate summary structure.
         *
         * @typedef { Omit<QuantitySummary, 'min'> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StrokeRateSummary = Omit<QuantitySummary, 'min'>;
        /**
         * Define the type for skip speed summary structure.
         *
         * @typedef { QuantitySummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkipSpeedSummary = QuantitySummary;
        /**
         * Define the type for resistance exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ResistanceSummary = {
            /**
             * Resistance level one lower limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv1LowerLimit: number;
            /**
             * Resistance level two lower limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv2LowerLimit: number;
            /**
             * Resistance level three lower limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv3LowerLimit: number;
            /**
             * Resistance level four lower limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv4LowerLimit: number;
            /**
             * Resistance level five lower limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5LowerLimit: number;
            /**
             * Resistance level five upper limit, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5UpperLimit: number;
            /**
             * Resistance level one duration in minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv1Duration: number;
            /**
             * Resistance level two duration in minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv2Duration: number;
            /**
             * Resistance level three duration in minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv3Duration: number;
            /**
             * Resistance level four duration in minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv4Duration: number;
            /**
             * Resistance level five duration in minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5Duration: number;
            /**
             * Maximum resistance level, value must be [1, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxRes?: number;
            /**
             * Minimum resistance level, value must be [1, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            minRes?: number;
        };
        /**
         * Define the type for running exercise feature structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningFeature = {
            /**
             * Average pace for running exercise in second/km, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgPace: number;
            /**
             * Best pace for running exercise in second/km, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bestPace: number;
            /**
             * Pace map for running exercise.
             * This field indicates the pace information per kilometer. The unit is second/km.
             * For example:
             *   '1.0':407.945
             *   '2.0':473.98846
             *   '2.170':473.98846
             *
             * @type { ?PaceValueType }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            paceMap?: healthStore.PaceValueType;
            /**
             * Part time map for running exercise.
             * Segmental data (key: kilometer; value: second)
             * When km is used, the distance value is accurate to the fourth decimal place.
             * Value is the time taken to cover the current distance.
             *  '1.0':3.0
             *  '2.0':6.0
             *  '3.0':9.0
             *  '21.0975':7020.0
             *  '42.195':18000.0
             * Where, 21.0975 and 42.195 are the distances of the half Marathon and full Marathon, respectively.
             * Except for these two types of race, the first decimal place is 0.
             *
             * @type { ?PaceValueType }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            partTimeMap?: healthStore.PaceValueType;
        };
        /**
         * Define the type for jumping rope exercise feature structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeFeature = {
            /**
             * Number of skips for jumping rope exercise, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipNum: number;
            /**
             * Number of interruptions for jumping rope exercise, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            interruptions?: number;
            /**
             * Longest streak for jumping rope exercise, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            longestStreak?: number;
            /**
             * Number of double unders for jumping rope exercise, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            doubleUnders?: number;
            /**
             * Number of triple unders for jumping rope exercise, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            tripleUnders?: number;
        };
        /**
         * Define the type for walking exercise summary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type WalkingSummary = {
            /**
             * Summary of the distance covered during walking exercise.
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Summary of the calories burned during walking exercise.
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Summary of the speed during walking exercise.
             *
             * @type { SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Summary of the heart rate during walking exercise.
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Summary of the steps taken during walking exercise.
             *
             * @type { ?StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * Summary of the cadence during walking exercise.
             *
             * @type { ?CadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * Summary of the altitude during walking exercise.
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Summary of the location during walking exercise.
             *
             * @type { ?LocationSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
        };
        /**
         * Define the type for running exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningSummary = {
            /**
             * Distance summary for running exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Calorie summary for running exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Speed summary for running exerciseSequence
             *
             * @type { SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Exercise heart rate summary for running exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Step summary for running exerciseSequence
             *
             * @type { ?StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * Cadence summary for running exerciseSequence
             *
             * @type { ?CadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * Altitude summary for running exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Location summary for running exerciseSequence
             *
             * @type { ?LocationSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
            /**
             * Running form summary for running exerciseSequence
             *
             * @type { ?RunningFormSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningForm?: RunningFormSummary;
            /**
             * Running feature summary for running exerciseSequence
             *
             * @type { ?RunningFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningFeature?: RunningFeature;
        };
        /**
         * Define the type for cycling exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CyclingSummary = {
            /**
             * Distance summary for cycling exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Calorie summary for cycling exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Speed summary for cycling exerciseSequence
             *
             * @type { SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Exercise heart rate summary for cycling exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Resistance summary for cycling exerciseSequence
             *
             * @type { ?ResistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: ResistanceSummary;
            /**
             * Pedaling cadence summary for cycling exerciseSequence
             *
             * @type { ?PedalingCadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadenceSummary;
            /**
             * Power summary for cycling exerciseSequence
             *
             * @type { ?PowerSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: PowerSummary;
            /**
             * Altitude summary for cycling exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Location summary for cycling exerciseSequence
             *
             * @type { ?LocationSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
        };
        /**
         * Define the type for jumping rope exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeSummary = {
            /**
             * Jumping rope feature summary for jumping rope exerciseSequence
             *
             * @type { JumpingRopeFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jumpingRopeFeature: JumpingRopeFeature;
            /**
             * Calorie summary for jumping rope exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Skip speed summary for jumping rope exerciseSequence
             *
             * @type { SkipSpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed: SkipSpeedSummary;
            /**
             * Exercise heart rate summary for jumping rope exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
        };
        /**
         * Define the type for rower exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowerSummary = {
            /**
             * rower feature summary for rower exerciseSequence
             *
             * @type { RowerFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            rowerFeature: RowerFeature;
            /**
             * distance summary for rower exerciseSequence
             *
             * @type { ?DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance?: DistanceSummary;
            /**
             * calorie summary for rower exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * speed summary for rower exerciseSequence
             *
             * @type { ?SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: SpeedSummary;
            /**
             * exerciseHeartRate summary for rower exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * resistance summary for rower exerciseSequence
             *
             * @type { ?ResistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: ResistanceSummary;
            /**
             * power summary for rower exerciseSequence
             *
             * @type { ?PowerSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: PowerSummary;
            /**
             * strokeRate summary for rower exerciseSequence
             *
             * @type { ?StrokeRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            strokeRate?: StrokeRateSummary;
        };
        /**
         * Define the type for rowing exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowingSummary = {
            /**
             * rowing feature summary for rowing exerciseSequence
             *
             * @type { RowingFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            rowingFeature: RowingFeature;
            /**
             * distance summary for rowing exerciseSequence
             *
             * @type { ?DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance?: DistanceSummary;
            /**
             * calorie summary for rowing exerciseSequence
             *
             * @type { ?CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * exerciseHeartRate summary for rowing exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * strokeRate summary for rowing exerciseSequence
             *
             * @type { ?StrokeRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            strokeRate?: StrokeRateSummary;
        };
        /**
         * Define the type for poolSwim exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PoolSwimSummary = {
            /**
             * poolSwimFeature summary for poolSwim exerciseSequence
             *
             * @type { PoolSwimFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            poolSwimFeature: PoolSwimFeature;
            /**
             * distance summary for poolSwim exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * calorie summary for poolSwim exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * exerciseHeartRate summary for poolSwim exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * speed summary for poolSwim exerciseSequence
             *
             * @type { ?SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: SpeedSummary;
            /**
             * swimStrokeRate summary for poolSwim exerciseSequence
             *
             * @type { ?SwimStrokeRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimStrokeRate?: SwimStrokeRateSummary;
            /**
             * swolf summary for poolSwim exerciseSequence
             *
             * @type { ?SwolfSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swolf?: SwolfSummary;
        };
        /**
         * Define the type for openWaterSwim exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type OpenWaterSwimSummary = {
            /**
             * openWaterSwimFeature summary for openWaterSwim exerciseSequence
             *
             * @type { OpenWaterSwimFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            openWaterSwimFeature: OpenWaterSwimFeature;
            /**
             * distance summary for openWaterSwim exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * calorie summary for openWaterSwim exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * exerciseHeartRate summary for openWaterSwim exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * swimStrokeRate summary for openWaterSwim exerciseSequence
             *
             * @type { ?SwimStrokeRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimStrokeRate?: SwimStrokeRateSummary;
            /**
             * swolf summary for openWaterSwim exerciseSequence
             *
             * @type { ?SwolfSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swolf?: SwolfSummary;
        };
        /**
         * Define the type for basketball exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BasketballSummary = {
            /**
             * basketballFeature summary for basketball exerciseSequence
             *
             * @type { BasketballFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            basketballFeature: BasketballFeature;
            /**
             * calorie summary for basketball exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * exerciseHeartRate summary for basketball exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * jump summary for basketball exerciseSequence
             *
             * @type { JumpSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jump: JumpSummary;
        };
        /**
         * Define the type for diving exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DivingSummary = {
            /**
             * divingFeature summary for diving exerciseSequence
             *
             * @type { DivingFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingFeature: DivingFeature;
            /**
             * location summary for diving exerciseSequence
             *
             * @type { ?LocationSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
            /**
             * divingDepth summary for diving exerciseSequence
             *
             * @type { ?DivingDepthSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingDepth?: DivingDepthSummary;
            /**
             * waterTemperature summary for diving exerciseSequence
             *
             * @type { ?WaterTemperatureSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterTemperature?: WaterTemperatureSummary;
        };
        /**
         * Define the type for scubaDiving exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ScubaDivingSummary = {
            /**
             * scubaDivingFeature summary for scubaDiving exerciseSequence
             *
             * @type { ScubaDivingFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            scubaDivingFeature: ScubaDivingFeature;
            /**
             * location summary for scubaDiving exerciseSequence
             *
             * @type { ?LocationSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
            /**
             * divingDepth summary for scubaDiving exerciseSequence
             *
             * @type { ?DivingDepthSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingDepth?: DivingDepthSummary;
            /**
             * waterTemperature summary for scubaDiving exerciseSequence
             *
             * @type { ?WaterTemperatureSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterTemperature?: WaterTemperatureSummary;
        };
        /**
         * Define the type for breathHoldingTrain exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTrainSummary = {
            /**
             * breathHoldingTrainFeature summary for breathHoldingTrain exerciseSequence
             *
             * @type { BreathHoldingTrainFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breathHoldingTrainFeature: BreathHoldingTrainFeature;
            /**
             * exerciseHeartRate summary for breathHoldingTrain exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
        };
        /**
         * Define the type for breathHoldingTest exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTestSummary = {
            /**
             * breathHoldingTestFeature summary for breathHoldingTest exerciseSequence
             *
             * @type { BreathHoldingTestFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            breathHoldingTestFeature: BreathHoldingTestFeature;
            /**
             * exerciseHeartRate summary for breathHoldingTest exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
        };
        /**
         * Define the type for mountainHike exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type MountainHikeSummary = {
            /**
             * distance summary for mountainHike exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * exerciseHeartRate summary for mountainHike exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for mountainHike exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * step summary for mountainHike exerciseSequence
             *
             * @type { ?StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * altitude summary for mountainHike exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
        };
        /**
         * Define the type for sports exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SportsSummary = {
            /**
             * exerciseHeartRate summary for common exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for common exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
        };
        /**
         * Define the type for biathlon exerciseSummary structure.
         *
         * @typedef { SportsSummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BiathlonSummary = SportsSummary;
        /**
         * Define the type for sled exerciseSummary structure.
         *
         * @typedef { SportsSummary }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SledSummary = SportsSummary;
        /**
         * Define the type for skiing exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkiingSummary = {
            /**
             * distance summary for skiing exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * exerciseHeartRate summary for skiing exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for skiing exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * skiingFeature summary for skiing exerciseSequence
             *
             * @type { SkiingFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skiingFeature: SkiingFeature;
            /**
             * altitude summary for skiing exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
        };
        /**
         * Define the type for snowboarding exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SnowboardingSummary = {
            /**
             * distance summary for snowboarding exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * exerciseHeartRate summary for snowboarding exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for snowboarding exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * snowboardingFeature summary for snowboarding exerciseSequence
             *
             * @type { SnowboardingFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            snowboardingFeature: SnowboardingFeature;
            /**
             * altitude summary for snowboarding exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
        };
        /**
         * Define the type for elliptical exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type EllipticalSummary = {
            /**
             * distance summary for elliptical exerciseSequence
             *
             * @type { ?DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance?: DistanceSummary;
            /**
             * exerciseHeartRate summary for elliptical exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for elliptical exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * speed summary for elliptical exerciseSequence
             *
             * @type { ?SpeedSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: SpeedSummary;
            /**
             * step summary for elliptical exerciseSequence
             *
             * @type { ?StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * cadence summary for elliptical exerciseSequence
             *
             * @type { ?CadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * resistance summary for elliptical exerciseSequence
             *
             * @type { ?ResistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: ResistanceSummary;
            /**
             * pedalingCadence summary for elliptical exerciseSequence
             *
             * @type { ?PedalingCadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadenceSummary;
            /**
             * power summary for elliptical exerciseSequence
             *
             * @type { ?PowerSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: PowerSummary;
        };
        /**
         * Define the type for golfPractice exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfPracticeSummary = {
            /**
             * golfPracticeFeature summary for golfPractice exerciseSequence
             *
             * @type { GolfPracticeFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfPracticeFeature: GolfPracticeFeature;
            /**
             * exerciseHeartRate summary for golfPractice exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for golfPractice exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
        };
        /**
         * Define the type for golfCourseModel exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfCourseModelSummary = {
            /**
             * golfCourseModelFeature summary for golfCourseModel exerciseSequence
             *
             * @type { GolfCourseModelFeature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            golfCourseModelFeature: GolfCourseModelFeature;
            /**
             * exerciseHeartRate summary for golfCourseModel exerciseSequence
             *
             * @type { ?ExerciseHeartRateSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * calorie summary for golfCourseModel exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * distance summary for golfCourseModel exerciseSequence
             *
             * @type { ?DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance?: DistanceSummary;
            /**
             * step summary for golfCourseModel exerciseSequence
             *
             * @type { StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step: StepSummary;
            /**
             * cadence summary for golfCourseModel exerciseSequence
             *
             * @type { ?CadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * altitude summary for golfCourseModel exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
        };
        /**
         * Define the type for adventures exerciseSummary structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type AdventuresSummary = {
            /**
             * calorie summary for adventures exerciseSequence
             *
             * @type { CalorieSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * distance summary for adventures exerciseSequence
             *
             * @type { DistanceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * step summary for adventures exerciseSequence
             *
             * @type { ?StepSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * cadence summary for adventures exerciseSequence
             *
             * @type { ?CadenceSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * altitude summary for adventures exerciseSequence
             *
             * @type { ?AltitudeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
        };
        /**
         * Define the interface for exercise heart rate SequencePoint structure.
         *
         * @typedef ExerciseHeartRate
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface ExerciseHeartRate extends healthStore.SequencePoint {
            /**
             * Exercise heart rate in beats per minute, value must be (0, 255).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bpm: number;
        }
        /**
         * Define the interface for speed SequencePoint structure.
         *
         * @typedef Speed
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Speed extends healthStore.SequencePoint {
            /**
             * Speed measured in m/s, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: number;
        }
        /**
         * Define the interface for swimStrokeRate SequencePoint structure.
         *
         * @typedef SwimStrokeRate
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface SwimStrokeRate extends healthStore.SequencePoint {
            /**
             * Stroke rate.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            spm: number;
        }
        /**
         * Define the interface for swolf SequencePoint structure.
         *
         * @typedef Swolf
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Swolf extends healthStore.SequencePoint {
            /**
             * SWOLF.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swolf: number;
        }
        /**
         * Define the interface for jump SequencePoint structure.
         *
         * @typedef Jump
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Jump extends healthStore.SequencePoint {
            /**
             * Jump height.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jumpHeight: number;
            /**
             * Hang time.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            passageDuration: number;
        }
        /**
         * Define the interface for divingDepth SequencePoint structure.
         *
         * @typedef DivingDepth
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface DivingDepth extends healthStore.SequencePoint {
            /**
             * Depth.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            depth: number;
        }
        /**
         * Define the interface for waterTemperature SequencePoint structure.
         *
         * @typedef WaterTemperature
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface WaterTemperature extends healthStore.SequencePoint {
            /**
             * Temperature.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            temperature: number;
        }
        /**
         * Define the interface for markPoint SequencePoint structure.
         *
         * @typedef MarkPoint
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface MarkPoint extends healthStore.SequencePoint {
            /**
             * Serial Number.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sn: number;
            /**
             * Marker Point Type.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type: number;
            /**
             * longitude.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            longitude: number;
            /**
             * latitude.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            latitude: number;
            /**
             * color.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            color?: number;
            /**
             * Marking method.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            mode: number;
        }
        /**
         * Define the interface for cadence SequencePoint structure.
         *
         * @typedef Cadence
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Cadence extends healthStore.SequencePoint {
            /**
             * Number of steps per minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence: number;
        }
        /**
         * Define the interface for running form SequencePoint structure.
         *
         * @typedef RunningForm
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface RunningForm extends healthStore.SequencePoint {
            /**
             * Ground contact time in milliseconds, value must be [0, 5000].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundContactTime: number;
            /**
             * Ground impact acceleration measured in G-forces, value must be [0, 50].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundImpactAcceleration?: number;
            /**
             * Swing angle measured in degrees, value must be [0, 360].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swingAngle?: number;
            /**
             * Eversion excursion measured in degrees, value must be [-100, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            eversionExcursion?: number;
            /**
             * Hang time measured in milliseconds, value must be [0, 500].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hangTime?: number;
            /**
             * The rate of ground contact time to hang time, value must be [0, 500].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundHangTimeRate?: number;
            /**
             * Forefoot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            foreFootStrikePattern?: number;
            /**
             * Hindfoot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hindFootStrikePattern?: number;
            /**
             * Whole foot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wholeFootStrikePattern?: number;
            /**
             * Impact peak measured in BW(multiples of body weight), value must be [0, 10].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            impactPeak?: number;
            /**
             * Vertical oscillation measured in centimetres, value must be [0,25.6].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            verticalOscillation?: number;
            /**
             * Vertical ratio measured as a percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            verticalRatio?: number;
            /**
             * Ground contact time balance measured as a percentage, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            gcTimeBalance?: number;
        }
        /**
         * Define the interface for altitude SequencePoint structure.
         *
         * @typedef Altitude
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Altitude extends healthStore.SequencePoint {
            /**
             * Altitude measured in meters.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude: number;
        }
        /**
         * Define the interface for location SequencePoint structure.
         *
         * @typedef Location
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Location extends healthStore.SequencePoint {
            /**
             * Latitude of the location, value must be [-90, 90].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            latitude: number;
            /**
             * Longitude of the location, value must be [-180, 180].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            longitude: number;
        }
        /**
         * Define the interface for pedaling cadence SequencePoint structure.
         *
         * @typedef PedalingCadence
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface PedalingCadence extends healthStore.SequencePoint {
            /**
             * Number of pedal revolutions per minute, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            rpm: number;
        }
        /**
         * Define the interface for power SequencePoint structure.
         *
         * @typedef Power
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Power extends healthStore.SequencePoint {
            /**
             * Power measured in watts, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power: number;
        }
        /**
         * Define the interface for skip speed SequencePoint structure.
         *
         * @typedef SkipSpeed
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface SkipSpeed extends healthStore.SequencePoint {
            /**
             * Skip speed measured in revolutions/min, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed: number;
        }
        /**
         * Define the interface for resistance SequencePoint structure.
         *
         * @typedef Resistance
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Resistance extends healthStore.SequencePoint {
            /**
             * Resistance level, value must be [1, 100].
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLevel: number;
        }
        /**
         * Define the interface for strokeRate SequencePoint structure.
         *
         * @typedef StrokeRate
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface StrokeRate extends healthStore.SequencePoint {
            /**
             * Stroke rate.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            spm: number;
        }
        /**
         * Defines the type for walking exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type WalkingDetail = {
            /**
             * SequencePoint array of exercise heart rate for walking exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for walking exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of cadence for walking exerciseSequence.
             *
             * @type { ?Cadence[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: Cadence[];
            /**
             * SequencePoint array of altitude for walking exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
            /**
             * SequencePoint array of location for walking exerciseSequence.
             *
             * @type { ?Location[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
        };
        /**
         * Defines the type for running exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningDetail = {
            /**
             * SequencePoint array of exercise heart rate for running exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for running exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of cadence for running exerciseSequence.
             *
             * @type { ?Cadence[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: Cadence[];
            /**
             * SequencePoint array of running form for running exerciseSequence.
             *
             * @type { ?RunningForm[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningForm?: RunningForm[];
            /**
             * SequencePoint array of location for running exerciseSequence.
             *
             * @type { ?Location[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of altitude for running exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
        };
        /**
         * Defines the type for cycling exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CyclingDetail = {
            /**
             * SequencePoint array of exercise heart rate for cycling exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for cycling exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of altitude for cycling exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
            /**
             * SequencePoint array of location for cycling exerciseSequence.
             *
             * @type { ?Location[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of pedaling cadence for cycling exerciseSequence.
             *
             * @type { ?PedalingCadence[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadence[];
            /**
             * SequencePoint array of power for cycling exerciseSequence.
             *
             * @type { ?Power[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: Power[];
            /**
             * SequencePoint array of resistance for cycling exerciseSequence.
             *
             * @type { ?Resistance[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: Resistance[];
        };
        /**
         * Defines the type for jumping rope exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeDetail = {
            /**
             * SequencePoint array of exercise heart rate for jumping rope exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of skip speed for jumping rope exerciseSequence.
             *
             * @type { ?SkipSpeed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed?: SkipSpeed[];
        };
        /**
         * Defines the type for rower exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowerDetail = {
            /**
             * SequencePoint array of exercise heart rate for rower exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for rower exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of power for rower exerciseSequence.
             *
             * @type { ?Power[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: Power[];
            /**
             * SequencePoint array of resistance for rower exerciseSequence.
             *
             * @type { ?Resistance[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: Resistance[];
            /**
             * SequencePoint array of strokeRate for rower exerciseSequence.
             *
             * @type { ?StrokeRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            strokeRate?: StrokeRate[];
        };
        /**
         * Defines the type for rowing exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RowingDetail = {
            /**
             * SequencePoint array of exercise heart rate for rowing exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of strokeRate for rowing exerciseSequence.
             *
             * @type { ?StrokeRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            strokeRate?: StrokeRate[];
        };
        /**
         * Defines the type for poolSwim exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PoolSwimDetail = {
            /**
             * SequencePoint array of exercise heart rate for poolSwim exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for poolSwim exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of swimStrokeRate for poolSwim exerciseSequence.
             *
             * @type { ?SwimStrokeRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimStrokeRate?: SwimStrokeRate[];
            /**
             * SequencePoint array of swolf for poolSwim exerciseSequence.
             *
             * @type { ?Swolf[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swolf?: Swolf[];
        };
        /**
         * Defines the type for openWaterSwim exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type OpenWaterSwimDetail = {
            /**
             * SequencePoint array of exercise heart rate for openWaterSwim exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of location for openWaterSwim exerciseSequence.
             *
             * @type { ?Location[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of speed for openWaterSwim exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of swimStrokeRate for openWaterSwim exerciseSequence.
             *
             * @type { ?SwimStrokeRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swimStrokeRate?: SwimStrokeRate[];
            /**
             * SequencePoint array of swolf for openWaterSwim exerciseSequence.
             *
             * @type { ?Swolf[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swolf?: Swolf[];
        };
        /**
         * Defines the type for basketball exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BasketballDetail = {
            /**
             * SequencePoint array of exercise heart rate for basketball exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of jump for basketball exerciseSequence.
             *
             * @type { ?Jump[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jump?: Jump[];
            /**
             * SequencePoint array of speed for basketball exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
        };
        /**
         * Defines the type for diving exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DivingDetail = {
            /**
             * SequencePoint array of divingDepth for diving exerciseSequence.
             *
             * @type { ?DivingDepth[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingDepth?: DivingDepth[];
            /**
             * SequencePoint array of waterTemperature for diving exerciseSequence.
             *
             * @type { ?WaterTemperature[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterTemperature?: WaterTemperature[];
        };
        /**
         * Defines the type for scubaDiving exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ScubaDivingDetail = {
            /**
             * SequencePoint array of divingDepth for scubaDiving exerciseSequence.
             *
             * @type { ?DivingDepth[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            divingDepth?: DivingDepth[];
            /**
             * SequencePoint array of waterTemperature for scubaDiving exerciseSequence.
             *
             * @type { ?WaterTemperature[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            waterTemperature?: WaterTemperature[];
        };
        /**
         * Defines the type for sports exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SportsDetail = {
            /**
             * SequencePoint array of exercise heart rate for common exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
        };
        /**
         * Defines the type for breathHoldingTrain exerciseSequence detail structure.
         *
         * @typedef { SportsDetail }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTrainDetail = SportsDetail;
        /**
         * Defines the type for breathHoldingTest exerciseSequence detail structure.
         *
         * @typedef { SportsDetail }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTestDetail = SportsDetail;
        /**
         * Defines the type for golfPractice exerciseSequence detail structure.
         *
         * @typedef { SportsDetail }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfPracticeDetail = SportsDetail;
        /**
         * Defines the type for mountainHike exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type MountainHikeDetail = {
            /**
             * SequencePoint array of exercise heart rate for mountainHike exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for mountainHike exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of location for mountainHike exerciseSequence.
             *
             * @type { ?Location[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of altitude for mountainHike exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
        };
        /**
         * Defines the type for biathlon exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BiathlonDetail = {
            /**
             * SequencePoint array of exercise heart rate for biathlon exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for biathlon exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
        };
        /**
         * Defines the type for skiing exerciseSequence detail structure.
         *
         * @typedef { MountainHikeDetail }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkiingDetail = MountainHikeDetail;
        /**
         * Defines the type for snowboarding exerciseSequence detail structure.
         *
         * @typedef { MountainHikeDetail }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SnowboardingDetail = MountainHikeDetail;
        /**
         * Defines the type for sled exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SledDetail = {
            /**
             * SequencePoint array of exercise heart rate for sled exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for sled exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
        };
        /**
         * Defines the type for elliptical exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type EllipticalDetail = {
            /**
             * SequencePoint array of exercise heart rate for elliptical exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for elliptical exerciseSequence.
             *
             * @type { ?Speed[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of pedalingCadence for elliptical exerciseSequence.
             *
             * @type { ?PedalingCadence[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadence[];
            /**
             * SequencePoint array of power for elliptical exerciseSequence.
             *
             * @type { ?Power[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: Power[];
            /**
             * SequencePoint array of cadence for elliptical exerciseSequence.
             *
             * @type { ?Cadence[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: Cadence[];
        };
        /**
         * Defines the type for golfCourseModel exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfCourseModelDetail = {
            /**
             * SequencePoint array of exercise heart rate for golfCourseModel exerciseSequence.
             *
             * @type { ?ExerciseHeartRate[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of altitude for golfCourseModel exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
        };
        /**
         * Defines the type for adventures exerciseSequence detail structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type AdventuresDetail = {
            /**
             * SequencePoint array of markPoint for adventures exerciseSequence.
             *
             * @type { ?MarkPoint[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            markPoint?: MarkPoint[];
            /**
             * SequencePoint array of altitude for adventures exerciseSequence.
             *
             * @type { ?Altitude[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
        };
        /**
         * Define the type for sleep record structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Sleep = {
            /**
             * Earliest time of falling asleep in milliseconds since epoch, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            fallAsleepTime: number;
            /**
             * Latest time of waking up in milliseconds since epoch, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeupTime: number;
            /**
             * Sleep duration in seconds, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            duration: number;
            /**
             * Earliest time to go to bed in milliseconds since epoch, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bedTime?: number;
            /**
             * Latest time to get up in milliseconds since epoch, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            risingTime?: number;
            /**
             * Prepare time for sleep in milliseconds since epoch, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            prepareSleepTime?: number;
            /**
             * Shallow sleep duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            shallowDuration?: number;
            /**
             * Deep sleep duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            deepDuration?: number;
            /**
             * Dream sleep duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            dreamDuration?: number;
            /**
             * Awake duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeDuration?: number;
            /**
             * Number of awakenings, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeCount?: number;
            /**
             * On-bed duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            onBedDuration?: number;
            /**
             * Sleep recording duration in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            recordDuration?: number;
            /**
             * Sleep efficiency, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepEfficiency?: number;
            /**
             * Sleep score, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepScore?: number;
            /**
             * Deep sleep continuity, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            deepSleepContinuity?: number;
            /**
             * Respiratory quality score, value must be [0, 100].
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            respiratoryQualityScore?: number;
            /**
             * Number of rollovers, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            turnOverCount?: number;
            /**
             * Reasons for end of sleep, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepEndReason?: number;
            /**
             * Sleep symptoms.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepSymptoms?: string;
            /**
             * Sleep type.
             * The possible values are as follows:
             *   1: TruSleep
             *   2: regular sleep
             *   3: Manually enter sleep
             *   4: Phone records sleep
             * If this parameter is not set, the default value 2 is used.
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepType?: number;
        };
        /**
         * Define the type for nap record structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepNap = {
            /**
             * Duration of nap in seconds, value must be [0, ∞).
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noonDuration: number;
            /**
             * Recording duration of nap in seconds, value must be [0, ∞).
             *
             * @type { ?number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noonRecordDuration?: number;
        };
        /**
         * Define the interface for sleep segment data structure.
         *
         * @typedef SleepSegment
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface SleepSegment extends healthStore.SequencePoint {
            /**
             * Sleep status.
             * The possible values are as follows:
             *   0: unknown
             *   1: deepSleep
             *   2: shallowSleep
             *   3: dreamSleep
             *   4: wake
             *   5: noonSleep
             *   6: onBed
             *   7：sleep(manual recording)
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepStatus: number;
            /**
             * End time of sleep segment in milliseconds since epoch.
             *
             * @type { number }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endTime: number;
        }
        /**
         * Define the type for sleep detail data structure.
         *
         * @typedef { object }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepDetail = {
            /**
             * Sleep segment array.
             *
             * @type { ?SleepSegment[] }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepSegment?: SleepSegment[];
        };
    }
    /**
     * Define data models used in the health store.
     *
     * @namespace healthModels
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    namespace healthModels {
        /**
         * Define the type for daily activities SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.DailyActivities> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DailyActivities = healthStore.SamplePoint<healthFields.DailyActivities>;
        /**
         * Define the type for heart rate SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.HeartRate> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRate = healthStore.SamplePoint<healthFields.HeartRate>;
        /**
         * Define the type for blood oxygen saturation SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.BloodOxygenSaturation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturation = healthStore.SamplePoint<healthFields.BloodOxygenSaturation>;
        /**
         * Define the type for stress SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.Stress> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Stress = healthStore.SamplePoint<healthFields.Stress>;
        /**
         * Define the type for body temperature SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.BodyTemperature> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperature = healthStore.SamplePoint<healthFields.BodyTemperature>;
        /**
         * Define the type for user height SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.Height> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Height = healthStore.SamplePoint<healthFields.Height>;
        /**
         * Define the type for weight SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.Weight> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Weight = healthStore.SamplePoint<healthFields.Weight>;
        /**
         * Define the type for restingHeartRate SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.RestingHeartRate> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RestingHeartRate = healthStore.SamplePoint<healthFields.RestingHeartRate>;
        /**
         * Define the type for BloodPressure SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.BloodPressure> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodPressure = healthStore.SamplePoint<healthFields.BloodPressure>;
        /**
         * Define the type for SkinTemperature SamplePoint.
         *
         * @typedef { healthStore.SamplePoint<healthFields.SkinTemperature> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkinTemperature = healthStore.SamplePoint<healthFields.SkinTemperature>;
        /**
         * Define the type for aggregate result of daily activities.
         *
         * @typedef { healthStore.AggregateResult<healthFields.DailyActivitiesAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        type DailyActivitiesAggregateResult = healthStore.AggregateResult<healthFields.DailyActivitiesAggregation>;
        /**
         * Define the type for aggregate request of daily activities.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.DailyActivitiesAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        type DailyActivitiesAggregateRequest = healthStore.AggregateRequest<healthFields.DailyActivitiesAggregation>;
        /**
         * Define the type for aggregate result of heart rate.
         *
         * @typedef { healthStore.AggregateResult<healthFields.HeartRateAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRateAggregateResult = healthStore.AggregateResult<healthFields.HeartRateAggregation>;
        /**
         * Define the type for aggregate request of heart rate.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.HeartRateAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRateAggregateRequest = healthStore.AggregateRequest<healthFields.HeartRateAggregation>;
        /**
         * Define the type for aggregate result of blood oxygen saturation.
         *
         * @typedef { healthStore.AggregateResult<healthFields.BloodOxygenSaturationAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturationAggregateResult = healthStore.AggregateResult<healthFields.BloodOxygenSaturationAggregation>;
        /**
         * Define the type for aggregate request of blood oxygen saturation.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.BloodOxygenSaturationAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturationAggregateRequest = healthStore.AggregateRequest<healthFields.BloodOxygenSaturationAggregation>;
        /**
         * Define the type for aggregate result of stress.
         *
         * @typedef { healthStore.AggregateResult<healthFields.StressAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StressAggregateResult = healthStore.AggregateResult<healthFields.StressAggregation>;
        /**
         * Define the type for aggregate request of stress.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.StressAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StressAggregateRequest = healthStore.AggregateRequest<healthFields.StressAggregation>;
        /**
         * Define the type for aggregate result of body temperature.
         *
         * @typedef { healthStore.AggregateResult<healthFields.BodyTemperatureAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperatureAggregateResult = healthStore.AggregateResult<healthFields.BodyTemperatureAggregation>;
        /**
         * Define the type for aggregate request of body temperature.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.BodyTemperatureAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperatureAggregateRequest = healthStore.AggregateRequest<healthFields.BodyTemperatureAggregation>;
        /**
         * Define the type for aggregate result of resting heart rate.
         *
         * @typedef { healthStore.AggregateResult<healthFields.RestingHeartRateAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RestingHeartRateAggregateResult = healthStore.AggregateResult<healthFields.RestingHeartRateAggregation>;
        /**
         * Define the type for aggregate request of resting heart rate.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.RestingHeartRateAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RestingHeartRateAggregateRequest = healthStore.AggregateRequest<healthFields.RestingHeartRateAggregation>;
        /**
         * Define the type for aggregate result of skin temperature.
         *
         * @typedef { healthStore.AggregateResult<healthFields.SkinTemperatureAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkinTemperatureAggregateResult = healthStore.AggregateResult<healthFields.SkinTemperatureAggregation>;
        /**
         * Define the type for aggregate request of skin temperature.
         *
         * @typedef { healthStore.AggregateRequest<healthFields.SkinTemperatureAggregation> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkinTemperatureAggregateRequest = healthStore.AggregateRequest<healthFields.SkinTemperatureAggregation>;
        /**
         * Define the type for walking ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Walking = healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail>;
        /**
         * Define the type for indoor walking ExerciseSequence.
         *
         * @typedef { Walking }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorWalking = Walking;
        /**
         * Define the type for hiking ExerciseSequence.
         *
         * @typedef { Walking }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Hiking = Walking;
        /**
         * Define the type for running ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Running = healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail>;
        /**
         * Define the type for indoor running ExerciseSequence.
         *
         * @typedef { Running }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorRunning = Running;
        /**
         * Define the type for trail running ExerciseSequence.
         *
         * @typedef { Running }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type TrailRunning = Running;
        /**
         * Define the type for cycling ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Cycling = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>;
        /**
         * Define the type for indoor cycling ExerciseSequence.
         *
         * @typedef { Cycling }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorCycling = Cycling;
        /**
         * Define the type for spinning ExerciseSequence.
         *
         * @typedef { Cycling }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Spinning = Cycling;
        /**
         * Define the type for bmx ExerciseSequence.
         *
         * @typedef { Cycling }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Bmx = Cycling;
        /**
         * Define the type for jumping rope ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.JumpingRopeSummary, healthFields.JumpingRopeDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRope = healthStore.ExerciseSequence<healthFields.JumpingRopeSummary, healthFields.JumpingRopeDetail>;
        /**
         * Define the type for rower ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.RowerSummary, healthFields.RowerDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Rower = healthStore.ExerciseSequence<healthFields.RowerSummary, healthFields.RowerDetail>;
        /**
         * Define the type for rowing ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.RowingSummary, healthFields.RowingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Rowing = healthStore.ExerciseSequence<healthFields.RowingSummary, healthFields.RowingDetail>;
        /**
         * Define the type for poolSwim ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.PoolSwimSummary, healthFields.PoolSwimDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PoolSwim = healthStore.ExerciseSequence<healthFields.PoolSwimSummary, healthFields.PoolSwimDetail>;
        /**
         * Define the type for openWaterSwim ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.OpenWaterSwimSummary, healthFields.OpenWaterSwimDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type OpenWaterSwim = healthStore.ExerciseSequence<healthFields.OpenWaterSwimSummary, healthFields.OpenWaterSwimDetail>;
        /**
         * Define the type for basketball ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.BasketballSummary, healthFields.BasketballDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Basketball = healthStore.ExerciseSequence<healthFields.BasketballSummary, healthFields.BasketballDetail>;
        /**
         * Define the type for diving ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.DivingSummary, healthFields.DivingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Diving = healthStore.ExerciseSequence<healthFields.DivingSummary, healthFields.DivingDetail>;
        /**
         * Define the type for scubaDiving ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.ScubaDivingSummary, healthFields.ScubaDivingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ScubaDiving = healthStore.ExerciseSequence<healthFields.ScubaDivingSummary, healthFields.ScubaDivingDetail>;
        /**
         * Define the type for breathHoldingTrain ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.BreathHoldingTrainSummary, healthFields.BreathHoldingTrainDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTrain = healthStore.ExerciseSequence<healthFields.BreathHoldingTrainSummary, healthFields.BreathHoldingTrainDetail>;
        /**
         * Define the type for breathHoldingTest ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.BreathHoldingTestSummary, healthFields.BreathHoldingTestDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BreathHoldingTest = healthStore.ExerciseSequence<healthFields.BreathHoldingTestSummary, healthFields.BreathHoldingTestDetail>;
        /**
         * Define the type for mountainHike ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.MountainHikeSummary, healthFields.MountainHikeDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type MountainHike = healthStore.ExerciseSequence<healthFields.MountainHikeSummary, healthFields.MountainHikeDetail>;
        /**
         * Define the type for biathlon ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.BiathlonSummary, healthFields.BiathlonDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Biathlon = healthStore.ExerciseSequence<healthFields.BiathlonSummary, healthFields.BiathlonDetail>;
        /**
         * Define the type for poolSwim ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.SkiingSummary, healthFields.SkiingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Skiing = healthStore.ExerciseSequence<healthFields.SkiingSummary, healthFields.SkiingDetail>;
        /**
         * Define the type for snowboarding ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.SnowboardingSummary, healthFields.SnowboardingDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Snowboarding = healthStore.ExerciseSequence<healthFields.SnowboardingSummary, healthFields.SnowboardingDetail>;
        /**
         * Define the type for sled ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.SledSummary, healthFields.SledDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Sled = healthStore.ExerciseSequence<healthFields.SledSummary, healthFields.SledDetail>;
        /**
         * Define the type for elliptical ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.EllipticalSummary, healthFields.EllipticalDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Elliptical = healthStore.ExerciseSequence<healthFields.EllipticalSummary, healthFields.EllipticalDetail>;
        /**
         * Define the type for golfPractice ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.GolfPracticeSummary, healthFields.GolfPracticeDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfPractice = healthStore.ExerciseSequence<healthFields.GolfPracticeSummary, healthFields.GolfPracticeDetail>;
        /**
         * Define the type for adventures ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.AdventuresSummary, healthFields.AdventuresDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Adventures = healthStore.ExerciseSequence<healthFields.AdventuresSummary, healthFields.AdventuresDetail>;
        /**
         * Define the type for golfCourseModel ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.GolfCourseModelSummary, healthFields.GolfCourseModelDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type GolfCourseModel = healthStore.ExerciseSequence<healthFields.GolfCourseModelSummary, healthFields.GolfCourseModelDetail>;
        /**
         * Define the type for sports ExerciseSequence.
         *
         * @typedef { healthStore.ExerciseSequence<healthFields.SportsSummary, healthFields.SportsDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Sports = healthStore.ExerciseSequence<healthFields.SportsSummary, healthFields.SportsDetail>;
        /**
         * Define the type for sleep record HealthSequence.
         *
         * @typedef { healthStore.HealthSequence<healthFields.Sleep, healthFields.SleepDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepRecord = healthStore.HealthSequence<healthFields.Sleep, healthFields.SleepDetail>;
        /**
         * Define the type for nap record HealthSequence, and this is another type of sleep record.
         *
         * @typedef { healthStore.HealthSequence<healthFields.SleepNap, healthFields.SleepDetail> }
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepNapRecord = healthStore.HealthSequence<healthFields.SleepNap, healthFields.SleepDetail>;
    }
    /**
     * Namespace for SamplePoint related functionality.
     *
     * @namespace samplePointHelper
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    namespace samplePointHelper {
        /**
         * Namespace for daily activities related functionality.
         *
         * @namespace dailyActivities
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        namespace dailyActivities {
            /**
             * The data type for daily activities.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for DailyActivities SamplePoint.
             *
             * @typedef { healthModels.DailyActivities }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.DailyActivities;
            /**
             * The fields for DailyActivities Model.
             *
             * @typedef { healthFields.DailyActivities }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.DailyActivities;
            /**
             * The model for DailyActivities AggregateResult.
             *
             * @typedef { healthModels.DailyActivitiesAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.DailyActivitiesAggregateResult;
            /**
             * The model for DailyActivities AggregateRequest.
             *
             * @typedef { healthModels.DailyActivitiesAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.DailyActivitiesAggregateRequest;
            /**
             * The fields for DailyActivities Aggregate.
             *
             * @typedef { healthFields.DailyActivitiesAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.DailyActivitiesAggregation;
        }
        /**
         * Namespace for heart rate related functionality.
         *
         * @namespace heartRate
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace heartRate {
            /**
             * The data type for heart rate.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for HeartRate SamplePoint.
             *
             * @typedef { healthModels.HeartRate }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.HeartRate;
            /**
             * The fields for HeartRate Model.
             *
             * @typedef { healthFields.HeartRate }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.HeartRate;
            /**
             * The model for HeartRate AggregateResult.
             *
             * @typedef { healthModels.HeartRateAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.HeartRateAggregateResult;
            /**
             * The model for HeartRate AggregateRequest.
             *
             * @typedef { healthModels.HeartRateAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.HeartRateAggregateRequest;
            /**
             * The fields for HeartRate Aggregate.
             *
             * @typedef { healthFields.HeartRateAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.HeartRateAggregation;
        }
        /**
         * Namespace for blood oxygen saturation related functionality.
         *
         * @namespace bloodOxygenSaturation
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace bloodOxygenSaturation {
            /**
             * The data type for blood oxygen saturation.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for BloodOxygenSaturation SamplePoint.
             *
             * @typedef { healthModels.BloodOxygenSaturation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BloodOxygenSaturation;
            /**
             * The fields for BloodOxygenSaturation Model.
             *
             * @typedef { healthFields.BloodOxygenSaturation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.BloodOxygenSaturation;
            /**
             * The model for BloodOxygenSaturation AggregateResult.
             *
             * @typedef { healthModels.BloodOxygenSaturationAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.BloodOxygenSaturationAggregateResult;
            /**
             * The model for BloodOxygenSaturation AggregateRequest.
             *
             * @typedef { healthModels.BloodOxygenSaturationAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.BloodOxygenSaturationAggregateRequest;
            /**
             * The fields for BloodOxygenSaturation Aggregate.
             *
             * @typedef { healthFields.BloodOxygenSaturationAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.BloodOxygenSaturationAggregation;
        }
        /**
         * Namespace for stress related functionality.
         *
         * @namespace stress
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace stress {
            /**
             * The data type for stress.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for Stress SamplePoint.
             *
             * @typedef { healthModels.Stress }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Stress;
            /**
             * The fields for Stress Model.
             *
             * @typedef { healthFields.Stress }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Stress;
            /**
             * The model for Stress AggregateResult.
             *
             * @typedef { healthModels.StressAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.StressAggregateResult;
            /**
             * The model for Stress AggregateRequest.
             *
             * @typedef { healthModels.StressAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.StressAggregateRequest;
            /**
             * The fields for Stress Aggregate.
             *
             * @typedef { healthFields.StressAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.StressAggregation;
        }
        /**
         * Namespace for body temperature related functionality.
         *
         * @namespace bodyTemperature
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace bodyTemperature {
            /**
             * The data type for body temperature.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for BodyTemperature SamplePoint.
             *
             * @typedef { healthModels.BodyTemperature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BodyTemperature;
            /**
             * The fields for BodyTemperature Model.
             *
             * @typedef { healthFields.BodyTemperature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.BodyTemperature;
            /**
             * The model for BodyTemperature AggregateResult.
             *
             * @typedef { healthModels.BodyTemperatureAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.BodyTemperatureAggregateResult;
            /**
             * The model for BodyTemperature AggregateRequest.
             *
             * @typedef { healthModels.BodyTemperatureAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.BodyTemperatureAggregateRequest;
            /**
             * The fields for BodyTemperature Aggregate.
             *
             * @typedef { healthFields.BodyTemperatureAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.BodyTemperatureAggregation;
        }
        /**
         * Namespace for user height related functionality.
         *
         * @namespace height
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace height {
            /**
             * The data type for user height.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for user height SamplePoint.
             *
             * @typedef { healthModels.Height }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Height;
            /**
             * The fields for user height Model.
             *
             * @typedef { healthFields.Height }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Height;
        }
        /**
         * Namespace for weight related functionality.
         *
         * @namespace weight
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace weight {
            /**
             * The data type for weight.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for weight SamplePoint.
             *
             * @typedef { healthModels.Weight }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Weight;
            /**
             * The fields for weight Model.
             *
             * @typedef { healthFields.Weight }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Weight;
        }
        /**
         * Namespace for restingHeartRate related functionality.
         *
         * @namespace restingHeartRate
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace restingHeartRate {
            /**
             * The data type for restingHeartRate.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for restingHeartRate SamplePoint.
             *
             * @typedef { healthModels.RestingHeartRate }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.RestingHeartRate;
            /**
             * The fields for restingHeartRate Model.
             *
             * @typedef { healthFields.RestingHeartRate }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.RestingHeartRate;
            /**
             * The model for restingHeartRate AggregateResult.
             *
             * @typedef { healthModels.RestingHeartRateAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.RestingHeartRateAggregateResult;
            /**
             * The model for restingHeartRate AggregateRequest.
             *
             * @typedef { healthModels.RestingHeartRateAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.RestingHeartRateAggregateRequest;
            /**
             * The fields for restingHeartRate Aggregate.
             *
             * @typedef { healthFields.RestingHeartRateAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.RestingHeartRateAggregation;
        }
        /**
         * Namespace for bloodPressure related functionality.
         *
         * @namespace bloodPressure
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace bloodPressure {
            /**
             * The data type for bloodPressure.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for bloodPressure SamplePoint.
             *
             * @typedef { healthModels.BloodPressure }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BloodPressure;
            /**
             * The fields for bloodPressure Model.
             *
             * @typedef { healthFields.BloodPressure }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.BloodPressure;
        }
        /**
         * Namespace for skinTemperature related functionality.
         *
         * @namespace skinTemperature
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace skinTemperature {
            /**
             * The data type for skinTemperature.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for skinTemperature SamplePoint.
             *
             * @typedef { healthModels.SkinTemperature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.SkinTemperature;
            /**
             * The fields for skinTemperature Model.
             *
             * @typedef { healthFields.SkinTemperature }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.SkinTemperature;
            /**
             * The model for skinTemperature AggregateResult.
             *
             * @typedef { healthModels.SkinTemperatureAggregateResult }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.SkinTemperatureAggregateResult;
            /**
             * The model for skinTemperature AggregateRequest.
             *
             * @typedef { healthModels.SkinTemperatureAggregateRequest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateRequest = healthModels.SkinTemperatureAggregateRequest;
            /**
             * The fields for skinTemperature Aggregate.
             *
             * @typedef { healthFields.SkinTemperatureAggregation }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type AggregateFields = healthFields.SkinTemperatureAggregation;
        }
    }
    /**
     * Namespace for ExerciseSequence related functionality.
     *
     * @namespace exerciseSequenceHelper
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    namespace exerciseSequenceHelper {
        /**
         * The data type for ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const DATA_TYPE: healthStore.DataType;
        /**
         * Namespace for walking related functionality.
         *
         * @namespace walking
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace walking {
            /**
             * The exercise type for walking.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for Walking ExerciseSequence.
             *
             * @typedef { healthModels.Walking }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Walking;
            /**
             * The fields for WalkingSummary.
             *
             * @typedef { healthFields.WalkingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
             * @typedef { healthFields.WalkingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.WalkingDetail;
        }
        /**
         * Namespace for indoor walking related functionality.
         *
         * @namespace indoorWalking
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace indoorWalking {
            /**
             * The exercise type for indoor walking.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for IndoorWalking ExerciseSequence.
             *
             * @typedef { healthModels.IndoorWalking }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorWalking;
            /**
             * The fields for WalkingSummary.
             *
             * @typedef { healthFields.WalkingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
             * @typedef { healthFields.WalkingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.WalkingDetail;
        }
        /**
         * Namespace for hiking related functionality.
         *
         * @namespace hiking
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace hiking {
            /**
             * The exercise type for hiking.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for Hiking ExerciseSequence.
             *
             * @typedef { healthModels.Hiking }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Hiking;
            /**
             * The fields for WalkingSummary.
             *
             * @typedef { healthFields.WalkingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
             * @typedef { healthFields.WalkingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.WalkingDetail;
        }
        /**
         * Namespace for running related functionality.
         *
         * @namespace running
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace running {
            /**
             * The exercise type for running.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for Running ExerciseSequence.
             *
             * @typedef { healthModels.Running }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Running;
            /**
             * The fields for RunningSummary.
             *
             * @typedef { healthFields.RunningSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
             * @typedef { healthFields.RunningDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.RunningDetail;
        }
        /**
         * Namespace for indoor running related functionality.
         *
         * @namespace indoorRunning
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace indoorRunning {
            /**
             * The exercise type for indoor running.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for IndoorRunning ExerciseSequence.
             *
             * @typedef { healthModels.IndoorRunning }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorRunning;
            /**
             * The fields for RunningSummary.
             *
             * @typedef { healthFields.RunningSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
             * @typedef { healthFields.RunningDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.RunningDetail;
        }
        /**
         * Namespace for trail running related functionality.
         *
         * @namespace trailRunning
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace trailRunning {
            /**
             * The exercise type for trail running.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for TrailRunning ExerciseSequence.
             *
             * @typedef { healthModels.TrailRunning }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.TrailRunning;
            /**
             * The fields for RunningSummary.
             *
             * @typedef { healthFields.RunningSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
             * @typedef { healthFields.RunningDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.RunningDetail;
        }
        /**
         * Namespace for cycling related functionality.
         *
         * @namespace cycling
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace cycling {
            /**
             * The exercise type for cycling.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for Cycling ExerciseSequence.
             *
             * @typedef { healthModels.Cycling }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Cycling;
            /**
             * The fields for CyclingSummary.
             *
             * @typedef { healthFields.CyclingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
             * @typedef { healthFields.CyclingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.CyclingDetail;
        }
        /**
         * Namespace for indoor cycling related functionality.
         *
         * @namespace indoorCycling
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace indoorCycling {
            /**
             * The exercise type for indoor cycling.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for IndoorCycling ExerciseSequence.
             *
             * @typedef { healthModels.IndoorCycling }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorCycling;
            /**
             * The fields for CyclingSummary.
             *
             * @typedef { healthFields.CyclingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
             * @typedef { healthFields.CyclingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.CyclingDetail;
        }
        /**
         * Namespace for spinning related functionality.
         *
         * @namespace spinning
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace spinning {
            /**
             * The exercise type for spinning.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for Spinning ExerciseSequence.
             *
             * @typedef { healthModels.Spinning }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Spinning;
            /**
             * The fields for CyclingSummary.
             *
             * @typedef { healthFields.CyclingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
             * @typedef { healthFields.CyclingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.CyclingDetail;
        }
        /**
         * Namespace for bmx related functionality.
         *
         * @namespace bmx
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace bmx {
            /**
             * The exercise type for bmx.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for bmx ExerciseSequence.
             *
             * @typedef { healthModels.Bmx }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Bmx;
            /**
             * The fields for CyclingSummary.
             *
             * @typedef { healthFields.CyclingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
             * @typedef { healthFields.CyclingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.CyclingDetail;
        }
        /**
         * Namespace for jumping rope related functionality.
         *
         * @namespace jumpingRope
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace jumpingRope {
            /**
             * The exercise type for jumping rope.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for JumpingRope ExerciseSequence.
             *
             * @typedef { healthModels.JumpingRope }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.JumpingRope;
            /**
             * The fields for JumpingRopeSummary.
             *
             * @typedef { healthFields.JumpingRopeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.JumpingRopeSummary;
            /**
             * The fields for JumpingRopeDetail.
             *
             * @typedef { healthFields.JumpingRopeDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.JumpingRopeDetail;
        }
        /**
         * Namespace for rower related functionality.
         *
         * @namespace rower
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace rower {
            /**
             * The exercise type for rower.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for rower ExerciseSequence.
             *
             * @typedef { healthModels.Rower }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Rower;
            /**
             * The fields for rowerSummary.
             *
             * @typedef { healthFields.RowerSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RowerSummary;
            /**
             * The fields for rowerDetail.
             *
             * @typedef { healthFields.RowerDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.RowerDetail;
        }
        /**
         * Namespace for rowing related functionality.
         *
         * @namespace rowing
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace rowing {
            /**
             * The exercise type for rowing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for rowing ExerciseSequence.
             *
             * @typedef { healthModels.Rowing }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Rowing;
            /**
             * The fields for RowingSummary.
             *
             * @typedef { healthFields.RowingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RowingSummary;
            /**
             * The fields for RowingDetail.
             *
             * @typedef { healthFields.RowingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.RowingDetail;
        }
        /**
         * Namespace for poolSwim related functionality.
         *
         * @namespace poolSwim
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace poolSwim {
            /**
             * The exercise type for poolSwim.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for poolSwim ExerciseSequence.
             *
             * @typedef { healthModels.PoolSwim }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.PoolSwim;
            /**
             * The fields for PoolSwimSummary.
             *
             * @typedef { healthFields.PoolSwimSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.PoolSwimSummary;
            /**
             * The fields for PoolSwimDetail.
             *
             * @typedef { healthFields.PoolSwimDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.PoolSwimDetail;
        }
        /**
         * Namespace for openWaterSwim related functionality.
         *
         * @namespace openWaterSwim
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace openWaterSwim {
            /**
             * The exercise type for openWaterSwim.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for openWaterSwim ExerciseSequence.
             *
             * @typedef { healthModels.OpenWaterSwim }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.OpenWaterSwim;
            /**
             * The fields for OpenWaterSwimSummary.
             *
             * @typedef { healthFields.OpenWaterSwimSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.OpenWaterSwimSummary;
            /**
             * The fields for OpenWaterSwimDetail.
             *
             * @typedef { healthFields.OpenWaterSwimDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.OpenWaterSwimDetail;
        }
        /**
         * Namespace for basketball related functionality.
         *
         * @namespace basketball
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace basketball {
            /**
             * The exercise type for basketball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for basketball ExerciseSequence.
             *
             * @typedef { healthModels.Basketball }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Basketball;
            /**
             * The fields for BasketballSummary.
             *
             * @typedef { healthFields.BasketballSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.BasketballSummary;
            /**
             * The fields for BasketballDetail.
             *
             * @typedef { healthFields.BasketballDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.BasketballDetail;
        }
        /**
         * Namespace for diving related functionality.
         *
         * @namespace diving
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace diving {
            /**
             * The exercise type for diving.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for diving ExerciseSequence.
             *
             * @typedef { healthModels.Diving }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Diving;
            /**
             * The fields for DivingSummary.
             *
             * @typedef { healthFields.DivingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.DivingSummary;
            /**
             * The fields for DivingDetail.
             *
             * @typedef { healthFields.DivingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.DivingDetail;
        }
        /**
         * Namespace for scubaDiving related functionality.
         *
         * @namespace scubaDiving
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace scubaDiving {
            /**
             * The exercise type for scubaDiving.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for scubaDiving ExerciseSequence.
             *
             * @typedef { healthModels.ScubaDiving }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.ScubaDiving;
            /**
             * The fields for ScubaDivingSummary.
             *
             * @typedef { healthFields.ScubaDivingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.ScubaDivingSummary;
            /**
             * The fields for ScubaDivingDetail.
             *
             * @typedef { healthFields.ScubaDivingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.ScubaDivingDetail;
        }
        /**
         * Namespace for breathHoldingTrain related functionality.
         *
         * @namespace breathHoldingTrain
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace breathHoldingTrain {
            /**
             * The exercise type for poolSwim.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for breathHoldingTrain ExerciseSequence.
             *
             * @typedef { healthModels.BreathHoldingTrain }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BreathHoldingTrain;
            /**
             * The fields for BreathHoldingTrainSummary.
             *
             * @typedef { healthFields.BreathHoldingTrainSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.BreathHoldingTrainSummary;
            /**
             * The fields for BreathHoldingTrainDetail.
             *
             * @typedef { healthFields.BreathHoldingTrainDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.BreathHoldingTrainDetail;
        }
        /**
         * Namespace for breathHoldingTest related functionality.
         *
         * @namespace breathHoldingTest
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace breathHoldingTest {
            /**
             * The exercise type for breathHoldingTest.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for breathHoldingTest ExerciseSequence.
             *
             * @typedef { healthModels.BreathHoldingTest }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BreathHoldingTest;
            /**
             * The fields for BreathHoldingTestSummary.
             *
             * @typedef { healthFields.BreathHoldingTestSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.BreathHoldingTestSummary;
            /**
             * The fields for BreathHoldingTestDetail.
             *
             * @typedef { healthFields.BreathHoldingTestDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.BreathHoldingTestDetail;
        }
        /**
         * Namespace for mountainHike related functionality.
         *
         * @namespace mountainHike
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace mountainHike {
            /**
             * The exercise type for mountainHike.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for mountainHike ExerciseSequence.
             *
             * @typedef { healthModels.MountainHike }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.MountainHike;
            /**
             * The fields for MountainHikeSummary.
             *
             * @typedef { healthFields.MountainHikeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.MountainHikeSummary;
            /**
             * The fields for MountainHikeDetail.
             *
             * @typedef { healthFields.MountainHikeDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.MountainHikeDetail;
        }
        /**
         * Namespace for biathlon related functionality.
         *
         * @namespace biathlon
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace biathlon {
            /**
             * The exercise type for biathlon.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for biathlon ExerciseSequence.
             *
             * @typedef { healthModels.Biathlon }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Biathlon;
            /**
             * The fields for BiathlonSummary.
             *
             * @typedef { healthFields.BiathlonSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.BiathlonSummary;
            /**
             * The fields for BiathlonDetail.
             *
             * @typedef { healthFields.BiathlonDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.BiathlonDetail;
        }
        /**
         * Namespace for skiing related functionality.
         *
         * @namespace skiing
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace skiing {
            /**
             * The exercise type for skiing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for skiing ExerciseSequence.
             *
             * @typedef { healthModels.Skiing }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Skiing;
            /**
             * The fields for SkiingSummary.
             *
             * @typedef { healthFields.SkiingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.SkiingSummary;
            /**
             * The fields for SkiingDetail.
             *
             * @typedef { healthFields.SkiingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SkiingDetail;
        }
        /**
         * Namespace for snowboarding related functionality.
         *
         * @namespace snowboarding
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace snowboarding {
            /**
             * The exercise type for snowboarding.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for snowboarding ExerciseSequence.
             *
             * @typedef { healthModels.Snowboarding }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Snowboarding;
            /**
             * The fields for SnowboardingSummary.
             *
             * @typedef { healthFields.SnowboardingSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.SnowboardingSummary;
            /**
             * The fields for SnowboardingDetail.
             *
             * @typedef { healthFields.SnowboardingDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SnowboardingDetail;
        }
        /**
         * Namespace for sled related functionality.
         *
         * @namespace sled
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace sled {
            /**
             * The exercise type for sled.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for sled ExerciseSequence.
             *
             * @typedef { healthModels.Sled }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Sled;
            /**
             * The fields for SledSummary.
             *
             * @typedef { healthFields.SledSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.SledSummary;
            /**
             * The fields for SledDetail.
             *
             * @typedef { healthFields.SledDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SledDetail;
        }
        /**
         * Namespace for elliptical related functionality.
         *
         * @namespace elliptical
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace elliptical {
            /**
             * The exercise type for elliptical.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for elliptical ExerciseSequence.
             *
             * @typedef { healthModels.Elliptical }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Elliptical;
            /**
             * The fields for EllipticalSummary.
             *
             * @typedef { healthFields.EllipticalSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.EllipticalSummary;
            /**
             * The fields for EllipticalDetail.
             *
             * @typedef { healthFields.EllipticalDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.EllipticalDetail;
        }
        /**
         * Namespace for golfPractice related functionality.
         *
         * @namespace golfPractice
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace golfPractice {
            /**
             * The exercise type for golfPractice.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for golfPractice ExerciseSequence.
             *
             * @typedef { healthModels.GolfPractice }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.GolfPractice;
            /**
             * The fields for GolfPracticeSummary.
             *
             * @typedef { healthFields.GolfPracticeSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.GolfPracticeSummary;
            /**
             * The fields for GolfPracticeDetail.
             *
             * @typedef { healthFields.GolfPracticeDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.GolfPracticeDetail;
        }
        /**
         * Namespace for golfCourseModel related functionality.
         *
         * @namespace golfCourseModel
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace golfCourseModel {
            /**
             * The exercise type for golfCourseModel.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for golfCourseModel ExerciseSequence.
             *
             * @typedef { healthModels.GolfCourseModel }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.GolfCourseModel;
            /**
             * The fields for GolfCourseModelSummary.
             *
             * @typedef { healthFields.GolfCourseModelSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.GolfCourseModelSummary;
            /**
             * The fields for GolfCourseModelDetail.
             *
             * @typedef { healthFields.GolfCourseModelDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.GolfCourseModelDetail;
        }
        /**
         * Namespace for adventures related functionality.
         *
         * @namespace adventures
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace adventures {
            /**
             * The exercise type for adventures.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const EXERCISE_TYPE: healthStore.SubDataType;
            /**
             * The model for adventures ExerciseSequence.
             *
             * @typedef { healthModels.Adventures }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Adventures;
            /**
             * The fields for AdventuresSummary.
             *
             * @typedef { healthFields.AdventuresSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.AdventuresSummary;
            /**
             * The fields for AdventuresDetail.
             *
             * @typedef { healthFields.AdventuresDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.AdventuresDetail;
        }
        /**
         * Namespace for sports related functionality.
         *
         * @namespace sports
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace sports {
            /**
             * The exercise type for strength training.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const STRENGTH_TRAINING: healthStore.SubDataType;
            /**
             * The exercise type for badminton.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BADMINTON: healthStore.SubDataType;
            /**
             * The exercise type for aerobics.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const AEROBICS: healthStore.SubDataType;
            /**
             * The exercise type for hiit.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HIIT: healthStore.SubDataType;
            /**
             * The exercise type for yoga.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const YOGA: healthStore.SubDataType;
            /**
             * The exercise type for table-tennis.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TABLE_TENNIS: healthStore.SubDataType;
            /**
             * The exercise type for physical training.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PHYSICAL_TRAINING: healthStore.SubDataType;
            /**
             * The exercise type for core training.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CORE_TRAINING: healthStore.SubDataType;
            /**
             * The exercise type for functional training.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FUNCTIONAL_TRAINING: healthStore.SubDataType;
            /**
             * The exercise type for tennis.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TENNIS: healthStore.SubDataType;
            /**
             * The exercise type for tai chi.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TAI_CHI: healthStore.SubDataType;
            /**
             * The exercise type for hula-hoop.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HULA_HOOP: healthStore.SubDataType;
            /**
             * The exercise type for boxing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BOXING: healthStore.SubDataType;
            /**
             * The exercise type for pilates.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PILATES: healthStore.SubDataType;
            /**
             * The exercise type for playground race.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PLAYGROUND_RACE: healthStore.SubDataType;
            /**
             * The exercise type for triathlon.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TRIATHLON: healthStore.SubDataType;
            /**
             * The exercise type for free training.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FREE_TRAINING: healthStore.SubDataType;
            /**
             * The exercise type for stepper.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const STEPPER: healthStore.SubDataType;
            /**
             * The exercise type for cross fit.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CROSS_FIT: healthStore.SubDataType;
            /**
             * The exercise type for taekwondo.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TAEKWONDO: healthStore.SubDataType;
            /**
             * The exercise type for free sparring.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FREE_SPARRING: healthStore.SubDataType;
            /**
             * The exercise type for karate.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const KARATE: healthStore.SubDataType;
            /**
             * The exercise type for fencing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FENCING: healthStore.SubDataType;
            /**
             * The exercise type for belly dance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BELLY_DANCE: healthStore.SubDataType;
            /**
             * The exercise type for jazz dance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const JAZZ_DANCE: healthStore.SubDataType;
            /**
             * The exercise type for latin dance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const LATIN_DANCE: healthStore.SubDataType;
            /**
             * The exercise type for ballet.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BALLET: healthStore.SubDataType;
            /**
             * The exercise type for body combat.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BODY_COMBAT: healthStore.SubDataType;
            /**
             * The exercise type for kendo.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const KENDO: healthStore.SubDataType;
            /**
             * The exercise type for single bar.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SINGLE_BAR: healthStore.SubDataType;
            /**
             * The exercise type for parallel bars.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PARALLEL_BARS: healthStore.SubDataType;
            /**
             * The exercise type for air walker.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const AIR_WALKER: healthStore.SubDataType;
            /**
             * The exercise type for street dance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const STREET_DANCE: healthStore.SubDataType;
            /**
             * The exercise type for roller skating.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ROLLER_SKATING: healthStore.SubDataType;
            /**
             * The exercise type for martial arts.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const MARTIAL_ARTS: healthStore.SubDataType;
            /**
             * The exercise type for plaza dancing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PLAZA_DANCING: healthStore.SubDataType;
            /**
             * The exercise type for dance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DANCE: healthStore.SubDataType;
            /**
             * The exercise type for Frisbee.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FRISBEE: healthStore.SubDataType;
            /**
             * The exercise type for darts.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DARTS: healthStore.SubDataType;
            /**
             * The exercise type for archery.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ARCHERY: healthStore.SubDataType;
            /**
             * The exercise type for horse riding.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HORSE_RIDING: healthStore.SubDataType;
            /**
             * The exercise type for hunting.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HUNTING: healthStore.SubDataType;
            /**
             * The exercise type for kite flying.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const KITE_FLYING: healthStore.SubDataType;
            /**
             * The exercise type for tug of war.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const TUG_OF_WAR: healthStore.SubDataType;
            /**
             * The exercise type for swinging.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SWINGING: healthStore.SubDataType;
            /**
             * The exercise type for stair climbing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const STAIR_CLIMBING: healthStore.SubDataType;
            /**
             * The exercise type for obstacle race.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const OBSTACLE_RACE: healthStore.SubDataType;
            /**
             * The exercise type for fishing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const FISHING: healthStore.SubDataType;
            /**
             * The exercise type for pool.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const POOL: healthStore.SubDataType;
            /**
             * The exercise type for bowling.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BOWLING: healthStore.SubDataType;
            /**
             * The exercise type for volleyball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const VOLLEYBALL: healthStore.SubDataType;
            /**
             * The exercise type for shuttlecock.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SHUTTLECOCK: healthStore.SubDataType;
            /**
             * The exercise type for handball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HANDBALL: healthStore.SubDataType;
            /**
             * The exercise type for baseball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BASEBALL: healthStore.SubDataType;
            /**
             * The exercise type for softball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SOFTBALL: healthStore.SubDataType;
            /**
             * The exercise type for cricket.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CRICKET: healthStore.SubDataType;
            /**
             * The exercise type for rugby.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const RUGBY: healthStore.SubDataType;
            /**
             * The exercise type for soccer.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SOCCER: healthStore.SubDataType;
            /**
             * The exercise type for beach soccer.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BEACH_SOCCER: healthStore.SubDataType;
            /**
             * The exercise type for beach volleyball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BEACH_VOLLEYBALL: healthStore.SubDataType;
            /**
             * The exercise type for gateball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const GATEBALL: healthStore.SubDataType;
            /**
             * The exercise type for hockey.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const HOCKEY: healthStore.SubDataType;
            /**
             * The exercise type for squash.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SQUASH: healthStore.SubDataType;
            /**
             * The exercise type for seoaktakraw.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SEPAKTAKRAW: healthStore.SubDataType;
            /**
             * The exercise type for dodge ball.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DODGE_BALL: healthStore.SubDataType;
            /**
             * The exercise type for sailboat.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SAILBOAT: healthStore.SubDataType;
            /**
             * The exercise type for surfing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SURFING: healthStore.SubDataType;
            /**
             * The exercise type for drifting.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DRIFTING: healthStore.SubDataType;
            /**
             * The exercise type for dragon boat.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DRAGON_BOAT: healthStore.SubDataType;
            /**
             * The exercise type for canoeing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CANOEING: healthStore.SubDataType;
            /**
             * The exercise type for motorboat.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const MOTORBOAT: healthStore.SubDataType;
            /**
             * The exercise type for sup.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SUP: healthStore.SubDataType;
            /**
             * The exercise type for skating.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SKATING: healthStore.SubDataType;
            /**
             * The exercise type for ice hockey.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ICE_HOCKEY: healthStore.SubDataType;
            /**
             * The exercise type for curling.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CURLING: healthStore.SubDataType;
            /**
             * The exercise type for snowmobile.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SNOWMOBILE: healthStore.SubDataType;
            /**
             * The exercise type for skateboard.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SKATEBOARD: healthStore.SubDataType;
            /**
             * The exercise type for rock climbing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ROCK_CLIMBING: healthStore.SubDataType;
            /**
             * The exercise type for bungee jumping.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const BUNGEE_JUMPING: healthStore.SubDataType;
            /**
             * The exercise type for parkour.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PARKOUR: healthStore.SubDataType;
            /**
             * The exercise type for orienteering.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ORIENTEERING: healthStore.SubDataType;
            /**
             * The exercise type for parachute.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PARACHUTE: healthStore.SubDataType;
            /**
             * The exercise type for racing car.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const RACING_CAR: healthStore.SubDataType;
            /**
             * The exercise type for cross-country skiing.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const CROSS_COUNTRY_SKIING: healthStore.SubDataType;
            /**
             * The exercise type for esports.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const ESPORTS: healthStore.SubDataType;
            /**
             * The exercise type for padel.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const PADEL: healthStore.SubDataType;
            /**
             * The exercise type for sense sport.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const SENSE_SPORT: healthStore.SubDataType;
            /**
             * The model for Sports ExerciseSequence.
             *
             * @typedef { healthModels.Sports }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Sports;
            /**
             * The fields for SportsSummary.
             *
             * @typedef { healthFields.SportsSummary }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.SportsSummary;
            /**
             * The fields for SportsDetail.
             *
             * @typedef { healthFields.SportsDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SportsDetail;
        }
    }
    /**
     * Namespace for HealthSequence related functionality.
     *
     * @namespace healthSequenceHelper
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    namespace healthSequenceHelper {
        /**
         * Namespace for sleep record related functionality.
         *
         * @namespace sleepRecord
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace sleepRecord {
            /**
             * The data type for sleep record.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for SleepRecord HealthSequence.
             *
             * @typedef { healthModels.SleepRecord }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.SleepRecord;
            /**
             * The fields for SleepRecord Model.
             *
             * @typedef { healthFields.Sleep }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Sleep;
            /**
             * The fields for SleepDetail.
             *
             * @typedef { healthFields.SleepDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SleepDetail;
        }
        /**
         * Namespace for nap record related functionality.
         *
         * @namespace sleepNapRecord
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        namespace sleepNapRecord {
            /**
             * The data type for nap record.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            const DATA_TYPE: healthStore.DataType;
            /**
             * The model for SleepNapRecord HealthSequence.
             *
             * @typedef { healthModels.SleepNapRecord }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.SleepNapRecord;
            /**
             * The fields for SleepNapRecord Model.
             *
             * @typedef { healthFields.SleepNap }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.SleepNap;
            /**
             * The fields for SleepDetail.
             *
             * @typedef { healthFields.SleepDetail }
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SleepDetail;
        }
    }
}
export default healthStore;
