<template>
  <div class="auth-manage-container">
    <dv-border-box-3 style="padding: 30px 30px 20px 30px;">
      <div class="operate-btn-container">
        <dv-decoration-3 style="width:300px;height:30px;float: left;" />
        <a-button
          class="editable-add-btn"
          type="primary"
          style="margin-right: 10px;"
          >查询</a-button
        >
        <a-button class="editable-add-btn" type="primary" @click="handleDelete"
          >删除</a-button
        >
      </div>
      <a-table
        bordered
        :dataSource="authList"
        :columns="columns"
        rowKey="id"
        :pagination="pagination"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        :customRow="userRowClick"
      >
        <template slot="name" slot-scope="text">
          <editable-cell :text="text" />
        </template>
        <template slot="operation" slot-scope="name, record">
          <a-popconfirm
            v-if="authList.length"
            title="确认删除吗"
            @confirm="() => onDelete()"
          >
            <a href="javascript:;">删除</a>
          </a-popconfirm>
          <span style="margin-left: 10px">
            <a href="javascript:;">修改</a>
          </span>
        </template>
      </a-table>
    </dv-border-box-3>

    <div class="tree-container">
      <div class="tree-container-description">
        用户权限详情 {{ currentRow ? `--${currentRow.name}` : '' }}
      </div>
      <a-row>
        <a-col :span="8">
          <dv-border-box-5
            :color="['#2629ff', '#1890ff']"
            style="padding: 20px;"
          >
            <ul id="workMode" class="ztree"></ul>
          </dv-border-box-5>
        </a-col>
        <a-col :span="8">
          <dv-border-box-5
            :color="['#2629ff', '#1890ff']"
            style="padding: 20px;"
          >
            <ul id="signalMode" class="ztree"></ul>
          </dv-border-box-5>
        </a-col>
        <a-col :span="8">
          <dv-border-box-5
            :color="['#2629ff', '#1890ff']"
            style="padding: 20px;"
          >
            <ul id="fileAuth" class="ztree"></ul>
          </dv-border-box-5>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AuthManage',
  data() {
    return {
      selectedRowKeys: [],
      columns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '角色',
          dataIndex: 'auth',
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
      authList: [
        {
          name: '用户1',
          auth: '这是用户1',
          id: '1',
          createTime: '2010-8-31 11:00:00'
        },
        {
          name: '用户2',
          auth: '这是用户2',
          id: '2',
          createTime: '2010-8-31 11:01:00'
        },
        {
          name: '用户3',
          auth: '这是用户3',
          id: '3',
          createTime: '2010-8-31 11:02:00'
        },
        {
          name: '用户4',
          auth: '这是用户4',
          id: '4',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户5',
          auth: '这是用户5',
          id: '5',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户6',
          auth: '这是用户6',
          id: '6',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户7',
          auth: '这是用户7',
          id: '7',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户8',
          auth: '这是用户8',
          id: '8',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户9',
          auth: '这是用户9',
          id: '9',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户10',
          auth: '这是用户10',
          id: '10',
          createTime: '2010-8-31 11:03:00'
        },
        {
          name: '用户11',
          auth: '这是用户11',
          id: '11',
          createTime: '2010-8-31 11:03:00'
        }
      ],
      drawerVisible: false,
      setting: {
        check: {
          enable: true
        }
      },
      workModeNodes: [
        {
          name: '工作模式',
          open: true,
          iconSkin: 'mode',
          children: [
            { name: '工作模式1', open: true },
            { name: '工作模式2', open: true },
            { name: '工作模式3', open: true },
            { name: '工作模式4', open: true },
            { name: '工作模式5', open: true },
            { name: '工作模式6', open: true },
            { name: '工作模式7', open: true },
            { name: '工作模式8', open: true }
          ]
        }
      ],
      signalTypeNodes: [
        {
          name: '信号类型',
          open: true,
          iconSkin: 'signal',
          children: [
            { name: '信号类型1', open: true },
            { name: '信号类型2', open: true },
            { name: '信号类型3', open: true },
            { name: '信号类型4', open: true },
            { name: '信号类型5', open: true },
            { name: '信号类型6', open: true },
            { name: '信号类型7', open: true },
            { name: '信号类型8', open: true }
          ]
        }
      ],
      fileAuthNodes: [
        {
          name: '导入导出权限',
          open: true,
          iconSkin: 'auth',
          children: [
            { name: '导入导出权限1', open: true },
            { name: '导入导出权限2', open: true },
            { name: '导入导出权限3', open: true },
            { name: '导入导出权限4', open: true },
            { name: '导入导出权限5', open: true },
            { name: '导入导出权限6', open: true },
            { name: '导入导出权限7', open: true },
            { name: '导入导出权限8', open: true }
          ]
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.authList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },
      currentRow: null
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    },
    onDelete() {},
    checkAuth() {
      this.drawerVisible = true
      this.$nextTick(() => {
        this.initWorkTree()
        this.initSignalTree()
      })
    },
    onClose() {
      this.drawerVisible = false
    },
    initWorkTree() {
      $.fn.zTree.init($('#workMode'), this.setting, this.workModeNodes)
    },
    initSignalTree() {
      $.fn.zTree.init($('#signalMode'), this.setting, this.signalTypeNodes)
    },
    initFileTree() {
      $.fn.zTree.init($('#fileAuth'), this.setting, this.fileAuthNodes)
    },
    // 选择后删除
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
    userRowClick(record, index) {
      return {
        on: {
          click: () => {
            // console.log(record, index)
            this.currentRow = record
          }
        }
      }
    }
  },
  mounted() {
    this.initWorkTree()
    this.initSignalTree()
    this.initFileTree()
  }
}
</script>

<style lang="less" scoped>
.auth-manage-container {
  width: 100%;
  height: 100%;
}
.tree-container {
  // border: 1px solid #ddd;
  margin-top: 20px;
  background: rgba(0, 0, 0, 0.2);
  padding: 10px;
  .tree-container-description {
    height: 40px;
    line-height: 40px;
    color: #4ac7d9;
    font-weight: 500;
    font-size: 18px;
    margin: 10px 0;
    padding-left: 10px;
    background: linear-gradient(90deg, #123690, transparent) !important;
  }
}
</style>
