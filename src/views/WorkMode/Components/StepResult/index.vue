<template>
  <div class="step-result-container">
    <pattern-detection v-if="processName === '模式检测'"></pattern-detection>
    <quality-assessment v-if="processName === '质量评估'"></quality-assessment>
  </div>
</template>

<script>
import PatternDetection from './PatternDetection'
import QualityAssessment from './QualityAssessment'
export default {
  name: 'StepResult',
  props: {
    workMode: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    },
    processId: {
      type: String,
      default: ''
    },
    processName: {
      type: String,
      default: ''
    }
  },
  components: {
    PatternDetection,
    QualityAssessment
  },
  data() {
    return {}
  }
}
</script>

<style scoped></style>
