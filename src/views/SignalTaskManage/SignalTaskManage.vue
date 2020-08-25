<template>
  <div class="signal-task-container">
    <dv-border-box-4
      :color="['#124ef5', '#87ecf5']"
      style="padding: 40px 20px 0 20px;width: 100%;"
    >
      <div class="signal-task-btn">
        <dv-decoration-3 style="width:200px;height:30px;float: left;" />
        <a-button class="editable-add-btn" type="primary" style="margin:0 10px;"
          >查询</a-button
        >
        <a-button class="editable-add-btn" type="primary" style="margin: 0 10px"
          >删除任务</a-button
        >
      </div>

      <a-table
        bordered
        :dataSource="taskList"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
      >
        <template slot="name" slot-scope="text">
          <editable-cell :text="text" />
        </template>
        <template slot="progress" slot-scope="progress, record">
          <a-progress :percent="progress" status="active"></a-progress>
        </template>
        <template slot="process" slot-scope="process, record">
          <a-steps class="step-data-container">
            <a-step v-for="(item, index) in process.steps" :key="index">
              <div
                class="custom-step"
                slot="icon"
                :class="{ 'current-step': process.currentStep === index }"
              >
                {{ item.title }}
              </div>
            </a-step>
          </a-steps>
        </template>
        <template slot="operation" slot-scope="name, record">
          <a-popconfirm v-if="taskList.length" title="确认暂停吗">
            <a href="javascript:;">暂停</a>
          </a-popconfirm>
          <a-popconfirm v-if="taskList.length" title="确认结束吗">
            <span style="margin-left: 10px;">
              <a href="javascript:;">结束</a>
            </span>
          </a-popconfirm>
        </template>
      </a-table>
    </dv-border-box-4>

    <div class="chart-container">
      <a-row :gutter="20">
        <a-col
          :span="12"
          v-for="(chart, index) in chartOptionList"
          :key="index"
        >
          <dv-border-box-4
            :color="['#124ef5', '#87ecf5']"
            style="padding: 20px 0 0 20px;"
          >
            <div class="chart-box">
              <div
                :id="`signalTaskChart${index}`"
                style="width: 100%; height: 100%;min-height: 400px;"
              ></div>
            </div>
          </dv-border-box-4>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import {
  getApplication,
  deleteApplication,
  addApplication
} from '@/api/application'
import uniqid from 'uniqid'
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const formTailLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 }
  }
}
const attributeLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
}
const chartOptionList = []
for (let i = 0; i < 2; i++) {
  let option = {
    title: {
      text: `任务统计图${i + 1}`,
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
          value: '2014'
        },
        radius: '65%',
        center: ['50%', '50%']
      }
    ]
  }
  chartOptionList.push(option)
}
export default {
  name: 'SignalTaskManage',
  data() {
    return {
      selectedRowKeys: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.taskList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      columns: [
        {
          title: '工作模式',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '工作状态',
          dataIndex: 'description',
          align: 'center'
        },
        {
          title: '任务进度',
          dataIndex: 'progress',
          align: 'center',
          scopedSlots: { customRender: 'progress' }
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '流程',
          dataIndex: 'process',
          align: 'center',
          scopedSlots: { customRender: 'process' }
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      chartOptionList,
      formItemLayout,
      formTailLayout,
      attributeLayout,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 19, offset: 5 }
        }
      },
      taskList: [
        {
          name: '任务1',
          description: '这是任务1',
          id: '1',
          progress: 50,
          createTime: '2010-8-31 11:00:00',
          process: {
            steps: [
              {
                title: 'IFF1',
                status: 1
              },
              {
                title: 'IFF2',
                status: 0
              },
              {
                title: 'IFF3',
                status: 0
              },
              {
                title: 'IFF4',
                status: 0
              }
            ],
            currentStep: 1
          }
        },
        {
          name: '任务2',
          description: '这是任务2',
          id: '2',
          progress: 70,
          createTime: '2010-8-31 11:01:00',
          process: {
            steps: [
              {
                title: '测试1',
                status: 1
              },
              {
                title: '测试2',
                status: 0
              },
              {
                title: '测试3',
                status: 0
              },
              {
                title: '测试4',
                status: 0
              }
            ],
            currentStep: 0
          }
        },
        {
          name: '任务3',
          description: '这是任务3',
          id: '3',
          progress: 46,
          createTime: '2010-8-31 11:02:00',
          process: {
            steps: [
              {
                title: 'IFF1',
                status: 1
              },
              {
                title: 'IFF2',
                status: 0
              },
              {
                title: 'IFF3',
                status: 0
              },
              {
                title: 'IFF4',
                status: 0
              }
            ],
            currentStep: 1
          }
        },
        {
          name: '任务4',
          description: '这是任务4',
          id: '4',
          progress: 89,
          createTime: '2010-8-31 11:03:00',
          process: {
            steps: [
              {
                title: '测试1',
                status: 1
              },
              {
                title: '测试2',
                status: 0
              },
              {
                title: '测试3',
                status: 0
              },
              {
                title: '测试4',
                status: 0
              }
            ],
            currentStep: 0
          }
        }
      ],
      chartList: [],
      targetApp: {},
      form: this.$form.createForm(this),
      createForm: {
        name: '',
        description: '',
        attributeList: []
      },
      visible: false
    }
  },
  methods: {
    // 表格数据勾选回调
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },

    onRestart() {},

    resetForm() {
      this.createForm = {
        name: '',
        description: '',
        attributeList: []
      }
    },

    handleAdd() {
      this.resetForm()
      this.visible = true
    },

    handleOk() {
      console.log(this.createForm)

      const postData = {
        name: this.createForm.name,
        description: this.createForm.description,
        createTime: '2019-09-04 09:42:21',
        params: [{ name: 'intA', description: 'int', type: '0' }]
      }
      const userId = '8bb3870f-4b5a-4a99-8650-59b7e977803a'
      addApplication(userId, JSON.stringify(postData))
    },

    remove(k) {
      const arr = this.createForm.attributeList
      arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
      console.log(k)
    },

    addAttribute() {
      this.createForm.attributeList.push({
        name: '',
        type: '',
        attrId: uniqid.time()
      })
    },

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
      this.chartOptionList.forEach((option, index) => {
        this.drawPie(`signalTaskChart${index}`, option)
      })
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
.signal-task-container {
  padding-bottom: 20px;
}
td {
  .ant-steps {
    text-align: left;
    .custom-step {
      padding: 2px 4px;
      border-radius: 4px;
      background: #aaa;
      color: #fff;
      cursor: pointer;
      font-size: 14px;
      min-width: 80px;
      &.current-step {
        background: #315cce;
      }
      // 禁止选中文字
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      user-select: none;
    }
  }
}
.chart-container {
  margin-top: 20px;
  .chart-box {
    padding: 10px;
    border-radius: 6px;
    background: rgba(0, 0, 0, 0.3);
  }
}
</style>
