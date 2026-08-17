#pragma once

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
        float compensation = 0.0f;
        float renderStartOffset = 0.0f;
        float renderEndOffset = 0.0f;
        float fastScrollOffset = 0.0f;
        bool isScrolling = false;
        bool isFastScrolling = false;
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

        virtual void onScrollContextUpdate(const ScrollContext &context) = 0;
        virtual void syncFromRecycleList() = 0;
        virtual void applyDefaultItemSize(float size) = 0;
    };

    class IRecycleListItem {
    public:
        virtual ~IRecycleListItem() = default;
        
        float size = -1.0f;

        virtual void updateItemOffset(float offset) {}
    };

    class IRecycleList {
    public:
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
    };

    class IRecycleContainer {
    public:
        float calcTolerance = 0.1f;

        virtual ~IRecycleContainer() = default;

        virtual void updateItemSize(const std::string &key, float size) = 0;

        virtual float getItemOffset(const std::string &key) { return 0.0f; }

        virtual float getItemSize(const std::string &key) { return -1.0f; }
        std::unordered_map<std::string, IRecycleListItem *> itemInstanceMap;
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
            float oldSize = -1.0f;
            float newSize = -1.0f;
            float delta = 0.0f;
            bool wasUnknown = false;
        };

        std::vector<std::string> keyList;
        std::vector<ItemInfo> list;
        std::unordered_map<std::string, ItemInfo *> keyItemMap;
        float defaultItemSize = 150.0f;
        int firstDirtyItemSizeIndex = -1;
        bool destroyed = false;

        void updateKeyList(const std::vector<std::string> &keyList);

        ItemSizeChange updateStoredItemSize(const std::string &key,
                                            float size,
                                            bool rebuildOffsets);

        void rebuildItemOffsetsFrom(size_t startIndex);

        void updateItemInstanceOffsetsFrom(size_t startIndex,
                                           float baseOffset);

        inline float realItemSize(float size) const {
            return size < 0 ? defaultItemSize : size;
        }

        inline float itemEndOffset(const ItemInfo *item) const {
            return item->offset + realItemSize(item->size);
        }

        ItemInfo *findItem(const std::string &key);

        float getStoredItemSize(const std::string &key);

        virtual void onItemListRelayout() = 0;

        virtual void onItemSizeRelayout(int firstDirtyIndex) = 0;

    public:
        float getItemSize(const std::string &key) override;
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
        int renderRangeStart = 0;
        int renderRangeLength = 0;
        bool hasSyncedDefaultItemSize = false;
        float offset = 0.0f;
        bool preload = false;

        std::shared_ptr<IRecycleList> getListView();

        void updateRenderInfo(int renderRangeStart, int renderRangeLength);

        void updatePlaceholderSize();

        void applySectionOffset(float offset);

        void unregisterSectionBinding(double listViewId, double sectionId);

        void onItemListRelayout() override;

        void onItemSizeRelayout(int firstDirtyIndex) override;

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
    
        void setDestroyed(bool destroyed);

        void updateList(const std::vector<std::string> &keyList);

        void updateHeaderSize(float size);

        void onScrollContextUpdate(const ScrollContext &context) override;

        // IRecycleContainer interface implementation
        void updateItemSize(const std::string &key, float size) override;

        float getItemOffset(const std::string &key) override;

        void applyDefaultItemSize(float size) override;

        void syncDefaultItemSize(float size);
    };
// RecycleListSection end

// RecycleListHeader start
    class RecycleListHeader : public std::enable_shared_from_this<RecycleListHeader>,
            public UniVueComponent {
    private:
        uniappx::UniViewElement *viewElement = nullptr;
        UniResizeObserver *resizeObserver = nullptr;
        float offset = 0.0f;

        std::shared_ptr<RecycleListSection> getSection();

        void startObserve();

    public:
        RecycleListHeader();

        ~RecycleListHeader();

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
        bool sizeInited = false;

        void setElement(Element *element);

        void updateKey(const std::string &key);

        void setSectionId(double sectionId);

        void updateItemSize();

        void updateItemOffset(float offset) override;

        void getAndUpdateItemOffset();

        void setListViewId(double listViewId);
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
        std::string anchorItemKey;

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
        int renderRangeStart = 0;
        int renderRangeLength = 0;
        int lastRenderRangeStart = 0;
        int lastRenderRangeLength = 0;
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
        bool scrolling = false;
        bool ignoreNextScroll = false;

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
    
        void setDestroyed(bool destroyed);

        void startRootObserve();

        void stopRootObserve();

        void startHeaderObserve();

        void stopHeaderObserve();

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

        float getItemSize(const std::string &key) override;

        void linkSection() override;

        void registerSection(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void unregisterSection(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void
        onSectionSizeChange(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        void
        onSectionPushPinnedHeaderChange(double sectionId, std::shared_ptr<IRecycleListSection> section) override;

        ScrollContext getScrollContext() const override;

        void syncDefaultItemSize(float size) override;

    private:
        std::unordered_map<double, std::shared_ptr<IRecycleListSection>> sectionInstanceMap;

        void broadcastScrollContext();

        void flushRelayout();

        void updateMinMaxRenderOffset();

        void preTriggerRenderListUpdate();

        void triggerRenderListUpdate();

        void updateRenderList();

        void updateRenderListOnItemSizeChange();

        void updateRenderListOnScroll();

        void updateRenderListForward();

        void updateRenderListBackward();

        bool isAllRenderItemSettled();

        void recordItemOffsetCompensation(float delta);

        void onItemListRelayout() override;

        void onItemSizeRelayout(int firstDirtyIndex) override;

        ItemInfo *getAnchorItem() {
            if (this->anchorItemKey.empty()) {
                return nullptr;
            }
            auto it = this->keyItemMap.find(this->anchorItemKey);
            if (it == this->keyItemMap.end()) {
                return nullptr;
            }
            return it->second;
        }

        ItemInfo *getRenderStartItem() {
            if (this->renderRangeStart >= 0 &&
                this->renderRangeStart < static_cast<int>(this->list.size())) {
                return &this->list[this->renderRangeStart];
            }
            return nullptr;
        }

        ItemInfo *getRenderEndItem() {
            int endIndex = this->renderRangeStart + this->renderRangeLength - 1;
            if (endIndex >= 0 &&
                endIndex < static_cast<int>(this->list.size())) {
                return &this->list[endIndex];
            }
            return nullptr;
        }

        void enterFastScrollMode();

        void leaveFastScrollMode();

        float prepareFastScroll(float offset);
    };
// RecycleList end

} // namespace recycle_list
