<template>
  <div class="result-container">
    <a-table
      bordered
      :dataSource="resultList"
      :columns="columns"
      rowKey="name"
      :pagination="pagination"
    >
    </a-table>
  </div>
</template>

<script>
export default {
  name: 'QualityAssessment',
  data() {
    return {
      resultList: [
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 1,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 2,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 3,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 4,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 5,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 6,
          value: 180,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 7,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 8,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 9,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        },
        {
          id: 510,
          pulseNum: 0,
          pulseIndex: 10,
          qualityAss1: 0,
          qualityAss2: 0,
          qualityAss3: 0,
          qualityAss4: 0.125,
          qualityAss5: 0.125,
          qualityAss6: 0,
          qualityAss7: 0,
          qualityAss8: 0,
          totalScore: 0
        }
      ],
      columns: [
        {
          title: '任务id',
          dataIndex: 'id',
          align: 'center'
        },
        {
          title: '脉冲包号',
          dataIndex: 'pulseIndex',
          align: 'center'
        },
        {
          title: '脉冲序号',
          dataIndex: 'pulseNum',
          align: 'center'
        },
        {
          title: '质量评估1',
          dataIndex: 'qualityAss1',
          align: 'center'
        },
        {
          title: '质量评估2',
          dataIndex: 'qualityAss2',
          align: 'center'
        },
        {
          title: '质量评估3',
          dataIndex: 'qualityAss3',
          align: 'center'
        },
        {
          title: '质量评估4',
          dataIndex: 'qualityAss4',
          align: 'center'
        },
        {
          title: '质量评估5',
          dataIndex: 'qualityAss5',
          align: 'center'
        },
        {
          title: '质量评估6',
          dataIndex: 'qualityAss6',
          align: 'center'
        },
        {
          title: '质量评估7',
          dataIndex: 'qualityAss7',
          align: 'center'
        },
        {
          title: '质量评估8',
          dataIndex: 'qualityAss8',
          align: 'center'
        },
        {
          title: '总体分数',
          dataIndex: 'totalScore',
          align: 'center'
        }
      ],
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.resultList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {}
}
</script>

<style scoped></style>
