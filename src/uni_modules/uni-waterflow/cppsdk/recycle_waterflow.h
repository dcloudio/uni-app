#pragma once

#include <cstdint>
#include <functional>
#include <tuple>
#include <memory>
#include <string>
#include <unordered_map>
#include <vector>
#include "dom/resize_observer.h"
#include "dom/scroll_element.h"
#include "event/event_listener.h"
#include "event/scroll_event.h"
#include "page/page.h"
#include "runtime_instance.h"
#include "sdk.h"
#include "vue/uni_vue_component.h"
#include "util/helper.h"
#include "interface/UniCSSProperty.h"
#include "interface/UniCSSTransform.h"

namespace recycle_waterflow {
    using namespace uniappx;
    using uniappx::Element;
    using uniappx::EventListener;
    using uniappx::UniResizeObserver;
    using uniappx::UniScrollEvent;
    using vue::UniVueComponent;

    class IRecycleFlowItem {
    public:
        virtual ~IRecycleFlowItem() = default;

        float size = -1.0f;
        float crossAxisSize = 0.0;    
    
        virtual void updateItemOffset(float offsetX, float offsetY) {};

        virtual void updateItemCrossAxisSize(float crossAxisSize) {};
    };

    class IRecycleWaterflow {
    public:
        virtual ~IRecycleWaterflow() = default;

        virtual void updateItemSize(const std::string key, float size) {};

        virtual std::tuple<float, float> getItemOffset(const std::string key) {
            return std::make_tuple(0.0, 0.0);
        };

        virtual float getItemSize(const std::string key) { return -1.0; };

        virtual float getItemCrossAxisSize() { return -1.0; };
        std::unordered_map<std::string, IRecycleFlowItem *> itemInstanceMap;
    };
    // common end

    // RecycleFlowItem start
    class RecycleFlowItem
            : public std::enable_shared_from_this<RecycleFlowItem>,
              public UniVueComponent,
              public IRecycleFlowItem {
    private:
        float offsetX = -1.0f;
        float offsetY = -1.0f;
        uniappx::UniViewElement *viewElement = nullptr;
        UniResizeObserver *resizeObserver = nullptr;

        void setInstance(std::string key);

        void removeInstance(std::string key);

        IRecycleWaterflow *getRecycleWaterflow();

        void startObserve();

        void stopObserve();

        bool isCurrentElementAttached();

        void initSize();

        void translate(float offsetX, float offsetY);

        float getItemSizeFromWaterflow();

    public:
        RecycleFlowItem();

        ~RecycleFlowItem();

        float getSize();

        void setSize(float size);

        /**
         * waterflowId第一个合法值为1.0
         */
        double waterflowId = 0.0;
        std::string key = "";
        bool sizeInited = false;

        void setElement(Element *element);

        void updateKey(std::string key);

        void updateItemSize();

        void updateItemOffset(float offsetX, float offsetY);

        void updateItemCrossAxisSize(float crossAxisSize);

        void getAndUpdateItemOffset();

        void getAndUpdateItemCrossAxisSize();

        void setWaterflowId(double waterflowId);
    };
    // RecycleFlowItem end

    // RecycleWaterflow start
    class RecycleWaterflow : public std::enable_shared_from_this<RecycleWaterflow>,
            public UniVueComponent,
            public IRecycleWaterflow {
    private:
        uniappx::UniScrollViewElement *scrollElement = nullptr;
        uniappx::UniViewElement *placeholderElement = nullptr;
        std::shared_ptr<EventListener> scrollListener = nullptr;
        std::shared_ptr<EventListener> scrollEndListener = nullptr;
        UniResizeObserver *resizeObserver = nullptr;
        // Keys for items
        std::vector<std::string> keyList;

        struct ItemInfo {
            int index;
            std::string key;
            float size;   // -1 means unknown, use defaultItemSize
            float offsetX;
            float offsetY;
            int type;     // reserved
        };

        std::vector<ItemInfo> list;
        // Fast lookup: key -> pointer to ItemInfo in `list`
        std::unordered_map<std::string, ItemInfo *> keyItemMap;

        int crossAxisCount = 2;
        float mainAxisGap = 0.0f;
        float crossAxisGap = 0.0f;
        float maxCrossAxisExtent = 0.0f;
        int layoutCrossAxisCount = 2;
        float containerCrossAxisSize = 0.0f;
        float itemCrossAxisSize = 0.0f;

        float size = 600.0f;
        float defaultItemSize = 150.0f;
        float realScrollOffset = 0.0f;
        float scrollOffset = 0.0f;
        float lastScrollOffset = 0.0f;
        float lastScrollOffsetForFastScroll = 0.0f;
        float lastScrollOffsetForFastScrollRender = 0.0f;
        uint64_t lastScrollTimestampForFastScroll = 0;
        float minRenderOffset = 0.0f;
        float maxRenderOffset = 600.0f;
        float placeholderSize = 0.0f;
        float lastPlaceholderSize = -1.0f;
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
        bool destroyed = false;

    public:
        RecycleWaterflow();

        ~RecycleWaterflow();

        /**
         * waterflowId第一个合法值为1.0
         */
        double waterflowId = 0.0;

        void setElement(Element *element);

        void setPlaceholderElement(Element *element);
    
        void setDestroyed(bool destroyed);

        void startRootObserve();

        void stopRootObserve();

        void addScrollListener();

        void removeScrollListener();

        void onScroll(const UniScrollEvent &event);

        void onScrollEnd();

        void onScrollStart();

        void updateList(const std::vector<std::string> keyList);

        void updateContainerSize(float size);

        void updateContainerCrossAxisSize(float size);

        void updateScrollOffset(float offset);

        void updateItemSize(const std::string key, float size);

        std::tuple<float, float> getItemOffset(const std::string key);

        float getItemSize(const std::string key);

        float getItemCrossAxisSize();

        void setWaterflowId(double waterflowId);

        void setCrossAxisCount(double crossAxisCount);

        void setMainAxisGap(double mainAxisGap);

        void setCrossAxisGap(double crossAxisGap);

        void setMaxCrossAxisExtent(double maxCrossAxisExtent);

    private:
        // helpers
        inline float realItemSize(float size) const {
            return size < 0 ? defaultItemSize : size;
        }

        inline float itemEndOffset(const ItemInfo *item) const {
            return item->offsetY + realItemSize(item->size);
        }

        void rebuildItemOffsets();

        void rebuildItemOffsetsFrom(size_t startIndex);

        void updateCrossAxisMetrics();

        void updateItemCrossAxisSize();

        int resolveCrossAxisCount() const;

        float resolveCrossAxisSize(int count) const;

        void updateMinMaxRenderOffset();

        void preTriggerRenderListUpdate();

        void triggerRenderListUpdate();

        void updateRenderList();

        void updateRenderListOnItemSizeChange();

        void updateRenderListOnScroll();

        void updateRenderListForward();

        void updateRenderListBackward();

        bool isAllRenderItemSettled();

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
    // RecycleWaterflow end

} // namespace recycle_waterflow
