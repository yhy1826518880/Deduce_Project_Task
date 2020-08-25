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
          class="resource-container"
          :class="{ 'full-height': reasoningMode !== 1 }"
        >
          <a-row :gutter="40">
            <a-col :span="12" style="height: 100%;margin-bottom: 20px">
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <a-radio-group
                    default-value="1"
                    v-model="reasoningMode"
                    @change="modeChange"
                    style="margin-bottom: 20px;"
                  >
                    <a-radio :value="1"
                      ><span style="color: #ced4ea;">在线推理</span></a-radio
                    >
                    <a-radio :value="2"
                      ><span style="color: #ced4ea;">离线推理</span></a-radio
                    >
                  </a-radio-group>
                  <div v-show="reasoningMode === 1">
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
                      :customRow="reasonRowClick"
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

                  <div v-show="reasoningMode !== 1">
                    <div class="user-operation">选择文件</div>
                    <div class="tree-columns-title">
                      <span class="cus-tree-text">名称</span>
                      <span class="cus-tree-text">路径</span>
                    </div>
                    <a-tree :treeData="reasonFileList" checkable>
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

                  <!--资源列表树-->
                  <div class="user-operation">选择计算资源</div>
                  <div class="tree-columns-title">
                    <span class="cus-tree-text">资源索引</span>
                    <span class="cus-tree-text">型号</span>
                    <span class="cus-tree-text">容量</span>
                    <span class="cus-tree-text">使用率</span>
                  </div>
                  <a-tree
                    :treeData="reasoningResourceList"
                    defaultExpandAll
                    checkable
                  >
                    <template slot="title" slot-scope="record">
                      <span style="margin-right: 3px;">
                        <svg-icon
                          icon-class="computer"
                          v-if="record.children"
                        ></svg-icon>
                      </span>
                      <span class="cus-tree-text">
                        {{ record.resourceIndex }}
                      </span>
                      <span class="cus-tree-text"> {{ record.type }} </span>
                      <span class="cus-tree-text"> {{ record.capacity }} </span>
                      <span class="cus-tree-text"> {{ record.usage }} </span>
                    </template>
                  </a-tree>
                </dv-border-box-4>
              </div>
            </a-col>
            <a-col
              v-if="reasoningMode === 1"
              :span="12"
              style="height: 100%;margin-bottom: 20px"
            >
              <div class="model-setting resource-form">
                <!--<dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <a-form :form="modelSettingForm">
                    <a-form-item
                      label="模型类型"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group
                        default-value="1"
                        v-model="modelTypeChoose"
                      >
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;"
                            >系统预置模型</span
                          ></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;"
                            >用户导入模型</span
                          ></a-radio
                        >
                        <a-radio :value="3"
                          ><span style="color: #ced4ea;"
                            >系统中训练模型</span
                          ></a-radio
                        >
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      label="选择模型"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select v-model="selectedModel" style="width: 240px">
                        <a-select-option
                          v-for="(model, index) in modelList"
                          :key="index"
                          :value="model.id"
                          >{{ model.label }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>
                  </a-form>
                </dv-border-box-4>-->
                <span
                  v-if="currentRow && reasoningMode === 1"
                  style="font-size: 18px;color: #3a81c7;position: absolute;top: 20px;left: 70px;"
                  >{{ currentRow.name }}</span
                >
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <a-form v-if="currentRow && reasoningMode === 1">
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
            <a-col :span="reasoningMode === 1 ? 24 : 12" style="height: 100%">
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <a-form :form="baseSettingForm">
                    <!--任务名称-->
                    <a-form-item
                      label="任务名称"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-input></a-input>
                    </a-form-item>

                    <!--模型配置-->
                    <a-form-item
                      label="模型类型"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group
                        default-value="1"
                        v-model="modelTypeChoose"
                      >
                        <a-radio :value="1"
                          ><span style="color: #ced4ea;"
                            >系统预置模型</span
                          ></a-radio
                        >
                        <a-radio :value="2"
                          ><span style="color: #ced4ea;"
                            >用户导入模型</span
                          ></a-radio
                        >
                        <a-radio :value="3"
                          ><span style="color: #ced4ea;"
                            >系统中训练模型</span
                          ></a-radio
                        >
                      </a-radio-group>
                    </a-form-item>
                    <a-form-item
                      label="选择模型"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-select v-model="selectedModel" style="width: 240px">
                        <a-select-option
                          v-for="(model, index) in modelList"
                          :key="index"
                          :value="model.id"
                          >{{ model.label }}</a-select-option
                        >
                      </a-select>
                    </a-form-item>

                    <!--任务配置-->
                    <a-form-item
                      label="工作模式"
                      :label-col="{ span: 5 }"
                      :wrapper-col="{ span: 12 }"
                    >
                      <a-radio-group
                        default-value="2"
                        v-model="operateModelChoose"
                      >
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
                      v-show="operateModelChoose === 2"
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
                      v-show="operateModelChoose === 2"
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
                      v-show="operateModelChoose === 2"
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
          <a-row>
            <a-col :span="12">
              <div class="custom-setting-box"></div>
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
                  <div class="feature-option-box">
                    <div class="feature-option-title">变换与特征</div>
                    <div
                      class="option-box"
                      v-for="(option, index) in featureOptions"
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
      <a-form :form="form" @submit="handleSubmit">
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
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import uniqid from 'uniqid'
import { triggerWindowResizeEvent } from '@/utils/util'

export default {
  name: 'ReasoningMode',
  data() {
    return {
      formLayout: 'horizontal',
      advanceFormVisible: false,
      baseSettingForm: this.$form.createForm(this),
      reasoningSettingForm: this.$form.createForm(this),
      advanceSettingForm: this.$form.createForm(this),
      modelSettingForm: this.$form.createForm(this),
      taskInfoForm: this.$form.createForm(this),

      // 在线资源列表
      reasoningResourceList: [
        {
          resourceIndex: '推理设备1',
          title: '推理设备1',
          scopedSlots: {
            title: 'title'
          },
          id: '1',
          type: 'a',
          capacity: '1TB',
          usage: '20%',
          children: [
            {
              resourceIndex: '推理设备1-卡1',
              title: '推理设备1-卡1',
              scopedSlots: {
                title: 'title'
              },
              id: '6',
              type: 'a',
              capacity: '1TB',
              usage: '20%'
            },
            {
              resourceIndex: '推理设备1-卡2',
              title: '推理设备1-卡2',
              scopedSlots: {
                title: 'title'
              },
              id: '7',
              type: 'a',
              capacity: '1TB',
              usage: '20%'
            }
          ]
        },
        {
          resourceIndex: '推理设备2',
          title: '推理设备2',
          scopedSlots: {
            title: 'title'
          },
          id: '2',
          type: 'b',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备3',
          title: '推理设备3',
          scopedSlots: {
            title: 'title'
          },
          id: '3',
          type: 'c',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备4',
          title: '推理设备4',
          scopedSlots: {
            title: 'title'
          },
          id: '4',
          type: 'd',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备5',
          title: '推理设备5',
          scopedSlots: {
            title: 'title'
          },
          id: '5',
          type: 'e',
          capacity: '1TB',
          usage: '20%',
          children: []
        }
      ],
      reasoningResourceColumns: [
        {
          title: '资源索引',
          dataIndex: 'resourceIndex',
          align: 'left'
        },
        {
          title: '型号',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '容量',
          dataIndex: 'capacity',
          align: 'center'
        },
        {
          title: '使用率',
          dataIndex: 'usage',
          align: 'center'
        }
      ],

      // 推理文件列表
      reasonFileList: [
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

      // 采集设备列表
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
      reasoningPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.reasoningResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      modelTypeChoose: 1,
      operateModelChoose: 2, // 手动，自动
      startValue: null,
      endValue: null,
      endOpen: false,
      reasoningMode: 1, // 1：在线 2：离线
      reasoningType: '', // 标注方式：解译标注
      processChoose: '', // 1: 用户自定义流程  2: 系统默认流程
      sysProcessOptions: [
        { label: '数据解析', value: '数据解析', setting: {} },
        { label: '脉冲检测', value: '脉冲检测', setting: {} },
        { label: '脉冲质量分析', value: '脉冲质量分析', setting: {} },
        { label: '模式检测', value: '模式检测' },
        { label: '质量评估', value: '质量评估', setting: {} },
        { label: '数据清洗', value: '数据清洗', setting: {} },
        { label: '数据解码', value: '数据解码' },
        { label: '原始数据', value: '原始数据' }
      ],

      featureOptions: [
        { label: '时频信息', value: '时频信息', setting: {} },
        { label: '频率信息', value: '频率信息' },
        { label: '包络信息', value: '包络信息' },
        { label: '相位信息', value: '相位信息' }
      ],

      selectedSysProcess: [],
      selectedUserProcess: [],
      selectedModel: '',
      modelList: [
        { label: 'model1', id: 'model1' },
        { label: 'model2', id: 'model2' },
        { label: 'model3', id: 'model3' },
        { label: 'model4', id: 'model4' },
        { label: 'model5', id: 'model5' },
        { label: 'model6', id: 'model6' },
        { label: 'model7', id: 'model7' }
      ],
      selectedDataFile: '',
      dataFileList: [
        { name: 'file1', id: 'model1' },
        { name: 'file2', id: 'model2' },
        { name: 'file3', id: 'model3' },
        { name: 'file4', id: 'model4' },
        { name: 'file5', id: 'model5' },
        { name: 'file6', id: 'model6' },
        { name: 'file7', id: 'model7' }
      ],

      // 高级设置表单内容
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
      earlyStop: false,
      hostStart: false,
      attributeList: [],
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 19, offset: 5 }
        }
      },

      userOptions: [
        { label: '用户流程1', value: '用户流程1' },
        { label: '用户流程2', value: '用户流程2' },
        { label: '用户流程3', value: '用户流程3' },
        { label: '用户流程4', value: '用户流程4' }
      ],
      userSelectOption: null,
      currentRow: null,
      processSettingVisible: false,
      currentProcess: null,
      form: this.$form.createForm(this, { name: 'coordinated' })
    }
  },
  methods: {
    onGatherSelectChange(selectedRowKeys) {
      this.gatherSelectedRowKeys = selectedRowKeys
    },

    onRowSelect(row) {
      this.currentRow = row
    },

    reasonRowClick(record, index) {
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
      this.$emit('reasonProcessChange', this.selectedSysProcess)
    },

    onEarlyStopChange() {
      console.log(this.earlyStop)
    },

    addAttribute() {
      this.attributeList.push({
        name: '',
        type: '',
        id: uniqid.time()
      })
    },

    attRemove(k) {
      const arr = this.attributeList
      arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
      console.log(k)
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

.data-rate-box,
.cus-attr-box {
  text-align: center;
  .rate-box-title,
  .attr-box-title {
    margin-top: 30px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #fff;
    font-weight: 700;
    border-top: 1px dashed #3182c7;
  }
  .rate-box-input {
    .rate-input {
      display: inline-block;
      margin-right: 20px;
    }
  }
}
.cus-attr-box {
  text-align: left;
}

.anticon-minus-circle-o {
  color: #fff;
}

.feature-option-title {
  font-size: 18px;
  color: #3dbcda;
  font-weight: 700;
}

.tree-columns-title {
  padding-left: 50px;
  margin-top: 20px;
  font-size: 16px;
  font-weight: 500;
  color: #3a81c7;
}
.cus-tree-text {
  display: inline-block;
  min-width: 100px;
  margin-right: 20px;
}
</style>
