/*
 * Copyright (C) 2022-2023 Huawei Device Co., Ltd.
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
 * @kit CoreFileKit
 */
import type { AsyncCallback } from './@ohos.base';
/**
 * Provides securityLabel APIs
 *
 * @namespace securityLabel
 * @syscap SystemCapability.FileManagement.File.FileIO
 * @since 9
 */
declare namespace securityLabel {
    /**
     * The security level.
     *
     * @typedef { 's0' | 's1' | 's2' | 's3' | 's4' }
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    type DataLevel = 's0' | 's1' | 's2' | 's3' | 's4';
    /**
     * Set the SecurityLabel.
     *
     * @param { string } path - path
     * @param { DataLevel } type - type
     * @returns { Promise<void> } return Promise
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function setSecurityLabel(path: string, type: DataLevel): Promise<void>;
    /**
     * Set the SecurityLabel.
     *
     * @param { string } path - path
     * @param { DataLevel } type - type
     * @param { AsyncCallback<void> } [callback] - callback
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function setSecurityLabel(path: string, type: DataLevel, callback: AsyncCallback<void>): void;
    /**
     * Set the SecurityLabel with sync interface.
     *
     * @param { string } path - path
     * @param { DataLevel } type - type
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function setSecurityLabelSync(path: string, type: DataLevel): void;
    /**
     * Get the SecurityLabel.
     *
     * @param { string } path - path
     * @returns { Promise<string> } return Promise
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getSecurityLabel(path: string): Promise<string>;
    /**
     * Get the SecurityLabel.
     *
     * @param { string } path - path
     * @param { AsyncCallback<string> } [callback] - callback
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getSecurityLabel(path: string, callback: AsyncCallback<string>): void;
    /**
     * Get the SecurityLabel with sync interface.
     *
     * @param { string } path - path
     * @returns { string } security label name
     * @throws { BusinessError } 13900001 - Operation not permitted
     * @throws { BusinessError } 13900007 - Arg list too long
     * @throws { BusinessError } 13900015 - File exists
     * @throws { BusinessError } 13900020 - Invalid argument
     * @throws { BusinessError } 13900025 - No space left on device
     * @throws { BusinessError } 13900037 - No data available
     * @throws { BusinessError } 13900041 - Quota exceeded
     * @throws { BusinessError } 13900042 - Unknown error
     * @syscap SystemCapability.FileManagement.File.FileIO
     * @since 9
     */
    function getSecurityLabelSync(path: string): string;
}
export default securityLabel;
