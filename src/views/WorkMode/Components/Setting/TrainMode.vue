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
        <div class="resource-container full-height">
          <a-row :gutter="40">
            <a-col :span="12" style="height: 100%;">
              <div class="resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
                >
                  <!--文件树-->
                  <div>
                    <div class="user-operation">选择文件</div>
                    <div class="tree-columns-title">
                      <span class="cus-tree-text">名称</span>
                      <span class="cus-tree-text">路径</span>
                    </div>
                    <a-tree :treeData="trainFileList" checkable>
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
                  <!--<div class="tree-columns-title">
                    <span class="cus-tree-text">资源索引</span>
                    <span class="cus-tree-text">型号</span>
                    <span class="cus-tree-text">容量</span>
                    <span class="cus-tree-text">使用率</span>
                  </div>
                  <a-tree
                    :treeData="trainResourceList"
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
                  </a-tree>-->
                  <a-table
                    :dataSource="trainResourceList"
                    :columns="trainResourceColumns"
                    :rowSelection="{
                      selectedRowKeys: advanceSelectedRowKeys,
                      onChange: onAdvanceSelectChange,
                      onSelect: onAdvanceSelect,
                      getCheckboxProps: record => ({
                        props: {
                          disabled: record.disabled // Column configuration not to be checked
                        }
                      })
                    }"
                    rowKey="id"
                  >
                  </a-table>
                </dv-border-box-4>
              </div>
            </a-col>
            <a-col :span="12" style="height: 100%;">
              <div class="model-setting resource-form">
                <dv-border-box-4
                  :color="['#124ef5', '#87ecf5']"
                  style="padding: 30px;"
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
      title="超参数设置"
      v-model="advanceFormVisible"
      width="900px"
      class="cus-modal"
      :footer="null"
    >
      <div class="advance-setting-box">
        <a-form :form="advanceSettingForm">
          <!--超参数设置-->
          <div class="super-setting-box">
            <a-row :gutter="20">
              <a-col :span="12">
                <a-form-item
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  label="学习率lr"
                >
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                  label="batchsize"
                >
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="epochs"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="Irschedule"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-select></a-select>
                </a-form-item>
              </a-col>
              <a-col :span="24">
                <a-form-item
                  label="earlyStop"
                  :label-col="{ span: 4 }"
                  :wrapper-col="{ span: 8 }"
                >
                  <a-checkbox v-model="earlyStop" @change="onEarlyStopChange">
                  </a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="ckpt保存"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-select></a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="优化器算法"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-select></a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="热启动"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-checkbox v-model="hostStart"></a-checkbox>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="选择热启动模型"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-select></a-select>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="模型保存名称"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-input></a-input>
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  label="模型版本"
                  :label-col="labelCol"
                  :wrapper-col="wrapperCol"
                >
                  <a-input></a-input>
                </a-form-item>
              </a-col>
            </a-row>
          </div>

          <div>
            <a-row :gutter="30">
              <a-col :span="12">
                <!--数据集划分比例-->
                <div class="data-rate-box">
                  <div class="rate-box-title">数据集划分比例</div>
                  <div class="rate-box-input">
                    <span class="rate-input">
                      <a-input placeholder="训练集"></a-input>
                    </span>
                    <span class="rate-input">
                      <a-input placeholder="测试集"></a-input>
                    </span>
                    <span class="rate-input">
                      <a-input placeholder="验证集"></a-input>
                    </span>
                  </div>
                </div>
              </a-col>
              <a-col :span="12">
                <!--流程选择-->
                <div class="feature-box">
                  <div class="feature-box-title">变换与特征</div>
                  <a-checkbox-group
                    @change="onFeatureOptionChange"
                    style="width: 100%;"
                  >
                    <div class="feature-option-box">
                      <div class="feature-option-title"></div>
                      <div
                        class="option-box"
                        v-for="(option, index) in featureOptions"
                        :key="`process${index}`"
                      >
                        <a-checkbox :value="option.value">{{
                          option.label
                        }}</a-checkbox>
                        <span
                          style="position:absolute;color: #000;"
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
          </div>

          <!--自定义参数设置-->
          <div class="cus-attr-box">
            <div class="attr-box-title">自定义参数设置</div>
            <div class="cus-attr-box">
              <a-form-item
                v-for="(k, index) in attributeList"
                :key="index"
                label=""
                :required="false"
                style="text-align: center;"
              >
                <a-input
                  v-model="k.name"
                  placeholder="请输入参数名称"
                  style="width: 200px; margin-right: 8px"
                />
                <a-input
                  placeholder="请输入参数值"
                  v-model="k.value"
                  style="width: 140px; margin-right: 8px;"
                ></a-input>
                <a-icon
                  v-if="attributeList.length > 0"
                  class="dynamic-delete-button"
                  type="minus-circle-o"
                  :disabled="attributeList.length === 0"
                  @click="() => attRemove(k)"
                />
              </a-form-item>
              <a-form-item style="text-align: center;">
                <a-button
                  type="dashed"
                  style="width: 200px;"
                  @click="addAttribute"
                >
                  <a-icon type="plus" /> 添加参数
                </a-button>
              </a-form-item>
            </div>
          </div>
        </a-form>
      </div>

      <div class="operator-btn-box">
        <a-button type="primary" style="margin-right: 20px;">确定</a-button>
        <a-button type="default" style="margin-right: 20px;">取消</a-button>
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
export default {
  name: 'TrainMode',
  data() {
    return {
      formLayout: 'horizontal',
      advanceFormVisible: false,
      baseSettingForm: this.$form.createForm(this),
      trainSettingForm: this.$form.createForm(this),
      advanceSettingForm: this.$form.createForm(this),
      modelSettingForm: this.$form.createForm(this),
      taskInfoForm: this.$form.createForm(this),
      trainResourceList: [
        {
          resourceIndex: '推理设备1',
          title: '推理设备1',
          disabled: true,
          id: '1',
          type: 'a',
          capacity: '1TB',
          usage: '20%',
          children: [
            {
              resourceIndex: '推理设备1-卡1',
              title: 'cpu-卡1',
              fatherNodeId: '1',
              id: '6',
              type: 'cpu',
              capacity: '1TB',
              usage: '20%'
            },
            {
              resourceIndex: '推理设备1-卡2',
              title: 'gpu-卡1',
              fatherNodeId: '1',
              id: '7',
              type: 'gpu',
              capacity: '1TB',
              usage: '20%'
            },
            {
              resourceIndex: '推理设备1-卡2',
              title: 'gpu-卡2',
              fatherNodeId: '1',
              id: '8',
              type: 'gpu',
              capacity: '1TB',
              usage: '20%'
            }
          ]
        },
        {
          resourceIndex: '推理设备2',
          title: '推理设备2',
          id: '2',
          type: 'b',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备3',
          title: '推理设备3',
          id: '3',
          type: 'c',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备4',
          title: '推理设备4',
          id: '4',
          type: 'd',
          capacity: '1TB',
          usage: '20%',
          children: []
        },
        {
          resourceIndex: '推理设备5',
          title: '推理设备5',
          id: '5',
          type: 'e',
          capacity: '1TB',
          usage: '20%',
          children: []
        }
      ],
      trainResourceColumns: [
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
      trainSelectedRowKeys: [],
      trainPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.trainResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      modelTypeChoose: 1,
      operateModelChoose: 2, // 手动，自动
      startValue: null,
      endValue: null,
      endOpen: false,
      trainMode: 1, // 1：在线 2：离线
      trainType: '', // 标注方式：解译标注
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

      // 推理文件列表
      trainFileList: [
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

      featureOptions: [
        { label: '时频信息', value: '时频信息', setting: {} },
        { label: '频率信息', value: '频率信息' },
        { label: '包络信息', value: '包络信息' },
        { label: '相位信息', value: '相位信息' }
      ],
      selectedFeatureProcess: [],
      processSettingVisible: false,
      currentProcess: null,
      form: this.$form.createForm(this, { name: 'coordinated' }),
      advanceSelectedRowKeys: []
    }
  },
  methods: {
    onTrainSelectChange(selectedRowKeys) {
      this.trainSelectedRowKeys = selectedRowKeys
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
    onEarlyStopChange() {
      console.log(this.earlyStop)
    },
    addAttribute() {
      if (this.attributeList.length < 9) {
        this.attributeList.push({
          name: '',
          type: '',
          value: '',
          id: uniqid.time()
        })
      } else {
        this.$message.error('对不起，最多添加9个自定义参数')
      }
    },

    attRemove(k) {
      const arr = this.attributeList
      arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
      console.log(k)
    },

    onFeatureOptionChange(checkedValues) {
      this.selectedFeatureProcess = checkedValues
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
    },

    onAdvanceSelectChange(selectedRowKeys, selectedRows) {
      // console.log(selectedRowKeys, selectedRows)
      this.advanceSelectedRowKeys = selectedRowKeys
    },

    onAdvanceSelect(record, selected, selectedRows, nativeEvent) {
      let fatherNodeId = record.fatherNodeId
      let fatherNode = this.trainResourceList.find(
        item => item.id === fatherNodeId
      )
      if (fatherNode) {
        let sonNodes = fatherNode.children

        for (let i = 0; i < sonNodes.length; i++) {
          let sonNode = sonNodes[i]
          if (sonNode.type !== record.type && sonNode.id !== record.id) {
            if (this.advanceSelectedRowKeys.find(key => key === sonNode.id)) {
              let targetIndex = this.advanceSelectedRowKeys.findIndex(
                key => key === record.id
              )
              if (targetIndex > -1) {
                this.advanceSelectedRowKeys.splice(targetIndex, 1)
                this.$message.error('请勿同时选中gpu和cpu！')
                break
              }
            }
          }
        }
      }
    }
  },
  computed: {
    computedRecord() {
      return function(record) {
        let flag = false
        let fatherNodeId = record.fatherNodeId
        let fatherNode = this.trainResourceList.find(
          item => item.id === fatherNodeId
        )
        if (fatherNode) {
          let sonNodes = fatherNode.children
          sonNodes.forEach(sonNode => {
            if (sonNode.type !== record.type && sonNode.id !== record.id) {
              sonNode.disabled = !sonNode.disabled
            }
            let targetNode = sonNodes.find(node => node.id === record.id)
            if (targetNode) {
              flag = targetNode.disabled
            }
          })
          return flag
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
@import '../Styles/index.less';
.option-box {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin: 3px 0;
  // text-align: center;
  color: #fff;
  position: relative;
}

.operator-btn-box {
  height: 30px;
  line-height: 30px;
  padding: 10px 0;
  border-top: 1px solid #3182c7;
  margin-top: 10px;
  text-align: center;
}

.data-rate-box,
.feature-box,
.cus-attr-box {
  text-align: center;
  .rate-box-title,
  .feature-box-title,
  .attr-box-title {
    margin-top: 30px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    font-size: 18px;
    color: #3dbcda;
    font-weight: 700;
    border-top: 1px dashed #3182c7;
  }
  .rate-box-input {
    .rate-input {
      display: block;
      width: 70%;
      margin: 0 auto 20px;
    }
  }
}
.cus-attr-box {
  text-align: left;
}

.anticon-minus-circle-o {
  color: #fff;
}
</style>
