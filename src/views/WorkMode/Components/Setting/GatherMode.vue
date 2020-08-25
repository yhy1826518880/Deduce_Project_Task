<template>
  <div class="mode-setting-container">
    <div class="col-setting-box">
      <div class="setting-box">
        <div class="setting-title">
          <span>基本设置</span>
        </div>

        <!--资源列表及采集设备配置信息-->
        <div class="resource-container">
          <a-row :gutter="40">
            <!--采集设备列表-->
            <a-col :span="12" style="height: 100%;">
              <div class="resource-list">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px;"
                >
                  <div class="user-operation">选择采集设备</div>
                  <a-table
                    bordered
                    :dataSource="gatherResourceList"
                    :rowSelection="{
                      selectedRowKeys: gatherSelectedRowKeys,
                      onChange: onGatherSelectChange,
                      onSelect: onRowSelect
                    }"
                    :columns="gatherColumns"
                    rowKey="id"
                    :pagination="false"
                    :customRow="gatherRowClick"
                  >
                    <template slot="state" slot-scope="state">
                      <span
                        :style="{
                          color: state === 0 ? 'red' : 'green'
                        }"
                      >
                        {{ state === 0 ? '忙碌' : '空闲' }}
                      </span>
                    </template>
                  </a-table>
                </dv-border-box-4>
              </div>
            </a-col>

            <!--采集设备参数设置-->
            <a-col :span="12" style="height: 100%;">
              <div class="resource-form">
                <span
                  v-if="currentRow"
                  style="font-size: 18px;color: #3a81c7;position: absolute;top: 20px;left: 70px;"
                  >{{ currentRow.name }}</span
                >
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px;"
                >
                  <a-form :form="gatherSettingForm" v-if="currentRow">
                    <a-form-item
                      label="采集模式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group
                        default-value="1"
                        v-model="currentRow.gatherMode"
                      >
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;">盲采</span></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;">触发采</span></a-radio
                        >
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      label="数据精度"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        style="width: 240px"
                        v-model="currentRow.dataAccuracy"
                      >
                        <a-select-option value="0">chart</a-select-option>
                        <a-select-option value="1">short</a-select-option>
                        <a-select-option value="2">int</a-select-option>
                        <a-select-option value="3">float</a-select-option>
                        <a-select-option value="4">double</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="中心频率"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.centerFreq"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="采样率"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.sampleFreq"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="帧头"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.frameHeader"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="长度"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.frameLength"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="帧尾"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.frameTail"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="每帧数据点个数"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.freqNum"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="单文件最大存储容量"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input-number
                        v-model="currentRow.fileMaxCap"
                      ></a-input-number>
                    </a-form-item>
                    <a-form-item
                      label="文件存储路径"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.filePath"></a-input>
                    </a-form-item>
                    <a-form-item
                      label="文件名前缀"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input v-model="currentRow.filePrefix"></a-input>
                    </a-form-item>
                    <!--3月6日新增-->

                    <div v-if="currentRow.type === 'USB'">
                      <a-form-item
                        label="中心频率"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-input-number
                          v-model="currentRow.CenterFreq_Hz"
                        ></a-input-number>
                      </a-form-item>
                      <a-form-item
                        label="参考电平"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-input-number
                          v-model="currentRow.RefLevel_dBm"
                        ></a-input-number>
                      </a-form-item>
                      <a-form-item
                        label="抽取倍数"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-input-number
                          v-model="currentRow.DecimateFactor"
                        ></a-input-number>
                      </a-form-item>
                      <a-form-item
                        label="采样数据的长度"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-input v-model="currentRow.FramePts"></a-input>
                      </a-form-item>
                      <a-form-item
                        label="超时时间"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-input v-model="currentRow.Timeout"></a-input>
                      </a-form-item>
                      <a-form-item
                        label="RF接收机路径"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-select
                          style="width: 240px"
                          v-model="currentRow.RFPath"
                        >
                          <a-select-option value="0">ExtPath</a-select-option>
                          <a-select-option value="1">IntPath</a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        label="Trigger触发方式"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-select
                          style="width: 240px"
                          v-model="currentRow.TRGMode"
                        >
                          <a-select-option value="0">Fixed</a-select-option>
                          <a-select-option value="1">Triggered</a-select-option>
                        </a-select>
                      </a-form-item>
                      <a-form-item
                        label="IQ时域采集触发源"
                        :label-col="{ span: 5 }"
                        :wrapper-col="{ span: 12 }"
                      >
                        <a-select
                          style="width: 240px"
                          v-model="currentRow.TRGSrc"
                        >
                          <a-select-option value="0">External</a-select-option>
                          <a-select-option value="1">Soft</a-select-option>
                        </a-select>
                      </a-form-item>
                    </div>
                  </a-form>
                  <a-form :form="gatherSettingForm" v-else>
                    <a-form-item
                      label="采集模式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group default-value="1" disabled>
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;">盲采</span></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;">触发采</span></a-radio
                        >
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      label="数据精度"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select style="width: 240px" disabled>
                        <a-select-option value="0">chart</a-select-option>
                        <a-select-option value="1">short</a-select-option>
                        <a-select-option value="2">int</a-select-option>
                        <a-select-option value="3">float</a-select-option>
                        <a-select-option value="4">double</a-select-option>
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="中心频率"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="采样率"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="帧头"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="长度"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="帧尾"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="每帧数据点个数"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="单文件最大存储容量"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input-number disabled></a-input-number>
                    </a-form-item>
                    <a-form-item
                      label="文件存储路径"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="文件名前缀"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                  </a-form>
                </dv-border-box-4>
              </div>
            </a-col>
          </a-row>
        </div>

        <!--基本设置form-->
        <div class="setting-form">
          <dv-border-box-4
            :color="['#124ef5', '#87ecf5']"
            style="padding: 40px;"
          >
            <a-form :form="baseSettingForm">
              <a-form-item
                hasFeedback
                label="任务名称"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
                :validate-status="getFieldStatus('taskName')"
                :help="getFieldText('taskName')"
              >
                <a-input v-model="taskName"></a-input>
              </a-form-item>
              <a-form-item
                label="工作模式"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-radio-group default-value="2" v-model="modelChoose">
                  <a-radio :value="1"
                    ><span style="color: #ced4ea;">手动模式</span></a-radio
                  >
                  <a-radio :value="2"
                    ><span style="color: #ced4ea;">自动模式</span></a-radio
                  >
                </a-radio-group>
              </a-form-item>
              <a-form-item
                v-show="modelChoose === 2"
                label="开始时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="startValue"
                  placeholder="开始时间"
                  @openChange="handleStartOpenChange"
                />
              </a-form-item>
              <a-form-item
                v-show="modelChoose === 2"
                label="结束时间"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-date-picker
                  :disabledDate="disabledStartDate"
                  showTime
                  format="YYYY-MM-DD HH:mm:ss"
                  v-model="endValue"
                  placeholder="结束时间"
                  @openChange="handleStartOpenChange"
                />
              </a-form-item>
              <a-form-item
                label="结束后操作"
                v-show="modelChoose === 2"
                :label-col="{ span: 5 }"
                :wrapper-col="{ span: 12 }"
              >
                <a-radio-group default-value="1">
                  <a-radio :value="1"
                    ><span style="color: #ced4ea;">关机</span></a-radio
                  >
                  <a-radio :value="2"
                    ><span style="color: #ced4ea;">待机</span></a-radio
                  >
                </a-radio-group>
              </a-form-item>
            </a-form>
          </dv-border-box-4>
        </div>
      </div>

      <div class="setting-button-container">
        <a-button type="primary" style="margin: 12px 20px">启动</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GatherMode',
  data() {
    return {
      // 采集
      formLayout: 'horizontal',
      baseSettingForm: this.$form.createForm(this),
      gatherSettingForm: this.$form.createForm(this),
      gatherResourceList: [
        { name: '采集设备1', id: '1', state: 1, type: 'PCIe' },
        { name: '采集设备2', id: '2', state: 1, type: 'USB' },
        { name: '采集设备3', id: '3', state: 0, type: '网口' },
        { name: '采集设备4', id: '4', state: 0, type: 'PCIe' },
        { name: '采集设备5', id: '5', state: 1, type: 'USB' }
      ],
      gatherColumns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '设备ID',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center',
          scopedSlots: { customRender: 'state' }
        }
      ],
      gatherSelectedRowKeys: [],
      gatherPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.gatherResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      modelChoose: 2,
      startValue: null,
      endValue: null,
      endOpen: false,
      dataAccuracy: null,
      currentRow: null,
      taskName: null
    }
  },
  methods: {
    getFieldStatus(key) {
      if (!this[key]) {
        return 'warning'
      } else {
        return 'success'
      }
    },
    getFieldText(key) {
      if (this[key]) {
        return ''
      } else {
        return '请输入'
      }
    },
    onGatherSelectChange(selectedRowKeys) {
      this.gatherSelectedRowKeys = selectedRowKeys
    },
    onRowSelect(row) {
      this.currentRow = row
    },
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    gatherRowClick(record, index) {
      return {
        on: {
          click: () => {
            // console.log(record, index)
            this.currentRow = record
          }
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../Styles/index.less';
</style>
