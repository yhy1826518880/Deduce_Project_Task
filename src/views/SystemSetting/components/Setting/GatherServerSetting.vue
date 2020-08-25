<template>
  <div class="gather-server-setting-container">
    <div style="text-align: right;height: 30px;margin-bottom: 10px;">
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      bordered
      :dataSource="gatherServerList"
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
      title="新增采集服务器设置"
      :width="800"
      v-model="visible"
      @ok="addSetting"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集设备编号"
        >
          <a-input-number
            placeholder="请输入采集设备类型"
            v-decorator="[
              'GatherDeviceId',
              {
                rules: [{ required: true, message: '请输入采集设备编号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集设备名称"
        >
          <a-input
            placeholder="请输入采集设备名称"
            v-decorator="[
              'GatherDeviceName',
              {
                rules: [{ required: true, message: '请输入采集设备名称' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="请输入采集设备类型"
        >
          <a-input-number
            placeholder="请输入采集设备类型"
            v-decorator="[
              'GatherDeviceType',
              {
                rules: [{ required: true, message: '请输入采集设备类型' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集服务器ip"
        >
          <a-input
            placeholder="请输入采集服务器ip"
            v-decorator="[
              'GatherServerIp',
              {
                rules: [{ required: true, message: '请输入采集服务器ip' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集设备IP地址"
        >
          <a-input
            placeholder="请输入采集设备ip"
            v-decorator="[
              'GatherDeviceIp',
              {
                rules: [{ required: true, message: '请输入采集设备ip' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集设备端口号"
        >
          <a-input-number
            placeholder="请输入采集设备端口号"
            v-decorator="[
              'GatherDevicePort',
              {
                rules: [{ required: true, message: '请输入采集设备端口号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集设备端状态"
        >
          <a-input-number
            placeholder="请输入采集设备状态"
            v-decorator="[
              'GatherDeviceStatus',
              {
                rules: [{ required: true, message: '请输入采集设备状态' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="适用的采集信号"
        >
          <a-input-number
            placeholder="请输入适用的采集信号"
            v-decorator="[
              'GatherSignalType',
              {
                rules: [{ required: true, message: '请输入适用的采集信号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="采集信号精度"
        >
          <a-input
            placeholder="请输入采集信号精度"
            v-decorator="[
              'GatherSignalAccuracy',
              {
                rules: [{ required: true, message: '请输入采集信号精度' }],
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
  name: 'GatherServerSetting',
  data() {
    return {
      gatherServerList: [
        {
          GatherDeviceId: 0,
          GatherDeviceIp: '192.168.0.15',
          GatherDeviceName: 'TCP',
          GatherDevicePort: 30005,
          GatherDeviceStatus: 0,
          GatherDeviceType: 0,
          GatherServerIp: '192.168.1.100',
          GatherSignalAccuracy: '0',
          GatherSignalType: 0,
          configItemId: 0,
          configItemType: 2
        },
        {
          GatherDeviceId: 1,
          GatherDeviceIp: '192.168.0.15',
          GatherDeviceName: 'UDP',
          GatherDevicePort: 30005,
          GatherDeviceStatus: 0,
          GatherDeviceType: 0,
          GatherServerIp: '192.168.1.100',
          GatherSignalAccuracy: '0',
          GatherSignalType: 0,
          configItemId: 1,
          configItemType: 2
        },
        {
          GatherDeviceId: 2,
          GatherDeviceIp: '192.168.0.15',
          GatherDeviceName: 'USB',
          GatherDevicePort: 30005,
          GatherDeviceStatus: 0,
          GatherDeviceType: 0,
          GatherServerIp: '192.168.1.100',
          GatherSignalAccuracy: '0',
          GatherSignalType: 0,
          configItemId: 2,
          configItemType: 2
        },
        {
          GatherDeviceId: 3,
          GatherDeviceIp: '192.168.0.15',
          GatherDeviceName: 'PCIe',
          GatherDevicePort: 30005,
          GatherDeviceStatus: 0,
          GatherDeviceType: 0,
          GatherServerIp: '192.168.1.100',
          GatherSignalAccuracy: '0',
          GatherSignalType: 0,
          configItemId: 3,
          configItemType: 2
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '采集设备编号',
          dataIndex: 'GatherDeviceId',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'GatherDeviceId' }
        },
        {
          title: '采集设备名称',
          dataIndex: 'GatherDeviceName',
          align: 'center',
          scopedSlots: { customRender: 'GatherDeviceName' }
        },
        {
          title: '采集设备类型',
          dataIndex: 'GatherDeviceType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'GatherDeviceType' }
        },
        {
          title: '采集服务器ip',
          dataIndex: 'GatherServerIp',
          align: 'center',
          scopedSlots: { customRender: 'GatherServerIp' }
        },
        {
          title: '采集设备IP地址',
          dataIndex: 'GatherDeviceIp',
          align: 'center',
          scopedSlots: { customRender: 'GatherDeviceIp' }
        },
        {
          title: '采集设备端口号',
          dataIndex: 'GatherDevicePort',
          align: 'center',
          scopedSlots: { customRender: 'GatherDevicePort' }
        },
        {
          title: '采集设备状态',
          dataIndex: 'GatherDeviceStatus',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'GatherDeviceStatus' }
        },
        {
          title: '适用的采集信号',
          dataIndex: 'GatherSignalType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'GatherSignalType' }
        },
        {
          title: '采集信号精度',
          dataIndex: 'GatherSignalAccuracy',
          align: 'center',
          scopedSlots: { customRender: 'GatherSignalAccuracy' }
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
      form: this.$form.createForm(this, { name: 'gatherServerForm' }),
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
      let targetIndex = this.gatherServerList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.gatherServerList, targetIndex, row)
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
            type: 2
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
          let targetIndex = this.gatherServerList.findIndex(
            item => item.configItemId === row.configItemId
          )
          this.$message.success('修改成功')
          this.$set(this.gatherServerList, targetIndex, row)
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
      let targetIndex = this.gatherServerList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.gatherServerList, targetIndex, row)
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
          params.type = 2
          params.configItemType = 2
          addSettingConfig(params).then(() => {
            this.getDataList()
            this.visible = false
          })
        }
      })
    },
    getDataList() {
      getSettingConfig(2).then(res => {
        this.gatherServerList = res.data[0].info
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>

<style scoped></style>
