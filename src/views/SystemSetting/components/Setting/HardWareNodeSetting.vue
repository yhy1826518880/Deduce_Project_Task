<template>
  <div class="hard-ware-setting-container">
    <div style="text-align: right;height: 30px;margin-bottom: 10px;">
      <a-button type="primary" @click="handleAdd()">新增</a-button>
    </div>
    <a-table
      bordered
      :dataSource="hardWareList"
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
      title="新增硬件节点设置"
      :width="800"
      v-model="visible"
      @ok="addSetting"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="节点编号"
        >
          <a-input-number
            placeholder="请输入节点编号"
            v-decorator="[
              'nodeId',
              {
                rules: [{ required: true, message: '请输入节点编号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="请输入节点类型"
        >
          <a-input-number
            placeholder="请输入节点类型"
            v-decorator="[
              'nodeType',
              {
                rules: [{ required: true, message: '请输入节点类型' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="节点IP"
        >
          <a-input
            placeholder="请输入节点IP"
            v-decorator="[
              'nodeIp',
              {
                rules: [{ required: true, message: '请输入节点IP' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="请输入节点名称"
        >
          <a-input
            placeholder="请输入节点名称"
            v-decorator="[
              'nodeMachineName',
              {
                rules: [{ required: true, message: '请输入节点名称' }],
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
  name: 'HardWareNodeSetting',
  data() {
    return {
      hardWareList: [
        {
          configItemId: 0,
          configItemType: 1,
          nodeId: 99,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'DispatchServer',
          nodeType: 0
        },
        {
          configItemId: 1,
          configItemType: 1,
          nodeId: 199,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'DBServer',
          nodeType: 1
        },
        {
          configItemId: 2,
          configItemType: 1,
          nodeId: 299,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'FileServer',
          nodeType: 2
        },
        {
          configItemId: 3,
          configItemType: 1,
          nodeId: 399,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'GenNode',
          nodeType: 3
        },
        {
          configItemId: 4,
          configItemType: 1,
          nodeId: 499,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'Advnode',
          nodeType: 4
        },
        {
          configItemId: 5,
          configItemType: 1,
          nodeId: 599,
          nodeIp: '192.168.0.15',
          nodeMachineName: 'GatherServer',
          nodeType: 5
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '节点编号',
          dataIndex: 'nodeId',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'nodeId' }
        },
        {
          title: '节点类型',
          dataIndex: 'nodeType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'nodeType' }
        },
        {
          title: '节点IP地址',
          dataIndex: 'nodeIp',
          align: 'center',
          scopedSlots: { customRender: 'nodeIp' }
        },
        {
          title: '节点设备名称',
          dataIndex: 'nodeMachineName',
          align: 'center',
          scopedSlots: { customRender: 'nodeMachineName' }
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
      form: this.$form.createForm(this, { name: 'hardWareForm' }),
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
      let targetIndex = this.hardWareList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.hardWareList, targetIndex, row)
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
            type: 1
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
          let targetIndex = this.hardWareList.findIndex(
            item => item.configItemId === row.configItemId
          )
          this.$message.success('修改成功')
          this.$set(this.hardWareList, targetIndex, row)
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
      let targetIndex = this.hardWareList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.hardWareList, targetIndex, row)
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
          params.type = 1
          params.configItemType = 1
          addSettingConfig(params).then(() => {
            this.getDataList()
            this.visible = false
          })
        }
      })
    },
    getDataList() {
      getSettingConfig(1).then(res => {
        this.hardWareList = res.data[0].info
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>

<style scoped></style>
