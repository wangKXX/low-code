<template>
  <div  class="engine-container">
    <wt-content
      :mateData="pageComponents"
      :globalPageData="pageComponents"
      v-bind="props"
      @click.self="handleClick"
      :class="`${isCurrent ? 'clicked' : ''}  ${pageComponents.sheets?.className || ''}`"
      :style="styleSheets"
    ></wt-content>
  </div>
</template>

<script setup lang="ts">
import { useCurrentComponent } from '@/stores'
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { parseCssCode } from '@/utils/common'
interface IComponentEngine {
  preview?: boolean
}
const props = defineProps<IComponentEngine>()
const { setCurrentComponentId } = useCurrentComponent();
const { pageComponents, currentComponentId} = storeToRefs(useCurrentComponent())
const handleClick = () => {
  setCurrentComponentId(pageComponents.value.componentId || '')
}
const isCurrent = computed(() => pageComponents.value.componentId === currentComponentId.value)
const styleSheets = computed(() => {
  const sheetsStr = pageComponents.value.sheets?.inlineSheets
  return parseCssCode(sheetsStr)
})
</script>

<style lang="less" scoped>
.engine-container {
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 20px;
  position: relative;
  .clicked {
    border: 1px solid #1989fa;
  }
}
</style>
