<template>
  <div>
    <a-card :loading="loading" title="系统简介" :bordered="false">
      <template>
        <a-skeleton active />
      </template>
    </a-card>
    <a-card :loading="loading" title="系统简介" :bordered="false">
      <template>
        <a-skeleton active />
      </template>
    </a-card>
    <a-card :loading="loading" title="系统简介" :bordered="false">
      <template>
        <a-skeleton active />
      </template>
    </a-card>
    <a-card :loading="loading" title="系统简介" :bordered="false">
      <template>
        <a-skeleton active />
      </template>
    </a-card>
  </div>
</template>

<script>
export default {
  name: 'SystemIntro',
  data() {
    return {
      infos: [],
      loading: true
    }
  }
}
</script>

<style scoped></style>
