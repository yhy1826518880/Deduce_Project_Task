<template>
  <div id="userLayout" :class="['user-layout-wrapper', device]">
    <div class="container">
      <div class="top">
        <div class="header">
          <a href="/">
            <img src="~@/assets/logo.svg" class="logo" alt="logo" />
            <!--<span class="title">个体识别深度学习系统</span>-->
            <span class="title">系统软件框架</span>
          </a>
        </div>
        <div class="desc">
          <!--Individual Recognition Deep Learning System Software framework-->
        </div>
      </div>

      <route-view></route-view>
    </div>
  </div>
</template>

<script>
import RouteView from './RouteView'
import { mixinDevice } from '@/utils/mixin'

export default {
  name: 'UserLayout',
  components: { RouteView },
  mixins: [mixinDevice],
  data() {
    return {}
  },
  mounted() {
    document.body.classList.add('userLayout')
  },
  beforeDestroy() {
    document.body.classList.remove('userLayout')
  }
}
</script>

<style lang="less" scoped>
#userLayout.user-layout-wrapper {
  height: 100%;
  background: #f0f2f5 url(~@/assets/background2.jpg) no-repeat center;
  background-size: cover;

  &.mobile {
    .container {
      .main {
        max-width: 368px;
        width: 98%;
      }
    }
  }

  .container {
    width: 100%;
    min-height: 100%;
    // background: #f0f2f5 url(~@/assets/background.png) no-repeat 50%;
    // background-size: 100%;
    padding: 200px 0 144px;
    position: relative;

    a {
      text-decoration: none;
    }

    .top {
      text-align: center;

      .header {
        height: 44px;
        line-height: 44px;

        .badge {
          position: absolute;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
          margin-left: -12px;
          margin-top: -10px;
          opacity: 0.8;
        }

        .logo {
          height: 44px;
          vertical-align: top;
          margin-right: 16px;
          border-style: none;
        }

        .title {
          font-size: 38px;
          color: #fff;
          font-family: Avenir, 'Helvetica Neue', Arial, Helvetica, sans-serif;
          font-weight: 600;
          position: relative;
          top: 2px;

          background: linear-gradient(to bottom right, #ffffff, #1aabe2);
          -webkit-background-clip: text;
          color: transparent;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
        }
      }
      .desc {
        font-size: 14px;
        color: #efefef;
        margin-top: 12px;
        margin-bottom: 40px;

        background: linear-gradient(0, #31bee2, #ffffff);
        -webkit-background-clip: text;
        color: transparent;
        -webkit-text-fill-color: transparent;
        text-fill-color: transparent;
      }
    }

    .main {
      min-width: 260px;
      width: 368px;
      margin: 0 auto;
    }

    .footer {
      position: absolute;
      width: 100%;
      bottom: 0;
      padding: 0 16px;
      margin: 48px 0 24px;
      text-align: center;

      .links {
        margin-bottom: 8px;
        font-size: 14px;
        a {
          color: #efefef;
          transition: all 0.3s;
          &:not(:last-child) {
            margin-right: 40px;
          }
        }
      }
      .copyright {
        color: #efefef;
        font-size: 14px;
      }
    }
  }
}
</style>
