// @ts-nocheck
// TODO 优化此处代码，此页面无对应的css
import { definePage } from '../../framework/page/define'
import { createCommentVNode, createElementBlock, openBlock } from 'vue'
import { once } from '@dcloudio/uni-shared'

const localizationTemplate = {
  en: {
    'map.title.amap': 'AutoNavi Maps',
    'map.title.baidu': 'Baidu Maps',
    'map.title.tencent': 'Tencent Maps',
    'map.title.apple': 'Apple Maps',
    'map.title.google': 'Google Maps',
    'location.title': 'My Location',
    'select.cancel': 'Cancel',
    'location.destination': 'Destination',
  },
  zh: {
    'map.title.amap': '\u9AD8\u5FB7\u5730\u56FE',
    'map.title.baidu': '\u767E\u5EA6\u5730\u56FE',
    'map.title.tencent': '\u817E\u8BAF\u5730\u56FE',
    'map.title.apple': '\u82F9\u679C\u5730\u56FE',
    'map.title.google': '\u8C37\u6B4C\u5730\u56FE',
    'location.title': '\u6211\u7684\u4F4D\u7F6E',
    'select.cancel': '\u53D6\u6D88',
    'location.destination': '目标地点',
  },
}
let language = ''
function initLanguageOnce() {
  if (language) {
    return
  }
  language = plus.os.language.toLowerCase().replace('_', '-').split('-')[0]
}
function localize(key) {
  initLanguageOnce()
  return (
    (localizationTemplate[language] && localizationTemplate[language][key]) ||
    key
  )
}

function openSysMap(e, t, a, n) {
  let o = weex.requireModule('mapSearch')
  var s = [
      {
        title: localize('map.title.tencent'),
        getUrl: function () {
          var A
          return (
            (A =
              'https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=' +
              encodeURIComponent(a) +
              '&tocoord=' +
              encodeURIComponent(e + ',' + t) +
              '&referer=APP'),
            A
          )
        },
      },
      {
        title: localize('map.title.google'),
        getUrl: function () {
          var A
          return (
            (A =
              'https://www.google.com/maps/?daddr=' +
              encodeURIComponent(a) +
              '&sll=' +
              encodeURIComponent(e + ',' + t)),
            A
          )
        },
      },
    ],
    r = [
      {
        title: localize('map.title.amap'),
        pname: 'com.autonavi.minimap',
        action: n ? 'iosamap://' : 'amapuri://',
        getUrl: function () {
          var A
          return (
            n ? (A = 'iosamap://path') : (A = 'amapuri://route/plan/'),
            (A +=
              '?sourceApplication=APP&dname=' +
              encodeURIComponent(a) +
              '&dlat=' +
              e +
              '&dlon=' +
              t +
              '&dev=0'),
            A
          )
        },
      },
      {
        title: localize('map.title.baidu'),
        pname: 'com.baidu.BaiduMap',
        action: 'baidumap://',
        getUrl: function () {
          var A =
            'baidumap://map/direction?destination=' +
            encodeURIComponent('latlng:' + e + ',' + t + '|name:' + a) +
            '&mode=driving&src=APP&coord_type=gcj02'
          return A
        },
      },
      {
        title: localize('map.title.tencent'),
        pname: 'com.tencent.map',
        action: 'qqmap://',
        getUrl: () => {
          var A
          return (
            (A =
              'qqmap://map/routeplan?type=drive' +
              (n
                ? '&from=' + encodeURIComponent(localize('location.title'))
                : '') +
              '&to=' +
              encodeURIComponent(a) +
              '&tocoord=' +
              encodeURIComponent(e + ',' + t) +
              '&referer=APP'),
            A
          )
        },
      },
      {
        title: localize('map.title.google'),
        pname: 'com.google.android.apps.maps',
        action: 'comgooglemapsurl://',
        getUrl: function () {
          var A
          return (
            n
              ? (A = 'comgooglemapsurl://maps.google.com/')
              : (A = 'https://www.google.com/maps/'),
            (A +=
              '?daddr=' +
              encodeURIComponent(a) +
              '&sll=' +
              encodeURIComponent(e + ',' + t)),
            A
          )
        },
      },
    ],
    l = []
  r.forEach(function (A) {
    var g = plus.runtime.isApplicationExist({
      pname: A.pname,
      action: A.action,
    })
    g && l.push(A)
  }),
    n &&
      l.unshift({
        title: localize('map.title.apple'),
        navigateTo: function () {
          o.openSystemMapNavigation({ longitude: t, latitude: e, name: a })
        },
      }),
    l.length === 0 && (l = l.concat(s)),
    plus.nativeUI.actionSheet(
      {
        cancel: localize('select.cancel'),
        buttons: l,
      },
      function (A) {
        var g = A.index,
          c
        g > 0 &&
          ((c = l[g - 1]),
          c.navigateTo
            ? c.navigateTo()
            : plus.runtime.openURL(c.getUrl(), function () {}, c.pname))
      }
    )
}

const LocationViewPage = {
  data() {
    return {
      latitude: 0,
      longitude: 0,
      name: '',
      loaded: false,
      showNav: false,
    }
  },
  onLoad(e) {
    this.latitude = e.latitude
    this.longitude = e.longitude
    this.name = e.name
    this.loaded = true
  },
  onBackPress() {
    if (this.showNav) {
      this.showNav = false
      return true
    }
  },
  methods: {
    onClose(e) {
      uni.navigateBack()
    },
    onNavClick() {
      const isIOS = weex.config.env.platform === 'iOS'
      openSysMap(
        this.latitude,
        this.longitude,
        this.name || localize('location.destination'),
        isIOS
      )
    },
  },
  render: function (_ctx, _cache, $props, $setup, $data, $options) {
    return $data.loaded
      ? (openBlock(),
        createElementBlock(
          'location-view',
          {
            key: 0,
            style: { width: '100%', height: '100%' },
            latitude: $data.latitude,
            longitude: $data.longitude,
            showNav: $data.showNav,
            name: $data.name,
            onClose:
              _cache[0] ||
              (_cache[0] = (...args) =>
                $options.onClose && $options.onClose(...args)),
            onNavClick:
              _cache[1] ||
              (_cache[1] = (...args) =>
                $options.onNavClick && $options.onNavClick(...args)),
          },
          null,
          40,
          ['latitude', 'longitude', 'showNav']
        ))
      : createCommentVNode('v-if', true)
  },
}

export const ROUTE_LOCATION_VIEW_PAGE = '__uniappopenlocation'

export const initLocationViewPageOnce = once(() => {
  definePage(ROUTE_LOCATION_VIEW_PAGE, LocationViewPage)
  __uniRoutes.push({
    meta: {
      navigationBar: {
        style: 'custom',
      },
      isNVue: false,
      route: ROUTE_LOCATION_VIEW_PAGE,
    },
    path: '/' + ROUTE_LOCATION_VIEW_PAGE,
  })
})
