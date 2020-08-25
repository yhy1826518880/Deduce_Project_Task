<template>
  <div style="height: 100%;" class="signal-container">
    <div class="view-title">
      <div class="view-title-btn">信号导航</div>
    </div>
    <div class="signal-type-container">
      <!--<a-row :gutter="60">
        <a-col :span="2"></a-col>
        <a-col v-for="(signal, index) in signalList" :key="index" :span="4">
          <div class="signal-menu signal-box-shadow">
            <div
              class="signal-item"
              @dblclick="handleChooseSignal(signal.id)"
              @contextmenu.prevent="onSignalRightClick($event, signal)"
            >
              <div class="signal-icon">
                <img :src="signal.src" alt="" />
              </div>
            </div>
            <div class="signal-desc">
              <div class="signal-name">
                <span>{{ signal.name }}</span>
              </div>
              <div class="signal-info">
                <div>识别模式5种</div>
                <div>模型有1000个</div>
              </div>
            </div>
            <div class="signal-item-specialEffects">
              <img src="../../assets/spiner3.png" alt="" />
            </div>
          </div>
        </a-col>
        <a-col :span="2"></a-col>
      </a-row>-->
      <el-carousel
        :interval="4000"
        type="card"
        height="600px"
        @change="carouselChange"
      >
        <el-carousel-item v-for="(signal, index) in signalList" :key="index">
          <div class="signal-menu">
            <div
              class="signal-item"
              @dblclick="handleChooseSignal(signal.id)"
              @contextmenu.prevent="onSignalRightClick($event, signal)"
            >
              <div class="signal-icon">
                <img :src="signal.src" alt="" />
              </div>
            </div>
            <div class="signal-desc">
              <div class="signal-name">
                <span>{{ signal.name }}</span>
              </div>
              <div class="signal-info">
                <div>识别模式5种</div>
                <div>模型有1000个</div>
              </div>
            </div>
          </div>
          <div class="signal-item-specialEffects">
            <img src="../../assets/spiner3.png" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>

      <div class="carousel-dot">
        <span
          class="dot-signal-name"
          v-for="(signal, index) in signalList"
          :key="`signalName${signal.name}`"
          :class="{ 'active-dot': index === activeCarousel }"
          >{{ signal.name }}</span
        >
      </div>

      <vue-context ref="signalContextMenu">
        <div style="padding: 0" slot-scope="signal">
          <li @click="changeImg(signal)">更换图片</li>
        </div>
      </vue-context>

      <a-modal
        title="更改图片"
        :visible="visible"
        @ok="handleOk"
        @cancel="handleCancel"
      >
        <upload-image></upload-image>
      </a-modal>
    </div>
  </div>
</template>

<script>
// import GlobalFooter from '../../components/GlobalFooter/GlobalFooter'
// import UserMenu from '../../components/tools/UserMenu'

import { mapGetters, mapMutations, mapActions } from 'vuex'
import VueContext from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'
import UploadImage from './components/UploadImage'

export default {
  name: 'TaskManagement',
  components: {
    VueContext,
    UploadImage
    // GlobalFooter,
    // UserMenu
  },
  data() {
    return {
      visible: false,
      scaleSignalList: [3, 2],
      signalList: [
        {
          name: 'ADS-B',
          id: 'ads-b',
          src: require('./assets/ads-b.jpg')
        },
        {
          name: 'IFF',
          id: ' iff',
          src: require('./assets/iff.jpg')
        },
        {
          name: '雷达',
          id: 'radar',
          src: require('./assets/radar.jpg')
        },
        {
          name: '通信',
          id: 'connection',
          src: require('./assets/connection.jpg')
        },
        {
          name: 'AIS',
          id: 'ais',
          src: require('./assets/ais.jpg')
        }
      ],
      activeCarousel: 0
    }
  },
  methods: {
    ...mapMutations({
      _setWorkMode: 'SET_WORK_MODE'
    }),
    handleChooseSignal(id) {
      console.log(id)
      // this.$router.push('/workMode')
      let routeData = this.$router.resolve({
        path: '/workMode',
        query: {
          workMode: id
        }
      })
      this._setWorkMode(id)
      window.open(routeData.href, '_blank')
    },
    onSignalRightClick(event, data) {
      this.$refs.signalContextMenu.open(event, data)
    },
    changeImg(signal) {
      console.log(signal)
      this.visible = true
    },
    handleOk(e) {
      this.ModalText = 'The modal will be closed after two seconds'
      this.confirmLoading = true
      setTimeout(() => {
        this.visible = false
        this.confirmLoading = false
      }, 2000)
    },
    handleCancel(e) {
      console.log('Clicked cancel button')
      this.visible = false
    },
    carouselChange(index) {
      this.activeCarousel = index
    }
  },
  computed: {
    ...mapGetters(['theme'])
  }
}
</script>

<style lang="less" scoped>
@import '../../components/index.less';
.signal-type-container {
  width: 100%;
  min-width: 600px;
  min-height: 300px;
  position: relative;
  top: 30%;
  margin: -160px auto 0;
  text-align: center;

  // 禁止选中文字
  -moz-user-select: none; /*火狐*/
  -webkit-user-select: none; /*webkit浏览器*/
  -ms-user-select: none; /*IE10*/
  user-select: none;
  .signal-item {
    position: relative;
    display: inline-block;
    width: 100%;
    max-width: 450px;
    // height: 0;
    height: 400px;
    padding: 14px;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    border: 1px solid #235fa8;
    background: rgba(10, 77, 144, 0.4);
    .signal-icon {
      width: 100%;
      height: 100%;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .signal-desc {
    .signal-name {
      margin-top: 20px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }
    .signal-info {
      color: #82b3ce;
    }
  }
}
.signal-menu {
  max-width: 600px;
  text-align: center;
  padding: 20px;
  margin: 0 auto;
  cursor: pointer;
  position: relative;
  // padding: 15px;
  // background: rgba(61, 61, 204, 0.3);
  // background: rgba(28, 61, 103, 0.4);
  -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
        70%, rgba(255, 255, 255, 0.5));
  &:hover {
    // box-shadow: 0px 0px 30px #1153f7;
    // box-shadow: 0px 0px 30px #556eea;
    /*-webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -webkit-transform: scale(1.1); !*1.1放大值*!
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);*/
  }
}

.signal-item-specialEffects {
  height: 100%;
  width: 400px;
  position: absolute;
  top: 40%;
  left: 50%;
  margin-left: -200px;
  transform: rotateX(80deg);
  img {
    width: 100%;
    animation-name: img-rotation;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes img-rotation {
  0% {
    transform: rotateZ(-0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}

.carousel-dot {
  width: 100%;
  position: relative;
  top: -10px;
  margin: 0;
  color: #777;
  .dot-signal-name {
    display: inline-block;
    width: 50px;
    margin: 0 10px;
    &.active-dot {
      color: #fff;
    }
  }
}
</style>
