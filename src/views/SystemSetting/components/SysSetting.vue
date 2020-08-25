<template>
  <div class="system-setting-container">
    <dv-border-box-3 style="padding: 30px 30px 20px 30px;">
      <div class="operate-btn-container">
        <dv-decoration-3 style="width:300px;height:30px;float: left;" />
        <a-select
          placeholder="选择信号类型"
          style="width: 140px; margin-right: 8px;"
          v-model="signalType"
        >
          <a-select-option
            v-for="(option, index) in signalList"
            :key="index"
            :value="option.value"
            >{{ option.label }}</a-select-option
          >
        </a-select>
        <a-button
          class="editable-add-btn"
          type="primary"
          @click="showUploader"
          style="margin: 0 10px"
          >导入</a-button
        >
        <a-button class="editable-add-btn" type="primary" @click="handleDelete"
          >删除</a-button
        >
      </div>
      <a-table
        bordered
        :dataSource="customProcessList"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
      >
        <template slot="name" slot-scope="text">
          <editable-cell :text="text" />
        </template>
        <template slot="operation" slot-scope="name, record">
          <span style="margin-left: 10px">
            <a href="javascript:;">修改</a>
          </span>
        </template>
      </a-table>
    </dv-border-box-3>
    <a-tabs
      default-active-key="0"
      :tab-bar-style="{ marginBottom: '24px', paddingLeft: '16px' }"
    >
      <a-tab-pane key="0" tab="数据库配置信息">
        <database-setting></database-setting>
      </a-tab-pane>
      <a-tab-pane key="1" tab="硬件节点配置信息">
        <hard-ware-node-setting></hard-ware-node-setting>
      </a-tab-pane>
      <a-tab-pane key="2" tab="采集服务器配置信息">
        <gather-server-setting></gather-server-setting>
      </a-tab-pane>
      <a-tab-pane key="3" tab="软件部署文件配置信息">
        <soft-deploy-setting></soft-deploy-setting>
      </a-tab-pane>
      <a-tab-pane key="4" tab="Http服务器配置信息">
        <http-server-setting></http-server-setting>
      </a-tab-pane>
    </a-tabs>
    <a-modal
      v-model="ifShowUploader"
      width="60%"
      style="height: 60%"
      class="cus-modal uploader-modal"
      :footer="null"
    >
      <div style="margin-top: 40px;">
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item
            label="流程名称"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <a-input
              v-decorator="[
                'processName',
                {
                  rules: [{ required: true, message: '请输入流程名称' }]
                }
              ]"
            />
          </a-form-item>
          <a-form-item
            label="上传流程文件"
            :label-col="{ span: 5 }"
            :wrapper-col="{ span: 12 }"
          >
            <uploader-tool></uploader-tool>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 12, offset: 5 }">
            <a-button type="primary" html-type="submit">
              确定
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-modal>
  </div>
</template>

<script>
import UploaderTool from '@/components/Uploader/UploaderToolOrigin'
import DatabaseSetting from './Setting/DatabaseSetting'
import GatherServerSetting from './Setting/GatherServerSetting'
import HardWareNodeSetting from './Setting/HardWareNodeSetting'
import SoftDeploySetting from './Setting/SoftDeploySetting'
import HttpServerSetting from './Setting/HttpServerSetting'

export default {
  name: 'SysSetting',
  components: {
    UploaderTool,
    DatabaseSetting,
    GatherServerSetting,
    HardWareNodeSetting,
    SoftDeploySetting,
    HttpServerSetting
  },
  data() {
    return {
      signalType: '',
      signalList: [
        { label: 'ADS-B', value: 'ADS-B' },
        { label: '雷达', value: '雷达' },
        { label: '通信', value: '通信' },
        { label: 'AIS', value: 'AIS' }
      ],
      customProcessList: [
        { name: '用户流程0', id: 0, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程1', id: 1, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程2', id: 2, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程3', id: 3, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程4', id: 4, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程5', id: 5, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程6', id: 6, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程7', id: 7, createTime: '2020-02-26 15:28:31' },
        { name: '用户流程8', id: 8, createTime: '2020-02-26 15:28:31' }
      ],
      selectedRowKeys: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
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
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.customProcessList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      ifShowUploader: false,
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'customProcess' })
    }
  },
  methods: {
    // 流程选中响应
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    // 删除选中流程
    handleDelete() {
      this.$confirm({
        title: '警告',
        content: `真的要删除选中的数据吗?`,
        okText: '删除',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          console.log('OK')
        },
        onCancel() {
          console.log('Cancel')
        }
      })
    },
    // 显示上传文件控件
    showUploader() {
      this.ifShowUploader = true
    },
    // 导入流程
    handleSubmit(e) {
      e.preventDefault()
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values)
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.system-setting-container {
  width: 100%;
  height: 50%;
}
</style>
