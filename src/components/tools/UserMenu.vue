<template>
  <div class="user-wrapper">
    <div class="content-box">
      <!--<span style="position: relative;top: -10px;">用户中心</span>-->
      <a-dropdown>
        <span
          class="action ant-dropdown-link user-dropdown-menu"
          style="display: inline-block;height: 100%;"
        >
          <span style="font-size: 40px;color: #5d89b7;">
            <svg-icon icon-class="user6"></svg-icon>
          </span>
        </span>
        <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
          <!--<a-menu-item key="1">
            <a-icon type="user" />
            <span>用户名</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="team" />
            <span>部门信息</span>
          </a-menu-item>
          <a-menu-divider />-->
          <a-menu-item key="3">
            <a href="javascript:;" @click="handleLogout">
              <a-icon type="logout" />
              <span>退出登录</span>
            </a>
          </a-menu-item>
        </a-menu>
      </a-dropdown>
      <div class="username-box">{{ username }}</div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'UserMenu',
  components: {},
  data() {
    return {
      username: ''
    }
  },
  methods: {
    ...mapActions(['Logout']),
    ...mapGetters(['nickname', 'avatar']),
    handleLogout() {
      const that = this

      this.$confirm({
        title: '提示',
        content: '确定要注销登录吗 ?',
        onOk() {
          return that
            .Logout({})
            .then(() => {
              window.location.reload()
            })
            .catch(err => {
              that.$message.error({
                title: '错误',
                description: err.message
              })
            })
        },
        onCancel() {}
      })
    }
  },
  created() {
    this.username = Vue.ls.get('USER_NAME')
  }
}
</script>

<style lang="less" scoped>
.username-box {
  display: inline-block;
  position: relative;
  font-size: 16px;
  top: -8px;
  color: #4ac7d9;
}
</style>
