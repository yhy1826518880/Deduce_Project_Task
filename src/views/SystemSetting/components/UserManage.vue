<template>
  <div class="user-manage-container">
    <dv-border-box-3 style="padding: 30px 30px 20px 30px;">
      <div class="operate-btn-container">
        <dv-decoration-3 style="width:300px;height:30px;float: left;" />
        <a-button
          class="editable-add-btn"
          type="primary"
          style="margin-right: 10px;"
          >查询</a-button
        >
        <a-button class="editable-add-btn" type="primary" @click="handleDelete"
          >删除</a-button
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
        <template slot="operation" slot-scope="name, record">
          <a-popconfirm
            v-if="dataSource.length"
            title="确认删除吗"
            @confirm="() => onDelete()"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <span style="margin-left: 10px">
            <a href="javascript:;">修改</a>
          </span>
        </template>
      </a-table>
    </dv-border-box-3>

    <a-row :gutter="30" style="margin-top: 20px;">
      <a-col :span="12">
        <dv-border-box-4
          :color="['#124ef5', '#87ecf5']"
          style="padding: 20px 0 0 20px;"
        >
          <div
            id="userNumChart"
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
            id="userTypeChart"
            class="chart-box"
            style="width: 100%; height: 100%;min-height: 600px;"
          ></div>
        </dv-border-box-4>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const dataSource = []
// dataSource.push(null)
for (let i = 0; i < 11; i++) {
  dataSource.push({
    name: `用户${i + 1}`,
    auth: `用户`,
    createTime: '2019-12-06 19:30:08',
    id: i
  })
}

export default {
  name: 'Article',
  components: {},
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
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '角色',
          dataIndex: 'auth',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      selectedRowKeys: [],
      userNumOption: {
        title: {
          text: '用户数量统计',
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
            // No encode specified, by default, it is '2012'.
          }
        ]
      },
      userTypeOption: {
        title: {
          text: '用户类型统计',
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
      }
    }
  },
  methods: {
    // 表格勾选
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    // 操作中的删除事件
    onDelete() {},

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
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawPie('userNumChart', this.userNumOption)
      this.drawPie('userTypeChart', this.userTypeOption)
      this.$nextTick(() => {
        window.onresize = () => {
          this.chartList.forEach(chart => {
            chart.resize()
          })
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
.user-manage-container {
  padding-bottom: 20px;
}
.app-list {
  .new-btn {
    background-color: #fff;
    border-radius: 2px;
    width: 100%;
    height: 188px;
  }
  .meta-cardInfo {
    zoom: 1;
    margin-top: 16px;

    > div {
      position: relative;
      text-align: left;
      float: left;
      width: 50%;

      p {
        line-height: 32px;
        font-size: 24px;
        margin: 0;

        &:first-child {
          color: rgba(0, 0, 0, 0.45);
          font-size: 12px;
          line-height: 20px;
          margin-bottom: 4px;
        }
      }
    }
  }
}
#userNumChart,
#userTypeChart {
  padding: 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.2);
}
</style>
