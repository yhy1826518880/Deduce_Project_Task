<template>
  <a-locale-provider :locale="locale">
    <div id="app">
      <!--  推演任务规划业务  -->
      <dv-border-box-1
        title="推演任务规划业务系统"
        style="width: 100%;height: 100%;"
      >
        <router-view />
      </dv-border-box-1>
    </div>
  </a-locale-provider>
</template>

<script>
import zhCN from 'ant-design-vue/lib/locale-provider/zh_CN'
import { AppDeviceEnquire } from '@/utils/mixin'

export default {
  mixins: [AppDeviceEnquire],
  data() {
    return {
      locale: zhCN
    }
  },
  mounted() {}
}
</script>
<style>
#app {
  height: 100%;
}
</style>
