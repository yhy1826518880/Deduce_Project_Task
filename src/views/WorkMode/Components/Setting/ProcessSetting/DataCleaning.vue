<template>
  <div class="data-cleaning-container">
    <a-checkbox-group
      :options="options"
      @change="onChange"
      v-model="value"
      class="block-checkbox"
    >
      <a-row>
        <a-col :span="24" v-for="(option, index) in options" :key="index"
          ><a-checkbox :value="option.value">{{
            option.label
          }}</a-checkbox></a-col
        >
      </a-row>
    </a-checkbox-group>
  </div>
</template>

<script>
export default {
  name: 'DataCleaning',
  data() {
    return {
      options: [
        { label: '脉宽清洗', value: 1 },
        { label: '幅度清洗', value: 2 },
        { label: '频率清洗', value: 3 },
        { label: '连续波干扰清洗', value: 4 },
        { label: '虚假脉冲估计清洗', value: 5 },
        { label: '毛刺现象清洗', value: 6 },
        { label: '脉冲完整性分析清洗', value: 7 },
        { label: '多径干扰清洗', value: 8 },
        { label: '信噪比', value: 9 }
      ],
      value: []
    }
  },
  methods: {
    onChange(checkedValues) {
      console.log('checked = ', checkedValues)
    }
  }
}
</script>

<style scoped></style>
