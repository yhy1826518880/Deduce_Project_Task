<template>
  <div class="data-statistics-container">
    <dv-border-box-11
      :color="['#87ecf5', '#124ef5']"
      title="数据统计"
      style="padding: 60px 40px;"
    >
      <div class="view-title">
        <div class="view-title-btn">数据统计</div>
        <a-button
          class="editable-add-btn"
          type="primary"
          style="float: right;margin-top: 18px;"
        >
          查询
        </a-button>
      </div>
      <a-row :gutter="30">
        <a-col :span="8">
          <div class="chart-container">
            <div
              id="signalBaseChart"
              class="chart-box"
              style="width: 100%; height: 100%;min-height: 600px;"
            ></div>
          </div>
        </a-col>
        <a-col :span="8">
          <div
            id="dataMarkBaseChart"
            class="chart-box"
            style="width: 100%; height: 100%;min-height: 600px;"
          ></div>
        </a-col>
        <a-col :span="8">
          <div
            id="modelBaseChart"
            class="chart-box"
            style="width: 100%; height: 100%;min-height: 600px;"
          ></div>
        </a-col>
      </a-row>
    </dv-border-box-11>
  </div>
</template>

<script>
export default {
  name: 'DataStatistics',
  data() {
    return {
      chartList: [],
      signalOption: {
        title: {
          text: '原始信号库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: 'pie',
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
            // No encode specified, by default, it is '2012'.
          }
        ]
      },
      dataMarkOption: {
        title: {
          text: '数据标注库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: 'pie',
            encode: {
              itemName: 'product',
              value: '2013'
            },
            radius: '65%',
            center: ['50%', '50%']
          }
        ]
      },
      modelOption: {
        title: {
          text: '模型库统计',
          left: 'center',
          textStyle: {
            color: '#fff'
          }
        },
        tooltip: {},
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: 'center',
          data: ['type1', 'type2', 'type3', 'type4'],
          textStyle: {
            color: '#fff'
          }
        },
        dataset: {
          source: [
            ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
            ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
            ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
            ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
            ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
          ]
        },
        series: [
          {
            type: 'pie',
            encode: {
              itemName: 'product',
              value: '2014'
            },
            radius: '65%',
            center: ['50%', '50%']
          }
        ]
      }
    }
  },
  methods: {
    drawPie(id, option) {
      /*this.$nextTick(() => {
      })*/
      let myChart = this.$echarts.init(document.getElementById(id))
      myChart.setOption(option)
      this.chartList.push(myChart)
      myChart.resize()
    }
  },
  mounted() {
    setTimeout(() => {
      this.drawPie('signalBaseChart', this.signalOption)
      this.drawPie('dataMarkBaseChart', this.dataMarkOption)
      this.drawPie('modelBaseChart', this.modelOption)
      this.$nextTick(() => {
        window.onresize = e => {
          if (e.eventType !== 'routerChange') {
            this.chartList.forEach(chart => {
              chart.resize()
            })
          }
        }
      })
    })
  }
}
</script>

<style lang="less" scoped>
#signalBaseChart,
#dataMarkBaseChart,
#modelBaseChart {
  padding: 10px;
  border-radius: 6px;
  background: rgba(0, 0, 0, 0.3);
}
</style>
