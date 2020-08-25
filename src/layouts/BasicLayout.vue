<template>
  <a-layout :class="['layout', device]" class="main_layout">
    <!-- SideMenu -->
    <a-drawer
      v-if="isMobile()"
      placement="left"
      :wrapClassName="`drawer-sider ${navTheme}`"
      :closable="false"
      :visible="collapsed"
      @close="drawerClose"
     >
      <side-menu
        mode="inline"
        :menus="menus"
        :theme="navTheme"
        :collapsed="false"
        :collapsible="true"
        @menuSelect="menuSelect"
      ></side-menu>
    </a-drawer>

    <side-menu
      v-else-if="isSideMenu()"
      mode="inline"
      :menus="menus"
      :theme="navTheme"
      :collapsed="collapsed"
      :collapsible="true"
      style="position: fixed;width: 300px;height: 100%;"
    ></side-menu>

    <a-layout
      :class="[layoutMode, `content-width-${contentWidth}`]"
      :style="{
        paddingLeft: contentPaddingLeft,
        minHeight: '100vh',
        marginLeft: contentMarginLeft
      }"
      class="content-layout"
    >
      <!-- layout header -->
      <global-header
        :mode="layoutMode"
        :menus="menus"
        :theme="navTheme"
        :collapsed="collapsed"
        :device="device"
        @toggle="toggle"
        class="content-header"
      />

      <!-- layout content -->
      <a-layout-content
        :style="{
          height: '100%',
          margin: '24px 24px 0',
          paddingTop: fixedHeader ? '64px' : '0'
        }"
      >
        <multi-tab v-if="multiTab"></multi-tab>
        <transition name="page-transition">
          <route-view />
        </transition>
      </a-layout-content>

      <!-- layout footer -->
      <!--<a-layout-footer>
        <global-footer />
      </a-layout-footer>-->

      <div class="footer-logo-container">
        <div class="footer-logo-info">
          <div class="footer-logo-icon">
            <img src="../assets/logo-company.png" alt="" />
          </div>
          <div class="footer-logo-text">
            <div>中国航天科工集团公司</div>
            <div>电磁信息数据中心</div>
          </div>
        </div>
      </div>

      <!-- Setting Drawer (show in development mode) -->
      <!--<setting-drawer></setting-drawer>-->
    </a-layout>
  </a-layout>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import { mapState, mapActions } from 'vuex'
import { mixin, mixinDevice } from '@/utils/mixin'
import config from '@/config/defaultSettings'

import RouteView from './RouteView'
import MultiTab from '@/components/MultiTab'
import SideMenu from '@/components/Menu/SideMenu'
import GlobalHeader from '@/components/GlobalHeader'
import GlobalFooter from '@/components/GlobalFooter'
import SettingDrawer from '@/components/SettingDrawer'

import _ from 'lodash'

export default {
  name: 'BasicLayout',
  mixins: [mixin, mixinDevice],
  components: {
    RouteView,
    MultiTab,
    SideMenu,
    GlobalHeader,
    GlobalFooter,
    SettingDrawer
  },
  data() {
    return {
      production: config.production,
      collapsed: false,
      menus: [],
      menuBack: []
    }
  },
  computed: {
    ...mapState({
      // 动态主路由
      mainMenu: state => state.permission.addRouters
    }),
    contentPaddingLeft() {
      if (!this.fixSidebar || this.isMobile()) {
        return '0'
      }
      if (this.sidebarOpened) {
        // return '300px'
        return '0'
      }
      return '80px'
    },
    contentMarginLeft() {
      if (this.sidebarOpened) {
        return '310px'
      }
      return '90px'
    }
  },
  watch: {
    sidebarOpened(val) {
      this.collapsed = !val
    },
    $route(val) {
      if (val.meta) {
        let route_meta = val.meta
        if (route_meta.level === 3) {
          this.menus = this.menuBack.filter(item => item.meta.level === 3)
        } else {
          this.menus = this.menuBack.filter(item => item.meta.level !== 3)
        }
      }
      this.$nextTick(() => {
        triggerWindowResizeEvent('routerChange')
      })
    }
  },
  created() {
    let menus = this.mainMenu.find(item => item.path === '/').children
    this.menus = menus
    if (this.$route.meta.level === 3) {
      this.menus = menus.filter(item => item.meta.level === 3)
    } else {
      this.menus = menus.filter(item => item.meta.level !== 3)
    }
    this.menuBack = _.cloneDeep(menus)
    this.collapsed = !this.sidebarOpened
  },
  mounted() {
    const userAgent = navigator.userAgent
    if (userAgent.indexOf('Edge') > -1) {
      this.$nextTick(() => {
        this.collapsed = !this.collapsed
        setTimeout(() => {
          this.collapsed = !this.collapsed
        }, 16)
      })
    }
  },
  methods: {
    ...mapActions(['setSidebar']),
    toggle() {
      this.collapsed = !this.collapsed
      this.setSidebar(!this.collapsed)
      triggerWindowResizeEvent()
    },
    paddingCalc() {
      let left = ''
      if (this.sidebarOpened) {
        left = this.isDesktop() ? '300px' : '80px'
      } else {
        left = (this.isMobile() && '0') || ((this.fixSidebar && '80px') || '0')
      }
      return left
    },
    menuSelect() {
      if (!this.isDesktop()) {
        this.collapsed = false
      }
    },
    drawerClose() {
      this.collapsed = false
    }
  }
}
</script>

<style lang="less">
@import url('../components/global.less');

/*
 * The following styles are auto-applied to elements with
 * transition="page-transition" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the page transition by editing
 * these styles.
 */

.page-transition-enter {
  opacity: 0;
}

.page-transition-leave-active {
  opacity: 0;
}

.page-transition-enter .page-transition-container,
.page-transition-leave-active .page-transition-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

.footer-logo-container {
  position: absolute;
  bottom: 6px;
  left: 0;
  width: 100%;
  text-align: center;
  .footer-logo-icon,
  .footer-logo-text {
    display: inline-block;
  }
  .footer-logo-icon {
    width: 40px;
    position: relative;
    top: -6px;
    left: -6px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .footer-logo-text {
    position: relative;
    top: 3px;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #fff;
  }
}
</style>
