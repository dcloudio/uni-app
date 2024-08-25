/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2023-2023. All rights reserved.
 */
/**
 * @file Defines a UI component used to show the FunctionalButton.
 * @kit ScenarioFusionKit
 */
import type { AsyncCallback } from '@ohos.base';
/**
 * Defines a UI component used to show the FunctionalButton.
 * @syscap SystemCapability.AtomicserviceComponent.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
@Component
export declare struct FunctionalButton {
    /**
     * Defines FunctionalButton Params.
     * @type { functionalButtonComponentManager.FunctionalButtonParams }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    @Prop
    params: functionalButtonComponentManager.FunctionalButtonParams;
    /**
     * Defines the controller to interact with FunctionalButton.
     * @type { functionalButtonComponentManager.FunctionalButtonController }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    controller: functionalButtonComponentManager.FunctionalButtonController;
    /**
     * Constructor used to create a <b>FunctionalButton</b> object.
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    build(): void;
}
/**
 * Defines the business logic of the FunctionalButton component.
 * @namespace functionalButtonComponentManager
 * @syscap SystemCapability.AtomicserviceComponent.UIComponent
 * @stagemodelonly
 * @atomicservice
 * @since 4.1.0(11)
 */
export declare namespace functionalButtonComponentManager {
    /**
     * Enumerates the FunctionalButton types.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum OpenType {
        /**
         * Default value, to get the phone number.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        GET_PHONE_NUMBER = 0,
        /**
         * To get the phone number in real-time.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        GET_REALTIME_PHONENUMBER = 1,
        /**
         * To launch app.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        LAUNCH_APP = 2,
        /**
         * To open the setting app.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        OPEN_SETTING = 3,
        /**
         * To choose the avatar.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        CHOOSE_AVATAR = 4,
        /**
         * To choose the address.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CHOOSE_ADDRESS = 5,
        /**
         * To choose the invoice title.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CHOOSE_INVOICE_TITLE = 6,
        /**
         * Real name authentication.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        REAL_NAME_AUTHENTICATION = 7,
        /**
         * Face authentication.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        FACE_AUTHENTICATION = 8,
        /**
         * To choose the location.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        CHOOSE_LOCATION = 9
    }
    /**
     * Enumerates types of FunctionalButton size.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum SizeType {
        /**
         * Default size of FunctionalButton.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DEFAULT = 0,
        /**
         * Min size of FunctionalButton.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        MINI = 1
    }
    /**
     * Enumerates types of Button press style.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum HoverClassType {
        /**
         * Click effect off.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        NONE = 0,
        /**
         * Click effect on.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        HOVER_CLASS = 1
    }
    /**
     * Enumerates color types of Button color.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export enum ColorType {
        /**
         * Blue color type.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        DEFAULT = 0,
        /**
         * Green color type.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        PRIMARY = 1,
        /**
         * Red color type.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        WARN = 2
    }
    /**
     * Enumerates certification types.
     * @enum { number }
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export enum CredentialType {
        /**
         * ID Card type.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        IDCard = 0
    }
    /**
     * Defines the real name authentication info.
     * @typedef RealNameAuthenticationInfo
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface RealNameAuthenticationInfo {
        /**
         * openID.
         * @type { string }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        openID: string;
        /**
         * name.
         * @type { string }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        realName: string;
        /**
         * ID Number.
         * @type { Uint8Array }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        credentialID: Uint8Array;
        /**
         * ID Type.
         * @type { ?CredentialType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        credentialType?: CredentialType;
    }
    /**
     * Defines style option of button.
     * @typedef StyleOption
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface StyleOption {
        /**
         * Size of button.
         * @type { ?SizeType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        size?: SizeType;
        /**
         * Background color of button.
         * @type { ?ColorType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bgColor?: ColorType;
        /**
         * Plain of button.
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        plain?: boolean;
        /**
         * Disable of button.
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        disabled?: boolean;
        /**
         * Loadingprogress of button.
         * @type { ?boolean }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loading?: boolean;
        /**
         * Click effect of button.
         * @type { ?HoverClassType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hoverClass?: HoverClassType;
        /**
         * The time when the click effect appears after clicking.
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hoverStartTime?: number;
        /**
         * The delay in the disappearance of the click effect after clicking.
         * @type { ?number }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        hoverStayTime?: number;
        /**
         * The property controller of button style config json.
         * @type { ?ButtonConfig }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        styleConfig?: ButtonConfig;
    }
    /**
     * Defines params of button.
     * @typedef FunctionalButtonParams
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface FunctionalButtonParams {
        /**
         * Operation of button.
         * @type { OpenType }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        openType: OpenType;
        /**
         * Label of button.
         * @type { ResourceStr }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        label: ResourceStr;
        /**
         * Style option of button.
         * @type { ?StyleOption }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        styleOption?: StyleOption;
        /**
         * The app Params of button to launch App.
         * @type { ?AppParam }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        appParam?: AppParam;
        /**
         * The info of button to real name authentication.
         * @type { ?RealNameAuthenticationInfo }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        realNameAuthenticationInfo?: RealNameAuthenticationInfo;
    }
    /**
     * Defines the return body for getting phone number.
     * @typedef GetPhoneNumberResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface GetPhoneNumberResult {
        /**
         * AuthCode.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        code?: string;
    }
    /**
     * Defines the return body for getting real time phone number.
     * @typedef GetRealtimePhoneNumberResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface GetRealtimePhoneNumberResult {
        /**
         * AuthCode.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        code?: string;
    }
    /**
     * Defines the return body for opening setting.
     * @typedef OpenSettingResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface OpenSettingResult {
        /**
         * Permissions map.
         * @type { ?Map<string, boolean> }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        permissions?: Map<string, boolean>;
    }
    /**
     * Defines the return body for choosing Avatar.
     * @typedef ChooseAvatarResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface ChooseAvatarResult {
        /**
         * Avatar URI for the avatar.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        avatarUri?: string;
    }
    /**
     * Defines the params for Launch App.
     * @typedef AppParam
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export interface AppParam {
        /**
         * BundleName.
         * @type { ResourceStr }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        bundleName: ResourceStr;
        /**
         * AbilityName.
         * @type { ?ResourceStr }
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        abilityName?: ResourceStr;
    }
    /**
     * Defines the return body for choosing address.
     * @typedef ChooseAddressResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface ChooseAddressResult {
        /**
         * User name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        userName: string;
        /**
         * Mobile phone number.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        mobileNumber?: string;
        /**
       * Landline phone number.
       * @type {?string}
       * @readonly
       * @syscap SystemCapability.AtomicserviceComponent.UIComponent
       * @stagemodelonly
       * @atomicservice
       * @since 5.0.0(12)
         */
        telNumber?: string;
        /**
         * Zip code.
         * @type {?string}
       * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        zipCode?: string;
        /**
         * Country/Region code.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        countryCode?: string;
        /**
         * Province name.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        provinceName?: string;
        /**
         * City name.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        cityName?: string;
        /**
         * District name.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        districtName?: string;
        /**
         * Street Name.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        streetName?: string;
        /**
         * Detailed address.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        detailedAddress: string;
    }
    /**
     * Defines the return body for choose Invoice Title.
     * @typedef ChooseInvoiceTitleResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface ChooseInvoiceTitleResult {
        /**
         * Invoice type.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        type: string;
        /**
         * Invoice title.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        title: string;
        /**
         * Tax number.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        taxNumber: string;
        /**
         * Company address.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        companyAddress?: string;
        /**
         * Telephone number.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        telephone?: string;
        /**
         * Bank Name.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bankName?: string;
        /**
         * Bank account.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        bankAccount?: string;
    }
    /**
     * Define the return body for real name authentication.
     * @typedef RealNameAuthenticationResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface RealNameAuthenticationResult {
        /**
         * AuthCode.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        authCode?: string;
        /**
         * OpenID.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        openID?: string;
    }
    /**
     * Define the return body for face authentication.
     * @typedef FaceAuthenticationResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface FaceAuthenticationResult {
        /**
         * AuthCode.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        authCode?: string;
        /**
         * OpenID.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        openID?: string;
    }
    /**
     * Define the return body for face verification.
     * @typedef FaceVerificationResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface FaceVerificationResult {
        /**
         * Facial recognition verify token returned upon verification success.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        facialRecognitionVerificationToken?: string;
        /**
         * State.
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        state?: string;
    }
    /**
     * Define the return body for choose Location result.
     * @typedef ChooseLocationResult
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 5.0.0(12)
     */
    export interface ChooseLocationResult {
        /**
         * If no poiId, use name as location name.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        name: string;
        /**
         * longitude.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        longitude: number;
        /**
         * latitude.
         * @type { number }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        latitude: number;
        /**
         * address.
         * @type { string }
         * @readonly
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        address: string;
    }
    /**
     * Defines the controller to interact with the button.
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class FunctionalButtonController {
        /**
         * Registers a callback to return the get phone number result.
         * @param { AsyncCallback<GetPhoneNumberResult> } callback - Callback invoked to return the get phone number
         *     response.
         * AsyncCallback param err { BusinessError } Error code returned when get phone number fails.
         * AsyncCallback param data { GetPhoneNumberResult } Response returned when the get phone number is successful.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onGetPhoneNumber(callback: AsyncCallback<GetPhoneNumberResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the get realtime phoneNumber result.
         * @param { AsyncCallback<GetRealtimePhoneNumberResult> } callback - Callback invoked to return the get
         *     realtime phone number response.
         * AsyncCallback param err { BusinessError } Error code returned when get realtime phoneNumber fails.
         * AsyncCallback param data { GetRealtimePhoneNumberResult } Response returned when the get realtime
         *     phone number is successful.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onGetRealtimePhoneNumber(callback: AsyncCallback<GetRealtimePhoneNumberResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the launch app result.
         * @param { AsyncCallback<void> } callback - Callback invoked to return the launch app response.
         * AsyncCallback param err { BusinessError } Error code returned when launch app fails.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onLaunchApp(callback: AsyncCallback<void>): FunctionalButtonController;
        /**
         * Registers a callback to return the open setting result.
         * @param { AsyncCallback<OpenSettingResult> } callback - Callback invoked to return the open setting response.
         * AsyncCallback param err { BusinessError } Error code returned when open setting fails.
         * AsyncCallback param data { OpenSettingResult } Response returned when the open setting is successful.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onOpenSetting(callback: AsyncCallback<OpenSettingResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the choose avatar result.
         * @param { AsyncCallback<ChooseAvatarResult> } callback - Callback invoked to return the choose avatar
         *     response.
         * AsyncCallback param err { BusinessError } Error code returned when choose avatar fails.
         * AsyncCallback param data { ChooseAvatarResult } Response returned when the choose avatar is successful.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        onChooseAvatar(callback: AsyncCallback<ChooseAvatarResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the choose address result.
         * @param { AsyncCallback<ChooseAddressResult> } callback - Callback invoked to return the choose address
         *     response.
         * AsyncCallback param err { BusinessError } Error code returned when choose address fails.
         * AsyncCallback param data { ChooseAddressResult } Response returned when the choose address success.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onChooseAddress(callback: AsyncCallback<ChooseAddressResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the choose invoice title result.
         * @param { AsyncCallback<ChooseInvoiceTitleResult> } callback - Callback invoked to return the choose invoice
         *     title response.
         * AsyncCallback param err { BusinessError } Error code returned when choose invoice title fails.
         * AsyncCallback param data { ChooseInvoiceTitleResult } Response returned when the choose invoice title
         *     success.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onChooseInvoiceTitle(callback: AsyncCallback<ChooseInvoiceTitleResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the real name authentication result.
         * @param { AsyncCallback<RealNameAuthenticationResult> } callback - Callback invoked to return the real name
         *     authentication response.
         * AsyncCallback param err { BusinessError } Error code returned when real name authentication fails.
         * AsyncCallback param data { RealNameAuthenticationResult } Response returned when the real name authentication
         *     success.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onRealNameAuthentication(callback: AsyncCallback<RealNameAuthenticationResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the face authentication result.
         * @param { AsyncCallback<FaceAuthenticationResult> } callback - Callback invoked to return the face
         *     authentication response.
         * AsyncCallback param err { BusinessError } Error code returned when face authentication fails.
         * AsyncCallback param data { FaceAuthenticationResult } Response returned when the face authentication
         *     success.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onFaceAuthentication(callback: AsyncCallback<FaceAuthenticationResult>): FunctionalButtonController;
        /**
         * Registers a callback to return the face verification result.
         * @param { string } verifyToken - Result of the face authentication.
         * @param { AsyncCallback<FaceVerificationResult> } callback - Callback invoked to return the face
         *     verification response.
         * AsyncCallback param err { BusinessError } Error code returned when face verification fails.
         * AsyncCallback param data { FaceVerificationResult } Response returned when the face verification success.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onFaceVerification(verifyToken: string, callback: AsyncCallback<FaceVerificationResult>): void;
        /**
         * Registers a callback to return the choose location result.
         * @param { AsyncCallback<ChooseLocationResult> } callback - Callback invoked to return the choose location
         *     title response.
         * AsyncCallback param err { BusinessError } Error code returned when choose location fails.
         * AsyncCallback param data { ChooseLocationResult } Response returned when the choose location success.
         * @returns { FunctionalButtonController } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 5.0.0(12)
         */
        onChooseLocation(callback: AsyncCallback<ChooseLocationResult>): FunctionalButtonController;
    }
    /**
     * Defines the controller to interact with the button property.
     * @syscap SystemCapability.AtomicserviceComponent.UIComponent
     * @stagemodelonly
     * @atomicservice
     * @since 4.1.0(11)
     */
    export class ButtonConfig {
        /**
         * The type attribute of the Button.
         * @param { ButtonType } value - The type attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        type(value: ButtonType): ButtonConfig;
        /**
         * The stateEffect attribute of the Button.
         * @param { boolean } value - The stateEffect attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        stateEffect(value: boolean): ButtonConfig;
        /**
         * The fontColor attribute of the Button.
         * @param { ResourceColor } value - The fontColor attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontColor(value: ResourceColor): ButtonConfig;
        /**
         * The fontSize attribute of the Button.
         * @param { Length } value - The fontSize attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontSize(value: Length): ButtonConfig;
        /**
         * The fontWeight attribute of the Button.
         * @param { string | number | FontWeight } value - The fontWeight attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontWeight(value: string | number | FontWeight): ButtonConfig;
        /**
         * The fontStyle attribute of the Button.
         * @param { FontStyle } value - The fontStyle attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontStyle(value: FontStyle): ButtonConfig;
        /**
         * The fontFamily attribute of the Button.
         * @param { string | Resource } value - The fontFamily attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        fontFamily(value: string | Resource): ButtonConfig;
        /**
         * The width attribute of the Button.
         * @param { Length } value - The width attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        width(value: Length): ButtonConfig;
        /**
         * The height attribute of the Button.
         * @param { Length } value - The height attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        height(value: Length): ButtonConfig;
        /**
         * The size attribute of the Button.
         * @param { SizeOptions } value - The size attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        size(value: SizeOptions): ButtonConfig;
        /**
         * The constraintSize attribute of the Button.
         * @param { ConstraintSizeOptions } value - The constraintSize attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        constraintSize(value: ConstraintSizeOptions): ButtonConfig;
        /**
         * The padding attribute of the Button.
         * @param { Length | Padding } value - The padding attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        padding(value: Length | Padding): ButtonConfig;
        /**
         * The margin attribute of the Button.
         * @param { Length | Padding } value - The margin attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        margin(value: Length | Padding): ButtonConfig;
        /**
         * The backgroundColor attribute of the Button.
         * @param { ResourceColor } value - The backgroundColor attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        backgroundColor(value: ResourceColor): ButtonConfig;
        /**
         * The backgroundImage attribute of the Button.
         * @param { ResourceStr } value - The backgroundImage src attribute of the Button.
         * @param { ImageRepeat } [options] repeat - The backgroundImage repeat attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        backgroundImage(src: ResourceStr, repeat?: ImageRepeat): ButtonConfig;
        /**
         * The backgroundImageSize attribute of the Button.
         * @param { SizeOptions | ImageSize } value - The backgroundImageSize attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        backgroundImageSize(value: SizeOptions | ImageSize): ButtonConfig;
        /**
         * The backgroundImagePosition attribute of the Button.
         * @param { Position | Alignment } value - The backgroundImagePosition attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        backgroundImagePosition(value: Position | Alignment): ButtonConfig;
        /**
         * The opacity attribute of the Button.
         * @param { number | Resource } value - The opacity attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        opacity(value: number | Resource): ButtonConfig;
        /**
         * The border attribute of the Button.
         * @param { BorderOptions } value - The border attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        border(value: BorderOptions): ButtonConfig;
        /**
         * The borderStyle attribute of the Button.
         * @param { BorderStyle | EdgeStyles } value - The borderStyle attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderStyle(value: BorderStyle | EdgeStyles): ButtonConfig;
        /**
         * The borderWidth attribute of the Button.
         * @param { Length | EdgeWidths } value - The borderWidth attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderWidth(value: Length | EdgeWidths): ButtonConfig;
        /**
         * The borderColor attribute of the Button.
         * @param { ResourceColor | EdgeColors } value - The borderColor attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderColor(value: ResourceColor | EdgeColors): ButtonConfig;
        /**
         * The borderRadius attribute of the Button.
         * @param { Length | BorderRadiuses } value - The borderRadius attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderRadius(value: Length | BorderRadiuses): ButtonConfig;
        /**
         * The borderImage attribute of the Button.
         * @param { BorderImageOption } value - The borderImage attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        borderImage(value: BorderImageOption): ButtonConfig;
        /**
         * The scale attribute of the Button.
         * @param { ScaleOptions } value - The scale attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        scale(value: ScaleOptions): ButtonConfig;
        /**
         * The align attribute of the Button.
         * @param { Alignment } value - The align attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        align(value: Alignment): ButtonConfig;
        /**
         * The markAnchor attribute of the Button.
         * @param { Position } value - The markAnchor attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        markAnchor(value: Position): ButtonConfig;
        /**
         * The offset attribute of the Button.
         * @param { Position } value - The offset attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        offset(value: Position): ButtonConfig;
        /**
         * The enabled attribute of the Button.
         * @param { boolean } value - The enabled attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        enabled(value: boolean): ButtonConfig;
        /**
         * The loadingColor attribute of the Button.
         * @param { ResourceColor } value - The loadingColor attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loadingColor(value: ResourceColor): ButtonConfig;
        /**
         * The loadingWidth attribute of the Button.
         * @param { Length } value - The loadingWidth attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loadingWidth(value: Length): ButtonConfig;
        /**
         * The loadingHeight attribute of the Button.
         * @param { Length } value - The loadingHeight attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loadingHeight(value: Length): ButtonConfig;
        /**
         * The loadingPadding attribute of the Button.
         * @param { Length | Padding } value - The loadingPadding attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loadingPadding(value: Length | Padding): ButtonConfig;
        /**
         * The loadingMargin attribute of the Button.
         * @param { Length | Padding } value - The loadingMargin attribute of the Button.
         * @returns { ButtonConfig } Returns the current controller instance.
         * @syscap SystemCapability.AtomicserviceComponent.UIComponent
         * @stagemodelonly
         * @atomicservice
         * @since 4.1.0(11)
         */
        loadingMargin(value: Length | Padding): ButtonConfig;
    }
}
