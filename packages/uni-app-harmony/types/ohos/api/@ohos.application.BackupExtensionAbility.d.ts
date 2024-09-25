/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
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
import type BackupExtensionContext from './@ohos.file.BackupExtensionContext';
/**
 * Describe bundle version
 *
 * @interface BundleVersion
 * @syscap SystemCapability.FileManagement.StorageService.Backup
 * @StageModelOnly
 * @since 10
 */
export interface BundleVersion {
    /**
     * Indicates bundle's version code.
     *
     * @type { number }
     * @syscap SystemCapability.FileManagement.StorageService.Backup
     * @StageModelOnly
     * @since 10
     */
    code: number;
    /**
     * Indicates bundle's version name.
     *
     * @type { string }
     * @syscap SystemCapability.FileManagement.StorageService.Backup
     * @StageModelOnly
     * @since 10
     */
    name: string;
}
/**
 * Class to be override for backup extension ability.
 *
 * @syscap SystemCapability.FileManagement.StorageService.Backup
 * @StageModelOnly
 * @since 10
 */
export default class BackupExtensionAbility {
    /**
     * Indicates backup extension ability context.
     *
     * @type { ExtensionContext }
     * @syscap SystemCapability.FileManagement.StorageService.Backup
     * @StageModelOnly
     * @since 11
     */
    /**
   * Indicates backup extension ability context.
   *
   * @type { BackupExtensionContext }
   * @syscap SystemCapability.FileManagement.StorageService.Backup
   * @StageModelOnly
   * @since 12
   */
    context: BackupExtensionContext;
    /**
     * Callback to be called when the backup procedure is started.
     * Developer could override this method to build files to be backup.
     *
     * @syscap SystemCapability.FileManagement.StorageService.Backup
     * @StageModelOnly
     * @since 10
     */
    onBackup(): void;
    /**
     * Callback to be called when the restore procedure is started.
     * Developer could override this method to restore from copies for various bundle versions.
     *
     * @param { BundleVersion } bundleVersion Bundle version to be restore.
     * @syscap SystemCapability.FileManagement.StorageService.Backup
     * @StageModelOnly
     * @since 10
     */
    onRestore(bundleVersion: BundleVersion): void;
}
