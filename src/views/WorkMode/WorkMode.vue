<template>
  <div class="work-mode-container">
    <a-tabs defaultActiveKey="1" @change="onTabChange">
      <!--配置设置-->
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="setting" />
          配置设置
        </span>
        <div class="work-mode-setting">
          <div class="setting-type">
            <dv-border-box-8 style="padding: 20px 20px 16px;">
              <a-radio-group
                name="radioGroup"
                :defaultValue="1"
                v-model="activeMode"
                @change="modeRadioChange"
              >
                <a-radio :value="1">
                  <div class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode1"></svg-icon>
                      </span>
                      <span class="mode-text">采集存储</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="2">
                  <div class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode2"></svg-icon>
                      </span>
                      <span class="mode-text">数据标注</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="3">
                  <div style="" class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode3"></svg-icon>
                      </span>
                      <span class="mode-text">模型训练</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="4">
                  <div style="" class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode4"></svg-icon>
                      </span>
                      <span class="mode-text">推理识别</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
              </a-radio-group>
            </dv-border-box-8>
          </div>
          <div class="setting-info">
            <!--采集存储-->
            <div v-show="activeMode === 1" class="setting-info-container">
              <gather-mode></gather-mode>
            </div>

            <!--数据标注-->
            <div v-show="activeMode === 2" class="setting-info-container">
              <mark-mode @processChange="markProcessChange"></mark-mode>
            </div>

            <!--模型训练-->
            <div v-show="activeMode === 3" class="setting-info-container">
              <train-mode></train-mode>
            </div>

            <!--推理识别-->
            <div v-show="activeMode === 4" class="setting-info-container">
              <reasoning-mode
                @reasonProcessChange="reasonProcessChange"
              ></reasoning-mode>
            </div>
          </div>
        </div>
      </a-tab-pane>

      <!--结果展示-->
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="file" />
          结果展示
        </span>
        <div class="work-mode-result">
          <div class="flow-btn-container">
            <a-button type="primary" style="margin-right: 10px;"
              >暂停/运行</a-button
            >
            <a-button type="primary">结束</a-button>
          </div>

          <!--采集结果-->
          <div class="result-show" v-show="activeMode === 1">
            <dv-border-box-13 style="padding: 20px;">
              <div class="flow-chart">
                <div class="gather-device">
                  <img src="../../assets/node.png" alt="" />
                  <div class="gather-description">采集设备</div>
                </div>
                <div class="link-line"></div>
                <div class="gather-terminal">
                  <img src="../../assets/server.png" alt="" />
                  <div class="gather-description">采集终端</div>
                </div>
                <div class="gather-data-info">
                  <div class="info-text">任务名称: 常规采集任务</div>
                  <div class="info-text">任务ID: 2020011112</div>
                  <div class="info-text">设备ID: #2123</div>
                  <div class="info-text">设备状态: 正常</div>
                  <div class="info-text">采集速率: 500M/S</div>
                </div>
              </div>
            </dv-border-box-13>
            <dv-border-box-11
              title="实时数据统计"
              style="padding: 40px;margin-top: 20px;"
            >
              <div class="flow-detail">
                <a-row :gutter="40">
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#1"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#2"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#3"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                </a-row>
              </div>
            </dv-border-box-11>
          </div>

          <!--标注结果-->
          <div class="result-show" v-show="activeMode === 2">
            <div class="task-info-box">
              <span class="tesk-name">任务名称： xxxxxx</span>
              <span class="task-id">任务id： xxxxxx</span>
            </div>
            <div class="flow-chart">
              <div
                class="my-custom-step"
                v-for="(step, index) in markSteps"
                :key="index"
              >
                <div
                  class="step-title"
                  :class="{ 'current-step': currentStep === index }"
                  @dblclick="setCurrentStep(index, step, 'mark')"
                >
                  <dv-decoration-11 style="width:200px;height:60px">
                    {{ step.title }}
                  </dv-decoration-11>
                </div>
                <div
                  class="step-line"
                  v-if="index !== markSteps.length - 1"
                ></div>
                <span
                  class="line-arrow"
                  v-if="index !== reasonSteps.length - 1"
                ></span>
              </div>
              <div class="step-deal-num"></div>
            </div>
            <div class="flow-detail">
              <div class="flow-detail-title">
                {{ markSteps[currentStep] ? markSteps[currentStep].title : '' }}
              </div>
              <div class="flow-detail-content">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px 20px 0 20px;width: 100%;min-height: 300px"
                >
                  <dv-decoration-3
                    style="width:200px;height:30px;float: left;"
                  />
                  <div class="operation-btn-container">
                    <a-button type="primary" style="margin-right: 10px;"
                      >编辑</a-button
                    >
                    <a-button type="primary" style="margin-right: 10px;"
                      >入库</a-button
                    >
                    <a-button type="primary">删除</a-button>
                  </div>
                  <a-table
                    bordered
                    :dataSource="markLibList"
                    :columns="markLibColumns"
                    rowKey="id"
                    :pagination="pagination"
                  >
                    <template slot="attribute" slot-scope="attribute">
                      {{ attributeMap[attribute] }}
                    </template>
                  </a-table>
                </dv-border-box-4>
              </div>
            </div>
          </div>

          <!--训练结果-->
          <div class="result-show" v-show="activeMode === 3">
            <dv-border-box-13 style="padding: 20px;">
              <div class="flow-chart">
                <dv-decoration-3
                  style="width:300px;height:30px;position: absolute;top: 26px;left: 48px;"
                />
                <div class="train-data-info">
                  <div class="task-title">
                    任务名称: #2123
                  </div>
                  <div class="info-text">
                    任务id : 正常
                  </div>
                  <div class="info-text">
                    当前已训练轮数: 20/24
                  </div>
                  <div class="info-text">
                    该训练轮数描述信息: xxxxxxxx
                  </div>
                  <div class="info-text">
                    预计训练结束时间: xxxxx
                  </div>
                </div>
                <div style="position: absolute;top: 30px;right: 30px;">
                  <a-button type="primary">TensorBoard</a-button>
                </div>
              </div>
            </dv-border-box-13>
            <dv-border-box-11
              title="结果统计图"
              style="padding: 40px;margin-top: 20px;"
            >
              <a-row :gutter="30">
                <a-col :span="6">
                  <div style="height: 400px;">
                    <img
                      src="../../assets/chart1.png"
                      alt=""
                      style="width: 100%;height: 100%;"
                    />
                  </div>
                </a-col>
                <a-col :span="6">
                  <div
                    class="chart-box"
                    id="line#4"
                    style="width: 100%;min-height: 400px;"
                  ></div>
                </a-col>
                <a-col :span="6">
                  <div
                    class="chart-box"
                    id="line#5"
                    style="width: 100%;min-height: 400px;"
                  ></div>
                </a-col>
                <a-col :span="6">
                  <div style="height: 400px;">
                    <img
                      src="../../assets/chart2.png"
                      alt=""
                      style="width: 100%;height: 100%;"
                    />
                  </div>
                </a-col>
              </a-row>
            </dv-border-box-11>
          </div>

          <!--推理结果-->
          <div class="result-show" v-show="activeMode === 4">
            <div class="task-info-box">
              <span class="tesk-name">任务名称： xxxxxx</span>
              <span class="task-id">任务id： xxxxxx</span>
            </div>
            <div style="height: 40px;line-height: 40px;margin-bottom: 20px;">
              <span style="float: right;"
                ><a-button type="primary">TensorBoard</a-button></span
              >
            </div>
            <div class="flow-chart">
              <div
                class="my-custom-step"
                v-for="(step, index) in reasonSteps"
                :key="index"
              >
                <div
                  class="step-title"
                  :class="{ 'current-step': currentStep === index }"
                  @dblclick="setCurrentStep(index, step, 'reason')"
                >
                  <dv-decoration-11 style="width:200px;height:60px">
                    {{ step.title }}
                  </dv-decoration-11>
                </div>
                <div
                  class="step-line"
                  v-if="index !== reasonSteps.length - 1"
                ></div>
                <span
                  class="line-arrow"
                  v-if="index !== reasonSteps.length - 1"
                ></span>
              </div>
              <div class="step-deal-num"></div>
            </div>
            <div class="flow-detail">
              <div class="flow-detail-title">
                {{
                  reasonSteps[currentStep] ? reasonSteps[currentStep].title : ''
                }}
              </div>
              <div class="flow-detail-content">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px 20px 0 20px;width: 100%;min-height: 300px"
                >
                  <dv-decoration-3
                    style="width:200px;height:30px;float: left;"
                  />
                  <div class="operation-btn-container">
                    <a-button type="primary" style="margin-right: 10px;"
                      >编辑</a-button
                    >
                    <a-button type="primary" style="margin-right: 10px;"
                      >入库</a-button
                    >
                    <a-button type="primary">删除</a-button>
                  </div>
                  <a-table
                    bordered
                    :dataSource="reasonResList"
                    :columns="reasonResColumns"
                    rowKey="id"
                    :pagination="pagination"
                  >
                    <template slot="attribute" slot-scope="attribute">
                      {{ attributeMap[attribute] }}
                    </template>
                  </a-table>
                </dv-border-box-4>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      :title="selectedProcess ? selectedProcess.title : ''"
      v-model="showStepResult"
      width="80%"
      class="cus-modal uploader-modal"
      style="min-height: 800px;"
      :footer="null"
    >
      <step-result
        :process-name="selectedProcess.title"
        v-if="showStepResult"
      ></step-result>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { triggerWindowResizeEvent } from '@/utils/util'

import GatherMode from './Components/Setting/GatherMode'
import MarkMode from './Components/Setting/MarkMode'
import TrainMode from './Components/Setting/TrainMode'
import ReasoningMode from './Components/Setting/ReasoningMode'

import StepResult from './Components/StepResult/index'

export default {
  name: 'WorkMode',
  components: {
    GatherMode,
    MarkMode,
    TrainMode,
    ReasoningMode,
    StepResult
  },
  data() {
    return {
      currentStep: 3,
      activeMode: 1,
      modelChoose: 2,
      formLayout: 'horizontal',
      markSteps: [
        {
          title: '流程1',
          status: 1
        },
        {
          title: '流程2',
          status: 0
        },
        {
          title: '流程3',
          status: 0
        },
        {
          title: '流程4',
          status: 0
        }
      ],
      // 标注流程列表
      markProcessList: [],
      // 数据标注 库列表
      markLibList: [
        {
          index: 1,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 0,
          confidence: 10,
          frames: 10
        },
        {
          index: 2,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 1,
          confidence: 10,
          frames: 10
        },
        {
          index: 3,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 2,
          confidence: 10,
          frames: 10
        },
        {
          index: 4,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 1,
          confidence: 10,
          frames: 10
        },
        {
          index: 5,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 0,
          confidence: 10,
          frames: 10
        },
        {
          index: 6,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 0,
          confidence: 10,
          frames: 10
        },
        {
          index: 7,
          label: 'xxxx',
          flight: 'xxxxxx-xxxx',
          country: 'EN',
          lati: '30',
          long: '120',
          height: 8000,
          type: 'xxxx',
          attribute: 2,
          confidence: 10,
          frames: 10
        }
      ],
      markLibColumns: [
        {
          title: '序号',
          dataIndex: 'index',
          align: 'center'
        },
        {
          title: '标签',
          dataIndex: 'label',
          align: 'center'
        },
        {
          title: '航班号',
          dataIndex: 'flight',
          align: 'center'
        },
        {
          title: '国籍',
          dataIndex: 'country',
          align: 'center'
        },
        {
          title: '经度',
          dataIndex: 'long',
          align: 'center'
        },
        {
          title: '纬度',
          dataIndex: 'lati',
          align: 'center'
        },
        {
          title: '飞机高度',
          dataIndex: 'height',
          align: 'center'
        },
        {
          title: '飞机类型',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '军民属性',
          dataIndex: 'attribute',
          align: 'center',
          scopedSlots: { customRender: 'attribute' }
        },
        {
          title: '标注置信度',
          dataIndex: 'confidence',
          align: 'center'
        },
        {
          title: '所在原始数据帧数',
          dataIndex: 'frames',
          align: 'center'
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.markLibList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      attributeMap: {
        0: '未知',
        1: '军',
        2: '民'
      },

      // 训练推理流程列表
      reasonProcessList: [],
      reasonSteps: [],

      reasonResList: [
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        },
        {
          reasonIndex: 1,
          serialNumber: 2,
          name: 'xxxx',
          maxPossibilityTarget: 'xxx',
          maxConfidence: 'xx'
        }
      ],
      reasonResColumns: [
        {
          title: '编号',
          dataIndex: 'reasonIndex',
          align: 'center'
        },
        {
          title: '个体名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '序号',
          dataIndex: 'serialNumber',
          align: 'center'
        },
        {
          title: '最大可能目标',
          dataIndex: 'maxPossibilityTarget',
          align: 'center'
        },
        {
          title: '最大置信度',
          dataIndex: 'maxConfidence',
          align: 'center'
        }
      ],

      showStepResult: false,
      selectedProcess: null
    }
  },
  methods: {
    setCurrentStep(index, process, mode) {
      console.log(mode)
      console.log(process)
      this.currentStep = index
      this.selectedProcess = process
      this.showStepResult = true
    },
    initGatherChartOption(chartTitle) {
      let option = {
        backgroundColor: new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(69,72,200,0.4)'
            },
            {
              offset: 1,
              color: 'rgba(95,160,255,0.7)'
            }
          ],
          false
        ),
        title: {
          text: chartTitle,
          left: 'center',
          bottom: '5%',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          top: '20%',
          left: '10%',
          right: '10%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          axisLabel: {
            margin: 30,
            color: '#ffffff63'
          },
          axisLine: {
            // show: false
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          axisTick: {
            show: true,
            length: 25,
            lineStyle: {
              color: '#ffffff1f'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ffffff1f'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            axisLabel: {
              margin: 20,
              color: '#ffffff63'
            },

            axisTick: {
              show: true,
              length: 15,
              lineStyle: {
                color: '#ffffff1f'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ffffff1f'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: '注册总量',
            type: 'line',
            smooth: false, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: '#fff' // 线条颜色
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              color: 'red',
              borderColor: '#fff',
              borderWidth: 3
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#2929fb'
                    },
                    {
                      offset: 1,
                      color: '#3fbbff0d'
                    }
                  ],
                  false
                )
              }
            },
            data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
          }
        ]
      }
      return option
    },
    initGatherChartLine() {
      let option_1 = this.initGatherChartOption('时间_采集速率折线图')
      let option_2 = this.initGatherChartOption('时间_信号幅度折线图')
      let option_3 = this.initGatherChartOption('时间_信号频率折线图')
      let option_4 = this.initGatherChartOption('')
      let option_5 = this.initGatherChartOption('')
      let chart_1 = this.$echarts.init(document.getElementById('line#1'))
      let chart_2 = this.$echarts.init(document.getElementById('line#2'))
      let chart_3 = this.$echarts.init(document.getElementById('line#3'))
      let chart_4 = this.$echarts.init(document.getElementById('line#4'))
      let chart_5 = this.$echarts.init(document.getElementById('line#5'))
      chart_1.setOption(option_1)
      chart_2.setOption(option_2)
      chart_3.setOption(option_3)
      chart_4.setOption(option_4)
      chart_5.setOption(option_5)
    },
    onTabChange(tab) {
      if (tab == 2) {
        if (this.activeMode === 1 || this.activeMode === 3) {
          this.$nextTick(() => {
            this.initGatherChartLine()
          })
        }
      }
    },
    modeRadioChange() {
      triggerWindowResizeEvent()
    },

    // 数据标注流程改变
    markProcessChange(val) {
      this.markProcessList = val
      this.markSteps = []
      this.markProcessList.forEach(process => {
        let step = {
          title: process,
          status: 0
        }
        this.markSteps.push(step)
      })
    },

    // 推理识别流程改变
    reasonProcessChange(val) {
      this.reasonProcessList = val
      this.reasonSteps = []
      this.reasonProcessList.forEach(process => {
        let step = {
          title: process,
          status: 0
        }
        this.reasonSteps.push(step)
      })
    }
  },
  computed: {
    ...mapGetters(['workMode'])
  }
}
</script>

<style lang="less" scoped>
.work-mode-container {
  height: 100%;
  .work-mode-setting {
    height: 100%;
    padding: 10px 10px;
  }
  .setting-type {
    background: rgba(127, 127, 127, 0.1);
    // padding: 20px;
    border-radius: 4px;
    .ant-radio-group {
      label {
        font-size: 20px;
        .mode-text {
          color: #ced4ea;
        }
      }
    }
    .type-container {
      display: inline-block;
      // height: 60px;
      // line-height: 60px;
      // padding: 4px 26px;
      // margin: 10px 40px 10px 0;
      // background: #1c5ea3;
      // border-radius: 4px;
      // box-shadow: 0 2px 12px 0 rgba(39, 107, 270, 1);
    }
    .mode-icon {
      margin-right: 10px;
      color: #d8f0ff;
    }
  }
  .setting-info {
    height: calc(100% - 120px);
    margin-top: 20px;
    background: rgba(127, 127, 127, 0.1);
    padding: 20px 20px;
    border-radius: 4px;
    .setting-info-container {
      height: 100%;
    }
  }
  .ant-row {
    height: 100%;
  }
  .col-setting-box {
    height: calc(100% - 60px);
    .setting-box {
      width: 100%;
      height: 100%;
      padding: 10px;
      background: rgba(0, 0, 0, 0.2);
      overflow-y: auto;
      /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
      -ms-overflow-style: none;
      /*火狐下隐藏滚动条*/
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;

      /*Chrome下隐藏滚动条，溢出可以透明滚动*/
      &::-webkit-scrollbar {
        width: 0px;
        display: none;
      }
    }
    .setting-title {
      color: #198efc;
      font-weight: 700;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
    }
    .setting-form {
      margin-top: 20px;
      .ant-radio-group {
        label {
          font-size: 16px;
          color: #ced4ea;
        }
      }
      .ant-form-item-label {
        label {
          color: #ced4ea !important;
        }
      }
    }
  }
  .setting-button-container {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  .result-show {
    position: relative;
    .task-info-box {
      position: absolute;
      left: 4px;
      top: -40px;
      color: #4ac7d9;
      font-size: 18px;
      font-weight: 500;
      .task-title {
        margin-right: 10px;
      }
    }
  }
  .work-mode-result {
    height: 100%;
    .flow-btn-container {
      text-align: right;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .flow-chart {
      background: rgba(200, 200, 200, 0.1);
      // background: rgba(69, 72, 200, 0.2);
      padding: 40px;
      border-radius: 4px;
    }
    .flow-detail {
      height: calc(100% - 120px);
      margin-top: 20px;
      // background: rgba(127, 127, 127, 0.1);
      // padding: 20px 20px 0;
      border-radius: 4px;
      .flow-detail-title {
        height: 40px;
        line-height: 40px;
        padding-left: 10px;
        font-size: 24px;
        color: #4ac7d9;
        font-weight: 500;
      }
    }
  }
  .custom-step {
    padding: 4px 20px;
    border-radius: 4px;
    // background: #4c6290;
    color: #ced4ea;
    cursor: pointer;
    &.current-step {
      background: #315cce;
      color: #47ffee;
    }
    // 禁止选中文字
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
  }
  .my-custom-step {
    display: inline-block;
    margin: 6px 0;
    position: relative;
    .step-title {
      display: inline-block;
      padding: 4px 20px;
      border-radius: 4px;
      height: 60px;
      line-height: 60px;
      font-size: 24px;
      color: #ced4ea;
      cursor: pointer;
      &.current-step {
        // background: #315cce;
        color: #47ffee;
        -webkit-transform: scale(1.2);
        transform: scale(1.2);
      }
      // 禁止选中文字
      -moz-user-select: none; /*火狐*/
      -webkit-user-select: none; /*webkit浏览器*/
      -ms-user-select: none; /*IE10*/
      user-select: none;
    }
    .step-line {
      display: inline-block;
      width: 100px;
      height: 2px;
      background: #3dbcda;
      position: relative;
      top: -28px;
      margin: 0 20px 0 0;
    }
    .line-arrow {
      display: inline-block;
      width: 30px;
      height: 30px;
      top: 20px;
      right: 6px;
      position: absolute;
      background: url('../../assets/arrow.png') center center;
      background-size: cover;
    }
  }
  .ant-card {
    background: rgba(0, 0, 0, 0.2);
  }

  .advance-setting-btn {
    float: right;
    cursor: pointer;
  }
  .resource-container {
    margin-top: 20px;
    height: 50%;
    min-height: 350px;
    .resource-form,
    .resource-list {
      height: 100%;
    }
  }
  .gather-device,
  .gather-terminal {
    position: relative;
    display: inline-block;
    width: 80px;
    height: 80px;
    margin: 0 20px;
    img {
      width: 100%;
      height: 100%;
    }
    .gather-description {
      position: absolute;
      bottom: -26px;
      left: 6px;
      width: 100%;
      text-align: center;
    }
  }
  .link-line {
    display: inline-block;
    height: 2px;
    width: 200px;
    background: #00a0e9;
  }

  .operation-btn-container {
    text-align: right;
    margin-bottom: 10px;
  }

  .gather-data-info {
    width: 300px;
    position: absolute;
    right: 0;
    top: 30px;
    .info-text {
      font-size: 18px;
      color: #4ac7d9;
    }
  }
  .train-data-info {
    width: 300px;
    padding-top: 10px;
    .task-title,
    .info-text {
      color: #4ac7d9;
    }
    .task-title {
      height: 30px;
      line-height: 30px;
      font-size: 18px;
      font-weight: 500;
    }
    .info-text {
      height: 24px;
      line-height: 24px;
      font-size: 16px;
    }
  }
}
</style>
