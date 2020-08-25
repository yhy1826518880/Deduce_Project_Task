<template>
  <div class="encryption-container">
    <dv-border-box-3 style="padding: 30px 30px 20px 30px;">
      <div class="operation-container">
        <dv-decoration-3 style="width:300px;height:30px;float: left;" />
        <a-button type="primary" style="margin-right: 10px;"
          >生成序列号</a-button
        >
        <a-button type="primary">激活</a-button>
      </div>
      <div class="data-container">
        <a-table
          bordered
          :dataSource="deviceList"
          :columns="columns"
          rowKey="id"
          :pagination="pagination"
          :rowSelection="{
            selectedRowKeys: selectedRowKeys,
            onChange: onSelectChange
          }"
        ></a-table>
      </div>
    </dv-border-box-3>
  </div>
</template>

<script>
export default {
  name: 'EncryptionAndAuth',
  data() {
    return {
      deviceList: [
        {
          index: 1,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 1,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 2,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 3,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 4,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 5,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 6,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 7,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 8,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 9,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        },
        {
          index: 10,
          softwareCode: '0x10029a',
          deviceIp: '192.168.0.101',
          serialNumber: 'ads10029',
          activeCode: 'sasddwwwqsadasdasdasd',
          validTime: '2020-10-12'
        }
      ],
      columns: [
        {
          title: '序号',
          dataIndex: 'index',
          align: 'center'
        },
        {
          title: '软件代号',
          dataIndex: 'softwareCode',
          align: 'center'
        },
        {
          title: '设备IP',
          dataIndex: 'deviceIp',
          align: 'center'
        },
        {
          title: '序列号',
          dataIndex: 'serialNumber',
          align: 'center'
        },
        {
          title: '激活码',
          dataIndex: 'activeCode',
          align: 'center'
        },
        {
          title: '名称',
          dataIndex: 'validTime',
          align: 'center'
        }
      ],
      selectedRowKeys: [],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.deviceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
    }
  }
}
</script>

<style lang="less" scoped>
.encryption-container {
  .operation-container {
    text-align: right;
    margin-bottom: 10px;
  }
}
</style>
