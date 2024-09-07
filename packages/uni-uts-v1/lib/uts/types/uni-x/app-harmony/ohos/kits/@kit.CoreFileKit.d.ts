/*
 * Copyright (c) 2022-2023 Huawei Device Co., Ltd.
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
import BackupExtensionAbility, { BundleVersion } from '@ohos.application.BackupExtensionAbility';
import BackupExtensionContext from '@ohos.file.BackupExtensionContext';
import cloudSync from '@ohos.file.cloudSync';
import cloudSyncManager from '@ohos.file.cloudSyncManager';
import Environment from '@ohos.file.environment';
import fileAccess from '@ohos.file.fileAccess';
import fileUri from '@ohos.file.fileuri';
import fileIo, { ConflictFiles, Filter, Options, ReaderIteratorResult, WatchEvent, WatchEventListener, Watcher, ReadOptions, ReadTextOptions, WriteOptions, ListFileOptions, DfsListeners, TaskSignal } from '@ohos.file.fs';
import hash from '@ohos.file.hash';
import picker from '@ohos.file.picker';
import securityLabel from '@ohos.file.securityLabel';
import statfs from '@ohos.file.statvfs';
import storageStatistics from '@ohos.file.storageStatistics';
import fileShare from '@ohos.fileshare';
export { BackupExtensionAbility, BackupExtensionContext, BundleVersion, ConflictFiles, Environment, Filter, Options, ReaderIteratorResult, WatchEvent, WatchEventListener, Watcher, ReadOptions, ReadTextOptions, WriteOptions, ListFileOptions, cloudSync, cloudSyncManager, fileAccess, fileIo, fileShare, fileUri, hash, picker, securityLabel, statfs, storageStatistics, DfsListeners, TaskSignal };
