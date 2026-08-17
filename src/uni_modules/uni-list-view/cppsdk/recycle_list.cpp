#include <chrono>
#include <cmath>
#include <limits>
#include "recycle_list.h"
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
 *   目前Element回收时会自动解绑所有事件监听和ResizeObserver，因此在RecycleList等实例销毁时无需重复做这些工作
 */

namespace recycle_list {
// common start
/**
 * 仅listInstanceCache、sectionInstanceCache内有所有instance
 * sectionGroupByCache、headerInstanceCache仅在找不到父级时暂存，父级设置成功id后再领养并清理这些缓存内容
 */
    auto listInstanceCache = std::unordered_map<double, std::weak_ptr<RecycleList>>();
    auto sectionInstanceCache = std::unordered_map<double, std::weak_ptr<RecycleListSection>>();
    auto sectionGroupCache = std::unordered_map<double, std::unordered_map<double, std::weak_ptr<RecycleListSection>>>();
    auto headerInstanceCache = std::unordered_map<double, std::weak_ptr<RecycleListHeader>>();
    /**
     * listViewId => size
     */
    auto defaultItemSizeCache = std::unordered_map<double, float>();

    inline bool isValidListViewId(double id) { return id > 0.0; }

    inline bool isValidSectionId(double id) { return id > 0.0; }

    // TODO 此方案待调整为更健壮的方案
    // 用于判断当前组件是否有效，避免在组件已被销毁但仍有异步任务时访问已销毁组件导致崩溃
    inline bool isValidVueComponent(UniVueComponent* comp) { return comp != nullptr && comp->_sharedData != nullptr && comp->_sharedData->_vueId != 0;}

    inline bool canCallVueComponentMethod(UniVueComponent *comp) {
        return isValidVueComponent(comp) &&
               comp->_sharedData->_env != nullptr &&
               comp->_sharedData->_callJsMethodRef != nullptr;
    }

    inline std::shared_ptr<RecycleList> findRecycleList(double listViewId) {
        if (!isValidListViewId(listViewId)) {
            return nullptr;
        }

        auto it = listInstanceCache.find(listViewId);
        if (it == listInstanceCache.end()) {
            return nullptr;
        }
        auto list = it->second.lock();
        if (!list) {
            listInstanceCache.erase(it);
            return nullptr;
        }
        return list;
    }

    inline std::shared_ptr<RecycleListSection> findRecycleSection(double sectionId) {
        if (!isValidSectionId(sectionId)) {
            return nullptr;
        }
        auto it = sectionInstanceCache.find(sectionId);
        if (it == sectionInstanceCache.end()) {
            return nullptr;
        }
        auto section = it->second.lock();
        if (!section) {
            sectionInstanceCache.erase(it);
            return nullptr;
        }
        return section;
    }

    inline std::shared_ptr<RecycleListHeader> findAndRemoveCachedHeader(double sectionId) {
        if (!isValidSectionId(sectionId)) {
            return nullptr;
        }

        auto it = headerInstanceCache.find(sectionId);
        if (it == headerInstanceCache.end()) {
            return nullptr;
        }
        auto header = it->second.lock();
        if (!header) {
            headerInstanceCache.erase(it);
            return nullptr;
        }
        headerInstanceCache.erase(it);
        return header;
    }

    inline std::shared_ptr<IRecycleContainer> findRecycleContainer(double listViewId, double sectionId) {
        auto section = findRecycleSection(sectionId);
        if (section) {
            return section;
        }
        return findRecycleList(listViewId);
    }

    inline float layoutPx2LogicPx(float px) {
#if defined(OS_ANDROID)
        return uniappx::util::ppx2lpx(px);
#else
        return px;
#endif
    }
    
    inline uniappx::UniCSSTransform genTransform(float offsetY) {
        return UniCSSTransform{UniCSSTransformTranslate::Translatey(offsetY, UniCSSUnitType::PX)};
    }
    inline uniappx::UniCSSPropertyValue genStyleTransform(float offsetY) {
#if defined(OS_ANDROID)
        return uniappx::android::style::StyleValueBox::Box(genTransform(offsetY));
#else
        return genTransform(offsetY);
#endif
    }

    enum NativeChannelFnAction : uint32_t {
        NativeChannelFnActionDestroyList = 0,
        NativeChannelFnActionDestroySection = 1
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
        double listViewOrSectionId = 0.0;
        napi_get_value_double(env, args[1], &listViewOrSectionId);
        int32_t actionInt = static_cast<uint32_t>(action);
        if (actionInt == NativeChannelFnActionDestroyList) {
            auto it = listInstanceCache.find(listViewOrSectionId);
            if (it != listInstanceCache.end()) {
                auto list = it->second.lock();
                if (list) {
                    list->setDestroyed(true);
                }
            }
        } else if (actionInt == NativeChannelFnActionDestroySection) {
            auto it = sectionInstanceCache.find(listViewOrSectionId);
            if (it != sectionInstanceCache.end()) {
                auto section = it->second.lock();
                if (section) {
                    section->setDestroyed(true);
                }
            }
        }
        return undefined;
    }

    void RecycleListItemDataStore::updateKeyList(
            const std::vector<std::string> &keyList) {
        this->keyList = keyList;

        std::vector<ItemInfo> tempList;
        tempList.reserve(keyList.size());

        ItemInfo *lastItem = nullptr;
        for (size_t i = 0; i < keyList.size(); ++i) {
            const auto &key = keyList[i];
            ItemInfo current;
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                current = *(it->second);
            } else {
                current.key = key;
                // 优先用已存在的itemInstance的size，防止复用的instance element、key均相同时不上报尺寸
                auto instanceIt = this->itemInstanceMap.find(key);
                current.size = instanceIt != this->itemInstanceMap.end() ? instanceIt->second->size : -1.0f;
                current.type = 0;
            }
            current.index = static_cast<int>(i);
            current.offset = lastItem ? this->itemEndOffset(lastItem) : 0.0f;
            tempList.push_back(current);
            lastItem = &tempList.back();
        }

        this->list.swap(tempList);
        this->keyItemMap.clear();
        for (auto &item: this->list) {
            this->keyItemMap[item.key] = &item;
        }
    }

    RecycleListItemDataStore::ItemSizeChange
    RecycleListItemDataStore::updateStoredItemSize(const std::string &key,
                                                   float size,
                                                   bool rebuildOffsets) {
        ItemSizeChange change;
        auto itemPtr = this->findItem(key);
        if (!itemPtr || itemPtr->size == size) {
            return change;
        }

        change.changed = true;
        change.index = itemPtr->index;
        change.oldSize = itemPtr->size;
        change.newSize = size;
        change.wasUnknown = itemPtr->size < 0;
        change.delta = size - this->realItemSize(itemPtr->size);
        itemPtr->size = size;

        if (rebuildOffsets) {
            this->rebuildItemOffsetsFrom(static_cast<size_t>(change.index + 1));
        }
        return change;
    }

    void RecycleListItemDataStore::rebuildItemOffsetsFrom(size_t startIndex) {
        if (this->list.empty() || startIndex >= this->list.size()) {
            return;
        }

        if (startIndex == 0) {
            this->list[0].offset = 0.0f;
            startIndex = 1;
        }
        for (size_t i = startIndex; i < this->list.size(); ++i) {
            const auto prev = &this->list[i - 1];
            this->list[i].offset = this->itemEndOffset(prev);
        }
    }

    void RecycleListItemDataStore::updateItemInstanceOffsetsFrom(
            size_t startIndex, float baseOffset) {
        if (this->destroyed || startIndex >= this->list.size()) {
            return;
        }

        for (size_t i = startIndex; i < this->list.size(); ++i) {
            auto instanceIt = this->itemInstanceMap.find(this->list[i].key);
            if (instanceIt != this->itemInstanceMap.end() &&
                instanceIt->second) {
                instanceIt->second->updateItemOffset(
                        baseOffset + this->list[i].offset);
            }
        }
    }

    RecycleListItemDataStore::ItemInfo *
    RecycleListItemDataStore::findItem(const std::string &key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end()) {
            return nullptr;
        }
        return it->second;
    }

    float RecycleListItemDataStore::getStoredItemSize(
            const std::string &key) {
        auto itemPtr = this->findItem(key);
        return itemPtr ? itemPtr->size : -1.0f;
    }

    float RecycleListItemDataStore::getItemSize(const std::string &key) {
        return this->getStoredItemSize(key);
    }

// common end
// RecycleList start
/**
 * 上游已确保调用顺序
 * - setListViewId
 * setElement和上述方法的调用顺序无法确定
 */
    RecycleList::RecycleList() {}
    RecycleList::~RecycleList() {}

    void RecycleList::setDestroyed(bool destroyed) {
        if (this->destroyed == destroyed) {
            return;
        }
        this->destroyed = destroyed;
        if (destroyed) {
            this->removeScrollListener();
            this->stopRootObserve();
            this->stopHeaderObserve();
            this->itemInstanceMap.clear();
            this->sectionInstanceMap.clear();
            listInstanceCache.erase(this->listViewId);
        }
    }

    void RecycleList::setListViewId(double listViewId) {
        this->listViewId = listViewId;
        if (!isValidListViewId(listViewId)) {
            return;
        }
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
        listInstanceCache[listViewId] = this->shared_from_this();

        auto groupIt = sectionGroupCache.find(listViewId);
        if (groupIt == sectionGroupCache.end()) {
            return;
        }
        auto &sectionGroup = groupIt->second;
        auto shouldSyncFromList = false;
        for (auto it = sectionGroup.begin(); it != sectionGroup.end();) {
            auto section = it->second.lock();
            if (!section || !isValidSectionId(section->sectionId)) {
                it = sectionGroup.erase(it);
                continue;
            }
            this->registerSection(section->sectionId, section);
            it = sectionGroup.erase(it);
        }
        sectionGroupCache.erase(groupIt);
    }

    void RecycleList::setElement(Element *element) {
        // setElement触发在render之后，需要在此时机获取一次高度
        const auto scrollElement = dynamic_cast<ScrollViewElement *>(element);
        this->scrollElement = scrollElement;
        // 调用getBoundingClientRect获取高度略微浪费性能。OffsetHeight返回的又是整形，不符合预期。或许需要暴露NativeView给list-view用
        // auto size = this->scrollElement->getBoundingClientRect().height;
        auto scrollLayoutNode = this->scrollElement->GetLayoutNode();
        auto height = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(scrollLayoutNode));
        auto paddingTop = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                         CSSDirection::CSSTop));
        auto paddingBottom = layoutPx2LogicPx(UniLayoutNodeLayoutGetPadding(scrollLayoutNode,
                                                                            CSSDirection::CSSBottom));
        if (height && !std::isnan(height)) {
            if (std::isnan(paddingTop)) {
                paddingTop = 0;
            }
            if (std::isnan(paddingBottom)) {
                paddingBottom = 0;
            }
            this->updateContainerSize(height - paddingTop - paddingBottom);
        }
        this->addScrollListener();
        this->startRootObserve();
        if (isValidListViewId(this->listViewId)) {
            this->linkSection();
        }
    }

    void RecycleList::setPlaceholderElement(Element *element) {
        if (this->placeholderElement == element) {
            return;
        }
        this->placeholderElement = dynamic_cast<UniViewElement *>(element);
        /**
         * section的v-for为纯静态时，setPlaceholderElement时placeholderSize值已经计算出来了，此时也需要屏蔽更新高度操作。
         */
        if (this->placeholderElement && this->itemInstanceMap.size() > 0 &&
            this->sectionInstanceMap.size() == 0) {
            auto placeholderSize = this->placeholderSize;
            Instance::GetTaskExecutor().runOnDomQueue(
                    [placeholderElement = this->placeholderElement, placeholderSize]() {
                        placeholderElement->UpdateStyle(UniCSSPropertyID::Height, placeholderSize);
                    });
        }
    }

    void RecycleList::setListHeaderElement(Element *element) {
        if (this->listHeaderElement == element) {
            return;
        }
        if (this->listHeaderElement) {
            this->stopHeaderObserve();
        }
        this->listHeaderElement = dynamic_cast<UniViewElement *>(element);
        auto size = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(
                this->listHeaderElement->GetLayoutNode()));
        if (size && !std::isnan(size)) {
            this->updateHeaderSize(size);
        }
        this->startHeaderObserve();
    }

    void RecycleList::startRootObserve() {
        this->resizeObserver = new UniResizeObserver(
                [this](const std::vector<UniResizeObserverEntry> &entries) {
                    if (entries.empty()) {
                        return;
                    }
                    auto entry = entries[entries.size() - 1];
                    // 获取内容区域尺寸
                    auto size = entry.contentBoxSize[0].blockSize;
                    this->updateContainerSize(size);
                });
        this->resizeObserver->observe(this->scrollElement);
    }

    void RecycleList::stopRootObserve() {
        if (this->resizeObserver) {
            // this->resizeObserver->unobserve(this->scrollElement);
            delete this->resizeObserver;
            this->resizeObserver = nullptr;
        }
    }

    void RecycleList::startHeaderObserve() {
        if (this->listHeaderElement) {
            this->headerResizeObserver = new UniResizeObserver(
                    [this](const std::vector<UniResizeObserverEntry> &entries) {
                        if (entries.empty()) {
                            return;
                        }
                        auto entry = entries[entries.size() - 1];
                        auto size = entry.borderBoxSize[0].blockSize;
                        this->updateHeaderSize(size);
                    });
            this->headerResizeObserver->observe(this->listHeaderElement);
        }
    }

    void RecycleList::stopHeaderObserve() {
        if (this->headerResizeObserver) {
            // this->headerResizeObserver->unobserve(this->listHeaderElement);
            delete this->headerResizeObserver;
            this->headerResizeObserver = nullptr;
        }
    }

    void RecycleList::addScrollListener() {
        if (!this->scrollListener) {
            /**
             * 此处已做实验，改为willScroll依然不能解决快速滚动时渲染不出当前屏幕的问题。
             * 原因可能有两点（未验证）
             * - renderRange更新到渲染期间仍有一些异步逻辑
             * - 快速滚动期间无法一帧内渲染出大量内容
             */
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
    }

    void RecycleList::removeScrollListener() {
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
    }

    void RecycleList::onScroll(const UniScrollEvent &event) {
        if (this->ignoreNextScroll) {
            this->ignoreNextScroll = false;
            return;
        }
        if (!this->scrolling) {
            this->onScrollStart();
            this->scrolling = true;
        }
        float scrollTop = this->scrollElement->getScrollTop();
        if (scrollTop == 0 || scrollTop >= this->placeholderSize - this->size) {
            this->itemSizeChangedCompensation = 0;
        }
        this->realScrollOffset = scrollTop;
        scrollTop = this->prepareFastScroll(scrollTop);
        this->updateScrollOffset(scrollTop);
    }

    void RecycleList::onScrollStart() {
        const auto anchorItem = this->getRenderStartItem();
        this->anchorItemKey = anchorItem ? anchorItem->key : "";
        // TODO 不考虑同一页面多个回收列表同时滚动的场景
        this->scrollElement->GetPage()->setRecycling(true);
    }

    void RecycleList::onScrollEnd() {
        /**
         * 用户手指碰到scroll-view时如果scroll-view正在滚动会立刻触发scrollEnd
         */
        if (!this->scrolling) {
            return;
        }

        this->scrolling = false;
        this->anchorItemKey.clear();
        this->scrollElement->GetPage()->setRecycling(false);
        auto exitFastScrollMode = this->fastScrolling;
        if (this->fastScrolling) {
            this->leaveFastScrollMode();
        }
        if (this->scrollOffset != this->realScrollOffset || exitFastScrollMode) {
            this->scrollOffset = this->realScrollOffset;
            this->updateRenderListOnScroll();
        }
    }

    float RecycleList::prepareFastScroll(float offset) {
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

        bool ignoreFastScrollMode = offset < 1.0f || offset >
                                                     this->placeholderSize -
                                                     this->size - 1.0f ||
                                    this->sectionInstanceMap.size() > 0;
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
                this->fastScrollOffset = lastOffset + deltaOffset - offset;
            }
        }
        this->lastScrollOffsetForFastScrollRender = offset;
        return offset;
    }

    void RecycleList::enterFastScrollMode() {
        if (this->fastScrolling) {
            return;
        }
        this->fastScrolling = true;
        /**
         * 在用户注意不到的时机将补偿值设为0
         */
        this->itemSizeChangedCompensation = 0;
        this->fastScrollOffset = 0.0f;
        // 广播快速滚动模式变化
        this->broadcastScrollContext();
    }

    void RecycleList::leaveFastScrollMode() {
        if (!this->fastScrolling) {
            return;
        }
        this->fastScrolling = false;
        /**
         * 在用户注意不到的时机将补偿值设为0
         */
        this->itemSizeChangedCompensation = 0;
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

    void RecycleList::updateList(const std::vector<std::string> &keyList) {
        this->updateKeyList(keyList);
        this->onItemListRelayout();
    }

    bool RecycleList::isAllRenderItemSettled() {
        for (int i = this->renderRangeStart;
             i < this->renderRangeStart + this->renderRangeLength; ++i) {
            const auto &item = this->list[i];
            if (item.size < 0) {
                return false;
            }
        }
        return true;
    }

    void RecycleList::updateItemSize(const std::string &key, float size) {
        auto itemPtr = this->findItem(key);
        if (!itemPtr) {
            return;
        }
        auto anchorItem = this->getAnchorItem();
        auto change = this->updateStoredItemSize(key, size, false);
        if (!change.changed) {
            return;
        }
        if (anchorItem && change.index < anchorItem->index) {
            this->recordItemOffsetCompensation(change.delta);
        }
        this->rebuildItemOffsetsFrom(
                    static_cast<size_t>(change.index + 1));
        this->onItemSizeRelayout(change.index);
    }

    void RecycleList::syncDefaultItemSize(float size) {
        for (const auto &pair: this->sectionInstanceMap) {
            if (pair.second) {
                pair.second->applyDefaultItemSize(size);
            }
        }
    }

    void RecycleList::recordItemOffsetCompensation(float delta) {
        if (this->fastScrolling) {
            return;
        }
        this->itemSizeChangedCompensation += delta;
    }

    void RecycleList::onItemListRelayout() {
        this->updateRenderList();
    }

    void RecycleList::onItemSizeRelayout(int firstDirtyIndex) {
        if (this->isAllRenderItemSettled()) {
            this->updateRenderListOnItemSizeChange();
        }
    }

    void RecycleList::updateContainerSize(float size) {
        if (this->size != size) {
            this->size = size;
            this->updateMinMaxRenderOffset();
            this->updateRenderListForward();
            this->broadcastScrollContext();
        }
    }

    void RecycleList::updateHeaderSize(float size) {
        if (this->headerSize == size) {
            return;
        }
        auto oldHeaderSize = this->headerSize;
        this->headerSize = size;
        this->updateMinMaxRenderOffset();
        if(oldHeaderSize > this->headerSize) {
            this->updateRenderListBackward();
        } else {
            this->updateRenderListForward();
        }
        this->broadcastScrollContext();
    }

    void RecycleList::updateScrollOffset(float offset) {
        this->lastScrollOffset = this->scrollOffset;
        float delta = offset - this->lastScrollOffset;
        float deltaAbs = std::abs(delta);

        // 注意此处未计算footerSize，节省一些性能
        // section模式无需限制maxScroll
        float maxScroll = this->sectionInstanceMap.size() > 0 ? std::numeric_limits<float>::infinity() : std::max(0.0f,
                                   this->headerSize + this->placeholderSize -
                                   this->size);
        if (offset < 0.0f)
            this->scrollOffset = 0.0f;
        else if (offset > maxScroll)
            this->scrollOffset = maxScroll;
        else
            this->scrollOffset = offset;

        /**
         * 滚动期间持续消耗补偿值，避免一次性消耗过大引起跳动，/3是随便写的一个值，没有什么特别的。希望滚动期间抖动更小，就把分母改大一点。
         * 注意如果分母太大会导致滚动结束时补偿值剩余过多仍然会跳动。
         * 采用此方案而不是在滚动结束后一次消耗，是因为滚动结束后同时调整scrollTop和item的translateY无法确保在同一帧渲染完成，会引发明显跳动。
         */
        if (this->itemSizeChangedCompensation != 0) {
            auto compensationAbs = std::abs(this->itemSizeChangedCompensation);
            auto compensationDecrease = deltaAbs / 3;
            if (compensationAbs > compensationDecrease) {
                auto sign = this->itemSizeChangedCompensation / compensationAbs;
                this->itemSizeChangedCompensation -=
                        compensationDecrease * sign;
                if(std::abs(this->itemSizeChangedCompensation) <= 1.0f) {
                    this->itemSizeChangedCompensation = 0;
                }
            } else {
                this->itemSizeChangedCompensation = 0;
            }
        }

        this->updateMinMaxRenderOffset();
        this->updateRenderListOnScroll();

        // 广播滚动上下文给所有注册的 section
        this->broadcastScrollContext();
    }

    void RecycleList::updateMinMaxRenderOffset() {
        // cachedSize不用于避免频繁更新渲染列表，每次不可更新大量显示item，简单来说滚动期间的更新就是小步快跑
        auto pureOffset = this->scrollOffset - this->headerSize;
        this->minRenderOffset =
                std::max(0.0f, pureOffset - this->cachedSizeStart +
                               this->itemSizeChangedCompensation);
        this->maxRenderOffset = pureOffset + this->size + this->cachedSizeEnd +
                                this->itemSizeChangedCompensation;
    }

    void RecycleList::preTriggerRenderListUpdate() {
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

    void RecycleList::triggerRenderListUpdate() {
        auto renderInfoChanged = false;
        if (this->renderRangeStart != this->lastRenderRangeStart ||
            this->renderRangeLength != this->lastRenderRangeLength) {
            renderInfoChanged = true;
        }

        // list-item在更新key之后主动获取offset进行更新，此时机用于更新已经显示的item的offset
        // 遍历this->itemInstanceMap，更新所有已渲染item的offset
        for (const auto &pair: this->itemInstanceMap) {
            const auto &key = pair.first;
            IRecycleListItem *itemInstance = pair.second;
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                ItemInfo *itemPtr = it->second;
                auto index = itemPtr->index;
                itemInstance->updateItemOffset(itemPtr->offset -
                                               this->itemSizeChangedCompensation +
                                               this->fastScrollOffset);
            }
        }

        auto sectionMode = this->sectionInstanceMap.size() > 0;
        if (!this->list.empty() && !sectionMode) {
            const auto lastItem = &this->list.back();
            auto _placeholderSize = this->itemEndOffset(lastItem) -
                                    this->itemSizeChangedCompensation;
            if (this->placeholderSize != _placeholderSize) {
                this->placeholderSize = _placeholderSize;
                if (this->placeholderElement) {
                    Instance::GetTaskExecutor().runOnDomQueue(
                            [placeholderElement = this->placeholderElement, _placeholderSize]() {
                                placeholderElement->UpdateStyle(UniCSSPropertyID::Height, _placeholderSize);
                            });
                }
            }
        }

        if (renderInfoChanged) {
            auto sharedData = this->_sharedData;
            if (!canCallVueComponentMethod(this)) {
                return;
            }
#if defined(OS_ANDROID)
            auto weakThis = this->weak_from_this();
            vue::shared::napi::node_v8::RunWithV8ScopeNoLocker(sharedData->_env, [weakThis, sharedData]() {
                auto self = weakThis.lock();
                if (!self || self->_sharedData != sharedData ||
                    !canCallVueComponentMethod(self.get())) {
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

    void RecycleList::updateRenderList() {
        int start = 0;
        int length = 0;
        bool foundStart = false;
        // TODO 优化此处逻辑，考虑二分遍历
        for (size_t i = 0; i < this->list.size(); ++i) {
            const auto item = &this->list[i];
            if (this->itemEndOffset(item) < this->minRenderOffset) {
                continue;
            } else if (item->offset > this->maxRenderOffset) {
                break;
            } else {
                if (!foundStart) {
                    foundStart = true;
                    start = static_cast<int>(i);
                }
                length++;
            }
        }
        this->renderRangeStart = start;
        this->renderRangeLength = length;
        this->preTriggerRenderListUpdate();
    }

    void RecycleList::updateRenderListOnItemSizeChange() {
        int start = 0;
        int length = 0;
        bool foundStart = false;
        // TODO 优化此处逻辑，考虑二分遍历
        for (size_t i = 0; i < this->list.size(); ++i) {
            const auto item = &this->list[i];
            if (this->itemEndOffset(item) < this->minRenderOffset) {
                continue;
            } else if (item->offset > this->maxRenderOffset) {
                break;
            } else {
                if (!foundStart) {
                    foundStart = true;
                    start = static_cast<int>(i);
                }
                length++;
            }
        }

        /**
         * 渲染1-2-3-4时，如果3尺寸比预估大很多，会把4挤出渲染区域，此时无需重新调整渲染区域
         * 某些快速滑动时出现的错乱疑似由此场景引发，在把4挤出渲染区域后，仍快速向尾部滚动，此时会再次渲染4
         */
        auto currentEnd = this->renderRangeStart + this->renderRangeLength - 1;
        auto end = start + length - 1;
        if (start < this->renderRangeStart) {
            this->renderRangeStart = start;
            this->renderRangeLength = currentEnd - start + 1;
        }
        if (end > currentEnd) {
            this->renderRangeLength = end - this->renderRangeStart + 1;
        }
        this->preTriggerRenderListUpdate();
    }

    void RecycleList::updateRenderListOnScroll() {
        if (this->scrollOffset == this->lastScrollOffset) {
            this->updateRenderList();
            return;
        }
        if (this->scrollOffset > this->lastScrollOffset) {
            this->updateRenderListForward();
        } else {
            this->updateRenderListBackward();
        }
    }

    void RecycleList::updateRenderListForward() {
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
            } else if (item->offset > this->maxRenderOffset) {
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

    void RecycleList::updateRenderListBackward() {
        const int firstRenderIndex =
                this->renderRangeLength == 0
                ? static_cast<int>(this->list.size()) : this->renderRangeStart;
        // remove invisible from bottom
        while (this->renderRangeLength > 0) {
            auto currentItem = &this->list[this->renderRangeStart +
                                           this->renderRangeLength - 1];
            if (currentItem->offset > this->maxRenderOffset) {
                this->renderRangeLength--;
            } else {
                break;
            }
        }
        // prepend visible at top
        for (int i = firstRenderIndex - 1; i >= 0; --i) {
            const auto item = &this->list[i];
            if (item->offset > this->maxRenderOffset) {
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

    float RecycleList::getItemOffset(const std::string &key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return -1.0f;

        ItemInfo *itemPtr = it->second;
        return itemPtr->offset - this->itemSizeChangedCompensation + this->fastScrollOffset;
    }

    float RecycleList::getItemSize(const std::string &key) {
        return this->getStoredItemSize(key);
    }

    void RecycleList::linkSection() {
        if (!this->sectionInstanceMap.empty() &&
            this->listBodyElement == nullptr) {
            // 使用任意一个section的父元素获取listBodyElement
            const auto &anySection = *this->sectionInstanceMap.begin();
            auto sectionPtr = anySection.second;
            if (sectionPtr && sectionPtr->viewElement) {
                auto sectionParent = sectionPtr->viewElement->getParentElement();
                if (sectionParent) {
                    this->listBodyElement = dynamic_cast<UniViewElement *>(sectionParent);
                }
            }
        }

        if (!this->listBodyElement || this->sectionInstanceMap.empty()) {
            return;
        }
        // 根据listBodyElement内的顺序设置section的nextSection
        auto sectionElements = this->listBodyElement->getChildren();
        // 倒序遍历sectionElements，设置zIndex，越靠前的section zIndex越大
        Instance::GetTaskExecutor().runOnDomQueue(
                [sectionElements]() {
                    auto size = sectionElements.size();
                    for (int i = size - 1; i >= 0; --i) {
                        auto current = sectionElements[i];
                        current->UpdateStyle(UniCSSPropertyID::ZIndex, (int)(size - i));
                    }
                });
        std::shared_ptr<IRecycleListSection> prevSection = nullptr;
        float offsetTop = 0.0f;
        for (auto current: sectionElements) {
            auto it = std::find_if(this->sectionInstanceMap.begin(),
                                   this->sectionInstanceMap.end(),
                                   [current](const auto &pair) {
                                       auto sectionPtr = pair.second;
                                       return sectionPtr &&
                                              sectionPtr->viewElement ==
                                              current;
                                   });
            if (it != this->sectionInstanceMap.end()) {
                auto currentSection = it->second;
                if (currentSection->offsetTop != offsetTop) {
                    currentSection->offsetTop = offsetTop;
                    currentSection->onScrollContextUpdate(
                            this->getScrollContext());
                }
                offsetTop += currentSection->placeholderSize;
                if (prevSection) {
                    prevSection->nextSection = currentSection;
                    currentSection->prevSection = prevSection;
                }
                prevSection = currentSection;
            }
        }
    }

    void RecycleList::registerSection(double sectionId,
                                      std::shared_ptr<IRecycleListSection> section) {
        if (section) {
            this->sectionInstanceMap[sectionId] = section;
            bool initPlaceholderSize = false;
            if (!this->listBodyElement && section->viewElement) {
                auto sectionParent = section->viewElement->getParentElement();
                if (sectionParent) {
                    this->listBodyElement = dynamic_cast<UniViewElement *>(sectionParent);
                    initPlaceholderSize = true;
                }
            }
            this->linkSection();
            if (initPlaceholderSize) {
                this->onSectionSizeChange(sectionId, section);
            }
            auto context = this->getScrollContext();
            section->onScrollContextUpdate(context);
        }
    }

    void RecycleList::unregisterSection(double sectionId,
                                        std::shared_ptr<IRecycleListSection> section) {
        if (this->destroyed) {
            return;
        }
        this->sectionInstanceMap.erase(sectionId);
        // 取消注册后需要将前后section连接起来
        if (section) {
            auto prevSection = section->prevSection;
            auto nextSection = section->nextSection;
            if (prevSection) {
                prevSection->nextSection = nextSection;
            }
            if (nextSection) {
                nextSection->prevSection = prevSection;
            }
            section->prevSection = nullptr;
            section->nextSection = nullptr;
            float offsetTop = prevSection ? (
                    prevSection->offsetTop +
                    prevSection->placeholderSize) : 0.0f;
            auto currentSection = nextSection;
            while (currentSection) {
                currentSection->offsetTop = offsetTop;
                currentSection->syncFromRecycleList();
                offsetTop += currentSection->placeholderSize;
                currentSection = currentSection->nextSection;
            }
        }
    }

    void RecycleList::onSectionSizeChange(double sectionId,
                                          std::shared_ptr<IRecycleListSection> section) {
        if (!this->listBodyElement || this->destroyed) {
            return;
        }
        auto currentSection = section;
        while (currentSection) {
            auto offsetTop =
                    currentSection->offsetTop + currentSection->placeholderSize;
            auto nextSection = currentSection->nextSection;
            if (nextSection) {
                if (nextSection->offsetTop != offsetTop) {
                    nextSection->offsetTop = offsetTop;
                    nextSection->onScrollContextUpdate(
                            this->getScrollContext());
                }
            } else {
                this->placeholderSize = offsetTop;
            }
            currentSection = nextSection;
        }
    }

    void RecycleList::onSectionPushPinnedHeaderChange(double sectionId,
                                                      std::shared_ptr<IRecycleListSection> section) {
        if (!this->listBodyElement || this->destroyed) {
            return;
        }
        auto currentSection = section;
        while (currentSection) {
            auto nextSection = currentSection->nextSection;
            if (nextSection) {
                nextSection->onScrollContextUpdate(
                            this->getScrollContext());
            }
            currentSection = nextSection;
        }
    }

    ScrollContext RecycleList::getScrollContext() const {
        ScrollContext context;
        context.scrollTop = this->scrollOffset;
        context.containerSize = this->size;
        context.headerSize = this->headerSize;
        context.renderStartOffset = std::max(0.0f, this->scrollOffset -
                                                   this->cachedSizeStart);
        // 此步骤未限制renderEndOffset，后续使用时判断
        context.renderEndOffset =
                this->scrollOffset + this->size + this->cachedSizeEnd;
        context.compensation = this->itemSizeChangedCompensation;
        context.fastScrollOffset = this->fastScrollOffset;
        context.isScrolling = this->scrolling;
        context.isFastScrolling = this->fastScrolling;
        return context;
    }

    void RecycleList::broadcastScrollContext() {
        if (this->size == 0 || this->destroyed) {
            return;
        }
        if (this->sectionInstanceMap.empty()) {
            return;
        }

        ScrollContext context = this->getScrollContext();

        for (const auto &pair: this->sectionInstanceMap) {
            if (pair.second) {
                pair.second->onScrollContextUpdate(context);
            }
        }
    }
// RecycleList end

// RecycleListSection start

/**
 * 上游已确保调用顺序
 * - setListViewId
 * - setSectionId
 * setElement和上述方法的调用顺序无法确定
 */
    RecycleListSection::RecycleListSection() {}
    RecycleListSection::~RecycleListSection() {}

    void RecycleListSection::setDestroyed(bool destroyed) {
        if (this->destroyed == destroyed) {
            return;
        }
        this->destroyed = destroyed;
        if (destroyed) {
            this->placeholderSize = 0;
            this->bindStickyHeader(nullptr);
            this->unregisterSectionBinding(this->listViewId, this->sectionId);
            this->itemInstanceMap.clear();
        }
    }

    void RecycleListSection::setElement(Element *element) {
        if (this->viewElement == element) {
            return;
        }
        this->viewElement = dynamic_cast<UniViewElement *>(element);
        auto listView = this->getListView();
        if (listView) {
            listView->linkSection();
            this->syncFromRecycleList();
        }
    }

    void RecycleListSection::setPlaceholderElement(Element *element) {
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

    void RecycleListSection::bindStickyHeader(std::shared_ptr<RecycleListHeader> header) {
        if (this->stickyHeader == header) {
            return;
        }
        this->stickyHeader = header;
    }

    std::shared_ptr<IRecycleList> RecycleListSection::getListView() {
        return findRecycleList(this->listViewId);
    }

    void RecycleListSection::syncFromRecycleList() {
        auto recycleList = this->getListView();
        if (!recycleList) {
            return;
        }
        auto context = recycleList->getScrollContext();
        this->onScrollContextUpdate(context);
    }

    void RecycleListSection::unregisterSectionBinding(double listViewId,
                                                      double sectionId) {
        auto listViewIdValid = isValidListViewId(listViewId);
        auto sectionIdValid = isValidSectionId(sectionId);
        if (sectionIdValid) {
            auto instanceIt = sectionInstanceCache.find(sectionId);
            if (instanceIt != sectionInstanceCache.end()) {
                auto section = instanceIt->second.lock();
                if (section.get() == this) {
                    sectionInstanceCache.erase(instanceIt);
                }
            }
        }
        if (listViewIdValid) {
            auto recycleList = findRecycleList(listViewId);
            if (recycleList) {
                recycleList->unregisterSection(sectionId, this->shared_from_this());
            }
        }
        if (listViewIdValid && sectionIdValid) {
            auto groupIt = sectionGroupCache.find(listViewId);
            if (groupIt == sectionGroupCache.end()) {
                return;
            }

            auto sectionIt = groupIt->second.find(sectionId);
            if (sectionIt != groupIt->second.end()) {
                auto section = sectionIt->second.lock();
                if (section.get() == this) {
                    groupIt->second.erase(sectionIt);
                }
            }
            if (groupIt->second.empty()) {
                sectionGroupCache.erase(groupIt);
            }
        }
    }

    void RecycleListSection::onItemListRelayout() {
        this->updateItemInstanceOffsetsFrom(0, this->headerSize);
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void RecycleListSection::onItemSizeRelayout(int firstDirtyIndex) {
        if (firstDirtyIndex >= 0) {
            this->updateItemInstanceOffsetsFrom(
                    static_cast<size_t>(firstDirtyIndex + 1),
                    this->headerSize);
        }
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void RecycleListSection::setPreload(bool preload) {
        this->preload = preload;
    }

    void RecycleListSection::setPushPinnedHeader(bool pushPinnedHeader) {
        if (this->pushPinnedHeader == pushPinnedHeader) {
            return;
        }
        this->pushPinnedHeader = pushPinnedHeader;
        if (!isValidSectionId(this->sectionId)) {
            return;
        }
        auto recycleList = this->getListView();
        if (recycleList) {
            recycleList->onSectionPushPinnedHeaderChange(this->sectionId, this->shared_from_this());
        }
    }

    void RecycleListSection::setListViewId(double listViewId) {
        if(!isValidListViewId(listViewId) || this->listViewId == listViewId) {
            return;
        }

        this->listViewId = listViewId;
        auto defaultSizeIt = defaultItemSizeCache.find(
                listViewId);
        if (defaultSizeIt != defaultItemSizeCache.end()) {
            this->defaultItemSize = defaultSizeIt->second;
        }
    }

    void RecycleListSection::setSectionId(double sectionId) {
        if (!isValidSectionId(sectionId) || this->sectionId == sectionId) {
            return;
        }
        this->sectionId = sectionId;
        sectionInstanceCache[this->sectionId] = this->shared_from_this();

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

        auto recycleList = this->getListView();
        bool shouldSyncFromList = false;
        if (recycleList) {
            recycleList->registerSection(this->sectionId, this->shared_from_this());
            shouldSyncFromList = true;
        } else {
            sectionGroupCache[this->listViewId][this->sectionId] = this->shared_from_this();
        }
        auto stickyHeader = findAndRemoveCachedHeader(this->sectionId);
        if (stickyHeader) {
            this->bindStickyHeader(stickyHeader);
            this->updateHeaderSize(stickyHeader->size);
            shouldSyncFromList = true;
        }
        if (shouldSyncFromList) {
            this->syncFromRecycleList();
        }
    }

    void RecycleListSection::updateRenderInfo(int renderRangeStart,
                                              int renderRangeLength) {
        // list-item在更新key之后主动获取offset进行更新，此时机用于更新已经显示的item的offset
        // 遍历this->itemInstanceMap，更新所有已渲染item的offset
        for (const auto &pair: this->itemInstanceMap) {
            const auto &key = pair.first;
            IRecycleListItem *itemInstance = pair.second;
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                ItemInfo *itemPtr = it->second;
                auto index = itemPtr->index;
                itemInstance->updateItemOffset(this->headerSize + itemPtr->offset);
            }
        }

        if (this->renderRangeStart == renderRangeStart &&
            this->renderRangeLength == renderRangeLength) {
            return;
        }
        this->renderRangeStart = renderRangeStart;
        this->renderRangeLength = renderRangeLength;

        auto sharedData = this->_sharedData;
        if (!canCallVueComponentMethod(this)) {
            return;
        }
#if defined(OS_ANDROID)
        auto weakThis = this->weak_from_this();
        vue::shared::napi::node_v8::RunWithV8ScopeNoLocker(sharedData->_env, [weakThis, sharedData]() {
            auto self = weakThis.lock();
            if (!self || self->_sharedData != sharedData ||
                !canCallVueComponentMethod(self.get())) {
                return;
            }
            napi_value startValue;
            napi_value lengthValue;
            napi_create_double(sharedData->_env, self->renderRangeStart,
                            &startValue);
            napi_create_double(sharedData->_env, self->renderRangeLength,
                            &lengthValue);
            self->callMethod("updateRenderInfo", {startValue, lengthValue});
        });
#else
        napi_value startValue;
        napi_value lengthValue;
        napi_create_double(sharedData->_env, this->renderRangeStart,
                           &startValue);
        napi_create_double(sharedData->_env, this->renderRangeLength,
                           &lengthValue);
        this->callMethod("updateRenderInfo", {startValue, lengthValue});
#endif
    }

    void RecycleListSection::updateHeaderSize(float size) {
        if (this->headerSize == size) {
            return;
        }
        this->headerSize = size;
        // header高度变化时需要重新计算placeholder高度
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void
    RecycleListSection::applyDefaultItemSize(float size) {
        if (size <= 0.0f || std::isnan(size) || this->defaultItemSize == size) {
            return;
        }
        this->defaultItemSize = size;
        this->hasSyncedDefaultItemSize = true;
        this->rebuildItemOffsetsFrom(0);
        this->updateItemInstanceOffsetsFrom(
                0,
                this->headerSize);
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void RecycleListSection::syncDefaultItemSize(float size) {
        if (size <= 0.0f || std::isnan(size) ||
            !isValidListViewId(this->listViewId)) {
            return;
        }
        defaultItemSizeCache[this->listViewId] = size;
        auto list = this->getListView();
        if (list) {
            list->syncDefaultItemSize(size);
        }
    }

    void RecycleListSection::updatePlaceholderSize() {
        // placeholder 高度 = header高度 + 所有items总高度
        auto _placeholderSize = this->headerSize;
        if (!this->list.empty()) {
            const auto lastItem = &this->list.back();
            _placeholderSize += this->itemEndOffset(lastItem);
        }

        if (this->placeholderSize != _placeholderSize) {
            this->placeholderSize = _placeholderSize;
            auto recycleList = this->getListView();
            if (recycleList) {
                recycleList->onSectionSizeChange(sectionId, this->shared_from_this());
            }
            if (this->placeholderElement) {
                Instance::GetTaskExecutor().runOnDomQueue(
                        [placeholderElement = this->placeholderElement, _placeholderSize]() {
                            placeholderElement->UpdateStyle(UniCSSPropertyID::Height, _placeholderSize);
                        });
            }
        }
    }

    void
    RecycleListSection::updateList(const std::vector<std::string> &keyList) {
        this->updateKeyList(keyList);
        this->onItemListRelayout();
    }

    void
    RecycleListSection::onScrollContextUpdate(const ScrollContext &context) {
        if (!this->viewElement || context.containerSize == 0) {
            return;
        }

        auto sectionHeight = this->placeholderSize;
        if (sectionHeight == 0) {
            return;
        }

        if (this->keyList.empty()) {
            this->updateRenderInfo(0, 0);
            return;
        }

        // sectionTop 为相对父节点位置，补上 list-view header 高度得到相对 list-view 内容偏移
        auto sectionTopInContainer = context.headerSize + this->offsetTop;
        auto sectionBottomInContainer = sectionTopInContainer + sectionHeight;

        auto renderStartOffset = context.renderStartOffset;
        auto renderEndOffset = context.renderEndOffset;

        auto visibleTopInContainer = context.scrollTop;
        auto visibleBottomInContainer =
                visibleTopInContainer + context.containerSize;
        /**
         * 增加容差避免边界位置部分header仍无法归位的问题
         * 例如点击跳转到section-E，此时section-D期望header归位，但是由于存在些许误差导致section-D的header到了section-D的最下方。
         */
        auto sectionOffset = 0.0f;
        if (sectionTopInContainer + this->calcTolerance >
            visibleBottomInContainer ||
            sectionBottomInContainer - this->calcTolerance <
            visibleTopInContainer) {
            // 原始位置不影响快速滚动区域展示，则更新translate为0，此方案能减少部分section translate调用
            sectionOffset = 0;
        } else {
            sectionOffset = context.fastScrollOffset;
        }
        this->applySectionOffset(sectionOffset);

        auto prevSection = this->prevSection;
        auto prevHeaderPinnedSize = 0.0f;
        while (prevSection) {
            if (!prevSection->pushPinnedHeader) {
                prevHeaderPinnedSize += prevSection->headerSize;
            }
            prevSection = prevSection->prevSection;
        }

        // sticky 吸顶偏移需要限制在 section 内部，避免越过 section 底部
        auto stickyRaw = context.scrollTop + prevHeaderPinnedSize - sectionTopInContainer;
        auto stickyMax = this->pushPinnedHeader ? std::max(0.0f, sectionHeight - this->headerSize) : std::numeric_limits<float>::infinity();
        auto stickyHeaderOffset = std::min(
            std::max(0.0f, stickyRaw - this->calcTolerance), stickyMax);
        if (this->stickyHeader) {
            this->stickyHeader->applyHeaderOffset(stickyHeaderOffset);
        }

        if (!this->preload && (sectionBottomInContainer < renderStartOffset ||
            sectionTopInContainer > renderEndOffset)) {
            this->updateRenderInfo(0, 0);
            return;
        }

        // section 内可见范围（相对 section 顶部）
        auto visibleTopInSection = std::max(0.0f, renderStartOffset -
                                                  sectionTopInContainer);
        auto visibleBottomInSection = std::min(sectionHeight, renderEndOffset -
                                                              sectionTopInContainer);

        // item 区域在 header 之后，渲染范围计算需扣除 header 高度
        auto visibleTop = std::max(0.0f,
                                   visibleTopInSection - this->headerSize);
        auto visibleBottom = std::max(0.0f, visibleBottomInSection -
                                            this->headerSize);
        if (this->preload) {
            auto itemContentHeight = std::max(0.0f, sectionHeight -
                                                    this->headerSize);
            auto minRenderSize = std::min(itemContentHeight,
                                          context.containerSize);
            auto currentRenderSize = visibleBottom - visibleTop;
            if (currentRenderSize < minRenderSize) {
                auto remainingSize = minRenderSize - currentRenderSize;
                auto prependSize = std::min(remainingSize, visibleTop);
                visibleTop -= prependSize;
                remainingSize -= prependSize;
                visibleBottom = std::min(itemContentHeight,
                                         visibleBottom + remainingSize);
            }
        }

        if (visibleBottom <= visibleTop) {
            this->updateRenderInfo(0, 0);
        } else {
            int start = 0;
            int length = 0;
            bool foundStart = false;
            for (size_t i = 0; i < this->list.size(); ++i) {
                const auto item = &this->list[i];
                if (this->itemEndOffset(item) < visibleTop) {
                    continue;
                }
                if (item->offset > visibleBottom) {
                    break;
                }
                if (!foundStart) {
                    foundStart = true;
                    start = static_cast<int>(i);
                }
                length++;
            }
            this->updateRenderInfo(start, length);
        }
    }

    void RecycleListSection::applySectionOffset(float offset) {
        if (!this->viewElement || !isValidVueComponent(this)) {
            return;
        }

        if (offset < 0.0f) {
            offset = 0.0f;
        }
        if (this->offset == offset) {
            return;
        }

        bool translated = false;
#ifdef OS_ANDROID
#else
        auto nativeView = this->viewElement->GetNativeView();
        if (nativeView) {
            nativeView->transformInternal(genTransform(offset));
            translated = true;
        } else {
            auto id = this->viewElement->GetId();
            auto page = this->viewElement->GetPage();
            auto fallbackNativeView = page->GetNativeViewById(id);
            if (fallbackNativeView) {
                fallbackNativeView->transformInternal(genTransform(offset));
                translated = true;
            }
        }
#endif
        this->offset = offset;
        if (!translated) {
            viewElement->GetStyleDeclaration().setProperty(
                    UniCSSPropertyID::TransformInternal,
                    genStyleTransform(offset));
        }
    }

    void
    RecycleListSection::updateItemSize(const std::string &key, float size) {
        auto change = this->updateStoredItemSize(key, size, false);
        if (!change.changed) {
            return;
        }

        auto shouldSyncDefaultItemSize =
                !this->hasSyncedDefaultItemSize && change.wasUnknown;
        if (shouldSyncDefaultItemSize) {
            this->syncDefaultItemSize(size);
            return;
        }
        this->rebuildItemOffsetsFrom(
                    static_cast<size_t>(change.index + 1));
        this->onItemSizeRelayout(change.index);
    }

    float RecycleListSection::getItemOffset(const std::string &key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return -1.0f;

        ItemInfo *itemPtr = it->second;
        // item的实际offset需要加上header高度（header是sticky-header，position: absolute）
        return this->headerSize + itemPtr->offset;
    }

// RecycleListSection end

// RecycleListHeader start
/**
 * 上游已确保调用顺序
 * - setSectionId
 * - setListViewId
 * setElement和上述方法的调用顺序无法确定
 */
    RecycleListHeader::RecycleListHeader() {}

    RecycleListHeader::~RecycleListHeader() {
        if (!isValidSectionId(sectionId)) {
            return;
        }
        auto section = this->getSection();
        if (section) {
            section->bindStickyHeader(nullptr);
        } else {
            auto headerIt = headerInstanceCache.find(sectionId);
            if (headerIt != headerInstanceCache.end()) {
                headerInstanceCache.erase(headerIt);
            }
        }

        if (this->resizeObserver && this->viewElement) {
            // this->resizeObserver->unobserve(this->viewElement);
            delete this->resizeObserver;
            this->resizeObserver = nullptr;
        }
    }

    void RecycleListHeader::setSectionId(double sectionId) {
        if (!isValidSectionId(sectionId) || this->sectionId == sectionId) {
            return;
        }
        this->sectionId = sectionId;
        this->offset = -1.0f;
        auto section = this->getSection();
        if (section) {
            section->bindStickyHeader(this->shared_from_this());
            section->syncFromRecycleList();
        } else {
            headerInstanceCache[this->sectionId] = this->weak_from_this();
        }
    }

    std::shared_ptr<RecycleListSection> RecycleListHeader::getSection() {
        return findRecycleSection(this->sectionId);
    }

    void RecycleListHeader::initSize() {
        if (!this->viewElement) {
            return;
        }
        auto size = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(
            this->viewElement->GetLayoutNode()));
        if (!std::isnan(size)) {
            this->setSize(size);
        }
    }

    void RecycleListHeader::startObserve() {
        if (!this->viewElement || this->resizeObserver) {
            return;
        }

        this->resizeObserver = new UniResizeObserver(
                [this](const std::vector<UniResizeObserverEntry> &entries) {
                    if (entries.empty()) {
                        return;
                    }
                    auto entry = entries[entries.size() - 1];
                    auto size = entry.borderBoxSize[0].blockSize;
                    this->setSize(size);
                });
        this->resizeObserver->observe(this->viewElement);
    }

    void RecycleListHeader::setSize(float size) {
        if (std::isnan(size) || size <= 0.0f || this->size == size) {
            return;
        }
        this->size = size;
        auto section = this->getSection();
        if (section) {
            section->updateHeaderSize(size);
        }
    }

    void RecycleListHeader::applyHeaderOffset(float offset) {
        auto section = findRecycleSection(this->sectionId);
        if (!section) {
            return;
        }
        if (!this->viewElement || !isValidVueComponent(this)) {
            return;
        }

        if (offset < 0.0f) {
            offset = 0.0f;
        }
        if (this->offset == offset) {
            return;
        }

        bool translated = false;
#ifdef OS_ANDROID
#else
        auto nativeView = this->viewElement->GetNativeView();
        if (nativeView) {
            nativeView->transformInternal(genTransform(offset));
            translated = true;
        } else {
            auto id = this->viewElement->GetId();
            auto page = this->viewElement->GetPage();
            auto fallbackNativeView = page->GetNativeViewById(id);
            if (fallbackNativeView) {
                fallbackNativeView->transformInternal(genTransform(offset));
                translated = true;
            }
        }
#endif
        this->offset = offset;
        if (!translated) {
            viewElement->GetStyleDeclaration().setProperty(
                    UniCSSPropertyID::TransformInternal,
                    genStyleTransform(offset));
        }
    }

    void RecycleListHeader::setElement(Element *element) {
        if (this->viewElement == element) {
            return;
        }
        this->viewElement = dynamic_cast<UniViewElement *>(element);
        this->initSize();
        this->startObserve();
    }
// RecycleListHeader end

// RecycleListItem start

/**
 * 上游已确保调用顺序
 * - setSectionId
 * - setListViewId
 * - updateKey
 * setElement和上述方法的调用顺序无法确定setElement
 */
    RecycleListItem::RecycleListItem() {}

    RecycleListItem::~RecycleListItem() {
        this->stopObserve();
    }

    void RecycleListItem::setListViewId(double listViewId) {
        this->listViewId = listViewId;
    }

    void RecycleListItem::setSectionId(double sectionId) {
        this->sectionId = sectionId;
    }

    void RecycleListItem::setElement(Element *element) {
        if (this->viewElement) {
            return;
        }
        const auto viewElement = dynamic_cast<ViewElement *>(element);
        this->viewElement = viewElement;
        this->initSize();
        this->startObserve();
        this->getAndUpdateItemOffset();
    }

    void RecycleListItem::initSize() {
        if (!this->viewElement || this->sizeInited) {
            return;
        }
        auto size = layoutPx2LogicPx(UniLayoutNodeLayoutGetHeight(
            this->viewElement->GetLayoutNode()));
        if (!std::isnan(size)) {
            this->sizeInited = true;
            this->setSize(size);
        }
    }

    void RecycleListItem::startObserve() {
        this->resizeObserver = new UniResizeObserver(
                [this](const std::vector<UniResizeObserverEntry> &entries) {
                    if (entries.empty()) {
                        return;
                    }
                    auto entry = entries[entries.size() - 1];
                    auto size = entry.borderBoxSize[0].blockSize;
                    this->setSize(size);
                });
        this->resizeObserver->observe(this->viewElement);
    }

    void RecycleListItem::stopObserve() {
        if (this->resizeObserver && this->viewElement) {
            // this->resizeObserver->unobserve(this->viewElement);
            delete this->resizeObserver;
            this->resizeObserver = nullptr;
        }
    }

    float RecycleListItem::getSize() { return this->size; }

    void RecycleListItem::updateItemSize() {
        if (this->key.empty() || this->size <= 0.0f) {
            return;
        }
        auto recycleList = this->getRecycleContainer();
        if (recycleList) {
            recycleList->updateItemSize(this->key, this->size);
        }
    }

    void RecycleListItem::setSize(float size) {
        // TODO 排查为什么有时候会获取到NaN
        if (!std::isnan(size) && size > 0.0f) {
            this->size = size;
            this->updateItemSize();
        }
    }

    void RecycleListItem::updateKey(const std::string &key) {
        auto prevKey = this->key;
        if (prevKey == key) {
            return;
        }
        if (!prevKey.empty()) {
            // key更新逻辑
            this->removeInstance(prevKey);
        }
        this->key = key;
        this->setInstance(key);
        // key变更后需要重置offset
        this->offset = -1.0f;
        this->getAndUpdateItemOffset();
        // 先使用旧item的size，等待resizeObserver通知
        this->updateItemSize();
    }

    std::shared_ptr<IRecycleContainer> RecycleListItem::getRecycleContainer() {
        return findRecycleContainer(this->listViewId, this->sectionId);
    }

    void RecycleListItem::setInstance(const std::string &key) {
        auto recycleList = this->getRecycleContainer();
        if (recycleList) {
            recycleList->itemInstanceMap[key] = this;
        }
    }

    void RecycleListItem::removeInstance(const std::string &key) {
        auto recycleList = this->getRecycleContainer();
        if (recycleList) {
            auto it = recycleList->itemInstanceMap.find(key);
            if (it != recycleList->itemInstanceMap.end() &&
                it->second == this) {
                recycleList->itemInstanceMap.erase(it);
            }
        }
    }

    bool RecycleListItem::isCurrentElementAttached() {
        if (!this->viewElement) {
            return false;
        }
        if (this->key.empty()) {
            return false;
        }
        return true;
    }

/**
 * 供RecycleList调用
 */
    void RecycleListItem::updateItemOffset(float offset) {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        this->applyItemOffset(offset);
    }

/**
 * 供RecycleListItem内部调用
 */
    void RecycleListItem::getAndUpdateItemOffset() {
        if (!this->isCurrentElementAttached()) {
            return;
        }
        auto recycleList = this->getRecycleContainer();
        if (recycleList) {
            auto offset = recycleList->getItemOffset(this->key);
            this->applyItemOffset(offset);
        }
    }

    void RecycleListItem::applyItemOffset(float offset) {
        if (!this->viewElement || !isValidVueComponent(this)) {
            return;
        }

        if (offset < 0.0f) {
            offset = 0.0f;
        }

        if (this->offset == offset) {
            return;
        }
        bool translated = false;
#ifdef OS_ANDROID
#else
        auto nativeView = this->viewElement->GetNativeView();
        // TODO setElement是在waitNativeRender之后执行的，但是仍然会出现无nativeView的情况，待排查
        if (nativeView) {
            nativeView->transformInternal(genTransform(offset));
            translated = true;
        } else {
            auto id = this->viewElement->GetId();
            auto page = this->viewElement->GetPage();
            auto nativeView = page->GetNativeViewById(id);
            if (nativeView) {
                nativeView->transformInternal(genTransform(offset));
                translated = true;
            }
        }
#endif
        this->offset = offset;
        if (!translated) {
            viewElement->GetStyleDeclaration().setProperty(
                    UniCSSPropertyID::TransformInternal,
                    genStyleTransform(offset));
        }
    }

// RecycleListItem end
} // namespace recycle_list
