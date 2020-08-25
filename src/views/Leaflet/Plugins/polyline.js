import L from 'leaflet'

class LeafletPolyline {
  constructor(map, polylineInfo) {
    this.polylineInfo = polylineInfo

    this.initPolyline(polylineInfo.latlngs, polylineInfo)

    if (this.polyline) {
      this.polyline.addTo(map)
    }
  }

  initPolyline(latlngs, polylineInfo) {
    this.polyline = null
    if (latlngs && latlngs.length > 0) {
      let antPath = L.polyline
      this.polyline = antPath(latlngs, {
        id: polylineInfo.id,
        weight: 3, // 线宽
        opacity: 0.5, // 透明度
        color: polylineInfo.color ? polylineInfo.color : 'red' // 颜色
      })
    }
  }

  updatePolyline(latlngs) {
    this.polyline.addLatLng(latlngs)
  }
}

export default LeafletPolyline
