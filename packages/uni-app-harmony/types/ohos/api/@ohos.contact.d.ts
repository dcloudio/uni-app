/*
 * Copyright (C) 2021-2023 Huawei Device Co., Ltd.
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
 * @kit ContactsKit
 */
import { AsyncCallback } from './@ohos.base';
import type Context from './application/BaseContext';
/**
 * Contains variety of system contact, provides functions for adding, updating and deleting these system contact
 * and provides methods for querying the information of contact.
 *
 * @namespace contact
 * @syscap SystemCapability.Applications.ContactsData
 * @since 7
 */
/**
 * Contains variety of system contact, provides functions for adding, updating and deleting these system contact
 * and provides methods for querying the information of contact.
 *
 * @namespace contact
 * @syscap SystemCapability.Applications.ContactsData
 * @atomicservice
 * @since 11
 */
declare namespace contact {
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Contact } contact - Indicates the contact information.
     * @param { AsyncCallback<number> } callback - Returns the contact ID (which can be obtained
     * by {@link Contact#getId()}) if the creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the
     * creation fails.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.addContact#addContact
     */
    function addContact(contact: Contact, callback: AsyncCallback<number>): void;
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact information.
     * @param { AsyncCallback<number> } callback - Returns the contact ID (which can be obtained
     * by {@link Contact#getId()}) if the creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the
     * creation fails.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact information.
     * @param { AsyncCallback<number> } callback - Returns the contact ID (which can be obtained
     * by {@link Contact#getId()}) if the creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the
     * creation fails.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 12
     */
    function addContact(context: Context, contact: Contact, callback: AsyncCallback<number>): void;
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Contact } contact - Indicates the contact information.
     * @returns { Promise<number> } Returns the contact ID (which can be obtained by {@link Contact#getId()}) if the
     * creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the creation fails.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.addContact#addContact
     */
    function addContact(contact: Contact): Promise<number>;
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact information.
     * @returns { Promise<number> } Returns the contact ID (which can be obtained by {@link Contact#getId()}) if the
     * creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the creation fails.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    /**
     * Creates a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact information.
     * @returns { Promise<number> } Returns the contact ID (which can be obtained by {@link Contact#getId()}) if the
     * creation is successful. returns {@link Contact#INVALID_CONTACT_ID} if the creation fails.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 12
     */
    function addContact(context: Context, contact: Contact): Promise<number>;
    /**
     * Select contact.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { AsyncCallback<Array<Contact>> } callback - Indicates the callback for getting the result of the call.
     * Returns the contact list which user select; returns empty contact list if user not select.
     * @syscap SystemCapability.Applications.Contacts
     * @since 7
     * @deprecated since 10
     * @useinstead contact.selectContact#selectContacts
     */
    function selectContact(callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Select contact.
     *
     * @param { AsyncCallback<Array<Contact>> } callback - Indicates the callback for getting the result of the call.
     * Returns the contact list which user select; returns empty contact list if user not select.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @since 10
     */
    /**
     * Select contact.
     *
     * @param { AsyncCallback<Array<Contact>> } callback - Indicates the callback for getting the result of the call.
     * Returns the contact list which user select; returns empty contact list if user not select.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function selectContacts(callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Select contact.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @returns { Promise<Array<Contact>> } Returns the contact list which user select;
     * returns empty contact list if user not select.
     * @syscap SystemCapability.Applications.Contacts
     * @since 7
     * @deprecated since 10
     * @useinstead contact.selectContact#selectContacts
     */
    function selectContact(): Promise<Array<Contact>>;
    /**
     * Select contact.
     *
     * @returns { Promise<Array<Contact>> } Returns the contact list which user select;
     * returns empty contact list if user not select.
     * @syscap SystemCapability.Applications.Contacts
     * @since 10
     */
    /**
     * Select contact.
     *
     * @returns { Promise<Array<Contact>> } Returns the contact list which user select;
     * returns empty contact list if user not select.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function selectContacts(): Promise<Array<Contact>>;
    /**
     * Select contact with option.
     *
     * @param { ContactSelectionOptions } options - Indicates the Single-select or multiple-select.
     * @param { AsyncCallback<Array<Contact>> } callback - Indicates the callback for getting the result of the call.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @since 10
     */
    /**
     * Select contact with option.
     *
     * @param { ContactSelectionOptions } options - Indicates the Single-select or multiple-select.
     * @param { AsyncCallback<Array<Contact>> } callback - Indicates the callback for getting the result of the call.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function selectContacts(options: ContactSelectionOptions, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Select contact with option.
     *
     * @param { ContactSelectionOptions } options - Indicates the Single-select or multiple-select.
     * @returns { Promise<Array<Contact>> } Returns the contact list which user select;
     * returns empty contact list if user not select.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @since 10
     */
    /**
     * Select contact with option.
     *
     * @param { ContactSelectionOptions } options - Indicates the Single-select or multiple-select.
     * @returns { Promise<Array<Contact>> } Returns the contact list which user select;
     * returns empty contact list if user not select.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    function selectContacts(options: ContactSelectionOptions): Promise<Array<Contact>>;
    /**
     * Deletes a specified contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact to delete.
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.deleteContact#deleteContact
     */
    function deleteContact(key: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a specified contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact to delete.
     * @param { AsyncCallback<void> } callback - Return the callback function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function deleteContact(context: Context, key: string, callback: AsyncCallback<void>): void;
    /**
     * Deletes a specified contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact to delete.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.deleteContact#deleteContact
     */
    function deleteContact(key: string): Promise<void>;
    /**
     * Deletes a specified contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact to delete.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function deleteContact(context: Context, key: string): Promise<void>;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContact#queryContact
     */
    function queryContact(key: string, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContact(context: Context, key: string, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContact#queryContact
     */
    function queryContact(key: string, holder: Holder, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContact(context: Context, key: string, holder: Holder, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContact#queryContact
     */
    function queryContact(key: string, attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContact(context: Context, key: string, attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContact#queryContact
     */
    function queryContact(key: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns the specified contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContact(context: Context, key: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Contact> } Returns the specified contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContact#queryContact
     */
    function queryContact(key: string, holder?: Holder, attrs?: ContactAttributes): Promise<Contact>;
    /**
     * Queries a specified contact of specified attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } key - Indicates the unique query key of a contact.
     * @param { Holder } holder - Indicates the contact holder.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Contact> } Returns the specified contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContact(context: Context, key: string, holder?: Holder, attrs?: ContactAttributes): Promise<Contact>;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContacts#queryContacts
     */
    function queryContacts(callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContacts(context: Context, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContacts#queryContacts
     */
    function queryContacts(holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContacts(context: Context, holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContacts#queryContacts
     */
    function queryContacts(attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContacts(context: Context, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContacts#queryContacts
     */
    function queryContacts(holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContacts(context: Context, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Array<Contact>> } Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContacts#queryContacts
     */
    function queryContacts(holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contacts with query conditions.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Array<Contact>> } Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContacts(context: Context, holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contacts by a specified email address.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } email - Indicates the email address.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByEmail#queryContactsByEmail
     */
    function queryContactsByEmail(email: string, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } email - Indicates the email address.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByEmail(context: Context, email: string, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address and contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByEmail#queryContactsByEmail
     */
    function queryContactsByEmail(email: string, holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address and contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByEmail(context: Context, email: string, holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } email - Indicates the email address.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByEmail#queryContactsByEmail
     */
    function queryContactsByEmail(email: string, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } email - Indicates the email address.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByEmail(context: Context, email: string, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address, contact holder, and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByEmail#queryContactsByEmail
     */
    function queryContactsByEmail(email: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address, contact holder, and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns a {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByEmail(context: Context, email: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a specified email address, contact holder, and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Array<Contact>> } Returns a {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByEmail#queryContactsByEmail
     */
    function queryContactsByEmail(email: string, holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contacts by a specified email address, contact holder, and contact attributes.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } email - Indicates the email address.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attributes.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Array<Contact>> } Returns a {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByEmail(context: Context, email: string, holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contacts by a phone number.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByPhoneNumber#queryContactsByPhoneNumber
     */
    function queryContactsByPhoneNumber(phoneNumber: string, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByPhoneNumber(context: Context, phoneNumber: string, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number and contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByPhoneNumber#queryContactsByPhoneNumber
     */
    function queryContactsByPhoneNumber(phoneNumber: string, holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number and contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByPhoneNumber(context: Context, phoneNumber: string, holder: Holder, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByPhoneNumber#queryContactsByPhoneNumber
     */
    function queryContactsByPhoneNumber(phoneNumber: string, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByPhoneNumber(context: Context, phoneNumber: string, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number, contact holder and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByPhoneNumber#queryContactsByPhoneNumber
     */
    function queryContactsByPhoneNumber(phoneNumber: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number, contact holder and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @param { AsyncCallback<Array<Contact>> } callback - Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByPhoneNumber(context: Context, phoneNumber: string, holder: Holder, attrs: ContactAttributes, callback: AsyncCallback<Array<Contact>>): void;
    /**
     * Queries contacts by a phone number, contact holder and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @returns { Promise<Array<Contact>> } Returns the {@code Contact} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryContactsByPhoneNumber#queryContactsByPhoneNumber
     */
    function queryContactsByPhoneNumber(phoneNumber: string, holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contacts by a phone number, contact holder and contact attribute.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { string } phoneNumber - Indicates the phone number.
     * Only full match is supported, and wildcards are not supported.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes will be used for matching.
     * @returns { Promise<Array<Contact>> } Returns the {@code Contact} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryContactsByPhoneNumber(context: Context, phoneNumber: string, holder?: Holder, attrs?: ContactAttributes): Promise<Array<Contact>>;
    /**
     * Queries contact groups.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { AsyncCallback<Array<Group>> } callback - Returns the contact group list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryGroups#queryGroups
     */
    function queryGroups(callback: AsyncCallback<Array<Group>>): void;
    /**
     * Queries contact groups.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { AsyncCallback<Array<Group>> } callback - Returns the contact group list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryGroups(context: Context, callback: AsyncCallback<Array<Group>>): void;
    /**
     * Queries contact groups by contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Group>> } callback - Returns the contact group list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryGroups#queryGroups
     */
    function queryGroups(holder: Holder, callback: AsyncCallback<Array<Group>>): void;
    /**
     * Queries contact groups by contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<Array<Group>> } callback - Returns the contact group list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryGroups(context: Context, holder: Holder, callback: AsyncCallback<Array<Group>>): void;
    /**
     * Queries contact groups by contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @returns { Promise<Array<Group>> } Returns the contact group list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryGroups#queryGroups
     */
    function queryGroups(holder?: Holder): Promise<Array<Group>>;
    /**
     * Queries contact groups by contact holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @returns { Promise<Array<Group>> } Returns the contact group list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryGroups(context: Context, holder?: Holder): Promise<Array<Group>>;
    /**
     * Queries contact holders.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { AsyncCallback<Array<Holder>> } callback - Returns the {@code Holder} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryHolders#queryHolders
     */
    function queryHolders(callback: AsyncCallback<Array<Holder>>): void;
    /**
     * Queries contact holders.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { AsyncCallback<Array<Holder>> } callback - Returns the {@code Holder} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryHolders(context: Context, callback: AsyncCallback<Array<Holder>>): void;
    /**
     * Queries contact holders.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @returns { Promise<Array<Holder>> } Returns the {@code Holder} list object.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryHolders#queryHolders
     */
    function queryHolders(): Promise<Array<Holder>>;
    /**
     * Queries contact holders.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @returns { Promise<Array<Holder>> } Returns the {@code Holder} list object.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryHolders(context: Context): Promise<Array<Holder>>;
    /**
     * Obtains the query key of a contact based on a specified ID.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<string> } callback - Returns the query key of the contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryKey#queryKey
     */
    function queryKey(id: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the query key of a contact based on a specified ID.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<string> } callback - Returns the query key of the contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryKey(context: Context, id: number, callback: AsyncCallback<string>): void;
    /**
     * Obtains the query key of a contact based on a specified ID and holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<string> } callback - Returns the query key of the contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryKey#queryKey
     */
    function queryKey(id: number, holder: Holder, callback: AsyncCallback<string>): void;
    /**
     * Obtains the query key of a contact based on a specified ID and holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @param { AsyncCallback<string> } callback - Returns the query key of the contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryKey(context: Context, id: number, holder: Holder, callback: AsyncCallback<string>): void;
    /**
     * Obtains the query key of a contact based on a specified ID and holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @returns { Promise<string> } Returns the query key of the contact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryKey#queryKey
     */
    function queryKey(id: number, holder?: Holder): Promise<string>;
    /**
     * Obtains the query key of a contact based on a specified ID and holder.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @param { Holder } holder - Indicates the contact holder.
     * If this parameter is null, the default holder is used for matching.
     * @returns { Promise<string> } Returns the query key of the contact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryKey(context: Context, id: number, holder?: Holder): Promise<string>;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { AsyncCallback<Contact> } callback - Returns information about "my card".
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryMyCard#queryMyCard
     */
    function queryMyCard(callback: AsyncCallback<Contact>): void;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { AsyncCallback<Contact> } callback - Returns information about "my card".
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryMyCard(context: Context, callback: AsyncCallback<Contact>): void;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns information about "my card".
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryMyCard#queryMyCard
     */
    function queryMyCard(attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<Contact> } callback - Returns information about "my card".
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryMyCard(context: Context, attrs: ContactAttributes, callback: AsyncCallback<Contact>): void;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Contact> } Returns information about "my card".
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.queryMyCard#queryMyCard
     */
    function queryMyCard(attrs?: ContactAttributes): Promise<Contact>;
    /**
     * Queries information about "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<Contact> } Returns information about "my card".
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function queryMyCard(context: Context, attrs?: ContactAttributes): Promise<Contact>;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { AsyncCallback<void> } callback - The callback of updateContact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.updateContact#updateContact
     */
    function updateContact(contact: Contact, callback: AsyncCallback<void>): void;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { AsyncCallback<void> } callback - The callback of updateContact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function updateContact(context: Context, contact: Contact, callback: AsyncCallback<void>): void;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<void> } callback - The callback of updateContact.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.updateContact#updateContact
     */
    function updateContact(contact: Contact, attrs: ContactAttributes, callback: AsyncCallback<void>): void;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @param { AsyncCallback<void> } callback - The callback of updateContact.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function updateContact(context: Context, contact: Contact, attrs: ContactAttributes, callback: AsyncCallback<void>): void;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<void> } The promise returned by the function.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.updateContact#updateContact
     */
    function updateContact(contact: Contact, attrs?: ContactAttributes): Promise<void>;
    /**
     * Updates specified attributes of a contact.
     *
     * @permission ohos.permission.WRITE_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { Contact } contact - Indicates the contact whose information is to update.
     * @param { ContactAttributes } attrs - Indicates the contact attribute.
     * If this parameter is null, all attributes are used for matching.
     * @returns { Promise<void> } The promise returned by the function.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function updateContact(context: Context, contact: Contact, attrs?: ContactAttributes): Promise<void>;
    /**
     * Checks whether the contact ID is in the local phone book.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<boolean> } callback - The callback of isLocalContact.
     * Returns {@code true} if the contact ID is in the local phone book; returns {@code false} otherwise.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.isLocalContact#isLocalContact
     */
    function isLocalContact(id: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the contact ID is in the local phone book.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<boolean> } callback - The callback of isLocalContact.
     * Returns {@code true} if the contact ID is in the local phone book; returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function isLocalContact(context: Context, id: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the contact ID is in the local phone book.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @returns { Promise<boolean> } Returns {@code true} if the contact ID is in the local phone book,
     * returns {@code false} otherwise.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.isLocalContact#isLocalContact
     */
    function isLocalContact(id: number): Promise<boolean>;
    /**
     * Checks whether the contact ID is in the local phone book.
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @returns { Promise<boolean> } Returns {@code true} if the contact ID is in the local phone book,
     * returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function isLocalContact(context: Context, id: number): Promise<boolean>;
    /**
     * Checks whether the contact ID is of "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<boolean> } callback - The callback of isMyCard.
     * Returns {@code true} if the contact ID is of "my card"; returns {@code false} otherwise.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.deleteContact#deleteContact
     */
    function isMyCard(id: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the contact ID is of "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @param { AsyncCallback<boolean> } callback - The callback of isMyCard.
     * Returns {@code true} if the contact ID is of "my card"; returns {@code false} otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function isMyCard(context: Context, id: number, callback: AsyncCallback<boolean>): void;
    /**
     * Checks whether the contact ID is of "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { number } id - Indicates the contact ID.
     * @returns { Promise<boolean> } Returns true if the contact ID is of "my card", returns false otherwise.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     * @deprecated since 10
     * @useinstead contact.isMyCard#isMyCard
     */
    function isMyCard(id: number): Promise<boolean>;
    /**
     * Checks whether the contact ID is of "my card".
     *
     * @permission ohos.permission.READ_CONTACTS
     * @param { Context } context - Indicates the context of application or capability.
     * @param { number } id - Indicates the contact ID.
     * @returns { Promise<boolean> } Returns true if the contact ID is of "my card", returns false otherwise.
     * @throws { BusinessError } 201 - Permission denied.
     * @throws { BusinessError } 401 - Parameter error.
     * @syscap SystemCapability.Applications.ContactsData
     * @since 10
     */
    function isMyCard(context: Context, id: number): Promise<boolean>;
    /**
     * ContactSelectionOptions Object
     *
     * @interface ContactSelectionOptions
     * @syscap SystemCapability.Applications.Contacts
     * @since 10
     */
    /**
     * ContactSelectionOptions Object
     *
     * @interface ContactSelectionOptions
     * @syscap SystemCapability.Applications.Contacts
     * @atomicservice
     * @since 11
     */
    interface ContactSelectionOptions {
        /**
         * Indicates the Single-select or multiple-select.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.Contacts
         * @since 10
         */
        /**
         * Indicates the Single-select or multiple-select.
         *
         * @type { ?boolean }
         * @syscap SystemCapability.Applications.Contacts
         * @atomicservice
         * @since 11
         */
        isMultiSelect?: boolean;
    }
    /**
     * Provides methods for contact information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for contact information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Contact {
        /**
         * Indicates the contact invalid ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact invalid ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_CONTACT_ID: -1;
        /**
         * Indicates the contact ID.
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact ID.
         *
         * @type { ?number }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        readonly id?: number;
        /**
         * Indicates the query key that identifies the contact.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the query key that identifies the contact.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        readonly key?: string;
        /**
         * Indicates the contact attributes.
         *
         * @type { ?ContactAttributes }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact attributes.
         *
         * @type { ?ContactAttributes }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        contactAttributes?: ContactAttributes;
        /**
         * Indicates list of contact email addresses.
         *
         * @type { ?Email[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates list of contact email addresses.
         *
         * @type { ?Email[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        emails?: Email[];
        /**
         * Indicates an event (special date) of the contact.
         *
         * @type { ?Event[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an event (special date) of the contact.
         *
         * @type { ?Event[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        events?: Event[];
        /**
         * Indicates a group of the contact.
         *
         * @type { ?Group[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a group of the contact.
         *
         * @type { ?Group[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        groups?: Group[];
        /**
         * Indicates an IM address of the contact.
         *
         * @type { ?ImAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an IM address of the contact.
         *
         * @type { ?ImAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        imAddresses?: ImAddress[];
        /**
         * Indicates a phone number of the contact.
         *
         * @type { ?PhoneNumber[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a phone number of the contact.
         *
         * @type { ?PhoneNumber[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        phoneNumbers?: PhoneNumber[];
        /**
         * Indicates the contact portrait.
         *
         * @type { ?Portrait }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact portrait.
         *
         * @type { ?Portrait }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        portrait?: Portrait;
        /**
         * Indicates a postal address of the contact.
         *
         * @type { ?PostalAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a postal address of the contact.
         *
         * @type { ?PostalAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        postalAddresses?: PostalAddress[];
        /**
         * Indicates a relation of the contact.
         *
         * @type { ?Relation[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a relation of the contact.
         *
         * @type { ?Relation[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        relations?: Relation[];
        /**
         * Indicates a Session Initiation Protocol (SIP) address of the contact.
         *
         * @type { ?SipAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a Session Initiation Protocol (SIP) address of the contact.
         *
         * @type { ?SipAddress[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        sipAddresses?: SipAddress[];
        /**
         * Indicates a website of the contact.
         *
         * @type { ?Website[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a website of the contact.
         *
         * @type { ?Website[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        websites?: Website[];
        /**
         * Indicates the contact name.
         *
         * @type { ?Name }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact name.
         *
         * @type { ?Name }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        name?: Name;
        /**
         * Indicates the contact nickname.
         *
         * @type { ?NickName }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact nickname.
         *
         * @type { ?NickName }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        nickName?: NickName;
        /**
         * Indicates the contact note.
         *
         * @type { ?Note }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact note.
         *
         * @type { ?Note }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        note?: Note;
        /**
         * Indicates organization information about the contact.
         *
         * @type { ?Organization }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates organization information about the contact.
         *
         * @type { ?Organization }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        organization?: Organization;
    }
    /**
     * Provides methods for contact attributes information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for contact attributes information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class ContactAttributes {
        /**
         * Indicates the contact attributes.
         *
         * @type { Attribute[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact attributes.
         *
         * @type { Attribute[] }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        attributes: Attribute[];
    }
    /**
     * Provides methods for attribute information
     *
     * @enum { number }
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for attribute information
     *
     * @enum { number }
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    enum Attribute {
        /**
         * Indicates the contact event.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact event.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_CONTACT_EVENT,
        /**
         * Indicates the email address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the email address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_EMAIL,
        /**
         * Indicates the contact group.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact group.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_GROUP_MEMBERSHIP,
        /**
         * Indicates the instant messaging (IM) address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the instant messaging (IM) address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_IM,
        /**
         * Indicates the name.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the name.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_NAME,
        /**
         * Indicates the nickname.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the nickname.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_NICKNAME,
        /**
         * Indicates the note.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the note.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_NOTE,
        /**
         * Indicates the organization.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the organization.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_ORGANIZATION,
        /**
         * Indicates the phone number.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the phone number.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_PHONE,
        /**
         * Indicates the portrait.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the portrait.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_PORTRAIT,
        /**
         * Indicates the postal address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the postal address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_POSTAL_ADDRESS,
        /**
         * Indicates the relation.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the relation.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_RELATION,
        /**
         * Indicates the Session Initiation Protocol (SIP) address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the Session Initiation Protocol (SIP) address.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_SIP_ADDRESS,
        /**
         * Indicates the website.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the website.
         *
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        ATTR_WEBSITE
    }
    /**
     * Provides methods for email information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for email information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Email {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates a home email.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a home email.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EMAIL_HOME: 1;
        /**
         * Indicates a work email.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work email.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EMAIL_WORK: 2;
        /**
         * Indicates an email of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an email of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EMAIL_OTHER: 3;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the email address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the email address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        email: string;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the displayed email name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the displayed email name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        displayName?: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for event information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for event information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Event {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates an anniversary event.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an anniversary event.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EVENT_ANNIVERSARY: 1;
        /**
         * Indicates an event of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an event of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EVENT_OTHER: 2;
        /**
         * Indicates an birthday event.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an birthday event.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly EVENT_BIRTHDAY: 3;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the event date.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the event date.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        eventDate: string;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for group information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for group information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Group {
        /**
         * Indicates the contact group ID.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact group ID.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        groupId?: number;
        /**
         * Indicates the contact group title.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the contact group title.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        title: string;
    }
    /**
     * Provides methods for holder information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    class Holder {
        /**
         * Indicates the bundle name of a contact holder.
         *
         * @type { string }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        readonly bundleName: string;
        /**
         * Indicates the displayed name of a contact holder.
         *
         * @type { ?string }
         * @readonly
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        readonly displayName?: string;
        /**
         * Indicates the holder ID.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        holderId?: number;
    }
    /**
     * Provides methods for ImAddress information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for ImAddress information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class ImAddress {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: -1;
        /**
         * Indicates an AIM instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an AIM instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_AIM: 0;
        /**
         * Indicates a Windows Live instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a Windows Live instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_MSN: 1;
        /**
         * Indicates a Yahoo instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a Yahoo instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_YAHOO: 2;
        /**
         * Indicates a Skype instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a Skype instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_SKYPE: 3;
        /**
         * Indicates a QQ instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a QQ instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_QQ: 4;
        /**
         * Indicates an ICQ instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an ICQ instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_ICQ: 6;
        /**
         * Indicates a Jabber instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a Jabber instant message.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly IM_JABBER: 7;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -2;
        /**
         * Indicates the IM address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the IM address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        imAddress: string;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for name information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for name information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Name {
        /**
         * Indicates the family name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the family name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        familyName?: string;
        /**
         * Indicates the phonetic family name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the phonetic family name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        familyNamePhonetic?: string;
        /**
         * Indicates the full name of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the full name of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        fullName: string;
        /**
         * Indicates the given name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the given name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        givenName?: string;
        /**
         * Indicates the phonetic given name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the phonetic given name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        givenNamePhonetic?: string;
        /**
         * Indicates the middle name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the middle name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        middleName?: string;
        /**
         * Indicates the phonetic middle name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the phonetic middle name of the contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        middleNamePhonetic?: string;
        /**
         * Indicates the prefix of the contact name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the prefix of the contact name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        namePrefix?: string;
        /**
         * Indicates the suffix of this contact name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the suffix of this contact name.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        nameSuffix?: string;
    }
    /**
     * Provides methods for nick name information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for nick name information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class NickName {
        /**
         * Indicates the nickname of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the nickname of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        nickName: string;
    }
    /**
     * Provides methods for note information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for note information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Note {
        /**
         * Indicates the note content.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the note content.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        noteContent: string;
    }
    /**
     * Provides methods for organization information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for organization information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Organization {
        /**
         * Indicates the name of the organization to which the contact belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the name of the organization to which the contact belongs.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        name: string;
        /**
         * Indicates the title of the organization.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the title of the organization.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        title?: string;
    }
    /**
     * Provides methods for phone number information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for phone number information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class PhoneNumber {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates a home number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a home number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_HOME: 1;
        /**
         * Indicates a mobile phone number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a mobile phone number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_MOBILE: 2;
        /**
         * Indicates a work number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_WORK: 3;
        /**
         * Indicates a work fax number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work fax number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_FAX_WORK: 4;
        /**
         * Indicates a home fax number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a home fax number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_FAX_HOME: 5;
        /**
         * Indicates a pager number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a pager number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_PAGER: 6;
        /**
         * Indicates a number of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a number of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_OTHER: 7;
        /**
         * Indicates a callback number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a callback number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_CALLBACK: 8;
        /**
         * Indicates a car number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a car number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_CAR: 9;
        /**
         * Indicates a company director number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a company director number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_COMPANY_MAIN: 10;
        /**
         * Indicates an Integrated Services Digital Network (ISDN) number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an Integrated Services Digital Network (ISDN) number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_ISDN: 11;
        /**
         * Indicates a main number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a main number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_MAIN: 12;
        /**
         * Indicates a number of the OTHER_FAX type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a number of the OTHER_FAX type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_OTHER_FAX: 13;
        /**
         * Indicates a radio number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a radio number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_RADIO: 14;
        /**
         * Indicates a telex number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a telex number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_TELEX: 15;
        /**
         * Indicates a teletypewriter (TTY) or test-driven development (TDD) number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a teletypewriter (TTY) or test-driven development (TDD) number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_TTY_TDD: 16;
        /**
         * Indicates a work mobile phone number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work mobile phone number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_WORK_MOBILE: 17;
        /**
         * Indicates a work pager number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work pager number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_WORK_PAGER: 18;
        /**
         * Indicates an assistant number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an assistant number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_ASSISTANT: 19;
        /**
         * Indicates an MMS number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an MMS number.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly NUM_MMS: 20;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the phone number of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the phone number of the contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        phoneNumber: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for portrait information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for portrait information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Portrait {
        /**
         * Indicates the uri of the contact portrait.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the uri of the contact portrait.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        uri: string;
    }
    /**
     * Provides methods for postal address information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for postal address information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class PostalAddress {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates a home address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a home address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly ADDR_HOME: 1;
        /**
         * Indicates a work address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly ADDR_WORK: 2;
        /**
         * Indicates an address of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an address of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly ADDR_OTHER: 3;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the city where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the city where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        city?: string;
        /**
         * Indicates the country/region where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the country/region where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        country?: string;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the neighborhood where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the neighborhood where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        neighborhood?: string;
        /**
         * Indicates the post box of this contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the post box of this contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        pobox?: string;
        /**
         * Indicates the postal address of this contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the postal address of this contact.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        postalAddress: string;
        /**
         * Indicates the postal code of this contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the postal code of this contact.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        postcode?: string;
        /**
         * Indicates the area where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the area where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        region?: string;
        /**
         * Indicates the street where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the street where this contact is located.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        street?: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for relation information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for relation information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Relation {
        /**
         * Indicates custom relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates custom relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates assistant relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates assistant relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_ASSISTANT: 1;
        /**
         * Indicates brother relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates brother relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_BROTHER: 2;
        /**
         * Indicates child relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates child relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_CHILD: 3;
        /**
         * Indicates domestic partner relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates domestic partner relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_DOMESTIC_PARTNER: 4;
        /**
         * Indicates father relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates father relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_FATHER: 5;
        /**
         * Indicates friend relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates friend relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_FRIEND: 6;
        /**
         * Indicates manager relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates manager relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_MANAGER: 7;
        /**
         * Indicates mother relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates mother relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_MOTHER: 8;
        /**
         * Indicates parent relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates parent relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_PARENT: 9;
        /**
         * Indicates partner relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates partner relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_PARTNER: 10;
        /**
         * Indicates referrer relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates referrer relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_REFERRED_BY: 11;
        /**
         * Indicates relative relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates relative relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_RELATIVE: 12;
        /**
         * Indicates sister relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates sister relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_SISTER: 13;
        /**
         * Indicates spouse relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates spouse relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly RELATION_SPOUSE: 14;
        /**
         * Indicates invalid relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates invalid relationship type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the relation name.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the relation name.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        relationName: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for sip address information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for sip address information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class SipAddress {
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a custom label.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly CUSTOM_LABEL: 0;
        /**
         * Indicates a home SIP address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a home SIP address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly SIP_HOME: 1;
        /**
         * Indicates a work SIP address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates a work SIP address.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly SIP_WORK: 2;
        /**
         * Indicates an SIP address of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an SIP address of the OTHER type.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly SIP_OTHER: 3;
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates an invalid label ID.
         *
         * @readonly
         * @static
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        static readonly INVALID_LABEL_ID: -1;
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label name of an attribute.
         *
         * @type { ?string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelName?: string;
        /**
         * Indicates the SIP address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the SIP address.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        sipAddress: string;
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the label id.
         *
         * @type { ?number }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        labelId?: number;
    }
    /**
     * Provides methods for website information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @since 7
     */
    /**
     * Provides methods for website information
     *
     * @syscap SystemCapability.Applications.ContactsData
     * @atomicservice
     * @since 11
     */
    class Website {
        /**
         * Indicates the website.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @since 7
         */
        /**
         * Indicates the website.
         *
         * @type { string }
         * @syscap SystemCapability.Applications.ContactsData
         * @atomicservice
         * @since 11
         */
        website: string;
    }
}
export default contact;
