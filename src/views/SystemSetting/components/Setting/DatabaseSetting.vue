<template>
  <div class="data-base-setting-container">
    <div style="text-align: right;height: 30px;margin-bottom: 10px;">
      <a-button type="primary" @click="handleAdd">新增</a-button>
    </div>
    <a-table
      bordered
      :dataSource="dbList"
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
      title="新增数据库设置"
      :width="800"
      v-model="visible"
      @ok="addSetting"
    >
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="数据库类型"
        >
          <a-input-number
            placeholder="请输入数据库类型"
            v-decorator="[
              'dbType',
              {
                rules: [{ required: true, message: '请输入数据库类型' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="数据库名称"
        >
          <a-input
            placeholder="请输入数据库名称"
            v-decorator="[
              'dbName',
              {
                rules: [{ required: true, message: '请输入数据库名称' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="数据库IP"
        >
          <a-input
            placeholder="请输入数据库IP"
            v-decorator="[
              'hostName',
              {
                rules: [{ required: true, message: '请输入数据库IP' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="数据库端口号"
        >
          <a-input-number
            placeholder="请输入数据库端口号"
            v-decorator="[
              'port',
              {
                rules: [{ required: true, message: '请输入数据库端口号' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="用户名"
        >
          <a-input
            placeholder="请输入用户名"
            v-decorator="[
              'dbUser',
              {
                rules: [{ required: true, message: '请输入用户名' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="密码"
        >
          <a-input
            type="password"
            placeholder="请输入数据库密码"
            v-decorator="[
              'dbPass',
              {
                rules: [{ required: true, message: '请输入数据库密码' }],
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
import _ from 'lodash'
import {
  getSettingConfig,
  addSettingConfig,
  modifySettingConfig,
  deleteSettingConfig
} from '@/api/systemSetting'
export default {
  name: 'DatabaseSetting',
  data() {
    return {
      dbList: [
        {
          configItemId: 0,
          configItemType: 0,
          dbName: 'mysqlMMM',
          dbPass: '123456',
          dbType: 0,
          dbUser: 'administor',
          hostName: '192.168.0.15',
          port: 30005
        },
        {
          configItemId: 1,
          configItemType: 0,
          dbName: 'ORACLEMMM',
          dbPass: '123456',
          dbType: 1,
          dbUser: 'administor',
          hostName: '192.168.0.15',
          port: 30005
        }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '数据库类型',
          dataIndex: 'dbType',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'dbType' }
        },
        {
          title: '数据库名称',
          dataIndex: 'dbName',
          align: 'center',
          scopedSlots: { customRender: 'dbName' }
        },
        {
          title: '数据库IP',
          dataIndex: 'hostName',
          align: 'center',
          scopedSlots: { customRender: 'hostName' }
        },
        {
          title: '端口号',
          dataIndex: 'port',
          align: 'center',
          inputType: 'number',
          scopedSlots: { customRender: 'port' }
        },
        {
          title: '用户名',
          dataIndex: 'dbUser',
          align: 'center',
          scopedSlots: { customRender: 'dbUser' }
        },
        {
          title: '密码',
          dataIndex: 'dbPass',
          align: 'center',
          inputType: 'password',
          scopedSlots: { customRender: 'dbPass' }
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
      form: this.$form.createForm(this, { name: 'databaseForm' }),
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
      let targetIndex = this.dbList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.dbList, targetIndex, row)
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
            type: 0
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
          let targetIndex = this.dbList.findIndex(
            item => item.configItemId === row.configItemId
          )
          this.$message.success('修改成功')
          this.$set(this.dbList, targetIndex, row)
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
      let targetIndex = this.dbList.findIndex(
        item => item.configItemId === row.configItemId
      )
      this.$set(this.dbList, targetIndex, row)
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
          params.type = 0
          params.configItemType = 0
          addSettingConfig(params).then(() => {
            this.getDataList()
            this.visible = false
          })
        }
      })
    },
    getDataList() {
      getSettingConfig(0).then(res => {
        this.dbList = res.data[0].info
      })
    }
  },
  created() {
    this.getDataList()
  }
}
</script>

<style scoped></style>
