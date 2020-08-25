<template>
  <div class="result-container">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-table
          bordered
          :dataSource="resultList"
          :columns="columns"
          rowKey="name"
          :pagination="pagination"
        >
        </a-table>
      </a-col>
      <a-col :span="12">
        <div
          id="patternDetectionChart"
          class="chart-box"
          style="width: 100%; height: 100%;min-height: 400px;"
        ></div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  name: 'PatternDetection',
  data() {
    return {
      resultList: [
        { name: '模式1', value: 100 },
        { name: '模式2', value: 200 },
        { name: '模式3', value: 300 },
        { name: '模式4', value: 150 },
        { name: '模式5', value: 120 },
        { name: '模式6', value: 180 },
        { name: '模式7', value: 230 },
        { name: '模式8', value: 210 },
        { name: '模式9', value: 170 },
        { name: '模式10', value: 90 }
      ],
      columns: [
        {
          title: '模式',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '个数',
          dataIndex: 'value',
          align: 'center'
        }
      ],
      chart: null,
      pagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.resultList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      }
    }
  },
  methods: {
    initOption() {
      let legendData = []
      this.resultList.forEach(res => {
        if (res.name) {
          legendData.push(res.name)
        }
      })

      let option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        legend: {
          orient: 'vertical',
          left: 'left',
          data: legendData,
          textStyle: {
            color: '#fff'
          }
        },
        series: [
          {
            name: '模式统计',
            type: 'pie',
            radius: '55%',
            center: ['50%', '40%'],
            data: this.resultList,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      }

      return option
    },
    initChart() {
      this.chart = this.$echarts.init(
        document.getElementById('patternDetectionChart')
      )
      let option = this.initOption()
      this.chart.setOption(option)
    }
  },
  created() {
    this.$nextTick(() => {
      this.initChart()
    })
  }
}
</script>

<style scoped></style>
