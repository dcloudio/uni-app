#include "loading_painter.h"

#include <algorithm>
#include <cmath>
#include <cstdio>
#include <native_drawing/drawing_canvas.h>
#include <native_drawing/drawing_pen.h>
#include <native_drawing/drawing_rect.h>
#include "dom/element.h"
#include "native_view/native_node/view.h"

namespace uniappx::loading {
namespace {

uint32_t parseColor(const std::string &color) {
  if (color.starts_with('#')) {
    const auto value = static_cast<uint32_t>(std::stoul(color.substr(1), nullptr, 16));
    return color.size() == 7 ? 0xFF000000 | value : value;
  }

  unsigned int red = 0;
  unsigned int green = 0;
  unsigned int blue = 0;
  if (color.starts_with("rgb(")) {
    std::sscanf(color.c_str(), "rgb(%u, %u, %u)", &red, &green, &blue);
    return 0xFF000000 | red << 16 | green << 8 | blue;
  }

  float alpha = 0;
  std::sscanf(color.c_str(), "rgba(%u, %u, %u, %f)", &red, &green, &blue, &alpha);
  return static_cast<uint32_t>(std::lround(alpha * 255.0f)) << 24 | red << 16 | green << 8 | blue;
}

} // namespace

void LoadingPainter::setElement(Element *element) {
  auto *node = static_cast<NativeNodeView *>(element->GetNativeView()->GetPlatformView());
  auto binding = std::make_shared<NodeBinding>(NodeBinding{node, shared_from_this()});
  binding_ = binding;
  node->SetDrawCallback([this](ArkUI_DrawContext *draw_context) {
    draw(draw_context);
  }, std::move(binding));
  invalidate();
}

void LoadingPainter::setColor(const std::string &color) {
  color_ = parseColor(color);
  invalidate();
}

void LoadingPainter::setBold(bool bold) {
  bold_ = bold;
  invalidate();
}

void LoadingPainter::draw(ArkUI_DrawContext *draw_context) {
  const auto size = OH_ArkUI_DrawContext_GetSize(draw_context);
  const float side = std::min(size.width, size.height);
  const float line_width = side / 16.0f * (bold_ ? 2.0f : 1.0f);
  const float inset = line_width / 2.0f;

  auto *canvas = reinterpret_cast<OH_Drawing_Canvas *>(OH_ArkUI_DrawContext_GetCanvas(draw_context));
  auto *pen = OH_Drawing_PenCreate();
  OH_Drawing_PenSetAntiAlias(pen, true);
  OH_Drawing_PenSetColor(pen, color_);
  OH_Drawing_PenSetWidth(pen, line_width);
  OH_Drawing_CanvasAttachPen(canvas, pen);

  auto *rect = OH_Drawing_RectCreate(inset, inset, side - inset, side - inset);
  OH_Drawing_CanvasDrawArc(canvas, rect, 0.0f, 270.0f);
  OH_Drawing_RectDestroy(rect);

  OH_Drawing_CanvasDetachPen(canvas);
  OH_Drawing_PenDestroy(pen);
}

void LoadingPainter::invalidate() {
  if (auto binding = binding_.lock()) {
    binding->node->SetNeedRender();
  }
}

} // namespace uniappx::loading
