<template>
  <div>
    <a-drawer
      width="500"
      title="Uploader List"
      placement="right"
      :closable="false"
      @close="onClose"
      :visible="visible"
      :handle="handle"
    >
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
      <div class="uploader-drawer-index-handle" @click="toggle" v-if="btnVisible">
        <a-icon type="upload" v-if="!visible"></a-icon>
        <a-icon type="close" v-else></a-icon>
      </div>
    </a-drawer>
  </div>
</template>

<script>
export default {
  name: 'UploaderDrawer',
  data() {
    return {
      visible: false,
      btnVisible: true,
      handle: <div />
    }
  },
  methods: {
    showDrawer() {
      this.visible = true
    },
    onClose() {
      this.visible = false
    },
    toggle() {
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped lang="less">
.uploader-drawer-index-handle {
  position: absolute;
  top: 270px;
  background: #1890ff;
  width: 20px;
  height: 20px;
  right: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  pointer-events: auto;
  z-index: 1001;
  text-align: center;
  font-size: 12px;
  border-radius: 4px 0 0 4px;

  i {
    color: rgb(255, 255, 255);
    font-size: 16px;
  }
}
</style>
