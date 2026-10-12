#pragma once

#include <arkui/native_node.h>
#include <cstdint>
#include <string>
#include "vue/uni_vue_component.h"

namespace uniappx {
class Element;
class NativeViewElement;
}

namespace uniappx::form {

class NativeInputView : public vue::UniVueComponent {
public:
  NativeInputView() = default;
  ~NativeInputView();

  void setElement(Element *element);
  void setBatchedElement(Element *element);
  void setRuntimeBatchedElement(Element *element);
  void applyConfiguration(const std::string &configuration);
  void applyRuntimeState(const std::string &state);
  void setValue(const std::string &value);
  void setPlaceholder(const std::string &placeholder);
  void setEnabled(bool enabled);
  void setMaxLength(int max_length);
  void setType(const std::string &type);
  void setPassword(bool password);
  void updateAutoFocus(bool auto_focus);
  void updateFontSize(const std::string &value);
  void updateColor(const std::string &value);
  void updateLineHeight(const std::string &value);
  void updateLetterSpacing(const std::string &value);
  void updateFontWeight(const std::string &value);
  void updateFontStyle(const std::string &value);
  void updateFontFamily(const std::string &value);
  void updateTextAlign(const std::string &value);
  void updateDirection(const std::string &value);
  void updatePaddingTop(const std::string &value);
  void updatePaddingRight(const std::string &value);
  void updatePaddingBottom(const std::string &value);
  void updatePaddingLeft(const std::string &value);
  void updateCursorColor(const std::string &value);
  void updateHoldKeyboard(bool hold_keyboard);
  void handlePageTouchEndFocus(int touch_end_version);
  void updateFocus(bool focus);
  void updateCursor(int cursor);
  void updateSelectionStart(int selection_start);
  void updateSelectionEnd(int selection_end);
  void updateConfirmType(const std::string &confirm_type);
  void updateConfirmHold(bool confirm_hold);

private:
  void ensureInputNode();
  void setStringAttribute(ArkUI_NodeAttributeType type, const std::string &value);
  void setBoolAttribute(ArkUI_NodeAttributeType type, bool value);
  void setIntAttribute(ArkUI_NodeAttributeType type, int32_t value);
  void setFloatAttribute(ArkUI_NodeAttributeType type, float value);
  void setFourFloatAttribute(ArkUI_NodeAttributeType type, float first,
                             float second, float third, float fourth);
  void setColorAttribute(ArkUI_NodeAttributeType type, const std::string &value);
  void resetAttribute(ArkUI_NodeAttributeType type);
  void updatePadding(const std::string &top, const std::string &right,
                     const std::string &bottom, const std::string &left);
  void setSelection(int selection_start, int selection_end);
  void applyRequestedSelection();
  int getInputType() const;
  int getCursor() const;
  static void onInputEvent(ArkUI_NodeEvent *event);
  void dispatchInputEvent(const char *type, const char *value = nullptr,
                          int cursor = -1, bool composing = false);

  Element *element_ = nullptr;
  NativeViewElement *native_view_element_ = nullptr;
  ArkUI_NodeHandle input_node_ = nullptr;
  std::string value_;
  std::string focus_value_;
  std::string placeholder_;
  std::string type_ = "text";
  bool enabled_ = true;
  bool password_ = false;
  bool auto_focus_ = false;
  bool hold_keyboard_ = false;
  bool is_focused_ = false;
  bool uses_preview_change_event_ = false;
  bool waits_for_configuration_ = false;
  bool configuration_ready_ = false;
  bool waits_for_runtime_state_ = false;
  bool runtime_state_ready_ = false;
  bool focus_requested_ = false;
  int focus_request_version_ = -1;
  int page_touch_end_version_ = 0;
  int max_length_ = -1;
  int cursor_ = -1;
  int selection_start_ = -1;
  int selection_end_ = -1;
  std::string confirm_type_ = "done";
  bool confirm_hold_ = false;
  float font_size_ = 16.0f;
  std::string font_size_value_;
  std::string color_;
  std::string line_height_;
  std::string letter_spacing_;
  std::string font_weight_;
  std::string font_style_;
  std::string font_family_;
  std::string text_align_;
  std::string direction_;
  std::string cursor_color_;
  std::string padding_top_;
  std::string padding_right_;
  std::string padding_bottom_;
  std::string padding_left_;
};

} // namespace uniappx::form
