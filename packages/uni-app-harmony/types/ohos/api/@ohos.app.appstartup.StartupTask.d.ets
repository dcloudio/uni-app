/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License"),
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
import AbilityStageContext from './application/AbilityStageContext';
/**
 * @file
 * @kit AbilityKit
 */
/**
 * The base class of startup task.
 *
 * @syscap SystemCapability.Ability.AppStartup
 * @stagemodelonly
 * @since 12
 */
@Sendable
export default class StartupTask {
    /**
     * Called when specific dependent task complete.
     *
     * @param { string } dependency - Indicates name of specific dependent startup task.
     * @param { Object } result - Indicates result of specific dependent startup task.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    onDependencyCompleted?(dependency: string, result: Object): void;
    /**
     * Initializes current startup task.
     * A developer could override this function to init current task and return a result for other tasks.
     *
     * @param { AbilityStageContext } context - Indicates ability stage context.
     * @returns { Promise<Object | void> } The result of initialization.
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    init(context: AbilityStageContext): Promise<Object | void>;
}
