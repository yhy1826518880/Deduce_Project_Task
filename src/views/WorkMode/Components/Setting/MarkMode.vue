<template>
  <div class="mode-setting-container">
    <!--基本设置-->
    <div class="col-setting-box">
      <div class="setting-box">
        <div class="setting-title">
          <span>基本设置</span>
          <a-tooltip placement="top">
            <template slot="title">
              <span>高级设置</span>
            </template>
            <span class="advance-setting-btn" @click="showAdvanceSettingForm">
              <a-icon type="setting" />
            </span>
          </a-tooltip>
        </div>

        <!--资源列表及配置信息-->
        <div
          class="resource-container mark-container"
          :class="{ 'full-height': markMode !== 1 }"
        >
          <a-row :gutter="40">
            <!--采集设备资源列表-->
            <a-col :span="12" style="height: 100%;margin-bottom: 20px;">
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <div class="mark-mode-box" style="margin-bottom: 20px;">
                    <a-radio-group
                      default-value="1"
                      v-model="markMode"
                      @change="modeChange"
                    >
                      <a-radio :value="1"
                        ><span style="color: #ced4ea;">在线标注</span></a-radio
                      >
                      <a-radio :value="2"
                        ><span style="color: #ced4ea;">离线标注</span></a-radio
                      >
                    </a-radio-group>
                  </div>

                  <!--采集设备资源列表-->
                  <div v-show="markMode === 1">
                    <div class="user-operation">选择采集设备</div>
                    <a-table
                      bordered
                      :dataSource="markResourceList"
                      :rowSelection="{
                        selectedRowKeys: markResourceSelectedRowKeys,
                        onChange: onMarkResourceSelectChange,
                        onSelect: onRowSelect
                      }"
                      :columns="markResourceColumns"
                      rowKey="id"
                      :pagination="false"
                      :customRow="markRowClick"
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
                  </div>

                  <!--文件树-->
                  <div>
                    <div class="user-operation">选择文件</div>
                    <div class="tree-columns-title">
                      <span class="cus-tree-text">名称</span>
                      <span class="cus-tree-text">路径</span>
                    </div>
                    <a-tree :treeData="markFileList" defaultExpandAll checkable>
                      <template slot="title" slot-scope="record">
                        <span class="cus-tree-text">
                          <span>
                            <svg-icon
                              icon-class="folder"
                              v-if="record.isFile === false"
                            ></svg-icon>
                            <svg-icon icon-class="file" v-else></svg-icon>
                          </span>
                          {{ record.name }}
                        </span>
                        <span class="cus-tree-text"> {{ record.path }} </span>
                      </template>
                    </a-tree>
                  </div>
                </dv-border-box-4>
              </div>
            </a-col>

            <!--采集设备参数配置-->
            <a-col
              v-if="markMode === 1"
              :span="12"
              style="height: 100%;margin-bottom: 20px"
            >
              <!--基本设置form-->
              <div class="resource-form">
                <span
                  v-if="currentRow && markMode === 1"
                  style="font-size: 18px;color: #3a81c7;position: absolute;top: 20px;left: 70px;"
                  >{{ currentRow.name }}</span
                >
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px;"
                >
                  <a-form v-if="currentRow && markMode === 1">
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
                  </a-form>
                  <a-form v-else>
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
                      disabled=""
                    >
                      <a-input disabled></a-input>
                    </a-form-item>
                    <a-form-item
                      label="采样率"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                      disabled=""
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

            <a-col :span="markMode === 1 ? 24 : 12" style="height: 100%;">
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 40px;"
                >
                  <a-form :form="baseSettingForm">
                    <a-form-item
                      label="任务名称"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input></a-input>
                    </a-form-item>
                    <a-form-item
                      label="标注方式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select
                        defaultValue="interpretation"
                        style="width: 240px"
                        v-model="markType"
                      >
                        <a-select-option value="interpretation"
                          >解译标注</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                    <a-form-item
                      label="工作模式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group default-value="2" v-model="modelChoose">
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;"
                            >手动模式</span
                          ></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;"
                            >自动模式</span
                          ></a-radio
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
            </a-col>
          </a-row>
        </div>
      </div>
      <div class="setting-button-container">
        <a-button type="primary" style="margin: 12px 20px">启动</a-button>
      </div>
    </div>

    <!--高级设置-->
    <a-modal
      title="高级设置"
      v-model="advanceFormVisible"
      width="800px"
      class="cus-modal"
      :footer="null"
    >
      <div class="advance-setting-box">
        <a-radio-group v-model="processChoose" style="width: 100%;">
          <a-row style="height: 100%;">
            <a-col :span="12" style="height: 100%;">
              <div class="custom-setting-box">
                <a-radio :value="1"><span>用户自定义流程</span></a-radio>
                <a-select
                  defaultValue="interpretation"
                  style="width: 240px; margin-top: 10px;"
                  v-model="userSelectOption"
                >
                  <a-select-option
                    v-for="(option, index) in userOptions"
                    :key="index"
                    :value="option.value"
                    >{{ option.label }}</a-select-option
                  >
                </a-select>
              </div>
            </a-col>
            <a-col :span="12">
              <div class="sys-setting-box">
                <a-radio :value="2"><span>系统默认流程</span></a-radio>
                <a-checkbox-group
                  @change="onSysProcessOptionChange"
                  style="width: 100%;"
                >
                  <div
                    class="option-box"
                    v-for="(option, index) in sysProcessOptions"
                    :key="`process${index}`"
                  >
                    <a-checkbox :value="option.value">{{
                      option.label
                    }}</a-checkbox>
                    <span
                      style="color: #000;float: right;"
                      v-if="option.setting"
                    >
                      <a-button
                        icon="ellipsis"
                        size="small"
                        @click="showProcessSetting(option)"
                      ></a-button>
                    </span>
                  </div>
                </a-checkbox-group>
              </div>
            </a-col>
          </a-row>
        </a-radio-group>
      </div>
      <div class="reset-box">
        <a-button type="default">重置</a-button>
      </div>
    </a-modal>

    <!--流程配置-->
    <a-modal
      :title="`${currentProcess ? currentProcess.label : ''}配置`"
      v-model="processSettingVisible"
      width="800px"
      class="cus-modal"
      :footer="null"
    >
      <!--<a-form :form="form" @submit="handleSubmit">
        <a-form-item
          label="Note"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            v-decorator="[
              'note',
              {
                rules: [{ required: true, message: 'Please input your note!' }]
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          label="Gender"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-select
            v-decorator="[
              'gender',
              {
                rules: [
                  { required: true, message: 'Please select your gender!' }
                ]
              }
            ]"
            placeholder="Select a option and change input text above"
            @change="handleSelectChange"
          >
            <a-select-option value="male">
              male
            </a-select-option>
            <a-select-option value="female">
              female
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
          <a-button type="primary" html-type="submit">
            Submit
          </a-button>
        </a-form-item>
      </a-form>-->
      <data-cleaning
        v-if="currentProcess && currentProcess.label === '数据清洗'"
      ></data-cleaning>
      <quality-assessment
        v-if="currentProcess && currentProcess.label === '质量评估'"
      ></quality-assessment>
    </a-modal>
  </div>
</template>

<script>
import { triggerWindowResizeEvent } from '@/utils/util'
import DataCleaning from './ProcessSetting/DataCleaning'
import QualityAssessment from './ProcessSetting/QualityAssessment'

export default {
  name: 'MarkMode',
  components: {
    DataCleaning,
    QualityAssessment
  },
  data() {
    return {
      formLayout: 'horizontal',
      advanceFormVisible: false,
      baseSettingForm: this.$form.createForm(this),
      markSettingForm: this.$form.createForm(this),
      advanceSettingForm: this.$form.createForm(this),
      markResourceList: [
        { name: '采集设备1', id: '1', state: 1, type: 'PCIe' },
        { name: '采集设备2', id: '2', state: 1, type: 'USB' },
        { name: '采集设备3', id: '3', state: 0, type: '网口' },
        { name: '采集设备4', id: '4', state: 0, type: 'PCIe' },
        { name: '采集设备5', id: '5', state: 1, type: 'USB' }
      ],
      markFileList: [
        {
          name: 'Dir1',
          path: 'D:/data/Dir1',
          isFile: false,
          scopedSlots: {
            title: 'title'
          },
          children: [
            {
              name: 'file1',
              path: 'D:/data/Dir1/file1',
              isFile: true,
              scopedSlots: {
                title: 'title'
              }
            },
            {
              name: 'file2',
              path: 'D:/data/Dir1/file2',
              isFile: true,
              scopedSlots: {
                title: 'title'
              }
            },
            {
              name: 'file3',
              path: 'D:/data/Dir1/file3',
              isFile: true,
              scopedSlots: {
                title: 'title'
              }
            },
            {
              name: 'file4',
              path: 'D:/data/Dir1/file4',
              isFile: true,
              scopedSlots: {
                title: 'title'
              }
            }
          ]
        },
        {
          name: 'Dir2',
          path: 'D:/data/Dir2',
          isFile: false,
          scopedSlots: {
            title: 'title'
          },
          children: [
            {
              name: 'file1',
              path: 'D:/data/Dir2/file1',
              isFile: false,
              scopedSlots: {
                title: 'title'
              },
              children: [
                {
                  name: 'file1-1-1',
                  path: 'D:/data/Dir2/file2/file1-1-1',
                  scopedSlots: {
                    title: 'title'
                  },
                  isFile: true
                }
              ]
            },
            {
              name: 'file2',
              path: 'D:/data/Dir2/file2',
              isFile: true,
              scopedSlots: {
                title: 'title'
              }
            },
            {
              name: 'file3',
              path: 'D:/data/Dir2/file3',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            },
            {
              name: 'file4',
              path: 'D:/data/Dir2/file4',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            }
          ]
        },
        {
          name: 'Dir3',
          path: 'D:/data/Dir3',
          isFile: false,
          scopedSlots: {
            title: 'title'
          },
          children: [
            {
              name: 'file1',
              path: 'D:/data/Dir3/file1',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            },
            {
              name: 'file2',
              path: 'D:/data/Dir3/file2',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            },
            {
              name: 'file3',
              path: 'D:/data/Dir3/file3',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            },
            {
              name: 'file4',
              path: 'D:/data/Dir3/file4',
              scopedSlots: {
                title: 'title'
              },
              isFile: true
            }
          ]
        },
        {
          name: 'file1-1',
          path: 'D:/data/Dir1/file1-1',
          scopedSlots: {
            title: 'title'
          },
          isFile: true
        },
        {
          name: 'file1-2',
          path: 'D:/data/Dir1/file1-2',
          scopedSlots: {
            title: 'title'
          },
          isFile: true
        },
        {
          name: 'file1-3',
          path: 'D:/data/Dir1/file1-3',
          isFile: true,
          scopedSlots: {
            title: 'title'
          }
        }
      ],
      markResourceColumns: [
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
      markFileColumns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'left',
          scopedSlots: { customRender: 'name' }
        },
        {
          title: '路径',
          dataIndex: 'path',
          align: 'center'
        }
      ],
      markResourceSelectedRowKeys: [],
      markFileSelectedRowKeys: [],
      markPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.markResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      modelChoose: 2,
      startValue: null,
      endValue: null,
      endOpen: false,
      markMode: 1, // 1：在线 2：离线
      markType: '', // 标注方式：解译标注
      processChoose: '', // 1: 用户自定义流程  2: 系统默认流程
      sysProcessOptions: [
        { label: '数据解析', value: '数据解析', setting: {} },
        { label: '脉冲检测', value: '脉冲检测', setting: {} },
        { label: '脉冲质量分析', value: '脉冲质量分析', setting: {} },
        { label: '模式检测', value: '模式检测' },
        { label: '质量评估', value: '质量评估', setting: {} },
        {
          label: '数据清洗',
          value: '数据清洗',
          setting: {
            /*settings: [
              {
                type: 'checkBox',
                options: [
                  { label: '脉宽清洗', value: 1 },
                  { label: '幅度清洗', value: 2 },
                  { label: '频率清洗', value: 3 },
                  { label: '连续波干扰清洗', value: 4 },
                  { label: '虚假脉冲估计清洗', value: 5 },
                  { label: '毛刺现象清洗', value: 6 },
                  { label: '脉冲完整性分析清洗', value: 7 },
                  { label: '多径干扰清洗', value: 8 },
                  { label: '信噪比', value: 9 }
                ]
              }
            ]*/
          }
        },
        { label: '数据解码', value: '数据解码' },
        { label: '有效脉冲提取', value: '有效脉冲提取' },
        { label: '标注置信度评估', value: '标注置信度评估', setting: {} }
      ],
      userOptions: [
        { label: '用户流程1', value: '用户流程1' },
        { label: '用户流程2', value: '用户流程2' },
        { label: '用户流程3', value: '用户流程3' },
        { label: '用户流程4', value: '用户流程4' }
      ],
      userSelectOption: null,
      selectedSysProcess: [],
      selectedUserProcess: [],
      currentRow: null,
      processSettingVisible: false,
      currentProcess: null,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    onMarkResourceSelectChange(selectedRowKeys) {
      this.markResourceSelectedRowKeys = selectedRowKeys
    },

    onMarkFileSelectChange(selectedRowKeys) {
      this.markFileSelectedRowKeys = selectedRowKeys
    },

    onRowSelect(row) {
      this.currentRow = row
    },

    markRowClick(record, index) {
      return {
        on: {
          click: () => {
            // console.log(record, index)
            this.currentRow = record
          }
        }
      }
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

    showAdvanceSettingForm() {
      this.advanceFormVisible = true
    },

    onSysProcessOptionChange(checkedValues) {
      this.selectedSysProcess = checkedValues
      this.$emit('processChange', this.selectedSysProcess)
    },

    modeChange() {
      triggerWindowResizeEvent('routerChange')
    },

    showProcessSetting(process) {
      // console.log(process)
      this.currentProcess = process
      this.processSettingVisible = true
    },

    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    handleSelectChange(value) {
      console.log(value)
      this.form.setFieldsValue({
        note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '../Styles/index.less';
.sys-setting-box {
  padding-left: 20px;
  border-left: 1px solid #fff;
}
.option-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 3px 0;
  // text-align: center;
  color: #fff;
}

.reset-box {
  height: 30px;
  line-height: 30px;
  padding: 10px 0;
  border-top: 1px solid #3182c7;
  margin-top: 10px;
  text-align: center;
}
.setting-form {
  margin-top: 0;
}
.resource-container.mark-container {
  // height: calc(100% - 80px);
}
</style>
