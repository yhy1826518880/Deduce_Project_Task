<template>
  <div>
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item
        label="脉宽最大值（us）"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'maxPulseWidth',
            {
              rules: [{ required: true, message: '请输入脉宽最大值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="脉宽最小值（us）"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'minPulseWidth',
            {
              rules: [{ required: true, message: '请输入脉宽最小值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="最大幅度与均值比值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'maxAmpRatio',
            {
              rules: [{ required: true, message: '请输入最大幅度与均值比值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="最小幅度与均值比值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'maxAmpRatio',
            {
              rules: [{ required: true, message: '请输入最小幅度与均值比值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="频率最大值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'maxFreq',
            {
              rules: [{ required: true, message: '请输入频率最大值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="频率最小值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'minFreq',
            {
              rules: [{ required: true, message: '请输入频率最小值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="信噪比最大值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'maxSignalNoise',
            {
              rules: [{ required: true, message: '请输入信噪最大值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="信噪比最小值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'minSignalNoise',
            {
              rules: [{ required: true, message: '请输入信噪最小值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="连续波干扰值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'continuousWave',
            {
              rules: [{ required: true, message: '请输入连续波干扰值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="虚假脉冲估计值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'estimatedValue',
            {
              rules: [{ required: true, message: '请输入连续波干扰值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="毛刺现象值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'burrValue',
            {
              rules: [{ required: true, message: '请输入毛刺现象值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="多径干扰值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'multipathInterference',
            {
              rules: [{ required: true, message: '请输入多径干扰值' }]
            }
          ]"
        />
      </a-form-item>
      <a-form-item
        label="完整性值"
        :label-col="{ span: 8 }"
        :wrapper-col="{ span: 12 }"
      >
        <a-input-number
          v-decorator="[
            'integralityValue',
            {
              rules: [{ required: true, message: '请输入多径干扰值' }]
            }
          ]"
        />
      </a-form-item>
    </a-form>
  </div>
</template>
<script>
export default {
  name: 'QualityAssessment',
  data() {
    return {
      formLayout: 'horizontal',
      form: this.$form.createForm(this, { name: 'qualityAssessment' })
    }
  },
  methods: {
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

<style scoped></style>
