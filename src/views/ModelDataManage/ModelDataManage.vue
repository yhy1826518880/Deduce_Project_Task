<template>
  <div class="model-data-container">
    <dv-border-box-4
      :color="['#124ef5', '#87ecf5']"
      style="padding: 40px 20px 0 20px;width: 100%;"
    >
      <dv-decoration-3 style="width:200px;height:30px;float: left;" />
      <div class="operate-btn-container">
        <a-button class="editable-add-btn" type="primary" style="margin:0 10px;"
          >编辑</a-button
        >
        <a-button
          class="editable-add-btn"
          type="primary"
          @click="ifShowFilterDialog"
          style="margin: 0 10px"
          >查询</a-button
        >
        <a-button
          class="editable-add-btn"
          type="primary"
          style="margin: 0 10px"
          @click="showUploader"
          >导入</a-button
        >
        <a-button
          class="editable-add-btn"
          type="primary"
          style="margin: 0 10px"
          @click="handleExport"
          >导出</a-button
        >
      </div>
      <a-table
        bordered
        :dataSource="dataSource"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
      >
        <template slot="name" slot-scope="text">
          <editable-cell :text="text" />
        </template>
      </a-table>
    </dv-border-box-4>

    <div style="margin-top: 20px;">
      <a-row :gutter="30">
        <a-col :span="12">
          <dv-border-box-4
            :color="['#124ef5', '#87ecf5']"
            style="padding: 20px 0 0 20px;"
          >
            <div
              id="numChart"
              class="chart-box"
              style="width: 100%; height: 100%;min-height: 600px;"
            ></div>
          </dv-border-box-4>
        </a-col>
        <a-col :span="12">
          <dv-border-box-4
            :color="['#124ef5', '#87ecf5']"
            style="padding: 20px 0 0 20px;"
          >
            <div
              id="typeChart"
              class="chart-box"
              style="width: 100%; height: 100%;min-height: 600px;"
            ></div>
          </dv-border-box-4>
        </a-col>
      </a-row>
    </div>

    <!--文件上传控件-->
    <a-modal
      v-model="ifShowUploader"
      width="60%"
      style="height: 60%"
      class="cus-modal uploader-modal"
      :footer="null"
    >
      <uploader-reviewer></uploader-reviewer>
    </a-modal>

    <!--搜索查询控件-->
    <a-modal
      v-model="ifShowFilterDialog"
      width="60%"
      style="height: 60%"
      class="cus-modal uploader-modal"
      :footer="null"
    >
      <search-panel></search-panel>
    </a-modal>
  </div>
</template>
<script>
import UploaderReviewer from '@/components/Uploader/UploaderFolder_OriginData'
import SearchPanel from '@/components/SearchPanel/SearchPanel'

import { exportFiles } from '@/api/files'

const dataSource = []
// dataSource.push(null)
for (let i = 0; i < 11; i++) {
  if (i % 2 == 0) {
    dataSource.push({
      name: `测试数据${i + 1}`,
      auth: `文本型`,
      createTime: '2019-12-06 19:30:08',
      id: i,
      state: '关闭',
      path: 'C:\\Users\\33596\\Desktop\\Release'
    })
  } else {
    dataSource.push({
      name: `测试数据${i + 1}`,
      auth: `数字型`,
      createTime: '2019-12-20 20:30:08',
      id: i,
      state: '运行',
      path: 'C:\\Users\\33596\\Desktop\\Release'
    })
  }
}
export default {
  name: 'ModelDataManage',
  components: {
    UploaderReviewer,
    SearchPanel
  },
  data() {
    return {
      chartList: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${dataSource.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      dataSource,
      drawerVisible: false,
      columns: [
        {
          title: '数据名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '数据类型',
          dataIndex: 'auth',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center'
        },
        {
          title: '文件路径',
          dataIndex: 'path',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        }
      ],
      selectedRowKeys: [],
      userNumOption: {
        title: {
          text: '数据数量统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2'],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1]
          ]
        },
        series: [
          {
            type: 'pie',
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
            // No encode specified, by default, it is '2012'.
          }
        ]
      },
      userTypeOption: {
        title: {
          text: '数据类型统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: 'pie',
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
          }
        ]
      },
      ifShowUploader: false,
      ifShowFilterDialog: false
    }
  },
  methods: {
    // 表格勾选
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    // 操作中的暂停事件
    onStop() {},

    // 绘制饼状图
    drawPie(id, option) {
      let myChart = this.$echarts.init(document.getElementById(id))
      myChart.setOption(option)
      this.chartList.push(myChart)
    },

    // 选择后删除
    handleDelete() {
      this.$confirm({
        title: '警告',
        content: `真的要删除选中的数据吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },

    // 显示上传文件控件
    showUploader() {
      this.ifShowUploader = true
    },

    // 显示筛选框
    handleFilter() {
      this.ifShowFilterDialog = true
    },

    // 导出文件
    handleExport() {
      let fileIds = [100, 200]
      let params = {
        fileIds: fileIds
      }
      exportFiles(params).then(res => {
        let filename = ''
        if (res.headers.filename) {
          filename = res.headers.filename
        }
        let blob = new Blob([res.data])
        let downloadElement = document.createElement('a')
        let href = window.URL.createObjectURL(blob) //创建下载的链接
        downloadElement.href = href
        downloadElement.download = filename //下载后文件名
        document.body.appendChild(downloadElement)
        downloadElement.click() //点击下载
        document.body.removeChild(downloadElement) //下载完成移除元素
        window.URL.revokeObjectURL(href) //释放掉blob对象
      })
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawPie('numChart', this.userNumOption)
      this.drawPie('typeChart', this.userTypeOption)
      this.$nextTick(() => {
        window.onresize = e => {
          if (e.eventType !== 'routerChange') {
            this.chartList.forEach(chart => {
              chart.resize()
            })
          }
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.model-data-container {
  padding-bottom: 20px;
}
#numChart,
#typeChart {
  padding: 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
