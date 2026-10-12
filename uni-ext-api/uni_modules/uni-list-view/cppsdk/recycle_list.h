#pragma once

#include <atomic>
#include "dom/resize_observer.h"
#include "dom/scroll_element.h"
#include "event/event_listener.h"
#include "event/scroll_event.h"
#include "page/page.h"
#include "runtime_instance.h"
#include "sdk.h"
#include "vue/uni_vue_component.h"
#include <cstdint>
#include <functional>
#include <memory>
#include <string>
#include <unordered_map>
#include <vector>
#include "util/helper.h"
#include "interface/UniCSSProperty.h"
#include "interface/UniCSSTransform.h"

namespace recycle_list {
    using namespace uniappx;
    using uniappx::Element;
    using uniappx::EventListener;
    using uniappx::UniResizeObserver;
    using uniappx::UniScrollEvent;
    using vue::UniVueComponent;

    class RecycleListHeader;

// common start
    struct ScrollContext {
        float scrollTop = 0.0f;
        float containerSize = 0.0f;
        float headerSize = 0.0f;
        float renderStartOffset = 0.0f;
        float renderEndOffset = 0.0f;
        float fastScrollOffset = 0.0f;
    };

    enum ListDataStatus : uint32_t {
        ListDataStatusNotInitialized = 0,
        ListDataStatusInitialized = 1,
        ListDataStatusUpdated = 2
    };

    class IRecycleListSection {
    public:
        virtual ~IRecycleListSection() = default;

        double listViewId = 0.0;
        double sectionId = 0.0;
        float placeholderSize = 0.0f;
        float headerSize = 0.0f;
        // 此offsetTop为相对于listBody的偏移，未包含listHeader的高度
        float offsetTop = 0.0f;
        bool pushPinnedHeader = true;
        std::shared_ptr<IRecycleListSection> nextSection = nullptr;
        std::shared_ptr<IRecycleListSection> prevSection = nullptr;
        uniappx::UniViewElement *viewElement = nullptr;
        
        std::string scrollingToItemKey;
        bool scrollingToItem = false;

        virtual void onScrollContextUpdate(const ScrollContext &context) = 0;
        virtual void syncFromRecycleList() = 0;
        virtual void applyDefaultItemSize(float size) = 0;
        virtual void updateOffsetTop(float offsetTop) = 0;
        virtual bool checkSectionOrHeaderId(std::string id) = 0;
        virtual void scrollIntoView() = 0;
    };

    class IRecycleListItem {
    public:
        virtual ~IRecycleListItem() = default;
        
        float size = -1.0f;

        virtual void updateItemOffset(float offset) {}
    };

    class IRecycleList {
    public:
        /**
         * 滚动到指定item
         */
        bool scrollingToItem = false;
        std::shared_ptr<IRecycleListSection> scrollingToItemSection = nullptr;
        uint64_t scrollingToItemTimestamp = 0;
        bool scrollingToItemWithAnimation = false;
        uint64_t scrollAnimationDuration = 300;
        bool scrollingToItemIgnoreNextEnd = false;
        float scrollingToItemOffset = 0.0f;
        std::string scrollingToItemKey;

        bool scrolling = false;
        /**
         * 是否需要持续维持初始滚动到底部
         * 发生离开底部的滚动后停止维持
         */
        bool maintainInitialScrollBottom = true;
        bool scrollAnchoringEnabled = false;
        bool scrollingToAnchorItem = false;

        bool initialScrollBottom = false;
        /**
         * 暂时仅处理无动画scroll，有动画的后续有需求再处理
         */
        bool scrollTriggeredByList = false;

        virtual void linkSection() = 0;

        virtual void
        registerSection(double sectionId, std::shared_ptr<IRecycleListSection> section) = 0;

        virtual void
        unregisterSection(double sectionId, std::shared_ptr<IRecycleListSection> section) = 0;

        virtual void
        onSectionSizeChange(double sectionId, std::shared_ptr<IRecycleListSection> section) = 0;

        virtual void
        onSectionPushPinnedHeaderChange(double sectionId, std::shared_ptr<IRecycleListSection> section) = 0;

        virtual ScrollContext
        getScrollContext() const { return ScrollContext(); };

        virtual void syncDefaultItemSize(float size) = 0;
        
        virtual void setSectionScrollIntoViewKey(std::shared_ptr<IRecycleListSection> section, std::string key) = 0;
        
        virtual void checkAndUpdateScrollingToItemOffset() = 0;
    };

    class IRecycleContainer {
    public:
        virtual ~IRecycleContainer() = default;

        float calcToleranceLoose = 1.0f;
        float calcToleranceNormal = 0.2f;
        float calcToleranceStrict = 0.01f;
        std::unordered_map<std::string, IRecycleListItem *> itemInstanceMap;


        virtual void updateItemSize(const std::string &key, float size) = 0;
        virtual float getItemOffset(const std::string &key) { return 0.0f; }
        virtual float getItemSize(const std::string &key) { return -1.0f; }
        virtual void onItemOffsetChange(const std::string key, float offset) = 0;
    };

    class RecycleListItemDataStore : public IRecycleContainer {
    protected:
        struct ItemInfo {
            int index = 0;
            std::string key;
            float size = -1.0f;
            float offset = 0.0f;
            int type = 0;
        };

        struct ItemSizeChange {
            bool changed = false;
            int index = -1;
            float delta = 0.0f;
            bool wasUnknown = false;
        };

        std::vector<std::string> keyList;
        std::vector<ItemInfo> list;
        std::unordered_map<std::string, ItemInfo *> keyItemMap;
        float defaultItemSize = 150.0f;
        bool forceRenderInfoUpdate = false;
        bool destroyed = false;

        int32_t listDataStatus = ListDataStatusNotInitialized;

        void updateKeyList(const std::vector<std::string> &keyList);

        ItemSizeChange updateStoredItemSize(const std::string &key, float size);

        void rebuildItemOffsetsFrom(size_t startIndex);
        
        void updateItemOffset();

        inline float realItemSize(float size) const {
            return size < 0 ? defaultItemSize : size;
        }

        inline float itemEndOffset(const ItemInfo *item) const {
            return item->offset + realItemSize(item->size);
        }

        ItemInfo *findItem(const std::string &key);

        float getStoredItemSize(const std::string &key);

        virtual void onItemListRelayout() = 0;

        virtual void onItemSizeRelayout() = 0;
        
        virtual float getItemBaseOffset() = 0;

    public:
        int renderRangeStart = 0;
        int renderRangeLength = 0;
        int lastRenderRangeStart = 0;
        int lastRenderRangeLength = 0;

        float getItemSize(const std::string &key) override;

        std::tuple<int, int> getRenderRange(float minRenderOffset, float maxRenderOffset);
    };
// common end

// RecycleListSection start
    class RecycleListSection
            : public std::enable_shared_from_this<RecycleListSection>,
              public UniVueComponent,
              public IRecycleListSection,
              public RecycleListItemDataStore {
    private:
        // UniViewElement *viewElement = nullptr;
        uniappx::UniViewElement *placeholderElement = nullptr;
        std::shared_ptr<RecycleListHeader> stickyHeader = nullptr;
        bool hasSyncedDefaultItemSize = false;
        float offset = 0.0f;
        bool preload = false;
        Element *connectListenerElement = nullptr;
        std::shared_ptr<std::atomic<bool>> connectListenerElementAliveToken;
        ElementConnectListenerId connectListenerId = kInvalidElementConnectListenerId;

        std::shared_ptr<IRecycleList> getListView();

        void updateRenderInfo(int renderRangeStart, int renderRangeLength);

        void updatePlaceholderSize();

        void applySectionOffset(float offset);

        void unregisterSectionBinding(double listViewId, double sectionId);

        void bindElementConnectListener(Element *element);

        void unbindElementConnectListener();

        void onItemListRelayout() override;

        void onItemSizeRelayout() override;
                  
        float getItemBaseOffset() override;

    public:
        RecycleListSection();

        ~RecycleListSection();

        void syncFromRecycleList() override;

        void setElement(Element *element);

        void setPlaceholderElement(Element *element);

        void bindStickyHeader(std::shared_ptr<RecycleListHeader> header);

        void setPreload(bool preload);

        void setPushPinnedHeader(bool pushPinnedHeader);

        void setListViewId(double listViewId);

        void setSectionId(double sectionId);

        void setScrollIntoViewKey(const std::string key);
    
        void setDestroyed(bool destroyed);

        void updateList(const std::vector<std::string> &keyList);

        void updateHeaderSize(float size);

        void onScrollContextUpdate(const ScrollContext &context) override;

        // IRecycleContainer interface implementation
        void updateItemSize(const std::string &key, float size) override;

        float getItemOffset(const std::string &key) override;

        void applyDefaultItemSize(float size) override;

        void syncDefaultItemSize(float size);

        void updateOffsetTop(float offsetTop) override;

        bool checkSectionOrHeaderId(std::string id) override;
        
        void scrollIntoView() override;
        void onItemOffsetChange(const std::string key, float offset) {}
    };
// RecycleListSection end

// RecycleListHeader start
    class RecycleListHeader : public std::enable_shared_from_this<RecycleListHeader>,
            public UniVueComponent {
    private:
        UniResizeObserver *resizeObserver = nullptr;
        float offset = 0.0f;

        std::shared_ptr<RecycleListSection> getSection();

        void startObserve();

    public:
        RecycleListHeader();

        ~RecycleListHeader();
                
        uniappx::UniViewElement *viewElement = nullptr;
        double listViewId = 0.0;
        double sectionId = 0.0;

        float size = 0.0f;

        void setSize(float size);

        void initSize();

        void applyHeaderOffset(float stickyOffset);

        void setElement(Element *element);

        void setSectionId(double sectionId);
    };
// RecycleListHeader end

// RecycleListItem start
    class RecycleListItem
            : public std::enable_shared_from_this<RecycleListItem>,
              public UniVueComponent,
              public IRecycleListItem {
    private:
        float offset = -1.0f;
        uniappx::UniViewElement *viewElement = nullptr;
        UniResizeObserver *resizeObserver = nullptr;

        void setInstance(const std::string &key);

        void removeInstance(const std::string &key);

        std::shared_ptr<IRecycleContainer> getRecycleContainer();

        void startObserve();

        void stopObserve();

        bool isCurrentElementAttached();

        void initSize();

        void applyItemOffset(float offset);

    public:
        RecycleListItem();

        ~RecycleListItem();

        float getSize();

        void setSize(float size);

        /**
         * listViewId第一个合法值为1.0
         */
        double listViewId = 0.0;
        double sectionId = 0.0;
        std::string key;

        void setElement(Element *element);

        void updateKey(const std::string &key);

        void setSectionId(double sectionId);

        void updateItemSize();

        void updateItemOffset(float offset) override;

        void getAndUpdateItemOffset();

        void setListViewId(double listViewId);

        void queueRenderTask(std::function<void()>&& callback) {
            auto weakThis = this->weak_from_this();
            Instance::GetTaskExecutor().runOnDomQueue(
                    [weakThis, cb = std::move(callback)]() {
                        auto self = weakThis.lock();
                        if (!self || !self->viewElement) {
                            return;
                        }
                        self->viewElement->QueueRenderTask([callback = std::move(cb)]() {
                            callback();
                        });
                    });
        }
    };
// RecycleListItem end

// RecycleList start
    class RecycleList : public std::enable_shared_from_this<RecycleList>,
                        public UniVueComponent,
                        public IRecycleList,
                        public RecycleListItemDataStore {
    private:
        uniappx::UniScrollViewElement *scrollElement = nullptr;
        uniappx::UniViewElement *listHeaderElement = nullptr;
        uniappx::UniViewElement *placeholderElement = nullptr;
        uniappx::UniViewElement *listBodyElement = nullptr;
        std::shared_ptr<EventListener> scrollListener = nullptr;
        std::shared_ptr<EventListener> scrollEndListener = nullptr;
        UniResizeObserver *resizeObserver = nullptr;
        UniResizeObserver *headerResizeObserver = nullptr;
        UniResizeObserver *placeholderResizeObserver = nullptr;
        std::string sizeChangeAnchorItemKey;
        float sizeChangeAnchorItemOffset = -1.0f;
        std::string scrollAnchorItemKey;
        float scrollAnchorItemOffset = 0.0f;
        std::vector<float> anchorToBottomHistory;

        float size = 0.0f;
        float headerSize = 0.0f;
        float realScrollOffset = 0.0f;
        float scrollOffset = 0.0f;
        float lastScrollOffset = 0.0f;
        float lastScrollOffsetForFastScroll = 0.0f;
        float lastScrollOffsetForFastScrollRender = 0.0f;
        uint64_t lastScrollTimestampForFastScroll = 0;
        float minRenderOffset = 0.0f;
        float maxRenderOffset = 0.0f;
        float realPlaceholderSize = 0.0f;
        float placeholderSize = 0.0f;
        // float cachedSize = 200.0f;
        float cachedSizeStart = 200.0f;
        float cachedSizeEnd = 200.0f;
        float originalCachedSize = 200.0f;
        bool resetCachedSizeOnNextRender = false;
        bool resetCachedSizeOnNextScroll = false;
        float totalAnchorScrollBy = 0.0f;
        /**
         * 记录由于item size变化引起的offset补偿值，上方元素变小时此值为负值
         * 表示需要scrollTop增加该值，各个item的offset也需要增加该值
         */
        float itemSizeChangedCompensation = 0.0f;
        /**
         * 快速滚动过程中不渲染新的item，旧item通过offset+fastScrollOffset显示在要渲染的区域
         * 向头部滚动时此值为负值
         */
        float fastScrollOffset = 0.0f;
        /**
         * 快速滚动期间的特殊逻辑：
         * - 滚动条快速滚动，但是内容缓慢滚动，通过translate将缓慢滚动的内容持续显示在可视区域
         */
        bool fastScrolling = false;
        bool ignoreNextFastScroll = false;
        /**
         * fastScrollVelocity 判断是否为快速滚动加速度阈值
         * fastScrollDeltaLimit 快速滚动时单次滚动（每帧）距离限制，fastScrollVelocity * 8（120Hz屏幕每帧时间）
         */
#ifdef OS_ANDROID
        /**
         * 安卓设备比较多样，性能参差不齐，调低一些快速滚动的参数
         */
        float fastScrollVelocity = 10.0f;
        float fastScrollDeltaLimit = 80.0f;
#else
        float fastScrollVelocity = 15.0f;
        float fastScrollDeltaLimit = 120.0f;
#endif

    public:
        RecycleList();

        ~RecycleList();

        /**
         * listViewId第一个合法值为1.0
         */
        double listViewId = 0.0;

        void setElement(Element *element);

        void setListHeaderElement(Element *element);

        void setPlaceholderElement(Element *element);

        void setListViewId(double listViewId);

        void setScrollIntoViewKey(const std::string scrollIntoViewKey);
                            
        /**
         * 仅用于查询section和header，item会使用setScrollIntoViewKey进行跳转
         */
        void setScrollIntoViewId(const std::string id);

        void setScrollAnchoring(bool enabled);

        void setInitialScrollBottom(bool enabled);
    
        void setDestroyed(bool destroyed);

        void startRootObserve();

        void stopRootObserve();

        void startHeaderObserve();

        void stopHeaderObserve();
                            
        void startPlaceholderObserve();

        void stopPlaceholderObserve();

        void addScrollListener();

        void removeScrollListener();

        void onScroll(const UniScrollEvent &event);

        void onScrollEnd();

        void onScrollStart();

        void updateList(const std::vector<std::string> &keyList);

        void updateContainerSize(float size);

        void updateHeaderSize(float size);

        void updateScrollOffset(float offset);

        void updateItemSize(const std::string &key, float size) override;

        float getItemOffset(const std::string &key) override;

        void linkSection() override;

        void registerSection(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void unregisterSection(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void
        onSectionSizeChange(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void
        onSectionPushPinnedHeaderChange(double sectionId, std::shared_ptr<IRecycleListSection> section) override;
                            
        void setSectionScrollIntoViewKey(std::shared_ptr<IRecycleListSection> section, std::string key) override;
                            
        void checkAndUpdateScrollingToItemOffset() override;

        ScrollContext getScrollContext() const override;

        void syncDefaultItemSize(float size) override;

        void updateScrollAnchorItem();
        void preAnchorToBottom();
        void onItemOffsetChange(const std::string key, float offset) override;

    private:
        std::unordered_map<double, std::shared_ptr<IRecycleListSection>> sectionInstanceMap;

        void broadcastScrollContext();

        void updateMinMaxRenderOffset();

        void preTriggerRenderListUpdate();

        void triggerRenderListUpdate();

        void updateRenderList();

        void updateRenderListOnItemSizeChange();

        void updateRenderListOnScroll();

        bool isAllRenderItemSettled();

        void onItemListRelayout() override;

        void onItemSizeRelayout() override;
                            
        float getItemBaseOffset() override;
                            
        float getScrollToOffset(const std::shared_ptr<IRecycleListSection> &section, const std::string &key);

        ItemInfo *getItemInfo(std::string key) {
            if (key.empty()) {
                return nullptr;
            }
            auto it = this->keyItemMap.find(key);
            if (it == this->keyItemMap.end()) {
                return nullptr;
            }
            return it->second;
        }

        ItemInfo *getSizeChangeAnchorItem() {
            if (this->renderRangeStart >= 0 &&
                this->renderRangeStart < static_cast<int>(this->list.size())) {
                return &this->list[this->renderRangeStart + this->renderRangeLength - 1];
            }
            return nullptr;
        }

        void enterFastScrollMode();

        void leaveFastScrollMode();

        float prepareFastScroll(float offset);
                            
        void updatePlaceholderHeight();

        void anchorToItem();

        void anchorToBottom();
                            
        void queueScrollBy(float offset);

        void scrollTo(float offset, float duration);

        /**
         * 区分用户触发和系统触发的滚动，duration通常无意义
         * scrollIntoView等方式触发的滚动算用户触发滚动
         * 锚定等方式触发的滚动算系统滚动
         */
        void internalScrollTo(float offset, float duration);

        bool isScrollAtBottom(float scrollTop) const;
                            
        bool shouldScrollAnchorToItem() {
            return !this->shouldAnchorToBottom() && this->scrollAnchoringEnabled && !this->scrolling && this->sectionInstanceMap.size() == 0 && !this->scrollAnchorItemKey.empty() && !this->scrollingToItem && this->realScrollOffset > 0;
        }

        bool shouldAnchorToBottom() {
            return this->maintainInitialScrollBottom && this->initialScrollBottom && !this->scrolling && this->sectionInstanceMap.size() == 0 && this->listDataStatus == ListDataStatusInitialized;
        }

        /**
         * 多次scrollTo调用后可能会在最后一次scrollTo调用后多次触发scroll事件，暂时使用这种方式判断哪些滚动是由滚动到底部触发的。
         */
        bool isScrollTopTriggerByAnchorToBottom(float scrollTop) {
            return std::any_of(this->anchorToBottomHistory.begin(), this->anchorToBottomHistory.end(),
                               [this, scrollTop](float offset) { return std::abs(scrollTop - offset) < this->calcToleranceLoose; });
        }
    };
// RecycleList end

} // namespace recycle_list
