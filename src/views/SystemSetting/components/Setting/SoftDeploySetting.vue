<template>
  <div class="soft-deploy-setting-container">
    <div style="text-align: right;height: 30px;margin-bottom: 10px;">
      <a-button type="primary" @click="handleAdd()">新增</a-button>
    </div>
    <a-table
      bordered
      :dataSource="softDeployList"
      :columns="columns"
      :pagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      rowKey="id"
    >
      <template
        v-for="(col, index) in columns"
        :slot="col.dataIndex"
        slot-scope="text, record"
      >
        <div :key="index">
          <span v-if="record.editable">
            <a-input-number
              v-if="col.inputType === 'number'"
              :value="text"
              @change="e => handleChange(e, col, record)"
            ></a-input-number>
            <a-input
              v-else-if="col.inputType === 'password'"
              style="margin: -5px 0"
              type="password"
              :value="text"
              @change="e => handleChange(e.target.value, col, record)"
            />
            <a-input
              v-else
              style="margin: -5px 0"
              :value="text"
              @change="e => handleChange(e.target.value, col, record)"
            />
          </span>
          <template v-else>{{ text }}</template>
        </div>
      </template>
      <template slot="action" slot-scope="text, record">
        <div class="editable-row-operations">
          <span v-if="record.editable">
            <a @click="() => save(record)">保存</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="真的放弃编辑吗?"
              @confirm="() => cancel(record)"
            >
              <a>取消</a>
            </a-popconfirm>
          </span>
          <span v-else>
            <a class="edit" @click="() => edit(record)">修改</a>
            <a-divider type="vertical" />
            <a class="delete" @click="() => del(record)">删除</a>
          </span>
        </div>
      </template>
    </a-table>
    <a-modal
      title="新增软件部署文件设置"
      :width="800"
      v-model="visible"
      @ok="addSetting"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件编号"
        >
          <a-input-number
            placeholder="请输入软件编号"
            v-decorator="[
              'SoftId',
              {
                rules: [{ required: true, message: '请输入软件编号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="信号编号"
        >
          <a-input-number
            placeholder="请输入信号编号"
            v-decorator="[
              'SignalId',
              {
                rules: [{ required: true, message: '请输入信号编号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件模块类型"
        >
          <a-input-number
            placeholder="请输入软件模块类型"
            v-decorator="[
              'SoftModuleType',
              {
                rules: [{ required: true, message: '请输入软件模块类型' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件名称"
        >
          <a-input
            placeholder="请输入软件名称"
            v-decorator="[
              'SoftName',
              {
                rules: [{ required: true, message: '请输入软件名称' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件版本号"
        >
          <a-input-number
            placeholder="请输入软件版本号"
            v-decorator="[
              'SoftVersion',
              {
                rules: [{ required: true, message: '请输入软件版本号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件部署方式"
        >
          <a-input-number
            placeholder="请输入软件部署方式"
            v-decorator="[
              'SoftDeployWay',
              {
                rules: [{ required: true, message: '请输入软件部署方式' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件部署设备节点类型"
        >
          <a-input-number
            placeholder="请输入软件部署设备节点类型"
            v-decorator="[
              'DeployDeviceNodeType',
              {
                rules: [
                  { required: true, message: '请输入软件部署设备节点类型' }
                ],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件部署设备节点编号"
        >
          <a-input-number
            placeholder="请输入软件部署设备节点编号"
            v-decorator="[
              'DeployDeviceNodeId',
              {
                rules: [
                  { required: true, message: '请输入软件部署设备节点编号' }
                ],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件部署设备节点IP"
        >
          <a-input
            placeholder="请输入软件部署设备节点IP"
            v-decorator="[
              'DeployDeviceNodeIp',
              {
                rules: [
                  { required: true, message: '请输入软件部署设备节点IP' }
                ],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件部署路径"
        >
          <a-input
            placeholder="请输入软件部署路径"
            v-decorator="[
              'SoftPath',
              {
                rules: [{ required: true, message: '请输入软件软件部署路径' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="软件预计占用内存大小"
        >
          <a-input-number
            placeholder="请输入软件预计占用内存大小"
            v-decorator="[
              'SoftMemoryNeed',
              {
                rules: [
                  { required: true, message: '请输入软件预计占用内存大小' }
                ],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import _ from 'lodash'
import {
  getSettingConfig,
  addSettingConfig,
  modifySettingConfig,
  deleteSettingConfig
} from '@/api/systemSetting'

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
export default {
  name: 'SoftDeploySetting',
  data() {
    return {
      softDeployList: [
        {
          DeployDeviceNodeId: 123456,
          DeployDeviceNodeIp: '123456',
          DeployDeviceNodeType: 123456,
          SignalId: 0,
          SoftDeployWay: 123456,
          SoftId: 0,
          SoftMemoryNeed: 123456,
          SoftModuleType: 0,
          SoftName: 'SchedulingServerSoft',
          SoftPath: '123456',
          SoftVersion: 0,
          configItemId: 0,
          configItemType: 3
        },
        {
          DeployDeviceNodeId: 123456,
          DeployDeviceNodeIp: '123456',
          DeployDeviceNodeType: 123456,
          SignalId: 0,
          SoftDeployWay: 123456,
          SoftId: 0,
          SoftMemoryNeed: 123456,
          SoftModuleType: 1,
          SoftName: 'GenCalSoft',
          SoftPath: '123456',
          SoftVersion: 0,
          configItemId: 1,
          configItemType: 3
        },
        {
          DeployDeviceNodeId: 123456,
          DeployDeviceNodeIp: '123456',
          DeployDeviceNodeType: 123456,
          SignalId: 0,
          SoftDeployWay: 123456,
          SoftId: 0,
          SoftMemoryNeed: 123456,
          SoftModuleType: 2,
          SoftName: 'AdvCalSerModule',
          SoftPath: '123456',
          SoftVersion: 0,
          configItemId: 2,
          configItemType: 3
        },
        {
          DeployDeviceNodeId: 4,
          DeployDeviceNodeIp: '192.168.0.100',
          DeployDeviceNodeType: 1,
          SignalId: 0,
          SoftDeployWay: 123456,
          SoftId: 0,
          SoftMemoryNeed: 0,
          SoftModuleType: 3,
          SoftName: 'AdvanceCalSoft',
          SoftPath: 'path',
          SoftVersion: 0,
          configItemId: 3,
          configItemType: 3
        },
        {
          DeployDeviceNodeId: 5,
          DeployDeviceNodeIp: '192.168.0.100',
          DeployDeviceNodeType: 1,
          SignalId: 0,
          SoftDeployWay: 1,
          SoftId: 5,
          SoftMemoryNeed: 0,
          SoftModuleType: 4,
          SoftName: 'DataGatherModule',
          SoftPath: 'path',
          SoftVersion: 0,
          configItemId: 4,
          configItemType: 3
        },
        {
          DeployDeviceNodeId: 6,
          DeployDeviceNodeIp: '192.168.0.100',
          DeployDeviceNodeType: 1,
          SignalId: 0,
          SoftDeployWay: 1,
          SoftId: 6,
          SoftMemoryNeed: 0,
          SoftModuleType: 5,
          SoftName: 'HealthManage',
          SoftPath: 'path',
          SoftVersion: 0,
          configItemId: 5,
          configItemType: 3
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '软件编号',
          dataIndex: 'SoftId',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SoftId' }
        },
        {
          title: '信号编号',
          dataIndex: 'SignalId',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SignalId' }
        },
        {
          title: '软件模块类型',
          dataIndex: 'SoftModuleType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SoftModuleType' }
        },
        {
          title: '软件名称',
          dataIndex: 'SoftName',
          align: 'center',
          scopedSlots: { customRender: 'SoftName' }
        },
        {
          title: '软件版本号',
          dataIndex: 'SoftVersion',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SoftVersion' }
        },
        {
          title: '软件部署方式',
          dataIndex: 'SoftDeployWay',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SoftDeployWay' }
        },
        {
          title: '软件部署设备节点类型',
          dataIndex: 'DeployDeviceNodeType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'DeployDeviceNodeType' }
        },
        {
          title: '软件部署设备节点编号',
          dataIndex: 'DeployDeviceNodeId',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'DeployDeviceNodeId' }
        },
        {
          title: '软件部署设备节点IP',
          dataIndex: 'DeployDeviceNodeIp',
          align: 'center',
          scopedSlots: { customRender: 'DeployDeviceNodeIp' }
        },
        {
          title: '软件部署路径',
          dataIndex: 'SoftPath',
          align: 'center',
          scopedSlots: { customRender: 'SoftPath' }
        },
        {
          title: '软件预计占用内存大小',
          dataIndex: 'SoftMemoryNeed',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'SoftMemoryNeed' }
        },
        {
          title: '操作',
          dataIndex: 'action',
          width: '120px',
          align: 'center',
          scopedSlots: { customRender: 'action' }
        }
      ],
      visible: false,
      form: this.$form.createForm(this, { name: 'sotDeployForm' }),
      formItemLayout
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    edit(row) {
      row.editable = true
      row.backUp = Object.assign({}, row)
      let targetIndex = this.softDeployList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.softDeployList, targetIndex, row)
    },
    // eslint-disable-next-line
    del(row) {
      let _this = this
      this.$confirm({
        title: '警告',
        content: `真的要删除吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          let params = {
            configItemId: row.configItemId,
            type: 3
          }
          deleteSettingConfig(params).then(() => {
            _this.$message.success('删除成功！')
            _this.getDataList()
          })
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    save(row) {
      modifySettingConfig(row)
        .then(() => {
          let targetIndex = this.softDeployList.findIndex(
            item => item.configItemId === row.configItemId
          )
          this.$message.success('修改成功')
          this.$set(this.softDeployList, targetIndex, row)
          row.editable = false
        })
        .catch(() => {
          this.$message.error('修改失败')
        })
    },
    cancel(row) {
      row = _.cloneDeep(row.backUp)
      row.backUp = undefined
      row.editable = false
      let targetIndex = this.softDeployList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.softDeployList, targetIndex, row)
    },
    handleChange(value, column, record) {
      record[column.dataIndex] = value
    },
    handleAdd() {
      this.visible = true
    },
    addSetting() {
      this.form.validateFields((err, values) => {
        if (!err) {
          let params = { ...values }
          params.type = 3
          params.configItemType = 3
          addSettingConfig(params).then(() => {
            this.getDataList()
            this.visible = false
          })
        }
      })
    },
    getDataList() {
      getSettingConfig(3).then(res => {
        this.softDeployList = res.data[0].info
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>

<style scoped></style>
