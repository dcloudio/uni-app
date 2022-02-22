<script lang="ts">
import { Ref, ref, SetupContext, computed } from 'vue'
import { defineBuiltInComponent } from '@dcloudio/uni-components'
import useMap from './use-map'
import props from './use-map/props'

import MapMarker, { Props as MapMarkerProps } from './MapMarker.tsx'
import MapPolyline from './MapPolyline.tsx'
import MapCircle from './MapCircle.tsx'
import MapControl from './MapControl.tsx'
import MapLocation from './MapLocation.tsx'
import MapPolygon from './map-polygon/index.tsx'

import { eventObj } from './map-polygon/event'

export default /*#__PURE__*/ defineBuiltInComponent({
  name: 'Map',
  props,
  emits: [
    'markertap',
    'labeltap',
    'callouttap',
    'controltap',
    'regionchange',
    'tap',
    'click',
    'updated',
    'update:scale',
    'update:latitude',
    'update:longitude',
    // MapPolygon 组件对外暴露的事件
    ...Object.values(eventObj)
  ],
  components: {
    MapMarker,
    MapPolyline,
    MapCircle,
    MapControl,
    MapLocation,
    MapPolygon,
  },
  setup(props, { emit }) {
    const rootRef: Ref<HTMLElement | null> = ref(null)
    const { mapRef, _maps } = useMap(
      props,
      rootRef,
      emit as SetupContext['emit']
    )

    // 剔除未设置 id 属性的 marker
    const validMarkers = computed(() =>
      props.markers.filter((item: MapMarkerProps) => !!item.id)
    )

    return {
      rootRef,
      mapRef,
      validMarkers,
      nativeMapIns: _maps,
    }
  },
})
</script>

<template>
  <uni-map ref="rootRef" :id="id">
    <div
      ref="mapRef"
      style="width: 100%; height: 100%; position: relative; overflow: hidden"
    />
    <MapMarker v-for="item in validMarkers" :key="item.id" v-bind="item" />
    <MapPolyline
      v-for="item in polyline"
      :key="JSON.stringify(item)"
      v-bind="item"
    />
    <MapCircle v-for="item in circles" :key="JSON.stringify(item)" v-bind="item" />
    <MapControl
      v-for="item in controls"
      :key="JSON.stringify(item)"
      v-bind="item"
    />
    <MapLocation v-if="showLocation" />
    <MapPolygon v-for="item in polygons" :key="JSON.stringify(item)" v-bind="item" />
    <div
      style="
        position: absolute;
        top: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        pointer-events: none;
      "
    >
      <slot />
    </div>
  </uni-map>
</template>