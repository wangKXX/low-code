<template>
  <div class="engine-container">
    <wt-content
      :mateData="currentComponent.pageComponents"
      :globalPageData="currentComponent.pageComponents"
      v-bind="props"
    ></wt-content>
  </div>
</template>

<script setup lang="ts">
import { useCurrentComponent } from '@/stores'
interface IComponentEngine {
  preview?: boolean
}
const props = defineProps<IComponentEngine>()
const currentComponent = useCurrentComponent()
</script>

<style lang="less" scoped>
.engine-container {
  width: 100%;
  min-height: 100%;
  overflow-y: auto;
  background-color: #fff;
  padding: 20px;
  position: relative;
}
</style>
