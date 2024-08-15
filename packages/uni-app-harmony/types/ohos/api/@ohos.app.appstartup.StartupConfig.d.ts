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
/**
 * @file
 * @kit AbilityKit
 */
import StartupListener from './@ohos.app.appstartup.StartupListener';
/**
 * The interface of configuration for running startup tasks.
 *
 * @interface StartupConfig
 * @syscap SystemCapability.Ability.AppStartup
 * @stagemodelonly
 * @since 12
 */
export default interface StartupConfig {
    /**
     * Indicates timeout for executing all startup tasks. Default value is 10000 milliseconds.
     *
     * @type { ?number }
     * @default 10000
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    timeoutMs?: number;
    /**
     * Indicates a listener for startup, which will be called when all tasks complete.
     *
     * @type { ?StartupListener }
     * @syscap SystemCapability.Ability.AppStartup
     * @stagemodelonly
     * @since 12
     */
    startupListener?: StartupListener;
}
