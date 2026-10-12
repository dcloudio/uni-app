#include <chrono>
#include <cmath>
#include <limits>
#include "recycle_list.h"
#include "interface/UniCSSProperty.h"
#include "node_api.h"
#if defined(OS_ANDROID)
#include "v8/node_api_v8.h"
#endif

using namespace uniappx;

/**
 * - 关于unobserve和removeEventListener的说明
 *   目前Element回收时会自动解绑所有事件监听和ResizeObserver，因此在RecycleList等实例销毁时无需重复做这些工作
 *   removeEventListener在destroyed时执行一次防止RecycleList析构后还触发滚动等事件，比如issue-31946 用户在iOS平台bounce未结束时触发list-view销毁，在RecycleList析构后仍触发了滚动事件
 */

namespace recycle_list {
// common start
/**
 * listInstanceCache、sectionInstanceCache内有所有instance
 * sectionGroupCache、headerInstanceCache仅在找不到父级时暂存，父级设置成功id后再领养并清理这些缓存内容
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

    inline uint64_t getTimestamp() {
        return static_cast<uint64_t>(
                std::chrono::duration_cast<std::chrono::milliseconds>(
                        std::chrono::steady_clock::now().time_since_epoch())
                        .count());
    }

    enum NativeChannelFnAction : uint32_t {
        NativeChannelFnActionDestroyList = 0,
        NativeChannelFnActionDestroySection = 1,
        NativeChannelFnActionListUpdateList = 2,
        NativeChannelFnActionSectionUpdateList = 3
    };
    // 不检查napi_status，上游确保参数类型正确
    std::vector<std::string> resolveKeyList(napi_env env, napi_value jsKeyList) {
        std::vector<std::string> keyList;
        bool isArray = false;
        napi_is_array(env, jsKeyList, &isArray);
        if (!isArray) {
            return keyList;
        }
        uint32_t length = 0;
        napi_get_array_length(env, jsKeyList, &length);
        keyList.reserve(length);
        for (uint32_t i = 0; i < length; ++i) {
            napi_value jsKey;
            napi_get_element(env, jsKeyList, i, &jsKey);
            size_t strLen = 0;
            napi_get_value_string_utf8(env, jsKey, nullptr, 0, &strLen);
            std::string key(strLen + 1, '\0');
            napi_get_value_string_utf8(env, jsKey, key.data(), strLen + 1, &strLen);
            key.resize(strLen);
            keyList.push_back(std::move(key));
        }
        return keyList;
    }

    napi_value NativeChannelFn(napi_env env, napi_callback_info info) {
        napi_value undefined;
        napi_get_undefined(env, &undefined);
        size_t argc = 0;
        napi_get_cb_info(env, info, &argc, nullptr, nullptr, nullptr);
        if (argc < 2) {
            return undefined;
        }
        std::vector<napi_value> args(argc);
        napi_get_cb_info(
                env, info, &argc, args.data(), nullptr, nullptr);
        double action = 0.0;
        napi_get_value_double(env, args[0], &action);
        double instanceId = 0.0;
        napi_get_value_double(env, args[1], &instanceId);
        int32_t actionInt = static_cast<uint32_t>(action);
        if (actionInt == NativeChannelFnActionDestroyList) {
            auto it = listInstanceCache.find(instanceId);
            if (it != listInstanceCache.end()) {
                auto list = it->second.lock();
                if (list) {
                    list->setDestroyed(true);
                }
            }
        } else if (actionInt == NativeChannelFnActionDestroySection) {
            auto it = sectionInstanceCache.find(instanceId);
            if (it != sectionInstanceCache.end()) {
                auto section = it->second.lock();
                if (section) {
                    section->setDestroyed(true);
                }
            }
        } else if (actionInt == NativeChannelFnActionListUpdateList) {
            if (argc < 3) {
                return undefined;
            }
            auto list = findRecycleList(instanceId);
            if (list) {
                list->updateList(resolveKeyList(env, args[2]));
            }
        } else if (actionInt == NativeChannelFnActionSectionUpdateList) {
            if (argc < 3) {
                return undefined;
            }
            auto section = findRecycleSection(instanceId);
            if (section) {
                section->updateList(resolveKeyList(env, args[2]));
            }
        }
        return undefined;
    }

    void RecycleListItemDataStore::updateKeyList(
            const std::vector<std::string> &keyList) {
        if (this->listDataStatus == ListDataStatusNotInitialized) {
            if (keyList.size() > 0) {
                this->listDataStatus = ListDataStatusInitialized;
            }
        } else if (this->listDataStatus == ListDataStatusInitialized){
            this->listDataStatus = ListDataStatusUpdated;
        }

        this->keyList = keyList;
        this->forceRenderInfoUpdate = true;

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
                                                   float size) {
        ItemSizeChange change;
        auto itemPtr = this->findItem(key);
        if (!itemPtr || itemPtr->size == size) {
            return change;
        }

        change.changed = true;
        change.index = itemPtr->index;
        change.wasUnknown = itemPtr->size < 0;
        change.delta = size - this->realItemSize(itemPtr->size);
        itemPtr->size = size;

        /**
         * TODO 频繁调整默认item尺寸会导致部分情况下（uni-ai-x全rich-text，每个消息分10个item，100个消息）出下闪烁，待解决
         */
        // // 方案1：将当前渲染出的（itemInstanceMap）item尺寸的平均值作为defaultItemSize
        // float totalSize = 0.0f;
        // int avgSizeItemCount = 0;
        // for (const auto &pair: this->itemInstanceMap) {
        //     const auto &itemInstance = pair.second;
        //     if (itemInstance && itemInstance->size > 0.0f) {
        //         totalSize += itemInstance->size;
        //         avgSizeItemCount++;
        //     }
        // }
        // if (totalSize > 0.0f) {
        //     this->defaultItemSize = totalSize / avgSizeItemCount;
        // }

        // // 方案2：将已渲染过的item尺寸的平均值作为defaultItemSize
        //        if (size > 0) {
        //            // 将已渲染过的item尺寸的平均值作为defaultItemSize
        //            float totalSize = 0.0f;
        //            int avgSizeItemCount = 0;
        //            for (const auto &item: this->list) {
        //                if (item.size > 0) {
        //                    totalSize += item.size;
        //                    ++avgSizeItemCount;
        //                }
        //            }
        //            if (totalSize > 0.0f) {
        //                this->defaultItemSize = totalSize / avgSizeItemCount;
        //                UNIAPPX_LOG_ERROR(
        //                        "RecycleListItemDataStore::updateStoredItemSize defaultItemSize: %f listSize: %d",
        //                        this->defaultItemSize, this->list.size());
        //            }
        //        }
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
            this->onItemOffsetChange(this->list[i].key, this->list[i].offset);
        }
    }

    void RecycleListItemDataStore::updateItemOffset() {
        for (const auto &pair: this->itemInstanceMap) {
            const auto &key = pair.first;
            IRecycleListItem *itemInstance = pair.second;
            auto it = this->keyItemMap.find(key);
            if (it != this->keyItemMap.end()) {
                ItemInfo *itemPtr = it->second;
                auto index = itemPtr->index;
                if (itemInstance) {
                    itemInstance->updateItemOffset(itemPtr->offset + this->getItemBaseOffset());
                }
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

    std::tuple<int, int> RecycleListItemDataStore::getRenderRange(float minRenderOffset, float maxRenderOffset) {
        auto first = std::lower_bound(
            this->list.begin(),
            this->list.end(),
            minRenderOffset,
            [this](const auto& item, float offset) {
                return itemEndOffset(&item) < offset;
            });

        auto last = std::upper_bound(
            first,
            this->list.end(),
            maxRenderOffset,
            [](float offset, const auto& item) {
                return offset < item.offset;
            });

        return {
            static_cast<int>(first - this->list.begin()),
            static_cast<int>(last - first)
        };
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
            this->stopPlaceholderObserve();
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
        listInstanceCache[listViewId] = this->shared_from_this();
        
#if defined(OS_ANDROID)
        auto weakThis = this->weak_from_this();
        napi::v8_bridge::RunWithV8ScopeNoLocker(this->_sharedData->_env, [weakThis]() {
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

        auto groupIt = sectionGroupCache.find(listViewId);
        if (groupIt == sectionGroupCache.end()) {
            return;
        }
        auto &sectionGroup = groupIt->second;
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
        if (!this->scrollElement->IsNeedLayout()) {
            auto height = layoutPx2LogicPx(this->scrollElement->GetLayoutHeight());
            auto paddingTop = layoutPx2LogicPx(this->scrollElement->GetLayoutPaddingTop());
            auto paddingBottom = layoutPx2LogicPx(this->scrollElement->GetLayoutPaddingBottom());
            if (height && !std::isnan(height)) {
                if (std::isnan(paddingTop)) {
                    paddingTop = 0;
                }
                if (std::isnan(paddingBottom)) {
                    paddingBottom = 0;
                }
                this->updateContainerSize(height - paddingTop - paddingBottom);
            }
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
        this->startPlaceholderObserve();
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
        if (!this->listHeaderElement->IsNeedLayout()) {
            auto size = layoutPx2LogicPx(this->listHeaderElement->GetLayoutHeight());
            if (!std::isnan(size)) {
                this->updateHeaderSize(size);
            }
        }
        this->startHeaderObserve();
    }

    float RecycleList::getScrollToOffset(const std::shared_ptr<IRecycleListSection> &section, const std::string &key) {
        if (!section) {
            auto itemInfo = this->keyItemMap.find(key);
            if (itemInfo == this->keyItemMap.end()) {
                return -1.0f;
            }
            auto itemPtr = itemInfo->second;
            auto offset = itemPtr->offset;
            return offset;
        }
        if (key.empty()) {
            // 跳转到section开头或者section的header，不同于web平台的position sticky，我们认为这两个位置是一样的
            return section->offsetTop;
        }
        // 跳转到section内的item
        return section->offsetTop + std::dynamic_pointer_cast<RecycleListSection>(section)->getItemOffset(key);
    }

    void RecycleList::setScrollIntoViewKey(const std::string key) {
        if (key.empty()) {
            return;
        }
        auto offset = this->getScrollToOffset(nullptr, key);
        if (offset < 0.0f) {
            return;
        }
        this->cachedSizeStart = 0.0f;
        this->itemSizeChangedCompensation = 0.0f;
        this->scrollingToItem = true;
        this->scrollingToItemKey = key;
        this->scrollingToItemSection = nullptr;
        this->scrollingToItemOffset = offset;
        auto scrollWithAnimationAttr = this->scrollElement->getAnyAttribute("scroll-with-animation");
        if (const auto* b = std::any_cast<bool>(&scrollWithAnimationAttr)) {
            this->scrollingToItemWithAnimation = *b;
        }
        this->scrollingToItemTimestamp = getTimestamp();
        if (this->scrolling) {
            this->scrollingToItemIgnoreNextEnd = true;
        }
        /**
         * 此处直接调用element scrollTo遵循用户的scroll-with-animation属性
         */
        this->scrollElement->scrollTo(0, offset + this->headerSize);
    }

    void RecycleList::setScrollIntoViewId(const std::string id) {
        std::shared_ptr<IRecycleListSection> matchedSection;
        for (const auto &pair: this->sectionInstanceMap) {
            if (pair.second && pair.second->checkSectionOrHeaderId(id)) {
                matchedSection = pair.second;
                break;
            }
        }
        if (!matchedSection) {
            return;
        }
        this->setSectionScrollIntoViewKey(matchedSection, "");
    }

    void RecycleList::checkAndUpdateScrollingToItemOffset() {
        if (!this->scrollingToItem || this->destroyed) {
            return;
        }
        auto offset = this->getScrollToOffset(this->scrollingToItemSection, this->scrollingToItemKey);
        if (offset < 0) {
            return;
        }
        if (this->scrollingToItemOffset != offset) {
            this->scrollingToItemOffset = offset;
            // scrollTo会触发scrollEnd
            if (this->scrolling) {
                this->scrollingToItemIgnoreNextEnd = true;
            }
            uint64_t animationTimeRemain = 0;
            if (this->scrollingToItemWithAnimation) {
                auto timestamp = getTimestamp();
                animationTimeRemain = this->scrollingToItemTimestamp + this->scrollAnimationDuration - timestamp;
            }
            this->scrollTo(offset + this->headerSize, animationTimeRemain);
        }
    }

    void RecycleList::setSectionScrollIntoViewKey(std::shared_ptr<IRecycleListSection> section, std::string key) {
        auto offset = this->getScrollToOffset(section, key);
        if (offset < 0.0f) {
            return;
        }
        this->cachedSizeStart = 0.0f;
        this->itemSizeChangedCompensation = 0.0f;
        this->scrollingToItem = true;
        this->scrollingToItemSection = section;
        this->scrollingToItemKey = key;
        this->scrollingToItemOffset = offset;
        
        section->scrollingToItem = true;
        section->scrollingToItemKey = key;
        
        auto scrollWithAnimationAttr = this->scrollElement->getAnyAttribute("scroll-with-animation");
        if (const auto* b = std::any_cast<bool>(&scrollWithAnimationAttr)) {
            this->scrollingToItemWithAnimation = *b;
        }
        this->scrollingToItemTimestamp = getTimestamp();
        if (this->scrolling) {
            this->scrollingToItemIgnoreNextEnd = true;
        }
        this->scrollElement->scrollTo(0, offset + this->headerSize);
    }

    void RecycleList::setScrollAnchoring(bool enabled) {
        this->scrollAnchoringEnabled = enabled;
        if (enabled) {
            if (!this->scrolling) {
                this->updateScrollAnchorItem();
            }
        } else {
            this->scrollAnchorItemKey.clear();
        }
    }

    void RecycleList::setInitialScrollBottom(bool enabled) {
        this->initialScrollBottom = enabled;
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

    void RecycleList::startPlaceholderObserve() {
        if (this->placeholderElement) {
            this->placeholderResizeObserver = new UniResizeObserver(
                    [this](const std::vector<UniResizeObserverEntry> &entries) {
                        if (this->shouldAnchorToBottom()) {
                            this->anchorToBottom();
                            return;
                        }
                        if (!this->scrolling && this->scrollAnchoringEnabled) {
                            this->anchorToItem();
                        }
                    });
            this->placeholderResizeObserver->observe(this->placeholderElement);
        }
    }

    void RecycleList::stopPlaceholderObserve() {
        if (this->placeholderResizeObserver) {
            // this->headerResizeObserver->unobserve(this->listHeaderElement);
            delete this->placeholderResizeObserver;
            this->placeholderResizeObserver = nullptr;
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
         if (this->scrollElement && this->scrollListener) {
             this->scrollElement->removeEventListener(
                     this->scrollListener->getId());
             this->scrollListener = nullptr;
         }
         if (this->scrollElement && this->scrollEndListener) {
             this->scrollElement->removeEventListener(
                     this->scrollEndListener->getId());
             this->scrollEndListener = nullptr;
         }
    }

    void RecycleList::onScroll(const UniScrollEvent &event) {
        float scrollTop = std::max(0.0f, event.detail().scrollTop());
        /**
         * 过滤掉滚动到底部触发的滚动以及尺寸变化引发的滚动，其他滚动都认为由用户触发，用户触发滚动后则中断滚动到底部流程
         */
        if (this->initialScrollBottom &&
            this->maintainInitialScrollBottom &&
            !this->isScrollTopTriggerByAnchorToBottom(scrollTop) &&
            !this->isScrollAtBottom(scrollTop)) {
            this->maintainInitialScrollBottom = false;
        }
        if (!this->scrolling) {
            this->onScrollStart();
            this->scrolling = true;
        }
        if (scrollTop == 0 || scrollTop >= this->placeholderSize - this->size) {
            this->itemSizeChangedCompensation = 0;
        }
        if (scrollTop + this->itemSizeChangedCompensation < 0) {
            this->itemSizeChangedCompensation = 0;
            this->internalScrollTo(0, 0);
            return;
        }
        this->realScrollOffset = scrollTop;
        scrollTop = this->prepareFastScroll(scrollTop);
        this->updateScrollOffset(scrollTop);
    }

    void RecycleList::onScrollStart() {
        if (this->scrollTriggeredByList) {
            this->scrollTriggeredByList = false;
        }
        this->scrollAnchorItemKey.clear();
        const auto anchorItem = this->getSizeChangeAnchorItem();
        this->sizeChangeAnchorItemKey = anchorItem ? anchorItem->key : "";
        this->sizeChangeAnchorItemOffset = anchorItem ? anchorItem->offset : -1.0f;
        // 不考虑同一页面多个回收列表同时滚动的场景
        this->scrollElement->GetPage()->setRecycling(true);
        if (this->resetCachedSizeOnNextScroll && !this->scrollingToItem && !this->scrollingToAnchorItem) {
            this->cachedSizeStart = this->originalCachedSize;
            this->cachedSizeEnd = this->originalCachedSize;
        }
    }

    void RecycleList::onScrollEnd() {
        /**
         * 用户手指碰到scroll-view时如果scroll-view正在滚动会立刻触发scrollEnd
         */
        if (!this->scrolling) {
            return;
        }

        this->scrolling = false;
        this->sizeChangeAnchorItemKey.clear();
        this->sizeChangeAnchorItemOffset = -1.0f;
        this->scrollElement->GetPage()->setRecycling(false);
        auto exitFastScrollMode = this->fastScrolling;
        if (this->fastScrolling) {
            this->leaveFastScrollMode();
        }

        if (this->ignoreNextFastScroll) {
            this->ignoreNextFastScroll = false;
        }

        if (this->scrollingToItemIgnoreNextEnd) {
            this->scrollingToItemIgnoreNextEnd = false;
        } else if (this->scrollingToItem) {
            this->scrollingToItem = false;
            this->scrollingToItemKey.clear();
            this->resetCachedSizeOnNextScroll = true;
            if (this->scrollingToItemSection) {
                this->scrollingToItemSection->scrollingToItemKey.clear();
                this->scrollingToItemSection->scrollingToItem = false;
                this->scrollingToItemSection = nullptr;
            }
        }
        
        if (this->scrollingToAnchorItem) {
            this->scrollingToAnchorItem = false;
        }
        if (this->scrollAnchoringEnabled) {
            this->updateScrollAnchorItem();
        }

        bool renderNextFrame = false;
        float nextScrollTop = -1.0f;
        if (this->itemSizeChangedCompensation != 0.0f) {
            auto compensation = this->itemSizeChangedCompensation;
            this->itemSizeChangedCompensation = 0;
            auto renderScrollOffset = std::max(0.0f, this->realScrollOffset + compensation);
            nextScrollTop = renderScrollOffset;
            this->realScrollOffset = renderScrollOffset;
            this->scrollOffset = renderScrollOffset;
            this->ignoreNextFastScroll = true;
            renderNextFrame = true;
        } else if (this->scrollOffset != this->realScrollOffset || exitFastScrollMode) {
            this->scrollOffset = this->realScrollOffset;
            renderNextFrame = true;
        }
        /**
         * 必须先清理锚定信息，否则可能导致internalScrollTo触发滚动+updateRenderListOnScroll更新transform时闪烁
         */
        if (nextScrollTop >= 0.0f) {
            this->scrollAnchorItemKey.clear();
            this->scrollAnchorItemOffset = 0;
        }
        if (renderNextFrame) {
            this->updateMinMaxRenderOffset();
            this->updateRenderListOnScroll();
            this->broadcastScrollContext();
        }
        /**
         * 必须放在最后，scrollTo可能会同步触发scroll、scrollEnd
         * 如果不放在最后可能导致两次scrollEnd混在一起执行
         */
        if (nextScrollTop >= 0.0f) {
            this->internalScrollTo(nextScrollTop, 0);
        }
    }

    void RecycleList::updateScrollAnchorItem() {
        if (this->scrollOffset == 0) {
            this->scrollAnchorItemKey.clear();
            this->scrollAnchorItemOffset = 0;
            return;
        }
        this->totalAnchorScrollBy = 0;
        for (int i = this->renderRangeStart; i < this->renderRangeStart + this->renderRangeLength; i++) {
            const auto &item = this->list[i];
            if (item.offset <= this->scrollOffset && this->itemEndOffset(&item) >= this->scrollOffset) {
                this->scrollAnchorItemKey = item.key;
                this->scrollAnchorItemOffset = item.offset;
                break;
            }
        }
    }

    void RecycleList::anchorToBottom() {
        /**
         * 目前有两处调用anchorToBottom
         * - 设置placeholderHeight之前
         * - placeholder高度变化之后
         * 设置placeholderHeight之前调用是为了尽量及时的滚动到底部可减少部分视觉闪烁
         * placeholder高度变化之后调用是因为前者并不一定是能滚动到的位置，关于什么时候能滚动其实衔接的不是很好，似乎也没法做到更好了
         */
        if (!this->scrollElement || this->scrolling || !this->shouldAnchorToBottom()) {
            return;
        }
        auto scrollHeight = std::max(this->placeholderSize + this->headerSize, this->scrollElement->getScrollHeight());
        auto offsetHeight = this->size;
        if (scrollHeight > offsetHeight) {
            auto scrollTop = scrollHeight - offsetHeight;
            /**
             * 此处移除了一个判断scrollTop != this->realScrollOffset
             * 其他逻辑可能会更新realScrollOffset使其和当前真实scrollTop不一致
             * 为了与其他逻辑解耦移除此判断
             */
            this->internalScrollTo(scrollHeight - offsetHeight, 0);
        }
    }

    /**
     * 判断是否滚动到底部
     * 此条件用于过滤由尺寸变化引发的滚动
     */
    bool RecycleList::isScrollAtBottom(float scrollTop) const {
        if (!this->scrollElement) {
            return false;
        }
        auto maxScrollTop = std::max(0.0f,
                                     std::min(this->placeholderSize + this->headerSize, this->scrollElement->getScrollHeight()) -
                                     this->size);
        return scrollTop >= maxScrollTop - this->calcToleranceNormal;
    }

    void RecycleList::anchorToItem() {
        if (this->scrolling || !this->scrollAnchoringEnabled || this->scrollAnchorItemKey.empty() || this->shouldAnchorToBottom()) {
            return;
        }
        this->updateItemOffset();
        auto oldOffset = this->scrollAnchorItemOffset;
        auto anchorItem = this->getItemInfo(this->scrollAnchorItemKey);
        if (!anchorItem) {
            return;
        }
        auto newOffset = anchorItem->offset;
        this->queueScrollBy(newOffset - oldOffset);
    }

    float RecycleList::prepareFastScroll(float offset) {
        auto timestamp = getTimestamp();
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

        bool ignoreFastScrollMode = this->ignoreNextFastScroll || offset < 1.0f || offset >
                                                     this->placeholderSize -
                                                     this->size - 1.0f;
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
                    this->cachedSizeStart = this->scrollingToItem ? 0.0f : scrollDirectionCachedSize;
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
        this->fastScrollOffset = 0.0f;
    }

    void RecycleList::leaveFastScrollMode() {
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
        this->resetCachedSizeOnNextRender = true;
    }

    /**
     * updateList和item的updateKey不同，可以使用同步方式更新，因为发起updateList的并非renderEffect
     *
     * 修改历史
     * - 为实现滚动锚定，updateList改为由组件通过napi同步调用。因为js侧发起updateList后会触发js侧的渲染范围重新计算，如果updateList不是同步调用，会先在js侧渲染新内容，native更新后再锚定。同步调用native的updateList会同步触发js侧渲染范围更新，不会闪。
     * - 同步updateList引发了一些副作用，改回了sharedData通道调用
     *   + [开启 scroll-anchoring 后追加消息可能出现白屏](https://issues.dcloud.net.cn/pages/issues/detail?id=32913)
     *   + [列表内容多次同步更新时界面跳动](https://issues.dcloud.net.cn/pages/issues/detail?id=32604)
     */
    void RecycleList::updateList(const std::vector<std::string> &keyList) {
        this->sizeChangeAnchorItemKey.clear();
        this->itemSizeChangedCompensation = 0;
        this->updateKeyList(keyList);
        auto scrollAnchorToItem = this->shouldScrollAnchorToItem();
        if (scrollAnchorToItem) {
            auto oldOffset = this->scrollAnchorItemOffset;
            auto anchorItem = this->getItemInfo(this->scrollAnchorItemKey);
            if (anchorItem) {
                auto newOffset = anchorItem->offset;
                auto delta = newOffset - oldOffset;
                this->scrollOffset += delta;
                this->realScrollOffset += delta;
                this->updateMinMaxRenderOffset();
            } else {
                this->scrollAnchorItemKey.clear();
            }
        } else if (this->shouldAnchorToBottom()) {
            this->preAnchorToBottom();
        }
        this->onItemListRelayout();
        if (!this->scrolling && this->scrollAnchoringEnabled && this->scrollAnchorItemKey.empty()) {
            this->updateScrollAnchorItem();
        }
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

    float RecycleList::getItemBaseOffset() {
        return this->fastScrollOffset - this->itemSizeChangedCompensation;
    }

    void RecycleList::updateItemSize(const std::string &key, float size) {
        auto itemPtr = this->findItem(key);
        if (!itemPtr) {
            return;
        }
        auto change = this->updateStoredItemSize(key, size);
        if (!change.changed) {
            return;
        }
        this->rebuildItemOffsetsFrom(0);
        auto scrollAnchorToItem = this->shouldScrollAnchorToItem();
        if (scrollAnchorToItem) {
            this->updatePlaceholderHeight();
            return;
        } else if (this->shouldAnchorToBottom()) {
            this->preAnchorToBottom();
        }
        if (this->scrollingToItem) {
            this->checkAndUpdateScrollingToItemOffset();
        }
        this->onItemSizeRelayout();
    }

    void RecycleList::scrollTo(float offset, float duration) {
        if (!this->scrollElement) {
            return;
        }
#if defined(OS_IOS)
        this->scrollElement->scrollTo(0, offset, 0);
#else
        this->scrollElement->scrollTo(0, offset, duration);
#endif
    }

    void RecycleList::internalScrollTo(float offset, float duration) {
        if (this->shouldAnchorToBottom()) {
            this->anchorToBottomHistory.push_back(offset);
        }
        this->scrollTo(offset, duration);
    }

    void RecycleList::queueScrollBy(float offset) {
        if (!this->scrollElement) {
            return;
        }
        // TODO 需要更健壮的方案来保证最后一次scrollBy的offset是最终的offset，暂时没有更好的办法
        this->totalAnchorScrollBy += offset;
        this->scrollingToAnchorItem = true;
        this->cachedSizeStart = 0.0f;
        this->resetCachedSizeOnNextScroll = true;
        this->scrollTo(this->scrollElement->getScrollTop() + this->totalAnchorScrollBy, 0);
    }

    /**
     * 提前根据预估placeholder尺寸得到目标滚动位置
     */
    void RecycleList::preAnchorToBottom() {
        if (this->list.empty()) {
            return;
        }
        auto nextPlaceholderSize = this->itemEndOffset(&this->list.back());
        this->scrollOffset = nextPlaceholderSize - this->size;
        this->realScrollOffset = this->scrollOffset;
        this->updateMinMaxRenderOffset();
    }

    void RecycleList::syncDefaultItemSize(float size) {
        for (const auto &pair: this->sectionInstanceMap) {
            if (pair.second) {
                pair.second->applyDefaultItemSize(size);
            }
        }
    }

    void RecycleList::onItemOffsetChange(const std::string key, float offset) {
        if (!this->scrollingToItem && this->scrolling) {
            if (this->sizeChangeAnchorItemKey == key) {
                this->itemSizeChangedCompensation = offset - this->sizeChangeAnchorItemOffset;
                this->updateMinMaxRenderOffset();
            }
        }
    }

    void RecycleList::onItemListRelayout() {
        this->updateRenderList();
    }

    void RecycleList::onItemSizeRelayout() {
        if (this->isAllRenderItemSettled()) {
            this->updateRenderListOnItemSizeChange();
        }
    }

    void RecycleList::updateContainerSize(float size) {
        if (this->size != size) {
            this->size = size;
            this->updateMinMaxRenderOffset();
            this->updateRenderList();
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
        auto scrollAnchorToItem = this->shouldScrollAnchorToItem();
        if (scrollAnchorToItem && oldHeaderSize != this->headerSize) {
            this->queueScrollBy(oldHeaderSize - this->headerSize);
            return;
        }
        this->updateRenderList();
        this->broadcastScrollContext();
    }

    void RecycleList::updatePlaceholderHeight() {
        auto sectionMode = this->sectionInstanceMap.size() > 0;
        if (sectionMode) {
            return;
        }
        float _placeholderSize = 0.0f;
        if(!this->list.empty()) {
            const auto lastItem = &this->list.back();
            _placeholderSize = this->itemEndOffset(lastItem);
        }
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
         * 滚动期间持续消耗补偿值，避免一次性消耗过大引起跳动，除数是随便写的一个值，没有什么特别的。希望滚动期间抖动更小，就把分母改大一点。
         * 注意如果分母太大会导致滚动结束时补偿值剩余过多仍然会跳动。
         * 采用此方案而不是在滚动结束后一次消耗，是因为滚动结束后同时调整scrollTop和item的translateY无法确保在同一帧渲染完成，会引发明显跳动。
         * 禁用滚动期间补偿值消费，此逻辑会导致滚动期间看起来不流畅
         */
//        if (this->itemSizeChangedCompensation != 0) {
//            auto compensationAbs = std::abs(this->itemSizeChangedCompensation);
//            auto compensationDecrease = deltaAbs / 3;
//            if (compensationAbs > compensationDecrease) {
//                auto sign = this->itemSizeChangedCompensation / compensationAbs;
//                this->itemSizeChangedCompensation -=
//                        compensationDecrease * sign;
//                if(std::abs(this->itemSizeChangedCompensation) <= 1.0f) {
//                    this->itemSizeChangedCompensation = 0;
//                }
//            } else {
//                this->itemSizeChangedCompensation = 0;
//            }
//        }

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
                               this->itemSizeChangedCompensation + this->calcToleranceNormal);
        this->maxRenderOffset = pureOffset + this->size + this->cachedSizeEnd +
                                this->itemSizeChangedCompensation - this->calcToleranceNormal;
    }

    void RecycleList::preTriggerRenderListUpdate() {
        if (this->destroyed) {
            return;
        }
        
        this->triggerRenderListUpdate();
        // 退出快速滚动的下一帧使用重置的cachedSize
        if (this->resetCachedSizeOnNextRender) {
            this->cachedSizeStart = this->scrollingToItem ? 0.0f : this->originalCachedSize;
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
        
        if (!this->shouldScrollAnchorToItem()) {
            this->updateItemOffset();
        }
        
        this->updatePlaceholderHeight();

        if (renderInfoChanged || this->forceRenderInfoUpdate) {
            this->forceRenderInfoUpdate = false;
            auto sharedData = this->_sharedData;
            if (!canCallVueComponentMethod(this)) {
                return;
            }
#if defined(OS_ANDROID)
            auto weakThis = this->weak_from_this();
            napi::v8_bridge::RunWithV8ScopeNoLocker(sharedData->_env, [weakThis, sharedData]() {
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
        auto [start, length] = this->getRenderRange(this->minRenderOffset, this->maxRenderOffset);
        this->renderRangeStart = start;
        this->renderRangeLength = length;
        this->preTriggerRenderListUpdate();
    }

    void RecycleList::updateRenderListOnItemSizeChange() {
        auto [start, length] = this->getRenderRange(this->minRenderOffset, this->maxRenderOffset);
        this->renderRangeStart = start;
        this->renderRangeLength = length;
        this->preTriggerRenderListUpdate();
    }

    void RecycleList::updateRenderListOnScroll() {
         this->updateRenderList();
    }

    float RecycleList::getItemOffset(const std::string &key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return -1.0f;

        ItemInfo *itemPtr = it->second;
        return itemPtr->offset + this->getItemBaseOffset();
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
                    const int size = static_cast<int>(sectionElements.size());
                    for (int i = size - 1; i >= 0; --i) {
                        sectionElements[i]->UpdateStyle(
                            UniCSSPropertyID::ZIndex,
                            size - i
                        );
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
                    currentSection->updateOffsetTop(offsetTop);
                    currentSection->onScrollContextUpdate(
                            this->getScrollContext());
                }
                offsetTop += currentSection->placeholderSize;
                currentSection->prevSection = prevSection;
                if (prevSection) {
                    prevSection->nextSection = currentSection;
                }
                prevSection = currentSection;
            }
        }
        if (prevSection) {
            prevSection->nextSection = nullptr;
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
                currentSection->updateOffsetTop(offsetTop);
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
                    nextSection->updateOffsetTop(offsetTop);
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
                                                   this->cachedSizeStart + this->calcToleranceNormal);
        // 此步骤未限制renderEndOffset，后续使用时判断
        context.renderEndOffset =
                this->scrollOffset + this->size + this->cachedSizeEnd - this->calcToleranceNormal;
        context.fastScrollOffset = this->fastScrollOffset;
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

    void RecycleListSection::bindElementConnectListener(Element *element) {
        if (this->connectListenerElement == element) {
            return;
        }
        this->unbindElementConnectListener();
        auto aliveToken = element ? element->GetAliveToken() : nullptr;
        if (!element || !aliveToken ||
            !aliveToken->load(std::memory_order_acquire)) {
            return;
        }
        auto weakThis = this->weak_from_this();
        this->connectListenerElement = element;
        this->connectListenerElementAliveToken = std::move(aliveToken);
        this->connectListenerId = element->AddConnectListener(
                [weakThis, element](bool connected) {
                    auto self = weakThis.lock();
                    if (!self || self->destroyed ||
                        self->viewElement != element) {
                        return;
                    }
                    self->nextSection = nullptr;
                    self->prevSection = nullptr;
                    auto listView = self->getListView();
                    if (!listView) {
                        return;
                    }
                    listView->linkSection();
                    if (connected) {
                        self->syncFromRecycleList();
                    }
                });
    }

    void RecycleListSection::unbindElementConnectListener() {
        if (this->connectListenerElement &&
            this->connectListenerId != kInvalidElementConnectListenerId &&
            this->connectListenerElementAliveToken &&
            this->connectListenerElementAliveToken->load(
                    std::memory_order_acquire)) {
            this->connectListenerElement->RemoveConnectListener(
                    this->connectListenerId);
        }
        this->connectListenerElement = nullptr;
        this->connectListenerElementAliveToken.reset();
        this->connectListenerId = kInvalidElementConnectListenerId;
    }

    void RecycleListSection::setDestroyed(bool destroyed) {
        if (this->destroyed == destroyed) {
            return;
        }
        this->destroyed = destroyed;
        if (destroyed) {
            this->unbindElementConnectListener();
            this->placeholderSize = 0;
            this->bindStickyHeader(nullptr);
            this->unregisterSectionBinding(this->listViewId, this->sectionId);
            this->nextSection = nullptr;
            this->prevSection = nullptr;
            this->viewElement = nullptr;
            this->itemInstanceMap.clear();
        }
    }

    void RecycleListSection::setElement(Element *element) {
        if (this->destroyed) {
            return;
        }
        auto viewElement = dynamic_cast<UniViewElement *>(element);
        if (this->viewElement != viewElement) {
            this->nextSection = nullptr;
            this->prevSection = nullptr;
            this->viewElement = viewElement;
            this->bindElementConnectListener(viewElement);
        }
        if (!this->viewElement) {
            return;
        }
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

    void RecycleListSection::setScrollIntoViewKey(const std::string key) {
        if (key.empty()) {
            return;
        }
        auto listView = this->getListView();
        if (!listView) {
            return;
        }
        listView->setSectionScrollIntoViewKey(this->shared_from_this(), key);
    }

    /**
     * 不同于web平台position sticky，section和header我们认为其顶部位置是相同的
     */
    bool RecycleListSection::checkSectionOrHeaderId(std::string id) {
        if (id.empty()) {
            return false;
        }
        if (this->viewElement && this->viewElement->id == id) {
            return true;
        }
        if (this->stickyHeader && this->stickyHeader->viewElement && this->stickyHeader->viewElement->id == id) {
            return true;
        }
        return false;
    }

    void RecycleListSection::scrollIntoView() {
        
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
        auto listView = this->getListView();
        if (!listView) {
            return;
        }
        auto context = listView->getScrollContext();
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
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void RecycleListSection::onItemSizeRelayout() {
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
        auto listView = this->getListView();
        if (listView) {
            listView->onSectionPushPinnedHeaderChange(this->sectionId, this->shared_from_this());
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
        napi::v8_bridge::RunWithV8ScopeNoLocker(this->_sharedData->_env, [weakThis]() {
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

        auto listView = this->getListView();
        bool shouldSyncFromList = false;
        if (listView) {
            listView->registerSection(this->sectionId, this->shared_from_this());
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

    float RecycleListSection::getItemBaseOffset() {
        return this->headerSize;
    }

    void RecycleListSection::updateRenderInfo(int renderRangeStart,
                                              int renderRangeLength) {
        // list-item在更新key之后主动获取offset进行更新，此时机用于更新已经显示的item的offset
        // 遍历this->itemInstanceMap，更新所有已渲染item的offset
        this->updateItemOffset();

        if (this->renderRangeStart == renderRangeStart &&
            this->renderRangeLength == renderRangeLength && !this->forceRenderInfoUpdate) {
            return;
        }
        this->renderRangeStart = renderRangeStart;
        this->renderRangeLength = renderRangeLength;
        this->forceRenderInfoUpdate = false;

        auto sharedData = this->_sharedData;
        if (!canCallVueComponentMethod(this)) {
            return;
        }
#if defined(OS_ANDROID)
        auto weakThis = this->weak_from_this();
        napi::v8_bridge::RunWithV8ScopeNoLocker(sharedData->_env, [weakThis, sharedData]() {
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
        this->updatePlaceholderSize();
        this->syncFromRecycleList();
    }

    void RecycleListSection::syncDefaultItemSize(float size) {
        if (size <= 0.0f || std::isnan(size) ||
            !isValidListViewId(this->listViewId)) {
            return;
        }
        defaultItemSizeCache[this->listViewId] = size;
        auto listView = this->getListView();
        if (listView) {
            listView->syncDefaultItemSize(size);
        }
    }

    void RecycleListSection::updateOffsetTop(float offsetTop) {
        this->offsetTop = offsetTop;
        if (this->scrollingToItem) {
            auto listView = this->getListView();
            if (listView) {
                listView->checkAndUpdateScrollingToItemOffset();
            }
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
            auto listView = this->getListView();
            if (listView) {
                listView->onSectionSizeChange(sectionId, this->shared_from_this());
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
        if (sectionTopInContainer + this->calcToleranceNormal >
            visibleBottomInContainer ||
            sectionBottomInContainer - this->calcToleranceNormal <
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

        // sticky 吸顶偏移需要限制在 section 内部，避免越过 section 底部。pushPinnedHeader为 false 时可以超出 section 底部
        auto stickyRaw = context.scrollTop + prevHeaderPinnedSize - sectionTopInContainer;
        auto stickyMax = this->pushPinnedHeader ? std::max(0.0f, sectionHeight - this->headerSize) : std::numeric_limits<float>::infinity();
        auto stickyHeaderOffset = std::min(
            std::max(0.0f, stickyRaw - this->calcToleranceStrict), stickyMax);
        
        if (this->stickyHeader) {
            this->stickyHeader->applyHeaderOffset(stickyHeaderOffset);
        }

        if (!this->preload && (sectionBottomInContainer < renderStartOffset ||
            sectionTopInContainer > renderEndOffset)) {
            this->updateRenderInfo(0, 0);
            return;
        }

        // section 内可见范围（相对 section 顶部）
        auto visibleTopInSection = renderStartOffset - sectionTopInContainer;
        auto visibleBottomInSection = renderEndOffset - sectionTopInContainer;

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
            auto [start, length] = this->getRenderRange(visibleTop, visibleBottom);
            this->updateRenderInfo(start, length);
        }
    }

    void RecycleListSection::applySectionOffset(float offset) {
        if (!this->viewElement || !isValidVueComponent(this)) {
            return;
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
        auto change = this->updateStoredItemSize(key, size);
        if (!change.changed) {
            return;
        }

        auto shouldSyncDefaultItemSize =
                !this->hasSyncedDefaultItemSize && change.wasUnknown;
        if (shouldSyncDefaultItemSize) {
            this->syncDefaultItemSize(size);
            return;
        }
        this->rebuildItemOffsetsFrom(0);
        if (this->scrollingToItem && !this->scrollingToItemKey.empty()) {
            auto listView = this->getListView();
            if (listView) {
                listView->checkAndUpdateScrollingToItemOffset();
            }
        }
        this->onItemSizeRelayout();
    }

    float RecycleListSection::getItemOffset(const std::string &key) {
        auto it = this->keyItemMap.find(key);
        if (it == this->keyItemMap.end())
            return -1.0f;

        ItemInfo *itemPtr = it->second;
        // item的实际offset需要加上header高度（header是sticky-header，position: absolute）
        return itemPtr->offset + this->getItemBaseOffset();
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
        if (!this->viewElement || this->viewElement->IsNeedLayout()) {
            return;
        }
        this->setSize(layoutPx2LogicPx(this->viewElement->GetLayoutHeight()));
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
        if (std::isnan(size) || size < 0.0f || this->size == size) {
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
        if (!this->key.empty()) {
            this->removeInstance(this->key);
        }
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
        if (!this->viewElement || this->viewElement->IsNeedLayout() || !this->viewElement->isConnected() || !this->viewElement->HasLayout()) {
            return;
        }
        auto layoutHeightPx = this->viewElement->GetLayoutHeight();
        auto size = layoutPx2LogicPx(layoutHeightPx);
        if (!std::isnan(size)) {
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
        if (this->key.empty() || this->size < 0.0f) {
            return;
        }
        auto recycleList = this->getRecycleContainer();
        if (recycleList) {
            recycleList->updateItemSize(this->key, this->size);
        }
    }

    void RecycleListItem::setSize(float size) {
        // 过滤排版器返回的NaN
        if (std::isnan(size) || size < 0.0f) {
            return;
        }
        this->size = size;
        this->updateItemSize();
    }

    /**
     * 注意item的updateKey不能改成同步，因为updateKey在js侧是由renderEffect->renderList触发的
     * 而在c层会触发updateKey -> updateItemSize -> updateRenderInfo->renderEffect导致任务批次混乱
     */
    void RecycleListItem::updateKey(const std::string &key) {
        auto prevKey = this->key;
        bool isKeyUpdated = prevKey != key;
        if (isKeyUpdated) {
            if (!prevKey.empty()) {
                this->removeInstance(prevKey);
            }
        }
        this->key = key;
        this->setInstance(key);
        // key变更后需要重置offset
        this->offset = -1.0f;
        this->getAndUpdateItemOffset();
        this->initSize();
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
