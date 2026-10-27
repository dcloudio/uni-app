#pragma once

#include <arkui/native_type.h>
#include <cstdint>
#include <memory>
#include <string>
#include "vue/uni_vue_component.h"

namespace uniappx {
class Element;
class NativeNodeView;
}

namespace uniappx::loading {

class LoadingPainter : public std::enable_shared_from_this<LoadingPainter>, public vue::UniVueComponent {
public:
  LoadingPainter() = default;

  void setElement(Element *element);
  void setColor(const std::string &color);
  void setBold(bool bold);

private:
  struct NodeBinding {
    NativeNodeView *node;
    std::shared_ptr<LoadingPainter> painter;
  };

  void draw(ArkUI_DrawContext *draw_context);
  void invalidate();

  std::weak_ptr<NodeBinding> binding_;
  uint32_t color_ = 0xFF000000;
  bool bold_ = false;
};

} // namespace uniappx::loading
