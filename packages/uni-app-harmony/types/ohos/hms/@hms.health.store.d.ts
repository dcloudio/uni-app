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
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataType {
        /**
         * Identity value of data type, should be unique.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly id: number;
        /**
         * Identity value of data type, should be unique.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readonly name?: string;
    }
    /**
     * Represents the application information.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface AppInfo {
        /**
         * Application bundle name, represents a native application in a consumer device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly bundleName?: string;
        /**
         * Application ID, represents an server application which interacts with the Health cloud.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appId?: string;
        /**
         * Application name.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appName?: string;
        /**
         * Application version.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly version?: string;
    }
    /**
     * Predefined device category.
     *
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
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DeviceInfo {
        /**
         * Unique id of the device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly uniqueId: string;
        /**
         * Device udid.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly udid?: string;
        /**
         * Name of the device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly name?: string;
        /**
         * Device category.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly category?: DeviceCategory;
        /**
         * Product id, predefined by Device Profile, check the specification for details.
         */
        readonly productId?: string;
        /**
         * Device model.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly model?: string;
        /**
         * Name of manufacturer.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly manufacturer?: string;
        /**
         * Mac address.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly mac?: string;
        /**
         * Serial number.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly sn?: string;
        /**
         * Hardware version.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly hardwareVersion?: string;
        /**
         * Software version.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly softwareVersion?: string;
        /**
         * Firmware version.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly firmwareVersion?: string;
    }
    /**
     * Represents the data source of health data.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSource {
        /**
         * Identify of this data source.
         * Generated by the platform, you cant't change it.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly dataSourceId: string;
        /**
         * Device information.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly deviceInfo?: DeviceInfo;
        /**
         * Application information.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readonly appInfo?: AppInfo;
    }
    /**
     * Represents the data source of health data.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type DataSourceBase = Omit<DataSource, 'dataSourceId'>;
    /**
     * Represents basic info of health data.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface SampleDataBase {
        /**
         * Data type of the data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        dataType: DataType;
        /**
         * Data source of the data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId: string;
        /**
         * Local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        localDate: string;
        /**
         * Start time of the data, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * End time of the data, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        endTime: number;
        /**
         * Time zone of the data.
         * In the format `GMT+0800`
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        timeZone: string;
        /**
         * Create time or modify time of the data, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        modifiedTime: number;
    }
    /**
     * Define the type for field value.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type HealthValueType = number | string | boolean;
    /**
     * Define the type for sequence field value.
     *
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
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SamplePoint<K extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends SampleDataBase {
        /**
         * Fields of the data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        fields: Pick<K, keyof K>;
    }
    /**
     * Sub data type of a sequence data type.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type SubDataType = DataType;
    /**
     * Pace-related value type
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type PaceValueType = Record<string, number>;
    /**
     * Represents an exercise sequence summary data.
     * ExerciseSummary defines the statistics of a data type over the period during exercise.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSummary {
        /**
         * Fields of the sequence summary data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        [P: string]: HealthValueType | PaceValueType;
    }
    /**
     * SequencePoint defines a model of an instantaneous sample data in exercise,
     * it uses one or more fields to describe the data.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SequencePoint {
        /**
         * Start time of the data, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * Fields of the data.
         *
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
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequence<K extends Record<string, ExerciseSummary> = Record<string, ExerciseSummary>, DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends SampleDataBase {
        /**
         *  The type of exercise
         *
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
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        duration?: number;
        /**
         * Summary data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        summaries: Pick<K, keyof K>;
        /**
         * Detailed data.
         *
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
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequence<K extends Record<string, HealthValueType> = Record<string, HealthValueType>, DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends SampleDataBase {
        /**
         * Summary data of HealthSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        summaries: Pick<K, keyof K>;
        /**
         * Detailed data associated with the health sequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        details?: Pick<DK, keyof DK>;
    }
    /**
     * Order of result sort.
     *
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
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSourceOptions {
        /**
         * A unique data source id to associate a data source.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId?: string;
        /**
         * A unique device id to associate a device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        deviceUniqueId?: string;
        /**
         * App bundle name.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        appBundleName?: string;
        /**
         * App ID.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        appId?: string;
    }
    /**
     * DataRequest sub-users options
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SubUserOption {
    }
    /**
     * Base interface of request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataRequest {
        /**
         * Start local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        startLocalDate: string;
        /**
         * End local date of the data.
         * Use Intl.DateTimeFormat 'en-US', that should be 'MM/DD/YYYY'
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        endLocalDate: string;
        /**
         * Start time of request, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        startTime: number;
        /**
         * End time of request, Unix epoch in millisecond.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        endTime: number;
        /**
         * Related data source of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceOptions?: DataSourceOptions;
    }
    /**
     * Base interface of data read request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface DataReadRequest extends DataRequest {
        /**
         * Represents how many records will be read, omitted for read all the data.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        count?: number;
        /**
         * Represents the offset relative to the current position.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        offset?: number;
        /**
         * Sort order, omitted for ascending order
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        sortOrder?: SortOrder;
    }
    /**
     * Represents SamplePoint read request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SamplePointReadRequest<FK extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related data type(s) of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        samplePointDataType: DataType | DataType[];
        /**
         * Fields to read, omitted for read all the fields.
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        fields?: Partial<Pick<FK, keyof FK>>;
    }
    /**
     * Define read options when read ExerciseSequence and HealthSequence detail data.
     * It's valid to combine any of the options, but withDetails will override withPartialDetails.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface SequenceReadOptions<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> {
        /**
         * Should read details.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        withDetails?: boolean;
        /**
         * Should read partial details.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        withPartialDetails?: (keyof DK)[];
    }
    /**
     * Aggregation policy metrics type
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type AggregateMetricScope = 'max' | 'min' | 'avg' | 'sum' | 'last' | 'count';
    /**
     * aggregation strategies
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    type AggregateMetrics = Partial<Record<AggregateMetricScope, number>>;
    /**
     * Group policies
     *
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
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface GroupOption {
        /**
         * Group policy
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        unitType: GroupUnitType;
        /**
         * How many group unit
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        duration?: number;
    }
    /**
     * Represents Aggregate read request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AggregateRequest<T extends Record<string, AggregateMetrics> = Record<string, AggregateMetrics>, DK extends Record<string, HealthValueType> = Record<string, HealthValueType>> extends Omit<DataReadRequest, 'startTime' | 'endTime'> {
        /**
         * Related data type of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        dataType: DataType;
        /**
         * Aggregate metrics to be read
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        metrics: Partial<Record<keyof T, AggregateMetricScope[]>>;
        /**
         * Group by
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        groupBy: GroupOption;
    }
    /**
     * Aggregating query results
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AggregateResult<T extends Record<string, AggregateMetrics> = Record<string, AggregateMetrics>> extends Omit<SampleDataBase, 'dataSourceId'> {
        /**
         * Fields to read, omitted for read all the fields.
         * just set any value to the the expected read field(s), and the system will return the expected field(s).
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        fields: Pick<T, keyof T>;
    }
    /**
     * Represents ExerciseSequence read request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequenceReadRequest<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Sub data type(s).
         * When the value is null, the Sub data type is unlimited.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        exerciseType: SubDataType | SubDataType[] | null;
        /**
         * Read details options of ExerciseSequence
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readOptions?: SequenceReadOptions<DK>;
    }
    /**
     * Represents HealthSequence read request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequenceReadRequest<DK extends Record<string, SequencePoint[]> = Record<string, SequencePoint[]>> extends Omit<DataReadRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * health sequence data type(s) of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        healthSequenceDataType: DataType | DataType[];
        /**
         * Read details options of HealthSequence
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        readOptions?: SequenceReadOptions<DK>;
    }
    /**
     * Represents unix time based delete request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface UnixTimeBasedDataDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related data type(s) of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataType: DataType | DataType[];
    }
    /**
     * Represents sample point delete request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    type SamplePointDeleteRequest = UnixTimeBasedDataDeleteRequest;
    /**
     * Represents exercise sequence delete request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface ExerciseSequenceDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Sub data type(s).
         * When the value is null, the Sub data type is unlimited.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        exerciseType: SubDataType | SubDataType[] | null;
    }
    /**
     * Represents health sequence delete request.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface HealthSequenceDeleteRequest extends Omit<DataRequest, 'startLocalDate' | 'endLocalDate'> {
        /**
         * Related health sequence data type(s) of this request.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        healthSequenceDataType: DataType | DataType[];
    }
    /**
     * Represents read request of data source.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    interface DataSourceReadRequest {
        /**
         * Identify of a data source.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        dataSourceId?: string;
        /**
         * Application bundle name.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        bundleName?: string;
        /**
         * Unique id of the device.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        deviceUniqueId?: string;
    }
    /**
     * Base interface of Authorization.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationBase {
        /**
         * The data types of read permission required.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        readDataTypes: DataType[];
        /**
         * The data types of write permission required.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        writeDataTypes: DataType[];
    }
    /**
     * Parameter for request authorization.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationRequest extends AuthorizationBase {
    }
    /**
     * Response of authorization.
     *
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    interface AuthorizationResponse extends AuthorizationBase {
    }
    /**
     * Init health store module.
     *
     * @param { common.Context } context - The context of current ability.
     * @returns { Promise<void> } Returns void.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param { DataSourceReadRequest } request - Data source to read.
     * @returns { Promise<DataSource[]> } Result of data source array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param DataSourceBase Data source to insert.
     * @returns { Promise<string> } Returned a data source id.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param dataSource Data source to update.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     * Read sample point data from the health data store.
     *
     * @param { SamplePointReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param { ExerciseSequenceReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param { HealthSequenceReadRequest } request - A request of data read.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param { AggregateRequest } request - A request of data aggregate.
     * @returns { Promise<T[]> } Result of health data array.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
    function aggregateData<T extends AggregateResult>(request: AggregateRequest): Promise<T[]>;
    /**
     * Save sample point data to health data store.
     *
     * @param sampleData Health data to be saved.
     * @returns { Promise<T[]> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param exerciseSequence Health data to be saved.
     * @returns { Promise<void> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param healthSequence Health data to be saved.
     * @returns { Promise<void> } Returned Promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: SamplePointDeleteRequest): Promise<void>;
    /**
     * Delete exercise sequence data based on request.
     *
     * @param request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: ExerciseSequenceDeleteRequest): Promise<void>;
    /**
     * Delete health sequence data based on request.
     *
     * @param request request to delete.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002700001 - System internal error.
     * @throws { BusinessError } 1002700002 - Database processing error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @throws { BusinessError } 1002703001 - User privacy is not agreed.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function deleteData(request: HealthSequenceDeleteRequest): Promise<void>;
    /**
     * Delete the given sample point data.
     *
     * @param samplePoint Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param exerciseSequence Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param healthSequence Data to be deleted.
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
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
     *
     * @param context UIAbilityContext.
     * @param request authorizations request.
     * @returns { Promise<AuthorizationResponse> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function requestAuthorizations(context: common.UIAbilityContext, request: AuthorizationRequest): Promise<AuthorizationResponse>;
    /**
     * Query authorizations.
     *
     * @param request query authorizations request.
     * @returns { Promise<AuthorizationResponse> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @throws { BusinessError } 401 - Parameter error.
     * @throws { BusinessError } 1002701001 - Network error. The network is unavailable.
     * @throws { BusinessError } 1002702001 - Account error. The user has not logged in with HUAWEI ID.
     * @throws { BusinessError } 1002702002 - Account error. Failed to obtain account information with HUAWEI ID.
     * @syscap SystemCapability.Health.HealthStore
     * @since 5.0.0(12)
     */
    function getAuthorizations(request: AuthorizationRequest): Promise<AuthorizationResponse>;
    /**
     * Cancel authorizations.
     *
     * @returns { Promise<void> } Returned promise.
     * @throws { BusinessError } 201 - Permission verification failed.
     * @syscap SystemCapability.Health.HealthStore
     * @atomicservice
     * @since 5.0.0(12)
     */
    function cancelAuthorizations(): Promise<void>;
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
         * Constant definition of the ExerciseSequence exerciseType jumping rope.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        const JUMPING_ROPE: healthStore.SubDataType;
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
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DailyActivities = {
            /**
             * Number of daily activities step, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step: number;
            /**
             * Number of daily activities calorie in calories, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: number;
            /**
             * Number of daily activities distance in meters, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: number;
            /**
             * Duration of daily activities in milliseconds, value must be [0, ∞).
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            isIntensity?: number;
            /**
             * Number of daily activities climb high altitude in meters.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            isStand?: number;
        };
        /**
         * Define the type for daily activities aggregation structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        type DailyActivitiesAggregation = {
            /**
             * Sum of daily activities step.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            step: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities calorie.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            calorie: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities distance.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            distance: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities climb high altitude.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            climbHighAltitude: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities intensity status.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            isIntensity: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
            /**
             * Sum of daily activities stand status.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            isStand: Omit<AggregateMetrics, 'max' | 'min' | 'avg' | 'last' | 'count'>;
        };
        /**
         * Define the type for heart rate SamplePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRate = {
            /**
             * Heart rate in beats per minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bpm: number;
        };
        /**
         * Define the type for blood oxygen saturation SamplePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturation = {
            /**
             * Blood oxygen saturation level, value must be (0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            spo2: number;
        };
        /**
         * Define the type for stress SamplePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Stress = {
            /**
             * Stress score, value must be [1, 99].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            stressScore: number;
        };
        /**
         * Define the type for body temperature SamplePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperature = {
            /**
             * Body temperature in degrees Celsius, value must be [34, 42].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bodyTemperature: number;
        };
        /**
         * Define exerciseSequence summary data structure
         */
        /**
         * Define the type for steps exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type StepSummary = {
            /**
             * Total number of steps for exerciseSequence, value must be (0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalSteps: number;
        };
        /**
         * Define the type for distance exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DistanceSummary = {
            /**
             * Total distance for exerciseSequence in meters, value must be (0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalDistance: number;
        };
        /**
         * Define the type for calorie exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CalorieSummary = {
            /**
             * Total number of calories for exerciseSequence in calories, value must be (0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalCalories: number;
        };
        /**
         * Define the type for quantity exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type QuantitySummary = {
            /**
             * Average quantity for exerciseSequence, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avg: number;
            /**
             * Maximum quantity for exerciseSequence, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            max: number;
            /**
             * Minimum quantity for exerciseSequence, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            min?: number;
        };
        /**
         * Define the type for exercise heart rate summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ExerciseHeartRateSummary = QuantitySummary;
        /**
         * Define the type for speed summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SpeedSummary = QuantitySummary;
        /**
         * Define the type for cadence summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CadenceSummary = QuantitySummary;
        /**
         * Define the type for running form summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningFormSummary = {
            /**
             * Average ground contact time for exerciseSequence in milliseconds, value must be [0, 5000].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundContactTime: number;
            /**
             * Average ground impact acceleration for exerciseSequence in G-forces.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundImpactAcceleration?: number;
            /**
             * Average swing angle for exerciseSequence in degree.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgSwingAngle?: number;
            /**
             * Average eversion excursion for exerciseSequence in degree.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgEversionExcursion?: number;
            /**
             * Average hang time for exerciseSequence in milliseconds.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgHangTime?: number;
            /**
             * Average rate of ground contact time to hang time for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGroundHangTimeRate?: number;
            /**
             * Fore foot strike pattern for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            foreFootStrikePattern?: number;
            /**
             * Hind foot strike pattern for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hindFootStrikePattern?: number;
            /**
             * Whole foot strike pattern for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wholeFootStrikePattern?: number;
            /**
             * Average impact peak for exerciseSequence in BW(multiples of body weight).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgImpactPeak?: number;
            /**
             * Average vertical impact rate for exerciseSequence in BW/S.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalImpactRate?: number;
            /**
             * Average vertical oscillation for exerciseSequence in centimeters.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalOscillation?: number;
            /**
             * Average vertical ratio for exerciseSequence in percentage.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgVerticalRatio?: number;
            /**
             * Average gc time balance for exerciseSequence, percentage of ground contact duration of the left foot
             * as compared to the ground contact duration of both feet (that of the right foot is 100% minus this value).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgGcTimeBalance?: number;
        };
        /**
         * Define the type for altitude summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type AltitudeSummary = {
            /**
             * Maximum altitude for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            max: number;
            /**
             * Minimum altitude for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            min: number;
            /**
             * Average altitude for exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avg?: number;
            /**
             * Total ascent for exerciseSequence, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalAscent?: number;
            /**
             * Total descent for exerciseSequence, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            totalDescent?: number;
        };
        /**
         * Define the type for location summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type LocationSummary = {
            /**
             * Starting latitude for exerciseSequence, value must be [-90, 90].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            startLat?: number;
            /**
             * Ending latitude for exerciseSequence, value must be [-90, 90].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endLat?: number;
            /**
             * Starting longitude for exerciseSequence, value must be [-180, 180].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            startLon?: number;
            /**
             * Ending longitude for exerciseSequence, value must be [-180, 180].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endLon?: number;
            /**
             * Coordinate information for exerciseSequence.
             * The possible values are: 'GCJ02', 'WGS84', 'BD09'
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            coordinate: string;
        };
        /**
         * Define the type for pedaling cadence summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PedalingCadenceSummary = QuantitySummary;
        /**
         * Define the type for power summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type PowerSummary = QuantitySummary;
        /**
         * Define the type for skip speed summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SkipSpeedSummary = QuantitySummary;
        /**
         * Define the type for resistance exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type ResistanceSummary = {
            /**
             * Resistance level one lower limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv1LowerLimit: number;
            /**
             * Resistance level two lower limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv2LowerLimit: number;
            /**
             * Resistance level three lower limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv3LowerLimit: number;
            /**
             * Resistance level four lower limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv4LowerLimit: number;
            /**
             * Resistance level five lower limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5LowerLimit: number;
            /**
             * Resistance level five upper limit, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5UpperLimit: number;
            /**
             * Resistance level one duration in minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv1Duration: number;
            /**
             * Resistance level two duration in minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv2Duration: number;
            /**
             * Resistance level three duration in minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv3Duration: number;
            /**
             * Resistance level four duration in minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv4Duration: number;
            /**
             * Resistance level five duration in minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLv5Duration: number;
            /**
             * Maximum resistance level, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            maxRes?: number;
            /**
             * Minimum resistance level, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            minRes?: number;
        };
        /**
         * Define the type for running exercise feature structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningFeature = {
            /**
             * Average pace for running exercise in second/km, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            avgPace: number;
            /**
             * Best pace for running exercise in second/km, value must be [0, ∞).
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            partTimeMap?: healthStore.PaceValueType;
        };
        /**
         * Define the type for jumping rope exercise feature structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeFeature = {
            /**
             * Number of skips for jumping rope exercise, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipNum: number;
            /**
             * Number of interruptions for jumping rope exercise, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            interruptions?: number;
            /**
             * Longest streak for jumping rope exercise, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            longestStreak?: number;
            /**
             * Number of double unders for jumping rope exercise, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            doubleUnders?: number;
            /**
             * Number of triple unders for jumping rope exercise, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            tripleUnders?: number;
        };
        /**
         * Define the type for walking exercise summary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type WalkingSummary = {
            /**
             * Summary of the distance covered during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Summary of the calories burned during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Summary of the speed during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Summary of the heart rate during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Summary of the steps taken during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * Summary of the cadence during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * Summary of the altitude during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Summary of the location during walking exercise.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
        };
        /**
         * Define the type for running exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningSummary = {
            /**
             * Distance summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Calorie summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Speed summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Exercise heart rate summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Step summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            step?: StepSummary;
            /**
             * Cadence summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: CadenceSummary;
            /**
             * Altitude summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Location summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
            /**
             * Running form summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningForm?: RunningFormSummary;
            /**
             * Running feature summary for running exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningFeature?: RunningFeature;
        };
        /**
         * Define the type for cycling exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CyclingSummary = {
            /**
             * Distance summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            distance: DistanceSummary;
            /**
             * Calorie summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Speed summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: SpeedSummary;
            /**
             * Exercise heart rate summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
            /**
             * Resistance summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: ResistanceSummary;
            /**
             * Pedaling cadence summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadenceSummary;
            /**
             * Power summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: PowerSummary;
            /**
             * Altitude summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: AltitudeSummary;
            /**
             * Location summary for cycling exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: LocationSummary;
        };
        /**
         * Define the type for jumping rope exerciseSummary structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeSummary = {
            /**
             * Jumping rope feature summary for jumping rope exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            jumpingRopeFeature: JumpingRopeFeature;
            /**
             * Calorie summary for jumping rope exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            calorie: CalorieSummary;
            /**
             * Skip speed summary for jumping rope exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed: SkipSpeedSummary;
            /**
             * Exercise heart rate summary for jumping rope exerciseSequence
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRateSummary;
        };
        /**
         * Define the interface for exercise heart rate SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface ExerciseHeartRate extends healthStore.SequencePoint {
            /**
             * Exercise heart rate in beats per minute, value must be (0, 255).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bpm: number;
        }
        /**
         * Define the interface for speed SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Speed extends healthStore.SequencePoint {
            /**
             * Speed measured in m/s, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed: number;
        }
        /**
         * Define the interface for cadence SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Cadence extends healthStore.SequencePoint {
            /**
             * Number of steps per minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence: number;
        }
        /**
         * Define the interface for running form SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface RunningForm extends healthStore.SequencePoint {
            /**
             * Ground contact time in milliseconds, value must be [0, 5000].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundContactTime: number;
            /**
             * Ground impact acceleration measured in G-forces, value must be [0, 50].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundImpactAcceleration?: number;
            /**
             * Swing angle measured in degrees, value must be [0, 360].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            swingAngle?: number;
            /**
             * Eversion excursion measured in degrees, value must be [-100, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            eversionExcursion?: number;
            /**
             * Hang time measured in milliseconds, value must be [0, 500].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hangTime?: number;
            /**
             * The rate of ground contact time to hang time, value must be [0, 500].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            groundHangTimeRate?: number;
            /**
             * Forefoot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            foreFootStrikePattern?: number;
            /**
             * Hindfoot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            hindFootStrikePattern?: number;
            /**
             * Whole foot strike pattern measured as a percentage, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wholeFootStrikePattern?: number;
            /**
             * Impact peak measured in BW(multiples of body weight), value must be [0, 10].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            impactPeak?: number;
            /**
             * Vertical oscillation measured in centimetres, value must be [0,25.6].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            verticalOscillation?: number;
            /**
             * Vertical ratio measured as a percentage, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            verticalRatio?: number;
            /**
             * Ground contact time balance measured as a percentage, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            gcTimeBalance?: number;
        }
        /**
         * Define the interface for altitude SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Altitude extends healthStore.SequencePoint {
            /**
             * Altitude measured in meters.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude: number;
        }
        /**
         * Define the interface for location SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Location extends healthStore.SequencePoint {
            /**
             * Latitude of the location, value must be [-90, 90].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            latitude: number;
            /**
             * Longitude of the location, value must be [-180, 180].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            longitude: number;
        }
        /**
         * Define the interface for pedaling cadence SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface PedalingCadence extends healthStore.SequencePoint {
            /**
             * Number of pedal revolutions per minute, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            rpm: number;
        }
        /**
         * Define the interface for power SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Power extends healthStore.SequencePoint {
            /**
             * Power measured in watts, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power: number;
        }
        /**
         * Define the interface for skip speed SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface SkipSpeed extends healthStore.SequencePoint {
            /**
             * Skip speed measured in revolutions/min, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed: number;
        }
        /**
         * Define the interface for resistance SequencePoint structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        interface Resistance extends healthStore.SequencePoint {
            /**
             * Resistance level, value must be [1, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resLevel: number;
        }
        /**
         * Defines the type for walking exerciseSequence detail structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type WalkingDetail = {
            /**
             * SequencePoint array of exercise heart rate for walking exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for walking exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of cadence for walking exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: Cadence[];
            /**
             * SequencePoint array of altitude for walking exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
            /**
             * SequencePoint array of location for walking exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
        };
        /**
         * Defines the type for running exerciseSequence detail structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type RunningDetail = {
            /**
             * SequencePoint array of exercise heart rate for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of cadence for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            cadence?: Cadence[];
            /**
             * SequencePoint array of running form for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            runningForm?: RunningForm[];
            /**
             * SequencePoint array of location for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of altitude for running exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
        };
        /**
         * Defines the type for cycling exerciseSequence detail structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type CyclingDetail = {
            /**
             * SequencePoint array of exercise heart rate for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of speed for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            speed?: Speed[];
            /**
             * SequencePoint array of altitude for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            altitude?: Altitude[];
            /**
             * SequencePoint array of location for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            location?: Location[];
            /**
             * SequencePoint array of pedaling cadence for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            pedalingCadence?: PedalingCadence[];
            /**
             * SequencePoint array of power for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            power?: Power[];
            /**
             * SequencePoint array of resistance for cycling exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            resistance?: Resistance[];
        };
        /**
         * Defines the type for jumping rope exerciseSequence detail structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRopeDetail = {
            /**
             * SequencePoint array of exercise heart rate for jumping rope exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            exerciseHeartRate?: ExerciseHeartRate[];
            /**
             * SequencePoint array of skip speed for jumping rope exerciseSequence.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            skipSpeed?: SkipSpeed[];
        };
        /**
         * Define the type for sleep record structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Sleep = {
            /**
             * Earliest time of falling asleep in milliseconds since epoch, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            fallAsleepTime: number;
            /**
             * Latest time of waking up in milliseconds since epoch, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeupTime: number;
            /**
             * Sleep duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            duration: number;
            /**
             * Earliest time to go to bed in milliseconds since epoch, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            bedTime?: number;
            /**
             * Latest time to get up in milliseconds since epoch, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            risingTime?: number;
            /**
             * Prepare time for sleep in milliseconds since epoch, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            prepareSleepTime?: number;
            /**
             * Shallow sleep duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            shallowDuration?: number;
            /**
             * Deep sleep duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            deepDuration?: number;
            /**
             * Dream sleep duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            dreamDuration?: number;
            /**
             * Awake duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeDuration?: number;
            /**
             * Number of awakenings, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            wakeCount?: number;
            /**
             * On-bed duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            onBedDuration?: number;
            /**
             * Sleep recording duration in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            recordDuration?: number;
            /**
             * Sleep efficiency, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepEfficiency?: number;
            /**
             * Sleep score, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepScore?: number;
            /**
             * Deep sleep continuity, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            deepSleepContinuity?: number;
            /**
             * Respiratory quality score, value must be [0, 100].
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            respiratoryQualityScore?: number;
            /**
             * Number of rollovers, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            turnOverCount?: number;
            /**
             * Reasons for end of sleep, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepEndReason?: number;
            /**
             * Sleep symptoms.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepType?: number;
        };
        /**
         * Define the interface for nap record structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepNap = {
            /**
             * Duration of nap in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noonDuration: number;
            /**
             * Recording duration of nap in seconds, value must be [0, ∞).
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            noonRecordDuration?: number;
        };
        /**
         * Define the interface for sleep segment data structure.
         *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            sleepStatus: number;
            /**
             * End time of sleep segment in milliseconds since epoch.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            endTime: number;
        }
        /**
         * Define the type for sleep detail data structure.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepDetail = {
            /**
             * Sleep segment array.
             *
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
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type DailyActivities = healthStore.SamplePoint<healthFields.DailyActivities>;
        /**
         * Define the type for heart rate SamplePoint.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type HeartRate = healthStore.SamplePoint<healthFields.HeartRate>;
        /**
         * Define the type for blood oxygen saturation SamplePoint.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BloodOxygenSaturation = healthStore.SamplePoint<healthFields.BloodOxygenSaturation>;
        /**
         * Define the type for stress SamplePoint.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Stress = healthStore.SamplePoint<healthFields.Stress>;
        /**
         * Define the type for body temperature SamplePoint.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type BodyTemperature = healthStore.SamplePoint<healthFields.BodyTemperature>;
        /**
         * Define the type for aggregate result of daily activities.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @atomicservice
         * @since 5.0.0(12)
         */
        type DailyActivitiesAggregateResult = healthStore.AggregateResult<healthFields.DailyActivitiesAggregation>;
        /**
         * Define the type for walking ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Walking = healthStore.ExerciseSequence<healthFields.WalkingSummary, healthFields.WalkingDetail>;
        /**
         * Define the type for indoor walking ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorWalking = Walking;
        /**
         * Define the type for hiking ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Hiking = Walking;
        /**
         * Define the type for running ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Running = healthStore.ExerciseSequence<healthFields.RunningSummary, healthFields.RunningDetail>;
        /**
         * Define the type for indoor running ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorRunning = Running;
        /**
         * Define the type for trail running ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type TrailRunning = Running;
        /**
         * Define the type for cycling ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Cycling = healthStore.ExerciseSequence<healthFields.CyclingSummary, healthFields.CyclingDetail>;
        /**
         * Define the type for indoor cycling ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type IndoorCycling = Cycling;
        /**
         * Define the type for spinning ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type Spinning = Cycling;
        /**
         * Define the type for jumping rope ExerciseSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type JumpingRope = healthStore.ExerciseSequence<healthFields.JumpingRopeSummary, healthFields.JumpingRopeDetail>;
        /**
         * Define the type for sleep record HealthSequence.
         *
         * @syscap SystemCapability.Health.HealthStore
         * @since 5.0.0(12)
         */
        type SleepRecord = healthStore.HealthSequence<healthFields.Sleep, healthFields.SleepDetail>;
        /**
         * Define the type for nap record HealthSequence, and this is another type of sleep record.
         *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.DailyActivities;
            /**
             * The fields for DailyActivities Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.DailyActivities;
            /**
             * The model for DailyActivities AggregateResult.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @atomicservice
             * @since 5.0.0(12)
             */
            type AggregateResult = healthModels.DailyActivitiesAggregateResult;
            /**
             * The fields for DailyActivities AggregateResult Model.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.HeartRate;
            /**
             * The fields for HeartRate Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.HeartRate;
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BloodOxygenSaturation;
            /**
             * The fields for BloodOxygenSaturation Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.BloodOxygenSaturation;
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Stress;
            /**
             * The fields for Stress Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Stress;
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.BodyTemperature;
            /**
             * The fields for BodyTemperature Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.BodyTemperature;
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Walking;
            /**
             * The fields for WalkingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorWalking;
            /**
             * The fields for WalkingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Hiking;
            /**
             * The fields for WalkingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.WalkingSummary;
            /**
             * The fields for WalkingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Running;
            /**
             * The fields for RunningSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorRunning;
            /**
             * The fields for RunningSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.TrailRunning;
            /**
             * The fields for RunningSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.RunningSummary;
            /**
             * The fields for RunningDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Cycling;
            /**
             * The fields for CyclingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.IndoorCycling;
            /**
             * The fields for CyclingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.Spinning;
            /**
             * The fields for CyclingSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.CyclingSummary;
            /**
             * The fields for CyclingDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.JumpingRope;
            /**
             * The fields for JumpingRopeSummary.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type SummaryFields = healthFields.JumpingRopeSummary;
            /**
             * The fields for JumpingRopeDetail.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.JumpingRopeDetail;
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.SleepRecord;
            /**
             * The fields for SleepRecord Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.Sleep;
            /**
             * The fields for SleepDetail.
             *
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
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Model = healthModels.SleepNapRecord;
            /**
             * The fields for SleepNapRecord Model.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type Fields = healthFields.SleepNap;
            /**
             * The fields for SleepDetail.
             *
             * @syscap SystemCapability.Health.HealthStore
             * @since 5.0.0(12)
             */
            type DetailFields = healthFields.SleepDetail;
        }
    }
}
export default healthStore;
