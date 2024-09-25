/*
* Copyright (C) 2023-2023 Huawei Device Co., Ltd.
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
/**
 * @file
 * @kit ArkUI
 */

/// <reference path="../component/units.d.ts" />
import { ResourceStr } from 'GlobalResource';
/**
 * Control style of operation element
 * @enum { TreeListenType }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Control style of operation element
 * @enum { TreeListenType }
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare enum TreeListenType {
    /**
     * register listener after a node is clicked.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * register listener after a node is clicked.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    NODE_CLICK = "NodeClick",
    /**
     * register listener after a node is add.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * register listener after a node is add.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    NODE_ADD = "NodeAdd",
    /**
     * register listener after a node is delected.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * register listener after a node is delected.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    NODE_DELETE = "NodeDelete",
    /**
     * register listener after a node is modified.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * register listener after a node is modified.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    NODE_MODIFY = "NodeModify",
    /**
     * register listener after a node is moved.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * register listener after a node is moved.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    NODE_MOVE = "NodeMove"
}
/**
 * Declare class TreeListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare class TreeListener
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class TreeListener {
    /**
     * Event registration and processing.
     * The event will not be destroyed after being processed.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Event registration and processing.
     * The event will not be destroyed after being processed.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    on(type: TreeListenType, callback: (callbackParam: CallbackParam) => void): void;
    /**
     * Event registration and processing.
     * After the event is processed once, it will be destroyed.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Event registration and processing.
     * After the event is processed once, it will be destroyed.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    once(type: TreeListenType, callback: (callbackParam: CallbackParam) => void): void;
    /**
     * Destroy event.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Destroy event.
     *
     * @param { type } event Registered Events.
     * @param { callback }.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    off(type: TreeListenType, callback?: (callbackParam: CallbackParam) => void): void;
}
/**
 * Declare class TreeListenerManager
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare class TreeListenerManager
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class TreeListenerManager {
    /**
     * Get instance of treeListenerManager.
     * @return treeListenerManager instance
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get instance of treeListenerManager.
     * @return treeListenerManager instance
     * @static
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    static getInstance(): TreeListenerManager;
    /**
     * Get treeListener.
     * @return treeListener object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get treeListener.
     * @return treeListener object
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    getTreeListener(): TreeListener;
}
/**
 * Declare TreeView Component
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare TreeView Component
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 12
 */
@Component
export declare struct TreeView {
    /**
     * Node data source of TreeView.
     * @type TreeController
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Node data source of TreeView.
     * @type TreeController
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    treeController: TreeController;
}
/**
 * Declare CallbackParam
 * @typedef CallbackParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare CallbackParam
 * @typedef CallbackParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface CallbackParam {
    /**
     * Get the currentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get the currentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    currentNodeId: number;
    /**
     * Get the parentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get the parentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    parentNodeId?: number;
    /**
     * Get the childIndex.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Get the childIndex.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    childIndex?: number;
}
/**
 * Declare NodeParam
 * @typedef NodeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare NodeParam
 * @typedef NodeParam
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export interface NodeParam {
    /**
     * Set the parentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the parentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    parentNodeId?: number;
    /**
     * Set currentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set currentNodeId.
     * @type { number }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    currentNodeId?: number;
    /**
     * Set catalog whether is floder.
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set catalog whether is floder.
     * @type { boolean }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    isFolder?: boolean;
    /**
     * Set the icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set the icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    icon?: ResourceStr;
    /**
     * Set selected icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set selected icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    selectedIcon?: ResourceStr;
    /**
     * Set edit icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set edit icon resource.
     * @type { Resource }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    editIcon?: ResourceStr;
    /**
     * Set primary title content.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set primary title content.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    primaryTitle?: ResourceStr;
    /**
     * Set secondary title content.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Set secondary title content.
     * @type { ResourceStr }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    secondaryTitle?: ResourceStr;
    /**
     * set subcomponent binded on tree item.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * set subcomponent binded on tree item.
     * @type { () => void }
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    container?: () => void;
}
/**
 * Declare TreeController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @since 10
 */
/**
 * Declare TreeController
 * @syscap SystemCapability.ArkUI.ArkUI.Full
 * @atomicservice
 * @since 11
 */
export declare class TreeController {
    /**
     * Delete a node.
     * Register an ON_ITEM_DELETE callback through the ListTreeListener mechanism to obtain the IDs of all deleted nodes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Delete a node.
     * Register an ON_ITEM_DELETE callback through the ListTreeListener mechanism to obtain the IDs of all deleted nodes.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    removeNode(): void;
    /**
     * Modify the node name.
     * Register an ON_ITEM_MODIFY callback to obtain the ID, parent node ID, and node name of the modified node.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Modify the node name.
     * Register an ON_ITEM_MODIFY callback to obtain the ID, parent node ID, and node name of the modified node.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    modifyNode(): void;
    /**
     * Initialize the interface of the tree view. This interface is used to generate ListNodeDataSource data.
     * addNode is only designed for initialization. It can only be invoked during initialization.
     *
     * A maximum of 50 directory levels can be added.
     *
     * @param nodeParam Configuration information of the newly added node.
     *
     * For details, see the comment description of NodeParam.
     * @return ListTreeNode Tree view component proxy class.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * Initialize the interface of the tree view. This interface is used to generate ListNodeDataSource data.
     * addNode is only designed for initialization. It can only be invoked during initialization.
     *
     * A maximum of 50 directory levels can be added.
     *
     * @param nodeParam Configuration information of the newly added node.
     *
     * For details, see the comment description of NodeParam.
     * @return ListTreeNode Tree view component proxy class.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    addNode(nodeParam?: NodeParam): TreeController;
    /**
     * This interface is called when a secondaryTitle needs to be updated
     *
     * @param parentId ID of the parent node.
     * @param parentSubTitle secondaryTitle of parent node.
     * @param currentSubtitle secondaryTitle of current node.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * This interface is called when a secondaryTitle needs to be updated
     *
     * @param parentId ID of the parent node.
     * @param parentSubTitle secondaryTitle of parent node.
     * @param currentSubtitle secondaryTitle of current node.
     *
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    refreshNode(parentId: number, parentSubTitle: ResourceStr, currentSubtitle: ResourceStr): void;
    /**
     * After the initialization is complete by calling the addNode interface,
     * call this interface to complete initialization.
     *
     * This interface must be called when you finish initializing the ListTreeView by addNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @since 10
     */
    /**
     * After the initialization is complete by calling the addNode interface,
     * call this interface to complete initialization.
     *
     * This interface must be called when you finish initializing the ListTreeView by addNode.
     * @syscap SystemCapability.ArkUI.ArkUI.Full
     * @atomicservice
     * @since 11
     */
    buildDone(): void;
}
