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
 * @kit AbilityKit
 */
import Want from '../../@ohos.app.ability.Want';
import { ResultSet } from '../../data/rdb/resultSet';
import { AbilityInfo } from '../../bundle/abilityInfo';
import { DataAbilityResult } from '../../ability/dataAbilityResult';
import { DataAbilityOperation } from '../../ability/dataAbilityOperation';
import dataAbility from '../../@ohos.data.dataAbility';
import formBindingData from '../../@ohos.application.formBindingData';
import formInfo from '../../@ohos.app.form.formInfo';
import rdb from '../../@ohos.data.rdb';
import rpc from '../../@ohos.rpc';
import { PacMap } from '../../ability/dataAbilityHelper';
import { AsyncCallback } from '../../@ohos.base';
/**
 * interface of form lifecycle.
 *
 * @interface LifecycleForm
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
export declare interface LifecycleForm {
    /**
     * Called to return a {@link formBindingData.FormBindingData} object.
     *
     * @param { Want } want - Indicates the detailed information for creating a {@link formBindingData#FormBindingData}.
     *                        The {@code Want} object must include the form ID, form name, and grid style of the form,
     *                        which can be obtained from {@link formInfo#FormParam#IDENTITY_KEY},
     *                        {@link formInfo#FormParam#NAME_KEY}, and {@link formInfo#FormParam#DIMENSION_KEY},
     *              	        respectively. Such form information must be managed as persistent data for further form
     *               	        acquisition, update, and deletion.
     * @returns { formBindingData.FormBindingData } Returns the created {@link formBindingData#FormBindingData} object.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onCreate?(want: Want): formBindingData.FormBindingData;
    /**
     * Called when the form provider is notified that a temporary form is successfully converted to a normal form.
     *
     * @param { string } formId - Indicates the ID of the form.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onCastToNormal?(formId: string): void;
    /**
     * Called to notify the form provider to update a specified form.
     *
     * @param { string } formId - Indicates the ID of the form to update.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onUpdate?(formId: string): void;
    /**
     * Called when the form provider receives form events from the system.
     *
     * @param { object } newStatus - Indicates the form events occurred. The key in the {@code Map} object indicates
     *                               form ID,and the value indicates the event type, which can be either
     *                               {@link formInfo#VisibilityType#FORM_VISIBLE} or
     *                               {@link formInfo#VisibilityType#FORM_INVISIBLE}.
     *                               {@link formInfo#VisibilityType#FORM_VISIBLE}
     *                               means that the form becomes visible, and
     *                               {@link formInfo#VisibilityType#FORM_INVISIBLE}
     *                               means that the form becomes invisible.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    /**
     * Called when the form provider receives form events from the system.
     *
     * @param { Record<string, number> } newStatus - Indicates the form events occurred. The key in the {@code Map}
     *                                               object indicates form ID,and the value indicates the event type,
     *                                               which can be either
     *                                               {@link formInfo#VisibilityType#FORM_VISIBLE} or
     *                                               {@link formInfo#VisibilityType#FORM_INVISIBLE}.
     *                                               {@link formInfo#VisibilityType#FORM_VISIBLE}
     *                                               means that the form becomes visible, and
     *                                               {@link formInfo#VisibilityType#FORM_INVISIBLE}
     *                                               means that the form becomes invisible.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 11
     */
    onVisibilityChange?(newStatus: Record<string, number>): void;
    /**
     * Called when a specified message event defined by the form provider is triggered. This method is valid only for
     * JS forms.
     *
     * @param { string } formId - Indicates the ID of the form on which the message event is triggered, which is
     *                            provided by the client to the form provider.
     * @param { string } message - Indicates the value of the {@code params} field of the message event. This parameter
     *                            is used to identify the specific component on which the event is triggered.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onEvent?(formId: string, message: string): void;
    /**
     * Called to notify the form provider that a specified form has been deleted. Override this method if
     * you want your application, as the form provider, to be notified of form deletion.
     *
     * @param { string } formId - Indicates the ID of the deleted form.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onDestroy?(formId: string): void;
    /**
     * Called to return a {@link FormState} object.
     * <p>You must override this callback if you want this ability to return the actual form state. Otherwise,
     * this method returns {@link FormState#DEFAULT} by default.</p>
     *
     * @param { Want } want - Indicates the description of the form for which the {@link formInfo#FormState} is obtained.
     *                        The description covers the bundle name, ability name, module name, form name, form
     *                        dimensions.
     * @returns { formInfo.FormState } Returns the {@link formInfo#FormState} object.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 8
     */
    onAcquireFormState?(want: Want): formInfo.FormState;
}
/**
 * interface of app lifecycle.
 *
 * @interface LifecycleApp
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
export declare interface LifecycleApp {
    /**
     * Called back when the state of an ability changes from <b>BACKGROUND</b> to <b>INACTIVE</b>.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onShow?(): void;
    /**
     * Called back when an ability enters the <b>BACKGROUND</b> state.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onHide?(): void;
    /**
     * Called back before an ability is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onDestroy?(): void;
    /**
     * Called back when an ability is started for initialization.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onCreate?(): void;
    /**
     * Asks a user whether to start the migration.
     *
     * @returns { boolean } Returns {@code true} if the user allows the migration; returns {@code false} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onStartContinuation?(): boolean;
    /**
     * Saves the user data of a local ability generated during runtime.
     * After the migration is triggered and the local ability is ready, this method is called when the Distributed
     * Scheduler Service requests data from the local ability.
     *
     * @param { Object } data - Indicates the user data to save.
     * @returns { boolean } Returns {@code true} if the data is successfully saved; returns {@code false} otherwise.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onSaveData?(data: Object): boolean;
    /**
     * Called back when a local ability migration is complete.
     * <p>You can define the processing logic after the migration is complete. For example, you can display a prompt to
     * notify the user of the successful migration and then exit the local ability.</p>
     *
     * @param { number } result - Indicates the migration result code. The value {@code 0} indicates that the migration is
     *                            successful, and {@code -1} indicates that the migration fails.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onCompleteContinuation?(result: number): void;
    /**
     * Restores the user data saved during the migration for an ability on the remote device immediately after the
     * ability is created on the remote device. Lifecycle scheduling for the ability starts only after the user data
     * is restored.
     *
     * @param { Object } data - Indicates the user data to restore.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onRestoreData?(data: Object): void;
    /**
     * Called to notify the local device when a running ability on the remote device is destroyed after a reversible
     * migration is performed for the ability from the local device to the remote device.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onRemoteTerminated?(): void;
    /**
     * This method is called when the system determines that the ability may be destroyed in an unexpected
     * situation, for example, when the screen orientation changes or the user touches the Home key. Generally,
     * this method is used only to save temporary states.
     *
     * @param { PacMap } outState - Indicates the {@code PacMap} object used for storing user data and states. This
     *                              parameter cannot be null.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onSaveAbilityState?(outState: PacMap): void;
    /**
     * This method is called if an ability was destroyed at a certain time due to resource reclaim or was
     * unexpectedly destroyed and the {@link #onSaveAbilityState(PacMap)} method was called to save its user data and
     * states. Generally, this method is called after the {@link #onStart(Want)} method.
     *
     * @param { PacMap } inState - Indicates the {@code PacMap} object used for storing data and states. This
     *                             parameter can not be null.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onRestoreAbilityState?(inState: PacMap): void;
    /**
     * Called back when an ability enters the <b>INACTIVE</b> state (an ability in this state is not interactive and may
     * change to the <b>BACKGROUND</b> or <b>ACTIVE</b> state).
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onInactive?(): void;
    /**
     * Called back when an ability enters the <b>ACTIVE</b> state.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onActive?(): void;
    /**
     * Called when the launch mode of an ability is set to singleton.
     *
     * @param { Want } want - Indicates the new {@code want} containing information about the ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onNewWant?(want: Want): void;
    /**
     * Called when the system has determined to trim the memory, for example, when the ability is running in the
     * background and there is no enough memory for running as many background processes as possible.
     *
     * @param { number } level - Indicates the memory trim level, which shows the current memory usage status.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onMemoryLevel?(level: number): void;
}
/**
 * interface of service lifecycle.
 *
 * @interface LifecycleService
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
export declare interface LifecycleService {
    /**
     * Called back when an ability is started for initialization (it can be called only once in the entire lifecycle of
     * an ability).
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onStart?(): void;
    /**
     * Called back when Service is started.
     *
     * @param { Want } want - Indicates the want of Service to start.
     * @param { number } startId - Indicates the number of times the Service ability has been started. {@code startId} is
     *                             incremented by 1 every time the ability is started. For example, if the ability
     *                             has been started for six times.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onCommand?(want: Want, startId: number): void;
    /**
     * Called back before an ability is destroyed.
     *
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onStop?(): void;
    /**
     * Called back when a Service ability is first connected to an ability.
     *
     * @param { Want } want - Indicates connection information about the Service ability.
     * @returns { rpc.RemoteObject } Returns the proxy of the Service ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onConnect?(want: Want): rpc.RemoteObject;
    /**
     * Called back when all abilities connected to a Service ability are disconnected.
     *
     * @param { Want } want - Indicates disconnection information about the Service ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onDisconnect?(want: Want): void;
    /**
     * Called when a new client attempts to connect to a Service ability after all previous client connections to it
     * are disconnected.
     * <p>The Service ability must have been started but not been destroyed, that is, {@link #startAbility} has been
     * called but {@link #terminateSelf} has not.</p>
     *
     * @param { Want } want - Indicates the want of the Service ability being connected.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onReconnect?(want: Want): void;
}
/**
 * interface of data lifecycle.
 *
 * @interface LifecycleData
 * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
 * @FAModelOnly
 * @since 7
 */
export declare interface LifecycleData {
    /**
     * Updates one or more data records in the database. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the database table storing the data to update.
     * @param { rdb.ValuesBucket } valueBucket - Indicates the data to update. This parameter can be null.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. If this parameter is null,
     *                                                           all data records will be updated by default.
     * @param { AsyncCallback<number> } callback - function specified by framework to receive the result, developer should
     *                                             call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    update?(uri: string, valueBucket: rdb.ValuesBucket, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<number>): void;
    /**
     * Queries one or more data records in the database. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the database table storing the data to query.
     * @param { Array<string> } columns - Indicates the columns to be queried, in array, for example, {"name","age"}.
     *                                    You should define the processing logic when this parameter is null.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. If this parameter is null,
     *                                                           all data records will be queried by default.
     * @param { AsyncCallback<ResultSet> } callback - function specified by framework to receive the result, developer
     *                                                should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    query?(uri: string, columns: Array<string>, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<ResultSet>): void;
    /**
     * Deletes one or more data records. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the database table storing the data to delete.
     * @param { dataAbility.DataAbilityPredicates } predicates - Indicates filter criteria. If this parameter is null,
     *                                                           all data records will be deleted by default.
     * @param { AsyncCallback<number> } callback - function specified by framework to receive the result, developer should
     *                                             call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    delete?(uri: string, predicates: dataAbility.DataAbilityPredicates, callback: AsyncCallback<number>): void;
    /**
     * Converts the given {@code uri} that refer to the Data ability into a normalized URI. A normalized URI can be
     * used across devices, persisted, backed up, and restored. It can refer to the same item in the Data ability
     * even if the context has changed.
     *
     * @param { string } uri - Indicates the uri to normalize.
     * @param { AsyncCallback<string> } callback - function specified by framework to receive the result, developer
     *                                             should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    normalizeUri?(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Inserts multiple data records into the database. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the position where the data is to insert.
     * @param { Array<rdb.ValuesBucket> } valueBuckets - Indicates the data to insert.
     * @param { AsyncCallback<number> } callback - function specified by framework to receive the result, developer should
     *                                             call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    batchInsert?(uri: string, valueBuckets: Array<rdb.ValuesBucket>, callback: AsyncCallback<number>): void;
    /**
     * Converts the given normalized {@code uri} generated by {@link #normalizeUri(uri)} into a denormalized one.
     * The default implementation of this method returns the original uri passed to it.
     *
     * @param { string } uri - Indicates the uri to denormalize.
     * @param { AsyncCallback<string> } callback - function specified by framework to receive the result, developer
     *                                             should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    denormalizeUri?(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Inserts a data record into the database. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the position where the data is to insert.
     * @param { rdb.ValuesBucket } valueBucket - Indicates the data to insert.
     * @param { AsyncCallback<number> } callback - function specified by framework to receive the result, developer
     *                                             should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    insert?(uri: string, valueBucket: rdb.ValuesBucket, callback: AsyncCallback<number>): void;
    /**
     * Opens a file. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the path of the file to open.
     * @param { string } mode - Indicates the open mode, which can be "r" for read-only access, "w" for write-only access
     *                          (erasing whatever data is currently in the file), "wt" for write access that truncates any
     *                          existing file,"wa" for write-only access to append to any existing data, "rw" for read and
     *                          write access on any existing data, or "rwt" for read and write access that truncates any
     *                          existing file.
     * @param { AsyncCallback<number> } callback - function specified by framework to receive the result, developer should
     *                                             call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    openFile?(uri: string, mode: string, callback: AsyncCallback<number>): void;
    /**
     * Obtains the MIME type of files. This method should be implemented by a Data ability.
     *
     * @param { string } uri - Indicates the path of the files to obtain.
     * @param { string } mimeTypeFilter - Indicates the MIME type of the files to obtain. This parameter cannot be set to
     *                                    {@code null}.
     *                                    <p>1. "&ast;/*": Obtains all types supported by a Data ability.
     *                                    <p>2. "image/*": Obtains files whose main type is image of any subtype.
     *                                    <p>3. "&ast;/jpg": Obtains files whose subtype is JPG of any main type.
     * @param { AsyncCallback<Array<string>> } callback - function specified by framework to receive the result, developer
     *                                                    should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getFileTypes?(uri: string, mimeTypeFilter: string, callback: AsyncCallback<Array<string>>): void;
    /**
     * Called to carry {@code AbilityInfo} to this ability after the ability is initialized.
     *
     * @param { AbilityInfo } info - Indicates the {@code AbilityInfo} object containing information about this ability.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    onInitialized?(info: AbilityInfo): void;
    /**
     * Obtains the MIME type matching the data specified by the URI of the Data ability. This method should be
     * implemented by a Data ability.
     * <p>Data abilities supports general data types, including text, HTML, and JPEG.</p>
     *
     * @param { string } uri - Indicates the uri of the data.
     * @param { AsyncCallback<string> } callback - function specified by framework to receive the result, developer should
     *                                             call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    getType?(uri: string, callback: AsyncCallback<string>): void;
    /**
     * Performs batch operations on the database. This method should be implemented by a Data ability.
     *
     * @param { Array<DataAbilityOperation> } ops - Indicates the data operation list, which can contain multiple operations
     *                                              on the database.
     * @param { AsyncCallback<Array<DataAbilityResult>> } callback - specified by framework to receive the result,
     *                                                               developer should call this function to return
     *                                                               the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    executeBatch?(ops: Array<DataAbilityOperation>, callback: AsyncCallback<Array<DataAbilityResult>>): void;
    /**
     * Defines a method in this Data ability (implementation depending on child classes).
     *
     * @param { string } method - Indicates the method name.
     * @param { string } arg - Indicates the parameter transferred by the method.
     * @param { PacMap } extras - Indicates the parameter transferred by the method.
     * @param { AsyncCallback<PacMap> } callback - function specified by framework to receive the result, developer
     *                                             should call this function to return the result to framework.
     * @syscap SystemCapability.Ability.AbilityRuntime.FAModel
     * @FAModelOnly
     * @since 7
     */
    call?(method: string, arg: string, extras: PacMap, callback: AsyncCallback<PacMap>): void;
}
