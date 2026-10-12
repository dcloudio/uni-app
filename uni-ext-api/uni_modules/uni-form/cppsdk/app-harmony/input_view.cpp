#include "input_view.h"

#include "dom/element.h"
#include "dom/native_view_element.h"
#include "event/custom_event.h"
#include "native_view/view_arkui_host.h"
#include <arkui/node_attributes/layout.h>
#include <arkui/node_attributes/text.h>
#include <arkui/node_attributes/text_common.h>
#include <arkui/node_attributes/text_input.h>
#include <algorithm>
#include <cctype>
#include <cmath>
#include <cstdio>
#include <cstdlib>
#include <memory>
#include <string_view>
#include <utility>
#include <vector>

namespace uniappx::form {

namespace {

constexpr float kDefaultInputHeight = 24.0f;

std::string trim(const std::string &value) {
  size_t start = 0;
  while (start < value.size() &&
         std::isspace(static_cast<unsigned char>(value[start]))) {
    start++;
  }
  size_t end = value.size();
  while (end > start &&
         std::isspace(static_cast<unsigned char>(value[end - 1]))) {
    end--;
  }
  return value.substr(start, end - start);
}

uint32_t channelToByte(float value) {
  return static_cast<uint32_t>(std::round(std::max(0.0f, std::min(255.0f, value))));
}

bool parseCssColor(const std::string &input, uint32_t &argb) {
  const std::string value = trim(input);
  if (value.empty()) {
    return false;
  }

  std::string color = value;
  if (color[0] == '#') {
    color.erase(0, 1);
    if (color.size() == 3 || color.size() == 4) {
      std::string expanded;
      expanded.reserve(color.size() * 2);
      for (const char ch : color) {
        expanded.push_back(ch);
        expanded.push_back(ch);
      }
      color = expanded;
    }
    if (color.size() != 6 && color.size() != 8) {
      return false;
    }
    char *end = nullptr;
    const unsigned long parsed = std::strtoul(color.c_str(), &end, 16);
    if (end == color.c_str() || *end != '\0') {
      return false;
    }
    argb = color.size() == 8
        ? static_cast<uint32_t>((parsed & 0xFF) << 24 | (parsed >> 8))
        : static_cast<uint32_t>(0xFF000000UL | parsed);
    return true;
  }

  std::string lower;
  lower.reserve(color.size());
  for (const char ch : color) {
    lower.push_back(static_cast<char>(
        std::tolower(static_cast<unsigned char>(ch))));
  }
  if (lower == "transparent") {
    argb = 0x00000000;
    return true;
  }
  if (lower == "black") {
    argb = 0xFF000000;
    return true;
  }
  if (lower == "white") {
    argb = 0xFFFFFFFF;
    return true;
  }
  if (lower == "red") {
    argb = 0xFFFF0000;
    return true;
  }
  if (lower == "green") {
    argb = 0xFF008000;
    return true;
  }
  if (lower == "blue") {
    argb = 0xFF0000FF;
    return true;
  }
  if (lower == "gray" || lower == "grey") {
    argb = 0xFF808080;
    return true;
  }
  if (lower == "yellow") {
    argb = 0xFFFFFF00;
    return true;
  }

  const bool is_rgba = lower.rfind("rgba(", 0) == 0;
  const bool is_rgb = lower.rfind("rgb(", 0) == 0;
  if (!is_rgba && !is_rgb || lower.back() != ')') {
    return false;
  }
  const size_t start = lower.find('(');
  const std::string body = lower.substr(start + 1, lower.size() - start - 2);
  float red = 0;
  float green = 0;
  float blue = 0;
  float alpha = 1;
  if (is_rgba) {
    if (std::sscanf(body.c_str(), " %f , %f , %f , %f",
                    &red, &green, &blue, &alpha) != 4) {
      return false;
    }
  } else if (std::sscanf(body.c_str(), " %f , %f , %f",
                         &red, &green, &blue) != 3) {
    return false;
  }
  if (alpha <= 1.0f) {
    alpha *= 255.0f;
  }
  argb = (channelToByte(alpha) << 24) |
         (channelToByte(red) << 16) |
         (channelToByte(green) << 8) |
         channelToByte(blue);
  return true;
}

float parseDimension(const std::string &value) {
  if (value.empty()) {
    return 0.0f;
  }
  return std::max(0.0f, std::strtof(value.c_str(), nullptr));
}

int32_t utf16Length(const std::string &value) {
  int32_t length = 0;
  size_t index = 0;
  while (index < value.size()) {
    const auto first = static_cast<unsigned char>(value[index]);
    uint32_t code_point = first;
    size_t sequence_length = 1;
    if ((first & 0xE0) == 0xC0) {
      code_point = first & 0x1F;
      sequence_length = 2;
    } else if ((first & 0xF0) == 0xE0) {
      code_point = first & 0x0F;
      sequence_length = 3;
    } else if ((first & 0xF8) == 0xF0) {
      code_point = first & 0x07;
      sequence_length = 4;
    }
    if (index + sequence_length > value.size()) {
      sequence_length = 1;
      code_point = first;
    } else {
      for (size_t offset = 1; offset < sequence_length; offset++) {
        const auto continuation =
            static_cast<unsigned char>(value[index + offset]);
        if ((continuation & 0xC0) != 0x80) {
          sequence_length = 1;
          code_point = first;
          break;
        }
        code_point = (code_point << 6) | (continuation & 0x3F);
      }
    }
    length += code_point > 0xFFFF ? 2 : 1;
    index += sequence_length;
  }
  return length;
}

bool splitConfiguration(const std::string &configuration,
                        std::vector<std::string> &fields) {
  constexpr char kEscape = '\x1e';
  constexpr char kSeparator = '\x1f';
  fields.clear();
  fields.reserve(26);
  std::string field;
  bool escaped = false;
  field.reserve(configuration.size());
  for (const char ch : configuration) {
    if (escaped) {
      field.push_back(ch);
      escaped = false;
    } else if (ch == kEscape) {
      escaped = true;
    } else if (ch == kSeparator) {
      fields.emplace_back(std::move(field));
      field.clear();
    } else {
      field.push_back(ch);
    }
  }
  if (escaped) {
    return false;
  }
  fields.emplace_back(std::move(field));
  return true;
}

struct ParsedInputConfiguration {
  std::string placeholder;
  bool enabled = true;
  int max_length = -1;
  std::string type = "text";
  bool password = false;
  int cursor = -1;
  int selection_start = -1;
  int selection_end = -1;
  std::string confirm_type = "done";
  bool confirm_hold = false;
  bool hold_keyboard = false;
  std::string font_size;
  std::string color;
  std::string line_height;
  std::string letter_spacing;
  std::string font_weight;
  std::string font_style;
  std::string font_family;
  std::string text_align;
  std::string direction;
  std::string padding_top;
  std::string padding_right;
  std::string padding_bottom;
  std::string padding_left;
  std::string cursor_color;
};

struct ParsedInputRuntimeState {
  std::string value;
  bool focus = false;
  bool auto_focus = false;
  int focus_request_version = 0;
  int page_touch_end_version = 0;
};

bool parseConfiguration(const std::string &configuration,
                        ParsedInputConfiguration &result) {
  std::vector<std::string> fields;
  if (!splitConfiguration(configuration, fields)) {
    return false;
  }
  // Stage 7 originally used the unversioned 25-field format. Keep accepting it
  // so the diagnostic component remains useful while production uses the
  // escaped, versioned format.
  size_t index = 0;
  if (fields.size() == 26 && fields[0] == "1") {
    index = 1;
  } else if (fields.size() != 25) {
    return false;
  }
  result.placeholder = fields[index++];
  result.enabled = fields[index++] == "1";
  result.max_length = std::atoi(fields[index++].c_str());
  result.type = fields[index++];
  result.password = fields[index++] == "1";
  result.cursor = std::atoi(fields[index++].c_str());
  result.selection_start = std::atoi(fields[index++].c_str());
  result.selection_end = std::atoi(fields[index++].c_str());
  result.confirm_type = fields[index++];
  result.confirm_hold = fields[index++] == "1";
  result.hold_keyboard = fields[index++] == "1";
  result.font_size = fields[index++];
  result.color = fields[index++];
  result.line_height = fields[index++];
  result.letter_spacing = fields[index++];
  result.font_weight = fields[index++];
  result.font_style = fields[index++];
  result.font_family = fields[index++];
  result.text_align = fields[index++];
  result.direction = fields[index++];
  result.padding_top = fields[index++];
  result.padding_right = fields[index++];
  result.padding_bottom = fields[index++];
  result.padding_left = fields[index++];
  result.cursor_color = fields[index++];
  return true;
}

bool parseRuntimeState(const std::string &state,
                       ParsedInputRuntimeState &result) {
  std::vector<std::string> fields;
  if (!splitConfiguration(state, fields) || fields.size() != 6 ||
      fields[0] != "1") {
    return false;
  }
  result.value = std::move(fields[1]);
  result.focus = fields[2] == "1";
  result.auto_focus = fields[3] == "1";
  result.focus_request_version = std::atoi(fields[4].c_str());
  result.page_touch_end_version = std::atoi(fields[5].c_str());
  return true;
}

} // namespace

NativeInputView::~NativeInputView() {
  if (!input_node_) {
    return;
  }
  UniAppX_ArkUIModuleInterface->unregisterNodeEvent(
      input_node_, uses_preview_change_event_
          ? NODE_TEXT_INPUT_ON_CHANGE_WITH_PREVIEW_TEXT
          : NODE_TEXT_INPUT_ON_CHANGE);
  UniAppX_ArkUIModuleInterface->unregisterNodeEvent(input_node_, NODE_ON_FOCUS);
  UniAppX_ArkUIModuleInterface->unregisterNodeEvent(input_node_, NODE_ON_BLUR);
  UniAppX_ArkUIModuleInterface->unregisterNodeEvent(input_node_, NODE_TEXT_INPUT_ON_SUBMIT);
  UniAppX_ArkUIModuleInterface->unregisterNodeEvent(
      input_node_, NODE_TEXT_INPUT_ON_TEXT_SELECTION_CHANGE);
  UniAppX_ArkUIModuleInterface->removeNodeEventReceiver(input_node_, onInputEvent);
  // Once bound, the native-view host owns the ArkUI subtree lifecycle. During
  // page close the host and the component are torn down concurrently; removing
  // or disposing the TextInput here can race with the host's own destruction
  // and enter TextFieldPattern::OnDetachFromFrameNode twice. Detach callbacks
  // from this instance, then let the host release its bound node.
  input_node_ = nullptr;
  native_view_element_ = nullptr;
  element_ = nullptr;
}

void NativeInputView::setElement(Element *element) {
  auto *next_native_view_element = dynamic_cast<NativeViewElement *>(element);
  // Vapor invokes element refs from the render effect, so reactive property
  // changes can report the same element again. Rebinding the same ArkUI node
  // can interrupt an in-flight focus request and lose the initial keyboard
  // avoidance pass.
  if (next_native_view_element == native_view_element_) {
    element_ = native_view_element_ ? element : nullptr;
    return;
  }

  // A template ref can also be cleared and rebound when a native-view is
  // recreated (for example by v-if or list reuse). Detach the owned ArkUI node
  // from the old host before retaining the new element pointer.
  if (native_view_element_ && input_node_) {
    native_view_element_->bindHarmonyNativeNode(nullptr);
  }
  native_view_element_ = next_native_view_element;
  element_ = native_view_element_ ? element : nullptr;
  if (!native_view_element_) {
    return;
  }
  // A percentage-sized ArkUI node can only fill an already measured
  // native-view; it cannot provide the native-view's intrinsic size back to
  // UniLayout. Report the available width explicitly so a default input also
  // fills a row when the caller did not add flex: 1 or an explicit width.
  // The callback is intentionally stateless because it may run off the main
  // thread.
  native_view_element_->setMeasureCallback(
      [](const UniNativeMeasureSpecification &specification)
          -> UniNativeMeasureSize {
        const float measured_width = std::max(0.0f, specification.width);
        float measured_height = kDefaultInputHeight;
        if (specification.heightMode == UniNativeMeasureMode::Exactly) {
          measured_height = std::max(0.0f, specification.height);
        } else if (specification.heightMode == UniNativeMeasureMode::AtMost) {
          measured_height = std::max(
              0.0f, std::min(kDefaultInputHeight, specification.height));
        }
        return UniNativeMeasureSize(measured_width, measured_height);
      });
  if (input_node_) {
    native_view_element_->bindHarmonyNativeNode(input_node_);
  } else {
    ensureInputNode();
  }
}

void NativeInputView::setBatchedElement(Element *element) {
  waits_for_configuration_ = true;
  setElement(element);
}

void NativeInputView::setRuntimeBatchedElement(Element *element) {
  waits_for_configuration_ = true;
  waits_for_runtime_state_ = true;
  setElement(element);
}

void NativeInputView::applyConfiguration(const std::string &configuration) {
  ParsedInputConfiguration next;
  if (!parseConfiguration(configuration, next)) {
    // A malformed or newer payload must not leave the input permanently
    // blank. Fall back to the cached defaults; a later valid payload can still
    // update the live node through the normal diff path.
    configuration_ready_ = true;
    ensureInputNode();
    return;
  }

  const auto cache_configuration = [this, &next]() {
    placeholder_ = next.placeholder;
    enabled_ = next.enabled;
    max_length_ = next.max_length;
    type_ = next.type;
    password_ = next.password;
    cursor_ = next.cursor;
    selection_start_ = next.selection_start;
    selection_end_ = next.selection_end;
    confirm_type_ = next.confirm_type;
    confirm_hold_ = next.confirm_hold;
    hold_keyboard_ = next.hold_keyboard;
    font_size_value_ = next.font_size;
    const float parsed_font_size = next.font_size.empty()
        ? 16.0f
        : std::strtof(next.font_size.c_str(), nullptr);
    font_size_ = parsed_font_size > 0 ? parsed_font_size : 16.0f;
    color_ = next.color;
    line_height_ = next.line_height;
    letter_spacing_ = next.letter_spacing;
    font_weight_ = next.font_weight;
    font_style_ = next.font_style;
    font_family_ = next.font_family;
    text_align_ = next.text_align;
    direction_ = next.direction;
    padding_top_ = next.padding_top;
    padding_right_ = next.padding_right;
    padding_bottom_ = next.padding_bottom;
    padding_left_ = next.padding_left;
    cursor_color_ = next.cursor_color;
  };

  // First configuration is cached before node creation, matching the old
  // BuilderNode flow: construct the TextInput once with its final initial
  // state instead of creating defaults and replaying every setter.
  if (!configuration_ready_ || !input_node_) {
    cache_configuration();
    configuration_ready_ = true;
    ensureInputNode();
    return;
  }

  if (placeholder_ != next.placeholder) setPlaceholder(next.placeholder);
  if (enabled_ != next.enabled) setEnabled(next.enabled);
  if (max_length_ != next.max_length) setMaxLength(next.max_length);

  if (type_ != next.type || password_ != next.password) {
    password_ = next.password;
    setType(next.type);
  }

  const bool cursor_changed = cursor_ != next.cursor;
  const bool selection_changed = selection_start_ != next.selection_start ||
                                 selection_end_ != next.selection_end;
  if (cursor_changed || selection_changed) {
    cursor_ = next.cursor;
    selection_start_ = next.selection_start;
    selection_end_ = next.selection_end;
    if (selection_start_ >= 0 && selection_end_ >= selection_start_) {
      setSelection(selection_start_, selection_end_);
    } else if (cursor_ >= 0) {
      cursor_ = std::min(cursor_, utf16Length(value_));
      setIntAttribute(NODE_TEXT_INPUT_CARET_OFFSET, cursor_);
    } else if (cursor_changed) {
      resetAttribute(NODE_TEXT_INPUT_CARET_OFFSET);
    }
  }

  if (confirm_type_ != next.confirm_type) updateConfirmType(next.confirm_type);
  if (confirm_hold_ != next.confirm_hold) updateConfirmHold(next.confirm_hold);
  hold_keyboard_ = next.hold_keyboard;

  if (font_size_value_ != next.font_size) updateFontSize(next.font_size);
  if (color_ != next.color) updateColor(next.color);
  if (line_height_ != next.line_height) updateLineHeight(next.line_height);
  if (letter_spacing_ != next.letter_spacing) {
    updateLetterSpacing(next.letter_spacing);
  }
  if (font_weight_ != next.font_weight) updateFontWeight(next.font_weight);
  if (font_style_ != next.font_style) updateFontStyle(next.font_style);
  if (font_family_ != next.font_family) updateFontFamily(next.font_family);
  if (text_align_ != next.text_align) updateTextAlign(next.text_align);
  if (direction_ != next.direction) updateDirection(next.direction);

  if (padding_top_ != next.padding_top ||
      padding_right_ != next.padding_right ||
      padding_bottom_ != next.padding_bottom ||
      padding_left_ != next.padding_left) {
    padding_top_ = next.padding_top;
    padding_right_ = next.padding_right;
    padding_bottom_ = next.padding_bottom;
    padding_left_ = next.padding_left;
    updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
  }
  if (cursor_color_ != next.cursor_color) updateCursorColor(next.cursor_color);
}

void NativeInputView::applyRuntimeState(const std::string &state) {
  ParsedInputRuntimeState next;
  if (!parseRuntimeState(state, next)) {
    // Never leave the native node waiting forever when receiving an unknown
    // payload version. Defaults remain usable and a later valid state can
    // still update the live node.
    runtime_state_ready_ = true;
    ensureInputNode();
    return;
  }

  if (!runtime_state_ready_) {
    value_ = std::move(next.value);
    focus_requested_ = next.focus;
    is_focused_ = next.focus;
    auto_focus_ = next.auto_focus;
    focus_request_version_ = next.focus_request_version;
    page_touch_end_version_ = next.page_touch_end_version;
    runtime_state_ready_ = true;
    ensureInputNode();
    return;
  }

  if (value_ != next.value) {
    setValue(next.value);
  }

  const bool focus_changed = focus_requested_ != next.focus;
  const bool auto_focus_changed = auto_focus_ != next.auto_focus;
  const bool replay_focus =
      focus_request_version_ != next.focus_request_version;
  focus_requested_ = next.focus;
  focus_request_version_ = next.focus_request_version;

  // Preserve the old bridge order: focus is applied before auto-focus so the
  // latter wins when both are requested in the same render pass. A value-only
  // update must never replay false focus and blur an actively edited input.
  if (focus_changed || replay_focus) {
    updateFocus(next.focus);
  }
  if (auto_focus_changed || replay_focus) {
    updateAutoFocus(next.auto_focus);
  }

  if (page_touch_end_version_ != next.page_touch_end_version) {
    page_touch_end_version_ = next.page_touch_end_version;
    handlePageTouchEndFocus(page_touch_end_version_);
  }
}

void NativeInputView::ensureInputNode() {
  if (input_node_ || !native_view_element_ ||
      (waits_for_configuration_ && !configuration_ready_) ||
      (waits_for_runtime_state_ && !runtime_state_ready_)) {
    return;
  }
  input_node_ = UniAppX_ArkUIModuleInterface->createNode(ARKUI_NODE_TEXT_INPUT);
  if (!input_node_) {
    return;
  }
  UniAppX_ArkUIModuleInterface->addNodeEventReceiver(input_node_, onInputEvent);
  uses_preview_change_event_ =
      UniAppX_ArkUIModuleInterface->registerNodeEvent(
          input_node_, NODE_TEXT_INPUT_ON_CHANGE_WITH_PREVIEW_TEXT, 0, this) == 0;
  if (!uses_preview_change_event_) {
    UniAppX_ArkUIModuleInterface->registerNodeEvent(
        input_node_, NODE_TEXT_INPUT_ON_CHANGE, 0, this);
  }
  UniAppX_ArkUIModuleInterface->registerNodeEvent(input_node_, NODE_ON_FOCUS, 0, this);
  UniAppX_ArkUIModuleInterface->registerNodeEvent(input_node_, NODE_ON_BLUR, 0, this);
  UniAppX_ArkUIModuleInterface->registerNodeEvent(input_node_, NODE_TEXT_INPUT_ON_SUBMIT, 0, this);
  UniAppX_ArkUIModuleInterface->registerNodeEvent(
      input_node_, NODE_TEXT_INPUT_ON_TEXT_SELECTION_CHANGE, 0, this);
  ArkUI_NumberValue percent[] = {{.f32 = 1.0f}};
  ArkUI_AttributeItem width = {percent, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, NODE_WIDTH_PERCENT, &width);
  ArkUI_AttributeItem height = {percent, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, NODE_HEIGHT_PERCENT, &height);
  // Keep the native node visually neutral. The UVUE wrapper owns the box style
  // and placeholder, while this node owns text editing and selection.
  setColorAttribute(NODE_BACKGROUND_COLOR, "#00000000");
  setStringAttribute(NODE_TEXT_INPUT_PLACEHOLDER, placeholder_);
  setColorAttribute(NODE_TEXT_INPUT_PLACEHOLDER_COLOR, "#00000000");
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_UNDERLINE, false);
  setFourFloatAttribute(NODE_PADDING, 0.0f, 0.0f, 0.0f, 0.0f);
  setFourFloatAttribute(NODE_BORDER_RADIUS, 0.0f, 0.0f, 0.0f, 0.0f);
  setStringAttribute(NODE_TEXT_INPUT_TEXT, value_);
  setBoolAttribute(NODE_ENABLED, enabled_);
  if (max_length_ >= 0) {
    setIntAttribute(NODE_TEXT_INPUT_MAX_LENGTH, max_length_);
  }
  setIntAttribute(NODE_TEXT_INPUT_TYPE, getInputType());
  setBoolAttribute(NODE_TEXT_INPUT_ENABLE_KEYBOARD_ON_FOCUS, type_ != "none");
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_KEYBOARD_ON_FOCUS, type_ != "none");
  if (uses_preview_change_event_) {
    setBoolAttribute(NODE_TEXT_INPUT_ENABLE_PREVIEW_TEXT, true);
  }
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_PASSWORD_ICON, false);
  setBoolAttribute(NODE_TEXT_INPUT_BLUR_ON_SUBMIT, !confirm_hold_);
  updateConfirmType(confirm_type_);
  setFloatAttribute(NODE_FONT_SIZE, font_size_);
  if (!color_.empty()) {
    updateColor(color_);
  }
  if (!line_height_.empty()) {
    updateLineHeight(line_height_);
  }
  if (!letter_spacing_.empty()) {
    updateLetterSpacing(letter_spacing_);
  }
  if (!font_weight_.empty()) {
    updateFontWeight(font_weight_);
  }
  if (!font_style_.empty()) {
    updateFontStyle(font_style_);
  }
  if (!font_family_.empty()) {
    updateFontFamily(font_family_);
  }
  if (!text_align_.empty()) {
    updateTextAlign(text_align_);
  }
  if (!direction_.empty()) {
    updateDirection(direction_);
  }
  updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
  if (!cursor_color_.empty()) {
    updateCursorColor(cursor_color_);
  }
  applyRequestedSelection();
  // Configure the TextInput while it is detached. Binding first makes every
  // setAttribute call invalidate the live render tree, which is especially
  // expensive when a page creates many inputs at once.
  native_view_element_->bindHarmonyNativeNode(input_node_);
  // Attribute updates can arrive before setElement() creates the ArkUI node.
  // Replay the requested focus after all input state has been restored.
  setBoolAttribute(NODE_FOCUS_STATUS, is_focused_ || auto_focus_);
}

void NativeInputView::onInputEvent(ArkUI_NodeEvent *event) {
  auto *self = static_cast<NativeInputView *>(OH_ArkUI_NodeEvent_GetUserData(event));
  if (!self || !self->element_) {
    return;
  }

  const auto type = OH_ArkUI_NodeEvent_GetEventType(event);
  if (type == NODE_TEXT_INPUT_ON_CHANGE_WITH_PREVIEW_TEXT) {
    auto *change_event = OH_ArkUI_NodeEvent_GetTextChangeEvent(event);
    const char *value = change_event && change_event->pStr
        ? change_event->pStr
        : "";
    const bool composing = change_event && change_event->pExtendStr
        && change_event->pExtendStr[0] != '\0';
    self->value_ = value;
    self->dispatchInputEvent("input", value, self->getCursor(), composing);
  } else if (type == NODE_TEXT_INPUT_ON_CHANGE) {
    auto *change_event = OH_ArkUI_NodeEvent_GetStringAsyncEvent(event);
    const char *value = change_event && change_event->pStr ? change_event->pStr : "";
    self->value_ = value;
    self->dispatchInputEvent("input", value, self->getCursor());
  } else if (type == NODE_ON_FOCUS) {
    self->is_focused_ = true;
    self->focus_value_ = self->value_;
    // ArkUI places the caret at the end when focus is established. Selection
    // attributes written before the asynchronous focus transition are
    // therefore overwritten, so replay them after the real focus event.
    self->applyRequestedSelection();
    self->dispatchInputEvent("focus", self->value_.c_str(), self->getCursor());
  } else if (type == NODE_ON_BLUR) {
    self->is_focused_ = false;
    if (self->value_ != self->focus_value_) {
      self->dispatchInputEvent("change", self->value_.c_str());
    }
    self->dispatchInputEvent("blur", self->value_.c_str(), self->getCursor());
  } else if (type == NODE_TEXT_INPUT_ON_SUBMIT) {
    self->dispatchInputEvent("confirm", self->value_.c_str());
  } else if (type == NODE_TEXT_INPUT_ON_TEXT_SELECTION_CHANGE) {
    auto *component_event = OH_ArkUI_NodeEvent_GetNodeComponentEvent(event);
    if (component_event) {
      self->cursor_ = component_event->data[1].i32;
    }
  }
}

void NativeInputView::dispatchInputEvent(const char *type, const char *value,
                                          int cursor, bool composing) {
  if (!element_ || !element_->GetNativeView()) {
    return;
  }

  UniAttributeMap detail;
  if (value) {
    detail.emplace("value", std::string(value));
  }
  if (std::string_view(type) == "focus") {
    detail.emplace("height", 0);
  }
  if (cursor >= 0) {
    detail.emplace("cursor", cursor);
  }
  if (std::string_view(type) == "input") {
    detail.emplace("composing", composing);
  }
  element_->GetNativeView()->DispatchEvent(std::make_shared<NativeViewEvent>(
      type, NativeViewEventDetail(std::move(detail))));
}

void NativeInputView::setStringAttribute(ArkUI_NodeAttributeType type,
                                          const std::string &value) {
  if (!input_node_) return;
  ArkUI_AttributeItem item = {nullptr, 0, value.c_str()};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::setBoolAttribute(ArkUI_NodeAttributeType type, bool value) {
  if (!input_node_) return;
  ArkUI_NumberValue values[] = {{.i32 = value ? 1 : 0}};
  ArkUI_AttributeItem item = {values, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::setIntAttribute(ArkUI_NodeAttributeType type, int32_t value) {
  if (!input_node_) return;
  ArkUI_NumberValue values[] = {{.i32 = value}};
  ArkUI_AttributeItem item = {values, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::setFloatAttribute(ArkUI_NodeAttributeType type, float value) {
  if (!input_node_) return;
  ArkUI_NumberValue values[] = {{.f32 = value}};
  ArkUI_AttributeItem item = {values, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::setFourFloatAttribute(ArkUI_NodeAttributeType type,
                                            float first, float second,
                                            float third, float fourth) {
  if (!input_node_) return;
  ArkUI_NumberValue values[] = {
      {.f32 = first},
      {.f32 = second},
      {.f32 = third},
      {.f32 = fourth},
  };
  ArkUI_AttributeItem item = {values, 4};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::setColorAttribute(ArkUI_NodeAttributeType type,
                                        const std::string &value) {
  if (!input_node_ || value.empty()) return;

  uint32_t argb = 0;
  if (!parseCssColor(value, argb)) return;
  ArkUI_NumberValue values[] = {{.u32 = argb}};
  ArkUI_AttributeItem item = {values, 1};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, type, &item);
}

void NativeInputView::resetAttribute(ArkUI_NodeAttributeType type) {
  if (!input_node_) return;
  UniAppX_ArkUIModuleInterface->resetAttribute(input_node_, type);
}

void NativeInputView::setValue(const std::string &value) {
  if (value_ == value) {
    return;
  }
  const int previous_cursor = is_focused_ ? getCursor() : -1;
  value_ = value;
  ensureInputNode();
  setStringAttribute(NODE_TEXT_INPUT_TEXT, value_);
  if (previous_cursor >= 0) {
    cursor_ = std::min(previous_cursor, utf16Length(value_));
    setIntAttribute(NODE_TEXT_INPUT_CARET_OFFSET, cursor_);
  }
}

void NativeInputView::setPlaceholder(const std::string &placeholder) {
  placeholder_ = placeholder;
  ensureInputNode();
  // Placeholder is rendered by the UVUE text node so placeholder-style and
  // placeholder-class keep the same behavior as other platforms. Keep a
  // transparent native placeholder for input semantics and accessibility.
  setStringAttribute(NODE_TEXT_INPUT_PLACEHOLDER, placeholder_);
  setColorAttribute(NODE_TEXT_INPUT_PLACEHOLDER_COLOR, "#00000000");
}

void NativeInputView::setEnabled(bool enabled) {
  enabled_ = enabled;
  ensureInputNode();
  setBoolAttribute(NODE_ENABLED, enabled_);
}

void NativeInputView::setMaxLength(int max_length) {
  max_length_ = max_length;
  ensureInputNode();
  if (max_length_ >= 0) {
    setIntAttribute(NODE_TEXT_INPUT_MAX_LENGTH, max_length_);
  } else {
    resetAttribute(NODE_TEXT_INPUT_MAX_LENGTH);
  }
}

void NativeInputView::setType(const std::string &type) {
  const bool was_none = type_ == "none";
  type_ = type;
  ensureInputNode();
  setIntAttribute(NODE_TEXT_INPUT_TYPE, getInputType());
  const bool show_keyboard = type_ != "none";
  setBoolAttribute(NODE_TEXT_INPUT_ENABLE_KEYBOARD_ON_FOCUS, show_keyboard);
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_KEYBOARD_ON_FOCUS, show_keyboard);
  if (is_focused_ && !show_keyboard) {
    setBoolAttribute(NODE_TEXT_INPUT_EDITING, false);
  } else if (is_focused_ && was_none && show_keyboard) {
    setBoolAttribute(NODE_TEXT_INPUT_EDITING, true);
  }
}

int NativeInputView::getInputType() const {
  if (password_) {
    return ARKUI_TEXTINPUT_TYPE_PASSWORD;
  }
  int input_type = ARKUI_TEXTINPUT_TYPE_NORMAL;
  if (type_ == "number") {
    input_type = ARKUI_TEXTINPUT_TYPE_NUMBER;
  } else if (type_ == "digit") {
    input_type = ARKUI_TEXTINPUT_TYPE_NUMBER_DECIMAL;
  } else if (type_ == "tel") {
    input_type = ARKUI_TEXTINPUT_TYPE_PHONE_NUMBER;
  } else if (type_ == "email") {
    input_type = ARKUI_TEXTINPUT_TYPE_EMAIL;
  } else if (type_ == "url") {
    // ArkUI ETS exposes URL as InputType.URL = 13, but the native C header
    // does not declare the corresponding enum value.
    input_type = 13;
  } else if (type_ == "safe-password") {
    input_type = ARKUI_TEXTINPUT_TYPE_PASSWORD;
  } else if (type_ == "password") {
    input_type = ARKUI_TEXTINPUT_TYPE_PASSWORD;
  }
  return input_type;
}

void NativeInputView::setPassword(bool password) {
  password_ = password;
  ensureInputNode();
  setIntAttribute(NODE_TEXT_INPUT_TYPE, getInputType());
  const bool show_keyboard = type_ != "none";
  setBoolAttribute(NODE_TEXT_INPUT_ENABLE_KEYBOARD_ON_FOCUS, show_keyboard);
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_KEYBOARD_ON_FOCUS, show_keyboard);
  setBoolAttribute(NODE_TEXT_INPUT_SHOW_PASSWORD_ICON, false);
}

void NativeInputView::updateAutoFocus(bool auto_focus) {
  auto_focus_ = auto_focus;
  ensureInputNode();
  if (auto_focus_) {
    setBoolAttribute(NODE_FOCUS_STATUS, true);
  }
}

void NativeInputView::updateFontSize(const std::string &value) {
  font_size_value_ = value;
  ensureInputNode();
  const float font_size = value.empty() ? 16.0f : std::strtof(value.c_str(), nullptr);
  if (font_size > 0) {
    font_size_ = font_size;
    setFloatAttribute(NODE_FONT_SIZE, font_size_);
  } else {
    font_size_ = 16.0f;
    resetAttribute(NODE_FONT_SIZE);
  }
  if (!line_height_.empty()) {
    updateLineHeight(line_height_);
  }
}

void NativeInputView::updateColor(const std::string &value) {
  color_ = value;
  ensureInputNode();
  if (value.empty()) {
    resetAttribute(NODE_FONT_COLOR);
  } else {
    setColorAttribute(NODE_FONT_COLOR, value);
  }
}

void NativeInputView::updateLineHeight(const std::string &value) {
  line_height_ = value;
  ensureInputNode();
  const std::string normalized = trim(value);
  if (normalized.empty() || normalized == "normal") {
    resetAttribute(NODE_TEXT_INPUT_LINE_HEIGHT);
    return;
  }
  float line_height = std::strtof(normalized.c_str(), nullptr);
  if (normalized.size() >= 2 &&
      normalized.substr(normalized.size() - 2) == "em") {
    line_height *= font_size_;
  } else if (!normalized.ends_with("px")) {
    if (normalized.ends_with("%")) {
      line_height = line_height / 100.0f * font_size_;
    } else {
      line_height *= font_size_;
    }
  }
  if (line_height > 0) {
    setFloatAttribute(NODE_TEXT_INPUT_LINE_HEIGHT, line_height);
  } else {
    resetAttribute(NODE_TEXT_INPUT_LINE_HEIGHT);
  }
}

void NativeInputView::updateLetterSpacing(const std::string &value) {
  letter_spacing_ = value;
  ensureInputNode();
  const std::string normalized = trim(value);
  if (normalized.empty() || normalized == "normal") {
    resetAttribute(NODE_TEXT_INPUT_LETTER_SPACING);
    return;
  }
  const float letter_spacing = std::strtof(normalized.c_str(), nullptr);
  if (std::isfinite(letter_spacing)) {
    setFloatAttribute(NODE_TEXT_INPUT_LETTER_SPACING, letter_spacing);
  } else {
    resetAttribute(NODE_TEXT_INPUT_LETTER_SPACING);
  }
}

void NativeInputView::updateFontWeight(const std::string &value) {
  font_weight_ = value;
  ensureInputNode();
  const std::string normalized = trim(value);
  if (normalized.empty()) {
    resetAttribute(NODE_FONT_WEIGHT);
    return;
  }
  if (normalized == "bold") {
    setIntAttribute(NODE_FONT_WEIGHT, ARKUI_FONT_WEIGHT_BOLD);
    return;
  }
  if (normalized == "normal" || normalized == "400") {
    setIntAttribute(NODE_FONT_WEIGHT, ARKUI_FONT_WEIGHT_W400);
    return;
  }
  if (normalized == "lighter") {
    setIntAttribute(NODE_FONT_WEIGHT, ARKUI_FONT_WEIGHT_LIGHTER);
    return;
  }
  if (normalized == "bolder") {
    setIntAttribute(NODE_FONT_WEIGHT, ARKUI_FONT_WEIGHT_BOLDER);
    return;
  }
  const int weight = std::atoi(normalized.c_str());
  if (weight >= 100 && weight <= 900) {
    const int rounded = ((weight + 50) / 100) * 100;
    setIntAttribute(NODE_FONT_WEIGHT,
                    (rounded - 100) / 100);
  } else {
    resetAttribute(NODE_FONT_WEIGHT);
  }
}

void NativeInputView::updateFontStyle(const std::string &value) {
  font_style_ = value;
  ensureInputNode();
  setIntAttribute(NODE_FONT_STYLE,
                  value == "italic" ? ARKUI_FONT_STYLE_ITALIC
                                    : ARKUI_FONT_STYLE_NORMAL);
}

void NativeInputView::updateFontFamily(const std::string &value) {
  font_family_ = value;
  ensureInputNode();
  if (value.empty()) {
    resetAttribute(NODE_FONT_FAMILY);
    return;
  }
  setStringAttribute(NODE_FONT_FAMILY, value);
}

void NativeInputView::updateTextAlign(const std::string &value) {
  text_align_ = value;
  ensureInputNode();
  int alignment = ARKUI_TEXT_ALIGNMENT_START;
  if (value == "center") {
    alignment = ARKUI_TEXT_ALIGNMENT_CENTER;
  } else if (value == "right") {
    alignment = ARKUI_TEXT_ALIGNMENT_END;
  } else if (value == "justify") {
    alignment = ARKUI_TEXT_ALIGNMENT_JUSTIFY;
  } else if (value == "left") {
    alignment = ARKUI_TEXT_ALIGNMENT_START;
  }
  setIntAttribute(NODE_TEXT_ALIGN, alignment);
}

void NativeInputView::updateDirection(const std::string &value) {
  direction_ = value;
  ensureInputNode();
  setIntAttribute(NODE_TEXT_INPUT_DIRECTION,
                  value == "rtl" ? ARKUI_DIRECTION_RTL : ARKUI_DIRECTION_LTR);
}

void NativeInputView::updatePaddingTop(const std::string &value) {
  padding_top_ = value;
  updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
}

void NativeInputView::updatePaddingRight(const std::string &value) {
  padding_right_ = value;
  updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
}

void NativeInputView::updatePaddingBottom(const std::string &value) {
  padding_bottom_ = value;
  updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
}

void NativeInputView::updatePaddingLeft(const std::string &value) {
  padding_left_ = value;
  updatePadding(padding_top_, padding_right_, padding_bottom_, padding_left_);
}

void NativeInputView::updatePadding(const std::string &top,
                                    const std::string &right,
                                    const std::string &bottom,
                                    const std::string &left) {
  ensureInputNode();
  ArkUI_NumberValue values[] = {
      {.f32 = parseDimension(top)},
      {.f32 = parseDimension(right)},
      {.f32 = parseDimension(bottom)},
      {.f32 = parseDimension(left)},
  };
  ArkUI_AttributeItem item = {values, 4};
  UniAppX_ArkUIModuleInterface->setAttribute(input_node_, NODE_PADDING, &item);
}

void NativeInputView::updateCursorColor(const std::string &value) {
  cursor_color_ = value;
  ensureInputNode();
  if (value.empty()) {
    resetAttribute(NODE_TEXT_INPUT_CARET_COLOR);
  } else {
    setColorAttribute(NODE_TEXT_INPUT_CARET_COLOR, value);
  }
}

void NativeInputView::updateHoldKeyboard(bool hold_keyboard) {
  hold_keyboard_ = hold_keyboard;
}

void NativeInputView::handlePageTouchEndFocus(int touch_end_version) {
  (void)touch_end_version;
  if (!hold_keyboard_ && is_focused_) {
    updateFocus(false);
  }
}

void NativeInputView::updateFocus(bool focus) {
  ensureInputNode();
  is_focused_ = focus;
  setBoolAttribute(NODE_FOCUS_STATUS, focus);
}

void NativeInputView::updateCursor(int cursor) {
  cursor_ = cursor >= 0 ? std::min(cursor, utf16Length(value_)) : cursor;
  ensureInputNode();
  if (cursor_ >= 0) {
    setIntAttribute(NODE_TEXT_INPUT_CARET_OFFSET, cursor_);
  } else {
    resetAttribute(NODE_TEXT_INPUT_CARET_OFFSET);
  }
}

void NativeInputView::setSelection(int selection_start, int selection_end) {
  if (!input_node_ || selection_start < 0 || selection_end < selection_start) {
    return;
  }
  const int32_t text_length = utf16Length(value_);
  selection_start = std::min(selection_start, text_length);
  selection_end = std::min(selection_end, text_length);
  ArkUI_NumberValue values[] = {
      {.i32 = selection_start},
      {.i32 = selection_end},
  };
  ArkUI_AttributeItem item = {values, 2};
  UniAppX_ArkUIModuleInterface->setAttribute(
      input_node_, NODE_TEXT_INPUT_TEXT_SELECTION, &item);
  cursor_ = selection_end;
}

void NativeInputView::applyRequestedSelection() {
  if (selection_start_ >= 0 && selection_end_ >= selection_start_) {
    setSelection(selection_start_, selection_end_);
  } else if (cursor_ >= 0) {
    cursor_ = std::min(cursor_, utf16Length(value_));
    setIntAttribute(NODE_TEXT_INPUT_CARET_OFFSET, cursor_);
  }
}

void NativeInputView::updateSelectionStart(int selection_start) {
  selection_start_ = selection_start;
  ensureInputNode();
  setSelection(selection_start_, selection_end_);
}

void NativeInputView::updateSelectionEnd(int selection_end) {
  selection_end_ = selection_end;
  ensureInputNode();
  setSelection(selection_start_, selection_end_);
}

void NativeInputView::updateConfirmType(const std::string &confirm_type) {
  confirm_type_ = confirm_type;
  ensureInputNode();
  int enter_key_type = ARKUI_ENTER_KEY_TYPE_DONE;
  if (confirm_type == "go") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_GO;
  } else if (confirm_type == "search") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_SEARCH;
  } else if (confirm_type == "send") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_SEND;
  } else if (confirm_type == "next") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_NEXT;
  } else if (confirm_type == "previous") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_PREVIOUS;
  } else if (confirm_type == "return") {
    enter_key_type = ARKUI_ENTER_KEY_TYPE_NEW_LINE;
  }
  setIntAttribute(NODE_TEXT_INPUT_ENTER_KEY_TYPE, enter_key_type);
}

void NativeInputView::updateConfirmHold(bool confirm_hold) {
  confirm_hold_ = confirm_hold;
  ensureInputNode();
  setBoolAttribute(NODE_TEXT_INPUT_BLUR_ON_SUBMIT, !confirm_hold_);
}

int NativeInputView::getCursor() const {
  if (input_node_) {
    const auto *item = UniAppX_ArkUIModuleInterface->getAttribute(
        input_node_, NODE_TEXT_INPUT_CARET_OFFSET);
    if (item && item->size > 0 && item->value[0].i32 >= 0) {
      return item->value[0].i32;
    }
  }
  return cursor_;
}

} // namespace uniappx::form
