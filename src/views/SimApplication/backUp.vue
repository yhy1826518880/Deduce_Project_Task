<template>
  <div>
    <a-button class="editable-add-btn" @click="handleAdd">Add</a-button>
    <a-table
      bordered
      :dataSource="applicationList"
      :columns="columns"
      rowKey="id"
      :pagination="false"
    >
      <template slot="name" slot-scope="text">
        <editable-cell :text="text" />
      </template>
      <template slot="operation" slot-scope="name, record">
        <a-popconfirm
          v-if="applicationList.length"
          title="Sure to delete?"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">Delete</a>
        </a-popconfirm>
      </template>
    </a-table>
    <a-modal title="新建仿真应用" :width="800" v-model="visible" @ok="handleOk">
      <a-form :form="form">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="名称"
        >
          <a-input
            placeholder="请输入仿真应用名称"
            v-decorator="[
              'name',
              {
                rules: [{ required: true, message: '请输入密码' }],
                validateTrigger: 'blur'
              }
            ]"
          />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="描述"
        >
          <a-input
            placeholder="请输入仿真应用描述"
            v-decorator="['description']"
          />
        </a-form-item>
        <a-form-item
          v-for="(k, index) in form.getFieldValue('keys')"
          :key="k"
          v-bind="index === 0 ? formItemLayout : formItemLayoutWithOutLabel"
          :label="index === 0 ? '参数项' : ''"
          :required="false"
        >
          <a-input
            v-decorator="[
              `names[${k}]`,
              {
                validateTrigger: ['change', 'blur'],
                rules: [
                  {
                    required: true,
                    whitespace: true,
                    message:
                      'Please input passenger\'s name or delete this field.'
                  }
                ]
              }
            ]"
            placeholder="passenger name"
            style="width: 60%; margin-right: 8px"
          />
          <a-select style="width: 120px">
            <a-select-option value="string">String</a-select-option>
            <a-select-option value="boolean">Boolean</a-select-option>
            <a-select-option value="number" disabled>Number</a-select-option>
          </a-select>
          <a-icon
            v-if="form.getFieldValue('keys').length > 1"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="form.getFieldValue('keys').length === 1"
            @click="() => remove(k)"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 60%" @click="addAttribute">
            <a-icon type="plus" /> Add field
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { getApplication, deleteApplication } from '@/api/application'
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
export default {
  name: 'SimApplication',
  data() {
    return {
      columns: [
        {
          title: 'Name',
          dataIndex: 'name'
        },
        {
          title: 'Descriptions',
          dataIndex: 'description'
        },
        {
          title: 'CreateTime',
          dataIndex: 'createTime'
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      formItemLayout,
      formTailLayout,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 19, offset: 5 }
        }
      },
      applicationList: [],
      targetApp: {},
      form: this.$form.createForm(this),
      visible: false
    }
  },
  created() {
    getApplication().then(res => {
      this.applicationList = res.data.data
    })
  },
  methods: {
    onDelete(id) {
      deleteApplication(id).then(res => {
        if (res.data.code === 0) {
          const dataSource = [...this.applicationList]
          this.dataSource = dataSource.filter(item => item.id !== id)
        }
      })
    },
    handleAdd() {
      this.visible = true
    },
    handleOk() {
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    },
    addAttribute() {
      this.form.getFieldDecorator('keys', { initialValue: [], preserve: true })
      let id = 0
      const { form } = this
      // can use data-binding to get
      const keys = form.getFieldValue('keys')
      const nextKeys = keys.concat(++id)
      // can use data-binding to set
      // important! notify form to detect changes
      form.setFieldsValue({
        keys: nextKeys
      })
    },
    remove(k) {}
  }
}
</script>

<style scoped></style>
