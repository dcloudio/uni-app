/*
 * Copyright (c) 2021-2022 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License")
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
 * @kit ArkUI
 */

/// <reference path="./action_sheet.d.ts" />
/// <reference path="./alert_dialog.d.ts" />
/// <reference path="./alphabet_indexer.d.ts" />
/// <reference path="./animator.d.ts" />
/// <reference path="./badge.d.ts" />
/// <reference path="./blank.d.ts" />
/// <reference path="./button.d.ts" />
/// <reference path="./calendar.d.ts" />
/// <reference path="./calendar_picker.d.ts" />
/// <reference path="./canvas.d.ts" />
/// <reference path="./checkbox.d.ts" />
/// <reference path="./checkboxgroup.d.ts" />
/// <reference path="./circle.d.ts" />
/// <reference path="./column.d.ts" />
/// <reference path="./column_split.d.ts" />
/// <reference path="./common.d.ts" />
/// <reference path="./context_menu.d.ts" />
/// <reference path="./counter.d.ts" />
/// <reference path="./custom_dialog_controller.d.ts" />
/// <reference path="./data_panel.d.ts" />
/// <reference path="./date_picker.d.ts" />
/// <reference path="./divider.d.ts" />
/// <reference path="./ellipse.d.ts" />
/// <reference path="./enums.d.ts" />
/// <reference path="./focus.d.ts" />
/// <reference path="./folder_stack.d.ts" />
/// <reference path="./flex.d.ts" />
/// <reference path="./for_each.d.ts" />
/// <reference path="./form_component.d.ts" />
/// <reference path="./form_link.d.ts" />
/// <reference path="./gauge.d.ts" />
/// <reference path="./gesture.d.ts" />
/// <reference path="./grid.d.ts" />
/// <reference path="./gridItem.d.ts" />
/// <reference path="./grid_container.d.ts" />
/// <reference path="./hyperlink.d.ts" />
/// <reference path="./image.d.ts" />
/// <reference path="./image_animator.d.ts" />
/// <reference path="./image_common.d.ts" />
/// <reference path="./lazy_for_each.d.ts" />
/// <reference path="./line.d.ts" />
/// <reference path="./list.d.ts" />
/// <reference path="./list_item.d.ts" />
/// <reference path="./list_item_group.d.ts" />
/// <reference path="./loading_progress.d.ts" />
/// <reference path="./location_button.d.ts" />
/// <reference path="./matrix2d.d.ts" />
/// <reference path="./marquee.d.ts" />
/// <reference path="./media_cached_image.d.ts" />
/// <reference path="./menu.d.ts" />
/// <reference path="./menu_item.d.ts" />
/// <reference path="./menu_item_group.d.ts" />
/// <reference path="./nav_destination.d.ts" />
/// <reference path="./nav_router.d.ts" />
/// <reference path="./navigation.d.ts" />
/// <reference path="./navigator.d.ts" />
/// <reference path="./node_container.d.ts" />
/// <reference path="./page_transition.d.ts" />
/// <reference path="./panel.d.ts" />
/// <reference path="./particle.d.ts" />
/// <reference path="./paste_button.d.ts" />
/// <reference path="./path.d.ts" />
/// <reference path="./pattern_lock.d.ts" />
/// <reference path="./plugin_component.d.ts" />
/// <reference path="./polygon.d.ts" />
/// <reference path="./polyline.d.ts" />
/// <reference path="./progress.d.ts" />
/// <reference path="./qrcode.d.ts" />
/// <reference path="./radio.d.ts" />
/// <reference path="./rating.d.ts" />
/// <reference path="./rect.d.ts" />
/// <reference path="./refresh.d.ts" />
/// <reference path="./relative_container.d.ts" />
/// <reference path="./repeat.d.ts" />
/// <reference path="./rich_editor.d.ts" />
/// <reference path="./rich_text.d.ts" />
/// <reference path="./root_scene.d.ts" />
/// <reference path="./row.d.ts" />
/// <reference path="./row_split.d.ts" />
/// <reference path="./save_button.d.ts" />
/// <reference path="./screen.d.ts" />
/// <reference path="./scroll.d.ts" />
/// <reference path="./scroll_bar.d.ts" />
/// <reference path="./search.d.ts" />
/// <reference path="./security_component.d.ts" />
/// <reference path="./select.d.ts" />
/// <reference path="./shape.d.ts" />
/// <reference path="./slider.d.ts" />
/// <reference path="./span.d.ts" />
/// <reference path="./stack.d.ts" />
/// <reference path="./state_management.d.ts" />
/// <reference path="./stepper.d.ts" />
/// <reference path="./stepper_item.d.ts" />
/// <reference path="./swiper.d.ts" />
/// <reference path="./symbolglyph.d.ts" />
/// <reference path="./symbol_span.d.ts" />
/// <reference path="./tabs.d.ts" />
/// <reference path="./tab_content.d.ts" />
/// <reference path="./text.d.ts" />
/// <reference path="./text_area.d.ts" />
/// <reference path="./text_clock.d.ts" />
/// <reference path="./text_common.d.ts" />
/// <reference path="./text_input.d.ts" />
/// <reference path="./text_picker.d.ts" />
/// <reference path="./text_timer.d.ts" />
/// <reference path="./time_picker.d.ts" />
/// <reference path="./toggle.d.ts" />
/// <reference path="./with_theme.d.ts" />
/// <reference path="./units.d.ts" />
/// <reference path="./video.d.ts" />
/// <reference path="./web.d.ts" />
/// <reference path="./window_scene.d.ts" />
/// <reference path="./xcomponent.d.ts" />
/// <reference path="./sidebar.d.ts" />
/// <reference path="./ability_component.d.ts" />
/// <reference path="./remote_window.d.ts" />
/// <reference path="./common_ts_ets_api.d.ts" />
/// <reference path="./grid_row.d.ts" />
/// <reference path="./grid_col.d.ts" />
/// <reference path="./water_flow.d.ts" />
/// <reference path="./flow_item.d.ts" />
/// <reference path="./image_span.d.ts" />
/// <reference path="./effect_component.d.ts" />
/// <reference path="./ui_extension_component.d.ts" />
/// <reference path="./component3d.d.ts" />
/// <reference path="./container_span.d.ts" />
/// <reference path="./embedded_component.d.ts" />
/// <reference path="./styled_string.d.ts" />
/// <reference path="./content_slot.d.ts" />
