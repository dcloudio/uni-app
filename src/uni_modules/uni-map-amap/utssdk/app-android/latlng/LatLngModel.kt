package uts.sdk.modules.uniMapAmap.latlng

/**
 * 经纬度数据模型（context API 共用，与高德 SDK 类型解耦）
 */
class LatLngModel(val latitude: Double, val longitude: Double)

/**
 * 视野范围数据模型（southwest 西南角 / northeast 东北角），getRegion 返回值
 */
class BoundsModel(val southwest: LatLngModel, val northeast: LatLngModel)
