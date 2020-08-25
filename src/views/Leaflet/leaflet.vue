<template>
  <div id="mapContainer"></div>
</template>

<script>
import LeafletViewer from './Plugins/viewer'
import LeafletModel from './Plugins/model'
import LeafletPolyline from './Plugins/polyline'

import LeafletDraw from 'leaflet-draw'
import './Plugins/leaflet.draw/leaflet.ellipse'
import './Plugins/leaflet.draw/leaflet.ellipse-draw'
export default {
  name: 'leaflet',
  data() {
    return {
      mapUrl: 'http://127.0.0.1:8092/leafletmap/{z}/{x}/{y}.png',
      map: null,
      initZoom: 6,
      center: [27.54724, 127.44141],
      maxBounds: [[85, -26.19141], [-85, 333.98438]],
      models: [],
      polylines: []
    }
  },
  methods: {},
  mounted() {
    let map = new LeafletViewer(
      this.mapUrl,
      'mapContainer',
      this.initZoom,
      this.center,
      this.maxBounds
    )

    L.control.navbar().addTo(map.map)

    let drawnItems = new L.FeatureGroup()

    let MyCustomMarker = L.Icon.extend({
      options: {
        shadowUrl: null,
        iconAnchor: new L.Point(12, 12),
        iconSize: new L.Point(24, 24),
        iconUrl: 'icons/marker.svg'
      }
    })

    map.map.addLayer(drawnItems)
    let drawControl = new L.Control.Draw({
      draw: {
        polyline: {
          shapeOptions: {
            color: '#f357a1',
            weight: 10
          }
        },
        polygon: {
          allowIntersection: false, // Restricts shapes to simple polygons
          drawError: {
            color: '#150ee1', // Color the shape will turn when intersects
            message: "<strong>Oh snap!<strong> you can't draw that!" // Message that will show when intersect
          },
          shapeOptions: {
            color: '#5351da'
          }
        },
        // circle: false, // Turns off this drawing tool
        rectangle: {
          shapeOptions: {
            clickable: false
          }
        },
        marker: {
          icon: new MyCustomMarker()
        }
      },
      edit: {
        featureGroup: drawnItems
      }
    })

    map.map.addControl(drawControl)
    map.map.on(L.Draw.Event.CREATED, function(e) {
      let type = e.layerType,
        layer = e.layer

      if (type === 'marker') {
        layer.bindPopup('A popup!')
      }

      drawnItems.addLayer(layer)
    })

    for (let i = 0; i < 1000; i++) {
      let modelInfoTemp = {
        latitude: 33 + i * 0.1,
        longitude: 104 + i * 0.1,
        visible: true,
        radius: 20000,
        id: i,
        showPolyline: true,
        polylineColor: 'red',
        typeId: '006',
        camp: 0,
        angle: 30,
        rangeFillColor: '#ff0000' // 扫描圈填充色
      }
      let model = new LeafletModel(map, modelInfoTemp)
      this.models.push(model)
    }

    let polyline = new LeafletPolyline(map.map, {
      id: 0,
      color: 'blue',
      latlngs: [[33, 104]]
    })
    this.polylines.push(polyline)

    let i = 0
    setInterval(() => {
      let targetModel = this.models.find(item => item.modelInfo.id === 0)
      targetModel.model.setLatLng([40 + 0.0001 * i, 110 + 0.0001 * i])
      polyline.updatePolyline({ lat: 40 + 0.0001 * i, lon: 110 + 0.0001 * i })
      i += 1
    }, 10)
  }
}
</script>

<style scoped lang="less">
#mapContainer {
  width: 100%;
  height: 100%;
}
</style>
