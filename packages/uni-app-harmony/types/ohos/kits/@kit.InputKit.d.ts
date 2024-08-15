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
 * @kit InputKit
 */
import { ActionType, FourFingersSwipe, Pinch, Rotate, ThreeFingersSwipe, ThreeFingersTap } from '@ohos.multimodalInput.gestureEvent';
import infraredEmitter from '@ohos.multimodalInput.infraredEmitter';
import inputDevice from '@ohos.multimodalInput.inputDevice';
import inputDeviceCooperate from '@ohos.multimodalInput.inputDeviceCooperate';
import { InputEvent } from '@ohos.multimodalInput.inputEvent';
import { IntentionCode } from '@ohos.multimodalInput.intentionCode';
import { KeyCode } from '@ohos.multimodalInput.keyCode';
import { Action, Key, KeyEvent } from '@ohos.multimodalInput.keyEvent';
import { Action as MouseAction, Axis, AxisValue, Button, MouseEvent, ToolType as MouseToolType } from '@ohos.multimodalInput.mouseEvent';
import pointer from '@ohos.multimodalInput.pointer';
import { Action as KeyAction, SourceType, ToolType, Touch, TouchEvent } from '@ohos.multimodalInput.touchEvent';
export { Action, ActionType, Axis, AxisValue, Button, FourFingersSwipe, InputEvent, IntentionCode, Key, KeyAction, KeyCode, KeyEvent, MouseAction, MouseEvent, MouseToolType, Pinch, Rotate, SourceType, ThreeFingersSwipe, ThreeFingersTap, ToolType, Touch, TouchEvent, inputDevice, inputDeviceCooperate, pointer, infraredEmitter };
