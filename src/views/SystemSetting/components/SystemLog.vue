<template>
  <div style="height: 100%; width: 100%">
    <div>
      <span>选择系统日志日期：</span>
      <a-date-picker :disabledDate="disabledDate" @change="onDateChange" />
      <a-button
        @click="getLogContent"
        type="primary"
        style="margin-left: 10px;position: relative;top:-2px;"
        >查询</a-button
      >
      <a-button
        type="primary"
        style="margin-left: 10px;position: relative;top:-2px;"
        @click="clearLog"
        >清空</a-button
      >
    </div>
    <!--<input type="file" @change="getLogContent($event)" />-->
    <div class="log-content" v-show="showLogContent">
      {{ logContent }}
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { getSystemLog } from '@/api/log'

export default {
  name: 'SystemLog',
  data() {
    return {
      logContent: '',
      dateString: '',
      showLogContent: false
    }
  },
  methods: {
    onDateChange(date, dateString) {
      console.log(date, dateString)
      this.dateString = dateString
    },
    disabledDate(current) {
      return current && current > moment().endOf('day')
    },
    getLogContent(e) {
      /*if (e.target) {
        let file = e.target.files[0]
        let reader = new FileReader()
        reader.onload = () => {
          if (reader.result) {
            this.logContent = reader.result
          }
        }
        reader.readAsText(file)
      }*/
      this.logContent = ''
      let params = {
        date: 100
      }
      getSystemLog(params).then(res => {
        /*let byteArray = new Uint8Array(res.data)
        console.log(res)
        console.log(byteArray)*/
        console.log(res)
        this.logContent = res.data
        this.showLogContent = true
      })
    },
    clearLog() {
      this.logContent = ''
      this.showLogContent = false
    }
  },
  created() {}
}
</script>

<style lang="less" scoped>
.log-content {
  width: calc(100% - 280px);
  padding: 30px;
  margin-top: 20px;
  background: rgba(127, 127, 127, 0.4);
  line-height: 30px;
  font-size: 20px;
  color: #ddd;
  word-wrap: break-word;
}
</style>
