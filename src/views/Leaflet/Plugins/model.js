import L from 'leaflet'

function getIconUrl(modelInfo) {
  let iconName = ''
  switch (modelInfo.camp) {
    case 0:
      iconName = modelInfo.typeId + '_red'
      break
    case 1:
      iconName = modelInfo.typeId + '_blue'
      break
    case 2:
      iconName = modelInfo.typeId + '_green'
      break
  }
  if (modelInfo.destroyed == true) {
    iconName = modelInfo.typeId + '_gray'
  }

  let iconUrl = `../Assets/icons/${iconName}.png`
  return iconUrl
}

class LeafletModel {
  constructor(map, modelInfo) {
    this.modelInfo = modelInfo
    let symbol = this.initModel(modelInfo)
    this.model = symbol
    map.map.addLayer(this.model)
    /* // 更新模型飞行角度
    if (modelInfo.angle || modelInfo.angle === 0) {
      console.log(symbol)
      symbol.setRotationAngle(modelInfo.angle)
    }*/
  }

  initModel(modelInfo) {
    let iconUrl = getIconUrl(modelInfo)
    let symbol = L.marker([modelInfo.latitude, modelInfo.longitude], {
      id: modelInfo.id,
      icon: L.icon({
        iconUrl: iconUrl,
        iconSize: [60, 60],
        iconAnchor: [30, 30],
        popupAnchor: [0, 0]
      }),
      rotationOrigin: 'center center',
      draggable: false,
      rotationAngle: modelInfo.angle ? modelInfo.angle : 0
    })
    return symbol
  }

  getById(id) {
    if (this.modelInfo.id === id) {
      return true
    } else {
      return false
    }
  }
}

export default LeafletModel
