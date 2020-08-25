<template>
  <div>
    <div style="text-align:right;margin-bottom: 4px;">
      <a-button class="editable-add-btn" @click="handleAdd" type="primary"
        >新建</a-button
      >
    </div>
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
          title="确认删除吗"
          @confirm="() => onDelete(record.id)"
        >
          <a href="javascript:;">删除</a>
        </a-popconfirm>
        <span style="margin-left: 10px">
          <a href="javascript:;">修改</a>
        </span>
      </template>
    </a-table>
    <a-modal title="新建仿真应用" :width="800" v-model="visible" @ok="handleOk">
      <a-form :form="createForm">
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="名称"
        >
          <a-input placeholder="请输入仿真应用名称" v-model="createForm.name" />
        </a-form-item>
        <a-form-item
          :label-col="formItemLayout.labelCol"
          :wrapper-col="formItemLayout.wrapperCol"
          label="描述"
        >
          <a-input
            placeholder="请输入仿真应用描述"
            v-model="createForm.description"
          />
        </a-form-item>
        <a-form-item
          v-for="(k, index) in createForm.attributeList"
          :key="index"
          v-bind="index === 0 ? attributeLayout : formItemLayoutWithOutLabel"
          :label="index === 0 ? '参数项' : ''"
          :required="false"
        >
          <a-input
            v-model="k.name"
            placeholder="请输入参数名称"
            style="width: 200px; margin-right: 8px"
          />
          <a-select
            placeholder="请选择类型"
            style="width: 140px; margin-right: 8px;"
            v-model="k.type"
          >
            <a-select-option value="0">int</a-select-option>
            <a-select-option value="1">double</a-select-option>
            <a-select-option value="2">string</a-select-option>
            <a-select-option value="3">boolean</a-select-option>
          </a-select>
          <a-icon
            v-if="createForm.attributeList.length > 0"
            class="dynamic-delete-button"
            type="minus-circle-o"
            :disabled="createForm.attributeList.length === 0"
            @click="() => remove(k)"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayoutWithOutLabel">
          <a-button type="dashed" style="width: 60%" @click="addAttribute">
            <a-icon type="plus" /> 添加参数
          </a-button>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import {
  getApplication,
  deleteApplication,
  addApplication
} from '@/api/application'
import uniqid from 'uniqid'
// import qs from 'qs'
// import _ from 'lodash'
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
const attributeLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 5 }
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 19 }
  }
}
export default {
  name: 'SimApplication',
  data() {
    return {
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '描述',
          dataIndex: 'description',
          align: 'center'
        },
        {
          title: '创建时间',
          dataIndex: 'createTime',
          align: 'center'
        },
        {
          title: '操作',
          dataIndex: 'operation',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      formItemLayout,
      formTailLayout,
      attributeLayout,
      formItemLayoutWithOutLabel: {
        wrapperCol: {
          xs: { span: 24, offset: 0 },
          sm: { span: 19, offset: 5 }
        }
      },
      applicationList: [
        {
          name: '应用1',
          description: '这是仿真应用1',
          id: '1',
          createTime: '2010-8-31 11:00:00'
        },
        {
          name: '应用2',
          description: '这是仿真应用2',
          id: '2',
          createTime: '2010-8-31 11:01:00'
        },
        {
          name: '应用3',
          description: '这是仿真应用3',
          id: '3',
          createTime: '2010-8-31 11:02:00'
        },
        {
          name: '应用4',
          description: '这是仿真应用4',
          id: '4',
          createTime: '2010-8-31 11:03:00'
        }
      ],
      targetApp: {},
      form: this.$form.createForm(this),
      createForm: {
        name: '',
        description: '',
        attributeList: []
      },
      visible: false
    }
  },
  created() {
    this.getAppList()
  },
  methods: {
    getAppList() {
      getApplication().then(res => {
        if (res.data.code === 0) {
          this.applicationList = res.data.data
        }
      })
    },
    onDelete(id) {
      deleteApplication(id).then(res => {
        if (res.data.code === 0) {
          const dataSource = [...this.applicationList]
          this.dataSource = dataSource.filter(item => item.id !== id)
        }
      })
    },
    resetForm() {
      this.createForm = {
        name: '',
        description: '',
        attributeList: []
      }
    },
    handleAdd() {
      this.resetForm()
      this.visible = true
    },
    handleOk() {
      console.log(this.createForm)
      // const postData = {
      //   name: this.createForm.name,
      //   description: this.createForm.description,
      //   appParameterEntities: [{ name: 'int', type: 0 }],
      //   creatorId: 'fcca6c1c-173d-46c1-81c7-545cbad76a4e'
      // }
      const postData = {
        name: this.createForm.name,
        description: this.createForm.description,
        createTime: '2019-09-04 09:42:21',
        params: [{ name: 'intA', description: 'int', type: '0' }]
      }
      // const attributeData = [{ name: 'int', type: 0 }]
      const userId = '8bb3870f-4b5a-4a99-8650-59b7e977803a'
      addApplication(userId, JSON.stringify(postData))
      // addApplication(postData)
    },
    remove(k) {
      const arr = this.createForm.attributeList
      arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
      console.log(k)
    },
    addAttribute() {
      this.createForm.attributeList.push({
        name: '',
        type: '',
        attrId: uniqid.time()
      })
    }
  }
}
</script>

<style scoped></style>
