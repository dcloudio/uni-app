/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
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
 * @file Provides accessibility extension context
 * @kit AccessibilityKit
 */
import type { AsyncCallback } from '../@ohos.base';
import ExtensionContext from './ExtensionContext';
import type accessibility from '../@ohos.accessibility';
import type { GesturePath } from '../@ohos.accessibility.GesturePath';
/**
 * The accessibility extension context. Used to configure, query information, and inject gestures.
 *
 * @extends ExtensionContext
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
export default class AccessibilityExtensionContext extends ExtensionContext {
    /**
     * Set the bundle names that is interested in sending the event.
     *
     * @param { Array<string> } targetNames The bundle names that are interested in sending the event.
     * @param { AsyncCallback<void> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    setTargetBundleName(targetNames: Array<string>, callback: AsyncCallback<void>): void;
    /**
     * Set the bundle names that is interested in sending the event.
     *
     * @param { Array<string> } targetNames The bundle names that are interested in sending the event.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    setTargetBundleName(targetNames: Array<string>): Promise<void>;
    /**
     * Get focus element.
     *
     * @param { boolean } isAccessibilityFocus Indicates whether the acquired element has an accessibility focus.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getFocusElement(isAccessibilityFocus: boolean, callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Get focus element.
     *
     * @param { boolean } isAccessibilityFocus Indicates whether the acquired element has an accessibility focus.
     * @returns { Promise<AccessibilityElement> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getFocusElement(isAccessibilityFocus?: boolean): Promise<AccessibilityElement>;
    /**
     * Get focus element.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getFocusElement(callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Get window root element.
     *
     * @param { number } windowId Indicates the window ID.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindowRootElement(windowId: number, callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Get window root element.
     *
     * @param { number } windowId Indicates the window ID.
     * @returns { Promise<AccessibilityElement> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindowRootElement(windowId?: number): Promise<AccessibilityElement>;
    /**
     * Get window root element.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindowRootElement(callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Get window list.
     *
     * @param { number } displayId Indicates the display ID.
     * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindows(displayId: number, callback: AsyncCallback<Array<AccessibilityElement>>): void;
    /**
     * Get window list.
     *
     * @param { number } displayId Indicates the display ID.
     * @returns { Promise<Array<AccessibilityElement>> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindows(displayId?: number): Promise<Array<AccessibilityElement>>;
    /**
     * Get window list.
     * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    getWindows(callback: AsyncCallback<Array<AccessibilityElement>>): void;
    /**
     * Inject gesture path events.
     *
     * @param { GesturePath } gesturePath Indicates the gesture path.
     * @param { AsyncCallback<void> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 10
     * @useinstead AccessibilityExtensionContext/AccessibilityExtensionContext#injectGestureSync
     */
    injectGesture(gesturePath: GesturePath, callback: AsyncCallback<void>): void;
    /**
     * Inject gesture path events.
     *
     * @param { GesturePath } gesturePath Indicates the gesture path.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 10
     * @useinstead AccessibilityExtensionContext/AccessibilityExtensionContext#injectGestureSync
     */
    injectGesture(gesturePath: GesturePath): Promise<void>;
    /**
     * Inject gesture path events.
     *
     * @param { GesturePath } gesturePath Indicates the gesture path.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300003 -  No accessibility permission to perform the operation.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 10
     * @deprecated since 12
     */
    injectGestureSync(gesturePath: GesturePath): void;
}
/**
 * Indicates an accessibility element.
 * Supports querying element attributes, requesting execution actions, and finding child elements by condition.
 *
 * @typedef AccessibilityElement
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
declare interface AccessibilityElement {
    /**
     * Get a list of attribute names.
     *
     * @param { AsyncCallback<Array<T>> } callback Indicates the listener.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    attributeNames<T extends keyof ElementAttributeValues>(callback: AsyncCallback<Array<T>>): void;
    /**
     * Get a list of attribute names.
     * @returns { Promise<Array<T>> }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    attributeNames<T extends keyof ElementAttributeValues>(): Promise<Array<T>>;
    /**
     * Get the value of an attribute.
     *
     * @param { T } attributeName Indicates the attribute name.
     * @param { AsyncCallback<ElementAttributeValues[T]> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300004 - This property does not exist.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    attributeValue<T extends keyof ElementAttributeValues>(attributeName: T, callback: AsyncCallback<ElementAttributeValues[T]>): void;
    /**
     * Get the value of an attribute.
     *
     * @param { T } attributeName Indicates the attribute name.
     * @returns { Promise<ElementAttributeValues[T]> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300004 - This property does not exist.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    attributeValue<T extends keyof ElementAttributeValues>(attributeName: T): Promise<ElementAttributeValues[T]>;
    /**
     * Get a list of supported actions.
     *
     * @param { AsyncCallback<Array<string>> } callback Indicates the listener.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    actionNames(callback: AsyncCallback<Array<string>>): void;
    /**
     * Get a list of supported actions.
     *
     * @returns { Promise<Array<string>> }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    actionNames(): Promise<Array<string>>;
    /**
     * Perform the specified action.
     *
     * @param { string } actionName Indicates the action name.
     * @param { object } parameters Indicates the parameters needed to execute the action.
     * @param { AsyncCallback<void> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300005 - This action is not supported.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    performAction(actionName: string, parameters: object, callback: AsyncCallback<void>): void;
    /**
     * Perform the specified action.
     *
     * @param { string } actionName Indicates the action name.
     * @param { object } parameters Indicates the parameters needed to execute the action.
     * @returns { Promise<void> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300005 - This action is not supported.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    performAction(actionName: string, parameters?: object): Promise<void>;
    /**
     * Perform the specified action.
     *
     * @param { string } actionName Indicates the action name.
     * @param { AsyncCallback<void> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @throws { BusinessError } 9300005 - This action is not supported.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    performAction(actionName: string, callback: AsyncCallback<void>): void;
    /**
     * Find elements that match the condition.
     *
     * @param { 'content' } type The type of query condition is content.
     * @param { string } condition Indicates the specific content to be queried.
     * @param { AsyncCallback<Array<AccessibilityElement>> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'content', condition: string, callback: AsyncCallback<Array<AccessibilityElement>>): void;
    /**
     * Find elements that match the condition.
     *
     * @param { 'content' } type The type of query condition is content.
     * @param { string } condition Indicates the specific content to be queried.
     * @returns { Promise<Array<AccessibilityElement>> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'content', condition: string): Promise<Array<AccessibilityElement>>;
    /**
     * Find elements that match the condition.
     *
     * @param { 'focusType' } type The type of query condition is focus type.
     * @param { FocusType } condition Indicates the type of focus to query.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'focusType', condition: FocusType, callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Find elements that match the condition.
     *
     * @param { 'focusType' } type The type of query condition is focus type.
     * @param { FocusType } condition Indicates the type of focus to query.
     * @returns { Promise<AccessibilityElement> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'focusType', condition: FocusType): Promise<AccessibilityElement>;
    /**
     * Find elements that match the condition.
     *
     * @param { 'focusDirection' } type The type of query condition is focus direction.
     * @param { FocusDirection } condition Indicates the direction of search focus to query.
     * @param { AsyncCallback<AccessibilityElement> } callback Indicates the listener.
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'focusDirection', condition: FocusDirection, callback: AsyncCallback<AccessibilityElement>): void;
    /**
     * Find elements that match the condition.
     *
     * @param { 'focusDirection' } type The type of query condition is focus direction.
     * @param { FocusDirection } condition Indicates the direction of search focus to query.
     * @returns { Promise<AccessibilityElement> }
     * @throws { BusinessError } 401 - Input parameter error. Possible causes:
     *     1. Mandatory parameters are left unspecified;
     *     2. Incorrect parameter types;
     *     3. Parameter verification failed.
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     * @deprecated since 12
     */
    findElement(type: 'focusDirection', condition: FocusDirection): Promise<AccessibilityElement>;
}
/**
 * Indicates the possible attributes of the element and the type of the attribute value.
 *
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
/**
 * Indicates the possible attributes of the element and the type of the attribute value.
 *
 * @typedef ElementAttributeValues
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 11
 */
interface ElementAttributeValues {
    /**
     * Indicates accessibility focus state.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    accessibilityFocused: boolean;
    /**
     * Indicates the bundle name to which it belongs.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    bundleName: string;
    /**
     * Indicates whether the element is checkable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    checkable: boolean;
    /**
     * Indicates whether the element is checked.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    checked: boolean;
    /**
     * Indicates all child elements.
     *
     * @type {Array<AccessibilityElement>}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    children: Array<AccessibilityElement>;
    /**
     * Indicates whether the element is clickable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    clickable: boolean;
    /**
     * Indicates the component ID to which the element belongs.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    componentId: number;
    /**
     * Indicates the component type to which the element belongs.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    componentType: string;
    /**
     * Indicates the content.
     *
     * @type {Array<string>}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    contents: Array<string>;
    /**
     * Indicates the index of the current item.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    currentIndex: number;
    /**
     * Indicates the description of the element.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    description: string;
    /**
     * Indicates whether the element is editable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    editable: boolean;
    /**
     * Indicates the list index of the last item displayed on the screen.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    endIndex: number;
    /**
     * Indicates the string of error state.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    error: string;
    /**
     * Indicates whether the element is focusable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    focusable: boolean;
    /**
     * Indicates the hint text.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    hintText: string;
    /**
     * Indicates the type of input text.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    inputType: number;
    /**
     * Indicates the inspector key.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    inspectorKey: string;
    /**
     * Indicates whether the element is active or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isActive: boolean;
    /**
     * Indicates whether the element is enable or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isEnable: boolean;
    /**
     * Indicates whether the element is hint state or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isHint: boolean;
    /**
     * Indicates whether the element is focused or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isFocused: boolean;
    /**
     * Indicates whether the element is password or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isPassword: boolean;
    /**
     * Indicates whether the element is visible or not.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    isVisible: boolean;
    /**
     * Indicates the total count of the items.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    itemCount: number;
    /**
     * Indicates the last content.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    lastContent: string;
    /**
     * Indicates the display layer of the element.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    layer: number;
    /**
     * Indicates whether the element is long clickable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    longClickable: boolean;
    /**
     * Indicates the page id.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    pageId: number;
    /**
     * Indicates the parent of the element.
     *
     * @type {AccessibilityElement}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    parent: AccessibilityElement;
    /**
     * Indicates whether the element supports multiple lines of text.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    pluralLineSupported: boolean;
    /**
     * Indicates the area of the element.
     *
     * @type {Rect}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    rect: Rect;
    /**
     * Indicates the resource name of the element.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    resourceName: string;
    /**
     * Indicates the root element of the window element.
     *
     * @type {AccessibilityElement}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    rootElement: AccessibilityElement;
    /**
     * Indicates the display area of the element.
     *
     * @type {Rect}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    screenRect: Rect;
    /**
     * Indicates whether the element is scrollable.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    scrollable: boolean;
    /**
     * Indicates whether the element is selected.
     *
     * @type {boolean}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    selected: boolean;
    /**
     * Indicates the list index of the first item displayed on the screen.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    startIndex: number;
    /**
     * Indicates the text of the element.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    text: string;
    /**
     * Indicates the maximum length limit of the element text.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    textLengthLimit: number;
    /**
     * Indicates the unit of movement of the element text as it is read.
     *
     * @type {accessibility.TextMoveUnit}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    textMoveUnit: accessibility.TextMoveUnit;
    /**
     * Indicates the action that triggered the element event.
     *
     * @type {accessibility.Action}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    triggerAction: accessibility.Action;
    /**
     * Indicates the window type of the element.
     *
     * @type {WindowType}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    type: WindowType;
    /**
     * Indicates the maximum value.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    valueMax: number;
    /**
     * Indicates the minimum value.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    valueMin: number;
    /**
     * Indicates the current value.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    valueNow: number;
    /**
     * Indicates the window id.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    windowId: number;
    /**
     * Indicates the offset.
     *
     * @type {number}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    offset: number;
    /**
     * Indicates the text type.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    textType: string;
    /**
     * Indicates the accessibility text of component.
     *
     * @type {string}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    accessibilityText: string;
    /**
     * Indicates the hot area of the element.
     *
     * @type {Rect}
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 12
     */
    hotArea: Rect;
}
/**
 * Indicates the direction of the search focus.
 *
 * @typedef {'up' | 'down' | 'left' | 'right' | 'forward' | 'backward'}
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type FocusDirection = 'up' | 'down' | 'left' | 'right' | 'forward' | 'backward';
/**
 * Indicates the type of the focus.
 *
 * @typedef {'accessibility' | 'normal'}
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type FocusType = 'accessibility' | 'normal';
/**
 * Indicates the type of the window.
 *
 * @typedef {'application' | 'system'}
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
type WindowType = 'application' | 'system';
/**
 * Indicates rectangle.
 *
 * @typedef Rect
 * @syscap SystemCapability.BarrierFree.Accessibility.Core
 * @since 9
 */
interface Rect {
    /**
     * The left position of Rect
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    left: number;
    /**
     * The top position of Rect
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    top: number;
    /**
     * The width position of Rect
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    width: number;
    /**
     * The height position of Rect
     *
     * @type { number }
     * @syscap SystemCapability.BarrierFree.Accessibility.Core
     * @since 9
     */
    height: number;
}
