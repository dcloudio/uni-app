#include <chrono>
#include <cmath>
#include <tuple>
#include "recycle_waterflow.h"
#include "interface/UniCSSProperty.h"
#include "layout/Flex.h"
#include "layout/UniLayout.h"
#include "vue/shared/napi/napi_adapter.h"
#if defined(OS_ANDROID)
#include "vue/shared/napi/node_v8/napi_node_v8.h"
#endif

using namespace uniappx;

/**
 * - 关于unobserve和removeEventListener的说明
 *   目前Element回收时会自动解绑所有事件监听和ResizeObserver，因此在RecycleXXX等实例销毁时无需重复做这些工作
 */

namespace recycle_waterflow {
    // common start
    auto waterflowInstanceCache = std::unordered_map<double, std::weak_ptr<RecycleWaterflow>>();

    // TODO 此方案待调整为更健壮的方案
    // 用于判断当前组件是否有效，避免在组件已被销毁但仍有异步任务时访问已销毁组件导致崩溃
    inline bool isValidVueComponent(UniVueComponent* comp) { return comp != nullptr && comp->_sharedData != nullptr && comp->_sharedData->_vueId != 0;}

    inline bool canCallVueComponentMethod(UniVueComponent *comp) {
        return isValidVueComponent(comp) &&
               comp->_sharedData->_env != nullptr &&
               comp->_sharedData->_callJsMethodRef != nullptr;
    }

    inline float layoutPx2LogicPx(float px) {
#if defined(OS_ANDROID)
        return uniappx::util::ppx2lpx(px);
#else
        return px;
#endif
    }

    inline uniappx::UniCSSTransform genTransform(float offsetX, float offsetY) {
        return UniCSSTransform{UniCSSTransformTranslate::Translatex(offsetX, UniCSSUnitType::PX), UniCSSTransformTranslate::Translatey(offsetY, UniCSSUnitType::PX)};
    }
    inline uniappx::UniCSSPropertyValue genStyleTransform(float offsetX, float offsetY) {
#if defined(OS_ANDROID)
        return uniappx::android::style::StyleValueBox::Box(genTransform(offsetX, offsetY));
#else
        return genTransform(offsetX, offsetY);
#endif
    }

    enum NativeChannelFnAction : uint32_t {
        NativeChannelFnActionDestroy = 0
    };
    // 不检查napi_status，上游确保正确
    napi_value NativeChannelFn(napi_env env, napi_callback_info info) {
        napi_value undefined;
        napi_get_undefined(env, &undefined);
        size_t argc = 2;
        napi_value args[2];
        napi_get_cb_info(env, info, &argc, args, nullptr, nullptr);
        if (argc < 2) {
            return undefined;
        }
        double action = 0.0;
        napi_get_value_double(env, args[0], &action);
        double waterflowId = 0.0;
        napi_get_value_double(env, args[1], &waterflowId);
        if (static_cast<uint32_t>(action) == NativeChannelFnActionDestroy) {
            auto it = waterflowInstanceCache.find(waterflowId);
            if (it != waterflowInstanceCache.end()) {
                auto waterflow = it->second.lock();
                if (waterflow) {
                    waterflow->setDestroyed(true);
                }
            }
        }
        return undefined;
    }

    // common end
    // RecycleWaterflow start
    RecycleWaterflow::RecycleWaterflow() {};
    RecycleWaterflow::~RecycleWaterflow() {};

    void RecycleWaterflow::setDestroyed(bool destroyed) {
        if (this->destroyed == destroyed) {
            return;
        }
        this->destroyed = destroyed;
        if (destroyed) {
            this->removeScrollListener();
            this->stopRootObserve();
            this->itemInstanceMap.clear();
            waterflowInstanceCache.erase(this->waterflowId);
        }
    }

    void RecycleWaterflow::setWaterflowId(double waterflowId) {
        this->waterflowId = waterflowId;
        waterflowInstanceCache[waterflowId] = this->shared_from_this();
#if defined(OS_ANDROID)
        auto weakThis = this->weak_from_this();
        vue::shared::napi::node_v8::RunWithV8ScopeNoLocker(this->_sharedData->_env, [weakThis]() {
            auto self = weakThis.lock();
            if (!self ||
                !canCallVueComponentMethod(self.get())) {
                return;
            }
            napi_value jsFn;
            napi_create_function(
                    self->_sharedData->_env,
                    nullptr,
                    NAPI_AUTO_LENGTH,
                    NativeChannelFn,
                    nullptr,
                    &jsFn
            );
            self->callMethod("setNativeChannelFn", {jsFn});
        });
#else
        napi_value jsFn;
        napi_create_function(
                this->_sharedData->_env,
                nullptr,
                NAPI_AUTO_LENGTH,
                NativeChannelFn,
                nullptr,
                &jsFn
        );
        this->callMethod("setNativeChannelFn", {jsFn});
#endif
    }

    void RecycleWaterflow::setCrossAxisCount(double crossAxisCount) {
        this->crossAxisCount = static_cast<int>(crossAxisCount);
        this->updateCrossAxisMetrics();
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    void RecycleWaterflow::setMainAxisGap(double mainAxisGap) {
        this->mainAxisGap = mainAxisGap;
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    void RecycleWaterflow::setCrossAxisGap(double crossAxisGap) {
        this->crossAxisGap = crossAxisGap;
        this->updateCrossAxisMetrics();
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    void RecycleWaterflow::setMaxCrossAxisExtent(double maxCrossAxisExtent) {
        this->maxCrossAxisExtent = maxCrossAxisExtent;
        this->updateCrossAxisMetrics();
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    void RecycleWaterflow::setElement(Element *element) {
        // setElement触发在render之后，需要在此时机获取一次高度
        const auto scrollElement = dynamic_cast<ScrollViewElement *>(element);
        this->scrollElement = scrollElement;
        // 调用getBoundingClientRect获取高度略微浪费性能。OffsetHeight返回的又是整形，不符合预期。或许需要暴露NativeView给list-view用
        // auto size = this->scrollElement->getBoundingClientRect().height;
        auto scrollLayoutNode = this->scrollElement->GetLayoutNode();
        auto height = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(scrollLayoutNode));
        auto width = layoutPx2LogicPx(UniLayoutNodeLayoutGetWidth(scrollLayoutNode));
        auto paddingTop = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                         CSSDirection::CSSTop));
        auto paddingBottom = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                            CSSDirection::CSSBottom));
        auto paddingLeft = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                          CSSDirection::CSSLeft));
        auto paddingRight = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                           CSSDirection::CSSRight));
        if (height && !std::isnan(height)) {
            if (std::isnan(paddingTop)) {
                paddingTop = 0;
            }
            if (std::isnan(paddingBottom)) {
                paddingBottom = 0;
            }
            this->updateContainerSize(height - paddingTop - paddingBottom);
        }
        if (width && !std::isnan(width)) {
            if (std::isnan(paddingLeft)) {
                paddingLeft = 0;
            }
            if (std::isnan(paddingRight)) {
                paddingRight = 0;
            }
            this->updateContainerCrossAxisSize(
                    width - paddingLeft - paddingRight);
        }
        this->addScrollListener();
        this->startRootObserve();
    };

    void RecycleWaterflow::setPlaceholderElement(Element *element) {
        if (this->placeholderElement == element) {
            return;
        }
        this->placeholderElement = dynamic_cast<UniViewElement *>(element);
        if (this->placeholderElement) {
            auto placeholderSize = this->placeholderSize;
            Instance::GetTaskExecutor().runOnDomQueue(
                    [placeholderElement = this->placeholderElement, placeholderSize]() {
                        placeholderElement->UpdateStyle(UniCSSPropertyID::Height, placeholderSize);
                    });
        }
    }

    void RecycleWaterflow::startRootObserve() {
        this->resizeObserver = new UniResizeObserver(
                [this](const std::vector<UniResizeObserverEntry> &entries) {
                    if (entries.empty()) {
                        return;
                    }
                    auto entry = entries[entries.size() - 1];
                    // 获取内容区域尺寸
                    auto size = entry.contentBoxSize[0].blockSize;
                    auto crossAxisSize = entry.contentBoxSize[0].inlineSize;
                    this->updateContainerSize(size);
                    this->updateContainerCrossAxisSize(crossAxisSize);
                });
        this->resizeObserver->observe(this->scrollElement);
    }

    void RecycleWaterflow::stopRootObserve() {
        if (this->resizeObserver) {
            this->resizeObserver->unobserve(this->scrollElement);
            delete this->resizeObserver;
            this->resizeObserver = nullptr;
        }
    }

    void RecycleWaterflow::addScrollListener() {
        if (!this->scrollListener) {
            this->scrollListener = this->scrollElement
                    ->addEventListener("scroll",
                                       [this](const std::shared_ptr<Event> &event) {
                                           const auto scrollEvent =
                                                   static_cast<const UniScrollEvent &>(*event);
                                           this->onScroll(scrollEvent);
                                       });
        }
        if (!this->scrollEndListener) {
            this->scrollEndListener =
                    this->scrollElement->addEventListener("scrollend",
                                                          [this](const std::shared_ptr<Event> &event) { this->onScrollEnd(); });
        }
    };

    void RecycleWaterflow::removeScrollListener() {
        // if (this->scrollElement && this->scrollListener) {
        //     this->scrollElement->removeEventListener(
        //             this->scrollListener->getId());
        //     this->scrollListener = nullptr;
        // }
        // if (this->scrollElement && this->scrollEndListener) {
        //     this->scrollElement->removeEventListener(
        //             this->scrollEndListener->getId());
        //     this->scrollEndListener = nullptr;
        // }
    };

    void RecycleWaterflow::onScroll(const UniScrollEvent &event) {
        if (this->ignoreNextScroll) {
            this->ignoreNextScroll = false;
            return;
        }
        if (!this->scrolling) {
            this->onScrollStart();
            this->scrolling = true;
        }
        float scrollTop = this->scrollElement->getScrollTop();
        this->realScrollOffset = scrollTop;
        scrollTop = this->prepareFastScroll(scrollTop);
        this->updateScrollOffset(scrollTop);
    };

    void RecycleWaterflow::onScrollStart() {
        // TODO 不考虑同一页面多个回收列表同时滚动的场景
        this->scrollElement->GetPage()->setRecycling(true);
    };

    void RecycleWaterflow::onScrollEnd() {
        /**
         * 用户手指碰到scroll-view时如果scroll-view正在滚动会立刻触发scrollEnd
         */
        if (!this->scrolling) {
            return;
        }

        this->scrolling = false;
        this->scrollElement->GetPage()->setRecycling(false);
        auto exitFastScrollMode = this->fastScrolling;
        if (this->fastScrolling) {
            this->leaveFastScrollMode();
        }
        if (this->scrollOffset != this->realScrollOffset || exitFastScrollMode) {
            this->scrollOffset = this->realScrollOffset;
            this->updateRenderListOnScroll();
        }
    };

    float RecycleWaterflow::prepareFastScroll(float offset) {
        auto timestamp = static_cast<uint64_t>(
                std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::steady_clock::now().time_since_epoch())
                        .count());
        auto lastOffset = this->lastScrollOffsetForFastScroll;
        auto lastTimestamp = this->lastScrollTimestampForFastScroll;
        this->lastScrollOffsetForFastScroll = offset;
        this->lastScrollTimestampForFastScroll = timestamp;
        if (lastTimestamp == 0) {
            this->lastScrollOffsetForFastScrollRender = offset;
            return offset;
        }

        auto deltaOffset = offset - lastOffset;
        auto deltaTime = timestamp - lastTimestamp;

        if (deltaTime <= 0) {
            // 不应进入此分支
            return offset;
        }

        bool ignoreFastScrollMode =
                offset < 1 || offset > this->placeholderSize - this->size - 1;
        if (!ignoreFastScrollMode) {
            auto velocity = deltaOffset / deltaTime;
            if (std::abs(velocity) > this->fastScrollVelocity) {
                this->enterFastScrollMode();
                const auto scrollDirectionCachedSize = this->originalCachedSize;
                if (velocity > 0) {
                    // 快速滚动期间减少渲染内容
                    this->cachedSizeStart = 0.0f;
                    this->cachedSizeEnd = scrollDirectionCachedSize;
                } else {
                    // 快速滚动期间减少渲染内容
                    this->cachedSizeStart = scrollDirectionCachedSize;
                    this->cachedSizeEnd = 0.0f;
                }
            } else {
                this->leaveFastScrollMode();
            }
        } else if (this->fastScrolling) {
            this->leaveFastScrollMode();
        }

        if (this->fastScrolling) {
            /**
             * 快速滚动过程中降低计算用的滚动速度，达到用户看起来是在滚动的效果
             * 此时fastScrollOffset累计实际滚动距离与显示距离的差值
             */
            auto deltaOffsetAbs = std::abs(deltaOffset);
            if (deltaOffsetAbs > this->fastScrollDeltaLimit) {
                auto deltaOffsetRender = this->fastScrollDeltaLimit *
                                         (deltaOffsetAbs / deltaOffset);
                offset = this->lastScrollOffsetForFastScrollRender +
                         deltaOffsetRender;
                auto deltaFastScrollOffset = deltaOffset - deltaOffsetRender;
                this->fastScrollOffset += deltaOffset - deltaOffsetRender;
            }
        }
        this->lastScrollOffsetForFastScrollRender = offset;
        return offset;
    }

    void RecycleWaterflow::enterFastScrollMode() {
        if (this->fastScrolling) {
            return;
        }
        this->fastScrolling = true;
        this->fastScrollOffset = 0.0f;
    }

    void RecycleWaterflow::leaveFastScrollMode() {
        if (!this->fastScrolling) {
            return;
        }
        this->fastScrolling = false;
        /**
         * 重设lastScrollOffset以便后续能判断真实滚动方向
         */
        this->lastScrollOffset = this->realScrollOffset;
        this->fastScrollOffset = 0.0f;
        this->lastScrollTimestampForFastScroll = 0;
        this->lastScrollOffsetForFastScrollRender = 0;
        this->scrollOffset = this->realScrollOffset;
        this->resetCachedSizeOnNextRender = true;
        this->updateMinMaxRenderOffset();
    }

    void RecycleWaterflow::updateList(const std::vector<std::string> keyList) {
        this->keyList = keyList;

        // rebuild list with preserved items when possible
        std::vector<ItemInfo> tempList;
        tempList.reserve(keyList.size());

        for (size_t i = 0; i < keyList.size(); ++i) {
            const auto &key = keyList[i];
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                ItemInfo current = *(it->second);
                current.index = static_cast<int>(i);
                tempList.push_back(current);
            } else {
                ItemInfo current;
                current.index = static_cast<int>(i);
                current.key = key;
                auto instanceIt = this->itemInstanceMap.find(key);
                current.size = instanceIt != this->itemInstanceMap.end() ? instanceIt->second->size : -1.0f;
                current.offsetX = 0.0f;
                current.offsetY = 0.0f;
                current.type = 0;
                tempList.push_back(current);
            }
        }

        this->list.swap(tempList);
        // rebuild keyItemMap with pointers to items in `list`
        this->keyItemMap.clear();
        for (size_t i = 0; i < this->list.size(); ++i) {
            this->keyItemMap[this->list[i].key] = &this->list[i];
        }
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    bool RecycleWaterflow::isAllRenderItemSettled() {
        for (int i = this->renderRangeStart;
             i < this->renderRangeStart + this->renderRangeLength; ++i) {
            const auto &item = this->list[i];
            if (item.size < 0) {
                return false;
            }
        }
        return true;
    }

    void RecycleWaterflow::updateItemSize(const std::string key, float size) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return;

        ItemInfo *itemPtr = it->second;

        if (itemPtr->size == size)
            return;

        itemPtr->size = size;
        this->rebuildItemOffsets();
        if (this->isAllRenderItemSettled()) {
            this->updateRenderListOnItemSizeChange();
        }
    }

    void RecycleWaterflow::updateContainerSize(float size) {
        if (this->size != size) {
            this->size = size;
            this->updateMinMaxRenderOffset();
            this->updateRenderList();
        }
    }

    void RecycleWaterflow::updateContainerCrossAxisSize(float size) {
        if (this->containerCrossAxisSize == size) {
            return;
        }
        this->containerCrossAxisSize = size;
        this->updateCrossAxisMetrics();
        this->rebuildItemOffsets();
        this->updateRenderList();
    }

    void RecycleWaterflow::updateScrollOffset(float offset) {
        float delta = offset - this->scrollOffset;
        float deltaAbs = std::abs(delta);
        this->lastScrollOffset = this->scrollOffset;

        float maxScroll = std::max(0.0f, this->placeholderSize - this->size);
        if (offset < 0.0f)
            this->scrollOffset = 0.0f;
        else if (offset > maxScroll)
            this->scrollOffset = maxScroll;
        else
            this->scrollOffset = offset;

        this->updateMinMaxRenderOffset();
        this->updateRenderListOnScroll();
    }

    void RecycleWaterflow::updateMinMaxRenderOffset() {
        // cachedSize不用于避免频繁更新渲染列表，每次不可更新大量显示item，简单来说滚动期间的更新就是小步快跑
        auto pureOffset = this->scrollOffset;
        this->minRenderOffset =
                std::max(0.0f, pureOffset - this->cachedSizeStart);
        this->maxRenderOffset = pureOffset + this->size + this->cachedSizeEnd;
    }

    void RecycleWaterflow::preTriggerRenderListUpdate() {
        if (this->destroyed) {
            return;
        }
        this->triggerRenderListUpdate();
        // 退出快速滚动的下一帧使用重置的cachedSize
        if (this->resetCachedSizeOnNextRender) {
            this->cachedSizeStart = this->originalCachedSize;
            this->cachedSizeEnd = this->originalCachedSize;
            this->resetCachedSizeOnNextRender = false;
        }
    }

    void RecycleWaterflow::triggerRenderListUpdate() {
        auto renderInfoChanged = false;
        if (this->renderRangeStart != this->lastRenderRangeStart ||
            this->renderRangeLength != this->lastRenderRangeLength) {
            renderInfoChanged = true;
        }

        // flow-item在更新key之后主动获取offset进行更新，此时机用于更新已经显示的item的offset
        // 遍历this->itemInstanceMap，更新所有已渲染item的offset
        for (const auto &pair: this->itemInstanceMap) {
            const auto &key = pair.first;
            IRecycleFlowItem *itemInstance = pair.second;
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                ItemInfo *itemPtr = it->second;
                auto index = itemPtr->index;
                itemInstance->updateItemOffset(itemPtr->offsetX,
                                               itemPtr->offsetY +
                                               this->fastScrollOffset);
            }
        }

        auto _placeholderSize = this->placeholderSize;
        if (_placeholderSize >= 0.0f &&
            _placeholderSize != this->lastPlaceholderSize) {
            if (this->placeholderElement) {
                Instance::GetTaskExecutor().runOnDomQueue(
                        [placeholderElement = this->placeholderElement, _placeholderSize]() {
                            placeholderElement->UpdateStyle(UniCSSPropertyID::Height, _placeholderSize);
                        });
            }
            this->lastPlaceholderSize = _placeholderSize;
        }

        if (renderInfoChanged) {
            auto sharedData = this->_sharedData;
            if (!canCallVueComponentMethod(this)) {
                return;
            }
#if defined(OS_ANDROID)
            auto weakThis = this->weak_from_this();
            vue::shared::napi::node_v8::RunWithV8ScopeNoLocker(sharedData->_env, [weakThis, sharedData]() {
                auto selfHolder = weakThis.lock();
                auto self = selfHolder
                            ? dynamic_cast<RecycleWaterflow *>(selfHolder.get())
                            : nullptr;
                if (!self || self->_sharedData != sharedData ||
                    !canCallVueComponentMethod(self)) {
                    return;
                }
                self->lastRenderRangeStart = self->renderRangeStart;
                self->lastRenderRangeLength = self->renderRangeLength;
                // 通知vue渲染新列表
                napi_value renderRangeStart;
                napi_value renderRangeLength;
                napi_create_double(sharedData->_env, self->renderRangeStart,
                                &renderRangeStart);
                napi_create_double(sharedData->_env, self->renderRangeLength,
                                &renderRangeLength);
                self->callMethod("updateRenderInfo",
                                {renderRangeStart, renderRangeLength});
            });
#else
            this->lastRenderRangeStart = this->renderRangeStart;
            this->lastRenderRangeLength = this->renderRangeLength;
            // 通知vue渲染新列表
            napi_value renderRangeStart;
            napi_value renderRangeLength;
            napi_create_double(sharedData->_env, this->renderRangeStart,
                               &renderRangeStart);
            napi_create_double(sharedData->_env, this->renderRangeLength,
                               &renderRangeLength);
            this->callMethod("updateRenderInfo",
                             {renderRangeStart, renderRangeLength});
#endif
        }
    }

    void RecycleWaterflow::updateRenderList() {
        int start = 0;
        int end = -1;
        for (size_t i = 0; i < this->list.size(); ++i) {
            const auto item = &this->list[i];
            if (this->itemEndOffset(item) < this->minRenderOffset ||
                item->offsetY > this->maxRenderOffset) {
                continue;
            }
            if (end < 0) {
                start = static_cast<int>(i);
            }
            end = static_cast<int>(i);
        }
        if (end < 0) {
            this->renderRangeStart = 0;
            this->renderRangeLength = 0;
        } else {
            this->renderRangeStart = start;
            this->renderRangeLength = end - start + 1;
        }
        this->preTriggerRenderListUpdate();
    }

    void RecycleWaterflow::updateRenderListOnItemSizeChange() {
        this->updateRenderList();
    }

    void RecycleWaterflow::updateRenderListOnScroll() {
        if (this->scrollOffset > this->lastScrollOffset) {
            this->updateRenderListForward();
        } else if (this->scrollOffset < this->lastScrollOffset) {
            this->updateRenderListBackward();
        } else {
            this->updateRenderList();
        }
    }

    void RecycleWaterflow::updateRenderListForward() {
        const int lastRenderIndex =
                this->renderRangeLength == 0 ? -1 : (this->renderRangeStart +
                                                     this->renderRangeLength -
                                                     1);
        // remove invisible from top
        while (this->renderRangeLength > 0) {
            auto currentItem = this->list[this->renderRangeStart];
            if (this->itemEndOffset(&currentItem) < this->minRenderOffset) {
                this->renderRangeStart++;
                this->renderRangeLength--;
            } else {
                break;
            }
        }
        // append visible at bottom
        bool foundStart = this->renderRangeLength > 0;
        auto listSize = static_cast<int>(this->list.size());
        for (int i = lastRenderIndex + 1; i < listSize; ++i) {
            const auto item = &this->list[i];
            if (this->itemEndOffset(item) < this->minRenderOffset) {
                continue;
            } else if (item->offsetY > this->maxRenderOffset) {
                break;
            } else {
                this->renderRangeLength++;
                if (!foundStart) {
                    foundStart = true;
                    this->renderRangeStart = i;
                }
            }
        }
        this->preTriggerRenderListUpdate();
    }

    void RecycleWaterflow::updateRenderListBackward() {
        const int firstRenderIndex =
                this->renderRangeLength == 0
                ? static_cast<int>(this->list.size()) : this->renderRangeStart;
        // remove invisible from bottom
        while (this->renderRangeLength > 0) {
            auto currentItem = &this->list[this->renderRangeStart +
                                           this->renderRangeLength - 1];
            if (currentItem->offsetY > this->maxRenderOffset) {
                this->renderRangeLength--;
            } else {
                break;
            }
        }
        // prepend visible at top
        for (int i = firstRenderIndex - 1; i >= 0; --i) {
            const auto item = &this->list[i];
            if (item->offsetY > this->maxRenderOffset) {
                continue;
            } else if (this->itemEndOffset(item) < this->minRenderOffset) {
                break;
            } else {
                this->renderRangeStart = i;
                this->renderRangeLength++;
            }
        }
        this->preTriggerRenderListUpdate();
    }

    std::tuple<float, float>
    RecycleWaterflow::getItemOffset(const std::string key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return std::make_tuple(-1.0f, -1.0f);

        ItemInfo *itemPtr = it->second;
        return std::make_tuple(itemPtr->offsetX, itemPtr->offsetY + this->fastScrollOffset);
    }

    float RecycleWaterflow::getItemSize(const std::string key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return -1.0f;

        ItemInfo *itemPtr = it->second;
        return itemPtr->size;
    }

    float RecycleWaterflow::getItemCrossAxisSize() {
        return this->itemCrossAxisSize;
    }

    void RecycleWaterflow::rebuildItemOffsets() {
        this->rebuildItemOffsetsFrom(0);
    }

    void RecycleWaterflow::rebuildItemOffsetsFrom(size_t startIndex) {
        if (this->list.empty()) {
            this->placeholderSize = 0.0f;
            this->updateMinMaxRenderOffset();
            return;
        }

        auto columnCount = std::max(1, this->layoutCrossAxisCount);
        std::vector<float> columnHeights(columnCount, 0.0f);

        startIndex = std::min(startIndex, this->list.size());
        if (startIndex > 0) {
            auto denom = this->itemCrossAxisSize + this->crossAxisGap;
            for (size_t i = 0; i < startIndex; ++i) {
                const auto &item = this->list[i];
                int column = 0;
                if (denom > 0.0f) {
                    column = static_cast<int>(std::round(item.offsetX / denom));
                    column = std::max(0, std::min(column, columnCount - 1));
                }
                columnHeights[column] =
                        std::max(columnHeights[column],
                                 this->itemEndOffset(&item) + this->mainAxisGap);
            }
        }

        for (size_t i = startIndex; i < this->list.size(); ++i) {
            auto &item = this->list[i];
            int targetColumn = 0;
            float minHeight = columnHeights[0];
            for (int col = 1; col < columnCount; ++col) {
                if (columnHeights[col] < minHeight) {
                    minHeight = columnHeights[col];
                    targetColumn = col;
                }
            }

            item.offsetX = targetColumn *
                           (this->itemCrossAxisSize + this->crossAxisGap);
            item.offsetY = columnHeights[targetColumn];
            columnHeights[targetColumn] +=
                    this->realItemSize(item.size) + this->mainAxisGap;
        }

        float maxHeight = 0.0f;
        for (const auto height: columnHeights) {
            if (height > maxHeight) {
                maxHeight = height;
            }
        }

        if (maxHeight > 0.0f) {
            maxHeight = std::max(0.0f, maxHeight - this->mainAxisGap);
        }
        this->placeholderSize = maxHeight;
        this->updateMinMaxRenderOffset();
    }

    void RecycleWaterflow::updateItemCrossAxisSize() {
        for (auto &item: this->list) {
            auto it = this->itemInstanceMap.find(item.key);
            if (it != this->itemInstanceMap.end()) {
                IRecycleFlowItem *itemInstance = it->second;
                itemInstance->updateItemCrossAxisSize(this->itemCrossAxisSize);
            }
        }
    }

    void RecycleWaterflow::updateCrossAxisMetrics() {
        auto count = this->resolveCrossAxisCount();
        auto size = this->resolveCrossAxisSize(count);
        if (count != this->layoutCrossAxisCount) {
            this->layoutCrossAxisCount = count;
        }
        if (size != this->itemCrossAxisSize) {
            this->itemCrossAxisSize = size;
            this->updateItemCrossAxisSize();
        }
    }

    int RecycleWaterflow::resolveCrossAxisCount() const {
        if (this->maxCrossAxisExtent > 0.0f &&
            this->containerCrossAxisSize > 0.0f) {
            auto denom = this->maxCrossAxisExtent + this->crossAxisGap;
            if (denom <= 0.0f) {
                return 1;
            }
            auto count = static_cast<int>(std::ceil(
                    this->containerCrossAxisSize / denom));
            return std::max(1, count);
        }
        return std::max(1, this->crossAxisCount);
    }

    float RecycleWaterflow::resolveCrossAxisSize(int count) const {
        if (count <= 0) {
            return 0.0f;
        }
        if (this->containerCrossAxisSize <= 0.0f) {
            return 0.0f;
        }
        auto totalGap = this->crossAxisGap * (count - 1);
        auto size = (this->containerCrossAxisSize - totalGap) / count;
        if (size < 0.0f) {
            return 0.0f;
        }
        return size;
    }
    // RecycleWaterflow end

    // RecycleFlowItem start

    RecycleFlowItem::RecycleFlowItem() {};

    RecycleFlowItem::~RecycleFlowItem() {
        this->stopObserve();
        this->removeInstance(this->key);
    };

    /**
     * setWaterflowId会在updateKey之前调用。
     * TODO 不要依赖setWaterflowId、updateKey调用时机特性
     */
    void RecycleFlowItem::setWaterflowId(
            double waterflowId) { this->waterflowId = waterflowId; }

    /**
     * updateKey和setElement先后顺序无法确定
     * setElement每个flow-item组件只会调用一次
     */
    void RecycleFlowItem::setElement(Element *element) {
        if (this->viewElement) {
            return;
        }
        const auto viewElement = dynamic_cast<ViewElement *>(element);
        this->viewElement = viewElement;
        this->initSize();
        this->startObserve();
        this->getAndUpdateItemOffset();
        this->getAndUpdateItemCrossAxisSize();
    };

    void RecycleFlowItem::initSize() {
        if (!this->viewElement || this->sizeInited) {
            return;
        }
        auto size = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(
                this->viewElement->GetLayoutNode()));
        auto crossAxisSize = layoutPx2LogicPx(UniLayoutNodeLayoutGetWidth(
                this->viewElement->GetLayoutNode()));
        if (!std::isnan(crossAxisSize) && crossAxisSize <= 0.0f) {
            // 等待resizeObserver通知
            return;
        }
        if (std::isnan(size) || std::isnan(crossAxisSize)) {
            // TODO flow-item复用后第一次获取不到尺寸，后续也不会触发resize事件。应由排版器解决此问题，临时由flow-item处理
        } else {
            this->sizeInited = true;
            this->setSize(size);
        }
    }

    void RecycleFlowItem::startObserve() {
        this->resizeObserver = new UniResizeObserver(
                [this](const std::vector<UniResizeObserverEntry> &entries) {
                    if (entries.empty()) {
                        return;
                    }
                    auto entry = entries[entries.size() - 1];
                    auto size = entry.borderBoxSize[0].blockSize;
                    auto crossAxisSize = entry.borderBoxSize[0].inlineSize;
                    if(crossAxisSize > 0.0f) {
                        this->setSize(size);
                    }
                });
        this->resizeObserver->observe(this->viewElement);
    };

    void RecycleFlowItem::stopObserve() {
        if (this->resizeObserver && this->viewElement) {
            // this->resizeObserver->unobserve(this->viewElement);
            delete this->resizeObserver;
            this->resizeObserver = nullptr;
        }
    }

    float RecycleFlowItem::getSize() { return this->size; };

    void RecycleFlowItem::updateItemSize() {
        if (this->key == "" || this->size <= 0.0) {
            return;
        }
        auto recycleList = this->getRecycleWaterflow();
        if (recycleList) {
            recycleList->updateItemSize(this->key, this->size);
        }
    }

    void RecycleFlowItem::setSize(float size) {
        // TODO 排查为什么有时候会获取到NaN
        if (!std::isnan(size) && size > 0.0) {
            this->size = size;
            this->updateItemSize();
        }
    };

    void RecycleFlowItem::updateKey(std::string key) {
        auto prevKey = this->key;
        if (prevKey == key) {
            return;
        }
        if (prevKey != "") {
            // key更新逻辑
            this->removeInstance(prevKey);
        }
        this->key = key;
        this->setInstance(key);
        // key变更后需要重置offset
        this->offsetY = -1.0f;
        this->getAndUpdateItemOffset();
        this->getAndUpdateItemCrossAxisSize();
        /**
         * key更新时优先从waterflow获取缓存的size，否则可能获取到复用的item的size
         * 后续步骤仍会将尺寸更新为正确值，但是期间出现的错误值会导致抖动
         */
        auto sizeFromWaterflow = this->getItemSizeFromWaterflow();
        if (sizeFromWaterflow > 0.0f) {
            /**
             * 从waterflow获取的size无需再更新到waterflow
             */
            this->size = sizeFromWaterflow;
        } else {
            // 先使用旧item的size，等待resizeObserver通知
            this->updateItemSize();
        }
    };

    float RecycleFlowItem::getItemSizeFromWaterflow() {
        auto recycleWaterflow = this->getRecycleWaterflow();
        if (recycleWaterflow) {
            return recycleWaterflow->getItemSize(this->key);
        }
        return -1.0;
    }

    IRecycleWaterflow *RecycleFlowItem::getRecycleWaterflow() {
        if (this->waterflowId < 1.0) {
            return nullptr;
        }
        auto it = waterflowInstanceCache.find(this->waterflowId);
        if (it != waterflowInstanceCache.end()) {
            return it->second.lock().get();
        }
        return nullptr;
    }

    void RecycleFlowItem::setInstance(std::string key) {
        auto recycleWaterflow = this->getRecycleWaterflow();
        if (recycleWaterflow) {
            recycleWaterflow->itemInstanceMap[key] = this;
        }
    }

    void RecycleFlowItem::removeInstance(std::string key) {
        auto recycleWaterflow = this->getRecycleWaterflow();
        if (recycleWaterflow) {
            auto it = recycleWaterflow->itemInstanceMap.find(key);
            if (it != recycleWaterflow->itemInstanceMap.end() &&
                it->second == this) {
                recycleWaterflow->itemInstanceMap.erase(it);
            }
        }
    }

    bool RecycleFlowItem::isCurrentElementAttached() {
        if (!this->viewElement) {
            return false;
        }
        if (this->key == "") {
            return false;
        }
        return true;
    }

    /**
     * 供RecycleWaterflow调用
     */
    void RecycleFlowItem::updateItemOffset(float offsetX, float offsetY) {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        if (offsetX >= 0 && offsetY >= 0 &&
            (this->offsetX != offsetX || this->offsetY != offsetY)) {
            this->translate(offsetX, offsetY);
            this->offsetX = offsetX;
            this->offsetY = offsetY;
        }
    }

    /**
     * 供RecycleWaterflow调用
     */
    void RecycleFlowItem::updateItemCrossAxisSize(float crossAxisSize) {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        if (this->crossAxisSize != crossAxisSize) {
            this->crossAxisSize = crossAxisSize;
            Instance::GetTaskExecutor().runOnDomQueue(
                    [viewElement = this->viewElement, crossAxisSize]() {
                        viewElement->UpdateStyle(UniCSSPropertyID::Width, crossAxisSize);
                    });
        }
    }

    void RecycleFlowItem::getAndUpdateItemCrossAxisSize() {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        auto recycleWaterflow = this->getRecycleWaterflow();
        if (recycleWaterflow) {
            auto crossAxisSize = recycleWaterflow->getItemCrossAxisSize();
            this->updateItemCrossAxisSize(crossAxisSize);
        }
    }

    /**
     * 供RecycleFlowItem内部调用
     */
    void RecycleFlowItem::getAndUpdateItemOffset() {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        auto recycleWaterflow = this->getRecycleWaterflow();
        if (recycleWaterflow) {
            auto [offsetX, offsetY] = recycleWaterflow->getItemOffset(
                    this->key);
            if (offsetX >= 0 && offsetY >= 0 &&
                (this->offsetX != offsetX || this->offsetY != offsetY)) {
                this->translate(offsetX, offsetY);
                this->offsetX = offsetX;
                this->offsetY = offsetY;
            }
        }
    }

    void RecycleFlowItem::translate(float offsetX, float offsetY) {
        if (!this->viewElement || !isValidVueComponent(this)) {
            return;
        }
        bool translated = false;
#ifdef OS_ANDROID
#else
        auto nativeView = this->viewElement->GetNativeView();
        // TODO setElement是在waitNativeRender之后执行的，但是仍然会出现无nativeView的情况，待排查
        if (nativeView)
        {
            nativeView->transformInternal(genTransform(offsetX, offsetY));
            translated = true;
        }
        else
        {
            auto id = this->viewElement->GetId();
            auto page = this->viewElement->GetPage();
            auto nativeView = page->GetNativeViewById(id);
            if (nativeView)
            {
                nativeView->transformInternal(genTransform(offsetX, offsetY));
                translated = true;
            }
        }
#endif

        if (!translated) {
            viewElement->GetStyleDeclaration().setProperty(
                UniCSSPropertyID::TransformInternal,
                genStyleTransform(offsetX, offsetY));
        }
    }

    // RecycleFlowItem end
} // namespace recycle_waterflow
