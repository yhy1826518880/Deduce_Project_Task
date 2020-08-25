import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import { VueAxios, axios } from './utils/request'
import axiosOrigin from 'axios'

// mock
import './mock'

import bootstrap from './core/bootstrap'
import './core/use'
import './permission' // permission control
import './utils/filter' // global filter

import './icons'
import echarts from 'echarts'

import $ from 'jquery'
import '@ztree/ztree_v3/js/jquery.ztree.core.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.excheck.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exhide.min.js'
import '@ztree/ztree_v3/js/jquery.ztree.exedit.min.js'
import '@ztree/ztree_v3/css/zTreeStyle/zTreeStyle.css'
// import '@ztree/ztree_v3/css/metroStyle/metroStyle.css'

import DataV from '@jiaminghi/data-view'

import 'element-ui/lib/theme-chalk/index.css'
import { Carousel, CarouselItem } from 'element-ui'

import uploader from 'vue-simple-uploader'

// leaflet
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import 'leaflet-navbar/Leaflet.NavBar.css'
import * as L from 'leaflet'
import 'leaflet-rotatedmarker'
import 'leaflet-navbar'
import './views/Leaflet/Plugins/leaflet.draw/leaflet.ellipse-draw.css'
/*import './views/Leaflet/Plugins/leaflet.draw/leaflet.ellipse'
import './views/Leaflet/Plugins/leaflet.draw/leaflet.ellipse-draw'*/

Vue.prototype.$L = L

Vue.prototype.$echarts = echarts
Vue.prototype.$ = $

Vue.config.productionTip = false

// mount axios Vue.$http and this.$http
Vue.use(VueAxios)
Vue.use(DataV)
Vue.use(Carousel)
Vue.use(CarouselItem)

Vue.use(uploader)

function getServerConfig() {
  return new Promise((resolve, reject) => {
    axiosOrigin
      .get('./serverConfig.json')
      .then(result => {
        let config = result.data
        for (let key in config) {
          Vue.prototype[key] = config[key]
        }
        resolve()
      })
      .catch(() => {
        reject()
      })
  })
}

async function main() {
  await getServerConfig()
  axios.defaults.baseURL = Vue.prototype.baseUrl
  new Vue({
    router,
    store,
    created: bootstrap,
    render: h => h(App)
  }).$mount('#app')
}

main()
