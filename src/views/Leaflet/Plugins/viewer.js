import L from 'leaflet'

class LeafletViewer {
  constructor(mapUrl, id, initZoom, center, maxBounds) {
    this.map = this.initMap(mapUrl, id, initZoom, center, maxBounds)
    this.map.off('dblclick')
  }
  initMap(mapUrl, id, initZoom, center, maxBounds) {
    let tileLayer = new L.TileLayer(mapUrl, {
      id: 'MapID',
      minZoom: 1,
      maxZoom: 12, //最大的放大级别
      attribution: '卫星地图'
    })

    //线图层
    let group = L.layerGroup([])
    let map = new L.map(id, {
      zoom: initZoom,
      center: center,
      zoomControl: true,
      attributionControl: false,
      layers: [tileLayer, group],
      editable: true,
      maxBounds: maxBounds,
      maxBoundsViscosity: 1.0
    })
    return map
  }
}

export default LeafletViewer
