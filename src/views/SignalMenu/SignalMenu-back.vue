<template>
  <!--<a-layout style="min-height: 100%;">
    <div>
      <a-layout-header>
        <div :class="['top-nav-header-index', theme]">
          <div class="header-index-wide">
            <div class="signal-logo-box">
              <span class="icon">
                <svg-icon icon-class="logo"></svg-icon>
              </span>
              <span class="text">个体识别深度学习</span>
            </div>
            <div class="signal-user-menu">
              <user-menu></user-menu>
            </div>
          </div>
        </div>
      </a-layout-header>
    </div>
    <a-layout-content>
      <div class="signal-type-container">
        <div
          class="signal-item"
          v-for="(signal, index) in signalList"
          :key="index"
          ondblclick="handleChooseSignal(signal.id)"
        >
          <span class="signal-icon" v-if="computeSignalIcon(signal.id)">
            <svg-icon :icon-class="signal.id"></svg-icon>
          </span>
          <span class="signal-name-icon" v-else>{{ signal.name }}</span>
          <span class="signal-name">{{ signal.name }}</span>
        </div>
      </div>
    </a-layout-content>
    <a-layout-footer>
      <global-footer></global-footer>
    </a-layout-footer>
  </a-layout>-->
  <div style="height: 100%;">
    <div class="view-title">
      <div class="view-title-btn">信号导航</div>
    </div>
    <div class="signal-type-container">
      <a-row :gutter="30">
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
      </a-row>
      <!--<div>
        <img src="" alt="" />
      </div>-->
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

import { mapGetters } from 'vuex'
import VueContext from 'vue-context'
import 'vue-context/src/sass/vue-context.scss'

import UploadImage from './components/UploadImage'

export default {
  name: 'SignalMenu',
  components: {
    VueContext,
    UploadImage
    // GlobalFooter,
    // UserMenu
  },
  data() {
    return {
      visible: false,
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
      existIcons: ['radar', 'connection']
    }
  },
  methods: {
    handleChooseSignal(id) {
      console.log(id)
      this.$router.push('/workMode')
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
    }
  },
  computed: {
    ...mapGetters(['theme']),
    computeSignalIcon() {
      return function(id) {
        let icon = this.existIcons.find(icon => icon === id)
        if (icon) {
          return id
        } else {
          return null
        }
      }
    }
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
  top: 40%;
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
    max-width: 400px;
    // height: 300px;
    height: 0;
    padding-bottom: 100%;
    border-radius: 6px;
    text-align: center;
    cursor: pointer;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    border: 2px solid rgb(14, 65, 108);
    background: rgba(3, 13, 23, 0.3);
    &:hover {
      background: rgba(3, 13, 23, 0.5);
      /*-webkit-transform: scale(1.1); !*1.1放大值*!
      -moz-transform: scale(1.1);
      -o-transform: scale(1.1);
      -ms-transform: scale(1.1);*/
    }
    .signal-icon {
      width: 100%;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
      }
    }
    /*.signal-name {
      display: block;
      font-size: 20px;
    }
    .signal-name-icon {
      height: 120px;
      line-height: 120px;
      color: #3f51b5;
      font-size: 80px;
      background: linear-gradient(20deg, #1aabe2, #3f51b5);
      -webkit-background-clip: text;
      color: transparent;
      -webkit-text-fill-color: transparent;
      text-fill-color: transparent;
    }*/
  }
  .signal-desc {
    .signal-name {
      margin-top: 20px;
      font-size: 24px;
      font-weight: 700;
      color: #fff;
    }
    .signal-info {
      color: #0677b4;
    }
  }
}
.signal-menu {
  cursor: pointer;
  position: relative;
  padding: 15px;
  // background: rgba(61, 61, 204, 0.3);
  background: rgba(28, 61, 103, 0.5);
  -webkit-box-reflect: below 10px -webkit-linear-gradient(transparent, transparent
        70%, rgba(255, 255, 255, 0.5));
  &:hover {
    // box-shadow: 0px 0px 30px #1153f7;
    box-shadow: 0px 0px 30px #556eea;
    -webkit-transition: all 0.3s;
    -moz-transition: all 0.3s;
    -o-transition: all 0.3s;
    -webkit-transform: scale(1.1); /*1.1放大值*/
    -moz-transform: scale(1.1);
    -o-transform: scale(1.1);
    -ms-transform: scale(1.1);
  }
}

.signal-item-specialEffects {
  width: 100%;
  position: absolute;
  top: 80%;
  left: -1%;
  transform: rotateX(80deg);
  img {
    width: 100%;
    animation-name: haizei;
    animation-duration: 20s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  }
}
@keyframes haizei {
  0% {
    transform: rotateZ(-0deg);
  }
  100% {
    transform: rotateZ(-360deg);
  }
}

// 轮播图
</style>
