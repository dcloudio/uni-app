#include "textarea.h"

namespace textarea {

void Textarea::setElement(Element *element) { this->element = element; }

void Textarea::setIsFocusing(bool focus) {
    isFocusing = focus;
    if (!isFocusing && resetElementPositionWhenBlur) {
        resetElementPositionWhenBlur = false;
        setBodyTranslateY(0);
    }
}

void Textarea::setAdjustPosition(bool adjust) { adjustPosition = adjust; }

void Textarea::handleKeyboardHeightChange(double height) {
    keyboardHeight = height;
    handleElementPositionWhenFocus();
}

void Textarea::handleElementPositionWhenFocus() {
    if (isFocusing && adjustPosition) {
        auto scrollElement = element->closestVerticalScrollElement();
        auto windowHeight = element->GetPage()->GetBodyElement()->OffsetHeight();
        auto boundingClientRect = element->getBoundingClientRect();
        auto elementHeight = boundingClientRect.height;
        // 判断元素的位置是否高于键盘高度
        // 元素距离底部距离 = 窗口高度-元素纵坐标-元素高度
        auto elementToBottomDistance = windowHeight - boundingClientRect.y - elementHeight;
        // 使元素在软键盘上面，需要滚动的距离
        auto needMoreScrollDistance = keyboardHeight - elementToBottomDistance;
        // 如果元素位置高于软键盘顶部，不需要处理
        if (needMoreScrollDistance <= 0) {
            return;
        }
        auto currentParentNode = scrollElement.value_or(nullptr);
        double currentParentToBottomDistance = 0;
        if (currentParentNode) {
            auto parentBoundingClientRect = currentParentNode->getBoundingClientRect();
            currentParentToBottomDistance = windowHeight - parentBoundingClientRect.y;
        }
        // 如果上面没有选到合适的滚动容器，此时无法通过操作滚动容器露出元素, 向上移动整个页面露出元素
        if (currentParentNode == nullptr || currentParentToBottomDistance - elementHeight < keyboardHeight) {
            resetElementPositionWhenBlur = true;
            setBodyTranslateY(keyboardHeight - elementToBottomDistance);
            return;
        }
        auto parentScrollHeight = currentParentNode->getScrollHeight();
        auto parentScrollTop = currentParentNode->getScrollTop();
        // 计算剩余可滚动高度
        auto canMoreScrollDistance =
            parentScrollHeight - parentScrollTop - currentParentNode->getBoundingClientRect().height;
        // 剩余可滚动高度不足以露出元素，新增占位子元素，使其可以滚动
        if (canMoreScrollDistance < needMoreScrollDistance) {
            // 原始代码为增加占位元素，现在回退为移动 body 元素
            resetElementPositionWhenBlur = true;
            setBodyTranslateY(keyboardHeight - elementToBottomDistance);
            return;
        }
        // TODO resetElementPositionWhenBlur
        // 滚动滚动容器，露出元素
        const auto y = parentScrollTop + needMoreScrollDistance;
        // TODO animation
        currentParentNode->scrollTo(0, y);
    }
}

void Textarea::setBodyTranslateY(double y) {
    const auto body = element->GetPage()->GetBodyElement();
    UniNativeTransform transform;
    if (y != 0) {
        transform.push_back(UniCSSTransformTranslate::Translatey(-y, UniCSSUnitType::PX));
    }
    // TODO animation
    body->GetNativeView()->transform(transform);
}

} // namespace textarea
