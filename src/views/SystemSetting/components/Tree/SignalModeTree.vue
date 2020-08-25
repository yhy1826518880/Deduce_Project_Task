<template>
  <ul id="signalMode" class="ztree"></ul>
</template>

<script>
export default {
  name: 'SignalModeTree',
  data() {
    return {
      setting: {},
      zNodes: [
        {
          name: '父节点1',
          open: true,
          children: [
            {
              name: '父节点11',
              open: true,
              children: [
                { name: '叶子节点111' },
                { name: '叶子节点112' },
                { name: '叶子节点113' },
                { name: '叶子节点114' }
              ]
            },
            {
              name: '父节点12',
              open: true,
              children: [
                { name: '叶子节点121' },
                { name: '叶子节点122' },
                { name: '叶子节点123' },
                { name: '叶子节点124' }
              ]
            },
            { name: '父节点13 - 没有子节点', isParent: true }
          ]
        },
        {
          name: '父节点2',
          open: true,
          children: [
            {
              name: '父节点21 - 展开',
              open: true,
              children: [
                { name: '叶子节点211' },
                { name: '叶子节点212' },
                { name: '叶子节点213' },
                { name: '叶子节点214' }
              ]
            },
            {
              name: '父节点22',
              open: true,
              children: [
                { name: '叶子节点221' },
                { name: '叶子节点222' },
                { name: '叶子节点223' },
                { name: '叶子节点224' }
              ]
            },
            {
              name: '父节点23',
              open: true,
              children: [
                { name: '叶子节点231' },
                { name: '叶子节点232' },
                { name: '叶子节点233' },
                { name: '叶子节点234' }
              ]
            }
          ]
        },
        { name: '父节点3 - 没有子节点', isParent: true }
      ]
    }
  }
}
</script>

<style scoped></style>
