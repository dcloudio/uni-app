/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
* @file ModuleInstall Manager Interface Description file
* @kit StoreKit
*/
import type common from '@ohos.app.ability.common';
import type { Callback } from '@ohos.base';
import type bundleManager from '@ohos.bundle.bundleManager';
/**
 * The functions of module install manager.
 *
 * @namespace moduleInstallManager
 * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
 * @StageModelOnly
 * @since 4.1.0(11)
 *
 */
declare namespace moduleInstallManager {
    /**
     * IThe enumerated value indicates the installation status.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum InstallStatus {
        /**
         * Indicates module has been installed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INSTALLED = 0,
        /**
         * Indicates module is not installed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        NOT_INSTALLED = 1
    }
    /**
     * The enumerated value indicates the download result status code.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum RequestErrorCode {
        /**
         * Indicates that all modules to be downloaded are installed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        MODULE_ALREADY_EXISTS = -8,
        /**
         * The module to be downloaded does not exist or does not adapt to the device.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        MODULE_UNAVAILABLE = -7,
        /**
         * Indicates that the request is invalid and contains incomplete information.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INVALID_REQUEST = -6,
        /**
         * Indicates that the request failed due to a network connection error.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        NETWORK_ERROR = -5,
        /**
         * Indicates that the caller information is abnormal.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INVOKER_VERIFICATION_FAILED = -4,
        /**
         * Indicates that only foreground requests for on-demand loading are allowed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        FOREGROUND_REQUIRED = -3,
        /**
         * Indicates that the request was rejected because at least one request is currently downloading.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        ACTIVE_SESSION_LIMIT_EXCEEDED = -2,
        /**
         * Indicates request is failed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        FAILURE = -1,
        /**
         * Indicates request is successful.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        SUCCESS = 0,
        /**
         * The user needs to confirm the request. A pop-up window is required to remind the developer of the traffic reminder.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_WAIT_WIFI = 1
    }
    /**
     * The enumerated value indicates the download task status code.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum TaskStatus {
        /**
         * Create download task fail.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        CREATE_TASK_FAILED = -4,
        /**
         * A higher version application exists locally.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        HIGHER_VERSION_INSTALLED = -3,
        /**
         * Download task already exists.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        TASK_ALREADY_EXISTS = -2,
        /**
         * There is no download tasks.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        TASK_UNFOUND = -1,
        /**
         * Download task is created now.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        TASK_CREATED = 0,
        /**
         * The application is downloading.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOADING = 1,
        /**
         * The download task is paused.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_PAUSING = 2,
        /**
         * The download task is waiting to start.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_WAITING = 3,
        /**
         * Download task is finished successfully.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_SUCCESSFUL = 4,
        /**
         * Download task is failed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_FAILED = 5,
        /**
         * Waiting Wi-Fi to start download task.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        DOWNLOAD_WAIT_WIFI = 6,
        /**
         * Waiting to start install task.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INSTALL_WAITING = 20,
        /**
         * The application is installing.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INSTALLING = 21,
        /**
         * Install task is finished successfully.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INSTALL_SUCCESSFUL = 22,
        /**
         * Install task is failed.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        INSTALL_FAILED = 23
    }
    /**
     * Interface return value.
     *
     * @enum { number }
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export enum ReturnCode {
        /**
         * Indicates that operation is success.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        SUCCESS = 0,
        /**
         * Indicates that operation is fail.
         *
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        FAILURE = 1
    }
    /**
     * Module installation information.
     *
     * @typedef InstalledModule
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface InstalledModule {
        /**
         * Indicates name of this module.
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly moduleName: string;
        /**
         * Indicates type of this module.
         *
         * @type { ?bundleManager.ModuleType }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly moduleType?: bundleManager.ModuleType;
        /**
         * Whether the module is installed.
         *
         * @type { InstallStatus }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly installStatus: InstallStatus;
    }
    /**
     * Session status of the on-demand loading module
     *
     * @typedef ModuleInstallSessionState
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export interface ModuleInstallSessionState {
        /**
         * Request result returned to the invoker.
         *
         * @type { RequestErrorCode }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly code: RequestErrorCode;
        /**
         * Current status of a download task.
         *
         * @type { TaskStatus }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly taskStatus: TaskStatus;
        /**
         * Download task ID (timestamp when the task is created). The default value is 0.
         *
         * @type { ?string }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly taskId?: string;
        /**
         * Result description returned to the invoker. The default value is "".
         *
         * @type { string }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly desc: string;
        /**
         * List of modules to be downloaded. The default value is [].
         *
         * @type { ?string[] }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly modules?: string[];
        /**
         * Total size of modules to be downloaded. The default value is 0.
         *
         * @type { ?number }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly totalSize?: number;
        /**
         * Installed size of the module to be downloaded. The default value is 0.
         *
         * @type { ?number }
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        readonly downloadedSize?: number;
    }
    /**
     * Obtain the installation status of the module.
     *
     * @param { string } moduleName - Indicates name of this module.
     * @return { InstalledModule } Returns the installation status of the module.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500001 - Failed to invoke the BMS.
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function getInstalledModule(moduleName: string): InstalledModule;
    /**
     * Register the on-demand load completion listener.
     * When the collaboration processes loads the module, the callback function is used to notify the caller.
     *
     * @param { 'moduleInstallStatus' } type - Type of the event to listen for. Only the moduleInstallStatus event is support.
     * @param { Callback<ModuleInstallSessionState> } callback - Callback is invoked when the event is triggered.
     * @param { number } timeout - Monitoring duration.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500002 - The interface is called repeatedly with the same input.
     * @throws { BusinessError } 1006500004 - SA connection failed.
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function on(type: 'moduleInstallStatus', callback: Callback<ModuleInstallSessionState>, timeout: number): void;
    /**
     * Unregisters service change events.
     *
     * @param { 'moduleInstallStatus' } type - Type of the event to listen for. Only the moduleInstallStatus event is support.
     * @param { Callback<ModuleInstallSessionState> } callback - Callback is invoked when the event is triggered.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500004 - SA connection failed.
     * @throws { BusinessError } 1006500006 - The interface is not used together with "on".
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function off(type: 'moduleInstallStatus', callback?: Callback<ModuleInstallSessionState>): void;
    /**
     * Canceling an on-demand loading task
     *
     * @param { string } taskId - ID of a download task
     * @return { ReturnCode } Operation result. 0: succeeded; 1: failed.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500007 - The specified service extension connect failed.
     * @throws { BusinessError } 1006500008 - Write param into container failed.
     * @throws { BusinessError } 1006500009 - Request to service error.
     * @throws { BusinessError } 1006500010 - Response from service cannot be recognized.
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function cancelTask(taskId: string): ReturnCode;
    /**
     * To verify that the invoker continues the download using mobile traffic on the foreground.
     *
     * @param { common.UIAbilityContext | common.ExtensionContext } context - the context of an ability or extensionContext
     * @param { string } taskId - ID of a download task
     * @return { ReturnCode } Operation result. 0: succeeded; 1: failed.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500007 - The specified service extension connect failed.
     * @throws { BusinessError } 1006500008 - Write param into container failed.
     * @throws { BusinessError } 1006500009 - Request to service error.
     * @throws { BusinessError } 1006500010 - Response from service cannot be recognized.
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function showCellularDataConfirmation(context: common.UIAbilityContext | common.ExtensionContext, taskId: string): ReturnCode;
    /**
     * The class of an Install request.
     *
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    class InstallRequest {
    }
    /**
     * The class of an Install controller.
     *
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    class InstallProvider {
    }
    /**
     * Defines the request for an app to load uninstalled modules as required.
     *
     * @extends InstallRequest
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export class ModuleInstallRequest extends InstallRequest {
        /**
         * Adding module to Be Installed.
         *
         * @param { string } moduleName - Name of the module to be loaded.
         * @return { ReturnCode } Operation result. 0: succeeded; 1: failed.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        addModule(moduleName: string): ReturnCode;
    }
    /**
     * Provides methods for implementing on-demand service loading for modules.
     *
     * @extends InstallProvider
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    export class ModuleInstallProvider extends InstallProvider {
        /**
         * Creating an On-Demand Loading Request.
         *
         * @param { common.UIAbilityContext | common.ExtensionContext } context - the context of an ability or extensionContext
         * @return { ModuleInstallRequest } - Returns the <b>ModuleInstallRequest</b> object.
         * @throws { BusinessError } 401 - The parameter check failed.
         * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
         * @StageModelOnly
         * @since 4.1.0(11)
         */
        createModuleInstallRequest(context: common.UIAbilityContext | common.ExtensionContext): ModuleInstallRequest;
    }
    /**
     * Load module packages as required based on ModuleInstallRequest.
     *
     * @param { ModuleInstallRequest } moduleInstallRequest - Indicates the module install request.
     * @return { Promise<ModuleInstallSessionState> } The promise returned by the function.
     * @throws { BusinessError } 401 - The parameter check failed.
     * @throws { BusinessError } 1006500004 - SA connection failed.
     * @throws { BusinessError } 1006500008 - Write param into container failed.
     * @throws { BusinessError } 1006500009 - Request to service error.
     * @throws { BusinessError } 1006500010 - Response from service cannot be recognized.
     * @syscap SystemCapability.AppGalleryService.Distribution.OnDemandInstall
     * @StageModelOnly
     * @since 4.1.0(11)
     */
    function fetchModules(moduleInstallRequest: ModuleInstallRequest): Promise<ModuleInstallSessionState>;
}
export default moduleInstallManager;
