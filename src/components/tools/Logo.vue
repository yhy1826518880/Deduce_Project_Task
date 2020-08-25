<template>
  <div class="logo">
    <router-link :to="{ name: 'signalChoose' }">
      <LogoSvg alt="logo" />
      <h1 v-if="showTitle">
        {{ title }}
        <div class="work-mode">{{ workMode }}</div>
      </h1>
    </router-link>
  </div>
</template>

<script>
import LogoSvg from '@/assets/logo.svg?inline'

export default {
  name: 'Logo',
  components: {
    LogoSvg
  },
  props: {
    title: {
      type: String,
      default: '推演任务规划业务',
      required: false
    },
    showTitle: {
      type: Boolean,
      default: true,
      required: false
    }
  },
  data() {
    return {
      workMode: ''
    }
  },
  created() {
    let workMode = this.$route.query.workMode
    if (workMode) {
      this.workMode = workMode
    }
  }
}
</script>

<style lang="less" scoped>
.work-mode {
  width: 100px;
  height: 30px;
  position: absolute;
  font-size: 14px;
  top: 44px;
  left: 50%;
  margin-left: -50px;
  line-height: 30px;
  text-align: center;
  color: #3a9dc4;
}
</style>
