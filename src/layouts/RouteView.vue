<!--<script>
export default {
  name: 'RouteView',
  props: {
    keepAlive: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  render() {
    const {
      $route: { meta },
      $store: { getters }
    } = this
    const inKeep = (
      <keep-alive>
        <router-view />
      </keep-alive>
    )
    const notKeep = <router-view />
    // 这里增加了 multiTab 的判断，当开启了 multiTab 时
    // 应当全部组件皆缓存，否则会导致切换页面后页面还原成原始状态
    // 若确实不需要，可改为 return meta.keepAlive ? inKeep : notKeep
    if (!getters.multiTab && !!meta.keepAlive) {
      return notKeep
    }
    return this.keepAlive || getters.multiTab || meta.keepAlive
      ? inKeep
      : notKeep
  }
}
</script>-->

<template>
  <div style="height: 100%;">
    <keep-alive v-if="this.$route.meta.keepAlive">
      <router-view></router-view>
    </keep-alive>
    <router-view v-if="!this.$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: 'RouteView',
  data() {
    return {}
  }
}
</script>
