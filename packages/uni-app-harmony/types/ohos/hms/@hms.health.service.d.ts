/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2024. All rights reserved.
 */
/**
 * @file Defines the capabilities of HealthServiceKit.
 * @kit HealthServiceKit
 * @bundle com.huawei.hmos.health.kit/HealthService/ets/Index 5.0.0(12)
 */
/**
 * This module provides api to comunicates with the health service.
 *
 * @namespace healthService
 * @syscap SystemCapability.Health.HealthService
 * @atomicservice
 * @since 5.0.0(12)
 */
declare namespace healthService {
    /**
     * Namespace for daily activity data and api.
     *
     * @namespace workout
     * @syscap SystemCapability.Health.HealthService
     * @atomicservice
     * @since 5.0.0(12)
     */
    namespace workout {
        /**
         * Reads today's total activity sport.
         *
         * @returns { Promise<ActivityReport> } Result of today's total sport record and goals.
         * @throws { BusinessError } 201 - Permission verification failed.
         * @throws { BusinessError } 401 - Parameter error.
         * @throws { BusinessError } 14500101 - Service exception.
         * @syscap SystemCapability.Health.HealthService
         * @atomicservice
         * @since 5.0.0(12)
         */
        function readActivityReport(): Promise<ActivityReport>;
        /**
         * Provides the data of today's total sport record and goals.
         *
         * @typedef ActivityReport
         * @syscap SystemCapability.Health.HealthService
         * @atomicservice
         * @since 5.0.0(12)
         */
        interface ActivityReport {
            /**
             * Indicates the value of today's total steps.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            steps: number;
            /**
             * Indicates the value of today's total step goals.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            stepsGoal?: number;
            /**
             * Indicates the value of today's total active calories.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeCalories: number;
            /**
             * Indicates the value of today's total active calories goals.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeCaloriesGoal?: number;
            /**
             * Indicates the value of today's total exercise duration.
             * Intensity is the cumulative amount of moderate to high-intensity exercise in a day.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            exercise: number;
            /**
             * Indicates the value of today's total exercise duration goals.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            exerciseGoal?: number;
            /**
             * Indicates the value of today's total active hours.
             * Active hours are the number of hours when standing up for at least 1 minute.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeHours: number;
            /**
             * Indicates the value of today's total active hours goals.
             * Active hours are the number of hours when standing up for at least 1 minute.
             *
             * @syscap SystemCapability.Health.HealthService
             * @atomicservice
             * @since 5.0.0(12)
             */
            activeHoursGoal?: number;
        }
    }
}
export default healthService;
